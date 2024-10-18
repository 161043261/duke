package com.bronya.netty;

import io.netty.buffer.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class ByteBufTest {
  interface Fmt {
    void dump(ByteBuf buf);
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
    fmt.dump(buf1); // class: PooledUnsafeDirectByteBuf, readerIdx: 0, writerIdx: 0, capacity: 16
    fmt.dump(buf2); // class: PooledUnsafeDirectByteBuf, readerIdx: 0, writerIdx: 0, capacity: 16
    // 池化的 jvm 内存 -- 分配和回收的代价低, 读写性能低, 可以被 gc
    fmt.dump(buf3); // class: PooledUnsafeHeapByteBuf, readerIdx: 0, writerIdx: 0, capacity: 16
  }

  @Test
  void testBuffer() {
    System.out.println("============================== Test write ==============================");
    ByteBuf buf = ByteBufAllocator.DEFAULT.directBuffer(10);
    buf.writeByte(1);
    buf.writeBytes(new byte[] {2, 3, 4});
    fmt.dump(buf);
    buf.writeInt(5);
    fmt.dump(buf);
    // 再写入一个整数时, 触发扩容
    buf.writeInt(6);
    fmt.dump(buf); // capacity = 16

    // ! read 一个字节, 该字节会被废弃
    // ! get 一个字节, 该字节不会被废弃
    System.out.println("============================== Test read ==============================");
    // 读出一个字节
    System.out.println("Read a byte: " + buf.readByte());
    fmt.dump(buf); // 该字节被废弃

    // 标记
    buf.markReaderIndex();
    // 读出一个字节
    System.out.println("Read a byte: " + buf.readByte());
    // 重置标记
    buf.resetReaderIndex();
    fmt.dump(buf); // 该字节不被废弃

    fmt.dump(buf.readBytes(3));
    fmt.dump(buf);
  }

  @Test // slice 共享内存, 有独立的读写指针, 不能扩容
  void testSlice() {
    ByteBuf buf = ByteBufAllocator.DEFAULT.directBuffer(10);
    buf.writeBytes(new byte[] {1, 2, 3, 4});
    buf.readByte();

    // 从 buf.readerIndex() 到 buf.writerIndex() 切片
    ByteBuf slice = buf.slice();
    fmt.dump(buf); // 2 3 4
    fmt.dump(slice); // 2 3 4

    // slice 不能扩容
    try {
      slice.writeByte(5);
    } catch (Exception e) {
      log.error(e.getClass().toString()); // java.lang.IndexOutOfBoundsException
    }

    // 从 buf 中读一个字节
    buf.readByte();
    fmt.dump(buf); // 3 4
    // slice 有独立的读写指针
    fmt.dump(slice); // 2 3 4

    slice.setByte(2, 5);
    // slice 与 buf 共享内存
    fmt.dump(buf); // 3 5
    fmt.dump(slice); // 2 3 5
  }

  @Test
  void testCompositeByteBuf() {
    ByteBuf buf1 = ByteBufAllocator.DEFAULT.directBuffer(5);
    buf1.writeBytes(new byte[] {1, 2, 3, 4, 5});
    ByteBuf buf2 = ByteBufAllocator.DEFAULT.directBuffer(5);
    buf2.writeBytes(new byte[] {6, 7, 8, 9, 10});
    CompositeByteBuf buf = ByteBufAllocator.DEFAULT.compositeBuffer();
    buf.addComponents(true, // 是否递增 writerIndex
      buf1, buf2);
    fmt.dump(buf);

    buf.setByte(2, 5);
    fmt.dump(buf1); // 逻辑上的组合
  }

  @Test
  void testUnpooled() {
    ByteBuf buf1 = ByteBufAllocator.DEFAULT.directBuffer(10);
    buf1.writeBytes(new byte[] {1, 2, 3, 4, 5});
    ByteBuf buf2 = ByteBufAllocator.DEFAULT.directBuffer(5);
    buf2.writeBytes(new byte[] {6, 7, 8, 9, 10});
    ByteBuf buf = Unpooled.wrappedBuffer(buf1, buf2);
    fmt.dump(buf);

    buf.setByte(2, 5);
    fmt.dump(buf1); // 逻辑上的组合, 零拷贝

    // 可以包装字节数组, 零拷贝
    ByteBuf buf4 = Unpooled.wrappedBuffer(new byte[]{1, 2, 3}, new byte[]{4, 5, 6});
    fmt.dump(buf4);
  }
}
