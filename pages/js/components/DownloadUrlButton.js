import { Component } from "./Component.js";

export class DownloadUrlButton extends Component {
    onClick;

    constructor(parent) {
        super(parent);
        this.button = document.createElement('button');
        this.button.textContent = 'Download';
        this.button.disabled = false;

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