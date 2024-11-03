/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const ret = Array(nums.length).fill(1);
  const prefixMul = Array(nums.length);
  prefixMul[0] = 1;
  const suffixMul = Array(nums.length);
  suffixMul[nums.length - 1] = 1;
  for (let i = 0; i < nums.length; i++) {
    let j = nums.length - 1 - i;
    if (i > 0) {
      prefixMul[i] = nums[i - 1] * prefixMul[i - 1];
    }
    if (j < nums.length - 1) {
      suffixMul[j] = nums[j + 1] * suffixMul[j + 1];
    }
  }
  for (let i = 0; i < nums.length; i++) {
    ret[i] = prefixMul[i] * suffixMul[i];
  }
  return ret;
};

const productExceptSelf1 = function (nums) {
  const ret = Array(nums.length);
  ret[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    ret[i] = ret[i - 1] * nums[i - 1];
  }
  // ret (prefixMul)
  let suffixMul = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    ret[i] *= suffixMul;
    suffixMul *= nums[i];
  }
  return ret;
};
