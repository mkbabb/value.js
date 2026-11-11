// o1110 D3-swap falsifier: the value view swap, sampled every animation frame.
// One headless-shell Chromium per run, one context per cell, both closed in finally.
// Usage: node probe-d3.mjs <base-url> <outdir> [--frames]
// Per hop (driven through the dock's view menu, as the r3 check drives it):
//   picker   — the stage card's top/left per rAF: maxStep (px per 16.7 ms frame),
//              win60 (largest move inside any 60 ms window), travel.
//   crossing — frames where a non-picker card overlaps the picker card by > 24 px
//              AND paints above it at the overlap's centre (elementFromPoint).
//   seeThru  — frames where a card painted over another card is see-through
//              (effective opacity < 0.98, or an opacity animation running on it:
//              a backdrop root, whose glass carrier then frosts nothing).
// Gates (the D3 law): picker maxStep <= 40 and win60 <= 150 ("no jump");
// crossing 0 and seeThru 0 ("no frame where two panes' text overlaps legibly").
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { mkdirSync, writeFileSync } from "node:fs";

const [BASE, OUT, ...flags] = process.argv.slice(2);
const FRAMES = flags.includes("--frames");
mkdirSync(OUT, { recursive: true });

const sampler = () => {
    window.__s = [];
    const t0 = performance.now();
    const card = (w) => w.children[0]?.querySelector?.(".glass-resting") ?? w.children[0];
    const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)];
    };
    const effOpacity = (el, stop) => {
        let o = 1;
        for (let e = el; e && e !== stop.parentElement; e = e.parentElement) o *= +getComputedStyle(e).opacity;
        return o;
    };
    const opAnim = (el) =>
        el.getAnimations().some((a) => a.transitionProperty === "opacity" || (a.effect?.getKeyframes?.() ?? []).some((k) => "opacity" in k));
    const tick = () => {
        const now = performance.now() - t0;
        const stage = document.querySelector(".pane-container > .pane-wrapper--stage");
        const cards = [];
        for (const w of document.querySelectorAll(".pane-container > .pane-wrapper")) {
            for (const c of w.children) {
                if (!(c instanceof HTMLElement)) continue;
                const role = w === stage ? "picker" : c.classList.contains("vj-enter-leave-active") ? "leaver" : c.classList.contains("vj-enter-enter-active") ? "riser" : "card";
                cards.push({ role, pane: w.dataset.shown, el: c, r: rect(c), op: +effOpacity(c, w).toFixed(3), opAnim: opAnim(c) });
            }
        }
        const picker = cards.find((c) => c.role === "picker");
        let crossing = 0, seeThru = 0;
        const vis = (r) => r && r[2] > 0 && r[0] < innerWidth && r[3] > 0 && r[1] < innerHeight;
        for (let i = 0; i < cards.length; i++)
            for (let j = 0; j < cards.length; j++) {
                if (i === j) continue;
                const a = cards[i], b = cards[j];
                if (!vis(a.r) || !vis(b.r)) continue;
                const ix0 = Math.max(a.r[0], b.r[0], 0), iy0 = Math.max(a.r[1], b.r[1], 0);
                const ix1 = Math.min(a.r[2], b.r[2], innerWidth), iy1 = Math.min(a.r[3], b.r[3], innerHeight);
                if (ix1 - ix0 < 24 || iy1 - iy0 < 24) continue;
                const top = document.elementFromPoint((ix0 + ix1) / 2, (iy0 + iy1) / 2);
                if (!top || !a.el.contains(top)) continue; // a is painted above b here
                if (b === picker) crossing++;
                if (a.op < 0.98 || a.opAnim) seeThru++;
            }
        window.__s.push({
            t: Math.round(now * 10) / 10,
            picker: picker?.r ?? null,
            cards: cards.map((c) => [c.role, c.pane, c.r, c.op, c.opAnim ? 1 : 0]),
            crossing,
            seeThru,
        });
        if (now < 1400) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const summarise = (S) => {
    let maxStep = 0, win60 = 0, travel = 0, firstMoveStep = null;
    for (let i = 1; i < S.length; i++) {
        const a = S[i - 1].picker, b = S[i].picker;
        if (!a || !b) continue;
        const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const dt = Math.max(1, S[i].t - S[i - 1].t);
        const step = (d * 16.7) / dt;
        if (d > 0 && firstMoveStep === null) firstMoveStep = +step.toFixed(1);
        maxStep = Math.max(maxStep, step);
        travel += d;
        for (let j = i; j < S.length && S[j].t - S[i - 1].t <= 60; j++) {
            const c = S[j].picker;
            if (c) win60 = Math.max(win60, Math.hypot(c[0] - a[0], c[1] - a[1]));
        }
    }
    const p0 = S.find((s) => s.picker)?.picker, p1 = [...S].reverse().find((s) => s.picker)?.picker;
    return {
        frames: S.length,
        pickerFrom: p0?.slice(0, 2),
        pickerTo: p1?.slice(0, 2),
        travel: Math.round(travel),
        maxStep: +maxStep.toFixed(1),
        firstMoveStep,
        win60: Math.round(win60),
        crossingFrames: S.filter((s) => s.crossing).length,
        seeThruFrames: S.filter((s) => s.seeThru).length,
        coMountFrames: S.filter((s) => s.cards.some((c) => c[0] === "leaver")).length,
    };
};

const out = { base: BASE, at: new Date().toISOString(), cells: [] };
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    for (const [w, h] of [[390, 844], [1440, 900]])
        for (const pass of FRAMES ? ["metrics", "frames"] : ["metrics"]) {
            const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "dark", deviceScaleFactor: 1 });
            try {
                const page = await ctx.newPage();
                await page.goto(BASE, { waitUntil: "load", timeout: 60000 });
                await page.waitForSelector(".pane-container .pane-wrapper", { timeout: 30000 });
                await page.waitForTimeout(3500);
                const cell = { w, pass, hops: {} };
                for (const [name, option] of [["home-palettes", "Palettes"], ["palettes-mix", "Mix"], ["mix-home", "Home"], ["home-palettes-2", "Palettes"], ["palettes-home", "Home"]]) {
                    await page.click('[aria-label="Select view"]');
                    await page.waitForTimeout(450);
                    await page.evaluate(sampler);
                    await page.getByRole("option", { name: option, exact: true }).click();
                    if (pass === "frames") {
                        let prev = 0;
                        for (const ms of [40, 100, 180, 280, 420]) {
                            await page.waitForTimeout(ms - prev);
                            prev = ms;
                            await page.screenshot({ path: `${OUT}/${w}-${name}-${ms}.png` });
                        }
                        await page.waitForTimeout(1000);
                    } else await page.waitForTimeout(1500);
                    const S = await page.evaluate(() => window.__s);
                    cell.hops[name] = pass === "metrics" ? { ...summarise(S), sample: S.filter((_, i) => i % 3 === 0).slice(0, 30).map((s) => ({ t: s.t, p: s.picker, c: s.cards, x: s.crossing, s: s.seeThru })) } : { shots: true };
                    await page.waitForTimeout(400);
                }
                out.cells.push(cell);
                if (pass === "metrics") for (const [k, v] of Object.entries(cell.hops)) console.log(w, k, JSON.stringify({ ...v, sample: undefined }));
            } finally {
                await ctx.close();
            }
        }
} finally {
    await browser.close();
    writeFileSync(`${OUT}/probe.json`, JSON.stringify(out, null, 1));
}
