/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
  return {
    toBe: function (cp) {
      if (val === cp) {
        return true
      } throw new Error("Not Equal")
    },
    notToBe(cp) {
      if (val !== cp) {
        return true
      }
      throw new Error("Equal")
    }
  }
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */