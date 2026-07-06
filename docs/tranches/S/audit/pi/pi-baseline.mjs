#!/usr/bin/env node
// π BASELINE capture — S.W6 (ATMOSPHERE + HERO), the BEFORE half of the wave's
// own hard-gate row 6 ("π archives light/dark × cold/live") + the W6-4 hero-
// blob before-record. Sibling to `pi-capture.mjs` (S.W4's static matrix) and
// `pi-motion.mjs` (S.W3's per-family video+frames) under this SAME standing
// `docs/tranches/S/audit/pi/` root — extended (not forked) for W6's specific
// four-quadrant shape:
//
//   COLD  — a FRESH browser context navigated straight to a URL-hash color
//           (`?space=oklch&color=...`), frame-series + video from the moment
//           navigation commits, so the entrance the W6-1/owner-ruling clause
//           names ("no explicit dark→light/light→dark snap at load", no stale
//           default-color flash before the derived field settles) is ON
//           RECORD at fine (~40-300ms) cadence through the ~1.8s settle window
//           the standing convention already uses for fonts+aurora+entrance.
//   LIVE  — the SAME context, after a real interaction (an L-channel slider
//           scrub — the standing drag idiom from `pi-motion.mjs`), a single
//           steady-state frame once it settles.
//
// × light/dark scheme × {wide-1440x900, mobile-390x844} = 4 quadrants.
//
// Each quadrant ALSO carries the W6-4 hero-blob before-record (free — the
// picker page is already live in that exact viewport/scheme): a tight
// `.goo-blob-wrapper` "footprint" crop, a `.pane-shell` "placement" context
// shot (corner-break + overflow as they read TODAY, pre-redress), and a short
// satellite-cadence frame series (the current orbit, pre Q7/W6-4).
//
// Usage: node pi-baseline.mjs <baseURL> <outDir>
//   node docs/tranches/S/audit/pi/pi-baseline.mjs http://localhost:PORT \
//     docs/tranches/S/audit/pi/w6-before   # (or w6-after at close)
//
// Binary hygiene (the R/S convention): `.webm` videos are the durable,
// committed motion record; the PNG frame series self-ignore under the repo's
// blanket `.gitignore:19 *.png` (regenerate on demand by re-running this
// script at the same commit — `manifest.json` records exactly what each
// quadrant produced).
import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:4877";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-baseline.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "wide-1440x900", width: 1440, height: 900 },
    { name: "mobile-390x844", width: 390, height: 844 },
];
const SCHEMES = ["light", "dark"];
const TMP = path.join(OUT, "_video_tmp");

// The URL-hash cold-load color — vivid + unambiguous (nowhere near the
// `defaultColorModel` hot-pink, per SYNTHESIS's "stale hot-pink every cold
// load" finding), so any stale/default flash ahead of it settling reads
// clearly against it in the frame series.
const TARGET_SPACE = "oklch";
const TARGET_COLOR = "oklch(0.72 0.19 145)"; // vivid green
const COLD_URL = `/#/picker?space=${TARGET_SPACE}&color=${encodeURIComponent(TARGET_COLOR)}`;

// Cadence sampled at absolute times from the navigation commit (the standing
// R/S convention — not wall-clock-of-screenshot), fine-grained through the
// entrance then out to the settle window pi-capture.mjs/pi-motion.mjs both use.
const COLD_CADENCE_MS = [0, 16, 33, 50, 80, 120, 180, 260, 380, 550, 800, 1200, 1800];
// Satellite-orbit sampling — coarse, just enough to place the CURRENT orbit on
// record (this is a before/after diff target for W6-4/Q7, not a motion study).
const BLOB_CADENCE_MS = [0, 500, 1000, 1500, 2000];

const manifest = {
    capturedAt: new Date().toISOString(),
    base: BASE,
    coldUrl: COLD_URL,
    targetColor: TARGET_COLOR,
    viewports: VIEWPORTS,
    schemes: SCHEMES,
    quadrants: [],
};
const browser = await chromium.launch();

async function newCtx(vp, scheme) {
    const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
        deviceScaleFactor: 1,
        recordVideo: { dir: TMP, size: { width: vp.width, height: vp.height } },
    });
    await ctx.addInitScript((s) => {
        try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
    }, scheme);
    return ctx;
}

for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        const key = `${vp.name}--${scheme}`;
        const coldDir = path.join(OUT, "cold", key);
        mkdirSync(coldDir, { recursive: true });
        const ctx = await newCtx(vp, scheme);
        const page = await ctx.newPage();
        const rec = {
            key, viewport: vp.name, scheme,
            cold: [], live: null,
            blob: { footprint: null, placement: null, frames: [] },
            status: "ok", note: "",
        };

        try {
            // ---- COLD: fresh context, first painted frames at a URL-hash color ----
            const t0 = Date.now();
            await page.goto(`${BASE}${COLD_URL}`, { waitUntil: "commit" });
            for (const t of COLD_CADENCE_MS) {
                const wait = t0 + t - Date.now();
                if (wait > 0) await page.waitForTimeout(wait);
                const file = `frame-t${String(t).padStart(4, "0")}.png`;
                await page.screenshot({ path: path.join(coldDir, file) });
                rec.cold.push(file);
            }
            await page.waitForTimeout(500); // full settle before the live interaction

            // ---- LIVE: steady state after a real interaction (L-channel scrub) ----
            const slider = page.getByRole("slider", { name: "L channel" }).first();
            await slider.waitFor({ state: "visible", timeout: 8000 });
            const box = await slider.boundingBox();
            if (box) {
                const y = box.y + box.height / 2;
                await page.mouse.move(box.x + box.width * 0.1, y);
                await page.mouse.down();
                await page.mouse.move(box.x + box.width * 0.85, y, { steps: 8 });
                await page.mouse.up();
            }
            await page.waitForTimeout(700); // steady-state settle
            const liveDir = path.join(OUT, "live");
            mkdirSync(liveDir, { recursive: true });
            const liveFile = `${key}.png`;
            await page.screenshot({ path: path.join(liveDir, liveFile) });
            rec.live = `live/${liveFile}`;

            // ---- BLOB (W6-4 before): footprint + placement + satellite cadence ----
            const blobDir = path.join(OUT, "blob", key);
            mkdirSync(blobDir, { recursive: true });
            const wrapper = page.locator(".goo-blob-wrapper").first();
            await wrapper.waitFor({ state: "visible", timeout: 8000 });
            const footFile = "footprint.png";
            await wrapper.screenshot({ path: path.join(blobDir, footFile) });
            rec.blob.footprint = `blob/${key}/${footFile}`;
            const placeFile = "placement.png";
            const shell = page.locator(".pane-shell").first();
            const placeTarget = (await shell.count()) ? shell : page;
            await placeTarget.screenshot({ path: path.join(blobDir, placeFile) });
            rec.blob.placement = `blob/${key}/${placeFile}`;
            const tb0 = Date.now();
            for (const t of BLOB_CADENCE_MS) {
                const wait = tb0 + t - Date.now();
                if (wait > 0) await page.waitForTimeout(wait);
                const file = `satellite-t${String(t).padStart(4, "0")}.png`;
                await wrapper.screenshot({ path: path.join(blobDir, file) });
                rec.blob.frames.push(`blob/${key}/${file}`);
            }
        } catch (e) {
            rec.status = "partial";
            rec.note = String((e && e.message) || e);
            try {
                await page.screenshot({ path: path.join(coldDir, "error-state.png") });
            } catch {}
            console.error(`[${key}] ${rec.status}: ${rec.note}`);
        }

        await page.close();
        const vpath = await page.video().path();
        const videoFile = `${key}.webm`;
        copyFileSync(vpath, path.join(coldDir, videoFile));
        rec.video = `cold/${key}/${videoFile}`;
        await ctx.close();
        manifest.quadrants.push(rec);
        console.log(
            `[${key}] ${rec.status} — ${rec.cold.length} cold frames, ` +
            `live=${rec.live ? "yes" : "no"}, blob=${rec.blob.frames.length} frames`,
        );
    }
}

await browser.close();
try { rmSync(TMP, { recursive: true, force: true }); } catch {}
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\ncaptured ${manifest.quadrants.length} quadrants → ${OUT}`);
for (const q of manifest.quadrants) {
    console.log(`  ${q.key}: ${q.status}${q.note ? " — " + q.note : ""}`);
}
