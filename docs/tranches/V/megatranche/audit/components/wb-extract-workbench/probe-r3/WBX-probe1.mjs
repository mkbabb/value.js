import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBX-out1.json";
const URL = "http://localhost:9000/#/extract";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const consoleErrors = [];
const pageErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 300)); });
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const nameless = await page.evaluate(() => {
    const vis = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    return [...document.querySelectorAll('button,[role="button"]')]
        .filter(vis)
        .filter((x) => !(x.getAttribute("aria-label") || x.getAttribute("aria-labelledby") || x.textContent.trim()))
        .map((x) => ({
            tag: x.tagName.toLowerCase(),
            title: x.getAttribute("title"),
            rect: (({ width, height }) => ({ w: Math.round(width), h: Math.round(height) }))(x.getBoundingClientRect()),
            html: x.outerHTML.slice(0, 240),
            inMain: !!x.closest("main"),
        }));
});

const taps = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return [];
    return [...main.querySelectorAll('button,[role="button"],a,input,[role="slider"],[tabindex]')]
        .map((el) => {
            const r = el.getBoundingClientRect();
            return {
                tag: el.tagName.toLowerCase(),
                role: el.getAttribute("role"),
                label: (el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent.trim()).slice(0, 34),
                w: Math.round(r.width), h: Math.round(r.height),
                tabindex: el.getAttribute("tabindex"),
            };
        })
        .filter((m) => m.w > 0 && m.h > 0);
});

const dzBefore = await page.evaluate(() => {
    const dz = document.querySelector('main [role="button"][aria-label*="image" i]');
    return dz ? { label: dz.getAttribute("aria-label"), tabindex: dz.getAttribute("tabindex") } : null;
});

const pngB64 = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 64; c.height = 64;
    const g = c.getContext("2d");
    g.fillStyle = "#c0392b"; g.fillRect(0, 0, 64, 24);
    g.fillStyle = "#2980b9"; g.fillRect(0, 24, 64, 24);
    g.fillStyle = "#27ae60"; g.fillRect(0, 48, 64, 16);
    return c.toDataURL("image/png").split(",")[1];
});
const buf = Buffer.from(pngB64, "base64");

await page.evaluate(() => {
    window.__unhandled = [];
    window.addEventListener("unhandledrejection", (e) => window.__unhandled.push(String(e.reason).slice(0, 200)));
});

await page.setInputFiles('main input[type="file"]', { name: "bands.png", mimeType: "image/png", buffer: buf });
await page.waitForTimeout(2500);

const dzAfter = await page.evaluate(() => {
    const dz = document.querySelector('main [role="button"][aria-label*="image" i]');
    if (!dz) return null;
    return {
        label: dz.getAttribute("aria-label"),
        tabindex: dz.getAttribute("tabindex"),
        cursor: getComputedStyle(dz).cursor,
    };
});

const paletteState = await page.evaluate(() => ({
    mainText: document.querySelector("main")?.innerText.slice(0, 500),
    swatches: document.querySelectorAll('main [class*="swatch"]').length,
}));

// tab walk
await page.evaluate(() => document.querySelector("main").querySelector("*").focus?.());
await page.keyboard.press("Tab");
const tabOrder = [];
for (let i = 0; i < 24; i++) {
    tabOrder.push(await page.evaluate(() => {
        const a = document.activeElement;
        if (!a) return null;
        return {
            tag: a.tagName.toLowerCase(),
            role: a.getAttribute("role"),
            label: (a.getAttribute("aria-label") || a.getAttribute("title") || a.textContent || "").trim().slice(0, 40),
            inMain: !!a.closest("main"),
        };
    }));
    await page.keyboard.press("Tab");
}

await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBX-extracted.png" });

// corrupt image
const beforeCorrupt = { errs: consoleErrors.length, page: pageErrors.length };
await page.setInputFiles('main input[type="file"]', {
    name: "corrupt.png",
    mimeType: "image/png",
    buffer: Buffer.from("\x89PNG\r\n\x1a\n-- not a real png --", "binary"),
});
await page.waitForTimeout(2500);
const corruptState = await page.evaluate(() => ({
    unhandled: window.__unhandled,
    mainText: document.querySelector("main")?.innerText.slice(0, 500),
    previewSrcPrefix: document.querySelector('main img[alt="Uploaded image"]')?.src.slice(0, 40) ?? null,
}));
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBX-corrupt.png" });

writeFileSync(OUT, JSON.stringify({ nameless, taps, dzBefore, dzAfter, tabOrder, paletteState, beforeCorrupt, corruptState, consoleErrors, pageErrors }, null, 1));
console.log("NAMELESS:", JSON.stringify(nameless, null, 1));
console.log("DZ BEFORE:", JSON.stringify(dzBefore), " AFTER:", JSON.stringify(dzAfter));
console.log("PALETTE:", JSON.stringify(paletteState, null, 1));
console.log("CORRUPT:", JSON.stringify(corruptState, null, 1));
console.log("CONSOLE:", JSON.stringify(consoleErrors, null, 1));
console.log("PAGEERR:", JSON.stringify(pageErrors, null, 1));
await b.close();
