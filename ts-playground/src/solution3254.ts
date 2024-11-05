function resultsArray(nums: number[], k: number): number[] {
  let [l, r, ans] = [0, 0, new Array<number>()];
  while (l <= nums.length - k) {
    if (r - l + 1 == k) {
      ans.push(nums[r]);
      l++;
      continue
    }
    // r - l + 1 < k
    if ((nums[r + 1] == nums[r] + 1)) {
      r++;
      continue;
    }
    ans.push(...(new Array(
      Math.min(nums.length - k - l + 1, r - l + 1)
    ).fill(-1)));
    r++;
    l = r;
  }
  return ans
}

resultsArray([1, 2, 3, 2], 3);
