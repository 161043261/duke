function numFriendRequests(ages: number[]): number {
  ages.sort((a, b) => b - a);
  let ans = 0
  for (let e = 0; e < ages.length - 1; e++) {
    for (let y = e + 1; y < ages.length; y++) {
      if (ages[y] <= 0.5 * ages[e] + 7) {
        break;
      }
      if (ages[y] === ages[e]) {
        ans += 2;
        continue;
      }
      ans++
    }
  }
  return ans;
};
