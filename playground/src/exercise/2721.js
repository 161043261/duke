/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  return new Promise(function (resolve, reject) {
    let ans = [],
      cnt = 0;
    for (let i = 0; i < functions.length; i++) {
      functions[i]()
        .then((value) => {
          ans[i] = value;
          cnt++;
          if (cnt === functions.length) {
            resolve(ans);
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    }
  });
};

(async () => {
  console.log(
    await promiseAll([
      () => new Promise((resolve) => setTimeout(() => resolve(5), 200)),
    ]),
  );
})();
