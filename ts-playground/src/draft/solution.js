// eslint-disable-next-line @typescript-eslint/no-unused-vars
const constantize = (obj) => {
  Object.freeze(obj);

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
};
