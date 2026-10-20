// SERVED MODEL: claude-opus-5-5 · SS-8 B24 R-1 — WebKit (headless) pane settle on #/mix: is the pane pinned at translateX(110%) rotate(2deg)?
// Run only via: guarded --exclusive webkit -- node webkit.mjs. One browser, one context per cell, closed in finally.
import { launch, open, save, pal, hues, EVID } from "./lib.mjs";
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const out = {};
const b = await launch("webkit");
const panes = (p) => p.evaluate(() => [...document.querySelectorAll("*")].filter((e) => { const t = getComputedStyle(e).transform; return t && t !== "none" && e.getBoundingClientRect().width > 250; }).map((e) => ({ cls: e.className.toString().slice(0, 70), tf: getComputedStyle(e).transform, x: Math.round(e.getBoundingClientRect().x), w: Math.round(e.getBoundingClientRect().width), anims: e.getAnimations().length })).slice(0, 12));
try {
    for (const [name, opts] of [["cold-mix-1440", {}], ["nav-picker-to-mix-1440", { route: "#/" }], ["cold-mix-390", { viewport: { width: 390, height: 844 } }]]) {
        let ctx;
        try {
            const o = await open(b, { saved: SAVED, inst: false, ...opts });
            ctx = o.ctx; const p = o.p;
            if (opts.route === "#/") {
                await p.waitForTimeout(6000);
                await p.evaluate(() => { location.hash = "#/mix"; });
            }
            await p.locator(".add-slot-ghost").first().waitFor({ timeout: 120000 });
            const t = [];
            for (const ms of [0, 500, 1500, 4000]) { await p.waitForTimeout(ms - (t.at(-1)?.ms ?? 0)); t.push({ ms, panes: await panes(p) }); }
            const addR = await p.locator(".add-slot-ghost").first().evaluate((e) => e.getBoundingClientRect().toJSON());
            await p.screenshot({ path: `${EVID}/r1-webkit-${name}.png` });
            out[name] = { t, addSlot: { x: Math.round(addR.x), w: Math.round(addR.width) }, vw: p.viewportSize().width, errors: o.errors.slice(0, 8) };
        } catch (e) { out[name] = { fail: String(e).slice(0, 400) }; }
        finally { if (ctx) await ctx.close().catch(() => {}); save("webkit.out.json", out); console.log(name, JSON.stringify(out[name]).slice(0, 1200)); }
    }
} finally { await b.close(); }
