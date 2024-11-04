function losingPlayer(num75: number, num10: number): string {
  let div = Math.min(num75, Math.floor(num10 / 4));
  return div % 2 == 0 ? "Bob" : "Alice";
}
