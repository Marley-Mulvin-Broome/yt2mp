HTMLElement.prototype.applyStyles = function (styles) {
    for (const key in styles) {
        this.style[key] = styles[key];
    }
}

HTMLElement.prototype.mount = function (children)  {
    if (children === null) {
        throw new Error('Cannot mount null children');
    }

    if (children === undefined) {
        throw new Error('Cannot mount undefined children');
    }

    if (!Array.isArray(children)) {
        this.appendChild(children);
        return;
    }

    for (const child of children) {
        this.appendChild(child);
    }
}

export const createHtmlElement = (tag, attributes, children = []) => {
    const element = document.createElement(tag);

    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    for (const child of children) {
        element.appendChild(child);
    }

    return element;
};

export const createHtmlElementsFromHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html.trim();

    const children = Array.from(div.children);

    return children;
}

export const createHtmlElementFromHtml = (html) => {
    const elements = createHtmlElementsFromHtml(html);
    return elements[0];
}