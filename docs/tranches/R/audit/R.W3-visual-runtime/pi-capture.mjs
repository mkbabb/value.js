#!/usr/bin/env node
// π visual-runtime capture — R.W3 (baseline or close per argv[2] dir)
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:4179";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-capture.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "mobile-390x844", width: 390, height: 844 },
    { name: "laptop-1280x800", width: 1280, height: 800 },
    { name: "wide-1440x900", width: 1440, height: 900 },
];
const SCHEMES = ["light", "dark"];
const VIEWS = [
    { name: "picker", hash: "#/picker" },
    { name: "gradient", hash: "#/gradient" },
    { name: "browse", hash: "#/browse" },
];

const manifest = { capturedAt: new Date().toISOString(), base: BASE, shots: [] };
const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        const ctx = await browser.newContext({
            viewport: { width: vp.width, height: vp.height },
            colorScheme: scheme,
            deviceScaleFactor: 1,
        });
        await ctx.addInitScript((s) => {
            try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
        }, scheme);
        const page = await ctx.newPage();
        for (const view of VIEWS) {
            await page.goto(`${BASE}/${view.hash}`, { waitUntil: "networkidle" });
            await page.waitForTimeout(1800); // fonts + aurora + entrance settle
            const file = `${view.name}--${vp.name}--${scheme}.png`;
            await page.screenshot({ path: path.join(OUT, file) });
            manifest.shots.push({ file, view: view.name, viewport: vp.name, scheme });
            console.log("shot", file);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`captured ${manifest.shots.length} shots → ${OUT}`);
