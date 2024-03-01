import { createHtmlElementFromHtml } from "../rainbowjs/RainbowElements.js";

export const openFolderIcon = (width = "25px", height = "25px", colour = "currentColor") => createHtmlElementFromHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 20 20"><path fill="${colour}" d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h4.5a.5.5 0 0 0 0-1H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5a.5.5 0 0 0 1 0V6a3 3 0 0 0-3-3zm2.146 5.146A.5.5 0 0 1 8.506 8H13.5a.5.5 0 0 1 0 1H9.707l6.147 6.146a.5.5 0 0 1-.708.708L9 9.707V13.5a.5.5 0 1 1-1 0V8.494a.5.5 0 0 1 .146-.348"/></svg>`);

export const tickIcon = (width = "25px", height = "25px", colour = "currentColour") => createHtmlElementFromHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24">
<path fill="${colour}" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
</svg>`);

export const trashIcon = (width = "25px", height = "25px", colour = "currentColour") => createHtmlElementFromHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 20 20">
<path fill="${colour}" d="M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1zM5.741 15.23A2 2 0 0 0 7.728 17h4.544a2 2 0 0 0 1.987-1.77L15.439 5H4.561zM8.5 7.5A.5.5 0 0 1 9 8v6a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
</svg>`);