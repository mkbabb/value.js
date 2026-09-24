import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "../fixtures/dock";

/**
 * T.W6.5-P (T-33b) — THE READOUT↔RAIL SEAM measure (the wave's §Hard gate 3
 * row: "the blank-band measure green — reserved-vs-painted delta = designed
 * AIR, not dead band").
 *
 * The disease (research §6.1, measured on the W4-2 tree): lab's honest
 * 2-line lock reserved `min-height: 2 × 1.12em` while the live tuple inked
 * ONE line — 61px of the 122px reservation rendered as a DEAD BAND between
 * the numbers and the gradient rail (the owner's t33-audit-01 "too large of
 * a gap"; the W4-2a worst-case-as-blank disease surviving at line level).
 *
 * The cure (in-lock): the tuple BOTTOM-ANCHORS inside the locked box
 * (`align-content: flex-end`), so the reserved-minus-painted delta renders
 * ABOVE the numbers (the title band's display air) and the numbers sit
 * flush at the box bottom — against the rail below. The LOCK is untouched:
 * min-height ≡ lock × line-height (O-10b's row), the card rect never moves,
 * and a 1↔2-line crossing grows the tuple UPWARD into its own reservation —
 * nothing below the header ever shifts mid-drag.
 *
 * Three legs:
 *   (i)  lab @ one-line tuple: dead band below the figures ≈ 0; the air
 *        rides ABOVE (air ≈ reserved − painted);
 *   (ii) lab @ two-line tuple (in-domain extremes — T-33a keeps them the
 *        honest worst case): the tuple FILLS its reservation (≈ no air
 *        either side) at the SAME box geometry — growth is upward,
 *        absorption is by construction;
 *   (iii) a one-line-locked space (rgb): reserved ≡ painted (the anchor is
 *        a no-op — no air is minted where none was reserved).
 *
 * ADDENDUM 2026-09-24 (X.W12.d, OA-24 · owner frame 4 · g1): legs (i) and (ii)
 * are re-stated under the MEASURE law — the readout rung is fitted to the
 * catalog's widest worst-case tuple (lab), so lab locks ONE line and no
 * reserved air paints above or below the numbers. The bottom-anchor survives
 * as a no-op.
 */

interface SeamRow {
    boxTop: number;
    boxBottom: number;
    boxHeight: number;
    minHeightPx: number;
    lineHeightPx: number;
    lock: number;
    paintedTop: number;
    paintedBottom: number;
    deadBandBelow: number;
    airAbove: number;
}

async function measureSeam(page: Page): Promise<SeamRow> {
    const readout = page.locator(".readout").first();
    await expect(readout).toBeVisible();
    return readout.evaluate((el) => {
        const cs = getComputedStyle(el);
        const box = el.getBoundingClientRect();
        let top = Number.POSITIVE_INFINITY;
        let bottom = Number.NEGATIVE_INFINITY;
        for (const cell of el.children) {
            const r = cell.getBoundingClientRect();
            if (r.width < 1) continue;
            top = Math.min(top, r.top);
            bottom = Math.max(bottom, r.bottom);
        }
        return {
            boxTop: box.top,
            boxBottom: box.bottom,
            boxHeight: box.height,
            minHeightPx: Number.parseFloat(cs.minHeight),
            lineHeightPx: Number.parseFloat(cs.lineHeight),
            lock: Number.parseFloat(
                cs.getPropertyValue("--readout-lines") || "1",
            ),
            paintedTop: top,
            paintedBottom: bottom,
            deadBandBelow: box.bottom - bottom,
            airAbove: top - box.top,
        };
    });
}

/** Sub-line-height tolerance: baseline metrics make painted-glyph rects sit
 *  a few px inside the line box; the DISEASE was a whole reserved LINE
 *  (~61px), so half a line is the honest discriminator. */
const EPS = 8;

test.describe("T-33b — the reserved-line band is designed air, never a dead band", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("lab @ the reference color: one locked line, no reserved air either side (X.W12.d)", async ({
        page,
    }) => {
        await page.goto(
            "/#/?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"),
        );
        await expect(mainPane(page)).toBeVisible();
        const row = await measureSeam(page);

        // X.W12.d: the rung is fitted to the catalog measure, so lab is a
        // one-line space (O-10b.s row, re-asserted at the seam).
        expect(row.lock, "lab is a one-line space under the measure law").toBe(1);
        expect(
            Math.abs(row.minHeightPx - row.lock * row.lineHeightPx),
        ).toBeLessThanOrEqual(1);

        // The tuple packs ONE line here (the whole point of the case).
        const paintedLines = Math.round(
            (row.paintedBottom - row.paintedTop) / row.lineHeightPx,
        );
        expect(paintedLines, "one painted line at the reference color").toBe(1);

        // THE CURE: no band on EITHER side — the reservation that painted as
        // air above the numbers (owner frame 4, g1 RESIDUE 61.22px) is gone.
        expect(
            row.deadBandBelow,
            `dead band below the figures (${row.deadBandBelow}px) — the t33-audit-01 gap`,
        ).toBeLessThanOrEqual(EPS);
        expect(
            row.airAbove,
            `air above the figures (${row.airAbove}px) — the frame-4 dead band`,
        ).toBeLessThanOrEqual(EPS);
    });

    test("lab @ its worst-case tuple: still one line — the measure holds the widest value (X.W12.d)", async ({
        page,
    }) => {
        // In-domain worst-case extremes (T-33a keeps them honest): the measure
        // IS this tuple, so it inks exactly its one locked line.
        await page.goto(
            "/#/?space=lab&color=" + encodeURIComponent("lab(100% -125 -125)"),
        );
        await expect(mainPane(page)).toBeVisible();
        const row = await measureSeam(page);

        expect(row.lock).toBe(1);
        const paintedLines = Math.round(
            (row.paintedBottom - row.paintedTop) / row.lineHeightPx,
        );
        expect(paintedLines, "the worst-case tuple inks its locked 1 line").toBe(1);
        expect(row.deadBandBelow).toBeLessThanOrEqual(EPS);
        expect(row.airAbove).toBeLessThanOrEqual(EPS);
        // The box geometry is the SAME lock as the reference case — the card
        // never moves between the reference and the worst-case value.
        // Tolerance: real line boxes stretch a few px past the computed
        // line-height (the Fraunces baseline metrics — the same trait the
        // O-10 mobile row counts RENDERED lines instead of dividing heights);
        // the discriminator stays sub-line (the disease was a whole ~61px
        // reserved line).
        expect(
            Math.abs(row.boxHeight - row.minHeightPx),
        ).toBeLessThanOrEqual(EPS);
    });

    test("rgb @ its one-line lock: reserved ≡ painted — the anchor mints no air", async ({
        page,
    }) => {
        await page.goto(
            "/#/?space=rgb&color=" + encodeURIComponent("rgb(120 90 60)"),
        );
        await expect(mainPane(page)).toBeVisible();
        const row = await measureSeam(page);
        expect(row.lock, "rgb is a one-line space").toBe(1);
        expect(row.deadBandBelow).toBeLessThanOrEqual(EPS);
        expect(row.airAbove).toBeLessThanOrEqual(EPS);
    });
});
