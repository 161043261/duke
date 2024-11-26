#include <functional>
#include <iostream>
#include <vector>

using namespace std;

using ifunc = function<double(double, double)>;

ifunc tco(const ifunc& f) {
  double value;
  bool active = false;
  vector<pair<double, double>> accumulated;

  return [f, &value, &active, &accumulated](double x, double y) -> double {
    accumulated.emplace_back(x, y);
    if (!active) {
      active = true;
      while (!accumulated.empty()) {
        auto args = accumulated.back();
        accumulated.pop_back();
        value = f(args.first, args.second);
      }
      active = false;
      return value;
    }
    return -1;
  };
}

double foo2co(double x, double y) {
  if (y > 0) {
    return foo2co(x + 1, y - 1);
  } else {
    return x;
  }
}

int main() {
  cout << foo2co(1, 1000000);
  return 0;
}