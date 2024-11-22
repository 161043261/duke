package com.bronya;

import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import redis.clients.jedis.Jedis;

public class JedisTest {
  private Jedis jedis;

  @BeforeEach
  void init() {
    // this.jedis = new Jedis("127.0.0.1", 6379);
    this.jedis = JedisConnFactory.getJedis();
    // jedis.auth("password");

    // Select the DB with having the specified zero-based numeric index.
    // For default every new connection is automatically selected to DB 0.
    jedis.select(0);
  }

  @AfterEach
  void tearDown() {
    if (jedis != null) {
      jedis.close();
    }
  }

  @Test
  void testString() {
    String result = jedis.set("name", "Evan You");
    System.out.println("result = " + result);
    String name = jedis.get("name");
    System.out.println("name = " + name);
  }

  @Test // mvn test -Dtest=JedisTest#testHash -q
  void testHash() {
    jedis.hset("user:1", "name", "Evan You");
    String field = jedis.hget("user:1", "name");
    System.out.println(field);
    jedis.hset("user:1", "framework", "Vue");
    Map<String, String> kvs = jedis.hgetAll("user:1");
    System.out.println(kvs);
  }
}
