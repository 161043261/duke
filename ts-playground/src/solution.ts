function countKConstraintSubstrings(
  s: string,
  k: number,
  queries: number[][],
): number[] {

  let [l, r, n0, n1] = [0, 0, 0, 0];
  let query2cnt = new Map<number[], number>();
  // let total = 0
  const updateCnt = (i: number,
                     j: number): void => {
    for (const query of queries) {
      if (query[0] <= i && query[1] >= j) {
        query2cnt.set(query,
          query2cnt.get(query)! + 1)
      }
    }
  }

  for (let query of queries) {
    query2cnt.set(query, 0);
  }

  while (r < s.length) {
    if (n0 <= k || n1 <= k) {
      if (s.charAt(r) === "0" && (n0 < k || n1 <= k)) {
        n0++;
        r++;
        continue;
      }
      if (s.charAt(r) === "1" && (n0 <= k || n1 < k)) {
        n1++;
        r++;
        continue;
      }
    }

    // 0, 5
    // console.log(l, r)
    // total += (r - l)
    for (let i = l; i < r; i++) {
      updateCnt(l, i)
    }

    if (s.charAt(l) === "0") {
      n0--;
    } else {
      n1--;
    }
    l++;
  }

  // console.log(l, r)
  // total += ((r - l + 1) * (r - l) / 2)
  for (let i = l; i < r; i++) {
    for (let j = i; j < r; j++) {
      updateCnt(i, j)
    }
  }
  let ans: number[] = [];
  for (const query of queries) {
    ans.push(query2cnt.get(query)!);
  }
  // console.log(ans);
  // console.log(total)
  return ans;
}

console.log(
  countKConstraintSubstrings("0001111", 2, [[0, 6]])
)