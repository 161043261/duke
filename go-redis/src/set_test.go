package src

import (
	"context"
	"fmt"
	"testing"

	"github.com/redis/go-redis/v9"
)

func Test_sadd(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.Del(ctx, "bikes:racing:usa")
	res1, _ := rdb.SAdd(ctx, "bikes:racing:france", "bike:1").Result()
	fmt.Println(res1) // >>> 1
	res2, _ := rdb.SAdd(ctx, "bikes:racing:france", "bike:1").Result()
	fmt.Println(res2) // >>> 0
	res3, _ := rdb.SAdd(ctx, "bikes:racing:france", "bike:2", "bike:3").Result()
	fmt.Println(res3) // >>> 2
	res4, _ := rdb.SAdd(ctx, "bikes:racing:usa", "bike:1", "bike:4").Result()
	fmt.Println(res4) // >>> 2
}

func Test_sismember(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.Del(ctx, "bikes:racing:usa")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	rdb.SAdd(ctx, "bikes:racing:usa", "bike:1", "bike:4").Result()
	res5, _ := rdb.SIsMember(ctx, "bikes:racing:usa", "bike:1").Result()
	fmt.Println(res5) // >>> true
	res6, _ := rdb.SIsMember(ctx, "bikes:racing:usa", "bike:2").Result()
	fmt.Println(res6) // >>> false
}

func Test_sinter(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.Del(ctx, "bikes:racing:usa")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	rdb.SAdd(ctx, "bikes:racing:usa", "bike:1", "bike:4").Result()
	res7, _ := rdb.SInter(ctx, "bikes:racing:france", "bikes:racing:usa").Result()
	fmt.Println(res7) // >>> [bike:1]
}

func Test_scard(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	res8, _ := rdb.SCard(ctx, "bikes:racing:france").Result()
	fmt.Println(res8) // >>> 3
}

func Test_saddsmembers(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	res9, _ := rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	fmt.Println(res9) // >>> 3
	res10, _ := rdb.SMembers(ctx, "bikes:racing:france").Result()
	fmt.Println(res10) // >>> [bike:1 bike:2 bike:3]
}

func Test_smismember(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	res11, _ := rdb.SIsMember(ctx, "bikes:racing:france", "bike:1").Result()
	fmt.Println(res11) // >>> true
	res12, _ := rdb.SMIsMember(ctx, "bikes:racing:france", "bike:2", "bike:3", "bike:4").Result()
	fmt.Println(res12) // >>> [true true false]
}

func Test_sdiff(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.Del(ctx, "bikes:racing:usa")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	rdb.SAdd(ctx, "bikes:racing:usa", "bike:1", "bike:4").Result()
	res13, _ := rdb.SDiff(ctx, "bikes:racing:france", "bikes:racing:usa").Result()
	fmt.Println(res13) // >>> [bike:2 bike:3]
}

func Test_multisets(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.Del(ctx, "bikes:racing:usa")
	rdb.Del(ctx, "bikes:racing:italy")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3").Result()
	rdb.SAdd(ctx, "bikes:racing:usa", "bike:1", "bike:4").Result()
	rdb.SAdd(ctx, "bikes:racing:italy", "bike:1", "bike:2", "bike:3", "bike:4").Result()
	res14, _ := rdb.SInter(ctx, "bikes:racing:france", "bikes:racing:usa", "bikes:racing:italy").Result()
	fmt.Println(res14) // >>> [bike:1]
	res15, _ := rdb.SUnion(ctx, "bikes:racing:france", "bikes:racing:usa", "bikes:racing:italy").Result()
	fmt.Println(res15) // >>> [bike:1 bike:2 bike:3 bike:4]
	res16, _ := rdb.SDiff(ctx, "bikes:racing:france", "bikes:racing:usa", "bikes:racing:italy").Result()
	fmt.Println(res16) // >>> []
	res17, _ := rdb.SDiff(ctx, "bikes:racing:usa", "bikes:racing:france").Result()
	fmt.Println(res17) // >>> [bike:4]
	res18, _ := rdb.SDiff(ctx, "bikes:racing:france", "bikes:racing:usa").Result()
	fmt.Println(res18) // >>> [bike:2 bike:3]
}

func Test_srem(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:racing:france")
	rdb.SAdd(ctx, "bikes:racing:france", "bike:1", "bike:2", "bike:3", "bike:4", "bike:5").Result()
	res19, _ := rdb.SRem(ctx, "bikes:racing:france", "bike:1").Result()
	fmt.Println(res19) // >>> 1
	res20, _ := rdb.SPop(ctx, "bikes:racing:france").Result()
	fmt.Println(res20) // >>> <random element>
	res21, _ := rdb.SMembers(ctx, "bikes:racing:france").Result()
	fmt.Println(res21) // >>> <remaining elements>
	res22, _ := rdb.SRandMember(ctx, "bikes:racing:france").Result()
	fmt.Println(res22) // >>> <random element>
}
