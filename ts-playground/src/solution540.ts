function singleNonDuplicate(nums: number[]): number {
  let [l, r] = [0, 1];
  while (true) {
    if (r == nums.length || nums[l] != nums[r]) {
      return nums[l];
    } else {
      l = r;
      r++;
    }
  }
}
