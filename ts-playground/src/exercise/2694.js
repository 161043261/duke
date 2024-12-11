/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
class EventEmitter {
  evName2cbSet = new Map();

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (this.evName2cbSet.has(eventName)) {
      this.evName2cbSet.get(eventName).add(callback);
    } else {
      this.evName2cbSet.set(eventName, new Set([callback]));
    }

    let ctx = this;
    return {
      unsubscribe: () => {
        if (!ctx.evName2cbSet.has(eventName)) {
          return;
        }
        let cbSet = ctx.evName2cbSet.get(eventName);
        if (cbSet.has(callback)) {
          cbSet.delete(callback);
        }
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    if (!this.evName2cbSet.has(eventName)) {
      return [];
    }
    let ans = [];
    let cbSet = this.evName2cbSet.get(eventName);
    for (let cb of cbSet) {
      ans.push(cb(...args));
    }
    return ans;
  }
}
