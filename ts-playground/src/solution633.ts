function judgeSquareSum(c: number): boolean {
 let maxA = Math.floor(Math.sqrt(c))
  for(let a = 0; a <= maxA; a++) {
    let squareB = c - a * a
    if (Math.floor(Math.sqrt(squareB)) == Math.ceil(Math.sqrt(squareB))) {
      return true
    }
  }
  return false;
}

judgeSquareSum(8)
