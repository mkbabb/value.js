// SS8 · B10-browse · WALL cells (BrowsePane + SearchFilterBar trigger).
// usage: node wall.mjs <cell,...>   (chromium headless; one browser, one context per cell)
import { chromium } from "playwright";
import path from "node:path";
import { APP, API_PROD, EVID, save, routeProd, routeStub, wcag, dE, samplePixels, sleep } from "./lib.mjs";

const want = new Set((process.argv[2] ?? "").split(",").filter(Boolean));
const out = {};
const B = "#/browse";

async function gotoWall(page, n = 1) {
    await page.goto(`${APP}/${B}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction((n) => document.querySelectorAll(".palette-card").length >= n, n, { timeout: 30000 });
    await sleep(1200);
}
const cardCount = (page) => page.evaluate(() => document.querySelectorAll(".palette-card").length);

const CELLS = {
    // U13 — does the public route fetch UserSortMenu.vue in dev?
    async trace(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        try {
            await routeStub(ctx, { first: 4 });
            const page = await ctx.newPage();
            const vue = [];
            page.on("request", (r) => { if (/\.vue(\?|$)/.test(r.url())) vue.push(r.url().replace(/^.*\/value\.js\//, "").replace(APP + "/", "")); });
            await gotoWall(page, 1);
            await sleep(2000);
            out.trace = { vueModules: vue.length, userSortMenu: vue.filter((u) => /UserSortMenu/.test(u)), adminModules: vue.filter((u) => /\/admin\//.test(u)) };
        } finally { await ctx.close(); }
    },

    // U1 U7 U8 U9 U11 U12 R-3(light) R-9 — prod-proxied commons, 1280 light
    async prod(browser, scheme = "light") {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
        const log = [];
        try {
            await routeProd(ctx, log);
            const page = await ctx.newPage();
            await gotoWall(page, 1);
            const r = {};
            r.cards = await cardCount(page);
            r.htmlDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
            // U8 — cardRefs vs mounted inspectors
            r.cardRefs = await page.evaluate(() => {
                const el = document.querySelector(".palette-card");
                let inst = el?.__vueParentComponent;
                while (inst && inst.type?.__name !== "BrowsePane") inst = inst.parent;
                if (!inst) return { error: "BrowsePane instance not found" };
                const refs = inst.setupState?.cardRefs;
                return { keys: refs ? Object.keys(refs).length : null, cardsInDom: document.querySelectorAll(".palette-card").length };
            });
            // U1 — filter trigger geometry vs bar
            r.trigger = await page.evaluate(() => {
                const t = document.querySelector('button[aria-label^="Filters"]');
                const bar = t.closest(".input-bar");
                const tr = t.getBoundingClientRect(), br = bar.getBoundingClientRect();
                const cs = getComputedStyle(t);
                return { w: tr.width, h: tr.height, radius: cs.borderRadius, minHeight: cs.minHeight, aspect: +(tr.width / tr.height).toFixed(3), barH: br.height, overhangTop: +(br.top - tr.top).toFixed(2), overhangBottom: +(tr.bottom - br.bottom).toFixed(2), contain: cs.contain, classes: t.className };
            });
            // U12 — computed sizes in the card's head/meta row
            r.metaSizes = await page.evaluate(() => {
                const card = document.querySelector(".palette-card");
                const pick = (sel) => { const e = card.querySelector(sel); return e ? { fs: getComputedStyle(e).fontSize, top: Math.round(e.getBoundingClientRect().top) } : null; };
                const vote = [...card.querySelectorAll("button")].find((b) => b.querySelector(".text-mono-small"));
                return {
                    name: pick("[data-palette-name]"),
                    chip: pick(".palette-meta__chip"),
                    more: pick(".palette-meta__more"),
                    voteButton: vote ? { fs: getComputedStyle(vote).fontSize, cls: vote.className.includes("text-") } : null,
                    count: pick(".palette-meta .text-mono-small"),
                    metaRow: pick(".palette-meta"),
                };
            });
            // U11 — pixel samples: 12px left of card 1, 7px into gutter below card 1
            const geo = await page.evaluate(() => {
                const cs = [...document.querySelectorAll(".palette-card")].slice(0, 2).map((c) => c.getBoundingClientRect());
                const grid = document.querySelector(".palette-card").parentElement;
                return { c: cs.map((b) => ({ l: b.left, t: b.top, r: b.right, b: b.bottom })), shadow: getComputedStyle(document.querySelector(".palette-card")).boxShadow, gridContain: getComputedStyle(grid).contain, gridCls: grid.className };
            });
            const c0 = geo.c[0];
            const ymid = (c0.t + Math.min(c0.b, c0.t + 60)) / 2;
            const left = []; for (let d = 1; d <= 12; d++) left.push([c0.l - d, ymid]);
            const gut = []; for (let d = 1; d <= 7; d++) gut.push([(c0.l + c0.r) / 2, c0.b + d]);
            const refs = [[c0.l - 30, ymid]];
            const px = await samplePixels(page, [...left, ...gut, ...refs]);
            const Y = (p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
            const ref = Y(px[px.length - 1]);
            r.u11 = {
                geo,
                leftMaxDelta: +Math.max(...px.slice(0, 12).map((p) => Math.abs(Y(p) - ref))).toFixed(1),
                gutterMaxDelta: +Math.max(...px.slice(12, 19).map((p) => Math.abs(Y(p) - ref))).toFixed(1),
                leftPx: px.slice(0, 12), gutterPx: px.slice(12, 19), refPx: px[px.length - 1],
            };
            // U3 — strip band contrasts (adjacent + vs card body) on every card
            r.strips = await page.evaluate(() => [...document.querySelectorAll(".palette-card")].map((card) => {
                const bands = [...card.querySelectorAll("[data-color-strip] [data-band]")].map((b) => getComputedStyle(b).backgroundColor);
                return { slug: card.closest("[data-palette-slug]")?.dataset.paletteSlug ?? null, name: card.querySelector("[data-palette-name]")?.textContent?.trim(), bands, cardBg: getComputedStyle(card).backgroundColor, stripSurface: card.querySelector("[data-color-strip]")?.hasAttribute("data-color-surface") };
            }));
            await page.screenshot({ path: path.join(EVID, `prod-wall-1280-${scheme}.png`) });
            // R-3 — trigger composited fill vs field, glyph vs fill (pixels)
            const tg = await page.evaluate(() => {
                const t = document.querySelector('button[aria-label^="Filters"]').getBoundingClientRect();
                const svg = document.querySelector('button[aria-label^="Filters"] svg').getBoundingClientRect();
                return { t: { l: t.left, t: t.top, r: t.right, b: t.bottom }, svg: { l: svg.left, t: svg.top, r: svg.right, b: svg.bottom } };
            });
            const pts = [];
            for (let x = Math.ceil(tg.svg.l); x <= tg.svg.r; x++) for (let y = Math.ceil(tg.svg.t); y <= tg.svg.b; y++) pts.push([x, y]);
            const fillPt = [tg.t.l + 4, (tg.t.t + tg.t.b) / 2];
            const fieldPt = [tg.t.l - 6, (tg.t.t + tg.t.b) / 2];
            const pp = await samplePixels(page, [...pts, fillPt, fieldPt]);
            const field = pp.pop(), fill = pp.pop();
            const glyph = pp.reduce((best, p) => (wcag(p, fill) > wcag(best, fill) ? p : best), fill);
            r.r3 = { fill, field, glyph, fillVsField: wcag(fill, field), glyphVsFill: wcag(glyph, fill), glyphVsField: wcag(glyph, field) };
            if (scheme === "dark") { out[`prod_${scheme}`] = r; out[`prod_${scheme}_log`] = log.slice(0, 20); return; }

            // U9 — forced-colors + print readouts
            await page.emulateMedia({ forcedColors: "active" });
            await sleep(300);
            r.forced = await page.evaluate(() => {
                const bands = [...document.querySelectorAll("[data-color-strip] [data-band]")];
                const bgs = [...new Set(bands.map((b) => getComputedStyle(b).backgroundColor))];
                const strip = document.querySelector("[data-color-strip]");
                const wc = document.querySelectorAll(".watercolor-swatch, [data-watercolor-dot], .watercolor-dot").length;
                const wcBgs = [...new Set([...document.querySelectorAll(".watercolor-swatch, [data-watercolor-dot], .watercolor-dot")].map((e) => getComputedStyle(e).forcedColorAdjust))];
                return { bands: bands.length, stripDistinctBg: bgs.slice(0, 12), stripForcedColorAdjust: getComputedStyle(strip).forcedColorAdjust, bandForcedColorAdjust: bands[0] && getComputedStyle(bands[0]).forcedColorAdjust, watercolorCount: wc, watercolorFCA: wcBgs };
            });
            await page.screenshot({ path: path.join(EVID, "prod-wall-1280-forced.png") });
            await page.emulateMedia({ forcedColors: "none", media: "print" });
            await sleep(200);
            r.print = await page.evaluate(() => {
                const b = document.querySelector("[data-color-strip] [data-band]");
                const cs = getComputedStyle(b);
                return { printColorAdjust: cs.printColorAdjust ?? cs.webkitPrintColorAdjust, webkit: cs.webkitPrintColorAdjust };
            });
            await page.emulateMedia({ media: "screen" });

            // R-9 — badge vs trigger contain (activate Featured)
            await page.click('button[aria-label^="Filters"]');
            await sleep(500);
            await page.getByText("Featured", { exact: true }).first().click();
            await sleep(900);
            await page.keyboard.press("Escape");
            await sleep(600);
            r.r9 = await page.evaluate(() => {
                const t = document.querySelector('button[aria-label^="Filters"]');
                const badge = t.querySelector("span.absolute");
                if (!badge) return { badge: false, label: t.getAttribute("aria-label") };
                const tr = t.getBoundingClientRect(), br = badge.getBoundingClientRect();
                const ix = Math.max(0, Math.min(tr.right, br.right) - Math.max(tr.left, br.left));
                const iy = Math.max(0, Math.min(tr.bottom, br.bottom) - Math.max(tr.top, br.top));
                const chain = []; let e = t; for (let i = 0; i < 4 && e; i++, e = e.parentElement) chain.push({ tag: e.tagName, contain: getComputedStyle(e).contain, overflow: getComputedStyle(e).overflow });
                return { badge: true, label: t.getAttribute("aria-label"), outsideTriggerBoxPct: +(100 * (1 - (ix * iy) / (br.width * br.height))).toFixed(1), triggerContain: getComputedStyle(t).contain, chain, badgeRect: [br.left, br.top, br.width, br.height], trigRect: [tr.left, tr.top, tr.width, tr.height] };
            });
            const tb = r.r9.badge ? r.r9 : null;
            if (tb) await page.screenshot({ path: path.join(EVID, "r9-badge-crop.png"), clip: { x: tb.trigRect[0] - 12, y: tb.trigRect[1] - 12, width: tb.trigRect[2] + 24, height: tb.trigRect[3] + 24 } });
            // clear featured again
            await page.click('button[aria-label^="Filters"]'); await sleep(400);
            await page.getByText("Featured", { exact: true }).first().click(); await sleep(700);
            await page.keyboard.press("Escape"); await sleep(500);

            // U7 — the typed sequence against the live commons
            const input = page.locator('input[type="search"]').first();
            const seq = {};
            for (const q of ["o", "oc", "oce", "ocea", "ocean"]) {
                await input.fill(q); await sleep(1600);
                seq[JSON.stringify(q)] = { cards: await cardCount(page), plate: await page.evaluate(() => document.querySelector('[role="status"]')?.innerText?.slice(0, 80) ?? null) };
            }
            await input.fill(" ocean"); await sleep(1600);
            seq['" ocean"'] = { cards: await cardCount(page) };
            r.u7seq = seq;
            out[`prod_${scheme}`] = r;
            out[`prod_${scheme}_log`] = log.filter((l) => /palettes/.test(l)).slice(0, 30);
        } finally { await ctx.close(); }
    },
    async proddark(browser) { return CELLS.prod(browser, "dark"); },

    // follow-up: R-9 (dialog-scoped Featured) · U11 caster source · U12 text-micro · U3 sRGB-true strip contrast
    async extra(browser) {
        for (const scheme of ["light", "dark"]) {
            const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
            try {
                await routeProd(ctx);
                const page = await ctx.newPage();
                await gotoWall(page, 1);
                const r = {};
                // U3 — every colour resolved to sRGB by the engine (1×1 canvas), card ground by pixel
                r.u3 = await page.evaluate(() => {
                    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
                    const g = cv.getContext("2d", { willReadFrequently: true });
                    const toRGB = (css) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1); return Array.from(g.getImageData(0, 0, 1, 1).data.slice(0, 3)); };
                    return [...document.querySelectorAll(".palette-card")].map((card) => {
                        const bands = [...card.querySelectorAll("[data-color-strip] [data-band]")];
                        const sr = card.querySelector("[data-color-strip]")?.getBoundingClientRect();
                        return { name: card.querySelector("[data-palette-name]")?.textContent?.trim(), bands: bands.map((b) => toRGB(getComputedStyle(b).backgroundColor)), stripBelowPt: sr ? [sr.left + 8, sr.bottom + 3] : null };
                    });
                });
                const pts = r.u3.map((s) => s.stripBelowPt ?? [0, 0]);
                const ground = await samplePixels(page, pts);
                r.u3 = r.u3.map((s, i) => {
                    const adj = s.bands.slice(1).map((c, k) => ({ wcag: wcag(s.bands[k], c), dE: dE(s.bands[k], c) }));
                    return { name: s.name, n: s.bands.length, ground: ground[i], minAdjWcag: adj.length ? Math.min(...adj.map((a) => a.wcag)) : null, minAdjDE: adj.length ? Math.min(...adj.map((a) => a.dE)) : null, firstVsGround: s.bands.length ? { wcag: wcag(s.bands[0], ground[i]), dE: dE(s.bands[0], ground[i]) } : null };
                });
                if (scheme === "light") {
                    // U11 — where does the card's cartoon caster live at HEAD?
                    r.u11 = await page.evaluate(() => {
                        const c = document.querySelector(".palette-card");
                        const read = (e, p) => { const s = getComputedStyle(e, p); return { boxShadow: s.boxShadow, filter: s.filter, content: s.content }; };
                        const kids = [...c.querySelectorAll("*")].filter((e) => getComputedStyle(e).boxShadow !== "none").slice(0, 4).map((e) => ({ cls: String(e.className).slice(0, 60), shadow: getComputedStyle(e).boxShadow }));
                        const anc = []; let e = c.parentElement; for (let i = 0; i < 6 && e; i++, e = e.parentElement) { const s = getComputedStyle(e); if (s.contain !== "none" || s.overflow !== "visible") anc.push({ cls: String(e.className).slice(0, 50), contain: s.contain, overflow: s.overflow }); }
                        return { self: read(c), before: read(c, "::before"), after: read(c, "::after"), shadowedDescendants: kids, clipAncestors: anc };
                    });
                    // U12 — the micro rung's computed size (prod chips absent: probe element in the meta row)
                    r.u12 = await page.evaluate(() => {
                        const row = document.querySelector(".palette-meta");
                        const s = document.createElement("span"); s.className = "text-micro"; s.textContent = "x"; row.appendChild(s);
                        const fs = getComputedStyle(s).fontSize; s.remove();
                        return { textMicro: fs, rowAlign: getComputedStyle(row).alignItems, rowDisplay: getComputedStyle(row).display };
                    });
                    // R-9 — activate Featured INSIDE the dialog, then read the badge
                    await page.click('button[aria-label^="Filters"]');
                    await page.waitForSelector('[role="dialog"]'); await sleep(600);
                    await page.locator('[role="dialog"]').last().getByText("Featured", { exact: true }).click();
                    await sleep(1500);
                    await page.keyboard.press("Escape"); await sleep(700);
                    r.r9 = await page.evaluate(() => {
                        const t = document.querySelector('button[aria-label^="Filters"]');
                        const badge = t.querySelector("span.absolute");
                        if (!badge) return { badge: false, label: t.getAttribute("aria-label") };
                        const tr = t.getBoundingClientRect(), br = badge.getBoundingClientRect();
                        const ix = Math.max(0, Math.min(tr.right, br.right) - Math.max(tr.left, br.left));
                        const iy = Math.max(0, Math.min(tr.bottom, br.bottom) - Math.max(tr.top, br.top));
                        const chain = []; let e = t; for (let i = 0; i < 4 && e; i++, e = e.parentElement) chain.push({ tag: e.tagName, cls: String(e.className).slice(0, 40), contain: getComputedStyle(e).contain, overflow: getComputedStyle(e).overflow, clipPath: getComputedStyle(e).clipPath });
                        return { badge: true, label: t.getAttribute("aria-label"), badgeOutsideTriggerBoxPct: +(100 * (1 - (ix * iy) / (br.width * br.height))).toFixed(1), chain, badgeRect: [br.left, br.top, br.width, br.height], trigRect: [tr.left, tr.top, tr.width, tr.height] };
                    });
                    if (r.r9.badge) {
                        const tb = r.r9.trigRect, bb = r.r9.badgeRect;
                        await page.screenshot({ path: path.join(EVID, "r9-badge-crop.png"), clip: { x: tb[0] - 12, y: tb[1] - 12, width: tb[2] + 24, height: tb[3] + 24 } });
                        // painted-away: badge pixels outside the trigger box vs the same points with the badge hidden
                        const outside = [];
                        for (let x = Math.ceil(bb[0]); x < bb[0] + bb[2]; x++) for (let y = Math.ceil(bb[1]); y < bb[1] + bb[3]; y++) if (x >= tb[0] + tb[2] || y < tb[1]) outside.push([x, y]);
                        const withB = await samplePixels(page, outside);
                        await page.evaluate(() => { document.querySelector('button[aria-label^="Filters"] span.absolute').style.visibility = "hidden"; });
                        const without = await samplePixels(page, outside);
                        const painted = withB.filter((p, i) => Math.abs(p[0] - without[i][0]) + Math.abs(p[1] - without[i][1]) + Math.abs(p[2] - without[i][2]) > 12).length;
                        r.r9.outsidePx = outside.length; r.r9.outsidePaintedPx = painted;
                    }
                }
                out[`extra_${scheme}`] = r;
            } finally { await ctx.close(); }
        }
    },
};

const browser = await chromium.launch();
try {
    for (const [k, fn] of Object.entries(CELLS)) {
        if (want.size && !want.has(k)) continue;
        try { await fn(browser); } catch (e) { out[k + "_error"] = String(e).slice(0, 400); }
    }
} finally { await browser.close(); }
save(`wall-${[...want].join("+") || "all"}.json`, out);
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
