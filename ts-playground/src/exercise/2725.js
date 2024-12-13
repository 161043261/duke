/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  fn(...args);
  let intervalId = setInterval(function () {
    fn(...args);
  }, t);
  return function () {
    clearInterval(intervalId);
  };
};

const result = [];
const fn = (x1, x2) => x1 * x2;
const args = [2, 5],
  t = 30,
  cancelTimeMs = 165;

const start = performance.now();
const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({ time: diff, returned: fn(...argsArr) });
};
const cancel = cancellable(log, args, t);
setTimeout(cancel, cancelTimeMs);
setTimeout(
  () => {
    console.log(result);
  },
  cancelTimeMs + t + 15,
);
