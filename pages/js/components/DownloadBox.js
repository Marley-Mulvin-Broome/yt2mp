import { Component } from "./Component.js";
import { DownloadUrlButton } from "./DownloadUrlButton.js";
import { URLInput } from "./URLInput.js";

export class DownloadBox extends Component {
    onDownloadStart;

    constructor(parent) {
        super(parent);
        this.downloadBox = document.createElement('div');
        this.downloadBox.classList.add('download-box');
        this.URLInput = new URLInput(this.downloadBox);
        this.downloadButton = new DownloadUrlButton(this.downloadBox);

        this.downloadButton.onClick = async () => {
            await this.#addNewDownload();
        }; 

        this.mount([this.downloadBox]);
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