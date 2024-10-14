# hash 哈希

- 键 === 哈希表（两两一组的，字段、字段值的集合 k1 v1 k2 v2 ...）
- 哈希用于 map、对象存储

| 命令      | 说明                                      |
| --------- | ----------------------------------------- |
| hset      | 设置哈希表中一个或多个字段的值            |
| hget      | 查询一个字段                              |
| hgetall   | 查询所有字段                              |
| hmget     | 查询一个或多个字段                        |
| hincrby n | 原子的、将字段（字符串）解析为整数，并 +n |
| hlen      | 获取哈希表的长度                          |

```shell
hset bike:1 \ # 键
model Deimos brand Ergonom type 'Enduro bikes' price 4972 # 哈希表（两两一组的 kv 集合 k1 v1 k2 v2 ...）

hget bike:1 model
hget bike:1 price
hgetall bike:1
hmget bike:1 model price no-such-field
```

### 例：计数器

一个骑车 ride 次数、撞车 crash 次数或更换车主 owner 次数的计数器

```shell
hincrby bike:1:stats rides 1      # 骑车次数 +1
hincrby bike:1:stats rides 1      # 骑车次数 +1
hincrby bike:1:stats rides 1      # 骑车次数 +1
hincrby bike:1:stats crashes 1    # 撞车次数 +1
hincrby bike:1:stats owners 1     # 更换车主次数 +1
hget bike:1:stats rides           # 3
hmget bike:1:stats owners crashes # 1 1
```

### 哈希表的字段过期

TTL, Time To Live 存活时间

| 命令       | 说明                        |
| ---------- | --------------------------- |
| hexpire    | 设置存活时间，单位 s        |
| hpexpire   | 设置存活时间，单位 ms       |
| hexpireat  | 设置死亡时间戳，单位 s      |
| hpexpireat | 设置死亡时间戳，单位 ms     |
| httl       | 获取剩余的存活时间，单位 s  |
| hpttl      | 获取剩余的存活时间，单位 ms |
| hpersist   | 移除存活时间                |

官方客户端暂不支持哈希字段过期
