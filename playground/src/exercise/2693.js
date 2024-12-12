/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function (context, ...args) {
  // return this.apply(context, args);
  // return this.bind(context, ...args)();
  // Object /* Reflect */.defineProperty(context, "fn", {
  //   enumerable: false,
  //   value: this,
  // });
  context[Symbol.for("fn")] = this;
  return context[Symbol.for("fn")](...args);
};

function increment() {
  this.count++;
  return this.count;
}

increment.callPolyfill({ count: 1 }); // 2
