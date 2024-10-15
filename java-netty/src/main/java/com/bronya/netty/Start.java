package com.bronya.netty;

import io.netty.bootstrap.Bootstrap;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import java.util.Date;

public class Start {

  public static void main(String[] args) throws InterruptedException {

    new ServerBootstrap()
        .group(new NioEventLoopGroup()) // 1
        .channel(NioServerSocketChannel.class) // 2
        .childHandler(
            new ChannelInitializer<NioSocketChannel>() { // 3
              protected void initChannel(NioSocketChannel ch) {
                ch.pipeline().addLast(new StringDecoder()); // 5
                ch.pipeline()
                    .addLast(
                        new SimpleChannelInboundHandler<String>() { // 6
                          @Override
                          protected void channelRead0(ChannelHandlerContext ctx, String msg) {
                            System.out.println(msg);
                          }
                        });
              }
            })
        .bind(8080); // 4

    new Bootstrap()
        .group(new NioEventLoopGroup()) // 1
        .channel(NioSocketChannel.class) // 2
        .handler(
            new ChannelInitializer<Channel>() { // 3
              @Override
              protected void initChannel(Channel ch) {
                ch.pipeline().addLast(new StringEncoder()); // 8
              }
            })
        .connect("127.0.0.1", 8080) // 4
        .sync() // 5
        .channel() // 6
        .writeAndFlush(new Date() + ": hello world!"); // 7
  }
}
