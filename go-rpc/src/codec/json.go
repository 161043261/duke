package codec

import (
	"bufio"
	"encoding/json"
	"io"
)

// JsonCodec 消息的 json 编解码器 (具体产品)
// conn 使用 TCP 或 UNIX 等协议建立的 socket 连接, 实现了 Read, Write, Close 方法
// buf 有缓冲区的 writer
// decoder 消息的 json 解码器, 解码 (反序列化): bytes => Go 对象
// encoder 消息的 json 编码器, 编码 (序列化): Go 对象 => bytes
type JsonCodec struct {
	conn    io.ReadWriteCloser
	buf     *bufio.Writer
	decoder *json.Decoder
	encoder *json.Encoder
}

// Close 关闭 socket 连接
func (jsonCodec *JsonCodec) Close() error {
	return jsonCodec.conn.Close()
}

// ReadeHeader 解码 (反序列化) 消息头: bytes => Header 对象
func (jsonCodec *JsonCodec) ReadeHeader(header *Header) error {
	return jsonCodec.decoder.Decode(header)
}

// ReadBody 解码 (反序列化) 消息体: bytes => any 对象
func (jsonCodec *JsonCodec) ReadBody(body any) error {
	return jsonCodec.encoder.Encode(body)
}

// Write 编码 (序列化) 消息头 + 消息体: Header, any 对象 -> bytes
func (jsonCodec *JsonCodec) Write(header *Header, body any) (err error) {
	defer func() {
		_ = jsonCodec.buf.Flush()
		if err != nil {
			_ = jsonCodec.Close()
		}
	}()

	if err = jsonCodec.encoder.Encode(header); err != nil {
		return // err
	}
	if err = jsonCodec.encoder.Encode(body); err != nil {
		return // err
	}
	return // nil
}

// 检验 JsonCodec 结构体是否实现了 Codec 接口
var _ Codec = (*JsonCodec)(nil)

// NewJsonCodec 消息的 json 编解码器的工厂方法
// io.ReadWriteCloser 要求实现 Read, Write, Close 方法
func NewJsonCodec(conn io.ReadWriteCloser) Codec {
	buf := bufio.NewWriter(conn)
	return &JsonCodec{
		conn:    conn,
		buf:     buf,
		decoder: json.NewDecoder(conn),
		encoder: json.NewEncoder(buf),
	}
}
