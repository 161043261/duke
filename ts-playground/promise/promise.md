# Promise

Promise 的优点

1. 传统的: 必须在启动异步任务前指定回调函数
2. Promise: 启动异步任务 ==> 返回 Promise 对象 ==> 给 Promise 对象绑定回调函数 (onfulfilled, onrejected)
3. 避免回调地狱, 支持链式调用

### Promise 实例的两个属性

PromiseState: Promise 实例 (异步任务) 的状态

- pending (等待): Promise 实例初始化时的状态
- fulfilled (成功): 异步任务成功
- rejected (失败): 异步任务失败

PromiseResult: Promise 实例 (异步任务) 的结果

- 异步任务的结果 (**即 resolve 和 reject 函数的形参值**)

**resolve 函数** (异步任务成功)

1. 修改 Promise 实例 (异步任务) 的状态: `pending ==> fulfilled`
2. 设置 Promise 实例 (异步任务) 的结果 = resolve 函数的实参值

**reject 函数** (异步任务失败)

1. 修改 Promise 实例 (异步任务) 的状态: `pending ==> rejected`
2. 设置 Promise 实例 (异步任务) 的结果 = reject 函数的实参值

- [demo1](./demo1.js) 使用 Promise 读取文件
- [demo2](./demo2.html) 使用 Promise 发送 AJAX 请求
- [demo3](./demo3.js) 使用 Promise 操作 MongoDB 数据库
