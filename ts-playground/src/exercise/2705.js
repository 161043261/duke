/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
function compactObject(obj) {
  let compact = function (obj) {
    if (obj.constructor === Object) {
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!obj[key]) {
          delete obj[key]
        } else if (obj[key].constructor === Object || obj[key].constructor === Array) {
          compact(obj[key]);
        }
      }
    } else if (obj.constructor === Array) {
      let i = 0;
      while (i < obj.length) {
        if (!obj[i]) {
          obj.splice(i, 1);
        } else if (obj[i].constructor === Object || obj[i].constructor === Array) {
          compact(obj[i]);
        } else {
          i++;
        }
      }
    }
  }
  compact(obj);
  return obj;
}

console.log(compactObject({"a": null, "b": [false, 1]}));
