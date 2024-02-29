import { div, h2 } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";
import { DownloadTracker } from "./DownloadTracker.js";

const BASE_CSS_CLASS_NAME = 'download-tracker-box';

export class DownloadTrackerBox extends Component {
    constructor(parent) {
        super(parent);

        this.title = h2(`${BASE_CSS_CLASS_NAME}__title`, 'Downloads');
        this.downloadsTrackerContainer = div(`${BASE_CSS_CLASS_NAME} container`, [this.title]);

        this.downloadTrackers = [];

        this.mount([this.downloadsTrackerContainer]);
    }

    addDownloadTracker(info) {
        const downloadTracker = new DownloadTracker(this.downloadsTrackerContainer, info);
        this.downloadTrackers.push(downloadTracker);
    }
}