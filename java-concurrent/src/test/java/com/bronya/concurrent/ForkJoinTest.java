package com.bronya.concurrent;

import java.util.ArrayList;
import java.util.concurrent.*;
import org.junit.jupiter.api.Test;

// fork 任务拆分
// join 任务合并

// ! mvn test -Dtest=ForkJoinTest -q
public class ForkJoinTest {

  @Test
  void testForkJoin() {
    class Fib extends RecursiveTask<Integer> {
      final int n;

      Fib(int n) {
        this.n = n;
      }

      @Override
      protected Integer compute() {
        if (n <= 1) {
          return n;
        }
        Fib f1 = new Fib(n - 1);
        f1.fork(); // 任务拆分
        Fib f2 = new Fib(n - 2);
        return f2.compute() + f1.join(); // 任务合并
      }
    }

    int n = 20;
    try (var forkJoinPool = new ForkJoinPool(4)) {
      var fib = new Fib(n);
      Integer ret = forkJoinPool.invoke(fib);
      System.out.printf("Fib(%d) = %d", n, ret);
    }
  }

  static long ceil = 1000_000_000;
  static int parallel = Runtime.getRuntime().availableProcessors();

  // 计算 0 ~ 1000_000_000 的和，单线程
  @Test
  void testSum() {
    var begin = System.nanoTime();
    var unused = 0L;
    for (var i = 0L; i <= ceil; i++) {
      unused += i;
    }
    var end = System.nanoTime();
    System.out.println("Test sum by 1 thread, benchmark:\t" + (end - begin) / 1000_000 + "ms");
  }

  // 计算 0 ~ 1000_000_000 的和，多线程
  @Test
  void testSumByThreadPool() {
    record SumTask(long from, long to) implements Callable<Long> {

      @Override
      public Long call() {
        var ret = 0L;
        for (var i = from; i < to; i++) {
          ret += i;
        }
        return ret;
      }
    }

    interface SumUp {
      long sumUpDo();
    }

    SumUp sumUp =
        () -> {
          ExecutorService fixedThreadPool = Executors.newFixedThreadPool(parallel);
          var range = ceil / parallel;

          var futArr = new ArrayList<Future<Long>>();
          for (var i = 0; i < parallel; i++) {
            var from = i * range;
            var to = from + range;
            if (i == parallel - 1) {
              to = ceil + 1;
            }
            var fut = fixedThreadPool.submit(new SumTask(from, to));
            futArr.add(fut);
          }
          var ret = 0L;
          for (var fut : futArr) {
            try {
              ret += fut.get();
            } catch (InterruptedException | ExecutionException ignored) {
            }
          }
          return ret;
        };
    var begin = System.nanoTime();
    var unused = sumUp.sumUpDo();
    var end = System.nanoTime();
    System.out.println("Test sum by thread pool, benchmark:\t" + (end - begin) / 1000_000 + "ms");
  }

  @Test
  void testSumByForkJoin() {
    class SumTask extends RecursiveTask<Long> {
      long from;
      long to;

      public SumTask(long from, long to) {
        this.from = from;
        this.to = to;
      }

      @Override
      protected Long compute() {
        var range = ceil / parallel;
        if (to - from < range) {
          var ret = 0L;
          for (var i = from; i < to; i++) {
            ret += i;
          }
          return ret;
        }
        var mid = (from + to) / 2;
        SumTask leftSumTask = new SumTask(from, mid);
        SumTask rightSumTask = new SumTask(mid, to);

        // leftSumTask.fork();
        // rightSumTask.fork();
        // return leftSumTask.join() + rightSumTask.join();

        rightSumTask.fork(); // 多线程递归
        return leftSumTask.compute() /* 单线程递归 */ + rightSumTask.join();
      }
    }

    try (var pool = new ForkJoinPool(parallel)) {
      var start = System.nanoTime();
      var unused = pool.invoke(new SumTask(0, ceil + 1));
      var end = System.nanoTime();
      System.out.println("Test sum by fork-join, benchmark:\t" + (end - start) / 1000_000 + "ms");
    }
  }
}
