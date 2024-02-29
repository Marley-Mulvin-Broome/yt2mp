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
        
        this.downloadsTrackerBox.addDownloadTracker({
            title: "Long nice beautiful title",
            thumbnail: "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1",
            url: "https://www.youtube.com/watch?v=r0aiYNir5Uc",
        });

        this.downloadsTrackerBox.addDownloadTracker({
            title: "Long nice beautiful title",
            thumbnail: "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1",
            url: "https://www.youtube.com/watch?v=r0aiYNir5Uc",
        });

        this.downloadsTrackerBox.addDownloadTracker({
            title: "Long nice beautiful title",
            thumbnail: "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1",
            url: "https://www.youtube.com/watch?v=r0aiYNir5Uc",
        });

        document.body.appendChild(this.parent);
    }
}