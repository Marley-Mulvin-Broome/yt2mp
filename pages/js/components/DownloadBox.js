import { div, h2 } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";
import { DownloadUrlButton } from "./DownloadUrlButton.js";
import { URLInput } from "./URLInput.js";

const BASE_CSS_CLASS_NAME = 'download-box';

export class DownloadBox extends Component {
    onDownloadStart;

    constructor(parent) {
        super(parent);
        
        this.title = h2(`${BASE_CSS_CLASS_NAME}__title`, 'Enter a URL');
        this.URLInputContainer = div(`${BASE_CSS_CLASS_NAME}__url-input-container`, []);
        this.downloadButtonContainer = div(`${BASE_CSS_CLASS_NAME}__download-button-container`, []);
        this.controlsContainer = div(`${BASE_CSS_CLASS_NAME}__controls-container`, [this.URLInputContainer, this.downloadButtonContainer]);

        this.URLInput = new URLInput(this.URLInputContainer);
        this.downloadButton = new DownloadUrlButton(this.downloadButtonContainer);

        this.downloadBox = div(`${BASE_CSS_CLASS_NAME} container`, [this.title, this.controlsContainer]);

        this.downloadButton.onClick = this.#onDownloadButtonClicked.bind(this);

        this.mount([this.downloadBox]);
    }

    invalidate() {
        this.URLInput.invalidate();
    }

    validate() {
        this.URLInput.validate();
    }

    async #onDownloadButtonClicked() {
        if (!this.onDownloadStart) { console.warn("Download box has no callback for when a download is started!"); return; }
            
            const urlValid = await window.downloader.validateUrl(this.URLInput.input.value);

            if (!urlValid) {
                this.URLInput.invalidate();
                return;
            }

            await this.#addNewDownload();
    }

    async #addNewDownload() {
        const url = this.URLInput.input.value;

        if (!url) { return; }

        const filePath = await window.fs.saveFileDialog();

        if (!filePath) { return; }

        const info = await window.downloader.getInfo(url);
        const downloadPromise = window.downloader.download(url, filePath);

        if (this.onDownloadStart) {
            this.onDownloadStart({ info, downloadPromise, filePath, url });
        }
    }
}