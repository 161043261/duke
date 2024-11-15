"use strict";
function minFlips(grid) {
  let ans = 0;
  for (let i = 0; i < Math.floor(grid.length / 2); i++) {
    for (let j = 0; j < Math.floor(grid[0].length / 2); j++) {
      const cnt1 =
        grid[i][j] +
        grid[grid.length - 1 - i][j] +
        grid[i][grid[0].length - 1 - j] +
        grid[grid.length - 1 - i][grid[0].length - 1 - j];
      ans += Math.min(cnt1, 4 - cnt1);
    }
  }
  if (grid.length % 2 == 1 && grid[0].length % 2 == 1) {
    ans += grid[Math.floor(grid.length / 2)][Math.floor(grid[0].length / 2)];
  }
  let diff = 0,
    cnt1 = 0;
  if (grid.length % 2 == 1) {
    for (let j = 0; j < Math.floor(grid[0].length / 2); j++) {
      if (
        grid[Math.floor(grid.length / 2)][j] !=
        grid[Math.floor(grid.length / 2)][grid[0].length - 1 - j]
      ) {
        diff++;
      } else {
        cnt1 += grid[Math.floor(grid.length / 2)][j] * 2;
      }
    }
  }
  if (grid[0].length % 2 == 1) {
    for (let i = 0; i < Math.floor(grid.length / 2); i++) {
      if (
        grid[i][Math.floor(grid[0].length / 2)] !=
        grid[grid.length - i - 1][Math.floor(grid[0].length / 2)]
      ) {
        diff++;
      } else {
        cnt1 += grid[i][Math.floor(grid[0].length / 2)] * 2;
      }
    }
  }
  return ans + (diff > 0 ? diff : cnt1 % 4);
}
