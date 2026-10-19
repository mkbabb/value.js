// SS-8 · B09 Katex cells. ONE browser per run (engine from B09_ENGINE: chromium default | webkit),
// one context per cell. WebKit runs ONLY via: guarded --exclusive webkit -- ...
// ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B09-katex.mjs [cell ...]
import { chromium, webkit } from "playwright";
import { resolve } from "node:path";
import { open, save, pixels, inkAndBg, ratio, DOCS, EV } from "./B09-lib.mjs";

const ENGINE = process.env.B09_ENGINE === "webkit" ? "webkit" : "chromium";
const want = new Set(process.argv.slice(2));
const on = (c) => want.size === 0 || want.has(c);
const browser = await (ENGINE === "webkit" ? webkit : chromium).launch();
const out = { engine: ENGINE, version: browser.version() };
const DISPLAY = () => [...document.querySelectorAll(".about-card .markdown-body div.inline-block")].filter((x) => x.querySelector(":scope > .katex-display"));
try {
    // 0265 · K-1 annotation display + accessible-name TeX leak
    if (on("k1")) {
        const { ctx, page, errors } = await open(browser, "#/?space=lab");
        try {
            const info = await page.evaluate(() => {
                const d = [...document.querySelectorAll(".about-card div.inline-block")].find((x) => x.querySelector(":scope > .katex-display"));
                d.id = "ktx-target"; d.scrollIntoView({ block: "center" });
                const ann = d.querySelector("annotation"), math = d.querySelector("math"), mml = d.querySelector(".katex-mathml");
                return { annotationDisplay: ann && getComputedStyle(ann).display, annotationH: ann && ann.getBoundingClientRect().height,
                    mathDisplay: math && getComputedStyle(math).display, mathmlClip: mml && getComputedStyle(mml).clip, mathmlPos: mml && getComputedStyle(mml).position };
            });
            await page.waitForTimeout(400);
            let aria = ""; try { aria = await page.locator("#ktx-target").ariaSnapshot(); } catch (e) { aria = "ERR " + String(e).slice(0, 120); }
            out.k1 = { ...info, aria: aria.slice(0, 500), ariaHasRawTeX: /\\(frac|left|quad|cdot|begin|text)/.test(aria), errors };
        } finally { await ctx.close(); }
    }

    // 0266 · Tab reachability of the overflowing display scroller + ArrowRight scroll (1440 and 390)
    if (on("tab")) {
        out.tab = [];
        for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
            const { ctx, page, errors } = await open(browser, "#/?space=lab", { viewport: vp });
            try {
                const tgt = await page.evaluate(() => {
                    const d = [...document.querySelectorAll(".about-card div.inline-block")].find((x) => x.querySelector(":scope > .katex-display") && x.scrollWidth > x.clientWidth + 1);
                    if (!d) return null;
                    d.setAttribute("data-ktx-probe", "1"); d.scrollIntoView({ block: "center" });
                    return { tabIndex: d.tabIndex, role: d.getAttribute("role"), aria: d.getAttribute("aria-label"), sw: d.scrollWidth, cw: d.clientWidth };
                });
                let hit = -1;
                if (tgt) {
                    await page.evaluate(() => { document.activeElement?.blur(); });
                    for (let i = 0; i < 90; i++) {
                        await page.keyboard.press("Tab");
                        if (await page.evaluate(() => document.activeElement?.hasAttribute("data-ktx-probe") ?? false)) { hit = i + 1; break; }
                    }
                }
                let arrow = null;
                if (hit > 0) {
                    const b = await page.evaluate(() => document.querySelector("[data-ktx-probe]").scrollLeft);
                    await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
                    await page.waitForTimeout(400);
                    arrow = { before: b, after: await page.evaluate(() => document.querySelector("[data-ktx-probe]").scrollLeft) };
                }
                out.tab.push({ vp: vp.width, target: tgt, tabHitAt: hit, arrow, errors });
            } finally { await ctx.close(); }
        }
    }

    // 0267 · pixel tables: every display formula in every authored doc, at 1440 / 1024 / 390
    // 0274 · K-4 div-in-p census rides the same sweep
    if (on("sweep")) {
        out.sweep = [];
        for (const vp of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }]) {
            let total = 0, over = 0, maxHidden = 0, portW = null, rows = [], divInP = 0, divInLooseLi = 0, divInPdisplay = 0;
            for (const sp of DOCS) {
                const { ctx, page, errors } = await open(browser, `#/?space=${sp}`, { viewport: vp });
                try {
                    const r = await page.evaluate(() => {
                        const res = [];
                        const ds = [...document.querySelectorAll(".about-card .markdown-body div.inline-block")].filter((x) => x.querySelector(":scope > .katex-display"));
                        for (const d of ds) { d.scrollIntoView({ block: "center" }); res.push({ sw: d.scrollWidth, cw: d.clientWidth, hidden: d.scrollWidth - d.clientWidth, expr: (d.querySelector("annotation")?.textContent || "").slice(0, 50) }); }
                        const mb = document.querySelector(".about-card .markdown-body");
                        return { res, portW: mb?.clientWidth,
                            divInP: document.querySelectorAll(".about-card .markdown-body p div").length,
                            divInPdisplay: [...document.querySelectorAll(".about-card .markdown-body p div.inline-block")].filter((x) => x.querySelector(":scope > .katex-display")).length,
                            divInLooseLi: document.querySelectorAll(".about-card .markdown-body li > p div").length };
                    });
                    portW = r.portW; divInP += r.divInP; divInLooseLi += r.divInLooseLi; divInPdisplay += r.divInPdisplay;
                    for (const x of r.res) { total++; if (x.hidden > 1) { over++; rows.push({ sp, ...x }); } maxHidden = Math.max(maxHidden, x.hidden); }
                    if (errors.length) rows.push({ sp, errors });
                } finally { await ctx.close(); }
            }
            rows.sort((a, b) => (b.hidden || 0) - (a.hidden || 0));
            out.sweep.push({ vp: vp.width, markdownBodyW: portW, displayFormulas: total, overflowing: over, maxHidden, top: rows.slice(0, 8), divInP, divInPdisplay, divInLooseLi });
        }
    }

    // 0268 D-9 (zoom 200% ≈ 720x450 @2x, mobile 390, desktop) · 0269 D-7 ink gaps · 0270 D-13 axis · 0271 D-14 heights + cv scrollLeft
    if (on("geom")) {
        out.geom = [];
        for (const [arm, vp, dsf] of [["desktop1440", { width: 1440, height: 900 }, 1], ["zoom200", { width: 720, height: 450 }, 2], ["mobile390", { width: 390, height: 844 }, 2]]) {
            const { ctx, page, errors } = await open(browser, "#/?space=lab", { viewport: vp, dsf });
            try {
                const g = await page.evaluate(() => {
                    const mb = document.querySelector(".about-card .markdown-body");
                    mb.querySelectorAll(":scope > *").forEach((e) => e.scrollIntoView());
                    const inline = [...mb.querySelectorAll("p .katex")].filter((k) => !k.closest(".katex-display")).map((k) => {
                        const p = k.closest("p");
                        return { expr: (k.querySelector("annotation")?.textContent || "").slice(0, 40), h: +k.getBoundingClientRect().height.toFixed(2), wrapH: +k.parentElement.getBoundingClientRect().height.toFixed(2), pLH: getComputedStyle(p).lineHeight };
                    }).sort((a, b) => b.h - a.h).slice(0, 4);
                    const ds = [...mb.querySelectorAll("div.inline-block")].filter((x) => x.querySelector(":scope > .katex-display"));
                    const ink = (el) => { const r = document.createRange(); r.selectNodeContents(el); const rs = [...r.getClientRects()].filter((q) => q.height > 0 && q.width > 0); return { top: Math.min(...rs.map((q) => q.top)), bottom: Math.max(...rs.map((q) => q.bottom)) }; };
                    const gaps = [];
                    for (const d of ds) {
                        const prev = d.previousElementSibling;
                        if (!prev) continue;
                        const a = ink(prev.matches("div.inline-block") ? prev.querySelector(".katex-html") : prev), b = ink(d.querySelector(".katex-html"));
                        gaps.push({ kind: prev.matches("div.inline-block") ? "formula→formula" : prev.tagName + "→formula", gap: +(b.top - a.bottom).toFixed(2) });
                    }
                    const axis = ds.map((d) => {
                        const cs = getComputedStyle(d), r = d.getBoundingClientRect(), col = mb.getBoundingClientRect();
                        const pl = parseFloat(cs.paddingLeft), pr = parseFloat(cs.paddingRight);
                        const contentCenter = r.left + pl + (r.width - pl - pr) / 2, colCenter = col.left + col.width / 2;
                        const k = d.querySelector(".katex-html").getBoundingClientRect();
                        return { pl, pr, displacement: +(contentCenter - colCenter).toFixed(2), overflow: d.scrollWidth > d.clientWidth + 1, inkLeft: +(k.left - r.left).toFixed(1), textAlign: getComputedStyle(d.querySelector(".katex-display")).textAlign };
                    });
                    const heights = ds.map((d) => ({ h: +d.getBoundingClientRect().height.toFixed(2), cv: getComputedStyle(d).contentVisibility, cis: getComputedStyle(d).containIntrinsicSize }));
                    return { mbW: mb.clientWidth, inline, gaps, axis, heights };
                });
                out.geom.push({ arm, ...g, errors });
                if (arm === "mobile390") {
                    // content-visibility skip/unskip preserves the nested port's scrollLeft?
                    const cv = await page.evaluate(async () => {
                        const port = document.querySelector(".about-card .fading-scroll");
                        const d = [...document.querySelectorAll(".about-card div.inline-block")].find((x) => x.querySelector(":scope > .katex-display") && x.scrollWidth > x.clientWidth + 1);
                        if (!d) return null;
                        const wait = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                        d.scrollIntoView({ block: "center" }); await wait();
                        d.scrollLeft = 120; await wait();
                        const set = d.scrollLeft;
                        port.scrollTop = 0; await wait(); await new Promise((r) => setTimeout(r, 300));
                        const skipped = d.getBoundingClientRect().bottom < port.getBoundingClientRect().top - 50 || d.getBoundingClientRect().top > port.getBoundingClientRect().bottom + 50;
                        port.scrollTop = port.scrollHeight; await wait(); await new Promise((r) => setTimeout(r, 300));
                        d.scrollIntoView({ block: "center" }); await wait(); await new Promise((r) => setTimeout(r, 300));
                        return { set, offscreenWhileAway: skipped, after: d.scrollLeft, cvOnTarget: getComputedStyle(d).contentVisibility, cvOnParentChain: getComputedStyle(d.parentElement).contentVisibility };
                    });
                    out.geom.push({ arm: "cv-scrollLeft", ...cv });
                }
            } finally { await ctx.close(); }
        }
    }

    // 0272 · D-5: #cc0000 KaTeX error ink against the rendered About card, both schemes (error injected via the page's katex)
    if (on("d5")) {
        out.d5 = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/?space=lab", { scheme });
            try {
                const st = await page.evaluate(() => {
                    const p = document.querySelector(".about-card .markdown-body p");
                    p.scrollIntoView({ block: "center" });
                    const s = document.createElement("span");
                    s.className = "katex-error"; s.style.color = "#cc0000"; s.textContent = "\\frac{1}{ MMMMMMMM"; s.id = "b09-err"; s.style.fontWeight = "400";
                    p.prepend(s);
                    return getComputedStyle(s).color;
                });
                await page.waitForTimeout(300);
                const b = await page.locator("#b09-err").boundingBox();
                const px = inkAndBg(await pixels(page, await page.screenshot({ clip: { x: b.x, y: b.y, width: b.width, height: b.height } })));
                out.d5.push({ scheme, errColor: st, pixel: px, nominalRatio: ratio([204, 0, 0], px.bg), errors });
            } finally { await ctx.close(); }
        }
    }

    // 0273 · D-3 loaded-face census (set B09_ORIGIN to the BUILT artifact's server)
    if (on("faces")) {
        const { ctx, page, errors } = await open(browser, "#/?space=lab", { settle: 3000 });
        try {
            await page.evaluate(() => document.querySelectorAll(".about-card .markdown-body > *").forEach((e) => e.scrollIntoView()));
            await page.waitForTimeout(1500);
            out.faces = await page.evaluate(async () => {
                await document.fonts.ready;
                const all = [...document.fonts];
                const k = all.filter((f) => /katex/i.test(f.family));
                const katexEl = document.querySelector(".about-card .katex");
                return { origin: location.origin, katexFaceRules: k.length, katexLoaded: k.filter((f) => f.status === "loaded").map((f) => `${f.family}|${f.weight}|${f.style}`),
                    glassLoaded: all.filter((f) => f.status === "loaded" && !/katex/i.test(f.family)).map((f) => `${f.family}|${f.weight}|${f.style}`),
                    mathFont: katexEl && getComputedStyle(katexEl).font, proseFont: getComputedStyle(document.querySelector(".about-card .markdown-body p")).fontFamily };
            });
            out.faces.errors = errors;
        } finally { await ctx.close(); }
    }

    // 0275 · forced-colors (emulation only) frame of a display formula
    if (on("forced")) {
        const { ctx, page, errors } = await open(browser, "#/?space=lab", { forced: true });
        try {
            await page.evaluate(() => [...document.querySelectorAll(".about-card div.inline-block")].find((x) => x.querySelector(":scope > .katex-display"))?.scrollIntoView({ block: "center" }));
            await page.waitForTimeout(400);
            await page.locator(".about-card").screenshot({ path: resolve(EV, `0275-forced-colors-${ENGINE}.png`) });
            out.forced = { matches: await page.evaluate(() => matchMedia("(forced-colors: active)").matches), errors };
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
}
save(`katex-${ENGINE}-${[...want].join("-") || "all"}`, out);
console.log(JSON.stringify(out, null, 0).slice(0, 9000));
