import { App } from "./App.js";

const app = new App();

window.downloader.onDownloadProgress(({ progress, url }) => {
    if (progress === 1) {
        alert(`Finished downloading ${url}!`);
    }
});