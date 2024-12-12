/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number[]} nums
 * @returns {number[][]}
 */
function permute(nums) {
  const ans = [];
  const item = nums.slice(); // deep copy
  const backtrack = (start) => {
    if (start === item.length) {
      ans.push(item.slice());
      return;
    }
    for (let i = start; i < item.length; i++) {
      [item[i], item[start]] = [item[start], item[i]];
      backtrack(start + 1);
      [item[i], item[start]] = [item[start], item[i]];
    }
  };

  backtrack(0);
  return ans;
}

// console.log(permute([1, 2, 3]))

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let ans = [];
  let cols = new Array(n).fill(0);
  const occ = new Array(n).fill(false);
  const diag1 = Array(n * 2 - 1).fill(false);
  const diag2 = Array(n * 2 - 1).fill(false);
  const dfs = (r) => {
    if (r === n) {
      ans.push(cols.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - 1 - c)));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (!occ[c] && !diag1[r + c] && !diag2[r - c + n - 1]) {
        cols[r] = c;
        occ[c] = diag1[r + c] = diag2[r - c + n - 1] = true;
        dfs(r + 1);
        occ[c] = diag1[r + c] = diag2[r - c + n - 1] = false;
      }
    }
  };
  dfs(0);
  return ans;
};

console.log(solveNQueens(8).length);
