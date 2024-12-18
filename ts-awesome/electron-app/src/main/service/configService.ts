import { app } from 'electron'
import path from 'node:path'
import fs from 'node:fs'

class ConfigService {
  private _userDataPath: string
  private _volumeDir: string
  private _appSettingsPath: string

  constructor() {
    this._userDataPath = app.getPath('userData')
    console.log(this._userDataPath)
    this._volumeDir = path.join(this._userDataPath, './volume/')
    if (!fs.existsSync(this._volumeDir)) {
      fs.mkdirSync(this._volumeDir)
    }
    this._appSettingsPath = path.join(this._volumeDir, 'settings.json')
  }

  get userDataPath() {
    return this._userDataPath
  }

  get volumeDir() {
    return this._volumeDir
  }

  get appSettingsPath() {
    return this._appSettingsPath
  }

  public async getAppVersion() {
    return app.getVersion()
  }
}

export default new ConfigService()
