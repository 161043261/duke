package main

import "fmt"

func solution(cards []int) int {
	// Edit your code here
	ntimes := [1001]int8{}
	for _, card := range cards {
		ntimes[card]++
	}
	for i, v := range ntimes {
		if v == 1 {
			return i
		}
	}
	return -1
}

func main() {
	// Add your test cases here
	fmt.Println(solution([]int{1, 1, 2, 2, 3, 3, 4, 5, 5}) == 4)
	fmt.Println(solution([]int{0, 1, 0, 1, 2}) == 2)
}
