/**
 *
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  /**
   * @param {TreeNode} root
   * @return {null}
   */
  const invert = (root) => {
    if (root === null || (root.left === null && root.right === null)) {
      return;
    }

    if (root.left === null) {
      root.left = root.right;
      root.right = null;
      invert(root.left);
      return;
    }

    if (root.right === null) {
      root.right = root.left;
      root.left = null;
      invert(root.right);
      return;
    }
    [root.left, root.right] = [root.right, root.left];
    invert(root.left);
    invert(root.right);
  };

  invert(root);
  return root;
};
