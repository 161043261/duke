function findAnagrams(s: string, p: string): number[] {
  let ans: number[] = [];
  let p2num = new Map<string, number>();

  for (let i = 0; i < p.length; i++) {
    if (p2num.has(p[i])) {
      p2num.set(p[i], p2num.get(p[i])! + 1)
    } else {
      p2num.set(p[i], 1)
    }
  }

  let s2num = new Map<string, number>();

  for (let [l, r] = [0, 0]; r < s.length;) {
    let reset = false;
    while (!p2num.has(s[r])) {
      reset = true;
      r++;
      l = r;
      if (r == s.length) {
        return ans;
      } else {
        continue;
      }
    }

    if (reset) {
      s2num = new Map<string, number>();
    }

    if (s2num.has(s[r])) {
      if (s2num.get(s[r]) == p2num.get(s[r])) {
        while (s[l] != s[r]) {
          s2num.set(s[l], s2num.get(s[l])! - 1);
          l++;
        }
        // s[l] == s[r]
        l++;
      } else {
        s2num.set(s[r], s2num.get(s[r])! + 1)
      }
    } else {
      s2num.set(s[r], 1);
    }

    if (r - l + 1 == p.length) {
      console.log(s2num)
      // in 索引
      // of 元素
      let ok = true;
      for (let key of p2num.keys()) {
        if (!s2num.has(key) || s2num.get(key) != p2num.get(key)) {
          ok = false;
          break;
        }
      }
      if (ok) {
        ans.push(l)
      }
      s2num.set(s[l], s2num.get(s[l])! - 1)
      l++
    }
    r++;
  }
  return ans;
}

console.log(findAnagrams("acdcaeccde", "c"))
