class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function hasCycle(head: ListNode | null): boolean {
  // test begin
  let undefinedVar = head?.next;
  console.log(undefinedVar);
  try {
    let typeErroredVar = head!.next;
    // catch 子句
    // 变量类型注释必须为 "any" 或 "unknown"
  } catch (e: any /* unknown */) {
    console.log(e); // TypeError
  } // test end

  let fast: ListNode | null | undefined = head;
  let slow: ListNode | null = head;
  while (fast != undefined && fast != null) {
    fast = fast.next?.next;
    slow = slow!.next;
    if (slow != null && fast === slow) {
      return true;
    }
  }
  return false;
}

hasCycle(null);

export {};
