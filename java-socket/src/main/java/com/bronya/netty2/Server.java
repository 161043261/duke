package com.bronya.netty2;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufUtil;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import java.nio.charset.Charset;

public class Server {

  public /* static */ interface Fmt {
    void dump(ByteBuf buf);
  }

  public static Fmt fmt =
      (ByteBuf buf) -> {
        var tmpArr = buf.getClass().toString().split("\\.");
        StringBuilder strBuilder =
            new StringBuilder()
                .append("class: ")
                .append(tmpArr[tmpArr.length - 1])
                .append(", readerIdx: ")
                .append(buf.readerIndex())
                .append(", writerIdx: ")
                .append(buf.writerIndex())
                .append(", capacity: ")
                .append(buf.capacity())
                .append("\n");
        ByteBufUtil.appendPrettyHexDump(strBuilder, buf);
        System.out.println(strBuilder.toString());
      };

  public static void main(String[] args) {
    new ServerBootstrap()
        .group(new NioEventLoopGroup())
        .channel(NioServerSocketChannel.class)
        .childHandler(
            new ChannelInitializer<NioSocketChannel>() {

              @Override
              protected void initChannel(NioSocketChannel ch) {
                ch.pipeline()
                    .addLast(
                        new ChannelInboundHandlerAdapter() {

                          @Override
                          public void channelRead(ChannelHandlerContext ctx, Object msg) {
                            ByteBuf buf = (ByteBuf) msg;
                            System.out.println(buf.toString(Charset.defaultCharset()));
                            fmt.dump(buf);

                            ByteBuf resp = ctx.alloc().buffer();
                            resp.writeBytes(buf);
                            fmt.dump(resp);
                            ctx.writeAndFlush(resp); // echo
                          }
                        });
              }
            })
        .bind(3261);
  }
}
