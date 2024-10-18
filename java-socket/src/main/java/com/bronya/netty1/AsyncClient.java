package com.bronya.netty1;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import java.util.Scanner;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AsyncClient {
  private static volatile Channel channel;

  public static void main(String[] args) {
    var group = new NioEventLoopGroup();
    ChannelFuture openFuture =
        new Bootstrap()
            .group(group)
            .channel(NioSocketChannel.class)
            .handler(
                new ChannelInitializer<NioSocketChannel>() {
                  @Override // 在连接建立后被调用
                  protected void initChannel(NioSocketChannel ch) throws Exception {
                    ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG));
                    ch.pipeline().addLast(new StringEncoder());
                  }
                })
            .connect("127.0.0.1", 3261) /* .sync().channel(); 同步*/;

    // 异步打开 channel 通道
    openFuture.addListener((ChannelFutureListener) future -> channel = future.channel());

    new Thread(
            () -> {
              var scanner = new Scanner(System.in);
              while (true) {
                String msg = scanner.nextLine();
                if ("exit".equalsIgnoreCase(msg) || "quit".equalsIgnoreCase(msg)) {
                  channel.close(); // 通道异步关闭, 不是立刻关闭
                  break;
                }
                channel.writeAndFlush(msg);
              }
            },
            "asyncClient")
        .start();

    while (channel == null) {
      Thread.onSpinWait(); // 轻量的忙等待
    }

    ChannelFuture closeFuture = channel.closeFuture();

    // 同步关闭 channel 通道
    // log.debug("[sync] Waiting for channel to close");
    // closeFuture.sync();
    // log.debug("[sync] Channel closed");

    // 异步关闭 channel 通道
    closeFuture.addListener(
        new ChannelFutureListener() {
          @Override
          public void operationComplete(ChannelFuture future) throws Exception {
            log.debug("Channel closed, shutting down group gracefully");
            group.shutdownGracefully();
          }
        } /*
          (ChannelFutureListener) future -> {
            log.debug("Channel closed, shutting down group gracefully");
            group.shutdownGracefully();
          }
          */);
  }
}
