import { openFolderIcon, tickIcon, trashIcon } from "../icons/icons.js";
import { button, div, h3, img, p, progress } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";

const BASE_CSS_CLASS_NAME = 'download-tracker';

export class DownloadTracker extends Component {
    constructor(parent, info) {
        super(parent);
        
        this.downloadTitle = h3(`${BASE_CSS_CLASS_NAME}__title`, info.title);
        this.downloadImage = img(`${BASE_CSS_CLASS_NAME}__thumbnail`, info.thumbnail, 'Thumbnail', '128', '72px');
        this.downloadImage.onclick = () => {
            window.open(info.url);
        };

        this.downloadInfoContainer = div(`${BASE_CSS_CLASS_NAME}__info-container`, [this.downloadTitle, this.downloadImage]);
        
        this.progress = progress(`${BASE_CSS_CLASS_NAME}__progress`, "0", "1");
        this.progressText = p(`${BASE_CSS_CLASS_NAME}__progress-text`, 'Downloading ...');
        this.progressContainer = div(`${BASE_CSS_CLASS_NAME}__progress-container`, [this.progress, this.progressText]);

        this.openContainingFolderButton = button(`${BASE_CSS_CLASS_NAME}__open-containing-folder-button`, '');

        this.removeDownloadButton = button(`${BASE_CSS_CLASS_NAME}__remove-download-button`, '');

        this.openContainingFolderButton.mount(
            openFolderIcon("25px", "25px", "var(--icon-colour)")
        );

        this.removeDownloadButton.mount(
            trashIcon("25px", "25px", "var(--icon-colour)")
        );

        this.removeDownloadButton.onclick = () => {
            // window.downloader.removeDownload(info.url);
            this.container.remove();
        }

        this.iconContainer = div(`${BASE_CSS_CLASS_NAME}__icon-container`, [this.openContainingFolderButton, this.removeDownloadButton]);

        this.url = info.url;

        window.downloader.onDownloadProgress(({ progress, url }) => {
            if (url !== this.url) { return; }
            
            this.progress.value = progress;

            if (this.progress.value === 1) {
                this.complete();
            }
        });

        this.container = div(`${BASE_CSS_CLASS_NAME} container__dark container__hover-focus`, [this.downloadInfoContainer, this.progressContainer, this.iconContainer]);

        this.mount([this.container]);
    }

    complete() {
        this.progress.replaceWith(tickIcon("50px", "50px", "var(--accent-color)"));
        this.progressText.innerText = 'Download complete';
    }
}