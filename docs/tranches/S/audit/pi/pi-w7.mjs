#!/usr/bin/env node
// π BASELINE capture — S.W7 (DOCK + SHELL), the BEFORE half of the wave's own
// hard-gate row 5 ("π archives light/dark × collapsed/expanded — the quadrant
// confirms the seal↔trigger chromatic handoff reads intentional") + the W7-6
// furniture before-record (@mbabb / Login / Tools) + the W6→W7-routed PRM
// defect ("the PRM dock never expands past the collapsed circle" —
// PROGRESS.md 2026-07-05). Sibling to `pi-capture.mjs` (S.W4's static-shot
// matrix) and `pi-baseline.mjs` (S.W6's 4-quadrant cold/live harness) under
// this SAME standing `docs/tranches/S/audit/pi/` root — a static-shot lane
// (no motion video: this is a STATE capture, not a motion-family capture).
//
// Quadrant matrix:
//   collapsed                — @ wide-1440x900 ONLY × {light,dark}. Collapse
//                               is UNREACHABLE <1024 (Dock.vue pins
//                               `:always-expanded="!isDesktop"`, `isDesktop` =
//                               `min-width:1024px`) — the same vacuity the
//                               wave's own hard-gate row 1 notes.
//   expanded-view-select-open — @ {wide-1440x900, mobile-390x844} ×
//                               {light,dark} (the task's "1440 and 390 (mobile
//                               posture)" clause).
//   furniture-{rest,mbabb-open} — @ wide-1440x900 ONLY × {light,dark}. The
//                               @mbabb/Login/Profile chrome is `hidden
//                               lg:flex` (ProfileSection.vue) — desktop-only.
//   prm-{mount,collapsed,stuck-after-tap} — @ wide-1440x900 ONLY ×
//                               {light,dark}, `reducedMotion: "reduce"`. Live-
//                               probed before authoring this harness (repo
//                               root, same-commit): under PRM the dock's
//                               bounding box never reaches the ~447px expanded
//                               width even after a real tap-to-expand on the
//                               collapsed pill — it sticks near the ~44-58px
//                               collapsed-adjacent size. `manifest.json`
//                               records the measured boundingBox per shot so
//                               the defect is on record as NUMBERS, not only
//                               pixels.
//
// Usage: node pi-w7.mjs <baseURL> <outDir>
//   node docs/tranches/S/audit/pi/pi-w7.mjs http://localhost:PORT \
//     docs/tranches/S/audit/pi/w7-before   # (or w7-after at close)
// (Run from the repo root so the bare `playwright` import resolves — the R/S
// convention.)
//
// Binary hygiene (the R/S convention): PNGs self-ignore under the repo's
// blanket `.gitignore:19 *.png` — only this harness + manifest.json commit;
// frames regenerate on demand by re-running this script at the same commit.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:4933";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-w7.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const WIDE = { name: "wide-1440x900", width: 1440, height: 900 };
const MOBILE = { name: "mobile-390x844", width: 390, height: 844 };
const VIEWPORTS = [WIDE, MOBILE];
const SCHEMES = ["light", "dark"];
// Dock.vue `:collapse-delay="5000"` — the auto-collapse timer from the
// scheduled mouseleave; a margin above it so the capture never races the timer.
const COLLAPSE_WAIT_MS = 5400;

async function newCtx(browser, vp, scheme, reducedMotion) {
    const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
        deviceScaleFactor: 1,
        reducedMotion: reducedMotion ? "reduce" : "no-preference",
    });
    await ctx.addInitScript((s) => {
        try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
    }, scheme);
    return ctx;
}

/**
 * Real-user mouseleave → the dock's own auto-collapse timer. Desktop boots
 * EXPANDED (N.W5 Defect-B: `Dock.vue` `:start-collapsed="false"`), so a
 * collapsed record requires actually leaving the dock's box then waiting out
 * `collapseDelay` — there is no prop that boots it pre-collapsed.
 */
async function forceCollapse(page) {
    const dock = page.locator(".glass-dock").first();
    const box = await dock.boundingBox();
    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(150);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height + 300);
    }
    await page.waitForTimeout(COLLAPSE_WAIT_MS);
}

const manifest = { capturedAt: new Date().toISOString(), base: BASE, shots: [] };
function record(file, meta) {
    manifest.shots.push({ file, ...meta });
    console.log("shot", file, meta.boundingBox ? `box=${JSON.stringify(meta.boundingBox)}` : "");
}

const browser = await chromium.launch();

// ---- 1. collapsed (≥1024 landscape only — collapse is unreachable <1024) ----
for (const scheme of SCHEMES) {
    const ctx = await newCtx(browser, WIDE, scheme, false);
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/picker`, { waitUntil: "load" });
    await page.waitForTimeout(1800); // fonts + aurora + entrance settle
    await forceCollapse(page);
    const file = `collapsed--${WIDE.name}--${scheme}.png`;
    await page.screenshot({ path: path.join(OUT, file) });
    record(file, { state: "collapsed", viewport: WIDE.name, scheme });
    await ctx.close();
}

// ---- 2. expanded + view-select OPEN, @ both viewports ----
for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        const ctx = await newCtx(browser, vp, scheme, false);
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/picker`, { waitUntil: "load" });
        await page.waitForTimeout(1800);
        const viewSelect = page.getByRole("combobox", { name: "Select view" });
        await viewSelect.click();
        const option = page.getByRole("option", { name: "Palettes", exact: true });
        await option.waitFor({ state: "visible", timeout: 5000 });
        await page.waitForTimeout(350); // listbox open-fade settle
        const file = `expanded-view-select--${vp.name}--${scheme}.png`;
        await page.screenshot({ path: path.join(OUT, file) });
        record(file, { state: "expanded-view-select-open", viewport: vp.name, scheme });
        await ctx.close();
    }
}

// ---- 3. furniture (@mbabb / Login / Tools) — desktop-only chrome
//         (`hidden lg:flex` in ProfileSection.vue) ----
for (const scheme of SCHEMES) {
    const ctx = await newCtx(browser, WIDE, scheme, false);
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/picker`, { waitUntil: "load" });
    await page.waitForTimeout(1800);
    const dock = page.locator(".glass-dock").first();

    const restFile = `furniture-rest--${WIDE.name}--${scheme}.png`;
    await dock.screenshot({ path: path.join(OUT, restFile) });
    record(restFile, { state: "furniture-rest", viewport: WIDE.name, scheme });

    const mbabbTrigger = page.getByRole("button", { name: "@mbabb" });
    await mbabbTrigger.click();
    await page.waitForTimeout(400);
    const openFile = `furniture-mbabb-open--${WIDE.name}--${scheme}.png`;
    await page.screenshot({ path: path.join(OUT, openFile) });
    record(openFile, { state: "furniture-mbabb-open", viewport: WIDE.name, scheme });
    await ctx.close();
}

// ---- 4. PRM-emulated defect — "the PRM dock never expands past the
//         collapsed circle" (observation routed W6→W7, PROGRESS.md
//         2026-07-05) @ wide-1440x900 only (unreachable <1024, same as #1) ----
for (const scheme of SCHEMES) {
    const ctx = await newCtx(browser, WIDE, scheme, true); // reducedMotion: reduce
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/picker`, { waitUntil: "load" });
    await page.waitForTimeout(1800);
    const dock = page.locator(".glass-dock").first();

    const mountBox = await dock.boundingBox();
    const mountFile = `prm-mount--${WIDE.name}--${scheme}.png`;
    await page.screenshot({ path: path.join(OUT, mountFile) });
    record(mountFile, { state: "prm-mount", viewport: WIDE.name, scheme, boundingBox: mountBox });

    await forceCollapse(page);
    const collapsedBox = await dock.boundingBox();
    const collapsedFile = `prm-collapsed--${WIDE.name}--${scheme}.png`;
    await page.screenshot({ path: path.join(OUT, collapsedFile) });
    record(collapsedFile, { state: "prm-collapsed", viewport: WIDE.name, scheme, boundingBox: collapsedBox });

    // Real-user tap-to-expand (the `expandDock` e2e fixture idiom — a real
    // click on the collapsed pill body, no `force`).
    const collapsedPill = page.locator(".glass-dock.collapsed");
    await collapsedPill.click();
    await page.waitForTimeout(1200);
    const stuckBox = await dock.boundingBox();
    const dockClass = await dock.getAttribute("class");
    const stuckFile = `prm-stuck-after-tap--${WIDE.name}--${scheme}.png`;
    await page.screenshot({ path: path.join(OUT, stuckFile) });
    record(stuckFile, {
        state: "prm-stuck-after-tap",
        viewport: WIDE.name,
        scheme,
        boundingBox: stuckBox,
        dockClass,
        note: "defect: class reads 'expanded' but the box width stays near the collapsed size (~44-58px) — never reaches the ~447px expanded width the same tap reaches under normal motion",
    });
    await ctx.close();
}

await browser.close();
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\ncaptured ${manifest.shots.length} shots → ${OUT}`);
