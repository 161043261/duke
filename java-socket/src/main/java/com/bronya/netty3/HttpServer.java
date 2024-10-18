package com.bronya.netty3;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.*;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HttpServer {

  public static void main(String[] args) {
    new ServerBootstrap()
        .channel(NioServerSocketChannel.class)
        .group(new NioEventLoopGroup() /* boss */, new NioEventLoopGroup() /* workers */)
        .childHandler(
            new ChannelInitializer<SocketChannel>() {
              @Override
              protected void initChannel(SocketChannel ch) {
                ch.pipeline().addLast(new LoggingHandler(LogLevel.DEBUG));
                ch.pipeline().addLast(new HttpServerCodec()); // bytes to message codec
                ch.pipeline()
                    .addLast(
                        new SimpleChannelInboundHandler<HttpRequest>() {
                          @Override
                          protected void channelRead0(ChannelHandlerContext ctx, HttpRequest req)
                              throws Exception {
                            // 获取请求 req
                            log.debug(req.uri());
                            // 返回响应 resp
                            var resp =
                                new DefaultFullHttpResponse(
                                    req.protocolVersion(), HttpResponseStatus.OK);
                            byte[] msg = "<h1>Powered by Netty</h1>".getBytes();
                            resp.headers().setInt(HttpHeaderNames.CONTENT_LENGTH, msg.length);
                            resp.content().writeBytes(msg);
                            ctx.writeAndFlush(resp);
                          }
                        });
              }
            })
        .bind(1610)
        .syncUninterruptibly()
        .channel()
        .closeFuture()
        .syncUninterruptibly();
  }
}
