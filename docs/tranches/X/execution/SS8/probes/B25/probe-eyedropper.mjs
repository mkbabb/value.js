// SERVED MODEL: claude-opus-5-5 · B25 · wb-extract-imageeyedropper cells (headless Chromium).
// Cells: light, dark (contrast + geometry + census) · zoom200 · touch (sticky hover) · corrupt (C-3) · wheel (D-13C)
//        · stalepin (EY-20) · remount (EY-12) · cost (L-9 microbench in the served module graph).
import { launch, open, makePng, feed, waitRail, save, ratio, RESOLVE, pixels, EVID, REPO } from "./lib.mjs";

const which = process.argv.slice(2);
const want = (c) => which.length === 0 || which.includes(c);
const OV = ".glass-floating.z-popover";
const TRANSFORM = `() => { const c = document.querySelector('${OV} canvas.eyedropper-canvas'); const m = getComputedStyle(c).transform; const t = c.style.transform; const mt = t.match(/translate\\(([-\\d.e]+)px, ([-\\d.e]+)px\\) scale\\(([-\\d.e]+)\\)/); return { panX: +mt[1], panY: +mt[2], zoom: +mt[3], w: c.width, h: c.height }; }`;

async function openEye(p, opts = {}) {
    await feed(p, await makePng(p, opts.w ?? 1600, opts.h ?? 1000));
    await waitRail(p);
    if (opts.tap) await p.tap('[aria-label="Sample colors from the image"]'); else await p.click('[aria-label="Sample colors from the image"]');
    await p.waitForSelector(`${OV} canvas.eyedropper-canvas`, { timeout: 30000 });
    await p.waitForTimeout(1200);
}

const CENSUS = `(OV) => {
    const ov = document.querySelector(OV);
    const sel = 'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]';
    const all = [...document.querySelectorAll(sel)].filter((e) => { if (e.disabled) return false; const ti = e.getAttribute('tabindex'); if (ti !== null && +ti < 0) return false; if (e.closest('[inert]')) return false; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden'; });
    const inside = all.filter((e) => ov && ov.contains(e)).length;
    const pane = ov?.closest('[data-pane]');
    const inPane = pane ? all.filter((e) => pane.contains(e)).length : null;
    const behindInPane = pane ? all.filter((e) => pane.contains(e) && !ov.contains(e)).length : null;
    return { tabbableInDocument: all.length, insideOverlay: inside, outsideOverlay: all.length - inside, inPane, behindOverlayInPane: behindInPane, overlayRole: ov?.getAttribute('role'), ariaModal: ov?.getAttribute('aria-modal') };
}`;

async function themeCell(b, theme, viewport = { width: 1440, height: 900 }, tag = theme) {
    const { ctx, p, errors } = await open(b, { theme, viewport });
    try {
        await openEye(p);
        const geo = await p.evaluate(([OV, TR]) => {
            const ov = document.querySelector(OV); const vp = ov.querySelector('[class*="flex-1 min-h-0"]'); const cv = ov.querySelector("canvas.eyedropper-canvas");
            const wb = ov.parentElement; const pane = ov.closest("[data-pane]");
            const sc = (() => { let e = ov.parentElement; while (e && e !== document.body) { const cs = getComputedStyle(e); if (/(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight) return { tag: e.tagName, cls: e.className.slice(0, 60), sh: e.scrollHeight, ch: e.clientHeight }; e = e.parentElement; } return null; })();
            return { inner: [innerWidth, innerHeight], overlay: ov.getBoundingClientRect().toJSON(), workbenchRoot: wb.getBoundingClientRect().toJSON(), pane: pane?.getBoundingClientRect().toJSON(), viewport: vp.getBoundingClientRect().toJSON(), canvasDrawn: cv.getBoundingClientRect().toJSON(), transform: eval(TR)(), scroller: sc, docScroll: [document.documentElement.scrollHeight, innerHeight] };
        }, [OV, TRANSFORM]);
        const v = geo.viewport, c = geo.canvasDrawn;
        geo.letterbox = { top: +(c.y - v.y).toFixed(1), bottom: +(v.y + v.height - c.y - c.height).toFixed(1), left: +(c.x - v.x).toFixed(1), right: +(v.x + v.width - c.x - c.width).toFixed(1) };
        // Contrast: readout ink, X icon ink — each over its own painted ground (text hidden, re-shot).
        const ink = await p.evaluate(([OV, RES]) => { const res = eval(RES); const ov = document.querySelector(OV); const span = ov.querySelector("span.text-mono-small"); const x = ov.querySelector("button svg");
            return { readout: { text: span.textContent.trim(), color: getComputedStyle(span).color, bytes: res(getComputedStyle(span).color), cls: span.className, rect: span.getBoundingClientRect().toJSON() }, icon: { color: getComputedStyle(x).color, bytes: res(getComputedStyle(x).color), rect: x.getBoundingClientRect().toJSON() } }; }, [OV, RESOLVE]);
        await p.evaluate((OV) => { const ov = document.querySelector(OV); ov.querySelector("span.text-mono-small").style.color = "transparent"; ov.querySelector("button svg").style.visibility = "hidden"; }, OV);
        await p.waitForTimeout(120);
        const s0 = await p.screenshot();
        const rr = ink.readout.rect, ir = ink.icon.rect;
        const gR = await pixels(p, s0, [[rr.x + 4, rr.y + rr.height / 2], [rr.x + rr.width / 2, rr.y + rr.height / 2], [rr.x + rr.width - 4, rr.y + rr.height / 2]]);
        const gI = await pixels(p, s0, [[ir.x + ir.width / 2, ir.y + ir.height / 2]]);
        await p.evaluate((OV) => { const ov = document.querySelector(OV); ov.querySelector("span.text-mono-small").style.color = ""; ov.querySelector("button svg").style.visibility = ""; }, OV);
        const contrast = { readoutVsGround: gR.map((g) => ratio(ink.readout.bytes, g)), readoutGround: gR, iconVsGround: ratio(ink.icon.bytes, gI[0]), iconGround: gI[0], ...ink };
        // Readout reflow: unpinned (hover) vs pinned widths.
        const textBox = `(OV) => { const s = document.querySelector(OV).querySelector('span.text-mono-small'); return { w: +s.getBoundingClientRect().width.toFixed(1), text: s.textContent.trim() }; }`;
        const cx = v.x + v.width / 2, cy = v.y + v.height / 2;
        await p.mouse.move(cx, cy); await p.waitForTimeout(300);
        const hover = await p.evaluate(eval(textBox), OV);
        await p.mouse.click(cx, cy); await p.waitForTimeout(500);
        const pinned = await p.evaluate(eval(textBox), OV);
        const buttons = await p.evaluate((OV) => [...document.querySelector(OV).querySelectorAll("button")].map((x) => x.getAttribute("title")), OV);
        // Pinned loupe ring vs the image pixels just outside it.
        const loupe = await p.evaluate(([OV, RES]) => { const l = document.querySelector(OV).querySelector(".loupe"); if (!l) return null; const cs = getComputedStyle(l); return { borderColor: cs.borderTopColor, bytes: eval(RES)(cs.borderTopColor), rect: l.getBoundingClientRect().toJSON(), cls: l.className }; }, [OV, RESOLVE]);
        let ring = null;
        if (loupe) { const s1 = await p.screenshot(); const L = loupe.rect; const out = await pixels(p, s1, [[L.x - 4, L.y + L.height / 2], [L.x + L.width + 4, L.y + L.height / 2], [L.x + L.width / 2, L.y - 4], [L.x + L.width / 2, L.y + L.height + 4]]); const band = await pixels(p, s1, [[L.x + 1, L.y + L.height / 2], [L.x + L.width - 1, L.y + L.height / 2]]);
            ring = { tokenVsOutside: out.map((o) => ratio(loupe.bytes, o)), outside: out, paintedBand: band }; }
        const census = await p.evaluate(eval(CENSUS), OV);
        const out = { theme, viewport, geo, contrast, hover, pinned, reflowPx: +(pinned.w - hover.w).toFixed(1), buttons, loupe, ring, census, errors };
        save(`ey-${tag}.json`, out);
        if (tag === "light" || tag === "dark") await p.screenshot({ path: `${EVID}/ey-${tag}-pinned.png`, clip: geo.overlay });
        return out;
    } finally { await ctx.close(); }
}

async function touchCell(b) {
    const { ctx, p, errors } = await open(b, { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
    try {
        await openEye(p, { tap: true });
        const v = await p.evaluate((OV) => document.querySelector(OV).querySelector('[class*="flex-1 min-h-0"]').getBoundingClientRect().toJSON(), OV);
        await p.touchscreen.tap(v.x + v.width / 2, v.y + v.height / 2); await p.waitForTimeout(500);
        const add = await p.evaluate((OV) => { const bt = document.querySelector(OV).querySelector('button[title="Add to palette"]'); return bt ? bt.getBoundingClientRect().toJSON() : null; }, OV);
        let st = null;
        if (add) {
            await p.touchscreen.tap(add.x + add.width / 2, add.y + add.height / 2);
            await p.waitForTimeout(900);
            st = await p.evaluate((OV) => { const bt = document.querySelector(OV).querySelector('button[title="Add to palette"]'); const svg = bt.querySelector("svg"); const cs = getComputedStyle(svg); return { hoverLatched: bt.matches(":hover"), svgTransform: cs.transform, svgColor: cs.color, hoverMQ: matchMedia("(hover: hover)").matches, pointerCoarse: matchMedia("(pointer: coarse)").matches }; }, OV);
        }
        const out = { pinnedAddButton: add, afterTapAdd: st, errors };
        save("ey-touch.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function corruptCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        const arms = [];
        for (const [name, mime, bytes] of [["broken.png", "image/png", Buffer.from("not really a png at all")], ["notes.txt", "text/plain", Buffer.from("hello")]]) {
            await p.evaluate(() => { window.__rej.length = 0; });
            const before = errors.length;
            const sel = await p.$('[aria-label="Upload image"]') ? '[aria-label="Upload image"]' : 'button:has-text("Replace image")';
            const [fc] = await Promise.all([p.waitForEvent("filechooser", { timeout: 20000 }), p.click(sel)]);
            await fc.setFiles({ name, mimeType: mime, buffer: bytes });
            await p.waitForTimeout(2500);
            const st = await p.evaluate(() => ({ rej: [...window.__rej], destructive: [...document.querySelectorAll(".text-destructive, [role=alert]")].map((e) => e.textContent.trim().slice(0, 120)), preview: !!document.querySelector('[aria-label="Sample colors from the image"]'), overlay: !!document.querySelector(".glass-floating.z-popover") }));
            arms.push({ file: name, mime, ...st, newErrors: errors.slice(before) });
        }
        const out = { arms, errors };
        save("ey-corrupt.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function wheelCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        await openEye(p);
        const v = await p.evaluate((OV) => document.querySelector(OV).querySelector('[class*="flex-1 min-h-0"]').getBoundingClientRect().toJSON(), OV);
        const cx = v.x + v.width / 2, cy = v.y + v.height / 2;
        await p.mouse.move(cx, cy);
        const fit = await p.evaluate(eval(TRANSFORM));
        for (let i = 0; i < 25; i++) { await p.evaluate(([x, y]) => { const el = document.querySelector(".glass-floating.z-popover [class*='flex-1 min-h-0']"); el.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, ctrlKey: true, clientX: x, clientY: y, bubbles: true, cancelable: true })); }, [cx, cy]); }
        await p.waitForTimeout(1500);
        const zoomed = await p.evaluate(eval(TRANSFORM));
        const burst = async (n, d) => {
            const t0 = await p.evaluate(eval(TRANSFORM));
            await p.evaluate(([x, y, n, d]) => { const el = document.querySelector(".glass-floating.z-popover [class*='flex-1 min-h-0']"); for (let i = 0; i < n; i++) el.dispatchEvent(new WheelEvent("wheel", { deltaY: d, clientX: x, clientY: y, bubbles: true, cancelable: true })); }, [cx, cy, n, d]);
            const t1 = await p.evaluate(eval(TRANSFORM));
            await p.waitForTimeout(2500);
            const t2 = await p.evaluate(eval(TRANSFORM));
            return { n, delta: d, sumDelta: n * d, immediate: +(t0.panY - t1.panY).toFixed(2), total: +(t0.panY - t2.panY).toFixed(2), coast: +(t1.panY - t2.panY).toFixed(2) };
        };
        const one = await burst(1, 20);
        const five = await burst(5, 20);
        const back = await burst(1, -20);
        const out = { fit, zoomed, one, five, back, model: { overwritten_5: "5d + 3.75d = 175", summed_5: "5d + 5×3.75d = 475", one: "d + 3.75d = 95 (friction 0.92, v=0.3d)" }, errors };
        save("ey-wheel.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function stalePinCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        await openEye(p);
        const v = await p.evaluate((OV) => document.querySelector(OV).querySelector('[class*="flex-1 min-h-0"]').getBoundingClientRect().toJSON(), OV);
        const px = v.x + v.width * 0.3, py = v.y + v.height * 0.4;
        await p.mouse.click(px, py); await p.waitForTimeout(500);
        const read = async () => p.evaluate(([OV, TR, px, py, vx, vy]) => {
            const ov = document.querySelector(OV); const cv = ov.querySelector("canvas.eyedropper-canvas"); const t = eval(TR)();
            const l = ov.querySelector(".loupe"); const lr = l?.getBoundingClientRect(); const lcx = lr ? lr.x + lr.width / 2 - vx : null, lcy = lr ? lr.y + lr.height / 2 - vy : null;
            const ix = Math.floor((lcx - t.panX) / t.zoom), iy = Math.floor((lcy - t.panY) / t.zoom);
            const under = (ix >= 0 && iy >= 0 && ix < t.w && iy < t.h) ? Array.from(cv.getContext("2d").getImageData(ix, iy, 1, 1).data) : null;
            const lc = l?.querySelector("canvas"); const lcp = lc ? Array.from(lc.getContext("2d").getImageData(55, 55, 1, 1).data) : null;
            return { t, loupeCentre: [lcx, lcy], imagePxUnderLoupe: [ix, iy], under, loupeCentrePx: lcp, readout: ov.querySelector("span.text-mono-small").textContent.trim(), pinned: !!ov.querySelector('button[title="Add to palette"]') };
        }, [OV, TRANSFORM, px, py, v.x, v.y]);
        const before = await read();
        for (let i = 0; i < 12; i++) await p.evaluate(([x, y]) => { const el = document.querySelector(".glass-floating.z-popover [class*='flex-1 min-h-0']"); el.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, ctrlKey: true, clientX: x, clientY: y, bubbles: true, cancelable: true })); }, [v.x + v.width * 0.7, v.y + v.height * 0.6]);
        await p.waitForTimeout(1200);
        const after = await read();
        const dist = (a, b) => (a && b ? +Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(1) : null);
        const out = { before, after, loupeVsUnderBefore: dist(before.loupeCentrePx, before.under), loupeVsUnderAfter: dist(after.loupeCentrePx, after.under), errors };
        save("ey-stalepin.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function remountCell(b) {
    const { ctx, p, errors } = await open(b, { viewport: { width: 1100, height: 800 } });
    try {
        await openEye(p);
        const v = await p.evaluate((OV) => document.querySelector(OV).querySelector('[class*="flex-1 min-h-0"]').getBoundingClientRect().toJSON(), OV);
        await p.mouse.click(v.x + v.width / 2, v.y + v.height / 2); await p.waitForTimeout(400);
        const st = async () => p.evaluate((OV) => ({ inner: [innerWidth, innerHeight], overlay: !!document.querySelector(OV), pinned: !!document.querySelector(`${OV} button[title="Add to palette"]`), previewLoaded: !!document.querySelector('[aria-label="Sample colors from the image"] img'), rail: !!document.querySelector('[data-o18="extract-k-rail"]'), panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.getAttribute("data-pane")) }), OV);
        const seq = [{ step: "1100x800 pinned", ...(await st()) }];
        for (const [w, h] of [[1100, 640], [1000, 800], [1000, 640], [760, 640], [1100, 800]]) { await p.setViewportSize({ width: w, height: h }); await p.waitForTimeout(1500); seq.push({ step: `${w}x${h}`, ...(await st()) }); }
        const out = { seq, errors };
        save("ey-remount.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function costCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        const r = await p.evaluate(async (REPO) => {
            const S = await import(`/@fs${REPO}/demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts`);
            const C = await import(`/@fs${REPO}/src/subpaths/color.ts`);
            const PC = await import(`/@fs${REPO}/demo/color-session/picker-color.ts`);
            const CSS = await import(`/@fs${REPO}/src/subpaths/css.ts`).catch(() => null);
            const N = 20000; const bytes = Array.from({ length: N }, (_, i) => [(i * 37) % 256, (i * 91) % 256, (i * 151) % 256]);
            const hex = (r, g, b) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
            const probe = CSS ? CSS.parseCssColor("#ffffff") : null; const scale = probe?.ok ? probe.value.channels[0] : 1;
            const results = {};
            for (const space of ["oklch", "hsl"]) {
                const smp = S.useImageSampler({ canvasRef: { value: null }, getTransform: () => ({ panX: 0, panY: 0, zoom: 1 }), colorSpace: () => space });
                const run = (fn) => { for (let i = 0; i < 2000; i++) fn(bytes[i]); const t0 = performance.now(); for (let k = 0; k < 3; k++) for (const bb of bytes) fn(bb); return (performance.now() - t0) / (3 * N); };
                const viaString = run(([r, g, b]) => smp.formatInColorSpace(hex(r, g, b)));
                const direct = run(([r, g, b]) => { const c = C.rgb((r / 255) * scale, (g / 255) * scale, (b / 255) * scale, 1); const col = c.ok ? c.value : c; const conv = PC.convertPickerColor(col, space); return PC.serializePickerColor(conv); });
                const same = (() => { const [r, g, b] = bytes[123]; const a = smp.formatInColorSpace(hex(r, g, b)); const c = C.rgb((r / 255) * scale, (g / 255) * scale, (b / 255) * scale, 1); const d = PC.serializePickerColor(PC.convertPickerColor(c.ok ? c.value : c, space)); return [a, d]; })();
                results[space] = { usPerOpViaString: +(viaString * 1000).toFixed(2), usPerOpDirect: +(direct * 1000).toFixed(2), ratio: +(viaString / direct).toFixed(2), sameOutput: same };
            }
            return { scale, results };
        }, REPO);
        const out = { ...r, errors };
        save("ey-cost.json", out);
        return out;
    } finally { await ctx.close(); }
}

const b = await launch();
try {
    const res = {};
    if (want("light")) res.light = await themeCell(b, "light");
    if (want("dark")) res.dark = await themeCell(b, "dark");
    if (want("zoom200")) res.zoom200 = await themeCell(b, "light", { width: 720, height: 450 }, "zoom200");
    if (want("touch")) res.touch = await touchCell(b);
    if (want("corrupt")) res.corrupt = await corruptCell(b);
    if (want("wheel")) res.wheel = await wheelCell(b);
    if (want("stalepin")) res.stalepin = await stalePinCell(b);
    if (want("remount")) res.remount = await remountCell(b);
    if (want("cost")) res.cost = await costCell(b);
    for (const [k, v] of Object.entries(res)) {
        const brief = v.geo ? { inner: v.geo.inner, overlay: v.geo.overlay, wb: v.geo.workbenchRoot, pane: v.geo.pane, scroller: v.geo.scroller, letterbox: v.geo.letterbox, readout: v.contrast.readoutVsGround, readoutCls: v.contrast.readout.cls, icon: v.contrast.iconVsGround, hover: v.hover, pinned: v.pinned, reflow: v.reflowPx, buttons: v.buttons, loupe: v.loupe?.borderColor, ring: v.ring?.tokenVsOutside, census: v.census, errors: v.errors } : v;
        console.log(k, JSON.stringify(brief).slice(0, 2200));
    }
} finally { await b.close(); }
