import { span } from "../rainbowjs/HtmlTags.js";
import { Component } from "./Component.js";

export class Loader extends Component {
    constructor(parent) {
        super(parent);

        this.loader = span('loader', '');

        this.mount([this.loader]);
    }

    destroy() {
        this.loader.remove();
    }

    replace(target) {
        this.loader.replaceWith(target);
    }

    appendBefore(target) {
        this.loader.before(target);
    }
}