#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int total;
vector<int> parent;
vector<int> sizes;

void betterUnion(int x, int y);
int find(int x);
void normalUnion(int x, int y);

class Solution {
 public:
  vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    total = edges.size();
    // allocate heap
    // std::vector 重载了 {}, 不使用 {} 初始化
    parent = vector<int>(total + 1);
    sizes = vector<int>(total + 1);

    for (auto i = 1; i <= total; i++) {
      parent[i] = i;
      sizes[i] = 1;
    }

    auto p = edges.begin();
    for (auto iter = edges.begin(); iter != edges.end(); iter++) {
      auto edge = *iter;
      if (find(edge[0]) == find(edge[1])) {
        p = iter;
      } else {
        betterUnion(edge[0], edge[1]);
      }
    }
    return vector<int>{(*p)[0], (*p)[1]};
  }

  friend void normalUnion(int x, int y);
  friend void betterUnion(int x, int y);
  friend int find(int x);
};

void betterUnion(int x, int y) {
  auto xroot = find(x);
  auto yroot = find(y);
  if (sizes[xroot] < sizes[yroot]) {
    swap(xroot, yroot);
  }
  parent[yroot] = xroot;
  sizes[xroot] += sizes[yroot];
}

int find(int x) {
  if (parent[x] == x) {
    return x;
  }
  return find(parent[x]);
}

void normalUnion(int x, int y) {
  auto xroot = find(x);
  auto yroot = find(y);
  parent[xroot] = yroot;
}

int main() {
  auto edges = vector<vector<int>>{vector<int>{1, 2}, vector<int>{1, 3},
                                   vector<int>{2, 3}};
  auto ans = Solution{}.findRedundantConnection(edges);
  for_each(ans.cbegin(), ans.cend(), [](int e) -> void { cout << e << " "; });
}
