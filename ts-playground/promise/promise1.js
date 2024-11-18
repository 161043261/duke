/**
 *
 * @param {(value: any) => void} resolve
 * @param {(reason?: any) => void} reject
 */
const executor = (resolve, reject) => {
  if (Math.random() < 0.5) {
    reject("Math.random < 0.5");
  } else {
    resolve("Math.random() >= 0.5");
  }
};

// 启动异步任务
const p1 = new Promise(executor);

console.log(p1);

p1.then(
  (value) => {
    console.log("Fulfilled:", value);
  },
  (reason) => {
    console.log("Rejected:", reason);
  },
);

//? executor: 执行器 (resolve, reject) => {}
//? resolve: (value: any) => void 成功时调用的函数
//? reject: (reason: any) => void 失败时调用的函数
//! Promise 实例调用 Promise 原型中的 then 方法, 处理结果
