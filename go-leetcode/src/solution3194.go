package src

import (
	"math"
	"sort"
)

func minimumAverage(nums []int) float64 {
	sort.Ints(nums)
	ret := math.MaxFloat64
	for l, r := 0, len(nums)-1; l < r; l, r = l+1, r-1 {
		ret = min(ret, float64(nums[l]+nums[r])/2.)
	}
	return ret
}
