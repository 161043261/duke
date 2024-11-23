/* eslint-disable @typescript-eslint/no-explicit-any */
// Proxy
// 创建一个对象的代理对象，以实现基本操作的拦截和自定义

//! 术语
// handler 处理器, 捕获器的集合
// traps 捕获器
// target 被代理的对象
import { test } from "vitest";

test("test1", () => {
  const handler = {
    //! handler.get() 读属性操作的捕获器
    //! handler.set() 写属性操作的捕获器
    /**
     *
     * @param {*} obj
     * @param {string} prop
     * @returns {*}
     */
    get: function (obj, prop) {
      console.log("proxying");
      return prop in obj ? obj[prop] : "violet-ever-garden";
    },
  };

  const target = {};
  const po = new Proxy(target, handler);
  po.a = 1;
  po.b = 2;

  console.log(target); // { a: 1, b: 2 }
  console.log(po); // { a: 1, b: 2 }

  console.log(target.a, target.b);
  // 1 2
  console.log(po.a, po.b);
  // proxying 1
  // proxying 2

  console.log("c" in target, target.c);
  // false undefined
  console.log("c" in po, po.c);
  // proxying
  // false violet-ever-garden
});

//! 无操作转发代理
// 该代理对象 po 的处理器 handler 为空
// 会将所用 po 
test("test2", () => {
  let target = {};
  let po = new Proxy(target, {} /* handler */);
  po.a = 1;
  console.log(target.a);
});
