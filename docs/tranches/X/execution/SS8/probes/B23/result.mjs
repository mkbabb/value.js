// SERVED MODEL: claude-opus-5-5 · SS-8 B23 — wb-mix-resultdisplay live cells.
// usage: node result.mjs <cell...>  cells: tone swap order turb zoom400 c6 throw teleport pcm
// One chromium per run, one context per cell, closed in finally.
import { launch, open, readyMix, addCurrent, mixButton, mixAndSettle, selectPalettes, pal, hues, save, samplePng, contrast, EVID } from "./lib.mjs";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

const want = new Set(process.argv.slice(2));
const b = await launch();
const out = {};
const cell = async (name, fn) => {
    if (!want.has(name)) return;
    try { out[name] = await fn(); } catch (e) { out[name] = { error: String(e).slice(0, 400) }; }
    save(`result-${name}.json`, out[name]);
    console.log(name, JSON.stringify(out[name]).slice(0, 1600));
};
const P12 = [pal("a12", "Alpha Twelve", hues(12, 0.7, 0.15, 0)), pal("b12", "Beta Twelve", hues(12, 0.55, 0.12, 15))];
const plateRect = (p) => p.evaluate(() => document.querySelector(".mix-plate")?.getBoundingClientRect().toJSON() ?? null);

try {
    // R-1 (D-46) — the plate/host tone step, painted, light + dark; palette result.
    await cell("tone", async () => {
        const r = {};
        for (const theme of ["light", "dark"]) {
            const { ctx, p, errors } = await open(b, { theme, saved: P12 });
            try {
                await readyMix(p);
                await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]);
                await mixAndSettle(p, 700);
                const pr = await plateRect(p);
                await p.evaluate(() => { const c = document.querySelector("canvas.z-controls"); if (c) c.style.visibility = "hidden"; });
                const shot = await p.screenshot();
                writeFileSync(resolve(EVID, `tone-${theme}-1440.png`), shot);
                const pts = {};
                for (let i = 0; i < 5; i++) { pts[`in${i}`] = { x: pr.x + 6, y: pr.y + 10 + i * 6 }; pts[`out${i}`] = { x: pr.x - 6, y: pr.y + 10 + i * 6 }; }
                const S = await samplePng(b, shot, pts);
                const med = (k) => { const a = Object.entries(S).filter(([n]) => n.startsWith(k)).map(([, v]) => v).sort((x, y) => x[0] + x[1] + x[2] - (y[0] + y[1] + y[2])); return a[a.length >> 1]; };
                const plate = med("in"), host = med("out");
                r[theme] = { plateRect: pr, plate, host, contrast: contrast(plate, host), samples: S, errors };
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-2 (MR-3) · R-7 (D-3/D-40) — frame-sampled swap timeline, no-preference; palette + color arms; then Reset exit.
    await cell("swap", async () => {
        const r = {};
        for (const arm of ["palette", "color"]) {
            const { ctx, p, errors } = await open(b, { saved: P12 });
            try {
                await readyMix(p);
                if (arm === "palette") await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]); else await addCurrent(p, 2);
                await p.evaluate(() => {
                    window.__tl = []; const t0 = performance.now(); window.__t0 = t0;
                    const tick = () => {
                        const pl = document.querySelector(".mix-plate");
                        const kids = pl ? [...pl.children].filter((c) => c.tagName !== "H3") : [];
                        window.__tl.push({ t: Math.round(performance.now() - t0), plate: !!pl, ghost: !!document.querySelector(".mix-plate--ghost"),
                            plateH: pl ? +pl.getBoundingClientRect().height.toFixed(1) : null, plateY: pl ? +pl.getBoundingClientRect().y.toFixed(1) : null,
                            plateOp: pl ? +(+getComputedStyle(pl).opacity).toFixed(3) : null, plateCls: pl?.className.replace(/flex|flex-col|gap-3|p-4|rounded-xl|bg-well/g, "").trim(),
                            kids: kids.map((k) => ({ cls: (k.className || "").toString().replace(/flex|flex-col|items-center|gap-3/g, "").trim(), op: +(+getComputedStyle(k).opacity).toFixed(3), tp: getComputedStyle(k).transitionProperty, td: getComputedStyle(k).transitionDuration })) });
                        if (performance.now() - t0 < 2600) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                });
                await mixButton(p).click();
                await p.waitForTimeout(2800);
                const tl = await p.evaluate(() => window.__tl);
                // Reset exit: sample plate per frame after clicking Reset
                await p.evaluate(() => {
                    window.__ex = []; const t0 = performance.now();
                    const tick = () => { const pl = document.querySelector(".mix-plate"); window.__ex.push({ t: Math.round(performance.now() - t0), plate: !!pl, op: pl ? +(+getComputedStyle(pl).opacity).toFixed(3) : null, cls: pl?.className.match(/vj-morph\S*/g) ?? null, tp: pl ? getComputedStyle(pl).transitionProperty : null });
                        if (performance.now() - t0 < 900) requestAnimationFrame(tick); };
                    requestAnimationFrame(tick);
                });
                await p.locator(".mix-plate").getByTitle("Reset").click();
                await p.waitForTimeout(1000);
                const ex = await p.evaluate(() => window.__ex);
                const ghostFrames = tl.filter((f) => f.ghost), settled = tl.filter((f) => f.plate && !f.ghost);
                const firstSettled = settled[0];
                const contentFrames = tl.filter((f) => f.kids.some((k) => /vj-morph-enter/.test(k.cls)));
                const emptyFrames = tl.filter((f) => f.plate && f.kids.length === 0);
                const leaveFrames = tl.filter((f) => f.kids.some((k) => /vj-morph-leave/.test(k.cls)));
                r[arm] = { ghostH: ghostFrames.at(-1)?.plateH, settledH: tl.at(-1)?.plateH, heightJump: +(tl.at(-1)?.plateH - ghostFrames.at(-1)?.plateH).toFixed(1),
                    ghostWindowMs: ghostFrames.length ? [ghostFrames[0].t, ghostFrames.at(-1).t] : null, firstSettledT: firstSettled?.t,
                    leaveWindowMs: leaveFrames.length ? [leaveFrames[0].t, leaveFrames.at(-1).t] : null,
                    enterWindowMs: contentFrames.length ? [contentFrames[0].t, contentFrames.at(-1).t] : null,
                    enterOpacities: contentFrames.map((f) => f.kids.map((k) => k.op).join("/")).slice(0, 20),
                    enterTransition: contentFrames[0]?.kids.map((k) => `${k.tp} ${k.td}`),
                    emptyPlateFrames: emptyFrames.length,
                    resetExit: { framesWithPlate: ex.filter((f) => f.plate).length, lastPlateT: ex.filter((f) => f.plate).at(-1)?.t ?? null, opacities: ex.filter((f) => f.plate).map((f) => f.op), cls: ex.find((f) => f.cls)?.cls ?? null, tp: ex[0]?.tp },
                    timeline: tl.filter((f, i) => i % 3 === 0 || f.kids.some((k) => /vj-morph/.test(k.cls))).slice(0, 70), errors };
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-3 (D-45) — region order + verb→answer offset at 390×844, populated.
    await cell("order", async () => {
        const { ctx, p, errors } = await open(b, { viewport: { width: 390, height: 844 }, saved: P12, isMobile: true, hasTouch: true });
        try {
            await readyMix(p);
            await addCurrent(p, 2);
            await mixAndSettle(p, 700);
            const r = await p.evaluate(() => {
                const pl = document.querySelector(".mix-plate"); const btn = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
                const sel = document.querySelector("[data-mix-direction]");
                const R = (e) => e && { y: +e.getBoundingClientRect().y.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1), bottom: +e.getBoundingClientRect().bottom.toFixed(1) };
                const footer = btn?.closest(".border-t") ?? btn?.parentElement?.parentElement;
                return { rack: R(sel), plate: R(pl), mixButton: R(btn), commitRegion: R(footer), domOrder: sel && pl && btn ? [sel, pl, btn].map((e) => e === sel ? "rack" : e === pl ? "result" : "commit").sort((a, c) => 0) : null,
                    plateBeforeCommitInDoc: !!(pl && btn && (pl.compareDocumentPosition(btn) & Node.DOCUMENT_POSITION_FOLLOWING)) };
            });
            r.plateTopMinusCommitTop = r.plate && r.commitRegion ? +(r.plate.y - r.commitRegion.y).toFixed(1) : null;
            await p.screenshot({ path: resolve(EVID, "order-390-light.png") });
            return { ...r, errors };
        } finally { await ctx.close(); }
    });

    // R-4 (D-48) — the rendered turbulence parameters + face sizes in both arms.
    await cell("turb", async () => {
        const r = {};
        for (const arm of ["color", "palette"]) {
            const { ctx, p, errors } = await open(b, { saved: P12 });
            try {
                await readyMix(p);
                if (arm === "palette") await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]); else await addCurrent(p, 2);
                await mixAndSettle(p, 700);
                r[arm] = await p.evaluate(() => {
                    const pl = document.querySelector(".mix-plate");
                    const svgs = [...pl.querySelectorAll("svg")].filter((s) => s.querySelector("feTurbulence"));
                    const dots = [...pl.querySelectorAll("feTurbulence")].map((ft) => {
                        const f = ft.closest("filter"); const host = f.closest("svg")?.parentElement; const box = host?.getBoundingClientRect();
                        const dm = f.querySelector("feDisplacementMap");
                        return { baseFrequency: ft.getAttribute("baseFrequency"), numOctaves: ft.getAttribute("numOctaves"), primitiveUnits: f.getAttribute("primitiveUnits") ?? "userSpaceOnUse(default)", filterUnits: f.getAttribute("filterUnits"), dispScale: dm?.getAttribute("scale"), boxW: box && +box.width.toFixed(1) };
                    });
                    const u = new Map(); for (const d of dots) { const k = JSON.stringify(d); u.set(k, (u.get(k) ?? 0) + 1); }
                    const anyFilter = [...pl.querySelectorAll("*")].map((e) => getComputedStyle(e).filter).filter((f) => f && f !== "none").slice(0, 3);
                    return { distinct: [...u].map(([k, n]) => ({ n, ...JSON.parse(k) })), svgCount: svgs.length, cssFilters: anyFilter };
                });
                r[arm].errors = errors;
                await p.locator(".mix-plate").screenshot({ path: resolve(EVID, `turb-${arm}-1440-light.png`) });
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-5 — the 400% arm: 1280 CSS px at 400 % = 320×256 CSS viewport; plus the 1440 desktop row.
    await cell("zoom400", async () => {
        const r = {};
        for (const [label, vp] of [["400pct-320x256", { width: 320, height: 256 }], ["1440", { width: 1440, height: 900 }]]) {
            const { ctx, p, errors } = await open(b, { viewport: vp, saved: P12 });
            try {
                await readyMix(p);
                await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]);
                await mixAndSettle(p, 700);
                await p.locator(".mix-plate").scrollIntoViewIfNeeded();
                r[label] = await p.evaluate(() => {
                    const pl = document.querySelector(".mix-plate"); const row = pl.querySelector(".swatch-row");
                    const faces = [...row.children]; const tops = new Map();
                    for (const f of faces) { const y = Math.round(f.getBoundingClientRect().y); tops.set(y, (tops.get(y) ?? 0) + 1); }
                    const strip = pl.querySelector("[role=presentation]");
                    return { faces: faces.length, rowWidth: +row.getBoundingClientRect().width.toFixed(1), facesPerRow: [...tops.values()], stripH: strip && +strip.getBoundingClientRect().height.toFixed(1), stripW: strip && +strip.getBoundingClientRect().width.toFixed(1),
                        plateW: +pl.getBoundingClientRect().width.toFixed(1), docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                        actionsVisible: [...pl.querySelectorAll("[title]")].filter((e) => e.getBoundingClientRect().width > 0).length };
                });
                r[label].errors = errors;
                await p.screenshot({ path: resolve(EVID, `zoom-${label}-light.png`), fullPage: false });
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-6 — C r6's three runtime JSONs re-taken through the real UI (startMix via the Mix verb).
    await cell("c6", async () => {
        const { ctx, p, errors } = await open(b, { saved: P12, permissions: ["clipboard-read", "clipboard-write"] });
        try {
            await readyMix(p);
            await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]);
            await mixAndSettle(p, 700);
            // node identity across a same-length re-mix (change hue method → re-mix)
            await p.evaluate(() => { window.__n0 = document.querySelector(".mix-plate .swatch-row > *"); window.__strip0 = document.querySelector(".mix-plate [role=presentation]").style.background;
                window.__enterSeen = false; new MutationObserver(() => { if (document.querySelector(".mix-plate .vj-enter-enter-active")) window.__enterSeen = true; }).observe(document.body, { subtree: true, attributes: true, childList: true }); });
            await p.locator("select, [role=combobox]").filter({ hasText: /OKLab/ }).first().click();
            await p.getByRole("option", { name: /^OKLCh$|^OKLCH$|LCh/i }).first().click().catch(async () => { await p.keyboard.press("ArrowDown"); await p.keyboard.press("Enter"); });
            await p.waitForTimeout(300);
            await mixAndSettle(p, 800);
            const identity = await p.evaluate(() => { const n1 = document.querySelector(".mix-plate .swatch-row > *");
                return { sameDomNodeReused: window.__n0 === n1, n0Connected: window.__n0?.isConnected ?? null, stripChanged: window.__strip0 !== document.querySelector(".mix-plate [role=presentation]").style.background, enterClassSeen: window.__enterSeen, faces: document.querySelectorAll(".mix-plate .swatch-row > *").length }; });
            // copy timing
            const copyBtn = p.locator(".mix-plate").getByTitle(/Copy color|Copied!/);
            await copyBtn.click();
            const ct = [];
            for (const ms of [50, 700, 1400, 1700, 2200]) { await p.waitForTimeout(ms - (ct.at(-1)?.ms ?? 0)); ct.push({ ms, title: await p.locator(".mix-plate [title]").first().getAttribute("title") }); }
            const clip = await p.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e.message));
            // focus across Reset (keyboard activation)
            await p.locator(".mix-plate").getByTitle("Reset").focus();
            const before = await p.evaluate(() => document.activeElement?.getAttribute("title"));
            await p.keyboard.press("Enter");
            await p.waitForTimeout(700);
            const after = await p.evaluate(() => ({ tag: document.activeElement?.tagName, title: document.activeElement?.getAttribute("title"), label: document.activeElement?.getAttribute("aria-label"), text: document.activeElement?.innerText?.slice(0, 30), isBody: document.activeElement === document.body, plateStillMounted: !!document.querySelector(".mix-plate") }));
            return { identity, copyTiming: ct, clipboardHeadChars: String(clip).slice(0, 60), focus: { before, after }, errors };
        } finally { await ctx.close(); }
    });

    // R-8 (R5-1 / MX-4) — stored "oklch()" operands: in-math (index 0) and beyond-minLen (discard asymmetry).
    await cell("throw", async () => {
        const r = {};
        const cases = {
            inMath: [pal("x1", "Broken One", ["oklch()", "oklch(0.6 0.1 40)"]), pal("x2", "Fine Two", ["oklch(0.5 0.1 200)", "oklch(0.7 0.1 260)"])],
            beyondMinLen: [pal("y1", "Short Pair", ["oklch(0.6 0.1 40)", "oklch(0.5 0.1 90)"]), pal("y2", "Long Tail", ["oklch(0.5 0.1 200)", "oklch(0.7 0.1 260)", "oklch(0.6 0.1 300)", "oklch()"])],
        };
        for (const [k, saved] of Object.entries(cases)) {
            const { ctx, p, errors } = await open(b, { saved });
            try {
                await readyMix(p);
                await selectPalettes(p, saved.map((s) => s.name));
                await mixButton(p).click();
                await p.waitForTimeout(2500);
                r[k] = await p.evaluate(() => ({ boundary: document.querySelector("[role=alert]")?.innerText.slice(0, 220) ?? null, crashed: /unexpected error/i.test(document.body.innerText),
                    picker: !!document.querySelector("[role=slider]"), plate: document.querySelector(".mix-plate")?.innerText.slice(0, 60) ?? null, ghost: !!document.querySelector(".mix-plate--ghost"), arms: window.__mix.gctx.length }));
                r[k].consoleErrors = errors;
                await p.screenshot({ path: resolve(EVID, `throw-${k}-1440-light.png`) });
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-11 (MR-35) — leaving swatch displacement in the two live consumers.
    await cell("teleport", async () => {
        const sampler = () => {
            window.__lv = []; const t0 = performance.now();
            const before = new Map([...document.querySelectorAll(".swatch-row > *")].map((e) => [e, e.getBoundingClientRect().toJSON()]));
            const tick = () => {
                for (const e of document.querySelectorAll(".swatch-row > .vj-enter-leave-active")) {
                    const b0 = before.get(e); const r = e.getBoundingClientRect();
                    window.__lv.push({ t: Math.round(performance.now() - t0), dx: b0 ? +(r.x + r.width / 2 - (b0.x + b0.width / 2)).toFixed(1) : null, dy: b0 ? +(r.y + r.height / 2 - (b0.y + b0.height / 2)).toFixed(1) : null, pos: getComputedStyle(e).position, w: +r.width.toFixed(1) });
                }
                if (performance.now() - t0 < 900) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        const r = {};
        { // MixSourceSelector: 4 chips, remove the 2nd
            const { ctx, p, errors } = await open(b, {});
            try {
                await readyMix(p);
                await addCurrent(p, 4);
                await p.waitForTimeout(600);
                await p.evaluate(sampler);
                await p.locator("[data-mix-source] button").nth(1).click();
                await p.waitForTimeout(1000);
                const lv = await p.evaluate(() => window.__lv);
                r.mixSourceSelector = { frames: lv.length, maxAbsDx: Math.max(0, ...lv.map((f) => Math.abs(f.dx ?? 0))), maxAbsDy: Math.max(0, ...lv.map((f) => Math.abs(f.dy ?? 0))), positions: [...new Set(lv.map((f) => f.pos))], head: lv.slice(0, 6), errors };
            } finally { await ctx.close(); }
        }
        { // CurrentPaletteEditor: 5 current colours, remove the 3rd via its hover menu
            const { ctx, p, errors } = await open(b, { route: "#/palettes", current: hues(5, 0.7, 0.15, 10) });
            try {
                await p.locator(".dashed-well").first().waitFor({ timeout: 120000 });
                await p.waitForTimeout(1500);
                const btn = p.getByRole("button", { name: /^Remove color .* from palette$/ }).nth(2);
                const n = await p.getByRole("button", { name: /^Remove color .* from palette$/ }).count();
                await p.locator(".dashed-well .swatch-row > *").nth(2).hover().catch(() => {});
                await p.waitForTimeout(400);
                await p.evaluate(sampler);
                await btn.click({ force: true });
                await p.waitForTimeout(1000);
                const lv = await p.evaluate(() => window.__lv);
                r.currentPaletteEditor = { removeButtons: n, frames: lv.length, maxAbsDx: Math.max(0, ...lv.map((f) => Math.abs(f.dx ?? 0))), maxAbsDy: Math.max(0, ...lv.map((f) => Math.abs(f.dy ?? 0))), positions: [...new Set(lv.map((f) => f.pos))], head: lv.slice(0, 6), errors };
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-12 (MR-34) — prefers-contrast: more computed read + print rendering of the result region.
    await cell("pcm", async () => {
        const r = {};
        for (const [label, opts] of [["more", { contrast: "more" }], ["no-preference", {}]]) {
            const { ctx, p, errors } = await open(b, { saved: P12, ...opts });
            try {
                await readyMix(p);
                await selectPalettes(p, ["Alpha Twelve", "Beta Twelve"]);
                await mixAndSettle(p, 700);
                r[label] = await p.evaluate(() => { const pl = document.querySelector(".mix-plate"); const cs = getComputedStyle(pl);
                    return { matchesMore: matchMedia("(prefers-contrast: more)").matches, borderTop: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, outline: `${cs.outlineWidth} ${cs.outlineStyle}`, boxShadow: cs.boxShadow, bg: cs.backgroundColor,
                        consoleWellBorderSameMedia: (() => { const w = document.querySelector(".console-well"); return w ? getComputedStyle(w).borderTopWidth + " " + getComputedStyle(w).borderTopStyle : "no .console-well on page"; })() }; });
                if (label === "more") {
                    await p.emulateMedia({ media: "print" });
                    r.print = await p.evaluate(() => { const pl = document.querySelector(".mix-plate"); const cs = getComputedStyle(pl);
                        return { display: cs.display, borderTop: `${cs.borderTopWidth} ${cs.borderTopStyle}`, bg: cs.backgroundColor, rect: pl.getBoundingClientRect().toJSON(), dotsVisible: [...pl.querySelectorAll(".swatch-row > *")].filter((e) => e.getBoundingClientRect().width > 0).length }; });
                    await p.pdf({ path: resolve(EVID, "pcm-print.pdf"), printBackground: false, width: "1440px", height: "900px" });
                }
                r[label + "-errors"] = errors;
            } finally { await ctx.close(); }
        }
        return r;
    });
} finally {
    await b.close();
}
