import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'

// userDataDir 用户数据目录
// ├── volumnDir 数据卷目录
// └── appSettingsPath app 配置文件

class ConfigService {
  private userDataDir: string
  private volumeDir: string
  private appSettingsPath: string

  constructor() {
    this.userDataDir = app.getPath('userData')
    // todo 确定 userDataDir 目录地址
    console.log(this.userDataDir)
    this.volumeDir = path.join(this.userDataDir, './volume/')
    if (!fs.existsSync(this.volumeDir)) {
      fs.mkdirSync(this.volumeDir)
    }
    this.appSettingsPath = path.join(this.volumeDir, './settings.json')
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
    return app.getVersion();
  }
}

export default new ConfigService()
