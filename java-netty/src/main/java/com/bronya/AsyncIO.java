package com.bronya;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class AsyncIO {
  public static void main(String[] args) {
    try (AsynchronousFileChannel asyncFileChannel =
        AsynchronousFileChannel.open(Paths.get("README.md"), StandardOpenOption.READ)) {

      ByteBuffer buf = ByteBuffer.allocate(16);
      var position = 0;
      var completionHandler =
          new CompletionHandler<Integer, ByteBuffer>() {

            @Override
            public void completed(Integer result, ByteBuffer attachment) {
              // 读 buf 前调用 flip 方法
              attachment.flip();
              System.out.println(
                  Thread.currentThread().getName()
                      + " -- Read completed: "
                      + StandardCharsets.UTF_8.decode(attachment).toString());
              System.out.println(
                  Thread.currentThread().getName()
                      + " Is daemon: "
                      + Thread.currentThread().isDaemon());
            }

            @Override
            public void failed(Throwable exc, ByteBuffer attachment) {
              System.err.println(
                  Thread.currentThread().getName() + " -- Read failed: " + exc.getMessage());
            }
          };

      System.out.println(Thread.currentThread().getName() + " -- Async read start");
      asyncFileChannel.read(
          buf, /* byteBuffer */
          position, /* position */
          buf, /* attachment */
          completionHandler /* completionHandler */);
      System.out.println(Thread.currentThread().getName() + " -- Async read end");

      Runtime.getRuntime()
          .addShutdownHook(
              new Thread(
                  () -> {
                    System.out.println("Graceful shutdown");
                  }));

      System.in.read();
    } catch (IOException e) {
      System.err.println(e.getMessage());
    }
  }
}
