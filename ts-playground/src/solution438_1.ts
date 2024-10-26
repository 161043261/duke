// 窗口大小固定的滑动窗口
function findAnagrams1(s: string, p: string): number[] {
  let p2num = new Map<string, number>();
  let s2num = new Map<string, number>();
  let [l, r] = [0, 0];

  // 可选链运算符 ?.
  // 遇到 null 或 undefined 时, 立刻返回 undefined

  // 空值合并运算符 ??
  // 左值为 null 或 undefined 时, 返回右值; 否则返回左值
  for (; r < p.length; r++) {
    p2num.set(p[r], (p2num.get(p[r]) ?? 0) /* 加括号 */ + 1);
    s2num.set(s[r], (s2num.get(s[r]) ?? 0) /* 加括号 */ + 1);
  }
  // r == p.length
  const check = () => {
    for (let key of p2num.keys()) {
      if (s2num.get(key) != p2num.get(key)) {
        return false;
      }
    }
    return true;
  };

  let ans: number[] = [];

  for (; r <= s.length; l++, r++) {
    if (check()) {
      ans.push(l);
    }
    s2num.set(s[l], s2num.get(s[l])! - 1);
    s2num.set(s[r], (s2num.get(s[r]) ?? 0) /* 加括号 */ + 1);
  }
  return ans;
}
