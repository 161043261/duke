function minFlips(grid: number[][]): number {
  let rans = 0,
    cans = 0,
    rmid = 0,
    cmid = 0;
  for (let row = 0; row < grid.length; row++) {
    let l = 0,
      r = grid[0].length - 1;
    for (; l < r; l++, r--) {
      if (grid[row][l] != grid[row][r]) {
        rans++;
      }
    }
    if (l == r && grid[row][l] == 1) {
      rmid++;
    }
  }

  console.log(rmid);
  if (grid.length < 4) {
    rans += rmid;
  } else {
    rmid %= 4;
    rans += Math.min(rmid, 4 - rmid);
  }

  for (let col = 0; col < grid[0].length; col++) {
    let u = 0,
      d = grid.length - 1;
    for (; u < d; u++, d--) {
      if (grid[u][col] != grid[d][col]) {
        cans++;
      }
    }
    if (u == d && grid[u][col] == 1) {
      cmid++;
    }
  }

  console.log(cmid);
  if (grid[0].length < 4) {
    cans += cmid;
  } else {
    cmid %= 4;
    cans += Math.min(cmid, 4 - cmid);
  }

  if (grid.length < 4 || grid[0].length < 4) {
    return Math.max(rans, cans)
  }
  return Math.min(rans, cans)
}
// 0 0 1
// 1 1 1
// 0 1 0
// 0 1 1