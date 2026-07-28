// Raw `cssColorOpaque` as slug-pill ink vs the certified path.
// Grounds are MEASURED from the shipped /palettes captures (see psb-ground.mjs).
import { webkit } from "playwright";
const browser = await webkit.launch();
const page = await browser.newPage();
await page.goto("about:blank");

const GROUND_LIGHT = [228, 218, 210];
const GROUND_DARK = [74, 62, 54];

const res = await page.evaluate(({ gL, gD }) => {
    const c = document.createElement("canvas"); c.width = c.height = 1;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const resolve = (css) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
    const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const ratio = (a, b) => { const [hi, lo] = a > b ? [a, b] : [b, a]; return +((hi + 0.05) / (lo + 0.05)).toFixed(2); };
    const rows = [];
    // full live gamut sweep at the picker's own operating band
    for (const L of [0.45, 0.6, 0.72, 0.85]) {
        for (let h = 0; h < 360; h += 45) {
            const css = `oklch(${L} 0.15 ${h})`;
            const rgb = resolve(css);
            rows.push({ css, rgb, light: ratio(lum(...rgb), lum(...gL)), dark: ratio(lum(...rgb), lum(...gD)) });
        }
    }
    return rows;
}, { gL: GROUND_LIGHT, gD: GROUND_DARK });

let failL = 0, failD = 0, failBoth3 = 0;
for (const r of res) {
    if (r.light < 4.5) failL++;
    if (r.dark < 4.5) failD++;
    if (r.light < 3 || r.dark < 3) failBoth3++;
    console.log(`${r.css.padEnd(22)} rgb(${r.rgb.join(",").padEnd(12)})  light=${String(r.light).padStart(6)}:1  dark=${String(r.dark).padStart(6)}:1`);
}
console.log(`\nn=${res.length}`);
console.log(`below 4.5:1 (WCAG AA text) on the LIGHT library pane: ${failL}/${res.length} = ${(100 * failL / res.length).toFixed(0)}%`);
console.log(`below 4.5:1 on the DARK library pane: ${failD}/${res.length} = ${(100 * failD / res.length).toFixed(0)}%`);
console.log(`below 3.0:1 (WCAG 1.4.11 border/non-text) in EITHER scheme: ${failBoth3}/${res.length} = ${(100 * failBoth3 / res.length).toFixed(0)}%`);
await browser.close();
