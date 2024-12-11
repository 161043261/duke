"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
function knightDialer(n) {
  const nexts = [
    [4, 6],
    [8, 6],
    [7, 9],
    [4, 8],
    [0, 3, 9],
    [],
    [0, 1, 7],
    [2, 6],
    [1, 3],
    [4, 2],
  ];
  const dp = Array.from(
    {
      length: n, // 还需移动 i 步
    },
    (val) => new Array(10).fill(0),
  ); // 当前在数字 j 单元格
  for (let j = 0; j < 10; j++) {
    dp[0][j] = 1;
  }
  // 对于 nexts[cur] = [next1, next2, ...]
  // dp[i][cur] = dp[i - 1][next1] + dp[i - 1][next2] + ...
  for (let i = 1; i < n; i++) {
    for (let cur = 0; cur < 10; cur++) {
      for (const next of nexts[cur]) {
        dp[i][cur] = (dp[i][cur] + dp[i - 1][next]) % 1_000_000_007;
      }
    }
  }
  // console.log(dp);
  // console.log(dp[n - 1]);
  return dp[n - 1].reduce((pre, cur) => {
    return (cur + pre) % 1_000_000_007;
  });
}
console.log(knightDialer(3131));
