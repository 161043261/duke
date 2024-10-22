package src

func countCompleteDayPairs(hours []int) int64 {
    remainder2num := make(map[int]int64)
	for _, hour := range hours {
		remainder := hour % 24
		if _, ok := remainder2num[remainder]; !ok {
			remainder2num[remainder] = 0
		}
		remainder2num[remainder]++
	}

	var ret int64

	for remainder, num := range remainder2num {
		if (remainder == 0 || remainder == 12) {
			ret += num * (num - 1)
			continue
		}
		if val, ok := remainder2num[24 - remainder]; ok {
			ret += num * val
		}
	}

	return ret / 2
}