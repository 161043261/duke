# Jedis

jedis 是线程不安全的, 频繁的创建和销毁 redis 连接有性能损耗, 应该使用 jedis 连接池
