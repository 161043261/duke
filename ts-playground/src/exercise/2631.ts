interface Array<T> {
  groupBy(fn: (item: T) => string): Record<string, T[]>;
}

Array.prototype.groupBy = function (fn) {
  const ret: any = {};
  this.forEach((item: any) => {
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
