// SERVED MODEL: claude-opus-5-5
// KF.W13X.esc1 served falsifier (KF-W13.md addendum (g), COHESION §0er): headless real
// Chrome (COHESION §0ei), fresh context per cell (no stored picks).
//   M1 ONE HOST, STATE HELD (ESC-mobile-1 · A2-KE-L1-10 · KFA-156 · UIA-KF-104): on a
//      multi-channel scene the controls pane mounts exactly ONE `.controls-surface`
//      (total, not visible), and a per-channel drill-in (the channel's easing detail
//      pane, opened with "Edit easing curve") survives a channel swap (`]` then `[`).
//   S1 STAGE SLOT (ESC-scene-1 · KFA-80 · UIA-KF-067 · UIA-KF-125 hard-load limb): on a
//      HARD load with the scene chunk held, the fallback stands in the stage slot the scene
//      resolves into: the slot (`.scene-host`) box while `.scene-skeleton` is mounted equals
//      the slot box after resolve (x, y, w, h each within 1 px). The skeleton-vs-scene-root
//      delta is recorded beside it.
// Usage: node esc1.mjs <base> <tag> [framesDir]   (env W="1440x900,390x844", S="spring,…")
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const sizes = (process.env.W || "1440x900,390x844").split(",").map((s) => s.split("x").map(Number));
const scenes = (process.env.S || "spring,easing,amiga,square,sequence").split(",");
const CHUNK = { spring: "SpringScene", easing: "EasingScene", amiga: "AmigaScene", square: "SquareScene", sequence: "SequenceScene" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
const box = (p, sel) => p.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 10) / 10);
}, sel);
// The box a scene is laid into: `.scene-host`'s CONTENT box (its rect less its padding).
const contentBox = (p, sel) => p.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    const [t, rt, b, l] = ["Top", "Right", "Bottom", "Left"].map((k) => parseFloat(cs["padding" + k]) + parseFloat(cs["border" + k + "Width"]));
    return [r.x + l, r.y + t, r.width - l - rt, r.height - t - b].map((v) => Math.round(v * 10) / 10);
}, sel);
const shot = async (p, name) => { if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${name}.png` }); };

// ── M1 ──────────────────────────────────────────────────────────────────────
for (const [w, h] of sizes) for (const scene of ["cube", "amiga"]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
    const p = await ctx.newPage();
    await p.goto(`${base}#/${scene}`, { waitUntil: "load" });
    await p.waitForSelector(".controls-surface", { timeout: 20000 }).catch(() => {});
    await sleep(2500);
    const hosts = await p.evaluate(() => {
        const all = [...document.querySelectorAll(".controls-surface")];
        return { total: all.length, visible: all.filter((e) => e.getClientRects().length > 0).length };
    });
    const visibleSurface = ".controls-surface:not([style*='display: none'])";
    const detailOpen = () => p.evaluate((sel) => {
        const s = document.querySelector(sel);
        const row = s?.querySelector(".panel-row--detail");
        return !!row && row.classList.contains("panel-row--active");
    }, visibleSurface);
    let opened = false, survived = false, swapped = false;
    const edit = p.locator(`${visibleSurface} [aria-label="Edit easing curve"]`).first();
    if (await edit.count()) {
        await edit.click({ timeout: 5000 }).catch(() => {});
        await sleep(700);
        opened = await detailOpen();
        const nameBefore = await p.evaluate(() => document.activeElement && (document.activeElement.blur(), true));
        void nameBefore;
        const sel0 = await p.evaluate(() => JSON.parse(localStorage.getItem("animation-groups-control-options-store") || "{}"));
        await p.keyboard.press("]"); await sleep(700);
        const sel1 = await p.evaluate(() => JSON.parse(localStorage.getItem("animation-groups-control-options-store") || "{}"));
        await p.keyboard.press("["); await sleep(900);
        swapped = sel0?.[scene]?.selectedAnimation !== sel1?.[scene]?.selectedAnimation;
        survived = await detailOpen();
    }
    await shot(p, `m1-${scene}-${w}`);
    const ok = hosts.total === 1 && opened && swapped && survived;
    res.push({ check: "M1", scene, w, h, hosts, opened, swapped, survived, ok });
    console.log(`M1 ${scene} ${w}x${h} hosts=${hosts.total}/${hosts.visible} opened=${opened} swapped=${swapped} survived=${survived} -> ${ok ? "GREEN" : "RED"}`);
    await ctx.close();
}

// ── S1 ──────────────────────────────────────────────────────────────────────
for (const [w, h] of sizes) for (const scene of scenes) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: "light", reducedMotion: "reduce" });
    const p = await ctx.newPage();
    let release; const gate = new Promise((r) => (release = r));
    await p.route(new RegExp(`/scenes/${scene}/${CHUNK[scene]}\\.vue`), async (r) => { await gate; await r.continue(); });
    await p.goto(`${base}#/${scene}`, { waitUntil: "domcontentloaded" });
    const seen = await p.waitForSelector(".scene-skeleton", { timeout: 20000 }).then(() => true, () => false);
    await sleep(900);
    const fb = { skel: await box(p, ".scene-skeleton"), host: await box(p, ".scene-host"), cell: await box(p, ".stage-cell"),
        rail: await p.evaluate(() => document.querySelectorAll(".controls-pane-wrapper").length) };
    await shot(p, `s1-${scene}-${w}-fallback`);
    release();
    await p.waitForSelector(".scene-skeleton", { state: "detached", timeout: 20000 }).catch(() => {});
    await sleep(2000);
    const rs = { host: await box(p, ".scene-host"), slot: await contentBox(p, ".scene-host"), root: await box(p, ".scene-host > *"), cell: await box(p, ".stage-cell"),
        rail: await p.evaluate(() => document.querySelectorAll(".controls-pane-wrapper").length) };
    await shot(p, `s1-${scene}-${w}-resolved`);
    // GATE: the stage slot — `.scene-host`, the box App lays every scene into — is the same
    // box while the fallback stands in it as after the scene resolves (x, y, w, h within 1 px).
    // Recorded beside it (not gating): skeleton vs the resolved scene ROOT (0 px wherever the
    // root fills its slot; square centres a narrower/shorter root of its own).
    const diff = (a, b) => (a && b ? a.map((v, i) => Math.round(Math.abs(v - b[i]) * 10) / 10) : null);
    const d = diff(fb.host, rs.host), dRoot = diff(fb.skel, rs.root);
    const ok = seen && !!d && d.every((v) => v <= 1);
    res.push({ check: "S1", scene, w, h, seen, fallback: fb, resolved: rs, delta: d, skelVsRoot: dRoot, ok });
    console.log(`S1 ${scene} ${w}x${h} slot ${JSON.stringify(fb.host)}->${JSON.stringify(rs.host)} rail ${fb.rail}->${rs.rail} delta=${JSON.stringify(d)} skel-root=${JSON.stringify(dRoot)} -> ${ok ? "GREEN" : "RED"}`);
    await ctx.close();
}

await b.close();
const green = res.filter((r) => r.ok).length;
console.log(`TOTAL ${green}/${res.length} GREEN`);
fs.writeFileSync(`${tag}.json`, JSON.stringify(res, null, 1));
