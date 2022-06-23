import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
const fs = require('fs');

const SETTINGS_PATH = app.getPath('userData') + '\\userSettings.json';

const AutoLaunch = require('auto-launch');

let autoLaunchEnabled = true;

if (fs.existsSync(SETTINGS_PATH)) {
  const settings = fs.readFileSync(SETTINGS_PATH, 'utf8') ?? undefined;

  const parsedSettings: { autoStartup: boolean } = JSON.parse(settings);

  autoLaunchEnabled = parsedSettings.autoStartup;
}

const autoLaunch = new AutoLaunch({
  name: 'automator',
  path: app.getPath('exe'),
  isHidden: true,
});

autoLaunch.isEnabled().then((isEnabled: boolean) => {
  if (!isEnabled && autoLaunchEnabled) {
    autoLaunch.enable();
  }
});

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    minWidth: 1000,
    height: 700,
    minHeight: 450,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.setMenu(null);

  mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}?saveFilePath=${app.getPath('userData')}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message);
  });
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    registerListeners();

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  })
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('toggle-auto-startup', async (e, enable) => {
  autoLaunch.isEnabled().then((isEnabled: boolean) => {
    if (enable) {
      if (!isEnabled) {
        autoLaunch.enable();

        updateSettings({ autoStartup: true });

        autoLaunchEnabled = true;
      }
    } else {
      if (isEnabled) {
        autoLaunch.disable();

        updateSettings({ autoStartup: false });

        autoLaunchEnabled = false;
      }
    }
  });
});

ipcMain.on('auto-startup-status', e => {
  e.returnValue = autoLaunchEnabled;
});

function updateSettings(updatedSettings: { autoStartup: boolean }) {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(updatedSettings));
}
