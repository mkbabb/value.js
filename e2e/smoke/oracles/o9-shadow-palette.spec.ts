import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * T.W3 W3-2 · O-9 — THE SHADOW-PALETTE ALL-CASES ORACLE (SYNTHESIS §6.1 O-9;
 * D9, the shadow-palette state grammar; owner rows T-13a/T-19).
 *
 * The rule (t-shadow-palette §3): wherever a surface's absent content is a
 * palette, the empty state displays a shadow palette — the ghost of the
 * artifact to come, at the artifact's own scale — in ALL cases; the text
 * plate captions the ghost, it never substitutes. Per host class this
 * asserts: ghost PRESENT + `aria-hidden` + a visible caption carrying the
 * text for AT ("never a bare text plate").
 *
 * THE MOTION LEG: the true-empty species is STILL by construction — motion
 * promises work; empty promises nothing (this is how the S.W5-6 "loading ≠
 * empty" doctrine survives the material's owner-ordered return, and how PRM
 * safety falls out for free). Every element of the ghost must compute
 * `animation-name: none`. The leg POLLS so a transient mount transition
 * settles out while a persistent animation (the violation class — an
 * inherited breath/shimmer) stays red.
 *
 * THE ERROR LEG (R7's surviving semantics): error ≠ empty — an error plate
 * never wears the ghost, never announces work that isn't happening.
 *
 * Host classes (the W3-2 roster): Extract live-k ghost · Mix ×2 ·
 * PaletteCardGrid (My Palettes + the empty Browse commons, ghost count 3).
 * Every leg judges PER PANE: the dual-pane views seat a sibling PalettesPane
 * (wearing its OWN legitimate D9 ghosts) beside the probed host, so a
 * main-wide count would conflate hosts.
 */

const MAIN = { name: "Color tool panes" } as const;

/** The visible pane Card hosting the named PaneHeader heading. */
function pane(page: Page, heading: string): Locator {
    return page
        .getByRole("main", MAIN)
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

/** Ghost present + `aria-hidden` on every instance. */
async function assertGhosts(scope: Locator, count: number): Promise<void> {
    const gs = ghosts(scope);
    await expect(gs).toHaveCount(count);
    for (const g of await gs.all()) {
        await expect(g).toHaveAttribute("aria-hidden", "true");
    }
}

/** THE MOTION LEG — every element of the ghost computes animation `none`. */
async function assertStill(ghost: Locator): Promise<void> {
    await expect
        .poll(
            () =>
                ghost.evaluate((root) =>
                    [root, ...Array.from(root.querySelectorAll("*"))]
                        .map((el) => ({
                            cls: (el as HTMLElement).className,
                            animation: getComputedStyle(el).animationName,
                        }))
                        .filter((probe) => probe.animation !== "none"),
                ),
            {
                message:
                    "O-9 MOTION leg: the true-empty ghost must be STILL by construction",
            },
        )
        .toEqual([]);
}

test("O-9 · Extract — the undeveloped plate wears the live-k ghost", async ({
    page,
}) => {
    await page.goto("/#/extract");
    const extractPane = pane(page, "Extract");
    await expect(extractPane).toBeVisible();

    // Ghost present at REST (the e43601c amputation stays reverted).
    await assertGhosts(extractPane, 1);
    const ghost = ghosts(extractPane).first();

    // The caption carries the text for AT — never a bare (or absent) plate.
    await expect(
        extractPane.getByText("· undeveloped plate — feed it an image ·"),
    ).toBeVisible();

    await assertStill(ghost);

    // THE LIVE-K LEG: the ghost re-segments under the k-slider — the
    // instrument shows its output shape before any image exists.
    const segs = ghost.locator(".shadow-seg");
    await expect(segs).toHaveCount(5);
    const kSlider = extractPane.getByRole("slider", {
        name: "Number of colors",
    });
    await kSlider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(segs).toHaveCount(6);
    await page.keyboard.press("ArrowLeft");
    await expect(segs).toHaveCount(5);
});

test("O-9 · Mix → Palettes — two ghosts (the count IS the copy), caption beneath", async ({
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

    await assertGhosts(mixPane, 2);
    await expect(mixPane.getByText("· nothing to mix ·")).toBeVisible();
    await expect(mixPane.getByText("No saved palettes yet.")).toBeVisible();
    await assertStill(ghosts(mixPane).first());
});

test("O-9 · PaletteCardGrid (My Palettes) — ghosts seat IN the grid cells", async ({
    page,
}) => {
    await page.goto("/");
    await openView(page, "Palettes");
    const palettesPane = pane(page, "My Palettes");
    await expect(palettesPane).toBeVisible();

    await assertGhosts(palettesPane, 3);
    // In-grid: absence occupies the same cells presence would — the ghosts
    // are CHILDREN of the grid, not an overlay beside it.
    await expect(
        palettesPane
            .locator('.palette-card-grid > [data-slot="shadow-palette"]')
            .filter({ visible: true }),
    ).toHaveCount(3);
    await expect(palettesPane.getByText("· empty plate ·")).toBeVisible();
    await expect(
        palettesPane.getByText("No saved palettes yet."),
    ).toBeVisible();
    await assertStill(ghosts(palettesPane).first());
});

test("O-9 · PaletteCardGrid (Browse, empty commons) — the second grid host", async ({
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

    await assertGhosts(browsePane, 3);
    await expect(browsePane.getByText("· the commons ·")).toBeVisible();
    await expect(
        browsePane.getByText("No published palettes here yet."),
    ).toBeVisible();
    await assertStill(ghosts(browsePane).first());
});

test("O-9 · error ≠ empty — the Browse error plate wears NO ghost (R7 surviving semantics)", async ({
    page,
}) => {
    // Unpinned, the same-origin `/palettes` GET resolves to SPA HTML → the
    // browse store reads a deterministic load FAILURE → the PLAIN error
    // register (untouched by D9): no ghost, no announced work.
    await page.goto("/#/browse");
    const browsePane = pane(page, "Browse");
    await expect(browsePane).toBeVisible();

    await expect(
        browsePane.getByRole("alert").filter({ visible: true }).first(),
    ).toBeVisible();
    await expect(
        browsePane.getByText("The commons is unreachable."),
    ).toBeVisible();
    await expect(ghosts(browsePane)).toHaveCount(0);

    // Positive control: the sibling My Palettes pane KEEPS its true-empty
    // ghosts — the error exemption is scoped to the erroring surface, never
    // a global amputation.
    await assertGhosts(pane(page, "My Palettes"), 3);
});
