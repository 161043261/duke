/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => reject("Time Limit Exceeded"), t);
    });
    let p2 = fn.call(this, ...args);
    return Promise.race([p1, p2]);
  };
};

// await 返回一个 fulfilled 的 Promise 对象的 async 函数时, 取出 promise.PromiseReturn
// await 返回一个 rejected 的 Promise 对象的 async 函数时, 抛出错误

// Promise.race()
// 最先切换 PromiseState 的子 promise 成功时, 返回的 promise 成功 fulfilled
// 最先切换 PromiseState 的子 promise 失败时, 返回的 promise 失败 rejected

