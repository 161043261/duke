"use strict";
const electron = require("electron");
const node_fs = require("node:fs");
const node_https = require("node:https");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const node_path = require("node:path");
const node_url = require("node:url");
const icon = path.join(__dirname, "../../resources/icon.png");
const __filename$1 = node_url.fileURLToPath(require("url").pathToFileURL(__filename).href);
const __dirname$1 = node_path.dirname(__filename$1);
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: node_path.join(__dirname$1, "../preload/index.js"),
      sandbox: false,
      devTools: true
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(node_path.join(__dirname$1, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
const iconName = node_path.join(__dirname$1, "dragAndDrop.png");
const iconWriteStream = node_fs.createWriteStream(iconName);
node_fs.writeFileSync(node_path.join(__dirname$1, "./drag-and-drop.md"), "# Drag & Drop");
node_https.get("https://img.icons8.com/ios/100/drag-and-drop.png", (response) => {
  response.pipe(iconWriteStream);
});
electron.ipcMain.handle("dark-mode:toggle", () => {
  if (electron.nativeTheme.shouldUseDarkColors) {
    electron.nativeTheme.themeSource = "light";
  } else {
    electron.nativeTheme.themeSource = "dark";
  }
  return electron.nativeTheme.shouldUseDarkColors;
});
electron.ipcMain.handle("dark-mode:system", () => {
  electron.nativeTheme.themeSource = "system";
});
electron.app.whenReady().then(() => {
  electron.ipcMain.handle("icmpChan", () => "pong");
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
//! event.sender.startDrag
electron.ipcMain.on("ondragstart", (event, filePath) => {
  event.sender.startDrag({
    file: node_path.join(__dirname$1, filePath),
    icon: iconName
  });
});
