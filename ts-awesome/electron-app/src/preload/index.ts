// preload 预加载脚本由渲染进程执行, 可以访问 node 接口
// 预加载脚本可以在 BrowserWindow 构造方法的 webPreferences 选项中, 附加到主进程

import { contextBridge, ipcRenderer } from 'electron/renderer'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

contextBridge.exposeInMainWorld('versions', {
  node: () => {
    return process.versions.node
  },
  chrome: () => {
    return process.versions.chrome
  },
  electron: () => {
    return process.versions.electron
  },
  ping: () => {
    return ipcRenderer.invoke('icmpChan')
  }
})

// 深色模式
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => {
    return ipcRenderer.invoke('dark-mode:toggle')
  },

  system: () => {
    return ipcRenderer.invoke('dark-mode:system')
  }
})
