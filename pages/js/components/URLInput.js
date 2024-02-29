import { Component } from "./Component.js";

const BASE_CSS_CLASS_NAME = 'url-input';
const INVALID_CSS_CLASS_NAME = `${BASE_CSS_CLASS_NAME}__invalid`;

export class URLInput extends Component {
    constructor(parent) {
        super(parent);
        this.input = document.createElement('input');
        this.input.type = 'url';
        this.input.placeholder = 'Enter a URL';
        this.input.classList.add(BASE_CSS_CLASS_NAME);

        this.mount([this.input]);
    }

    invalidate() {
        this.input.classList.add(INVALID_CSS_CLASS_NAME);
    }

    validate() {
        this.input.classList.remove(INVALID_CSS_CLASS_NAME);
    }
}