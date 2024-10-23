package client

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"sync"

	gocodec "bronya.com/go-rpc/src/codec"
)

type Call struct {
	Seq           uint64
	ServiceMethod string // format "Service.Method"
	Args          any
	Reply         any
	Error         error
	Done          chan *Call
}

func (call *Call) done() {
	call.Done <- call
}

type Client struct {
	codecIns gocodec.Codec
	opt      gocodec.Option
	header   gocodec.Header
	seq      uint64
	pending  map[uint64]*Call // 排队未处理的请求

	sendMut sync.Mutex
	mut     sync.Mutex

	isClosed   bool // 客户端主动关闭
	srvRefused bool // 服务器异常, 客户端被动关闭
}

var _ io.Closer = (*Client)(nil)

var ErrUnAvail = errors.New("client unavailable")

// Close synchronized
func (client *Client) Close() error {
	client.mut.Lock()
	defer client.mut.Unlock()

	if client.isClosed {
		return ErrUnAvail
	}

	client.isClosed = true
	return client.codecIns.Close()
}

func (client *Client) IsAvail() bool {
	client.mut.Lock()
	defer client.mut.Lock()
	return !client.srvRefused && !client.isClosed
}

func (client *Client) registerCall(call *Call) (uint64, error) {
	client.mut.Lock()
	defer client.mut.Unlock()

	if client.isClosed || client.srvRefused {
		return 0, ErrUnAvail
	}

	call.Seq = client.seq
	client.pending[call.Seq] = call
	client.seq++
	return call.Seq, nil
}

func (client *Client) removeCall(seq uint64) *Call {
	client.mut.Lock()
	defer client.mut.Unlock()

	call := client.pending[seq]

	// func delete(m map[Type]Type1, key Type)
	delete(client.pending, seq)
	return call
}

func (client *Client) terminateCall(err error) {
	client.sendMut.Lock()
	defer client.sendMut.Unlock()
	client.mut.Lock()
	defer client.sendMut.Unlock()
	client.srvRefused = true
	for _, call := range client.pending {
		call.Error = err
		call.done()
	}
}

func (client *Client) recv() {
	var err error

	for err == nil {
		var header gocodec.Header
		if err = client.codecIns.ReadHeader(&header); err != nil {
			break
		}
		call := client.removeCall(header.Seq)
		switch {
		case call == nil:
			err = client.codecIns.ReadBody(nil)
		case header.Error != "":
			call.Error = fmt.Errorf(header.Error)
			call.done()
		default:
			err = client.codecIns.ReadBody(call.Reply)
			if err != nil {
				call.Error = errors.New("reading body error: " + err.Error())
			}
			call.done()
		}
		client.terminateCall(err)
	}
}

func NewClient(conn net.Conn, opt *gocodec.Option) (*Client, error) {
	newCodec := gocodec.Type2NewCodec[opt.CodecType]

	if newCodec == nil {
		err := fmt.Errorf("invalid codec type")
		log.Println("RPC client: invalid codec type:", err)
		return nil, err
	}

	if err := json.NewEncoder(conn).Encode(opt); err != nil {
		log.Println("RPC client: encode error:", err)
		_ = conn.Close()
		return nil, err
	}

	return startClient(newCodec(conn), opt), nil
}

func startClient(codecIns gocodec.Codec, opt *gocodec.Option) *Client {
	client := &Client{
		codecIns: codecIns,
		opt:      *opt,
		seq:      1,
		pending:  make(map[uint64]*Call),
	}
	go client.recv()
	return client
}

func parseOption(opts ...*gocodec.Option) (*gocodec.Option, error) {
	if len(opts) == 0 || opts[0] == nil {
		return gocodec.DefaultOption, nil
	}

	if len(opts) != 1 {
		return nil, errors.New("option more than 1")
	}

	opt := opts[0]
	opt.MagicNum = gocodec.DefaultOption.MagicNum
	if opt.CodecType == "" {
		opt.CodecType = gocodec.DefaultOption.CodecType
	}
	return opt, nil
}

// Dial ...Type, Args...
func Dial(network, addr string, opts ...*gocodec.Option) (client *Client, err error) {
	opt, err := parseOption(opts...)
	if err != nil {
		return nil, err
	}

	conn, err := net.Dial(network, addr)
	if err != nil {
		return nil, err
	}

	// close the connection if client is nil
	defer func() {
		if client == nil {
			_ = conn.Close()
		}
	}()

	return NewClient(conn, opt)
}

func (client *Client) send(call *Call) {
	client.sendMut.Lock()
	defer client.sendMut.Unlock()

	seq, err := client.registerCall(call)
	if err != nil {
		call.Error = err
		call.done()
		return
	}

	client.header.ServiceMethod = call.ServiceMethod
	client.header.Seq = seq
	client.header.Error = ""

	if err := client.codecIns.Write(&client.header, call.Args); err != nil {
		call := client.removeCall(seq)
		if call != nil {
			call.Error = err
			call.done()
		}
	}
}

func (client *Client) Go(serviceMethod string, args, reply any, done chan *Call) *Call {
	if done == nil {
		done = make(chan *Call, 10)
	} else if cap(done) == 0 {
		log.Panic("RPC client: done channel is unbuffered")
	}

	call := &Call{
		ServiceMethod: serviceMethod,
		Args:          args,
		Reply:         reply,
		Done:          done,
	}
	client.send(call)
	return call
}

func (client *Client) Call(serviceMethod string, args, reply any) error {
	call := <-client.Go(serviceMethod, args, reply, make(chan *Call, 1)).Done
	return call.Error
}
