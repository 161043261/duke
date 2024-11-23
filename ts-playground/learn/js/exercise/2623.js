/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const k = JSON.stringify(args);
        if (cache.has(k)) {
            return cache.get(k);
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
function memoize1(fn) {
    const cache = {};
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
const memoize2 = (fn, cache = {}) => (...args) => cache[args.join()] ?? (cache[args.join()] = fn(...args));
