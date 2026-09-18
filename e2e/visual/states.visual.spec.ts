// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · THE NON-ROUTE CAPTURE ARMS (R35, NG-11)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * R35 collects the surfaces a route matrix cannot reach BY URL AT ALL, each with
 * its banked ask. Its CURE-SHAPE LOCK is the boundary this file respects:
 * *"seeded storage, seeded fixtures and forced states are CAPTURE INPUTS, not
 * product edits — X.W1.b writes no `demo/` byte, per W1.md's own Triumvirate
 * trigger."* Every arm below is an init script, a route mock, or a click.
 *
 * ARM ROLL-CALL — each names the record that asked for it:
 *
 *  1 · seeded-storage        A-30 (MigratePalettesDialog): *"zero visual-matrix
 *                            coverage BY CONSTRUCTION (double-gated on
 *                            `savedPalettes.length > 0` + an interaction; no
 *                            route) … the visual-golden harness needs a
 *                            seeded-storage arm, or every gated modal stays
 *                            permanently unwitnessed."*
 *                            U-9 ≡ SH-28 ≡ A-3 want the same seed for a
 *                            populated `/#/palettes`: *"without it this
 *                            component's entire defective surface is invisible
 *                            to the visual matrix."*
 *
 *  2 · seeded-fixture        PCS-11 / K-8: the held-state fixture ALREADY EXISTS
 *                            and the e2e spec already uses it
 *                            (`routeBrowsePalettesDelayed`); *"the real gap is
 *                            that the VISUAL matrix never consumes the
 *                            fixture."* L-9's "the matrix needs a fetch-delay
 *                            shim" was KILLED as prescribed — nothing new is
 *                            built here, the existing fixture is imported.
 *
 *  3 · overlay               A-32 (FlagReportDialog): *"the X-W1 visual-golden
 *                            harness must capture OVERLAY STATES … not only
 *                            routes"*; 0 of 60 captures. MCP-9: *"two popovers
 *                            deep, zero of 60 shots."* The dock's view-select
 *                            overlay is the reachable-without-seeding member of
 *                            that class and is the one captured here; see
 *                            §OPEN below for the ones that are not.
 *
 *  4 · forced-state          DSL-2: the forced-latch arm. The API-availability
 *                            latch is driven to `unavailable` by aborting the
 *                            transport at the network layer — the same signal
 *                            `availability.ts` latches on (*"first NETWORK-level
 *                            failure (fetch rejection …) trips the latch"*), so
 *                            the lamp's designed `unavailable` face and the
 *                            per-surface ApiOfflineChip are on screen.
 *
 *  5 · param-sweep           CNL-5: *"the parameterised `?space=` / `?color=`
 *                            sweep"* — the surviving kernel of the killed L-14.
 *                            R37's Katex residue 9 / D-4 rides it: *"does
 *                            `.font-display` paint Fraunces at these five sites
 *                            … Ride the X-W1 matrix with the parameterised
 *                            space/color sweep."* The URL shape is the product's
 *                            own: `#/?space=…&color=…`, parsed by
 *                            `demo/color-picker/composables/boot/hydrate.ts`,
 *                            which requires BOTH keys or falls through.
 *
 * ─── §OPEN — what these arms do NOT discharge, said rather than implied ──────
 *
 * A-32's dialog itself is double-gated on an authenticated session AND a
 * moderation action, and DSL-2's `misconfigured` lamp face is unreachable under
 * this harness by construction: it fires only when `VITE_API_URL` is UNSET on a
 * loopback origin, and `visual.config.ts` sets `VITE_API_URL` precisely so no
 * cross-origin production fetch perturbs a golden (inv-K-5). Those two cells are
 * carried OPEN in
 * `docs/tranches/X/evidence/w1/visual/R54-RESIDUE-WITNESS.md` — R54's rule is
 * that a residue-witness cell is discharged by a captured frame with its
 * modality labelled, *"or it is carried forward still open. Silence at close is
 * not discharge."*
 */
import { routeBrowsePalettesDelayed } from "../smoke/fixtures/browse-palettes";
import { SCHEMES } from "./census";
import {
    gotoRoute,
    parameterisedUrl,
    seedSavedPalettes,
    seedScheme,
    requireQuiescence,
} from "./capture";
import { visualTest as test, expect } from "./fixtures";

const DESKTOP = { width: 1024, height: 768 };
const MOBILE = { width: 390, height: 844 };

// ── 1 · SEEDED STORAGE ───────────────────────────────────────────────────────

test.describe("seeded-storage", () => {
    for (const scheme of SCHEMES) {
        test(`palettes populated · 1024 · ${scheme}`, async ({ page, visual }) => {
            await seedSavedPalettes(page.context());
            await seedScheme(page.context(), scheme);
            await page.emulateMedia({ colorScheme: scheme });
            await page.setViewportSize(DESKTOP);

            await gotoRoute(page, "/#/palettes");

            // The seed must be VISIBLE, or this arm photographs the empty state
            // under a populated name — the false green R35 exists to end.
            await expect(
                page.getByText("Seeded Palette 1").first(),
                "the seeded palette store did not reach the Palettes pane",
            ).toBeVisible();

            await visual.shot(page, {
                arm: "seeded-storage",
                subject: "palettes-populated",
                pane: "both",
                viewport: "1024",
                scheme,
                fidelity: "real",
                capture: DESKTOP,
            });
        });
    }

    test("palettes populated · 390 · light", async ({ page, visual }) => {
        await seedSavedPalettes(page.context());
        await seedScheme(page.context(), "light");
        await page.emulateMedia({ colorScheme: "light" });
        await page.setViewportSize(MOBILE);

        await gotoRoute(page, "/#/palettes");
        await expect(page.getByText("Seeded Palette 1").first()).toBeVisible();

        await visual.shot(page, {
            arm: "seeded-storage",
            subject: "palettes-populated",
            pane: "palettes",
            viewport: "390",
            scheme: "light",
            fidelity: "real",
            capture: MOBILE,
        });
    });
});

// ── 2 · SEEDED FIXTURE (the one the visual matrix never consumed) ────────────

test.describe("seeded-fixture", () => {
    for (const scheme of SCHEMES) {
        test(`browse mid-fetch · 1024 · ${scheme}`, async ({ page, visual }) => {
            // Hold `GET /palettes` open far longer than the capture takes, so the
            // developing-plate state is deterministically on screen for the whole
            // stabilisation loop rather than for a network-timing window.
            await routeBrowsePalettesDelayed(page, 120_000);
            await seedScheme(page.context(), scheme);
            await page.emulateMedia({ colorScheme: scheme });
            await page.setViewportSize(DESKTOP);

            // NOT `gotoRoute`: `networkidle` never arrives while the fixture holds
            // the request open, which is the entire point of the fixture.
            await page.goto("/#/browse", { waitUntil: "commit", timeout: 60_000 });
            await page.waitForSelector('main[aria-label="Color tool panes"]', {
                state: "visible",
                timeout: 30_000,
            });
            await expect(
                page.locator('[data-slot="palette-card-skeleton"]').first(),
                "the delayed-route fixture did not hold the developing-plate state",
            ).toBeVisible();
            await requireQuiescence(page, test.info().title);

            await visual.shot(page, {
                arm: "seeded-fixture",
                subject: "browse-mid-fetch",
                pane: "both",
                viewport: "1024",
                scheme,
                fidelity: "real",
                capture: DESKTOP,
            });
        });
    }
});

// ── 3 · OVERLAY STATE ────────────────────────────────────────────────────────

test.describe("overlay", () => {
    for (const scheme of SCHEMES) {
        test(`dock view-select open · 1024 · ${scheme}`, async ({ page, visual }) => {
            await seedScheme(page.context(), scheme);
            await page.emulateMedia({ colorScheme: scheme });
            await page.setViewportSize(DESKTOP);

            await gotoRoute(page, "/#/");

            const trigger = page.getByRole("combobox", { name: "Select view" });
            await expect(trigger).toBeVisible();
            await trigger.click();
            // The overlay must actually be open. An overlay arm that photographs a
            // closed dock is the 0-of-60 hole wearing a new name.
            await expect(
                page.getByRole("listbox").or(page.locator('[role="menu"]')).first(),
                "the dock view-select overlay did not open",
            ).toBeVisible();
            await requireQuiescence(page, test.info().title);

            await visual.shot(page, {
                arm: "overlay",
                subject: "dock-view-select-open",
                pane: "both",
                viewport: "1024",
                scheme,
                fidelity: "real",
                capture: DESKTOP,
            });
        });
    }
});

// ── 4 · FORCED STATE (DSL-2's forced latch) ─────────────────────────────────

test.describe("forced-state", () => {
    test("api-unavailable latch · 1024 · light", async ({ page, visual }) => {
        // Abort the transport at the NETWORK layer — an HTTP status would not do:
        // `availability.ts` latches on a fetch REJECTION ("never an HTTP status").
        await page.context().route(
            (url) =>
                !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
                !/\.\w+$/.test(url.pathname) &&
                /(^|\/)(palettes|colors|sessions)(\/|$)/.test(url.pathname),
            (route) => route.abort("connectionrefused"),
        );
        await seedScheme(page.context(), "light");
        await page.emulateMedia({ colorScheme: "light" });
        await page.setViewportSize(DESKTOP);

        await page.goto("/#/browse", { waitUntil: "commit", timeout: 60_000 });
        await page.waitForSelector('main[aria-label="Color tool panes"]', {
            state: "visible",
            timeout: 30_000,
        });
        await requireQuiescence(page, test.info().title);

        await visual.shot(page, {
            arm: "forced-state",
            subject: "api-unavailable-latch",
            pane: "both",
            viewport: "1024",
            scheme: "light",
            fidelity: "real",
            capture: DESKTOP,
        });
    });
});

// ── 5 · PARAMETERISED SWEEP (CNL-5; R37 residue 9 / D-4 rides it) ───────────

const SWEEP = [
    { space: "oklch", color: "oklch(0.72 0.19 28)" },
    { space: "hsl", color: "hsl(210 90% 45%)" },
    { space: "rgb", color: "rgb(22 163 74)" },
] as const;

test.describe("param-sweep", () => {
    for (const cell of SWEEP) {
        test(`${cell.space} · 1024 · light`, async ({ page, visual }) => {
            await seedScheme(page.context(), "light");
            await page.emulateMedia({ colorScheme: "light" });
            await page.setViewportSize(DESKTOP);

            await gotoRoute(page, parameterisedUrl("/#/", cell.color, cell.space));

            await visual.shot(page, {
                arm: "param-sweep",
                subject: `space-${cell.space}`,
                pane: "both",
                viewport: "1024",
                scheme: "light",
                fidelity: "real",
                capture: DESKTOP,
            });
        });
    }
});
