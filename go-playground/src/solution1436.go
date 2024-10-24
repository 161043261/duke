package src

func destCity(paths [][]string) string {
	outDegree := make(map[string]int)
	for _, path := range paths {
		if v /* 这里是值拷贝 */, ok := outDegree[path[0]]; ok {
			outDegree[path[0]] = v + 1
		} else {
			outDegree[path[0]] = 1
		}

		if _, ok := outDegree[path[1]]; !ok {
			outDegree[path[1]] = 0
		}
	}

	for k, v := range outDegree {
		if v == 0 {
			return k
		}
	}
	return ""
}
