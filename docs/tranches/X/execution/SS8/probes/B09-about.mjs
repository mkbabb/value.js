// SS-8 · B09 AboutPane cells — headless Chromium, ONE browser, one context per cell.
// ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B09-about.mjs [cell ...]
import { chromium } from "playwright";
import { resolve } from "node:path";
import { open, STATE, save, pixels, inkAndBg, ratio, EV } from "./B09-lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (c) => want.size === 0 || want.has(c);
const browser = await chromium.launch();
const out = {};
try {
    // 0251 · D-6 double exposure: header vs scroll port geometry at scrollTop 120/420/900, light+dark
    if (on("d6")) {
        out.d6 = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/", { scheme });
            try {
                for (const st of [120, 420, 900]) {
                    const m = await page.evaluate((st) => {
                        const card = document.querySelector(".about-card");
                        const hdr = card.querySelector(".pane-header");
                        const port = card.querySelector(".fading-scroll");
                        port.scrollTop = st;
                        const hr = hdr.getBoundingClientRect(), pr = port.getBoundingClientRect();
                        const isInPort = hdr.compareDocumentPosition(port);
                        const t = card.querySelector(".pane-header-title").getBoundingClientRect();
                        const hit = document.elementFromPoint(t.left + 20, t.top + t.height / 2);
                        return {
                            scrollTop: port.scrollTop, headerBottom: +hr.bottom.toFixed(2), portTop: +pr.top.toFixed(2),
                            headerInsidePort: port.contains(hdr), portInsideHeader: hdr.contains(port),
                            siblingOrder: isInPort & 4 ? "port-after-header" : "other",
                            headerBg: getComputedStyle(hdr).backgroundColor, headerBackdrop: getComputedStyle(hdr).backdropFilter,
                            titleHitInHeader: hdr.contains(hit), titleHitTag: hit?.className?.toString().slice(0, 60),
                        };
                    }, st);
                    await page.waitForTimeout(250);
                    if (st === 420) await page.locator(".about-card").screenshot({ path: resolve(EV, `0251-d6-${scheme}-st420.png`) });
                    out.d6.push({ scheme, ...m });
                }
                out.d6.push({ scheme, errors });
            } finally { await ctx.close(); }
        }
    }

    // 0252 · deep-link anomaly with URL echo
    if (on("deeplink")) {
        out.deeplink = [];
        for (const sp of ["jzazbz", "ictcp", "display-p3", "rec2020", "oklch"]) {
            const { ctx, page, errors } = await open(browser, `#/?space=${sp}`);
            try {
                const s = await page.evaluate(STATE);
                const pickerSpace = await page.evaluate(() => document.querySelector("[data-space]")?.getAttribute("data-space") ?? null);
                out.deeplink.push({ asked: sp, ...s, pickerSpace, errors });
            } finally { await ctx.close(); }
        }
    }

    // 0253 · MISS-1 none-limb reachability through deep links
    if (on("none")) {
        out.none = [];
        const links = [
            "?space=oklch&color=oklch(none%200.1%20120)",
            "?space=oklch&color=oklch(0.6%20none%20120)",
            "?space=lab&color=lab(none%2020%2030)",
            "?space=lch&color=lch(50%25%20none%20120)",
            "?space=hsl&color=hsl(none%2050%25%2050%25)",
        ];
        for (const q of links) {
            const { ctx, page, errors } = await open(browser, "#/" + q);
            try {
                out.none.push({ link: q, ...(await page.evaluate(STATE)), errors });
            } finally { await ctx.close(); }
        }
    }

    // 0254 · D-12 title control vs sentence — rendered ink on the actual material, both schemes
    if (on("d12")) {
        out.d12 = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/", { scheme });
            try {
                const boxes = await page.evaluate(() => {
                    const title = document.querySelector(".about-card .pane-header-title");
                    const trig = title.querySelector("button,[role=combobox]");
                    const tn = [...title.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
                    const r = document.createRange(); r.selectNodeContents(tn);
                    const s = r.getBoundingClientRect(), t = trig.getBoundingClientRect();
                    const text = trig.querySelector("span") || trig;
                    return {
                        sentence: { x: s.x, y: s.y, w: s.width, h: s.height }, trigger: { x: t.x, y: t.y, w: t.width, h: t.height },
                        sentenceColor: getComputedStyle(title).color, triggerColor: getComputedStyle(trig).color, triggerTextColor: getComputedStyle(text).color,
                        triggerDecoration: getComputedStyle(text).textDecorationColor, triggerBg: getComputedStyle(trig).backgroundColor,
                        triggerLabel: trig.textContent.trim(), triggerTag: trig.tagName + "[" + (trig.getAttribute("role") || "") + "]",
                    };
                });
                const shot = async (b, name) => {
                    const buf = await page.screenshot({ clip: { x: b.x, y: b.y, width: Math.max(4, b.w), height: Math.max(4, b.h) } });
                    return inkAndBg(await pixels(page, buf));
                };
                const S = await shot(boxes.sentence, "s"), T = await shot(boxes.trigger, "t");
                await page.locator(".about-card .pane-header").screenshot({ path: resolve(EV, `0254-d12-title-${scheme}.png`) });
                out.d12.push({ scheme, ...boxes, sentencePx: S, triggerPx: T, inkVsInk: ratio(S.ink, T.ink), errors });
            } finally { await ctx.close(); }
        }
    }

    // 0255 · C-14 per-key scroll census (click into the body prose, then keys; then from the title trigger)
    if (on("keys")) {
        out.keys = [];
        for (const start of ["prose-click", "trigger-focus"]) {
            const { ctx, page, errors } = await open(browser, "#/");
            try {
                if (start === "prose-click") {
                    const p = page.locator(".about-card [data-fact=definition]");
                    await p.click();
                } else {
                    await page.locator(".about-card .pane-header-title button, .about-card .pane-header-title [role=combobox]").first().focus();
                }
                const rows = [];
                for (const key of ["ArrowDown", "ArrowDown", "PageDown", "Space", "End", "Home"]) {
                    const before = await page.evaluate(() => document.querySelector(".about-card .fading-scroll").scrollTop);
                    await page.keyboard.press(key);
                    await page.waitForTimeout(350);
                    const after = await page.evaluate(() => ({
                        st: document.querySelector(".about-card .fading-scroll").scrollTop,
                        active: (document.activeElement?.tagName || "") + "." + (document.activeElement?.className?.toString() || "").slice(0, 40),
                        listbox: !!document.querySelector("[role=listbox]"),
                    }));
                    rows.push({ key, before, ...after });
                    if (after.listbox) { await page.keyboard.press("Escape"); await page.waitForTimeout(200); }
                }
                const port = await page.evaluate(() => { const p = document.querySelector(".about-card .fading-scroll"); return { tabIndex: p.tabIndex, role: p.getAttribute("role"), ariaLabel: p.getAttribute("aria-label"), sh: p.scrollHeight, ch: p.clientHeight }; });
                out.keys.push({ start, port, rows, errors });
            } finally { await ctx.close(); }
        }
    }
    // 0255 · C-9 limb: style-attribute writes on .markdown-wrapper during one 60-move slider drag
    if (on("c9")) {
        const { ctx, page, errors } = await open(browser, "#/");
        try {
            const setup = await page.evaluate(() => {
                const w = document.querySelector(".about-card .markdown-wrapper");
                window.__c9 = 0;
                if (w) new MutationObserver((ms) => { window.__c9 += ms.length; }).observe(w, { attributes: true, attributeFilter: ["style"] });
                return { hasWrapper: !!w, sliders: document.querySelectorAll("[role=slider]").length };
            });
            const thumb = page.locator("[role=slider]").first();
            const box = await thumb.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            const t0 = Date.now();
            for (let i = 1; i <= 60; i++) { await page.mouse.move(box.x + box.width / 2 + i * 2, box.y + box.height / 2); await page.waitForTimeout(16); }
            await page.mouse.up();
            await page.waitForTimeout(400);
            out.c9 = { setup, moves: 60, ms: Date.now() - t0, mdStyleMutations: await page.evaluate(() => window.__c9), slider: await thumb.getAttribute("aria-label"), errors };
        } finally { await ctx.close(); }
    }
    // 0255 · D-14 limb: cold doc-chunk (route-delayed 1500 ms) during a space change — sample the guide
    if (on("d14")) {
        const { ctx, page, errors } = await open(browser, "#/");
        try {
            const hits = [];
            await page.route(/docs\/hsl\.md/, async (route) => { hits.push(route.request().url().slice(-60)); await new Promise((r) => setTimeout(r, 1500)); await route.continue(); });
            await page.locator(".about-card .pane-header-title button").first().click();
            await page.waitForTimeout(400);
            const t0 = Date.now();
            await page.getByRole("option", { name: "HSL", exact: true }).first().click();
            const samples = [];
            for (const at of [50, 300, 900, 2500]) {
                await page.waitForTimeout(Math.max(0, at - (Date.now() - t0)));
                const s = await page.evaluate(() => {
                    const g = document.querySelector(".about-card [data-guide-section]");
                    const port = document.querySelector(".about-card .fading-scroll");
                    return { guideH: g ? +g.getBoundingClientRect().height.toFixed(1) : null, skeletonCircle: !!g?.querySelector(".rounded-full"), md: !!g?.querySelector(".markdown-body"), portSH: port?.scrollHeight, title: document.querySelector(".about-card .pane-header-title")?.textContent.replace(/\s+/g, " ").trim() };
                });
                samples.push({ at: Date.now() - t0, ...s });
                if (at === 300) await page.locator(".about-card").screenshot({ path: resolve(EV, "0255-d14-cold-chunk-300ms.png") });
            }
            out.d14 = { routeHits: hits, samples, errors };
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
}
save(`about-${[...want].join("-") || "all"}`, out);
console.log(JSON.stringify(out, null, 0).slice(0, 9000));
