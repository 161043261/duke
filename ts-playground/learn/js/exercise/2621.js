/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((resolve, reject) => {
    if (Object(millis) instanceof Number && millis > 0) {
      setTimeout(() => {
        resolve();
      }, millis);
    } else {
      reject(new Error());
    }
  });
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
