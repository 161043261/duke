# 愛をこめて花束を

encoding/gob 编解码 (序列化与反序列化)

### 序列化与反序列化

RPC 调用例子

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

// type Body interface{}
```

客户端与服务器的通信

1. 协议协商: 例如 HTTP 报文, 分为 Header 和 Body, Header 的 Content-Type 和 Content-Length 指定 Body 的格式和长度
2. 协商编解码方式: 使用 Option 结构体

- MagicNum 魔数, 用于区分协议
- CodecType 指定 Header 和 Body 的编解码方式 (Gob, JSON)

服务器先使用 JSON 解码 Option, 再使用 Option 的 CodecType 字段指定的解码方式解码 Header 和 Body

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

一个报文有一个 Option, 可以有多个 Header 和 body, 例如

```text
| Option | Header | Body | Header | Body | Header | Body |
```

对于 net/rpc, 一个函数可以被远程调用, 要求:

1. The method's type is exported
2. The method is exported
3. The method has two arguments, both exported (or built-in) types
4. The method's second argument is a pointer
5. The method has return type error

```go
func (receiver *T) RPCMethod(args Args, reply *Reply) error
```
