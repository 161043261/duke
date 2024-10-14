package src

import (
	"sort"
)

func numberOfPairs(nums1 []int, nums2 []int, k int) int {
	sort.Ints(nums1)
	sort.Ints(nums2)
	ans := 0
	for _, n1 := range nums1 {
		for _, n2 := range nums2 {
			if n1 < n2*k {
				break
			}
			if n1%(n2*k) == 0 {
				ans++
			}
		}
	}
	return ans
}
