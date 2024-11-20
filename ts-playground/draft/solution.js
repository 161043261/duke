/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let dp = Array.from({
    length: n,
  }, (val, idx) => {
    return idx;
  })
  console.log(dp) // when n = 5, dp = [ 0, 1, 2, 3, 4 ]

  /**
   * @type {number[][]}
   */
  let prev = Array.from({
    length: n,
  }, (val, idx) => {
    if (idx === 0) {
      return;
    }
    return idx - 1;
  })
  console.log(prev)

  let ans = []

  for (const query of queries) {
    // p --> q
    let [p, q] = query;
    prev[q].push(p)

    for (let j = q; j < n; j++) {
      for (let i of prev[j]) {
        dp[j] = Math.min(dp[j], dp[i] + 1)
      }
    }
    ans.push(dp[n - 1])
  }
  return ans
};

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries_ = function (n, queries) {
  /**
   * @type {number[]}
   */
  const pa = Array.from({
    length: n - 1,
  }, (val, idx) => {
    return idx
  })

  /**
   * @param {number} x
   */
  const find = (x) => {
    let root = x
    while (pa[root] !== root) {
      root = pa[root]
    }

    // pa[root] === root

    //! 路径压缩
    while (pa[x] !== root) {
      let temp = pa[x]
      pa[x] = root
      x = temp
    }
    // pa[x] === root
    return root
  }

  /**
   * @type {number[]}
   */
  const ans = []
  let cnt = n - 1

  for (const query of queries) {

    let [p, q] = query;
    // FIXME
    q--
    const j = find(q)

    for (let i = find(p); i < q; i = find(i+1)) {
      pa[i] = j
      cnt--
    }
    ans.push(cnt)
  }

  return ans
};