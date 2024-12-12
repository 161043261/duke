/**
 * @return {Generator<number>}
 */
var fibGenerator = function* () {
  let pre = 0,
    cur = 1;

  yield 0;
  yield 1;
  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
};

const gen = fibGenerator();
console.log(gen.next().value); // 0
