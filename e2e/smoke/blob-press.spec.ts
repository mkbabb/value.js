// SERVED MODEL: claude-opus-5-5
//
// o1105 blob lane · V-2a — the /blob hero is pressable; the picker's is not.
//
// The owner, 2026-11-05: blob interaction needs a first-principles redesign.
// Until glass's W-G.5b (O-172) lands the membrane physics, the one consumer
// change is the press surface on the stage that exists to show the blob:
// /blob (the picker's HeroBlob beside BlobPane) passes `pressLabel`, so the
// producer renders its native button (pointer, touch, Enter, Space → pulse()).
// The picker's hero stays a decorative ornament (no button, aria-hidden), per
// glass's ruling S: a decorative blob takes no pointer host.
//
// Measured, never a flag:
//   · the button is in the accessibility tree by name (getByRole skips any
//     aria-hidden subtree, so an inert host would hide it);
//   · hit-testing the bead's centre resolves INTO the button (nothing paints
//     over it), and a body-corner point falls through to the card beneath;
//   · keyboard: the button takes focus and Enter emits the producer's click;
//   · /: no press surface and the host stays aria-hidden.
import { test, expect } from "@playwright/test";
import { mainPane } from "./fixtures/dock";

test.use({ viewport: { width: 1440, height: 900 } });

const HIT = '[data-testid="goo-blob-hit"]';

test("the /blob hero carries the producer's press surface", async ({ page }) => {
    await page.goto("/#/blob");
    await expect(mainPane(page)).toBeVisible();
    const button = page.getByRole("button", { name: "Pulse blob" });
    await expect(button).toBeVisible({ timeout: 15_000 });

    const box = (await button.boundingBox())!;
    const probe = await page.evaluate(
        ({ sel, cx, cy, corner }) => {
            const hit = document.querySelector(sel)!;
            const centre = document.elementFromPoint(cx, cy);
            const off = document.elementFromPoint(corner.x, corner.y);
            return { centre: centre === hit, corner: off === hit };
        },
        {
            sel: HIT,
            cx: box.x + box.width / 2,
            cy: box.y + box.height / 2,
            corner: { x: box.x + 2, y: box.y + 2 },
        },
    );
    expect(probe.centre, "the bead's centre hit-tests into the press surface").toBe(true);
    expect(probe.corner, "the box corner falls through to the card").toBe(false);

    await page.evaluate((sel) => {
        const hit = document.querySelector(sel)!;
        (window as unknown as { __blobClicks: number }).__blobClicks = 0;
        hit.addEventListener("click", () => {
            (window as unknown as { __blobClicks: number }).__blobClicks++;
        });
    }, HIT);
    await button.focus();
    await expect(button).toBeFocused();
    await page.keyboard.press("Enter");
    await expect
        .poll(() => page.evaluate(() => (window as unknown as { __blobClicks: number }).__blobClicks))
        .toBe(1);
});

test("the picker hero stays a decorative ornament", async ({ page }) => {
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();
    await expect(page.locator('[data-testid="goo-blob-canvas"]').last()).toBeAttached({
        timeout: 15_000,
    });
    await expect(page.locator(HIT)).toHaveCount(0);
    await expect(page.locator(".hero-blob-anchor").last()).toHaveAttribute("aria-hidden", "true");
});
