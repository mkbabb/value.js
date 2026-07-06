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
 *
 * W6-8 (card-lighting forensics artifact 1) rides here too: the body carries
 * the `data-paper-field` contract, so the producer's orphan amber field-floor
 * is switched OFF on every glass card (the forensics T1 toggle, made durable).
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
        // Seed-family read: the derived ramp of an H≈145 seed keeps its base
        // stop in the seed's yellow-green→green hue band. Under the variance
        // pull-back knobs (owner ruling 2026-07-05 §1.1: analogous walk,
        // anchor±28°) the BASE stop anchors at anchor−28° — an OLIVE
        // (#7a7800-class, sRGB hue ≈ 59°) whose red channel ties green, so
        // the former g>r channel compare is re-grounded on an honest HUE-BAND
        // assert: in-family olive→green passes; the stale hot-pink class
        // (hue ≈ 335°) and any complement-flank base (blue/purple) fail.
        const [r, g, b] = [1, 3, 5].map((i) =>
            parseInt(bg.slice(i, i + 2), 16),
        );
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        const hue =
            d === 0
                ? NaN // achromatic — never a derived vivid-seed base stop
                : max === r
                  ? (60 * ((g - b) / d) + 360) % 360
                  : max === g
                    ? 60 * ((b - r) / d) + 120
                    : 60 * ((r - g) / d) + 240;
        expect(
            hue,
            `derived base stop ${bg} (hue ${hue.toFixed(1)}°) reads seed-family (yellow-green→green)`,
        ).toBeGreaterThanOrEqual(50);
        expect(
            hue,
            `derived base stop ${bg} (hue ${hue.toFixed(1)}°) reads seed-family (yellow-green→green)`,
        ).toBeLessThanOrEqual(180);

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

test("the body carries the paper-field contract — no orphan amber field-floor on glass cards", async ({
    page,
}) => {
    await page.goto("/#/?space=oklch&color=" + encodeURIComponent(URL_GREEN));
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

    // The field plane host: body paints the derived ground, hosts the aurora
    // canvas AND every teleported overlay — the one global [data-paper-field].
    expect(
        await page.evaluate(() => document.body.hasAttribute("data-paper-field")),
    ).toBe(true);

    // Forensics T1, made durable: under the field ancestor the producer's
    // presence-behind gate zeroes the orphan warm radial pair on every glass
    // card (portaled or not) — no card paints its own interior lamp.
    const cardBackgrounds = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                '[data-slot="card"][data-surface="glass"]:not(.paper-grid)',
            ),
        ).map((el) => getComputedStyle(el).backgroundImage),
    );
    expect(cardBackgrounds.length).toBeGreaterThan(0);
    for (const bgImage of cardBackgrounds) {
        expect(bgImage, "orphan field-floor radial must be OFF").not.toContain(
            "radial-gradient",
        );
    }
});
