import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'

class ConfigService {
  // userDataDir 用户数据
  private userDataDir: string
  // volumnDir 数据卷目录
  private volumeDir: string
  // appSettingsPath app 配置文件
  private appSettingsPath: string
  // appVersion app 版本
  private appVersion: string

  constructor() {
    this.userDataDir = app.getPath('userData')
    this.appVersion = app.getVersion()
    console.log(this.userDataDir)
    this.volumeDir = path.join(this.userDataDir, './volume/')
    if (!fs.existsSync(this.volumeDir)) {
      fs.mkdirSync(this.volumeDir)
    }
    this.appSettingsPath = path.join(this.volumeDir, 'settings.json')
  }

  public getUserDataDir() {
    return this.userDataDir
  }

  public getVolumeDir() {
    return this.volumeDir
  }

  public getAppSettingsPath() {
    return this.appSettingsPath
  }

  public async getAppVersion() {
    return this.appVersion
  }
}

export default new ConfigService()
