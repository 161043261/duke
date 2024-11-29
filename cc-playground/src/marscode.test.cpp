//
// Created by admin on 2024/11/29.
// 1. Replace headers
// 2. Replace solutions
//

#include <gtest/gtest.h>

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

TEST(Marscode_Test, Test_Sol1) {
  std::cout << solution1({1, 1, 2, 2, 3, 3, 4, 5, 5}) << std::endl;
  std::cout << solution1({0, 1, 0, 1, 2}) << std::endl;
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

TEST(MarsCode_Test, Test_Sol3) {
  std::cout << (solution3("9278292.323214864")) << std::endl;
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
  for (auto i = 0; i < numbers.size(); i++) {
    auto item = numbers[i];
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

TEST(Marscode_Test, Test_Sol4) {
  // You can add more test cases here
  std::cout << (solution4({123, 456, 789}) == 14) << std::endl;
  std::cout << (solution4({123456789}) == 4) << std::endl;
  std::cout << (solution4({14329, 7568}) == 10) << std::endl;
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

TEST(Marscode_Test, Test_Sol5) {
  // Add your test cases here
  std::vector<int> result1 = solution5(
      31, 42, {3,  3, 11, 12, 12, 2, 13, 5,  13, 1,  13, 8, 8, 1, 8, 13,
               12, 9, 2,  11, 3,  5, 8,  11, 1,  11, 1,  5, 4, 2, 5});
  std::cout << (result1 == std::vector<int>{1, 13}) << std::endl;
}

std::string solution7(int n, std::string tmpl,
                      std::vector<std::string> titles) {
  // Please write your code here
  string str = "";
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

TEST(Marscode_Test, Test_Sol7) {
  //  You can add more test cases here
  std::vector<std::string> testTitles1 = {"adcdcefdfeffe", "adcdcefdfeff",
                                          "dcdcefdfeffe", "adcdcfe"};
  std::vector<std::string> testTitles2 = {
      "CLSomGhcQNvFuzENTAMLCqxBdj", "CLSomNvFuXTASzENTAMLCqxBdj",
      "CLSomFuXTASzExBdj",          "CLSoQNvFuMLCqxBdj",
      "SovFuXTASzENTAMLCq",         "mGhcQNvFuXTASzENTAMLCqx"};
  std::vector<std::string> testTitles3 = {"abcdefg", "abefg", "efg"};

  std::cout << (solution7(4, "ad{xyz}cdc{y}f{x}e", testTitles1) ==
                "True,False,False,True")
            << std::endl;
  std::cout << (solution7(6, "{xxx}h{cQ}N{vF}u{XTA}S{NTA}MLCq{yyy}",
                          testTitles2) == "False,False,False,False,False,True")
            << std::endl;
  std::cout << (solution7(3, "a{bdc}efg", testTitles3) == "True,True,False")
            << std::endl;
}

int solution8(vector<int> array) {
  // Edit your code here

  return 0;
}

TEST(Marscode_Test, Test_Sol8) {
  // Add your test cases here
  cout << (solution8({1, 3, 8, 2, 3, 1, 3, 3, 3}) == 3) << endl;
}
