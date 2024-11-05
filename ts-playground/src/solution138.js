"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _Node {
  constructor(val, next, random) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}
function copyRandomList(first) {
  if (first == null) {
    return null;
  }
  const ori2cp = new Map();
  // 头节点
  let [head, cpHead] = [new _Node(undefined, first, undefined), new _Node()];
  let pre = head;
  let cur = first;
  let cppre = cpHead;
  let cpcur;
  while (cur != null) {
    cpcur = new _Node(cur.val, undefined, undefined);
    cppre.next = cpcur;
    ori2cp.set(cur, cpcur);
    // cur.random != null
    if (ori2cp.has(cur.random)) {
      cpcur.random = ori2cp.get(cur.random);
    }
    pre = cur;
    cur = cur.next;
    cppre = cpcur;
  }
  cur = first;
  cpcur = cpHead.next;
  while (cpcur != null) {
    if (cpcur.random == undefined) {
      cpcur.random = ori2cp.get(cur.random);
    }
    cur = cur.next;
    cpcur = cpcur.next;
  }
  return cpHead.next;
}
