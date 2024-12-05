# 继承和原型链

字面量的隐式构造函数

对象字面量的隐式构造函数是 Object 函数

```js
const target = { obj1: 1 };

Object.prototype === target.__proto__; // true
Object.getPrototypeOf(target) === Object.prototype; // true
Object.getPrototypeOf(target) === target.__proto__; // true
```

解糖 (desugar)

```js
const target = { obj1: 1 };
// 解糖
const target = new Object({ obj1: 1 });

const arr = [1, 2, 3];
// 解糖
const arr = new Array(1, 2, 3);
Array.prototype === arr.__proto__; // true
Object.getPrototypeOf(arr) === Array.prototype; // true
Object.getPrototypeOf(arr) === arr.__proto__; // true

typeof Object; // function
typeof Array; // function
```

例: map() 等 "数组方法" 是 Array.prototype 上定义的方法, 所有数组实例上可用

> 不要扩展 Object.prototype 等原生原型! (猴子修补 Monkey Patching)

```js
Number.prototype.toString(); // '0'
Number.prototype + 1; // 1

Array.prototype; // Object(0) []
Array.prototype.map((x) => x + 1); // []

RegExp.prototype.toString(); // '/(?:)/'
RegExp.prototype.source; // '(?:)'

String.prototype.toString(); // ''
String.prototype + "obj1"; // "obj1"

Function.prototype.toString(); //'function () { [native code] }'

Map.prototype; // Object [Map] {}
```

一个构造函数将构建以下的原型链

```js
function Constructor() {}

const target = new Constructor();
// target ---> Constructor.prototype ---> Object.prototype ---> null
```

构建更长的原型链 (等价于 extends)

```js
function Base() {}

function Derived() {}

Object.setPrototypeOf(Derived.prototype, Base.prototype);

const target = new Derived();
// target ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

构建更长的原型链 (等价于 extends)

```js
function Base() {}

function Derived() {}

// Object.create(Base.prototype) 创建一个对象 target
// 该对象的原型是 Base.prototype (target.__proto__ === Base.prototype)
Derived.prototype = Object.create(Base.prototype);
```

构建更长的原型链 (extends)

```js
class Base {}

class Derived extends Base {}

const target = new Derived();
// target ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

- 函数也有属性
- 所有函数都有一个特殊属性 prototype, 属性名: prototype, 属性值: 一个对象

性能

- 访问原型链上的深层属性将影响性能
- 访问原型链上不存在的属性将遍历整个原型链, 影响性能

对于 JS

- 一切都是对象 (实例) 或函数 (构造函数)
- 函数 (构造函数) 是 Function 构造函数的实例
- "类" 是构造函数的语法糖

- 所有构造函数 Constructor 都有一个特殊属性 prototype, 与 new 运算符配合使用
- 创建实例时, 复制 Constructor.prototype 属性值到实例 instance 的内部属性 `[[Prototype]]` 中
- 所有实例**共享** Construct.prototype 上定义的所有属性

```js
instance.__proto__ /* [[Prototype]] */ === Constructor.prototype;
```
