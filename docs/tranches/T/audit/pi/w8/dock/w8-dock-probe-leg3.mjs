/**
 * T.W8 · CRITIQUE PASS 9 — leg 3: (a) the T-37 pale-wax retry with state
 * introspection; (b) the T-52 hover/focus shave state (the outer-paint arm
 * of the flush-clip forensic); (c) the Login pill zoom (Q10 accent voice);
 * (d) the ramp-token settle trace (is the near-black read a frozen
 * registered-color transition? sample the token at 0.5s intervals).
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

    // (d) ramp-token settle trace on the owner deep-link
    {
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/?space=lab&color=lab(38%25 32 24)`);
        await page.waitForSelector(".dock-band", { timeout: 15000 });
        for (let t = 0; t <= 5000; t += 1000) {
            const v = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--palettes-ramp-0").trim());
            log(`[${tag}] ramp-0 @${t}ms: ${v || "UNSET"}`);
            await page.waitForTimeout(1000);
        }
        // and on a plain load (no deep-link) for the boot-path contrast
        await page.goto(`${BASE}/`);
        await page.waitForSelector(".dock-band", { timeout: 15000 });
        await page.waitForTimeout(3000);
        const v2 = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--palettes-ramp-0").trim());
        log(`[${tag}] ramp-0 plain-load @3s: ${v2 || "UNSET"}`);
        await page.close();
    }

    // (b) T-52 hover + focus-visible shave states at the gradient view
    {
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/gradient?space=lab&color=lab(38%25 32 24)`);
        await page.waitForSelector(".dock-band", { timeout: 15000 });
        await page.waitForTimeout(2400);
        const trig = page.locator('[aria-label="Select view"]');
        await trig.hover();
        await page.waitForTimeout(500);
        const tb = await trig.boundingBox();
        await page.screenshot({ path: `${OUT}/${tag}-t52-trigger-hover-zoom.png`, clip: { x: Math.max(0, tb.x - 30), y: Math.max(0, tb.y - 30), width: tb.width + 60, height: tb.height + 60 } });
        const hoverPaint = await trig.evaluate((el) => {
            const s = getComputedStyle(el);
            const b = getComputedStyle(el, "::before");
            return { transform: s.transform, shadow: s.boxShadow.slice(0, 120), beforeShadow: b.boxShadow.slice(0, 160) };
        });
        log(`\n[${tag}] T-52 hover: transform=${hoverPaint.transform} shadow=${hoverPaint.shadow}`);
        log(`[${tag}] T-52 hover ::before shadow=${hoverPaint.beforeShadow}`);
        await page.keyboard.press("Tab"); // move focus around; then focus the trigger
        await trig.focus();
        await page.waitForTimeout(300);
        const focusPaint = await trig.evaluate((el) => {
            const s = getComputedStyle(el);
            return { outline: `${s.outlineStyle} ${s.outlineWidth} offset=${s.outlineOffset}`, shadow: s.boxShadow.slice(0, 120) };
        });
        log(`[${tag}] T-52 focus: outline=${focusPaint.outline} shadow=${focusPaint.shadow}`);
        await page.screenshot({ path: `${OUT}/${tag}-t52-trigger-focus-zoom.png`, clip: { x: Math.max(0, tb.x - 30), y: Math.max(0, tb.y - 30), width: tb.width + 60, height: tb.height + 60 } });
        await page.close();
    }

    // (c) Login pill zoom (Q10 accent voice witness)
    {
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/?space=lab&color=lab(38%25 32 24)`);
        await page.waitForSelector(".dock-band", { timeout: 15000 });
        await page.waitForTimeout(2400);
        const login = page.getByRole("button", { name: "Login" }).first();
        if (await login.isVisible().catch(() => false)) {
            const lb = await login.boundingBox();
            await page.screenshot({ path: `${OUT}/${tag}-login-zoom.png`, clip: { x: Math.max(0, lb.x - 20), y: Math.max(0, lb.y - 20), width: lb.width + 40, height: lb.height + 40 } });
            const paint = await login.evaluate((el) => {
                const s = getComputedStyle(el);
                return { border: `${s.borderStyle} ${s.borderWidth} ${s.borderColor}`.slice(0, 80), shadow: s.boxShadow.slice(0, 120), bg: s.backgroundColor };
            });
            log(`[${tag}] Login paint: ${JSON.stringify(paint)}`);
        }
        await page.close();
    }

    // (a) T-37 pale-wax retry — longer idle + collapse introspection
    {
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/?space=lab&color=lab(88%25 5 30)`);
        await page.waitForSelector(".dock-band", { timeout: 15000 });
        await page.waitForTimeout(2400);
        await page.mouse.move(720, 860);
        for (let i = 0; i < 14; i++) {
            await page.waitForTimeout(1000);
            if (await page.locator(".dock-seal").isVisible().catch(() => false)) break;
        }
        const seal = page.locator(".dock-seal");
        if (await seal.isVisible().catch(() => false)) {
            const sb = await seal.boundingBox();
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
        } else {
            const state = await page.evaluate(() => {
                const d = document.querySelector(".dock-band [class*='dock']");
                return d ? d.className.toString().slice(0, 120) : "no dock el";
            });
            log(`[${tag}] T-37 pale retry: seal never collapsed after 14s idle — dock class="${state}"`);
            await page.screenshot({ path: `${OUT}/${tag}-seal-pale-noncollapse.png` });
        }
        await page.close();
    }

    await ctx.close();
}

appendFileSync(`${OUT}/w8-dock-probe-log.txt`, "\n\n===== LEG 3 =====\n" + report.join("\n") + "\n");
await browser.close();
console.log("DONE");
