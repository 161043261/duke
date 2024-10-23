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

-   在回调地狱中, 有 3 次 errCallback 的调用
-   在 Promise 链式调用中, 只有 1 次尾部 errCallback 的调用

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
async function asyncFunc() {
    try {
        const temp1 = await handler(args);
        const temp2 = await nextHandler1(temp1);
        const reply = await nextHandler2(temp2);
    } catch (err) {
        errCallback(err);
    }
}
```
