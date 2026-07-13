import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * T.W3 W3-4 · O-11 — THE HEADER GATES 1–6 (SYNTHESIS §6.1 O-11;
 * t-header-shading §4 verbatim). The T-23 reversal lands WITH its regression
 * lock (the pre-T e2e coverage of PaneHeader was ZERO; the old "dead at rest"
 * π gate is superseded — the S.W5 DELTA.md:25 / S.W5.md:42 records carry the
 * supersession annotations).
 *
 *   1 · REST FLOOR — computed veil opacity ∈ [0.45, 0.65] at scrollTop 0,
 *       every reachable pane, both schemes (the Q9 bracket; the landed floor
 *       0.52 composites 33.8% L / 37.4% D added card material — inside the
 *       ratified EFFECT bracket [27%, 39%]).
 *   2 · NO BAND — the feather mask present at rest AND stuck (the band dies
 *       by construction, never by absence).
 *   3 · NO DOUBLE-EXPOSURE — the swell completes ≤64px, ahead of the
 *       earliest content collision (~24–48px on About/Gradient).
 *   4 · COMPOSITOR-ONLY — the pane-* keyframes declare ONLY transform/
 *       opacity (the F3 layout-fork's padding/font-size/grid-rows channels
 *       are dead) + a CDP devtools.timeline trace over a live scrub shows a
 *       FLAT layout track.
 *   5 · ENGINE/PRM COHERENCE — the rest appearance is the animation's OWN
 *       from-state (= the base state), so PRM and non-SDA engines paint the
 *       identical rest header; structurally, every --pane-scroll binding
 *       lives inside `@supports (animation-timeline: scroll())`.
 *   6 · ONE GRAMMAR — the ONLY in-card sticky surfaces are the sanctioned
 *       headers: `.pane-header` (the 9 panes) and `.picker-header` (the picker
 *       plate's whole-header scroll-contraction strip — U-F9/T-61/§0.8, the
 *       owner-verbatim whole-header contraction; it condenses in place as
 *       content scrolls under, so it is legitimately sticky). Nothing in-card
 *       out-stacks `--z-header`.
 */

const VEIL_FLOOR_MIN = 0.45;
const VEIL_FLOOR_MAX = 0.65;

/** Read the veil (::before) computed state on the visible pane header(s). */
async function readVeils(page: Page) {
    return page.evaluate(() => {
        return Array.from(
            document.querySelectorAll<HTMLElement>("main .pane-header"),
        )
            .filter((el) => el.offsetParent !== null)
            .map((el) => {
                const cs = getComputedStyle(el, "::before");
                return {
                    opacity: Number(cs.opacity),
                    mask: cs.maskImage,
                    bg: cs.backgroundColor,
                };
            });
    });
}

/** Scrub the first visible pane scroll host to `y`; return ITS OWN header's
 *  veil state (the un-scrubbed sibling pane stays at rest by design). */
async function scrubTo(page: Page, y: number) {
    return page.evaluate(async (top) => {
        const host = Array.from(
            document.querySelectorAll<HTMLElement>("main .pane-scroll-fade"),
        ).find((el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight);
        if (!host) throw new Error("no scrollable pane host found");
        host.scrollTop = top;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const header = host.querySelector<HTMLElement>(".pane-header");
        if (!header) throw new Error("scrubbed host has no pane-header");
        const cs = getComputedStyle(header, "::before");
        return { opacity: Number(cs.opacity), mask: cs.maskImage };
    }, y);
}

const VIEWS = [
    "Home",
    "Palettes",
    "Browse",
    "Extract",
    "Mix",
    "Generate",
    "Gradient",
] as const;

for (const scheme of ["light", "dark"] as const) {
    test(`O-11 gates 1+2 — constitutive rest floor + feather, every pane (${scheme})`, async ({
        page,
    }) => {
        test.setTimeout(120_000);
        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();
        if (scheme === "dark") {
            await page.evaluate(() =>
                document.documentElement.classList.add("dark"),
            );
        }
        for (const view of VIEWS) {
            if (view !== "Home") await openView(page, view);
            await expect(page.locator("main .pane-header").first()).toBeVisible();
            const veils = await readVeils(page);
            expect(
                veils.length,
                `${view}: no visible pane header found`,
            ).toBeGreaterThan(0);
            for (const v of veils) {
                // Gate 1 — the rest floor (shaded AT rest — T-23).
                expect
                    .soft(v.opacity, `${view} (${scheme}): rest floor under the bracket`)
                    .toBeGreaterThanOrEqual(VEIL_FLOOR_MIN);
                expect
                    .soft(v.opacity, `${view} (${scheme}): rest exceeds the bracket`)
                    .toBeLessThanOrEqual(VEIL_FLOOR_MAX);
                // Gate 2 — the feather is present at rest (no band by construction).
                expect
                    .soft(v.mask, `${view} (${scheme}): the feather mask is gone`)
                    .not.toBe("none");
            }
        }
    });
}

test("O-11 gate 3 — the swell completes ≤64px; no naked window under the earliest colliders", async ({
    page,
}) => {
    test.setTimeout(60_000);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // About (Home right pane) + Gradient — the two earliest colliders
    // (t-header-shading F2: content reaches the title underside by ~24–48px).
    for (const view of ["Home", "Gradient"] as const) {
        if (view !== "Home") await openView(page, view);
        await expect(page.locator("main .pane-header").first()).toBeVisible();

        const rest = await scrubTo(page, 0);
        const at24 = await scrubTo(page, 24);
        const at48 = await scrubTo(page, 48);
        const at64 = await scrubTo(page, 64);
        const at300 = await scrubTo(page, 300);

        // Monotone swell from the floor; near-full by 48; full at 64.
        expect(
            at24.opacity,
            `${view}: swell not engaged by 24px`,
        ).toBeGreaterThanOrEqual(rest.opacity);
        expect(
            at48.opacity,
            `${view}: veil under 0.85 at 48px (double-exposure window)`,
        ).toBeGreaterThanOrEqual(0.85);
        expect(at64.opacity, `${view}: swell incomplete at 64px`).toBe(1);
        expect(at300.opacity).toBe(1);
        // Gate 2's stuck half: the feather survives the stuck state.
        expect(at300.mask, `${view}: the feather died when stuck`).not.toBe(
            "none",
        );
        await scrubTo(page, 0);
    }
});

test("O-11 gate 4 — compositor-only: pane-* keyframes carry ONLY transform/opacity; the CDP layout track is FLAT under a live scrub", async ({
    page,
    browser,
}, testInfo) => {
    test.setTimeout(90_000);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // Structural half: walk every same-origin sheet's pane-* keyframes.
    const offenders = await page.evaluate(() => {
        const COMPOSITOR = new Set(["transform", "opacity"]);
        const bad: string[] = [];
        const walk = (rules: CSSRuleList) => {
            for (const rule of Array.from(rules)) {
                if (rule instanceof CSSKeyframesRule && /^pane-/.test(rule.name)) {
                    for (const frame of Array.from(rule.cssRules)) {
                        const style = (frame as CSSKeyframeRule).style;
                        for (const prop of Array.from(style)) {
                            if (!COMPOSITOR.has(prop)) {
                                bad.push(`${rule.name}: ${prop}`);
                            }
                        }
                    }
                } else if (
                    rule instanceof CSSSupportsRule ||
                    rule instanceof CSSMediaRule
                ) {
                    walk(rule.cssRules);
                }
            }
        };
        for (const sheet of Array.from(document.styleSheets)) {
            try {
                walk(sheet.cssRules);
            } catch {
                /* cross-origin sheet — not ours */
            }
        }
        return bad;
    });
    expect(
        offenders,
        "layout-channel properties inside pane-* scroll keyframes (the F3 fork resurrected)",
    ).toEqual([]);

    // Live half: trace a real scrub; the layout track must be flat.
    const scrub = async () => {
        await page.evaluate(async () => {
            const host = Array.from(
                document.querySelectorAll<HTMLElement>(
                    "main .pane-scroll-fade",
                ),
            ).find(
                (el) =>
                    el.offsetParent !== null &&
                    el.scrollHeight > el.clientHeight,
            );
            if (!host) throw new Error("no scrollable pane host");
            for (let y = 0; y <= 300; y += 10) {
                host.scrollTop = y;
                await new Promise((r) => requestAnimationFrame(() => r(null)));
            }
            host.scrollTop = 0;
            await new Promise((r) => requestAnimationFrame(() => r(null)));
        });
    };
    // Warm-up pass: first-reveal render work (content-visibility regions,
    // lazy content entering the scrollport) is legitimate one-time layout,
    // not scroll-driven animation — it must not pollute the flat-track read.
    //
    // T.W6.5 Lane M — the SAME first-reveal class, one beat later: B4 now
    // settle-gates on the field's derive-in (useOverture — the B2/B4
    // de-coincidence), so the hero blob's one-time MOUNT layout lands
    // ~1.6s+ after boot; un-awaited it fell INSIDE the traced scrub and
    // read as 10 Layout events. Settle the FULL overture (b4 mark + the
    // blob canvas attached) before the warm-up, so the trace reads ONLY
    // the scroll-driven track — the ≤5 bar is unchanged.
    await page
        .waitForFunction(
            () =>
                performance.getEntriesByName("overture:b4", "mark").length > 0,
            null,
            { timeout: 20_000 },
        )
        .catch(() => {
            /* PRM/css-substrate mounts carry no b4 wait — fall through */
        });
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached({
        timeout: 15_000,
    });
    await scrub();
    await browser.startTracing(page, {
        categories: ["devtools.timeline"],
    });
    await scrub();
    const traceBuf = await browser.stopTracing();
    const trace = JSON.parse(traceBuf.toString());
    const events: Array<{ name?: string }> = trace.traceEvents ?? trace;
    const layouts = events.filter((e) => e.name === "Layout").length;
    await testInfo.attach("o11-gate4-layout-count", {
        body: `Layout events during 0→300px scrub: ${layouts}`,
        contentType: "text/plain",
    });
    // The retired fork forced Layout EVERY scrub frame (~31 frames here); a
    // flat track allows only ambient noise (fonts/late content), not one
    // layout per frame.
    expect(
        layouts,
        `layout track not flat under scroll scrub (${layouts} Layout events)`,
    ).toBeLessThanOrEqual(5);
});

test("O-11 gate 5 — engine/PRM coherence: rest state identical under PRM; every --pane-scroll binding is @supports-gated", async ({
    page,
}) => {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    // The same mount-wait discipline as gates 1+2: `main` turns visible before
    // the pane cards finish revealing, so an un-waited read races the boot
    // reveal and returns an empty veil list (observed live at the W3 §Recovery
    // resume — and an empty NORMAL read would let the PRM comparison pass
    // vacuously on undefined === undefined).
    await expect(page.locator("main .pane-header").first()).toBeVisible();
    const normal = await readVeils(page);
    expect(
        normal.length,
        "no visible pane header at rest (normal engine read)",
    ).toBeGreaterThan(0);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(page.locator("main .pane-header").first()).toBeVisible();
    const prm = await readVeils(page);
    expect(
        prm.length,
        "no visible pane header at rest (PRM read)",
    ).toBeGreaterThan(0);

    expect(prm[0]?.opacity, "PRM rest veil diverges from normal rest").toBe(
        normal[0]?.opacity,
    );
    expect(prm[0]?.mask).not.toBe("none");
    await page.emulateMedia({ reducedMotion: null });

    // Structural: no --pane-scroll animation binding outside the
    // `@supports (animation-timeline: scroll())` gate — non-SDA engines
    // resolve to the identical designed rest state by construction.
    const ungated = await page.evaluate(() => {
        const bad: string[] = [];
        const walk = (rules: CSSRuleList, gated: boolean) => {
            for (const rule of Array.from(rules)) {
                if (rule instanceof CSSSupportsRule) {
                    walk(
                        rule.cssRules,
                        gated ||
                            rule.conditionText.includes("animation-timeline"),
                    );
                } else if (rule instanceof CSSMediaRule) {
                    walk(rule.cssRules, gated);
                } else if (rule instanceof CSSStyleRule) {
                    const tl = rule.style.getPropertyValue("animation-timeline");
                    if (tl.includes("--pane-scroll") && !gated) {
                        bad.push(rule.selectorText);
                    }
                }
            }
        };
        for (const sheet of Array.from(document.styleSheets)) {
            try {
                walk(sheet.cssRules, false);
            } catch {
                /* cross-origin */
            }
        }
        return bad;
    });
    expect(
        ungated,
        "--pane-scroll animation bound outside the @supports SDA gate",
    ).toEqual([]);
});

test("O-11 gate 6 — one grammar: no in-card sticky beyond .pane-header; nothing out-stacks --z-header", async ({
    page,
}) => {
    test.setTimeout(60_000);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    for (const view of ["Home", "Palettes", "Gradient"] as const) {
        if (view !== "Home") await openView(page, view);
        await expect(page.locator("main .pane-header").first()).toBeVisible();
        const rogue = await page.evaluate(() => {
            const zHeader = Number(
                getComputedStyle(document.documentElement).getPropertyValue(
                    "--z-index-header",
                ) || 35,
            );
            const bad: string[] = [];
            for (const el of Array.from(
                document.querySelectorAll<HTMLElement>("main [data-slot='card'] *"),
            )) {
                const cs = getComputedStyle(el);
                if (cs.position !== "sticky") continue;
                // the two sanctioned sticky headers: the pane header + the
                // picker plate's whole-header contraction strip (U-F9/§0.8)
                const isHeader =
                    el.classList.contains("pane-header") ||
                    el.classList.contains("picker-header");
                const z = Number(cs.zIndex) || 0;
                if (!isHeader) {
                    bad.push(
                        `sticky off-grammar: ${el.tagName}.${el.className}`,
                    );
                } else if (z > zHeader) {
                    bad.push(`sticky header over --z-header: z=${z}`);
                }
            }
            return bad;
        });
        expect(rogue, `${view}: the one-grammar law broken`).toEqual([]);
    }
});
