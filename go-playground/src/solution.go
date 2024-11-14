package main

import "fmt"

func countGoodNodes(edges [][]int) int {
	n := len(edges) + 1
	faAndSons := make([][]int, n)
	for i := range faAndSons {
		faAndSons[i] = []int{}
	}
	for _, edge := range edges {
		fa, son := edge[0], edge[1]
		faAndSons[fa] = append(faAndSons[fa], son)
		faAndSons[son] = append(faAndSons[son], fa)
	}

	// fmt.Println("faAndSons", faAndSons)

	var dfs func(int, int) int
	ans := 0

	dfs = func(cur, pa int) int {
		firstSonSz := 0
		curSz := 1

		ok := true
		for _, son := range faAndSons[cur] {
			if son == pa {
				continue
			}

			sonSz := dfs(son, cur)
			if firstSonSz == 0 {
				firstSonSz = sonSz
			} else if sonSz != firstSonSz {
				ok = false
			}

			curSz += sonSz
		}

		if ok {
			ans++
		}
		return curSz
	}

	dfs(0, -1)

	return ans
}

func main() {
	fmt.Println(
		countGoodNodes([][]int{{0, 1}, {0, 2}, {1, 3}, {1, 4}, {2, 5}, {2, 6}}))
}
