"use strict";
const flat = function (arr, n) {
  const ret = [];
  const doFlat = function (arr, depth) {
    for (const item of arr) {
      if (depth === n) {
        ret.push(item);
        continue;
      }
      // depth < n
      if (Array.isArray(item) /* item instanceof Array */) {
        doFlat(item, depth + 1);
      } else {
        ret.push(item);
      }
    }
  };
  doFlat(arr, 0);
  return ret;
};
const flat1 = function (arr, n) {
  return flatten(arr, n);
  function flatten(arr, n) {
    if (n <= 0) {
      return arr;
    }
    const ret = [];
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        ret.push(...flatten(item, n - 1));
      } else {
        ret.push(item);
      }
    });
    return ret;
  }
};
console.log(
  flat1([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1),
);
