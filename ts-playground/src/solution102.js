function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
export {};
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) {
    return [];
  }
  let ans = [];

  let queue = [root]; // [] <-- root
  while (queue.length > 0) {
    let num = queue.length;
    let layer = [];
    while (num > 0) {
      let node = queue.shift(); // node <-- [...]
      num--;
      layer.push(node.val);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right != null) {
        queue.push(node.right);
      }
    } // while (num > 0)
    ans.push(layer);
  }
  return ans;
};
