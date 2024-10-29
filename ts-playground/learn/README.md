# 继承和原型链

字面量的隐式构造函数

对象字面量的隐式构造函数是 Object 函数

```js
const obj = { a: 1 };

Object.prototype === obj.__proto__; // true
Object.getPrototypeOf(obj) === Object.prototype; // true
Object.getPrototypeOf(obj) === obj.__proto__; // true
```

解糖 (desugar)

```js
const obj = { a: 1 };
// 解糖
const obj = new Object({ a: 1 });

const arr = [1, 2, 3];
// 解糖
const arr = new Array(1, 2, 3);
Array.prototype === arr.__proto__; // true
Object.getPrototypeOf(arr) === Array.prototype; // true
Object.getPrototypeOf(arr) === arr.__proto__; // true

typeof Object; // function
typeof Array; // function
```

例: map() 等 "数组方法" 是在 Array.prototype 上定义的方法, 在所有的数组实例上可用

> 不要扩展 Object.prototype 等内置原型! (猴子修补 Monkey Patching), 存在向前兼容的风险

```js
Number.prototype.toString(); // '0'
Number.prototype + 1; // 1

Array.prototype; // Object(0) []
Array.prototype.map((x) => x + 1); // []

RegExp.prototype.toString(); // '/(?:)/'
RegExp.prototype.source; // '(?:)'

String.prototype.toString(); // ''
String.prototype + "a"; // "a"

Function.prototype.toString(); //'function () { [native code] }'

Map.prototype; // Object [Map] {}
```

一个构造函数将构建以下的原型链

```js
function Constructor() {}

const obj = new Constructor();
// obj ---> Constructor.prototype ---> Object.prototype ---> null
```

构建更长的原型链 (等价于 extends)

```js
function Base() {}
function Derived() {}
// @Deprecated
// Derived.prototype = Object.create(Base.prototype);
Object.setPrototypeOf(Derived.prototype, Base.prototype);

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

构建更长的原型链 (等价于 extends)

```js
class Base {}
class Derived extends Base {}

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```
