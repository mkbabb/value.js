// SERVED MODEL: claude-opus-5-5[1m]
/**
 * X-W6 · X.W6.v — the §8 VERIFICATION-ARTEFACT capturer (W6.md §8 L354-371 ·
 * fifth ADDENDUM · COHESION §0ba `.v`). Read-only against the product: it
 * drives a FRESH dev server and writes PNGs, nothing else.
 *
 *   node capture-v.mjs <baseURL> <before|after> [--owner-marks]
 *
 * BEFORE = a server on a sibling worktree at `f90aeb02^` (pre-`.a`);
 * AFTER  = a server on HEAD. Both runs use THIS file, so every crop is the same
 * formula over the same anchor (the rail's `[data-testid="gradient-stop-bar"]`
 * border box): clip = bar ± 24px horizontally, bar.top − 24 .. +150 vertically,
 * clamped to the viewport. Chromium 1440×900 @2x; the touch cell is
 * playwright-webkit `devices["iPhone 14"]`.
 *
 * `--owner-marks` (AFTER only) re-captures OM-3/4/6/9/10/13 at each original's
 * crop: the original's pixel size ÷ 2 (the originals are 144-dpi @2x) placed at
 * the anchor offset read off the original (see OM table below).
 */
import { chromium, webkit, devices } from "playwright";
import { resolve } from "node:path";

const [BASE, TAG, FLAG] = process.argv.slice(2);
if (!BASE || !["before", "after"].includes(TAG)) {
    console.error("usage: node capture-v.mjs <baseURL> <before|after> [--owner-marks]");
    process.exit(2);
}
const HERE = import.meta.dirname;
const GRAD = (n) => resolve(HERE, `${TAG}-${n}.png`);
const OM = (n) => resolve(HERE, "..", "owner-marks", n);
const log = (...a) => console.log(...a);

const settle = async (p, sel) => {
    // Settled = no running Animation on the anchor or its ancestors' pane AND no
    // `*-enter-*` / `*-leave-*` transition class on it (the §0ba pose law).
    await p.waitForFunction(
        (s) => {
            const el = document.querySelector(s);
            if (!el) return false;
            for (let n = el; n && n !== document.body; n = n.parentElement) {
                if (/-(enter|leave)-/.test(String(n.className))) return false;
                if (n.getAnimations().some((a) => a.playState === "running" && a.effect?.getComputedTiming().iterations !== Infinity)) return false;
            }
            return true;
        },
        sel,
        { timeout: 15000, polling: 200 },
    );
    await p.waitForTimeout(400);
};

const BAR = '[data-testid="gradient-stop-bar"]';
const barBox = (p) =>
    p.evaluate((s) => {
        const b = document.querySelector(s);
        b.scrollIntoView({ block: "center" });
        const r = b.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, BAR);
const stops = (p) =>
    p.evaluate(() =>
        [...document.querySelectorAll("[data-stop-id]")].map((h) => {
            const r = h.getBoundingClientRect();
            return { v: Number(h.getAttribute("aria-valuenow")), cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
        }),
    );
const railClip = async (p) => {
    const b = await barBox(p);
    const vp = p.viewportSize();
    const x = Math.max(0, b.x - 24);
    const y = Math.max(0, b.y - 24);
    return { x, y, width: Math.min(vp.width - x, b.w + 48), height: Math.min(vp.height - y, 150) };
};
const shot = async (p, name) => {
    const clip = await railClip(p);
    await p.screenshot({ path: GRAD(name), clip });
    log(`${TAG}-${name}.png clip=${JSON.stringify(clip)} stops=${JSON.stringify((await stops(p)).map((s) => s.v))}`);
};
const openGradient = async (ctx) => {
    const p = await ctx.newPage();
    await p.goto(`${BASE}/#/gradient`, { waitUntil: "networkidle", timeout: 60000 });
    await p.waitForSelector("[data-stop-id]", { timeout: 30000 });
    await settle(p, BAR);
    await barBox(p);
    await p.waitForTimeout(300);
    return p;
};

const mint = async (p, frac) => {
    const b = await barBox(p);
    await p.mouse.click(b.x + b.w * frac, b.y + b.h / 2);
    await p.waitForTimeout(400);
};
const nearest = (ss, x) => ss.reduce((a, s) => (Math.abs(s.cx - x) < Math.abs(a.cx - x) ? s : a));
const overlay = (p, marks) =>
    p.evaluate((ms) => {
        for (const m of ms) {
            const d = document.createElement("div");
            d.setAttribute("data-capture-overlay", "");
            Object.assign(d.style, {
                position: "fixed", pointerEvents: "none", zIndex: 2147483647, background: m.c,
                left: `${m.x - (m.w ?? 1) / 2}px`, top: `${m.y}px`, width: `${m.w ?? 1}px`, height: `${m.h}px`,
                borderRadius: m.r ?? "0",
            });
            document.body.appendChild(d);
        }
    }, marks);
const applyCss = async (p, css) => {
    const ed = p.locator('[contenteditable="true"]').first();
    await ed.click();
    await p.keyboard.press("ControlOrMeta+a");
    await p.keyboard.type(css);
    await p.waitForTimeout(1200);
    await p.evaluate(() => document.activeElement.blur());
    await p.waitForTimeout(800);
};

async function gradientCells() {
    const b = await chromium.launch();
    const fresh = () => b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

    { // 1 · cross-drag-rail (a2): mint 30% + 62%, drag the 62% stop past its neighbours to 10%
        const ctx = await fresh(); const p = await openGradient(ctx);
        await mint(p, 0.30); await mint(p, 0.62);
        const bb = await barBox(p);
        const s = nearest(await stops(p), bb.x + bb.w * 0.62); const y = s.cy; // press ON the handle
        await p.mouse.move(s.cx, y); await p.mouse.down();
        for (let i = 1; i <= 14; i++) { await p.mouse.move(s.cx - (s.cx - (bb.x + bb.w * 0.10)) * i / 14, y); await p.waitForTimeout(20); }
        await p.mouse.up(); await p.waitForTimeout(600);
        await shot(p, "cross-drag-rail-1440"); await ctx.close();
    }
    { // 2 · axis-overlay (a3/a4): magenta = handle centre; cyan = where THIS tree's ramp paints the stop's ordinal.
      // The ramp's paint geometry is read off each tree: HEAD registers `--rail-inset` and paints the ramp at
      // padding-box + inset + (padding-box − 2·inset)·p; the pre-`.a` tree has no `--rail-inset` and paints its
      // ramp across the bar's border box (the geometry gate-axis.mjs measured: ramp 224/686).
        const ctx = await fresh(); const p = await openGradient(ctx);
        await mint(p, 0.5);
        await p.mouse.click(5, 5); await p.waitForTimeout(300);
        const bb = await barBox(p);
        const ramp = await p.evaluate((sel) => {
            const b = document.querySelector(sel); const r = b.getBoundingClientRect(); const cs = getComputedStyle(b);
            const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
            if (!Number.isFinite(inset)) return { geometry: "border-box", origin: r.x, track: r.width };
            const pl = parseFloat(cs.borderLeftWidth) + parseFloat(cs.paddingLeft);
            const pad = r.width - pl - parseFloat(cs.borderRightWidth) - parseFloat(cs.paddingRight);
            return { geometry: "padding-box+--rail-inset", origin: r.x + pl + inset, track: pad - 2 * inset };
        }, BAR);
        const ss = await stops(p);
        const marks = [];
        for (const s of ss) {
            marks.push({ x: s.cx, y: bb.y - 14, h: bb.h + 28, c: "#ff00ff" });
            marks.push({ x: ramp.origin + (s.v / 100) * ramp.track, y: bb.y - 20, h: bb.h + 40, c: "#00e5ff" });
        }
        await overlay(p, marks);
        log("axis", ramp.geometry, JSON.stringify(ss.map((s) => ({ v: s.v, centre: +s.cx.toFixed(2), ramp: +(ramp.origin + (s.v / 100) * ramp.track).toFixed(2) }))));
        await shot(p, "axis-overlay-1440"); await ctx.close();
    }
    { // 3 · grab-teleport (a5): press 8px off the 0% handle's centre, move 1px, frame while held
        const ctx = await fresh(); const p = await openGradient(ctx);
        await barBox(p);
        const s0 = (await stops(p)).reduce((a, s) => (s.v < a.v ? s : a)); const y = s0.cy; // 8px right of the handle centre, on its row
        await overlay(p, [{ x: s0.cx + 8, y: y - 3, w: 6, h: 6, c: "#ff00ff", r: "50%" }]);
        await p.mouse.move(s0.cx + 8, y); await p.mouse.down();
        await p.mouse.move(s0.cx + 9, y, { steps: 1 }); await p.waitForTimeout(350);
        const after = (await stops(p)).reduce((a, s) => (Math.abs(s.cx - s0.cx) < Math.abs(a.cx - s0.cx) ? s : a));
        log("grab", JSON.stringify({ before: { v: s0.v, cx: +s0.cx.toFixed(2) }, held: { v: after.v, cx: +after.cx.toFixed(2) }, travel: +(after.cx - s0.cx).toFixed(2) }));
        await shot(p, "grab-teleport-1440");
        await p.mouse.up(); await ctx.close();
    }
    { // 5 · chip-hr (a10): mint 50%, select it — the remove chip against the section rule
        const ctx = await fresh(); const p = await openGradient(ctx);
        await mint(p, 0.5);
        const bb = await barBox(p);
        const s = nearest(await stops(p), bb.x + bb.w * 0.5);
        await p.mouse.click(s.cx, s.cy); await p.waitForTimeout(500);
        await shot(p, "chip-hr-1440"); await ctx.close();
    }
    { // 6 · white-ramp-contrast (a11): #ffffff → #fafafa
        const ctx = await fresh(); const p = await openGradient(ctx);
        await applyCss(p, "linear-gradient(90deg, #ffffff 0%, #fafafa 100%)");
        await shot(p, "white-ramp-contrast-1440"); await ctx.close();
    }
    { // 7 · rootfs20-overhang (a12): root font-size 20px, the 0% handle against the rail's left edge
        const ctx = await fresh(); const p = await openGradient(ctx);
        await p.evaluate(() => { document.documentElement.style.fontSize = "20px"; });
        await p.waitForTimeout(900);
        await shot(p, "rootfs20-overhang-1440"); await ctx.close();
    }
    await b.close();
}

async function touchCell() {
    // 4 · touch-delete-iphone14 (a9): mint 50%, tap-select it, tap 20px BELOW its centre (inside the grab expander)
    const b = await webkit.launch();
    const ctx = await b.newContext({ ...devices["iPhone 14"] });
    const p = await openGradient(ctx);
    await mint(p, 0.5);
    const bb = await barBox(p);
    const s = nearest(await stops(p), bb.x + bb.w * 0.5);
    await p.touchscreen.tap(s.cx, s.cy); await p.waitForTimeout(500);
    const before = (await stops(p)).length;
    await p.touchscreen.tap(s.cx, s.cy + 20); await p.waitForTimeout(600);
    log("touch", JSON.stringify({ stopsBeforeTap: before, stopsAfterTap: (await stops(p)).length }));
    await overlay(p, [{ x: s.cx, y: s.cy + 17, w: 6, h: 6, c: "#ff00ff", r: "50%" }]);
    await shot(p, "touch-delete-iphone14");
    await ctx.close(); await b.close();
}

// Owner marks: [file, route, anchor selector, anchor edge offsets (CSS px, read off the original @2x ÷ 2), crop size = original px ÷ 2]
const COLOR = "space=lab&color=" + encodeURIComponent("lab(92% 88.8 20)");
const MARKS = [
    ["OM-3-picker-row-gap", `#/?${COLOR}`, "picker", { left: 56.5, top: 32 }, [1186, 592]],
    ["OM-6-blob-vibrancy", `#/?${COLOR}`, "picker", { right: 163.5, top: 18 }, [342, 318]],
    ["OM-9-picker-about-height-misaligned", `#/?${COLOR}`, "picker", { left: 32.5, top: 68 }, [2288, 1190]],
    ["OM-10-picker-mix-height-aligned-CONTROL", `#/mix?${COLOR}`, "picker", { left: 67, top: 58 }, [2302, 700]],
    ["OM-4-easing-radius-incoherence", "#/gradient", "readout", { left: 38, top: 214.5 }, [1012, 540]],
    ["OM-13-easing-readout-not-glass-input", "#/gradient", "readout", { left: 22, top: 5 }, [946, 112]],
];
async function ownerMarks() {
    const b = await chromium.launch();
    for (const [file, route, anchor, off, [pw, ph]] of MARKS) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
        const p = await ctx.newPage();
        await p.goto(`${BASE}/${route}`, { waitUntil: "networkidle", timeout: 60000 });
        const sel = anchor === "picker" ? '[role="region"][aria-label="Picker"] > *' : ".readout-rail";
        await p.waitForSelector(sel, { timeout: 30000 });
        await settle(p, sel);
        await p.waitForTimeout(1500); // the WebGL blob / atmosphere first frames
        const r = await p.evaluate((s) => {
            const e = document.querySelector(s); e.scrollIntoView({ block: "nearest" });
            const q = e.getBoundingClientRect(); return { x: q.x, y: q.y, right: q.right, w: q.width, h: q.height };
        }, sel);
        const w = pw / 2, h = ph / 2;
        const x = off.left !== undefined ? r.x - off.left : r.right + off.right - w;
        const clip = { x: Math.max(0, x), y: Math.max(0, r.y - off.top), width: w, height: h };
        await p.screenshot({ path: OM(`${file}.recapture-${new Date().toISOString().slice(0, 10)}.png`), clip });
        log(`${file} anchor=${JSON.stringify(r)} clip=${JSON.stringify(clip)}`);
        await ctx.close();
    }
    await b.close();
}

await gradientCells();
await touchCell();
if (FLAG === "--owner-marks") await ownerMarks();
