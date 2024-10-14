package com.bronya.concurrent;

import java.util.concurrent.*;
import org.junit.jupiter.api.Test;

public class FutureTest {

  @Test // ! mvn -Dtest=FutureTest#testFuture test -q
  public void testFuture() {
    // try with resources 创建一个有 5 个线程的线程池
    try (var threadPool = Executors.newFixedThreadPool(5)) {
      // 创建一个 Callable 任务 task
      // Callable 是一个函数式接口，实现 call 方法，创建一个任务 task 对象
      Callable<String> task =
          () -> {
            return "I'm " + Thread.currentThread().getName();
          };
      // Future 对象：一个异步 asynchronous 任务的执行结果
      var futures = new Future[10];
      for (int i = 0; i < futures.length; i++) {
        // 提交任务 task 到线程池 threadPool 并获取 future 对象
        futures[i] = threadPool.submit(task);
      }

      for (var future : futures) {
        // 通过 future 对象获取任务的执行结果
        // future 对象可以获取任务的执行结果、检查任务是否完成、取消任务
        System.out.println(future.get());
      }
      // 关闭线程池 threadPool，不再接受新的任务，等待所有已提交的任务执行结束
      threadPool.shutdown(); // 这里使用了 try with resources，无需显式关闭线程池 threadPool
    } catch (InterruptedException | ExecutionException ignored) {
    }
  }

  @Test // ! mvn -Dtest=FutureTest#testFutureTask test -q
  public void testFutureTask() {
    // try with resources 创建一个有 5 个线程的线程池
    try (var threadPool = Executors.newFixedThreadPool(5)) {
      Callable<Integer>[] tasks = new Callable[5];
      for (int i = 0; i < tasks.length; i++) {
        int threadId = i + 1;
        tasks[i] =
            () -> {
              try {
                TimeUnit.SECONDS.sleep(3);
              } catch (InterruptedException ignored) {
              }
              return (threadId) * 100;
            };
      }
      // 可调用对象 -> 异步任务对象
      // 将 Callable 对象包装为 FutureTask 对象
      FutureTask<Integer>[] futureTasks = new FutureTask[tasks.length];
      for (int i = 0; i < futureTasks.length; i++) {
        futureTasks[i] = new FutureTask<>(tasks[i]);
        // 提交异步任务 futureTask 到线程池 threadPool 并获取 future 对象
        threadPool.submit(futureTasks[i]);
      }

      for (var i = 0; i < futureTasks.length; i++) {
        try {
          System.out.println("Result of future task" + (i + 1) + ": " + futureTasks[i].get());
        } catch (InterruptedException | ExecutionException ignored) {
        }
      }
    }
  }
}
