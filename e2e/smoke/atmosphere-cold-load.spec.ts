import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
    instrumentWebglDraws,
    canvasPresents,
    ATMOSPHERE_TESTID,
} from "./fixtures/webgl-appearance";
import { cssColorToHex } from "./fixtures/frame-diff";

/**
 * S.W6 · W6-1 — the cold-load DERIVED-field gate (the wave's hard-gate row 1),
 * light AND dark.
 *
 * Cold load at a URL color must paint the DERIVED aurora field first frame:
 * the boot-material token (`--saved-bg`) settles on the derived BASE stop of
 * the URL color (useAtmosphere's boot-material sink — boot ground → first
 * frame is ONE material), the persisted GROUND record (`color-picker-ground`,
 * the W2-2 `{stops, scheme, deriveVersion}` shape — boot/ground.ts) carries
 * the SAME derived stops for the next cold boot, and the field presents
 * (WebGL draws, or the CSS-gradient placeholder under software GL).
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
            // A stale-but-VALID ground record in the hot-pink family (the
            // corruption class, expressed in the W2-2 record shape): the URL
            // color's derive must overwrite every stop of it.
            localStorage.setItem(
                "color-picker-ground",
                JSON.stringify({
                    stops: ["#b37290", "#c98ba1", "#dfa5b2", "#f4c0c4"],
                    scheme: sch,
                    deriveVersion: 1,
                }),
            );
            localStorage.setItem(
                "color-picker",
                JSON.stringify({ inputColor: bg, savedColors: [] }),
            );
            localStorage.setItem("vueuse-color-scheme", sch);
        },
        [STALE_BOOT_BG, scheme] as const,
    );
}

// Registered `<color>` tokens (W2-2) compute to `rgb(…)` — normalize to hex.
async function savedBg(page: Page): Promise<string> {
    const raw = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--saved-bg")
            .trim(),
    );
    return cssColorToHex(raw) ?? raw;
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
        // color. W2-2 note: the fouc-guard paints the (stale) persisted ground
        // INSTANTLY pre-paint and the sink's corrected write then rides the
        // 200ms registered-<color> transition — so the poll waits for the
        // SETTLED in-family value, not merely "a hex" (which the stale ground
        // now satisfies at t=0 by design).
        //
        // Seed-family read: the derived ramp of an H≈145 seed keeps its base
        // stop in the seed's yellow-green→green hue band. Under the variance
        // pull-back knobs (owner ruling 2026-07-05 §1.1: analogous walk,
        // anchor±28°) the BASE stop anchors at anchor−28° — an OLIVE
        // (#7a7800-class, sRGB hue ≈ 59°) whose red channel ties green, so
        // the former g>r channel compare is re-grounded on an honest HUE-BAND
        // assert: in-family olive→green passes; the stale hot-pink class
        // (hue ≈ 335°) and any complement-flank base (blue/purple) fail.
        const hueOfHex = (hex: string): number => {
            const [r, g, b] = [1, 3, 5].map((i) =>
                parseInt(hex.slice(i, i + 2), 16),
            ) as [number, number, number];
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const d = max - min;
            return d === 0
                ? NaN // achromatic — never a derived vivid-seed base stop
                : max === r
                  ? (60 * ((g - b) / d) + 360) % 360
                  : max === g
                    ? 60 * ((b - r) / d) + 120
                    : 60 * ((r - g) / d) + 240;
        };
        // RACE-PROOFED (T.W2 close): the stale-pink → olive correction rides
        // the 200ms registered-<color> OKLab transition, whose sRGB-hue path
        // sweeps 332° → 0/360° → 59° THROUGH the warm reds/oranges (11–49°) —
        // a poll that accepts any hue ≤ 180 can sample a mid-transition
        // orange and then fail the ≥ 50 family assert (caught live at the W2
        // close suite: #a47469, hue 11.2°). The poll therefore waits for the
        // SETTLED in-family band [50, 180] — the assert below stays the gate.
        await expect
            .poll(
                async () => {
                    const h = hueOfHex(await savedBg(page));
                    return h >= 50 && h <= 180;
                },
                { timeout: 8000 },
            )
            .toBe(true);
        const bg = await savedBg(page);
        const hue = hueOfHex(bg);
        expect(bg, "stale session material must not survive").not.toBe(
            STALE_BOOT_BG,
        );
        expect(
            hue,
            `derived base stop ${bg} (hue ${hue.toFixed(1)}°) reads seed-family (yellow-green→green)`,
        ).toBeGreaterThanOrEqual(50);

        // Write-through: the persisted GROUND record for the NEXT cold load
        // carries the same derived base stop (debounced 200ms → poll; the
        // W2-2 shape — stops, never a gradient string). CONVERGENCE-SHAPED
        // (T.W2 close): the family capture above may sample the token a few
        // frames before the 200ms transition's exact end (a 1–2/255 delta —
        // #7c7802 vs the record's #7b7800, caught live), so the record is
        // compared against the SETTLED computed token, polled as a pair —
        // the transition ends AT the written value, so the two truths must
        // converge exactly.
        await expect
            .poll(
                async () => {
                    const settled = await savedBg(page);
                    const rec = await page.evaluate(() => {
                        try {
                            const parsed = JSON.parse(
                                localStorage.getItem("color-picker-ground") ??
                                    "null",
                            ) as { stops?: string[] } | null;
                            return parsed?.stops?.[0] ?? null;
                        } catch {
                            return null;
                        }
                    });
                    return rec !== null && settled === rec;
                },
                { timeout: 8000 },
            )
            .toBe(true);

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
