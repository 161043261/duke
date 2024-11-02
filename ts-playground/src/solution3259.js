/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
const maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  // dp[i][0] 第 i 小时饮用 A 能量饮料时, 能获得的最大总强化能量
  // dp[i][0] = max(dp[i - 1][0], dp[i - 2][1]) + energyDrinkA[i - 1]
  // dp[i][1] 第 i 小时饮用 B 能量饮料时, 能获得的最大总强化能量
  // dp[i][1] = max(dp[i - 1][1], dp[i - 2][0]) + energyDrinkB[i - 1]
  const n = energyDrinkA.length;

  // const dp = new Array(n + 1).fill(
  //   new Array(2) /* .fill(1) */)
  const dp = Array.from({ length: n + 1 }, () => [0, 0]);

  // console.log(dp)
  dp[0][0] = 0;
  dp[0][1] = 0;
  dp[1][0] = energyDrinkA[0];
  dp[1][1] = energyDrinkB[0];
  for (let i = 2; i <= n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 2][1]) + energyDrinkA[i - 1];
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0]) + energyDrinkB[i - 1];
  }
  return Math.max(dp[n][0], dp[n][1]);
};

console.log(maxEnergyBoost([1, 3, 1], [3, 1, 1]));
