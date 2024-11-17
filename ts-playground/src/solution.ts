function countValidSelections(nums: number[]): number {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      continue;
    }
    for (let direction of [-1, 1]) {
      let tempNums = nums.slice();
      let curr = i;
      while (curr >= 0 && curr < nums.length) {
        if (tempNums[curr] == 0) {
          curr += direction
        } else if (tempNums[curr] > 0) {
          tempNums[curr]--;
          direction *= -1;
          curr += direction
        }
      }
      if (tempNums.every((num) => num === 0)) {
        ans++;
      }
    }
  }
  return ans;
}
