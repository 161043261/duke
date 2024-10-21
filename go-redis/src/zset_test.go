package src

import (
	"context"
	"fmt"
	"testing"

	"github.com/redis/go-redis/v9"
)

func Test_zadd(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	res1, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
	).Result()
	fmt.Println(res1) // >>> 1
	res2, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Castilla", Score: 12},
	).Result()
	fmt.Println(res2) // >>> 1
	res3, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
		redis.Z{Member: "Sam-Bodden", Score: 8},
		redis.Z{Member: "Royce", Score: 10},
		redis.Z{Member: "Ford", Score: 6},
		redis.Z{Member: "Prickett", Score: 14},
		redis.Z{Member: "Castilla", Score: 12},
	).Result()
	fmt.Println(res3) // >>> 4
}

func Test_zrange(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
		redis.Z{Member: "Sam-Bodden", Score: 8},
		redis.Z{Member: "Royce", Score: 10},
		redis.Z{Member: "Ford", Score: 6},
		redis.Z{Member: "Prickett", Score: 14},
		redis.Z{Member: "Castilla", Score: 12},
	).Result()
	res4, _ := rdb.ZRange(ctx, "racer_scores", 0, -1).Result()
	fmt.Println(res4)
	res5, _ := rdb.ZRevRange(ctx, "racer_scores", 0, -1).Result()
	fmt.Println(res5)
}

func Test_zrangewithscores(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
		redis.Z{Member: "Sam-Bodden", Score: 8},
		redis.Z{Member: "Royce", Score: 10},
		redis.Z{Member: "Ford", Score: 6},
		redis.Z{Member: "Prickett", Score: 14},
		redis.Z{Member: "Castilla", Score: 12},
	).Result()
	res6, _ := rdb.ZRangeWithScores(ctx, "racer_scores", 0, -1).Result()
	fmt.Println(res6)
}

func Test_zrangebyscore(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
		redis.Z{Member: "Sam-Bodden", Score: 8},
		redis.Z{Member: "Royce", Score: 10},
		redis.Z{Member: "Ford", Score: 6},
		redis.Z{Member: "Prickett", Score: 14},
		redis.Z{Member: "Castilla", Score: 12},
	).Result()
	res7, _ := rdb.ZRangeByScore(ctx, "racer_scores",
		&redis.ZRangeBy{Min: "-inf", Max: "10"},
	).Result()
	fmt.Println(res7)
}

func Test_zremrangebyscore(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
		redis.Z{Member: "Sam-Bodden", Score: 8},
		redis.Z{Member: "Royce", Score: 10},
		redis.Z{Member: "Ford", Score: 6},
		redis.Z{Member: "Prickett", Score: 14},
		redis.Z{Member: "Castilla", Score: 12},
	).Result()
	res8, _ := rdb.ZRem(ctx, "racer_scores", "Castilla").Result()
	fmt.Println(res8) // >>> 1
	res9, _ := rdb.ZRemRangeByScore(ctx, "racer_scores", "-inf", "9").Result()
	fmt.Println(res9) // >>> 2
	res10, _ := rdb.ZRange(ctx, "racer_scores", 0, -1).Result()
	fmt.Println(res10)
}

func Test_zrank(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 10},
		redis.Z{Member: "Royce", Score: 10},
		redis.Z{Member: "Prickett", Score: 14},
	).Result()
	res11, _ := rdb.ZRank(ctx, "racer_scores", "Norem").Result()
	fmt.Println(res11) // >>> 0
	res12, _ := rdb.ZRevRank(ctx, "racer_scores", "Norem").Result()
	fmt.Println(res12) // >>> 2
}

func Test_zaddlex(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 0},
		redis.Z{Member: "Royce", Score: 0},
		redis.Z{Member: "Prickett", Score: 0},
	).Result()
	res13, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Norem", Score: 0},
		redis.Z{Member: "Sam-Bodden", Score: 0},
		redis.Z{Member: "Royce", Score: 0},
		redis.Z{Member: "Ford", Score: 0},
		redis.Z{Member: "Prickett", Score: 0},
		redis.Z{Member: "Castilla", Score: 0},
	).Result()
	fmt.Println(res13) // >>> 3
	res14, _ := rdb.ZRange(ctx, "racer_scores", 0, -1).Result()
	fmt.Println(res14)
	res15, _ := rdb.ZRangeByLex(ctx, "racer_scores", &redis.ZRangeBy{
		Min: "[A", Max: "[L",
	}).Result()
	fmt.Println(res15) // >>> [Castilla Ford]
}

func Test_leaderboard(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "racer_scores")
	res16, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Wood", Score: 100},
	).Result()
	fmt.Println(res16) // >>> 1
	res17, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Henshaw", Score: 100},
	).Result()
	fmt.Println(res17) // >>> 1
	res18, _ := rdb.ZAdd(ctx, "racer_scores",
		redis.Z{Member: "Henshaw", Score: 150},
	).Result()
	fmt.Println(res18) // >>> 0
	res19, _ := rdb.ZIncrBy(ctx, "racer_scores", 50, "Wood").Result()
	fmt.Println(res19) // >>> 150
	res20, _ := rdb.ZIncrBy(ctx, "racer_scores", 50, "Henshaw").Result()
	fmt.Println(res20) // >>> 200
}
