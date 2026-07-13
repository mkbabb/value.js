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
 *
 * T.W6.5 rows 7/8 (T-35 "delineate all" · T-44a — the census EXTENSION,
 * t33-research §5.2): the roster gains two NEW legs —
 *
 *   - THE IDENTITY LEG: contrast floors alone could never see the §5.1 cream
 *     collapse (`--accent-live` = `oklch(0.9711 0.0143 32.6)` at the owner
 *     URL — floor-passing, accent-voiced in name only). Accent-voice rows now
 *     ALSO assert the computed ink's OKLCh hue ≈ the live pick's hue AND
 *     C ≥ 0.35 × the pick's C (gamut-permitting — the certified L band for
 *     the owner pick sits well inside the hue slice's chroma ceiling).
 *   - THE GRAPHICS LEG (WCAG 1.4.11 ≥3:1): the census measured TEXT rows
 *     only — never track MATERIAL (the named O-18 blind spot, §6.7). Slider
 *     tracks / rails now census their OWN background against the ground
 *     behind them (born-RED against the Extract kC `var(--muted)` track).
 *
 * The root-accent leg's ground is RE-POINTED with the contract (row 7): the
 * guard certifies against the RESTING RUNG (§5.1a — the accent-voice text
 * population sits on the material ladder, never the bare mid-ambient), so
 * guard and census keep sharing ONE referent by construction.
 */

// ── O-18 CENSUS FEASIBILITY LEG (G-ORACLE-2 · the feasibility-leg law) ───────
// The membership-by-identity assertions (`caption color === --ink-muted`, the
// O-7 discipline; the IDENTITY-leg hue/chroma echo) are the GUARD CONSTANT:
// they prove a consumer WEARS the certified token — serialization ≡ paint,
// blind on their own to whether the token itself clears a floor (the §5.1
// cream-collapse read accent-voiced in name only). EVERY `ratio ≥ TEXT_FLOOR /
// GRAPHICS_FLOOR` assertion in this census IS the feasibility half: the
// effective ink (or track SURFACE) is certified against the COMPOSITED ancestor
// stack over the published page ambient — the real referent, both schemes — so
// a wearer of a floor-failing token reds here even while the identity leg still
// matches. The census IS the leg; this marker names it for the G-ORACLE-2
// meta-audit. (U.W-ORACLE / U-F6-oracle-half.)
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

/**
 * T.W6.5 row 8 — THE SURFACE CENSUS (the graphics leg's instrument): like
 * `censusElement`, but the measured subject is the element's OWN painted
 * background (track material, rail fill) against the ground BEHIND it —
 * WCAG 1.4.11 non-text contrast. `ink` carries the composited fill.
 */
async function censusSurface(
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

            // The ground BEHIND the element: the ancestor stack from the
            // PARENT up (the element's own paint is the measured subject).
            const layers: [number, number, number, number][] = [];
            const stack: string[] = [];
            for (
                let n: HTMLElement | null = el.parentElement;
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

            // The element's own fill × its opacity chain, over the ground.
            const rawBg = getComputedStyle(el).backgroundColor;
            const fillColor = resolve(rawBg);
            let opacity = 1;
            for (let n: HTMLElement | null = el; n; n = n.parentElement) {
                opacity *= Number(getComputedStyle(n).opacity);
            }
            const a = fillColor[3] * opacity;
            const fill: [number, number, number] = [
                a * fillColor[0] + (1 - a) * ground[0],
                a * fillColor[1] + (1 - a) * ground[1],
                a * fillColor[2] + (1 - a) * ground[2],
            ];

            const lum = ([r, g, b]: [number, number, number]) => {
                const lin = (v: number) => {
                    const s = v / 255;
                    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                };
                return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
            };
            const lf = lum(fill);
            const lg = lum(ground);
            const ratio =
                (Math.max(lf, lg) + 0.05) / (Math.min(lf, lg) + 0.05);

            return {
                name,
                ink: `rgb(${fill.map(Math.round).join(" ")})`,
                ground: `rgb(${ground.map(Math.round).join(" ")})`,
                ratio: Math.round(ratio * 100) / 100,
                rawColor: rawBg,
                effectiveAlpha: Math.round(a * 1000) / 1000,
                stack,
            };
        },
        { selector, name },
    );
}

// ---- THE IDENTITY-LEG TOOLKIT (T.W6.5 row 8 · t33-research §5.2) -----------
// sRGB → OKLCh inlined (Björn Ottosson's transform) so the census predicate
// stays self-contained (h-refine-doctrine N-1) — accent and pick both pass
// through the SAME converter, so the comparison is instrument-consistent.

function rgbToOklch([r, g, b]: [number, number, number]): {
    L: number;
    C: number;
    H: number;
} {
    const lin = (v: number) => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const [R, G, B] = [lin(r), lin(g), lin(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return {
        L,
        C: Math.hypot(a, bb),
        H: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360,
    };
}

function hueDeltaDeg(a: number, b: number): number {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
}

/** Parse the census's own `rgb(r g b)` output voice. */
function parseRgbTriple(s: string): [number, number, number] {
    const m = /rgb\((\d+) (\d+) (\d+)\)/.exec(s);
    if (!m) throw new Error(`census rgb voice expected, got: ${s}`);
    return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** Resolve ANY CSS color to opaque sRGB inside the page (canvas draw). */
async function resolveRgbInPage(
    page: Page,
    css: string,
): Promise<[number, number, number]> {
    return page.evaluate((value) => {
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const ctx = cv.getContext("2d")!;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = value;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2]] as [number, number, number];
    }, css);
}

/** The identity floor: the certified accent keeps ≥ this fraction of the
 *  pick's chroma (gamut-permitting — §5.2's stated leg). */
const IDENTITY_C_FLOOR = 0.35;

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

        test("the root accent leg — `--accent-live` vs the LIVE resting-rung ground (the generalized guard proof)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            const ratio = await page.evaluate(() => {
                const cv = document.createElement("canvas");
                cv.width = cv.height = 1;
                const ctx = cv.getContext("2d")!;
                /** Dual-ground resolve: color + alpha (the rung recipe is a
                 *  translucent tint — its alpha matters here). */
                const resolve = (
                    css: string,
                ): [number, number, number, number] => {
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
                    return [
                        onBlack[0] / a,
                        onBlack[1] / a,
                        onBlack[2] / a,
                        a,
                    ];
                };
                const rootStyle = getComputedStyle(document.documentElement);
                const accent = resolve(
                    rootStyle.getPropertyValue("--accent-live").trim(),
                );
                // The page ambient: the PUBLISHED referent (see censusElement
                // — one referent for guard and census).
                const ambientL = Number.parseFloat(
                    rootStyle.getPropertyValue("--ink-ambient-l").trim(),
                );
                const ambient = Number.isFinite(ambientL)
                    ? resolve(`oklch(${ambientL} 0 0)`)
                    : resolve(
                          rootStyle.getPropertyValue("--saved-bg").trim() ||
                              rootStyle.getPropertyValue("--background").trim(),
                      );
                // THE RE-POINT (T.W6.5 row 7 · §5.1a): the guard now
                // certifies against the RESTING RUNG — the leg composites the
                // rung's live recipe over the ambient, so guard and census
                // keep sharing ONE referent by construction.
                const probe = document.createElement("div");
                probe.style.cssText =
                    "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none";
                probe.style.background = "var(--glass-bg-resting)";
                document.body.appendChild(probe);
                const tint = resolve(getComputedStyle(probe).backgroundColor);
                probe.remove();
                const ta = tint[3];
                const ground: [number, number, number] = [
                    ta * tint[0] + (1 - ta) * ambient[0],
                    ta * tint[1] + (1 - ta) * ambient[1],
                    ta * tint[2] + (1 - ta) * ambient[2],
                ];
                const lum = ([r, g, b]: [number, number, number]) => {
                    const lin = (v: number) => {
                        const s = v / 255;
                        return s <= 0.04045
                            ? s / 12.92
                            : ((s + 0.055) / 1.055) ** 2.4;
                    };
                    return (
                        0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
                    );
                };
                const la = lum([accent[0], accent[1], accent[2]]);
                const lg = lum(ground);
                return (Math.max(la, lg) + 0.05) / (Math.min(la, lg) + 0.05);
            });
            // STRENGTHENED with the re-point (was the 1.4.11 graphics floor
            // vs the bare page ground): the contract certifies the accent at
            // the TEXT floor + headroom against this very rung, so the census
            // holds it to the text floor — the graphics population has its
            // own leg below.
            expect(ratio).toBeGreaterThanOrEqual(TEXT_FLOOR);
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

// ---- THE W6.5 LEGS (T.W6.5 rows 7–10 · t33-research §5.1/§5.2/§6.5/§6.7) ---
// The IDENTITY leg ("delineate all" cured as a census extension), the
// GRAPHICS leg (the named O-18 blind spot: track material, WCAG 1.4.11), and
// the T-40a letterform-weight gate ride the same census instrument.

for (const scheme of ["light", "dark"] as const) {
    test.describe(`O-18 W6.5 legs (${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test("the IDENTITY leg — the certified accent SPEAKS the pick: hue held, C ≥ 0.35× (T-35)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            const pick = rgbToOklch(await resolveRgbInPage(page, OWNER_COLOR));

            // 1 — the root token. THE §5.1 CREAM-COLLAPSE REPRO: pre-cure this
            //     read `oklch(0.9711 0.0143 32.6)` at the owner URL — hue
            //     nominally held, chroma COLLAPSED to 0.014 (cream). A floor
            //     row could never see it; the identity row is the census leg
            //     that catches it by construction.
            const accentCss = await page.evaluate(() =>
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--accent-live")
                    .trim(),
            );
            const accent = rgbToOklch(await resolveRgbInPage(page, accentCss));
            expect(
                hueDeltaDeg(accent.H, pick.H),
                `accent hue ≈ pick hue (accent ${accentCss}; pick H ${pick.H.toFixed(1)})`,
            ).toBeLessThanOrEqual(12);
            expect(
                accent.C,
                `accent chroma ≥ ${IDENTITY_C_FLOOR}× pick (accent ${accentCss}; pick C ${pick.C.toFixed(4)})`,
            ).toBeGreaterThanOrEqual(IDENTITY_C_FLOOR * pick.C);

            // 2 — the owner's NAMED instance (t33-audit-03's shot): the "Lab"
            //     space trigger wears `--space-title-ink` = the safe accent at
            //     the W4-1 rest register (86% α). Settle past the entrance
            //     (ancestor opacity chain), then assert identity on the
            //     composited ink — the chroma floor scales by the measured
            //     effective alpha (compositing toward a near-neutral plate
            //     attenuates C linearly).
            const deadline = Date.now() + 8000;
            let row: CensusRow | null = null;
            for (;;) {
                row = await censusElement(page, ".space-trigger", "space-trigger");
                if (row && row.effectiveAlpha >= 0.8) break;
                if (Date.now() > deadline) break;
                await page.waitForTimeout(250);
            }
            expect(row, "space trigger mounted + settled").not.toBeNull();
            const triggerInk = rgbToOklch(parseRgbTriple(row!.ink));
            expect(
                hueDeltaDeg(triggerInk.H, pick.H),
                `trigger ink hue ≈ pick hue (ink ${row!.ink} raw ${row!.rawColor})`,
            ).toBeLessThanOrEqual(15);
            expect(
                triggerInk.C,
                `trigger ink chroma ≥ ${IDENTITY_C_FLOOR}×α× pick (ink ${row!.ink} α ${row!.effectiveAlpha})`,
            ).toBeGreaterThanOrEqual(
                IDENTITY_C_FLOOR * pick.C * row!.effectiveAlpha,
            );
        });

        test("the letterform gate — dropdown options compute weight 400; the specimen caption wears the certified rung (T-40a / row 8)", async ({
            page,
        }) => {
            await bootAtOwnerColor(page);

            await page.locator(".space-trigger").first().click();
            await expect(page.getByRole("option").first()).toBeVisible();

            // T-40a: "Dropdown options should not be bold" — the glass-ui
            // `text-title` @utility 700 hardcode is overridden by the
            // surface's own `--type-weight-display` pin; EVERY option
            // letterform (selected included — the former `font-semibold`
            // conditional died with the bold) computes 400.
            const weights = await page.evaluate(() =>
                Array.from(document.querySelectorAll(".specimen-name")).map(
                    (el) => getComputedStyle(el).fontWeight,
                ),
            );
            expect(weights.length, "option letterforms mounted").toBeGreaterThan(0);
            for (const w of weights) {
                expect(w, "option letterform computed weight (T-40a)").toBe("400");
            }

            // Row 8: the `opacity-60` guard-then-alpha survivor (§5.2) now
            // speaks the certified de-emphasis rung on the floating popover.
            const deadline = Date.now() + 8000;
            let cap: CensusRow | null = null;
            for (;;) {
                cap = await censusElement(
                    page,
                    ".specimen-caption",
                    "specimen-caption",
                );
                if (cap && cap.ratio >= TEXT_FLOOR) break;
                if (Date.now() > deadline) break;
                await page.waitForTimeout(250);
            }
            expect(cap, "specimen caption mounted").not.toBeNull();
            expect(
                cap!.ratio,
                `specimen caption ink ${cap!.ink} vs ${cap!.ground} — raw ${cap!.rawColor} α ${cap!.effectiveAlpha} stack [${cap!.stack.join(" | ")}]`,
            ).toBeGreaterThanOrEqual(TEXT_FLOOR);
        });

        test("the GRAPHICS leg — the Extract instrument tracks ≥3:1 on their ground (T-44a · WCAG 1.4.11)", async ({
            page,
        }) => {
            // The owner's t33-audit-11 surface: the Extract kC/K sliders.
            // Pre-cure the kC track pinned `var(--muted)` — dark-on-dark on
            // the plate (this leg is the row's BORN-RED gate); the cure is
            // the CONTRACT (the live pick certified at the graphics floor
            // against the seat rung), never a per-site color pin.
            await page.goto(
                "/#/extract?space=lab&color=" + encodeURIComponent(OWNER_COLOR),
            );
            await expect(
                page.getByRole("main", { name: "Color tool panes" }),
            ).toBeVisible();
            await expect
                .poll(
                    () =>
                        page.evaluate(() =>
                            getComputedStyle(document.documentElement)
                                .getPropertyValue("--accent-live")
                                .trim(),
                        ),
                    { timeout: 8000 },
                )
                .not.toBe("");
            await expect(
                page.locator('[data-o18="extract-kc"] .slider-track'),
            ).toBeVisible();

            const settleSurface = async (
                selector: string,
                name: string,
            ): Promise<CensusRow | null> => {
                const deadline = Date.now() + 8000;
                let row: CensusRow | null = null;
                for (;;) {
                    row = await censusSurface(page, selector, name);
                    if (row && row.ratio >= GRAPHICS_FLOOR) return row;
                    if (Date.now() > deadline) return row;
                    await page.waitForTimeout(250);
                }
            };
            const diag = (row: CensusRow) =>
                `${row.name} fill ${row.ink} vs ground ${row.ground} — raw ${row.rawColor} α ${row.effectiveAlpha} stack [${row.stack.join(" | ")}]`;

            const kc = await settleSurface(
                '[data-o18="extract-kc"] .slider-track',
                "extract-kc-track",
            );
            expect(kc, "kC track mounted").not.toBeNull();
            expect(kc!.ratio, diag(kc!)).toBeGreaterThanOrEqual(GRAPHICS_FLOOR);

            const kRail = await settleSurface(
                '[data-o18="extract-k-rail"]',
                "extract-k-rail",
            );
            expect(kRail, "K rail mounted").not.toBeNull();
            expect(kRail!.ratio, diag(kRail!)).toBeGreaterThanOrEqual(
                GRAPHICS_FLOOR,
            );
        });
    });
}

// ---- THE W8 CONFIG-TRACK GRAPHICS LEG (boot-A · WCAG 1.4.11 · M-34) --------
// The named O-18 blind spot, extended to the app's SECOND slider population
// (pass-2 boot/atmosphere/blob row A): O-18's config rows judged TEXT only, so
// the ConfigSliderPane spectrum TRACK material — `var(--secondary)`, ≈1.09:1
// light / 1.26:1 dark on the `.console-well` — was invisible-class (WCAG
// 1.4.11 wants ≥3:1 for the control's extent), and the spectrum `.slider-range`
// is transparent by recipe so no filled/unfilled split reads either. This leg
// is the cure's BORN-RED gate: born red against the pre-cure `--secondary`
// track, green against the `--slider-track-bg: var(--ink-muted)` re-ink
// (ConfigSliderPane — the SAME certified-material class as the eb7bb2c Extract
// re-ink). The census extension is the W6.5 precedent (a bounds extension, not
// a weakening — the GRAPHICS floor is unchanged).

for (const scheme of ["light", "dark"] as const) {
    test.describe(`O-18 config-track graphics leg (${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test("the ConfigSliderPane spectrum tracks ≥3:1 on the well (boot-A · M-34)", async ({
            page,
        }) => {
            await page.goto("/#/atmosphere");
            await expect(
                page.getByRole("main", { name: "Color tool panes" }),
            ).toBeVisible();
            await expect(
                page
                    .locator(".config-console .configurator-row .slider-track")
                    .first(),
            ).toBeVisible();
            // The track material is the certified de-emphasis rung — wait for
            // the ink writer to stamp `--ink-muted` (the census certifies the
            // stamped token, never the pre-boot `--muted-foreground` fallback).
            await expect
                .poll(
                    () =>
                        page.evaluate(() =>
                            getComputedStyle(document.documentElement)
                                .getPropertyValue("--ink-muted")
                                .trim(),
                        ),
                    { timeout: 8000 },
                )
                .not.toBe("");

            const settleSurface = async (
                selector: string,
                name: string,
            ): Promise<CensusRow | null> => {
                const deadline = Date.now() + 8000;
                let row: CensusRow | null = null;
                for (;;) {
                    row = await censusSurface(page, selector, name);
                    if (row && row.ratio >= GRAPHICS_FLOOR) return row;
                    if (Date.now() > deadline) return row;
                    await page.waitForTimeout(250);
                }
            };
            const diag = (row: CensusRow) =>
                `${row.name} fill ${row.ink} vs ground ${row.ground} — raw ${row.rawColor} α ${row.effectiveAlpha} stack [${row.stack.join(" | ")}]`;

            const track = await settleSurface(
                ".config-console .configurator-row .slider-track",
                "config-slider-track",
            );
            expect(track, "config slider track mounted").not.toBeNull();
            expect(track!.ratio, diag(track!)).toBeGreaterThanOrEqual(
                GRAPHICS_FLOOR,
            );
        });
    });
}
