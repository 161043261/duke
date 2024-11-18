// /**
//  * @param {number[]} nums
//  * @param {number[][]} queries
//  * @return {boolean}
//  */
// var isZeroArray_ = function (nums, queries) {
//   for (let query of queries) {
//     for (let idx = query[0]; idx <= query[1]; idx++) {
//       nums[idx] -= 1;
//     }
//   }
//   console.log(nums);
//   return nums.every((num) => num <= 0);
// };

// //! 差分数组
// var isZeroArray = function (nums, queries) {
//   let diffArr = new Array(nums.length + 1).fill(0);
//   for (let query of queries) {
//     let l = query[0];
//     let r = query[1];
//     diffArr[l]++;
//     diffArr[r + 1]--;
//   }
//   for (let i = 1; i <= nums.length; i++) {
//     diffArr[i] += diffArr[i - 1];
//   }
//   console.log(diffArr);

//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] - diffArr[i] > 0) {
//       return false;
//     }
//   }
//   return true;
// };

// // [3, 5, 10]
// // [7, 6, 13, 0]
// // isZeroArray_([3, 5, 10], [[2, 2], [0, 2], [2, 2], [0, 0], [0, 2], [0, 2], [0, 0], [1, 2], [2, 2], [2, 2], [2, 2], [0, 2], [2, 2], [0, 2], [2, 2]])

// // isZeroArray([3, 5, 10], [[2, 2], [0, 2], [2, 2], [0, 0], [0, 2], [0, 2], [0, 0], [1, 2], [2, 2], [2, 2], [2, 2], [0, 2], [2, 2], [0, 2], [2, 2]])

// /**
//  * @param {number[]} nums
//  * @param {number[][]} queries
//  * @return {number}
//  */
// var minZeroArray = function (nums, queries) {
//   if (nums.every((num) => num === 0)) {
//     return 0;
//   }

//   let diffArr = new Array(nums.length + 1).fill(0);
//   let k = 0;

//   for (let query of queries) {
//     k++;
//     let l = query[0];
//     let r = query[1];
//     let v = query[2];
//     diffArr[l] += v;
//     diffArr[r + 1] -= v;

//     let diffArrCopy = diffArr.slice();
//     for (let i = 1; i <= nums.length; i++) {
//       diffArrCopy[i] += diffArrCopy[i - 1];
//     }

//     // console.log(diffArrCopy)

//     let ok = true;
//     for (let i = 0; i < nums.length; i++) {
//       if (nums[i] - diffArrCopy[i] > 0) {
//         ok = false;
//         break;
//       }
//     }
//     if (ok) {
//       return k;
//     }
//   }
//   return -1;
// };

// console.log(
//   minZeroArray(
//     [0, 8],
//     [
//       [0, 1, 4],
//       [0, 1, 1],
//       [0, 1, 4],
//       [0, 1, 1],
//       [1, 1, 5],
//       [0, 1, 2],
//       [1, 1, 4],
//       [0, 1, 1],
//       [1, 1, 3],
//       [0, 0, 2],
//       [1, 1, 3],
//       [1, 1, 2],
//       [0, 1, 5],
//       [1, 1, 2],
//       [1, 1, 5],
//     ],
//   ),
// );

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let nexts = Array.from({
    length: n
  }, (v, k) => [])

  for (let i = 0; i < n - 1; i++) {
    nexts[i].push(i + 1)
  }

  const bfs = () => {
    let dist = new Array(n).fill(-1);
    dist[0] = 0
    let q = [0]

    while (q.length > 0) {
      let cur = q.shift()
      for (const next of nexts[cur]) {
        if (dist[next] >= 0) { // 已访问
          continue
        }
        q.push(next)
        dist[next] = dist[cur] + 1
      }
    }
    return dist[n - 1]
  }

  let ans = []

  for (const query of queries) {
    let [cur, next] = query
    nexts[cur].push(next)
    ans.push(bfs())
  }

  return ans
};

console.log(
  shortestDistanceAfterQueries(5, [[2, 4], [0, 2], [0, 4]])
)