export { };

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  let mid = Math.floor((nums.length - 1) / 2);
  let root = new TreeNode(nums[mid]);

  /**
   * @param {number} start
   * @param {number} end
   * @param {TreeNode} root
   */
  const bst = (start, end, root) => {
    if (start > end) {
      return;
    }

    if (start === end) {
      if (nums[start] <= root.val) {
        root.left = new TreeNode(nums[start]);
      } else {
        root.right = new TreeNode(nums[start]);
      }
      return;
    }

    // start < end
    let mid = Math.floor((start + end) / 2);
    let nextRoot = new TreeNode(nums[mid]);
    if (nums[mid] <= root.val) {
      root.left = nextRoot;
    } else {
      root.right = nextRoot;
    }
    bst(start, mid - 1, nextRoot);
    bst(mid + 1, end, nextRoot);
  };

  bst(0, mid - 1, root);
  bst(mid + 1, nums.length - 1, root);
  return root;
};
