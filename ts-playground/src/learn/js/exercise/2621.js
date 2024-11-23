/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((resolve, reject) => {
    if (Object(millis) instanceof Number && millis > 0) {
      setTimeout(() => {
        resolve();
      }, millis);
    } else {
      reject(new Error());
    }
  });
}

async function sleep1(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, millis);
  });
}

async function sleep2(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
  // return undefined
  // return Promise{ PromiseState: 'fulfilled', PromiseReturn: undefined }
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

// async/await 是 Promise 的语法糖
// async 自动返回 Promise 对象的异步函数
// await 等待异步任务解决 solve 或拒绝 reject

async function example() {
  try {
    return await new Promise((resolve, reject) => {
      throw new Error("wtf");
    });
  } catch (err) {
    console.log(err);
    // return undefined
    // return Promise{ PromiseState: 'fulfilled', PromiseReturn: undefined }
  }
}

const promise = example();
console.log(promise);
// Promise{ PromiseState: 'fulfilled', PromiseReturn: undefined }
