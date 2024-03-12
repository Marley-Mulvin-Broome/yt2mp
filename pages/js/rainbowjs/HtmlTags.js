import { createHtmlElement } from './RainbowElements.js';

export const inputType = {
    url: 'url',
    text: 'text',
    password: 'password',
};

/**
 * 
 * @param {string} classNames 
 * @param {HTMLElement[]} children 
 * @returns {HTMLElement}
 */
export const div = (classNames, children=[]) => {
    return createHtmlElement('div', { class: classNames }, children);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const h1 = (classNames, text) => {
    return createHtmlElement('h1', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const h2 = (classNames, text) => {
    return createHtmlElement('h2', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const h3 = (classNames, text) => {
    return createHtmlElement('h3', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const h4 = (classNames, text) => {
    return createHtmlElement('h4', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const h5 = (classNames, text) => {
    return createHtmlElement('h5', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const h6 = (classNames, text) => {
    return createHtmlElement('h6', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
export const p = (classNames, text) => {
    return createHtmlElement('p', { class: classNames }, [document.createTextNode(text)]);
}

/**
 * 
 * @param {string} classNames 
 * @param {string} text 
 * @returns {HTMLElement}
 */
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

/**
 * 
 * @param {string} classNames 
 * @param {string} type 
 * @param {string} placeholder 
 * @returns {HTMLElement}
 */
export const input = (classNames, type, placeholder="none") => {
    return createHtmlElement('input', { class: classNames, type }, [document.createTextNode(placeholder)]);
}

export const button = (classNames, text, children = []) => {
    return createHtmlElement('button', { class: classNames }, [document.createTextNode(text), ...children]);
}

export const progress = (classNames, value, max) => {
    return createHtmlElement('progress', { class: classNames
        , value, max });
}