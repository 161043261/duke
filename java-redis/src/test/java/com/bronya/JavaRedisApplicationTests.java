package com.bronya;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
class JavaRedisApplicationTests {

  // ! 方法名
  // public RedisConf::RedisTemplate<String, Object> redisTemplateBean(
  // RedisConnectionFactory factory);
  @Autowired
  // private RedisTemplate<String, String> redisTemplate;
  private RedisTemplate<String, Object> redisTemplateBean;

  @Test // mvn test -Dtest=JavaRedisApplicationTests#testString -q
  void testString() {

    ValueOperations<String, Object> op = redisTemplateBean.opsForValue();
    op.set("name", "Netty 的神");

    var name = (String) op.get("name");
    System.out.println("name = " + name);
  }

  @Test // mvn test -Dtest=JavaRedisApplicationTests#testObj -q
  void testObj() {

    record User(String name, Integer age) {
    }

    redisTemplateBean.opsForValue().set("user:3", new User("骑手", 7));
    var user = (User) redisTemplateBean.opsForValue().get("user:3");
    System.out.println(user);
  }
}
