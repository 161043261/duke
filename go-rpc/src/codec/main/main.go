package main

import (
	gocodec "bronya.com/go-rpc/src/codec"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"time"
)

func startServer(addr chan string) {
	// 随机端口
	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		panic(err)
	}

	log.Println("RPC server listening on", listener.Addr().String())
	addr <- listener.Addr().String()
	gocodec.Accept(listener)
}

func main() {
	addr := make(chan string)
	go startServer(addr)

	conn, err := net.Dial("tcp", <-addr)
	if err != nil {
		panic(err)
	}

	defer func() {
		_ = conn.Close()
	}()

	time.Sleep(time.Second)

	// 发送 Option
	err = json.NewEncoder(conn).Encode(gocodec.DefaultOption)
	if err != nil {
		log.Println(err.Error())
	}

	gobCodec := gocodec.NewGobCodec(conn)
	for i := 0; i < 5; i++ {
		header := &gocodec.Header{
			ServiceMethod: "Service.Method",
			Seq:           uint64(i),
		}

		body := fmt.Sprintf("Message %d body", header.Seq)

		// 发送 RPC 请求
		err := gobCodec.Write(header, body)
		if err != nil {
			log.Println(err.Error())
		}

		err = gobCodec.ReadHeader(header)
		if err != nil {
			log.Println(err.Error())
		}

		var reply string

		err = gobCodec.ReadBody(&reply)
		if err != nil {
			log.Println(err.Error())
		}

		log.Println("Reply:", reply)
	}
}
