// CHALLENGE-D seat 3, probe B — export seat on a CLEAN palette (is the
// failure name-specific or structural?), browse-fetch reachability, and the
// expanded region's fill ratio.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const now = "2026-07-27T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug,
    colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const STORE = { version: 1, palettes: [
    mk("Sunset", "sunset", ["#ff6b6b", "#f7b267", "#f79d65", "#f4845f", "#f27059"]),
    mk("Oklch Set", "oklch-set", ["oklch(0.7 0.15 30)", "oklch(0.5 0.1 200)"]),
] };
const results = {};

async function withPage(opts, fn) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ acceptDownloads: true, deviceScaleFactor: 2, ...opts });
    const page = await ctx.newPage();
    await page.addInitScript((store) => {
        localStorage.setItem("color-palettes", JSON.stringify(store));
    }, STORE);
    try { return await fn(page, ctx); }
    catch (e) { return { PROBE_ERROR: String(e).split("\n")[0] }; }
    finally { await browser.close(); }
}

results.cleanExport = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        const out = { runs: [], console: [] };
        page.on("console", (m) => { if (m.type() !== "log") out.console.push(`${m.type()}: ${m.text().slice(0, 140)}`); });
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector('[role="article"]', { timeout: 15000 });
        await page.waitForTimeout(800);
        const cards = await page.$$('[role="article"]');
        for (const [idx, fmt] of [[0, "PNG Swatch"], [0, "JSON"], [1, "JSON"], [1, "SVG Swatch"]]) {
            try {
                await cards[idx].$eval('[aria-label="Palette menu"]', (b) => b.click());
                await page.waitForTimeout(300);
                await page.click('text="Export"');
                await page.waitForTimeout(300);
                const dl = page.waitForEvent("download", { timeout: 8000 }).catch(() => null);
                await page.click(`text="${fmt}"`);
                const d = await dl;
                if (!d) out.runs.push({ idx, fmt, download: null, note: "no download event in 8s" });
                else {
                    const p = OUT + "clean-" + d.suggestedFilename();
                    await d.saveAs(p).catch(() => {});
                    let head;
                    try {
                        const b = readFileSync(p);
                        head = /png$/.test(p) ? `<${b.length} bytes> sig=${[...b.slice(0,8)].join(",")}` : b.toString("utf8").slice(0, 300);
                    } catch (e) { head = "READ_FAIL " + String(e).slice(0, 80); }
                    out.runs.push({ idx, fmt, filename: d.suggestedFilename(), head });
                }
                await page.keyboard.press("Escape");
                await page.waitForTimeout(250);
            } catch (e) { out.runs.push({ idx, fmt, error: String(e).split("\n")[0] }); }
        }
        return out;
    });

results.browseReach = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        const reqs = [];
        page.on("request", (r) => { if (!r.url().startsWith("http://localhost:9000")) reqs.push(r.url()); });
        await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
        await page.waitForTimeout(4000);
        const sk = await page.evaluate(() => ({
            skeletons: document.querySelectorAll('[data-slot="palette-card-skeleton"]').length,
            cards: document.querySelectorAll('[role="article"]').length,
            text: (document.querySelector("main")?.innerText || "").slice(0, 200),
        }));
        return { offOriginRequests: reqs.slice(0, 8), ...sk };
    });

results.expandedGeom = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector('[role="article"]', { timeout: 15000 });
        await page.waitForTimeout(600);
        await page.click('[role="article"] >> nth=0');
        await page.waitForTimeout(900);
        await page.screenshot({ path: OUT + "d3-expanded.png" });
        return page.evaluate(() => {
            const c = document.querySelector('[role="article"]');
            const r = c.getBoundingClientRect();
            const sw = [...c.querySelectorAll('[class*="w-9"], [class*="rounded"]')]
                .map((e) => e.getBoundingClientRect())
                .filter((b) => b.width > 20 && b.width < 60 && Math.abs(b.width - b.height) < 4);
            const row = sw.length ? {
                left: Math.round(Math.min(...sw.map((b) => b.left))),
                right: Math.round(Math.max(...sw.map((b) => b.right))),
                n: sw.length, size: Math.round(sw[0].width),
            } : null;
            return {
                cardH: Math.round(r.height), cardW: Math.round(r.width),
                cardLeft: Math.round(r.left), cardRight: Math.round(r.right),
                swatchRow: row,
                fillPct: row ? Math.round(((row.right - row.left) / r.width) * 100) : null,
            };
        });
    });

writeFileSync(new URL("./probe-D3b-results.json", import.meta.url).pathname, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
