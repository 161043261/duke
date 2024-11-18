/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function add(x, y) { return x + y }

console.log(module.exports === exports)

// module.exports 指向新的对象, exports 仍指向原对象
module.exports = {
  add,
  username: 'wft_name'
}

console.log(module.exports === exports)

// comment next line
exports = module.exports

exports.password = 'wtf_pwd'

console.log(module.exports === exports)

// const mod = require('./mod')