import type { Page } from "@playwright/test";
import { userTest as test, expect } from "../fixtures/user-auth";
import { expandDock } from "../fixtures/dock";

/**
 * T.W3 W3-5 · O-18 — THE POPULATION CONTRAST CENSUS (SYNTHESIS §6.1 O-18).
 *
 * The 1×1-canvas resolver run as a CENSUS over the ACTUAL consumer selectors
 * against their REAL parent grounds — never the root token alone. This spec
 * GENERALIZES and supersedes `accent-contrast-guard.spec.ts` (the O-18 row's
 * own words: "accent-contrast-guard generalized") — that oracle was
 * ADJACENT-ONLY (it read `--accent-live` off the root and asserted a
 * luminance band derived from the retired BG_LIGHTNESS constants; its
 * root-token leg survives here, re-keyed on the LIVE ground).
 *
 * Referent: the owner's reference color — the LITERAL `lab(38% 32 24)`, the
 * brown of the t-20xx shots (h-refine-doctrine N-1: the census predicate is
 * self-contained). Both schemes, via `colorScheme` emulation (the JS-side
 * certified inks ride `useGlobalDark`, which resolves from the media query on
 * a fresh profile — an in-page `.dark` class toggle would flip the CSS but
 * not the JS referent, i.e. certify nothing).
 *
 * Ground resolution: for each roster element the census composites the
 * computed `backgroundColor` ancestor stack over the page ground (the
 * atmosphere's `--saved-bg` base stop — body's solid fallback for its own
 * gradient template). Backdrop-filter blur is a spatial mix of the SAME
 * ground family, so the alpha-composite is the honest deterministic
 * instrument (the same model the interim tier table threads; both die into
 * the P3/P5 published tier lightnesses at W7).
 *
 * THE HARDENED ROSTER and its wave scoping (h-dag D-4): the W3-5 rows below
 * assert; the W4-owned rows (readout fracs `.fig-frac`/`.fig-unit`, the
 * channel letters, the ConfigSliderPane slider labels — the app's SECOND
 * slider population) are BORN-RED `test.fixme` rows: their cure lands at
 * W4-3/W4-4 against THIS settled contract; un-fixme them there.
 */

const OWNER_COLOR = "lab(38% 32 24)";
const OWNER_URL = "/#/?space=lab&color=" + encodeURIComponent(OWNER_COLOR);

/** WCAG 2.x small-text floor (1.4.3) and graphics floor (1.4.11). */
const TEXT_FLOOR = 4.5;
const GRAPHICS_FLOOR = 3;

interface CensusRow {
    name: string;
    ink: string;
    ground: string;
    ratio: number;
    /** Diagnostics: the raw computed color, its effective alpha, and the
     *  ancestor background stack (outermost → innermost) — the census is an
     *  instrument; a failing row must carry its own forensics. */
    rawColor: string;
    effectiveAlpha: number;
    stack: string[];
}

/**
 * In-page census toolkit: format-agnostic color resolution (dual-ground
 * canvas draw → color + alpha), ancestor ground compositing, WCAG ratio.
 * One evaluate per element keeps the spec deterministic and inspectable.
 */
async function censusElement(
    page: Page,
    selector: string,
    name: string,
): Promise<CensusRow | null> {
    return page.evaluate(
        ({ selector, name }) => {
            const el = document.querySelector<HTMLElement>(selector);
            if (!el) return null;

            const cv = document.createElement("canvas");
            cv.width = cv.height = 1;
            const ctx = cv.getContext("2d")!;
            /** Resolve ANY CSS color to [r,g,b,a] via dual-ground draws. */
            const resolve = (css: string): [number, number, number, number] => {
                const draw = (ground: string) => {
                    ctx.fillStyle = ground;
                    ctx.fillRect(0, 0, 1, 1);
                    ctx.fillStyle = "#000"; // unparseable → ground survives
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

            /** The page ground: the PUBLISHED ambient referent — the boot
             *  writer stamps `--ink-ambient-l` (the atmosphere's live
             *  derivedLightness, the exact number every certified ink keyed
             *  on), so guard and census share ONE referent by construction.
             *  The field-paint truth of that number is guarded elsewhere
             *  (O-1/O-26); this census certifies the CONSUMERS against it.
             *  Fallback chain (pre-boot only): `--saved-bg` → `--background`. */
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

            /** Composite the ancestor background stack over the page ground.
             *  `body`/`html` are SKIPPED: the body's solid + gradient are the
             *  atmosphere's FALLBACK material — the visible page ground is
             *  the aurora field the published ambient describes. */
            const layers: [number, number, number, number][] = [];
            const stack: string[] = [];
            for (
                let n: HTMLElement | null = el;
                n && n !== document.body && n !== document.documentElement;
                n = n.parentElement
            ) {
                const bg = getComputedStyle(n).backgroundColor;
                const c = resolve(bg);
                if (c[3] > 0) {
                    layers.push(c);
                    stack.unshift(
                        `${n.tagName.toLowerCase()}.${String(n.className).split(" ")[0]}=${bg}`,
                    );
                }
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

            /** Effective ink: computed color × color-alpha × opacity chain. */
            const inkColor = resolve(getComputedStyle(el).color);
            let opacity = 1;
            for (let n: HTMLElement | null = el; n; n = n.parentElement) {
                opacity *= Number(getComputedStyle(n).opacity);
            }
            const a = inkColor[3] * opacity;
            const ink: [number, number, number] = [
                a * inkColor[0] + (1 - a) * ground[0],
                a * inkColor[1] + (1 - a) * ground[1],
                a * inkColor[2] + (1 - a) * ground[2],
            ];

            /** WCAG 2.x relative luminance + contrast ratio. */
            const lum = ([r, g, b]: [number, number, number]) => {
                const lin = (v: number) => {
                    const s = v / 255;
                    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                };
                return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
            };
            const li = lum(ink);
            const lg = lum(ground);
            const ratio =
                (Math.max(li, lg) + 0.05) / (Math.min(li, lg) + 0.05);

            return {
                name,
                ink: `rgb(${ink.map(Math.round).join(" ")})`,
                ground: `rgb(${ground.map(Math.round).join(" ")})`,
                ratio: Math.round(ratio * 100) / 100,
                rawColor: getComputedStyle(el).color,
                effectiveAlpha: Math.round(a * 1000) / 1000,
                stack,
            };
        },
        { selector, name },
    );
}

/** Boot to the owner color and wait for the ink writers (boot contract). */
async function bootAtOwnerColor(page: Page) {
    await page.goto(OWNER_URL);
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    for (const token of ["--accent-live", "--ink-muted", "--ink-ambient-l"]) {
        await expect
            .poll(
                () =>
                    page.evaluate(
                        (t) =>
                            getComputedStyle(document.documentElement)
                                .getPropertyValue(t)
                                .trim(),
                        token,
                    ),
                { timeout: 8000 },
            )
            .not.toBe("");
    }
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`O-18 census (${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test("menus — the slug pill + Profile trigger wear certified floating-rung ink (A11Y-F2)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            // The dock trigger (the chrome band host). The dock may have
            // idle-collapsed post-boot — a collapsed/morphing dock carries a
            // sub-1 opacity on its expanded layer, which the effective-ink
            // instrument honestly reads as near-ground; expand + POLL to the
            // settled state.
            await expandDock(page);
            const trigger = page.getByRole("button", { name: "Profile" });
            await expect(trigger).toBeVisible();

            /** Poll a row to its settled state (enter animations fade the
             *  ancestor opacity chain in — mid-animation the effective ink
             *  honestly reads as the ground), keeping the LAST row so a
             *  genuine failure reports its own forensics. */
            const settle = async (
                selector: string,
                name: string,
            ): Promise<CensusRow | null> => {
                const deadline = Date.now() + 8000;
                let row: CensusRow | null = null;
                for (;;) {
                    row = await censusElement(page, selector, name);
                    if (row && row.ratio >= TEXT_FLOOR) return row;
                    if (Date.now() > deadline) return row;
                    await page.waitForTimeout(250);
                }
            };
            const diag = (row: CensusRow) =>
                `${row.name} ink ${row.ink} vs ground ${row.ground} — raw ${row.rawColor} α ${row.effectiveAlpha} stack [${row.stack.join(" | ")}]`;

            const triggerRow = await settle(
                '[data-o18="profile-trigger"]',
                "profile-trigger",
            );
            expect(triggerRow, "profile trigger mounted").not.toBeNull();
            expect(triggerRow!.ratio, diag(triggerRow!)).toBeGreaterThanOrEqual(
                TEXT_FLOOR,
            );

            // The menu popover (floating rung) — the slug pill inside it.
            await trigger.click();
            const pill = page.locator(".slug-pill").first();
            await expect(pill).toBeVisible();
            const pillRow = await settle(".slug-pill", "slug-pill");
            expect(pillRow, "slug pill mounted").not.toBeNull();
            expect(pillRow!.ratio, diag(pillRow!)).toBeGreaterThanOrEqual(
                TEXT_FLOOR,
            );
        });

        test("plate captions — the certified de-emphasis rung `--ink-muted` (F-4/F-10)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            // The spectrum-plate caption (the t-2001-51 owner-shot instance).
            const caption = page.locator(".plate-caption").first();
            await expect(caption).toBeVisible();
            const row = await censusElement(
                page,
                ".plate-caption",
                "spectrum-plate-caption",
            );
            expect(row).not.toBeNull();
            expect(
                row!.ratio,
                `caption ink ${row!.ink} vs plate ground ${row!.ground}`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);

            // Membership by identity (the O-7 discipline): every ink-muted
            // consumer computes to the SAME resolved token, so one measured
            // instance certifies the class; the parse-echo verdict joins when
            // mounted.
            const identity = await page.evaluate(() => {
                const token = getComputedStyle(document.documentElement)
                    .getPropertyValue("--ink-muted")
                    .trim();
                const probe = document.createElement("div");
                probe.style.color = token;
                document.body.appendChild(probe);
                const resolvedToken = getComputedStyle(probe).color;
                probe.remove();
                const caption = document.querySelector(".plate-caption");
                const echo = document.querySelector(".gamut-verdict");
                return {
                    token: resolvedToken,
                    caption: caption ? getComputedStyle(caption).color : null,
                    echo: echo ? getComputedStyle(echo).color : null,
                };
            });
            expect(identity.caption, "caption wears --ink-muted").toBe(
                identity.token,
            );
            if (identity.echo !== null) {
                expect(identity.echo, "parse echo wears --ink-muted").toBe(
                    identity.token,
                );
            }
        });

        test("graph nodes — the F-3 fill/ink chain (hover commits fill + derived ink together)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            const node = page.locator('[data-o18="graph-node"]').first();
            await expect(node).toBeVisible();

            // Resting state: the node inherits plate ink — measure it.
            const resting = await censusElement(
                page,
                '[data-o18="graph-node"]',
                "graph-node-resting",
            );
            expect(resting).not.toBeNull();
            expect(
                resting!.ratio,
                `resting node ink ${resting!.ink} vs ${resting!.ground}`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);

            // Hovered: the fill goes live-colored and the ink derives from
            // the FILL (contrastInkFor — WCAG-maximal, a pass by construction).
            await node.hover();
            await expect
                .poll(async () => {
                    const row = await censusElement(
                        page,
                        '[data-o18="graph-node"]',
                        "graph-node-hovered",
                    );
                    return row?.ratio ?? 0;
                })
                .toBeGreaterThanOrEqual(TEXT_FLOOR);

            // The component-name letters (the split's TEXT role, resting rung).
            const nameRow = await censusElement(
                page,
                '[data-o18="component-name"]',
                "component-name",
            );
            expect(nameRow).not.toBeNull();
            expect(
                nameRow!.ratio,
                `component-name ink ${nameRow!.ink} vs ${nameRow!.ground} — raw ${nameRow!.rawColor} α ${nameRow!.effectiveAlpha} stack [${nameRow!.stack.join(" | ")}]`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);
        });

        test("markdown About body — prose + code ink on the rung-1 plate (h-gaps G-2)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            const body = page.locator(".markdown-wrapper .markdown-body").first();
            await expect(body).toBeVisible({ timeout: 15000 });

            const prose = await censusElement(
                page,
                ".markdown-wrapper .markdown-body p",
                "about-prose",
            );
            expect(prose, "About body has prose").not.toBeNull();
            expect(
                prose!.ratio,
                `prose ink ${prose!.ink} vs plate ground ${prose!.ground}`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);

            // Code ink where a block exists (per-doc; skip-if-absent is honest
            // here — the roster row is the CLASS, measured wherever mounted).
            const code = await censusElement(
                page,
                ".markdown-wrapper .markdown-body pre code, .markdown-wrapper .markdown-body p > code",
                "about-code",
            );
            if (code) {
                expect(
                    code.ratio,
                    `code ink ${code.ink} vs ${code.ground}`,
                ).toBeGreaterThanOrEqual(TEXT_FLOOR);
            }
        });

        test("the root accent leg — `--accent-live` vs the LIVE page ground (the generalized guard proof)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            const ratio = await page.evaluate(() => {
                const cv = document.createElement("canvas");
                cv.width = cv.height = 1;
                const ctx = cv.getContext("2d")!;
                const resolve = (css: string) => {
                    ctx.fillStyle = "#000";
                    ctx.fillStyle = css;
                    ctx.fillRect(0, 0, 1, 1);
                    return ctx.getImageData(0, 0, 1, 1).data;
                };
                const rootStyle = getComputedStyle(document.documentElement);
                const accent = resolve(
                    rootStyle.getPropertyValue("--accent-live").trim(),
                );
                // The page ground: the PUBLISHED ambient referent (see
                // censusElement — one referent for guard and census).
                const ambientL = Number.parseFloat(
                    rootStyle.getPropertyValue("--ink-ambient-l").trim(),
                );
                const ground = Number.isFinite(ambientL)
                    ? resolve(`oklch(${ambientL} 0 0)`)
                    : resolve(
                          rootStyle.getPropertyValue("--saved-bg").trim() ||
                              rootStyle.getPropertyValue("--background").trim(),
                      );
                const lum = (d: Uint8ClampedArray) => {
                    const lin = (v: number) => {
                        const s = v / 255;
                        return s <= 0.04045
                            ? s / 12.92
                            : ((s + 0.055) / 1.055) ** 2.4;
                    };
                    return (
                        0.2126 * lin(d[0]) +
                        0.7152 * lin(d[1]) +
                        0.0722 * lin(d[2])
                    );
                };
                const la = lum(accent);
                const lg = lum(ground);
                return (Math.max(la, lg) + 0.05) / (Math.min(la, lg) + 0.05);
            });
            // The accent inks icons/borders page-wide: the WCAG 1.4.11
            // graphics floor against the REAL ground (text-role consumers are
            // measured at their own rows above).
            expect(ratio).toBeGreaterThanOrEqual(GRAPHICS_FLOOR);
        });
    });
}

// ---- THE W4-OWNED ROSTER ROWS (un-fixme'd at T.W4-3/W4-4 — h-dag D-4) ------
// The cures landed against the settled W3-5 contract: the readout demotions
// ride `--ink-muted` (guard-then-alpha dead), the channel letters speak
// certified ink on the console WELL (the labelColor self-camouflage conceit
// dead), and the ConfigSliderPane rows (the SECOND slider population, M-34)
// seat in the same well with the same certified de-emphasis.

for (const scheme of ["light", "dark"] as const) {
    test.describe(`O-18 W4 rows (${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test("readout fracs/units/commas wear the certified de-emphasis rung ≥4.5:1", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);
            for (const [sel, name] of [
                [".fig-frac", "readout-frac"],
                [".fig-unit", "readout-unit"],
                [".fig-comma", "readout-comma"],
            ] as const) {
                const row = await censusElement(page, sel, name);
                expect(row, `${name} mounted (lab readout)`).not.toBeNull();
                expect(
                    row!.ratio,
                    `${name} ink ${row!.ink} vs ${row!.ground} — raw ${row!.rawColor} α ${row!.effectiveAlpha}`,
                ).toBeGreaterThanOrEqual(TEXT_FLOOR);
            }
        });

        test("the channel letters ≥4.5:1 on the console well (rest rung)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);
            // Settle-poll (the census's standing idiom): the stagger
            // entrance holds child opacity 0 through its delay — a bare
            // read mid-animation honestly reports the ground.
            const deadline = Date.now() + 8000;
            let row: CensusRow | null = null;
            for (;;) {
                row = await censusElement(
                    page,
                    ".channel-rail-item",
                    "channel-letter-rest",
                );
                if (row && row.ratio >= TEXT_FLOOR) break;
                if (Date.now() > deadline) break;
                await page.waitForTimeout(250);
            }
            expect(row, "rail letter mounted").not.toBeNull();
            expect(
                row!.ratio,
                `letter ink ${row!.ink} vs well ground ${row!.ground} — raw ${row!.rawColor} α ${row!.effectiveAlpha} stack [${row!.stack.join(" | ")}]`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);
        });

        test("ConfigSliderPane rows (Atmosphere — the SECOND slider population, M-34) ≥4.5:1", async ({
            page,
        }) => {
            // The direct route (no admin meta): the config surface mounts
            // without the dock's admin-mode dance.
            await page.goto("/#/atmosphere");
            await expect(
                page.getByRole("main", { name: "Color tool panes" }),
            ).toBeVisible();
            await expect(
                page.locator(".config-console .configurator-row").first(),
            ).toBeVisible();
            const settle = async (
                selector: string,
                name: string,
            ): Promise<CensusRow | null> => {
                const deadline = Date.now() + 8000;
                let row: CensusRow | null = null;
                for (;;) {
                    row = await censusElement(page, selector, name);
                    if (row && row.ratio >= TEXT_FLOOR) return row;
                    if (Date.now() > deadline) return row;
                    await page.waitForTimeout(250);
                }
            };
            const label = await settle(
                ".config-console .configurator-row label",
                "config-row-label",
            );
            expect(label, "config row label mounted").not.toBeNull();
            expect(
                label!.ratio,
                `label ink ${label!.ink} vs well ${label!.ground}`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);
            const value = await settle(
                ".config-console .configurator-row .font-mono",
                "config-row-live-value",
            );
            expect(value, "config row live value mounted").not.toBeNull();
            expect(
                value!.ratio,
                `live value ink ${value!.ink} vs well ${value!.ground} — raw ${value!.rawColor} α ${value!.effectiveAlpha}`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);
        });
    });
}
