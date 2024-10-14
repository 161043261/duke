package hot

func longestConsecutive(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	maxLen := 1
	vToIdx := make(map[int]struct{})
	//* 遍历 nums，创建值到下标的 map 映射 vToIdx，同时去重
	for _, v := range nums {
		if _, ok := vToIdx[v]; !ok {
			vToIdx[v] = struct{}{}
		}
	}
	//* 遍历 vToIdx，更新最长连续序列的长度 maxLen
	for v := range vToIdx {
		if _, ok := vToIdx[v-1]; ok {
			continue
		}
		//* v-1 不在 vToIdx.keySet 中，以 v 为起点更新 maxLen = 1
		curLen := 1
		for {
			if _, ok := vToIdx[v+1]; ok {
				v++
				curLen++
			} else {
				break
			}
		}
		if curLen > maxLen {
			maxLen = curLen
		}
	}
	return maxLen
}
