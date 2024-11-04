class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  const values: number[] = [];

  let p = head;
  while (p != null) {
    values.push(p.val);
    p = p.next;
  }
  for (let [l, r] = [0, values.length - 1]; l < r; l++, r--) {
    if (values[l] != values[r]) {
      return false;
    }
  }
  return true;
}

export {};
