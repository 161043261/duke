"use strict";
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
function subarraySum(nums, k) {
    var _a, _b;
    // let index in array | let key   in map
    // let value of array | let value of map
    let preSum2cnt = new Map();
    let [currSum, ans] = [0, 0];
    preSum2cnt.set(0, 1);
    for (let idx in nums) {
        currSum += nums[idx];
        ans += (_a = preSum2cnt.get(currSum - k)) !== null && _a !== void 0 ? _a : 0;
        preSum2cnt.set(currSum, ((_b = preSum2cnt.get(currSum)) !== null && _b !== void 0 ? _b : 0) + 1);
    }
    return ans;
}
;
