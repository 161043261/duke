package com.bronya.concurrent;

import org.junit.jupiter.api.Test;

// 1. 一个线程的 start 方法只能调用一次
//    多次调用 start 方法会抛出 IllegalThreadStateException 异常
// 2. 一个线程运行结束，处于 TERMINATED 状态
//    再次调用 start 方法会抛出 IllegalThreadStateException 异常
public class ThreadStateTest {
  @Test // ! mvn -Dtest=ThreadStateTest#testNew test -q
  public void testNew() {
    Thread t = new Thread(() -> {});
    System.out.println(t.getState()); // new
  }

  // ! synchronized 等价于对一个方法或代码块加互斥锁
  private synchronized void run_() {
    try {
      Thread.sleep(2000L); // 线程 a 睡眠 2s
    } catch (InterruptedException ignored) {
    }
  }

  // BLOCKED                不会释放已获得的锁
  // WAITING, TIMED_WAITING 会释放已获得的锁

  @Test // ! mvn -Dtest=ThreadStateTest#test__RUNNABLE__BLOCKED test -q
  public void test__RUNNABLE__BLOCKED() {
    // a: RUNNABLE
    // b: BLOCKED
    var threadA = new Thread(this::run_ /* Runnable 对象 */, "a");
    var threadB = new Thread(this::run_ /* Runnable 对象 */, "b");
    threadA.start(); // 启动线程 a（线程 a 可运行）
    // | threadA.start()       | 启动线程 a            | RUNNABLE      |
    // | synchronized          | 线程 a 获取互斥锁成功 |               |
    // | Thread.sleep(2000L)   |                       | TIMED_WAITING |
    // | 未调用 threadA.join() | 主线程终止            |               |
    threadB.start(); // 启动线程 b（线程 b 可运行）
    // | threadB.start()       | 启动线程 b            | RUNNABLE      |
    // | synchronized          | 线程 b 获取互斥锁失败 | BLOCKED       |
    // | 未调用 threadB.join() | 主线程终止            |               |
    System.out.println(threadA.getName() + ": " + threadA.getState());
    System.out.println(threadB.getName() + ": " + threadB.getState());
  }

  @Test // ! mvn -Dtest=ThreadStateTest#test__TIMED_WAITING__BLOCKED test -q
  public void test__TIMED_WAITING__BLOCKED() {
    // a: TIMED_WAITING
    // b: BLOCKED
    var threadA = new Thread(this::run_ /* Runnable 对象 */, "a");
    var threadB = new Thread(this::run_ /* Runnable 对象 */, "b");
    threadA.start();
    try {
      Thread.sleep(1000L); // 主线程睡眠 1s
    } catch (InterruptedException ignored) {
    }
    // | threadA.start()       | 启动线程 a            | RUNNABLE      |
    // | synchronized          | 线程 a 获取互斥锁成功 |               |
    // | Thread.sleep(2000L)   |                       | TIMED_WAITING |
    // | 未调用 threadA.join() | 主线程终止            |               |
    threadB.start();
    // | threadB.start()       | 启动线程 b            | RUNNABLE      |
    // | synchronized          | 线程 b 获取互斥锁失败 | BLOCKED       |
    // | 未调用 threadB.join() | 主线程终止            |               |
    System.out.println(threadA.getName() + ": " + threadA.getState());
    System.out.println(threadB.getName() + ": " + threadB.getState());
  }

  @Test // ! mvn -Dtest=ThreadStateTest#test__WAITING__RUNNABLE test -q
  public void test__WAITING__RUNNABLE() {
    // a: TERMINATED
    // b: TIMED_WAITING
    var threadA = new Thread(this::run_ /* Runnable 对象 */, "a");
    var threadB = new Thread(this::run_ /* Runnable 对象 */, "b");
    threadA.start();
    try {
      threadA.join();
    } catch (InterruptedException ignored) {
    }
    // | threadA.start()       | 启动线程 a            | RUNNABLE      |
    // | synchronized          | 线程 a 获取互斥锁成功 |               |
    // | Thread.sleep(2000L)   |                       | TIMED_WAITING |
    // | threadA.join()        | 主线程等待线程 a 终止 | TERMINATED    |
    threadB.start();
    // | threadB.start()       | 启动线程 b            | RUNNABLE      |
    // | synchronized          | 线程 b 获取互斥锁成功 | BLOCKED       |
    // | 未调用 threadB.join() | 主线程终止            |               |
    System.out.println(threadA.getName() + ": " + threadA.getState());
    System.out.println(threadB.getName() + ": " + threadB.getState());
  }
}
