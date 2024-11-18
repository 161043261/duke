/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function add(x, y) {
  return x + y
}

console.log(module.exports === exports)

module.exports = {
  add,
  username: 'wft_name'
}

//! module.exports !== exports

// comment next line
exports = module.exports

exports.password = 'wtf_pwd'

console.log(module.exports === exports)