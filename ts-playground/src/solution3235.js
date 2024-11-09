"use strict";
// 圆 1 (x1, y1, r1)
// 圆 2 (x2, y2, r2)
// 点 p (px, py)
//   px = (x1 * r2 + x2 * r1) / (r1 + r2),
//   py = (y1 * r2 + y2 * r1) / (r1 + r2)
// 点 p 严格在矩形内: px < xCorner && py < yCorner
function canReachCorner(xCorner, yCorner, circles) {
  const inCircle = (x, y, ox, oy, r) => {
    return (
      BigInt(ox - x) * BigInt(ox - x) + BigInt(oy - y) * BigInt(oy - y) <=
      BigInt(r) * BigInt(r)
    );
  };
  const bigx = BigInt(xCorner);
  const bigy = BigInt(yCorner);
  const visited = new Array(circles.length).fill(false);
  const dfs = (i) => {
    let [x1_, y1_, r1_] = circles[i];
    if (
      (y1_ <= yCorner && Math.abs(x1_ - xCorner) <= r1_) ||
      (x1_ <= xCorner && y1_ <= r1_) ||
      (x1_ > xCorner && inCircle(xCorner, 0, x1_, y1_, r1_))
    ) {
      return true;
    }
    const x1 = BigInt(x1_);
    const y1 = BigInt(y1_);
    const r1 = BigInt(r1_);
    visited[i] = true;
    for (let j = 0; j < circles.length; j++) {
      if (!visited[j]) {
        let [x2_, y2_, r2_] = circles[j];
        let x2 = BigInt(x2_);
        let y2 = BigInt(y2_);
        let r2 = BigInt(r2_);
        if (
          (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <=
            (r1 + r2) * (r1 + r2) &&
          x1 * r2 + x2 * r1 < (r1 + r2) * bigx &&
          y1 * r2 + y2 * r1 < (r1 + r2) * bigy &&
          dfs(j)
        ) {
          return true;
        }
      }
    }
    return false;
  };
  for (let i = 0; i < circles.length; i++) {
    const [x, y, r] = circles[i];
    if (
      inCircle(0, 0, x, y, r) ||
      inCircle(xCorner, yCorner, x, y, r) ||
      (!visited[i] &&
        ((x <= xCorner && Math.abs(y - yCorner) <= r) ||
          (y <= yCorner && x <= r) ||
          (y > yCorner && inCircle(0, yCorner, x, y, r))) &&
        dfs(i))
    ) {
      return false;
    }
  }
  return true;
}
canReachCorner(3, 3, [
  [2, 1000, 997],
  [1000, 2, 997],
]);
