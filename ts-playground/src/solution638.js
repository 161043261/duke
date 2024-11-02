/**
 * @param {number[]} price price[i] 是第 i 件物品的价格
 * @param {number[][]} special
 * special[i][j] 是第 i 个大礼包中, 第 j 件物品的数量
 * special[i][n] 是第 i 个大礼包的价格
 * @param {number[]} needs
 * needs[i] 是需要购买的第 i 件物品的数量
 * @return {number}
 */
// DFS
var shoppingOffers = function (price, special, needs) {

  for (const i in price) {
    const arr = Array(price.length + 1).fill(0)
    arr[i] = 1 // 大礼包中第 i 件物品的数量为 1
    arr[price.length] = price[i]
    special.push(arr)
  }
  console.log(special)

const bagIdx2bagNum = new Map()

  for(let bagIdx in special) {
    const arr = special[bagIdx]

    // math.MaxInt
    let bagNum = - (1 << 31) - 1
    // (1 << 31) - 1
    for (let j = 0; j < arr.length - 1; j++) {
      const goodsNum = arr[j]
      const total = needs[j]
      if (goodsNum > total) {
        bagIdx2bagNum.set(bagIdx, 0)
        break
      }
      // goodsNum <= total
      bagNum = Math.min(bagNum, Math.floor(total / goodsNum))
    }
    bagIdx2bagNum.set(bagIdx, bagNum)
  }

  // console.log(bagIdx2bagNum)
  let ans = - (1 << 31) - 1
  /**
   * @param {number} curr
   * @return {number}
   */

  const dfs = (curr) => {
    if (curr > ans) {
      return
    }

  }

  return ans
};

shoppingOffers([2, 5], [[3, 0, 5], [1, 2, 10]], [3, 2])
