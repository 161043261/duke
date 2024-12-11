"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
class ArrayWrapper {
  nums;
  constructor(nums) {
    this.nums = nums;
  }
  valueOf() {
    return this.nums.reduce((preVal, curVal /* curIdx, arr */) => {
      console.log(preVal, curVal);
      return preVal + curVal;
    }, 0 /* initVal */);
  }
  toString() {
    return `[${this.nums.join(",")}]`;
  }
}
// 指定 initVal 时, curIdx 从 0 开始
[2, 4, 6, 8].reduce((preVal, curVal, curIdx /* , array */) => {
  console.log(preVal, curVal, curIdx);
  return preVal + curVal;
}, 0 /* initVal */);
// preVal   curVal   curIdx
//    0        2        0
//    2        4        1
//    6        6        2
//   12        8        3
//   20
// 不指定 initVal 时, curIdx 从 1 开始
[2, 4, 6, 8].reduce((preVal, curVal, curIdx /* , array */) => {
  console.log(preVal, curVal, curIdx);
  return preVal + curVal;
});
// preVal   curVal   curIdx
//    2        4        1
//    6        6        2
//   12        8        3
//   20
/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */
