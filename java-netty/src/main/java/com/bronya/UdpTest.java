package com.bronya;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.DatagramChannel;
import java.nio.charset.StandardCharsets;

public class UdpTest {

  public static void main(String[] args) {

    var udpServer = new Thread(() -> {
      try (DatagramChannel endpoint = DatagramChannel.open()) {
        endpoint.socket().bind(new InetSocketAddress("127.0.0.1", 3261));
        System.out.println("[server] Waiting for connection...");
        ByteBuffer buf = ByteBuffer.allocate(32);
        endpoint.receive(buf);
        // 读 buf 前调用 flip 方法
        buf.flip();
        System.out.println(StandardCharsets.UTF_8.decode(buf));
      } catch (IOException e) {
        System.err.println(e.getMessage());
      }
    });

    var udpClient = new Thread(() -> {
      try (DatagramChannel endpoint = DatagramChannel.open()) {
        InetSocketAddress srvAddr = new InetSocketAddress("127.0.0.1", 3261);
        endpoint.send(
          ByteBuffer.wrap("Top of the World".getBytes()), srvAddr);
      } catch (IOException e) {
        System.err.println(e.getMessage());
      }
    });

    udpServer.start();
    try {
      Thread.sleep(1000);
      udpClient.start();
      udpServer.join();
      udpClient.join();
    } catch (InterruptedException ignored) {
    }
  }
}
