/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number} n
 * @param {number[][]} pick
 * @return {number}
 */
var winningPlayerCount = function (n, pick) {

  /**
   * @type {number[][]}
   */
  let ballNums = Array.from({
    length: n
  }, item => new Array(11).fill(0))

  for (const [player, ball] of pick) {
    ballNums[player][ball] += 1
  }

  let ans = 0

  for (let i = 0; i < n; i++) {
    let maxNum = ballNums[i].reduce((prev, curr) => {
      console.log(prev, curr)
      return prev > curr ? prev : curr
    })
    if (maxNum > i) {
      ans++
    }
  }

  return ans
};

(() => {
  const arr = [1, 6, 1, 0, 4, 3, 2, 6, 1]
  const sum = arr.reduce((prev, curr) => {
    console.log(prev, curr)
    // 1 6
    // 7 1
    // 8 0
    // 8 4
    // 12 3
    // 15 2
    // 17 6
    // 23 1
    return prev + curr
  })
  console.log(sum) // 24
})()