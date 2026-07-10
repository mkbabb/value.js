import { test, expect } from "@playwright/test";
import {
    instrumentWebglDraws,
    canvasPresents,
    ATMOSPHERE_TESTID,
} from "../fixtures/webgl-appearance";

/**
 * T.W0 W0-5 · O-2 — REAL-HYDRATION COLD-LOAD (SYNTHESIS §6.1 O-2).
 *
 * The S-era `atmosphere-cold-load.spec.ts` seeds the session with
 * `addInitScript` — it asserts the DERIVE, but MASKS the natural
 * `restoreFromStorage`/`useColorUrl` hydration ordering (an injected pre-mount
 * localStorage is not the path a returning user drives; T-1's out-of-sync
 * arrival lives in exactly that ordering). O-2 drives the REAL path: a first
 * visit persists through the APP's own write-through, then a bare reload
 * restores from that persisted state with NO injected seed.
 *
 * ── BORN-GREEN-PENDING-W2 (annotated): S.W6's cold-load fix makes the natural
 *    round-trip land the derived field, so the repaired oracle is green today.
 *    Its full gate (the boot-region hydration-before-derivation ORDER, W2-1)
 *    arms at W2 — where O-2 pairs with O-4 (order-invariance) to catch the flash
 *    O-2's settled read cannot.
 */

const SEED = "oklch(0.7 0.18 145)"; // vivid green, hue ≈ 145°

function savedBg(page: import("@playwright/test").Page): Promise<string> {
    return page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--saved-bg")
            .trim(),
    );
}

test("O-2 real-hydration — a returning-user bare reload restores the derived field via the natural path", async ({
    page,
}) => {
    test.setTimeout(30_000);
    await instrumentWebglDraws(page);

    // ── FIRST VISIT at the seed URL — the app derives + persists through its OWN
    //    write-through (no addInitScript seed; this IS the natural write path).
    await page.goto("/#/?space=oklch&color=" + encodeURIComponent(SEED));
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    // Wait for the debounced write-through to land the derived boot material.
    await expect
        .poll(
            () => page.evaluate(() => localStorage.getItem("color-picker-bg")),
            { timeout: 8000 },
        )
        .toMatch(/^#[0-9a-f]{6}$/i);
    const persisted = await page.evaluate(() =>
        localStorage.getItem("color-picker-bg"),
    );

    // ── RETURNING-USER COLD LOAD: reload at the BARE root (no URL colour) so the
    //    ONLY source is the persisted localStorage — the real restoreFromStorage
    //    path, never an injected pre-mount seed.
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // The boot material settles on the SAME persisted derived stop (a hex, never
    // a raw session string) — hydration drove the derived field, not a default.
    await expect.poll(() => savedBg(page), { timeout: 8000 }).toMatch(/^#[0-9a-f]{6}$/i);
    const restored = await savedBg(page);
    console.log(`[O-2] persisted=${persisted} restored --saved-bg=${restored}`);
    expect(restored, "returning-user reload restores the persisted derived stop").toBe(
        persisted,
    );

    // The field PRESENTS on the natural cold load (honest to both render paths).
    const present = await canvasPresents(page, ATMOSPHERE_TESTID);
    expect(
        present.cssPlaceholder || present.draws > 0,
        `field absent on natural cold load (cssPlaceholder=${present.cssPlaceholder}, draws=${present.draws})`,
    ).toBe(true);
});
