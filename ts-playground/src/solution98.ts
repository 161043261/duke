class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
export { };

// FIXME
function isValidBST(root: TreeNode | null): boolean {
  if (root == null || (root.left == null && root.right == null)) {
    return true;
  }

  if (root.left == null) {
    return root.val < root.right!.val && isValidBST(root.right);
  }

  if (root.right == null) {
    return root.val > root.left!.val && isValidBST(root.left);
  }

  return (
    root.val > root.left!.val &&
    root.val < root.right!.val &&
    isValidBST(root.left) &&
    isValidBST(root.right)
  );
}
