#!/usr/bin/env node
// π lane capture — S.W5 Lane C (GRADIENT correctness + visual + aliasing).
// Sibling to `pi-capture.mjs` (S.W4) / `pi-baseline.mjs` (S.W6) under the SAME
// standing `docs/tranches/S/audit/pi/` root — the `w{N}-{before,after}` layout,
// specialized to the gradient page states this lane owns (W5-8/-9/-10/-11 +
// its W5-7 rows):
//
//   gradient-top        — the page plate: hero surface + editing rail +
//                         Interpolation grid (W5-8 plate + W5-7 subtitle rows)
//   gradient-easing     — the easing accordion, first row open (W5-9 ramp strip)
//   gradient-stop-sel   — a stop handle selected (W5-11 stop-editor rework:
//                         remove affordance, end-handle geometry, z-tier)
//   gradient-editor-bad — garbage typed into the code editor ("notacolor ???")
//                         after the debounce window (W5-11 atomic apply +
//                         explicit failure surface; BEFORE = the silent state)
//   gradient-radial-bad — `radial-gradient(circle at 30% 30%, …)` typed
//                         (W5-11 model-or-reject; BEFORE = silent drop)
//   picker-corner       — tight crop of the picker card's bottom-right corner
//                         (W5-10 forensics rider: the cartoon-stamp arc AA)
//
// The manifest ALSO records the measured card-geometry fractions (picker card
// bounding y/h) per viewport/scheme — the W5-10 integer-snap's quantitative
// before/after.
//
// One interaction video (wide-1440 light): stop drag → easing row toggle →
// editor typing — the lane's motion record (.webm commits; PNGs self-ignore
// under .gitignore's blanket *.png, the standing binary-hygiene convention).
//
// Usage: node docs/tranches/S/audit/pi/pi-w5c.mjs <baseURL> <outDir>
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:4188";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-w5c.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "mobile-390x844", width: 390, height: 844, mobile: true },
    { name: "laptop-1024x768", width: 1024, height: 768, mobile: false },
    { name: "wide-1440x900", width: 1440, height: 900, mobile: false },
];
const SCHEMES = ["light", "dark"];

async function gotoGradient(page) {
    await page.goto(`${BASE}/#/gradient`, { waitUntil: "load" });
    await page.waitForTimeout(1800); // fonts + aurora + entrance settle
}

async function typeIntoEditor(page, css) {
    const editor = page.locator('[contenteditable="true"]').last();
    await editor.waitFor({ state: "visible", timeout: 5000 });
    await editor.scrollIntoViewIfNeeded();
    await editor.click();
    await page.keyboard.press(process.platform === "darwin" ? "Meta+a" : "Control+a");
    await page.keyboard.type(css, { delay: 4 });
    await page.waitForTimeout(900); // past the 500ms parse debounce
}

const SHOTS = [
    {
        id: "gradient-top",
        viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"],
        async run() {},
    },
    {
        id: "gradient-easing",
        viewports: ["laptop-1024x768", "wide-1440x900"],
        async run(page) {
            const heading = page.getByRole("heading", { name: "Easing" }).last();
            await heading.scrollIntoViewIfNeeded().catch(() => {});
            await page.waitForTimeout(600);
        },
    },
    {
        id: "gradient-stop-sel",
        viewports: ["mobile-390x844", "wide-1440x900"],
        async run(page) {
            const handle = page
                .locator('[data-stop-id]')
                .last();
            await handle.click({ force: true });
            await page.waitForTimeout(400);
        },
    },
    {
        id: "gradient-editor-bad",
        viewports: ["wide-1440x900"],
        async run(page) {
            await typeIntoEditor(page, "linear-gradient(90deg, notacolor, ???)");
        },
    },
    {
        id: "gradient-radial-bad",
        viewports: ["wide-1440x900"],
        async run(page) {
            await typeIntoEditor(
                page,
                "radial-gradient(circle at 30% 30%, red, blue)",
            );
        },
    },
    {
        id: "picker-corner",
        url: "/#/picker",
        viewports: ["wide-1440x900"],
        async run() {},
        async shoot(page, target) {
            // Tight device-pixel crop around the picker card's bottom-right
            // corner — the W5-10 stamp-arc AA evidence.
            const box = await page
                .locator(".pane-container .rounded-card")
                .first()
                .boundingBox();
            if (!box) return false;
            await page.screenshot({
                path: target,
                clip: {
                    x: box.x + box.width - 72,
                    y: box.y + box.height - 48,
                    width: 120,
                    height: 96,
                },
            });
            return true;
        },
    },
];

const manifest = {
    capturedAt: new Date().toISOString(),
    base: BASE,
    shots: [],
    cardGeometry: [],
};
const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        const ctx = await browser.newContext({
            viewport: { width: vp.width, height: vp.height },
            colorScheme: scheme,
            deviceScaleFactor: 2, // the owner's Retina truth (aliasing lane caveat)
        });
        await ctx.addInitScript((s) => {
            try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
        }, scheme);
        const page = await ctx.newPage();

        // Card-geometry fractions (W5-10 snap metric) — measured on the
        // gradient page's own card.
        await gotoGradient(page);
        const geom = await page.evaluate(() => {
            const el = document.querySelector(".pane-container .rounded-card");
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { y: r.y, height: r.height, x: r.x, width: r.width };
        });
        manifest.cardGeometry.push({ viewport: vp.name, scheme, ...geom });

        for (const shot of SHOTS) {
            if (!shot.viewports.includes(vp.name)) continue;
            await page.goto(`${BASE}${shot.url ?? "/#/gradient"}`, {
                waitUntil: "load",
            });
            await page.waitForTimeout(1800);
            await shot.run(page, vp);
            const file = `${shot.id}--${vp.name}--${scheme}.png`;
            const target = path.join(OUT, file);
            if (shot.shoot) {
                if (!(await shot.shoot(page, target))) continue;
            } else {
                await page.screenshot({ path: target, fullPage: false });
            }
            manifest.shots.push({ file, shot: shot.id, viewport: vp.name, scheme });
            console.log("shot", file);
        }
        await ctx.close();
    }
}

// ── The interaction video (wide-1440 light): drag + easing + editor ──
{
    const TMP = path.join(OUT, "_video_tmp");
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 1,
        recordVideo: { dir: TMP, size: { width: 1440, height: 900 } },
    });
    await ctx.addInitScript(() => {
        try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {}
    });
    const page = await ctx.newPage();
    await gotoGradient(page);
    const handle = page.locator("[data-stop-id]").first();
    const box = await handle.boundingBox();
    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        for (let i = 1; i <= 12; i++) {
            await page.mouse.move(
                box.x + box.width / 2 + i * 18,
                box.y + box.height / 2,
                { steps: 2 },
            );
            await page.waitForTimeout(40);
        }
        await page.mouse.up();
    }
    await page.waitForTimeout(400);
    const head = page.locator(".interval-head").first();
    if (await head.count()) {
        await head.scrollIntoViewIfNeeded();
        await head.click();
        await page.waitForTimeout(700);
        await head.click();
        await page.waitForTimeout(700);
    }
    await typeIntoEditor(page, "linear-gradient(45deg, tomato, rebeccapurple)");
    await page.waitForTimeout(800);
    const video = page.video();
    await page.close();
    const vPath = await video.path();
    await ctx.close();
    copyFileSync(vPath, path.join(OUT, "gradient-interactions.webm"));
    rmSync(TMP, { recursive: true, force: true });
    manifest.video = "gradient-interactions.webm";
    console.log("video gradient-interactions.webm");
}

await browser.close();
writeFileSync(
    path.join(OUT, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`captured ${manifest.shots.length} shots → ${OUT}`);
