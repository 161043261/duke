function maxIncreasingSubarrays(nums: number[]): number {
  let lens: number[] = [];
  let i = 0;
  tag: while (i < nums.length - 1) {
    let j = i;
    while (j < nums.length - 1) {
      j++;
      if (nums[j] <= nums[j - 1]) {
        lens.push(j - i);
        i = j;
        continue tag;
      }
    }
    // j == nums.length - 1
    lens.push(j - i + 1);
    i = j;
  }

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

console.log(maxIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7]));
