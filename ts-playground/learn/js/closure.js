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

// 闭包 = 内层函数 + 外层函数的局部变量
// 优点: 实现数据私有
// 缺点: 可能有内存泄露

console.log(str) // undefined
var str = 'Hello'

// 函数提升
foo() // 函数可以在声明前调用
function foo() {
  console.log('foo')
}

bar() // 函数表达式不可以在声明前调用
const bar = function() {
  console.log('bar')
}