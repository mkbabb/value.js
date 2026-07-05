#!/usr/bin/env node
// π visual-runtime capture — S.W4 static-shot lane (w4-before now; w4-after
// at wave close). Sibling to `pi-motion.mjs` (S.W3's motion archive) under
// this SAME `docs/tranches/S/audit/pi/` standing root — the R.W3/R.W4
// per-wave `{baseline,close}` layout, generalized to `w{N}-{before,after}`.
// Covers the §6.1 matrix states THIS wave owns: the About-vs-picker
// ColorSpaceSelector parity pair (both hosts, side by side on desktop; both
// mobile tab states on mobile), the slider thumbs at rest vs :hover (forced),
// the picker card full plate, the docs/About page (code blocks + math,
// scrolled to the Detailed Guide), and the Lab-space readout at 1440 (the
// one-line gate row's "before"). 3 viewports × light/dark.
//
// Usage: node pi-capture.mjs <baseURL> <outDir>
//   node docs/tranches/S/audit/pi/pi-capture.mjs http://localhost:PORT \
//     docs/tranches/S/audit/pi/w4-before   # (or w4-after at close)
// Binary hygiene (the R/S convention): the PNGs self-ignore under the repo's
// blanket `.gitignore:19 *.png` — only this harness + manifest.json commit;
// frames are reproducible on demand by re-running this script.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:4300";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-capture.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "mobile-390x844", width: 390, height: 844, mobile: true },
    { name: "laptop-1024x768", width: 1024, height: 768, mobile: false },
    { name: "wide-1440x900", width: 1440, height: 900, mobile: false },
];
const SCHEMES = ["light", "dark"];

async function clickMobileTab(page, label) {
    // Mobile-only: the PaneSegmentedControl "Picker"/"About" tab (Dock.vue's
    // mobile pane toggle — Ae-5). A `page.goto()` to the SAME hash URL as the
    // page is already on does NOT remount the SPA (Chromium treats it as a
    // same-document no-op), so `mobilePaneIndex` carries over from whatever
    // the previous shot left it at — every shot that needs a specific mobile
    // host must explicitly select its tab, never assume a fresh default.
    const tab = page.locator("button.segmented-tab", { hasText: label });
    if (await tab.count()) {
        await tab.click();
        await page.waitForTimeout(500);
    }
}

async function scrollToGuide(page) {
    // Scrolls the About card's "Detailed Guide" heading into view so the
    // KaTeX math + highlighted code blocks are on-screen; settles fonts +
    // highlight.js + KaTeX render.
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const heading = [...(card?.querySelectorAll("h2") ?? [])].find(
            (h) => h.textContent?.includes("Detailed Guide"),
        );
        heading?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    await page.waitForTimeout(900); // katex + highlight settle
}

async function hoverFirstSliderThumb(page) {
    const thumb = page.locator(".slider-thumb").first();
    await thumb.waitFor({ state: "visible", timeout: 10000 });
    await thumb.hover({ force: true });
    await page.waitForTimeout(300);
}

async function selectColorSpaceViaUI(page, label) {
    // Drives the REAL ColorSpaceSelector dropdown (never a URL `?space=`
    // query — the hash-router's catch-all redirect (`/picker` has no static
    // route; it falls through `/:pathMatch(.*)*` → redirect `/`) resolves
    // ASYNCHRONOUSLY, so `route.query` is empty at useColorUrl's synchronous
    // first read and the space/color querystring approach is racy). Either
    // host's trigger updates the ONE shared model (S-1 parity).
    const trigger = page.locator(".space-trigger").first();
    await trigger.click();
    await page.waitForTimeout(400);
    const option = page
        .locator('[role="option"]')
        .filter({ has: page.getByText(label, { exact: true }) })
        .first();
    await option.click();
    await page.waitForTimeout(500);
    // Blur (click a neutral point) so the state reads as REST, not
    // mid-interaction with a lingering focus ring.
    await page.mouse.click(2, 2);
    await page.waitForTimeout(200);
}

// Each shot declares which viewport NAMEs it applies to; `run` receives the
// live page (already navigated to `url`) + the viewport descriptor and does
// any state prep before the harness screenshots it. `element` (optional) is
// a CSS selector for a tight element-scoped screenshot instead of the full
// viewport frame.
const SHOTS = [
    {
        id: "selector-parity",
        // The parity pair rendered literally side by side (desktop dual-pane
        // grid: left=picker, right=about) — the §6.1 "About-vs-picker
        // selector side-by-side" state, both hosts in ONE frame.
        url: "/#/picker",
        viewports: ["laptop-1024x768", "wide-1440x900"],
        async run() {},
    },
    {
        id: "selector-picker",
        // Mobile has no side-by-side — the parity pair is captured as two
        // named mobile-tab states instead (picker host, then about host).
        url: "/#/picker",
        viewports: ["mobile-390x844"],
        async run(page, vp) {
            if (vp.mobile) await clickMobileTab(page, "Picker");
        },
    },
    {
        id: "selector-about",
        url: "/#/picker",
        viewports: ["mobile-390x844"],
        async run(page, vp) {
            if (vp.mobile) await clickMobileTab(page, "About");
        },
    },
    {
        id: "slider-rest",
        url: "/#/picker",
        viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"],
        async run(page, vp) {
            if (vp.mobile) await clickMobileTab(page, "Picker");
        },
    },
    {
        id: "slider-hover",
        url: "/#/picker",
        viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"],
        async run(page, vp) {
            if (vp.mobile) await clickMobileTab(page, "Picker");
            await hoverFirstSliderThumb(page);
        },
    },
    {
        id: "picker-plate",
        url: "/#/picker",
        viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"],
        element: ".pane-shell",
        async run(page, vp) {
            if (vp.mobile) await clickMobileTab(page, "Picker");
        },
    },
    {
        id: "docs-about",
        url: "/#/picker",
        viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"],
        async run(page, vp) {
            if (vp.mobile) await clickMobileTab(page, "About");
            await selectColorSpaceViaUI(page, "Lab");
            await scrollToGuide(page);
        },
    },
    {
        id: "lab-readout",
        // The one-line gate row's BEFORE — Lab readout at 1440 only.
        url: "/#/picker",
        viewports: ["wide-1440x900"],
        async run(page) {
            await selectColorSpaceViaUI(page, "Lab");
        },
    },
];

const manifest = { capturedAt: new Date().toISOString(), base: BASE, shots: [] };
const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        const ctx = await browser.newContext({
            viewport: { width: vp.width, height: vp.height },
            colorScheme: scheme,
            deviceScaleFactor: 1,
        });
        await ctx.addInitScript((s) => {
            try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
        }, scheme);
        const page = await ctx.newPage();
        for (const shot of SHOTS) {
            if (!shot.viewports.includes(vp.name)) continue;
            // "load" not "networkidle": a concurrent sibling lane's dev
            // rebuild loop (glass-ui/keyframes build:watch) keeps firing HMR
            // updates against this same dev server, so the network never
            // truly idles — the explicit settle wait below covers paint.
            await page.goto(`${BASE}${shot.url}`, { waitUntil: "load" });
            await page.waitForTimeout(1800); // fonts + aurora + entrance settle
            await shot.run(page, vp);
            const file = `${shot.id}--${vp.name}--${scheme}.png`;
            const target = path.join(OUT, file);
            if (shot.element) {
                const el = page.locator(shot.element).first();
                await el.waitFor({ state: "visible", timeout: 5000 });
                await el.screenshot({ path: target });
            } else {
                await page.screenshot({ path: target });
            }
            manifest.shots.push({ file, shot: shot.id, viewport: vp.name, scheme });
            console.log("shot", file);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`captured ${manifest.shots.length} shots → ${OUT}`);
