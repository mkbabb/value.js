// SERVED MODEL: claude-opus-5-5 · SS-8 B24 CURES cells. Pre-declared GREEN thresholds (set before any after-run):
//   R11  (SS8-0671): max one-frame footer growth on Colors→Palettes  ≤ 24 px   (RED take: +76.3 px)
//   MP2  (SS8-0673): max one-frame .mix-plate height step on 1st mix ≤ 40 px   (RED take: +98.5 px)
//   MP7  (SS8-0678/0684): add-slot ring↔ground ≥ 3:1 in light and dark       (RED take: 1.08 light)
//   MP4f (SS8-0678 MP-4): forced colours (EMULATED) — add slot + ghost dot computed forced-color-adjust = auto
import { writeFileSync, mkdirSync } from "node:fs";
import { launch, open, readyMix, addCurrent, mixButton, regionStats, contrast, pal, hues, EVID } from "./lib.mjs";
const LABEL = process.env.B24_CURES_LABEL;
const DIR = `${EVID}/cures`; mkdirSync(DIR, { recursive: true });
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const out = { label: LABEL, base: process.env.B24_BASE, at: new Date().toISOString() };
const b = await launch();
const ONLY = process.env.CELLS?.split(",");
async function cell(name, opts, fn) {
    if (ONLY && !ONLY.includes(name)) return;
    const t0 = Date.now(); let ctx;
    try {
        const o = await open(b, { saved: SAVED, inst: false, ...opts }); ctx = o.ctx;
        await readyMix(o.p);
        out[name] = { ...(await fn(o.p)), errors: o.errors.filter((e) => !/approved|CORS|Failed to load resource/.test(e)).slice(0, 5), ms: Date.now() - t0 };
    } catch (e) { out[name] = { fail: String(e).slice(0, 400), ms: Date.now() - t0 }; }
    finally {
        if (ctx) await ctx.close().catch(() => {});
        writeFileSync(`${DIR}/${LABEL}${ONLY ? '-' + ONLY.join('+') : ''}.out.json`, JSON.stringify(out, null, 1));
        console.log(name, JSON.stringify(out[name]).slice(0, 600));
    }
}
try {
    await cell("R11-swap", {}, async (p) => {
        await p.evaluate(() => {
            window.__tr = []; const t0 = performance.now();
            const mix = () => [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
            const tick = () => { const m = mix(); const ft = m?.closest("div.flex-none"); if (ft) window.__tr.push({ t: +(performance.now() - t0).toFixed(1), footH: +ft.getBoundingClientRect().height.toFixed(1), mixTop: +m.getBoundingClientRect().top.toFixed(1) }); if (performance.now() - t0 < 2500) requestAnimationFrame(tick); };
            window.__go = () => requestAnimationFrame(tick);
        });
        await p.evaluate(() => window.__go()); await p.waitForTimeout(300);
        await p.getByRole("tab", { name: "Palettes" }).first().click();
        await p.waitForTimeout(2400);
        const tr = await p.evaluate(() => window.__tr);
        let max = 0, at = null; const steps = [];
        for (let i = 1; i < tr.length; i++) { const d = tr[i].footH - tr[i - 1].footH; if (Math.abs(d) > 0.5) steps.push(+d.toFixed(1)); if (Math.abs(d) > max) { max = Math.abs(d); at = [tr[i - 1], tr[i]]; } }
        return { frames: tr.length, footFirst: tr[0]?.footH, footLast: tr.at(-1)?.footH, growth: +(tr.at(-1).footH - tr[0].footH).toFixed(1), framesWithGrowth: steps.length, maxOneFrameFootStep: +max.toFixed(1), at, GREEN: max <= 24, trace: tr.filter((f, i) => i && (f.footH !== tr[i - 1].footH || f.mixTop !== tr[i - 1].mixTop)) };
    });
    await cell("MP2-timeline", {}, async (p) => {
        await addCurrent(p, 2);
        await p.evaluate(() => {
            window.__tl = []; const t0 = performance.now();
            const tick = () => { const pl = document.querySelector(".mix-plate"); window.__tl.push({ t: +(performance.now() - t0).toFixed(1), plateH: pl ? +pl.getBoundingClientRect().height.toFixed(1) : 0, ghost: !!document.querySelector(".mix-plate--ghost") }); if (performance.now() - t0 < 3000) requestAnimationFrame(tick); };
            window.__go = () => requestAnimationFrame(tick);
        });
        await p.evaluate(() => window.__go()); await p.waitForTimeout(100);
        await mixButton(p).click(); await p.waitForTimeout(3200);
        const tl = await p.evaluate(() => window.__tl);
        let max = 0, at = null; const steps = [];
        for (let i = 1; i < tl.length; i++) { const d = tl[i].plateH - tl[i - 1].plateH; if (Math.abs(d) > 1) steps.push({ t: tl[i].t, d: +d.toFixed(1), ghost: tl[i].ghost }); if (Math.abs(d) > max) { max = Math.abs(d); at = [tl[i - 1], tl[i]]; } }
        return { frames: tl.length, plateLast: tl.at(-1)?.plateH, framesWithStep: steps.length, steps: steps.slice(0, 40), maxOneFramePlateStep: +max.toFixed(1), at, GREEN: max <= 40 };
    });
    for (const theme of ["light", "dark"]) {
        await cell(`MP7-${theme}`, { theme }, async (p) => {
            await p.waitForTimeout(600);
            const r = await p.locator(".add-slot-ghost").first().evaluate((e) => e.getBoundingClientRect().toJSON());
            const buf = await p.screenshot({ clip: { x: r.x - 12, y: r.y - 12, width: r.width + 24, height: r.height + 24 } });
            writeFileSync(`${DIR}/${LABEL}-mp7-add-ghost-${theme}.png`, buf);
            const w = r.width + 24, h = r.height + 24;
            const st = await regionStats(b, buf, { ground: { x: 0, y: 0, w, h: 8 }, ringLeft: { x: 10, y: 12 + r.height * 0.3, w: r.width * 0.22, h: r.height * 0.4 } });
            const ink = await p.evaluate(() => { const s = document.querySelector(".add-slot-ghost .watercolor-ghost-stroke"); return { wc: document.querySelector(".add-slot-ghost .watercolor-swatch")?.style.getPropertyValue("--watercolor-color"), borderColor: s ? getComputedStyle(s).borderTopColor : null }; });
            const ringVsGround = contrast(st.ringLeft.maxPx, st.ground.modal);
            return { ink, ground: st.ground.modal, ring: st.ringLeft.maxPx, ringVsGround, GREEN: ringVsGround >= 3 };
        });
    }
    await cell("MP4f-forced", { forcedColors: "active" }, async (p) => {
        const r = await p.evaluate(() => { const g = (s) => { const e = document.querySelector(s); return e ? { fca: getComputedStyle(e).forcedColorAdjust, border: getComputedStyle(e).borderTopColor } : null; }; return { mq: matchMedia("(forced-colors: active)").matches, slot: g(".add-slot-ghost"), dot: g(".add-slot-ghost .watercolor-swatch"), stroke: g(".add-slot-ghost .watercolor-ghost-stroke") }; });
        return { EMULATED: true, ...r, GREEN: r.mq && r.slot?.fca === "auto" && r.dot?.fca === "auto" };
    });
} finally { await b.close(); }
