package src

func maximumSubsequenceCount(text string, pattern string) int64 {
	var pres, posts []int
	var preNum, sum int
	for i := 0; i < len(text); i++ {
		if text[i] == pattern[0] {
			pres = append(pres, i)
			preNum++
			continue
		}
		if text[i] == pattern[1] {
			sum += preNum
			posts = append(posts, i)
		}
	}
	if pattern[0] == pattern[1] {
		num := len(pres) + len(posts)
		return int64((num + 1) * num / 2)
	}

	if len(pres) > len(posts) {
		return int64(len(pres) + sum)
	}
	return int64(len(posts) + sum)
}
