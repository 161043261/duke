let data = {
  "user-data": {
    ["first" + "Name"]: "hang",
  },
};
let firstName = data?.["user-data"]?.firstName || "username";
console.log(firstName); // hang

data = {
  meth: {
    ["print-meth"](...args) {
      console.log(...args);
      return "oops";
    },
  },
};

// 如果 ? 左侧为 null 或 undefined, 则直接返回 undefined
firstName = data?.["user-data"]?.firstName || "hello";
console.log(firstName); // hello
firstName = data?.["user-data"]?.firstName ?? "world";
console.log(firstName); // world

// 如果 ? 左侧方法存在, 则执行
data?.meth?.["print-meth"]?.("w", "t", "f"); // w t f
data = {};
console.log(data?.meth?.["print-meth"]?.("w", "t", "f") || "damn"); // damn
console.log(data?.meth?.["print-meth"]?.("w", "t", "f") ?? "damn"); // damn
