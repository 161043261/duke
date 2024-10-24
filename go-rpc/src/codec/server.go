package codec

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"reflect"
	"sync"
)

// MagicNum 魔数, 用于区分协议
const MagicNum = 0xCAFE

// Option 消息协商, 默认使用 JSON 编解码方式
// MagicNum 魔数, 用于区分协议
// CodecType 指定 Header 和 Body 的编解码方式 (Gob, JSON)
type Option struct {
	MagicNum  int
	CodecType Type
}

var DefaultOption = &Option{
	MagicNum:  MagicNum,
	CodecType: GobType,
}

type Server struct{}

func NewServer() *Server {
	return &Server{}
}

var DefaultServer = NewServer()

func (server *Server) Accept(listener net.Listener) {
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Println("RPC server: accept error", err.Error())
		}
		go server.serveConn(conn)
	}
}

func Accept(listener net.Listener) {
	DefaultServer.Accept(listener)
}

func (server *Server) serveConn(conn net.Conn) {
	defer func() {
		_ = conn.Close()
	}()

	var opt Option

	if err := json.NewDecoder(conn /* io.Reader */).Decode(&opt); err != nil {
		log.Println("RPC server: decode error", err.Error())
		return
	}

	if opt.MagicNum != MagicNum {
		log.Println("RPC server: invalid magic number")
		return
	}

	newCodec := Type2NewCodec[opt.CodecType]

	if newCodec == nil {
		log.Println("RPC server: invalid codec type", opt.CodecType)
		return
	}

	server.startCodec(newCodec(conn))
}

func (server *Server) startCodec(codecIns Codec) {
	// 等价于 sendMut := &sync.Mutex{}
	sendMut := new(sync.Mutex)
	// 等价于 sendMut := &sync.WaitGroup{}
	wg := new(sync.WaitGroup)

	for {
		req, err := server.readReq(codecIns)
		if err != nil {
			if req == nil {
				break
			}
			req.header.Error = err.Error()
			server.writeResp(codecIns, req.header, struct{}{}, sendMut)
			continue
		}
		wg.Add(1)
		go server.handleReq(codecIns, req, sendMut, wg)
	}
	wg.Wait()

	_ = codecIns.Close()
}

// request 请求
// header 请求头
// argsVal, replyVal 请求体
type request struct {
	header            *Header
	argsVal, replyVal reflect.Value
}

func (server *Server) readReqHeader(codecIns Codec) (*Header, error) {
	var header Header
	if err := codecIns.ReadHeader(&header); err != nil {
		if err != io.EOF && !errors.Is(err, io.ErrUnexpectedEOF) {
			log.Println("RPC server: read request header error", err.Error())
		}
		return nil, err
	}
	return &header, nil
}

func (server *Server) readReq(codecIns Codec) (*request, error) {
	// 解码 (反序列化) 请求头
	header_, err := server.readReqHeader(codecIns)
	if err != nil {
		return nil, err
	}
	req := &request{header: header_}

	// 解码 (反序列化) 请求体
	// Header => request.header
	// Body => request.argsVal
	req.argsVal = reflect.New(reflect.TypeOf(struct{}{}))

	if err = codecIns.ReadBody(req.argsVal.Interface()); err != nil {
		log.Println("RPC server: read request error", err.Error())
	}

	return req, nil
}

func (server *Server) handleReq(codecIns Codec, req *request, sendMut *sync.Mutex, wg *sync.WaitGroup) {
	defer wg.Done()
	log.Printf("Header: %#v, Args (Body): %v\n", req.header, req.argsVal.Elem())
	req.replyVal = reflect.ValueOf(fmt.Sprintf("Message %d response", req.header.Seq))
	server.writeResp(codecIns, req.header, req.replyVal.Interface() /* body */, sendMut)
}

// synchronized
func (server *Server) writeResp(codecIns Codec, header *Header, body any, sendMut *sync.Mutex) {
	sendMut.Lock()
	defer sendMut.Unlock()
	if err := codecIns.Write(header, body); err != nil {
		log.Println("RPC server: write response error", err.Error())
	}
}
