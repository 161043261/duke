/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const fs = require("fs");

// 回调地狱
fs.readFile("./demo3.js", (err, data1) => {
  if (err) {
    throw err;
  }
  fs.readFile("./demo4.js", (err, data2) => {
    if (err) {
      throw err;
    }
    fs.readFile("./demo5.js", (err, data3) => {
      if (err) {
        throw err;
      }
      console.log((data1 + data2 + data3).toString().length);
    });
  });
});


