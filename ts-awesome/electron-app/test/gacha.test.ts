import { test } from 'vitest'
test('Test_JSON_stringify', () => {
  console.log(
    // {
    //   "000000000": "Trailblazer"
    // }
    JSON.stringify({ '000000000': 'Trailblazer' }, null, 2)
  )
})
