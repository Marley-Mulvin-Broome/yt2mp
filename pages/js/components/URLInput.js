import { Component } from "./Component.js";

export class URLInput extends Component {
    constructor(parent) {
        super(parent);
        this.input = document.createElement('input');
        this.input.type = 'url';
        this.input.placeholder = 'Enter a URL';

        this.mount([this.input]);
    }
}