/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  let id2item = new Map(arr1.map((item) => [item.id, item]));
  for (let item of arr2) {
    if (id2item.has(item.id)) {
      id2item.set(item.id, Object.assign(id2item.get(item.id), item));
    } else {
      id2item.set(item.id, item);
    }
  }
  return Array.from(id2item.values()).sort((a, b) => a.id - b.id);
};
