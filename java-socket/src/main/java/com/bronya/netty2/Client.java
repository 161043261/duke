package com.bronya.netty2;

import static com.bronya.netty2.Server.fmt;

import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringEncoder;
import java.nio.charset.Charset;
import java.util.Scanner;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Client {
  public static void main(String[] args) {
    var group = new NioEventLoopGroup();
    try {
      Channel channel =
          new Bootstrap()
              .group(group)
              .channel(NioSocketChannel.class)
              .handler(
                  new ChannelInitializer<NioSocketChannel>() {

                    @Override
                    protected void initChannel(NioSocketChannel ch) throws Exception {
                      ch.pipeline().addLast(new StringEncoder());
                      ch.pipeline()
                          .addLast(
                              new ChannelInboundHandlerAdapter() {
                                @Override
                                public void channelRead(ChannelHandlerContext ctx, Object msg) {
                                  ByteBuf buf = (ByteBuf) msg;
                                  System.out.println(buf.toString(Charset.defaultCharset()));
                                  fmt.dump(buf);
                                }
                              });
                    }
                  })
              .connect("127.0.0.1", 3261)
              .sync()
              .channel();

      channel
          .closeFuture()
          .addListener(
              future -> {
                group.shutdownGracefully();
              });

      new Thread(
              new Runnable() {
                @Override
                public void run() {
                  try (var scanner = new Scanner(System.in)) {
                    while (true) {
                      String msg = scanner.nextLine();
                      if ("exit".equalsIgnoreCase(msg) || "quit".equalsIgnoreCase(msg)) {
                        channel.close();
                        break;
                      }
                      channel.writeAndFlush(msg);
                    }
                  }
                }
              })
          .start();
    } catch (InterruptedException e) {
      log.error(e.getMessage());
    }
  }
}
