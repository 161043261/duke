'use strict'
import { test } from 'vitest'

// 构造函数
test('funcPrototype', () => {
  function Box(value) {
    console.log(this) // Box {}
    this.value = value
  }

  // 构造函数的 prototype 传递给实例的 __proto__
  // Box.prototype 传递给 boxInstance.__proto__
  Box.prototype.getValue = function () {
    console.log(this) // Box { value: 1 }
    return this.value
  }

  const box = new Box(1)
  console.log(box.getValue()) // 1
  // { getValue: [Function (anonymous)] }
  console.log(Box.prototype)
  console.log(Box.prototype.getValue.toString()) // 源码
  // { getValue: [Function (anonymous)] }
  console.log(box.__proto__)
  console.log(box.__proto__.getValue.toString()) // 源码
})

// 类是构造函数的语法糖
test('class', () => {
  class Box {
    constructor(value) {
      console.log(this) // Box {}
      this.value = value
    }

    getValue() {
      return this.value
    }
  }

  const box = new Box(1)
  // 更新 Box.prototype  (Box.prototype 和 box.__proto__ 都将更新)
  Box.prototype.getValue = function () {
    return this.value + 1
  }
  console.log(box.getValue()) // 2
  // function () { return this.value + 1 }
  console.log(Box.prototype.getValue.toString())
  // function () { return this.value + 1 }
  console.log(box.__proto__.getValue.toString())

  // 更新 box.__proto__ (Box.prototype 和 box.__proto__ 都将更新)
  box.__proto__.getValue = function () {
    return this.value + 100
  }
  console.log(box.getValue()) // 101
  // function () { return this.value + 100 }
  console.log(Box.prototype.getValue.toString())
  // function () { return this.value + 100 }
  console.log(box.__proto__.getValue.toString())
})

test('what', () => {
  class Box {
    constructor(value) {
      this.value = value
    }

    getValue() {
      return this.value
    }
  }
  console.log(typeof Box) // function
  // Box.prototype 「仅」用于创建实例
  console.log(Box.prototype.getValue) // [Function: getValue]
  // Box.__proto__ 是构造函数的自有原型
  console.log(Box.__proto__.getValue) // undefined
  console.log(Object.getPrototypeOf(Box) === Box.__proto__) // true
})
