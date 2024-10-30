import { test } from 'vitest'

test('funcPrototype', () => {
  function Product() {
  }

  Product.prototype.foo = 'bar'
  const product = new Product();
  product.prop = 'V8'
  console.log(product)           // Product { prop: 'V8' }
  console.log(product.__proto__) // { foo: 'bar' }
  console.log(product.foo)       // bar
})
