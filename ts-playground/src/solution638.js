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
  const n = price.length;

  for (const i /* string */ in price) {
    const arr = Array(n + 1).fill(0);

    // 字符串转整数
    arr[Number(i)] = 1; // 大礼包中第 i 件物品的数量为 1
    // or
    arr[parseInt(i)] = 1;
    // or
    arr[+i] = 1;

    arr[n] = price[i];
    special.push(arr);
  }

  const bagIdx2maxNum = new Map();

  // tag: for (let bagIdx/* string */ in special) {
  tag: for (let bagIdx = 0; bagIdx < special.length; bagIdx++) {
    console.log(bagIdx);
    const arr = special[bagIdx];

    // assert(arr.length === n)
    // math.MaxInt
    let maxNum = 0;
    for (let j = 0; j < n; j++) {
      const goodsNum = arr[j];
      const totalNeed = needs[j];

      if (goodsNum === 0) {
        continue;
      }

      if (goodsNum > totalNeed) {
        bagIdx2maxNum.set(bagIdx, 0);
        continue tag;
      }
      // goodsNum <= totalNeed
      maxNum =
        maxNum === 0
          ? Math.floor(totalNeed / goodsNum)
          : Math.min(maxNum, Math.floor(totalNeed / goodsNum));
    }
    bagIdx2maxNum.set(bagIdx, maxNum);
  }

  console.log(bagIdx2maxNum);
  let ans = -(1 << 31) - 1;

  /**
   * @param {number} bagIdx
   * @param {number[]} needs
   * @param {number} curr
   * @return {void}
   */
  const dfs = (bagIdx, needs, curr) => {
    // 当前消费 >= 可能的最小消费
    if (curr >= ans) {
      return;
    }
    // 已购买所有物品
    let sum = 0;
    needs.forEach((item) => {
      sum += item;
    });
    if (sum === 0) {
      ans = curr;
      // console.log(curr)
      return;
    }
    // 已遍历所有的礼包
    if (bagIdx === special.length) {
      return;
    }
    // 第 bagIdx 个礼包
    let bag = special[bagIdx];
    // 第 bagIdx 个礼包的总数量

    // TODO
    // let maxNum = bagIdx2maxNum.get(`${bagIdx}`);
    let maxNum = bagIdx2maxNum.get(bagIdx);

    tag: for (let bagNum = 0; bagNum <= maxNum; bagNum++) {
      const cpNeeds = [...needs];
      // console.log(cpNeeds)
      for (let i = 0; i < n; i++) {
        // 第 bagIdx 个大礼包中, 第 i 件物品的数量
        let goodsNum = bag[i];
        let needNum = cpNeeds[i];
        if (bagNum * goodsNum > needNum) {
          break tag;
        }
        cpNeeds[i] -= bagNum * goodsNum;
      }
      dfs(bagIdx + 1, cpNeeds, curr + bagNum * bag[n]);
    }
  };

  dfs(0, needs, 0);
  return ans;
};

console.log(
  shoppingOffers(
    [2, 3, 4], // price
    [
      [1, 1, 0, 4],
      [2, 2, 1, 9],
    ], // special
    [1, 2, 1],
  ),
);

// console.log(shoppingOffers([0, 0, 0], // price
//   [[1, 1, 0, 4], [2, 2, 1, 9]],  // special
//   [1, 1, 0]))

// obj is not iterable
const aMap = new Map([
  ["k1", "v1"],
  ["k2", "v2"],
]);

console.log(aMap);
for (const entry of aMap) {
  console.log(entry);
}

export {};
