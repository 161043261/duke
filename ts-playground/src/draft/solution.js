"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
function nonSpecialCount_(l, r) {
  const isSpecialCount = function (n) {
    if (n == 1) {
      return false;
    }
    if (Math.floor(Math.sqrt(n)) != Math.sqrt(n)) {
      return false;
    }
    for (let i = 2; i < Math.sqrt(n); i++) {
      if (n % i == 0) {
        return false;
      }
    }
    return true;
  };
  let ans = 0;
  for (let i = l; i <= r; i++) {
    if (!isSpecialCount(i)) {
      ans++;
    }
  }
  return ans;
}
function nonSpecialCount(l, r) {
  const n = Math.floor(Math.sqrt(r));
  const v = new Array(n + 1).fill(0);
  let res = r - l + 1;
  for (let i = 2; i <= n; i++) {
    if (v[i] == 0) {
      if (i * i >= l && i * i <= r) {
        res--;
      }
      for (let j = i * i; j <= n; j += i) {
        v[j] = 1;
      }
    }
  }
  return res;
}
const countPrimes = function (n) {
  const isPrim = new Array(n).fill(1);
  let ans = 0;
  for (let i = 2; i < n; i++) {
    if (isPrim[i] == 1) {
      ans++;
    }
    for (let j = i * i; j < n; j += i) {
      isPrim[j] = 0;
    }
  }
  return ans;
};
