// X.W7L.i — L8: the certified-ink instrument runs to completion on every plate
// (served :9000, headed, 1440). Two legs per scheme:
//  (a) the app's own instrument across the scenes and the URL colour that
//      crashed at 10.1.0 — 0 `contrast_unreachable` / 0 failed scene loads;
//  (b) the live instrument driven directly on EVERY plate (page, resting,
//      floating, chrome, veil, well) across an ambient sweep × picks, with the
//      live-probed tints — every call completes and clears the floor.
// Usage: node i-L8-instrument-run.mjs <light|dark> <out.json> [shotPrefix]
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [scheme = "light", out = "/dev/stdout", shotPrefix] = process.argv.slice(2);
const BASE = "http://localhost:9000/";
const REPO = "/Users/mkbabb/Programming/value.js";
const ROUTES = ["", "#/?space=oklch&color=" + encodeURIComponent("oklch(0.55 0.18 260)"), "#/atmosphere", "#/extract",
    "#/gradient", "#/mix", "#/generate", "#/palettes", "#/blob", "#/?color=" + encodeURIComponent("oklch(0.51 0.13 32)")];
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
const routes = [];
for (const r of ROUTES) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message.slice(0, 200)));
    page.on("console", (m) => { if (m.type() === "error" && !/MISCONFIGURED|Failed to load resource|CORS|net::/.test(m.text())) errs.push(m.text().slice(0, 200)); });
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const sceneFail = await page.getByText("could not be loaded").count();
    const ink = errs.filter((e) => /contrast_unreachable|Ink certification/.test(e));
    routes.push({ route: r || "/", inkErrors: ink.length, sceneFail, otherErrors: errs.filter((e) => !ink.includes(e)).slice(0, 4),
        accentLive: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim()),
        inkMuted: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ink-muted").trim()),
        ambient: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ink-ambient-l").trim()) });
    if (shotPrefix && (r === "" || r.startsWith("#/?space"))) await page.screenshot({ path: `${shotPrefix}-${r === "" ? "home" : "urlblue"}.png` });
    await page.close();
}
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const plates = await page.evaluate(async (repo) => {
    const live = await import(`/@fs${repo}/demo/color-session/useContrastSafeColor.ts`);
    const ink = await import(`/@fs${repo}/demo/color-session/ink.ts`);
    const dark = document.documentElement.classList.contains("dark");
    const picks = ["oklch(0.55 0.18 260)", "oklch(0.51 0.13 32)", "lab(50% 0 0)", "lab(96% 0 0)", "oklch(0.62 0.2725 9.8)"];
    const res = {};
    for (const surface of ["page", "resting", "floating", "chrome", "veil", "well"]) {
        let calls = 0, completed = 0, threw = [];
        for (let i = 0; i <= 20; i++) {
            const a = i / 20;
            const L = live.resolveSurfaceLightnessLive(surface, a, dark);
            for (const p of picks) { calls++; try { ink.certifyAccentInk(p, L); completed++; } catch (e) { threw.push(`${p}@${a}: ${e.message}`); } }
            calls++; try { ink.resolveMutedInk(L, dark); completed++; } catch (e) { threw.push(`muted@${a}: ${e.message}`); }
        }
        res[surface] = { calls, completed, threw: threw.slice(0, 3), L_at_05: +live.resolveSurfaceLightnessLive(surface, 0.5, dark).toFixed(4) };
    }
    return { dark, res };
}, REPO);
await browser.close();
writeFileSync(out, JSON.stringify({ scheme, at: new Date().toISOString(), routes, plates }, null, 1));
