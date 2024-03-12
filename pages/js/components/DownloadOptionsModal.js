import { button, div, h2, img, input, inputType, p } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";
import { Loader } from "./Loader.js";

const BASE_CSS_CLASS_NAME = 'download-options-modal';

export class DownloadOptionsModal extends Component {
    state;
    onAccept;
    info;

    constructor(parent, url) {
        super(parent);

        this.state = 'loading';

        this.url = url;

        this.modalTitle = h2(`${BASE_CSS_CLASS_NAME}__title`, 'Download YouTube Video');
        this.modalCloseButton = button(`${BASE_CSS_CLASS_NAME}__close-button`, 'X');
        this.modalCloseButton.onclick = this.#onCloseButtonClicked.bind(this);
        
        this.modalTitlebar = div(`${BASE_CSS_CLASS_NAME}__titlebar`, [this.modalTitle, this.modalCloseButton]);
        
        this.modalBody = div(`${BASE_CSS_CLASS_NAME}__body`, []);
        this.modalLoading = new Loader(this.modalBody);


        this.downloadPathTextInput = input(`${BASE_CSS_CLASS_NAME}__download-path-input`, inputType.text);
        this.downloadPathButton = button(`${BASE_CSS_CLASS_NAME}__download-path-button`, 'Browse');
        this.downloadPathButton.onclick = this.#fileDialog.bind(this);
        this.downloadPathInputContainer = div(`${BASE_CSS_CLASS_NAME}__download-path-input-container`, [this.downloadPathTextInput, this.downloadPathButton]);

        this.modalBody.appendChild(this.downloadPathInputContainer);
    
        this.modalAcceptButton = button(`${BASE_CSS_CLASS_NAME}__accept-button`, 'Download');
        this.modalFooter = div(`${BASE_CSS_CLASS_NAME}__footer`, [this.modalAcceptButton]);

        this.modal = div(`${BASE_CSS_CLASS_NAME}`, [
            this.modalTitlebar, 
            this.modalBody,
            this.modalFooter]
            );

        this.background = div(`${BASE_CSS_CLASS_NAME}__background`, [this.modal]);

        this.mount([this.background]);

        this.modalCloseButton.onclick = this.#onCloseButtonClicked.bind(this);
        this.modalAcceptButton.onclick = this.#onAcceptButtonClicked.bind(this);

        this.#loadInfo();

        window.userPreferences.get('downloadPath').then((downloadPath) => {
            this.downloadPathTextInput.value = downloadPath;
            console.log(downloadPath);
        });
    }

    destroy() {
        this.background.remove();
    }

    async #loadInfo() {
        this.info = await window.downloader.getInfo(this.url);
        this.state = 'loaded';
        this.modalTitle.textContent = this.modalTitle.textContent + ": " + this.info.title;
        
        this.modalLoading.appendBefore(p(`${BASE_CSS_CLASS_NAME}__info`, `${this.info.title}`));
        this.modalLoading.replace(img(`${BASE_CSS_CLASS_NAME}__thumbnail`, this.info.thumbnailUrl, 'Thumbnail'));

        this.modalLoading.destroy();
        this.modalLoading = null;
    }

    async #fileDialog() {
        const filePath = await window.fs.saveFileDialog();

        if (!filePath) { return; }

        this.downloadPathTextInput.value = filePath;
    }

    #onCloseButtonClicked() {
        this.state = 'closed';
        this.destroy();
    }

    #invalidate() {
        alert('Invalid download path');
    }
    
    get #upperDirectory() {
        return this.downloadPathTextInput.value.split('/').slice(0, -1).join('/');
    }

    get #pathHasExtension() {
        const path = this.downloadPathTextInput.value;

        return path.endsWith('.mp4') || path.endsWith('.mp3');
    }

    async #pathValid() {
        const path = this.downloadPathTextInput.value;

        const hasExtension = this.#pathHasExtension;
        const parentDirectoryExists = await window.fs.pathExists(this.#upperDirectory);

        console.log("Validating path for download: " + path);
        console.log("Path has extension: " + hasExtension);
        console.log("Parent directory exists: " + parentDirectoryExists);

        return hasExtension && parentDirectoryExists;
    }
    
    async #validateAccept() {
        return (await this.#pathValid() && this.state === 'loaded');
    }

    async #onAcceptButtonClicked() {
        const valid = await this.#validateAccept();

        if (!valid) { this.#invalidate(); return; }

        this.state = 'accepted';
        this.destroy();

        console.log("Setting user preferences for download path: " + this.#upperDirectory);

        window.userPreferences.set('downloadPath', this.#upperDirectory);


        const downloadPromise = window.downloader.download(
            this.url, 
            this.downloadPathTextInput.value, 
            { video: true, audio: true }
        );

        this.onAccept(
            {
                info: this.info,
                filePath: this.downloadPathTextInput.value,
                url: this.url,
                downloadPromise
            }
        );
    }
}