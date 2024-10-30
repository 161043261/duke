"use strict";
function merge(intervals) {
  let dupAns = [];
  for (const interval of intervals) {
    let [begin, end] = interval;
    tryMerge(begin, end, dupAns);
  }
  return deDup(dupAns);
}
// A rest parameter must be of an array type
function tryMerge(b, e, ans) {
  let needPush = true;
  for (const interval of ans) {
    let [l, r] = interval;
    // b e l r
    // l r b e
    if (e < l || b > r) {
      continue;
    }
    // l b e r
    else if (b >= l && e <= r) {
      needPush = false;
      continue;
    }
    // b l e r
    if (b < l && e >= l && e <= r) {
      needPush = false;
      interval[0] = b;
      tryMerge(interval[0], interval[1], ans);
    }
    // l b r e
    else if (b >= l && b <= r && e > r) {
      needPush = false;
      interval[1] = e;
      tryMerge(interval[0], interval[1], ans);
    }
    // b l r e
    else if (b <= l && e >= r) {
      needPush = false;
      interval[0] = b;
      interval[1] = e;
      tryMerge(interval[0], interval[1], ans);
    }
  }
  if (needPush) {
    ans.push([b, e]);
  }
}
function deDup(dupAns) {
  let aSet = new Map();
  for (let arr of dupAns) {
    aSet.set(arr[0], arr[1]);
  }
  let ret = [];
  for (let arr /* [keyType, valueType] */ of aSet) {
    ret.push(arr);
  }
  return ret;
}
///////////////////////////////////////////////////////////
function merge1(intervals) {
  intervals.sort((x, y) => {
    return x[0] - y[0];
  });
  let ans = [];
  for (let interval of intervals) {
    let begin = interval[0];
    let end = interval[1];
    if (ans.length == 0 || begin > ans[ans.length - 1][1]) {
      ans.push(interval);
    } else {
      ans[ans.length - 1][1] = Math.max(ans[ans.length - 1][1], end);
    }
  }
  return ans;
}
