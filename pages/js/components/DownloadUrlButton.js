import { button } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";

const BASE_CSS_CLASS_NAME = 'download-url-button';

export class DownloadUrlButton extends Component {
    onClick;

    constructor(parent) {
        super(parent);
        this.button = button(`${BASE_CSS_CLASS_NAME}`, "Download");

        this.button.addEventListener('click', async () => {
            if (this.onClick) {
                await this.onClick();
            }
        });

        this.mount([this.button]);
    }

    enable() {
        this.button.disabled = false;
    }

    disable() {
        this.button.disabled = true;
    }
}