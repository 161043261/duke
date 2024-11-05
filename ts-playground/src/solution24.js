"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function swapPairs(first) {
  let head = new ListNode(undefined, first);
  let [pre, left, right] = [
    head,
    first,
    first === null || first === void 0 ? void 0 : first.next,
  ];
  while (right != null && right != undefined) {
    // swap(left, right)
    const temp = right.next;
    pre.next = right;
    right.next = left;
    left.next = temp;
    pre = left;
    left = temp;
    //  l   |  r   |
    // node | node | node | null
    //  l   |  r   |
    // node | node | null | undefined
    right = temp === null || temp === void 0 ? void 0 : temp.next;
  }
  return head.next;
}
