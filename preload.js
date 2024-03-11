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
    },
    validateUrl: async (url) => {
        return await ipcRenderer.invoke('validate-url', url);
    }
});

contextBridge.exposeInMainWorld('fs', {
    pathExists: async (path) => {
        return await ipcRenderer.invoke('fs-path-exists', path);
    },
    isFile: async (path) => {
        return await ipcRenderer.invoke('fs-is-file', path);
    },
    canCreateFile: async (path) => {
        return await ipcRenderer.invoke('fs-can-create-file', path);
    },
    saveFileDialog: async () => {
        return await ipcRenderer.invoke('fs-save-file-dialog');
    },
    getCssFiles: async () => {
        return await ipcRenderer.invoke('fs-glob-css');
    },
    showItemInFolder: async (path) => {
        return await ipcRenderer.invoke('fs-show-item-in-folder', path);
    }
});

contextBridge.exposeInMainWorld('userPreferences', {
    get: async (key) => {
        return await ipcRenderer.invoke('user-preferences-get', key);
    },
    set: async (key, value) => {
        return await ipcRenderer.invoke('user-preferences-set', key, value);
    }
});