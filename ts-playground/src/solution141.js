"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function hasCycle(head) {
  var _a;
  // test begin
  let undefinedVar = head === null || head === void 0 ? void 0 : head.next;
  console.log(undefinedVar);
  try {
    let typeErroredVar = head.next;
    // catch 子句
    // 变量类型注释必须为 "any" 或 "unknown"
  } catch (e /* unknown */) {
    console.log(e); // TypeError
  } // test end
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
