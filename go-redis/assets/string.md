# string 字符串

- 键 === 字符串（值）
- 字符串是 Redis **最**基本的数据类型

| 命令     | 说明                              |
| -------- | --------------------------------- |
| set      | 向内存中写入键值（字符串）对      |
| get      | 从内存中读出键值（字符串）对      |
| setnx    | 如果 key 已存在，则 set 失败      |
| setxx    | 如果 key 不存在，则 set 失败      |
| mset     | 在一条命令中 set 多个键           |
| mget     | 在一条命令中 get 多个键           |
| incr     | 原子的、将字符串解析为整数，并 +1 |
| decr     | 原子的、将字符串解析为整数，并 -1 |
| incrby n | 原子的、将字符串解析为整数，并 +n |
| decrby n | 原子的、将字符串解析为整数，并 -n |

### set

```shell
set bike:1 Deimos
get bike:1
```

### setnx, setxx

```shell
set bike:1 bike nx
set bike:1 bike xx
```

### mset, mget

```shell
mset bike:1 "Deimos" bike:2 "Ares" bike:3 "Vanth"
mget bike:1 bike:2 bike:3
```

### 字符串作为计数器

incr 等操作（读出 -- 加/减 -- 写入）是原子的

```shell
set total_crashes 0
incr total_crashes
incrby total_crashes 10
```
