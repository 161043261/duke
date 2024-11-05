"use strict";
function losingPlayer(num75, num10) {
  let div = Math.min(num75, Math.floor(num10 / 4));
  return div % 2 == 0 ? "Bob" : "Alice";
}
