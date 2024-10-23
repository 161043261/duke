package main

import (
	"fmt"
	"log"
	"net"
	"sync"
	"time"

	goclient "bronya.com/go-rpc/src/client"
	"bronya.com/go-rpc/src/codec"
)

func startServer(addr chan string) {
	// 随机端口
	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		panic(err)
	}

	log.Println("RPC server listening on", listener.Addr().String())
	addr <- listener.Addr().String()
	codec.Accept(listener)
}

func main() {
	log.SetFlags(0)

	addr := make(chan string)
	go startServer(addr)
	client, err := goclient.Dial("tcp", <-addr)
	if err != nil {
		panic(err)
	}

	defer func() {
		_ = client.Close()
	}()

	time.Sleep(time.Second)
	var wg sync.WaitGroup
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			args := fmt.Sprintf("RPC client request %d", i)
			var reply string
			if err := client.Call("Service.Method", args, &reply); err != nil {
				log.Fatal("call Service.Method error:", err)
			}
			log.Println("reply:", reply)
		}()
		wg.Wait()
	}
}
