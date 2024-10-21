package gob_json_test

import (
	"bytes"
	"encoding/gob"
	"fmt"
	"log"
	"os"
	"os/exec"
	"testing"
)

// Gob 是 Golang 序列化 (Go 结构体 -> bytes) 和反序列化 (bytes -> Go 结构体) 时, 二进制数据格式
// 类似 Java 的 Serialization
// Gob 通常用于远程过程调用 (RPC, Remote Proccess Call) 时, 参数 Args 和响应 Reply 的传输

// 要求
// 1. 公开  (首字母大写) 字段
// 2. 字段名相同

// SerializeFrom serialize from SerializeFrom
type SerializeFrom struct {
	Pub, pri, Same       int
	Name, NotSame, Extra string
}

// DeserializeTo deserialize to DeserializeTo
type DeserializeTo struct {
	Pub /* ok */, pri /* err */, Same/* ok */ *int32
	Name /* ok */, Different/* err */ string
}

func TestFromTo(t *testing.T) {
	var netConn bytes.Buffer

	encoder := gob.NewEncoder(&netConn)
	decoder := gob.NewDecoder(&netConn)

	err := encoder.Encode(SerializeFrom{1, 2, 3,
		"name", "username", "extra"})
	if err != nil {
		log.Fatal("Encode error:", err)
	}

	var dst DeserializeTo
	err = decoder.Decode(&dst)
	if err != nil {
		log.Fatal("Decode error:", err)
	}

	fmt.Printf("%#v\n", dst)
}

type Address struct {
	City, Repeat string
}

type Product struct {
	FirstName, LastName, Mark string
	Address                   []*Address
}

// Write binaries to ./product.gob
func TestWrite(t *testing.T) {
	rmGob()
	tokyo := &Address{"Tokyo", "Tokyo"}
	yokohama := &Address{"Yokohama", "Yokohama"}
	product := &Product{"Genshin", "Impact", "HoYoverse", []*Address{tokyo, yokohama}}
	fstream, err := os.OpenFile("./product.gob", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Fatal("Open file error:", err)
	}

	defer func() {
		_ = fstream.Close()
	}()

	enc := gob.NewEncoder(fstream)
	err = enc.Encode(product)
	if err != nil {
		log.Fatal("Encode error:", err)
	}
}

// Read binaries from ./product.gob
func TestRead(t *testing.T) {
	fstream, err := os.OpenFile("./product.gob", os.O_RDONLY, 0666)
	if err != nil {
		log.Fatal("Open file error:", err)
	}

	var product Product
	dec := gob.NewDecoder(fstream)
	err = dec.Decode(&product)
	_ = fstream.Close()

	if err != nil {
		log.Fatal("Decode error:", err)
	}
	fmt.Println("Product:", product)

	for _, addrPtr := range product.Address {
		fmt.Println("Addr:", *addrPtr)
	}
	rmGob()
}

func rmGob() {
	cmd := exec.Command("rm", "-rf", "*.gob")
	if err := cmd.Run(); err != nil {
		log.Print("rm -rf *.gob error:", err)
	}
}
