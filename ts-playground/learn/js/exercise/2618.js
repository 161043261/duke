/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * LeetCode 2618
 *
 * ! Object.getPrototypeOf(obj) === obj.__proto__
 * ! obj.constructor === ${Constructor}
 * ! ${Constructor} instanceof Function
 *
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  // null = undefined
  if (
    obj === null ||
    obj === undefined ||
    classFunction === null ||
    classFunction === undefined
  ) {
    return false;
  }

  while (obj !== null) {
    // if (Object.getPrototypeOf(obj) === classFunction.prototype) {
    if (obj.constructor === classFunction) {
      return true;
    }
    console.log(Object.getPrototypeOf(obj) === obj.__proto__);
    obj = Object.getPrototypeOf(obj);
  }
  return false;
};

/**
 * checkIfInstanceOf(new Date(), Date); // true
 */
checkIfInstanceOf(5, Number);

var checkIfInstanceOf1 = function (obj, classFunction) {
  if (
    obj === null ||
    obj === undefined ||
    !(classFunction instanceof Function)
  ) {
    return false;
  }
  // Object(obj) 将基本数据类型包装为引用类型
  return Object(obj) instanceof classFunction;
};

var checkIfInstanceOf2 = function (obj, classFunction) {
  if (
    obj === null ||
    obj === undefined ||
    classFunction === null ||
    classFunction === undefined
  ) {
    return false;
  }

  while (
    //! falsy
    // false
    // 0
    // ""
    // null
    // undefined
    // NaN
    obj.__proto__ !== null &&
    obj.__proto__ !== undefined &&
    obj.__proto__ !== classFunction.prototype
  ) {
    obj = obj.__proto__;
  }
  return obj.__proto__ === classFunction.prototype;
};

var checkIfInstanceOf3 = function (obj, classFunction) {
  if (
    obj === null ||
    obj === undefined ||
    classFunction === null ||
    classFunction === undefined
  ) {
    return false;
  }
  if (obj.__proto__ === classFunction.prototype) {
    return true;
  }
  return checkIfInstanceOf(obj.__proto__, classFunction);
};
