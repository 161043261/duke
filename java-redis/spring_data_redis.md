# Spring Data Redis

| API                         | 返回值类型      | 说明                      |
| --------------------------- | --------------- | ------------------------- |
| redisTemplate.opsForValue() | ValueOperations | 操作 String 类型的数据    |
| redisTemplate.opsForHash()  | HashOperations  | 操作 Hash 类型的数据      |
| redisTemplate.opsForList()  | ListOperations  | 操作 List 类型的数据      |
| redisTemplate.opsForSet()   | SetOperations   | 操作 Set 类型的数据       |
| redisTemplate.opsForZSet()  | ZSetOperations  | 操作 SortedSet 类型的数据 |
| redisTemplate               |                 | 通用操作                  |

```shell
# 查看所有 key
keys *
# 删除 kv
del [keyName]
```

为了 json 反序列化 (字节流 -> java 对象) 时知道对象的类型

json 序列化时会将类的 class 写入字节流, 并存入 redis

```json
{
  "@class": "com.bronya.JavaRedisApplicationTests$1User",
  "name": "骑手",
  "age": 7
}
```

解决

1. 手动序列化
2. 使用 `StringRedisTemplate`
