/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function (promise1, promise2) {
  let values = await Promise.all([promise1, promise2]);
  // for (let val of values) {
  //   console.log(val);
  // }
  return Promise.resolve(values[0] + values[1]);
};

addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log); // 4
