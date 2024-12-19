const info = document.getElementById("info");
info.innerText = `Chrome 版本: v${window.versions.chrome()}
Node.js 版本: v${window.versions.node()}
Electron 版本: v${window.versions.electron()}`;
(async () => {
  const response = await window.versions.ping();
  console.log(response);
})();
document.getElementById("toggle-dark-mode").addEventListener("click", async () => {
  const isDarkMode = await window.darkMode.toggle();
  document.getElementById("theme-source").innerHTML = isDarkMode ? "Dark" : "Light";
});
document.getElementById("reset-to-system").addEventListener("click", async () => {
  await window.darkMode.system();
  document.getElementById("theme-source").innerHTML = "System";
});
document.getElementById("drag").ondragstart = (event) => {
  event.preventDefault();
  window.dragAndDrop.startDrag("./drag-and-drop.md");
};
