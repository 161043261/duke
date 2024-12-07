async function fm() {
  try {
    await Promise.reject('inner');
  } catch (e) {
    console.error(e);
  }
}

fm()
  .then(value => console.log(value))

async function fn() {
  await Promise.reject('outer');
}

fn()
  .then(value => console.log(value))
  .catch(reason => console.log(reason)) //