/**
 * T.W8 · CRITIQUE PASS 9 — leg 3b: the T-37 pale-wax leg, collapse-arm
 * isolated (hypothesis: the producer collapse timer arms on dock
 * enter/leave, not on load — legs 2/3 never touched the dock). Hover the
 * band once, leave, wait; then sample wax↔field. Both schemes.
 * PROBE-ONLY; lane :8680.
 */
import { chromium } from "@playwright/test";
import { appendFileSync } from "node:fs";

const BASE = "http://localhost:8680";
const OUT = "docs/tranches/T/audit/pi/w8/dock";
const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => { console.log(s); report.push(s); };

const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const wcag = (a, b) => { const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const oklabL = ([r, g, b]) => {
    const [lr, lg, lb] = [lin(r), lin(g), lin(b)];
    const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
    return 0.2104542553 * Math.cbrt(l) + 0.793617785 * Math.cbrt(m) - 0.0040720468 * Math.cbrt(s);
};
async function samplePixels(page, clip, pts) {
    const buf = await page.screenshot({ clip });
    const b64 = buf.toString("base64");
    return await page.evaluate(async ({ b64, pts, w }) => {
        const img = new Image();
        img.src = `data:image/png;base64,${b64}`;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const scale = img.naturalWidth / w;
        return pts.map(([x, y]) => { const d = ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data; return [d[0], d[1], d[2]]; });
    }, { b64, pts, w: clip.width });
}

for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
    const tag = `1440-${scheme}`;
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/?space=lab&color=lab(88%25 5 30)`);
    await page.waitForSelector(".dock-band", { timeout: 15000 });
    await page.waitForTimeout(2400);
    // arm the collapse timer: enter the dock, then leave
    const band = await page.locator(".dock-band").boundingBox();
    await page.mouse.move(band.x + band.width / 2, band.y + band.height / 2);
    await page.waitForTimeout(400);
    await page.mouse.move(720, 880);
    let sealed = false;
    for (let i = 0; i < 14; i++) {
        await page.waitForTimeout(1000);
        if (await page.locator(".dock-seal").isVisible().catch(() => false)) { sealed = true; break; }
    }
    log(`[${tag}] pale leg-3b: sealed=${sealed} (enter/leave armed)`);
    if (sealed) {
        const sb = await page.locator(".dock-seal").boundingBox();
        const cx = sb.x + sb.width / 2, cy = sb.y + sb.height / 2, r = sb.width / 2;
        const clip = { x: cx - r * 3, y: Math.max(0, cy - r * 2.2), width: r * 6, height: r * 4.4 };
        const pts = [];
        for (let i = 0; i < 8; i++) { const a = (i / 8) * 2 * Math.PI; pts.push([cx - clip.x + Math.cos(a) * r * 0.72, cy - clip.y + Math.sin(a) * r * 0.72]); }
        for (let i = 0; i < 8; i++) { const a = (i / 8) * 2 * Math.PI; pts.push([cx - clip.x + Math.cos(a) * r * 1.8, cy - clip.y + Math.sin(a) * r * 1.8]); }
        const px = await samplePixels(page, clip, pts);
        const mean = (arr) => arr.reduce((s, p) => s.map((v, k) => v + p[k] / arr.length), [0, 0, 0]).map(Math.round);
        const mw = mean(px.slice(0, 8)), mf = mean(px.slice(8));
        log(`[${tag}] T-37 PALE lab(88% 5 30): wax rgb(${mw}) L=${oklabL(mw).toFixed(3)} · field rgb(${mf}) L=${oklabL(mf).toFixed(3)} · ΔL=${Math.abs(oklabL(mw) - oklabL(mf)).toFixed(3)} · WCAG=${wcag(mw, mf).toFixed(2)}:1`);
        await page.screenshot({ path: `${OUT}/${tag}-seal-pale-zoom.png`, clip });
    }
    await page.close();
    await ctx.close();
}

appendFileSync(`${OUT}/w8-dock-probe-log.txt`, "\n\n===== LEG 3b =====\n" + report.join("\n") + "\n");
await browser.close();
console.log("DONE");
