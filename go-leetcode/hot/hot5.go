package hot

var height []int

func maxArea(height_ []int) int {
	height = height_
	i, j, ans := 0, len(height)-1, 0
	for i < j {
		// 向内移动较低板 area 可能减小可能增大
		// 向内移动较高板 area 一定减小
		area := cntArea(i, j)
		if area > ans {
			ans = area
		}
		if height[i] > height[j] {
			// 向内移动 j 板（较低板）
			j--
		} else {
			// 向内移动 i 板（较低板）
			i++
		}
	}
	return ans
}

func cntArea(i, j int) int {
	h := height[i]
	if h < height[j] {
		h = height[j]
	}
	return (j - i) * h
}
