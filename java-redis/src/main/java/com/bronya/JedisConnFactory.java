package com.bronya;

import java.time.Duration;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisConnFactory {
  // Jedis 连接池
  private static final JedisPool jedisPool;

  static {
    var jedisPoolConf = new JedisPoolConfig();
    // 最大连接数
    jedisPoolConf.setMaxTotal(8);
    // 最大空闲连接数
    jedisPoolConf.setMaxIdle(8);
    // 最小空闲连接数
    jedisPoolConf.setMinIdle(0);
    // 最长等待时间
    jedisPoolConf.setMaxWait(Duration.ofMillis(200));
    jedisPool = new JedisPool(jedisPoolConf, "127.0.0.1", 6379, 1000, null);
  }

  // 获取 Jedis 对象
  public static Jedis getJedis() {
    return jedisPool.getResource();
  }
}
