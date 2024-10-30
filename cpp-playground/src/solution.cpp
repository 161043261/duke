#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

class Solution {
 public:
  string getSmallestString(string s) {
    for (auto i = 0; i < s.size() - 1; i++) {
      if (((s[i] - '0') % 2 == (s[i + 1] - '0') % 2) && s[i] > s[i + 1]) {
        return s.substr(0, i) + s[i + 1] + s[i] + s.substr(i + 2);
      }
    }
    return s;
  }
};
