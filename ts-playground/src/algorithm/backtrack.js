/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number[]} nums
 * @returns {number[][]}
 */
function permute(nums) {
  /**
   * @type {number[][]} ans
   */
  const ans = [];
  /**
   * @type {number[]} item
   */
  const item = nums.slice(); // deep copy
  /**
   *
   * @param {number} start
   */
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
  /**
   * @type {string[][]}
   */
  let ans = [];

  /**
   * @type {number[]}
   */
  let cols = new Array(n).fill(0);

  /**
   * @type {boolean[]}
   */
  const occ = new Array(n).fill(false);

  /**
   * @type {boolean[]}
   */
  const diag1 = Array(n * 2 - 1).fill(false);
  /**
   * @type {boolean[]}
   */
  const diag2 = Array(n * 2 - 1).fill(false);

  /**
   *
   * @param {number} r
   */
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
