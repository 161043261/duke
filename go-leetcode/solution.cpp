#include <vector>
#include <iostream>

using namespace std;

class Solution {
  public:
    int numberOfPairs(vector<int> &nums1, vector<int> &nums2, int k) {
        sort(nums1.begin(), nums1.end(),
             [](int pre, int post) -> int { return pre < post; });

        // for_each(nums1.begin(), nums1.end(), [](int e) { cout << e; });

        sort(nums2.begin(), nums2.end(),
             [](int pre, int post) -> int { return pre < post; });

        int ans = 0;
        for (const auto &n1 : nums1) {
            for (const auto &n2 : nums2) {
                if (n1 < n2 * k) {
                    break;
                }
                if (n1 % (n2 * k) == 0) {
                    ans++;
                }
            }
        }
        return ans;
    }
};