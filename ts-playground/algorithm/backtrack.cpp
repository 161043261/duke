#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int n = 8;                   // 例: 8 个皇后, 序号 0..7
vector<int> cols = vector<int>(n, -1); // 8 个皇后的列下标

bool place(int r, /* 已放置 0..r-1 号皇后 */
           int c    /* 第 r 号皇后放置在第 r 行, 第 c 列 */
) {
  for (int i = 0; i < r; i++) {
    if (cols[i] == c ||                     // 列冲突
        abs(cols[i] - c) == abs(i - r)) { // 斜线冲突
      return false;
    }
  }
  return true;
}

void nQueues(int r /* 放置第 r 号皇后 */) {
  for (int c = 0; c < n; c++) {
    if (place(r, c)) {
      cols[r] = c;      // 将第 r 号皇后放置在第 r 行, 第 c 列
      if (r == n - 1) { // 已放置全部的皇后
        cout << "columns: ";
        for_each(cols.begin(), cols.end(), [](auto item) -> void { cout << item << " "; });
        cout << endl;
        exit(0); // 找到一个可行解, 直接退出
      } else {
        nQueues(r + 1); // 深度优先遍历
      }
    }
  }
}

int main() {
  nQueues(0);
}
