function outer() {
  let cnt = 1
  return () => {
    console.log(`Called ${cnt} times`)
    cnt++
  }
}

const counter = outer()
counter()
counter()
counter()

// 闭包 = 内层函数 + 外层函数的变量
// 优点: 封闭数据
// 缺点: 可能会内存泄露

//! var 变量提升: 允许变量在声明前访问
// let, const 没有变量提升
console.log(str) // undefined
var str = 'Hello'

//! 具名函数提升: 允许函数在声明前调用
// 函数表达式 (匿名函数), lambda 表达式 (箭头函数) 没有函数提升
foo()

function foo() {
  console.log('foo')
}

try {
  bar1()
  const bar1 = function () {
    console.log('bar1')
  }
} catch (e) {
  console.log(e.toString().slice(16))
}

try {
  bar2()
  const bar2 = () => {
    console.log('bar2')
  }
} catch (e) {
  console.log(e.toString().slice(16))
}

//! 参数默认值
function print(name = 'foo', age) {
  console.log(`name: ${name}, age: ${age}`)
}

print() // name: foo, age: undefined
print('bar') // name: bar, age: undefined
print('bar', 3.5) // name: bar, age: 3.5

