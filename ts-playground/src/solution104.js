"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function maxDepth(root) {
  if (root == null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
