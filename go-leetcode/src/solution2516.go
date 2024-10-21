package src

func takeCharacters(s string, k int) int {
	num := [3]int{} // [numA numB numC]
	for _, c := range s {
		num[c-'a']++
	}
	if num[0] < k || num[1] < k || num[2] < k {
		return -1
	}
	maxSubstrLen /* max length of sub string */, left := 0, 0
	for right, c := range s {
		c -= 'a'
		num[c]--
		for num[c] < k { // 滑动窗口
			num[s[left]-'a']++
			left++
		}
		maxSubstrLen = max(maxSubstrLen, right-left+1)
	}
	return len(s) - maxSubstrLen
}
