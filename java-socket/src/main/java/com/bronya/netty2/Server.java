package com.bronya.netty2;

import io.netty.bootstrap.Bootstrap;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringEncoder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Server {

  public static void main(String[] args) throws InterruptedException {
    new Thread(
            () -> {
              new ServerBootstrap()
                  .group(new NioEventLoopGroup())
                  .channel(NioServerSocketChannel.class)
                  .childHandler(
                      new ChannelInitializer<NioSocketChannel>() {

                        @Override
                        protected void initChannel(NioSocketChannel ch) {
                          ch.pipeline() /* ChannelPipeline: ChannelHandler 的有序集合 */
                              .addLast /* ChannelHandler 处理 Channel 上的入站; 出站事件 */(
                                  new ChannelInboundHandlerAdapter() {
                                    @Override
                                    public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                      System.out.println("[a] ctx.fireChannelRead(msg);");
                                      ctx.fireChannelRead(msg); // -------------------- 1
                                    }
                                  });
                          ch.pipeline()
                              .addLast(
                                  new ChannelInboundHandlerAdapter() {
                                    @Override
                                    public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                      System.out.println("[b] ctx.fireChannelRead(msg);");
                                      ctx.fireChannelRead(msg); // -------------------- 2
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  new ChannelInboundHandlerAdapter() {
                                    @Override
                                    public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                      System.out.println("[c] ctx.channel().write(msg);");
                                      ctx.channel().write(msg); // -------------------- 3
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  new ChannelOutboundHandlerAdapter() {
                                    @Override
                                    public void write(
                                        ChannelHandlerContext ctx,
                                        Object msg,
                                        ChannelPromise promise) {
                                      System.out.println("[d] ctx.write(msg, promise);");
                                      ctx.write(msg, promise); // -------------------- 5
                                    }
                                  });

                          ch.pipeline()
                              .addLast(
                                  new ChannelOutboundHandlerAdapter() {
                                    @Override
                                    public void write(
                                        ChannelHandlerContext ctx,
                                        Object msg,
                                        ChannelPromise promise) {
                                      System.out.println("[e] ctx.write(msg, promise);");
                                      ctx.write(msg, promise); // -------------------- 4
                                    }
                                  });
                        }
                      })
                  .bind(3261);
            },
            "server")
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
            },
            "client")
        .start();
  }
}

// [a] ctx.fireChannelRead(msg);
// [b] ctx.fireChannelRead(msg);
// [c] ctx.channel().write(msg);
// [e] ctx.write(msg, promise);
// [d] ctx.write(msg, promise);
