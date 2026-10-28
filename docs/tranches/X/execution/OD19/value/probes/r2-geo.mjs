// OD19 repair 2 — geometry witnesses for C2-V-03 (the loading plate stands in for the pane's size) and
// C2-V-05 (the offline API chip clears the dock at 390 with Tools open). Headless shell; ONE browser per
// run, one context per cell, closed in finally.   usage: node r2-geo.mjs <base-url> <out-dir>
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
const BASE = process.argv[2];
const OUT = process.argv[3];
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { v03: {}, v05: {} };

const box = (sel) => {
    const e = document.querySelector(sel);
    if (!e) return null;
    const b = e.getBoundingClientRect();
    return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
};
const mk = async (browser, scheme, W) => {
    const ctx = await browser.newContext({ viewport: { width: W, height: W === 390 ? 844 : 900 }, colorScheme: scheme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
    // The API is offline: every call to the dead :3000 fails fast (the production offline state).
    await ctx.route(/localhost:3000/, (r) => r.abort("connectionrefused"));
    return ctx;
};

const browser = await chromium.launch({ headless: true });
try {
    // Warm-up: a fresh dev server re-optimises its deps (and reloads the page) as each route's graph is
    // first met. Walk every route once so the measured cells never see a dep-optimise reload.
    {
        const ctx = await mk(browser, "light", 1440);
        try {
            const page = await ctx.newPage();
            for (const r of ["", "gradient", "mix", "palettes", "browse", "extract", "generate", "blob", "atmosphere", ""]) {
                await page.goto(`${BASE}/#/${r}`, { waitUntil: "load", timeout: 180_000 }).catch(() => {});
                await sleep(6000);
            }
        } finally { await ctx.close(); }
    }
    // ── C2-V-03 context: every routed stage's landed height against the band the viewport shows.
    report.heights = {};
    if (process.env.R2_HEIGHTS === "1") for (const W of [1440, 390]) {
        const ctx = await mk(browser, "light", W);
        try {
            const page = await ctx.newPage();
            for (const r of ["gradient", "mix", "palettes", "browse", "extract", "generate", "blob", "atmosphere"]) {
                await page.goto(`${BASE}/#/${r}`, { waitUntil: "load", timeout: 180_000 });
                await sleep(4000);
                report.heights[`${r}-${W}`] = await page.evaluate((boxSrc) => {
                    const box = new Function(`return (${boxSrc})`)();
                    const row = box(".pane-container");
                    return { stage: box(".pane-wrapper--stage > *"), inspector: box(".pane-wrapper--inspector > *"), rowY: row?.y, band: row ? innerHeight - row.y : null };
                }, box.toString());
            }
        } finally { await ctx.close(); }
        console.log("heights", W, JSON.stringify(report.heights));
    }

    // ── C2-V-03: Home → Gradient with the Gradient chunk held 3 s, the plate against the landed pane.
    for (const [scheme, W] of [["light", 1440], ["light", 390], ["dark", 1440], ["dark", 390]]) {
        const key = `${scheme}-${W}`;
        const ctx = await mk(browser, scheme, W);
        try {
            const page = await ctx.newPage();
            await page.goto(`${BASE}/#/`, { waitUntil: "load", timeout: 180_000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120_000 });
            await sleep(2500);
            let held = true;
            await ctx.route(/workbenches\/gradient\//, async (r) => { if (held) await sleep(3000); return r.continue(); });
            // The idle warm may already hold the chunk: the reload below starts from a cold module graph.
            await page.reload({ waitUntil: "load" });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120_000 });
            await sleep(500);
            await page.evaluate(() => { location.hash = "#/gradient"; });
            const samples = [];
            const t0 = Date.now();
            for (let i = 0; i < 80; i++) {
                const s = await page.evaluate((boxSrc) => {
                    const box = new Function(`return (${boxSrc})`)();
                    return {
                        plate: box(".pane-wrapper--stage .pane-plate"),
                        stage: box(".pane-wrapper--stage"),
                        row: box(".pane-container"),
                        landed: document.querySelector(".pane-wrapper--stage .pane-plate") ? null : box(".pane-wrapper--stage > *"),
                        title: document.querySelector("main h1")?.textContent?.trim() ?? null,
                    };
                }, box.toString());
                samples.push({ t: Date.now() - t0, ...s });
                if (i === 12) await page.screenshot({ path: path.join(OUT, `v03-plate-${key}.png`) });
                if (s.landed && s.title === "Gradient" && Date.now() - t0 > 4200) break;
                await sleep(100);
            }
            held = false;
            await sleep(1200);
            const settled = await page.evaluate((boxSrc) => {
                const box = new Function(`return (${boxSrc})`)();
                return { stage: box(".pane-wrapper--stage"), row: box(".pane-container"), pane: box(".pane-wrapper--stage > *") };
            }, box.toString());
            await page.screenshot({ path: path.join(OUT, `v03-landed-${key}.png`) });
            const plates = samples.filter((s) => s.plate);
            const plateH = plates.length ? plates[plates.length - 1].plate.h : null;
            const landedH = settled.pane?.h ?? null;
            const rowYs = [...new Set(samples.filter((s) => s.row).map((s) => s.row.y))];
            const lastPlate = plates.at(-1);
            report.v03[key] = {
                plateSeen: plates.length,
                plateH, landedH,
                ratio: plateH && landedH ? +(plateH / landedH).toFixed(3) : null,
                withinTenPct: plateH && landedH ? Math.abs(plateH - landedH) / landedH <= 0.1 : false,
                rowYs,
                rowHBeforeLand: lastPlate?.row?.h ?? null,
                rowHAfterLand: settled.row?.h ?? null,
                stageHBeforeLand: lastPlate?.stage?.h ?? null,
                stageHAfterLand: settled.stage?.h ?? null,
            };
        } catch (e) { report.v03[key] = { error: String(e).slice(0, 300) }; } finally { await ctx.close(); }
        console.log("v03", key, JSON.stringify(report.v03[key]));
    }

    // ── C2-V-05: 390, offline, Tools on — the dock-seat chip against the dock plate.
    for (const scheme of ["light", "dark"]) {
        const key = `${scheme}-390`;
        const ctx = await mk(browser, scheme, 390);
        try {
            const page = await ctx.newPage();
            await page.goto(`${BASE}/#/`, { waitUntil: "load", timeout: 180_000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120_000 });
            await page.locator('.api-status-chip[data-seat="dock"]').waitFor({ timeout: 30_000 });
            await sleep(1500);
            const geo = () => page.evaluate((boxSrc) => {
                const box = new Function(`return (${boxSrc})`)();
                const chip = box('.api-status-chip[data-seat="dock"]');
                const plate = box(".dock-band .dock-plate");
                const band = box(".dock-band");
                const hit = chip && plate
                    ? !(chip.x + chip.w <= plate.x || plate.x + plate.w <= chip.x || chip.y + chip.h <= plate.y || plate.y + plate.h <= chip.y)
                    : null;
                return { chip, plate, band, intersects: hit, scrollW: document.documentElement.scrollWidth };
            }, box.toString());
            const rest = await geo();
            const tog = page.getByRole("button", { name: "Toggle action bar" }).first();
            await tog.click({ timeout: 10_000 });
            await sleep(1500);
            const tools = await geo();
            await page.screenshot({ path: path.join(OUT, `v05-tools-${key}.png`) });
            await page.locator(".dock-band").screenshot({ path: path.join(OUT, `v05-band-tools-${key}.png`) }).catch(() => {});
            report.v05[key] = { rest, tools };
        } catch (e) { report.v05[key] = { error: String(e).slice(0, 300) }; } finally { await ctx.close(); }
        console.log("v05", key, JSON.stringify(report.v05[key]));
    }
} finally {
    await browser.close();
}
writeFileSync(path.join(OUT, "geo.json"), JSON.stringify(report, null, 1));
