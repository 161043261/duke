function hasIncreasingSubarrays(nums: number[], k: number): boolean {
  let [i, j, cnt] = [0, k, 1];
  while (j < nums.length) {
    if (nums[i + 1] > nums[i] && nums[j + 1] > nums[j] && cnt < k) {
      cnt++;
    } else {
      cnt = 1;
    }
    if (cnt == k) {
      return true;
    }
    i++;
    j++;
  }
  return cnt == k;
}

console.log(hasIncreasingSubarrays([5, 8, -2, -1], 1));
