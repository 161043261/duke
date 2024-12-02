/* eslint-disable @typescript-eslint/no-unused-vars */
type MultiDimensionalArray = (number | MultiDimensionalArray)[];

const flat = function (
  arr: MultiDimensionalArray,
  n: number,
): MultiDimensionalArray {
  const ret: MultiDimensionalArray = [];
  const doFlat = function (arr: MultiDimensionalArray, depth: number) {
    for (const item of arr) {
      if (depth === n) {
        ret.push(item);
        continue;
      }
      // depth < n
      if (Array.isArray(item) /* item instanceof Array */) {
        doFlat(item, depth + 1);
      } else {
        ret.push(item);
      }
    }
  };
  doFlat(arr, 0);
  return ret;
};

const flat1 = function (
  arr: MultiDimensionalArray,
  n: number,
): MultiDimensionalArray {
  return flatten(arr, n);

  function flatten(arr: MultiDimensionalArray, n: number) {
    if (n <= 0) {
      return arr;
    }

    const ret: MultiDimensionalArray = [];
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        ret.push(...flatten(item, n - 1));
      } else {
        ret.push(item);
      }
    });
    return ret;
  }
};

console.log(
  flat1([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1),
);
