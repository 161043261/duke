package com.bronya.netty;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

@Slf4j
public class ChannelTest {
  // Runnable 对象: 一个无参数; 无返回值的 lambda 函数
  // Callable 对象: 一个无参数; 有返回值的 lambda 函数
  Callable<Integer> task = () -> {
    var ret = 0;
    try {
      Thread.sleep(3000);
    } catch (InterruptedException e) {
      // Thread.currentThread().getAndClearInterrupt();
      boolean ok = Thread.interrupted();
      ret = -1;
    }
    return ret;
  };

  @Test
  void testSunFuture() {
    try {
      var futureTask = new FutureTask<Integer>(task);
    System.out.println("Sun future task get: " +  futureTask.get());
    } catch (InterruptedException | ExecutionException e) {
      log.error(e.getMessage());
    }
    System.out.println("Done sun future task");
  }
}
