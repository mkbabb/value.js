// X-DS keyframes pass 1, critic C1 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames). Headless real Chrome only (COHESION §0ei). Run from anywhere with
// the keyframes dev server on :5173:  node c1-probe.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

let chromium;
for (const root of ["/Users/mkbabb/Programming/keyframes.js", "/Users/mkbabb/Programming/value.js"])
    for (const pkg of ["playwright", "playwright-core", "@playwright/test"])
        try { chromium ??= createRequire(root + "/package.json")(pkg).chromium; } catch {}

const OUT = process.argv[2] ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 5000);
const KEY = "animation-groups-control-options-store";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const shot = async (page, name, clipSel) => {
    const file = path.join(OUT, `${name}.png`);
    if (clipSel) {
        const box = await page.locator(clipSel).first().boundingBox();
        if (box) {
            const pad = 16;
            await page.screenshot({ path: file, clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + 2 * pad, height: box.height + 2 * pad } });
            return;
        }
    }
    await page.screenshot({ path: file });
};
const setSurface = (page, scene, control) =>
    page.evaluate(([k, scene, control]) => {
        const s = JSON.parse(localStorage.getItem(k) ?? "{}");
        s[scene] = { ...(s[scene] ?? {}), selectedControl: control };
        localStorage.setItem(k, JSON.stringify(s));
    }, [KEY, scene, control]);

try {
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        await shot(page, `zoom-card-${scheme}`, ".pane-frame");

        // KF-C1-03/04 — the preview toggle: its name, pressed state, and the
        // hidden row's height.
        const eye = page.locator('button[aria-label="Ball preview"]').first();
        const before = await eye.getAttribute("aria-pressed");
        const rowShown = await page.locator(".preview-toggle").first().boundingBox();
        await eye.click();
        await page.waitForTimeout(900);
        const after = await eye.getAttribute("aria-pressed");
        const rowHidden = await page.locator(".preview-toggle").first().boundingBox();
        report[`preview-${scheme}`] = { pressedShown: before, pressedHidden: after, rowShownH: rowShown?.height, rowHiddenH: rowHidden?.height };
        await shot(page, `cube-preview-hidden-${scheme}`, ".pane-frame");
        await eye.click();
        await page.waitForTimeout(900);

        // KF-C1-05/-11 — the easing field and its popover.
        await page.locator("button:has(svg.curve-glyph)").first().click();
        await page.waitForTimeout(900);
        await shot(page, `cube-easing-popover-${scheme}`);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);

        // KF-C1-16/-19 — the Timeline and Keyframes surfaces of the cube.
        for (const control of ["timeline", "keyframes"]) {
            await setSurface(page, "cube", control);
            await page.reload({ waitUntil: "load" });
            await page.waitForTimeout(SETTLE);
            await shot(page, `${control}-cube-1440-${scheme}`);
        }
        await setSurface(page, "cube", "controls");
        await ctx.close();

        // KF-C1-08 — the phone drawer: one plate.
        const m = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
        const mp = await m.newPage();
        await mp.goto(`${BASE}#/cube`, { waitUntil: "load" });
        await mp.waitForTimeout(SETTLE);
        await shot(mp, `zoom-390-${scheme}`, ".controls-drawer-content");
        await m.close();
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "c1-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
