/**
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
export {};
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let lrDepthSum = 0;
  /**
   *
   * @param {TreeNode | null} root
   * @return {number}
   */
  const calc = (root) => {
    if (root === null) {
      return 0;
    }
    let ldepth = calc(root.left);
    let rdepth = calc(root.right);
    lrDepthSum = Math.max(lrDepthSum, ldepth + rdepth);
    return Math.max(ldepth, rdepth) + 1;
  };
  calc(root);
  return lrDepthSum;
};
