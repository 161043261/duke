package com.bronya.netty;

import io.netty.channel.*;
import java.util.HashSet;
import org.junit.jupiter.api.Test;

public class EventLoopTest {
  /**
   * EventLoop 事件循环<br>
   * EventLoopGroup 事件循环组<br>
   */
  @Test
  public void testEventLoopGroup() {
    try (var eventLoopGroup = new DefaultEventLoopGroup()) {
      // next 方法：获取组中下一个 EventLoop
      var eventLoopSet = new HashSet<String>();
      var eventLoop = eventLoopGroup.next();
      while (!eventLoopSet.contains(eventLoop.toString())) {
        eventLoopSet.add(eventLoop.toString());
        eventLoop = eventLoopGroup.next();
      }
      System.out.println(eventLoopSet.size()); // 16
      System.out.println(Runtime.getRuntime().availableProcessors()); // 8

      // 优雅关闭
      eventLoopGroup.shutdownGracefully();
    }
  }
}
