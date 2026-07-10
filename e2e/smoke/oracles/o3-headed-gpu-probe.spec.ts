import { test, expect } from "@playwright/test";
import { ATMOSPHERE_TESTID } from "../fixtures/webgl-appearance";
import { detectRenderer, isSoftwareGL } from "../perf/frame-budget";
import { sampleRegion, meanRgb, srgbToOklch } from "../fixtures/frame-diff";

/**
 * T.W0 W0-5 · O-3 — HEADED REAL-GPU COLD-LOAD PROBE (LS-7; SYNTHESIS §6.1 O-3,
 * AMENDED-AT-HARDENING h-oracle-slate F-3).
 *
 * An OWNER/HEADED-ATTESTED ANNEX — NOT a CI pass/fail row. The standing e2e
 * projects force ANGLE-SwiftShader (the headless-stability requirement), under
 * which the aurora takes the CSS-placeholder path; the true shader (and the
 * order the eye judges) only runs on a real GPU. So this probe SKIPS under
 * software-GL (it would certify the placeholder, not the field) and RUNS its
 * canvas-pixel asserts only when a real GPU is present, over BOTH schemes.
 *
 *   • RUN-OWNER: the tranche owner (or an agent on a real-GPU host), headed.
 *   • CADENCE: W0 (this mint) · re-run at W2 / W7 / W8 (the aurora-cure gates).
 *   • JUDGEMENT: the ORDER (hydrate → derive → arrive) is screencast-judged by
 *     the owner; this spec asserts the machine-checkable half (post-arm the field
 *     is chromatic, both schemes), leaving the perceptual order to the eye.
 *
 * Invoke headed on a real GPU:  npx playwright test o3-headed-gpu-probe --headed
 */

const SEED = "oklch(0.66 0.16 28)";

for (const scheme of ["dark", "light"] as const) {
    test(`O-3 headed real-GPU cold-load — post-arm the field is chromatic (${scheme})`, async ({
        page,
    }) => {
        test.setTimeout(30_000);
        // Returning-user precondition + fixed scheme (the natural restore path).
        await page.addInitScript((s) => {
            localStorage.setItem("vueuse-color-scheme", s as string);
        }, scheme);

        await page.goto("/#/?space=oklch&color=" + encodeURIComponent(SEED));
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();

        const renderer = await detectRenderer(page);
        test.skip(
            isSoftwareGL(renderer),
            `O-3 is a headed real-GPU annex — software-GL renderer '${renderer}' would certify the CSS placeholder, not the live aurora (SYNTHESIS §6.1 O-3; run headed on a real GPU)`,
        );

        const canvas = page.getByTestId(ATMOSPHERE_TESTID);
        await expect(canvas).toBeAttached();
        await page.waitForTimeout(2500); // post-arm settle

        const img = await sampleRegion(page, canvas);
        const [r, g, b] = meanRgb(img);
        const { L, C, h } = srgbToOklch(r, g, b);
        console.log(
            `[O-3 ${scheme}] real-GPU renderer=${renderer} → OKLCh L=${L.toFixed(3)} C=${C.toFixed(3)} h=${h.toFixed(1)}°`,
        );
        expect(
            C,
            `post-arm ${scheme} field is achromatic (C=${C.toFixed(3)})`,
        ).toBeGreaterThanOrEqual(0.03);
    });
}
