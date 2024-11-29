/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function* (arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      console.log(item);
      yield*/* yield* 委托给另一个 generator 或可遍历对象 */ inorderTraversal(item);
    } else {
      yield item;
    }
  }
};

// 拍平数组
var inorderTraversal1 = function* (arr) {
  const nums = arr.flat(Infinity);
  for (const item of nums) {
    yield item;
  }
};

const gen = inorderTraversal([[[6]], [1, 3], []]);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
