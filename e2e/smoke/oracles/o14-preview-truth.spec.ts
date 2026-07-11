import { test, expect } from "@playwright/test";
import { expandDock, openView } from "../fixtures/dock";

/**
 * T.W6 · O-14 — THE PREVIEW TRUTH LAW (SYNTHESIS §6.1 O-14; Q5 cascade 3).
 *
 * Two referents, one law — a lying preview is worse than none:
 *
 *  1. THE T-10 REFERENT, RE-POINTED (Q5 RULED): the guarded letterform
 *     ramp's rendered stops ≡ the guarded resolver's output at BOTH named
 *     sites — the "Palettes" entry in the dock view dropdown AND the
 *     Palettes title. ONE resolver (`@composables/color/palettes-ramp`),
 *     ONE writer (`boot/useViewAccents` → the `--palettes-ramp-0/1/2` root
 *     tokens), ONE recipe (`.palettes-ramp-text`), TWO consumers — never
 *     two mints. The spec asserts: both sites' computed letterform paint
 *     embeds exactly the three live root-token stops, byte-identical to
 *     each other; every stop carries the resolver's canonical
 *     `oklch(L C H)` output shape (the guard's output IS the referent).
 *
 *  2. THE T-17 REFERENT (chips ≡ the library's live output) — the mix
 *     Space/Hue preview ramps: every chip stamps its sampled stop list on
 *     `data-stops` (the sampler's own serialization) and its painted
 *     gradient must embed exactly those stops. The library ≡ sampler half
 *     of the byte-identity chain is the vitest unit oracle
 *     (`test/preview-chips.test.ts` — same function, same args, strict
 *     equality); this spec closes the sampler ≡ paint half in the live DOM.
 */

/** The resolver's canonical output shape (view-accents/palettes-ramp). */
const OKLCH_SHAPE = /^oklch\([\d.]+ [\d.]+ [\d.]+\)$/;

async function readRampTokens(page: import("@playwright/test").Page) {
    return page.evaluate(() => {
        const s = document.documentElement.style;
        return [0, 1, 2].map((i) => s.getPropertyValue(`--palettes-ramp-${i}`).trim());
    });
}

/**
 * Parse every `oklch(L C H)` occurrence into numeric triples. The computed
 * `background-image` CANONICALIZES serialization (trailing zeros trimmed:
 * the resolver's `oklch(0.5500 0.1800 320.0)` computes as
 * `oklch(0.55 0.18 320)`), so identity is asserted at the VALUE level —
 * the stops are the same numbers, byte-identical through the one writer.
 */
function parseOklchTriples(s: string): number[][] {
    return [
        ...s.matchAll(
            /oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g,
        ),
    ].map((m) => [Number(m[1]), Number(m[2]), Number(m[3])]);
}

function expectStopsEqual(painted: number[][], tokens: string[]) {
    const expected = tokens.flatMap((t) => parseOklchTriples(t));
    expect(painted.length, "3 painted stops").toBe(expected.length);
    for (let i = 0; i < expected.length; i++) {
        for (let c = 0; c < 3; c++) {
            expect(
                Math.abs(painted[i]![c]! - expected[i]![c]!),
                `stop ${i} component ${c}: painted ${painted[i]![c]} vs token ${expected[i]![c]}`,
            ).toBeLessThanOrEqual(1e-9);
        }
    }
}

test.describe("O-14 · the T-10 letterform-ramp referent", () => {
    test("dropdown entry + Palettes title render the resolver's guarded stops — one mint, two consumers", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");

        // The writer must have resolved the ramp (the accent watch is
        // immediate; first paint carries the tokens).
        const tokens = await readRampTokens(page);
        for (const t of tokens) {
            expect(t, "root ramp token present").not.toBe("");
            expect(t, "the guard's canonical output shape").toMatch(OKLCH_SHAPE);
        }

        // Site 1 — the dock view dropdown's "Palettes" entry letterforms.
        await expandDock(page);
        const trigger = page.getByRole("combobox", { name: "Select view" });
        await trigger.click();
        const entry = page
            .getByRole("option", { name: "Palettes" })
            .locator(".palettes-ramp-text");
        await expect(entry).toBeVisible();
        const entryPaint = await entry.evaluate((el) => {
            const cs = getComputedStyle(el);
            return {
                backgroundImage: cs.backgroundImage,
                clip: cs.webkitBackgroundClip || (cs as CSSStyleDeclaration & { backgroundClip: string }).backgroundClip,
            };
        });
        expect(entryPaint.clip).toBe("text");
        expectStopsEqual(parseOklchTriples(entryPaint.backgroundImage), tokens);
        await page.keyboard.press("Escape");

        // Site 2 — the Palettes title letterforms.
        await openView(page, "Palettes");
        const title = page.locator(".pane-header-title .palettes-ramp-text").first();
        await expect(title).toBeVisible();
        const titlePaint = await title.evaluate(
            (el) => getComputedStyle(el).backgroundImage,
        );
        expectStopsEqual(parseOklchTriples(titlePaint), tokens);

        // Never two mints: both sites resolve the SAME computed gradient.
        expect(titlePaint).toBe(entryPaint.backgroundImage);
    });

    test("the excised legend stays dead — no per-view static tokens, no dot column", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        // The 9 `--accent-view-<id>` tokens died with the legend (R1); the
        // resurrection guard reads the live root inline style.
        const staleTokens = await page.evaluate(() =>
            Array.from(document.documentElement.style)
                .filter((p) => p.startsWith("--accent-view-")),
        );
        expect(staleTokens).toEqual([]);

        await expandDock(page);
        await page.getByRole("combobox", { name: "Select view" }).click();
        const listbox = page.getByRole("listbox");
        await expect(listbox).toBeVisible();
        // The dot column died: no rounded-full swatch spans inside options.
        expect(
            await listbox.getByRole("option").locator("span.rounded-full").count(),
        ).toBe(0);
    });
});

test.describe("O-14 · the T-17 chip referent (mix Space/Hue ramps)", () => {
    test("honest absence: with <2 operands the rows carry NO chip", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await openView(page, "Mix");
        await page.getByRole("combobox", { name: "Color space", exact: true }).click();
        await expect(page.getByRole("listbox")).toBeVisible();
        expect(
            await page.getByRole("listbox").locator("[data-stops]").count(),
        ).toBe(0);
        await page.keyboard.press("Escape");
    });

    test("every open-menu chip's painted gradient carries exactly its stamped stops", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await openView(page, "Mix");

        // Two REAL operands through the real flow (the add-slot ghost).
        const addSlot = page.getByRole("button", {
            name: "Add current color to the mix",
        });
        await addSlot.click();
        await addSlot.click();

        for (const menuName of ["Color space", "Hue method"]) {
            await page.getByRole("combobox", { name: menuName, exact: true }).click();
            const chips = page.getByRole("listbox").locator("[data-stops]");
            const n = await chips.count();
            expect(n, `${menuName}: preview chips render`).toBeGreaterThan(0);
            for (let i = 0; i < n; i++) {
                const chip = chips.nth(i);
                const { stops, paint } = await chip.evaluate((el) => ({
                    stops: (el.getAttribute("data-stops") ?? "").split("|"),
                    paint: getComputedStyle(el).backgroundImage,
                }));
                expect(stops.length).toBeGreaterThanOrEqual(2);
                // VALUE-level identity (computed-style canonicalization —
                // see parseOklchTriples): every stamped stop appears in the
                // painted gradient, in order, component-equal within the
                // canonicalization rounding band.
                const painted = parseOklchTriples(paint);
                const stamped = stops.flatMap((s) => parseOklchTriples(s));
                expect(
                    painted.length,
                    `${menuName} chip ${i}: painted stop count`,
                ).toBe(stamped.length);
                for (let j = 0; j < stamped.length; j++) {
                    for (let c = 0; c < 3; c++) {
                        expect(
                            Math.abs(painted[j]![c]! - stamped[j]![c]!),
                            `${menuName} chip ${i} stop ${j} component ${c}`,
                        ).toBeLessThanOrEqual(1e-3);
                    }
                }
            }
            await page.keyboard.press("Escape");
        }
    });
});
