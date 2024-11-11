function maxIncreasingSubarrays(nums: number[]): number {
  let lens: number[] = [];
  let i = 0;
  let j = 0;
  while (i < nums.length && j < nums.length) {
    while (j < nums.length) {
      if (j == 0 || nums[j] > nums[j - 1]) {
        j++;
        continue;
      }
      // nums[j] <= nums[j - 1]
      lens.push(j - i);
      i = j;
      j++;
    }
  }
  lens.push(j - i);
  console.log(lens);

  if (lens.length == 1) {
    return Math.max(1, Math.floor(lens[0] / 2));
  }
  let [l, r, ans] = [0, 1, 1];
  while (r < lens.length) {
    ans = Math.max(
      ans,
      Math.min(lens[l], lens[r]),
      Math.floor(lens[l] / 2),
      Math.floor(lens[r] / 2),
    );
    l = r;
    r++;
  }
  return ans;
}

// #region

maxIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1]);

// #endregion
