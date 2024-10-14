package com.bronya.concurrent;

import org.junit.jupiter.api.Test;

public class SynchronizedTest {

  @Test // mvn test -Dtest=SynchronizedTest#testClass -q
  public void testClass() {
    var obj = new SynchronizedTest();
    // ? 通配符 wildcard，表示未知类型
    // ? extends T 上限通配符，表示未知类型是 T 或 T 的子类
    // ? super T 下限通配符，表示未知类型是 T 或 T 的父类
    Class<?> clazz = obj.getClass();
    System.out.println(clazz); // class com.bronya.concurrent.SynchronizedTest
  }

  @Test // mvn test -Dtest=SynchronizedTest#testSyncMethod -q
  public void testSyncMethod() {
    var test = new SyncMethodTest();
    Thread t1 = new Thread(test);
    Thread t2 = new Thread(test);
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("Shared int: " + SyncMethodTest.sharedInt);
  }

  @Test // mvn test -Dtest=SynchronizedTest#testSyncStaticMethod -q
  public void testSyncStaticMethod() {
    Thread t1 = new Thread(new SyncStaticMethodTest());
    Thread t2 = new Thread(new SyncStaticMethodTest());
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("Shared int: " + SyncStaticMethodTest.sharedInt);
  }

  @Test // mvn test -Dtest=SynchronizedTest#testSyncCodeBlock -q
  public void testSyncCodeBlock() {
    Thread t1 = new Thread(new SyncCodeBlockTest());
    Thread t2 = new Thread(new SyncCodeBlockTest());
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("Shared int: " + SyncCodeBlockTest.sharedInt);
  }

  @Test // mvn test -Dtest=SynchronizedTest#testSyncReentrant -q
  public void testSyncReentrant() {
    var test = new SyncReentrantTest();
    Thread t1 = new Thread(test);
    Thread t2 = new Thread(test);
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("Shared int: " + SyncReentrantTest.sharedInt);
  }

  private class SyncMethodTest implements Runnable {
    static int sharedInt = 0;

    // ! 同步方法，使用当前对象 this 作为互斥锁
    public synchronized void syncMethod() {
      sharedInt++;
    }

    @Override
    public void run() {
      for (int i = 0; i < 1_000_000; i++) {
        syncMethod(); // synchronized
      }
    }
  }

  private class SyncStaticMethodTest implements Runnable {
    static int sharedInt = 0;

    // ! 同步静态方法，使用类的 Class 对象作为互斥锁
    public static synchronized void syncStaticMethod() {
      sharedInt++;
    }

    @Override
    public void run() {
      for (int i = 0; i < 1_000_000; i++) {
        syncStaticMethod(); // synchronized
      }
    }
  }

  private class SyncCodeBlockTest implements Runnable {
    static final Object obj = new Object();
    static int sharedInt = 0;

    @Override
    public void run() {
      for (int i = 0; i < 1_000_000; i++) {
        // ! 同步代码块，可以使用任意对象作为互斥锁
        synchronized (obj) {
          sharedInt++;
        }
      }
    }
  }

  private class SyncReentrantTest implements Runnable {
    static int sharedInt = 0;

    @Override
    public void run() {
      for (int i = 0; i < 1_000_000; i++) {
        // 同步代码块，使用当前对象 this 作为互斥锁
        synchronized (this) {
          sharedInt++;
          incSharedInt();
        }
      }
    }

    // 同步方法，使用当前对象 this 作为互斥锁（重入）
    private synchronized void incSharedInt() {
      sharedInt--;
    }
  }
}
