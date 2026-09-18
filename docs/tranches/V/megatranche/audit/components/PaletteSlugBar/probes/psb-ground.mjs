// Sample the REAL ground the slug bar would sit on, from the shipped captures,
// then compute WCAG contrast for (a) the raw cssColorOpaque pill ink and
// (b) the ring/40 focus indicator.
import { webkit } from "playwright";
import { readFileSync } from "node:fs";
const SHOTS = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/shots";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 700 } });

const sample = async (path, boxes) => {
    const file = "data:image/png;base64," + readFileSync(path).toString("base64");
    await page.goto("about:blank");
    return await page.evaluate(async ({ file, boxes }) => {
        const img = new Image();
        img.src = file;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        c.getContext("2d").drawImage(img, 0, 0);
        const ctx = c.getContext("2d");
        const lum = (r, g, b) => {
            const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
            return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const out = { dims: [img.naturalWidth, img.naturalHeight], regions: {} };
        for (const [name, [x, y, w, h]] of Object.entries(boxes)) {
            const d = ctx.getImageData(x, y, w, h).data;
            let r = 0, g = 0, b = 0, n = 0;
            const Ls = [];
            for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; Ls.push(lum(d[i], d[i + 1], d[i + 2])); }
            Ls.sort((a, z) => a - z);
            out.regions[name] = {
                mean: [Math.round(r / n), Math.round(g / n), Math.round(b / n)],
                meanL: +lum(r / n, g / n, b / n).toFixed(4),
                p10: +Ls[Math.floor(Ls.length * 0.10)].toFixed(4),
                p90: +Ls[Math.floor(Ls.length * 0.90)].toFixed(4),
            };
        }
        return out;
    }, { file, boxes });
};

// desktop-light /palettes: right (Library) pane interior, just under the search field.
const light = await sample(`${SHOTS}/safari-desktop-light/palettes.png`, {
    libraryPaneGround: [1560, 600, 700, 60],
    libraryPaneGroundLow: [1560, 900, 700, 60],
});
console.log("LIGHT /palettes", JSON.stringify(light, null, 2));

const dark = await sample(`${SHOTS}/safari-desktop-dark/palettes.png`, {
    libraryPaneGround: [1560, 600, 700, 60],
    libraryPaneGroundLow: [1560, 900, 700, 60],
});
console.log("DARK /palettes", JSON.stringify(dark, null, 2));

// contrast math
const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [hi, lo] = a > b ? [a, b] : [b, a]; return +((hi + 0.05) / (lo + 0.05)).toFixed(2); };
const over = (ink, alpha, gnd) => ink.map((v, i) => alpha * v + (1 - alpha) * gnd[i]);

const gL = light.regions.libraryPaneGround.mean;
const gD = dark.regions.libraryPaneGround.mean;
console.log("\n--- focus ring: --ring @ 40% alpha over the library pane ---");
for (const [name, ring, gnd] of [["light", [28, 25, 23], gL], ["dark", [233, 230, 226], gD]]) {
    const comp = over(ring, 0.4, gnd);
    console.log(`${name}: ring=${ring} ground=${gnd} composite=[${comp.map(Math.round)}] contrast=${ratio(lum(...comp), lum(...gnd))}:1  (WCAG 1.4.11 needs 3.0)`);
}
console.log("\n--- raw cssColorOpaque as slug-pill ink (no certification) ---");
// sweep representative live picks around the OKLCH ring at the app's own default L/C
const picks = [];
await page.goto("about:blank");
for (let h = 0; h < 360; h += 30) picks.push(`oklch(0.72 0.15 ${h})`);
const resolved = await page.evaluate((cols) => cols.map((c) => { const d = document.createElement("div"); d.style.color = c; document.body.appendChild(d); const v = getComputedStyle(d).color; d.remove(); return [c, v]; }), picks);
let fails = 0;
for (const [css, rgbs] of resolved) {
    const m = rgbs.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
    const cL = ratio(lum(...m), lum(...gL));
    const cD = ratio(lum(...m), lum(...gD));
    if (cL < 4.5) fails++;
    console.log(`${css.padEnd(24)} rgb(${m.map(Math.round)})  light=${cL}:1  dark=${cD}:1`);
}
console.log(`picks below 4.5:1 on the light library pane: ${fails}/${resolved.length}`);
await browser.close();
