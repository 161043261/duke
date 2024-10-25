#include <algorithm>
#include <iostream>

int maxTotalValue(int weight[], int value[], const int numGoods = 0,
                  const int bagCapacity = 0) {
  int dp[numGoods][bagCapacity + 1];
  for (int j = 0; j <= bagCapacity; j++) {
    dp[0][j] = j >= weight[0] ? value[0] : 0;
  }
  for (int i = 1; i < numGoods; i++) {
    for (int j = 0; j <= bagCapacity; j++) {
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
        continue;
      }
      dp[i][j] = std::max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
    }
  }
  return dp[numGoods - 1][bagCapacity];
}

int main() {
  int numGoods = 7;
  int bagCapacity = 15;
  int weight[] = {2, 3, 5, 7, 1, 4, 1};
  int value[] = {10, 5, 15, 7, 6, 18, 3};
  std::cout << maxTotalValue(weight, value, numGoods, bagCapacity) << std::endl;
  return 0;
}