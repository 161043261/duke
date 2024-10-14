package com.bronya.concurrent;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import org.junit.jupiter.api.Test;

public class ConditionTest {
  // 可重入锁 Reentrant Lock: 一个线程获取锁后，该线程再次获取该锁时不会被阻塞，可以重复加锁
  // 类似 c++ std::recursive_mutex
  private static ReentrantLock reentrantLock = new ReentrantLock();
  private static Condition condition = reentrantLock.newCondition();
  private static volatile boolean flag = false;

  static class Waiter implements Runnable {

    @Override
    public void run() {
      reentrantLock.lock(); // 可重入锁 reentrantLock 加锁
      try {
        while (!flag) {
          System.out.println(Thread.currentThread().getName() + " is waiting");
          try {
            condition.await();
          } catch (InterruptedException ignored) {
          }
          System.out.println(Thread.currentThread().getName() + " has been waken up");
        }
      } finally {
        reentrantLock.unlock(); // 可重入锁 reentrantLock 解锁
      }
    }
  }

  static class Signer implements Runnable {

    @Override
    public void run() {
      try {
        Thread.sleep(3000);
      } catch (InterruptedException ignored) {
        // 睡眠 1s 方便 blockThread 线程获取锁
      }
      reentrantLock.lock(); // 可重入锁 reentrantLock 加锁
      try {
        flag = true;
        condition.signalAll();
      } finally {
        reentrantLock.unlock(); // 可重入锁 reentrantLock 解锁
      }
    }
  }

  // mvn test -Dtest=ConditionTest#testCondition -q
  @Test
  public void testCondition() throws InterruptedException {
    var waiter = new Thread(new Waiter(), "Waiter");
    var signer = new Thread(new Signer(), "Signer");
    waiter.start();
    signer.start();
    waiter.join();
    signer.join();
  }
}
