/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
  let zeroCols: number[] = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] == 0) {
        zeroCols.push(col);
        // 该行置 0
        for (let i = 0; i < matrix[0].length; i++) {
          if (matrix[row][i] == 0 && i != col) {
            zeroCols.push(i);
          } else {
            matrix[row][i] = 0;
          }
        }
        break;
      }
    }
  }

  for (let col of zeroCols) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][col] = 0;
    }
  }
}
