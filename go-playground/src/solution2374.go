package src

// 节点 0 到 节点 2
// 节点 1 到 节点 0
// 节点 2 到 节点 0
// 节点 3 到 节点 2
// edges = [2 0 0 2]
func edgeScore(edges []int) int {
	dstToScore := make(map[int]int) // destination : score
	dstToScore[edges[0]] = 0
	ans := edges[0]
	if len(edges) == 1 {
		return ans
	}
	for idx, dst := range edges[1:] {
		src := idx + 1
		if _, ok := dstToScore[dst]; !ok {
			dstToScore[dst] = src
		} else {
			dstToScore[dst] += src
		}
		if dstToScore[dst] > dstToScore[ans] ||
			(dstToScore[dst] == dstToScore[ans] && dst < ans) {
			ans = dst
		}
	}
	return ans
}
