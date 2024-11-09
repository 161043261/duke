"use strict";
class NeighborSum {
  constructor(grid) {
    this.grid = grid;
    this.val2xy = new Map();
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        this.val2xy.set(grid[x][y], [x, y]);
      }
    }
  }
  adjacentSum(value) {
    let [x, y] = this.val2xy.get(value);
    let ret = 0;
    // x-1, y
    // x, y-1
    // x, y+1
    // x+1, y
    if (x - 1 >= 0) {
      ret += this.grid[x - 1][y];
    }
    if (y - 1 >= 0) {
      ret += this.grid[x][y - 1];
    }
    if (y + 1 < this.grid[0].length) {
      ret += this.grid[x][y + 1];
    }
    if (x + 1 < this.grid.length) {
      ret += this.grid[x + 1][y];
    }
    return ret;
  }
  diagonalSum(value) {
    let [x, y] = this.val2xy.get(value);
    let ret = 0;
    // x-1, y-1
    // x-1, y+1
    // x+1, y-1
    // x+1, y+1
    if (x - 1 >= 0) {
      if (y - 1 >= 0) {
        ret += this.grid[x - 1][y - 1];
      }
      if (y + 1 < this.grid[0].length) {
        ret += this.grid[x - 1][y + 1];
      }
    }
    if (x + 1 < this.grid.length) {
      if (y - 1 >= 0) {
        ret += this.grid[x + 1][y - 1];
      }
      if (y + 1 < this.grid[0].length) {
        ret += this.grid[x + 1][y + 1];
      }
    }
    return ret;
  }
}
/**
 * Your NeighborSum object will be instantiated and called as such:
 * var obj = new NeighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */
