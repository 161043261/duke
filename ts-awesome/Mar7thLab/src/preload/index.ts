// preload 预加载脚本由渲染进程执行, 可以访问 node 接口
// 预加载脚本可以在 BrowserWindow 构造方法的 webPreferences 选项中, 附加到主进程

import { contextBridge, ipcRenderer } from 'electron/renderer';
import { electronAPI } from '@electron-toolkit/preload';
import jsonObj from './service_api.json';

function makeServiceApi(): unknown {
  const serviceApi = {};
  Object.entries(jsonObj).forEach(([serviceName, fnNames]) => {
    serviceApi[serviceName] = {};
    fnNames.forEach((fnName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      serviceApi[serviceName][fnName] = (...args: any[]) =>
        ipcRenderer.invoke(`${serviceName}.${fnName}`, ...args);
    });
  });
  serviceApi['sendMainWindowMsg'] = (msg: string) => ipcRenderer.send('sendMainWindowMsg', msg);
  serviceApi['loadJson'] = (fileName: string) => ipcRenderer.invoke('loadJson', fileName);
  return serviceApi;
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('service', makeServiceApi());
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.service = makeServiceApi();
}
