// CHALLENGE-C probe C3 — read the LIVE paletteStops HeroBlob feeds the
// producer (via Vue dev-build `__vueParentComponent`) across a scheme flip
// with NO colour change, and force a REAL WebGL context loss on the
// atmosphere canvas via WEBGL_lose_context. Read-only.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/";
const browser = await chromium.launch();
const out = {};

// ---- 1 · paletteStops across a scheme flip (no colour change) -----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(9000);
    out.stops = await page.evaluate(async () => {
        const el = document.querySelector(".goo-blob-wrapper");
        if (!el) return { error: "no blob wrapper" };
        const inst = el.__vueParentComponent;
        const read = () => {
            const c = inst?.props?.config;
            return c ? { stops: [...c.color.paletteStops], quality: c.quality, fissionAmp: c.surface.fissionAmp, bodyRadius: c.geometry.bodyRadius } : null;
        };
        const root = document.documentElement;
        const was = root.classList.contains("dark");
        const before = read();
        root.classList.toggle("dark", !was);
        await new Promise((r) => setTimeout(r, 1500));
        const afterFlip = read();
        // now change the colour (a real activity event) and re-read
        location.hash = "#/?space=lab&color=lab(60%25+40+10)";
        await new Promise((r) => setTimeout(r, 1500));
        const afterColourChange = read();
        root.classList.toggle("dark", was);
        return {
            schemeWas: was ? "dark" : "light",
            before,
            afterFlip,
            afterColourChange,
            stopsUnchangedAcrossFlip:
                JSON.stringify(before?.stops) === JSON.stringify(afterFlip?.stops),
        };
    });
    await ctx.close();
}

// ---- 2 · a REAL atmosphere context loss, pre-b2 --------------------------
async function realLoss(atMs) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript((t) => {
        window.__diag = {};
        setTimeout(() => {
            const c = document.querySelector(".atmosphere-canvas");
            if (!c) { window.__diag.loss = "NO-CANVAS"; return; }
            let gl = null;
            for (const k of ["webgl2", "webgl", "experimental-webgl"]) {
                try { gl = c.getContext(k); } catch {}
                if (gl) { window.__diag.ctxKind = k; break; }
            }
            if (!gl) { window.__diag.loss = "NO-GL-CONTEXT"; return; }
            const ext = gl.getExtension("WEBGL_lose_context");
            if (!ext) { window.__diag.loss = "NO-EXT"; return; }
            ext.loseContext();
            window.__diag.loss = Math.round(performance.now());
        }, t);
    }, atMs);
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(15000);
    const r = await page.evaluate(() => ({
        diag: window.__diag,
        marks: performance.getEntriesByType("mark").filter((m) => m.name.startsWith("overture:")).map((m) => `${m.name}@${Math.round(m.startTime)}`),
        blobCanvasPresent: !!document.querySelector('[data-testid="goo-blob-canvas"]'),
        canvasCount: document.querySelectorAll("canvas").length,
    }));
    await ctx.close();
    return r;
}
out.realLoss_400ms = await realLoss(400);
out.realLoss_900ms = await realLoss(900);

await browser.close();
console.log(JSON.stringify(out, null, 2));
