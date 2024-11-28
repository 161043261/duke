package com.bronya.concurrent;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;

public class ThreadPoolTest {

  @Test
  void testFixedThreadPool() {
    int nThreads = 4;
    ExecutorService fixedThreadPool = Executors.newFixedThreadPool(nThreads);
    AtomicInteger ret = new AtomicInteger();
    Callable<Integer> task =
        () -> {
          Thread.sleep(3000);
          return ret.incrementAndGet();
        };
    List<Future<Integer>> futArr = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      Future<Integer> fut = fixedThreadPool.submit(task);
      futArr.add(fut);
    }
    for (var fut : futArr) {
      try {
        System.out.println("Async task returns: " + fut.get());
      } catch (InterruptedException | ExecutionException ignored) {
      }
    }
    fixedThreadPool.shutdown();
  }

  @Test
  void testThreadPoolExecutor() {
    var nProcessors = Runtime.getRuntime().availableProcessors();
    // ! CPU 密集型
    var corePoolSize = nProcessors + 1;
    var maxPoolSize = nProcessors * 2;
    // ! IO 密集型
    // var corePoolSize = 2 * nProcessors;
    // var maxPoolSize = 2 * nProcessors + 1;
    System.out.println("corePoolSize: " + corePoolSize + ", maxPoolSize: " + maxPoolSize);
    ThreadPoolExecutor threadPoolExecutor =
        new ThreadPoolExecutor(
            corePoolSize, maxPoolSize, 10L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(1000));
    AtomicInteger ret = new AtomicInteger();
    Callable<Integer> task =
        () -> {
          Thread.sleep(3000);
          return ret.incrementAndGet();
        };
    List<Future<Integer>> futArr = new ArrayList<>();
    for (int i = 0; i < 100; i++) {
      Future<Integer> fut = threadPoolExecutor.submit(task);
      futArr.add(fut);
    }
    for (var fut : futArr) {
      try {
        System.out.println("Async task returns: " + fut.get());
      } catch (InterruptedException | ExecutionException ignored) {
      }
    }
    threadPoolExecutor.shutdown();
  }

  @Test
  void testScheduledThreadPoolExecutor() {
    var scheduledThreadPoolExecutor =
        new ScheduledThreadPoolExecutor(1, /* corePoolSize */ Executors.defaultThreadFactory());
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    AtomicInteger atomicInt = new AtomicInteger();
    scheduledThreadPoolExecutor.scheduleWithFixedDelay(
        () -> {
          System.out.println(dateFormat.format(new Date()));
          System.out.println("atomicInt: " + atomicInt.incrementAndGet());
        },
        1,
        1,
        TimeUnit.SECONDS);

    try {
      Thread.sleep(10_000);
    } catch (InterruptedException ignored) {
    }
  }
}
