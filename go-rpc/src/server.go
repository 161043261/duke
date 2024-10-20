package src

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net"
	"reflect"
	"sync"

	"bronya.com/go-rpc/src/codec"
)

// MagicNum 魔数, 用于区分协议
const MagicNum = 0xCAFE

// Option 用于消息协商
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
			log.Println("RPC server: accepted error", err.Error())
		}
		go server.DoServe(conn)
	}
}

func Accept(listener net.Listener) {
	DefaultServer.Accept(listener)
}

func (server *Server) DoServe(conn net.Conn) {
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

	server.doCodec(newCodec(conn))
}

func (server *Server) doCodec(c codec.Codec) {
	mut := new(sync.Mutex)
	wg := new(sync.WaitGroup)

	for {
		req, err := server.recvReq(c)
		if err != nil {
			if req == nil {
				break
			}
			req.header.Error = err.Error()
			server.sendResp(c, req.header, struct{}{}, mut)
			continue
		}
		wg.Add(1)
		go server.handleReq(c, req, mut, wg)
	}
	wg.Wait()
	codec.Close()
}

type request struct {
	header       *codec.Header // header of request
	argv, replyv reflect.Value // argv and replyv of request
}

// recvReq 接收请求
func (server *Server) recvReq(c codec.Codec) (*codec.Header, error) {
	var header codec.Header
	if err := c.DecodeHeader(&header); err != nil {
		if err != io.EOF && !errors.Is(err, io.ErrUnexpectedEOF) {
			log.Println("RPC server: decode header error", err.Error())
		}
		return nil, err
	}
	return &header, nil
}

// handleReq 处理请求
func (server *Server) handleReq() {

}

// sendResp 发送响应
func (server *Server) sendResp() {

}
