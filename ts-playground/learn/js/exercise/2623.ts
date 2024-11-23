/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
type Fn = (...params: number[]) => number;

function memoize(fn: Fn): Fn {
  const cache = new Map<string, number>();

  return function (...args: number[]): number {
    const k = JSON.stringify(args);
    if (cache.has(k)) {
      return cache.get(k)!;
    }

    const v = fn(...args);
    cache.set(k, v);
    return v;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */

function memoize1(fn: Fn): Fn {
  const cache: {
    [k: string]: number;
  } = {};

  return function () {
    let key = "";
    for (const arg of arguments) {
      key += "," + arg;
    }
    if (key in cache) {
      return cache[key];
    }
    const ret = fn(...arguments);
    cache[key] = ret;
    return ret;
  };
}

const memoize2 =
  (
    fn: (...params: number[]) => number,
    cache: {
      [key: string]: number;
    } = {},
  ): ((...params: number[]) => number) =>
  (...args: number[]) =>
    cache[args.join()] ?? (cache[args.join()] = fn(...args));
