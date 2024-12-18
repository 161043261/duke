// preload.js 预加载脚本由渲染进程执行, 可以访问 node 接口
// 预加载脚本可以在 BrowserWindow 构造方法的 webPreferences 选项中, 附加到主进程

const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("versions", {
  /**
   * window.versions.node = () => process.versions.node;
   * @returns {string}
   */
  node: () => {
    return process.versions.node;
  },

  /**
   * window.versions.chrome = () => process.versions.chrome;
   * @returns {string}
   */
  chrome: () => {
    return process.versions.chrome;
  },

  /**
   * window.versions.electron = () => process.versions.electron;
   * @returns {string}
   */
  electron: () => {
    return process.versions.electron;
  },

  ping: () => {
    return ipcRenderer.invoke("icmpChan");
  },
});

// 深色模式
contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => {
    return ipcRenderer.invoke("dark-mode:toggle");
  },

  system: () => {
    return ipcRenderer.invoke("dark-mode:system");
  },
});

// 原生文件拖&放 (drag&drop)
contextBridge.exposeInIsolatedWorld("electron", {
  startDrag: (fileName) => {
    ipcRenderer.send("ondragstart", path.join(process.cwd(), fileName));
  },
});
