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
export {};

function isValidBST(root: TreeNode | null): boolean {
  const isValid = (
    root: TreeNode,
    lfrom: number,
    lto: number,
    rfrom: number,
    rto: number,
  ): boolean => {
    return (
      (root.right == null
        ? true
        : root.right!.val > rfrom &&
          root.right!.val < rto &&
          isValid(
            root.right, // root
            root.val, // lfrom
            root.right!.val, // lto
            root.right!.val, // rfrom
            rto, // rto
          )) &&
      (root.left == null
        ? true
        : root.left!.val > lfrom &&
          root.left!.val < lto &&
          isValid(
            root.left, //root
            lfrom, // lfrom
            root.left!.val, // lto
            root.left!.val, // rfrom
            root.val, // rto
          ))
    );
  };
  if (root == null) {
    return true;
  }
  return isValid(root, -Infinity, root.val, root.val, Infinity);
}
