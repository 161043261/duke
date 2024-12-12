package com.bronya.netty;

import io.netty.channel.DefaultEventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import java.util.HashSet;
import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class EventLoopTest {

  /**
   * EventLoop 事件循环<br>
   * EventLoopGroup 事件循环组<br>
   */
  @Test
  public void test1() {
    try (var eventLoopGroup = new DefaultEventLoopGroup()) {
      // next 方法：获取组中下一个 EventLoop
      var eventLoopSet = new HashSet<String>();
      var eventLoop = eventLoopGroup.next();
      while (!eventLoopSet.contains(eventLoop.toString())) {
        eventLoopSet.add(eventLoop.toString());
        eventLoop = eventLoopGroup.next();
      }
      System.out.println(eventLoopSet.size()); // 16 | 48
      System.out.println(Runtime.getRuntime().availableProcessors()); // 8 | 12

      // 优雅关闭
      eventLoopGroup.shutdownGracefully();
    }
  }

  // EventLoop (DefaultEventLoop | NioEventLoop)
  // EventLoop 执行普通任务
  @Test
  public void test2() {
    try (var workers = new NioEventLoopGroup /* DefaultEventLoopGroup */()) {
      workers.execute(() -> log.warn("Normal task"));
    }
  }

  // EventLoop 执行定时任务
  @Test
  public void test3() {
    try (var workers = new NioEventLoopGroup /* DefaultEventLoopGroup */(); ) {
      workers.scheduleAtFixedRate(
          () -> log.warn("Scheduled task"),
          3, // 初始延迟 3s
          3, // 每隔 3s 执行一次
          TimeUnit.SECONDS);
      Thread.sleep(15_000);
    } catch (InterruptedException e) {
      log.error(e.getMessage());
    }
  }
}
