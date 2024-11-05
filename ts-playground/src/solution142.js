"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function detectCycle(head) {
  let node2idx = new Set();
  let parse = head;
  while (parse != null) {
    if (node2idx.has(parse)) {
      return parse;
    }
    node2idx.add(parse);
    parse = parse.next;
  }
  return null;
}
