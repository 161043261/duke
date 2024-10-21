package src

func maxHeightOfTriangle(red int, blue int) int {
	cntH := func(c1 int, c2 int) int {
		h := 0
		for {
			if c2 >= h+1 {
				h++
				c2 -= h
			} else {
				return h
			}
			if c1 >= h+1 {
				h++
				c1 -= h
			} else {
				return h
			}
		}
	}
	return max(cntH(red, blue), cntH(blue, red))
}
