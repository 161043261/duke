package com.bronya.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;


@Configuration
public class RedisConf {

  //! 方法名
  @Bean
  public RedisTemplate<String, Object> redisTemplateBean(RedisConnectionFactory factory) {
    // 创建 RedisTemplate 连接对象
    var redisTemplate = new RedisTemplate<String, Object>();
    // 设置连接工厂
    redisTemplate.setConnectionFactory(factory);
    // 创建 JSON 序列化工具
    var jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
    // 设置 key, hashKey 的序列化方式: 字符串序列化
    redisTemplate.setKeySerializer(RedisSerializer.string());
    redisTemplate.setHashKeySerializer(RedisSerializer.string());
    // 设置 value, hashValue 的序列化方式: JSON 序列化
    redisTemplate.setValueSerializer(jsonRedisSerializer);
    redisTemplate.setHashValueSerializer(jsonRedisSerializer);
    return redisTemplate;
  }
}
