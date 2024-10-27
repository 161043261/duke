"""
并查集 UnionFind
"""


class UnionFind:
    """
    1. 初始化
    2. 查询 find
        2.1 路径压缩 path_compression
    3. 合并 union
        3.1 更好的合并 better_union
    4. 删除 TODO
    5. 移动 TODO
    """

    def __init__(self, size: int):
        """初始化"""

        # [0, 1, 2, 3, 4]
        self.parent = list(range(size))
        # [1, 1, 1, 1, 1]
        self.num_node = [1] * size

    def find(self, x: int) -> int:
        """
        查询 find
        查询 x 所属的树的根节点的 id
        """

        # 根节点的父节点的 id == 根节点的 id
        if self.parent[x] == x:
            return x
        else:
            return self.find(self.parent[x])

    def path_compression(self, x: int) -> int:
        """路径压缩"""
        if self.parent[x] != x:
            self.parent[x] = self.path_compression(
                self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> None:
        """
        合并 union
        将 x 所属的树合并到 y 所属的树
        """
        # x 的根节点的 id
        xroot: int = self.find(x)
        # y 的根节点的 id
        yroot: int = self.find(y)
        # x 的根节点的父节点的 id = y 的根节点的 id
        self.parent[xroot] = yroot

    def better_union(self, x: int, y: int) -> None:
        """更好的合并 better_union"""
        xroot, yroot = self.find(x), self.find(y)
        if xroot == yroot:
            return
        # 将节点数量较少的树合并到节点数量较多的树
        if self.num_node[x] < self.num_node[y]:
            xroot, yroot = yroot, xroot
        # y 所属的树节点数量较少
        # 将 y 所属的树合并到 x 所属的树
        self.parent[yroot] = xroot
        self.num_node[xroot] += self.num_node[yroot]
