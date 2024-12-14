/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
let cancellable = function (generator) {
  let cancel;
  const p = new Promise(function (resolve, reject) {
    cancel = function () {
      run("Cancelled", "throw")
    }
    const run = function (arg, fn = "next") {
      try {
        let ret = generator[fn](arg);
        if (ret.done) {
          return resolve(ret.value)
        }
        ret.value.then((value) => {
          run(value)
        }).catch((reason) => {
          run(reason, 'throw')
        })
      } catch (e) {
        reject(e)
      }
    }
    run(null);
  })
  return [cancel, p]
};

function* tasks() {
  const val = yield new Promise(resolve => resolve(2 + 2));
  yield new Promise(resolve => setTimeout(resolve, 100));
  return val + 1;
}

const [cancel, promise] = cancellable(tasks());
setTimeout(cancel, 50);
promise.catch(console.log); // logs "Cancelled" at t=50ms

