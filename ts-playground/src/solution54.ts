function spiralOrder(matrix: number[][]): number[] {
  let [x, y] = [0, 0];
  let [lend, rend, uend, dend] = [
    0,
    matrix[0].length - 1,
    1,
    matrix.length - 1,
  ];
  //     y
  //   0 1 2 3
  // x 1
  //   2
  //   3
  let travel: number[] = [];

  const turnU = (end: number) => {
    while (x > end) {
      // console.log(matrix[x][y])
      travel.push(matrix[x][y]);
      x--;
    }
    uend++;
  };

  const turnD = (end: number) => {
    while (x < end) {
      // console.log(matrix[x][y])
      travel.push(matrix[x][y]);
      x++;
    }
    dend--;
  };

  const turnL = (end: number) => {
    while (y > end) {
      // console.log(matrix[x][y])
      travel.push(matrix[x][y]);
      y--;
    }
    lend++;
  };

  const turnR = (end: number) => {
    while (y < end) {
      // console.log(matrix[x][y])
      travel.push(matrix[x][y]);
      y++;
    }
    rend--;
  };

  while (true) {
    if (lend <= rend) {
      turnR(rend);
    } else {
      break;
    }

    if (uend <= dend) {
      turnD(dend);
    } else {
      break;
    }

    if (lend <= rend) {
      turnL(lend);
    } else {
      break;
    }

    if (uend <= dend) {
      turnU(uend);
    } else {
      break;
    }
  }
  travel.push(matrix[x][y]);
  return travel;
}

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
);
