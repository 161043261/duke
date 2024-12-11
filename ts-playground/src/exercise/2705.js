/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
function compactObject_(obj) {
  let compact = function (obj) {
    if (obj.constructor === Object) {
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!obj[key]) {
          delete obj[key];
        } else if (
          obj[key].constructor === Object ||
          obj[key].constructor === Array
        ) {
          compact(obj[key]);
        }
      }
    } else if (obj.constructor === Array) {
      let i = 0;
      while (i < obj.length) {
        if (!obj[i]) {
          obj.splice(i, 1);
        } else if (
          obj[i].constructor === Object ||
          obj[i].constructor === Array
        ) {
          compact(obj[i]);
          i++;
        } else {
          i++;
        }
      }
    }
  };
  compact(obj);
  return obj;
}

function compactObject(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    let ret = [];
    for (let item of obj) {
      let val = compactObject(item);
      if (val) {
        ret.push(val);
      }
    }
    return ret;
  }
  // obj.constructor === Object
  let ret = {};
  let keys = Object.keys(obj);
  for (let key of keys) {
    let val = compactObject(obj[key]);
    if (val) {
      ret[key] = val;
    }
  }
  return ret;
}

console.log(compactObject([null, 0, 5, [0], [false, 16]]));
