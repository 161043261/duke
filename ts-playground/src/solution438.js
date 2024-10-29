"use strict";
function findAnagrams(s, p) {
  let ans = [];
  let p2num = new Map();
  for (let i = 0; i < p.length; i++) {
    if (p2num.has(p[i])) {
      p2num.set(p[i], p2num.get(p[i]) + 1);
    } else {
      p2num.set(p[i], 1);
    }
  }
  let s2num = new Map();
  for (let [l, r] = [0, 0]; r < s.length; ) {
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
      s2num = new Map();
    }
    if (s2num.has(s[r])) {
      if (s2num.get(s[r]) == p2num.get(s[r])) {
        while (s[l] != s[r]) {
          s2num.set(s[l], s2num.get(s[l]) - 1);
          l++;
        }
        // s[l] == s[r]
        l++;
      } else {
        s2num.set(s[r], s2num.get(s[r]) + 1);
      }
    } else {
      s2num.set(s[r], 1);
    }
    if (r - l + 1 == p.length) {
      console.log(s2num);
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
        ans.push(l);
      }
      s2num.set(s[l], s2num.get(s[l]) - 1);
      l++;
    }
    r++;
  }
  return ans;
}
console.log(findAnagrams("acdcaeccde", "c"));
// 窗口大小固定的滑动窗口
function findAnagrams1(s, p) {
  var _a, _b, _c;
  let p2num = new Map();
  let s2num = new Map();
  let [l, r] = [0, 0];
  // 可选链运算符 ?.
  // 遇到 null 或 undefined 时, 立刻返回 undefined
  // 空值合并运算符 ??
  // 左值为 null 或 undefined 时, 返回右值; 否则返回左值
  for (; r < p.length; r++) {
    p2num.set(
      p[r],
      ((_a = p2num.get(p[r])) !== null && _a !== void 0 ? _a : 0) /* 加括号 */ +
        1,
    );
    s2num.set(
      s[r],
      ((_b = s2num.get(s[r])) !== null && _b !== void 0 ? _b : 0) /* 加括号 */ +
        1,
    );
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
  let ans = [];
  for (; r <= s.length; l++, r++) {
    if (check()) {
      ans.push(l);
    }
    s2num.set(s[l], s2num.get(s[l]) - 1);
    s2num.set(
      s[r],
      ((_c = s2num.get(s[r])) !== null && _c !== void 0 ? _c : 0) /* 加括号 */ +
        1,
    );
  }
  return ans;
}
