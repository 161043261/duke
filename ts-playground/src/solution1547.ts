function minCost(n: number, cuts: number[]): number {
  let slices = new Array<number>(cuts.length + 1).fill(0);
  cuts.sort((a, b) => a - b)
  slices[0] = cuts[0]
  for (let i = 1; i < cuts.length; i++) {
    slices[i] = cuts[i] - cuts[i - 1]
  }
  slices[cuts.length] = n - cuts[cuts.length - 1];
  slices.sort((a, b) => a - b)
  let ans = 0;

  const binarySearch = (val: number): number => {
    let l = 0, r = slices.length - 1;
    let mid: number;
    while (l < r) {
      mid = Math.floor(l + (r - l) / 2);
      if (slices[mid] == val) {
        return mid;
      }

      if (slices[mid] <= val) {
        l = mid + 1
      } else {
        r = mid - 1;
      }
    }
    return l;
  }

  while (slices.length >= 2) {
    const minVal1 = slices.shift()!;
    const minVal2 = slices.shift()!;
    const val = minVal1 + minVal2;
    ans += val;
    const idx = binarySearch(val)
    if (slices[idx] < val) {
      slices.splice(idx + 1, // start
        0, // deleteCount
        val) // items
    } else {
      slices.splice(idx, // start
        0, // deleteCount
        val) // items
    }
  }
  return ans;
}

console.log(minCost(10, [7, 8, 9, 2, 1]));
