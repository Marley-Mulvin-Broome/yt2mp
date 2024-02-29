import { createHtmlElement } from './RainbowElements.js';

export const inputType = {
    url: 'url',
    text: 'text',
    password: 'password',
};

export const div = (classNames, children=[]) => {
    return createHtmlElement('div', { class: classNames }, children);
}

export const h1 = (classNames, text) => {
    return createHtmlElement('h1', { class: classNames }, [document.createTextNode(text)]);
}

export const h2 = (classNames, text) => {
    return createHtmlElement('h2', { class: classNames }, [document.createTextNode(text)]);
}

export const h3 = (classNames, text) => {
    return createHtmlElement('h3', { class: classNames }, [document.createTextNode(text)]);
}

export const h4 = (classNames, text) => {
    return createHtmlElement('h4', { class: classNames }, [document.createTextNode(text)]);
}

export const h5 = (classNames, text) => {
    return createHtmlElement('h5', { class: classNames }, [document.createTextNode(text)]);
}

export const h6 = (classNames, text) => {
    return createHtmlElement('h6', { class: classNames }, [document.createTextNode(text)]);
}

export const p = (classNames, text) => {
    return createHtmlElement('p', { class: classNames }, [document.createTextNode(text)]);
}

export const span = (classNames, text) => {
    return createHtmlElement('span', { class: classNames
        }, [document.createTextNode(text)]);
}

export const a = (classNames, href, text) => {
    return createHtmlElement('a', { class: classNames, href }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames class attribute of the element
 * @param {string} src link to the image
 * @param {string} alt alternative text for the image
 * @param {string} width width of the image
 * @param {string} height height of the image
 * @returns {HTMLElement}
 */
export const img = (classNames, src, alt, width = "", height = "") => {
    return createHtmlElement('img', { class: classNames
        , src, alt, width, height });
}

export const ul = (classNames, children=[]) => {
    return createHtmlElement('ul', { class: classNames }, children);
}

export const ol = (classNames, children=[]) => {
    return createHtmlElement('ol', { class: classNames }, children);
}

export const li = (classNames, text) => {
    return createHtmlElement('li', { class: classNames }, [document.createTextNode(text)]);
}

export const input = (classNames, type, placeholder="none") => {
    return createHtmlElement('input', { class: classNames, type }, [document.createTextNode(placeholder)]);
}

export const button = (classNames, text) => {
    return createHtmlElement('button', { class: classNames }, [document.createTextNode(text)]);
}

export const progress = (classNames, value, max) => {
    return createHtmlElement('progress', { class: classNames
        , value, max });
}