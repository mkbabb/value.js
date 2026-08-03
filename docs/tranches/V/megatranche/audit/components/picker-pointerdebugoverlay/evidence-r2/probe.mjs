// CHALLENGE-D r2 probe — PointerDebugOverlay.vue
//
// Re-runs every measurement in challenge-D-design-r2.md against the LIVE dev
// stack. Read-only: it never writes to the repo outside this evidence dir.
//
//   node docs/tranches/V/megatranche/audit/components/picker-pointerdebugoverlay/evidence-r2/probe.mjs
//
// Requires: dev demo on http://localhost:9000 (scripts/dev/dev.sh), playwright.

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEV = "http://localhost:9000";
const PROD = "https://color.babb.dev";
const shot = (n) => join(HERE, n);
const out = {};
const log = (k, v) => { out[k] = v; console.log(`\n── ${k} ──\n` + JSON.stringify(v, null, 2)); };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
const page = await ctx.newPage();
page.setDefaultTimeout(90_000);
page.setDefaultNavigationTimeout(90_000);

const boot = async (url = `${DEV}/?debug=1`) => {
    await page.goto(url, { timeout: 90_000 });
    await page.waitForTimeout(3200);
};
const expand = async () => { await page.locator(".debug-header").click(); await page.waitForTimeout(350); };

// ── D-1 · the orphaned --z-debug rung (BLOCKER) ────────────────────────────
await boot();
await expand();
log("D-1.tokenLadder", await page.evaluate(() => {
    const rs = getComputedStyle(document.documentElement);
    const names = ["--z-behind","--z-background","--z-content","--z-controls","--z-ornament",
                   "--z-bar","--z-header","--z-dock","--z-overlay","--z-popover","--z-modal","--z-debug"];
    return {
        tokens: Object.fromEntries(names.map((n) => [n, rs.getPropertyValue(n).trim() || "(UNDEFINED)"])),
        overlayComputedZ: getComputedStyle(document.querySelector(".debug-overlay")).zIndex,
        cardZ: getComputedStyle(document.querySelector(".pane-wrapper--left")).zIndex,
    };
}));

// ── D-2 · what the card eats (BLOCKER) ─────────────────────────────────────
const box = await page.locator(".spectrum-picker, canvas").first().boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.down();
await page.waitForTimeout(4200); // > FREEZE_THRESHOLD_MS (2500) → state.frozen
log("D-2.occlusion", await page.evaluate(() => {
    const cr = document.querySelector(".pane-wrapper--left").getBoundingClientRect();
    const pct = (sel) => { const e = document.querySelector(sel); if (!e) return null;
        const r = e.getBoundingClientRect();
        const ix = Math.max(0, Math.min(cr.right, r.right) - Math.max(cr.left, r.left));
        const iy = Math.max(0, Math.min(cr.bottom, r.bottom) - Math.max(cr.top, r.top));
        return { text: e.textContent.trim().slice(0, 24), occludedPct: +(100 * (ix * iy) / (r.width * r.height)).toFixed(1) }; };
    return { frozenChip: pct(".debug-frozen"), toggleGlyph: pct(".debug-toggle"),
             firstGaugeValue: pct(".debug-gauge .debug-val"), wholeOverlay: pct(".debug-overlay") };
}));
await page.screenshot({ path: shot("02-desktop-occlusion-zoom.png"), clip: { x: 0, y: 720, width: 420, height: 180 } });
await page.screenshot({ path: shot("05-frozen-motion-on.png"), clip: { x: 0, y: 560, width: 460, height: 340 } });

// ── D-3 · reduced motion (re-adjudicates Codex D#4) ────────────────────────
const motion = async (mode) => { await page.emulateMedia({ reducedMotion: mode }); await page.waitForTimeout(400);
    return page.evaluate(() => { const f = document.querySelector(".debug-frozen"); if (!f) return null; const cs = getComputedStyle(f);
        return { prm: matchMedia("(prefers-reduced-motion: reduce)").matches, name: cs.animationName,
                 dur: cs.animationDuration, iter: cs.animationIterationCount, opacity: cs.opacity }; }); };
log("D-3.reducedMotion", { noPreference: await motion("no-preference"), reduce: await motion("reduce") });
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.mouse.up();

// ── D-4 · the unreachable log (MAJOR) ──────────────────────────────────────
await page.evaluate(() => { const t = document.querySelector(".spectrum-picker") || document.querySelector(".app-layout");
    for (let i = 0; i < 95; i++) t.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true, pointerId: 7e6 + i })); });
await page.waitForTimeout(600);
const readScroll = () => page.evaluate(() => { const s = document.querySelector(".debug-scroll");
    return { scrollTop: s.scrollTop, scrollH: s.scrollHeight, clientH: s.clientHeight,
             hiddenPx: s.scrollHeight - s.clientHeight, pointerEvents: getComputedStyle(s).pointerEvents, tabIndex: s.tabIndex }; });
const before = await readScroll();
await page.mouse.move(140, 700); await page.mouse.wheel(0, 800); await page.waitForTimeout(500);
const afterWheel = await readScroll();
await page.locator(".debug-header").focus(); await page.keyboard.press("PageDown"); await page.keyboard.press("End");
await page.waitForTimeout(300);
log("D-4.scrollUnreachable", { before, afterTrustedWheel: afterWheel, afterKeyboard: await readScroll(),
    hitTestAtLogCentre: await page.evaluate(() => document.elementsFromPoint(140, 700).slice(0, 3)
        .map((e) => e.tagName + "." + (e.className || "").toString().trim().split(/\s+/).slice(0, 2).join("."))) });
await page.screenshot({ path: shot("04-log-full-91pct-unreachable.png"), clip: { x: 0, y: 560, width: 460, height: 340 } });

// ── D-5 · a11y contract + copy feedback (MAJOR) ────────────────────────────
log("D-5.a11y", {
    axTree: await page.locator(".debug-overlay").ariaSnapshot(),
    dom: await page.evaluate(() => { const ov = document.querySelector(".debug-overlay");
        return { role: ov.getAttribute("role"), ariaLabel: ov.getAttribute("aria-label"),
                 liveRegions: ov.querySelectorAll('[aria-live],[role="status"],[role="alert"],[role="log"]').length,
                 ariaControlsTarget: document.getElementById("debug-body") ? "EXISTS" : "MISSING",
                 buttonTypes: [...ov.querySelectorAll("button")].map((b) => ({ txt: b.textContent.trim().slice(0, 12), type: b.getAttribute("type"), h: +b.getBoundingClientRect().height.toFixed(1) })) }; }),
});
await page.locator(".debug-btn-copy").click(); await page.waitForTimeout(200);
log("D-5.copiedFeedback", await page.evaluate(() => { const c = document.querySelector(".debug-copied");
    if (!c) return { present: false };
    const cr = document.querySelector(".pane-wrapper--left").getBoundingClientRect(); const r = c.getBoundingClientRect();
    const ix = Math.max(0, Math.min(cr.right, r.right) - Math.max(cr.left, r.left));
    const iy = Math.max(0, Math.min(cr.bottom, r.bottom) - Math.max(cr.top, r.top));
    return { present: true, occludedPct: +(100 * (ix * iy) / (r.width * r.height)).toFixed(1),
             inLiveRegion: !!c.closest("[aria-live],[role=status],[role=alert]") }; }));
await page.screenshot({ path: shot("06-copied-indicator-occluded.png"), clip: { x: 0, y: 560, width: 460, height: 340 } });

// ── D-6 · contrast + forced colors ─────────────────────────────────────────
log("D-6.contrast", await page.evaluate(() => {
    const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const lum = ([r, g, b]) => 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
    const parse = (s) => (s.match(/[\d.]+/g) || []).map(Number);
    const over = (fg, bg) => { const a = fg[3] ?? 1; return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)); };
    const ov = document.querySelector(".debug-overlay"); const r = ov.getBoundingClientRect();
    ov.style.visibility = "hidden";
    const behind = document.elementFromPoint(r.x + 30, r.y + r.height - 20);
    ov.style.visibility = "";
    let bgc = [255, 255, 255];
    for (let el = behind; el; el = el.parentElement) { const c = parse(getComputedStyle(el).backgroundColor);
        if (c.length >= 3 && (c[3] === undefined || c[3] > 0)) { bgc = c.slice(0, 3); break; } }
    const panel = over(parse(getComputedStyle(ov).backgroundColor), bgc);
    const rows = []; const seen = new Set();
    for (const el of ov.querySelectorAll("*")) {
        if (!el.textContent.trim() || el.children.length) continue;
        const cs = getComputedStyle(el); const k = cs.color + cs.fontSize + el.className;
        if (seen.has(k)) continue; seen.add(k);
        let base = panel; const own = parse(cs.backgroundColor);
        if (own.length >= 3 && (own[3] ?? 1) > 0) base = over(own, panel);
        const fg = over(parse(cs.color), base); const L1 = lum(fg), L2 = lum(base);
        const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        rows.push({ cls: (el.className || "").toString().slice(0, 26), color: cs.color, px: cs.fontSize, ratio: +ratio.toFixed(2), passAA: ratio >= 4.5 });
    }
    return { panelBgComposited: panel.map((v) => +v.toFixed(1)), rows: rows.sort((a, b) => a.ratio - b.ratio) };
}));
const fc = async (mode) => { await page.emulateMedia({ forcedColors: mode }); await page.waitForTimeout(400);
    return page.evaluate(() => ({ active: matchMedia("(forced-colors: active)").matches,
        danger: getComputedStyle(document.querySelector(".debug-btn-danger")).backgroundColor,
        copy: getComputedStyle(document.querySelector(".debug-btn-copy")).backgroundColor,
        clear: getComputedStyle(document.querySelectorAll(".debug-btn")[2]).backgroundColor })); };
log("D-6.forcedColors", { off: await fc("none"), active: await fc("active") });
await page.screenshot({ path: shot("07b-forcedcolors-active.png"), clip: { x: 0, y: 600, width: 320, height: 300 } });
await page.emulateMedia({ forcedColors: "none" });

// ── D-7 · the mobile collapse trap (BLOCKER) ───────────────────────────────
await page.setViewportSize({ width: 390, height: 844 });
await boot();
await page.screenshot({ path: shot("08a-mobile-390-collapsed.png") });
await expand();
await page.screenshot({ path: shot("08b-mobile-390-expanded.png") });
const hit = await page.evaluate(() => { const h = document.querySelector(".debug-header"); const r = h.getBoundingClientRect();
    const cr = document.querySelector(".pane-wrapper--left").getBoundingClientRect();
    const ix = Math.max(0, Math.min(cr.right, r.right) - Math.max(cr.left, r.left));
    const iy = Math.max(0, Math.min(cr.bottom, r.bottom) - Math.max(cr.top, r.top));
    return { centre: [r.x + r.width / 2, r.y + r.height / 2],
             headerOccludedPct: +(100 * (ix * iy) / (r.width * r.height)).toFixed(1),
             topmost: document.elementsFromPoint(r.x + r.width / 2, r.y + r.height / 2).slice(0, 3)
                 .map((e) => e.tagName + "." + (e.className || "").toString().trim().split(/\s+/).slice(0, 2).join(".")) }; });
await page.mouse.click(hit.centre[0], hit.centre[1]); await page.waitForTimeout(500);
let trial; try { await page.locator(".debug-header").click({ timeout: 5000, trial: true }); trial = "ACTIONABLE"; }
catch (e) { trial = String(e).split("\n")[0]; }
log("D-7.mobileCollapseTrap", { ...hit, playwrightActionability: trial,
    stillExpanded: await page.evaluate(() => document.querySelector(".debug-header").getAttribute("aria-expanded")),
    collapsedPillBottomGapPx: await page.evaluate(() => { const o = document.querySelector(".debug-overlay");
        return { computedBottom: getComputedStyle(o).bottom, usesEnvSafeArea: false }; }) });
await page.screenshot({ path: shot("09-mobile-collapse-trap.png") });

// ── D-8 · the substring gate (MAJOR) ───────────────────────────────────────
const gate = {};
for (const [label, url] of [["debug=1", "/?debug=1"], ["nodebug=1", "/?nodebug=1"], ["xdebug=1", "/?xdebug=1"],
                            ["q=notdebug=1x", "/?q=notdebug=1x"], ["hash ref=mydebug=1", "/#/palettes?ref=mydebug=1"],
                            ["debug=0 (control)", "/?debug=0"], ["plain (control)", "/"]]) {
    await page.goto(DEV + url, { timeout: 90_000 }); await page.waitForTimeout(2500);
    gate[label] = await page.evaluate(() => ({ href: location.href, overlayRendered: !!document.querySelector(".debug-overlay") }));
}
log("D-8.substringGate", gate);

// ── D-9 · ships to production (MAJOR) ──────────────────────────────────────
await page.setViewportSize({ width: 1440, height: 900 });
try {
    await page.goto(`${PROD}/?nodebug=1`, { timeout: 40_000 }); await page.waitForTimeout(4500);
    const prod = await page.evaluate(() => ({ href: location.href, overlayRendered: !!document.querySelector(".debug-overlay"),
        zDebugToken: getComputedStyle(document.documentElement).getPropertyValue("--z-debug").trim() || "(UNDEFINED)",
        overlayComputedZ: document.querySelector(".debug-overlay") ? getComputedStyle(document.querySelector(".debug-overlay")).zIndex : null }));
    if (prod.overlayRendered) { await page.locator(".debug-header").click(); await page.waitForTimeout(500);
        await page.screenshot({ path: shot("03-PROD-color.babb.dev-expanded.png"), clip: { x: 0, y: 700, width: 420, height: 200 } }); }
    log("D-9.production", prod);
} catch (e) { log("D-9.production", { error: String(e).slice(0, 200) }); }

// ── D-10 · false-success copy (MAJOR) ──────────────────────────────────────
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx2.newPage();
p2.setDefaultTimeout(90_000); p2.setDefaultNavigationTimeout(90_000);
await p2.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        writeText: () => Promise.reject(new DOMException("Document is not focused.", "NotAllowedError")) } });
    window.__exec = []; document.execCommand = (c) => { window.__exec.push(c); return false; };
});
await p2.goto(`${DEV}/?debug=1`, { timeout: 90_000 }); await p2.waitForTimeout(3200);
await p2.locator(".debug-header").click(); await p2.waitForTimeout(300);
await p2.locator(".debug-btn-copy").click(); await p2.waitForTimeout(250);
log("D-10.falseSuccessCopy", await p2.evaluate(() => ({
    execCommandCalls: window.__exec, execCommandReturned: false,
    uiClaims: document.querySelector(".debug-copied")?.textContent ?? "(nothing shown)",
    anyErrorSurface: !!document.querySelector(".debug-overlay [role=alert], .debug-overlay [class*=error]") })));

// ── D-11 · design-system boundary ──────────────────────────────────────────
log("D-11.boundary", await p2.evaluate(() => {
    const rules = [];
    for (const s of document.styleSheets) { try { for (const r of s.cssRules)
        if (r.selectorText && /\.debug-/.test(r.selectorText) && /data-v-/.test(r.cssText)) rules.push(r.cssText); } catch {} }
    const all = rules.join("\n");
    return { componentRules: rules.length,
        rawColorLiterals: [...new Set(all.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g) || [])],
        tokenRefs: [...new Set(all.match(/var\(--[a-z0-9-]+/g) || [])],
        fontMonoToken: getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim(),
        overlayFontFamily: getComputedStyle(document.querySelector(".debug-overlay")).fontFamily,
        glassSurfaceClass: document.querySelector(".debug-overlay").className };
}));

await browser.close();
console.log("\n=== probe complete ===");
