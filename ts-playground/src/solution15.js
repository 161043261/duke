"use strict";
function threeSum(nums) {
  let ans = [];
  nums.sort((x, y) => x - y);
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    for (let [j, k] = [i + 1, nums.length - 1]; j < k; ) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum == 0) {
        ans.push([nums[i], nums[j], nums[k]]);
        do {
          j++;
        } while (j < k && nums[j] == nums[j - 1]);
        do {
          k--;
        } while (k > j && nums[k] == nums[k + 1]);
      } else if (sum < 0) {
        do {
          j++;
        } while (j < k && nums[j] == nums[j - 1]);
      } else {
        do {
          k--;
        } while (k > j && nums[k] == nums[k + 1]);
      }
    }
  }
  return ans;
}
