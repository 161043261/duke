/* eslint-disable no-unused-private-class-members */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n_) {
  let n = n_;

  return function () {
    return n++;
  };
};

/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

//! 私有字段

class ClassWithPrivate {
  //! 不允许私有构造函数
  // #constructor

  #privateField;
  #privateInitializedField = 64;
  #privateMethod() {}

  static #privateStaticField;
  static #privateInitializedStaticField = 64;
  static #privateStaticMethod() {}

  //! 不允许删除私有字段
  //! 使用 delete 删除私有字段, 会抛出 SyntaxError 错误
  constructor() {
    console.log(this.#privateInitializedField);
    // delete this.#privateField; // SyntaxError: Private fields can not be deleted
    // delete this.#privateMethod; // SyntaxError: Private fields can not be deleted
  }
}

class C {
  #x = 1; // 私有属性
  y = 2; // 普通属性

  static getx(obj) {
    return obj.#x;
  }

  static gety(obj) {
    return obj.y;
  }
}

//! 访问对象中不存在的普通字段, 会返回 undefined
//! 访问对象中不存在的私有字段, 会抛出 TypeError 错误

console.log(C.getx(new C())); // 1
// console.log(C.getx({})) // TypeError: Cannot read private member...
console.log(C.gety(new C())); // 2
console.log(C.gety({})); // undefined

class K {
  #x = 3;

  constructor(x) {
    this.#x = x;
  }

  static getx(obj) {
    if (#x in obj) {
      return obj.#x;
    }
    return `obj instanceof K: ${obj instanceof K}`;
  }
}

console.log(K.getx(new C())); // target instanceof K: false
console.log(K.getx(new K())); // undefined
console.log(K.getx(new K(5))); // 5
console.log(K.getx({})); // target instanceof K: false

//! 私有字段不是原型继承模型的一部分
// Object.freeze() 和 Object.seal() 对私有字段没有影响
