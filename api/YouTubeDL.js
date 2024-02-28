const ytdl = require("ytdl-core");
const Downloader = require("./Downloader");

class YouTubeDL extends Downloader {
    download(url, progressCallback, outputStream, options = {}) {
        return new Promise((resolve, reject) => {
            const validUrl = ytdl.validateURL(url);

            if (!validUrl) {
                reject(new Error(`Invalid YouTube video URL ${url}`));
                return;
            }

            const video = ytdl(url, options);
            video.on("progress", (chunkLength, downloaded, total) => {
                progressCallback(downloaded / total, url);
            });
            video.pipe(outputStream);
            outputStream.on("finish", () => {
                resolve();
            });

            video.on("error", (error) => {
                reject(error);
            });
        });
    }

    getInfo(url) {
        return new Promise((resolve, reject) => {
            ytdl.getInfo(url).then((info) => {
                resolve({
                    title: info.videoDetails.title,
                    duration: info.videoDetails.lengthSeconds
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = YouTubeDL;