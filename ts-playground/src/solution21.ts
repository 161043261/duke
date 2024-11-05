class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let [head1, head2, ahead] = [new ListNode(), new ListNode(), new ListNode()];
  head1.next = list1;
  head2.next = list2;
  let atail = ahead;
  let tmp: ListNode;
  while (head1.next != null && head2.next != null) {
    if (head1.next.val <= head2.next.val) {
      tmp = head1.next;
      head1.next = head1.next.next;
    } else {
      tmp = head2.next;
      head2.next = head2.next.next;
    }
    atail.next = tmp;
    atail = tmp;
    atail.next = null;
  }
  if (head1.next != null) {
    atail.next = head1.next;
  } else {
    atail.next = head2.next;
  }
  return ahead.next;
}

export {};
