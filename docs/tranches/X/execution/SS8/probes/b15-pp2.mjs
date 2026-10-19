// SERVED MODEL: claude-opus-5-5 · SS-8 B15-palettes · PalettesPane U-1 (elevation sign, ADJACENT sampling) + U-3 (focus ring
// painted pixels: focused vs unfocused frame of the same card, diffed along both edges). Follow-up to b15-pp.mjs, whose
// U-1 samples sat ~300 px apart over a spatially varying ambient and whose U-3 edge samples showed no painted ring.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { open, hue, samplePng, contrast, okL } from "./b15-seed.mjs";
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../evidence/B15-palettes");
const out = {};
const b = await chromium.launch();
try {
    for (const theme of ["light", "dark"]) {
        const { ctx, p } = await open(b, { theme, current: hue(5, 10) });
        try {
            const g = await p.evaluate(() => {
                const cards = [...document.querySelectorAll("[role=article]")].map((c) => c.getBoundingClientRect());
                const a = cards[0], bb = cards[1]; const x = Math.round(a.x + a.width * 0.75);
                const card = document.querySelector("[role=article]"); const cs = getComputedStyle(card);
                let sc = card.parentElement; while (sc && !/(auto|scroll)/.test(getComputedStyle(sc).overflowY)) sc = sc.parentElement;
                return { a: a.toJSON(), gap: bb.y - a.bottom, x, outlineOffset: cs.outlineOffset, borderW: cs.borderTopWidth, scroller: sc?.getBoundingClientRect().toJSON(), scrollerOverflowX: sc && getComputedStyle(sc).overflowX };
            });
            const yGap = g.a.bottom + g.gap / 2;
            const elev = { hostInGap: { x: g.x, y: yGap }, slipAbove: { x: g.x, y: g.a.bottom - 6 } };
            const buf0 = await p.screenshot({ path: path.join(EV, `pp2-unfocused-${theme}.png`) });
            // edge line samples: bottom edge (y from bottom-4 to bottom+6) and left edge (x from left-6 to left+3), mid-card
            const pts = { ...elev };
            for (let d = -4; d <= 6; d++) pts[`b${d}`] = { x: g.x, y: g.a.bottom + d };
            for (let d = -6; d <= 3; d++) pts[`l${d}`] = { x: g.a.x + d, y: g.a.y + g.a.height / 2 };
            const u = await samplePng(b, buf0, pts);
            await p.keyboard.press("Tab");
            await p.evaluate(() => document.querySelector("[role=article]").focus());
            await p.waitForTimeout(300);
            const fv = await p.evaluate(() => document.querySelector("[role=article]").matches(":focus-visible"));
            const buf1 = await p.screenshot({ path: path.join(EV, `pp2-card-focused-${theme}.png`) });
            const f = await samplePng(b, buf1, pts);
            const ring = Object.keys(pts).filter((k) => /^[bl]-?\d/.test(k)).map((k) => ({ k, unf: u[k], foc: f[k], changed: u[k].some((v, i) => Math.abs(v - f[k][i]) > 2), ratio: contrast(f[k], u[k]) }));
            const changed = ring.filter((r) => r.changed);
            out[theme] = { ...g, focusVisible: fv,
                U1: { hostInGap: u.hostInGap, slip: u.slipAbove, Lhost: okL(u.hostInGap), Lslip: okL(u.slipAbove), slipMinusHostL: Math.round((okL(u.slipAbove) - okL(u.hostInGap)) * 1e4) / 1e4 },
                U3: { paintedPixels: changed.length, maxRatio: Math.max(1, ...changed.map((r) => r.ratio)), changed: changed.map((r) => `${r.k}:${r.unf}->${r.foc}@${r.ratio}`) } };
        } finally { await ctx.close(); }
    }
} finally { await b.close(); }
fs.writeFileSync(path.join(EV, "b15-pp2.out.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
