# async/await

前置知识 [Promise](./README.md)

async/await 是 ES7 提出的

> async 函数总是返回一个 Promise 对象
>
> await 只能用在 async 函数体中
>
> 有时, 表面上返回一个非 Promise 对象 target, 实际上返回 `Promise{ PromiseState: 'fulfilled', PromiseResult: target }`

- await 返回一个 fulfilled 的 Promise 对象的 async 函数时, 取出 promise.PromiseReturn
- await 返回一个 rejected 的 Promise 对象的 async 函数时, 抛出错误
  [async](./async.js)

```js
async function f() {
  /* 表面上 */ return new Error("wtf");
  /* 实际上 */
  // return Promise{ PromiseState: 'fulfilled', PromiseResult: Error{'wtf'} }
}
```

[await](./await.js)
