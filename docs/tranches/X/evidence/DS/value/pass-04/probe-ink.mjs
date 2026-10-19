// X-DS value pass 4 · cure probe — headless real Chrome only (§0ei).
// For each named text element: its painted ink (computed color, resolved
// through a canvas) against its painted GROUND (the element's box screenshotted
// with its own text made transparent, mean pixel). WCAG ratio per cell.
// usage: node probe-ink.mjs [--base http://localhost:9000] > probe-ink.json
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const args = process.argv.slice(2);
const BASE = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:9000";
const brick = "?space=lab&color=" + encodeURIComponent("lab(38% 32 24)");
const CELLS = {
    "/": [["readout integer", ".fig-int"], ["readout frac", ".fig-frac"], ["about title", ".about-card .pane-header-title"], ["about caption", ".about-card .pane-header-desc"], ["my palettes empty", "text=No saved palettes yet."]],
    "/extract": [["extract title", "[data-pane] .pane-header-title"], ["extract caption", "[data-pane] .pane-header-desc"], ["open camera", "button:has-text('Open camera')"], ["colors label", "label:has-text('Colors'), span:has-text('Colors')"]],
    "/gradient": [["gradient title", ".pane-header-title"], ["code number", ".code-editor .hljs-number"], ["code ink", ".code-editor"]],
    "/atmosphere": [["copy json", "button:has-text('Copy JSON')"], ["reset", "button:has-text('Reset')"], ["section head", ".config-section-title"]],
    "/palettes": [["delete all", "button:has-text('Delete all')"], ["new palette", "text=Start a new palette"]],
};
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const out = [];
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const theme of ["light", "dark"]) for (const color of ["default", "brick"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    const page = await ctx.newPage();
    for (const [route, cells] of Object.entries(CELLS)) {
        await page.goto(BASE + "/#" + route + (color === "brick" ? brick : ""), { waitUntil: "load" });
        await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 120000 });
        await page.waitForTimeout(4500);
        for (const [name, sel] of cells) {
            const loc = page.locator(sel).first();
            if (!(await loc.count()) || !(await loc.isVisible())) { out.push({ theme, color, route, name, missing: true }); continue; }
            const ink = await loc.evaluate((el) => {
                const cv = document.createElement("canvas"); cv.width = cv.height = 1;
                const c = cv.getContext("2d"); c.fillStyle = "#fff"; c.fillRect(0, 0, 1, 1);
                c.fillStyle = getComputedStyle(el).color; c.fillRect(0, 0, 1, 1);
                const d = c.getImageData(0, 0, 1, 1).data; el.dataset.probeColor = el.style.color;
                el.style.setProperty("color", "transparent", "important");
                el.querySelectorAll("*").forEach((k) => k.style.setProperty("color", "transparent", "important"));
                el.querySelectorAll("svg").forEach((k) => k.style.setProperty("visibility", "hidden", "important"));
                return [d[0], d[1], d[2]];
            });
            await page.waitForTimeout(150);
            const buf = await loc.screenshot();
            const ground = await page.evaluate(async (b64) => {
                const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
                const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
                const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
                const d = c.getImageData(0, 0, cv.width, cv.height).data;
                let r = 0, g = 0, b = 0, n = 0;
                for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
                return [r / n, g / n, b / n].map(Math.round);
            }, buf.toString("base64"));
            await loc.evaluate((el) => { el.style.removeProperty("color"); el.querySelectorAll("*").forEach((k) => { k.style.removeProperty("color"); k.style.removeProperty("visibility"); }); });
            out.push({ theme, color, route, name, ink, ground, ratio: +ratio(ink, ground).toFixed(2) });
        }
    }
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
for (const r of out) console.error(`${r.theme.padEnd(5)} ${r.color.padEnd(7)} ${r.route.padEnd(11)} ${r.name.padEnd(18)} ${r.missing ? "MISSING" : r.ratio + "  ink " + r.ink + " ground " + r.ground}`);
