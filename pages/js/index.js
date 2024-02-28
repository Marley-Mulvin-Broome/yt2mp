import { App } from "./App.js";
import { loadCss } from "./CssLoader.js";

let app;

window.onload = () => {
    loadCss([
        "css/reset.css",
        "css/index.css"
    ]);

    app = new App();

    window.downloader.onDownloadProgress(({ progress, url }) => {
        if (progress === 1) {
            console.log("Finished downloading video @", url);
        }
    });
}