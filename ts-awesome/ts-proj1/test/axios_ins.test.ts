import { test } from 'vitest'
import axiosIns from "../src/utils/axios_ins"

// pnpm run test:unit --silent=false
test('page1_limit10', async () => {
  axiosIns.get("/hosp/hospital/1/10")
  .then(respData => {
    console.log(respData)
  }, (error) => {
    console.log(error.message)
  })
})
