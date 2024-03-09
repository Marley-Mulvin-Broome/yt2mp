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

    #pathValid() {
        return this.downloadPathTextInput.value;
    }
    
    #validateAccept() {
        return (this.#pathValid() && this.state === 'loaded');
    }

    #onAcceptButtonClicked() {
        if (!this.#validateAccept()) { return; }

        this.state = 'accepted';
        this.destroy();

        const downloadPromise = window.downloader.download(this.url, this.downloadPathTextInput.value);

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