// SERVED MODEL: claude-opus-5-5 · SS-8 B24 cells A — wb-mix-configbar R-2 R-3 R-4 R-5 R-6 R-10 R-11.
// One browser per run, one context per cell, all closed in finally. CELLS=a,b filters.
import { launch, open, readyMix, addCurrent, save, pal, hues, regionStats, mixButton } from "./lib.mjs";
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const ONLY = process.env.CELLS?.split(",");
const out = {};
const b = await launch();

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
        save("cells-a.out.json", out);
        console.log(name, JSON.stringify(out[name]).slice(0, 900));
    }
}

/** Mix button geometry + plate/card/glyph stats from one frame. */
async function verbBattery(p, tag) {
    const g = await p.evaluate(() => {
        const mix = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
        const r = mix.getBoundingClientRect().toJSON();
        const svg = mix.querySelector("svg").getBoundingClientRect().toJSON();
        const cs = getComputedStyle(mix);
        return { r, svg, disabled: mix.disabled, opacity: cs.opacity, bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow.slice(0, 300) };
    });
    const buf = await p.screenshot();
    const { r, svg } = g;
    const st = await regionStats(b, buf, {
        plate: { x: r.x + 6, y: r.y + 4, w: Math.max(8, svg.x - r.x - 10), h: r.height - 8 },
        card: { x: r.x, y: r.y + r.height + 3, w: r.width, h: 6 },
        cardAbove: { x: r.x, y: r.y - 8, w: r.width, h: 5 },
        glyph: { x: svg.x, y: svg.y, w: svg.width, h: svg.height },
    });
    const { contrast } = await import("./lib.mjs");
    return { tag, g, st, plateVsCard: contrast(st.plate.modal, st.card.modal), plateVsCardAbove: contrast(st.plate.modal, st.cardAbove.modal), glyphVsPlate: st.glyph.maxContrast, buf };
}

try {
    // R-2: genuinely enabled register (two colours added → canMix), plus two saved palettes; normal vs prefers-contrast: more, both schemes.
    for (const theme of ["light", "dark"]) for (const contrastPref of ["no-preference", "more"]) {
        await cell(`R2-${theme}-${contrastPref}`, { theme, contrast: contrastPref }, async (p) => {
            const dis = await verbBattery(p, "disabled-before-add");
            await addCurrent(p, 2);
            await p.waitForTimeout(500);
            const en = await verbBattery(p, "enabled");
            const fs = await import("node:fs");
            const { EVID } = await import("./lib.mjs");
            fs.writeFileSync(`${EVID}/r2-${theme}-${contrastPref}-enabled.png`, en.buf);
            delete dis.buf; delete en.buf;
            return { disabled: dis, enabled: en, mq: await p.evaluate(() => matchMedia("(prefers-contrast: more)").matches) };
        });
    }

    // R-3: "Decreasing" in the hue trigger at phone width (390), rendered span not measureText.
    await cell("R3-390", { viewport: { width: 390, height: 844 } }, async (p) => {
        const trig = p.getByRole("combobox", { name: "Hue method" }).first();
        await trig.click();
        await p.getByRole("option", { name: /Decreasing/ }).first().click();
        await p.waitForTimeout(400);
        const m = await trig.evaluate((t) => {
            const v = t.querySelector("span") ?? t;
            const cs = getComputedStyle(v);
            const tr = t.getBoundingClientRect();
            const kids = [...t.children].map((k) => ({ tag: k.tagName, w: k.getBoundingClientRect().width, sw: k.scrollWidth, cw: k.clientWidth, text: k.textContent.trim(), ovf: getComputedStyle(k).textOverflow }));
            const range = document.createRange(); range.selectNodeContents(v); const tw = range.getBoundingClientRect().width;
            return { trigger: { w: tr.width, h: tr.height, pl: getComputedStyle(t).paddingLeft, pr: getComputedStyle(t).paddingRight }, valueText: v.textContent.trim(), textW: tw, spanW: v.getBoundingClientRect().width, spanScrollW: v.scrollWidth, spanClientW: v.clientWidth, font: cs.font, kids };
        });
        const { EVID } = await import("./lib.mjs");
        await trig.screenshot({ path: `${EVID}/r3-390-decreasing.png` });
        return m;
    });

    // R-4: transitions on the config bar's controls under reduced motion (INFO-consistent check).
    await cell("R4-reduce", { reducedMotion: "reduce" }, async (p) => {
        await addCurrent(p, 2);
        return p.evaluate(() => {
            const pick = (e) => { const cs = getComputedStyle(e); return { cls: (e.className?.baseVal ?? e.className).toString().slice(0, 80), td: cs.transitionDuration, tp: cs.transitionProperty.slice(0, 120), ad: cs.animationDuration }; };
            const mix = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
            return { prm: matchMedia("(prefers-reduced-motion: reduce)").matches, mix: pick(mix), triggers: [...document.querySelectorAll('[role="combobox"][aria-labelledby]')].map(pick), tabs: [...document.querySelectorAll('.segmented-tab')].map(pick) };
        });
    });

    // R-5: MC-3/MC-4 magnitudes, fine desktop vs coarse phone.
    const metrics = (p) => p.evaluate(() => {
        const mix = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
        const trig = [...document.querySelectorAll('[role="combobox"][aria-labelledby]')];
        const t0 = trig[0];
        const label = document.getElementById(t0.getAttribute("aria-labelledby")?.split(" ")[0] ?? "");
        const tcs = getComputedStyle(t0);
        const vspan = t0.querySelector("span") ?? t0;
        const capFs = label ? parseFloat(getComputedStyle(label).fontSize) : null;
        const valFs = parseFloat(getComputedStyle(vspan).fontSize);
        return { coarse: matchMedia("(pointer: coarse)").matches, triggers: trig.map((t) => ({ h: t.getBoundingClientRect().height, w: t.getBoundingClientRect().width, pt: getComputedStyle(t).paddingTop, pb: getComputedStyle(t).paddingBottom })),
            mixH: mix.getBoundingClientRect().height, captionFs: capFs, valueFs: valFs, captionToValue: capFs ? +(capFs / valFs).toFixed(3) : null, labelText: label?.textContent.trim(), ctrlH: tcs.getPropertyValue("--control-h-sm"), textCtl: tcs.getPropertyValue("--control-text") };
    });
    await cell("R5-fine-1440", {}, metrics);
    await cell("R5-coarse-390", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }, metrics);

    // R-6: open a Select on #/gradient, change the hash to #/mix, read body lock.
    if (!ONLY || ONLY.includes("R6")) {
        let ctx;
        try {
            const o = await open(b, { saved: SAVED, inst: false, route: "#/gradient" });
            ctx = o.ctx; const p = o.p;
            const trig = p.locator('[role="combobox"][aria-labelledby]').first();
            await trig.waitFor({ timeout: 120000 });
            await p.waitForTimeout(1200);
            await trig.click();
            await p.waitForTimeout(500);
            const body = () => p.evaluate(() => ({ pe: getComputedStyle(document.body).pointerEvents, ov: getComputedStyle(document.body).overflow, style: document.body.getAttribute("style"), listbox: !!document.querySelector('[role="listbox"]'), hash: location.hash }));
            const open1 = await body();
            await p.evaluate(() => { location.hash = "#/mix"; });
            await p.locator(".add-slot-ghost").first().waitFor({ timeout: 60000 });
            await p.waitForTimeout(1500);
            const after = await body();
            const chipsBefore = await p.locator(".mix-chip").count();
            let clickOk = true;
            await p.locator(".add-slot-ghost").first().click({ timeout: 5000 }).catch(() => { clickOk = false; });
            await p.waitForTimeout(400);
            const chipsAfter = await p.locator(".mix-chip").count();
            const { EVID } = await import("./lib.mjs");
            await p.screenshot({ path: `${EVID}/r6-after-route.png` });
            out.R6 = { open1, after, chipsBefore, chipsAfter, clickOk, errors: o.errors };
        } catch (e) { out.R6 = { fail: String(e).slice(0, 400) }; }
        finally { if (ctx) await ctx.close().catch(() => {}); save("cells-a.out.json", out); console.log("R6", JSON.stringify(out.R6)); }
    }

    // R-10: reduced transparency (CDP media feature) — verb vs card boundary.
    for (const theme of ["light", "dark"]) {
        await cell(`R10-${theme}`, { theme }, async (p) => {
            const cdp = await p.context().newCDPSession(p);
            await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] });
            await p.waitForTimeout(600);
            await addCurrent(p, 2);
            await p.waitForTimeout(400);
            const mq = await p.evaluate(() => matchMedia("(prefers-reduced-transparency: reduce)").matches);
            const v = await verbBattery(p, "rt-enabled");
            const { EVID } = await import("./lib.mjs");
            const fs = await import("node:fs");
            fs.writeFileSync(`${EVID}/r10-${theme}-reduced-transparency.png`, v.buf); delete v.buf;
            const card = await p.evaluate(() => {
                const mix = [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
                const chain = []; for (let n = mix.parentElement; n && chain.length < 8; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.backgroundColor !== "rgba(0, 0, 0, 0)") chain.push({ cls: n.className.toString().slice(0, 80), bg: cs.backgroundColor }); }
                return chain;
            });
            return { mq, v, card };
        });
    }

    // R-11: Colors→Palettes swap — the Size-mismatch field's entry; per-frame Mix button top.
    await cell("R11-swap", {}, async (p) => {
        await p.evaluate(() => {
            window.__tr = [];
            const mix = () => [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").pop();
            const t0 = performance.now();
            const tick = () => { const m = mix(); if (m) { const r = m.getBoundingClientRect(); const ft = m.closest("div.flex-none"); window.__tr.push({ t: +(performance.now() - t0).toFixed(1), mixTop: +r.top.toFixed(1), footH: ft ? +ft.getBoundingClientRect().height.toFixed(1) : null, sm: !![...document.querySelectorAll("label,span,div")].find((e) => e.childElementCount === 0 && e.textContent.trim() === "Size mismatch") }); } if (performance.now() - t0 < 2500) requestAnimationFrame(tick); };
            window.__start = () => requestAnimationFrame(tick);
        });
        await p.evaluate(() => window.__start());
        await p.waitForTimeout(300);
        await p.getByRole("tab", { name: "Palettes" }).first().click();
        await p.waitForTimeout(2400);
        const tr = await p.evaluate(() => window.__tr);
        let maxStep = 0, at = null;
        for (let i = 1; i < tr.length; i++) { const d = Math.abs(tr[i].mixTop - tr[i - 1].mixTop) + Math.abs((tr[i].footH ?? 0) - (tr[i - 1].footH ?? 0)); if (d > maxStep) { maxStep = d; at = [tr[i - 1], tr[i]]; } }
        const changed = tr.filter((f, i) => i && (f.mixTop !== tr[i - 1].mixTop || f.footH !== tr[i - 1].footH)).length;
        return { first: tr[0], last: tr[tr.length - 1], frames: tr.length, framesWithChange: changed, maxSingleFrameStep: +maxStep.toFixed(1), at };
    });
} finally {
    await b.close();
    save("cells-a.out.json", out);
}
