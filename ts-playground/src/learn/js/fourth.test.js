//! 引用类型的深拷贝

//? 浅拷贝: 拷贝地址值
//? 深拷贝
// 1. 深拷贝单层 (属性值是基本类型) 对象:
//    - Object.assign();
//    - {...obj};
// 2. 深拷贝一维基本类型数组:
//    - Array.prototype.concat();
//    - [...arr];
// 4. lodash.cloneDeep
// 5. JSON.stringify()
// 6. 递归实现深拷贝

import { test } from "vitest";
import _ from "lodash";

//! Object.assign()
test("DeepClone1", () => {
  {
    let dst = { a: 1 };
    let src1 = { b: 2 };
    let src2 = { c: 3 };
    let ret = Object.assign(dst, src1, src2);
    console.log(dst === ret); // true
  }

  {
    //! passed
    let src = { a: 1, b: 2, c: 3 };
    let dst = {};
    Object.assign(dst, src);
    src.a = 4;
    src.d = 5;
    // { a: 1, b: 2, c: 3 }
    console.log(dst);
  }

  {
    //! failed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = {};
    Object.assign(dst, src);
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { a: { v1: 4, v4: 5 }, b: { v2: 2 }, c: { v3: 3 } }
    console.log(dst);
  }
});

//! {...obj}
test("DeepClone2", () => {
  {
    //! passed
    let src = { a: 1, b: 2, c: 3 };
    let dst = { ...src };
    src.a = 4;
    src.d = 5;
    // {a: 1, b: 2, c: 3}
    console.log(dst);
  }
  {
    //! failed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = { ...src };
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { a: { v1: 4, v4: 5 }, b: { v2: 2 }, c: { v3: 3 } }
    console.log(dst);
  }
});

//! Array.prototype.concat()
test("DeepClone3", () => {
  {
    //! passed
    let src = [1, 2, 3];
    let dst = Array.prototype.concat(src);
    src[0] = 4;
    src[3] = 5;
    // [ 1, 2, 3 ]
    console.log(dst);
  }
  {
    //! failed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = Array.prototype.concat(src);
    src[0].a = 4;
    src[0].d = 5;
    // [ { a: 4, d: 5 }, { b: 2 }, { c: 3 } ]
    console.log(dst);
  }
});

//! [...arr]
test("DeepClone4", () => {
  {
    //! passed
    let src = [1, 2, 3];
    let dst = [...src];
    src[0] = 4;
    src[3] = 5;
    // [ 1, 2, 3 ]
    console.log(dst);
  }
  {
    //! failed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = [...src];
    src[0].a = 4;
    src[0].d = 5;
    // [ { a: 4, d: 5 }, { b: 2 }, { c: 3 } ]
    console.log(dst);
  }
});

//! lodash.cloneDeep
test("DeepClone5", () => {
  {
    //! passed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = _.cloneDeep(src);
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } }
    console.log(dst);
  }
  {
    //! passed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = _.cloneDeep(src);
    src[0].a = 4;
    src[0].d = 5;
    // [ { a: 1 }, { b: 2 }, { c: 3 } ]
    console.log(dst);
  }
});

//! JSON.stringify()
test("DeepClone6", () => {
  {
    //! passed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = JSON.parse(JSON.stringify(src));
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } }
    console.log(dst);
  }
  {
    //! passed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = JSON.parse(JSON.stringify(src));
    src[0].a = 4;
    src[0].d = 5;
    // [ { a: 1 }, { b: 2 }, { c: 3 } ]
    console.log(dst);
  }
});

// TODO
function deepClone(dst, src) {
  for (let k in src) {
    if (src[k] instanceof Object) {
      dst[k] = {};
      deepClone(dst[k], src[k]);
    } else if (src[k] instanceof Array) {
      dst[k] = [];
      deepClone(dst[k], src[k]);
    } else {
      dst[k] = src[k];
    }
  }
}

test("DeepClone7", () => {
  {
    //! passed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = {};
    deepClone(dst, src);
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } }
    console.log(dst);
  }
  {
    //! passed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = [];
    deepClone(dst, src);
    src[0].a = 4;
    src[0].d = 5;
    // [ { a: 1 }, { b: 2 }, { c: 3 } ]
    console.log(dst);
  }
});