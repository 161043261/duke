/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
function smallestRange(nums: number[][]): number[] {}

class Heap {
  h: number[] = [];
  next: number[] = [];
  nums: number[][] = [];

  len(): number {
    return this.h.length;
  }

  less(i: number, j: number): boolean {
    return (
      this.nums[this.h[i]][this.next[this.h[i]]] <
      this.nums[this.h[j]][this.next[this.h[j]]]
    );
  }

  swap(i: number, j: number) {
    [this.h[i], this.h[j]] = [this.h[j], this.h[i]];
  }

  push(x: any) {
    this.h.push(x);
  }

  pop(): any {
    this.h.pop()
  }
}
