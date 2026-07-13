/**
 * T.W8 · CRITIQUE PASS 7 (GRADIENT — the instrument: rail + envelope plate) —
 * the probe instrument (O-3 class; probe-only, no writes to the app tree).
 * Drives the LANE servers :8660 (dev, VITE_API_URL same-origin) / :8661
 * (built gh-pages, tree-true dist) — the owner's :9000 is never touched.
 *
 * RE-JUDGES the §0.6 T-46 "totally un-usable" verdict against the LANDED
 * W6-2/Lane-G instrument (5edd903 + ee7b1dc; the owner's t33-audit-14 shot
 * predates the round-4 merge), on four named axes:
 *   1 · rail rounding on the glass-ui slider-track register (T-46) —
 *       measured against the SAME page's glass-ui Direction slider track;
 *   2 · the envelope plate's three truth regimes + cusp-adaptive axis
 *       (solid field / ambiguous belt / netting; selection pins the slice);
 *   3 · netting/webbing visibility (T-6 intensity recalibration, W6-1 band)
 *       — numeric luma deltas sampled off the live canvas;
 *   4 · the bottom-bar length (T-21) — the rung-row span re-measured against
 *       the rail box + the cap↔handle congruence law (O-21 leg 4).
 *
 * Legs:
 *   A · DEV (:8660) 6-cell sweep — 1440×900 · 768×1024 · 390×844 × light+dark:
 *       console attest, full frames, rail geometry (radius/height/paint stack/
 *       span vs plate), glass-ui slider-track register comparison, rung-row
 *       extents + cap/handle congruence, plate material + condition label,
 *       T-24 neutrals witnesses.
 *   B · DEV @1440 light+dark — the USABILITY drive (the T-46 verdict's verb):
 *       hover ghost → click-to-add (mint color ≡ ramp color at position) →
 *       handle drag → keyboard nudge → select → remove chip → remove;
 *       direction slider drag (rail paint INVARIANT, render tile changes);
 *       type → conic (tile changes, rail stays normalized 90°);
 *       stop selection pins the plate to the single-hue slice (condition
 *       label collapses H a–b° → H n°); netting luma sampled per regime.
 *   C · BUILT (:8661) @1440 light+dark — O-21 terminal-truth pixel probe +
 *       rail paint-stack + radius on the production bundle; frames.
 *
 * PNGs land under pi/w8/gradient/ (gitignored-by-class, the standing
 * convention); this script + the log txt are the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const DEV = "http://localhost:8660";
const BUILT = "http://localhost:8661";
const OUT = "docs/tranches/T/audit/pi/w8/gradient";
mkdirSync(OUT, { recursive: true });

const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const gradientLink = (base) =>
    `${base}/#/gradient?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;

const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

const browser = await chromium.launch({ headless: false, channel: "chromium" });

const ENV_NOISE =
    /Failed to load resource|\b(429|503|504)\b|Too Many Requests|blocked by CORS policy/;
const BUILT_DESIGNED =
    /VITE_API_URL|misconfigured|DevMisconfigError|api\.color\.babb\.dev/i;

async function newPage(scheme, viewport) {
    const ctx = await browser.newContext({
        viewport,
        colorScheme: scheme,
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const errors = { raw: [], filtered: [], designed: [] };
    page.on("console", (m) => {
        if (m.type() !== "error") return;
        const t = m.text();
        errors.raw.push(t);
        if (BUILT_DESIGNED.test(t)) errors.designed.push(t);
        else if (!ENV_NOISE.test(t)) errors.filtered.push(t);
    });
    page.on("pageerror", (e) => {
        errors.raw.push(String(e));
        errors.filtered.push(String(e));
    });
    return { ctx, page, errors };
}

async function settle(page) {
    await page.waitForSelector(".glass-dock", { timeout: 20000 });
    await page.waitForTimeout(3500); // past the boot overture
}

const rail = (page) => page.getByTestId("gradient-stop-bar").last();

/** Rail + rung-row + plate + glass-ui-register geometry, one evaluate. */
async function geometry(page) {
    return page.evaluate(() => {
        const round = (n) => Math.round(n * 100) / 100;
        const box = (el) => {
            const r = el.getBoundingClientRect();
            return {
                x: round(r.x),
                y: round(r.y),
                w: round(r.width),
                h: round(r.height),
            };
        };
        const bars = document.querySelectorAll(
            '[data-testid="gradient-stop-bar"]',
        );
        const bar = bars[bars.length - 1];
        if (!bar) return { error: "no rail" };
        const cs = getComputedStyle(bar);
        const railBox = box(bar);

        // The host plate (the pane card) — the rail's visual span referent.
        const card = bar.closest(".pane-scroll-fade") ?? bar.closest("[class*='glass-']");
        // The rail's content column (its direct layout parent chain up to the
        // px-4/6 wrapper) — the honest 100%-width referent.
        const column = bar.closest(".flex.flex-col.gap-5")?.parentElement;

        // Rung row + caps + rungs + handles.
        const rungRow = document.querySelector(
            '[data-testid="gradient-rung-row"]',
        );
        const caps = [
            ...document.querySelectorAll('[data-testid="gradient-ruler-cap"]'),
        ].map((el) => {
            const b = el.getBoundingClientRect();
            return round(b.x + b.width / 2);
        });
        const rungs = [
            ...document.querySelectorAll('[data-testid="gradient-rung"]'),
        ].map((el) => {
            const b = el.getBoundingClientRect();
            return round(b.x + b.width / 2);
        });
        const handles = [...bar.querySelectorAll("[data-stop-id]")].map(
            (el) => {
                const b = el.getBoundingClientRect();
                return {
                    cx: round(b.x + b.width / 2),
                    pos: el.getAttribute("aria-label"),
                };
            },
        );

        // The glass-ui Direction slider's track — the T-46 register referent.
        const sliderRoot = document.querySelector(
            '[aria-label="Gradient direction"]',
        );
        let track = null;
        if (sliderRoot) {
            // reka-ui slider: track is the first child div with a radius.
            const cand = sliderRoot.querySelector("span[data-orientation], div");
            const el =
                [...sliderRoot.querySelectorAll("*")].find((n) => {
                    const s = getComputedStyle(n);
                    const b = n.getBoundingClientRect();
                    return (
                        b.height > 2 &&
                        b.height < 24 &&
                        b.width > 100 &&
                        parseFloat(s.borderTopLeftRadius) > 0
                    );
                }) ?? cand;
            if (el) {
                const s = getComputedStyle(el);
                track = {
                    box: box(el),
                    radius: s.borderTopLeftRadius,
                    tag: el.tagName + "." + (el.className.baseVal ?? el.className),
                };
            }
        }

        // The envelope plate + condition label.
        const plateHost = document.querySelector(
            '[aria-label^="Perceived-space plate"]',
        );
        let plate = null;
        if (plateHost) {
            const ps = getComputedStyle(plateHost);
            const label = plateHost.querySelector("span");
            plate = {
                box: box(plateHost),
                radius: ps.borderTopLeftRadius,
                bg: ps.backgroundColor,
                label: label?.textContent?.trim() ?? null,
                labelInk: label ? getComputedStyle(label).color : null,
                labelBg: label ? getComputedStyle(label).backgroundColor : null,
            };
        }

        // Render tile.
        const tile = document.querySelector(
            '[data-testid="gradient-render-tile"]',
        );

        return {
            rail: {
                box: railBox,
                radius: cs.borderTopLeftRadius,
                radiusPx: parseFloat(cs.borderTopLeftRadius),
                pillTrue:
                    parseFloat(cs.borderTopLeftRadius) >= railBox.h / 2,
                border: cs.borderTopWidth + " " + cs.borderTopStyle,
                bgImage0: cs.backgroundImage.slice(0, 60),
                bgHasChecker: cs.backgroundImage.includes(
                    "repeating-conic-gradient",
                ),
                bgRepeat: cs.backgroundRepeat,
                bgOrigin: cs.backgroundOrigin,
                bgClip: cs.backgroundClip,
                shadow: cs.boxShadow.slice(0, 60),
            },
            cardBox: card ? box(card) : null,
            columnBox: column ? box(column) : null,
            rungRow: rungRow
                ? {
                      box: box(rungRow),
                      caps,
                      rungCount: rungs.length,
                      rungMin: rungs.length ? Math.min(...rungs) : null,
                      rungMax: rungs.length ? Math.max(...rungs) : null,
                  }
                : null,
            handles,
            sliderTrack: track,
            plate,
            tileBox: tile ? box(tile) : null,
        };
    });
}

/**
 * Netting visibility (T-6 re-judge) — sample the live plate canvas in the
 * netting region (right of the terminus, upper band at the default seed) vs
 * the plate ground, as 8-bit luma. Reads the CANVAS bitmap directly (the
 * paint truth, no compositor confound).
 */
async function nettingLuma(page) {
    return page.evaluate(() => {
        const host = document.querySelector(
            '[aria-label^="Perceived-space plate"]',
        );
        const canvas = host?.querySelector("canvas");
        if (!canvas) return { error: "no canvas" };
        const g = canvas.getContext("2d");
        if (!g) return { error: "no 2d ctx (unexpected)" };
        const W = canvas.width;
        const H = canvas.height;
        // The netting band: right third, vertical middle (out-of-envelope at
        // the default seed's swept-hue plate — the C axis extends past the
        // trajectory's max C).
        const img = g.getImageData(
            Math.floor(W * 0.7),
            Math.floor(H * 0.15),
            Math.floor(W * 0.25),
            Math.floor(H * 0.5),
        ).data;
        const lumas = [];
        for (let i = 0; i < img.length; i += 4) {
            lumas.push(
                0.2126 * img[i] + 0.7152 * img[i + 1] + 0.0722 * img[i + 2],
            );
        }
        lumas.sort((a, b) => a - b);
        const q = (p) => Math.round(lumas[Math.floor(p * (lumas.length - 1))]);
        return {
            sampleBox: "canvas 70–95% x · 15–65% y (netting band)",
            p05: q(0.05),
            p50: q(0.5),
            p95: q(0.95),
            spread: q(0.95) - q(0.05),
        };
    });
}

/**
 * The O-19 metric VERBATIM (composited element screenshot, p97−p3 BT.709
 * luma over x ∈ [0.90, 0.98] · y ∈ [0.35, 0.50] — the full-netting window)
 * so the T-6 read compares directly to the ratified floors (59 L / 45 D).
 */
async function o19Netting(page) {
    const plateEl = page
        .getByRole("img", { name: /Perceived-space plate/ })
        .last();
    const shot = await plateEl.screenshot();
    return page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const g2 = c.getContext("2d");
        g2.drawImage(img, 0, 0);
        const { data } = g2.getImageData(0, 0, c.width, c.height);
        const w = c.width;
        const h = c.height;
        const lumas = [];
        for (let y = Math.round(h * 0.35); y < h * 0.5; y++) {
            for (let x = Math.round(w * 0.9); x < w * 0.98; x++) {
                const i = 4 * (y * w + x);
                lumas.push(
                    0.2126 * data[i] +
                        0.7152 * data[i + 1] +
                        0.0722 * data[i + 2],
                );
            }
        }
        lumas.sort((a, b) => a - b);
        const p = (q) =>
            lumas[Math.min(lumas.length - 1, Math.floor(q * lumas.length))];
        return Math.round((p(0.97) - p(0.03)) * 10) / 10;
    }, shot.toString("base64"));
}

// ─────────────────────────────────────────────────────────────────────────
// LEG A — DEV 6-cell sweep
// ─────────────────────────────────────────────────────────────────────────
log("═══ LEG A · DEV 6-cell sweep (rail/rung/plate geometry + console) ═══");
const CELLS = [
    ["1440", { width: 1440, height: 900 }],
    ["768", { width: 768, height: 1024 }],
    ["390", { width: 390, height: 844 }],
];
for (const scheme of ["light", "dark"]) {
    for (const [name, viewport] of CELLS) {
        const { ctx, page, errors } = await newPage(scheme, viewport);
        await page.goto(gradientLink(DEV));
        await settle(page);
        await rail(page).scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const geo = await geometry(page);
        const luma = await nettingLuma(page);
        const o19 = await o19Netting(page);
        log(`\n── dev ${name} ${scheme} ──`);
        log(JSON.stringify({ geo, luma }, null, 1));
        log(
            `O-19 composited netting p97−p3 = ${o19}/255 (ratified floor: light 59 / dark 45)`,
        );
        log(
            `console raw=${errors.raw.length} REAL=${errors.filtered.length}` +
                (errors.filtered.length
                    ? " :: " + errors.filtered.join(" | ")
                    : ""),
        );
        await page.screenshot({
            path: `${OUT}/dev-${name}-${scheme}-full.png`,
            fullPage: false,
        });
        // Instrument crop: plate + rail + rung row.
        const plateBox = geo.plate?.box;
        const rowBox = geo.rungRow?.box ?? geo.rail.box;
        if (plateBox) {
            await page.screenshot({
                path: `${OUT}/dev-${name}-${scheme}-instrument.png`,
                clip: {
                    x: Math.max(0, plateBox.x - 8),
                    y: Math.max(0, plateBox.y - 8),
                    width: Math.min(viewport.width, plateBox.w + 16),
                    height: rowBox.y + rowBox.h - plateBox.y + 24,
                },
            });
        }
        await ctx.close();
    }
}

// ─────────────────────────────────────────────────────────────────────────
// LEG B — the usability drive @1440, light + dark
// ─────────────────────────────────────────────────────────────────────────
log("\n═══ LEG B · USABILITY DRIVE (add/drag/keyboard/remove · direction/type · slice pin) ═══");
for (const scheme of ["light", "dark"]) {
    const { ctx, page, errors } = await newPage(scheme, {
        width: 1440,
        height: 900,
    });
    await page.goto(gradientLink(DEV));
    await settle(page);
    const bar = rail(page);
    await bar.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const barBox = await bar.boundingBox();
    const yMid = barBox.y + barBox.height / 2;
    const xAt = (pct) => barBox.x + 10 + (barBox.width - 20) * (pct / 100);

    // 1 · hover ghost
    await page.mouse.move(xAt(30), yMid);
    await page.waitForTimeout(200);
    const ghost = await page.evaluate(() => {
        const bars = document.querySelectorAll(
            '[data-testid="gradient-stop-bar"]',
        );
        const bar = bars[bars.length - 1];
        const g = bar?.querySelector('[aria-hidden="true"].border-dashed');
        if (!g) return null;
        const s = getComputedStyle(g);
        return {
            borderStyle: s.borderStyle,
            bg0: s.backgroundImage.slice(0, 72),
        };
    });
    log(`\n[${scheme}] hover ghost @30%: ${JSON.stringify(ghost)}`);
    await page.screenshot({
        path: `${OUT}/dev-1440-${scheme}-hover-ghost.png`,
        clip: {
            x: barBox.x - 8,
            y: barBox.y - 24,
            width: barBox.width + 16,
            height: barBox.height + 64,
        },
    });

    // 2 · click-to-add: count 2 → 3; minted color ≡ ramp color at position
    const before = await bar.locator("[data-stop-id]").count();
    await page.mouse.click(xAt(30), yMid);
    await page.waitForTimeout(300);
    const after = await bar.locator("[data-stop-id]").count();
    const minted = await page.evaluate(() => {
        const bars = document.querySelectorAll(
            '[data-testid="gradient-stop-bar"]',
        );
        const bar = bars[bars.length - 1];
        const handles = [...bar.querySelectorAll("[data-stop-id]")];
        const mid = handles.find(
            (h) =>
                !h.getAttribute("aria-label")?.match(/at (0|100)%/),
        );
        return mid
            ? {
                  label: mid.getAttribute("aria-label"),
                  bg: getComputedStyle(mid).backgroundImage.slice(0, 90),
              }
            : null;
    });
    log(
        `[${scheme}] click-to-add @30%: stops ${before}→${after}; minted=${JSON.stringify(minted)}`,
    );

    // 2b · the sweep condition label BEFORE any selection exists (add does
    // not select — the drag in step 3 is the FIRST selecting gesture, so
    // this is the last honest read of the swept-hue regime).
    const labelBefore = await page.evaluate(
        () =>
            document
                .querySelector('[aria-label^="Perceived-space plate"] span')
                ?.textContent?.trim(),
    );

    // 3 · drag the minted handle 30% → 60%
    const handle = bar.locator("[data-stop-id]").nth(1);
    const hb = await handle.boundingBox();
    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
    await page.mouse.down();
    for (let i = 1; i <= 12; i++) {
        await page.mouse.move(
            hb.x + hb.width / 2 + (xAt(60) - xAt(30)) * (i / 12),
            yMid,
            { steps: 2 },
        );
        await page.waitForTimeout(16);
    }
    await page.mouse.up();
    await page.waitForTimeout(250);
    const dragged = await handle.getAttribute("aria-label");
    log(`[${scheme}] drag 30→60: "${dragged}"`);
    await page.screenshot({
        path: `${OUT}/dev-1440-${scheme}-three-stops.png`,
        clip: {
            x: barBox.x - 8,
            y: barBox.y - 170,
            width: barBox.width + 16,
            height: barBox.height + 230,
        },
    });

    // 4 · keyboard nudge (ArrowRight ×2, Shift+ArrowRight)
    await handle.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Shift+ArrowRight");
    await page.waitForTimeout(200);
    log(
        `[${scheme}] keyboard +1+1+10: "${await handle.getAttribute("aria-label")}"`,
    );

    // 5 · selection pins the plate slice (condition label collapses)
    await handle.click();
    await page.waitForTimeout(500);
    const readLabel = () =>
        page.evaluate(
            () =>
                document
                    .querySelector('[aria-label^="Perceived-space plate"] span')
                    ?.textContent?.trim(),
        );
    const labelPinned = await readLabel();
    log(
        `[${scheme}] plate condition label: sweep="${labelBefore}" → pinned="${labelPinned}"`,
    );
    await page.screenshot({
        path: `${OUT}/dev-1440-${scheme}-slice-pinned.png`,
        fullPage: false,
    });
    const pinnedLuma = await nettingLuma(page);
    log(`[${scheme}] pinned-slice netting band: ${JSON.stringify(pinnedLuma)}`);

    // 5b · THE DESELECT QUESTION (structural read: the rail has no deselect
    // gesture — bar-click ADDS, only remove clears). Try the two candidate
    // gestures a user would reach for; log whether the plate ever un-pins.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const afterEscape = await readLabel();
    await page.mouse.click(barBox.x + barBox.width / 2, barBox.y - 120); // plate body
    await page.waitForTimeout(400);
    const afterPlateClick = await readLabel();
    const stopsAfterGestures = await bar.locator("[data-stop-id]").count();
    log(
        `[${scheme}] deselect probe: Escape→"${afterEscape}" · plate-click→"${afterPlateClick}" · stops now ${stopsAfterGestures} (a plate-click must NOT add/alter stops)`,
    );

    // 6 · remove chip appears for the selected stop; click removes
    const chip = page.locator('[aria-label="Remove selected stop"]');
    const chipVisible = await chip.isVisible();
    await chip.click();
    await page.waitForTimeout(250);
    const afterRemove = await bar.locator("[data-stop-id]").count();
    const afterRemoveLabel = await readLabel();
    log(
        `[${scheme}] remove chip visible=${chipVisible}; stops ${after}→${afterRemove}; label after remove="${afterRemoveLabel}" (remove clears selection → sweep should return)`,
    );

    // 7 · direction slider: rail paint INVARIANT, render tile CHANGES
    const railPaint0 = await bar.evaluate((el) =>
        getComputedStyle(el).backgroundImage.slice(0, 40),
    );
    const tile0 = await page.evaluate(() =>
        getComputedStyle(
            document.querySelector('[data-testid="gradient-render-tile"]'),
        ).backgroundImage.slice(0, 60),
    );
    // The aria-label lands on BOTH the glass-slider root span (354×20) and
    // the 0×0 thumb (role=slider) — take the root, and bring it into view.
    const slider = page.locator('[aria-label="Gradient direction"]').first();
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const sb = await slider.boundingBox();
    await page.mouse.move(sb.x + sb.width * 0.25, sb.y + sb.height / 2);
    await page.mouse.down();
    await page.mouse.move(sb.x + sb.width * 0.75, sb.y + sb.height / 2, {
        steps: 8,
    });
    await page.mouse.up();
    await page.waitForTimeout(300);
    const railPaint1 = await bar.evaluate((el) =>
        getComputedStyle(el).backgroundImage.slice(0, 40),
    );
    const tile1 = await page.evaluate(() =>
        getComputedStyle(
            document.querySelector('[data-testid="gradient-render-tile"]'),
        ).backgroundImage.slice(0, 60),
    );
    log(
        `[${scheme}] direction drag: rail invariant=${railPaint0 === railPaint1} · tile changed=${tile0 !== tile1}`,
    );
    log(`  rail layer-1: ${railPaint1}`);
    log(`  tile before: ${tile0}`);
    log(`  tile after:  ${tile1}`);

    // 8 · type → conic: tile re-renders, rail stays the normalized ramp
    const typeTrigger = page.locator('[aria-label="Gradient type"]').first();
    await typeTrigger.scrollIntoViewIfNeeded();
    await typeTrigger.click();
    await page.getByRole("option", { name: /Conic/ }).click();
    await page.waitForTimeout(400);
    const tileConic = await page.evaluate(() =>
        getComputedStyle(
            document.querySelector('[data-testid="gradient-render-tile"]'),
        ).backgroundImage.slice(0, 60),
    );
    const railConic = await bar.evaluate((el) =>
        getComputedStyle(el).backgroundImage.slice(0, 40),
    );
    log(
        `[${scheme}] type→conic: tile=${tileConic} · rail still 90° linear=${railConic.startsWith("linear-gradient(90deg")}`,
    );
    await page.screenshot({
        path: `${OUT}/dev-1440-${scheme}-conic-tile.png`,
        fullPage: false,
    });

    log(
        `[${scheme}] drive console raw=${errors.raw.length} REAL=${errors.filtered.length}` +
            (errors.filtered.length
                ? " :: " + errors.filtered.join(" | ")
                : ""),
    );
    await ctx.close();
}

// ─────────────────────────────────────────────────────────────────────────
// LEG C — BUILT @1440, light + dark: terminal truth + paint stack + radius
// ─────────────────────────────────────────────────────────────────────────
log("\n═══ LEG C · BUILT bundle (:8661) — terminal truth + paint stack ═══");
for (const scheme of ["light", "dark"]) {
    const { ctx, page, errors } = await newPage(scheme, {
        width: 1440,
        height: 900,
    });
    await page.goto(gradientLink(BUILT));
    await settle(page);
    const bar = rail(page);
    await bar.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const geo = await geometry(page);
    log(`\n── built 1440 ${scheme} ──`);
    log(
        JSON.stringify(
            {
                rail: geo.rail,
                rungRow: geo.rungRow,
                handles: geo.handles,
                sliderTrack: geo.sliderTrack,
                plate: geo.plate,
            },
            null,
            1,
        ),
    );

    // Terminal truth (O-21 leg 1, re-run as pixels off the screenshot) —
    // decoded IN PAGE via an own-origin canvas (the `gradient-pixels.ts`
    // idiom; no pngjs dep).
    const shot = await bar.screenshot();
    const png = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const g2 = c.getContext("2d");
        g2.drawImage(img, 0, 0);
        const d = g2.getImageData(0, 0, c.width, c.height);
        return { width: c.width, height: c.height, data: Array.from(d.data) };
    }, shot.toString("base64"));
    const mean = (x0, x1) => {
        let r = 0,
            g = 0,
            b = 0,
            n = 0;
        for (let x = x0; x < x1; x++) {
            for (
                let y = Math.floor(png.height * 0.4);
                y < Math.floor(png.height * 0.6);
                y++
            ) {
                const i = (y * png.width + x) * 4;
                r += png.data[i];
                g += png.data[i + 1];
                b += png.data[i + 2];
                n++;
            }
        }
        return [r / n, g / n, b / n].map((v) => Math.round(v));
    };
    const left = mean(3, 8);
    const right = mean(png.width - 8, png.width - 3);
    log(
        `terminal truth: left=${left} (expect green family) · right=${right} (expect blue family)`,
    );
    const luma = await nettingLuma(page);
    const o19 = await o19Netting(page);
    log(`netting band (canvas): ${JSON.stringify(luma)}`);
    log(
        `O-19 composited netting p97−p3 = ${o19}/255 (ratified floor: light 59 / dark 45)`,
    );
    log(
        `console raw=${errors.raw.length} designed=${errors.designed.length} REAL=${errors.filtered.length}`,
    );
    await page.screenshot({
        path: `${OUT}/built-1440-${scheme}-full.png`,
        fullPage: false,
    });
    await ctx.close();
}

await browser.close();
writeFileSync(
    "docs/tranches/T/audit/pi/w8/w8-pass7-probe-log.txt",
    report.join("\n") + "\n",
);
log("\nDONE — log written.");
