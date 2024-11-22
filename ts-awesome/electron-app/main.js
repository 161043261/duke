// console.log("Hello from Electron 👋");

import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });

  window.loadFile("index.html");
};

app.whenReady().then(() => {
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
