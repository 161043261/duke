import path from 'node:path'
import fs from 'node:fs'
import configService from './configService'

class GachaService {
  private volumeDir: string
  private gachaDir: string
  private gachaUidsPath: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private gachaUids: any

  constructor() {
    this.volumeDir = configService.volumeDir
    this.gachaDir = path.join(this.volumeDir, './gacha/')
    if (!fs.existsSync(this.gachaDir)) {
      fs.mkdirSync(this.gachaDir)
    }
    this.gachaUidsPath = path.join(this.gachaDir, './uids.json')
    if (!fs.existsSync(this.gachaUidsPath)) {
      fs.writeFileSync(
        this.gachaUidsPath,
        JSON.stringify({ '000000000': 'Trailblazer' }, null, 2),
        'utf-8'
      )
      fs.writeFileSync(
        path.join(this.gachaDir, './000000000.json'),
        JSON.stringify({}, null, 2),
        'utf-8'
      )
    }
    this.gachaUids = JSON.parse(fs.readFileSync(this.gachaUidsPath, 'utf-8'))
  }

  private saveGachaUids() {
    this.gachaUids = Object.keys(this.gachaUids)
      .sort()
      .reduce((sortedObj, key) => {
        sortedObj[key] = this.gachaUids[key]
        return sortedObj
      }, {})
    fs.writeFileSync(this.gachaUidsPath, JSON.stringify(this.gachaUids, null, 2), 'utf-8')
  }

  //! async
  public getGachaUids() {
    return { msg: 'OK', data: this.gachaUids }
  }

  //! async
  public getGachaData(uid: string, updateLastUid = false) {
    if (!/^\d{9}$/.test(uid)) {
      return { msg: 'Invalid UID' }
    }
    if (this.gachaUids[uid] === undefined) {
      return { msg: 'UID not found' }
    }
    if (updateLastUid) {
      // settingsService.setAppSettings('LastGachaUid', uid);
    }
    return {
      msg: 'OK',
      data: JSON.parse(fs.readFileSync(path.join(this.gachaDir, `./${uid}.json`), 'utf-8'))
    }
  }
}
