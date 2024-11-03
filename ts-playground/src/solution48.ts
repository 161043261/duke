/**
 Do not return anything, modify matrix in-place instead.
 */

function rotate(matrix: number[][]): void {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let i = 0; i < Math.floor(matrix[0].length / 2); i++) {
    let k = matrix[0].length - 1 - i;
    for (let j = 0; j < matrix.length; j++) {
      [matrix[j][i], matrix[j][k]] = [matrix[j][k], matrix[j][i]];
    }
  }
}
