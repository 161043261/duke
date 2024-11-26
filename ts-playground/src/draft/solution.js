function f1() {
  console.log(f1.arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(f1.arguments === arguments); // false
  console.log(f1.caller); // [Function: g]
}

function f2() {
  "use strict";
  console.log(f1.arguments); // null
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(f1.arguments === arguments); // false
  console.log(f1.caller); // null
}

(function g() {
  f1(1, 2, 3);
  f2(1, 2, 3);
})();
