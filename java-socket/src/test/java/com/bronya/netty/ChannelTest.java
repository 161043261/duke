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
        }, 0, 1000);
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

  @Test // 同步任务; 成功
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
      // [main] Netty sync get now: null
      log.info("Netty sync get now: {}", promise.getNow());
      // [main] Netty sync get: 404
      log.info("Netty sync get: {}", promise.get());
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
  }

  @Test // 异步任务; 成功
  void testAsyncOK() {
    simpleTimer(); // 简单计时器
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      promise.addListener(
          future -> {
            // [defaultEventLoop-1-1] Netty async get now: 404
            log.info("Netty async get now: {}", future.getNow());
            // [defaultEventLoop-1-1] Netty async get: 404
            log.info("Netty async get: {}", future.get());
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

  @Test
  void testSyncErr() {
    try (var workers = new DefaultEventLoop()) {
      var promise = new DefaultPromise<Integer>(workers);
      workers.execute(()-> {
        try {
          Thread.sleep(5000);
        } catch (InterruptedException e) {
          log.error(e.getMessage());
        }
        var e = new RuntimeException("Sync error");
        promise.setFailure(e);
      });
    }
  }

  @Test
  void testAsyncErr() {

  }
}
