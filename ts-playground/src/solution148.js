"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function sortList(head) {
  let vals = [];
  let p = head;
  while (p != null) {
    vals.push(p.val);
    p = p.next;
  }
  vals.sort((a, b) => a - b); // 值越大 => 下标越大
  // console.log(vals)
  p = head;
  for (let i = 0; i < vals.length; i++) {
    p.val = vals[i];
    p = p.next;
  }
  return head;
}
