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
 * ltree: root -> lchild -> rchild
 * rtree: root -> rchild -> lchild
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (root.left === null && root.right === null) {
    return true;
  }

  if (root.left === null || root.right === null) {
    return false;
  }

  /**
   *
   * @param {ListNode} root
   * @param {Array<number | undefined>} parse
   */
  const root_left_right = (root, parse) => {
    parse.push(root.val); // root
    if (root.left === null && root.right === null) {
      return;
    }
    if (root.left === null) {
      parse.push(undefined); // left
      root_left_right(root.right, parse); // right
      return;
    }
    if (root.right === null) {
      root_left_right(root.left, parse); // left
      parse.push(undefined); // right
      return;
    }
    root_left_right(root.left, parse); // left
    root_left_right(root.right, parse); // right
  };
  /**
   *
   * @param {ListNode} root
   * @param {Array<number | undefined>} parse
   */
  const root_right_left = (root, parse) => {
    parse.push(root.val); // root
    if (root.left === null && root.right === null) {
      return;
    }
    if (root.left === null) {
      root_right_left(root.right, parse); // right
      parse.push(undefined); // left
      return;
    }
    if (root.right === null) {
      parse.push(undefined); // right
      root_right_left(root.left, parse); // left
      return;
    }
    root_right_left(root.right, parse); // right
    root_right_left(root.left, parse); // left
  };

  let [lParse, rParse] = [[], []];
  root_left_right(root.left, lParse);
  root_right_left(root.right, rParse);

  if (lParse.length != rParse.length) {
    return false;
  }

  for (let i = 0; i < lParse.length; i++) {
    if (lParse[i] !== rParse[i]) {
      return false;
    }
  }

  return true;
};
