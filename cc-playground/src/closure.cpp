//
// Created by admin on 2024/11/20.
//

#include <functional>
#include <iostream>
#include <memory>

using namespace std;

auto outer() {
  auto cnt = make_shared<int>(1);
  using t = function<void()>;
  auto ret = make_shared<t>([cnt]() -> void {
    std::cout << "Called " << *cnt << " times\n";
    (*cnt)++;
  });
  return ret;
}

// int main() {
//   auto counter = outer();
//   // (*(counter.get()))();
//   (*counter)();
//   (*counter)();
//   (*counter)();
// }

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
    return foo2co(x + 1, y - 1); // tail call
  } else {
    return x;
  }
}

int main() {
  cout << foo2co(1, 1000000);
  return 0;
}