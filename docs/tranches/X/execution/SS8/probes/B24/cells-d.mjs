// SERVED MODEL: claude-opus-5-5 · SS-8 B24 cells D — re-takes: R-MP2 (container timeline, scroller fixed), R-MP5 (result
// painted area incl. dots), R-MP10 (first mix AND re-mixes), R-MP12 + R-8 (one context per malformed persisted css).
// One browser per run, one context per cell, all closed in finally.
import fs from "node:fs";
import { launch, open, readyMix, addCurrent, save, pal, hues, mixButton, selectPalettes, EVID } from "./lib.mjs";
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const out = {};
const b = await launch();
const png = (n, buf) => fs.writeFileSync(`${EVID}/${n}`, buf);
async function cell(name, opts, fn) {
    const t0 = Date.now();
    let ctx;
    try {
        const o = await open(b, { saved: SAVED, inst: false, ...opts });
        ctx = o.ctx;
        await readyMix(o.p);
        out[name] = { ...(await fn(o.p, o)), errors: o.errors.filter((e) => !/3000|ERR_FAILED/.test(e)).slice(0, 8), ms: Date.now() - t0 };
    } catch (e) {
        out[name] = { fail: String(e).slice(0, 400), ms: Date.now() - t0 };
    } finally {
        if (ctx) await ctx.close().catch(() => {});
        save("cells-d.out.json", out);
        console.log(name, JSON.stringify(out[name]).slice(0, 700));
    }
}
const settled = (p, t = 10000) => p.waitForFunction(() => document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"), null, { timeout: t });
try {
    // R-MP2: per-frame geometry of the pane scroller + card + plate across the first mix.
    await cell("MP2-timeline", {}, async (p) => {
        await addCurrent(p, 2);
        await p.evaluate(() => {
            window.__tl = []; const t0 = performance.now();
            const sc = document.querySelector(".add-slot-ghost").closest(".fading-scroll") ?? document.scrollingElement;
            const card = document.querySelector(".pane-shell__card");
            const tick = () => {
                const pl = document.querySelector(".mix-plate");
                window.__tl.push({ t: +(performance.now() - t0).toFixed(1), scH: sc.scrollHeight, scTop: sc.scrollTop, cardTop: +card.getBoundingClientRect().top.toFixed(1), cardH: +card.getBoundingClientRect().height.toFixed(1), plateH: pl ? +pl.getBoundingClientRect().height.toFixed(1) : 0, ghost: !!document.querySelector(".mix-plate--ghost"), target: !!document.querySelector("[data-mix-target]") });
                if (performance.now() - t0 < 3000) requestAnimationFrame(tick);
            };
            window.__go = () => requestAnimationFrame(tick);
        });
        await p.evaluate(() => window.__go());
        await p.waitForTimeout(100);
        await mixButton(p).click();
        await p.waitForTimeout(3200);
        const tl = await p.evaluate(() => window.__tl);
        const jumps = [];
        for (let i = 1; i < tl.length; i++) {
            const d = tl[i].scH - tl[i - 1].scH, dp = tl[i].plateH - tl[i - 1].plateH, dt = tl[i].cardTop - tl[i - 1].cardTop, dh = tl[i].cardH - tl[i - 1].cardH;
            if (Math.abs(d) > 1 || Math.abs(dp) > 1 || Math.abs(dt) > 1 || Math.abs(dh) > 1) jumps.push({ t: tl[i].t, dScrollH: d, dPlate: +dp.toFixed(1), dCardTop: +dt.toFixed(1), dCardH: +dh.toFixed(1), ghost: tl[i].ghost, target: tl[i].target });
        }
        save("mp2-timeline.json", tl);
        return { first: tl[0], last: tl.at(-1), frames: tl.length, jumps: jumps.slice(0, 30), nJumps: jumps.length };
    });

    // R-MP5: palettes mode settled — operand seat area vs the result's painted area (bar + dots).
    await cell("MP5-area", {}, async (p) => {
        await selectPalettes(p, ["Sunset", "Ocean"]);
        await mixButton(p).click();
        await settled(p);
        await p.waitForTimeout(900);
        return p.evaluate(() => {
            const A = (r) => r.width * r.height;
            const seats = [...document.querySelectorAll('button[aria-label^="Deselect palette"]')].map((e) => e.getBoundingClientRect());
            const plate = document.querySelector(".mix-plate");
            const leafs = [...plate.querySelectorAll("*")].filter((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return r.width > 6 && r.height > 6 && (cs.backgroundImage !== "none" || /^(rgb|oklch|color|oklab)/.test(cs.backgroundColor) && !/, 0\)$|\/ 0\)$/.test(cs.backgroundColor)); });
            const painted = leafs.filter((e) => !leafs.some((o) => o !== e && o.contains(e)) || e.children.length === 0).map((e) => { const r = e.getBoundingClientRect(); return { cls: e.className.toString().slice(0, 50), w: Math.round(r.width), h: Math.round(r.height), round: getComputedStyle(e).borderRadius }; });
            const paintedArea = painted.reduce((s, x) => s + (x.round.includes("%") || x.round === "9999px" ? Math.PI * (x.w / 2) * (x.h / 2) : x.w * x.h), 0);
            const seatArea = seats.reduce((s, r) => s + A(r), 0);
            return { seats: seats.map((r) => [Math.round(r.width), Math.round(r.height)]), seatArea: Math.round(seatArea), painted, paintedArea: Math.round(paintedArea), ratio: +(seatArea / paintedArea).toFixed(2), plate: [Math.round(plate.getBoundingClientRect().width), Math.round(plate.getBoundingClientRect().height)] };
        });
    });

    // R-MP10: last convergence-frame drop centroid vs anchor, first mix and two re-mixes.
    await cell("MP10-remix", { inst: true }, async (p) => {
        await addCurrent(p, 2);
        const takes = [];
        for (let k = 0; k < 3; k++) {
            await p.evaluate(() => { window.__mix.grads.length = 0; });
            const before = await p.evaluate(() => !!document.querySelector("[data-mix-target]"));
            await mixButton(p).click();
            await p.waitForTimeout(120);
            const tgt = await p.evaluate(() => { const t = document.querySelector("[data-mix-target]"); const cv = document.querySelector("canvas.z-controls"); return { t: t?.getBoundingClientRect().toJSON() ?? null, cv: cv.getBoundingClientRect().toJSON(), bw: cv.width, cw: cv.clientWidth, ch: cv.clientHeight }; });
            await settled(p);
            await p.waitForTimeout(900);
            const tgt2 = await p.evaluate(() => document.querySelector("[data-mix-target]")?.getBoundingClientRect().toJSON() ?? null);
            const g = await p.evaluate(() => window.__mix.grads);
            const sc = tgt.bw && tgt.cw ? tgt.bw / tgt.cw : 1;
            const lastT = g.length ? g.at(-1).t : 0;
            const lf = g.filter((x) => lastT - x.t < 8);
            const cx = lf.reduce((s, x) => s + x.x, 0) / (lf.length || 1) / sc + tgt.cv.x, cy = lf.reduce((s, x) => s + x.y, 0) / (lf.length || 1) / sc + tgt.cv.y;
            const T = tgt.t ?? tgt2;
            const dest = T ? [T.x + T.width / 2, T.y + T.height / 2] : null;
            takes.push({ k, anchorBeforeClick: before, anchorAt120ms: !!tgt.t, grads: g.length, centroidCanvas: [+(cx - tgt.cv.x).toFixed(1), +(cy - tgt.cv.y).toFixed(1)], canvasWH: [tgt.cw, tgt.ch], centroid: [+cx.toFixed(1), +cy.toFixed(1)], dest: dest?.map((v) => +v.toFixed(1)), offPx: dest ? +Math.hypot(cx - dest[0], cy - dest[1]).toFixed(1) : null });
        }
        return { takes };
    });

    // R-MP12 + R-8: one context per malformed persisted css (palettes mode), then colours mode via the disclosure.
    const BAD = ["oklch()", "rgb()", "notacolor", "", "hsl(1 2)", "#12", "color(srgb)"];
    for (let i = 0; i < BAD.length; i++) {
        await cell(`MP12-pal-${i}`, { saved: [...SAVED, pal(`bad${i}`, `Bad ${i}`, [BAD[i], "oklch(0.7 0.1 200)"])] }, async (p, o) => {
            const e0 = o.errors.length;
            await p.getByRole("tab", { name: "Palettes" }).first().click();
            await p.waitForTimeout(500);
            const cardOk = await p.getByRole("button", { name: `Select palette Bad ${i}`, exact: true }).count();
            const s1 = cardOk ? await p.getByRole("button", { name: `Select palette Bad ${i}`, exact: true }).click({ timeout: 4000 }).then(() => true, (e) => String(e).slice(0, 80)) : "no-card";
            const s2 = await p.getByRole("button", { name: "Select palette Sunset", exact: true }).click({ timeout: 4000 }).then(() => true, (e) => String(e).slice(0, 80));
            await p.waitForTimeout(300);
            const verb = await p.evaluate(() => { const m = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop(); return m ? { present: true, disabled: m.disabled } : { present: false }; });
            let settledOk = null;
            if (verb.present && !verb.disabled) { await mixButton(p).click({ timeout: 4000 }).catch(() => {}); settledOk = await settled(p, 5000).then(() => true, () => false); await p.waitForTimeout(500); }
            const state = await p.evaluate(() => ({ plate: document.querySelector(".mix-plate")?.innerText.replace(/\s+/g, " ").slice(0, 140) ?? null, ghostStuck: !!document.querySelector(".mix-plate--ghost"), alert: [...document.querySelectorAll('[role="alert"]')].map((a) => a.innerText.slice(0, 120)), boundary: /unexpected error|something went wrong/i.test(document.body.innerText), canvas: !!document.querySelector("canvas.z-controls") }));
            if (i === 0) png("mp12-pal-oklch-empty.png", await p.screenshot());
            return { css: BAD[i], selected: [s1, s2], verb, settledOk, ...state, newErrors: o.errors.slice(e0).filter((e) => !/3000|ERR_FAILED/.test(e)).map((s) => s.slice(0, 200)) };
        });
    }
    await cell("MP12-colours-oklch", { saved: [...SAVED, pal("bad0", "Bad 0", ["oklch()", "oklch(0.7 0.1 200)"])] }, async (p, o) => {
        const e0 = o.errors.length;
        await p.getByRole("tab", { name: "Palettes" }).first().click();
        await p.waitForTimeout(300);
        await p.getByRole("button", { name: "Colors of Bad 0" }).click({ timeout: 5000 });
        await p.waitForTimeout(500);
        const sw = p.locator('[aria-label^="Add color"][aria-label$="from Bad 0"]');
        const swLabels = await sw.evaluateAll((es) => es.map((e) => e.getAttribute("aria-label")));
        const clicks = [];
        for (let k = 0; k < swLabels.length; k++) clicks.push(await sw.nth(k).click({ timeout: 3000 }).then(() => true, (e) => String(e).slice(0, 80)));
        await p.getByRole("tab", { name: "Colors" }).first().click();
        await p.waitForTimeout(300);
        const chips = await p.locator(".mix-chip").count();
        const verb = await p.evaluate(() => { const m = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop(); return m ? { present: true, disabled: m.disabled } : { present: false }; });
        let settledOk = null;
        if (verb.present && !verb.disabled) { await mixButton(p).click().catch(() => {}); settledOk = await settled(p, 5000).then(() => true, () => false); }
        await p.waitForTimeout(800);
        png("mp12-colours-oklch-empty.png", await p.screenshot());
        const state = await p.evaluate(() => ({ plate: document.querySelector(".mix-plate")?.innerText.replace(/\s+/g, " ").slice(0, 140) ?? null, ghostStuck: !!document.querySelector(".mix-plate--ghost"), boundary: /unexpected error|something went wrong/i.test(document.body.innerText) }));
        return { swLabels, clicks, chips, verb, settledOk, ...state, newErrors: o.errors.slice(e0).filter((e) => !/3000|ERR_FAILED/.test(e)).map((s) => s.slice(0, 200)) };
    });
} finally {
    await b.close();
    save("cells-d.out.json", out);
}
