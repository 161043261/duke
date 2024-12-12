/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  let ret = [];
  arr.forEach(function (item, idx) {
    if (fn(item, idx)) {
      ret.push(item);
    }
  });
  return ret;
};
