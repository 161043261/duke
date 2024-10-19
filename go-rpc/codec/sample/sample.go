package main

import (
	"context"
	"log"
	"net"
	"net/http"
	"net/rpc"
	"os"
	"os/signal"
	"strconv"
	"time"
)

type Server struct {
}

type Args struct {
}

type Reply struct {
	State int
}

func (s *Server) Method(args *Args, reply *Reply) error {
	reply.State++
	return nil
}

func (s *Server) serve() {
	err := rpc.Register(s)
	if err != nil {
		panic(err)
	}

	rpc.HandleHTTP()
	sockName := "/var/tmp/rpc-" + strconv.Itoa(os.Getuid())

	err = os.Remove(sockName)
	if err != nil {
		log.Println(err.Error())
	}

	listener, err := net.Listen("unix", sockName)
	if err != nil {
		panic(err)
	}

	go http.Serve(listener, nil)
}

func call(rpcName string, args any, reply any) bool {
	sockName := "/var/tmp/rpc-" + strconv.Itoa(os.Getuid())

	client, err := rpc.DialHTTP("unix", sockName)
	if err != nil {
		panic(err)
	}

	return client.Call(rpcName, args, reply) == nil
}

func main() {
	s := Server{}
	s.serve()
	time.Sleep(time.Second)

	args := Args{}
	reply := Reply{State: 0}

	if ok := call("Server.Method", &args, &reply); ok {
		log.Println("reply:", reply)
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()
	<-ctx.Done()
}
