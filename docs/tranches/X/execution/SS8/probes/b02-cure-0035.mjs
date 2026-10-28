// SS-8 B02 CURE witness — SS8-0035 (CS R-2): a `none` channel from the URL must not throw
// out of the atmosphere (cssToOklch) or the About markdown (OKLCH conversion).
// AFTER-cure cells only; the BEFORE is p1 `r2_cold_none_link` (E/p1-sliders.json).
// Headless Chromium, ONE browser, a NEW context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --timeout 15 -- node docs/tranches/X/execution/SS8/probes/b02-cure-0035.mjs
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EV = resolve(HERE, "../evidence/B02-picker-sliders-debug");
mkdirSync(EV, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:9000/";
const out = { base: BASE, at: new Date().toISOString(), cells: {} };

const read = () => ({
    appInnerTextLen: (document.querySelector("#app")?.innerText ?? "").length,
    hasConsole: !!document.querySelector(".sliders-console"),
    alerts: [...document.querySelectorAll('[role="alert"]')].map((a) => a.textContent?.slice(0, 160)),
    hash: location.hash,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    echo: document.querySelector("[data-parse-echo], .parse-echo")?.textContent?.slice(0, 120) ?? null,
});

function watchErrors(page) {
    const errs = [];
    // the shared dev server answers slowly under the SS-8 fan-out (index ~22 s at load 25)
    page.setDefaultNavigationTimeout(180000);
    page.setDefaultTimeout(120000);
    page.on("pageerror", (e) => errs.push(String(e.message).slice(0, 200)));
    page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 200)));
    return errs;
}

const cells = {
    // the packet's cold deep link, verbatim
    async cold_none_link(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const errs = watchErrors(page);
            await page.goto(BASE + "#/?space=rgb&color=rgb(none%2050%2050)", { waitUntil: "load" });
            await page.waitForTimeout(5000);
            const r = await page.evaluate(read);
            await page.screenshot({ path: `${EV}/cure-0035-cold-none-1440-light.png` });
            return { ...r, errs: errs.slice(0, 12), errCount: errs.length };
        } finally { await ctx.close(); }
    },
    // the About pane (MarkdownColors' home) under the same link
    async cold_none_about(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const errs = watchErrors(page);
            await page.goto(BASE + "#/about?space=rgb&color=rgb(none%2050%2050)", { waitUntil: "load" });
            await page.waitForTimeout(5000);
            const r = await page.evaluate(read);
            const md = await page.evaluate(() => {
                const w = document.querySelector(".markdown-wrapper");
                return w ? getComputedStyle(w).getPropertyValue("--md-color-h2").trim() : null;
            });
            return { ...r, mdColorH2: md, errs: errs.slice(0, 12), errCount: errs.length };
        } finally { await ctx.close(); }
    },
    // warm: boot valid, then commit the none colour through the hash (the live URL sync)
    async warm_none_commit(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const errs = watchErrors(page);
            await page.goto(BASE + "#/?space=rgb&color=rgb(200%2050%2050)", { waitUntil: "load" });
            await page.waitForSelector(".sliders-console .channel-slider", { timeout: 30000 });
            await page.waitForTimeout(1200);
            await page.evaluate(() => { location.hash = "#/?space=rgb&color=rgb(none%2050%2050)"; });
            await page.waitForTimeout(2500);
            return { ...(await page.evaluate(read)), errs: errs.slice(0, 12), errCount: errs.length };
        } finally { await ctx.close(); }
    },
};

const only = process.argv[2]?.split(",");
const browser = await chromium.launch({ headless: true });
try {
    for (const [name, fn] of Object.entries(cells)) {
        if (only && !only.includes(name)) continue;
        try { out.cells[name] = await fn(browser); } catch (e) { out.cells[name] = { error: String(e).slice(0, 400) }; }
        console.log("cell", name, "done");
    }
} finally {
    await browser.close();
}
const OUTF = `${EV}/cure-0035${process.env.RUN ? "-" + process.env.RUN : ""}.json`;
writeFileSync(OUTF, JSON.stringify(out, null, 1));
console.log("wrote", OUTF);
