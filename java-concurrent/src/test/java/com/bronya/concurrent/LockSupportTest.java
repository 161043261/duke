package com.bronya.concurrent;

import java.util.concurrent.locks.LockSupport;
import org.junit.jupiter.api.Test;

public class LockSupportTest {

  @Test // ! mvn test -Dtest=LockSupportTest#testLockSupport1 -q
  public void testLockSupport1() {
    Thread mainThread = Thread.currentThread();
    Thread subThread =
        new Thread(
            () -> {
              for (int count = 0; count < 10; count++) {
                try {
                  Thread.sleep(1000);
                } catch (InterruptedException ignored) {
                }
                System.out.println("count = " + count);
                if (count == 5) {
                  // 子线程调用 unpark 方法唤醒主线程
                  LockSupport.unpark(mainThread);
                }
              }
            });
    subThread.start();
    // 主线程调用 park 方法，主动等待
    System.out.println("Main concurrent is parking");
    LockSupport.park();
    // 主线程被动唤醒
    System.out.println("Main concurrent has been unparked");
  }

  @Test // ! mvn test -Dtest=LockSupportTest#testLockSupport1 -q
  public void testLockSupport2() {
    Thread subThread =
        new Thread(
            () -> {
              System.out.println("Sub concurrent is parking");
              // 子线程调用 park 方法，主动等待
              LockSupport.park();
              // 子线程被动唤醒
              System.out.println("Sub concurrent has been unparked");
            });
    subThread.start();

    try {
      Thread.sleep(3000); // 主线程睡眠 3s
    } catch (InterruptedException ignored) {
    }
    // 主线程调用 unpark 方法唤醒子线程
    LockSupport.unpark(subThread);
  }

  // 场景：有 3 个线程，一个只打印 A，一个只打印 B，一个只打印 C
  // 令 3 个线程顺序打印
  // A B C
  // A B C
  // ...
  static Thread printerA, printerB, printerC;

  @Test
  public void testApp() {
    printerA =
        new Thread(
            () -> {
              while (true) {
                // printerA 主动等待
                LockSupport.park();
                // printerA 被动唤醒
                System.out.print("A ");
                // printerA 唤醒 printerB
                LockSupport.unpark(printerB);
              }
            });

    printerB =
        new Thread(
            () -> {
              while (true) {
                LockSupport.park();
                System.out.print("B ");
                LockSupport.unpark(printerC);
              }
            });

    printerC =
        new Thread(
            () -> {
              while (true) {
                LockSupport.park();
                System.out.print("C\n");
                LockSupport.unpark(printerA);
              }
            });

    printerA.start();
    printerB.start();
    printerC.start();
    LockSupport.unpark(printerA);
    try {
      printerA.join();
      printerB.join();
      printerC.join();
    } catch (InterruptedException ignored) {
    }
  }
}
