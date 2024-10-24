package hot

import "sort"

func groupAnagrams(strs []string) [][]string {
	var res [][]string
	strToStrs := make(map[string][]string)
	for _, str := range strs {
		rs := []rune(str) // dups = ['a' 'b' 'a' 'b']
		sort.Slice(rs, func(i, j int) bool {
			return rs[i] < rs[j]
		})
		sorted := string(rs)
		if _, ok := strToStrs[sorted]; !ok {
			strToStrs[sorted] = []string{}
		}
		strToStrs[sorted] = append(strToStrs[sorted], str)
	}
	for _, strs := range strToStrs {
		res = append(res, strs)
	}
	return res
}
