// 主进程: 从主进程访问 HTML 文档对象模型 (DOM) 是不可能的

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

  ping: () => ipcRenderer.invoke('ping')
});
