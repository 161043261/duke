import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mar7thLab: any;
  }
}
