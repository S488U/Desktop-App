const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
const { title } = require("process");

//const isDev = process.env.NODE_ENV !== "development";
const isMac = process.platform === "darwin";

// Create the Main Window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    //width: isDev ? 1000 : 500,
    width: 1000,
    height: 700,
  });

  //   Open DevTools if any Development Mode

  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

//Create About Window

function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About Image Re-Sizer",
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

// App is ready

app.whenReady().then(() => {
  createMainWindow();

  // Implement Menu:

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Custom Menu

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

app.on("window-all-closed", () => {
  if (isMac) {
    app.quit();
  }
});
