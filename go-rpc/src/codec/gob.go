package codec

import (
	"bufio"
	"encoding/gob"
	"io"
)

// GobCodec 消息的 gob 编解码器 (具体产品)
// conn 使用 TCP 或 UNIX 等协议建立的 socket 连接, 实现了 Read, Write, Close 方法
// buf 有缓冲区的 writer
// decoder 消息的 gob 解码器, 解码 (反序列化): bytes => Go 对象
// encoder 消息的 gob 编码器, 编码 (序列化): Go 对象 => bytes
type GobCodec struct {
	conn    io.ReadWriteCloser
	buf     *bufio.Writer
	decoder *gob.Decoder
	encoder *gob.Encoder
}

// Close 关闭 socket 连接
func (gobCodec *GobCodec) Close() error {
	return gobCodec.conn.Close()
}

// ReadHeader 解码 (反序列化) 消息头: bytes => Header 对象
func (gobCodec *GobCodec) ReadHeader(header *Header) error {
	return gobCodec.decoder.Decode(header)
}

// ReadBody 解码 (反序列化) 消息体: bytes => any 对象
func (gobCodec *GobCodec) ReadBody(body any) error {
	return gobCodec.decoder.Decode(body)
}

// Write 编码 (序列化) 消息头 + 消息体: Header, any 对象 => bytes
func (gobCodec *GobCodec) Write(header *Header, body any) (err error) {
	defer func() {
		_ = gobCodec.buf.Flush()
		if err != nil {
			_ = gobCodec.Close()
		}
	}()

	if err = gobCodec.encoder.Encode(header); err != nil {
		return // err
	}
	if err = gobCodec.encoder.Encode(body); err != nil {
		return // err
	}
	return // nil
}

// 验证 GobCodec 结构体是否实现了 Codec 接口
var _ Codec = (*GobCodec)(nil)

// NewGobCodec 消息的 gob 编解码器的工厂方法
// io.ReadWriteCloser 要求实现 Read, Write, Close 方法
func NewGobCodec(conn io.ReadWriteCloser) Codec {
	buf := bufio.NewWriter(conn)
	return &GobCodec{
		conn:    conn,
		buf:     buf,
		decoder: gob.NewDecoder(conn),
		encoder: gob.NewEncoder(buf),
	}
}
