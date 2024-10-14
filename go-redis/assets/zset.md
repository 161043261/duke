# zset 有序集合

- 有序集合是唯一字符串的有序集合，命令以 s 开头
- 字符串按分数 score 排序，分数相同时按字典排序
- zset 有序集合可以看作 set 无序集合和 hash 哈希的混合体。有序集合的每个元素 (键) 都关联一个浮点类型的分数 (值)
- 有序集合通过跳表和哈希表（字典）实现，添加元素时排序，添加元素的时间复杂度是 O(log(N))

| 命令             | 说明                                                           |
| ---------------- | -------------------------------------------------------------- |
| zadd             | 向 zset 有序集合中添加一个或多个元素，如果 zset 中已存在则忽略 |
| zrem             | 从 zset 有序集合中移除一个或多个元素                           |
| zrange           | 获取下标区间的元素，升序排序，分数由低到高                     |
| zrevrange        | 获取下标区间的元素，降序排序，分数由高到低                     |
| zrangebyscore    | 获取成绩区间的元素，升序排序，分数由低到高                     |
| zremrangebyscore | 获取成绩区间的元素，降序排序，分数由高到低                     |
| zrank            | 获取升序排序时，某元素的排名                                   |
| zrevrank         | 获取降序排序时，某元素的排名                                   |

```shell
#! set:  sadd set_key  k1     v1    k2     v2    ...
#! zset: zadd zset_key score1 elem1 score2 elem2 ...
zadd racer_scores 10 "Norem" # score elem
zadd racer_scores 12 "Castilla"
zadd racer_scores 8 "Sam-Bodden" 10 "Royce" 6 "Ford" 14 "Prickett"
zrange racer_scores 0 -1    # 升序排序，分数由低到高
zrevrange racer_scores 0 -1 # 降序排序，分数由高到低
zrange racer_scores 0 -1 withscores
```

**范围操作**

```shell
# 获取分数 <= 10 的赛车手
zrangebyscore racer_scores -inf 10
# 从 zset 无序集合中移除元素
zrem racer_scores "Castilla"
# 从 zset 无序集合中移除分数 <= 9 的赛车手
zremrangebyscore racer_scores -inf 9
# 获取所有赛车手
zrange racer_scores 0 -1 [withscores]
# 获取升序排序时，某元素的排名
zrank racer_scores "Norem" # 0
# 获取降序排序时，某元素的排名
zrevrank racer_scores "Norem" # 3
```

clang-format -i --style=google $(SRCS)

**字典序**

| 命令                | 说明           |
| ------------------- | -------------- |
| zrangebylex         | 字典序升序排序 |
| zrevrangebylex      | 字典序降序排序 |
| zremrangebylexcount |                |

```shell
zadd racer_scores 0 "Norem" 0 "Sam-Bodden" 0 "Royce" 0 "Castilla" 0 "Prickett" 0 "Ford"
zrange racer_scores 0 -1
zrangebylex racer_scores [A [L # [A, L)
# [A [L
# [A (L
# (A [L
# (A (L
# 都可以，都表示左闭右开区间
# - 表示负无穷
# + 表示正无穷
```

### 例

```shell
zadd racer_scores 100 "Wood"
zadd racer_scores 100 "Henshaw"
zadd racer_scores 150 "Henshaw" # 忽略！
zincrby racer_scores 50 "Wood"
zincrby racer_scores 50 "Henshaw"
```
