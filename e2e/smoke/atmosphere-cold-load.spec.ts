import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
    instrumentWebglDraws,
    canvasPresents,
    ATMOSPHERE_TESTID,
} from "./fixtures/webgl-appearance";

/**
 * S.W6 · W6-1 — the cold-load DERIVED-field gate (the wave's hard-gate row 1),
 * light AND dark.
 *
 * Cold load at a URL color must paint the DERIVED aurora field first frame:
 * the boot-material token (`--saved-bg`) settles on the derived BASE stop of
 * the URL color (useAtmosphere's boot-material sink — boot ground → first
 * frame is ONE material), the persisted `color-picker-bg` write-through
 * carries the SAME derived stop for the next cold boot, and the field
 * presents (WebGL draws, or the CSS-gradient placeholder under software GL).
 * The stale raw session color — the pre-W6 corruption class ("stale hot-pink
 * every cold load") — must never survive into any of those surfaces.
 *
 * The entrance rider (owner ruling 2026-07-05 §1.1) is asserted at its
 * settle point: the canvas arrives fully present (`opacity: 1` via the
 * `atmosphere-canvas--arrived` derive-in; immediate under PRM/css-substrate).
 */

const URL_GREEN = "oklch(0.72 0.19 145)"; // the π-baseline vivid green (hue 145)
// The pre-W6 stale boot material — the RAW default pick (hot-pink family), the
// exact class of value the corruption used to leave in `color-picker-bg`.
const STALE_BOOT_BG = "lab(92% 88.8 20 / 82.70%)";

async function seedStaleSession(page: Page, scheme: "light" | "dark") {
    await page.addInitScript(
        ([bg, sch]) => {
            localStorage.setItem("color-picker-bg", bg);
            localStorage.setItem(
                "color-picker",
                JSON.stringify({ inputColor: bg, savedColors: [] }),
            );
            localStorage.setItem("vueuse-color-scheme", sch);
        },
        [STALE_BOOT_BG, scheme] as const,
    );
}

function savedBg(page: Page): Promise<string> {
    return page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--saved-bg")
            .trim(),
    );
}

for (const scheme of ["light", "dark"] as const) {
    test(`cold load at a URL color paints the DERIVED field first frame (${scheme})`, async ({
        page,
    }) => {
        await seedStaleSession(page, scheme);
        await instrumentWebglDraws(page);

        await page.goto("/#/?space=oklch&color=" + encodeURIComponent(URL_GREEN));
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();

        // The boot-material token settles on the DERIVED base stop of the URL
        // color — a hex (oklchStopToHex), never the stale raw session string.
        await expect
            .poll(() => savedBg(page), { timeout: 8000 })
            .toMatch(/^#[0-9a-f]{6}$/i);
        const bg = await savedBg(page);
        expect(bg, "stale session material must not survive").not.toBe(
            STALE_BOOT_BG,
        );
        // Green-family read: the derived ramp of an H≈145 seed keeps green
        // dominant in its base stop (split-complementary walks the flanks on
        // LATER stops; the base anchors the seed family).
        const [r, g, b] = [1, 3, 5].map((i) =>
            parseInt(bg.slice(i, i + 2), 16),
        );
        expect(g, `derived base stop ${bg} reads green-family`).toBeGreaterThan(r);
        expect(g, `derived base stop ${bg} reads green-family`).toBeGreaterThan(b);

        // Write-through: the persisted boot material for the NEXT cold load is
        // the same derived stop (debounced 200ms → poll).
        await expect
            .poll(
                () => page.evaluate(() => localStorage.getItem("color-picker-bg")),
                { timeout: 8000 },
            )
            .toBe(bg);

        // The field PRESENTS — honest to both render-mode paths (webgl draws
        // under a real GPU; the CSS-gradient placeholder under software GL).
        const present = await canvasPresents(page, ATMOSPHERE_TESTID);
        expect(
            present.cssPlaceholder || present.draws > 0,
            `atmosphere presents nothing (cssPlaceholder=${present.cssPlaceholder}, draws=${present.draws})`,
        ).toBe(true);

        // The entrance settles fully arrived — no half-present limbo, and the
        // derive-in class is the one opacity authority (no snap re-hide).
        await expect(page.getByTestId(ATMOSPHERE_TESTID)).toHaveCSS(
            "opacity",
            "1",
        );
    });
}
