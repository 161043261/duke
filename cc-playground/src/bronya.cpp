//
// Created by admin on 2024/11/29.
// 1. Replace headers
// 2. Replace solutions
//

#include <algorithm>
#include <iostream>
#include <map>
#include <regex>
#include <string>
#include <vector>

using namespace std;

int solution1(std::vector<int> cards) {
  // Edit your code here
  auto ntimes = std::vector<int>(1001, 0);
  for (const auto &card : cards) {
    ntimes[card]++;
  }
  for (auto i = 0; i <= 1000; i++) {
    if (ntimes[i] == 1) {
      return i;
    }
  }
  return -1;
}

std::string solution3(const std::string &s) {
  // write code here
  vector<char> chs{s.begin(), s.end()};
  auto head = 0, tail = -1, cnt = 0, p = static_cast<int>(chs.size() - 1);
  while (chs[head] == '0') {
    head++;
  }

  while (p > head) {
    if (chs[p] == '.') {
      tail = static_cast<int>(s.size() - p);
      cnt = 0;
      p--;
      continue;
    }
    if (cnt == 2) {
      chs.insert(chs.begin() + p, ',');
    }
    p--;
    cnt = (cnt + 1) % 3;
  }
  string ret;
  if (tail == -1) {
    ret = string{chs.cbegin() + head, chs.cend()};
  } else {
    // for (char ch: chs) {
    //   cout << ch << " ";
    // }
    // cout << endl << tail << endl;
    ret = string{chs.cbegin() + head, chs.cend() - tail - (tail - 1) / 3} +
          string{s.cend() - tail, s.cend()};
  }
  // cout << ret << endl;
  return ret;
}

void backtrack(int start, int &acc, const vector<vector<int> > &varrs,
               int &ans) {
  if (start == varrs.size()) {
    if (acc % 2 == 0) {
      ans++;
    }
    return;
  }

  for (auto i = 0; i < varrs[start].size(); i++) {
    acc += varrs[start][i];
    backtrack(start + 1, acc, varrs, ans);
    acc -= varrs[start][i];
  }
}

int solution4(std::vector<int> numbers) {
  // Please write your code here
  vector<vector<int> > varrs{};
  for (int item : numbers) {
    auto varr = vector<int>{};
    while (item > 0) {
      varr.emplace(varr.cbegin(), item % 10);
      item = item / 10;
    }
    varrs.push_back(varr);
  }
  // for (const auto &varr: varrs) {
  //   for (const auto &v: varr) {
  //     cout << v << ' ';
  //   }
  //   cout << endl;
  // }
  int acc = 0, ans = 0;
  backtrack(0, acc, varrs, ans);
  // cout << ans << endl;
  return ans;
}

std::vector<int> solution5(int n, int max, const std::vector<int> &array) {
  // Edit your code here
  auto val2cnt = map<int, int>{};
  for (const auto &val : array) {
    if (val2cnt.find(val == 1 ? 14 : val) == val2cnt.end()) {
      val2cnt.insert({val == 1 ? 14 : val, 1});
    } else {
      val2cnt[val == 1 ? 14 : val]++;
    }
  }
  // for (const auto &kv: val2cnt) {
  //   std::cout << kv.first << " " << kv.second << std::endl;
  // }
  vector<int> mt3{};
  vector<int> mt2{};
  for (const auto &kv : val2cnt) {
    auto k = kv.first;
    auto v = kv.second;
    if (v >= 3) {
      mt3.emplace_back(k);
    }
    if (v >= 2) {
      mt2.emplace_back(k);
    }
  }
  // ranges::sort(mt3, [](int a, int b) -> int { return b - a; });
  sort(mt3.begin(), mt3.end(), [](int a, int b) -> int { return b - a; });

  // for_each(mt3.begin(), mt3.end(), [&](int i) { std::cout << i << " "; });
  // cout << endl;

  // ranges::sort(mt2, [](int a, int b) -> int { return b - a; });
  sort(mt2.begin(), mt2.end(), [](int a, int b) -> int { return b - a; });

  // for_each(mt2.begin(), mt2.end(), [&](int i) { std::cout << i << " "; });
  // cout << endl;
  for (const auto &item3 : mt3) {
    for (const auto &item2 : mt2) {
      if ((item3 == item2) || ((3 * (item3 == 14 ? 1 : item3) +
                                2 * (item2 == 14 ? 1 : item2)) > max)) {
        continue;
      }
      return {
          item3 == 14 ? 1 : item3,
          item2 == 14 ? 1 : item2,
      };
    }
  }
  return {0, 0};
}

std::string solution7(int n, std::string tmpl,
                      std::vector<std::string> titles) {
  // Please write your code here
  string str;
  for (auto i = 0; i < tmpl.size(); i++) {
    if (tmpl.at(i) == '{') {
      while (tmpl.at(i) != '}') {
        i++;
      }
      // tmpl.at(i) == '}'
      str += ".*";
    } else {
      str += tmpl.at(i);
    }
  }
  // cout << str << endl;
  regex pat{str};
  string ret;
  for (const auto &title : titles) {
    if (regex_match(title, pat)) {
      ret += "True,";
    } else {
      ret += "False,";
    }
  }
  return string{ret.begin(), ret.end() - 1};
}

int solution8(vector<int> array) {
  // Edit your code here
  map<int, int> num2cnt{};
  for (const auto &item : array) {
    if (num2cnt.find(item) == num2cnt.end()) {
      num2cnt[item] = 1;
    } else {
      num2cnt[item]++;
    }
  }
  for (const auto &item : num2cnt) {
    auto k = item.first;
    auto v = item.second;
    if (v > array.size() / 2.) {
      return k;
    }
  }
  return 0;
}

int solution10(int a, int b) {
  // write code here
  return a / b + (a % b == 0 ? 0 : 1);
}

vector<int> solution13(int n) {
  vector<int> ans;
  for (auto i = 0; i < n; i++) {
    for (auto j = n; j >= i + 1; j--) {
      ans.push_back(j);
    }
  }
  return ans;
}

int solution20(int n) {
  // write code here
  int ans = 0;
  while (n > 1) {
    if (n % 2 == 0) {
      ans += n / 2;
      n /= 2;
    } else {
      ans += (n - 1) / 2;
      n = (n - 1) / 2 + 1;
    }
  }
  return ans;
}

// TODO solution25 DNA 序列
int solution25(std::string dna1, std::string dna2) {
  vector<vector<int> > dp(dna1.size() + 1);
  for (auto i = 0; i <= dna1.size(); i++) {
    dp[i] = vector<int>(dna2.size() + 1);
  }
  for (auto i = 0; i <= dna1.size(); i++) {
    dp[i][0] = i;
  }
  for (auto j = 0; j <= dna2.size(); j++) {
    dp[0][j] = j;
  }
  for (auto i = 1; i <= dna1.size(); i++) {
    for (auto j = 1; j <= dna2.size(); j++) {
      if (dna1[i - 1] == dna2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = min(min(dp[i - 1][j] + 1,   // 删除
                           dp[i][j - 1] + 1),  // 插入
                       dp[i - 1][j - 1] + 1);  // 替换
      }
    }
  }
  return dp[dna1.size()][dna2.size()];
}

int main() {
  //  You can add more test cases here
  std::cout << (solution25("AGCTTAGC", "AGCTAGCT") == 2) << std::endl;
  std::cout << (solution25("AGCCGAGC", "GCTAGCT") == 4) << std::endl;
}
