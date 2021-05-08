const { app, BrowserWindow, session } = require("electron");
const shell = require("electron").shell;
const path = require("path");

async function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.on("new-window", () => {
    console.log("Waiting for browser windows.");
    let window_0 = null;
    while (window_0 === null) {
      let windows = BrowserWindow.getAllWindows();
      window_0 = windows[0];
    }
    window_0.hide();
  });
  win.on("hide", () => {
    let window = BrowserWindow.getAllWindows()[1];
    console.log(window.isVisible());
    window.on("close", () => {
      window.close();
      console.log(BrowserWindow.getAllWindows());
    });
  });
  const ext = await session.defaultSession.loadExtension(
    path.join(__dirname, "AskAssist/")
  );
  console.log("ext", ext);
  win.loadURL("https://trilobot.slack.com/", { userAgent: "Chrome" });
}

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
