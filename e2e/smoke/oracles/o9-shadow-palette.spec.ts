import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { openView, mainPane } from "../fixtures/dock";

/**
 * O-9 — THE EMPTY-STATE CENSUS, RE-AIMED (T.W6.5 · Lane S — R12, the owner
 * overrule of the W3-2/D9 as-filler grammar; MANDATE §0.6 t33-audit-07/08/
 * 11/12). The census DISCIPLINE survives (T.md §4 R12: "the oracle
 * re-points, never deletes"); its referents are the redesigned species +
 * the true-empty states.
 *
 * THE RULE, post-R12:
 * · TRUE EMPTY speaks the EmptyState invitation ALONE — the watercolor
 *   dot TRIO + DASHES (the R.W4 ghost trio, N-3 re-aimed: the owner's
 *   ruling picks the dot register at true-empty) above the caption; a
 *   "no palettes found" plate is NEVER preceded by ghost cards (zero
 *   ShadowPalette-as-filler at every empty-host class).
 * · The ShadowPalette species has ONE seat — the standing INSTRUMENT face
 *   (Extract's k-threaded undeveloped plate) — wearing the genesis
 *   `ec1b200` register: card-true material, solid hairline, muted blocks,
 *   and a LIVING staggered pulse (i × 0.12s). THE MOTION LEG RE-AIMS: the
 *   instrument face pulses LIVE; under prefers-reduced-motion the global
 *   PRM guard (animations.css) degrades it static — both asserted.
 *
 * R7's SURVIVING SEMANTICS (unchanged — announcement, NOT motion): the
 * ghost is `aria-hidden`, carries NO role="status" and NO "Loading" label
 * (a shimmering aria-hidden plate does not lie to AT); the host's caption
 * carries the text. error ≠ empty — an error plate never wears the ghost,
 * never the trio, never announces work that isn't happening.
 *
 * Host classes: Extract (instrument face) · Mix · PaletteCardGrid
 * (My Palettes + the empty Browse commons). Every leg judges PER PANE:
 * the dual-pane views seat a sibling PalettesPane beside the probed host,
 * so a main-wide count would conflate hosts.
 *
 * X.W7.g RE-RULING (W7.md G20 · fold S-20 — ONE re-ruling closes ES-4,
 * ES-19, SP-7/SP-25 and SP-34 together, never separately):
 * · G20 — the plate's premise INVERTS: the seat survives, but as the settled
 *   card's collapsed silhouette (strip + meta row), no longer a 1:1 replica
 *   of the expanded result. The live-k leg now asserts the plate re-segments
 *   WITHOUT growing — its height at k = 16 equals its height at k = 5 — and
 *   the `· undeveloped plate — feed it an image ·` caption is GONE (OM-15
 *   §1.A #1 KILL): the drop zone is the pane's one empty affordance.
 * · ES-19 / SP-25 — every leg asserts the PUBLISHED seams (`data-slot`),
 *   never glass-ui privates (`[data-variant="ghost"]`,
 *   `.watercolor-ghost-stroke`) nor the plate's scoped classes (`.shadow-seg`).
 * · ES-4 — `dots` was a configuration axis no consumer ever set; the axis is
 *   deleted and the trio is simply the empty plate's ghost, so no leg pins it.
 * · SP-34 — the strip keys by position (`:key="i"`), never by `count`: a k
 *   step adds or removes one cell and the surviving cells keep their stagger
 *   delay, which the live-k leg asserts across the step.
 * · Copy is not this oracle's property (G19 owns the strings): the legs read
 *   roles and seams, so an abrogated caption cannot invert them.
 */


/** The visible pane Card hosting the named PaneHeader heading. */
function pane(page: Page, heading: string): Locator {
    return mainPane(page)
        .locator('[data-slot="card"]')
        .filter({
            has: page.getByRole("heading", { name: heading, exact: true }),
        })
        .filter({ visible: true })
        .first();
}

/** Visible shadow-palette ghosts inside a scope (dual layout slots mount a
 *  display:none twin — count only the live one). */
function ghosts(scope: Locator): Locator {
    return scope
        .locator('[data-slot="shadow-palette"]')
        .filter({ visible: true });
}

/** THE FILLER SWEEP — zero ShadowPalette-as-filler in the scoped host. */
async function assertNoFillers(scope: Locator): Promise<void> {
    await expect(ghosts(scope)).toHaveCount(0);
}

/** THE TRIO LEG — the EmptyState's published ghost row at true-empty:
 *  one aria-hidden `empty-state-trio` seat holding its three dots. The
 *  dots' own paint (glass-ui's ghost variant) is the producer's contract,
 *  not this oracle's (ES-19). */
async function assertTrio(scope: Locator): Promise<void> {
    const trio = scope
        .locator('[data-slot="empty-state-trio"]')
        .filter({ visible: true });
    await expect(trio).toHaveCount(1);
    await expect(trio).toHaveAttribute("aria-hidden", "true");
    await expect(trio.locator(":scope > *")).toHaveCount(3);
}

/** The plate's strip cells, by the component's published seam. */
function cells(ghost: Locator): Locator {
    return ghost.locator('[data-slot="shadow-palette-cell"]');
}

/** THE LIVING LEG — the instrument face pulses: every strip cell computes
 *  the pulse animation, staggered i × 0.12s (the cascading shimmer). */
async function assertPulsesLive(ghost: Locator): Promise<void> {
    const probes = await ghost.evaluate((root) =>
        Array.from(root.querySelectorAll('[data-slot="shadow-palette-cell"]')).map((el) => {
            const cs = getComputedStyle(el);
            return {
                name: cs.animationName,
                duration: parseFloat(cs.animationDuration),
                iteration: cs.animationIterationCount,
                delay: parseFloat(cs.animationDelay),
            };
        }),
    );
    expect(probes.length).toBeGreaterThan(0);
    for (const [i, p] of probes.entries()) {
        expect(p.name, "the pulse keyframe rides every cell").toContain(
            "pulse",
        );
        expect(p.iteration).toBe("infinite");
        expect(p.duration).toBeGreaterThanOrEqual(1);
        expect(p.delay).toBeCloseTo(i * 0.12, 2);
    }
}

/** THE PRM LEG — under prefers-reduced-motion the global guard collapses
 *  the pulse (duration 0.01ms, one iteration): static by construction. */
async function assertPrmStatic(ghost: Locator): Promise<void> {
    const probes = await ghost.evaluate((root) =>
        Array.from(root.querySelectorAll('[data-slot="shadow-palette-cell"]')).map((el) => {
            const cs = getComputedStyle(el);
            return {
                duration: parseFloat(cs.animationDuration),
                iteration: cs.animationIterationCount,
            };
        }),
    );
    expect(probes.length).toBeGreaterThan(0);
    for (const p of probes) {
        expect(p.duration, "PRM collapses the pulse duration").toBeLessThan(
            0.1,
        );
        expect(p.iteration).toBe("1");
    }
}

test("O-9 · Extract — the instrument face: live-k ghost that re-segments without growing, LIVING pulse, PRM-static", async ({
    page,
}) => {
    await page.goto("/#/extract");
    const extractPane = pane(page, "Extract");
    await expect(extractPane).toBeVisible();

    // The standing-instrument seat: ghost present at REST, aria-hidden —
    // and NO announcement (R7: no role=status, no "Loading" label). No
    // caption rides it (G20: the drop zone is the pane's empty affordance).
    const gs = ghosts(extractPane);
    await expect(gs).toHaveCount(1);
    const ghost = gs.first();
    await expect(ghost).toHaveAttribute("aria-hidden", "true");
    await expect(ghost).not.toHaveAttribute("role", "status");
    await expect(extractPane.getByText(/undeveloped plate/i)).toHaveCount(0);

    // THE LIVING LEG: the genesis register pulses — a staggered cascade,
    // i × 0.12s.
    await assertPulsesLive(ghost);

    // THE LIVE-K LEG, re-ruled: the ghost re-segments under the k-slider
    // (the instrument shows its output shape before any image exists) and
    // its HEIGHT does not follow k — at the slider's max (16) the plate is
    // exactly as tall as at the default (5). Position-keyed cells keep their
    // stagger across a step (SP-34).
    await expect(cells(ghost)).toHaveCount(5);
    const restHeight = (await ghost.boundingBox())!.height;
    const kSlider = extractPane.getByRole("slider", {
        name: "Number of colors",
    });
    await kSlider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(cells(ghost)).toHaveCount(6);
    await assertPulsesLive(ghost);
    await page.keyboard.press("End");
    await expect(cells(ghost)).toHaveCount(16);
    expect((await ghost.boundingBox())!.height).toBe(restHeight);
    for (let k = 16; k > 5; k--) await page.keyboard.press("ArrowLeft");
    await expect(cells(ghost)).toHaveCount(5);

    // THE PRM LEG: reduced motion degrades the living register static —
    // for free, via the global guard.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await assertPrmStatic(ghost);
    await page.emulateMedia({ reducedMotion: null });
});

test("O-9 · Mix → Palettes — TRUE EMPTY: the trio + dashes, zero fillers", async ({
    page,
}) => {
    await page.goto("/");
    await openView(page, "Mix");
    const mixPane = pane(page, "Mix");
    await expect(mixPane).toBeVisible();

    // The pill tab (role=group + aria-pressed buttons).
    await mixPane
        .getByRole("button", { name: "Palettes", exact: true })
        .click();

    await expect(mixPane.getByRole("status").filter({ visible: true }).first()).toBeVisible();
    await assertTrio(mixPane);
    await assertNoFillers(mixPane);
});

test("O-9 · PaletteCardGrid (My Palettes) — TRUE EMPTY: the trio + dashes, zero fillers", async ({
    page,
}) => {
    await page.goto("/");
    await openView(page, "Palettes");
    const palettesPane = pane(page, "My Palettes");
    await expect(palettesPane).toBeVisible();

    await assertTrio(palettesPane);
    await assertNoFillers(palettesPane);
});

test("O-9 · PaletteCardGrid (Browse, empty commons) — TRUE EMPTY: the trio + dashes, zero fillers", async ({
    page,
}) => {
    // The walk.spec envelope pin: same-origin `/palettes` resolves SPA HTML
    // under e2e (a load FAILURE) — fulfill a shape-correct EMPTY page so the
    // TRUE-EMPTY branch (not the error plate) is deterministically on screen.
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [],
                    total: 0,
                    limit: 50,
                    offset: 0,
                }),
            }),
    );
    await page.goto("/#/browse");
    const browsePane = pane(page, "Browse");
    await expect(browsePane).toBeVisible();

    await assertTrio(browsePane);
    await assertNoFillers(browsePane);
});

test("O-9 · error ≠ empty — the Browse error plate wears NO ghost and NO trio (R7 surviving semantics)", async ({
    page,
}) => {
    // Unpinned, the same-origin `/palettes` GET resolves to SPA HTML → the
    // browse store reads a deterministic load FAILURE → the PLAIN error
    // register (untouched by R12): no ghost, no trio, no announced work.
    await page.goto("/#/browse");
    const browsePane = pane(page, "Browse");
    await expect(browsePane).toBeVisible();

    await expect(
        browsePane.getByRole("alert").filter({ visible: true }).first(),
    ).toBeVisible();
    await assertNoFillers(browsePane);
    await expect(
        browsePane.locator('[data-slot="empty-state-trio"]'),
    ).toHaveCount(0);

    // Positive control: the sibling My Palettes pane KEEPS its true-empty
    // trio — the error exemption is scoped to the erroring surface, never
    // a global amputation.
    await assertTrio(pane(page, "My Palettes"));
});
