package com.bronya.netty2;

import io.netty.bootstrap.Bootstrap;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringEncoder;
import java.util.Timer;
import java.util.TimerTask;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ClientServer {

  public static void main(String[] args) {
    new Timer()
        .schedule(
            new TimerTask() {
              @Override
              public void run() {
                log.info("Timeout!");
                System.exit(0);
              }
            },
            5000);

    new Thread(
            () -> {
              new ServerBootstrap()
                  .group(new NioEventLoopGroup())
                  .channel(NioServerSocketChannel.class)
                  .childHandler(
                      new ChannelInitializer<NioSocketChannel>() {

                        // ChannelHandler 处理 Channel 上的入站; 出站事件
                        // ChannelPipeline 是 ChannelHandlerContext (封装了 ChannelHandler) 的双向链表
                        // head <-> in1 <-> in2 <-> in3 <-> out4 <-> out5 <-> tail

                        @Override
                        protected void initChannel(NioSocketChannel ch) {
                          ch.pipeline()
                              .addLast(
                                  "in1", // 入站处理器 in1
                                  new ChannelInboundHandlerAdapter() {
                                    @Override
                                    public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                      System.out.println("1. In channel handler");
                                      ctx.fireChannelRead(msg); // 调用下一个入站处理器
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  "in2", // 入站处理器 in2
                                  new ChannelInboundHandlerAdapter() {
                                    @Override
                                    public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                      System.out.println("2. In channel handler");
                                      ctx.fireChannelRead(msg); // 调用下一个入站处理器
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  "in3", // 入站处理器 in3
                                  new ChannelInboundHandlerAdapter() {
                                    @Override
                                    public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                      System.out.println("3. In channel handler");
                                      ctx.channel().write(msg); // 从尾节点开始, 调用出站处理器
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  "out4", // 出站处理器 out4
                                  new ChannelOutboundHandlerAdapter() {
                                    @Override
                                    public void write(
                                        ChannelHandlerContext ctx,
                                        Object msg,
                                        ChannelPromise promise) {
                                      System.out.println("4. Out channel handler");
                                      ctx.write(msg, promise); // 从当前节点开始, 查找并调用上一个出站处理器
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  "out5", // 出站处理器 out5
                                  new ChannelOutboundHandlerAdapter() {
                                    @Override
                                    public void write(
                                        ChannelHandlerContext ctx,
                                        Object msg,
                                        ChannelPromise promise) {
                                      System.out.println("5. Out channel handler");
                                      ctx.write(msg, promise); // 从当前节点开始, 查找并调用上一个出站处理器
                                    }
                                  });
                        }
                      })
                  .bind(3261);
            })
        .start();

    new Thread(
            () -> {
              new Bootstrap()
                  .group(new NioEventLoopGroup())
                  .channel(NioSocketChannel.class)
                  .handler(
                      new ChannelInitializer<Channel>() {

                        @Override
                        protected void initChannel(Channel ch) {
                          ch.pipeline().addLast(new StringEncoder());
                        }
                      })
                  .connect("127.0.0.1", 3261)
                  .addListener(
                      (ChannelFutureListener)
                          future -> {
                            future.channel().writeAndFlush("Greeting from client");
                          });
            })
        .start();
  }
}

// 1. In channel handler
// 2. In channel handler
// 3. In channel handler
// 5. Out channel handler
// 4. Out channel handler
