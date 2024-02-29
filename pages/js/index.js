import { App } from "./App.js";
import { loadCss } from "./CssLoader.js";

let app;

window.onload = async () => {
    const cssFiles = await window.fs.getCssFiles();

    console.log(`Found ${cssFiles.length} css files -> ${cssFiles}`);

    loadCss(cssFiles);

    app = new App();

    window.downloader.onDownloadProgress(({ progress, url }) => {
        if (progress === 1) {
            console.log("Finished downloading video @", url);
        }
    });
}