"use strict";
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function hasCycle(head) {
  var _a;
  let test_a = head === null || head === void 0 ? void 0 : head.next;
  console.log(test_a);
  try {
    let test_b = head.next;
  } catch (e) {
    console.log(e);
  }
  let fast = head;
  let slow = head;
  while (fast != undefined && fast != null) {
    fast = (_a = fast.next) === null || _a === void 0 ? void 0 : _a.next;
    slow = slow.next;
    if (slow != null && fast === slow) {
      return true;
    }
  }
  return false;
}
hasCycle(null);
