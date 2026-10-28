// SS8 · B10-browse · FLOW cells (BrowsePane runtime arms on a stubbed API).
// usage: node flow.mjs <cell,...>   chromium headless; one browser, one context per cell.
import { chromium } from "playwright";
import path from "node:path";
import { APP, EVID, save, routeStub, sleep } from "./lib.mjs";

const want = new Set((process.argv[2] ?? "").split(",").filter(Boolean));
const out = {};

const state = (page) => page.evaluate(() => {
    const pane = document.querySelector('[aria-label="Browse view"]') ?? document.body;
    const sec = [...document.querySelectorAll("section, div")].find((e) => e.getAttribute("aria-label") === "Browse view") ?? document;
    const root = sec;
    return {
        cards: root.querySelectorAll(".palette-card").length,
        skeletons: root.querySelectorAll('[data-slot="palette-card-skeleton"]').length,
        alert: !!root.querySelector('[role="alert"]'),
        alertText: root.querySelector('[role="alert"]')?.innerText?.replace(/\s+/g, " ").slice(0, 120) ?? null,
        retry: [...root.querySelectorAll("button")].some((b) => b.innerText.trim() === "Retry"),
        emptyText: root.querySelector('[role="status"]')?.innerText?.replace(/\s+/g, " ").slice(0, 100) ?? null,
    };
});

async function openWall(page, n) {
    await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded" });
    if (n) await page.waitForFunction((n) => document.querySelectorAll(".palette-card").length >= n, n, { timeout: 30000 });
    await sleep(1200);
}

const CELLS = {
    // U4 — a sort whose request fails, on a populated wall
    async u4(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        const log = [];
        try {
            await routeStub(ctx, { first: 12, log, hook: (u) => (u.pathname === "/palettes" && u.searchParams.get("sort") === "popular" ? "abort" : null) });
            const page = await ctx.newPage();
            await openWall(page, 12);
            const before = await state(page);
            const firstBefore = await page.evaluate(() => document.querySelector("[data-palette-name]")?.textContent);
            await page.click('button[aria-label^="Filters"]'); await sleep(500);
            await page.getByRole("radio", { name: "Popular" }).or(page.getByRole("button", { name: "Popular" })).first().click();
            await sleep(2500);
            const pressed = await page.evaluate(() => [...document.querySelectorAll('[role="group"] button, [role="radiogroup"] [role="radio"]')].filter((b) => b.getAttribute("data-state") === "on" || b.getAttribute("aria-checked") === "true" || b.getAttribute("aria-pressed") === "true").map((b) => b.innerText.trim()));
            await page.keyboard.press("Escape"); await sleep(400);
            const after = await state(page);
            const firstAfter = await page.evaluate(() => document.querySelector("[data-palette-name]")?.textContent);
            const opacity = await page.evaluate(() => document.querySelector(".palette-card")?.parentElement?.className.includes("opacity-50"));
            await page.screenshot({ path: path.join(EVID, "u4-failed-sort-1280.png") });
            out.u4 = { before, after, firstBefore, firstAfter, sortPressedAfterFailure: pressed, gridDimmed: opacity, requests: log.filter((l) => l.includes("/palettes")) };
        } finally { await ctx.close(); }
    },

    // U5 — wall height across a route re-entry (unguarded refetch)
    async u5(browser) {
        for (const delay of [0, 400]) {
            const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
            const log = [];
            try {
                await routeStub(ctx, { first: 10, log, hook: (u) => (u.pathname === "/palettes" && delay ? { delay } : null) });
                const page = await ctx.newPage();
                await openWall(page, 10);
                const wallH = () => page.evaluate(() => {
                    const g = document.querySelector(".palette-card, [data-slot='palette-card-skeleton']")?.closest(".grid.gap-3.pb-3");
                    return g ? g.getBoundingClientRect().height : null;
                });
                const settled = await wallH();
                const nReq0 = log.filter((l) => l.startsWith("GET /palettes")).length;
                await page.evaluate(() => { location.hash = "#/"; });
                await sleep(1500);
                await page.evaluate(() => {
                    window.__h = [];
                    const t0 = performance.now();
                    const tick = () => {
                        const g = document.querySelector(".palette-card, [data-slot='palette-card-skeleton']")?.closest(".grid.gap-3.pb-3");
                        window.__h.push([Math.round(performance.now() - t0), g ? +g.getBoundingClientRect().height.toFixed(1) : null, document.querySelectorAll("[data-slot='palette-card-skeleton']").length]);
                        if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
                    };
                    location.hash = "#/browse";
                    requestAnimationFrame(tick);
                });
                await sleep(3000);
                const trace = await page.evaluate(() => window.__h);
                const hs = trace.map((t) => t[1]).filter((v) => v != null);
                out[`u5_delay${delay}`] = { settled, min: Math.min(...hs), collapsePx: +(settled - Math.min(...hs)).toFixed(1), framesWithSkeleton: trace.filter((t) => t[2] > 0).length, refetchedOnReentry: log.filter((l) => l.startsWith("GET /palettes")).length - nReq0, traceHead: trace.filter((_, i) => i % 6 === 0).slice(0, 25) };
            } finally { await ctx.close(); }
        }
    },

    // U6 — the Retry unrecoverability matrix with the service down
    async u6(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        let down = true;
        const log = [];
        try {
            await routeStub(ctx, { first: 6, log, hook: (u) => (u.pathname === "/palettes" && down ? "abort" : null) });
            const page = await ctx.newPage();
            await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded" });
            await page.waitForSelector('[role="alert"]', { timeout: 30000 }).catch(() => {});
            await sleep(800);
            const m = { s0_load: await state(page) };
            // Retry with the service still down — timeline
            const retry = page.getByRole("button", { name: "Retry" });
            if (await retry.count()) {
                await retry.first().click();
                const tl = [];
                for (let i = 0; i < 15; i++) { await sleep(150); const s = await state(page); tl.push([i * 150 + 150, s.alert, s.cards, s.skeletons]); }
                m.s1_retryTimeline = tl;
            }
            m.s1_afterRetry = await state(page);
            await page.locator('input[type="search"]').first().fill("ab"); await sleep(900);
            await page.locator('input[type="search"]').first().fill(""); await sleep(1200);
            m.s2_searchClear = await state(page);
            await page.evaluate(() => { location.hash = "#/"; }); await sleep(1000);
            await page.evaluate(() => { location.hash = "#/browse"; }); await sleep(1500);
            m.s3_routeRoundTrip = await state(page);
            down = false;
            const r2 = page.getByRole("button", { name: "Retry" });
            if (await r2.count()) { await r2.first().click(); await sleep(2500); m.s4_restoreThenRetry = await state(page); }
            else { await page.evaluate(() => { location.hash = "#/"; }); await sleep(800); await page.evaluate(() => { location.hash = "#/browse"; }); await sleep(2500); m.s4_restoreThenRoute = await state(page); }
            await page.screenshot({ path: path.join(EVID, "u6-retry-matrix-final.png") });
            m.requests = log.filter((l) => l.includes("/palettes")).length;
            out.u6 = m;
        } finally { await ctx.close(); }
    },

    // U10 — keyboard load-more: focus transcript + status regions
    async u10(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        try {
            await routeStub(ctx, { first: 50, more: 3, hook: (u) => (u.searchParams.get("cursor") ? { delay: 500 } : null) });
            const page = await ctx.newPage();
            await openWall(page, 50);
            const regions = () => page.evaluate(() => {
                const pane = document.querySelector(".palette-card").closest(".pane-shell") ?? document.body;
                return { status: pane.querySelectorAll('[role="status"]').length, live: pane.querySelectorAll("[aria-live]").length, alert: pane.querySelectorAll('[role="alert"]').length };
            });
            const regBefore = await regions();
            const btn = page.getByRole("button", { name: "Load more" });
            await btn.scrollIntoViewIfNeeded();
            await btn.focus();
            const ae = () => page.evaluate(() => { const a = document.activeElement; return `${a.tagName}${a.getAttribute("aria-label") ? "[" + a.getAttribute("aria-label") + "]" : ""}:${(a.innerText ?? "").trim().slice(0, 20)}`; });
            const tl = [[-1, await ae()]];
            await page.keyboard.press("Enter");
            for (let i = 0; i < 12; i++) { await sleep(150); tl.push([150 * (i + 1), await ae()]); }
            const regDuring = null;
            const regAfter = await regions();
            out.u10 = { regBefore, regAfter, cardsAfter: await page.evaluate(() => document.querySelectorAll(".palette-card").length), focusTranscript: tl };
        } finally { await ctx.close(); }
    },
};

const browser = await chromium.launch();
try {
    for (const [k, fn] of Object.entries(CELLS)) {
        if (want.size && !want.has(k)) continue;
        try { await fn(browser); } catch (e) { out[k + "_error"] = String(e).slice(0, 400); }
    }
} finally { await browser.close(); }
save(`flow-${[...want].join("+") || "all"}.json`, out);
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
