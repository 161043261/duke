# JavaScript/TypeScript Playground

```js
function okCallback(result) {
  console.log("ok: " + result);
}

function errCallback(err) {
  console.log("err: " + err);
}

handler(option, okCallback, errCallback);
```

Promise 链式调用: 避免回调地狱 (Callback Hell)

```js
handler(option) /* Promise 对象 */
  .then(okCallback, errCallback);
```

```js
// Callback Hell
let reply = handler(
  args,
  function (args) {
    nextHandler1(
      temp1,
      function (temp1) {
        nextHandler2(
          temp2,
          function (temp2) {
            let reply;
            // ...
            return reply;
          },
          errCallback // 1
        );
      },
      errCallback // 2
    );
  },
  errCallback
); // 3
```

```js
const temp /* Promise */ = handler(args);
// reply 表示 handler 函数执行结束, 也表示 okCallback 或 errCallback 函数执行结束
// okCallback, errCallback 也可以是返回 Promise 对象的异步函数
const reply = temp.then(okCallback, errCallback);
```

```js
function asyncHandler() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("https://example.com/");
    }, 2000 /* ms */);
  });
}
```

```js
let lambda1 = () => x;
// equivalent to
let lambda2 = () => {
  return x;
};
```

在 then 回调中, 必须返回 Promise 对象!!!

```js
//!!! Err
doSomething()
  .then((url) => {
    /* return */ fetch(url); // 未返回 Promise 对象
  })
  .then((result) => {
    // result === undefined
  });
```

```js
// OK
doSomething()
  .then((url) => {
    return fetch(url); // 返回 Promise 对象
  })
  .then((result) => {
    // result === undefined
  });
```

遇见一个 Promise, 返回该 Promise, 延迟到下一个 then 处理

```js
//!!! Err
const slice = [];

doSomething()
  .then((url) => {
    /* return */ fetch(url) // 未返回 Promise 对象
      .then((res) => res.json())
      .then((data) => {
        slice.push(data);
      });
  })
  .then(() => {
    // fetch 请求未执行结束, slice 为空
    console.log(slice);
  });
```

```js
// OK
const slice = [];

doSomething()
  .then((url) => {
    return fetch(url) // 返回 Promise 对象
      .then((res) => res.json())
      .then((data) => {
        slice.push(data);
      });
  })
  .then(() => {
    // fetch 请求执行结束, slice 不为空
    console.log(slice);
  });
```

```js
// Better
const slice = [];

doSomething()
  .then((url) => fetch(url))
  .then((res) => res.json())
  .then((data) => {
    slice.push(data);
  })
  .then(() => {
    console.log(slice);
  });
```

使用 async/await

```js
// Graceful
const slice = [];

async function handler() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  slice.push(data);
  console.log(slice);
}
```

### 错误处理

- 在回调地狱中, 有 3 次 errCallback 的调用
- 在 Promise 链式调用中, 只有 1 次尾部 errCallback 的调用

```js
let reply = handler(args)
  .then((temp1) => nextHandler1(temp1))
  .then((temp2) => nextHandler2(temp2))
  .catch(errCallback);
```

等价于

```js
try {
  let temp1 = syncHandler(args);
  let temp2 = syncNextHandler1(temp1);
  let reply = syncNextHandler2(temp2);
} catch (err) {
  errCallback(err);
}
```

使用 async/await

```js
async function main() {
  try {
    const temp1 = await handler(args);
    const temp2 = await nextHandler1(temp1);
    const reply = await nextHandler2(temp2);
  } catch (err) {
    errCallback(err);
  }
}
```

细粒度的错误处理

```js
doKernel()
  .then((result) =>
    doOpt() /* 返回 Promise 对象 */
      .then((optResult) => doNextOpt(optResult))
      .catch((e) => {
        /* ignored */
      })
  ) // 可选处理抛出异常时，继续执行
  .then(() => doNextKernel())
  .catch((e) => console.log(`Fatal error: ${e.message}`));
```

使用 async/await

```js
async function main() {
  try {
    const result = await doKernel();
    try {
      const optResult = await doOpt(result);
      await doNextOpt(optResult);
    } catch (e) {
      // 可选处理 doOpt, doNextOpt 抛出异常时，继续执行
    }
    await doNextKernel();
  } catch (e) {
    console.error(`Fatal error: ${e.message}`);
  }
}
```

catch 后续的链式操作

```js
new Promise((resolve, reject) => {
  console.log("Init...");
  resolve();
})
  .then(() => {
    throw new Error("Fatal error");
    console.log("Execute this");
  })
  .catch(() => {
    console.log("Execute that");
  })
  .then(() => {
    console.log("Always execute");
  });
```

使用 async/await

```js
// 同じ
// 同じ
// 同じ
async function main() {
  try {
    console.log("Init...");
    throw new Error("Fatal error");
    console.log("Execute this");
  } catch (e) {
    console.log("Execute that");
  }
  console.log("Always execute");
}
```

Promise 拒绝事件: 当一个 Promise 拒绝事件未被任何 then 处理器处理时, 将被抛到调用栈栈顶.

- rejectionHandled: 当 Promise 被拒绝, 该拒绝事件**被** reject 函数处理时, 派发 rejectionHandled 事件
- unhandledRejection: 当 Promise 被拒绝, 该拒绝事件**未被** reject 函数处理时, 派发 unhandledRejection 事件

```js
// process.on 监听器, 捕获未处理的 Promise
process.on("unhandledRejection", (reason, promise) => {
  // 检查 reason 和 promise
});
```

### 组合

4 个组合工具

1. Promise.all()
2. Promise.allSettled()
3. Promise.any()
4. Promise.race()

```js
// 等待多个异步操作
Promise.all([func1(), func2(), func3()]).then(
  ([result1, result2, result3]) => {}
);
```

```js
// 数组的 reduce 方法对数组的每个元素按序执行 reducer 函数
// 每次执行 reducer 函数, 将前一个元素的执行结果作为第一个参数传入
// 最后组合为单个返回值
const slice = [1, 2, 3, 4];
const init = 0;
const sum = slice.reduce((acc, curr) => acc + curr, init /* acc 的初始值 */);
console.log("sum:", sum);
```

```js
[asyncf1, asyncf2, asyncf3]
  .reduce(
    (promise, asyncf) => promise.then(asyncf) /* reducer 函数 */,
    Promise.resolve()
  )
  .then((result) => {
    // ...
  });
```

等价于

```js
Promise.resolve()
  .then(asyncf1)
  .then(asyncf2)
  .then(asyncf3)
  .then((result) => {
    // ...
  });
```

可复用的形式

```js
const reducer = (acc, curr) => acc.then(curr);
const composeAsync =
  (...asyncfs) =>
  () =>
    asyncfs /* [asyncf1, asyncf2, asyncf3] */
      .reduce(reducer, Promise.resolve() /* acc 的初始值 */);

const composer = composeAsync(asyncf1, asyncf2, asyncf3);
const result = composer();
```

等价于

```js
let result;

for (const asyncf of [asyncf1, asyncf2, asyncf3]) {
  result = await asyncf(result);
}
```

在旧 API 中创建 Promise

```typescript
// let timerId: number = setTimeout(() => { console.log("Sleeped 10s"), 10_000; });
// console.log("Timer ID:", timerId);

const wait = (ms: number) =>
  new Promise<any>((resolve, reject /* optional */) => {
    // Fatal error: runtime exception
    // throw new Error("runtime exception")
    setTimeout(resolve, ms);
  });

const promise: Promise<any> = wait(5000 /* ms */);
const failOnErr = (e: Error) => {
  console.log("Fatal error:", e.message);
};

promise
  .then(() => {
    console.log("Sleep 5s");
  })
  .catch(failOnErr);
```

禁止同时使用 sync 同步调用和 async 异步调用

```js
function doSomething(callback) {
  if (Math.random() > 0.5) {
    callback();
  } else {
    setTimeout(() => callback(), 1000);
  }
}
```

传入 then() 的回调函数被处理为微任务, 不是同步调用 (立刻执行), 而是进入微任务队列等待, 即使 Promise 对象已解决 (resolved)

```js
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2

const wait0 = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

wait0(0).then(() => console.log("d"));

Promise.resolve() /* 创建一个已解决 (resolved) 的 Promise 对象 */
  .then(() => console.log("b"))
  .then(() => console.log("c"));
console.log("a"); // a, b, c, d
```

```js
const promise = new Promise((resolve, reject) => {
  console.log("Promise callback");
  resolve();
}).then((result) => {
  console.log("Promise callback (.then)");
});

setTimeout(() => {
  // TODO Event loop: Promise (fulfilled) Promise { undefined }
  console.log("Event loop: Promise (fulfilled)", promise);
}, 0);

console.log("Promise (pending)", promise);
```
