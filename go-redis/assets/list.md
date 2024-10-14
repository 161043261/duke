# list 链表

- 键 === 字符串链表
- 链表是按插入顺序排序的字符串链表，命令以 l 开头
- 将 list 链表用作栈 stack 和队列 queue
  - 左表头 -- 右表尾
  - 左栈顶 -- 右栈底

### 基本命令

| 命令     | 说明                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| lpush    | 在表头处添加一个新元素                                                         |
| rpush    | 在表尾处添加一个新元素                                                         |
| lpop     | 移除表头元素                                                                   |
| rpop     | 移除表尾元素                                                                   |
| llen     | 获取表长                                                                       |
| lmove    | 原子的、将元素从源链表移动到目的链表                                           |
| lrange   | 获取链表中指定范围的元素                                                       |
| ltrim    | 将链表裁剪为指定范围                                                           |
| 阻塞命令 |                                                                                |
| blpop    | 移除表头元素，如果链表为空，则命令将阻塞，直到有新元素或超时                   |
| blmove   | 原子的、将元素从源链表移动到目的链表，如果链表为空，则命令将阻塞，直到有新元素 |

### 例

**将 list 用作队列 (FIFO)**

```shell
lpush bikes:repairs bike:1 # 头插 [bike:1]
lpush bikes:repairs bike:2 # 头插 [bike:2 bike:1]
rpop bikes:repairs         # 尾删 [bike:2]
rpop bikes:repairs         # 尾删 []
```

**将 list 用作栈 (FILO)**

```shell
lpush bikes:repairs bike:1 # 左插 [bike:1]
lpush bikes:repairs bike:2 # 左插 [bike:2 bike:1]
lpop bikes:repairs         # 左删 [bike:1]
lpop bikes:repairs         # 左删 []
```

**获取 list 的长度**

```shell
llen bikes:repairs
```

**原子的、将元素从源链表移动到目的链表**

```shell
lpush bikes:repairs bike:1 bike:2 # [bike:2 bike:1]
# 将源链表 bikes:repairs 左侧的一个元素移动到目的链表 bikes:finished 的左侧
lmove bikes:repairs bikes:finished LEFT LEFT
lrange bikes:repairs 0 -1
lrange bikes:finished 0 -1
```

**将链表裁剪为指定范围**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3 bike:4 bike:5
ltrim bikes:repairs 0 2 # [0, 2]
lrange bikes:repairs 0 -1 # [bike:1 bike:2 bike:3]
```

**Redis 的 list 基于链表**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3
lpush bikes:repairs bike:important_bike
lrange bikes:repairs 0 -1
```

**弹出元素**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3
rpop bikes:repairs # bike:3
lpop bikes:repairs # bike:1
rpop bikes:repairs # bike:2
rpop bikes:repairs # (nil)
```

**保留最新的 3 个元素**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3 bike:4 bike:5
ltrim bikes:repairs -3 -1
lrange bikes:repairs 0 -1
```

**消息队列**

生产者调用 lpush，消费者调用 rpop

链表为空时，rpop 返回 null，消费者可能等待一段时间，重新调用 rpop（轮询）

使用阻塞的 brpop，避免无用的 rpop 调用

```shell
rpush bikes:repairs bike:1 bike:2 # 生产者
brpop bikes:repairs 1 # 消费者，timeout = 1s
brpop bikes:repairs 1 # 消费者，timeout = 1s
brpop bikes:repairs 1 # 消费者，timeout = 1s
```

向集合添加元素时，如果该集合（的键）不存在，则添加元素前自动创建一个空集合

```shell
del new_bikes
lpush new_bikes bike:1 bike:2 bike:3 # 自动创建 new_bikes

set new_bikes bike:1
type new_bikes # string
#! (error) WRONGTYPE Operation against a key holding the wrong kind of value
lpush new_bikes bike:2 bike:3
```

从集合移除元素时，如果移除元素后得到空集合，则自动移除该集合（的键）

```shell
rpush bikes:repairs bike:1 bike:2 bike:3 # 3
exists bikes:repairs # 1
lpop bikes:repairs
lpop bikes:repairs
lpop bikes:repairs
exists bikes:repairs # 0 自动移除 bikes:repairs
```
