class ArrExt extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new ArrExt();
const b = a.map((x) => x);

console.log(a instanceof ArrExt); // true
console.log(a instanceof Array); // true
console.log(ArrExt[Symbol.hasInstance](a)); // true
console.log(Array[Symbol.hasInstance](a)); // true

console.log(b instanceof ArrExt); // false
console.log(b instanceof Array); // true
console.log(ArrExt[Symbol.hasInstance](b)); // false
console.log(Array[Symbol.hasInstance](b)); // true

class P1 extends Promise {}

class P2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

console.log(
  new P1((resolve, reject) => resolve).then((value) => value) instanceof P1,
); // true
console.log(
  new P2((resolve, reject) => resolve).then((value) => value) instanceof P2,
); // false
