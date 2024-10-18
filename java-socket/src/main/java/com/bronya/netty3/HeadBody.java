package com.bronya.netty3;

import io.netty.bootstrap.Bootstrap;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.LengthFieldBasedFrameDecoder;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import java.util.Arrays;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HeadBody {
  static final Logger log = LoggerFactory.getLogger(Separator.class);

  public static void main(String[] args) {
    new Thread(
            () -> {
              try (var boss = new NioEventLoopGroup(1);
                  var workers = new NioEventLoopGroup()) {
                ChannelFuture channelFuture =
                    new ServerBootstrap()
                        .channel(NioServerSocketChannel.class)
                        .group(boss, workers)
                        .childHandler(
                            new ChannelInitializer<SocketChannel>() {

                              @Override
                              protected void initChannel(SocketChannel ch) {
                                // 消息分为 head 和 body, head 中包含 body 的长度
                                ch.pipeline()
                                    .addLast(new LengthFieldBasedFrameDecoder(1024, 0, 1, 0, 1));
                                ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG));
                              }
                            })
                        // 设置服务器的接收缓冲区大小为 30 字节
                        .option(ChannelOption.SO_RCVBUF, 30)
                        .bind(3261);

                channelFuture.channel().closeFuture().sync();
                log.info("Server started");
              } catch (InterruptedException e) {
                log.error(e.getMessage());
              }
            })
        .start();

    new Thread(
            () -> {
              try (var workers = new NioEventLoopGroup()) {
                var bootstrap = new Bootstrap();
                bootstrap.channel(NioSocketChannel.class);
                bootstrap.group(workers);
                bootstrap.handler(
                    new ChannelInitializer<SocketChannel>() {

                      @Override
                      protected void initChannel(SocketChannel ch) throws Exception {
                        ch.pipeline()
                            .addLast(
                                new ChannelInboundHandlerAdapter() {

                                  @Override
                                  public void channelActive(ChannelHandlerContext ctx) {
                                    log.info("Sending packets");
                                    Random rand = new Random();
                                    ByteBuf buf = ctx.alloc().buffer();
                                    for (int cnt = 0; cnt < 30; cnt++) {
                                      var len = rand.nextInt(16) + 1;
                                      var aByte = (byte) rand.nextInt('a', 'z' + 1);
                                      var msg = new byte[len];
                                      Arrays.fill(msg, aByte);
                                      buf.writeByte((byte) len); // 写入长度
                                      buf.writeBytes(msg);
                                    }
                                    ctx.writeAndFlush(buf);
                                  }
                                });
                      }
                    });
                ChannelFuture future = bootstrap.connect("127.0.0.1", 3261);
                future.sync(); // 同步等待
                // future.channel().closeFuture().sync();
              } catch (InterruptedException e) {
                log.error(e.getMessage());
              } finally {
                // workers.shutdownGracefully();
                log.info("Client stopped");
              }
            })
        .start();
  }
}
