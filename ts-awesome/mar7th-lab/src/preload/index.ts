// preload 预加载脚本由渲染进程执行, 可以访问 node 接口
// 预加载脚本可以在 BrowserWindow 构造方法的 webPreferences 选项中, 附加到主进程

import { contextBridge, ipcRenderer } from 'electron/renderer';
import { electronAPI } from '@electron-toolkit/preload';
import jsonObj from './mar7thlab_api.json';

function makeMar7thLabApi(): unknown {
  const mar7thLabApi = {};
  Object.entries(jsonObj).forEach(([serviceName, funcNames]) => {
    mar7thLabApi[serviceName] = {};
    funcNames.forEach((funcName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mar7thLabApi[serviceName][funcName] = (...args: any[]) =>
        ipcRenderer.invoke(`${serviceName}.${funcName}`, ...args);
    });
  });
  mar7thLabApi['sendMainWindowMsg'] = (msg: string) => ipcRenderer.send('sendMainWindowMsg', msg);
  mar7thLabApi['loadJson'] = (fileName: string) => ipcRenderer.invoke('loadJson', fileName);
  return mar7thLabApi;
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('service', makeMar7thLabApi());
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.mar7thLab = makeMar7thLabApi();
}
