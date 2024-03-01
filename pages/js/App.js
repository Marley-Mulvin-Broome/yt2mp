import { Component } from "./components/Component.js";
import { DownloadBox } from "./components/DownloadBox.js";
import { DownloadTracker } from "./components/DownloadTracker.js";
import { DownloadTrackerBox } from "./components/DownloadTrackerBox.js";

const BASE_CSS_CLASS_NAME = 'app';

export class App extends Component {
    constructor() {
        super(document.createElement('div'));
        this.parent.classList.add('app');

        this.title = document.createElement('h1');
        this.title.innerText = 'YT2MP ';
        this.title.classList.add(`${BASE_CSS_CLASS_NAME}__title`);

        this.mount([this.title]);


        this.downloadBox = new DownloadBox(this.parent);
        this.downloadsTrackerBox = new DownloadTrackerBox(this.parent);

        this.downloadBox.onDownloadStart = this.#onDownloadStart.bind(this);

        document.body.appendChild(this.parent);
    }

    async #onDownloadStart({ info, filePath, url }) {
        this.downloadsTrackerBox.addDownloadTracker({
            title: info.title,
            thumbnail: info.thumbnail,
            url,
            filePath
        });
    }
}