import { Component } from "./components/Component.js";
import { DownloadBox } from "./components/DownloadBox.js";
import { DownloadTrackerBox } from "./components/DownloadTrackerBox.js";
import { Loader } from "./components/Loader.js";
import { div, h1 } from "./rainbowjs/HtmlTags.js";

const BASE_CSS_CLASS_NAME = 'app';

export class App extends Component {
    constructor() {
        super(div(BASE_CSS_CLASS_NAME));

        this.title = h1(`${BASE_CSS_CLASS_NAME}__title`, 'YT2MP');

        this.mount([this.title]);


        this.downloadBox = new DownloadBox(this.parent);
        this.downloadsTrackerBox = new DownloadTrackerBox(this.parent);

        this.downloadBox.onDownloadStart = this.#onDownloadStart.bind(this);

        document.body.appendChild(this.parent);
    }

    async #onDownloadStart({ info, filePath, url, downloadPromise }) {
        this.downloadsTrackerBox.addDownloadTracker({
            title: info.title,
            thumbnail: info.thumbnailUrl,
            url,
            filePath,
            downloadPromise
        });
    }
}