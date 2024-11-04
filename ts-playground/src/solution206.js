class ListNode {
  val_;
  next_;

  /**
   * @returns {number}
   */
  get val() {
    return this.val_;
  }

  /**
   * @param {number} newVal
   */
  set val(newVal) {
    this.val_ = newVal;
  }

  /**
   * @returns {ListNode}
   */
  get next() {
    return this.next_;
  }

  /**
   * @param {ListNode} newNext
   */
  set next(newNext) {
    this.next_ = newNext;
  }
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head == null) {
    return head;
  }
  let tail = head;
  while (tail.next != null) {
    tail = tail.next;
  }
  let p = head;
  while (p !== tail) {
    let nextP = p.next;
    p.next = tail.next;
    tail.next = p;
    p = nextP;
  }
  return tail;
};

// recurse
var reverseList1 = function (head) {
  if (head == null || head.next == null) {
    return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
