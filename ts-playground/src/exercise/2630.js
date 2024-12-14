/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  let obj2Id = new Map();
  let key2ret = new Map();

  const getId = function (obj) {
    if (obj2Id.has(obj)) {
      return obj2Id.get(obj);
    }
    let id = obj2Id.size;
    obj2Id.set(obj, id);
    return id;
  }

  return function (...args) {
    let key = args.map(getId).join(",");
    if (key2ret.has(key)) {
      return key2ret.get(key);
    }
    let ret = fn(...args);
    key2ret.set(key, ret);
    return ret;
  }
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
})
memoizedFn(2, 3) // 5
memoizedFn(2, 3) // 5
console.log(callCount) // 1