import { test, expect } from "@playwright/test";
import { expandDock, openView } from "../fixtures/dock";

/**
 * T.W6 · O-14 — THE PREVIEW TRUTH LAW (SYNTHESIS §6.1 O-14; Q5 cascade 3).
 *
 * Two referents, one law — a lying preview is worse than none:
 *
 *  1. THE T-10 REFERENT, RE-POINTED (Q5 RULED; T.W8 WR-8 per-site split):
 *     the guarded letterform ramp's rendered stops ≡ the resolver's output
 *     at BOTH named sites — the "Palettes" entry in the dock view dropdown
 *     AND the Palettes title. ONE resolver (`@composables/color/palettes-ramp`),
 *     ONE writer (`boot/useViewAccents`), ONE recipe (`.palettes-ramp-text`),
 *     TWO consumers — never two mints. WR-8 splits the two sites HONESTLY by
 *     the WCAG large-text carve-out: the ~16px menu entry certifies at the
 *     4.5 text floor (`--palettes-ramp-0/1/2`), the display-scale title at
 *     the 3:1 large-text floor (`--palettes-ramp-title-0/1/2`, aliased into
 *     the recipe by PalettesPane) — each against ITS OWN surface, a per-site
 *     CERTIFIED OUTPUT from the one resolver. The spec asserts: each site's
 *     computed letterform paint embeds exactly its OWN three live root-token
 *     stops (canonical `oklch(L C H)` shape — the guard's output IS the
 *     referent). AND — the T.W8 FEASIBILITY LEG (the near-black wreck was
 *     invisible: the oracle compared sites to tokens, never tokens to their
 *     floors) — each site's stops clear its floor against the composited
 *     surface the letterforms actually sit on, both schemes.
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

async function readRampTokens(
    page: import("@playwright/test").Page,
    prefix = "--palettes-ramp",
) {
    return page.evaluate((prefix) => {
        const s = document.documentElement.style;
        return [0, 1, 2].map((i) =>
            s.getPropertyValue(`${prefix}-${i}`).trim(),
        );
    }, prefix);
}

/**
 * T.W8 FEASIBILITY LEG — the ramp's EFFECTIVE stops (the element's own
 * computed `--palettes-ramp-0/1/2`, which for the title element resolve
 * THROUGH its local `--palettes-ramp-title-*` alias) measured against the
 * composited surface the letterforms sit on: the ancestor `backgroundColor`
 * stack over the published page ambient (`--ink-ambient-l`), the O-18 census
 * model. Returns the per-stop WCAG contrast + the max stop lightness — a
 * near-black wreck reads L ≈ 0.02 and contrast ≤ ~2:1, so this leg catches
 * BOTH faces the byte-identity legs are blind to.
 */
async function measureRampFeasibility(
    page: import("@playwright/test").Page,
    selector: string,
) {
    return page.evaluate((selector) => {
        const el = document.querySelector<HTMLElement>(selector);
        if (!el) return null;
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const ctx = cv.getContext("2d")!;
        const resolve = (css: string): [number, number, number, number] => {
            const draw = (ground: string) => {
                ctx.fillStyle = ground;
                ctx.fillRect(0, 0, 1, 1);
                ctx.fillStyle = "#000";
                ctx.fillStyle = css;
                ctx.fillRect(0, 0, 1, 1);
                return ctx.getImageData(0, 0, 1, 1).data;
            };
            const onBlack = draw("#000");
            const onWhite = draw("#fff");
            const a = 1 - (onWhite[0] - onBlack[0]) / 255;
            if (a <= 0) return [0, 0, 0, 0];
            return [onBlack[0] / a, onBlack[1] / a, onBlack[2] / a, a];
        };
        const rootStyle = getComputedStyle(document.documentElement);
        const ambientL = Number.parseFloat(
            rootStyle.getPropertyValue("--ink-ambient-l").trim(),
        );
        const pageGround = Number.isFinite(ambientL)
            ? resolve(`oklch(${ambientL} 0 0)`)
            : resolve(
                  rootStyle.getPropertyValue("--saved-bg").trim() ||
                      rootStyle.getPropertyValue("--background").trim(),
              );
        // Composite the ancestor bg stack over the page ambient (body/html
        // skipped — the visible ground is the aurora field the ambient
        // describes; the O-18 model verbatim).
        const layers: [number, number, number, number][] = [];
        for (
            let n: HTMLElement | null = el;
            n && n !== document.body && n !== document.documentElement;
            n = n.parentElement
        ) {
            const c = resolve(getComputedStyle(n).backgroundColor);
            if (c[3] > 0) layers.push(c);
        }
        let ground: [number, number, number] = [
            pageGround[0],
            pageGround[1],
            pageGround[2],
        ];
        for (const [r, g, b, a] of layers.reverse()) {
            ground = [
                a * r + (1 - a) * ground[0],
                a * g + (1 - a) * ground[1],
                a * b + (1 - a) * ground[2],
            ];
        }
        const lum = ([r, g, b]: [number, number, number]) => {
            const lin = (v: number) => {
                const s = v / 255;
                return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            };
            return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        };
        const lg = lum(ground);
        // The element's OWN effective stops (var() substituted at compute —
        // the title element's local alias resolves to its title triple here).
        const es = getComputedStyle(el);
        const stops = [0, 1, 2].map((i) =>
            es.getPropertyValue(`--palettes-ramp-${i}`).trim(),
        );
        const ratios: number[] = [];
        let maxL = 0;
        for (const stop of stops) {
            const [r, g, b] = resolve(stop);
            const li = lum([r, g, b]);
            ratios.push((Math.max(li, lg) + 0.05) / (Math.min(li, lg) + 0.05));
            // OKLab L proxy: the stop's own luminance-derived lightness is
            // enough to catch the L≈0.02 clamp (the wreck's monochrome face).
            const oklL =
                Math.cbrt(0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255));
            maxL = Math.max(maxL, oklL);
        }
        return {
            ratios,
            maxL,
            ground: `rgb(${ground.map(Math.round).join(" ")})`,
            stops,
        };
    }, selector);
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
    test("dropdown entry + Palettes title each render their per-site guarded stops — one resolver, per-site certified outputs (WR-8)", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");

        // The writer must have resolved BOTH per-site triples (the accent
        // watch is immediate; first paint carries the tokens).
        const menuTokens = await readRampTokens(page, "--palettes-ramp");
        const titleTokens = await readRampTokens(page, "--palettes-ramp-title");
        for (const t of [...menuTokens, ...titleTokens]) {
            expect(t, "root ramp token present").not.toBe("");
            expect(t, "the guard's canonical output shape").toMatch(OKLCH_SHAPE);
        }

        // Site 1 — the dock view dropdown's "Palettes" entry letterforms:
        // the ~16px MENU triple (4.5 text floor).
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
        expectStopsEqual(parseOklchTriples(entryPaint.backgroundImage), menuTokens);
        await page.keyboard.press("Escape");

        // Site 2 — the Palettes title letterforms: the display-scale TITLE
        // triple (3:1 large-text floor), aliased into the shared recipe.
        await openView(page, "Palettes");
        const title = page.locator(".pane-header-title .palettes-ramp-text").first();
        await expect(title).toBeVisible();
        const titlePaint = await title.evaluate(
            (el) => getComputedStyle(el).backgroundImage,
        );
        expectStopsEqual(parseOklchTriples(titlePaint), titleTokens);
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

/**
 * T.W8 · the FEASIBILITY LEG (WR-8 / P4-R1 ≡ P9-R1) — born-RED against the
 * near-black wreck. The landed resolver walked ≥4.5 against the MID page
 * ambient, unreachable except near black, so it shipped stops at L ≈ 0.02
 * (monochrome in light, ~1.2–1.8:1 in dark) — floor-passing against nothing,
 * INVISIBLE to the byte-identity legs above. This leg measures each site's
 * stops against the surface they SIT on, both schemes: the cure (card-surface
 * referent + feasibility-aware cusp walk) clears the site floor with the
 * certification headroom; the wreck cannot.
 */
const RAMP_MENU_FLOOR = 4.5; // ~16px dock entry — WCAG 1.4.3 text
const RAMP_TITLE_FLOOR = 3; // display-scale title — WCAG large-text carve-out

for (const scheme of ["light", "dark"] as const) {
    test.describe(`O-14 · the ramp feasibility leg (${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test("each site's stops clear its floor against the surface it sits on — never the near-black clamp", async ({
            page,
        }) => {
            await page.goto("/");
            await page.waitForSelector(".glass-dock");
            await expect
                .poll(
                    () =>
                        page.evaluate(() =>
                            document.documentElement.style
                                .getPropertyValue("--palettes-ramp-0")
                                .trim(),
                        ),
                    { timeout: 8000 },
                )
                .not.toBe("");

            // Site 1 — the dock menu entry (4.5 text floor).
            await expandDock(page);
            await page.getByRole("combobox", { name: "Select view" }).click();
            const entry = page
                .getByRole("option", { name: "Palettes" })
                .locator(".palettes-ramp-text");
            await expect(entry).toBeVisible();
            const menu = await measureRampFeasibility(
                page,
                '[role="option"] .palettes-ramp-text',
            );
            expect(menu, "menu ramp measured").not.toBeNull();
            expect(
                menu!.maxL,
                `menu stops not near-black-clamped (stops ${menu!.stops.join(" · ")})`,
            ).toBeGreaterThan(0.1);
            for (let i = 0; i < menu!.ratios.length; i++) {
                expect(
                    menu!.ratios[i],
                    `menu stop ${i} ${menu!.stops[i]} vs surface ${menu!.ground}`,
                ).toBeGreaterThanOrEqual(RAMP_MENU_FLOOR);
            }
            await page.keyboard.press("Escape");

            // Site 2 — the pane title (3:1 large-text floor).
            await openView(page, "Palettes");
            const title = page
                .locator(".pane-header-title .palettes-ramp-text")
                .first();
            await expect(title).toBeVisible();
            const titleM = await measureRampFeasibility(
                page,
                ".pane-header-title .palettes-ramp-text",
            );
            expect(titleM, "title ramp measured").not.toBeNull();
            expect(
                titleM!.maxL,
                `title stops not near-black-clamped (stops ${titleM!.stops.join(" · ")})`,
            ).toBeGreaterThan(0.1);
            for (let i = 0; i < titleM!.ratios.length; i++) {
                expect(
                    titleM!.ratios[i],
                    `title stop ${i} ${titleM!.stops[i]} vs surface ${titleM!.ground}`,
                ).toBeGreaterThanOrEqual(RAMP_TITLE_FLOOR);
            }
        });
    });
}

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
