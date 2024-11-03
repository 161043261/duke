function searchMatrix(matrix: number[][], target: number): boolean {
  const visited: boolean[][] = new Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = new Array(matrix[0].length).fill(false);
  }
  let ans = false;

  const dfs = (x: number, y: number) => {
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

    if (nextX < matrix.length
      && nextY < matrix[0].length
      && !visited[nextX][nextY]) {
      dfs(nextX, nextY);
    }
  };

  dfs(0, 0);
  return ans;
}
