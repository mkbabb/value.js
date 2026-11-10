// SERVED MODEL: claude-opus-5-5
//
// o1105 blob lane — the hero's press surface (V-2a on /blob; round 2 on the picker).
//
// The owner, 2026-11-05: blob interaction needs a first-principles redesign.
// Until glass's W-G.5b (O-172) lands the membrane physics, the one consumer
// change is the press surface on the stage that exists to show the blob:
// /blob (the picker's HeroBlob beside BlobPane) passes `pressLabel`, so the
// producer renders its native button (pointer, touch, Enter, Space → pulse()).
// Round 2: the picker's hero takes the same surface wherever the bead is live
// (its one pointer host, glass ruling S); on the software tier it stays a
// decorative ornament (no button, aria-hidden), because a hover would wake
// the parked loop that tier exists for.
//
// Measured, never a flag:
//   · the button is in the accessibility tree by name (getByRole skips any
//     aria-hidden subtree, so an inert host would hide it);
//   · hit-testing the bead's centre resolves INTO the button (nothing paints
//     over it), and a body-corner point falls through to the card beneath;
//   · keyboard: the button takes focus and Enter emits the producer's click;
//   · /: on a live tier the centre hit-tests into the press surface; on the
//     software tier there is no press surface and the host stays aria-hidden.
import { test, expect } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { detectRenderer, isSoftwareGL } from "./perf/frame-budget";

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

test("the picker hero presses on a live tier and stays an ornament on the software tier", async ({
    page,
}) => {
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();
    await expect(page.locator('[data-testid="goo-blob-canvas"]').last()).toBeAttached({
        timeout: 15_000,
    });
    if (isSoftwareGL(await detectRenderer(page))) {
        // A hover would wake the parked loop the software tier exists for.
        await expect(page.locator(HIT)).toHaveCount(0);
        await expect(page.locator(".hero-blob-anchor").last()).toHaveAttribute("aria-hidden", "true");
        return;
    }
    const button = page.getByRole("button", { name: "Pulse blob" });
    await expect(button).toBeVisible({ timeout: 15_000 });
    const box = (await button.boundingBox())!;
    const centre = await page.evaluate(
        ({ sel, x, y }) => document.elementFromPoint(x, y) === document.querySelector(sel),
        { sel: HIT, x: box.x + box.width / 2, y: box.y + box.height / 2 },
    );
    expect(centre, "the bead's centre hit-tests into the press surface, not the title row").toBe(true);
});
