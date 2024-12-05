function tco(
  f: (x: number, y: number) => number,
): (x: number, y: number) => number | undefined {
  let value: number;
  let active = false;
  const accumulated: [number, number][] = [];
  return function accumulator(x: number, y: number): number | undefined {
    accumulated.push([x, y]);
    if (!active) {
      active = true;
      while (accumulated.length > 0) {
        value = f.apply({}, accumulated.shift()!);
      }
      active = false;
      return value;
    }
  };
}
const foo2co = tco(function foo(x: number, y: number): number {
  if (y > 0) {
    return foo2co(/* foo */ x + 1, y - 1)!;
  } else {
    return x;
  }
})!;
console.log(foo2co(1, 100_0000));
