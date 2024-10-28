package src

func subarraySum(nums []int, k int) int {
	ans := 0
	for i := 0; i < len(nums); i++ {
		sum := 0
		for j := i; j >= 0; j-- {
			sum += nums[j]
			if sum == k {
				ans++
			}
		}
	}
	return ans
}

func subarraySum1(nums []int, k int) int {
  ans, currSum := 0, 0
  // 前缀和 : 次数
	preSum2ntimes := map[int]int{}
  preSum2ntimes[0] = 1
	for i := 0; i < len(nums); i++ {
    currSum += nums[i]

    preSum := currSum - k
    if _, ok := preSum2ntimes[preSum]; ok {
      ans += preSum2ntimes[preSum]
    }
    preSum2ntimes[currSum] += 1
	}
  return ans
}
