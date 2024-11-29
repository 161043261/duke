// await 等待返回一个 fulfilled 的 Promise 对象的 async 函数时, 取出 promise.PromiseReturn
// await 等待返回一个 rejected 的 Promise 对象的 async 函数时, 抛出错误

// Promise.race()
// 最先切换 PromiseState 的子 promise 成功时, 返回的 promise 成功 fulfilled
// 最先切换 PromiseState 的子 promise 失败时, 返回的 promise 失败 rejected

var timeLimit1 = function (fn, t) {
  return async function (...args) {
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => reject("Time Limit Exceeded"), t);
    });
    let p2 = fn(...args);
    return Promise.race([p1, p2]);
  };
};

var timeLimit2 = function (fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);

      // fn(...args).then(resolve)
      //   .catch(reject);

      fn(...args)
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
};

var timeLimit3 = function (fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      // 优化: clearTimeout
      const timerId = setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);
      fn(...args)
        .then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            throw reason;
          },
        )
        .catch((reason) => {
          reject(reason);
        })
        .finally(() => {
          clearTimeout(timerId);
        });
      // 如果 onfulfilled, onrejected 回调函数中 throw what
      // 则 then, catch 返回 Promise{ PromiseState: rejected, PromiseReturn: what }
      // 如果 onfulfilled, onrejected 回调函数中 return what
      // 则 then, catch 返回 Promise{ PromiseState: fulfilled, PromiseReturn: what }
    });
  };
};

console.log(
  timeLimit1(async () => {
    throw "wtf";
  }, 1000)([]),
); // Promise{ PromiseState: 'rejected', PromiseReturn: 'wtf' }

console.log(
  timeLimit2(async () => {
    throw "wtf";
  }, 1000)([]),
); // Promise{ PromiseState: 'rejected', PromiseReturn: 'wtf' }

console.log(
  timeLimit3(async () => {
    throw "wtf";
  }, 1000)([]),
); // Promise{ PromiseState: 'rejected', PromiseReturn: 'wtf' }

// async 函数总是返回一个 Promise 对象

var timeLimit4 = function (fn, t) {
  return async function (...args) {
    return new Promise(async (resolve, reject) => {
      const timerId = setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);
      try {
        // await 等待返回一个 fulfilled 的 Promise 对象的 async 函数时, 返回 promise.PromiseReturn
        // await 等待返回一个 rejected 的 Promise 对象的 async 函数时, 抛出 promise.PromiseReturn
        const value = await fn(...args);
        resolve(value);
      } catch (reason) {
        reject(reason);
      }
      clearTimeout(timerId);
    });
  };
};

console.log(
  timeLimit4(async () => {
    throw "wtf";
  }, 1000)([]),
); // Promise{ PromiseState: 'rejected', PromiseReturn: 'wtf' }
