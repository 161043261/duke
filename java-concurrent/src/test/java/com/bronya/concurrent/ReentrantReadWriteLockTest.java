package com.bronya.concurrent;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReentrantReadWriteLockTest {
  // 应用：使用 ReentrantReadWriteLock 实现并发安全的计数器
  class ThreadSafeCounter {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock(/* true */ );
    private final Lock readLock = rwLock.readLock(); // 共享读锁
    private final Lock writeLock = rwLock.writeLock(); // 独占写锁
    private int count = 0; // 共享数据

    public int getCount() {
      readLock.lock();
      try {
        return count;
      } finally {
        readLock.unlock();
      }
    }

    public void increment() {
      writeLock.lock();
      try {
        count++;
      } finally {
        writeLock.unlock();
      }
    }
  }
}
