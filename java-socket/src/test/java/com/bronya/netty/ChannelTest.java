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
          0L, // initialDelay
          1L, // period (interval)
          TimeUnit.SECONDS);

      Future<Integer> future =
          executorService.submit(
              () -> {
                Thread.sleep(5000);
                return 404;
              } /* Callable<Integer> */);
      log.info("Future get: {}", future.get()); // 1
      // 同步等待 5s
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
    log.info("Test Future Done!"); // 2
  }

  void simpleTimer() {
    var timer = new Timer();
    timer.scheduleAtFixedRate(
        // public abstract class TimerTask
        // implements Runnable
        new TimerTask() {
          int sec = 0;

          @Override
          public void run() {
            log.info("{} sec", sec++);
          }
        }, // TimerTask: Runnable 接口的抽象实现类
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
      log.info("Future task get: {}", futureTask.get()); // 1
      // 同步等待 5s
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage()); // 2
    }
    log.info("Test FutureTask Done!");
  }

  @Test
  void testNettySync() {
    try (var workers = new DefaultEventLoop()) {
      simpleTimer(); // 简单计时器
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
      log.info("Netty sync get now: {}", promise.getNow()); // null
      log.info("Netty sync get: {}", promise.get());
      log.info("Test Netty Sync Done!");
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
  }
}
