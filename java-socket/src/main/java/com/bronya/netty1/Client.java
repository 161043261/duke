package com.bronya.netty1;

import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.ByteBufAllocator;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;

public class Client {
  public static void main(String[] args) throws InterruptedException {
    Runnable task =
        () -> {
          try {
            ChannelFuture openFuture =
                new Bootstrap()
                    // 创建 executor 线程池和 selector 多路选择器
                    .group(new NioEventLoopGroup(1))
                    //
                    // ********** socket 连接 **********
                    //

                    // 指定 socket 连接的实现类
                    .channel(NioSocketChannel.class)
                    .handler(
                        // 指定 socket 连接的初始化器
                        new ChannelInitializer<NioSocketChannel>() {
                          @Override
                          protected void initChannel(NioSocketChannel ch) throws Exception {
                            System.out.println(
                                Thread.currentThread().getName() + " -- Init channel...");
                            ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG));
                          }
                        })
                    // 指定服务器的 IP 和端口号
                    .connect("localhost", 3261);

            Channel channel =
                openFuture
                    // 同步 sync 等待建立 socket 连接
                    .sync()
                    // socket 连接已建立, 同步打开数据读写的双向 channel 通道
                    .channel(); // Channel

            // 使用回调函数, 异步打开数据读写的双向 channel 通道
            // openFuture.addListener(
            //     (ChannelFutureListener) future -> System.out.println(future.channel()));

            // 向 channel 通道写入数据, 并清空 socket 缓冲区
            channel.writeAndFlush(
                ByteBufAllocator.DEFAULT
                    .buffer()
                    .writeBytes(
                        ("1st greeting from " + Thread.currentThread().getName()).getBytes()));
            Thread.sleep(2000);
            channel.writeAndFlush(
                ByteBufAllocator.DEFAULT
                    .buffer()
                    .writeBytes(
                        ("2nd greeting from " + Thread.currentThread().getName()).getBytes()));
          } catch (InterruptedException e) {
            System.err.println(e.getMessage());
          }
        };

    for (int i = 0; i < 5; i++) {
      var client = new Thread(task, "client-" + i);
      client.start();
    }
  }
}

// [nioEventLoopGroup-3-2] 1st greeting from client-4 <--*
// [nioEventLoopGroup-3-1] 1st greeting from client-1 <--|---*
// [nioEventLoopGroup-3-2] 1st greeting from client-3 <--|---|---*
// [nioEventLoopGroup-3-1] 1st greeting from client-2    |   |   |
// [nioEventLoopGroup-3-1] 1st greeting from client-0    |   |   |
//                                                       |   |   |
// [nioEventLoopGroup-3-2] 2nd greeting from client-4 <--*   |   |
// [nioEventLoopGroup-3-2] 2nd greeting from client-3 <------|---*
// [nioEventLoopGroup-3-1] 2nd greeting from client-0        |
// [nioEventLoopGroup-3-1] 2nd greeting from client-1 <------*
// [nioEventLoopGroup-3-1] 2nd greeting from client-2
