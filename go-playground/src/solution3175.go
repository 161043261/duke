package src

func findWinningPlayer(skills []int, k int) int {
	l, r, ls, rs := 0, 1, 0, 0

	for r < len(skills) {
		if ls == k {
			return l
		}

		if skills[l] > skills[r] {
			r, ls, rs = r+1, ls+1, 0
		} else {
			l, r, ls, rs = r, r+1, rs+1, 0
		}
	}
	return l
}
