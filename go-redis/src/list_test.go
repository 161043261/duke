package src

import (
	"context"
	"fmt"
	"testing"

	"github.com/redis/go-redis/v9"
)

func Test_queue(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res1, _ := rdb.LPush(ctx, "bikes:repairs", "bike:1").Result()
	fmt.Println(res1) // >>> 1
	res2, _ := rdb.LPush(ctx, "bikes:repairs", "bike:2").Result()
	fmt.Println(res2) // >>> 2
	res3, _ := rdb.RPop(ctx, "bikes:repairs").Result()
	fmt.Println(res3) // >>> bike:1
	res4, _ := rdb.RPop(ctx, "bikes:repairs").Result()
	fmt.Println(res4) // >>> bike:2
}

func Test_stack(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res5, _ := rdb.LPush(ctx, "bikes:repairs", "bike:1").Result()
	fmt.Println(res5) // >>> 1
	res6, _ := rdb.LPush(ctx, "bikes:repairs", "bike:2").Result()
	fmt.Println(res6) // >>> 2
	res7, _ := rdb.LPop(ctx, "bikes:repairs").Result()
	fmt.Println(res7) // >>> bike:2
	res8, _ := rdb.LPop(ctx, "bikes:repairs").Result()
	fmt.Println(res8) // >>> bike:1
}

func Test_llen(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res9, _ := rdb.LLen(ctx, "bikes:repairs").Result()
	fmt.Println(res9) // >>> 0
}

func Test_lmove_lrange(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	rdb.Del(ctx, "bikes:finished")
	res10, _ := rdb.LPush(ctx, "bikes:repairs", "bike:1").Result()
	fmt.Println(res10) // >>> 1
	res11, _ := rdb.LPush(ctx, "bikes:repairs", "bike:2").Result()
	fmt.Println(res11) // >>> 2
	res12, _ := rdb.LMove(ctx, "bikes:repairs", "bikes:finished", "LEFT", "LEFT").Result()
	fmt.Println(res12) // >>> bike:2
	res13, _ := rdb.LRange(ctx, "bikes:repairs", 0, -1).Result()
	fmt.Println(res13) // >>> [bike:1]
	res14, _ := rdb.LRange(ctx, "bikes:finished", 0, -1).Result()
	fmt.Println(res14) // >>> [bike:2]
}

func Test_lpush_rpush(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res15, _ := rdb.RPush(ctx, "bikes:repairs", "bike:1").Result()
	fmt.Println(res15) // >>> 1
	res16, _ := rdb.RPush(ctx, "bikes:repairs", "bike:2").Result()
	fmt.Println(res16) // >>> 2
	res17, _ := rdb.LPush(ctx, "bikes:repairs", "bike:important_bike").Result()
	fmt.Println(res17) // >>> 3
	res18, _ := rdb.LRange(ctx, "bikes:repairs", 0, -1).Result()
	fmt.Println(res18) // >>> [bike:important_bike bike:1 bike:2]
}

func Test_variadic(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res19, _ := rdb.RPush(ctx, "bikes:repairs", "bike:1", "bike:2", "bike:3").Result()
	fmt.Println(res19) // >>> 3
	res20, _ := rdb.LPush(ctx, "bikes:repairs", "bike:important_bike", "bike:very_important_bike").Result()
	fmt.Println(res20) // >>> 5
	res21, _ := rdb.LRange(ctx, "bikes:repairs", 0, -1).Result()
	fmt.Println(res21) // >>> [bike:very_important_bike bike:important_bike bike:1 bike:2 bike:3]
}

func Test_lpop_rpop(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res22, _ := rdb.RPush(ctx, "bikes:repairs", "bike:1", "bike:2", "bike:3").Result()
	fmt.Println(res22) // >>> 3
	res23, _ := rdb.RPop(ctx, "bikes:repairs").Result()
	fmt.Println(res23) // >>> bike:3
	res24, _ := rdb.LPop(ctx, "bikes:repairs").Result()
	fmt.Println(res24) // >>> bike:1
	res25, _ := rdb.RPop(ctx, "bikes:repairs").Result()
	fmt.Println(res25) // >>> bike:2
	res26, err := rdb.RPop(ctx, "bikes:repairs").Result()
	if err != nil {
		fmt.Println(err) // >>> redis: nil
	}
	fmt.Println(res26) // >>> <empty string>
}

func Test_ltrim(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res27, _ := rdb.LPush(ctx, "bikes:repairs", "bike:1", "bike:2", "bike:3", "bike:4", "bike:5").Result()
	fmt.Println(res27) // >>> 5
	res28, _ := rdb.LTrim(ctx, "bikes:repairs", 0, 2).Result()
	fmt.Println(res28) // >>> OK
	res29, _ := rdb.LRange(ctx, "bikes:repairs", 0, -1).Result()
	fmt.Println(res29) // >>> [bike:5 bike:4 bike:3]
}

func Test_ltrim_end_of_list(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res30, _ := rdb.RPush(ctx, "bikes:repairs", "bike:1", "bike:2", "bike:3", "bike:4", "bike:5").Result()
	fmt.Println(res30) // >>> 5
	res31, _ := rdb.LTrim(ctx, "bikes:repairs", -3, -1).Result()
	fmt.Println(res31) // >>> OK
	res32, _ := rdb.LRange(ctx, "bikes:repairs", 0, -1).Result()
	fmt.Println(res32) // >>> [bike:3 bike:4 bike:5]
}

func Test_brpop(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res33, _ := rdb.RPush(ctx, "bikes:repairs", "bike:1", "bike:2").Result()
	fmt.Println(res33) // >>> 2
	res34, _ := rdb.BRPop(ctx, 1, "bikes:repairs").Result()
	fmt.Println(res34) // >>> [bikes:repairs bike:2]
	res35, _ := rdb.BRPop(ctx, 1, "bikes:repairs").Result()
	fmt.Println(res35) // >>> [bikes:repairs bike:1]
	res36, err := rdb.BRPop(ctx, 1, "bikes:repairs").Result()
	if err != nil {
		fmt.Println(err) // >>> redis: nil
	}
	fmt.Println(res36) // >>> []
}

func Test_rule1(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "new_bikes")
	res37, _ := rdb.Del(ctx, "new_bikes").Result()
	fmt.Println(res37) // >>> 0
	res38, _ := rdb.LPush(ctx, "new_bikes", "bike:1", "bike:2", "bike:3").Result()
	fmt.Println(res38) // >>> 3
}

func Test_rule11(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "new_bikes")
	res39, _ := rdb.Set(ctx, "new_bikes", "bike:1", 0).Result()
	fmt.Println(res39) // >>> OK
	res40, _ := rdb.Type(ctx, "new_bikes").Result()
	fmt.Println(res40) // >>> string
	res41, err := rdb.LPush(ctx, "new_bikes", "bike:2", "bike:3").Result()
	if err != nil {
		fmt.Println(err)
		// >>> WRONGTYPE Operation against a key holding the wrong kind of value
	}
	fmt.Println(res41)
}

func Test_rule2(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res42, _ := rdb.LPush(ctx, "bikes:repairs", "bike:1", "bike:2", "bike:3").Result()
	fmt.Println(res42) // >>> 3
	res43, _ := rdb.Exists(ctx, "bikes:repairs").Result()
	fmt.Println(res43) // >>> 1
	res44, _ := rdb.LPop(ctx, "bikes:repairs").Result()
	fmt.Println(res44) // >>> bike:3
	res45, _ := rdb.LPop(ctx, "bikes:repairs").Result()
	fmt.Println(res45) // >>> bike:2
	res46, _ := rdb.LPop(ctx, "bikes:repairs").Result()
	fmt.Println(res46) // >>> bike:1
	res47, _ := rdb.Exists(ctx, "bikes:repairs").Result()
	fmt.Println(res47) // >>> 0
}

func Test_rule3(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res48, _ := rdb.Del(ctx, "bikes:repairs").Result()
	fmt.Println(res48) // >>> 0
	res49, _ := rdb.LLen(ctx, "bikes:repairs").Result()
	fmt.Println(res49) // >>> 0
	res50, err := rdb.LPop(ctx, "bikes:repairs").Result()
	if err != nil {
		fmt.Println(err) // >>> redis: nil
	}
	fmt.Println(res50) // >>> <empty string>
}

func Test_ltrim1(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password docs
		DB:       0,  // use default DB
	})
	rdb.Del(ctx, "bikes:repairs")
	res51, _ := rdb.LPush(ctx, "bikes:repairs", "bike:1", "bike:2", "bike:3", "bike:4", "bike:5").Result()
	fmt.Println(res51) // >>> 5
	res52, _ := rdb.LTrim(ctx, "bikes:repairs", 0, 2).Result()
	fmt.Println(res52) // >>> OK
	res53, _ := rdb.LRange(ctx, "bikes:repairs", 0, -1).Result()
	fmt.Println(res53) // >>> [bike:5 bike:4 bike:3]
}
