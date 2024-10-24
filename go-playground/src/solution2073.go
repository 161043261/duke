package src

func timeRequiredToBuy(tickets []int, k int) int {
	ans := 0 // 买票需要的时间
	for i := 0; true; i = (i + 1) % len(tickets) {
		// 第 i 人已买完票
		if tickets[i] == 0 {
			continue
		}
		// 第 i 人未买完票
		ans += 1
		tickets[i] -= 1
		if tickets[i] == 0 && i == k {
			return ans
		}
	}
	return ans
}
