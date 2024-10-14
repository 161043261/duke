# set 集合

### 基本命令

键 === 唯一字符串的无序集合

| 命令      | 说明                                                     |
| --------- | -------------------------------------------------------- |
| sadd      | 向 set 集合中添加一个或多个元素，如果 set 中已存在则忽略 |
| srem      | 从 set 集合中移除一个或多个元素                          |
| sismember | 判断 set 集合中是否存在该元素                            |
| smembers  | 获取 set 集合的所有元素                                  |
| sinter    | 计算两个或多个 set 的交集                                |
| sunion    | 计算两个或多个 set 的并集                                |
| sdiff     | 计算两个或多个 set 的差集                                |
| scard     | 返回 set 集合的大小（基数）                              |
| srem      | 从 set 集合中移除一个或多个元素                          |
| spop      | 从 set 集合中移除随机一个元素                            |

```shell
# bikes:racing:france 参加法国比赛的自行车集合
# bikes:racing:usa 参加美国比赛的自行车集合
sadd bikes:racing:france bike:1
sadd bikes:racing:france bike:1
sadd bikes:racing:france bike:2 bike:3
sadd bikes:racing:usa bike:1 bike:4
```

```shell
# bike:1 是否参加美国比赛
sismember bikes:racing:usa bike:1 # 1
# bike:2 是否参加美国比赛
sismember bikes:racing:usa bike:2 # 0
```

```shell
# 同时参加两个比赛的自行车
sinter bikes:racing:france bikes:racing:usa # bike:1
```

```shell
# 参加法国比赛的自行车数量
scard bikes:racing:france # 3
```

```shell
sadd bikes:racing:france bike:1 bike:2 bike:3
sadd bikes:racing:usa bike:1 bike:4
# 只参加法国比赛，未参加美国比赛的自行车
# 参加法国比赛的自行车集合 - 交集
sdiff bikes:racing:france bikes:racing:usa
```

```shell
sadd bikes:racing:france bike:1 bike:2 bike:3
sadd bikes:racing:usa bike:1 bike:4
sadd bikes:racing:italy bike:1 bike:2 bike:3 bike:4
# 法国、美国、意大利的交集
sinter bikes:racing:france bikes:racing:usa bikes:racing:italy # "bike:1"
# 法国、美国、意大利的并集
sunion bikes:racing:france bikes:racing:usa bikes:racing:italy
```

### 差集

```shell
# 只参加法国比赛，未参加美国、意大利比赛的自行车
sdiff bikes:racing:france bikes:racing:usa bikes:racing:italy
# 只参加法国比赛，未参加美国比赛的自行车
sdiff bikes:racing:france bikes:racing:usa
# 只参加美国比赛，未参加法国比赛的自行车
sdiff bikes:racing:usa bikes:racing:france
```

### 从集合中移除元素

- srem 从 set 中移除一个或多个元素
- spop 从 set 中移除随机一个元素

```shell
sadd bikes:racing:france bike:1 bike:2 bike:3 bike:4 bike:5
# 移除一个元素
srem bikes:racing:france bike:1
# 移除随机一个元素
spop bikes:racing:france
# 获取 set 中的所有元素
smembers bikes:racing:france
```
