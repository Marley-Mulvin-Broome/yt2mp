import { openFolderIcon, tickIcon, trashIcon } from "../icons/icons.js";
import { button, div, h3, img, p, progress } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";

const BASE_CSS_CLASS_NAME = 'download-tracker';

export class DownloadTracker extends Component {
    onDownloadRemoved;

    constructor(parent, info) {
        super(parent);

        console.log("Download tracker created with info: ", info);

        info.downloadPromise.then(() => {
            this.complete();
        });
        this.filePath = info.filePath;
        
        this.downloadTitle = h3(`${BASE_CSS_CLASS_NAME}__title`, info.title);
        this.downloadImage = img(`${BASE_CSS_CLASS_NAME}__thumbnail`, info.thumbnail, 'Thumbnail', '128', '72px');
        this.downloadImage.onclick = () => {
            window.open(info.url);
        };

        this.downloadInfoContainer = div(`${BASE_CSS_CLASS_NAME}__info-container`, [this.downloadTitle, this.downloadImage]);
        
        this.progress = progress(`${BASE_CSS_CLASS_NAME}__progress`, "0", "1");
        this.progressText = p(`${BASE_CSS_CLASS_NAME}__progress-text`, 'Starting download ...');
        this.progressContainer = div(`${BASE_CSS_CLASS_NAME}__progress-container`, [this.progress, this.progressText]);

        this.openContainingFolderButton = button(`${BASE_CSS_CLASS_NAME}__open-containing-folder-button`, '');

        this.removeDownloadButton = button(`${BASE_CSS_CLASS_NAME}__remove-download-button`, '');

        this.openContainingFolderButton.mount(
            openFolderIcon("25px", "25px", "var(--icon-colour)")
        );

        this.openContainingFolderButton.onclick = this.#openContainerFolderClicked.bind(this);

        this.removeDownloadButton.mount(
            trashIcon("25px", "25px", "var(--icon-colour)")
        );

        this.removeDownloadButton.onclick = () => {
            if (this.onDownloadRemoved) this.onDownloadRemoved();
            this.container.remove();
        }

        this.iconContainer = div(`${BASE_CSS_CLASS_NAME}__icon-container`, [this.openContainingFolderButton, this.removeDownloadButton]);

        this.url = info.url;

        window.downloader.onDownloadProgress((tracker, url) => {
            this.#onDownloadProgress(tracker, url);
        });

        this.container = div(`${BASE_CSS_CLASS_NAME} container__dark container__hover-focus`, [this.downloadInfoContainer, this.progressContainer, this.iconContainer]);

        this.mount([this.container]);
    }

    complete() {
        this.progress.replaceWith(tickIcon("50px", "50px", "var(--accent-color)"));
        this.progressText.innerText = 'Download complete';
    }

    #onDownloadProgress(tracker, url) {
        if (url !== this.url) { return; }

        const downloadProgress = (tracker.video.downloaded + tracker.audio.downloaded) / (tracker.video.total + tracker.audio.total).toFixed(2);
        
        this.progress.value = progress;

        if (downloadProgress === 1) {
            this.progressText.innerText = "Merging audio and video ...";
        } else {
            this.progressText.innerText = `Downloading ... ${Math.floor(downloadProgress * 100)}%`;
        }
    }

    async #openContainerFolderClicked() {
        await window.fs.showItemInFolder(this.filePath);
    }
}