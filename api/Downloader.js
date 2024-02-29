class Downloader {
    constructor(downloader) {
        this.downloader = downloader;
    }

    download(url, progressCallback, outputStream, options = {}) {
        return this.downloader.download(url, progressCallback, outputStream, options);
    }

    getInfo(url) {
        return this.downloader.getInfo(url);
    }

    validateUrl(url) {
        return this.downloader.validateUrl(url);
    }
}

module.exports = Downloader;