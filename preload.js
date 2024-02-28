const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('downloader', {
    download: async (url, outputPath, options = {}) => {
        return await ipcRenderer.invoke('download', url, outputPath, options);
    },
    onDownloadProgress: (callback) => {
        ipcRenderer.on('download-progress', (event, downloadStatus) => {
            callback(downloadStatus);
        });
    },
    getInfo: async (url) => {
        return await ipcRenderer.invoke('get-info', url);
    }
});

contextBridge.exposeInMainWorld('fs', {
    pathExists: async (path) => {
        return await ipcRenderer.invoke('fs-path-exists', path);
    },
    canCreateFile: async (path) => {
        return await ipcRenderer.invoke('fs-can-create-file', path);
    },
    saveFileDialog: async () => {
        return await ipcRenderer.invoke('fs-save-file-dialog');
    }
});