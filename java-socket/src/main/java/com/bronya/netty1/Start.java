package com.bronya.netty1;

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

public class Start {

  public static void main(String[] args) throws InterruptedException {

    // netty 服务器
    new ServerBootstrap()
        // 创建 executor 线程池和 selector 多路选择器
        .group(new NioEventLoopGroup())
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
              protected void initChannel(NioSocketChannel ch) {
                // 指定 socket 连接的解码器 ByteBuf -> String
                ch.pipeline().addLast(new StringDecoder());
                ch.pipeline()
                    .addLast(
                        // 指定 socket 连接的业务处理器
                        new SimpleChannelInboundHandler<String>() {
                          @Override
                          protected void channelRead0(ChannelHandlerContext ctx, String msg) {
                            System.out.println("[netty] Netty server received: " + msg);
                          }
                        });
              }
            })
        // 指定 listener 监听器监听 (绑定) 的端口
        .bind(3261);

    // netty 客户端
    new Bootstrap()
        // 创建 executor 线程池和 selector 多路选择器
        .group(new NioEventLoopGroup())
        //
        // ********** socket 连接 **********
        //

        // 指定 socket 连接的实现类
        .channel(NioSocketChannel.class)
        .handler(
            // 指定 socket 连接的初始化器
            new ChannelInitializer<Channel>() {
              @Override
              protected void initChannel(Channel ch) {
                // 指定 socket 连接的解码器 String -> ByteBuf
                ch.pipeline().addLast(new StringEncoder());
              }
            })
        // 指定服务器的 IP 和端口号
        .connect("127.0.0.1", 3261)
        // 同步 sync 等待建立 socket 连接
        .sync()
        // socket 连接已建立, 获取数据读写的双向 channel 通道
        .channel()
        // 向 channel 通道写入数据, 并清空 socket 缓冲区
        .writeAndFlush("Greeting from netty client!");
  }
}
