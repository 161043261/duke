package com.bronya.netty;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufAllocator;
import io.netty.buffer.ByteBufUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class ByteBufTest {
  interface Fmt {
    void out(ByteBuf buf);
  }

  Fmt fmt =
      (ByteBuf buf) -> {
        var tmpArr = buf.getClass().toString().split("\\.");
        StringBuilder strBuilder =
            new StringBuilder()
                .append("class: ")
                .append(tmpArr[tmpArr.length - 1])
                .append(", readerIdx: ")
                .append(buf.readerIndex())
                .append(", writerIdx: ")
                .append(buf.writerIndex())
                .append(", capacity: ")
                .append(buf.capacity())
                .append("\n");
        ByteBufUtil.appendPrettyHexDump(strBuilder, buf);
        System.out.println(strBuilder.toString());
      };

  // System.out.println(ByteBufUtil.prettyHexDump(buf));

  @Test
  void testAllocate() {
    var buf1 = ByteBufAllocator.DEFAULT.buffer(16);
    var buf2 = ByteBufAllocator.DEFAULT.directBuffer(16);
    var buf3 = ByteBufAllocator.DEFAULT.heapBuffer(16);

    /* public static String valueOf(Object obj) {
        return (obj == null) ? "null" : obj.toString();
    } */
    log.info(buf1.toString()); // PooledUnsafeDirectByteBuf(ridx: 0, widx: 0, cap: 16)
    log.info(String.valueOf(buf1)); // String.valueOf() 是空安全的
    // 池化的直接内存 -- 分配和回收的代价高, 读写性能高, 不能被 gc
    fmt.out(buf1); // class: PooledUnsafeDirectByteBuf, readerIdx: 0, writerIdx: 0, capacity: 16
    fmt.out(buf2); // class: PooledUnsafeDirectByteBuf, readerIdx: 0, writerIdx: 0, capacity: 16
    // 池化的 jvm 内存 -- 分配和回收的代价低, 读写性能低, 可以被 gc
    fmt.out(buf3); // class: PooledUnsafeHeapByteBuf, readerIdx: 0, writerIdx: 0, capacity: 16
  }

  @Test
  void testBuffer() {
    System.out.println("============================== Test write ==============================");
    ByteBuf buf = ByteBufAllocator.DEFAULT.directBuffer(10);
    buf.writeByte(1);
    buf.writeBytes(new byte[] {2, 3, 4});
    fmt.out(buf);
    buf.writeInt(5);
    fmt.out(buf);
    // 再写入一个整数时, 触发扩容
    buf.writeInt(6);
    fmt.out(buf); // capacity = 16

    // ! read 一个字节, 该字节会被废弃
    // ! get 一个字节, 该字节不会被废弃
    System.out.println("============================== Test read ==============================");
    // 读出一个字节
    System.out.println("Read a byte: " + buf.readByte());
    fmt.out(buf); // 该字节被废弃

    // 标记
    buf.markReaderIndex();
    // 读出一个字节
    System.out.println("Read a byte: " + buf.readByte());
    // 重置标记
    buf.resetReaderIndex();
    fmt.out(buf); // 该字节不被废弃

    fmt.out(buf.readBytes(3));
    fmt.out(buf);
  }

  @Test // slice 共享内存, 有独立的读写指针, 不能扩容
  void testSlice() {
    ByteBuf buf = ByteBufAllocator.DEFAULT.directBuffer(10);
    buf.writeBytes(new byte[] {1, 2, 3, 4});
    buf.readByte();

    // 从 buf.readerIndex() 到 buf.writerIndex() 切片
    ByteBuf slice = buf.slice();
    fmt.out(buf); // 2 3 4
    fmt.out(slice); // 2 3 4

    // slice 不能扩容
    try {
      slice.writeByte(5);
    } catch (Exception e) {
      log.error(e.getClass().toString()); // java.lang.IndexOutOfBoundsException
    }

    // 从 buf 中读一个字节
    buf.readByte();
    fmt.out(buf); // 3 4
    // slice 有独立的读写指针
    fmt.out(slice); // 2 3 4

    slice.setByte(2, 5);
    // slice 与 buf 共享内存
    fmt.out(buf); // 3 5
    fmt.out(slice); // 2 3 5
  }
}
