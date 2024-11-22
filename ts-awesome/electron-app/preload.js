const { contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld("versions", {
  node: () => {
    // console.log("node version:", process.versions.node);
    return process.versions.node ?? "wtf version";
  },

  chrome: () => {
    // console.log("chrome version:", process.versions.chrome);
    return process.versions.chrome ?? "wtf version";
  },

  electron: () => {
    // console.log("electron version:", process.versions.electron);
    return process.versions.electron ?? "wtf version";
  },
});
