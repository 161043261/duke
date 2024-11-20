# Promise

Promise 的优点

1. 传统的: 必须在启动异步任务前, 指定回调函数
2. Promise: 启动异步任务 ==> 返回 Promise 对象 ==> Promise 对象绑定回调函数 (onfulfilled, onrejected)
3. 避免回调地狱, 支持链式调用

### Promise 对象的两个属性

**PromiseState**: Promise 对象的状态

- pending: 异步任务未完成, 也是 Promise 对象初始化时的 PromiseState
- fulfilled: 异步任务成功
- rejected: 异步任务失败

**PromiseResult**: Promise 对象的结果

**resolve 函数** (异步任务成功)

1. 修改 Promise 对象的 PromiseState: `pending ==> fulfilled`
2. 设置 Promise 对象的 PromiseResult = resolve 函数的实参值

**reject 函数** (异步任务失败)

1. 修改 Promise 对象的PromiseState: `pending ==> rejected`
2. 设置 Promise 对象的PromiseResult = reject 函数的实参值

- [demo1](./demo1.js) 使用 Promise 读取文件
- [demo2](./demo2.html) 使用 Promise 发送 AJAX 请求
- [demo3](./demo3.js) 使用 Promise 操作 MongoDB 数据库
- [demo4](./demo4.js) 使用 Promise 实现 readFileSync

### node 的 promisify

将普通函数转换为 Promise 风格的函数

```js
const util = require("util");
const promisifiedReadFile = util.promisify(fs.readFile);
promisifiedReadFile("./promise.md").then(
  (value) => {
    console.log(value.toString().slice(0, 10));
  },
  (reason) => {
    console.log(reason);
  },
);
```

### PromiseState: Promise 对象的状态

Promise 对象有 3 种 PromiseState

- 异步任务未完成: pending
- 异步任务成功: fulfilled
- 异步任务失败: rejected

**PromiseState 的切换**

- 从 pending 未完成到 fulfilled 成功
- 从 pending 未完成到 rejected 失败
- 一个 Promise 对象的 PromiseState 只能切换一次

> Q `promise.then()` 返回的新的 Promise 对象的 PromiseState 由什么决定?
>
> A 由回调函数 onfulfilled, onrejected 的调用结果决定

[demo5](./demo5.js)

1. 如果抛出异常, 则新 promise 的 PromiseState 为 rejected, reason 是抛出的异常
2. 如果返回值为非 Promise 对象 (包括 Error 对象), 则新的 promise 的 PromiseState 为 fulfilled, PromiseResult 是返回值
3. 也可以返回新的 Promise 对象

### Promise 的方法

1. [Promise.resolve()](./api/resolve.js)
   - 传递一个非 Promise 对象, 返回的 promise 的 PromiseState 为 fulfilled
   - 传递一个 PromiseState == fulfilled 的 Promise 对象, 返回的 promise 的 PromiseState 为 fulfilled
   - 传递一个 PromiseState == rejected 的 Promise 对象, 返回的 promise 的 PromiseState 为 rejected
2. [Promise.reject()](./api/reject.js) 返回的 promise 的 PromiseState 始终为 rejected
3. [Promise.catch()](./api/catch.js) 指定异步任务失败时, 即 `reject(...); throw new Error(...)` 时的回调函数
4. [Promise.all()](./api/all.js)
   - 将多个子 promise 包装为一个新的 promise (将多个子异步任务包装为一个新的异步任务)
   - 全部子 promise 都成功时, 新的 promise 成功 fulfilled
   - 有一个子 promise 失败时, 新的 promise 失败 rejected
5. Promise.race()
6. Promise.allSettled()
7. Promise.any()
8. Promise.finally()
