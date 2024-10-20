package codec

import "io"

// Header 消息头
// ServiceMethod 格式: RPC 服务名.RPC 方法名
// * RPC 服务名通常是 Go 结构体名
// * RPC 方法名通常是 Go 方法名
// Seq 请求的序号 (ID)
// Error 错误信息
type Header struct {
	ServiceMethod string
	Seq           uint64
	Error         string
}

// Codec 消息编解码器接口 (抽象产品)
// io.Closer 要求实现 Close 方法
// ReadeHeader 解码 (反序列化) 消息头: bytes => Header 对象
// ReadBody 解码 (反序列化) 消息体: bytes => any 对象
// Write 编码 (序列化) 消息头 + 消息体: Header, any 对象 -> bytes
type Codec interface {
	io.Closer
	ReadeHeader(*Header) error
	ReadBody(any) error
	Write(*Header, any) error
}

// NewCodec 消息的编解码器的工厂方法
// io.ReadWriteCloser 要求实现 Read, Write, Close 方法
type NewCodec func(io.ReadWriteCloser) Codec

// Type 基础类型为 string
type Type string

// GobType gob 消息编解码器 (具体产品) 使用的编解码方式
// JsonType json 消息编解码器 (具体产品) 使用的编解码方式
const (
	GobType  Type = "application/gob"
	JsonType Type = "application/json"
)

// NewCodecMap 编解码方式 Type 到工厂方法 NewCodec 的映射
var NewCodecMap map[Type]NewCodec

func init() {
	NewCodecMap = make(map[Type]NewCodec)
	NewCodecMap[GobType] = NewGobCodec
}
