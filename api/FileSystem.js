const fs = require("fs");
const { dialog } = require("electron/main");
const { glob } = require("glob");

const checkPathExists = (path) => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

const canCreateFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.W_OK, (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

const openWriteStream = (path) => {
    return fs.createWriteStream(path);
}

const closeWriteStream = (stream) => {
    return new Promise((resolve, reject) => {
        stream.on("finish", () => {
            resolve();
        });
        stream.end();
    });
}

const saveFileDialog = async () => {
    const result = await dialog.showSaveDialog({ properties: ["showOverwriteConfirmation"] });

    if (result.canceled) {
        return null;
    }

    return result.filePath;
}

const globDirectory = async (path) => {
    return await glob(path);
}

module.exports = {
    checkPathExists,
    canCreateFile,
    openWriteStream,
    closeWriteStream,
    saveFileDialog,
    globDirectory
};