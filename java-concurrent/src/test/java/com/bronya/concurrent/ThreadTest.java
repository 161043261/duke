package com.bronya.concurrent;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import org.junit.jupiter.api.Test;

// ! 创建一个类，继承 Thread 类，重写 run 方法
class ThreadExt extends Thread {

  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      System.out.println(Thread.currentThread().getName() + ", i = " + i);
    }
  }
}

// ! 创建一个类，实现 Runnable 接口，重写 run 方法
class RunnableImpl implements Runnable {

  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      try {
        Thread.sleep(1000 /* ms */);
      } catch (InterruptedException ignored) {
      }
      System.out.println(Thread.currentThread().getName() + ", i = " + i);
    }
  }
}

// ! 创建一个类，实现 Callable 接口，重写 call 方法
class CallableImpl implements Callable<String> {

  @Override
  public String call() throws Exception {
    Thread.sleep(3000);
    return "Honkai: Star Rail";
  }
}

public class ThreadTest {

  private static void task() {
    for (int i = 0; i < 5; i++) {
      System.out.println(Thread.currentThread().getName() + ", i = " + i);
      if (i % 2 == 0) {
        System.out.println(
            Thread.currentThread().getName()
                + " is willing to yield its current use of a processor.");
        // 当前线程愿意放弃使用处理器
        Thread.yield();
      }
    }
  }

  @Test // ! mvn -Dtest=ThreadTest#testThread1 test --quiet
  public void testThread1() {
    var thread = new ThreadExt();
    thread.setName("thread1");
    thread.start();
  }

  @Test // ! mvn -Dtest=ThreadTest#testThread2 test -q
  public void testThread2() {
    var task = new RunnableImpl();
    Thread thread = new Thread(task, "thread2");
    thread.start();
  }

  @Test // ! mvn -Dtest=ThreadTest#testThread3 test -q
  public void testThread3() {
    // 创建异步任务 FutureTask
    var futureTask = new FutureTask<>(new CallableImpl());
    // 启动线程
    new Thread(futureTask).start();
    try {
      // 等待异步任务结束，获取异步任务 futureTask 的返回值
      String retVal = futureTask.get();
      System.out.println(retVal);
    } catch (Exception ignored) {
    }
  }

  @Test // ! mvn -Dtest=ThreadTest#testJoin test -q
  public void testJoin() {
    Thread t1 =
        new Thread(
            () -> {
              try {
                Thread.sleep(3000);
              } catch (InterruptedException ignored) {
              }
              System.out.println("I'm thread1!");
            },
            "thread1");
    t1.start();
    try {
      t1.join(); // 主线程等待 t1 线程运行结束
    } catch (InterruptedException ignored) {
    }
    new Thread(
            () -> {
              System.out.println("I'm thread2!");
            },
            "thread2")
        .start();
    new Thread(
            () -> {
              System.out.println("I'm thread3!");
            },
            "thread3")
        .start();
  }

  @Test // ! mvn -Dtest=ThreadTest#testDaemon test -q
  public void testDaemon() {
    Thread t1 =
        new Thread(
            () -> {
              try {
                Thread.sleep(3000);
                System.out.println("I'm " + Thread.currentThread().getName());
              } catch (InterruptedException ignored) {
              }
            },
            "Daemon concurrent");
    t1.setDaemon(true);
    t1.start();

    new Thread(
            () -> {
              try {
                Thread.sleep(1000);
                System.out.println("I'm " + Thread.currentThread().getName());
              } catch (InterruptedException ignored) {
              }
            },
            "Normal concurrent")
        .start();
    System.out.println("I'm Main concurrent");
  }

  @Test // ! mvn -Dtest=ThreadTest#testYield test -q
  public void testYield() {
    Thread t1 = new Thread(ThreadTest::task, "t1");
    Thread t2 = new Thread(ThreadTest::task, "t2");
    t1.start();
    t2.start();
  }
}
