package codec

import "io"

// Header 消息头
// ServiceMethod 格式: RPC 服务名.RPC 方法名
// - RPC 服务名通常是 Go 结构体名
// - RPC 方法名通常是 Go 方法名
// Seq 请求的序号 (ID)
// Error 错误信息
type Header struct {
	ServiceMethod string
	Seq           uint64
	Error         string
}

// Codec 编解码器接口
// io.Closer 要求实现 Close 方法
// ReadHeader 解码 (反序列化) 消息头: bytes => Header 对象
// ReadBody 解码 (反序列化) 消息体: bytes => any 对象
// Write 编码 (序列化) 消息头 + 消息体: Header, any 对象 => bytes
type Codec interface {
	io.Closer
	ReadHeader(header *Header) error
	ReadBody(body any) error
	Write(header *Header, body any) error
}

// NewCodec 编解码器的构造方法
// io.ReadWriteCloser 要求实现 Read, Write, Close 方法
type NewCodec func(io.ReadWriteCloser) Codec

// Type 编解码器的类型, 基础类型为 string
type Type string

// GobType: Gob 编解码方式
// JSONType: JSON 编解码方式
const (
	GobType  Type = "application/gob"
	JSONType Type = "application/json"
)

// Type2NewCodec 编解码方式 Type 到构造方法 NewCodec 的映射
var Type2NewCodec map[Type]NewCodec

func init() {
	Type2NewCodec = make(map[Type]NewCodec)
	Type2NewCodec[GobType] = NewGobCodec
}
