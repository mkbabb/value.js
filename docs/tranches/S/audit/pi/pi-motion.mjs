#!/usr/bin/env node
// π BEFORE motion capture — S.W3 (the paired archive: drag · view-switch · mix).
// Standing R-era π convention (docs/tranches/R/.../pi-capture.mjs) extended from
// static shots to MOTION: per-family video (webm) + a fixed-cadence frame series
// so the AFTER (post W3-4/W3-5/W3-6 retunes) compares frame-by-frame.
// Measured on the BUILT gh-pages bundle served on a FREE port (never :9000).
// Run from the repo root so the bare `playwright` specifier resolves (the
// standing R-era convention — docs/tranches/R/.../pi-capture.mjs). Node's ESM
// loader exposes `chromium` as a named export off the CJS package via
// cjs-module-lexer when resolved through the package.json (bare specifier).
import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:4185";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-motion.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VP = { width: 1280, height: 800 };
const SCHEME = "dark"; // the demo's signature surface — the aurora/blob motion reads here
const TMP = path.join(OUT, "_video_tmp");
const manifest = { capturedAt: new Date().toISOString(), base: BASE, viewport: VP, scheme: SCHEME, families: [] };
const browser = await chromium.launch();

async function newCtx() {
    const ctx = await browser.newContext({
        viewport: VP, colorScheme: SCHEME, deviceScaleFactor: 1,
        recordVideo: { dir: TMP, size: VP },
    });
    await ctx.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch {} }, SCHEME);
    return ctx;
}

// Settle a freshly-navigated page (fonts + aurora + entrance spring).
async function settle(page, ms = 1800) { await page.waitForTimeout(ms); }

// Run one family: capture frames at the given cadence while `drive` progresses.
async function family(name, driver) {
    const dir = path.join(OUT, name);
    mkdirSync(dir, { recursive: true });
    const ctx = await newCtx();
    const page = await ctx.newPage();
    const frames = [];
    let n = 0;
    const shot = async (label) => {
        const file = `frame-${String(n).padStart(2, "0")}-${label}.png`;
        await page.screenshot({ path: path.join(dir, file) });
        frames.push(file); n++;
    };
    const rec = { name, frames, status: "ok", note: "" };
    try {
        await driver(page, shot);
    } catch (e) {
        rec.status = "partial"; rec.note = String(e && e.message || e);
        try { await shot("error-state"); } catch {}
        console.error(`[${name}] ${rec.status}: ${rec.note}`);
    }
    await page.close();
    const vpath = await page.video().path();
    copyFileSync(vpath, path.join(dir, `${name}.webm`));
    await ctx.close();
    rec.video = `${name}/${name}.webm`;
    manifest.families.push(rec);
    console.log(`[${name}] ${rec.status} — ${frames.length} frames + video`);
}

// Ensure the dock is expanded (real-user idiom from e2e/smoke/fixtures/dock.ts).
async function expandDock(page) {
    const pill = page.locator(".glass-dock.collapsed");
    if (await pill.count()) {
        await pill.click();
        await page.locator(".glass-dock[data-morphing]").first().waitFor({ state: "detached", timeout: 5000 }).catch(() => {});
    }
}

// ── Family 1: DRAG (slider scrub) — the color fan-out under a channel-slider scrub.
await family("drag", async (page, shot) => {
    await page.goto(`${BASE}/#/picker`, { waitUntil: "networkidle" });
    await settle(page);
    const slider = page.getByRole("slider", { name: "L channel" }).first();
    await slider.waitFor({ state: "visible", timeout: 8000 });
    const box = await slider.boundingBox();
    if (!box) throw new Error("L channel slider not laid out");
    const y = box.y + box.height / 2;
    const x0 = box.x + box.width * 0.08;
    const x1 = box.x + box.width * 0.92;
    await shot("rest");
    await page.mouse.move(x0, y);
    await page.mouse.down();
    await shot("grab");
    const STEPS = 10;
    for (let i = 1; i <= STEPS; i++) {
        const x = x0 + (x1 - x0) * (i / STEPS);
        await page.mouse.move(x, y, { steps: 4 });
        await page.waitForTimeout(60);
        await shot(`scrub-${String(i).padStart(2, "0")}`);
    }
    await page.mouse.up();
    await page.waitForTimeout(120);
    await shot("release");
});

// ── Family 2: VIEW-SWITCH — the pane-swap spring (Picker → Gradient, both client-side).
await family("view-switch", async (page, shot) => {
    await page.goto(`${BASE}/#/picker`, { waitUntil: "networkidle" });
    await settle(page);
    await expandDock(page);
    await shot("picker-rest");
    const viewSelect = page.getByRole("combobox", { name: "Select view" }).first();
    await viewSelect.waitFor({ state: "visible", timeout: 8000 });
    await viewSelect.click();
    await page.waitForTimeout(120);
    await shot("listbox-open");
    const opt = page.getByRole("option", { name: "Gradient", exact: true });
    await opt.waitFor({ state: "visible", timeout: 5000 });
    // sample the pane-swap spring at absolute times from the view-commit click
    const t0 = Date.now();
    await opt.click();
    for (const t of [0, 60, 120, 200, 300, 450, 650, 900]) {
        const wait = t0 + t - Date.now();
        if (wait > 0) await page.waitForTimeout(wait);
        await shot(`swap-t${String(t).padStart(3, "0")}`);
    }
    await settle(page, 400);
    await shot("gradient-rest");
});

// ── Family 3: MIX — the mix pour choreography (≤2.9s baseline, jump-cut wall clock).
await family("mix", async (page, shot) => {
    await page.goto(`${BASE}/#/mix`, { waitUntil: "networkidle" });
    await settle(page);
    await shot("mix-rest");
    // Seed ≥2 colors: `canMix` needs selectedColors.length >= 2
    // (useMixingState.ts:43). Add the current picker color, nudge the L
    // channel so the second add differs, add again → a non-trivial pour.
    const add = page.getByRole("button", { name: "Add current color to the mix" }).first();
    await add.waitFor({ state: "visible", timeout: 8000 });
    await add.click();
    await page.waitForTimeout(150);
    await shot("seed-1");
    const slider = page.getByRole("slider", { name: "L channel" }).first();
    if (await slider.count()) {
        await slider.focus();
        for (let i = 0; i < 12; i++) { await page.keyboard.press("ArrowDown"); }
        await page.waitForTimeout(120);
    }
    await add.click();
    await page.waitForTimeout(150);
    await shot("seed-2");
    // The MixPane run trigger (e2e: getByRole button "Mix", exact).
    const run = page.getByRole("button", { name: "Mix", exact: true }).first();
    await run.waitFor({ state: "visible", timeout: 8000 });
    await shot("pre-run");
    const t0 = Date.now();
    await run.click();
    // Sample across the full choreography window (baseline wall clock 2.9s).
    for (const t of [80, 160, 260, 400, 600, 850, 1150, 1500, 1900, 2400, 2900]) {
        const wait = t0 + t - Date.now();
        if (wait > 0) await page.waitForTimeout(wait);
        await shot(`pour-t${String(t).padStart(4, "0")}`);
    }
    await page.waitForTimeout(300);
    await shot("settled");
});

await browser.close();
try { rmSync(TMP, { recursive: true, force: true }); } catch {}
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const total = manifest.families.reduce((a, f) => a + f.frames.length, 0);
console.log(`\ncaptured ${manifest.families.length} families, ${total} frames + ${manifest.families.length} videos → ${OUT}`);
for (const f of manifest.families) console.log(`  ${f.name}: ${f.status} (${f.frames.length} frames)${f.note ? " — " + f.note : ""}`);
