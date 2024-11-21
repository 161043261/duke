/**
 *! 方法 1
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function () {
  if (this.length === 0) {
    return -1;
  }
  return this[this.length - 1];
};

//! 方法 2: 使用 Nullish 合并运算符
Array.prototype.last = function () {
  return this[this.length - 1] ?? -1;
};

//! 方法 3: 使用 Array.prototype.pop();
Array.prototype.last = function () {
  let val = this.pop();
  return val !== undefined ? val : -1;
};

//! 方法 4: 使用 Array.prototype.at();
Array.prototype.last = function () {
  return this.at(-1) ?? -1;
};

//! 方法 5: 使用 Array.prototype.slice();
Array.prototype.last = function () {
  return this.length ? this.slice(-1)[0] : -1;
};

//! 方法 6: 使用数组解构默认值
Array.prototype.last = function () {
  const [lastElement = -1] = this.slice(-1);
  return lastElement;
};

//! Polyfill: 为旧浏览器提供新的原生功能
if (!Array.prototype.findLast) {
  Array.prototype.findLast = function (predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  };
}

//! 方法 7: 使用 Array.prototype.findLast(); (ES2022)
Array.prototype.last = function () {
  return this.findLast(() => true) ?? -1;
};

//! 方法 8: 使用 ES6 Getters
Object.defineProperty(Array.prototype, "last", {
  get: function () {
    return () => (this.length ? this[this.length - 1] : -1);
  },
});

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */

//? format: Test_XxxYyyZzz, refer to Go test.
/*
{
  (() => {
    let arr = [1, 2, 3];
    console.log(Array.prototype.hasOwnProperty("push"));
    arr.push(4);

    Array.prototype.push = function () {
      console.log("The push method has been overridden!");
    };
    //! DANGEROUS
    arr.push(5);
  })();
}

let arr = [1, 2, 3];
//! DANGEROUS
arr.push(4);
*/

function Person(name) {
  console.log(this); // Person {}
  this.name = name;
  console.log(this); // Person { name: 'wtf' }
}

let who = new Person("wtf");
console.log(who.name);

class Foo {
  logVal() {
    console.log(this.val);
  }

  constructor(val) {
    console.log(this); // Foo {}
    this.val = val;
    console.log(this); // Foo { val: 'wtf' }
  }
}

const foo = new Foo("wtf");
console.log(foo); // Foo { val: 'wtf' }
foo.logVal();

// func.call(thisVal, ...args);
// func.apply(thisVal, args[]);
// const newFunc = func.bind(thisVal);

function thisLogger(...argv) {
  console.log(this, argv);
}

const o1 = { v: 1 };
const o2 = { v: 2 };
const o3 = { v: 3 };
thisLogger.call(o1, "w");
thisLogger.apply(o2, ["t", "t"]);

const o3Logger = thisLogger.bind(o3);
o3Logger("f", "f", "f");
o3Logger.call(o1, "w"); // invalid, this === o3
o3Logger.apply(o2, ["t", "t"]); // invalid, this === o3
