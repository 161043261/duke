import { app } from 'electron'
import path from 'node:path'
import fs from 'node:fs'

class ConfigService {
  // userDataPath 用户数据
  private _userDataPath: string
  // volumnDir 数据卷目录
  private _volumeDir: string
  // settingsPath 配置文件
  private _settingsPath: string
  // version 版本
  private _version: string | undefined

  constructor() {
    this._userDataPath = app.getPath('userData')
    console.log(this._userDataPath)
    this._volumeDir = path.join(this._userDataPath, './volume/')
    if (!fs.existsSync(this._volumeDir)) {
      fs.mkdirSync(this._volumeDir)
    }
    this._settingsPath = path.join(this._volumeDir, 'settings.json')
  }

  get userDataPath() {
    return this._userDataPath
  }

  get volumeDir() {
    return this._volumeDir
  }

  get settingsPath() {
    return this._settingsPath
  }

  //! public async getVersion();
  get version() {
    if (this._version !== undefined) {
      return this._version
    }
    return (this._version = app.getVersion())
  }
}

export default new ConfigService()
