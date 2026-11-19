import { test, expect } from "@playwright/test";
import { mainPane, openView } from "./fixtures/dock";

/**
 * The picker arrives in one piece on a view change (critique C-18).
 *
 * Extract to Mix at 1440: an empty frosted card holding only its title and
 * readout, then the field, then the sliders, then the blob. The boot's
 * in-card beats (the plate's shadow casting in, the field's paint-in, the
 * channel cascade) ran on the pane's first arrival even when that arrival
 * was a view change, long after the opening breath. Now only the boot plays
 * them; a later first arrival brings its field and rows with the card, and
 * only the blob emerges.
 */

test.use({ viewport: { width: 1440, height: 900 } });

test("Extract to Mix: the field and the rows arrive with the card", async ({ page }) => {
    await page.goto("/#/extract");
    await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });

    await page.evaluate(() => {
        const w = window as unknown as { __arrival: Promise<unknown> };
        w.__arrival = new Promise((resolve) => {
            const seen = new MutationObserver(() => {
                const shell = document.querySelector(".picker-shell");
                const field = shell?.querySelector(".spectrum-picker");
                if (!shell || !field) return;
                seen.disconnect();
                // Two frames in: the arrival's own animations are running.
                requestAnimationFrame(() =>
                    requestAnimationFrame(() =>
                        resolve({
                            arrival: shell.getAttribute("data-arrival"),
                            beats: shell
                                .getAnimations({ subtree: true })
                                .map((a) => (a as CSSAnimation).animationName)
                                .filter(Boolean),
                            field: Number(getComputedStyle(field).opacity),
                        }),
                    ),
                );
            });
            seen.observe(document.body, { childList: true, subtree: true });
        });
    });

    await openView(page, "Mix");
    const arrival = (await page.evaluate(
        () => (window as unknown as { __arrival: Promise<unknown> }).__arrival,
    )) as { arrival: string; beats: string[]; field: number };

    expect(arrival.arrival).toBe("first");
    for (const beat of ["plate-land", "field-paint-in", "stagger-child-in"]) {
        expect(arrival.beats, JSON.stringify(arrival.beats)).not.toContain(beat);
    }
    expect(arrival.field).toBe(1);
});
