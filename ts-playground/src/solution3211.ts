function validStrings(n: number): string[] {
  const ans: string[] = []
  const append = (prefix: string) => {
    if (prefix.length == n) {
      ans.push(prefix)
      return
    }
    if (prefix.charAt(prefix.length - 1) == '0') {
      append(prefix + "1")
    } else {
      append(prefix + "0")
      append(prefix + "1")
    }
  }
  append("0")
  append("1")
  return ans
}
