import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView, paneSettled } from "../fixtures/dock";
import { lumaDelta, screenshotPixels } from "./gradient-pixels";

/**
 * T.W6 W6-1 · O-19 — THE NETTING LUMA-DELTA FLOOR (SYNTHESIS §6.1 O-19).
 *
 * T-6's owner recalibration ("the gradient netting should be more visible")
 * landed the R5 band re-judged on the W3 well plate: hatch ink 30% fg /
 * paper 36% bg / edge 45%/65% / 1.25px stroke (style.css `--gamut-*` +
 * `gamut-ink.ts` WEBBING in lockstep). This oracle is the DRIFT-BACK
 * protection: the hatch-line-vs-paper luma delta on the LIVE plate must
 * hold ≥59/255 (light) and ≥45/255 (dark), judged on the post-W3 gradient
 * plate AND at 390 — never a token-string proxy alone.
 *
 * Canvas leg: composited pixels (element screenshot) over a window in the
 * FULL-NETTING regime — x ∈ [0.90, 0.98] of the plate (beyond the
 * cusp-adaptive axis' cMax at every L by construction: the axis is ≥1.15×
 * the peak swept cusp, so 0.90 × axis > cMax everywhere), y ∈ [0.35, 0.50]
 * (below the condition-label chip, above the dark floor rows). p97−p3
 * rejects AA tails + the paper-grain dither.
 *
 * Computed leg: the four `--gamut-*` tokens carry the recalibrated numbers
 * + the 4.75px/6px tile geometry (the cheap tripwire that names the drifted
 * knob when the canvas leg reds).
 *
 * dpr 2 pinned: the judge surface is the owner's retina environment.
 */

test.use({ deviceScaleFactor: 2 });

// ── O-19 NETTING FEASIBILITY LEG (G-ORACLE-2 · the feasibility-leg law) ──────
// The computed-token test below (`the recalibrated register's computed tokens
// hold`) is the GUARD CONSTANT: it asserts the four `--gamut-*` tokens serialize
// 30% / 36% / 45% / 4.75px — a token-string proxy, blind to whether the netting
// actually PAINTS. THIS parametrized leg is the feasibility half: it certifies
// the netting's real referent — the hatch-vs-paper LUMA DELTA on the LIVE
// COMPOSITED plate (screenshot pixels, both schemes + 390), against the
// perceptual FLOOR. A netting that drifts invisible reds here even while the
// tokens still serialize their numbers — the S-disease's structural cure at the
// O-19 surface. (U.W-ORACLE / U-F6-oracle-half.)
const FLOORS = { light: 59, dark: 45 } as const;

async function openGradient(page: Page) {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Color tool panes" });
    const plate = main
        .getByRole("img", { name: /Perceived-space plate/ })
        .last();
    await expect(plate).toBeVisible();
    // Pixel probes judge a surface at rest — the cold-load stall-then-resume
    // enter transition otherwise screenshots the plate mid-flight (see
    // paneSettled).
    await paneSettled(page);
    return plate;
}

for (const viewport of [
    { name: "desktop", width: 1280, height: 720 },
    { name: "390", width: 390, height: 844 },
] as const) {
    for (const scheme of ["light", "dark"] as const) {
        test(`netting luma delta ≥${FLOORS[scheme]}/255 — ${viewport.name}, ${scheme}`, async ({
            page,
        }) => {
            const consoleErrors = setupEnvNoise(page);
            await page.setViewportSize({
                width: viewport.width,
                height: viewport.height,
            });
            const plate = await openGradient(page);

            await page.evaluate(
                (s) =>
                    document.documentElement.classList.toggle(
                        "dark",
                        s === "dark",
                    ),
                scheme,
            );
            await plate.scrollIntoViewIfNeeded();

            // The plate repaints on the scheme flip via its class observer
            // (rAF-coalesced) — poll the composited measurement to rest.
            await expect
                .poll(
                    async () => {
                        const png = await screenshotPixels(page, plate);
                        return lumaDelta(png, 0.9, 0.98, 0.35, 0.5);
                    },
                    { timeout: 10_000 },
                )
                .toBeGreaterThanOrEqual(FLOORS[scheme]);

            expect(consoleErrors).toEqual([]);
        });
    }
}

test("the recalibrated register's computed tokens hold (the named-knob tripwire)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    await page.goto("/");

    const tokens = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return {
            hatch: cs.getPropertyValue("--gamut-hatch"),
            hatchPaper: cs.getPropertyValue("--gamut-hatch-paper"),
            edge: cs.getPropertyValue("--gamut-edge"),
            edgePaper: cs.getPropertyValue("--gamut-edge-paper"),
        };
    });

    // The R5 band as re-judged on the W3 plate (W6-1): ink 30% / paper 36%,
    // edge 45%/65%, the 4.75px+1.25px tile.
    expect(tokens.hatch).toContain("30%");
    expect(tokens.hatch).toContain("4.75px");
    expect(tokens.hatchPaper).toContain("36%");
    expect(tokens.hatchPaper).toContain("4.75px");
    expect(tokens.edge).toContain("45%");
    expect(tokens.edgePaper).toContain("65%");

    expect(consoleErrors).toEqual([]);
});
