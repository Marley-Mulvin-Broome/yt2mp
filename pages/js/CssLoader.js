export const loadCss = (sources) => {
    for (const source of sources) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = source;
        document.head.appendChild(link);
    }
}