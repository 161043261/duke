package com.bronya;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ThreadLocalRandom;

// mvn package -DskipTests
// cd target
// java -jar TcpConn$Server-jar-with-dependencies.jar
// java -jar TcpConn$Client1-jar-with-dependencies.jar
// java -jar TcpConn$Client2-jar-with-dependencies.jar
public class TcpConn {
  interface Lambda {
    int compute(int x, int y);
  }

  static class Server {
    public static void main(String[] args) {
      // try with resources
      try (ServerSocket serverSocket = new ServerSocket(3333)) {
        while (true) {
          Socket socket;
          try {
            socket = serverSocket.accept();
          } catch (IOException e) {
            System.err.println(e.getMessage());
            return;
          }
          // 虚拟线程
          Thread.ofVirtual()
              .start(
                  () -> {
                    try {
                      var inputStream = new ObjectInputStream(socket.getInputStream());
                      Lambda fn = (Lambda) inputStream.readObject();

                      int x = ThreadLocalRandom.current().nextInt(10);
                      int y = ThreadLocalRandom.current().nextInt(10);
                      System.out.printf(
                          "%s %d operation %d = %d%n",
                          socket.getRemoteSocketAddress().toString(), x, y, fn.compute(x, y));
                    } catch (IOException | ClassNotFoundException e) {
                      System.err.println(e.getMessage());
                    }
                  });
        }
      } catch (IOException e) {
        System.err.println(e.getMessage());
        return;
      }
    }
  }

  static class Client1 {
    public static void main(String[] args) {
      // try with resources
      try (Socket socket = new Socket("127.0.0.1", 3333)) {
        Lambda fn = (Lambda & Serializable) (x, y) -> x + y;
        var outputStream = new ObjectOutputStream(socket.getOutputStream());
        outputStream.writeObject(fn);
        outputStream.flush();
      } catch (IOException e) {
        System.err.println(e.getMessage());
      }
    }
  }

  static class Client2 {
    public static void main(String[] args) {
      // try with resources
      try (Socket socket = new Socket("127.0.0.1", 3333)) {
        Lambda fn = (Lambda & Serializable) (x, y) -> x - y;
        var outputStream = new ObjectOutputStream(socket.getOutputStream());
        outputStream.writeObject(fn);
        outputStream.flush();
      } catch (IOException e) {
        System.err.println(e.getMessage());
      }
    }
  }
}
