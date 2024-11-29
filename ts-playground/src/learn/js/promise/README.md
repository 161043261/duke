# Promise

**executor**

```js
const executor = (resolve, reject) => {};
new Promise(executor);
```

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

1. 如果抛出错误, 则新 promise 的 PromiseState 为 rejected, reason 是抛出的错误 Error 对象
2. 如果返回值为非 Promise 对象 (包括 Error 对象), 则新的 promise 的 PromiseState 为 fulfilled, PromiseResult 是返回值
3. 可以返回新的 Promise 对象

### Promise 的方法

1. [Promise.resolve()](./api/resolve.js)
   - 传递一个非 Promise 对象, 返回的 promise 的 PromiseState 为 fulfilled
   - 传递一个 PromiseState == fulfilled 的 Promise 对象, 返回的 promise 的 PromiseState 为 fulfilled
   - 传递一个 PromiseState == rejected 的 Promise 对象, 返回的 promise 的 PromiseState 为 rejected
2. [Promise.reject()](./api/reject.js) 返回的 promise 的 PromiseState 始终为 rejected
3. [Promise.catch()](./api/catch.js) 指定异步任务失败时, 即 `reject(...); throw new Error(...)` 时的错误处理函数
4. [Promise.finally()](./api/finally.js) 不管 PromiseState 是 fulfilled 还是 rejected, 最终都会执行

`Promise.all(), Promise.any(), Promise.race(), Promise.allSettled`: 将一组子 promise 包装为一个新的 promise (将一组子异步任务包装为一个新的异步任务)

1. [Promise.all()](./api/all.js)
   - 有一个子 promise 失败时, 返回的 promise 失败 rejected
   - 全部子 promise 都成功时, 返回的 promise 才成功 fulfilled
2. [Promise.any()](./api/any.js)
   - 有一个子 promise 成功时, 返回的 promise 成功 fulfilled
   - 全部子 promise 都失败时, 返回的 promise 才失败 rejected
3. [Promise.race()](./api/race.js)
   - 最先切换 PromiseState 的子 promise 成功时, 返回的 promise 成功 fulfilled
   - 最先切换 PromiseState 的子 promise 失败时, 返回的 promise 失败 rejected
4. [Promise.allSettled()](./api/allSettled.js)
   - settled: 包含 fulfilled 和 rejected 两种情况
   - 全部子 promise 是否都 "已解决" (可能成功, 可能失败)

### 终止 Promise 链

有且只有一种方式: 返回一个 PromiseState = pending 的 promise 对象, 且 finally 块的无参回调函数**不会**被执行 [abort](./abort.js)

### 关键问题

1. 可以指定多个回调函数 [multi_cb](./multi_cb.js)
2. 切换 promise 对象的 PromiseState 和指定回调函数的先后问题
   - `const executor = (resolve, reject) => {...}`
   - 如果 executor 函数体中是异步代码, 则先指定回调函数, 后切换 promise 对象的 PromiseState. 即先 then(...), 后执行 executor 函数体
   - 如果 executor 函数体中是同步代码, 则先切换 promise 对象的 PromiseState, 后指定回调函数. 即先执行 executor 函数体, 后 then(...)

```js
const p = new Promise((resolve, reject) => {
  // 同步代码: 先执行 executor 函数体, 后 then(...)
  // resolve('ok')
  // reject('err')

  // 异步代码: 先 then(...), 后执行 executor 函数体
  setTimeout(() => { resolve('ok'); }, 1000);
})
.then(...) // 指定回调函数 onfulfilled, onrejected
```

```js
// 这里是先执行 executor 函数体, 后 then(...)
const p = new Promise((resolve, reject) => {
  setTimeout(() => { resolve('ok'); }, 1000);
}).then(...)

setTimeout(() => {
  p.then(...) // 指定回调函数 onfulfilled, onrejected
}, 3000)
```

> 如果 onfulfilled, onrejected 回调函数中 throw what
>
> 则 then, catch 返回 Promise{ PromiseState: rejected, PromiseReturn: what }
>
> 如果 onfulfilled, onrejected 回调函数中 return what (没有 return 等价于 return undefined)
>
> 则 then, catch 返回 Promise{ PromiseState: fulfilled, PromiseReturn: what }
