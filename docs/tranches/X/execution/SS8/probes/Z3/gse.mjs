// SS-8 · Z3 · GradientStopEditor (successor: GradientStopRail + GradientStopInspector, route #/gradient).
import { cell, go, runCells, png } from "./lib.mjs";

const BAR = '[data-testid="gradient-stop-bar"]';
const H = `${BAR} button[data-stop-id]`;
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

const STATE = () => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const r = (el) => { const b = el.getBoundingClientRect(); return [+b.x.toFixed(2), +b.y.toFixed(2), +b.width.toFixed(2), +b.height.toFixed(2)]; };
    const bcs = getComputedStyle(bar);
    const handles = [...bar.querySelectorAll("button[data-stop-id]")].map((h) => {
        const b = h.getBoundingClientRect(), face = h.querySelector(".rail-handle-face");
        const f = face ? face.getBoundingClientRect() : null, fcs = face ? getComputedStyle(face) : null;
        return { id: h.dataset.stopId, now: +h.getAttribute("aria-valuenow"), text: h.getAttribute("aria-valuetext"), label: h.getAttribute("aria-label"), role: h.getAttribute("role"),
            sel: h.getAttribute("aria-selected"), cx: +(b.x + b.width / 2).toFixed(2), hit: r(h), face: face ? r(face) : null,
            faceBg: fcs?.backgroundImage.slice(0, 120) || null, faceBgColor: fcs?.backgroundColor, faceBorder: fcs ? fcs.borderTopWidth + " " + fcs.borderTopColor : null, faceShadow: fcs?.boxShadow.slice(0, 160) || null };
    });
    const tile = document.querySelector('[data-testid="gradient-render-tile"]');
    const pane = bar.closest("[data-pane],section,.pane-card,[class*=card]") || document.querySelector("main");
    return {
        bar: { border: r(bar), bl: parseFloat(bcs.borderLeftWidth), br: parseFloat(bcs.borderRightWidth), bg: bcs.backgroundImage.slice(0, 200) },
        handles, count: handles.length,
        tileBg: tile ? getComputedStyle(tile).backgroundImage.slice(0, 400) : null,
        editor: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.innerText.slice(0, 600),
        active: document.activeElement ? document.activeElement.tagName + "|" + (document.activeElement.getAttribute("aria-label") || "") : null,
        inspector: (() => { const i = document.querySelector('[data-testid="gradient-stop-inspector"]'); if (!i) return null; const pos = i.querySelector('[data-testid="gradient-stop-position"]'); const rm = i.querySelector('[aria-label="Remove selected stop"]');
            return { text: i.innerText.trim().slice(0, 200), pos: pos ? { tag: pos.tagName, value: pos.value, role: pos.getAttribute("role") } : null, remove: rm ? { disabled: rm.disabled || rm.getAttribute("aria-disabled"), describedby: rm.getAttribute("aria-describedby"), reason: rm.getAttribute("aria-describedby") ? document.getElementById(rm.getAttribute("aria-describedby"))?.textContent.trim() : null } : null }; })(),
        watercolorInMain: document.querySelectorAll("main .watercolor-swatch").length,
        headings: [...document.querySelectorAll("main h1,main h2,main h3,main h4")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 40)),
        live: [...document.querySelectorAll("main [aria-live],main [role=status]")].map((e) => e.textContent.trim().slice(0, 100)).filter(Boolean),
        panes: document.querySelectorAll(".pane-wrapper, [data-pane-id], [data-pane]").length,
        boundary: [...document.querySelectorAll("[role=alert]")].map((e) => e.textContent.trim().slice(0, 100)),
    };
};

async function gradient(p, settle = 1800) { await go(p, "#/gradient", H, settle); return p.evaluate(STATE); }
const center = async (p, sel, i) => p.locator(sel).nth(i).evaluate((h) => { const b = h.getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; });

const cells = {
    recon: (b) => cell(b, "recon", {}, async (p) => {
        const s = await gradient(p);
        await p.screenshot({ path: png("gse-recon-1440-light") });
        return { s };
    }),
    mint: (b) => cell(b, "mint", {}, async (p) => {
        const s0 = await gradient(p);
        const [bx, by, bw, bh] = s0.bar.border;
        // pick a click x away from existing handle seats: scan 15..85% for the largest gap
        const xs = s0.handles.map((h) => h.cx).sort((a, b) => a - b);
        let best = null;
        for (let f = 0.12; f <= 0.88; f += 0.01) { const x = bx + f * bw; const d = Math.min(...xs.map((c) => Math.abs(c - x))); if (!best || d > best.d) best = { x, d, f }; }
        await p.mouse.move(best.x, by + bh / 2); await p.waitForTimeout(150);
        await p.mouse.down(); await p.mouse.up();
        await p.waitForTimeout(900);
        const s1 = await p.evaluate(STATE);
        const fresh = s1.handles.find((h) => !s0.handles.some((o) => o.id === h.id));
        return { clickX: +best.x.toFixed(2), clickFrac: +best.f.toFixed(3), gap: +best.d.toFixed(1), count: [s0.count, s1.count], fresh, dx: fresh ? +(fresh.cx - best.x).toFixed(2) : null, editorBefore: s0.editor, editorAfter: s1.editor, tileBg: s1.tileBg };
    }),
    order: (b) => cell(b, "order", {}, async (p) => {
        const s0 = await gradient(p);
        const sorted = [...s0.handles].sort((a, b) => a.now - b.now);
        const last = sorted[sorted.length - 1];
        const i = s0.handles.findIndex((h) => h.id === last.id);
        const [cx, cy] = await center(p, H, i);
        const [bx, , bw] = s0.bar.border;
        const target = bx + 0.15 * bw;
        await p.mouse.move(cx, cy); await p.mouse.down();
        for (let k = 1; k <= 12; k++) { await p.mouse.move(cx + (target - cx) * k / 12, cy); await p.waitForTimeout(30); }
        await p.mouse.up();
        await p.waitForTimeout(1200);
        const s1 = await p.evaluate(STATE);
        const stopsInText = (s1.editor || "").match(/(\d+(?:\.\d+)?)%\s*[,\n)]/g);
        return { dragged: last.id, from: last.now, handlesAfter: s1.handles.map((h) => [h.id, h.now]), editorAfter: s1.editor, tileBg: s1.tileBg, boundary: s1.boundary, stopsInText };
    }),
    kb: (b) => cell(b, "kb", {}, async (p) => {
        const s0 = await gradient(p);
        const mid = s0.handles.findIndex((h) => h.now > 10 && h.now < 90);
        const i = mid >= 0 ? mid : 0;
        const [cx, cy] = await center(p, H, i);
        await p.mouse.click(cx, cy);
        await p.waitForTimeout(400);
        const afterClick = await p.evaluate(STATE);
        const id = s0.handles[i].id;
        const val = () => p.evaluate((id) => +document.querySelector(`button[data-stop-id="${id}"]`).getAttribute("aria-valuenow"), id);
        const steps = { start: await val() };
        await p.keyboard.press("ArrowRight"); await p.waitForTimeout(250); steps.right = await val();
        await p.keyboard.press("ArrowUp"); await p.waitForTimeout(250); steps.up = await val();
        await p.keyboard.press("PageUp"); await p.waitForTimeout(250); steps.pageUp = await val();
        await p.keyboard.press("ArrowDown"); await p.waitForTimeout(250); steps.down = await val();
        await p.keyboard.press("PageDown"); await p.waitForTimeout(250); steps.pageDown = await val();
        await p.keyboard.press("End"); await p.waitForTimeout(250); steps.end = await val();
        await p.keyboard.press("Home"); await p.waitForTimeout(250); steps.home = await val();
        // caret: Tab order reach + Enter mint
        const c0 = (await p.evaluate(STATE)).count;
        await p.locator('[data-testid="gradient-stop-caret"]').focus();
        const caretLabel = await p.evaluate(() => document.activeElement?.getAttribute("aria-label"));
        await p.keyboard.press("ArrowLeft"); await p.keyboard.press("Enter");
        await p.waitForTimeout(700);
        const c1 = (await p.evaluate(STATE)).count;
        return { activeAfterMouseClick: afterClick.active, selectedAfterClick: afterClick.handles[i].sel, steps, caretLabel, caretMint: [c0, c1], handleAttrs: afterClick.handles[i] };
    }),
    buttons: (b) => cell(b, "buttons", {}, async (p) => {
        const s0 = await gradient(p);
        const [bx, by, bw, bh] = s0.bar.border;
        const xs = s0.handles.map((h) => h.cx);
        let best = null;
        for (let f = 0.12; f <= 0.88; f += 0.01) { const x = bx + f * bw; const d = Math.min(...xs.map((c) => Math.abs(c - x))); if (!best || d > best.d) best = { x, d }; }
        const res = { start: s0.count };
        await p.mouse.click(best.x, by + bh / 2, { button: "middle" }); await p.waitForTimeout(700);
        res.afterMiddle = (await p.evaluate(STATE)).count;
        await p.mouse.click(best.x, by + bh / 2, { button: "right" }); await p.waitForTimeout(700);
        res.afterRight = (await p.evaluate(STATE)).count;
        await p.keyboard.press("Escape");
        return res;
    }),
    teleport: (b) => cell(b, "teleport", {}, async (p) => {
        const s0 = await gradient(p);
        const mid = s0.handles.findIndex((h) => h.now > 10 && h.now < 90);
        const i = mid >= 0 ? mid : 0;
        const [cx, cy] = await center(p, H, i);
        const before = s0.handles[i];
        await p.mouse.move(cx + 6, cy); await p.mouse.down();
        await p.mouse.move(cx + 7, cy); await p.waitForTimeout(80);
        await p.mouse.move(cx + 7, cy); await p.mouse.up();
        await p.waitForTimeout(500);
        const s1 = await p.evaluate(STATE);
        const after = s1.handles.find((h) => h.id === before.id);
        // a real 1px-of-travel past the dead zone: 6px off-centre grab, then +6 px
        const [cx2, cy2] = await center(p, H, s1.handles.findIndex((h) => h.id === before.id));
        await p.mouse.move(cx2 + 6, cy2); await p.mouse.down();
        for (let k = 1; k <= 6; k++) { await p.mouse.move(cx2 + 6 + k, cy2); await p.waitForTimeout(30); }
        await p.mouse.up(); await p.waitForTimeout(500);
        const s2 = await p.evaluate(STATE);
        const after2 = s2.handles.find((h) => h.id === before.id);
        return { tap: { before: [before.now, before.cx], after: [after.now, after.cx], dpx: +(after.cx - before.cx).toFixed(2) }, drag6: { before: [after.now, after.cx], after: [after2.now, after2.cx], dpx: +(after2.cx - after.cx).toFixed(2) } };
    }),
    axis: (b) => cell(b, "axis", {}, async (p) => {
        const s = await gradient(p);
        const [bx, , bw] = s.bar.border;
        const pad = [bx + s.bar.bl, bx + bw - s.bar.br];
        return { border: [bx, bx + bw], padding: pad, handles: s.handles.map((h) => ({ now: h.now, cx: h.cx, expectBorder: +(bx + h.now / 100 * bw).toFixed(2), dBorder: +(h.cx - (bx + h.now / 100 * bw)).toFixed(2), face: h.face })) };
    }),
    rem20: (b) => cell(b, "rem20", { init: () => { document.addEventListener("DOMContentLoaded", () => { document.documentElement.style.fontSize = "20px"; }); } }, async (p) => {
        const s = await gradient(p, 2200);
        const fs = await p.evaluate(() => getComputedStyle(document.documentElement).fontSize);
        const [bx, , bw] = s.bar.border;
        return { rootFS: fs, border: [bx, bx + bw], ends: s.handles.filter((h) => h.now <= 0.5 || h.now >= 99.5).map((h) => ({ now: h.now, faceLeft: h.face?.[0], faceRight: h.face ? +(h.face[0] + h.face[2]).toFixed(2) : null, overhangLeft: h.face ? +(bx - h.face[0]).toFixed(2) : null, overhangRight: h.face ? +(h.face[0] + h.face[2] - (bx + bw)).toFixed(2) : null })) };
    }),
    floor: (b) => cell(b, "floor", {}, async (p) => {
        const s0 = await gradient(p);
        const log = [];
        for (let k = 0; k < 12; k++) {
            const s = await p.evaluate(STATE);
            if (s.count <= 2) break;
            const [cx, cy] = await center(p, H, 1);
            await p.mouse.click(cx, cy); await p.waitForTimeout(300);
            const rm = p.locator('[aria-label="Remove selected stop"]').first();
            if (!(await rm.count())) { log.push("no remove button"); break; }
            await rm.click(); await p.waitForTimeout(500);
            log.push((await p.evaluate(STATE)).live.join(" | ").slice(0, 120));
        }
        const s1 = await p.evaluate(STATE);
        const [cx, cy] = await center(p, H, 0);
        await p.mouse.click(cx, cy); await p.waitForTimeout(400);
        const s2 = await p.evaluate(STATE);
        // Delete key on the floor
        await p.keyboard.press("Delete"); await p.waitForTimeout(400);
        const s3 = await p.evaluate(STATE);
        return { start: s0.count, removalLog: log, atFloor: s1.count, inspector: s2.inspector, afterDelete: { count: s3.count, live: s3.live } };
    }),
    numeric: (b) => cell(b, "numeric", {}, async (p) => {
        const s0 = await gradient(p);
        const mid = s0.handles.findIndex((h) => h.now > 10 && h.now < 90);
        const [cx, cy] = await center(p, H, mid);
        await p.mouse.click(cx, cy); await p.waitForTimeout(400);
        const pos = p.locator('[data-testid="gradient-stop-position"]').first();
        if (!(await pos.count())) return { note: "no position entry" };
        await pos.fill("33"); await pos.press("Enter"); await p.waitForTimeout(600);
        const s1 = await p.evaluate(STATE);
        return { id: s0.handles[mid].id, before: s0.handles[mid].now, after: s1.handles.find((h) => h.id === s0.handles[mid].id)?.now, inspector: s1.inspector };
    }),
    crash: (b) => cell(b, "crash", {}, async (p) => {
        const s0 = await gradient(p);
        await p.click(EDITOR); await p.keyboard.press("ControlOrMeta+a"); await p.keyboard.press("Backspace");
        await p.keyboard.insertText("linear-gradient(90deg, oklch() 0%, red 100%)");
        await p.waitForTimeout(1200);
        const s1 = await p.evaluate(STATE);
        const verdict = await p.evaluate(() => [...document.querySelectorAll("main p,main [role=status]")].map((e) => e.textContent.trim()).filter((t) => /unpars|invalid|could not/i.test(t)).slice(0, 3));
        return { panes: [s0.panes, s1.panes], boundary: s1.boundary, verdict, bodyLen: await p.evaluate(() => document.body.innerText.length) };
    }),
    coarse: (b) => cell(b, "coarse", { w: 390, h: 844, touch: true, mobile: true }, async (p) => {
        const s0 = await gradient(p, 2200);
        const mid = s0.handles.findIndex((h) => h.now > 10 && h.now < 90);
        const [cx, cy] = await center(p, H, mid);
        await p.touchscreen.tap(cx, cy); await p.waitForTimeout(500);
        const s1 = await p.evaluate(STATE);
        // D-4: anything inside the rail seat painting below its own box?
        const borrow = await p.evaluate(() => {
            const seat = document.querySelector('[data-testid="gradient-stop-bar"]').closest(".rail-seat") || document.querySelector('[data-testid="gradient-stop-bar"]').parentElement;
            const sb = seat.getBoundingClientRect();
            const over = [...seat.querySelectorAll("*")].map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.height > 0 && r.bottom > sb.bottom + 0.5).map(([e, r]) => e.tagName + "." + e.className.toString().split(" ")[0] + ":" + (r.bottom - sb.bottom).toFixed(1));
            return { seatBottom: sb.bottom, over: over.slice(0, 6) };
        });
        const taps = {};
        for (const dy of [14, 20, 26]) {
            const before = (await p.evaluate(STATE)).count;
            await p.touchscreen.tap(cx, cy + dy); await p.waitForTimeout(600);
            taps[dy] = [before, (await p.evaluate(STATE)).count];
            // reselect
            const s = await p.evaluate(STATE);
            const k = s.handles.findIndex((h) => h.id === s0.handles[mid].id);
            if (k >= 0) { const [x2, y2] = await center(p, H, k); await p.touchscreen.tap(x2, y2); await p.waitForTimeout(400); }
        }
        await p.screenshot({ path: png("gse-coarse-390-selected") });
        return { selected: s1.handles[mid].sel, hitRect: s1.handles[mid].hit, borrow, taps };
    }),
    white: (b) => cell(b, "white", {}, async (p) => {
        await gradient(p);
        await p.click(EDITOR); await p.keyboard.press("ControlOrMeta+a"); await p.keyboard.press("Backspace");
        await p.keyboard.insertText("linear-gradient(90deg, #ffffff 0%, #fafafa 100%)");
        await p.waitForTimeout(1500);
        await p.mouse.click(5, 895); await p.waitForTimeout(300);
        const s = await p.evaluate(STATE);
        const [bx, by, bw, bh] = s.bar.border;
        const clip = { x: bx - 16, y: by - 16, width: bw + 32, height: bh + 32 };
        const buf = await p.screenshot({ clip });
        await p.screenshot({ path: png("gse-white-ramp"), clip });
        const faces = s.handles.map((h) => h.face || h.hit);
        const res = await p.evaluate(async ({ b64, clip, faces }) => {
            const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
            const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
            const d = x.getImageData(0, 0, c.width, c.height).data, W = c.width;
            const L = (i) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(d[i]) + 0.7152 * f(d[i + 1]) + 0.0722 * f(d[i + 2]); };
            const at = (px, py) => L(((Math.round(py - clip.y)) * W + Math.round(px - clip.x)) * 4);
            const ratio = (a, b) => { const [h, l] = a > b ? [a, b] : [b, a]; return (h + 0.05) / (l + 0.05); };
            return faces.map(([fx, fy, fw, fh]) => {
                const cy = fy + fh / 2, rx = fx - 4 > clip.x + 18 ? fx - 4 : fx + fw + 4, ramp = at(rx, cy);
                let best = 1;
                for (let yy = fy; yy < fy + fh; yy += 1) for (let xx = fx; xx < fx + fw; xx += 1) best = Math.max(best, ratio(at(xx, yy), ramp));
                return { face: [fx, fy, fw, fh].map((v) => +v.toFixed(1)), rampL: +ramp.toFixed(4), maxRatioVsRamp: +best.toFixed(2) };
            });
        }, { b64: buf.toString("base64"), clip, faces });
        return { editor: s.editor, tileBg: s.tileBg, faces: res, faceStyles: s.handles.map((h) => ({ bg: h.faceBgColor, border: h.faceBorder, shadow: h.faceShadow })) };
    }),
    dark: (b) => cell(b, "dark", { dark: true }, async (p) => {
        const s = await gradient(p);
        return { handles: s.handles.map((h) => ({ now: h.now, faceBg: h.faceBg, faceBorder: h.faceBorder, faceShadow: h.faceShadow })) };
    }),
};

runCells("gse", cells);
