package src

import (
	"slices"
)

func merge(intervals [][]int) [][]int {

	slices.SortFunc/* [[][]int, []int] */(
		intervals,
		func(x, y []int) int {
			return x[0] - y[0]
		},
	)

	var ans [][]int // ans := [][]int{}
	for _, interval := range intervals {
		if len(ans) == 0 || interval[0] > ans[len(ans)-1][1] {
			ans = append(ans, interval)
		} else {
			ans[len(ans)-1][1] = max(ans[len(ans)-1][1], interval[1])
		}
	}
	return [][]int{}
}
