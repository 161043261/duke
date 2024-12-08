async function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });
}

async function bar() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });
}

const begin = new Date().getTime();
