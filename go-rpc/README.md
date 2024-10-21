# go-rpc

使用 encoding/gob 实现消息的编解码 (序列化与反序列化)

### 序列化与反序列化

一个典型的 rpc 调用

```go
err := client.Call("Service.Method", args, reply)
```

客户端发送的 RPC 请求包括

- RPC 服务名: Service
- RPC 方法名: Method
- 参数 Args
- RPC 服务器的响应: 返回值 Reply 和错误 Error

将请求和响应中的 Args, Reply 抽象为 Body 消息体, 剩余的抽象为 Header 消息头

- ServiceMethod 格式: RPC 服务名.RPC 方法名 
  - 服务名通常是 Go 结构体名 
  - 方法名通常是 Go 方法名
- Seq 请求的序号 (ID)
- Error 错误信息

```go
type Header struct {
	ServiceMethod string
	Seq           uint64
	Error         string
}
```

客户端与服务器的通信

1. 协议协商. 例如 HTTP 报文, 分为 Header 和 Body, Body 的格式和长度由 Header 的 Content-Type 和 Content-Length 指定.
2. 自定义协议: 约定固定的字节, 例如第 1 个字节表示序列化方式, 第 2 个字节表示压缩方式, 第 3~6 个字节表示 Header 的长度, 第 7~10 个字节表示 Body 的长度
3. 协商消息的编解码方式: 使用 Option 结构体

- MagicNum 魔数, 用于区分协议
- CodecType 指定 Header 和 Body 的编解码方式 (gob, json)

服务器先使用 json 解码 Option, 再使用 Option 的 CodecType 字段指定的解码方式解码 Header 和 Body

```go
type Option struct {
	MagicNum  int
	CodecType codec.Type
}
```

```text
| Option{MagicNumber: ?, CodecType: ?} | Header{ServiceMethod ?} | Body any | ...
| <----------- JSON 编码 ----------->  | <---- CodeType 指定的编码方式 ---->| ...
```

一个报文只有一个 Option, 但可以有多个 Header 和 body, 例如

```text
| Option | Header | Body | Header | Body | Header | Body |
```
