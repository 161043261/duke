// const process = require("node:process");

const info = document.getElementById("info");

// console.log(window.versions);

info.innerText = `Chrome (v${window.versions.chrome()}),
Node.js (v${window.versions.node()}),
Electron (v${window.versions.electron()})`;

// console.log(`Chrome (v${process.versions.chrome}),
// Node.js (v${process.versions.node}),
// Electron (v${process.versions.electron})`);
