/* eslint-disable @typescript-eslint/no-unused-vars */
class TimeLimitedCache {
  // cache: {
  //   [key: string]: {
  //     value: number;
  //     expiration: number;
  //   };
  // } = {};

  // Record: 限制 k, v 类型的 Object
  // 等价于
  cache: Record<
    string,
    {
      value: number;
      expiration: number;
    }
  > = {};

  set(key: string, value: number, duration: number) {
    const ret = key in this.cache && Date.now() < this.cache[key].expiration;
    this.cache[key] = {
      value,
      expiration: Date.now() + duration,
    };
    return ret;
  }

  get(key: string) {
    if (
      this.cache[key] == undefined || // miss
      Date.now() > this.cache[key].expiration // expired
    ) {
      return -1;
    }
    return this.cache[key].value;
  }

  count() {
    let count = 0;
    // 遍历对象
    for (const val of Object.values(this.cache)) {
      if (Date.now() < val.expiration) {
        count++;
      }
    }
    return count;
  }
}

class TimeLimitedCache1 {
  cache: Map<
    string,
    {
      value: number;
      expiration: number;
    }
  > = new Map();

  /* generator */
  *handleExpiredData() {
    const now = Date.now();
    // 遍历 Map
    for (const [key, { expiration }] of this.cache) {
      if (expiration < now) {
        this.cache.delete(key);
      }
    }
    yield null;
  } // generates null, null, ...

  set(key: string, value: number, duration: number) {
    // TODO
    this.handleExpiredData().next();
    const ret = this.cache.has(key);
    this.cache.set(key, { value, expiration: Date.now() + duration });
    return ret;
  }

  get(key: string) {
    this.handleExpiredData().next();
    if (!this.cache.has(key) || this.cache.get(key)!.expiration < Date.now()) {
      return -1;
    }
    return this.cache.get(key)!.value;
  }

  count() {
    this.handleExpiredData().next();
    return this.cache.size;
  }
}
