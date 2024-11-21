/* eslint-disable @typescript-eslint/no-unused-vars */
function nonSpecialCount_(l, r) {
  var isSpecialCount = function (n) {
    if (n == 1) {
      return false;
    }
    if (Math.floor(Math.sqrt(n)) != Math.sqrt(n)) {
      return false;
    }
    for (var i = 2; i < Math.sqrt(n); i++) {
      if (n % i == 0) {
        return false;
      }
    }
    return true;
  };
  var ans = 0;
  for (var i = l; i <= r; i++) {
    if (!isSpecialCount(i)) {
      ans++;
    }
  }
  return ans;
}
function nonSpecialCount(l, r) {
  var n = Math.floor(Math.sqrt(r));
  var v = new Array(n + 1).fill(0);
  var res = r - l + 1;
  for (var i = 2; i <= n; i++) {
    if (v[i] == 0) {
      if (i * i >= l && i * i <= r) {
        res--;
      }
      for (var j = i * i; j <= n; j += i) {
        v[j] = 1;
      }
    }
  }
  return res;
}
var countPrimes = function (n) {
  var isPrim = new Array(n).fill(1);
  var ans = 0;
  for (var i = 2; i < n; i++) {
    if (isPrim[i] == 1) {
      ans++;
    }
    for (var j = i * i; j < n; j += i) {
      isPrim[j] = 0;
    }
  }
  return ans;
};
