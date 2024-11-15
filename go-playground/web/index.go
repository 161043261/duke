package main

import "fmt"

// GOOS=js GOARCH=wasm go build -o index.wasm index.go
// cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

// go install github.com/shurcooL/goexec@latest
// goexec 'http.ListenAndServe(`:8080`, http.FileServer(http.Dir(`.`)))'
func main() {
  fmt.Println("Hello World")
}
