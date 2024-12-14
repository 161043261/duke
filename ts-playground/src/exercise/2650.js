/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
const cancellable = function (generator) {
  let cancel;
  const p = new Promise(function (resolve, reject) {
    cancel = function () {
      run("Cancelled", "throw");
    };
    const run = function (arg, fn = "next") {
      try {
        let ret = generator[fn](arg);
        if (ret.done) {
          return resolve(ret.value);
        }
        ret.value
          .then((value) => {
            run(value);
          })
          .catch((reason) => {
            run(reason, "throw");
          });
      } catch (e) {
        reject(e);
      }
    };
    run(null);
  });
  return [cancel, p];
};

function* tasks() {
  try {
    yield new Promise((resolve, reject) => reject("Promise Rejected"));
  } catch (e) {
    let a = yield new Promise(resolve => resolve(2));
    let b = yield new Promise(resolve => resolve(2));
    return a + b;
  }
}

const [cancel, promise] = cancellable1(tasks());
setTimeout(cancel, null);
promise.catch(console.log);

function cancellable1(generator) {
  let cancel;
  const p = new Promise(function (resolve, reject) {
    cancel = function () {
      try {
        let ret = generator.throw("Cancelled");
        if (ret.done) {
          return resolve(ret.value);
        }
      } catch (e) {
        reject(e);
      }
    };
    const run = function (arg, doNext = true) {
      try {
        let ret
        if (doNext) {
          ret = generator.next(arg);
        } else {
          ret = generator.throw(arg);
        }
        if (ret.done) {
          return resolve(ret.value);
        }
        ret.value
          .then((value) => {
            run(value);
          })
          .catch((reason) => {
            run(reason, false);
          });
      } catch (e) {
        reject(e);
      }
    };
    run(null);
  });
  return [cancel, p];
}
