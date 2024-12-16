/**
 *
 * @param {number} n
 * @param {number} T
 * @param {number} H
 * @param {number[]} t
 * @param {number[]} h
 * @param {number[]} a
 * @returns
 */
function solution(n, T, H, t, h, a) {
  let dp = Array.from(
    {
      length: H + 1,
    },
    () =>
      Array.from(
        {
          length: T + 1,
        },
        () => new Array(n + 1).fill(0)
      )
  );

  for (let rh = H; rh >= 0; rh--) {
    for (let rt = T; rt >= 0; rt--) {
      for (let i = 1; i <= n; i++) {
        if (rh >= h[i] && rt >= t[i]) {
          dp[rh - h[i]][rt - t[i]][i] = Math.max(
            dp[rh - h[i]][rt - t[i]][i - 1],
            dp[rh][rt][i - 1] + a[i]
          );
        } else {
          dp[rh][rt][i] = dp[rh][rt][i - 1];
        }
      }
    }
  }
  console.log(dp);
  return dp[0][0][n];
}

function main() {
  console.log(solution(2, 2, 2, [1, 3], [3, 1], [3, 4]) === 0);
  console.log(solution(3, 5, 5, [2, 1, 3], [1, 3, 2], [10, 7, 8]) === 18);
  console.log(solution(1, 3, 3, [4], [4], [5]) === 0);
}

main();
