class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function detectCycle(head: ListNode | null): ListNode | null {
  let node2idx: Set<ListNode> = new Set();
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

export {};
