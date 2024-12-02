/* eslint-disable @typescript-eslint/no-unused-vars */

//! Method1 使用函数语法
var TimeLimitedCache = function () {};
TimeLimitedCache.prototype.kvs = new Map();

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  let ret = false;
  if (this.kvs.has(key)) {
    ret = true;
    const timerId = this.kvs.get(key)[1];
    clearTimeout(timerId);
  }

  const timerId = setTimeout(() => {
    this.kvs.delete(key);
  }, duration);

  this.kvs.set(key, [value, timerId]);
  return ret;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (this.kvs.has(key)) {
    return this.kvs.get(key)[0];
  }
  return -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return this.kvs.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

//! Method2 使用类语法
class TimeLimitedCache1 {
  // cache = new Map();
  cache = new Map();

  /**
   * @param {number} key
   * @param {number} value
   * @param {number} duration time until expiration in ms
   * @return {boolean} if un-expired key already existed
   */
  set(key, value, duration) {
    const cachedVal = this.cache.get(key);
    if (cachedVal) {
      clearTimeout(cachedVal.timerId);
    }
    const timerId = setTimeout(() => {
      this.cache.delete(key);
    }, duration);
    this.cache.set(key, { value, timerId });
    return Boolean(cachedVal); // truety | falsy
  }

  get(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
  }

  count() {
    return this.cache.size;
  }
}
