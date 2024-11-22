const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

//// const __dirname = import.meta.dirname;
// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.handle('pingChannel', () => 'pong')
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
