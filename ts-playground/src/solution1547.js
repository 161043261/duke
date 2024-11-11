"use strict";
// FIXME
function minCost_(n, cuts) {
  let slices = new Array(cuts.length + 1).fill(0);
  cuts.sort((a, b) => a - b);
  slices[0] = cuts[0];
  for (let i = 1; i < cuts.length; i++) {
    slices[i] = cuts[i] - cuts[i - 1];
  }
  slices[cuts.length] = n - cuts[cuts.length - 1];
  slices.sort((a, b) => a - b);
  let ans = 0;
  const binarySearch = (val) => {
    let l = 0,
      r = slices.length - 1;
    let mid;
    while (l < r) {
      mid = Math.floor(l + (r - l) / 2);
      if (slices[mid] == val) {
        return mid;
      }
      if (slices[mid] <= val) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return l;
  };
  while (slices.length >= 2) {
    const minVal1 = slices.shift();
    const minVal2 = slices.shift();
    const val = minVal1 + minVal2;
    ans += val;
    const idx = binarySearch(val);
    if (slices[idx] < val) {
      slices.splice(
        idx + 1, // start
        0, // deleteCount
        val,
      ); // items
    } else {
      slices.splice(
        idx, // start
        0, // deleteCount
        val,
      ); // items
    }
  }
  return ans;
}
// dfs(i, j) = min(dfs(i, k) + dfs(k, j) + cuts[j] - cuts[i])
function minCost(n, cuts) {
  cuts.push(0);
  cuts.push(n);
  cuts.sort((a, b) => a - b);
  const memo = Array.from(
    { length: cuts.length },
    () => new Array(cuts.length),
  );
  const dfs = (i, j) => {
    if (i + 1 == j) {
      return 0;
    }
    if (memo[i][j] != undefined) {
      return memo[i][j];
    }
    let res = Infinity;
    for (let k = i + 1; k < j; k++) {
      res = Math.min(res, dfs(i, k) + dfs(k, j));
    }
    memo[i][j] = res + cuts[j] - cuts[i];
    return memo[i][j];
  };
  return dfs(0, cuts.length - 1);
}
