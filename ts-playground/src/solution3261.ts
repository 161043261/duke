function getSmallestString(s: string): string {
  // console.log(s.__proto__.toString() + "a");              // "a"
  // console.log(Object.getPrototypeOf(s).toString() + "a"); // "a"
  // console.log(String.prototype.toString() + "a");         // "a"
  // console.log(typeof String);               // function
  // console.log(String.__proto__.toString()); // function () { [native code] }

  for (let i = 0; i < s.length - 1; i++) {
    if (
      parseInt(s.charAt(i)) % 2 == parseInt(s.charAt(i + 1)) % 2 &&
      s.charAt(i) > s.charAt(i + 1)
    ) {
      return s.slice(0, i) + s.charAt(i + 1) + s.charAt(i) + s.slice(i + 2);
    }
  }
  return s;
}
