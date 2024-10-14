package src

import (
	"context"
	"fmt"
	"testing"

	"github.com/redis/go-redis/v9"
)

func Test_set_get(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bike:1")
	res1, _ := rdb.Set(ctx, "bike:1", "Deimos", 0).Result()
	fmt.Println(res1) // >>> O
	res2, _ := rdb.Get(ctx, "bike:1").Result()
	fmt.Println(res2) // >>> Deimos
}

func Test_setnx_xx(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Set(ctx, "bike:1", "Deimos", 0)
	res3, _ := rdb.SetNX(ctx, "bike:1", "bike", 0).Result()
	fmt.Println(res3) // >>> false
	res4, _ := rdb.Get(ctx, "bike:1").Result()
	fmt.Println(res4) // >>> Deimos
	res5, _ := rdb.SetXX(ctx, "bike:1", "bike", 0).Result()
	fmt.Println(res5) // >>> OK
}

func Test_mset(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bike:1", "bike:2", "bike:3")
	res6, _ := rdb.MSet(ctx, "bike:1", "Deimos", "bike:2", "Ares", "bike:3", "Vanth").Result()
	fmt.Println(res6) // >>> OK
	res7, _ := rdb.MGet(ctx, "bike:1", "bike:2", "bike:3").Result()
	fmt.Println(res7) // >>> [Deimos Ares Vanth]
}

func Test_incr(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "total_crashes")
	res8, _ := rdb.Set(ctx, "total_crashes", "0", 0).Result()
	fmt.Println(res8) // >>> OK
	res9, _ := rdb.Incr(ctx, "total_crashes").Result()
	fmt.Println(res9) // >>> 1
	res10, _ := rdb.IncrBy(ctx, "total_crashes", 10).Result()
	fmt.Println(res10) // >>> 11
}
