"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function isPalindrome(head) {
  const values = [];
  let p = head;
  while (p != null) {
    values.push(p.val);
    p = p.next;
  }
  for (let [l, r] = [0, values.length - 1]; l < r; l++, r--) {
    if (values[l] != values[r]) {
      return false;
    }
  }
  return true;
}
