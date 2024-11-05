// Least Recently Used Cache
class LRUCache {
  // fields
  kvs = new Map<number, number>();
  kq: number[] = [];
  cap: number = 0;

  constructor(capacity: number) {
    this.cap = capacity;
  }

  get(key: number): number {
    if (this.kvs.has(key)) {
      this.updatekq(key);
      return this.kvs.get(key)!;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (this.get(key) != -1) {
      this.kvs.set(key, value);
      // this.updatekq(key)
      return;
    }

    // !this.kvs.has(key)
    if (this.kvs.size == this.cap) {
      let rmk = this.kq.shift()!;
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

  updatekq(key: number) {
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

export {};
