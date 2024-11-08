package src

func canReachCorner(xCorner, yCorner int, circles [][]int) bool {
	abs := func(x int) int {
		if x < 0 {
			return -x
		}
		return x
	}
	inCircle := func(x, y, ox, oy, r int) bool {
		return (ox-x)*(ox-x)+(oy-y)*(oy-y) <= r*r
	}
	visited := make([]bool, len(circles))
	var dfs func(int) bool
	dfs = func(i int) bool {
		x1, y1, r1 := circles[i][0], circles[i][1], circles[i][2]
		if y1 <= yCorner && abs(x1-xCorner) <= r1 ||
			x1 <= xCorner && y1 <= r1 ||
			x1 > xCorner && inCircle(xCorner, 0, x1, y1, r1) {
			return true
		}
		visited[i] = true
		for j, circle := range circles {
			x2, y2, r2 := circle[0], circle[1], circle[2]
			if !visited[j] &&
				(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2) <= (r1+r2)*(r1+r2) &&
				x1*r2+x2*r1 < (r1+r2)*xCorner &&
				y1*r2+y2*r1 < (r1+r2)*yCorner &&
				dfs(j) {
				return true
			}
		}
		return false
	}

	for i, circle := range circles {
		x, y, r := circle[0], circle[1], circle[2]
		if inCircle(0, 0, x, y, r) ||
			inCircle(xCorner, yCorner, x, y, r) ||
			!visited[i] &&

				(x <= xCorner &&
					abs(y-yCorner) <= r ||
					y <= yCorner &&
						x <= r ||
					y > yCorner &&
						inCircle(0, yCorner, x, y, r)) &&

				dfs(i) {
			return false
		}
	}
	return true
}
