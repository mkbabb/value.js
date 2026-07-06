import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * S.W2 · W2-2 — the accent contrast-guard proof (P2-1).
 *
 * The audit found the live `--accent-live` token stayed the UNGUARDED near-white
 * default pick on an L≈0.97 light surface (`lab(92% …)` → OKLCH L≈0.958, only
 * 0.02 below the surface — deep inside the 0.35 min-contrast band). Root cause:
 * the guard's background-lightness was the DARK value at the audit's sample
 * moment; the math itself is sound. After W2-2 the demo carries NO norm/denorm
 * color math — `useContrastSafeColor` routes the live opaque color through the
 * library's `needsContrastAdjustment` + `safeAccentCssString`.
 *
 * Cold, fresh load (no URL color, no seeded storage → the default pick stands):
 *   - LIGHT: the guard FIRES — `--accent-live` is rewritten to a lower-lightness
 *            `oklch(…)` (measured `oklch(0.620 …)`, canvas luminance ≈ 0.24).
 *   - DARK:  the guard correctly NO-OPS — near-white already contrasts amply on
 *            the dark surface, so the raw pick passes through (measured
 *            `lab(92% …)`, canvas luminance ≈ 0.67).
 *
 * The accent is read through a 1×1 canvas so the proxy is format-agnostic (it
 * resolves `oklch()` AND `lab()` to sRGB bytes). A 0.45 threshold sits with
 * ≈0.2 margin on either side of the two measured luminances.
 */

/** Rec.709 sRGB-encoded luminance of `--accent-live`, resolved via a 1×1 canvas. */
async function accentLuminance(page: Page): Promise<number> {
    return page.evaluate(() => {
        const accent = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent-live")
            .trim();
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const ctx = cv.getContext("2d")!;
        ctx.fillStyle = "#000"; // reset so an unparseable string reads as black, not stale
        ctx.fillStyle = accent;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    });
}

const GUARD_THRESHOLD = 0.45;

test.describe("light mode — the guard FIRES on the near-white default pick", () => {
    test.use({ colorScheme: "light" });

    test("the default accent is rewritten to a lower-lightness oklch()", async ({
        page,
    }) => {
        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();

        // The guard rewrites the accent to an oklch() string (the P2-1 signature —
        // a raw near-white passthrough would keep the source `lab(…)` form)…
        await expect
            .poll(
                () =>
                    page.evaluate(() =>
                        getComputedStyle(document.documentElement)
                            .getPropertyValue("--accent-live")
                            .trim(),
                    ),
                { timeout: 8000 },
            )
            .toMatch(/^oklch\(/);

        // …and the rewrite pushes lightness OUT of the near-white band.
        expect(await accentLuminance(page)).toBeLessThan(GUARD_THRESHOLD);
    });
});

test.describe("dark mode — the guard correctly NO-OPS (near-white has ample contrast)", () => {
    test.use({ colorScheme: "dark" });

    test("the default accent stays near-white against the dark surface", async ({
        page,
    }) => {
        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();

        // Near-white on the L≈0.15 dark surface is 0.81 apart — far outside the
        // 0.35 band, so the guard leaves the pick untouched (high luminance).
        await expect
            .poll(() => accentLuminance(page), { timeout: 8000 })
            .toBeGreaterThan(GUARD_THRESHOLD);
    });
});
