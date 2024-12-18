// renderer.js 由渲染进程执行
// 渲染进程直接访问 node 接口是不可能的
// 解决方法: 使用 ipcMain 和 ipcRenderer 的进程间通信 (IPC)

// const process = require("node:process");

const info = document.getElementById("info");

// console.log(window.versions);

info.innerText = `Chrome (v${window.versions.chrome()}),
Node.js (v${window.versions.node()}),
Electron (v${window.versions.electron()})`;

// console.log(`Chrome (v${process.versions.chrome}),
// Node.js (v${process.versions.node}),
// Electron (v${process.versions.electron})`);

(async () => {
  const response = await window.versions.ping();
  console.log(response); // pong
})();

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "System";
  });

document.getElementById("drag").ondragstart = (event) => {
  event.preventDefault();
  window.electron.startDrag("drag-and-drop.md");
};
