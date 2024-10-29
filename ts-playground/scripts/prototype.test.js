'use strict'
// 基于原型链的继承
import { test } from 'vitest'

test('基于原型链的继承', () => {
  console.log(Object.prototype) // [Object: null prototype] {}

  const obj = {
    a: 1,
    b: 2,

    __proto__: {
      b: 3,
      c: 4
    }
  }

  console.log(obj.a, obj.b, obj.c, obj.d) // 1 2 4 undefined
})

test('构造函数', () => {
  function Box(value) {
    console.log(this) // Box {}
    this.value = value
  }

  Box.prototype.getValue = function() {
    console.log(this) // Box { value: 1 }
    return this.value
  }

  const box = new Box(1)
  console.log(box.getValue()) // 1
})

test('类是构造函数的语法糖', () => {
  class Box {
    constructor(value) {
      console.log(this) // Box {}
      this.value = value
    }

    getValue() {
      console.log(this) // Box { value: 2 }
      return this.value
    }
  }

  const box = new Box(2)
  console.log(box.getValue()) // 2
})
