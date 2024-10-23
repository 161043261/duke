# JavaScript/TypeScript Playground

```js
function okCallback(result) {
  console.log("ok: " + result);
}

function errCallback(err) {
  console.log("err: " + err);
}

createAudioFileAsync(audioSettings, okCallback, errCallback);
```

Promise 链式调用: 避免回调地狱 (Callback Hell)

```js
createAudioFileAsync(audioSettings) /* Promise */
  .then(okCallback, errCallback);
```

```js
preHandler(function (preResult) {
  midHandler(
    preResult,
    function (midResult) {
      postHandler(
        midResult,
        function (postResult) {
          console.log(postResult);
        },
        postErrCallback
      );
    },
    midErrCallback
  );
}, preErrCallback);
```

```js
const promise = handler();
// nextPromise 不仅表示 handler 函数执行结束, 还表示 okCallback 或 errCallback 函数执行结束
// 两个 Callback 也可以是返回 Promise 对象的异步函数
const nextPromise = promise.then(okCallback, errCallback);
```

```js
function asyncHandler() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("handling...");
      resolve("https://example.com/");
    }, 2000 /* ms */);
  });
}
```

```js
let lambda = () => x;
// equivalent to
let lambda_ = () => {
  return x;
};
```

在 then 回调中, 必须返回 Promise!

```js
// err                          ok
doSomething()                doSomething()
  .then((url) => {             .then((url) => {
    /* return */ fetch(url);     return fetch(url);
  })                           })
  .then((result) => {          .then((result) => {
    // result === undefined      // result === undefined
  });                          });
```

每遇到一个 Promise, 返回该 Promise, 延迟到下一个 then 处理器中

```js
//
// Err
//
const slice = [];

doSomething()
  .then((url) => {
    /* return */ fetch(url)
      .then((res) => res.json())
      .then((data) => {
        slice.push(data);
      });
  })
  .then(() => {
    // fetch 请求未执行结束
    // slice === []
    console.log(slice);
  });
```

```js
//
// OK
//
const slice = [];

doSomething()
  .then((url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        slice.push(data);
      });
  })
  .then(() => {
    // fetch 请求执行结束
    console.log(slice);
  });
```

```js
//
// Better
//
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
