"use strict";
function minMovesToCaptureTheQueen(a, b, c, d, e, f) {
  return ((a == e || b == f) &&
    !(
      (d - b) * (e - a) == (c - a) * (f - b) &&
      c >= Math.min(a, e) &&
      c <= Math.max(a, e) &&
      d >= Math.min(b, f) &&
      d <= Math.max(b, f)
    )) ||
    (Math.abs(e - c) == Math.abs(f - d) &&
      !(
        (d - b) * (e - a) == (c - a) * (f - b) &&
        a >= Math.min(c, e) &&
        a <= Math.max(c, e) &&
        b >= Math.min(d, f) &&
        b <= Math.max(d, f)
      ))
    ? 1
    : 2;
}
