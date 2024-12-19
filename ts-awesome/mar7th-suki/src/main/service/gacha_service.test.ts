import { test } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

function loadJson(fileName: string) {
  // todo 确定 json 文件路径
  console.log(__dirname)
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, `../../../resources/json/${fileName}.json`), 'utf-8')
  )
}

test('Test_getGachaURL', () => {
  let url = ''
  const playerLogPath = `${os.homedir()}/AppData/LocalLow/miHoYo/崩坏：星穹铁道/Player.log`
  const starRailDataDir = fs
    .readFileSync(playerLogPath, 'utf-8')
    .match(/Loading player data from (.*)data\.unity3d/)![1]
  console.log(starRailDataDir)
  const webCacheDir = path.join(starRailDataDir, './webCaches/')
  let maxVersion = '0.0.0.0'
  fs.readdirSync(webCacheDir).forEach((fileName) => {
    if (
      fs.statSync(path.join(webCacheDir, fileName)).isDirectory() &&
      /\d+\.\d+\.\d+\.\d/.test(fileName)
    ) {
      const maxNums = maxVersion.split('.')
      const curNums = fileName.split('.')
      for (let i = 0; i < 4; ++i) {
        if (Number.parseInt(curNums[i]) > Number.parseInt(maxNums[i])) {
          maxVersion = fileName
          break
        }
        if (Number.parseInt(curNums[i]) < Number.parseInt(maxNums[i])) {
          break
        }
      }
    }
  })
  if (maxVersion === '0.0.0.0') {
    console.log('URL not found')
    return
  }
  const urlWebCachePath = path.join(
    starRailDataDir,
    `./webCaches/${maxVersion}/Cache/Cache_Data/data_2`
  )
  // todo 获取 url
  /////////////////////////////////////////////////////////////////////////
  const urlLines = fs.readFileSync(urlWebCachePath, 'utf-8').split('1/0/')
  urlLines.forEach((line) => {
    if (line.match(/^http.*(?:hkrpg|api).*mihoyo\.com.*?gacha.*\?/i)) {
      // eslint-disable-next-line no-control-regex
      url = line.match(/^.*?\x00/)![0].slice(0, -1)
    }
  })
  /////////////////////////////////////////////////////////////////////////
  if (url === '') {
    console.log('URL not found')
    return
  }
  const searchKeys = ['authkey_ver', 'authkey', 'game_biz', 'lang']
  const urlObj = new URL(url)
  const params = urlObj.searchParams
  const filteredParams = new URLSearchParams(
    Array.from(params.entries()).filter(([k]) => searchKeys.includes(k))
  )
  urlObj.search = filteredParams.toString()
  console.log(urlObj.href)
})

test('Test_importGachaData_srgf', () => {
  const data = loadJson('gacha_export.srgf')
  const uid = data['info']['uid']
  if (!/^\d{9}$/.test(uid)) {
    console.log('Invalid UID')
    return
  }
  fs.writeFileSync(`./resources/json/${uid}.json`, JSON.stringify({}, null, 2), 'utf-8')
  // 存储北京时间
  if (data['info']['region_time_zone'] != 8) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data['list'].forEach((item: any) => {
      const itemDate = new Date(item['time'])
      itemDate.setHours(itemDate.getHours() - data['info']['region_time_zone'] + 8)
      item['time'] =
        `${itemDate.getFullYear()}-` +
        `0${itemDate.getMonth() + 1}-`.slice(-3) +
        `0${itemDate.getDate()} `.slice(-3) +
        `0${itemDate.getHours()}:`.slice(-3) +
        `0${itemDate.getMinutes()}:`.slice(-3) +
        `0${itemDate.getSeconds()}`.slice(-2)
    })
  }
  let list = JSON.parse(fs.readFileSync(`./resources/json/${uid}.json`, 'utf-8'))
  let isInvalid = false
  const itemKeys = ['gacha_id', 'gacha_type', 'item_id', 'time', 'id']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data['list'].forEach((item: any) => {
    if (list[item['id']] === undefined) {
      const tmp = {}
      itemKeys.forEach((key) => {
        if (item[key] === undefined) {
          isInvalid = true
        } else {
          tmp[key] = item[key]
        }
      })
      list[item['id']] = tmp
    }
  })
  if (isInvalid) {
    console.log('Invalid data')
    return
  }
  list = Object.fromEntries(Object.entries(list).sort())
  fs.writeFileSync(`./resources/json/${uid}.json`, JSON.stringify(list, null, 2), 'utf-8')
})

test('Test_exportGachaData_srgf', () => {})

test('Test_exportGachaData_uigf', () => {})
