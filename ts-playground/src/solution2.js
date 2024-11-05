"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function addTwoNumbers(l1, l2) {
  let [p1, p2, delta] = [
    new ListNode(undefined, l1),
    new ListNode(undefined, l2),
    0,
  ];
  while (p1.next != null && p2.next != null) {
    let val = (p1.next.val + p2.next.val + delta) % 10;
    delta = Math.floor((p1.next.val + p2.next.val + delta) / 10);
    p1.next.val = val;
    p2.next.val = val;
    [p1, p2] = [p1.next, p2.next];
  }
  // p1.next == null || p2.next == null
  if (p1.next == null) {
    p1.next = p2.next;
  }
  // p1.next ?= null
  // p2.next == null
  while (p1.next != null) {
    let newVal = (p1.next.val + delta) % 10;
    delta = Math.floor((p1.next.val + delta) / 10);
    p1 = p1.next;
    p1.val = newVal;
  }
  // p1.next == null && p2.next == null
  if (delta > 0) {
    p1.next = new ListNode(delta, null);
  }
  return l1;
}
