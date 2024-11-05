class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
export {};

function sortList(head: ListNode | null): ListNode | null {
  let vals: number[] = [];
  let p = head;
  while (p != null) {
    vals.push(p.val);
    p = p.next;
  }
  vals.sort((a, b) => a - b); // 值越大 => 下标越大
  // console.log(vals)
  p = head;
  for (let i = 0; i < vals.length; i++) {
    p!.val = vals[i];
    p = p!.next;
  }
  return head;
}
