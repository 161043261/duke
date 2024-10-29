"use strict";
let total;
const parentIdx = [];
const sizes = [];
// total     = 3
// parentIdx = [0, 1, 2, 3]
// sizes     = [0, 1, 1, 1]
// 1 号节点的根节点是 1 号节点: 树 1
// 2 号节点的根节点是 2 号节点: 树 2
// 3 号节点的根节点是 3 号节点: 树 3
function findRedundantConnection(edges) {
  total = edges.length;
  for (let i = 1; i <= total; i++) {
    parentIdx[i] = i;
    sizes[i] = 1;
  }
  let ans = [];
  for (let edge of edges) {
    if (find(edge[0]) == find(edge[1])) {
      ans = edge;
    }
    // union(edge[0], edge[1])
    betterUnion(edge[0], edge[1]);
  }
  return ans;
}
// 合并: 将 x 所属的树合并到 y 所属的树
function union(x, y) {
  let xroot = find(x);
  let yroot = find(y);
  parentIdx[xroot] = yroot;
}
// 更好的合并: 将节点数量较少的树合并到节点数量较多的树
function betterUnion(x, y) {
  let xroot = find(x);
  let yroot = find(y);
  // 将节点数量较少的树合并到节点数量较多的树
  if (sizes[xroot] < sizes[yroot]) {
    [xroot, yroot] = [yroot, xroot];
  }
  // sizes[xroot] >= sizes[yroot]
  parentIdx[yroot] = xroot;
  sizes[xroot] += sizes[yroot];
}
// 查找: 查找 x 所属的树的根节点
function find(x) {
  // 根节点的父节点 == 根节点
  if (parentIdx[x] == x) {
    return x;
  }
  return find(parentIdx[x]);
}
// 查找时压缩
function findWithCompress(x) {
  if (parentIdx[x] == x) {
    return x;
  }
  // 路径压缩
  parentIdx[x] == findWithCompress(parentIdx[x]);
}
// 删除叶子节点
function deleteLeaf(x) {
  // assert x is a leaf node
  let xroot = find(x);
  sizes[xroot] -= 1;
  parentIdx[x] = x;
}
// 移动叶子节点: 将 x 移动到 y 所属的树
function moveLeaf(x, y) {
  // assert x is a leaf node
  let [xroot, yroot] = [find(x), find(y)];
  if (xroot == yroot) {
    return;
  }
  sizes[xroot] -= 1;
  sizes[yroot] += 1;
  parentIdx[x] = yroot;
}
