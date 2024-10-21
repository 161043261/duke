package gob_test

import (
	"bytes"
	"encoding/gob"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"testing"
)

func TestJSON(t *testing.T) {
	var netConn bytes.Buffer

	encoder := json.NewEncoder(&netConn)
	decoder := json.NewDecoder(&netConn)

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

// Write binaries to ./product_json.dat
func TestJSON_Write(t *testing.T) {
	tokyo := &Address{"Tokyo", "Tokyo"}
	yokohama := &Address{"Yokohama", "Yokohama"}
	product := &Product{"Genshin", "Impact", "HoYoverse", []*Address{tokyo, yokohama}}
	fstream, err := os.OpenFile("./product_json.dat", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
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

// Read binaries from ./product_json.dat
func TestJSON_Read(t *testing.T) {
	fstream, err := os.OpenFile("./product_gob.dat", os.O_RDONLY, 0666)
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
}
