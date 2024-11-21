#include <algorithm>
#include <functional>
#include <iostream>
#include <mutex>
#include <vector>

using namespace std;

int main() {
  const string A = "xzyzzyx";
  const string B = "zxyyzxz";

  vector dp(A.length() + 1, vector(B.length() + 1, 0));

  for (int i = 1; i <= A.length(); i++) {
    for (int j = 1; j <= B.length(); j++) {
      if (A[i - 1] == B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  int cur = 0;
  string ans;
  const unsigned long range = min(A.length(), B.length());

  for (int i = 1, j = 1; i <= range; i++) {
    int j_ = j;
    for (; j <= i; j++) {
      if (dp[i][j] == cur + 1) {  // 找到
        // cout << i - 1 << " " << j - 1 << endl;
        cur++;
        ans += A[i - 1];
        break;
      }
    }
    j = j_;  // 未找到, 复位
  }

  cout << "dp: " << endl;
  for (const auto &row : dp) {
    for (const int val : row) {
      cout << val << " ";
    }
    cout << endl;
  }

  cout << "ans: " << ans << endl;
  return 0;
}

// FIXME
class Foo {
 public:
  mutex mut1, mut2, mut3;
  Foo() /* : mut1(mutex{}), mut2(mutex{}), mut3(mutex{}) */ {
    mut2.lock();
    mut3.lock();
  }

  void first(function<void()> printFirst) {
    mut1.lock();
    // printFirst() outputs "first". Do not change or remove this line.
    printFirst();
    mut2.unlock();
  }

  void second(function<void()> printSecond) {
    mut2.lock();
    // printSecond() outputs "second". Do not change or remove this line.
    printSecond();
    mut3.unlock();
  }

  void third(function<void()> printThird) {
    mut3.lock();
    // printThird() outputs "third". Do not change or remove this line.
    printThird();
    mut1.unlock();
  }
};
