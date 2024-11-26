let kvs = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

let arr1 = [...kvs];
console.log(arr1);

let arr2 = [...kvs.entries()];
console.log(arr2);

let ks = [...kvs.keys()];
console.log(ks);

let vs = [...kvs.values()];
console.log(vs);

const genFunc = function* () {
  yield 1;
  yield 2;
  yield 3;
};

const gen = genFunc();
console.log([...gen]); // [1, 2, 3]
