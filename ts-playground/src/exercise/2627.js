// 防抖 (debounce): 连续触发事件, n 秒内函数只执行最后 1 次 (回城)
// 节流 (throttle): 连续触发事件, n 秒内函数只执行第 1 次 (技能 CD)

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(function () {
      fn(...args);
    }, t);
  };
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */
