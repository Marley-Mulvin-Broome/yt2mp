const YouTubeDL = require("./YouTubeDL");
const Downloader = require("./Downloader");
const fileSystem = require("./FileSystem");
const userPreferences = require("./UserPreferences");
const validator = require('validator');
const path = require('path');

const getDownloader = () => new Downloader(new YouTubeDL());

const download = (webContents, url, outputPath, options = {}) => {
    downloader = getDownloader();

    stream = fileSystem.openWriteStream(outputPath);

    return downloader.download(url, (progress, url) => {
        webContents.send("download-progress", { progress, url });
    }, stream, options);
}

const urlIsValid = (url) => {
    if (!validator.isURL(url)) {
        return false;
    }

    return getDownloader().validateUrl(url);
}

const getInfo = (url) => {
    downloader = getDownloader();
    return downloader.getInfo(url);
}

const setupIpcBridge = (ipcMain, webContents) => {
    userPreferences.setupStorage();

    ipcMain.handle("download", async (event, url, outputPath, options) => {
        await download(webContents, url, outputPath, options);
    });

    ipcMain.handle("get-info", async (event, url) => {
        return await getInfo(url);
    });

    ipcMain.handle("validate-url", async (event, url) => {
        return urlIsValid(url);
    });

    ipcMain.handle("fs-path-exists", async (event, path) => {
        return await fileSystem.checkPathExists(path);
    });

    ipcMain.handle("fs-is-file", async (event, path) => {
        return await fileSystem.isFile(path);
    });

    ipcMain.handle("fs-can-create-file", async (event, path) => {
        return await fileSystem.canCreateFile(path);
    });

    ipcMain.handle("fs-save-file-dialog", async (event) => {
        return await fileSystem.saveFileDialog();
    });

    ipcMain.handle("fs-glob-css", async () => {
        return await fileSystem.globDirectory(path.join(__dirname, '../pages/css/*.css'));
    });

    ipcMain.handle("fs-show-item-in-folder", async (event, path) => {
        return fileSystem.showItemInFolder(path);
    });

    ipcMain.handle("user-preferences-get", async (event, key) => {
        return await userPreferences.getUserPreference(key);
    });

    ipcMain.handle("user-preferences-set", async (event, key, value) => {
        return await userPreferences.setUserPreference(key, value);
    });
}

module.exports = setupIpcBridge;