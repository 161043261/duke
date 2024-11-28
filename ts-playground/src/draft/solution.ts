function countOfPairs(nums: number[]): number {
  let ans = 0;
  const mod: number = 1_000_000_007;
  const n = nums.length;
  const m = Math.max(...nums);
  const f = Array.from(
    {
      length: n,
    },
    () => new Array<number>(m + 1).fill(0),
  );
  const s = new Array<number>(m + 1).fill(0);
  for (let j = 0; j <= nums[0]; j++) {
    f[0][j] = 1;
  }
  for (let i = 1; i < n; i++) {
    s[0] = f[i - 1][0];
    for (let k = 1; k <= m; k++) {
      s[k] = s[k - 1] + f[i - 1][k];
    }
    for (let j = 0; j <= nums[i]; j++) {
      const maxK = j + Math.min(nums[i - 1] - nums[i], 0);
      if (maxK >= 0) {
        f[i][j] = s[maxK] % mod;
      }
    }
  }

  for (let i = 0; i <= nums[n - 1]; i++) {
    ans += f[n - 1][i];
  }
  return ans % mod;
}
