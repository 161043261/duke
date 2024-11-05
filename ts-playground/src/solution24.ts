class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export {};

function swapPairs(first: ListNode | null): ListNode | null {
  let head = new ListNode(undefined, first);
  let [pre, left, right] = [head, first, first?.next];
  while (right != null && right != undefined) {
    // swap(left, right)
    const temp = right.next;
    pre.next = right;
    right.next = left;
    left!.next = temp;
    pre = left!;
    left = temp;
    //  l   |  r   |
    // node | node | node | null

    //  l   |  r   |
    // node | node | null | undefined
    right = temp?.next;
  }
  return head.next;
}
