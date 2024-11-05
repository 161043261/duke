"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Least Recently Used Cache
class LRUCache {
  constructor(capacity) {
    // fields
    this.kvs = new Map();
    this.kq = [];
    this.cap = 0;
    this.cap = capacity;
  }
  get(key) {
    if (this.kvs.has(key)) {
      this.updatekq(key);
      return this.kvs.get(key);
    }
    return -1;
  }
  put(key, value) {
    if (this.get(key) != -1) {
      this.kvs.set(key, value);
      // this.updatekq(key)
      return;
    }
    // !this.kvs.has(key)
    if (this.kvs.size == this.cap) {
      let rmk = this.kq.shift();
      this.kq.push(key);
      this.kvs.delete(rmk);
      this.kvs.set(key, value);
      return;
    }
    // !this.kvs.has(key)
    // this.kvs.size < this.cap
    this.kvs.set(key, value);
    this.kq.push(key);
  }
  updatekq(key) {
    for (let i = 0; i < this.kq.length; i++) {
      if (this.kq[i] == key) {
        this.kq.splice(i, 1);
        break;
      }
    }
    this.kq.push(key);
  }
}
// unshift --> [...] <-- push
// shift   <--       --> pop
let [capacity, key, value] = [0, 0, 0];
var obj = new LRUCache(capacity);
var param_1 = obj.get(key);
obj.put(key, value);
