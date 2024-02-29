import { createHtmlElementsFromHtml } from "../rainbowjs/RainbowElements.js";

export const openFolderIcon = (width = "25px", height = "25px") => createHtmlElementsFromHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 20 20"><path fill="currentColor" d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h4.5a.5.5 0 0 0 0-1H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5a.5.5 0 0 0 1 0V6a3 3 0 0 0-3-3zm2.146 5.146A.5.5 0 0 1 8.506 8H13.5a.5.5 0 0 1 0 1H9.707l6.147 6.146a.5.5 0 0 1-.708.708L9 9.707V13.5a.5.5 0 1 1-1 0V8.494a.5.5 0 0 1 .146-.348"/></svg>`)[0];