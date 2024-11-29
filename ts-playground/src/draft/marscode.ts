function solution(cards: number[]): number {
  // Edit your code here
  const once = new Array<boolean>(10);
  for (const card of cards) {
    once[card] = once[card] === undefined;
  }
  for (let i = 0; i <= 1000; i++) {
    if (once[i]) {
      return i;
    }
  }
  return -1;
}

function main() {
  // Add your test cases here
  console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4);
  console.log(solution([0, 1, 0, 1, 2]) === 2);
}

main();
