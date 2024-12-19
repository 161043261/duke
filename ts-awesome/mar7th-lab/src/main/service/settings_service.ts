import configService from './config_service';
import fs from 'node:fs';

class SettingsService {
  private appSettings: AppSettings;
  private appSettingsPath: string;
  private defaultSettings: AppSettings = {
    debug: false,
    closeDirectly: true,
    themeColor: [49, 120, 198],
    lastGachaUid: '',
    sidebarCollapsed: false,
    checkUpdateOnLaunch: true
  };
  constructor() {
    this.appSettingsPath = configService.getAppSettingsPath();
    if (!fs.existsSync(this.appSettingsPath)) {
      this.appSettings = this.defaultSettings;
    } else {
      this.appSettings = JSON.parse(fs.readFileSync(this.appSettingsPath, 'utf-8'));
    }
    Object.keys(this.defaultSettings).forEach((k) => {
      if (this.appSettings[k] === undefined) {
        this.appSettings[k] = this.defaultSettings[k];
      }
    });
    this.saveAppSettings();
  }
  private saveAppSettings() {
    fs.writeFileSync(this.appSettingsPath, JSON.stringify(this.appSettings, null, 2), 'utf-8');
  }

  public getAppSettingsSync() {
    return this.appSettings;
  }

  public async getAppSettings() {
    return this.appSettings;
  }

  public async setAppSettings(key: string, value: unknown) {
    if (this.appSettings[key] !== undefined && typeof this.appSettings[key] === typeof value) {
      this.appSettings[key] = value;
      this.saveAppSettings();
    }
    return this.appSettings;
  }
}

export default new SettingsService();
