/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countKConstraintSubstrings = function (s, k) {
  let [l, r, n0, n1, ans] = [0, 0, 0, 0, 0];
  while (r < s.length) {
    if (n0 <= k || n1 <= k) {
      if (s.charAt(r) === "0" && (n0 < k || n1 <= k)) {
        n0++;
        r++;
        continue;
      }
      if (s.charAt(r) === "1" && (n0 <= k || n1 < k)) {
        n1++;
        r++;
        continue;
      }
    }
    // console.log(l, r)
    ans += r - l;
    if (s.charAt(l) === "0") {
      n0--;
    } else {
      n1--;
    }
    l++;
  }
  // console.log(l, r)
  ans += ((r - l + 1) * (r - l)) / 2;
  return ans;
};

// 3 + 3 + 3 + 2 + 1
console.log(countKConstraintSubstrings("0001", 1));
