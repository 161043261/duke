// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var subarraySum = function (nums, k) {
//   // let index in array | let key   in map
//   // let value of array | let value of map
//   let preSum2cnt = new Map();
//   let [currSum, ans] = [0, 0];
//   preSum2cnt.set(0, 1)
//   for (let idx in nums) {
//     currSum += nums[idx];
//     if (preSum2cnt.has(currSum - k)) {
//       ans += preSum2cnt.get(currSum - k);
//     }

//     if (preSum2cnt.has(currSum)) {
//       preSum2cnt.set(currSum, preSum2cnt.get(currSum) + 1)
//     } else {
//       preSum2cnt.set(currSum, 1)
//     }
//   }
//   return ans
// };

function subarraySum(nums: number[], k: number): number {
  // let index in array | let key   in map
  // let value of array | let value of map
  let preSum2cnt = new Map<number, number>();
  let [currSum, ans] = [0, 0];
  preSum2cnt.set(0, 1);
  for (let idx in nums) {
    currSum += nums[idx];
    ans += preSum2cnt.get(currSum - k) ?? 0;
    preSum2cnt.set(currSum, (preSum2cnt.get(currSum) ?? 0) + 1);
  }
  return ans;
}
