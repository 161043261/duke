package src

func lengthOfLongestSubstring(s string) int {
	// if s == "" {
	// 	return 0
	// }
	byteset, ans := map[byte]struct{}{}, 0
	l, r := 0, 0
	for ; r < len(s); r++ {
		if _, ok := byteset[s[r]]; !ok {
			byteset[s[r]] = struct{}{}
		} else {
			ans = max(ans, r-l)
			for ; s[l] != s[r]; l++ {
				delete(byteset, s[l])
			}
			// s[l] == s[r]
			l++
		}
	}
	return max(ans, r-l)
}
