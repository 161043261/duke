package com.bronya;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class NonBlockedTest {
  public static void main(String[] args) {
    var waitGroup = new CountDownLatch(2);

    var server =
        new Thread(
            () -> {
              ByteBuffer buf = ByteBuffer.allocate(16);
              try (ServerSocketChannel listener = ServerSocketChannel.open()) {
                listener.bind(new InetSocketAddress("0.0.0.0", 3261));
                // 非阻塞 listener
                listener.configureBlocking(false);
                var sockets = new ArrayList<SocketChannel>();
                while (true) {
                  Thread.sleep(1000);
                  System.out.println("Non-blocked -- Listening for new connection...");
                  // 没有新的连接时，accept 方法返回 null
                  SocketChannel socket = listener.accept();
                  if (socket != null) {
                    // 非阻塞 socket
                    socket.configureBlocking(false);
                    sockets.add(socket);
                  }
                  for (var socket_ : sockets) {
                    // 写 buf 前调用 clear 方法：清空脏数据
                    buf.clear();
                    System.out.println("Non-blocked -- Wanna read new packet...");
                    // 没有新的数据时，read 方法返回 0
                    int nBytes = socket_.read(buf);
                    if (nBytes > 0) {
                      // 读 buf 前调用 flip 方法
                      buf.flip();
                      System.out.println(StandardCharsets.UTF_8.decode(buf).toString());
                    }
                  }
                }
              } catch (IOException | InterruptedException e) {
                System.out.println(
                    "[server] Stage1 -- is interrupted: " + Thread.currentThread().isInterrupted());
                // Thread.currentThread().interrupt();
              } finally {
                waitGroup.countDown();
                System.out.println(
                    "[server] Stage2 -- is interrupted: " + Thread.currentThread().isInterrupted());
                System.out.println("[server] Waiting for: " + waitGroup.getCount() + " threads");
              }
            });

    var client =
        new Thread(
            () -> {
              try (SocketChannel socket = SocketChannel.open()) {
                socket.connect(new InetSocketAddress("localhost", 3261));
                // ! 必须检查中断状态 interrupted
                while (!Thread.currentThread().isInterrupted())
                  ;
              } catch (IOException ignored) {
              } finally {
                waitGroup.countDown();
                System.out.println(
                    "[client] Is interrupted: " + Thread.currentThread().isInterrupted());
                System.out.println("[client] Waiting for: " + waitGroup.getCount() + " threads");
              }
            });

    server.start();
    client.start();

    try {
      // waitGroup.await(); // 等待 server, client 线程执行结束...
      boolean expectZero = waitGroup.await(5, TimeUnit.SECONDS); // 等待 5s
      assert !expectZero : "Unexpect count";
      server.interrupt();
      client.interrupt();
      System.out.println("[main] Server is interrupted: " + server.isInterrupted());
      System.out.println("[main] Client is interrupted: " + client.isInterrupted());
    } catch (InterruptedException e) {
      System.err.println(e.getMessage());
    }
  }
}
