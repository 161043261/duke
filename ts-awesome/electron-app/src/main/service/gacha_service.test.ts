import { test } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

test('Test_getGachaURL', () => {
  let url = ''
  const playerLogPath = `${os.homedir()}/AppData/LocalLow/miHoYo/崩坏：星穹铁道/Player.log`
  const gameDataPath = fs
    .readFileSync(playerLogPath, 'utf-8')
    .match(/Loading player data from (.*)data\.unity3d/)![1]
  console.log(gameDataPath)
  const webCachePath = path.join(gameDataPath, './webCaches/')
  let maxVersion = '0.0.0.0'
  fs.readdirSync(webCachePath).forEach((fileName) => {
    if (
      fs.statSync(path.join(webCachePath, fileName)).isDirectory() &&
      /\d+\.\d+\.\d+\.\d/.test(fileName)
    ) {
      const max = maxVersion.split('.')
      const now = fileName.split('.')
      for (let i = 0; i < 4; ++i) {
        if (parseInt(now[i]) > parseInt(max[i])) {
          maxVersion = fileName
          break
        } else if (parseInt(now[i]) < parseInt(max[i])) {
          break
        }
      }
    }
  })
  if (maxVersion === '0.0.0.0') {
    console.log('URL not found')
  }
  const urlWebCachePath = path.join(
    gameDataPath,
    `./webCaches/${maxVersion}/Cache/Cache_Data/data_2`
  )
  const urlLines = fs.readFileSync(urlWebCachePath, 'utf-8').split('1/0/')
  urlLines.forEach((line) => {
    if (line.match(/^http.*(?:hkrpg|api).*mihoyo\.com.*?gacha.*\?/i)) {
      // eslint-disable-next-line no-control-regex
      url = line.match(/^.*?\x00/)![0].slice(0, -1)
    }
  })
  if (url === '') {
    console.log('URL not found')
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
