/**
 * The child process that renders the first-view shell (X.W11.p3). It owns the
 * DOM globals the demo's browser-only modules read at import time (the hash
 * router reads `location`; stores read `localStorage`), so the build process
 * itself is never polluted with them. The document is a fresh first visit to
 * the deployed origin at `/`: no stored seed, no URL seed, motion allowed — the
 * exact condition index.html's fouc-guard requires before the client hydrates.
 *
 * Usage: node scripts/build/render-shell.mjs <ssr bundle> → JSON on stdout.
 */
import { JSDOM } from "jsdom";
import { pathToFileURL } from "node:url";

const dom = new JSDOM(
    '<!doctype html><html><head></head><body><div id="app"></div></body></html>',
    {
        url: "https://color.babb.dev/",
        pretendToBeVisual: true,
    },
);
const { window } = dom;
window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
});

// Node carries its own `navigator` and (unconfigured) Web Storage globals; the
// render reads the document's, so those three are the window's too.
const OWNED_BY_THE_DOCUMENT = new Set(["navigator", "localStorage", "sessionStorage"]);
for (const key of Object.getOwnPropertyNames(window)) {
    if (key in globalThis && !OWNED_BY_THE_DOCUMENT.has(key)) continue;
    Object.defineProperty(globalThis, key, {
        configurable: true,
        get: () => window[key],
    });
}

const { renderShell } = await import(pathToFileURL(process.argv[2]).href);
const rendered = await renderShell();
process.stdout.write(JSON.stringify(rendered));
window.close();
