package com.bronya;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
class JavaRedisApplicationTests {

  // ! 方法名
  // public RedisConf::RedisTemplate<String, Object> redisTemplateBean(
  // RedisConnectionFactory factory);
  @Autowired
  // private RedisTemplate<String, String> redisTemplate;
  private RedisTemplate<String, Object> redisTemplateBean;

  @Autowired private StringRedisTemplate stringRedisTemplate;

  @Test // mvn test -Dtest=JavaRedisApplicationTests#testString -q
  void testString() {

    ValueOperations<String, Object> op = redisTemplateBean.opsForValue();
    op.set("name", "Netty 的神");

    var name = (String) op.get("name");
    System.out.println("name = " + name);
  }

  @Test // mvn test -Dtest=JavaRedisApplicationTests#testTemplate -q
  void testTemplate() {
    record User(String name, Integer age) {}
    redisTemplateBean.opsForValue().set("user:1", new User("刻晴", 7));
    var user = (User) redisTemplateBean.opsForValue().get("user:1");
    System.out.println(user);
  }

  @Autowired private StringRedisTemplate strRedisTemplate;
  private static final ObjectMapper mapper = new ObjectMapper();

  @Test
  void testStringTemplate() throws JsonProcessingException {
    record User(String name, Integer age) {}
    // 序列化
    String jsonStr = mapper.writeValueAsString(new User("胡桃", 8));
    System.out.println(jsonStr); // {"name":"胡桃","age":8}
    strRedisTemplate.opsForValue().set("user:2", jsonStr);
    String jsonStr_ = strRedisTemplate.opsForValue().get("user:2");
    System.out.println(jsonStr.equals(jsonStr_));
    // 反序列化
    User user = mapper.readValue(jsonStr_, User.class);
    System.out.println(user); // User[name=胡桃, age=8]
  }

  @Test
  void testHash() {
    stringRedisTemplate.opsForHash().put("user:3", "name", "甘雨");
    stringRedisTemplate.opsForHash().put("user:3", "age", "3");
    Map<Object, Object> entries = stringRedisTemplate.opsForHash().entries("user:3");
    System.out.println(entries);
  }
}
