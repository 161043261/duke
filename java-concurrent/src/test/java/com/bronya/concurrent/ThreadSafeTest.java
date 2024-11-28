package com.bronya.concurrent;

import org.junit.jupiter.api.Test;

public class ThreadSafeTest {
  private static int sharedInt = 0;

  @Test // mvn -Dtest=ThreadSafeTest#testAtomic test -q
  public void testAtomic() {
    int numThreads = 2;
    int incPerThread = 100_000;
    Thread[] threads = new Thread[numThreads];
    for (int i = 0; i < numThreads; i++) {
      threads[i] =
          new Thread(
              () -> {
                for (int j = 0; j < incPerThread; j++) {
                  sharedInt++; // 非原子操作
                }
              });
      threads[i].start();
    }
    for (var thread : threads) {
      try {
        thread.join();
      } catch (InterruptedException ignored) {
      }
    }
    System.out.println("Shared int: " + sharedInt);
    System.out.println("Expected: " + numThreads * incPerThread);
  }
}
