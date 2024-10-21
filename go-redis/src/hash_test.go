package src

import (
	"context"
	"fmt"
	"testing"

	"github.com/redis/go-redis/v9"
)

// ! hset bike:1 model Deimos brand Ergonom type 'Enduro bikes' price 4972
func Test_set_get_all(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bike:1")

	// hash 存储字符串数组
	hashFields := []string{
		"model", "Deimos",
		"brand", "Ergonom",
		"type", "Enduro bikes",
		"price", "4972",
	}
	res1, _ := rdb.HSet(ctx, "bike:1", hashFields).Result()
	fmt.Println(res1) // >>> 4
	res2, _ := rdb.HGet(ctx, "bike:1", "model").Result()
	fmt.Println(res2) // >>> Deimos
	res3, _ := rdb.HGet(ctx, "bike:1", "price").Result()
	fmt.Println(res3) // >>> 4972
	cmdReturn := rdb.HGetAll(ctx, "bike:1")
	res4, _ := cmdReturn.Result()
	fmt.Println(res4)
	// >>> map[brand:Ergonom model:Deimos price:4972 type:Enduro bikes]

	// 映射到结构体对象
	type BikeInfo struct {
		Model string `redis:"model"`
		Brand string `redis:"brand"`
		Type  string `redis:"type"`
		Price int    `redis:"price"`
	}
	var res4a BikeInfo
	if err := cmdReturn.Scan(&res4a); err != nil {
		panic(err)
	}
	fmt.Printf("Model: %v, Brand: %v, Type: %v, Price: $%v\n",
		res4a.Model, res4a.Brand, res4a.Type, res4a.Price)
}

func Test_hmget(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bike:1")
	hashFields := []string{
		"model", "Deimos",
		"brand", "Ergonom",
		"type", "Enduro bikes",
		"price", "4972",
	}
	rdb.HSet(ctx, "bike:1", hashFields).Result()
	cmdReturn := rdb.HMGet(ctx, "bike:1", "model", "price")
	res5, _ := cmdReturn.Result()
	fmt.Println(res5) // >>> [Deimos 4972]
	type BikeInfo struct {
		Model string `redis:"model"`
		Brand string `redis:"-"`
		Type  string `redis:"-"`
		Price int    `redis:"price"`
	}
	var res5a BikeInfo
	if err := cmdReturn.Scan(&res5a); err != nil {
		panic(err)
	}
	fmt.Printf("Model: %v, Price: $%v\n", res5a.Model, res5a.Price)
}

func Test_hincrby(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bike:1")
	hashFields := []string{
		"model", "Deimos",
		"brand", "Ergonom",
		"type", "Enduro bikes",
		"price", "4972",
	}
	rdb.HSet(ctx, "bike:1", hashFields).Result()
	res6, _ := rdb.HIncrBy(ctx, "bike:1", "price", 100).Result()
	fmt.Println(res6) // >>> 5072
	res7, _ := rdb.HIncrBy(ctx, "bike:1", "price", -100).Result()
	fmt.Println(res7) // >>> 4972
}

func Test_incrby_get_mget(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bike:1:stats")
	res8, _ := rdb.HIncrBy(ctx, "bike:1:stats", "rides", 1).Result()
	fmt.Println(res8) // >>> 1
	res9, _ := rdb.HIncrBy(ctx, "bike:1:stats", "rides", 1).Result()
	fmt.Println(res9) // >>> 2
	res10, _ := rdb.HIncrBy(ctx, "bike:1:stats", "rides", 1).Result()
	fmt.Println(res10) // >>> 3
	res11, _ := rdb.HIncrBy(ctx, "bike:1:stats", "crashes", 1).Result()
	fmt.Println(res11) // >>> 1
	res12, _ := rdb.HIncrBy(ctx, "bike:1:stats", "owners", 1).Result()
	fmt.Println(res12) // >>> 1
	res13, _ := rdb.HGet(ctx, "bike:1:stats", "rides").Result()
	fmt.Println(res13) // >>> 3
	res14, _ := rdb.HMGet(ctx, "bike:1:stats", "crashes", "owners").Result()
	fmt.Println(res14) // >>> [1 1]
}