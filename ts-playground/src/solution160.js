class ListNode {
  /**
   *
   * @param {number} val
   * @param {ListNode} next
   */
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let [pa, pb] = [headA, headB];
  while (pa.next != null && pb.next != null) {
    pa = pa.next;
    pb = pb.next;
  }

  let delta = 0;
  if (pa.next == null) {
    [headA, headB, pa, pb] = [headB, headA, pb, pa]
  }
  while (pa.next != null) {
    pa = pa.next
    delta++
  }

  [pa, pb] = [headA, headB];

  while (delta > 0) {
    pa = pa.next;
    delta--;
  }

  while (pa !== pb && pa != null) {
    pa = pa.next;
    pb = pb.next;
  }
  return pa
};
