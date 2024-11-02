/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const minChanges = function (n, k) {
  /**
   * @param {number} n
   */
  const toBits = (n) => {
    let ret = "";
    while (n > 0) {
      let bit = n % 2;
      n = Math.floor(n / 2);
      ret = bit + ret;
    }
    console.log(ret);
    return ret === "" ? "0" : ret;
  };
  // toBits(0) // toBits(0)  == 0
  // toBits(n) // toBits(13) == 1101
  // toBits(k) // toBits(4)  == 100
  let nBits = toBits(n);
  let kBits = toBits(k);
  let ans = 0;
  if (nBits.length >= kBits.length) {
    let delta = nBits.length - kBits.length;
    for (let i = 0; i < delta; i++) {
      if (nBits.charAt(i) !== "0") {
        // 1 -> 0
        ans++;
      }
    }
    for (let i = 0; i < kBits.length; i++) {
      if (nBits.charAt(i + delta) !== kBits.charAt(i)) {
        if (nBits.charAt(i + delta) === "0") {
          // [x] 0 -> 1
          return -1;
        }
        ans++;
      }
    }
    return ans;
  }
  // nBits.length < kBits.length
  return -1;
};

console.log(minChanges(13, 4));
