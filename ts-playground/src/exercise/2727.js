/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  if (!obj) {
    return true;
  }
  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  }
  if (Reflect.ownKeys(obj).length === 0) {
    return true;
  }
  return false;
};
