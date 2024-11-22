// renderer.js 由渲染进程执行
// 渲染进程直接访问 node 接口是不可能的
// 解决方法: 使用 Electron 的 ipcMain 模块和 ipcRenderer 模块进行进程间通信

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
  const response = await window.versions.ping()
  console.log(response) // pong
})()
