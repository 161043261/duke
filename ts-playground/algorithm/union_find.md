# 并查集

- 集合: 数
- 并查集: 森林

|                                       |                                |
| ------------------------------------- | ------------------------------ |
| 集合                                  | 树                             |
| 并查集: 多个集合                      | 森林: 多个树                   |
| 合并 (Union): 合并两个元素所属的集合  | 合并两个节点所属的树           |
| 查询 (Find): 查询元素所属的集合的序号 | 查询节点所属的树的根节点的序号 |

查询 (Find) 可以判断两个元素是否属于同一个集合 (两个元素是否属于同一个树)

```py
class UnionFind:
    """
    初始化       __init__
    查找         find
    查找时压缩   find_with_compress
    合并         union
    更好的合并   better_union
    删除叶子节点 delete_leaf
    移动叶子节点 move_leaf
    """

    def __init__(self, size: int):
        """
        初始化
        UnionFind(3).parent = [0, 1, 2] 表示
        0 号节点的根节点是 0 号节点: 树 0
        1 号节点的根节点是 1 号节点: 树 1
        2 号节点的根节点是 2 号节点: 树 2
        """
        # [0, 1, 2]
        self.parent: list[int] = list(range(size))
        # [1, 1, 1]
        self.size: list[int] = [1] * size

    def find(self, x: int) -> int:
        """
        查找
        查找 x 所属的树的根节点
        """
        xparent: int = self.parent[x]
        # 根节点的父节点 == 根节点
        if self.parent[x] == x:
            return x
        return self.find(xparent)

    def find_with_compress(self, x: int) -> int:
        """查找时压缩"""
        if self.parent[x] == x:
            return x
        # 路径压缩
        self.parent[x] = self.find_with_compress(self.parent[x])

    def union(self, x: int, y: int) -> None:
        """
        合并
        将 x 所属的树合并到 y 所属的树
        """
        xroot: int = self.find(x)
        yroot: int = self.find(y)
        self.parent[xroot] = yroot

    def better_union(self, x: int, y: int) -> None:
        """
        更好的合并
        将节点数量较少的树合并到节点数量较多的树
        """
        xroot, yroot = self.find(x), self.find(y)
        if xroot == yroot:
            return
        # 将节点数量较少的树合并到节点数量较多的树
        if self.size[x] < self.size[y]:
            xroot, yroot = yroot, xroot
        self.parent[yroot] = xroot
        self.size[xroot] += self.size[yroot]

    def delete_leaf(self, x: int) -> None:
        """删除叶子节点"""
        # assert x is a leaf node
        xroot = self.find(x)
        self.size[xroot] -= 1
        self.parent[x] = x

    def move_leaf(self, x: int, y: int) -> None:
        """
        移动叶子节点
        将 x 移动到 y 所属的树
        """
        # assert x is a leaf node
        xroot, yroot = self.find(x), self.find(y)
        if xroot == yroot:
            return
        self.size[xroot] -= 1
        self.size[yroot] += 1
        self.parent[x] = yroot
```
