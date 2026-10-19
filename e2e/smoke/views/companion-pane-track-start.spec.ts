// SERVED MODEL: claude-opus-5[1m]
import { test, expect, type Page } from "@playwright/test";
import { regionSettled } from "../fixtures/settle";

/**
 * X.W6.g · gate **g2** — COMPANION PANES SHARE ONE TRACK START (CC-062 · MT-F035).
 *
 *   npx playwright test e2e/smoke/views/companion-pane-track-start.spec.ts \
 *     --project=smoke -g "companion panes share one track start"
 *
 * RED at open (`W6.md:277`): *"About's top edge sits visibly higher than the
 * Picker card's (`OM-9-picker-about-height-misaligned.png` sha256
 * `a57a57eb…9e6b7ca6`); Mix's is aligned (`OM-10-…-CONTROL.png` sha256
 * `47e115e9…3573c3`) — the defect/control pair proves it is a per-pane
 * deviation, not a grid property."* The gate command measured **0 hits** at
 * every check of this wave: no arm existed.
 *
 * WHY THE CONTROL IS INSIDE THE SAME TEST, not beside it. `W6.md:279`: *"g2
 * fails if the cure moves the Mix control (a per-pane nudge passes the About
 * assertion and breaks the control; the gate asserts both)."* A nudge on the
 * PICKER — the one pane both scenes share — is the cheap way to make About
 * line up, and it silently drags Mix out of line. Split across two tests, a
 * seat can read one green and ship. Split across two assertions of ONE test,
 * it cannot.
 *
 * WHAT IS ASSERTED — the SHARED ROW CONTRACT, not a pair of coordinates:
 *   (1) the two region wrappers begin at the SAME grid track start;
 *   (2) each pane's own outermost box begins AT that track start — it is not
 *       offset into the track by a margin, a centring rule or a nudge;
 *   (3) the same two facts hold for the Picker↔Mix scene, unchanged.
 * (2) is what makes the gate structural: two panes can share a track start and
 * still be misaligned if one of them floats inside its own track, and that is
 * exactly the shape OM-9 records.
 *
 * SCOPE — the regions are addressed by their ROLE and accessible name
 * (`role="region"` + the view schema's own label), never by a physical
 * side class: which side a region lands on is not a fact the schema states.
 */

/** 1px, the tolerance `W6.md:277` names. */
const EPS = 1;

interface TrackRow {
    label: string;
    /** the pane element actually measured, named in every failure message */
    pane: string;
    /** the grid track start: the region wrapper's content-box top */
    trackStart: number;
    /** the pane's own outermost box top */
    paneTop: number;
    /** true while the pane element's own transition/animation is still running */
    moving: boolean;
}

/**
 * SETTLED readings only, and settled means the ELEMENT SAYS SO. The scene opens
 * on the orchestrated overture — the plate lands on a spring and the slot's
 * `vj-enter` travel runs — so a reading taken before the travel ends measures a
 * transform in flight, not a track start. Measured while authoring this gate:
 * at 1.5 s the Picker shell carried `translateY(-12px)` and read 14.66px ABOVE
 * its own track; at 4 s the transform was `none` and the offset was 0. A
 * two-readings-agree settle is NOT enough — a spring's tail is flat enough that
 * two samples 250 ms apart agreed on a moving element and published the
 * mid-flight number as a defect. So the pane is asked directly whether any of
 * its OWN animations is still running, and only a still element is read.
 */
async function readRow(page: Page, label: string): Promise<TrackRow> {
    let previous: TrackRow | null = null;
    for (let attempt = 0; attempt < 40; attempt++) {
        const now = await readRowOnce(page, label);
        if (
            !now.moving &&
            previous &&
            !previous.moving &&
            Math.abs(previous.trackStart - now.trackStart) < 0.5 &&
            Math.abs(previous.paneTop - now.paneTop) < 0.5
        )
            return now;
        previous = now;
        await page.waitForTimeout(250);
    }
    throw new Error(`the ${label} pane never settled`);
}

async function readRowOnce(page: Page, label: string): Promise<TrackRow> {
    const region = page.getByRole("region", { name: label, exact: true });
    await expect(region, `the ${label} region is mounted`).toBeVisible();
    // X.W6.s (§0ba): `moving` below sees only a STARTED transition. A pane
    // parked in its `vj-enter-enter-from` pose (the SwiftShader first-context
    // frame gap) has no Animation yet and read 6.50 px off its track; the
    // shared settle also waits out the pre-start transition class.
    await regionSettled(region);
    return region.evaluate((el, name) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const pane = el.firstElementChild;
        if (!pane) throw new Error(`${name} region renders no pane`);
        return {
            label: name,
            pane: `${pane.tagName.toLowerCase()}.${(pane.getAttribute("class") ?? "")
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .join(".")}`,
            trackStart:
                r.top +
                Number.parseFloat(cs.borderTopWidth) +
                Number.parseFloat(cs.paddingTop),
            paneTop: pane.getBoundingClientRect().top,
            // The element's OWN animations only (not the subtree's): the
            // atmosphere and the dock lamp loop forever and are not this
            // pane's arrival.
            moving: pane.getAnimations().some((a) => a.playState === "running"),
        };
    }, label);
}

test.describe("X.W6.g · g2 — the shared row contract", () => {
    test("companion panes share one track start", async ({ page }) => {
        // ── the marked scene: Picker ↔ About (OM-9) ──────────────────────
        await page.goto("/#/");
        const picker = await readRow(page, "Picker");
        const about = await readRow(page, "About");

        expect(
            Math.abs(picker.trackStart - about.trackStart),
            `Picker and About begin at one grid track start ` +
                `(${picker.trackStart} vs ${about.trackStart})`,
        ).toBeLessThanOrEqual(EPS);
        expect(
            Math.abs(picker.paneTop - picker.trackStart),
            `the Picker pane (${picker.pane}) sits ON its track start, not ` +
                `offset into it (pane ${picker.paneTop} vs track ${picker.trackStart})`,
        ).toBeLessThanOrEqual(EPS);
        expect(
            Math.abs(about.paneTop - about.trackStart),
            `the About pane (${about.pane}) sits ON its track start, not ` +
                `offset into it (pane ${about.paneTop} vs track ${about.trackStart})`,
        ).toBeLessThanOrEqual(EPS);
        expect(
            Math.abs(picker.paneTop - about.paneTop),
            `Picker↔About top edges within ${EPS}px ` +
                `(${picker.paneTop} vs ${about.paneTop}) — the OM-9 mark`,
        ).toBeLessThanOrEqual(EPS);

        // ── THE CONTROL, in the same test: Picker ↔ Mix (OM-10) ──────────
        // The Picker is the pane both scenes share. A per-pane nudge that
        // buys the assertion above spends this one.
        await page.goto("/#/mix");
        const pickerOnMix = await readRow(page, "Picker");
        const mix = await readRow(page, "Mix");

        expect(
            Math.abs(pickerOnMix.trackStart - mix.trackStart),
            `CONTROL: Picker and Mix begin at one grid track start ` +
                `(${pickerOnMix.trackStart} vs ${mix.trackStart})`,
        ).toBeLessThanOrEqual(EPS);
        expect(
            Math.abs(pickerOnMix.paneTop - mix.paneTop),
            `CONTROL (OM-10): Picker↔Mix top edges unchanged, within ${EPS}px ` +
                `(${pickerOnMix.paneTop} vs ${mix.paneTop})`,
        ).toBeLessThanOrEqual(EPS);
        expect(
            Math.abs(pickerOnMix.paneTop - pickerOnMix.trackStart),
            `CONTROL: the Picker pane (${pickerOnMix.pane}) sits ON its track ` +
                `start on the Mix scene too (pane ${pickerOnMix.paneTop} vs ` +
                `track ${pickerOnMix.trackStart})`,
        ).toBeLessThanOrEqual(EPS);
    });
});
