package main

import "fmt"

func countKConstraintSubstrings(s string, k int, queries [][]int) []int64 {
	l, r, n0, n1 := 0, 0, 0, 0
	query2cnt := map[[2]int]int{}

	updateCnt := func(i, j int) {
		for _, query := range queries {
			if query[0] <= i && query[1] >= j {
				query2cnt[[2]int{query[0], query[1]}]++
			}
		}
	}

	for _, query := range queries {
		query2cnt[[2]int{query[0], query[1]}] = 0
	}

	for r < len(s) {
		if n0 <= k || n1 <= k {
			if s[r] == '0' && (n0 < k || n1 <= k) {
				n0++
				r++
				continue
			}
			if s[r] == '1' && (n0 <= k || n1 < k) {
				n1++
				r++
				continue
			}
		}

		for i := l; i < r; i++ {
			updateCnt(l, i)
		}

		if s[l] == '0' {
			n0--
		} else {
			n1--
		}
		l++
	}
	for i := l; i < r; i++ {
		for j := i; j < r; j++ {
			updateCnt(i, j)
		}
	}

	var ans []int64
	for _, query := range queries {
		ans = append(ans, int64(query2cnt[[2]int{query[0], query[1]}]))
	}
	return ans
}

func main() {
	fmt.Println(
		countKConstraintSubstrings("0001111", 2, [][]int{{0, 6}}),
	)
}
