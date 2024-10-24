package hot

func moveZeroes(nums []int) {
	i, j := 0, 0
	for j < len(nums) {
		if nums[j] == 0 {
			j++
			continue
		}
		// nums[j] != 0
		nums[i], nums[j] = nums[j], nums[i]
		i++
		j++
	}
}
