package src

import "math"

func minimumDifference(nums []int, k int) int {
	ans := math.MaxInt

	var abs = func(x int) int {
		if x <= 0 {
			return -x
		}
		return x
	}

	// a         b       c     d
	// a|b       b       c     d
	// a|b|c     b|c     c     d
	// a|b|c|d   b|c|d   c|d   d

	for i, x := range nums {
		ans = min(ans, abs(x-k))
		for j := i - 1; j >= 0 && nums[j]|x != nums[j]; j-- {
			// if nums[j]|x == nums[j] { continue }
			nums[j] |= x
			ans = min(ans, abs(nums[j]-k))
		}
	}
	return ans
}
