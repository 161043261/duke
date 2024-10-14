package com.bronya.concurrent;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.locks.ReentrantLock;
import org.junit.jupiter.api.Test;

// 生产者-消费者问题
// 1. 使用 Object 对象的 wait/notify 等待/唤醒方法解决生产者-消费者问题
// 2. 使用 Condition 对象的 await/signal 等待/唤醒方法解决生产者-消费者问题
// 3. 使用 BlockingQueue 阻塞队列（类似 chan 通道）解决生产者-消费者问题
public class ProducerConsumerTest {
  static boolean flag = true; // 预防过早唤醒

  @Test
  void testEarlyNotify() {
    var mut = ProducerConsumerTest.class;
    Thread waiter =
        new Thread(
            () -> {
              synchronized (mut) {
                System.out.println(Thread.currentThread().getName() + ": Waiting...");
                while (flag) {
                  try {
                    mut.wait();
                  } catch (InterruptedException ignored) {
                  }
                }
                System.out.println(Thread.currentThread().getName() + ": Waken up!");
              }
            });
    Thread notifier =
        new Thread(
            () -> {
              synchronized (mut) {
                System.out.println(Thread.currentThread().getName() + ": Notify~");
                mut.notifyAll();
                flag = false;
              }
            });
    notifier.start(); // 过早唤醒
    try {
      Thread.sleep(3000);
      waiter.start();
      notifier.join();
      waiter.join();
    } catch (InterruptedException ignored) {
    }
  }

  @Test
  void testCondChange() {
    final var strArr /* mut */ = new ArrayList<String>();
    final var mut = strArr;
    Runnable consume =
        () -> {
          synchronized (mut) {
            while /* 不可以使用 if，预防 str.isEmpty(); 等待条件改变，导致抛出异常 */ (strArr.isEmpty()) {
              System.out.println(
                  Thread.currentThread().getName() + " [x] Array is empty, waiting...");
              try {
                mut.wait();
              } catch (InterruptedException ignored) {
              }
              System.out.println(
                  Thread.currentThread().getName() + " [o] Array is not empty, waken up!");
            }
            String elem = strArr.removeFirst(); // 等价于 strArr.remove(0);
            System.out.println(
                Thread.currentThread().getName() + " <== Consumer is removing data: " + elem);
          }
        };

    Thread producer =
        new Thread(
            () -> {
              try {
                Thread.sleep(3000);
              } catch (InterruptedException ignored) {
              }
              synchronized (mut) {
                var elem = "Duke";
                strArr.add(elem);
                System.out.println(
                    Thread.currentThread().getName() + " ==> Producer is adding data: " + elem);
                mut.notifyAll();
              }
            },
            "producer");

    new Thread(consume, "consumer1").start();
    new Thread(consume, "consumer2").start();
    producer.start();

    try {
      producer.join();
    } catch (InterruptedException ignored) {
    }
  }

  // 1. 使用 Object 对象的 wait/notify 等待/唤醒方法解决生产者-消费者问题
  @Test
  void testWaitNotifyAll() {
    var numList = new LinkedList<Integer>();
    var cap = 2;
    var mut = numList;

    Runnable produce =
        () -> {
          while (true) {
            synchronized (mut) {
              while (numList.size() == cap) { // 缓冲区满
                System.out.println(
                    Thread.currentThread().getName() + " [x] List is full, waiting...");
                try {
                  mut.wait();
                } catch (InterruptedException ignored) {
                }
                System.out.println(
                    Thread.currentThread().getName() + " [o] List is writable, waken up!");
              }
              try {
                Thread.sleep(3000);
              } catch (InterruptedException ignored) {
              }
              Random rand = new Random();
              var elem = rand.nextInt(0, 10);
              System.out.println(
                  Thread.currentThread().getName() + " ==> Producer is adding data: " + elem);
              numList.add(elem);
              mut.notifyAll();
            }
          } // while
        };

    Runnable consume =
        () -> {
          while (true) {
            synchronized (mut) {
              while (numList.isEmpty()) { // 缓冲区空
                System.out.println(
                    Thread.currentThread().getName() + " [x] List is empty, waiting...");
                try {
                  mut.wait();
                } catch (InterruptedException ignored) {
                }
                System.out.println(
                    Thread.currentThread().getName() + " [o] List is readable, waken up!");
              }
              try {
                Thread.sleep(3000);
              } catch (InterruptedException ignored) {
              }
              var elem = numList.removeFirst();
              System.out.println(
                  Thread.currentThread().getName() + " <== Consumer is removing data: " + elem);
              mut.notifyAll();
            }
          } // while
        };

    try (var fixThreadPool = Executors.newFixedThreadPool(6)) {
      for (int i = 0; i < 3; i++) {
        fixThreadPool.submit(produce);
      }
      for (int i = 0; i < 3; i++) {
        fixThreadPool.submit(consume);
      }
    }
  }

  // 2. 使用 Condition 对象的 await/signal 等待/唤醒方法解决生产者-消费者问题
  @Test
  void testAwaitSignalAll() {
    var numList = new LinkedList<Integer>();
    var cap = 2;

    var reentrantLock = new ReentrantLock();
    var writable /* 可读 */ = reentrantLock.newCondition();
    var readable /* 可写 */ = reentrantLock.newCondition();

    Runnable produce =
        () -> {
          while (true) {
            reentrantLock.lock();
            try {
              while (numList.size() == cap) { // 缓冲区满
                System.out.println(
                    Thread.currentThread().getName() + " [x] List is full, waiting...");
                writable.await();
                System.out.println(
                    Thread.currentThread().getName() + " [o] List is writable, waken up!");
              }
              Thread.sleep(3000);
              Random rand = new Random();
              var elem = rand.nextInt(0, 10);
              System.out.println(
                  Thread.currentThread().getName() + " ==> Producer is adding data: " + elem);
              numList.add(elem);
              readable.signalAll();
            } catch (InterruptedException ignored) {
            } finally {
              reentrantLock.unlock();
            }
          } // while
        };

    Runnable consume =
        () -> {
          while (true) {
            reentrantLock.lock();
            try {
              while (numList.isEmpty()) { // 缓冲区空
                System.out.println(
                    Thread.currentThread().getName() + " [x] List is empty, waiting...");
                readable.await();
                System.out.println(
                    Thread.currentThread().getName() + " [o] List is readable, waken up!");
              }
              Thread.sleep(3000);
              Integer elem = numList.removeFirst();
              System.out.println(
                  Thread.currentThread().getName() + " <== Consumer is removing data: " + elem);
              writable.signalAll();
            } catch (InterruptedException ignored) {
            } finally {
              reentrantLock.unlock();
            }
          } // while
        };

    try (var fixThreadPool = Executors.newFixedThreadPool(6)) {
      for (int i = 0; i < 3; i++) {
        fixThreadPool.submit(produce);
      }
      for (int i = 0; i < 3; i++) {
        fixThreadPool.submit(consume);
      }
    }
  }

  // 3. 使用 BlockingQueue 阻塞队列（类似 chan 通道）解决生产者-消费者问题
  @Test
  void testBlockingQueue() {
    var linkedBlockingQueue = new LinkedBlockingQueue<Integer>();

    Runnable produce =
        () -> {
          while (true) {
            try {
              Thread.sleep(3000);
              var rand = new Random();
              int elem = rand.nextInt(0, 10);
              System.out.println(
                  Thread.currentThread().getName() + " ==> Producer is putting data: " + elem);
              linkedBlockingQueue.put(elem);
            } catch (InterruptedException ignored) {
            }
          }
        };

    Runnable consume =
        () -> {
          while (true) {
            try {
              Thread.sleep(3000);
              Integer elem = linkedBlockingQueue.take();
              System.out.println(
                  Thread.currentThread().getName() + " <== Consumer is taking data: " + elem);
            } catch (InterruptedException ignored) {
            }
          }
        };

    try (var fixThreadPool = Executors.newFixedThreadPool(6)) {
      for (int i = 0; i < 3; i++) {
        fixThreadPool.submit(produce);
      }
      for (int i = 0; i < 3; i++) {
        fixThreadPool.submit(consume);
      }
    }
  }
}
