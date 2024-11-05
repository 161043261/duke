/**
 *
 * @param {number} val
 * @param {ListNode} next
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} first
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (first, n) {
  let head = new ListNode(undefined, first);
  let [pre, fast, slow] = [null, head, head];
  while (n > 0) {
    fast = fast.next;
    n--;
    if (fast == null) {
      return null;
    }
  }
  while (fast != null) {
    fast = fast.next;
    pre = slow;
    slow = slow.next;
  }
  pre.next = slow.next;
  return first;
};
