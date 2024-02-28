const YouTubeDL = require("./YouTubeDL");
const Downloader = require("./Downloader");
const fileSystem = require("./FileSystem");


const getDownloader = () => new Downloader(new YouTubeDL());

const download = (webContents, url, outputPath, options = {}) => {
    downloader = getDownloader();

    stream = fileSystem.openWriteStream(outputPath);

    return downloader.download(url, (progress, url) => {
        webContents.send("download-progress", { progress, url });
    }, stream, options);
}

const getInfo = (url) => {
    downloader = getDownloader();
    return downloader.getInfo(url);
}

const setupIpcBridge = (ipcMain, webContents) => {
    ipcMain.handle("download", async (event, url, outputPath, options) => {
        await download(webContents, url, outputPath, options);
    });

    ipcMain.handle("get-info", async (event, url) => {
        return await getInfo(url);
    });

    ipcMain.handle("fs-path-exists", async (event, path) => {
        return await fileSystem.checkPathExists(path);
    });

    ipcMain.handle("fs-can-create-file", async (event, path) => {
        return await fileSystem.canCreateFile(path);
    });

    ipcMain.handle("fs-save-file-dialog", async (event) => {
        return await fileSystem.saveFileDialog();
    });
}

module.exports = setupIpcBridge;