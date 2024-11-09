"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function isValidBST(root) {
  const isValid = (root, lfrom, lto, rfrom, rto) => {
    return (
      (root.right == null
        ? true
        : root.right.val > rfrom &&
          root.right.val < rto &&
          isValid(
            root.right, // root
            root.val, // lfrom
            root.right.val, // lto
            root.right.val, // rfrom
            rto, // rto
          )) &&
      (root.left == null
        ? true
        : root.left.val > lfrom &&
          root.left.val < lto &&
          isValid(
            root.left, //root
            lfrom, // lfrom
            root.left.val, // lto
            root.left.val, // rfrom
            root.val, // rto
          ))
    );
  };
  if (root == null) {
    return true;
  }
  return isValid(root, -Infinity, root.val, root.val, Infinity);
}
