/**
 * @param {number[]} height
 * @param {number} threshold
 * @return {number[]}
 */
var stableMountains = function (height, threshold) {
  return height
    .map((val, idx) => {
      if (idx === 0) {
        return;
      }
      if (height[idx - 1] > threshold) {
        return idx;
      }
    })
    .filter((val) => val !== undefined);
};
