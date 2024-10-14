package com.bronya;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

// 按行分隔符 \n 拆分 TCP 数据包
public class PacketSplitTest {
  private static void split(ByteBuffer buf) {
    // 读 buf 前调用 flip 方法
    buf.flip();
    for (int bound = 0; bound < buf.limit(); bound++) {
      // 找到一个 TCP 数据包
      if (buf.get(bound) == '\n') {
        int len = bound + 1 - buf.position();
        ByteBuffer packet = ByteBuffer.allocate(len);
        for (int i = 0; i < len; i++) {
          packet.put(buf.get());
        }
        // 读 packet 前调用 flip 方法
        packet.flip();
        System.out.println(
            "[server] Received: " + StandardCharsets.UTF_8.decode(packet).toString());
      }
    }
    buf.compact();
  }

  public static void main(String[] args) {
    var waitGroup = new CountDownLatch(2);

    var server =
        new Thread(
            () -> {
              try (Selector selector = Selector.open();
                  ServerSocketChannel listener = ServerSocketChannel.open()) {
                listener.configureBlocking(false);
                SelectionKey listenerKey = listener.register(selector, 0, null);
                listenerKey.interestOps(SelectionKey.OP_ACCEPT);
                listener.bind(new InetSocketAddress(3261));
                while (!Thread.currentThread().isInterrupted()) {
                  int nKeys = selector.selectNow();
                  if (nKeys == 0) {
                    continue;
                  }
                  assert nKeys > 0;
                  Iterator<SelectionKey> iter = selector.selectedKeys().iterator();
                  while (iter.hasNext()) {
                    SelectionKey key = iter.next();
                    /* defer */
                    iter.remove();
                    if (key.isAcceptable()) {
                      var listener_ = (ServerSocketChannel) key.channel();
                      if (listener != listener_) {
                        throw new RuntimeException("[server] Unexpected acceptable channel");
                      }
                      SocketChannel socket = listener_.accept();
                      socket.configureBlocking(false);
                      ByteBuffer buf = ByteBuffer.allocate(16);
                      SelectionKey socketKey =
                          socket.register(selector, SelectionKey.OP_READ, buf /* attachment */);
                    } else if (key.isReadable()) {
                      var socket_ = (SocketChannel) key.channel();
                      var buf = (ByteBuffer) key.attachment(); // 获取附件
                      int nBytes = socket_.read(buf);
                      if (nBytes == -1) {
                        key.cancel();
                        socket_.close();
                      } else {
                        split(buf);
                        if (buf.position() == buf.limit()) {
                          System.out.println("[server] Buffer reallocated");
                          ByteBuffer newBuf = ByteBuffer.allocate(buf.capacity() * 2);
                          // 读 buf 前调用 flip 方法
                          buf.flip();
                          newBuf.put(buf);
                          key.attach(newBuf);
                        }
                      }
                    }
                  }
                }
              } catch (IOException e) {
                System.err.println("[server] Error: " + e.getMessage());
              } finally {
                waitGroup.countDown();
                System.out.println(
                    "[server] Is interrupted: " + Thread.currentThread().isInterrupted());
                System.out.println("[server] Waiting for: " + waitGroup.getCount() + " threads");
              }
            });

    var client =
        new Thread(
            () -> {
              try (SocketChannel socket = SocketChannel.open()) {
                Thread.sleep(1000);
                socket.connect(new InetSocketAddress("127.0.0.1", 3261));
                SocketAddress localAddr = socket.getLocalAddress();
                SocketAddress remoteAddr = socket.getRemoteAddress();
                System.out.println("[client] Local address: " + localAddr);
                System.out.println("[client] Remote address: " + remoteAddr);
                socket.write(StandardCharsets.UTF_8.encode("01234\n56789\nabcdef"));
                socket.write(Charset.defaultCharset().encode("0123456789abcdef\n"));
                while (!Thread.currentThread().isInterrupted())
                  ;
              } catch (IOException | InterruptedException e) {
                System.err.println("[client] Error: " + e.getMessage());
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
      boolean expectZero = waitGroup.await(10, TimeUnit.SECONDS);
      assert !expectZero : "Unexpect count";
      server.interrupt();
      client.interrupt();
      System.out.println("[main] Server is interrupted: " + server.isInterrupted());
      System.out.println("[main] Client is interrupted: " + client.isInterrupted());
      System.out.println("[main] Waiting for: " + waitGroup.getCount() + " threads");
    } catch (InterruptedException e) {
      System.err.println(e.getMessage());
    }
  }
}
