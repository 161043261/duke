package com.bronya.algorithm;

class Knapsnak {
    public static int maxTotalValue(int numGoods,
            int bagCapacity,
            int[] weight,
            int[] value) {
        var dp = new int[numGoods][bagCapacity + 1];
        for (var j = 0; j <= bagCapacity; j++) {
            dp[0][j] = j >= weight[0] ? value[0] : 0;
        }

        for (var i = 1; i < numGoods; i++) {
            for (var j = 0; j <= bagCapacity; j++) {
                if (j < weight[i]) {
                    dp[i][j] = dp[i - 1][j];
                    continue;
                }
                dp[i][j] = // 下标 [0, i] 的物品, 放入容量为 j 的背包的最大收益
                        Math.max(
                                // 不放物品 i
                                // 则 dp[i][j] = 下标 [0, i-1] 的物品, 放入容量为 j 的背包的最大收益
                                dp[i - 1][j],
                                // 放物品 i
                                // 则 dp[i][j] = 下标 [0, i-1] 的物品, 放入容量为 j-w[i] 的背包的最大收益,
                                // 再加上 物品 i 的收益
                                dp[i - 1][j - weight[i]] + value[i]);

            } // inner for-loop
        } // outer for-loop
        return dp[numGoods - 1][bagCapacity];
    }

    public static void main(String[] args) {
        var numGoods = 7;
        var bagCapacity = 15;
        var weight = new int[] { 2, 3, 5, 7, 1, 4, 1 };
        var value = new int[] { 10, 5, 15, 7, 6, 18, 3 };
        System.out.println(maxTotalValue(numGoods, bagCapacity, weight, value));
    }
}