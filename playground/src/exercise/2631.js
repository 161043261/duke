"use strict";
Array.prototype.groupBy = function (fn) {
  const ret = {};
  this.forEach((item) => {
    const key = fn(item);
    if (key in ret) {
      ret[key].push(item);
    } else {
      ret[key] = [item];
    }
  });
  return ret;
};
// I write songs in JavaScript
