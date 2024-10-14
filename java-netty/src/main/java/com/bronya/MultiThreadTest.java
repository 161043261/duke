package com.bronya;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;

public class MultiThreadTest {

  public static void main(String[] args) {
    new BossEventLoop().start();

    for (int i = 0; i < 5; i++) {
      new Thread(
              () -> {
                try (Socket socket = new Socket("localhost", 3261)) {
                  socket
                      .getOutputStream()
                      .write("Greeting from client".getBytes(StandardCharsets.UTF_8));
                } catch (IOException e) {
                  System.err.println(e.getMessage());
                }
              })
          .start();
    }
  }

  static class BossEventLoop implements Runnable {
    private Selector boss;
    // volatile 可以保证有序性、可见性，不能保证原子性
    private volatile boolean isStarted = false;
    private WorkerEventLoop[] workers;
    private final AtomicInteger wId = new AtomicInteger();

    public void start() {
      if (!isStarted) {
        try { // 不能使用 try-with-resources，listener 会随 if 块退出被 gc
          ServerSocketChannel listener = ServerSocketChannel.open();
          listener.bind(new InetSocketAddress("0.0.0.0", 3261));
          System.out.println("Server listening on port 3261");
          listener.configureBlocking(false);
          boss = Selector.open();
          SelectionKey listenerKey = listener.register(boss, 0, null);
          listenerKey.interestOps(SelectionKey.OP_ACCEPT);

          var nCPU = Runtime.getRuntime().availableProcessors();
          System.out.println("Number of CPU(s): " + nCPU);
          workers = new WorkerEventLoop[Math.min(5, nCPU)];
          for (var i = 0; i < workers.length; i++) {
            workers[i] = new WorkerEventLoop(i /* id */);
          }

          new Thread(this, "Boss").start(); // -> exec BossEventLoop::run()
          System.out.println("Boss thread starts executing the event loop");
          isStarted = true;
        } catch (IOException e) {
          System.err.println(e.getMessage());
        }
      }
    }

    @Override
    public void run() {
      while (true) {
        try {
          int nKeys = boss.select();
          for (SelectionKey key : boss.selectedKeys()) {
            if (key.isAcceptable()) {
              var listener = (ServerSocketChannel) key.channel();
              SocketChannel socket = listener.accept();
              socket.configureBlocking(false);
              // socket.write(ByteBuffer.wrap("Greeting from server".getBytes()));
              workers[wId.getAndIncrement() % workers.length].start(socket);
            }
          }
        } catch (IOException e) {
          System.err.println(e.getMessage());
        }
      }
    }
  }

  static class WorkerEventLoop implements Runnable {
    private Selector worker;
    private volatile boolean isStarted = false;
    private final int id;
    private final ConcurrentLinkedQueue<Runnable> taskQueue = new ConcurrentLinkedQueue<>();

    public WorkerEventLoop(int id) {
      this.id = id;
    }

    public void start(SocketChannel socket) throws IOException {
      if (!isStarted) {
        worker = Selector.open();
        new Thread(this, "worker-" + id).start();
        isStarted = true;
      }

      taskQueue.add(
          () -> {
            try {
              SelectionKey socketKey = socket.register(worker, 0, null);
              socketKey.interestOps(SelectionKey.OP_READ);
              int nKeys = worker.selectNow();
            } catch (IOException e) {
              System.err.println(e.getMessage());
            }
          });

      worker.wakeup();
    }

    @Override
    public void run() {
      while (true) {
        try {
          int nKeys = worker.select();
          assert nKeys > 0;
          Runnable task = taskQueue.poll();
          if (task != null) {
            task.run();
          }
          Set<SelectionKey> selectionKeys = worker.selectedKeys();
          Iterator<SelectionKey> iter = selectionKeys.iterator();
          while (iter.hasNext()) {
            SelectionKey key = iter.next();
            if (key.isReadable()) {
              var socket = (SocketChannel) key.channel();
              ByteBuffer buf = ByteBuffer.allocate(128);
              int nBytes = socket.read(buf);
              if (nBytes == -1) {
                key.cancel();
                // socket.close();
              } else {
                // 读 buf 前调用 flip 方法
                buf.flip();
                System.out.println(
                    Thread.currentThread().getName()
                        + " receives: "
                        + StandardCharsets.UTF_8.decode(buf));
              }
            }
            iter.remove();
          }
        } catch (IOException e) {
          System.err.println(e.getMessage());
        }
      }
    }
  }
}
