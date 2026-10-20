// SS-8 · Z3 · GradientStopEditor follow-up cells. The default model has TWO stops (0/100), so every
// cell that needs a mid stop first mints one at 50% through the caret (keyboard: focus caret, Enter).
import { cell, go, runCells, png } from "./lib.mjs";

const BAR = '[data-testid="gradient-stop-bar"]';
const H = `${BAR} button[data-stop-id]`;
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

const HS = () => [...document.querySelectorAll('[data-testid="gradient-stop-bar"] button[data-stop-id]')].map((h) => {
    const b = h.getBoundingClientRect();
    return { id: h.dataset.stopId, now: +h.getAttribute("aria-valuenow"), sel: h.getAttribute("aria-selected"), cx: +(b.x + b.width / 2).toFixed(2), cy: +(b.y + b.height / 2).toFixed(2), hit: [b.x, b.y, b.width, b.height].map((v) => +v.toFixed(1)) };
});
const EDTEXT = () => document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.innerText;

async function withMid(p, settle = 1800) {
    await go(p, "#/gradient", H, settle);
    await p.locator('[data-testid="gradient-stop-caret"]').focus();
    await p.keyboard.press("Enter");
    await p.waitForTimeout(700);
    return p.evaluate(HS);
}
const ratio = (a, b) => { const [h, l] = a > b ? [a, b] : [b, a]; return +((h + 0.05) / (l + 0.05)).toFixed(2); };

async function lumaGrid(p, clip) {
    const buf = await p.screenshot({ clip });
    return p.evaluate(async ({ b64 }) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = []; for (let i = 0; i < d.length; i += 4) L.push(0.2126 * f(d[i]) + 0.7152 * f(d[i + 1]) + 0.0722 * f(d[i + 2]));
        return { w: c.width, h: c.height, L };
    }, { b64: buf.toString("base64") });
}

const cells = {
    // G3/G4: handle centre vs the ramp's painted stop; a click at rampX(p) mints p.
    axis2: (b) => cell(b, "axis2", {}, async (p) => {
        await go(p, "#/gradient", H, 1800);
        const geo = await p.evaluate(() => { const bar = document.querySelector('[data-testid="gradient-stop-bar"]'); const r = bar.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, inset: parseFloat(getComputedStyle(bar).getPropertyValue("--rail-inset")), bg: getComputedStyle(bar).backgroundImage.match(/calc\([^)]*\)/g)?.slice(0, 1).concat(getComputedStyle(bar).backgroundImage.match(/calc\([^)]*\)/g)?.slice(-1)) }; });
        const hs = await p.evaluate(HS);
        const rampX = (pc) => geo.x + geo.inset + (pc / 100) * (geo.w - 2 * geo.inset);
        const mints = [];
        for (const pc of [5, 37.5, 95]) {
            const before = await p.evaluate(HS);
            await p.mouse.click(rampX(pc), geo.y + geo.h / 2); await p.waitForTimeout(600);
            const after = await p.evaluate(HS);
            const fresh = after.find((h) => !before.some((o) => o.id === h.id));
            mints.push({ target: pc, x: +rampX(pc).toFixed(2), minted: fresh?.now ?? null, handleCx: fresh?.cx ?? null, dCx: fresh ? +(fresh.cx - rampX(pc)).toFixed(2) : null });
        }
        return { geo, ends: hs.map((h) => ({ now: h.now, cx: h.cx, rampX: +rampX(h.now).toFixed(2), d: +(h.cx - rampX(h.now)).toFixed(2) })), mints };
    }),
    // G2: leftmost handle dragged past its neighbour; the emitted CSS re-fed through the editor.
    cross: (b) => cell(b, "cross", {}, async (p) => {
        const hs = await withMid(p);
        const left = hs.reduce((a, h) => (h.now < a.now ? h : a));
        const mid = hs.find((h) => h.now > 10 && h.now < 90);
        const target = mid.cx + 0.6 * (hs.reduce((a, h) => (h.now > a.now ? h : a)).cx - mid.cx);
        await p.mouse.move(left.cx, left.cy); await p.mouse.down();
        for (let k = 1; k <= 14; k++) { await p.mouse.move(left.cx + (target - left.cx) * k / 14, left.cy); await p.waitForTimeout(30); }
        await p.mouse.up(); await p.waitForTimeout(1200);
        const after = await p.evaluate(HS);
        const text = await p.evaluate(EDTEXT);
        const pcts = (text.match(/(\d+(?:\.\d+)?)%\s*(?=[,\n)])/g) || []).map((s) => parseFloat(s));
        const monotone = pcts.every((v, i) => i === 0 || v >= pcts[i - 1]);
        // re-feed the emitted text verbatim
        await p.click(EDITOR); await p.keyboard.press("ControlOrMeta+a"); await p.keyboard.press("Backspace");
        await p.keyboard.insertText(text.replace(/\n\s*/g, " "));
        await p.waitForTimeout(1400);
        const verdict = await p.evaluate(() => [...document.querySelectorAll("main p,main [role=status],main [role=alert]")].map((e) => e.textContent.trim()).filter((t) => /unpars|invalid|could not|order|ascending/i.test(t)).slice(0, 3));
        const refed = await p.evaluate(HS);
        return { before: hs.map((h) => h.now), after: after.map((h) => [h.id === left.id ? "dragged" : "", h.now]), emitted: text, pcts, monotone, verdict, refedCount: refed.length, refed: refed.map((h) => h.now), boundary: await p.evaluate(() => [...document.querySelectorAll("[role=alert]")].map((e) => e.textContent.trim().slice(0, 80))) };
    }),
    // D2-14 numeric entry on a mid stop.
    numeric: (b) => cell(b, "numeric", {}, async (p) => {
        const hs = await withMid(p);
        const mid = hs.find((h) => h.now > 10 && h.now < 90);
        if (mid.sel !== "true") { await p.mouse.click(mid.cx, mid.cy); await p.waitForTimeout(400); }
        const selNow = (await p.evaluate(HS)).find((h) => h.id === mid.id)?.sel;
        const pos = p.locator('[data-testid="gradient-stop-position"]').first();
        await pos.fill("33"); await pos.press("Enter"); await p.waitForTimeout(700);
        const after = (await p.evaluate(HS)).find((h) => h.id === mid.id);
        // remove button on a non-floor stop + announcement
        const rm = p.locator('[aria-label="Remove selected stop"]').first();
        const rmState = await rm.evaluate((e) => ({ disabled: e.disabled, aria: e.getAttribute("aria-disabled") }));
        await rm.click(); await p.waitForTimeout(600);
        const n = (await p.evaluate(HS)).length;
        const notice = await p.evaluate(() => document.querySelector('[data-testid="gradient-stop-inspector"] [role=status]')?.textContent.trim());
        return { selAtStart: mid.sel, selNow, before: mid.now, after: after?.now, rmState, countAfterRemove: n, notice };
    }),
    // G9 (coarse): taps below a selected handle; G10 the chip/seat borrow.
    coarse: (b) => cell(b, "coarse", { w: 390, h: 844, touch: true, mobile: true }, async (p) => {
        const hs = await withMid(p, 2200);
        const mid = hs.find((h) => h.now > 10 && h.now < 90);
        { const c0 = (await p.evaluate(HS)).find((h) => h.id === mid.id); if (c0.sel !== "true") { await p.touchscreen.tap(c0.cx, c0.cy); await p.waitForTimeout(500); } }
        const selected = (await p.evaluate(HS)).find((h) => h.id === mid.id)?.sel;
        const geo = await p.evaluate((id) => {
            const h = document.querySelector(`button[data-stop-id="${id}"]`); const b = h.getBoundingClientRect();
            const ps = getComputedStyle(h, "::before"), pa = getComputedStyle(h, "::after");
            const bar = document.querySelector('[data-testid="gradient-stop-bar"]'), seat = bar.parentElement, sb = seat.getBoundingClientRect();
            const over = [...seat.querySelectorAll("*")].map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.height > 0 && r.bottom > sb.bottom + 0.5).map(([e, r]) => e.tagName + "." + e.className.toString().split(" ")[0] + ":" + (r.bottom - sb.bottom).toFixed(1));
            const next = seat.nextElementSibling?.getBoundingClientRect();
            return { hit: [b.x, b.y, b.width, b.height].map((v) => +v.toFixed(1)), before: { w: ps.width, h: ps.height, inset: ps.inset }, after: { w: pa.width, h: pa.height, inset: pa.inset }, seatBottom: +sb.bottom.toFixed(1), nextTop: next ? +next.top.toFixed(1) : null, over: over.slice(0, 6) };
        }, mid.id);
        const taps = {};
        for (const dy of [14, 20, 26, 34]) {
            const pre = await p.evaluate(HS);
            const before = pre.length;
            const cur = pre.find((h) => h.id === mid.id); // fresh centre: the page may scroll between taps (webkit)
            const tgt = await p.evaluate(({ x, y }) => { const e = document.elementFromPoint(x, y); return e ? e.tagName + "." + e.className.toString().split(" ")[0] + "|" + (e.getAttribute("aria-label") || "") : null; }, { x: cur.cx, y: cur.cy + dy });
            await p.touchscreen.tap(cur.cx, cur.cy + dy); await p.waitForTimeout(600);
            const now = await p.evaluate(HS);
            taps[dy] = { at: [cur.cx, cur.cy + dy], count: [before, now.length], target: tgt, movedTo: now.find((h) => h.id === mid.id)?.now ?? "GONE" };
            const k = now.find((h) => h.id === mid.id); if (k) { await p.touchscreen.tap(k.cx, k.cy); await p.waitForTimeout(400); }
        }
        await p.screenshot({ path: png("gse2-coarse-390-selected") });
        return { mid: mid.now, selected, geo, taps };
    }),
    // G11 contrast floor on the white ramp: the face's ring vs what surrounds the face, and vs its own fill.
    white2: (b) => cell(b, "white2", {}, async (p) => {
        await go(p, "#/gradient", H, 1800);
        await p.click(EDITOR); await p.keyboard.press("ControlOrMeta+a"); await p.keyboard.press("Backspace");
        await p.keyboard.insertText("linear-gradient(90deg, #ffffff 0%, #fafafa 100%)");
        await p.waitForTimeout(1500);
        await p.mouse.click(5, 895); await p.waitForTimeout(400);
        const faces = await p.evaluate(() => [...document.querySelectorAll('[data-testid="gradient-stop-bar"] button[data-stop-id] .rail-handle-face')].map((f) => { const b = f.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; }));
        const out = [];
        for (const [fx, fy, fw, fh] of faces) {
            const clip = { x: Math.round(fx) - 6, y: Math.round(fy) - 6, width: Math.round(fw) + 12, height: Math.round(fh) + 12 };
            const g = await lumaGrid(p, clip);
            const at = (x, y) => g.L[Math.round(y) * g.w + Math.round(x)];
            const outside = at(1, g.h / 2), centre = at(g.w / 2, g.h / 2);
            let maxOut = 1, maxIn = 1;
            for (let y = 4; y < g.h - 4; y++) for (let x = 4; x < g.w - 4; x++) { const v = at(x, y); maxOut = Math.max(maxOut, ratio(v, outside)); maxIn = Math.max(maxIn, ratio(v, centre)); }
            out.push({ face: [fx, fy, fw, fh].map((v) => +v.toFixed(1)), outsideL: +outside.toFixed(4), centreL: +centre.toFixed(4), ringVsSurround: maxOut, ringVsFill: maxIn });
        }
        const rail = await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 80 }; });
        await p.screenshot({ path: png("gse2-white-ramp"), clip: rail });
        return { faces: out };
    }),
    // D2-16 / D2-13: where the watercolor faces live; heading outline of the gradient pane.
    census: (b) => cell(b, "census", {}, async (p) => {
        await go(p, "#/gradient", H, 1800);
        return await p.evaluate(() => ({
            watercolor: [...document.querySelectorAll("main .watercolor-swatch")].map((e) => { const r = e.getBoundingClientRect(); return { pane: e.closest("[data-pane-id],[data-pane],section")?.getAttribute("aria-label") || e.closest("[data-pane-id],[data-pane],section")?.className.toString().slice(0, 40), inRail: !!e.closest('[data-testid="gradient-stop-bar"]'), parent: e.parentElement?.tagName + "." + e.parentElement?.className.toString().slice(0, 40), rect: [r.x, r.y, r.width, r.height].map(Math.round) }; }),
            headings: [...document.querySelectorAll("main h1,main h2,main h3,main h4")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 30) + ":" + (h.closest("[data-pane-id],[data-pane]")?.getAttribute("data-pane-id") || "")),
        }));
    }),
};

runCells("gse2", cells);
