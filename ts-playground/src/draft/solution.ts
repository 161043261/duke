function numberOfAlternatingGroups(colors: number[], k: number): number {
  if (colors.length < k) {
    return 0;
  }
  let i = 0,
    j = 1;
  let ans = 0;
  while (i < colors.length) {
    if (colors[j] != colors[(j - 1 + colors.length) % colors.length]) {
      const len = (j - i + 1 + colors.length) % colors.length;
      if (len == k || (len == 0 && i != j)) {
        // console.log(i, j);
        ans++;
        i++;
      }
    } else {
      if (j < i) {
        break;
      }
      i = j;
    }
    j = (j + 1) % colors.length;
  }
  return ans;
}
console.log(numberOfAlternatingGroups([0, 0, 1], 3));
