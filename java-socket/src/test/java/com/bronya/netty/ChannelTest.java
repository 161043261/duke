package com.bronya.netty;

import io.netty.channel.DefaultEventLoop;
import io.netty.util.concurrent.DefaultPromise;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class ChannelTest {
  // Runnable 对象: 一个无参数; 无返回值的 lambda 函数
  // Callable 对象: 一个无参数; 有返回值的 lambda 函数

  @Test
  void testFuture() {
    // 计时器
    try (var timer = Executors.newScheduledThreadPool(1);
        var executorService = Executors.newFixedThreadPool(1)) {
      var sec = new AtomicInteger();
      timer.scheduleAtFixedRate(
          () -> log.info("{} sec", sec.getAndIncrement()), // Runnable
          0L, // 初始延迟 0s
          1L, // 每隔 1s 执行一次
          TimeUnit.SECONDS);

      Future<Integer> future =
          executorService.submit(
              () -> {
                Thread.sleep(5000);
                return 404;
              } /* Callable<Integer> */);
      // [main] Future task get: 404
      log.info("Future get: {}", future.get());
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
  }

  void simpleTimer() {
    var timer = new Timer();
    // TimerTask 抽象类实现了 Runnable 接口
    timer.scheduleAtFixedRate(
        new TimerTask() {
          int sec = 0;

          @Override
          public void run() {
            log.info("{} sec", sec++);
          }
        },
        0,
        1000);
  }

  @Test
  void testFutureTask() {
    simpleTimer(); // 简单计时器
    try {
      var futureTask =
          new FutureTask<Integer>(
              () -> {
                Thread.sleep(5000);
                return 404;
              } /* Callable<Integer> */);
      new Thread(futureTask).start();
      // [main] Future task get: 404
      log.info("Future task get: {}", futureTask.get());
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
  }

  //
  // 同步任务; 成功
  //
  @Test
  void testSyncOK() {
    simpleTimer(); // 简单计时器
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      workers.execute(
          () -> {
            try {
              Thread.sleep(5000);
            } catch (InterruptedException e) {
              log.error(e.getMessage());
            }
            promise.setSuccess(404);
          } /* Runnable */);
      // [main] Sync get now: null
      log.info("Sync get now: {}", promise.getNow());
      // [main] Sync get: 404
      log.info("Sync get: {}", promise.get());
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
  }

  //
  // 异步任务; 成功
  //
  @Test
  void testAsyncOK() {
    simpleTimer(); // 简单计时器
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      promise.addListener(
          future -> {
            // [defaultEventLoop-1-1] Async get now: 404
            log.info("Async get now: {}", future.getNow());
            // [defaultEventLoop-1-1] Async get: 404
            log.info("Async get: {}", future.get());
          });

      workers.execute(
          () -> {
            try {
              Thread.sleep(5000);
            } catch (InterruptedException e) {
              log.error(e.getMessage());
            }
          });
      promise.setSuccess(404);
    }
  }

  //
  // 同步任务; 失败
  // 失败时 get 方法会抛出异常
  // 失败时 getNow 方法不会抛出异常, 返回 null
  //
  @Test
  void testSyncErr1() {
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      workers.execute(
          () -> {
            try {
              Thread.sleep(5000);
            } catch (InterruptedException e) {
              log.error(e.getMessage());
            }
            var e = new RuntimeException("sync err");
            promise.setFailure(e);
          } /* Runnable */);
      // [main] Sync get now: null
      log.info("Sync get now: {}", promise.getNow());
      log.info("Sync get: {}", promise.get());
    } catch (InterruptedException | ExecutionException e) {
      // [main] java.lang.RuntimeException: sync err
      log.error(e.getMessage());
    }
  }

  //
  // 同步任务; 失败
  //
  @Test
  void testSyncErr2() {
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      workers.execute(
          () -> {
            try {
              Thread.sleep(5000);
            } catch (InterruptedException e) {
              log.error(e.getMessage());
            }
            var e = new RuntimeException("sync err");
            promise.setFailure(e);
          } /* Runnable */);
      // [main] Sync get now: null
      log.info("Sync get now: {}", promise.getNow());
      promise.await(); // 等待任务执行结束
      // [main] Sync cause: java.lang.RuntimeException: sync err
      log.info(
          "Sync cause: {}",
          promise.isSuccess() ? promise.getNow() /* null */ : promise.cause().toString());
    } catch (InterruptedException e) {
      log.error(e.getMessage());
    }
  }

  //
  // 异步任务; 失败
  //
  @Test
  void testAsyncErr() {
    simpleTimer();
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);

      promise.addListener(
          future -> {
            //// [defaultEventLoop-1-1] An exception was thrown ...
            // log.info("Async get: {}", future.get());

            // [defaultEventLoop-1-1] Async cause: java.lang.RuntimeException: async err
            log.info(
                "Async cause: {}",
                promise.isSuccess() ? promise.getNow() /* null */ : promise.cause().toString());
          });

      workers.execute(
          () -> {
            try {
              Thread.sleep(5000);
            } catch (InterruptedException e) {
              log.error(e.getMessage());
            }
            var e = new RuntimeException("async err");
            promise.setFailure(e);
          });
    }
  }

  //
  // 检查死锁
  //
  void testDeadlock() {
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      workers.submit(() -> {});
    }
  }
}
