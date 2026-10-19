// SS-8 · B09 Katex cells, round 2. ONE browser per run (B09_ENGINE chromium|webkit), one context per cell.
// WebKit ONLY via: ~/.claude/guard/guarded --exclusive webkit -- ...
// tab2: Tab reachability of an overflowing display row (rows scrolled into view first: content-visibility:auto
//       leaves skipped rows with no scroll overflow) + ArrowRight scroll once focused.
// cv2:  content-visibility skip/unskip vs a row's scrollLeft (row driven far off-screen through the pane port).
// d9all: tallest inline .katex vs its paragraph's line-height, all docs, at 720 CSS px (= 200% zoom of 1440).
// d5m:  #cc0000 katex-error ink vs the rendered card material (glyphs inked out → material; back → glyph core).
import { chromium, webkit } from "playwright";
import { resolve } from "node:path";
import { open, save, pixels, ratio, lum, DOCS, EV } from "./B09-lib.mjs";

const ENGINE = process.env.B09_ENGINE === "webkit" ? "webkit" : "chromium";
const want = new Set(process.argv.slice(2));
const on = (c) => want.size === 0 || want.has(c);
const browser = await (ENGINE === "webkit" ? webkit : chromium).launch();
const out = { engine: ENGINE, version: browser.version() };
const MARK = () => {
    const rows = [...document.querySelectorAll(".about-card .markdown-body > div.inline-block")].filter((x) => x.querySelector(":scope > .katex-display"));
    let hit = null;
    for (const d of rows) { d.scrollIntoView({ block: "center" }); if (d.scrollWidth > d.clientWidth + 1) { hit = d; break; } }
    if (!hit) return { rows: rows.length, target: null };
    hit.setAttribute("data-ktx-probe", "1"); hit.scrollIntoView({ block: "center" });
    const cs = getComputedStyle(hit);
    return { rows: rows.length, target: { idx: rows.indexOf(hit), tabIndex: hit.tabIndex, tabAttr: hit.getAttribute("tabindex"), role: hit.getAttribute("role"), aria: hit.getAttribute("aria-label"), sw: hit.scrollWidth, cw: hit.clientWidth, overflowX: cs.overflowX, cv: cs.contentVisibility } };
};
try {
    if (on("tab2")) {
        out.tab2 = [];
        for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
            const { ctx, page, errors } = await open(browser, "#/?space=lab", { viewport: vp });
            try {
                const tgt = await page.evaluate(MARK);
                let hit = -1, trail = [];
                if (tgt.target) {
                    await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
                    for (let i = 0; i < 90; i++) {
                        await page.keyboard.press("Tab");
                        const a = await page.evaluate(() => { const e = document.activeElement; return { probe: e?.hasAttribute?.("data-ktx-probe") ?? false, tag: (e?.tagName || "") + "." + (e?.className?.toString() || "").slice(0, 30) }; });
                        if (i < 12 || a.probe) trail.push(a.tag);
                        if (a.probe) { hit = i + 1; break; }
                    }
                }
                let arrow = null;
                if (hit > 0) {
                    const b = await page.evaluate(() => document.querySelector("[data-ktx-probe]").scrollLeft);
                    await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
                    await page.waitForTimeout(500);
                    arrow = { before: b, after: await page.evaluate(() => document.querySelector("[data-ktx-probe]").scrollLeft) };
                }
                out.tab2.push({ vp: vp.width, ...tgt, tabHitAt: hit, presses: hit > 0 ? hit : 90, trail, arrow, errors });
            } finally { await ctx.close(); }
        }
    }
    if (on("cv2")) {
        const { ctx, page, errors } = await open(browser, "#/?space=lab", { viewport: { width: 390, height: 844 }, dsf: 2 });
        try {
            const tgt = await page.evaluate(MARK);
            const r = await page.evaluate(async () => {
                const raf = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
                const d = document.querySelector("[data-ktx-probe]");
                if (!d) return null;
                const port = document.querySelector(".about-card .fading-scroll");
                d.scrollIntoView({ block: "center" }); await raf(); await sleep(200);
                d.scrollLeft = 120; await raf(); await sleep(200);
                const set = d.scrollLeft;
                port.scrollTop = 0; await raf(); await sleep(300);
                const away = d.getBoundingClientRect(), pr = port.getBoundingClientRect();
                const offscreen = away.top > pr.bottom + 50 || away.bottom < pr.top - 50;
                const swAway = d.scrollWidth, cwAway = d.clientWidth, slAway = d.scrollLeft;
                d.scrollIntoView({ block: "center" }); await raf(); await sleep(300);
                return { set, offscreen, distancePx: Math.round(away.top - pr.bottom), whileAway: { sw: swAway, cw: cwAway, scrollLeft: slAway }, after: d.scrollLeft, cv: getComputedStyle(d).contentVisibility };
            });
            out.cv2 = { target: tgt.target, ...r, errors };
        } finally { await ctx.close(); }
    }
    if (on("cv3")) {
        const { ctx, page, errors } = await open(browser, "#/?space=lab", { viewport: { width: 390, height: 844 }, dsf: 2 });
        try {
            const tgt = await page.evaluate(MARK);
            const row = page.locator("[data-ktx-probe]");
            await row.focus();
            for (let i = 0; i < 4; i++) await page.keyboard.press("ArrowRight");
            await page.waitForTimeout(400);
            const set = await row.evaluate((d) => d.scrollLeft);
            const away = await page.evaluate(async () => {
                const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
                const d = document.querySelector("[data-ktx-probe]");
                const kids = [...document.querySelectorAll(".about-card .markdown-body > *")];
                kids[kids.length - 1].scrollIntoView({ block: "end" }); await sleep(500);
                let r = d.getBoundingClientRect();
                if (Math.abs(r.top) < innerHeight * 1.5) { document.querySelector(".about-card").scrollIntoView({ block: "start" }); document.querySelector(".about-card .fading-scroll")?.scrollTo?.(0, 0); window.scrollTo(0, 0); await sleep(500); r = d.getBoundingClientRect(); }
                return { rowTop: Math.round(r.top), vh: innerHeight, sw: d.scrollWidth, cw: d.clientWidth, scrollLeft: d.scrollLeft, skippedLike: d.scrollWidth <= d.clientWidth };
            });
            await page.evaluate(async () => { document.querySelector("[data-ktx-probe]").scrollIntoView({ block: "center" }); await new Promise((r) => setTimeout(r, 500)); });
            out.cv3 = { target: tgt.target, setByArrowRight: set, away, after: await row.evaluate((d) => d.scrollLeft), errors };
        } finally { await ctx.close(); }
    }
    if (on("d9all")) {
        out.d9all = [];
        for (const sp of DOCS) {
            const { ctx, page, errors } = await open(browser, `#/?space=${sp}`, { viewport: { width: 720, height: 450 }, dsf: 2 });
            try {
                const r = await page.evaluate(() => {
                    const mb = document.querySelector(".about-card .markdown-body");
                    if (!mb) return null;
                    mb.querySelectorAll(":scope > *").forEach((e) => e.scrollIntoView());
                    const xs = [...mb.querySelectorAll(".katex")].filter((k) => !k.closest(".katex-display")).map((k) => {
                        const host = k.closest("p,li,td,th") || k.parentElement;
                        return { expr: (k.querySelector("annotation")?.textContent || "").slice(0, 40), h: +k.getBoundingClientRect().height.toFixed(2), lh: getComputedStyle(host).lineHeight, host: host.tagName };
                    }).sort((a, b) => b.h - a.h);
                    return { inlineCount: xs.length, top: xs.slice(0, 2) };
                });
                out.d9all.push({ sp, ...r, errors });
            } finally { await ctx.close(); }
        }
    }
    if (on("d5m")) {
        out.d5m = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/?space=lab", { scheme });
            try {
                await page.evaluate(() => {
                    const p = document.querySelector(".about-card .markdown-body p");
                    p.scrollIntoView({ block: "center" });
                    const s = document.createElement("span");
                    s.className = "katex-error"; s.style.color = "#cc0000"; s.textContent = "\\frac{1}{ MMMMMMMM"; s.id = "b09-err";
                    p.prepend(s);
                });
                await page.waitForTimeout(300);
                const b = await page.locator("#b09-err").boundingBox();
                const clip = { x: b.x, y: b.y, width: b.width, height: b.height };
                const p1 = await pixels(page, await page.screenshot({ clip }));
                await page.evaluate(() => { document.getElementById("b09-err").style.color = "transparent"; });
                await page.waitForTimeout(200);
                const p0 = await pixels(page, await page.screenshot({ clip }));
                let best = -1, hit = null;
                for (let i = 0; i < p1.data.length; i += 4) { const a = [p1.data[i], p1.data[i + 1], p1.data[i + 2]], c = [p0.data[i], p0.data[i + 1], p0.data[i + 2]]; const d = Math.abs(lum(a) - lum(c)); if (d > best) { best = d; hit = { ink: a, under: c }; } }
                out.d5m.push({ scheme, ...hit, rendered: ratio(hit.ink, hit.under), nominal: ratio([204, 0, 0], hit.under), errors });
            } finally { await ctx.close(); }
        }
    }
} finally {
    await browser.close();
}
save(`katex2-${ENGINE}-${[...want].join("-") || "all"}`, out);
console.log(JSON.stringify(out, null, 0).slice(0, 7000));
