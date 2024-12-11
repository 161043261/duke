/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  const ans = [];
  for (let i = 0; i < arr.length; i += size) {
    ans.push(arr.slice(i, Math.max(i + size, arr.length)));
  }
  return ans;
};
