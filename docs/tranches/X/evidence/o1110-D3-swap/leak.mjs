// o1110 D3-swap falsifier, the overlap arm: does an under-card's TEXT read through the card above it?
// For each hop, every animation is frozen on the swap's first co-mounted frame and seeked to
// t = 80/160/240/320 ms. For every pair of cards (leaver, riser, picker) that overlap by >= 24 px
// where card A paints above card B, the overlap is screenshotted twice: as drawn, and with B hidden.
// leak = mean |Laplacian(drawn) - Laplacian(B hidden)| over the overlap (text edges of B that survive
// A's plate). A frosting plate blurs B's glyphs to near nothing; a see-through plate passes them.
// Gate: every pose's net leak (leak minus the pose's own two-shot noise floor) <= 3.0. Calibration: a frosting plate (the uncontained picker over the same cards) reads 0.5-1.4; base reads 4.6-8.3 with the under-card glyphs legible in the frames.
// One headless-shell Chromium, one context per cell, both closed in finally.
// Usage: node leak.mjs <base-url> <outdir>
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { mkdirSync, writeFileSync } from "node:fs";

const [BASE, OUT] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });
const SEEKS = process.env.LEAK_SEEKS ? process.env.LEAK_SEEKS.split(",").map(Number) : [80, 160, 240, 320];

const lapDiff = (page, a, b) =>
    page.evaluate(async ([A, B]) => {
        const dec = async (s) => {
            const i = new Image();
            i.src = "data:image/png;base64," + s;
            await i.decode();
            const c = new OffscreenCanvas(i.width, i.height);
            const x = c.getContext("2d");
            x.drawImage(i, 0, 0);
            return [x.getImageData(0, 0, i.width, i.height).data, i.width, i.height];
        };
        const [p, W, H] = await dec(A), [q] = await dec(B);
        const lum = (d, k) => 0.299 * d[k] + 0.587 * d[k + 1] + 0.114 * d[k + 2];
        let s = 0, n = 0;
        for (let y = 1; y < H - 1; y++)
            for (let x = 1; x < W - 1; x++) {
                const k = (y * W + x) * 4, up = k - W * 4, dn = k + W * 4;
                const lp = 4 * lum(p, k) - lum(p, k - 4) - lum(p, k + 4) - lum(p, up) - lum(p, dn);
                const lq = 4 * lum(q, k) - lum(q, k - 4) - lum(q, k + 4) - lum(q, up) - lum(q, dn);
                s += Math.abs(lp - lq);
                n++;
            }
        return n ? +(s / n).toFixed(2) : 0;
    }, [a.toString("base64"), b.toString("base64")]);

const out = { base: BASE, at: new Date().toISOString(), cells: [] };
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    for (const [w, h, start, opt, name] of (process.env.LEAK_QUICK ? (x) => x.filter((c) => c[4] === "palettes-home") : (x) => x)([
        [390, 844, "", "Palettes", "home-palettes"],
        [390, 844, "#/palettes", "Home", "palettes-home"],
        [390, 844, "#/palettes", "Mix", "palettes-mix"],
        [390, 844, "#/mix", "Palettes", "mix-palettes"],
        [1440, 900, "", "Palettes", "home-palettes"],
        [1440, 900, "#/palettes", "Home", "palettes-home"],
    ]))
        for (const seek of SEEKS) {
            const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "dark", deviceScaleFactor: 1 });
            try {
                const page = await ctx.newPage();
                await page.goto(BASE + start, { waitUntil: "load", timeout: 60000 });
                await page.waitForSelector(".pane-container .pane-wrapper", { timeout: 30000 });
                await page.waitForTimeout(3000);
                if (process.env.LEAK_CSS) await page.addStyleTag({ content: process.env.LEAK_CSS });
                await page.click('[aria-label="Select view"]');
                await page.waitForTimeout(450);
                await page.evaluate(() => {
                    // Vue's leave ends on a wall-clock fallback timer (duration + 1 ms) as well as on
                    // transitionend; a frozen pose must outlive it, so timers of 100-1000 ms armed
                    // after the input are held (the preload hold also resolves on its promise).
                    const st = window.setTimeout;
                    window.setTimeout = (fn, ms, ...a) => (ms >= 100 && ms <= 1000 ? 0 : st(fn, ms, ...a));
                    window.__frozen = new Promise((res) => {
                        const f = () => {
                            // freeze only once the swap's transitions RUN: Vue swaps *-from for *-to a
                            // frame after insertion, and a transition born after the pause would play on
                            const l = document.querySelector(".pane-wrapper > .vj-enter-leave-active");
                            const r = l?.parentElement.querySelector(":scope > .vj-enter-enter-active");
                            const running = (e) => e && e.getAnimations().some((a) => a.playState === "running" && a.currentTime > 0);
                            if (l && running(l) && (!r || running(r))) {
                                document.getAnimations().forEach((a) => a.pause());
                                res();
                            } else requestAnimationFrame(f);
                        };
                        requestAnimationFrame(f);
                    });
                });
                await page.getByRole("option", { name: opt, exact: true }).click();
                await page.evaluate(() => window.__frozen);
                // the dock menu's own fade (glass O-171) is not this lane's: hide it
                await page.addStyleTag({ content: '[data-slot="select-content"],[role="listbox"]{visibility:hidden!important}' });
                await page.evaluate((ms) => document.getAnimations().forEach((a) => { try { a.currentTime = ms; } catch {} }), seek);
                if (process.env.LEAK_MUTATE) await page.evaluate(process.env.LEAK_MUTATE);
                await page.waitForTimeout(120);
                const pairs = await page.evaluate(() => {
                    const hitStyle = document.createElement("style");
                    hitStyle.textContent = ".pane-container > .pane-wrapper > *{pointer-events:auto!important}";
                    document.head.append(hitStyle);
                    const inert = [...document.querySelectorAll(".pane-container [inert]")];
                    inert.forEach((e) => e.removeAttribute("inert"));
                    const stage = document.querySelector(".pane-container > .pane-wrapper--stage");
                    const cards = [];
                    let id = 0;
                    for (const wr of document.querySelectorAll(".pane-container > .pane-wrapper"))
                        for (const c of wr.children) {
                            if (!(c instanceof HTMLElement)) continue;
                            c.dataset.leakId = String(++id);
                            const role = wr === stage ? "picker" : c.classList.contains("vj-enter-leave-active") ? "leaver" : "riser";
                            const r = c.getBoundingClientRect();
                            cards.push({ id, role, r: [r.left, r.top, r.right, r.bottom] });
                        }
                    const res = [];
                    for (const a of cards)
                        for (const b of cards) {
                            if (a === b) continue;
                            const x0 = Math.max(a.r[0], b.r[0], 0) + 8, y0 = Math.max(a.r[1], b.r[1], 0) + 8;
                            const x1 = Math.min(a.r[2], b.r[2], innerWidth) - 8, y1 = Math.min(a.r[3], b.r[3], innerHeight) - 8;
                            if (x1 - x0 < 24 || y1 - y0 < 24) continue;
                            const top = document.elementFromPoint((x0 + x1) / 2, (y0 + y1) / 2);
                            const ae = document.querySelector(`[data-leak-id="${a.id}"]`);
                            if (!top || !ae.contains(top)) continue;
                            res.push({ a: a.role, b: b.role, bId: b.id, clip: { x: Math.round(x0), y: Math.round(y0), width: Math.round(x1 - x0), height: Math.round(y1 - y0) } });
                        }
                    hitStyle.remove();
                    inert.forEach((e) => e.setAttribute("inert", ""));
                    return res;
                });
                const live = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
                const cell = { w, hop: name, seek, live, pairs: [] };
                for (const p of pairs) {
                    const drawn = await page.screenshot({ clip: p.clip, path: `${OUT}/${w}-${name}-${seek}-${p.a}-over-${p.b}.png` });
                    await page.waitForTimeout(60);
                    const again = await page.screenshot({ clip: p.clip });
                    await page.evaluate((id) => { const e = document.querySelector(`[data-leak-id="${id}"]`); if (e) e.style.visibility = "hidden"; }, p.bId);
                    await page.waitForTimeout(60);
                    const hidden = await page.screenshot({ clip: p.clip });
                    await page.evaluate((id) => { const e = document.querySelector(`[data-leak-id="${id}"]`); if (e) e.style.visibility = ""; }, p.bId);
                    await page.waitForTimeout(60);
                    cell.pairs.push({ over: `${p.a}>${p.b}`, clip: p.clip, leak: await lapDiff(page, drawn, hidden), floor: await lapDiff(page, drawn, again) });
                }
                out.cells.push(cell);
                console.log(w, name, seek, "live", live, JSON.stringify(cell.pairs.map((p) => [p.over, p.leak, "floor", p.floor, p.clip.width + "x" + p.clip.height])));
            } catch (e) {
                console.log(w, name, seek, "error", String(e).slice(0, 200));
            } finally {
                await ctx.close();
            }
        }
} finally {
    await browser.close();
    const all = out.cells.flatMap((c) => c.pairs.map((p) => ({ w: c.w, hop: c.hop, seek: c.seek, ...p })));
    // net of the pose's own noise floor (an ambient loop still running in the clip)
    for (const p of all) p.net = +Math.max(0, p.leak - p.floor).toFixed(2);
    out.maxLeak = Math.max(0, ...all.map((p) => p.net));
    out.overGate = all.filter((p) => p.net > 3.0).map((p) => `${p.w} ${p.hop} @${p.seek} ${p.over} ${p.net} (raw ${p.leak}, floor ${p.floor})`);
    writeFileSync(`${OUT}/leak.json`, JSON.stringify(out, null, 1));
    console.log("maxLeak", out.maxLeak, "overGate", out.overGate.length, JSON.stringify(out.overGate));
}
