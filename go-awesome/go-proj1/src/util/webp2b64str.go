package main

import (
	"encoding/base64"
	"os"
)

func webp2b64Str(inFilePath string) string {
	data, err := os.ReadFile(inFilePath)
	if err != nil {
		panic(err)
	}
	b64EncStr := base64.StdEncoding.EncodeToString(data)
	return b64EncStr
}

func write2txt(b64EncStr string, outFilePath string) {
	err := os.WriteFile(outFilePath, []byte(b64EncStr), 0644)
	if err != nil {
		panic(err)
	}
}

func main() {
	b64EncStr := webp2b64Str("./qiqi.webp")
	write2txt(b64EncStr, "../dao/qiqi.txt")
}
