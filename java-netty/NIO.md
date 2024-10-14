# NIO

## Non-blocking IO 非阻塞 IO

### channel 数据读写的双向通道

- stream 数据读写的单向通道
- channel 数据读写的双向通道
- channel 是更底层的数据结构

常见的 channel

- java.nio.channels.FileChannel
- java.nio.channels.DatagramChannel
- java.nio.channels.SocketChannel
- java.nio.channels.ServerSocketChannel

### buffer 数据缓冲区

常见的 buffer

- java.nio.ByteBuffer
  - java.nio.MappedByteBuffer
  - java.nio.DirectByteBuffer（堆外内存）
  - java.nio.HeapByteBuffer（jvm 堆内存）
- java.nio.ShortBuffer
- java.nio.IntBuffer
- java.nio.LongBuffer
- java.nio.FloatBuffer
- java.nio.DoubleBuffer
- java.nio.CharBuffer

Selector 服务器：一个线程处理一个 socket 连接

## 1.1 ByteBuffer

```java
public abstract sealed class ByteBuffer // 密封类
    extends Buffer
    implements Comparable<ByteBuffer>
    permits
    HeapByteBuffer, MappedByteBuffer
```

ByteBuffer 属性

- capacity 容量（ByteBuffer 不能动态扩容）
- position 读/写指针
- limit 读/写限制 (position <= limit)

### 使用

- 读 buf 前调用 flip 方法：写模式 -> 读模式
  - position 写指针 -> 读指针
  - limit 写限制 -> 读限制
- 写 buf 前调用 clear 方法：清空脏数据
- 写 buf 前调用 compact 方法：紧凑数据，不清空数据

### ByteBuffer 常见方法

```java
// 分配 jvm 堆内存，不能动态扩容
public static ByteBuffer allocate(int capacity);

// 分配堆外内存，不能动态扩容
public static ByteBuffer allocateDirect(int capacity);
```

向 buffer 写入数据

- 调用 channel 的 read 方法：从 channel 中读，向 buffer 中写
- 调用 buffer 的 put 方法

```java
// 调用 channel 的 read 方法，从 channel 中读，向 buffer 中写
int nBytes = channel.read(buf);
// 调用 buffer 的 put 方法
buf.put((byte) 1 << 7 - 1)
```

从 buffer 读出数据

- 调用 channel 的 write 方法：从 buffer 中读，向 channel 中写
- 调用 buffer 的 get 方法：get 方法不会删除 buffer 中的数据

其他方法

- get(3): 读出 buffer 中索引为 3 的元素
- rewind() 重置 position 读写指针为 0
- mark(3) 标记索引为 3 的元素
- reset() 重置 position 读写指针为 3

> Buffer 是线程不安全的

## 1.2 文件编程

### FileChannel

> FileChannel 只能工作在阻塞模式下

调用 FileInputStream, FileOutputStream, 或 RandomAccessFile 以获取 FileChannel

- 通过 FileInputStream 获取的 channel 只读
- 通过 FileOutputStream 获取的 channel 只写
- RandomAccessFile 可以指定读写模式

```java
// 读文件
int nBytes = channel.read(buf);
// 写文件
int nBytes = channel.write(buf);
// 获取当前读写的文件流的位置
long pos = channel.position();
// 设置当前读写的文件流的位置
channel.position(new Random().nextLong(channel.size())/* newPos */);
// 获取文件流的大小
long size = channel.size();
```

## 1.3 Path 和 Paths

- Path 文件路径
- Paths 工具类，用于获取 Path 实例

```java
// src/main/go
// src/main/java
// /home/user/data.txt
// /homee/user/to.txt
Path path = Paths.get("README.md"); // 使用相对 pom.xml 的相对路径
Path path = Paths.get("/home/user/data.txt"); // 使用绝对路径
Path path = Paths.get("/home/user"/* 目录 */, "data.txt"/* 文件 */);
```

```java
Path path = Paths.get("/home/user/../user/data.txt");
// 正常化路径
System.out.println(path.normalize()); // /home/user/data.txt

// 文件是否存在
System.out.println(Files.exists("src/main"));

Path newDir = Paths.get("src/main/go");
// 创建目录
Files.createDirectory(newDir);

Path src = Paths.get("/home/user/data.txt");
Path dst = Paths.get("/home/user/to.txt");
// 拷贝文件
// 如果文件已存在，则抛出 FileAlreadyExistsException 异常
Files.copy(src, dst);

// 移动文件
// StandardCopyOption.ATOMIC_MOVE 保证文件移动的原子性
Files.move(src, dst, StandardCopyOption.ATOMIC_MOVE);

Path target = Paths.get("/home/user/to.txt");
// 删除文件
// 如果文件不存在，则抛出 NoSuchFileException 异常
Files.delete(target);

Path target = Paths.get("src/main/go");
// 删除目录
// 如果目录非空，则抛出 DirectoryNotEmptyException 异常
Files.delete(target);
```

## 1.4 网络编程

```java
// 将调用者线程的中断标志设置为 true
Thread.currentThread().interrupt();
// 获取当前线程的中断标志（是否为 true）
Thread.currentThread().isInterrupted();
// 获取当前线程的中断标志，并重置为 false
Thread.interrupted();
```

**阻塞 IO 与非阻塞 IO**

- ServerSocketChannel::accept
  没有新的连接时，线程阻塞，放弃 cpu
- SocketChannel::read
  没有新的数据时，线程阻塞，放弃 cpu
- 对于 64 位 jvm，1 个线程 1 MB，线程过多会导致 OOM

**处理消息的边界**

- TCP 可靠，面向字节流，TCP 消息没有边界
  - 按行分隔符 \n 拆分 TCP 数据包
- UDP 不可靠，面向用户数据报，UDP 消息有边界

事件触发后，要么处理，要么取消 cancel。否则该事件将持续触发：NIO 基于 epoll 的水平触发 Level Trigger
