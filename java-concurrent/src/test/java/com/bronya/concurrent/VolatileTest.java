package com.bronya.concurrent;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.junit.jupiter.api.Test;

// Atomicity, Visibility, Ordering
// ! volatile 可以保证有序性、可见性，不能保证原子性
public class VolatileTest {
  // 使用 volatile 禁止指令重排序
  /* volatile */ int a, b, x, y;
  volatile int num = 0;
  volatile boolean stop = false;

  // ! volatile 可以保证有序性
  @Test // mvn test -Dtest=VolatileTest#testOrdering -q
  public void testOrdering() {
    try (var threadPool = Executors.newFixedThreadPool(10)) {
      long count = 0;
      for (; true; count++) {
        a = 0;
        b = 0;
        x = 0;
        y = 0;
        // var unsafe = Unsafe.getUnsafe();
        Future<Integer> future1 =
            threadPool.submit(
                () -> {
                  a = 1;
                  // unsafe.fullFence(); 使用内存屏障禁止指令重排序
                  x = b; // expect x = 0;
                  return x;
                }); // 线程 t1

        Future<Integer> future2 =
            threadPool.submit(
                () -> {
                  b = 1;
                  // unsafe().fullFence(); 使用内存屏障禁止指令重排序
                  y = a; // expect y = 1;
                  return y;
                }); // 线程 t2

        // ! 指令重排序
        // t1       t1       t1       t1
        // a = 1;   a = 1;   x = b;   x = b;
        // x = b;   x = b;   a = 1;   a = 1;
        // t2       t2       t2       t2
        // b = 1;   y = a;   b = 1;   y = a;
        // y = a;   b = 1;   y = a;   b = 1;
        // (0, 1)   (0, 1)   (0, 1)   (0, 0)

        try {
          System.out.print("x = " + future1.get() + ", ");
          System.out.print("y = " + future2.get() + "\n");
        } catch (InterruptedException | ExecutionException ignored) {
          threadPool.shutdown();
          break;
        }
        if (x == 0 && y == 0) {
          threadPool.shutdown();
          break;
        }
      }
      System.out.println("count = " + count);
    }
  }

  // ! volatile 不能保证原子性
  // 原子性：一个或多个操作要么全部执行成功，要么全部不执行
  @Test // mvn test -Dtest=VolatileTest#testAtomicity -q
  public void testAtomicity() {
    var t1 =
        new Thread(
            () -> {
              for (int i = 0; i < 10_000; i++) {
                num++; // 非原子操作：读 num、+1、写 num
              }
            });
    var t2 =
        new Thread(
            () -> {
              for (int i = 0; i < 10_000; i++) {
                num++; // 非原子操作：读 num、+1、写 num
              }
            });
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("num: " + num);
  }

  // ! volatile 可以保证可见性
  // 可见性：一个线程修改一个共享变量后，其他线程立刻可见
  @Test // mvn test -Dtest=VolatileTest#testVisibility -q
  public void testVisibility() {
    Thread t =
        new Thread(
            () -> {
              System.out.println(
                  "Start at "
                      + LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));
              while (!stop) {}
              System.out.println(
                  "Stop at " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));
            });
    t.start();

    // try {
    //   t.join(); // 主线程阻塞，直到 t 线程运行结束
    // } catch (InterruptedException ignored) {
    // }

    try {
      Thread.sleep(3000);
    } catch (InterruptedException ignored) {
    }
    stop = true;

    try {
      t.join(); // 主线程阻塞，直到 t 线程运行结束
    } catch (InterruptedException ignored) {
    }
  }
}

// 应用：使用双重检查锁 Double-checked Lock 实现单例模式
class Singleton {
  // 单例对象 instance
  private static volatile Singleton instance = null;
  // 成员变量 money
  private int money = 10_000;

  // 私有构造方法以禁止使用 new 创建对象
  private Singleton() {}

  // 使用双重检查锁实现单例模式
  public static Singleton getInstance() {
    if (instance == null) {
      // synchronized 加互斥锁
      synchronized (Singleton.class /* 单例 */) {
        if (instance == null) {
          instance = new Singleton();
        }
      }
    }
    return instance;
  }

  // 成员方法 getMoney
  public int getMoney() {
    money++;
    return money;
  }
}
