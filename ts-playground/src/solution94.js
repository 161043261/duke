"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function inorderTraversal(root) {
  let ans = [];
  const inorder = (root) => {
    if (root == null) {
      return;
    }
    inorder(root.left);
    ans.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return ans;
}
