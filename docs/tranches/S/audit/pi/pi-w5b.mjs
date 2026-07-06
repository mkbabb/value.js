#!/usr/bin/env node
// π W5 Lane B capture — extract / mix / generate (S.W5-6 + the lane's W5-7 rows).
// Sibling to `pi-capture.mjs` (static) + `pi-motion.mjs` (motion) under the SAME
// standing `docs/tranches/S/audit/pi/` root — the per-wave `w{N}[lane]-{before,after}`
// layout (here: `w5b-before` / `w5b-after`). Extends the family idioms, never forks:
// static shots ride pi-capture's viewport×scheme matrix; the mix-convergence motion
// family rides pi-motion's fixed-cadence frame series + webm.
//
// Covers the Lane B §6.1 states:
//   extract-empty        — the undeveloped-plate state (F1 copy + F2 skeleton before)
//   extract-developed    — post-quantize plate (F7 twin-strip/dup-dot before)
//   extract-hover        — pointer over the specimen (F4 veil → edge affordance)
//   extract-eyedropper   — the sampling overlay (F13 centering)
//   generate-rest        — the whole composition (F8 hierarchy + F11 subtitles)
//   mix-empty            — the config surface (F11 subtitles, Mix verb at rest)
//   mix-selected         — 2 chips seeded (Mix verb enabled vs disabled — L6 rider)
//   mix-palettes-tab     — zero saved palettes (F3 eternal-skeleton → honest empty)
//   mix-result           — the settled plate (Q10 destination)
//   mix-motion (dark, 1280×800) — the convergence at fixed cadence + webm
//     (the W3-6 clock is the item-of-record; Lane B designs WITH it — this family
//      is the beauty-gate record, not a re-tune).
//
// Usage: node docs/tranches/S/audit/pi/pi-w5b.mjs <baseURL> <outDir>
// Serve the gh-pages bundle on a FREE port (never :9000), run from the repo root.
// Binary hygiene (the R/S convention): PNGs self-ignore (.gitignore `*.png`);
// harness + manifest + webm commit.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:4189";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-w5b.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "wide-1440x900", width: 1440, height: 900, mobile: false },
    { name: "mobile-390x844", width: 390, height: 844, mobile: true },
];
const SCHEMES = ["light", "dark"];
const manifest = { capturedAt: new Date().toISOString(), base: BASE, shots: [], motion: null };
const browser = await chromium.launch();

const settle = (page, ms = 1800) => page.waitForTimeout(ms);

// Mobile pane tab (PaneSegmentedControl) — same idiom as pi-capture's
// clickMobileTab: every mobile shot selects its pane tab explicitly.
async function clickMobileTab(page, label) {
    const tab = page.locator("button.segmented-tab", { hasText: label });
    if (await tab.count()) {
        await tab.last().click();
        await page.waitForTimeout(500);
    }
}

// A 4-field saturated specimen PNG, synthesized in-page (no binary fixture).
async function specimenPng(page) {
    const dataUrl = await page.evaluate(() => {
        const c = document.createElement("canvas");
        c.width = 240; c.height = 240;
        const g = c.getContext("2d");
        const fields = [["#d91e36", 0, 0], ["#0f7b4f", 120, 0], ["#1d4ed8", 0, 120], ["#f5b700", 120, 120]];
        for (const [css, x, y] of fields) { g.fillStyle = css; g.fillRect(x, y, 120, 120); }
        return c.toDataURL("image/png");
    });
    return Buffer.from(dataUrl.split(",")[1], "base64");
}

async function uploadSpecimen(page) {
    const buffer = await specimenPng(page);
    const inputs = page.locator('input[type="file"]');
    const n = await inputs.count();
    if (n === 0) throw new Error("no file input on extract view");
    // Two layout slots may render (mobile + desktop); feed the visible tree's
    // input — the LAST resolves the active slot in both layouts.
    await inputs.last().setInputFiles({ name: "specimen.png", mimeType: "image/png", buffer });
    // Developed = the Fira dominant readout appears (both before/after keep it).
    await page.getByText(/of the image/i).last().waitFor({ state: "visible", timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(900);
}

async function seedTwoMixColors(page) {
    const add = page.getByRole("button", { name: "Add current color to the mix" }).last();
    await add.waitFor({ state: "visible", timeout: 8000 });
    await add.click();
    await page.waitForTimeout(150);
    const slider = page.getByRole("slider", { name: "L channel" }).first();
    if (await slider.count()) {
        await slider.focus();
        for (let i = 0; i < 12; i++) await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(120);
    }
    await add.click();
    await page.waitForTimeout(200);
}

// Static shot table. Each entry: id, route, per-page driver.
const SHOTS = [
    { id: "extract-empty", route: "/#/extract", tab: "Extract", async run() {} },
    { id: "extract-developed", route: "/#/extract", tab: "Extract", async run(page) { await uploadSpecimen(page); } },
    {
        id: "extract-hover", route: "/#/extract", tab: "Extract",
        async run(page) {
            await uploadSpecimen(page);
            const zone = page.getByRole("button", { name: /sample colors|Image preview/i }).last();
            if (await zone.count()) { await zone.hover({ force: true }); await page.waitForTimeout(350); }
        },
    },
    {
        id: "extract-eyedropper", route: "/#/extract", tab: "Extract",
        async run(page) {
            await uploadSpecimen(page);
            const zone = page.getByRole("button", { name: /sample colors|Image preview/i }).last();
            if (await zone.count()) { await zone.click(); await page.waitForTimeout(900); }
        },
    },
    { id: "generate-rest", route: "/#/generate", tab: "Generate", async run() {} },
    { id: "mix-empty", route: "/#/mix", tab: "Mix", async run() {} },
    { id: "mix-selected", route: "/#/mix", tab: "Mix", async run(page) { await seedTwoMixColors(page); } },
    {
        id: "mix-palettes-tab", route: "/#/mix", tab: "Mix",
        async run(page) {
            const tab = page.locator("button.segmented-tab", { hasText: "Palettes" });
            if (await tab.count()) { await tab.last().click(); await page.waitForTimeout(400); }
        },
    },
    {
        id: "mix-result", route: "/#/mix", tab: "Mix",
        async run(page) {
            await seedTwoMixColors(page);
            await page.getByRole("button", { name: "Mix", exact: true }).last().click();
            await page.waitForTimeout(2200); // past either choreography (0.9s after / 2.9s before)
        },
    },
];

for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        for (const shot of SHOTS) {
            // Fresh context per shot: localStorage-clean (true-empty states stay
            // true) and no cross-shot view/session carry-over.
            const ctx = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                colorScheme: scheme, deviceScaleFactor: 1,
            });
            await ctx.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch {} }, scheme);
            const page = await ctx.newPage();
            const rec = { file: `${shot.id}--${vp.name}--${scheme}.png`, shot: shot.id, viewport: vp.name, scheme, status: "ok" };
            try {
                await page.goto(`${BASE}${shot.route}`, { waitUntil: "load" });
                await settle(page);
                if (vp.mobile) await clickMobileTab(page, shot.tab);
                await shot.run(page, vp);
                await page.screenshot({ path: path.join(OUT, rec.file) });
            } catch (e) {
                rec.status = "partial"; rec.note = String((e && e.message) || e);
                try { await page.screenshot({ path: path.join(OUT, rec.file) }); } catch {}
                console.error(`[${rec.file}] partial: ${rec.note}`);
            }
            manifest.shots.push(rec);
            console.log("shot", rec.file, rec.status);
            await ctx.close();
        }
    }
}

// ── Motion family: the mix convergence (dark 1280×800, pi-motion cadence). ──
{
    const dir = path.join(OUT, "mix-motion");
    mkdirSync(dir, { recursive: true });
    const TMP = path.join(dir, "_video_tmp");
    const ctx = await browser.newContext({
        viewport: { width: 1280, height: 800 }, colorScheme: "dark", deviceScaleFactor: 1,
        recordVideo: { dir: TMP, size: { width: 1280, height: 800 } },
    });
    await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "dark"); } catch {} });
    const page = await ctx.newPage();
    const frames = [];
    let n = 0;
    const shot = async (label) => {
        const file = `frame-${String(n).padStart(2, "0")}-${label}.png`;
        await page.screenshot({ path: path.join(dir, file) });
        frames.push(file); n++;
    };
    const rec = { frames, status: "ok", note: "" };
    try {
        await page.goto(`${BASE}/#/mix`, { waitUntil: "load" });
        await settle(page);
        await seedTwoMixColors(page);
        await shot("pre-run");
        const run = page.getByRole("button", { name: "Mix", exact: true }).last();
        const t0 = Date.now();
        await run.click();
        // The ≤1.2s Q10 window (+ a settle tail) at fixed absolute cadence.
        for (const t of [0, 80, 160, 260, 400, 600, 850, 1150, 1500]) {
            const wait = t0 + t - Date.now();
            if (wait > 0) await page.waitForTimeout(wait);
            await shot(`converge-t${String(t).padStart(4, "0")}`);
        }
        await page.waitForTimeout(400);
        await shot("settled");
    } catch (e) {
        rec.status = "partial"; rec.note = String((e && e.message) || e);
        console.error(`[mix-motion] partial: ${rec.note}`);
    }
    await page.close();
    const vpath = await page.video().path();
    copyFileSync(vpath, path.join(dir, "mix-motion.webm"));
    await ctx.close();
    rec.video = "mix-motion/mix-motion.webm";
    manifest.motion = rec;
    try { rmSync(TMP, { recursive: true, force: true }); } catch {}
    console.log(`[mix-motion] ${rec.status} — ${frames.length} frames + video`);
}

await browser.close();
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`captured ${manifest.shots.length} static shots + mix-motion → ${OUT}`);
