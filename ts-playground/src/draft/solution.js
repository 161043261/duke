/**
 *
 * @param {number} n
 * @param {number} x
 * @param {number[]} arr
 * @returns {number}
 */
function solution(n, x, arr) {
  let ans = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let tmp = Array.from(arr);
    tmp[i] = x;
    let dp = new Array(arr.length + 1).fill(0);
    for (let i = 1; i <= arr.length; i++) {
      dp[i] = Math.max(dp[i - 1] + tmp[i - 1], tmp[i - 1]);
    }
    ans = Math.max(ans, ...dp.slice(1))
  }
  return ans;
}

function main() {
  console.log(solution(5, 10, [5, -1, -5, -3, 2]) === 15);
  console.log(solution(2, -3, [-5, -2]) === -2);
  console.log(solution(6, 10, [4, -2, -11, -1, 4, -1]) === 15);
}

main();