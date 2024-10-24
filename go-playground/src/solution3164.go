package src

import (
	"sort"
)

// timeout
func numberOfPairs2(nums1 []int, nums2 []int, k int) int64 {
	sort.Ints(nums2)
	n1_num := make(map[int]int64)
	ans := int64(0)
	for _, n1 := range nums1 {
		if num, ok := n1_num[n1]; ok {
			ans += num
			continue
		}

		num := int64(0)
		for _, n2 := range nums2 {
			if n2*k > n1 {
				break
			}

			if n1%(n2*k) == 0 {
				num++
			}
		}
		n1_num[n1] = num
		ans += num
	}
	return ans
}
