// SS-8 · B21 probe-b — GradientEasingEditor U-1..U-10 + GradientPane U-2/U-4/U-5.
// One browser per run; one context per cell (lib.cell closes it in finally).
// usage: node probe-b.mjs [cell,cell,...]   (default: all)
import { launch, cell, goGradient, openRow, openTune, save, typeCSS, argCells, EVID } from "./lib.mjs";

const STAGE = "#easing-authoring-0";
const crop = async (page, sel, name, pad = 2) => {
    const l = page.locator(sel).first();
    if (!(await l.count())) return null;
    const bb = await l.boundingBox();
    if (!bb) return null;
    const p = `${EVID}/${name}.png`;
    await page.screenshot({ path: p, clip: { x: Math.max(0, bb.x - pad), y: Math.max(0, bb.y - pad), width: bb.width + 2 * pad, height: bb.height + 2 * pad } });
    return { png: p.split("/").pop(), bb: { w: +bb.width.toFixed(1), h: +bb.height.toFixed(1) } };
};
const colors = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { color: c.color, bg: c.backgroundColor, opacity: c.opacity, cls: e.className.toString().slice(0, 90) }; }, sel);

const HEAD_IDX = ".easing-row .interval-head > span:first-child";
const HEAD_NAME = ".easing-row .interval-head > span.text-foreground";
const RAIL_CODE = ".easing-row .readout-rail code";
const CAPTION = ".easing-row .rail-caption";

const cells = {
    // U-1 / U-2 — composited contrast samples (pixels analysed offline by contrast.py)
    async u1_contrast(b) {
        const out = {};
        for (const dark of [false, true]) {
            const k = dark ? "dark" : "light";
            out[k] = await cell(b, { dark, deviceScaleFactor: 2 }, async (page) => {
                await goGradient(page);
                await page.locator(".easing-panel").scrollIntoViewIfNeeded();
                await page.mouse.move(2, 2);
                await page.waitForTimeout(400);
                const r = { headIdxClosed: await crop(page, HEAD_IDX, `u1-${k}-head-idx`), headNameClosed: await crop(page, HEAD_NAME, `u1-${k}-head-name`),
                    css: { idx: await colors(page, HEAD_IDX), name: await colors(page, HEAD_NAME) } };
                await openRow(page, 0); await page.mouse.move(2, 2); await page.waitForTimeout(400);
                r.railCode = await crop(page, RAIL_CODE, `u1-${k}-rail-code`, 4);
                r.css.code = await colors(page, RAIL_CODE);
                r.css.rail = await colors(page, ".easing-row .readout-rail");
                r.eyebrow = await crop(page, ".family-eyebrow", `u1-${k}-eyebrow`);
                r.css.eyebrow = await colors(page, ".family-eyebrow");
                await openTune(page, 0); await page.mouse.move(2, 2); await page.waitForTimeout(400);
                r.caption = await crop(page, CAPTION, `u1-${k}-caption`);
                r.css.caption = await colors(page, CAPTION);
                r.tokens = await page.evaluate(() => { const c = getComputedStyle(document.querySelector(".easing-panel")); return { inkMuted: c.getPropertyValue("--ink-muted").trim(), mutedFg: c.getPropertyValue("--muted-foreground").trim(), well: c.getPropertyValue("--well-bg").trim() }; });
                return r;
            });
        }
        return out;
    },
    // U-3 — truncation numbers at 320 and 1512, per catalogue tile
    async u3_trunc(b) {
        const out = {};
        for (const w of [320, 1512]) {
            out[w] = await cell(b, { w, h: 900 }, async (page) => {
                await goGradient(page);
                await openRow(page, 0);
                const ids = await page.$$eval(".specimen-tile", (els) => els.map((e) => e.getAttribute("data-specimen")));
                const rows = [];
                for (const id of ids) {
                    await page.locator(`.specimen-tile[data-specimen="${id}"]`).click({ force: true });
                    await page.waitForTimeout(150);
                    rows.push(await page.evaluate((id) => { const c = document.querySelector(".easing-row .readout-rail code"); return { id, text: c.textContent, len: c.textContent.length, clientW: c.clientWidth, scrollW: c.scrollWidth, trunc: c.scrollWidth > c.clientWidth }; }, id));
                }
                await crop(page, ".easing-row .readout-rail", `u3-rail-${w}`);
                const t = rows.filter((r) => r.trunc).length;
                return { tiles: rows.length, truncated: t, pctTruncated: +(100 * t / rows.length).toFixed(1), shortest: rows.reduce((a, r) => (r.len < a.len ? r : a), rows[0]), longest: rows.reduce((a, r) => (r.len > a.len ? r : a), rows[0]), sample: rows.slice(0, 3) };
            });
        }
        return out;
    },
    // U-4 — forced colors: rail-btn keyboard focus
    async u4_forced(b) {
        const out = {};
        for (const fc of ["active", "none"]) {
            out[fc] = await cell(b, { forcedColors: fc, deviceScaleFactor: 2 }, async (page) => {
                await goGradient(page);
                await openRow(page, 0);
                const sel = 'button[aria-controls="easing-authoring-0"]';
                // reach it by keyboard so :focus-visible matches
                await page.locator(".easing-row .readout-rail button").first().focus();
                await page.keyboard.press("Tab");
                await page.waitForTimeout(250);
                const st = await page.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); return { name: e.getAttribute("aria-label"), fv: e.matches(":focus-visible"), outline: c.outline, outlineStyle: c.outlineStyle, boxShadow: c.boxShadow, fca: c.forcedColorAdjust }; });
                st.crop = await crop(page, sel, `u4-${fc}-tune-focus`, 8);
                return st;
            });
        }
        return out;
    },
    // U-5 — coarse-pointer hover persistence (Chromium touch emulation only)
    async u5_coarse(b) {
        return cell(b, { w: 390, h: 844, hasTouch: true, isMobile: true, deviceScaleFactor: 3 }, async (page) => {
            await goGradient(page);
            await page.locator(".easing-panel .interval-head").first().tap(); await page.waitForTimeout(500);
            const copy = page.locator(".easing-row .readout-rail button").first();
            await copy.tap(); await page.waitForTimeout(700);
            const r = await page.evaluate(() => { const e = document.querySelector(".easing-row .readout-rail button"); const c = getComputedStyle(e); return { hover: e.matches(":hover"), bg: c.backgroundColor, color: c.color, coarse: matchMedia("(pointer: coarse)").matches, hoverNone: matchMedia("(hover: none)").matches }; });
            await page.waitForTimeout(2000);
            r.after2s = await page.evaluate(() => { const e = document.querySelector(".easing-row .readout-rail button"); return { hover: e.matches(":hover"), bg: getComputedStyle(e).backgroundColor }; });
            return r;
        });
    },
    // U-6 — pressed vs unpressed tile computed backgrounds
    async u6_pressed(b) {
        return cell(b, {}, async (page) => {
            await goGradient(page);
            await openRow(page, 0);
            return page.evaluate(() => [...document.querySelectorAll(".specimen-tile")].slice(0, 3).map((e) => { const c = getComputedStyle(e); return { id: e.getAttribute("data-specimen"), pressed: e.getAttribute("aria-pressed") ?? e.getAttribute("aria-checked") ?? e.getAttribute("data-state"), bgColor: c.backgroundColor, bgImage: c.backgroundImage.slice(0, 80), boxShadow: c.boxShadow.slice(0, 80), border: c.borderColor, glyphStroke: getComputedStyle(e.querySelector("path")).stroke }; }));
        });
    },
    // U-7 — live regions in the editor subtree
    async u7_live(b) {
        return cell(b, {}, async (page) => {
            await goGradient(page);
            const q = () => page.evaluate(() => { const S = '[aria-live],[role="status"],[role="alert"],[role="log"]'; const p = document.querySelector(".easing-panel"); return { panel: [...p.querySelectorAll(S)].map((e) => `${e.getAttribute("role")}/${e.getAttribute("aria-live")}/${e.getAttribute("data-slot")}/visible=${!!e.offsetParent}`), document: document.querySelectorAll(S).length }; });
            const closed = await q();
            await openRow(page, 0); const open = await q();
            await openTune(page, 0); const tune = await q();
            return { closed, rowOpen: open, stageOpen: tune };
        });
    },
    // U-9 — fresh tick-level measurement: authoring drag + tile click
    async u9_perf(b) {
        return cell(b, {}, async (page, ctx) => {
            await goGradient(page);
            await openRow(page, 0); await openTune(page, 0);
            const cdp = await ctx.newCDPSession(page); await cdp.send("Performance.enable");
            const M = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
            await page.evaluate(() => { window.__ft = []; let last = performance.now(); const loop = (t) => { window.__ft.push(t - last); last = t; if (window.__ft.length < 2000) requestAnimationFrame(loop); }; requestAnimationFrame(loop); });
            const h = page.locator(`${STAGE} [role="slider"]`).first(); const bb = await h.boundingBox();
            const m0 = await M(); const t0 = Date.now();
            await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down();
            const N = 30; for (let i = 0; i < N; i++) await page.mouse.move(bb.x + 5 + i * 2, bb.y - i * 2);
            await page.mouse.up();
            const wall = Date.now() - t0; const m1 = await M();
            const ft = await page.evaluate(() => window.__ft.splice(0));
            const sorted = [...ft].sort((a, c) => a - c);
            const drag = { moves: N, wallMs: wall, scriptMsPerMove: +(((m1.ScriptDuration - m0.ScriptDuration) * 1000) / N).toFixed(2), layoutMsPerMove: +(((m1.LayoutDuration - m0.LayoutDuration) * 1000) / N).toFixed(2), frames: ft.length, frameP50: +sorted[Math.floor(sorted.length / 2)].toFixed(1), frameMax: +sorted.at(-1).toFixed(1) };
            // tile click → next two frames
            const lat = [];
            for (const id of ["ease", "back-in-out", "steps-4", "linear"]) {
                const l = page.locator(`.specimen-tile[data-specimen="${id}"]`); if (!(await l.count())) continue;
                const m2 = await M();
                await l.click({ force: true });
                const ms = await page.evaluate(() => new Promise((r) => { const s = performance.now(); requestAnimationFrame(() => requestAnimationFrame(() => r(performance.now() - s))); }));
                const m3 = await M();
                lat.push({ id, nextTwoFramesMs: +ms.toFixed(1), scriptMs: +((m3.ScriptDuration - m2.ScriptDuration) * 1000).toFixed(1) });
            }
            const ids = await page.$$eval(".specimen-tile", (els) => els.slice(0, 8).map((e) => e.getAttribute("data-specimen")));
            return { drag, tileClicks: lat, tileIds: ids };
        });
    },
    // U-10 — DOM census per row
    async u10_census(b) {
        return cell(b, {}, async (page) => {
            await goGradient(page);
            const q = () => page.evaluate(() => { const r = document.querySelector(".easing-row"); return { rowEls: r.querySelectorAll("*").length, rowPathChars: [...r.querySelectorAll("path")].reduce((a, e) => a + (e.getAttribute("d") || "").length, 0), rowPaths: r.querySelectorAll("path").length, rowSvgs: r.querySelectorAll("svg").length }; });
            const closed = await q(); await openRow(page, 0); const open = await q(); await openTune(page, 0); const tune = await q();
            return { closed, rowOpen: open, stageOpen: tune };
        });
    },
    // Pane U-2 — focus + selection ring over white / black / mid ramps (pixels offline)
    async p2_ring(b) {
        const out = {};
        for (const [k, css] of [["white", "linear-gradient(90deg, rgb(255 255 255) 0%, rgb(250 250 250) 100%)"], ["black", "linear-gradient(90deg, rgb(0 0 0) 0%, rgb(10 10 10) 100%)"], ["grey", "linear-gradient(90deg, rgb(128 128 128) 0%, rgb(140 140 140) 100%)"]]) {
            out[k] = await cell(b, { deviceScaleFactor: 2 }, async (page) => {
                await goGradient(page);
                await typeCSS(page, css, { blur: true, wait: 1200 });
                const h = page.locator('[role="slider"][aria-label^="Gradient stop 1"]').first();
                await h.click(); await page.waitForTimeout(300);
                const sel = await crop(page, '[role="slider"][aria-label^="Gradient stop 1"]', `p2-${k}-selected-pointer`, 10);
                await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
                const fs = await page.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); return { name: e.getAttribute("aria-label"), fv: e.matches(":focus-visible"), outline: c.outline, boxShadow: c.boxShadow.slice(0, 160) }; });
                const foc = await crop(page, '[role="slider"][aria-label^="Gradient stop 1"]', `p2-${k}-focus-kbd`, 10);
                return { selectedCrop: sel, focus: fs, focusCrop: foc };
            });
        }
        return out;
    },
    // Pane U-4 — failed pane chunk: boundary or silent blank?
    async p4_chunk(b) {
        return cell(b, {}, async (page, ctx) => {
            const aborted = [];
            await ctx.route(/GradientPane\.vue|GradientVisualizer\.vue/, (r) => { aborted.push(r.request().url().slice(-80)); return r.abort(); });
            await page.goto("http://localhost:9000/#/gradient", { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(9000);
            const s = await page.evaluate(() => ({ appTextLen: document.querySelector("#app")?.innerText.length, alerts: [...document.querySelectorAll('[role="alert"]')].map((e) => e.innerText.slice(0, 160)), gradientEditor: !!document.querySelector('[aria-label="Gradient CSS"]'), paneTitle: [...document.querySelectorAll("h1,h2")].map((e) => e.innerText.slice(0, 40)).slice(0, 6) }));
            await page.screenshot({ path: `${EVID}/p4-chunk-fail.png` });
            return { aborted, ...s };
        });
    },
    // Pane U-5 — focus after Reset / Seed with focus on a stop handle
    async p5_focus(b) {
        return cell(b, {}, async (page) => {
            await goGradient(page);
            const act = () => page.evaluate(() => { const e = document.activeElement; return { tag: e?.tagName, name: e?.getAttribute("aria-label") || e?.textContent?.trim().slice(0, 30), isBody: e === document.body, connected: e?.isConnected }; });
            const names = await page.$$eval("button", (bs) => bs.map((x) => x.getAttribute("aria-label") || x.innerText.trim()).filter((t) => /reset|seed/i.test(t || "")));
            const res = { dockButtons: names };
            for (const re of [/^Reset/i, /Seed/i]) {
                await page.locator('[role="slider"][aria-label^="Gradient stop 2"]').first().focus();
                const before = await act();
                const btn = page.locator("button").filter({ hasText: re }).first();
                const alt = page.getByRole("button", { name: re }).first();
                const target = (await btn.count()) ? btn : alt;
                if (!(await target.count())) { res[re.source] = { error: "no button" }; continue; }
                // activate without moving focus first: dispatch via keyboard-less click on element (mouse click moves focus to the button, so read focus BEFORE too)
                await target.evaluate((e) => e.click());
                await page.waitForTimeout(800);
                res[re.source] = { before, after: await act() };
            }
            return res;
        });
    },
};

const want = argCells();
const b = await launch();
const res = {};
try {
    for (const [k, fn] of Object.entries(cells)) {
        if (want.length && !want.includes(k)) continue;
        res[k] = await fn(b);
        console.log(k, JSON.stringify(res[k]).slice(0, 300));
    }
} finally { await b.close(); }
console.log(save(`probe-b${want.length ? "-" + want.join("+") : ""}.json`, res));
