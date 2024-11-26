let arrlike = { length: 3 };
const arr1 = Array.from(arrlike, (item) => -1);
console.log(arr1);
// 等价于
const arr2 = Array.from(arrlike).map((item) => -1);
console.log(arr2);

console.log(Array.from([1, 2, 3], (x) => x * x)); // [1, 4, 9]
console.log([1, 2, 3].map(x => x * x)); // [1, 4, 9]

function typesOf() {
  return Array.from(arguments, (value) => typeof value);
}
console.log(typesOf(null, [], NaN)) // ['object', 'object', 'number']