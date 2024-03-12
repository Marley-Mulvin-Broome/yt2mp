const ytdl = require("ytdl-core");
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const Downloader = require("./Downloader");

class YouTubeDL extends Downloader {
    #downloadVideo(url, progressCallback, tracker) {
        const video = ytdl(url, { quality: "highestvideo", format: "mp4" });

        video.on("progress", (_, downloaded, total) => {
            tracker.video = { downloaded, total };
            progressCallback(tracker, url);
        });

        return video;
    }

    #downloadAudio(url, progressCallback, tracker) {
        const audio = ytdl(url, { quality: "highestaudio", format: "mp3" });

        audio.on("progress", (_, downloaded, total) => {
            tracker.audio = { downloaded, total };
            progressCallback(tracker, url);
        });

        return audio;
    }

    #setupFfmpegProcess(outputFile) {
        return cp.spawn(ffmpeg, [
            '-loglevel', '8', '-hide_banner',
            '-progress', 'pipe:3',
            '-i', 'pipe:4',
            '-i', 'pipe:5',
            '-map', '0:a',
            '-map', '1:v',
            '-c:v', 'copy',
            // Overwrite output file if it exists
            '-y',
            outputFile,
        ], {
            windowsHide: true,
            stdio: [
                'inherit', 'inherit', 'inherit',
                'pipe', 'pipe', 'pipe',
            ]
        });
    }

    download(url, progressCallback, outputFile, options = {}) {
        return new Promise((resolve, reject) => {
            const validUrl = ytdl.validateURL(url);

            if (!validUrl) {
                reject(new Error(`Invalid YouTube video URL ${url}`));
                return;
            }

            const tracker = { 
                start: Date.now(), 
                audio: { downloaded: 0, total: Infinity }, 
                video: { downloaded: 0, total: Infinity },
                merged: { frame: 0, speed: "0x", fps: 0 }
            };

            const streams = { audio: null, video: null };

            if (options.video) {
                streams.video = this.#downloadVideo(url, progressCallback, tracker);

                streams.video.on("error", (error) => {
                    reject(error);
                });
            }

            if (options.audio) {
                streams.audio = this.#downloadAudio(url, progressCallback, tracker);

                streams.audio.on("error", (error) => {
                    reject(error);
                });
            }

            const ffmpegProcess = this.#setupFfmpegProcess(outputFile);

            ffmpegProcess.on("close", () => {
                resolve();
            });

            ffmpegProcess.stdio[3].on('data', (chunk) => {
                const lines = chunk.toString().trim().split("\n");
                const args = {};

                for (const l of lines) {
                    const [key, value] = l.trim().split("=");
                    args[key.trim()] = value.trim();
                }

                tracker.merged = args;
                progressCallback(tracker, url);
            });

            streams.audio?.pipe(ffmpegProcess.stdio[4]);
            streams.video?.pipe(ffmpegProcess.stdio[5]);

        });
    }

    getInfo(url) {
        return new Promise((resolve, reject) => {
            ytdl.getInfo(url).then((info) => {
                resolve({
                    title: info.videoDetails.title,
                    duration: info.videoDetails.lengthSeconds,
                    thumbnailUrl: info.videoDetails.thumbnails[0].url
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    validateUrl(url) {
        return ytdl.validateURL(url);
    }
}

module.exports = YouTubeDL;