// CHALLENGE-D seat 3 probe — measures what seats 1/2 did not:
//   A. identity-row column alignment across a stack of cards
//   B. loading(skeleton) -> loaded(card) geometry delta
//   C. the card's Export seat, end to end, through its own menu
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
    mk("A very long palette name that will not fit", "longname",
       ["#264653", "#2a9d8f", "#e9c46a"],
       { tags: ["warm", "earthy", "autumn", "fourth"], forkCount: 3, versionCount: 4, forkOf: "other" }),
    mk("Featured One", "featured-one",
       ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03"],
       { tier: "featured" }),
    mk("Single", "single", ["#8ecae6"]),
    // C-vectors: an emoji-only name and a markup-bearing name
    mk("\u{1F3A8}", "emoji-name", ["#ff0000", "#00ff00"]),
    mk("A & B </text><script>alert(1)</script>", "markup-name", ["#123456", "#654321"]),
] };

const results = {};

async function withPage(opts, fn) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ acceptDownloads: true, deviceScaleFactor: 2, ...opts });
    const page = await ctx.newPage();
    await page.addInitScript((store) => {
        localStorage.setItem("color-palettes", JSON.stringify(store));
        localStorage.setItem("value-onboarding-seen", "1");
    }, STORE);
    try { return await fn(page, ctx); }
    catch (e) { return { PROBE_ERROR: String(e).split("\n")[0] }; }
    finally { await browser.close(); }
}

// ---------- A. identity-row column alignment ----------
const measureRows = () => {
    const cards = [...document.querySelectorAll('[role="article"]')];
    return cards.map((c) => {
        const r = c.getBoundingClientRect();
        const title = c.querySelector("span.font-display");
        const badges = [...c.querySelectorAll('[data-slot="badge"], .inline-flex')];
        // the color-count badge is the badge whose text is a bare integer
        const count = [...c.querySelectorAll("span,div")]
            .filter((e) => /^\s*\d+\s*$/.test(e.textContent || "") && e.children.length === 0)
            .map((e) => ({ t: e.textContent.trim(), x: e.getBoundingClientRect().left,
                           w: e.getBoundingClientRect().width,
                           cls: e.className.toString().slice(0, 60) }))[0] ?? null;
        const menu = c.querySelector('[aria-label="Palette menu"]');
        const tr = title?.getBoundingClientRect();
        const mr = menu?.getBoundingClientRect();
        const row = c.querySelector(".px-3.py-2\\.5") ?? c.querySelector('[class*="py-2.5"]');
        const cluster = row?.firstElementChild?.getBoundingClientRect();
        return {
            name: (c.getAttribute("aria-label") || "").replace("Palette: ", "").slice(0, 34),
            card: { x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) },
            title: tr ? { x: Math.round(tr.left), w: Math.round(tr.width), h: Math.round(tr.height),
                          clamp: getComputedStyle(title).webkitLineClamp,
                          ov: title.scrollWidth > title.clientWidth + 1 } : null,
            countBadge: count ? { text: count.t, x: Math.round(count.x), w: Math.round(count.w) } : null,
            menuX: mr ? Math.round(mr.left) : null,
            clusterRight: cluster ? Math.round(cluster.right) : null,
            clusterOverflow: cluster && mr ? Math.round(cluster.right - mr.left) : null,
            badgeCount: badges.length,
        };
    });
};

results.desktopRows = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector('[role="article"]', { timeout: 15000 });
        await page.waitForTimeout(1200);
        await page.screenshot({ path: OUT + "d3-desktop-rows.png", fullPage: false });
        return page.evaluate(measureRows);
    });

results.mobileRows = await withPage({ viewport: { width: 390, height: 844 }, colorScheme: "light", isMobile: true, hasTouch: true },
    async (page) => {
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector('[role="article"]', { timeout: 15000 });
        await page.waitForTimeout(1200);
        await page.screenshot({ path: OUT + "d3-mobile-rows.png", fullPage: false });
        return page.evaluate(measureRows);
    });

// ---------- B. skeleton vs card geometry ----------
results.loadingShift = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        // hold the palette list open so the loading register stays on screen
        // (the api is a REMOTE origin — match anything not served by the dev server)
        await page.route("**/*", async (route) => {
            const u = route.request().url();
            if (u.startsWith("http://localhost:9000")) return route.continue();
            await new Promise((r) => setTimeout(r, 12000));
            return route.abort();
        });
        await page.goto("http://localhost:9000/#/browse", { waitUntil: "commit" });
        await page.waitForSelector('[data-slot="palette-card-skeleton"]', { timeout: 15000 });
        await page.waitForTimeout(600);
        await page.screenshot({ path: OUT + "d3-skeleton.png" });
        const sk = await page.evaluate(() => {
            const s = document.querySelector('[data-slot="palette-card-skeleton"]');
            const r = s.getBoundingClientRect();
            const cs = getComputedStyle(s);
            const sw = s.querySelector('[class*="w-12"]');
            return {
                h: Math.round(r.height), w: Math.round(r.width),
                boxShadow: cs.boxShadow.slice(0, 60), overflow: cs.overflow,
                borderWidth: cs.borderWidth, radius: cs.borderRadius,
                swatch: sw ? Math.round(sw.getBoundingClientRect().width) : null,
                blocks: s.querySelectorAll('[data-slot="skeleton"], .skeleton, div').length,
            };
        });
        return sk;
    });

// collapsed card geometry for the comparison
results.cardGeom = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector('[role="article"]', { timeout: 15000 });
        await page.waitForTimeout(800);
        return page.evaluate(() => {
            const c = document.querySelector('[role="article"]');
            const r = c.getBoundingClientRect();
            const cs = getComputedStyle(c);
            const strip = c.querySelector('[role="presentation"]');
            return {
                h: Math.round(r.height), w: Math.round(r.width),
                boxShadow: cs.boxShadow.slice(0, 60), overflow: cs.overflow,
                borderWidth: cs.borderWidth, radius: cs.borderRadius,
                stripH: strip ? Math.round(strip.getBoundingClientRect().height) : null,
                stripRadius: strip ? getComputedStyle(strip).borderRadius : null,
            };
        });
    });

// ---------- C. the Export seat, end to end ----------
results.exportSeat = await withPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" },
    async (page) => {
        const out = { runs: [], console: [] };
        page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") out.console.push(`${m.type()}: ${m.text()}`); });
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector('[role="article"]', { timeout: 15000 });
        await page.waitForTimeout(800);

        const cards = await page.$$('[role="article"]');
        // index 5 = markup name, index 4 = emoji name (store order)
        for (const [idx, fmt] of [[5, "SVG Swatch"], [4, "CSS Custom Properties"], [5, "PNG Swatch"]]) {
            const card = cards[idx];
            if (!card) { out.runs.push({ idx, fmt, error: "card missing" }); continue; }
            try {
                await card.$eval('[aria-label="Palette menu"]', (b) => b.click());
                await page.waitForTimeout(350);
                await page.click('text="Export"');
                await page.waitForTimeout(350);
                const dl = page.waitForEvent("download", { timeout: 6000 }).catch(() => null);
                await page.click(`text="${fmt}"`);
                const d = await dl;
                if (!d) { out.runs.push({ idx, fmt, download: null, note: "no download event within 6s" }); }
                else {
                    const p = OUT + "dl-" + d.suggestedFilename();
                    await d.saveAs(p).catch((e) => out.runs.push({ saveErr: String(e) }));
                    let body = "";
                    try { body = readFileSync(p, "utf8").slice(0, 420); } catch { body = "<binary>"; }
                    out.runs.push({ idx, fmt, filename: d.suggestedFilename(), head: body });
                }
                await page.keyboard.press("Escape");
                await page.waitForTimeout(250);
            } catch (e) {
                out.runs.push({ idx, fmt, error: String(e).slice(0, 200) });
            }
        }
        return out;
    });

writeFileSync(new URL("./probe-D3-results.json", import.meta.url).pathname,
    JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
