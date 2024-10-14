package com.bronya;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;
import java.util.concurrent.*;

public class StartTest {
  public static void main(String[] args) {
    // 生产者线程
    var tProducer = new Thread(() -> {
      // 创建生产者配置对象
      var conf = new Properties();
      // 指定键的序列化（对象 -> 字节流）方法
      conf.put("bootstrap.servers", "127.0.0.1:9092");
      // 指定值的序列化（对象 -> 字节流）方法
      conf.put("key.serializer", StringSerializer.class.getName());
      conf.put("value.serializer", StringSerializer.class.getName());

      try ( // 使用 try-with-resources
            // 创建生产者对象
            var producer = new KafkaProducer<String, String>(conf)) {
        // 创建记录（也称为事件、消息）
        for (int i = 0; i < 10; i++) {
          var rec = new ProducerRecord<String /* K */, String /* V */>("start-test", /* String topic 主题，可以自动创建 */
              /* Integer partition, optional 分区 */
              /* Headers headers, optional */
              "key-" + i, /* K key, generics 键 */
              "value-" + i /* V value, generics 值 */
              /* Long timestamp */);
          // 生产者发送记录到 Kafka 服务器
          producer.send(rec);
        }
        // 关闭生产者
        // producer.close();
      }
    });

    tProducer.start();
    try {
      tProducer.join();
    } catch (InterruptedException ignored) {
    }

    try (var executorService = Executors.newSingleThreadExecutor()) {
      Future<Object> future = executorService.submit(() -> {
        // 创建消费者配置对象
        var conf = new Properties();
        // 指定 Kafka 服务器套接字
        conf.put("bootstrap.servers", "127.0.0.1:9092");
        // 指定 Kafka 反序列化（字节流 -> 对象）方法
        conf.put("key.deserializer", StringDeserializer.class.getName());
        conf.put("value.deserializer", StringDeserializer.class.getName());
        conf.put("group.id", "java");
        try ( // 使用 try-with-resources
              // 创建消费者对象
              var consumer = new KafkaConsumer<String, String>(conf)) {
          // 订阅主题，可以订阅多个主题
          // java.util.Collection 集合的根接口
          // java.util.Collections 工具类，提供一组操作集合的静态方法
          consumer.subscribe(Collections.singletonList("start-test"));
          while (true) {
            // 从主题 topic 中获取记录
            ConsumerRecords<String, String> recs = consumer.poll(Duration.ofSeconds(3));
            for (ConsumerRecord<String, String> rec : recs) {
              System.out.printf(Thread.currentThread().getName() + " Key: %s, Value: %s\n", rec.key(), rec.value());
            }
          }
        }
      });

      try {
        future.get(10, TimeUnit.SECONDS);
      } catch (ExecutionException | InterruptedException | TimeoutException e) {
        executorService.shutdown();
        System.out.println("Timeout!");
        System.exit(0);
      }
    }
  }
}
