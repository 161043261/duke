({
  3: 1,
  length: 5,
  __proto__: Array(0),
}).copyWithin(0, 3);


const arr1 = [undefined, undefined, undefined, 1, undefined];
const arr2 = {
  3: 1,
  length: 5,
  __proto__: Array(0),
};

console.log(arr1 instanceof Array);
console.log(arr2 instanceof Array);

const arr = [1, 2, 3, 4, 5];

let kvs = arr.groupBy((el, idx, arr) => {
  return el % 2 === 0 ? "even" : "odd";
});
console.log(kvs);
console.log(kvs.constructor === Map);