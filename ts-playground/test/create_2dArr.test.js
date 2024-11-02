//! pnpm test create_2dArr
import {test} from "vitest";

// [test1] First arr2d: [ [ 1, 1 ], [ 1, 1 ] ]
// [test1] Second arr2d: [ [ 1, 3 ], [ 1, 3 ] ]
test("create_2dArr_test1", () => {
  let arr2d = new Array(2).fill(new Array(2).fill(1));
  console.log("[test1] First arr2d:", arr2d);
  arr2d[0][1] = 3;
  console.log("[test1] Second arr2d:", arr2d);
});

test("create_2dArr_test2", () => {
  let arr2d = new Array(2);
  for (let arr /* 值拷贝 */ of arr2d) {
    arr = new Array(2).fill(1);
  }
  // [test2] First arr2d: [ <2 empty items> ]
  console.log("[test2] First arr2d:", arr2d);

  let entered = false;
  for (let idx in arr2d) {
    entered = true //! 不会进入该 for 循环
  }
  // [test2] entered: false
  console.log("[test2] entered:", entered)

  // [test2] arr2d.length: 2
  console.log("[test2] arr2d.length:", arr2d.length);
  for (let idx = 0; idx < arr2d.length; idx++) {
    arr2d[idx] = /* new */ Array(2).fill(1);
  }

  // [test2] Second arr2d: [ [ 1, 1 ], [ 1, 1 ] ]
  console.log("[test2] Second arr2d:", arr2d);
  arr2d[0][1] = 3;
  // [test3] Third arr2d: [ [ 1, 3 ], [ 1, 1 ] ]
  console.log("[test3] Third arr2d:", arr2d);
});

// [test3] First arr2d: [ [ 1, 1 ], [ 1, 1 ] ]
// [test3] Second arr2d: [ [ 1, 3 ], [ 1, 1 ] ]
test("create_2dArr_test3", () => {
  // > Array.from([1, 2, 3], item => item * item)
  // [1, 4, 9]
  const arr2d = Array.from(
    {
      length: 2,
    },
    () => /* new */ Array(2).fill(1),
  );
  console.log("[test3] First arr2d:", arr2d);
  arr2d[0][1] = 3;
  console.log("[test3] Second arr2d:", arr2d);
});

test("create_2dArr_test4", () => {
  const arr2d = /* new */ Array(2).fill(undefined)
    .map(() => new Array(2).fill(1));
  console.log("[test4] First arr2d:", arr2d);
  arr2d[0][1] = 3;
  console.log("[test4] Second arr2d:", arr2d);

  // 等价于
  const arr1d = Array(2).fill(undefined)
  // The map() method of Array instances creates a **new** array...
  const newArr2d = arr1d.map(() => {
    return Array(2).fill(1)
  });
  console.log("[test4] First newArr2d:", newArr2d);
  newArr2d[0][1] = 3;
  console.log("[test4] Second newArr2d:", newArr2d);
});
