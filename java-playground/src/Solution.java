class Solution {

  public int[] getFinalState(int[] nums, int k, int multiplier) {
    for (var i = 0; i < k; i++) {
      var minNum = nums[0];
      var minIdx = 0;
      for (var idx = 1; idx < nums.length; idx++) {
        if (nums[idx] < minNum) {
          minNum = nums[idx];
          minIdx = idx;
        }
      }
      nums[minIdx] *= multiplier;
      // System.out.println(Arrays.toString(nums));
    }
    return nums;
  }

  // public static void main(String[] args) {
  //   new Solution().getFinalState(new int[] { 2, 1, 3, 5, 6 }, 5, 2);
  // }
}
