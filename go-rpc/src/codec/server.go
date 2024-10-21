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

// Option 消息协商, 默认使用 json 编解码方式
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

	server.useCodec(newCodec(conn))
}

func (server *Server) useCodec(aCodec Codec) {
	// TODO new(...) ???
	mut := new(sync.Mutex)
	wg := new(sync.WaitGroup)

	for {
		req, err := server.readReq(aCodec)
		if err != nil {
			if req == nil {
				break
			}
			req.header.Error = err.Error()
			server.writeResp(aCodec, req.header, struct{}{}, mut)
			continue
		}
		wg.Add(1)
		go server.handleReq(aCodec, req, mut, wg)
	}
	wg.Wait()

	_ = aCodec.Close()
}

// request 请求
// header 请求头
// argv, replyVal 请求体
type request struct {
	header      *Header
	argv, replyVal reflect.Value
}

func (server *Server) readReq(aCodec Codec) (*request, error) {
	// 解码 (反序列化) 请求头
	header_, err := server.readReqHeader(aCodec)
	if err != nil {
		return nil, err
	}
	req := &request{header: header_}
	req.argv = reflect.New(reflect.TypeOf(""))
	// 解码 (反序列化) 请求体
	if err = aCodec.ReadBody(req.argv.Interface()); err != nil {
		log.Println("RPC server: decode error", err.Error())
	}
	return req, nil
}

func (server *Server) readReqHeader(aCodec Codec) (*Header, error) {
	var header Header
	if err := aCodec.ReadHeader(&header); err != nil {
		if err != io.EOF && !errors.Is(err, io.ErrUnexpectedEOF) {
			log.Println("RPC server: decode header error", err.Error())
		}
		return nil, err
	}
	return &header, nil
}

func (server *Server) handleReq(aCodec Codec, req *request, mut *sync.Mutex, wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println(req.header, req.argv.Elem())
	req.replyVal = reflect.ValueOf(fmt.Sprintf("RPC server: response %d", req.header.Seq))
	server.writeResp(aCodec, req.header, req.replyVal.Interface(), mut)
}

func (server *Server) writeResp(aCodec Codec, header *Header, body any, mut *sync.Mutex) {
	mut.Lock()
	defer mut.Unlock()
	if err := aCodec.Write(header, body); err != nil {
		log.Println("RPC server: write header error", err.Error())
	}
}
