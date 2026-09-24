// X.F.W14U.c1 — frames (1440 light/dark) + the contrast table, headed Chromium.
// usage: node capture.mjs <phase> <outdir>
import { createRequire } from "node:module";
import * as fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("@playwright/test");

const [phase, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const SLUG = process.env.SLUG ?? "stormy-starting-nectar-bison";
const browser = await chromium.launch({ headless: false });
const table = {};
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:3100/v/${SLUG}`);
    const side = page.locator(".viz-panel-left-wrap");
    await side.waitFor({ state: "visible", timeout: 60000 });
    await page.waitForTimeout(2500);
    // Chebyshev on as well, so two basis tints read in one frame (local state).
    await side.getByRole("group", { name: "Polynomial bases" }).getByText("Chebyshev").click();
    await page.waitForTimeout(800);
    const dec = side.locator('[data-slot="configurator-layer"]', { hasText: "Decomposition" }).first();
    await dec.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${out}/${phase}-decomposition-1440-${scheme}.png` });
    await side.locator('[data-slot="configurator-layer-trigger"]', { hasText: "Contour" }).click();
    await page.waitForTimeout(400);
    await side.getByRole("button", { name: "Advanced" }).click();
    await page.waitForTimeout(700);
    await side.locator('[data-slot="configurator-layer"]', { hasText: "Contour" }).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${phase}-contour-1440-${scheme}.png` });

    table[scheme] = await side.evaluate((root) => {
        const cvs = document.createElement("canvas");
        cvs.width = cvs.height = 1;
        const c = cvs.getContext("2d", { willReadFrequently: true });
        const probe = document.createElement("span");
        root.appendChild(probe);
        const used = (css) => { probe.style.color = ""; probe.style.color = css; return getComputedStyle(probe).color; };
        /** Composite a stack of CSS colours (bottom first) to opaque 8-bit rgb. */
        const stack = (colors) => {
            c.clearRect(0, 0, 1, 1);
            c.fillStyle = "#fff"; c.fillRect(0, 0, 1, 1);
            for (const col of colors) { c.fillStyle = col; c.fillRect(0, 0, 1, 1); }
            return [...c.getImageData(0, 0, 1, 1).data.slice(0, 3)];
        };
        const lum = ([r, g, b]) => {
            const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
            return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const ratio = (a, b) => { const x = lum(a), y = lum(b); return +(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2)); };
        /** The background stack from <html> down to el (inclusive). */
        const bgChain = (el) => {
            const chain = [];
            for (let n = el; n && n.nodeType === 1; n = n.parentElement) chain.unshift(getComputedStyle(n).backgroundColor);
            return chain;
        };
        const rows = [];
        for (const el of root.querySelectorAll('[data-slot="toggle-group-item"]')) {
            const label = el.textContent.trim().replace(/\s+/g, " ");
            const surface = stack(bgChain(el));
            const ink = stack([...bgChain(el), getComputedStyle(el).color]);
            rows.push({ kind: "chip", label, state: el.dataset.state, ink: ratio(ink, surface), need: 4.5 });
        }
        for (const el of root.querySelectorAll('[style*="--row-fill"]')) {
            const label = el.closest("[data-control-row]")?.querySelector("[data-row-label]")?.textContent?.trim();
            const chain = bgChain(el.parentElement);
            const surface = stack(chain);
            const fill = stack([...chain, used(el.style.getPropertyValue("--track-color").trim())]);
            const rest = stack([...chain, used("var(--muted-medium)")]);
            rows.push({ kind: "slider", label, fillVsSurface: ratio(fill, surface), fillVsTrack: ratio(fill, rest), need: 3 });
        }
        probe.remove();
        return rows;
    });
    await ctx.close();
}
await browser.close();
fs.writeFileSync(`${out}/${phase}-contrast.json`, JSON.stringify(table, null, 2));
console.log(JSON.stringify(table, null, 1));
