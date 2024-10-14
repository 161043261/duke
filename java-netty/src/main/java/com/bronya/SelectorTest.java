package com.bronya;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

// selector 基于 epoll 水平触发
// mvn dependency:build-classpath
public class SelectorTest {
  public static void main(String[] args) {
    var waitGroup = new CountDownLatch(2);

    var server =
        new Thread(
            () -> {
              try (ServerSocketChannel listener = ServerSocketChannel.open();
                  // 创建 selector 多路复用器，调度多个 channel
                  Selector selector = Selector.open()) {

                listener.bind(new InetSocketAddress(/* "0.0.0.0" wildcard address */ 3261));
                listener.configureBlocking(false);

                // * SelectionKey.OP_ACCEPT  有新连接可接受时触发
                // * SelectionKey.OP_CONNECT 有新连接可建立时触发
                // * SelectionKey.OP_READ    有新数据可读时触发
                // * SelectionKey.OP_WRITE   有新数据可写时触发

                // ! register 方法：向 selector 中注册 channel
                // selector 关注 listener 的 OP_ACCEPT 事件
                SelectionKey listenerKey = listener.register(selector, 0, null);
                ///////////////////////// OP_ACCEPT /////////////////////////
                listenerKey.interestOps(SelectionKey.OP_ACCEPT);
                // 等价于 listener.register(selector, SelectionKey.OP_ACCEPT);

                while (!Thread.currentThread().isInterrupted()) {
                  // select()             阻塞直到有事件触发
                  // select(long timeout) 阻塞直到有事件触发，或超时
                  // selectNow()          非阻塞
                  // 选择一组可接收连接、可建立连接、可读、可写的（已注册）通道对应的键
                  // 返回被选择的键的数量
                  int nKeys = selector.select();
                  assert nKeys > 0;

                  // int nEventKeys = selector.selectNow();
                  System.out.println("[server] Number of selected keys: " + nKeys);

                  // selector.selectedKeys();
                  // 返回被选择的键的集合 selectionKeys
                  Set<SelectionKey> selectionKeys = selector.selectedKeys();
                  Iterator<SelectionKey> iter = selectionKeys.iterator();

                  while (iter.hasNext()) {
                    SelectionKey key = iter.next();

                    ///////////////////////// Acceptable /////////////////////////
                    if (key.isAcceptable()) {
                      System.out.println("[server] Select an acceptable channel");
                      // 获取键对应的事件（通道）
                      var listener_ = (ServerSocketChannel) key.channel();
                      if (listener != listener_) {
                        throw new RuntimeException("[server] Unexpected acceptable channel");
                      }
                      SocketChannel socket = listener.accept();
                      socket.configureBlocking(false);
                      // 将 socket 注册到 selector
                      // selector 关注 socket 的 OP_READ 事件
                      ///////////////////////// OP_READ /////////////////////////
                      SelectionKey socketKey = socket.register(selector, SelectionKey.OP_READ);
                      // 向客户端响应消息
                      var msg = "a".repeat(3000_000);

                      // writeBuf 用于向 socket 中写的缓冲区
                      var writeBuf = Charset.defaultCharset().encode(msg);
                      // var buf = Charset.forName("utf-8").encode(msg);
                      // var buf = StandardCharsets.UTF_8.encode(msg);
                      int nBytes = socket.write(writeBuf);
                      System.out.println("[server] Write " + nBytes + " bytes to client");

                      if (writeBuf.hasRemaining()) {
                        // selector 关注 socket 的 OP_WRITE 事件
                        ///////////////////////// OP_WRITE /////////////////////////
                        socketKey.interestOps(socketKey.interestOps() + SelectionKey.OP_WRITE);
                        socketKey.attach(writeBuf); // 添加附件
                      }
                    }
                    ///////////////////////// Writable /////////////////////////
                    else if (key.isWritable()) {
                      var writeBuf = (ByteBuffer) key.attachment(); // 获取附件
                      var socket_ = (SocketChannel) key.channel();
                      int nBytes = socket_.write(writeBuf);
                      System.out.println("[server] Write " + nBytes + " bytes to client");

                      if (!writeBuf.hasRemaining()) {
                        // selector 不再关注 socket 的 OP_WRITE 事件
                        key.interestOps(key.interestOps() - SelectionKey.OP_WRITE);
                        key.attach(null); // 删除附件
                      }
                    }
                    ///////////////////////// Readable /////////////////////////
                    else if (key.isReadable()) {
                      System.out.println("[server] Select a readable channel");
                      var socket_ = (SocketChannel) key.channel();

                      // readBuf 用于从 socket 中读的缓冲区
                      ByteBuffer readBuf = ByteBuffer.allocate(128);
                      int nBytes = socket_.read(readBuf);
                      if (nBytes == -1) {
                        // cancel 方法
                        // 1. 从 selector 中取消注册该 key 对应的 channel
                        // 2. 从被选择的键的集合 selectionKeys 中移除该 key
                        key.cancel(); // 取消事件
                        socket_.close();
                      } else {
                        // 读 buf 前调用 flip 方法
                        readBuf.flip();
                        System.out.println(
                            "[server] Receive: "
                                + StandardCharsets.UTF_8.decode(readBuf).toString());
                      }
                    }
                    // 事件处理结束
                    // 必须从被选择的键的集合 selectionKeys 中移除该事件的键
                    iter.remove();
                    System.out.println("[server] Remove a key, correspond to a channel");
                  }
                }
              } catch (IOException | RuntimeException e) {
                System.err.println(e.getMessage());
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
              try (
              /* Socket connectDirectly = new Socket("localhost", 3261); */
              SocketChannel socket = SocketChannel.open();
                  Selector selector = Selector.open()) {
                // connectDirectly.getOutputStream().write("Greeting from client".getBytes());
                // connectDirectly.close();
                socket.configureBlocking(false);
                socket.register(selector, SelectionKey.OP_CONNECT | SelectionKey.OP_READ);

                socket.connect(new InetSocketAddress("127.0.0.1", 3261));
                int nBytes = 0;
                while (!Thread.currentThread().isInterrupted()) {
                  int nKeys = selector.select();
                  Iterator<SelectionKey> iter = selector.selectedKeys().iterator();
                  while (iter.hasNext()) {
                    SelectionKey key = iter.next();
                    /* defer */
                    iter.remove();
                    if (key.isConnectable()) {

                      // socket.finishConnect()
                      // Finishes the process of connecting a socket channel
                      socket.finishConnect();
                    } else if (key.isReadable()) {
                      ByteBuffer buf = ByteBuffer.allocate(1 << 20 /* 1024 * 1024 */);
                      nBytes += socket.read(buf);
                      buf.clear();
                      System.err.println("[client] Total read " + nBytes + " bytes from server");
                    }
                  }
                }
              } catch (IOException e) {
                System.err.println(e.getMessage());
              } finally {
                waitGroup.countDown();
                System.out.println(
                    "[client] Is interrupted: " + Thread.currentThread().isInterrupted());
                System.out.println("[client] Waiting for: " + waitGroup.getCount() + " threads");
              }
            });

    server.start();
    try {
      Thread.sleep(1000);
    } catch (InterruptedException ignored) {
      boolean ok = Thread.interrupted();
      assert ok : "Get and clear 'interrupted' failed";
    }
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
