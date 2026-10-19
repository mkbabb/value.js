// SS-8 · B09 supplementary cells — headless Chromium, ONE browser, one context per cell.
// d12m: D-12 material-tier sample (text inked out → sample the material under each box; text back → glyph-core ink)
// nonefr: MISS-1 none-limb frames (whole-viewport) for the deep links that reach the throw
// ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B09-supp.mjs [cell ...]
import { chromium } from "playwright";
import { resolve } from "node:path";
import { open, STATE, save, pixels, ratio, lum, EV } from "./B09-lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (c) => want.size === 0 || want.has(c);
const browser = await chromium.launch();
const out = {};
const median = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[s.length >> 1]; };
try {
    if (on("d12m")) {
        out.d12m = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/", { scheme });
            try {
                const boxes = await page.evaluate(() => {
                    const title = document.querySelector(".about-card .pane-header-title");
                    const trig = title.querySelector("button,[role=combobox]");
                    const tn = [...title.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
                    const r = document.createRange(); r.selectNodeContents(tn);
                    const s = [...r.getClientRects()].filter((q) => q.width > 4)[0];
                    const lab = trig.querySelector("span") || trig;
                    const t = lab.getBoundingClientRect();
                    return { sentence: { x: s.x, y: s.y, width: s.width, height: s.height }, trigger: { x: t.x, y: t.y, width: t.width, height: t.height },
                        sentenceColor: getComputedStyle(title).color, triggerColor: getComputedStyle(lab).color, label: trig.textContent.trim() };
                });
                const grab = async (b) => pixels(page, await page.screenshot({ clip: b }));
                // pass 1: glyphs present
                const S1 = await grab(boxes.sentence), T1 = await grab(boxes.trigger);
                // pass 2: glyphs inked out (color transparent) → the material behind them
                await page.addStyleTag({ content: ".about-card .pane-header-title, .about-card .pane-header-title * { color: transparent !important; -webkit-text-fill-color: transparent !important; } .about-card .pane-header-title svg { visibility: hidden !important; }" });
                await page.waitForTimeout(300);
                const S0 = await grab(boxes.sentence), T0 = await grab(boxes.trigger);
                const bgOf = (px) => { const ch = [[], [], []]; for (let i = 0; i < px.data.length; i += 4) for (let c = 0; c < 3; c++) ch[c].push(px.data[i + c]); return ch.map(median); };
                // glyph core = the pixel of pass 1 furthest (luminance) from the pass-0 pixel at the SAME position
                const core = (p1, p0) => { let best = -1, ink = null; for (let i = 0; i < p1.data.length; i += 4) { const a = [p1.data[i], p1.data[i + 1], p1.data[i + 2]], b = [p0.data[i], p0.data[i + 1], p0.data[i + 2]]; const d = Math.abs(lum(a) - lum(b)); if (d > best) { best = d; ink = { ink: a, under: b }; } } return ink; };
                const s = core(S1, S0), t = core(T1, T0);
                const sBg = bgOf(S0), tBg = bgOf(T0);
                out.d12m.push({ scheme, ...boxes, sentenceMaterial: sBg, triggerMaterial: tBg,
                    sentenceInk: s.ink, triggerInk: t.ink,
                    sentenceVsMaterial: ratio(s.ink, s.under), triggerVsMaterial: ratio(t.ink, t.under),
                    triggerInkVsSentenceInk: ratio(t.ink, s.ink), errors });
                await page.locator(".about-card .pane-header").screenshot({ path: resolve(EV, `0254-d12m-material-${scheme}.png`) });
            } finally { await ctx.close(); }
        }
    }
    if (on("d11m")) {
        out.d11m = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/", { scheme });
            try {
                const name = page.locator(".about-card [data-o18=component-name]").first();
                await name.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
                const b = await name.boundingBox();
                const clip = { x: b.x, y: b.y, width: b.width, height: b.height };
                const p1 = await pixels(page, await page.screenshot({ clip }));
                await name.evaluate((e) => { e.dataset.b09 = e.getAttribute("style") || ""; e.style.setProperty("color", "transparent", "important"); });
                await page.waitForTimeout(250);
                const p0 = await pixels(page, await page.screenshot({ clip }));
                let best = -1, hit = null;
                for (let i = 0; i < p1.data.length; i += 4) { const a = [p1.data[i], p1.data[i + 1], p1.data[i + 2]], c = [p0.data[i], p0.data[i + 1], p0.data[i + 2]]; const d = Math.abs(lum(a) - lum(c)); if (d > best) { best = d; hit = { ink: a, under: c }; } }
                out.d11m.push({ scheme, text: await name.textContent(), inlineStyle: await name.evaluate((e) => e.dataset.b09), ...hit, rendered: ratio(hit.ink, hit.under), errors });
            } finally { await ctx.close(); }
        }
    }
    if (on("c5b")) {
        const { ctx, page, errors } = await open(browser, "#/");
        try {
            const armed = await page.evaluate(() => {
                const el = document.querySelector(".about-card [data-space-facts]");
                let inst = el.__vueParentComponent;
                while (inst && inst.type?.__name !== "ColorNutritionLabel") inst = inst.parent;
                if (!inst) return { ok: false };
                window.__c5 = { self: 0, desc: 0, byName: {} };
                const seen = new Set(); const names = {};
                const hook = (i, isSelf) => { if (seen.has(i)) return; seen.add(i); (i.bu ||= []).push(() => { if (isSelf) window.__c5.self++; else { window.__c5.desc++; const n = i.type?.__name || i.type?.name || "anon"; window.__c5.byName[n] = (window.__c5.byName[n] || 0) + 1; } }); };
                hook(inst, true);
                // descendants by DOM ownership: every element under the CNL root whose owning instance != CNL
                for (const e of el.querySelectorAll("*")) { let c = e.__vueParentComponent; while (c && c !== inst) { if (!seen.has(c)) { hook(c, false); const n = c.type?.__name || c.type?.name || "anon"; names[n] = (names[n] || 0) + 1; } c = c.parent; } }
                return { ok: true, hookedDescendants: seen.size - 1, names };
            });
            const thumb = page.locator("[role=slider]").first();
            const box = await thumb.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            for (let i = 1; i <= 60; i++) { await page.mouse.move(box.x + box.width / 2 + i * 2, box.y + box.height / 2); await page.waitForTimeout(16); }
            await page.mouse.up(); await page.waitForTimeout(500);
            out.c5b = { armed, moves: 60, counts: await page.evaluate(() => window.__c5), slider: await thumb.getAttribute("aria-label"), errors };
        } finally { await ctx.close(); }
    }
    if (on("nonefr")) {
        out.nonefr = [];
        for (const [tag, q] of [["oklch-Lnone", "?space=oklch&color=oklch(none%200.1%20120)"], ["lab-Lnone", "?space=lab&color=lab(none%2020%2030)"], ["control-oklch", "?space=oklch&color=oklch(0.6%200.1%20120)"]]) {
            const { ctx, page, errors } = await open(browser, "#/" + q, { settle: 2500 });
            try {
                await page.screenshot({ path: resolve(EV, `0253-none-${tag}.png`) });
                out.nonefr.push({ tag, link: q, ...(await page.evaluate(STATE)), errors: errors.map((e) => e.slice(0, 160)) });
            } finally { await ctx.close(); }
        }
    }
} finally {
    await browser.close();
}
save(`supp-${[...want].join("-") || "all"}`, out);
console.log(JSON.stringify(out, null, 0).slice(0, 6000));
