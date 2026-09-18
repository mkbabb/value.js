/**
 * JUROR-3 — the specimen/stage COLLISION witness for `demo/picker/ColorPicker.vue`.
 *
 * Pinned arm of π-D2. `probe-j3-gestalt-2.mjs` established that the gap between
 * the headline and the stage is 9.19px at 1440 against 70.42px above it (7.66:1).
 * This probe establishes the consequence: the spectrum thumb, centred on the
 * plate's top edge with `-translate-y-1/2`, overhangs that gap and PAINTS OVER
 * the specimen. The asymmetry is not an aesthetic complaint; it is a collision.
 *
 *   node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-collision.mjs
 *
 * Requires the dev server on :9000. Read-only.
 *
 * PINNED ROUTE    http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
 * PINNED MATRICES M1 1440x900@1 · M5 720x450@2 · M3 390x844@1
 * PINNED SELECTORS .readout · .readout-fig (last) · .spectrum-picker ·
 *                  .spectrum-dot · .channel-slider
 */
import { chromium } from "playwright";

const URL =
    "http://localhost:9000/#/?space=lab&color=lab(92%25%2088.8%2020%20%2F%2082.7%25)";

const MATRICES = [
    { label: "M1 desktop-1440", vp: { width: 1440, height: 900 }, dpr: 1 },
    { label: "M5 zoom200-720@2", vp: { width: 720, height: 450 }, dpr: 2 },
    { label: "M3 phone-390", vp: { width: 390, height: 844 }, dpr: 1 },
];

const measure = () => {
    const q = (s) => document.querySelector(s);
    const r = (e) => {
        if (!e) return null;
        const b = e.getBoundingClientRect();
        return {
            t: +b.top.toFixed(2),
            b: +b.bottom.toFixed(2),
            l: +b.left.toFixed(2),
            r: +b.right.toFixed(2),
            w: +b.width.toFixed(2),
            h: +b.height.toFixed(2),
        };
    };

    // ink extent of the readout (not its box) — the painted specimen
    const readoutEl = q(".readout");
    let inkBottom = null;
    if (readoutEl) {
        const rng = document.createRange();
        rng.selectNodeContents(readoutEl);
        const rects = [...rng.getClientRects()];
        if (rects.length) inkBottom = +Math.max(...rects.map((k) => k.bottom)).toFixed(2);
    }

    const dot = r(q(".spectrum-dot"));
    const plate = r(q(".spectrum-picker"));
    const readout = r(readoutEl);

    // does the thumb's box intrude above the stage's top edge, and into the ink?
    const overhangAbovePlate =
        dot && plate ? +(plate.t - dot.t).toFixed(2) : null;
    const intrudesIntoInk =
        dot && inkBottom !== null ? dot.t < inkBottom : null;
    const inkToPlate =
        plate && inkBottom !== null ? +(plate.t - inkBottom).toFixed(2) : null;

    return {
        readoutBox: readout,
        readoutInkBottom: inkBottom,
        stageTop: plate ? plate.t : null,
        gap_ink_to_stage: inkToPlate,
        dot,
        dotOverhangAboveStage: overhangAbovePlate,
        thumbPaintsOverSpecimen: intrudesIntoInk,
        dotTranslate: q(".spectrum-dot")
            ? getComputedStyle(q(".spectrum-dot")).transform
            : null,
        dotClassList: q(".spectrum-dot") ? q(".spectrum-dot").className : null,
    };
};

const run = async () => {
    const browser = await chromium.launch();
    const out = [];
    for (const m of MATRICES) {
        const ctx = await browser.newContext({
            viewport: m.vp,
            deviceScaleFactor: m.dpr,
        });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "load" });
        await page.waitForSelector(".readout", { timeout: 15000 });
        await page.waitForTimeout(2500); // overture settle
        out.push({ label: m.label, ...(await page.evaluate(measure)) });
        await ctx.close();
    }
    await browser.close();
    console.log(JSON.stringify(out, null, 1));
};

run();
