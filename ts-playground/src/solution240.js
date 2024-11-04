"use strict";
function searchMatrix(matrix, target) {
  // const visited = new Array(matrix.length);
  // for (let i = 0; i < matrix.length; i++) {
  //   visited[i] = new Array(matrix[0].length).fill(false);
  // }

  //! error
  // const visited = new Array(matrix.length).fill(new Array(matrix[0].length).fill(false))
  const visited = Array.from(
    {
      length: matrix.length,
    },
    () => /* new */ Array(matrix[0].length).fill(false),
  );

  let ans = false;
  const dfs = (x, y) => {
    visited[x][y] = true;
    if (matrix[x][y] == target) {
      ans = true;
      return;
    }
    const nextX = x + 1;
    const nextY = y + 1;
    if (nextX < matrix.length && !visited[nextX][y]) {
      dfs(nextX, y);
    }
    if (nextY < matrix[0].length && !visited[x][nextY]) {
      dfs(x, nextY);
    }
    if (
      nextX < matrix.length &&
      nextY < matrix[0].length &&
      !visited[nextX][nextY]
    ) {
      dfs(nextX, nextY);
    }
  };
  dfs(0, 0);
  return ans;
}
