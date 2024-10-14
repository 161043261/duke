package src

// 逆向动态规划
// 如果今天不出行，则 dp[i] = dp[i+1]
// 如果今天出行
// dp[i] = min(cost[j] + dp[i+j]), j in {1, 7, 30}

func mincostTickets(days []int, costs []int) int {
	var payment [366]int
	// payment := [366]int{}
	daySet := make(map[int]struct{})
	for _, day := range days {
		daySet[day] = struct{}{}
	}
	var dp func(i int) int
	// 例如 days = [1 4 6 7 8 20]
	// dp(1) 表示 20 天中，倒数第 1 天的消费，等价于 payment[1]
	dp = func(i int) int {
		if i > 365 { // 倒数第 365+ 天的消费，即第 1 天前的消费，都是 0
			return 0
		}
		if payment[i] != 0 {
			return payment[i]
		}
		if _, ok := daySet[i]; ok {
			// situation 倒数第 i 天出行
			// 则倒数第 i 天的消费 payment[i] 等于
			// - 倒数第 i+1 天的消费，即前 1 天的消费 dp(i+1)，加上为期 1 天的通行证售价
			// - 倒数第 i+7 天的消费，即前 7 天的消费 dp(i+7)，加上为期 7 天的通行证售价
			// - 倒数第 i+30 天的消费，即前 30 天的消费 dp(i+30)，加上为期 30 天的通行证售价
			// 中的最小值
			payment[i] = min(dp(i+1)+costs[0],
				dp(i+7)+costs[1],
				dp(i+30)+costs[2],
			)
		} else {
			// situation 倒数第 i 天不出行
			// 则倒数第 i 天的消费 payment[i] 等于
			// 倒数第 i+1 天的消费，即前 1 天的消费 dp(i+1)
			payment[i] = dp(i + 1)
		}
		return payment[i]
	}
	return dp(1)
}
