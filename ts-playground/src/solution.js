/**
 * @param {number[]} ages
 * @return {number}
 */
var numFriendRequests = function (ages) {
  ages.sort((a, b) => b - a)
  console.log(ages)
  let ans = 0
  // e: elder; y: younger
  for (let e = 0; e < ages.length - 1; e++) {
    for (let y = e + 1; y < ages.length; y++) {
      if (ages[y] <= 0.5 * ages[e] + 7) {
        break;
      }
      if (ages[y] === ages[e]) {
        ans += 2;
        console.log(ages[e], '<=>', ages[y])
        continue;
      }
      console.log(ages[e], '==>', ages[y])
      ans++
    }
  }
  return ans;
};

export { }

console.log(

  numFriendRequests([73, 106, 39, 6, 26, 15, 30, 100, 71, 35, 46, 112, 6, 60, 110])

)