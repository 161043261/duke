"use strict";
const renderer = require("electron/renderer");
const preload = require("@electron-toolkit/preload");
const api = {};
if (process.contextIsolated) {
  try {
    renderer.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    renderer.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
renderer.contextBridge.exposeInMainWorld("versions", {
  node: () => {
    return process.versions.node;
  },
  chrome: () => {
    return process.versions.chrome;
  },
  electron: () => {
    return process.versions.electron;
  },
  ping: () => {
    return renderer.ipcRenderer.invoke("icmpChan");
  }
});
renderer.contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => {
    return renderer.ipcRenderer.invoke("dark-mode:toggle");
  },
  system: () => {
    return renderer.ipcRenderer.invoke("dark-mode:system");
  }
});
renderer.contextBridge.exposeInMainWorld("dragAndDrop", {
  startDrag: (fileName) => {
    renderer.ipcRenderer.send(
      "ondragstart",
      fileName
      /* path.join(process.cwd(), fileName) */
    );
  }
});
