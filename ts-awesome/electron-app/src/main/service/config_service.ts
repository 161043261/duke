import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'

class ConfigService {
  // userDataDir 用户数据
  private _userDataDir: string
  // volumnDir 数据卷目录
  private _volumeDir: string
  // settingsPath 配置文件
  private _settingsPath: string
  // version 版本
  private version: string

  constructor() {
    this._userDataDir = app.getPath('userData')
    this.version = app.getVersion()
    console.log(this._userDataDir)
    this._volumeDir = path.join(this._userDataDir, './volume/')
    if (!fs.existsSync(this._volumeDir)) {
      fs.mkdirSync(this._volumeDir)
    }
    this._settingsPath = path.join(this._volumeDir, 'settings.json')
  }

  get userDataDir() {
    return this._userDataDir
  }

  get volumeDir() {
    return this._volumeDir
  }

  get settingsPath() {
    return this._settingsPath
  }

  public async getVersion() {
    return this.version
  }
}

export default new ConfigService()
