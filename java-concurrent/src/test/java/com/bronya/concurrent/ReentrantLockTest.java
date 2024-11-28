package com.bronya.concurrent;

import java.util.concurrent.locks.ReentrantLock;
import org.junit.jupiter.api.Test;

public class ReentrantLockTest {
  // 可重入锁默认非公平锁
  private static final ReentrantLock reentrantLock = new ReentrantLock(/* true */ );
  private static int count = 0;

  @Test // mvn test -Dtest=ReentrantLockTest#testReentrantLock -q
  public void testReentrantLock() {
    Thread t1 =
        new Thread(
            () -> {
              for (int i = 0; i < 10_000; i++) {
                reentrantLock.lock(); // 加可重入锁
                try {
                  count++;
                } finally {
                  // 可重入锁必须在 finally 块中解锁
                  reentrantLock.unlock(); // 保证解锁
                }
              }
            });
    Thread t2 =
        new Thread(
            () -> {
              for (int i = 0; i < 10_000; i++) {
                reentrantLock.lock(); // 加可重入锁
                try {
                  count++;
                  if (i == 3) {
                    throw new RuntimeException("I am a runtime exception");
                  }
                } catch (RuntimeException e) {
                  System.out.println(e.getMessage());
                } finally {
                  // 可重入锁必须在 finally 块中解锁
                  reentrantLock.unlock(); // 保证解锁
                }
              }
            });
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println(count);
  }
}
