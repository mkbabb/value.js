// SS-8 · B21 probe-a — EasingAuthoringStage items (record wb-gradient-easingauthoringstage :111-123).
// One browser per run; one context per cell (lib.cell closes it in finally).
// usage: node probe-a.mjs [cell,cell,...]   (default: all)
import { launch, cell, goGradient, openRow, openTune, save, typeCSS, argCells, EVID } from "./lib.mjs";

const STAGE = "#easing-authoring-0";
const SIX = "linear-gradient(90deg, rgb(230 60 60) 0%, rgb(240 200 40) 20%, rgb(60 200 90) 40%, rgb(40 140 230) 60%, rgb(150 70 220) 80%, rgb(30 30 30) 100%)";

const describe = () => {
    const e = document.activeElement;
    if (!e) return null;
    const st = document.querySelector("#easing-authoring-0");
    return {
        tag: e.tagName, role: e.getAttribute("role"),
        name: e.getAttribute("aria-label") || (e.textContent || "").trim().slice(0, 40),
        inStage: !!(st && st.contains(e)), slot: e.getAttribute("data-slot"),
        tabindex: e.getAttribute("tabindex"),
    };
};

async function stageOpen(page, w) {
    await goGradient(page);
    await openRow(page, 0);
    await openTune(page, 0);
}

const cells = {
    // item 1 — the tab-order transcript (four Tab presses from the trigger)
    async tab_order(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            await page.focus('button[aria-controls="easing-authoring-0"]');
            const seq = [await page.evaluate(describe)];
            for (let i = 0; i < 7; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(120); seq.push(await page.evaluate(describe)); }
            const stops = await page.evaluate((s) => [...document.querySelector(s).querySelectorAll("button,[tabindex],input,select")].map((e) => ({ tag: e.tagName, name: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 30), ti: e.tabIndex, disabled: e.disabled })), STAGE);
            return { seq, focusables: stops };
        });
    },
    // item 3 — letterbox at live widths
    async letterbox(b) {
        const out = {};
        for (const w of [1440, 1024, 768, 390]) {
            out[w] = await cell(b, { w, h: 900 }, async (page) => {
                await stageOpen(page);
                return page.evaluate((s) => {
                    const st = document.querySelector(s);
                    const r = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return { w: +q.width.toFixed(2), h: +q.height.toFixed(2) }; };
                    const root = st.querySelector('[data-slot="easing-picker"]');
                    const wrap = st.querySelector('[data-slot="easing-picker"] > div');
                    const svg = st.querySelector("svg[aria-label]");
                    const vb = svg?.viewBox.baseVal;
                    const svgR = r(svg), rootR = r(root);
                    return { well: rootR, wrapper: r(wrap), svg: svgR, viewBox: vb && [vb.x, vb.y, vb.width, vb.height],
                        vbRatioVar: getComputedStyle(st.firstElementChild).getPropertyValue("--vb-ratio"),
                        aspect: getComputedStyle(svg).aspectRatio,
                        inlineLetterboxPct: rootR && svgR ? +(100 * (1 - svgR.w / rootR.w)).toFixed(1) : null,
                        svgBoxVsVb: svgR && vb ? +((svgR.h / svgR.w) / (vb.height / vb.width)).toFixed(4) : null };
                }, STAGE);
            });
        }
        return out;
    },
    // item 5 — disclosure-open lurch and regime-flip lurch
    async lurch(b) {
        return cell(b, {}, async (page) => {
            await goGradient(page);
            await openRow(page, 0);
            const probeY = () => page.evaluate(() => {
                const p = document.querySelector(".easing-panel");
                const next = p.parentElement.nextElementSibling || p.nextElementSibling;
                return { panelH: +p.getBoundingClientRect().height.toFixed(2), nextTop: next ? +next.getBoundingClientRect().top.toFixed(2) : null, nextTag: next?.className?.toString().slice(0, 60) };
            });
            const before = await probeY();
            await page.locator('button[aria-controls="easing-authoring-0"]').click();
            const samples = [];
            for (const t of [0, 40, 120, 400]) { await page.waitForTimeout(t ? t - (samples.at(-1)?.t ?? 0) : 0); samples.push({ t, ...(await probeY()) }); }
            const afterOpen = await probeY();
            const svgH0 = await page.evaluate((s) => document.querySelector(s + " svg[aria-label]").getBoundingClientRect().height, STAGE);
            await page.locator(`${STAGE} button`, { hasText: "Steps" }).first().click({ force: true });
            const flip = [];
            let t0 = Date.now();
            for (let i = 0; i < 8; i++) { flip.push({ t: Date.now() - t0, svgH: await page.evaluate((s) => +document.querySelector(s + " svg[aria-label]")?.getBoundingClientRect().height.toFixed(2), STAGE), ...(await probeY()) }); await page.waitForTimeout(60); }
            const transition = await page.evaluate((s) => getComputedStyle(document.querySelector(s + " svg[aria-label]")).transition, STAGE);
            return { before, openSamples: samples, afterOpen, openDelta: +(afterOpen.panelH - before.panelH).toFixed(2), svgH0, flip, flipDelta: +(flip.at(-1).panelH - afterOpen.panelH).toFixed(2), svgTransition: transition };
        });
    },
    // item 6 — "Pick a curve" persistence after a direct drag (custom)
    async placeholder(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            const trig = `${STAGE} [data-slot="select-trigger"]`;
            const t0 = (await page.locator(trig).innerText()).trim();
            const h = page.locator(`${STAGE} [role="slider"]`).first();
            const bb = await h.boundingBox();
            await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
            await page.mouse.down();
            await page.mouse.move(bb.x + 40, bb.y - 50, { steps: 6 });
            await page.mouse.up();
            await page.waitForTimeout(500);
            const t1 = (await page.locator(trig).innerText()).trim();
            const name = (await page.locator(".easing-panel .interval-head").first().innerText()).replace(/\s+/g, " ");
            await page.screenshot({ path: `${EVID}/a-placeholder-after-drag.png`, clip: await page.locator(STAGE).boundingBox() });
            return { triggerBefore: t0, triggerAfterDrag: t1, headAfterDrag: name };
        });
    },
    // item 7 — two-SVG census under the stage's svg[aria-label] rule
    async svg_census(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            const r = async () => page.evaluate((s) => [...document.querySelector(s).querySelectorAll("svg")].map((e) => ({ label: e.getAttribute("aria-label"), role: e.getAttribute("role"), cls: (e.getAttribute("class") || "").slice(0, 50), aspect: getComputedStyle(e).aspectRatio, h: +e.getBoundingClientRect().height.toFixed(1) })), STAGE);
            const bezier = await r();
            await page.locator(`${STAGE} button`, { hasText: "Steps" }).first().click({ force: true });
            await page.waitForTimeout(500);
            const steps = await r();
            return { bezier, steps };
        });
    },
    // item 8 — rAF counts: idle closed / idle stage-open / during drag
    async raf(b) {
        return cell(b, {}, async (page, ctx) => {
            await ctx.addInitScript(() => {
                window.__raf = 0; const o = window.requestAnimationFrame.bind(window);
                window.requestAnimationFrame = (cb) => { window.__raf++; return o(cb); };
            });
            await goGradient(page);
            const rate = async (ms) => { const a = await page.evaluate(() => window.__raf); await page.waitForTimeout(ms); const z = await page.evaluate(() => window.__raf); return +((z - a) / (ms / 1000)).toFixed(1); };
            const idleClosed = await rate(2000);
            await openRow(page, 0); await openTune(page, 0); await page.waitForTimeout(800);
            const idleOpen = await rate(2000);
            const h = page.locator(`${STAGE} [role="slider"]`).first();
            const bb = await h.boundingBox();
            const a = await page.evaluate(() => window.__raf);
            await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down();
            for (let i = 0; i < 20; i++) await page.mouse.move(bb.x + 5 + i * 3, bb.y - i * 3);
            await page.mouse.up();
            const z = await page.evaluate(() => window.__raf);
            return { idleClosedPerS: idleClosed, idleStageOpenPerS: idleOpen, rafPer20Moves: z - a };
        });
    },
    // item 9 — mode transition table (controls per regime, and the doors between them)
    async mode_table(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            const inv = () => page.evaluate((s) => [...document.querySelector(s).querySelectorAll("button,[role=slider],[role=combobox],input")].filter((e) => e.offsetParent || e.getBBox).map((e) => `${e.getAttribute("role") || e.tagName}:${e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20)}${e.getAttribute("aria-pressed") ? "[pressed=" + e.getAttribute("aria-pressed") + "]" : ""}${e.getAttribute("aria-checked") ? "[checked=" + e.getAttribute("aria-checked") + "]" : ""}`), STAGE);
            const t = [{ state: "bezier(boot)", controls: await inv() }];
            await page.locator(`${STAGE} button`, { hasText: "Steps" }).first().click({ force: true }); await page.waitForTimeout(400);
            t.push({ state: "after Steps button", controls: await inv(), head: (await page.locator(".interval-head").first().innerText()).replace(/\s+/g, " ") });
            await page.locator(`${STAGE} button`, { hasText: "Bezier" }).first().click({ force: true }); await page.waitForTimeout(400);
            t.push({ state: "after Bezier button", controls: await inv(), head: (await page.locator(".interval-head").first().innerText()).replace(/\s+/g, " ") });
            // keyboard: is the mode group arrow-operable?
            await page.locator(`${STAGE} button`, { hasText: "Bezier" }).first().focus();
            await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400);
            t.push({ state: "after ArrowRight on Bezier", controls: await inv(), active: await page.evaluate(() => document.activeElement?.textContent?.trim()) });
            return { table: t };
        });
    },
    // item 10 — N-3/N-4: ::before + box-shadow at rest / hover / handle focus (Tab)
    async n3n4(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            const read = () => page.evaluate((s) => {
                const r = document.querySelector(s + ' [data-slot="easing-picker"]');
                const cs = getComputedStyle(r), bf = getComputedStyle(r, "::before");
                return { cls: r.className.slice(0, 120), boxShadow: cs.boxShadow, bg: cs.backgroundColor, border: cs.border, backdrop: cs.backdropFilter,
                    before: { content: bf.content, opacity: bf.opacity, blend: bf.mixBlendMode, bg: bf.backgroundImage.slice(0, 80), boxShadow: bf.boxShadow.slice(0, 80) },
                    focusRingShadowToken: cs.getPropertyValue("--focus-ring-shadow").trim().slice(0, 80) };
            }, STAGE);
            const rest = await read();
            await page.locator(`${STAGE} [data-slot="easing-picker"]`).hover(); await page.waitForTimeout(300);
            const hover = await read();
            await page.mouse.move(5, 5);
            await page.focus('button[aria-controls="easing-authoring-0"]'); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
            const afterTab = { ...(await read()), active: await page.evaluate(() => document.activeElement?.getAttribute("aria-label")),
                handleFocus: await page.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); return { outline: c.outline, filter: c.filter, stroke: c.stroke, strokeWidth: c.strokeWidth }; }) };
            await page.screenshot({ path: `${EVID}/a-n4-after-tab.png`, clip: await page.locator(STAGE).boundingBox() });
            return { rest, hover, afterTab };
        });
    },
    // item 11 — multi-instance cost with six stops (five live pickers)
    async multi(b) {
        return cell(b, {}, async (page, ctx) => {
            await ctx.addInitScript(() => { window.__raf = 0; const o = window.requestAnimationFrame.bind(window); window.requestAnimationFrame = (cb) => { window.__raf++; return o(cb); }; });
            await goGradient(page);
            const census = () => page.evaluate(() => {
                const p = document.querySelector(".easing-panel");
                return { rows: p.querySelectorAll(".easing-row").length, pickers: p.querySelectorAll('[data-slot="easing-picker"]').length, els: p.querySelectorAll("*").length, docEls: document.querySelectorAll("*").length,
                    pathChars: [...p.querySelectorAll("path")].reduce((a, e) => a + (e.getAttribute("d") || "").length, 0) };
            });
            const two = await census();
            await typeCSS(page, SIX, { blur: true, wait: 1200 });
            const six = await census();
            const cdp = await ctx.newCDPSession(page); await cdp.send("Performance.enable");
            const m0 = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
            const r0 = await page.evaluate(() => window.__raf);
            await page.waitForTimeout(3000);
            const m1 = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
            const r1 = await page.evaluate(() => window.__raf);
            const heap = { jsHeapMB: +(m1.JSHeapUsedSize / 1048576).toFixed(1), nodes: m1.Nodes };
            return { two, six, idle3s: { rafPerS: +((r1 - r0) / 3).toFixed(1), scriptMs: +((m1.ScriptDuration - m0.ScriptDuration) * 1000).toFixed(1), layoutMs: +((m1.LayoutDuration - m0.LayoutDuration) * 1000).toFixed(1), recalcMs: +((m1.RecalcStyleDuration - m0.RecalcStyleDuration) * 1000).toFixed(1) }, heap };
        });
    },
    // items 12 + editor U-8 — role="img" locator census at HEAD
    async role_img(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            return page.evaluate((s) => {
                const st = document.querySelector(s);
                return { roleImgInStage: st.querySelectorAll('[role="img"]').length, roleGroupInStage: st.querySelectorAll('[role="group"]').length,
                    canvas: [...st.querySelectorAll("svg[aria-label]")].map((e) => ({ role: e.getAttribute("role"), label: e.getAttribute("aria-label") })),
                    glassVersionHint: [...document.querySelectorAll("script[type=module]")].length };
            }, STAGE);
        });
    },
    // item 13 — EAS-13 accents in the steps regime: slider fill vs curve stroke
    async accent(b) {
        return cell(b, {}, async (page) => {
            await stageOpen(page);
            await page.locator(`${STAGE} button`, { hasText: "Steps" }).first().click({ force: true });
            await page.waitForTimeout(600);
            const r = await page.evaluate((s) => {
                const st = document.querySelector(s);
                const strokes = [...st.querySelectorAll('[data-slot="easing-curve-stroke"]')].map((e) => ({ stroke: getComputedStyle(e).stroke, op: getComputedStyle(e).opacity }));
                const slider = st.querySelector('[role="slider"][aria-label="Step count"]') || st.querySelector('[aria-label="Step count"]');
                const sroot = slider?.closest('[data-slot="slider"]') || slider?.parentElement?.parentElement;
                const fills = sroot ? [...sroot.querySelectorAll("*")].map((e) => ({ slot: e.getAttribute("data-slot"), bg: getComputedStyle(e).backgroundColor })).filter((x) => x.bg !== "rgba(0, 0, 0, 0)") : null;
                const row = st.closest(".easing-row");
                return { motionAccent: getComputedStyle(row).getPropertyValue("--motion-accent").trim(), easingCurveAccent: getComputedStyle(st).getPropertyValue("--easing-curve-accent").trim(), strokes, stepCount: slider ? { tag: slider.tagName, role: slider.getAttribute("role") } : null, sliderFills: fills };
            }, STAGE);
            await page.screenshot({ path: `${EVID}/a-accent-steps.png`, clip: await page.locator(STAGE).boundingBox() });
            return r;
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
console.log(save(`probe-a${want.length ? "-" + want.join("+") : ""}.json`, res));
