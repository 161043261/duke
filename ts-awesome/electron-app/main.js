// main.js 由 node 主进程执行
// node 主进程直接访问 HTML 文档对象模型 (DOM) 是不可能的
// 解决方法: 使用 ipcMain 和 ipcRenderer 的进程间通信 (IPC)

const { nativeTheme } = require("electron");
const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

//// const __dirname = import.meta.dirname;
// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

// 每个 Electron 应用会为每个打开的 BrowserWindow 生成一个单独的渲染器进程
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools();
};

ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});

app.whenReady().then(() => {
  ipcMain.handle("icmpChan", () => "pong");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
