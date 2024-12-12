/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  let idx = setTimeout(function () {
    fn(...args);
  }, t);

  return function cancelFn() {
    clearTimeout(idx);
  };
};