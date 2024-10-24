package hot

func twoSum(nums []int, target int) []int {
	numIdx := make(map[int]int, len(nums))
	for idx, num := range nums {
		numIdx[num] = idx
	}
	for idx1, num := range nums {
		if idx2, ok := numIdx[target-num]; ok && idx1 != idx2 {
			return []int{idx1, idx2}
		}
	}
	return []int{}
}
