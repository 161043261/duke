package src

// [1 2 3 4 5 6 7]
// [4 3 2 1 7 6 5]
// [5 6 7 1 2 3 4]

func rotate(nums []int, k int) {
	k %= len(nums)
	flip(&nums, 0, len(nums)-k-1)
	flip(&nums, len(nums)-k, len(nums)-1)
	flip(&nums, 0, len(nums)-1)
}

func flip(nums *[]int, i, j int) {
	for ; i < j; i, j = i+1, j-1 {
		(*nums)[i], (*nums)[j] = (*nums)[j], (*nums)[i]
	}
}
