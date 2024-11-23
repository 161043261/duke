// preload.js 预加载脚本由渲染进程执行, 可以访问 node 接口
// 预加载脚本可以在 BrowserWindow 构造方法的 webPreferences 选项中, 附加到主进程

const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("versions", {
  /**
   * @description apiKey: versions
   * window.versions.node = () => process.versions.node;
   * @returns {string}
   */
  node: () => {
    // console.log("node version:", process.versions.node);
    return process.versions.node;
  },

  /**
   * @description apiKey: versions
   * window.versions.chrome = () => process.versions.chrome;
   * @returns {string}
   */
  chrome: () => {
    // console.log("chrome version:", process.versions.chrome);
    return process.versions.chrome;
  },

  /**
   * @description apiKey: versions
   * window.versions.electron = () => process.versions.electron;
   * @returns {string}
   */
  electron: () => {
    // console.log("electron version:", process.versions.electron);
    return process.versions.electron;
  },

  ping: () => {
    return ipcRenderer.invoke("icmpChan");
  },
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => {
    return ipcRenderer.invoke("dark-mode:toggle");
  },

  system: () => {
    return ipcRenderer.invoke("dark-mode:system");
  },
});
