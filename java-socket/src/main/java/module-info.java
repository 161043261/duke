module java.socket /* artifactId.replaceAll("-", ".").replaceAll("_", "."); */ {
  // requires 声明模块的运行时和编译时依赖
  requires io.netty.buffer;
  requires io.netty.codec;
  requires io.netty.handler;
  requires io.netty.transport;
  requires org.slf4j;
  requires io.netty.transport.unix.common;

  // requires static 声明模块的仅编译时依赖
  requires static lombok;
  requires io.netty.common;
  requires jdk.jdi;

  // exports 导出指定包的 public 成员
  exports com.bronya;
  exports com.bronya.netty1;
  exports com.bronya.netty2;
}
