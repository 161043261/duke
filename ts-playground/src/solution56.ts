function merge(intervals: number[][]): number[][] {
  let dupAns: number[][] = []
  for (const interval of intervals) {
    let [begin, end] = interval
    tryMerge(begin, end, dupAns);
  }
  return deDup(dupAns);
}

// A rest parameter must be of an array type
function tryMerge(b: number, e: number, ans: number[][]) {
  let needPush = true

  for (const interval of ans) {
    let [l, r] = interval;
    // b e l r
    // l r b e
    if (e < l || b > r) {
      continue
    }

    // l b e r
    else if (b >= l && e <= r) {
      needPush = false;
      continue
    }

    // b l e r
    if (b < l && e >= l && e <= r) {
      needPush = false;
      interval[0] = b
      tryMerge(interval[0], interval[1], ans)
    }

    // l b r e
    else if (b >= l && b <= r && e > r) {
      needPush = false;
      interval[1] = e
      tryMerge(interval[0], interval[1], ans)
    }

    // b l r e
    else if (b <= l && e >= r) {
      needPush = false;
      interval[0] = b
      interval[1] = e
      tryMerge(interval[0], interval[1], ans)
    }
  }

  if (needPush) {
    ans.push([b, e])
  }
}

function deDup(dupAns: number[][]): number[][] {
  let aSet = new Map<number, number>();
  for (let arr of dupAns) {
    aSet.set(arr[0], arr[1]);
  }
  let ret: number[][] = []
  for (let arr/* [keyType, valueType] */ of aSet) {
    ret.push(arr)
  }
  return ret
}
