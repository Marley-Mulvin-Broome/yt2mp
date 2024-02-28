const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const setupIpcBridge = require('./api/ipcBridge');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    setupIpcBridge(ipcMain, win.webContents);
  
    win.loadFile('pages/index.html');
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

