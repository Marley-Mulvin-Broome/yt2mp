import { Component } from "./Component.js";

export class DownloadTracker extends Component {
    constructor(parent, props) {
        super(parent);

        this.downloadTitle = document.createElement('h3');
        this.downloadTitle.textContent = props.title;
        this.url = props.url;
        this.progress = document.createElement('progress');

        window.downloader.onDownloadProgress(({ progress, url }) => {
            if (url !== this.url) { return; }
            
            this.progress.value = progress;
        });

        this.mount([this.downloadTitle, this.progress]);
    }
}