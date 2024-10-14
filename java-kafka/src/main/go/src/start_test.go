package src

import (
	"context"
	"log"
	"strconv"
	"testing"
	"time"

	"github.com/IBM/sarama"
)

func produce(topic string, loop int) {
	// 创建生产者配置对象
	config := sarama.NewConfig()
	config.Producer.Return.Successes = true
	config.Producer.Return.Errors = true
	// 指定 Kafka 服务器套接字
	producer, err := sarama.NewSyncProducer([]string{"127.0.0.1:9092"}, config)
	if err != nil {
		panic(err)
	}

	defer producer.Close()

	for i := 0; i < loop; i++ {
		str := "value-" + strconv.Itoa(i)
		// 创建消息（也称为记录、事件）
		msg := &sarama.ProducerMessage{
			Topic: topic,
			// 指定键的序列化（对象 -> 字节流）方法
			Key: sarama.StringEncoder("key-" + strconv.Itoa(i)), // 类型转换
			// 指定值的序列化（对象 -> 字节流）方法
			Value: sarama.StringEncoder(str), // 类型转换
		}
		// 生产者发送记录到 Kafka 服务器
		// offset 偏移量（消费进度）
		partition, offset, err := producer.SendMessage(msg)
		if err != nil {
			panic(err)
		} else {
			log.Printf("[Producer] partition: %d, offset: %d, value: %s\n", partition, offset, str)
		}
	}
}

func consume(topic string) {
	// 创建消费者配置对象
	config := sarama.NewConfig()
	// 指定 Kafka 服务器套接字
	consumer, err := sarama.NewConsumer([]string{"127.0.0.1:9092"}, config)
	if err != nil {
		panic(err)
	}
	defer consumer.Close()

	partitionConsumer, err := consumer.ConsumePartition(
		topic,               // topic 主题
		0,                   // partition 分区
		sarama.OffsetNewest, // offset 偏移量（消费进度）
	)
	if err != nil {
		panic(err)
	}
	defer partitionConsumer.Close()
	// 从主题 topic 中获取记录
	for msg := range partitionConsumer.Messages() {
		log.Printf("[Consumer] partition: %d, offset: %d, value: %s\n", msg.Partition, msg.Offset, string(msg.Value))
	}
}

func TestStart(t *testing.T) {
	topic := "start-test"
	go produce(topic, 10)
	go consume(topic)

	// ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	// defer cancel()
	// <-ctx.Done()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	<-ctx.Done()

	log.Println("Timeout! graceful exit")
}
