import { Component } from "./components/Component.js";
import { DownloadBox } from "./components/DownloadBox.js";
import { DownloadTracker } from "./components/DownloadTracker.js";

export class App extends Component {
    constructor() {
        super(document.createElement('div'));
        this.parent.classList.add('app');

        this.downloadBox = new DownloadBox(this.parent);

        this.downloadTrackers = [];

        this.downloadBox.onDownloadStart = ({ info, filePath, url }) => {
            this.downloadTrackers.push(new DownloadTracker(this.parent, {
                title: info.title,
                url
            }));
        };

        document.body.appendChild(this.parent);
    }
}