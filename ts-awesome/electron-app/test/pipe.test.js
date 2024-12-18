const { test } = await import("vitest");
const path = require("node:path");
const fs = require("node:fs");
const https = require("node:https");

test("Test_pipe", () => {
  const iconName = path.join(__dirname, "dragAndDrop.png");
  const iconWriteStream = fs.createWriteStream(iconName);
  fs.writeFileSync(path.join(__dirname, "../README.txt"), '# An electron app');
  https.get("https://img.icons8.com/ios/452/drag-and-drop.png", (response) => {
    response.pipe(iconWriteStream);
  });
});
