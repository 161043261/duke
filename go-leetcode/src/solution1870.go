package src

import (
	"math"
)

func minSpeedOnTime(dists []int, hour float64) int {
	if hour <= float64(len(dists)-1) {
		return -1
	}
	totalDist := 0.
	for _, dist := range dists {
		totalDist += float64(dist)
	}
	leftSpeed := totalDist / hour
	if math.Ceil(leftSpeed) == leftSpeed {
		return int(leftSpeed)
	}
	leftSpeed = math.Floor(leftSpeed)
	rightSpeed := math.Ceil(totalDist / (hour - (float64(len(dists) - 1) /* 等待的时间 */)))

	// fmt.Println(leftSpeed, rightSpeed)

	totalHour := func(speed int) float64 {
		ret := 0.
		for idx, dist := range dists {
			delta := float64(dist) / float64(speed)
			if idx == len(dists)-1 {
				ret += delta
			} else {
				ret += math.Ceil(delta)
			}
		}
		return ret
	}

	for {
		var l, r int
		for l, r = int(leftSpeed), int(rightSpeed); l < r; {
			midSpeed := l + (r-l)/2
			if totalHour(midSpeed) > hour {
				l = midSpeed + 1
			} else { // totalHour(midSpeed) <= hour
				r = midSpeed
			}
		}
		return r
	}
}

func Call() {
	minSpeedOnTime([]int{69}, 4.6)
}
