package src

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"reflect"
	"sync"

	"bronya.com/go-rpc/src/codec"
)

// MagicNum 魔数, 用于区分协议
const MagicNum = 0xCAFE

// Option 消息协商, 默认使用 json 编解码方式
// MagicNum 魔数, 用于区分协议
// CodecType 指定 Header 和 Body 的编解码方式 (gob, json)
type Option struct {
	MagicNum  int
	CodecType codec.Type
}

var DefaultOption = &Option{
	MagicNum:  MagicNum,
	CodecType: codec.GobType,
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
		go server.run(conn)
	}
}

func Accept(listener net.Listener) {
	DefaultServer.Accept(listener)
}

func (server *Server) run(conn net.Conn) {
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

	newCodec := codec.NewCodecMap[opt.CodecType]

	if newCodec == nil {
		log.Println("RPC server: invalid codec type", opt.CodecType)
		return
	}

	server.useCodec(newCodec(conn))
}

func (server *Server) useCodec(aCodec codec.Codec) {
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
// argv, replyv 请求体
type request struct {
	header       *codec.Header
	argv, replyv reflect.Value
}

func (server *Server) readReq(aCodec codec.Codec) (*request, error) {
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

func (server *Server) readReqHeader(aCodec codec.Codec) (*codec.Header, error) {
	var header codec.Header
	if err := aCodec.ReadHeader(&header); err != nil {
		if err != io.EOF && !errors.Is(err, io.ErrUnexpectedEOF) {
			log.Println("RPC server: decode header error", err.Error())
		}
		return nil, err
	}
	return &header, nil
}

func (server *Server) handleReq(aCodec codec.Codec, req *request, mut *sync.Mutex, wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println(req.header, req.argv.Elem())
	req.replyv = reflect.ValueOf(fmt.Sprintf("RPC server: response %d", req.header.Seq))
	server.writeResp(aCodec, req.header, req.replyv.Interface(), mut)
}

func (server *Server) writeResp(aCodec codec.Codec, header *codec.Header, body any, mut *sync.Mutex) {
	mut.Lock()
	defer mut.Unlock()
	if err := aCodec.Write(header, body); err != nil {
		log.Println("RPC server: write header error", err.Error())
	}
}
