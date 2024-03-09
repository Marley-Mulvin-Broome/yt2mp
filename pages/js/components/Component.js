export class Component {
    parent;

    /**
     * 
     * @param {HTMLElement} parent 
     */
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * 
     * @param {HTMLElement[]} children 
     */
    mount(children) 
    {
        if (this.parent === null) {
            throw new Error('Cannot mount to null parent');
        }

        for (const child of children) {
            this.parent.appendChild(child);
        }
    }

    destroy() {
        throw new Error('Component.destroy(): Not implemented');
    }

    replace(target) {
        throw new Error('Component.replace(): Not implemented');
    }

    appendBefore(target) {
        throw new Error('Component.appendBefore(): Not implemented');
    }
}