package src

import (
	"fmt"
	"sort"
)

// TODO
func maxTotalReward(values []int) int {
	sort.Ints(values)
	maxValue := values[len(values)-1]
	dp := make([]bool, 2*maxValue)
	dp[0] = true
	for _, value := range values {
		for reward := 2*value - 1; reward >= value; reward-- {
			if dp[reward-value] {
				dp[reward] = true
			}
		}
		fmt.Println(dp)
	}
	res := 0
	for idx, boolValue := range dp {
		if boolValue {
			res = idx
		}
	}
	return res
}

func Call() {
	maxTotalReward([]int{1, 1, 3, 3})
}

// reward 0 1 2 3 4 5
// [true true false false false false]
// [true true false false false false]
// [true true false true true false]
// [true true false true true false]
