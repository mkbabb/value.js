// SERVED MODEL: claude-opus-5-5 · SS-8 B24 cells B — wb-mix-pane R-MP1..10,12 + configbar R-8 + sourceselector U-1..4,6,7.
// One browser per run, one context per cell, all closed in finally. CELLS=a,b filters.
import fs from "node:fs";
import { launch, open, readyMix, addCurrent, save, pal, hues, regionStats, mixButton, contrast, selectPalettes, EVID } from "./lib.mjs";
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const ONLY = process.env.CELLS?.split(",");
const out = {};
const b = await launch();
const png = (n, buf) => fs.writeFileSync(`${EVID}/${n}`, buf);

async function cell(name, opts, fn) {
    if (ONLY && !ONLY.includes(name)) return;
    const t0 = Date.now();
    let ctx;
    try {
        const o = await open(b, { saved: SAVED, inst: false, ...opts });
        ctx = o.ctx;
        await readyMix(o.p);
        out[name] = { ...(await fn(o.p, o)), errors: o.errors, ms: Date.now() - t0 };
    } catch (e) {
        out[name] = { fail: String(e).slice(0, 400), ms: Date.now() - t0 };
    } finally {
        if (ctx) await ctx.close().catch(() => {});
        save("cells-b.out.json", out);
        console.log(name, JSON.stringify(out[name]).slice(0, 900));
    }
}
const settle = async (p) => {
    await mixButton(p).click();
    await p.waitForFunction(() => document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"), null, { timeout: 10000 });
    await p.waitForTimeout(900);
};
/** Text (h3) contrast: computed ink vs modal pixel of its own box. */
async function captionContrast(p, buf, text) {
    const g = await p.evaluate((t) => {
        const h = [...document.querySelectorAll("h3")].find((e) => e.textContent.trim() === t);
        if (!h) return null;
        const cs = getComputedStyle(h);
        return { r: h.getBoundingClientRect().toJSON(), color: cs.color, font: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily.slice(0, 40)}`, cls: h.className };
    }, text);
    if (!g) return { missing: text };
    const st = await regionStats(b, buf, { box: { x: g.r.x - 2, y: g.r.y, w: g.r.width + 4, h: g.r.height } });
    return { ...g, st: st.box, inkVsGround: st.box.maxContrast };
}

try {
    // R-MP1 · R-MP8: captions over their grounds after a settled colour mix; both schemes. MP8 = modal colour of the result well (dark).
    for (const theme of ["light", "dark"]) {
        await cell(`MP1-${theme}`, { theme }, async (p) => {
            await addCurrent(p, 2);
            await settle(p);
            const buf = await p.screenshot(); png(`mp1-${theme}-settled.png`, buf);
            const sel = await captionContrast(p, buf, "Selected");
            const res = await captionContrast(p, buf, "Result");
            const plate = await p.locator(".mix-plate").first().evaluate((e) => ({ r: e.getBoundingClientRect().toJSON(), bg: getComputedStyle(e).backgroundColor }));
            const st = await regionStats(b, buf, { plate: { x: plate.r.x + plate.r.width - 60, y: plate.r.y + 4, w: 50, h: plate.r.height - 8 } });
            return { sel, res, plate, plateModal: st.plate };
        });
    }

    // R-MP2: container timeline across a mix (per-frame plate/scroll geometry).
    await cell("MP2-timeline", {}, async (p) => {
        await addCurrent(p, 2);
        await p.evaluate(() => {
            window.__tl = []; const t0 = performance.now();
            const sc = document.querySelector(".add-slot-ghost").closest("[class*='overflow-y']") ?? document.scrollingElement;
            const card = sc.parentElement;
            const tick = () => {
                const pl = document.querySelector(".mix-plate"); const tg = document.querySelector("[data-mix-target]");
                window.__tl.push({ t: +(performance.now() - t0).toFixed(1), scH: sc.scrollHeight, cardTop: +card.getBoundingClientRect().top.toFixed(1), cardH: +card.getBoundingClientRect().height.toFixed(1), plateH: pl ? +pl.getBoundingClientRect().height.toFixed(1) : 0, ghost: !!document.querySelector(".mix-plate--ghost"), target: !!tg });
                if (performance.now() - t0 < 3000) requestAnimationFrame(tick);
            };
            window.__go = () => requestAnimationFrame(tick);
        });
        await p.evaluate(() => window.__go());
        await p.waitForTimeout(100);
        await mixButton(p).click();
        await p.waitForTimeout(3100);
        const tl = await p.evaluate(() => window.__tl);
        const jumps = [];
        for (let i = 1; i < tl.length; i++) { const d = tl[i].scH - tl[i - 1].scH, dp = tl[i].plateH - tl[i - 1].plateH, dt = tl[i].cardTop - tl[i - 1].cardTop; if (Math.abs(d) > 1 || Math.abs(dp) > 1 || Math.abs(dt) > 1) jumps.push({ t: tl[i].t, dScroll: d, dPlate: +dp.toFixed(1), dCardTop: +dt.toFixed(1), ghost: tl[i].ghost }); }
        return { first: tl[0], last: tl[tl.length - 1], frames: tl.length, jumps: jumps.slice(0, 40), nJumps: jumps.length, totalPlateGrowth: +(tl[tl.length - 1].plateH - tl[0].plateH).toFixed(1) };
    });

    // R-MP3 · R-MP4: forced colours — disabled verb computed set; tabs selection vs focus.
    await cell("MP3-MP4-forced", { forcedColors: "active" }, async (p) => {
        const verb = await mixButton(p).evaluate((m) => { const cs = getComputedStyle(m); return { disabled: m.disabled, opacity: cs.opacity, color: cs.color, bg: cs.backgroundColor, border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`, fca: cs.forcedColorAdjust }; });
        const tabs = p.locator(".segmented-tab");
        const sig = async (label) => {
            const r = await p.locator(".segmented-tab").first().locator("xpath=..").evaluate((e) => e.getBoundingClientRect().toJSON());
            const buf = await p.screenshot({ clip: { x: r.x - 6, y: r.y - 6, width: r.width + 12, height: r.height + 12 } });
            png(`mp4-forced-${label}.png`, buf);
            const st = await p.evaluate(() => [...document.querySelectorAll('.segmented-tab')].map((t) => { const cs = getComputedStyle(t); return { name: t.textContent.trim(), sel: t.getAttribute("aria-selected"), focus: t.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, bg: cs.backgroundColor, color: cs.color, shadow: cs.boxShadow.slice(0, 80) }; }));
            const ind = await p.evaluate(() => { const tl = document.querySelector(".segmented-tab").parentElement; return [...tl.querySelectorAll("*")].filter((e) => !e.matches(".segmented-tab") && !e.closest(".segmented-tab")).map((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: e.className.toString().slice(0, 60), x: Math.round(r.x), w: Math.round(r.width), bg: cs.backgroundColor, border: cs.borderColor, outline: cs.outlineStyle }; }); });
            return { st, ind };
        };
        const rest = await sig("rest");
        await p.keyboard.press("Shift");
        await tabs.first().focus();
        await p.waitForTimeout(250);
        const focusSelected = await sig("focus-selected");
        await tabs.nth(1).focus();
        await p.waitForTimeout(250);
        const focusUnselected = await sig("focus-unselected");
        const { width, height } = p.viewportSize();
        return { verb, rest, focusSelected, focusUnselected, vp: { width, height } };
    });

    // R-MP5: Palettes mode, two palettes, settled — operand seats' area vs the result's painted area.
    await cell("MP5-area", {}, async (p) => {
        await selectPalettes(p, ["Sunset", "Ocean"]);
        await settle(p);
        png("mp5-palettes-settled.png", await p.screenshot());
        return p.evaluate(() => {
            const area = (r) => r.width * r.height;
            const seats = [...document.querySelectorAll('button[aria-label^="Deselect palette"]')].map((e) => e.getBoundingClientRect());
            const plate = document.querySelector(".mix-plate");
            const parts = [...plate.querySelectorAll("*")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 8 && r.height > 8 && e.children.length === 0 && (e.tagName === "svg" || cs.backgroundImage !== "none" || (cs.backgroundColor !== "rgba(0, 0, 0, 0)")); }).map((e) => { const r = e.getBoundingClientRect(); return { tag: e.tagName, cls: e.className.toString?.().slice(0, 50) ?? "", w: Math.round(r.width), h: Math.round(r.height) }; });
            const dots = [...plate.querySelectorAll("[class*='watercolor'], .watercolor-swatch")].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 8);
            const seatArea = seats.reduce((s, r) => s + area(r), 0);
            return { seats: seats.map((r) => [Math.round(r.width), Math.round(r.height)]), seatArea: Math.round(seatArea), resultParts: parts.slice(0, 20), dotsN: dots.length, plate: [Math.round(plate.getBoundingClientRect().width), Math.round(plate.getBoundingClientRect().height)] };
        });
    });

    // R-MP6 · U-6: tap targets (fine 1440 and coarse 390).
    for (const [tag, vp] of [["fine-1440", {}], ["coarse-390", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }]]) {
        await cell(`MP6-${tag}`, vp, (p) => p.evaluate(() => {
            const sz = (e) => { const r = e.getBoundingClientRect(); return [+r.width.toFixed(1), +r.height.toFixed(1)]; };
            return { coarse: matchMedia("(pointer: coarse)").matches, tabs: [...document.querySelectorAll('.segmented-tab')].map(sz), collTriggers: [...document.querySelectorAll('[aria-label^="Colors of"]')].map(sz), selectSeats: [...document.querySelectorAll('[aria-label^="Select palette"]')].map(sz), add: [...document.querySelectorAll(".add-slot-ghost")].map(sz) };
        }));
    }

    // R-MP7 · U-1: add-slot ghost composited contrast, both schemes (empty selection = the sole affordance).
    for (const theme of ["light", "dark"]) {
        await cell(`MP7-${theme}`, { theme }, async (p) => {
            const r = await p.locator(".add-slot-ghost").first().evaluate((e) => e.getBoundingClientRect().toJSON());
            const buf = await p.screenshot({ clip: { x: r.x - 12, y: r.y - 12, width: r.width + 24, height: r.height + 24 } });
            png(`mp7-add-ghost-${theme}.png`, buf);
            const w = r.width + 24, h = r.height + 24;
            const st = await regionStats(b, buf, { all: { x: 0, y: 0, w, h }, ground: { x: 0, y: 0, w, h: 8 }, ringLeft: { x: 10, y: 12 + r.height * 0.3, w: r.width * 0.22, h: r.height * 0.4 }, center: { x: 12 + r.width * 0.3, y: 12 + r.height * 0.3, w: r.width * 0.4, h: r.height * 0.4 } });
            const ink = await p.evaluate(() => { const d = document.querySelector(".add-slot-ghost [style*='--watercolor-color'], .add-slot-ghost *"); const all = [...document.querySelectorAll(".add-slot-ghost *")].map((e) => getComputedStyle(e).getPropertyValue("--watercolor-color")).filter(Boolean); return { wc: all[0] ?? null, dashed: [...document.querySelectorAll(".add-slot-ghost *")].map((e) => getComputedStyle(e)).filter((cs) => cs.borderStyle.includes("dashed") || cs.strokeDasharray !== "none").map((cs) => ({ bs: cs.borderStyle, bc: cs.borderColor, bw: cs.borderWidth, sd: cs.strokeDasharray, stroke: cs.stroke })).slice(0, 3) }; });
            return { r, st, ringVsGround: contrast(st.ringLeft.maxPx, st.ground.modal), plusVsGround: contrast(st.center.maxPx, st.ground.modal), ink };
        });
    }

    // R-MP9: re-mix out-in deferral — click → anchor ([data-mix-target]) attached.
    await cell("MP9-remix", {}, async (p) => {
        await addCurrent(p, 2);
        await settle(p);
        const tokens = await p.evaluate(() => { const cs = getComputedStyle(document.documentElement); return { fast: cs.getPropertyValue("--duration-fast"), morph: cs.getPropertyValue("--duration-morph") }; });
        const takes = [];
        for (let k = 0; k < 3; k++) {
            await p.evaluate(() => {
                window.__a = null; window.__c = null;
                const btn = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
                btn.addEventListener("click", () => { window.__c = performance.now(); const poll = () => { if (document.querySelector("[data-mix-target]")) { window.__a = performance.now(); return; } if (performance.now() - window.__c < 3000) requestAnimationFrame(poll); }; poll(); }, { once: true, capture: true });
            });
            await mixButton(p).click();
            await p.waitForTimeout(400);
            takes.push(await p.evaluate(() => (window.__a && window.__c ? +(window.__a - window.__c).toFixed(1) : null)));
            await p.waitForFunction(() => !document.querySelector(".mix-plate--ghost"), null, { timeout: 10000 });
            await p.waitForTimeout(900);
        }
        return { tokens, clickToAnchorMs: takes };
    });

    // R-MP10: last convergence-frame drop centroid vs the true destination (instrumented canvas).
    await cell("MP10-centroid", { inst: true }, async (p) => {
        await addCurrent(p, 2);
        await p.evaluate(() => { window.__mix.grads.length = 0; });
        await mixButton(p).click();
        await p.waitForTimeout(150);
        const tgt = await p.evaluate(() => { const t = document.querySelector("[data-mix-target]"); const cv = document.querySelector("canvas.z-controls"); return { t: t?.getBoundingClientRect().toJSON(), cv: cv?.getBoundingClientRect().toJSON(), dpr: devicePixelRatio, bw: cv?.width, cw: cv?.clientWidth }; });
        await p.waitForFunction(() => !document.querySelector(".mix-plate--ghost"), null, { timeout: 10000 });
        const g = await p.evaluate(() => window.__mix.grads);
        const scale = tgt.bw && tgt.cw ? tgt.bw / tgt.cw : 1;
        const lastT = g.length ? g[g.length - 1].t : null;
        const lastFrame = g.filter((x) => lastT - x.t < 8);
        const cx = lastFrame.reduce((s, x) => s + x.x, 0) / (lastFrame.length || 1) / scale + (tgt.cv?.x ?? 0);
        const cy = lastFrame.reduce((s, x) => s + x.y, 0) / (lastFrame.length || 1) / scale + (tgt.cv?.y ?? 0);
        const dest = tgt.t ? [tgt.t.x + tgt.t.width / 2, tgt.t.y + tgt.t.height / 2] : null;
        return { grads: g.length, lastFrameN: lastFrame.length, centroidViewport: [+cx.toFixed(1), +cy.toFixed(1)], destViewport: dest && dest.map((v) => +v.toFixed(1)), offPx: dest ? +Math.hypot(cx - dest[0], cy - dest[1]).toFixed(1) : null, tgt };
    });

    // R-MP12 · R-8: persisted malformed palette css — throw vs silent null, palettes mode and colours mode.
    const BAD = ["oklch()", "rgb()", "notacolor", "", "hsl(1 2)", "#12", "color(srgb)"];
    await cell("MP12-R8-bad-css", { saved: [...SAVED, ...BAD.map((css, i) => pal(`bad${i}`, `Bad ${i}`, [css, "oklch(0.7 0.1 200)"]))] }, async (p, o) => {
        const rows = [];
        await p.getByRole("tab", { name: "Palettes" }).first().click();
        await p.waitForTimeout(300);
        for (let i = 0; i < BAD.length; i++) {
            const e0 = o.errors.length;
            const sel = async (n) => p.getByRole("button", { name: `Select palette ${n}`, exact: true }).click({ timeout: 4000 }).then(() => true, () => false);
            const s1 = await sel(`Bad ${i}`); const s2 = await sel("Sunset");
            await p.waitForTimeout(150);
            const dis = await mixButton(p).isDisabled();
            let settled = null;
            if (!dis) { await mixButton(p).click({ timeout: 4000 }).catch(() => {}); settled = await p.waitForFunction(() => document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"), null, { timeout: 5000 }).then(() => true, () => false); await p.waitForTimeout(400); }
            const plate = await p.evaluate(() => document.querySelector(".mix-plate")?.innerText.slice(0, 160) ?? null);
            const boundary = await p.evaluate(() => /unexpected error/i.test(document.body.innerText));
            rows.push({ css: BAD[i], selected: [s1, s2], verbDisabled: dis, settled, plate, paneErrorPlate: boundary, newErrors: o.errors.slice(e0).map((s) => s.slice(0, 160)) });
            for (const n of [`Bad ${i}`, "Sunset"]) await p.getByRole("button", { name: `Deselect palette ${n}`, exact: true }).click({ timeout: 2000 }).catch(() => {});
            await p.waitForTimeout(150);
        }
        // colours mode: the oklch() swatch through the disclosure.
        const e0 = o.errors.length;
        await p.getByRole("button", { name: "Colors of Bad 0" }).click();
        await p.waitForTimeout(400);
        const sw = p.locator('[aria-label^="Add color"][aria-label$="from Bad 0"]');
        const swN = await sw.count();
        const swLabels = await sw.evaluateAll((es) => es.map((e) => e.getAttribute("aria-label")));
        if (swN) await sw.first().click().catch(() => {});
        await addCurrent(p, 1);
        const dis = await mixButton(p).isDisabled();
        if (!dis) await mixButton(p).click().catch(() => {});
        await p.waitForTimeout(2500);
        png("mp12-colours-bad.png", await p.screenshot());
        const colours = { swN, swLabels, chips: await p.locator(".mix-chip").count(), verbDisabled: dis, plate: await p.evaluate(() => document.querySelector(".mix-plate")?.innerText.slice(0, 160) ?? null), ghostStuck: await p.evaluate(() => !!document.querySelector(".mix-plate--ghost")), boundary: await p.evaluate(() => /unexpected error/i.test(document.body.innerText)), newErrors: o.errors.slice(e0).map((s) => s.slice(0, 200)) };
        return { rows, colours };
    });

    // U-3: focused + selected palette card, both schemes.
    for (const theme of ["light", "dark"]) {
        await cell(`U3-${theme}`, { theme }, async (p) => {
            await selectPalettes(p, ["Sunset"]);
            const li = p.locator("li.mix-palette").first();
            const r = await li.evaluate((e) => e.getBoundingClientRect().toJSON());
            const clip = { x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 16 };
            await p.mouse.move(5, 5);
            await p.locator("body").click({ position: { x: 5, y: 5 } }).catch(() => {});
            const unf = await p.screenshot({ clip });
            const read = () => p.evaluate(() => { const l = document.querySelector("li.mix-palette"); const btn = l.querySelector(".mix-palette__select"); const a = getComputedStyle(l), c = getComputedStyle(btn); return { liShadow: a.boxShadow, btnShadow: c.boxShadow, btnOutline: `${c.outlineStyle} ${c.outlineWidth}`, focusVisible: btn.matches(":focus-visible"), pressed: btn.getAttribute("aria-pressed"), ringVar: c.getPropertyValue("--tw-ring-color"), ring: getComputedStyle(document.documentElement).getPropertyValue("--ring"), colorRing: getComputedStyle(document.documentElement).getPropertyValue("--color-ring") }; });
            const before = await read();
            await p.keyboard.press("Shift");
            await p.locator("li.mix-palette .mix-palette__select").first().focus();
            await p.waitForTimeout(250);
            const after = await read();
            const foc = await p.screenshot({ clip });
            png(`u3-${theme}-unfocused.png`, unf); png(`u3-${theme}-focused.png`, foc);
            // pixel diff between frames
            const ctx = await b.newContext();
            let diff;
            try {
                const pg = await ctx.newPage();
                diff = await pg.evaluate(async ([a, bb]) => {
                    const ld = async (u) => { const i = new Image(); i.src = u; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const g = c.getContext("2d"); g.drawImage(i, 0, 0); return g.getImageData(0, 0, i.width, i.height); };
                    const A = await ld(a), B = await ld(bb); let n = 0; let maxD = 0;
                    for (let k = 0; k < A.data.length; k += 4) { const d = Math.abs(A.data[k] - B.data[k]) + Math.abs(A.data[k + 1] - B.data[k + 1]) + Math.abs(A.data[k + 2] - B.data[k + 2]); if (d > 24) n++; if (d > maxD) maxD = d; }
                    return { changedPx: n, maxD, total: A.data.length / 4 };
                }, ["data:image/png;base64," + unf.toString("base64"), "data:image/png;base64," + foc.toString("base64")]);
            } finally { await ctx.close(); }
            return { before, after, diff };
        });
    }

    // U-4: delivered disclosure motion.
    await cell("U4-disclosure", {}, async (p) => {
        await p.getByRole("button", { name: "Colors of Sunset" }).click();
        await p.waitForTimeout(30);
        const during = await p.evaluate(() => { const d = document.querySelector(".mix-palette__detail"); const cs = getComputedStyle(d); return { state: d.getAttribute("data-state"), cls: d.className, an: cs.animationName, ad: cs.animationDuration, atf: cs.animationTimingFunction.slice(0, 160), anims: d.getAnimations().map((a) => ({ name: a.animationName, dur: a.effect.getTiming().duration, easing: a.effect.getTiming().easing.slice(0, 80) })) }; });
        return { during };
    });

    // U-7: real library size (12 palettes, one 50-colour) — every disclosure open; is the verb still on screen?
    const BIG = Array.from({ length: 12 }, (_, i) => pal(`p${i}`, i === 0 ? "Sunset" : `Saved ${i}`, hues(i === 2 ? 50 : 5, 0.7, 0.15, i * 7)));
    for (const [tag, vp] of [["1440", {}], ["390", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }]]) {
        await cell(`U7-${tag}`, { saved: BIG, ...vp }, async (p) => {
            const trig = p.locator('[aria-label^="Colors of"]');
            const n = await trig.count();
            for (let i = 0; i < n; i++) await trig.nth(i).click({ timeout: 4000 }).catch(() => {});
            await p.waitForTimeout(800);
            png(`u7-${tag}-all-open.png`, await p.screenshot());
            return p.evaluate(() => {
                const m = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop().getBoundingClientRect();
                const trs = [...document.querySelectorAll('[role="combobox"][aria-labelledby]')].map((t) => t.getBoundingClientRect()).map((r) => [Math.round(r.top), Math.round(r.bottom)]);
                const sc = document.querySelector(".mix-palette").closest("[class*='overflow']");
                return { vh: innerHeight, mixTop: Math.round(m.top), mixBottom: Math.round(m.bottom), mixInViewport: m.top >= 0 && m.bottom <= innerHeight, triggers: trs, scroller: sc ? { sh: sc.scrollHeight, ch: sc.clientHeight, cls: sc.className.toString().slice(0, 80) } : null, openDetails: document.querySelectorAll('.mix-palette__detail[data-state="open"]').length };
            });
        });
    }

    // U-2 (successor frame only): RTL chip removal glyph placement.
    await cell("U2-rtl", {}, async (p) => {
        await p.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await addCurrent(p, 2);
        await p.locator(".mix-chip").first().hover();
        await p.waitForTimeout(300);
        const g = await p.evaluate(() => { const c = document.querySelector(".mix-chip"); const x = c.querySelector(".mix-chip__x"); const a = c.getBoundingClientRect(), r = x.getBoundingClientRect(); return { chip: [a.x, a.y, a.width, a.height].map(Math.round), x: [r.x, r.y, r.width, r.height].map(Math.round), dx: +((r.x + r.width / 2) - (a.x + a.width / 2)).toFixed(1), dy: +((r.y + r.height / 2) - (a.y + a.height / 2)).toFixed(1), xOpacity: getComputedStyle(x).opacity, badge: !!c.parentElement.querySelector("[class*='-top-1']") }; });
        return g;
    });
} finally {
    await b.close();
    save("cells-b.out.json", out);
}
