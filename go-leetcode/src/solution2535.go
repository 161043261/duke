package src

func differenceOfSum(nums []int) int {
	elemSum := 0
	numSum := 0

	addNumSum := func(num int) {
		tmp := 0
		for num != 0 {
			tmp += num % 10
			num /= 10
		}
		numSum += tmp
	}

	for _, num := range nums {
		elemSum += num
		addNumSum(num)
	}
	if elemSum > numSum {
		return elemSum - numSum
	}
	return numSum - elemSum
}
