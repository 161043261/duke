/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";
Array.prototype.snail = function (rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) {
    return [];
  }
  const genFunc = function* (arr) {
    for (const item of arr) {
      yield item;
    }
  };
  const gen = genFunc(this);
  const ret = Array.from(
    {
      length: rowsCount,
    },
    (item) => new Array(colsCount),
  );
  for (let col = 0; col < colsCount; col++) {
    for (let row = 0; row < rowsCount; row++) {
      ret[row][col] = gen.next().value;
    }
    col++;
    if (col === colsCount) {
      break;
    }
    for (let row = rowsCount - 1; row >= 0; row--) {
      ret[row][col] = gen.next().value;
    }
  }
  return ret;
};
const arr = [1, 2, 3, 4];
console.log(arr.snail(1, 4));