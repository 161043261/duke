package src

import (
	"fmt"
	"sort"
)

// 按从小到大的顺序选
// 对 rewardValues 从小到大排序
// dp[i][j] 表示能否从 rewardValues 的前 i 个数中, 获得总奖励 j
// 设 rewardValues 的第 i 个数为 v
// dp[i][j] = dp[i-1][j] || dp[i-1][j-v]
// 初始值: dp[0][0] = true
// 答案为 dp[n][j] == true 时, j 的最大值
func maxTotalReward(rewardValues []int) int {
	sort.Ints(rewardValues)
    dp := make([][]int, len(rewardValues))
    // fmt.Println(dp[0]) // []
    
    return 0;
}

func Call() {
}
