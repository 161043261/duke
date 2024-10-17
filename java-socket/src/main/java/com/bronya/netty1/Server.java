package com.bronya.netty1;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Server {
  public static void main(String[] args) {
    var bossGroup = new NioEventLoopGroup(1);
    var workerGroup = new NioEventLoopGroup(2);
    // 2 个非 NIO 工人
    // var normalWorkers = new DefaultEventLoopGroup(2);

    try {
      new ServerBootstrap()
          .group(
              // 创建 executor 线程池和 selector 多路选择器
              bossGroup, // 1个 Boss 线程 (listener 监听器)
              workerGroup // 2 个 worker 线程 (处理 IO 事件)
              )
          //
          // ********** listener 监听器 **********
          //

          // 指定 listener 监听器的实现类
          .channel(NioServerSocketChannel.class)
          //
          // ********** socket 连接 **********
          //
          .childHandler(
              // 指定 socket 连接的初始化器
              new ChannelInitializer<NioSocketChannel>() {
                @Override
                protected void initChannel(NioSocketChannel ch) {
                  ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG)); // NIO 工人执行
                  ch.pipeline()
                      .addLast(
                          // normalWorkers,
                          // "normalHandler",
                          // 指定 socket 连接的业务处理器
                          new ChannelInboundHandlerAdapter() { // 非 NIO 工人执行
                            @Override
                            public void channelRead(ChannelHandlerContext ctx, Object msg) {
                              ByteBuf byteBuf = msg instanceof ByteBuf ? ((ByteBuf) msg) : null;
                              if (byteBuf != null) {
                                byte[] buf = new byte[32];
                                ByteBuf nBytes = byteBuf.readBytes(buf, 0, byteBuf.readableBytes());
                                log.debug("[server] Received: {}", new String(buf));
                              }
                            }
                          });
                }
              })
          .bind(3261)
          // 同步 sync 等待服务器启动
          .sync();
      System.out.println("Server started");
    } catch (InterruptedException e) {
      System.err.println(e.getMessage());
      bossGroup.shutdownGracefully();
      workerGroup.shutdownGracefully();
      // normalWorkers.shutdownGracefully();
    }
  }
}
