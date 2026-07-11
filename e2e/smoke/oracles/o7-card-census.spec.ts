import { test, expect } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * T.W3 W3-1 · O-7 — THE CARD-MATERIAL CENSUS, ARMED (SYNTHESIS §6.1 O-7; the
 * W0-5 scaffold `o7-card-census-scaffold.spec.ts` armed in place at W3).
 *
 * The census the T-24 gate W5-2 never had: every pane + named fixture resolves
 * to its ONE material RUNG (MEMBERSHIP, not a fixed alpha), both schemes.
 * The D1 ladder (t-card-material §3):
 *
 *   1 PLATE  — the picker's exact register: `tier="resting"` + cartoon stamp
 *              + grain. ALL pane cards join (the wash fleet dies).
 *   2 WELL   — an OPAQUE tone-step of the plate, NO backdrop-blur — the ONE
 *              `--well-bg` token (interim; producer rung = packet P3).
 *   3 CHROME — true floating glass (dock, overlays, eyedropper — Q4).
 *   4 STAGE  — the named near-black pair `--stage`/`--on-stage-chrome`
 *              (photographic grounds; conditionally-mounted sites are gated by
 *              the source-level raw-black/white grep at the wave gate).
 *
 * T.W6.5-P (T-34 · t33-audit-02, owner verbatim "use a glass-ui veil card,
 * too") — THE VEIL FIXTURE ROW: the sliders console re-seated from the
 * rung-2 WELL onto the producer `<Card surface="veil" tier="quiet">` (the
 * owner's own word re-opened the RATIFIED Q4 on the material axis —
 * encoded, never silent). A `data-surface="veil"` card is a NESTED IN-PLATE
 * FIXTURE, not a pane plate: the rung-1 sweep exempts it and the veil row
 * asserts its OWN identity POSITIVELY instead (quiet tier · rim/border
 * STRIPPED · the quiet backdrop-blur that IS the veil's definition — the
 * producer recipe, so the RC-3 no-blur clause is the WELL's rung law, not
 * this fixture's · seated INSIDE a resting plate, never a pane root · off
 * the well token). The gate is re-aimed, never weakened.
 *
 * Membership is asserted by IDENTITY, never by a fixed alpha: Cards via the
 * producer's `data-tier` stamp; wells by byte-equality of the computed
 * `background-color` against the same-page-resolved `--well-bg` token, plus
 * `backdrop-filter: none` (the no-blur half of the rung definition).
 *
 * Views cover the 7 user-mode pane hosts (About via Home). AdminPane and
 * ConfigSliderPane (Atmosphere/Blob, admin-mode views) are session-gated and
 * carry the byte-identical one-attribute `<Card tier="resting">` stamp
 * (census A7 discipline: a shared component prop, not a per-site recipe —
 * grep-verified at the wave gate).
 *
 * The t-mobile F-8 390-frame: the same membership walk re-runs at 390×844 and
 * attaches captures for the eye-judgment over the aurora's brightest band.
 */

const VIEWS = [
    "Home",
    "Palettes",
    "Browse",
    "Extract",
    "Mix",
    "Generate",
    "Gradient",
] as const;

/** The per-view SETTLE signal (W3-3 hardening — the O-11 gate-5 vacuity class):
 *  "a card is visible" is TRUE of the PREVIOUS view across the pane swap, so a
 *  census could walk a view that never mounted. Each view settles on its OWN
 *  pane heading (the walk.spec-proven locators) before the census reads. */
const VIEW_HEADING: Record<(typeof VIEWS)[number], string> = {
    Home: "About the color spaces", // the About pane heading, mounted at boot
    Palettes: "My Palettes",
    Browse: "Browse",
    Extract: "Extract",
    Mix: "Mix",
    Generate: "Generate",
    Gradient: "Gradient",
};

/** Resolve the ladder's demo-owned rung tokens in-page (identity referents). */
async function resolveRungTokens(page: import("@playwright/test").Page) {
    return page.evaluate(() => {
        const probe = document.createElement("div");
        probe.style.cssText =
            "position:absolute;visibility:hidden;pointer-events:none";
        document.body.appendChild(probe);
        probe.style.backgroundColor = "var(--well-bg)";
        const well = getComputedStyle(probe).backgroundColor;
        probe.style.backgroundColor = "var(--stage)";
        const stage = getComputedStyle(probe).backgroundColor;
        probe.style.backgroundColor = "var(--card-edge)";
        const cardEdge = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return { well, stage, cardEdge };
    });
}

/** Census one mounted view: every Card's rung stamp + the named fixtures. */
async function censusView(page: import("@playwright/test").Page) {
    return page.evaluate(() => {
        const main = document.querySelector("main");
        const cards = Array.from(
            main?.querySelectorAll<HTMLElement>('[data-slot="card"]') ?? [],
        )
            // T-34: veil cards are NESTED IN-PLATE FIXTURES with their own
            // positive row below — the rung-1 plate sweep exempts exactly
            // the surface the veil row asserts (no silent hole: a veil card
            // is REQUIRED to sit inside a resting plate by that row).
            .filter((el) => el.dataset.surface !== "veil")
            .map((el) => ({
                tier: el.dataset.tier ?? "(none)",
                grain: el.dataset.grain ?? "(none)",
                shadow: getComputedStyle(el).boxShadow !== "none",
            }));
        // T.W6.5-P (T-34) — the VEIL fixture census: every mounted veil card
        // (today: the picker's sliders console) carries the producer veil
        // identity and seats INSIDE a rung-1 plate.
        const veilFixtures = Array.from(
            main?.querySelectorAll<HTMLElement>(
                '[data-slot="card"][data-surface="veil"]',
            ) ?? [],
        ).map((el) => {
            const cs = getComputedStyle(el);
            const host = el.parentElement?.closest<HTMLElement>(
                '[data-slot="card"]',
            );
            return {
                tier: el.dataset.tier ?? "(none)",
                bg: cs.backgroundColor,
                backdrop: cs.backdropFilter || "none",
                shadow: cs.boxShadow,
                borderWidth: Number.parseFloat(cs.borderTopWidth) || 0,
                hostTier: host?.dataset.tier ?? "(none)",
            };
        });
        const fixture = (sel: string) => {
            const el = main?.querySelector<HTMLElement>(sel);
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {
                bg: cs.backgroundColor,
                backdrop: cs.backdropFilter || "none",
                shadow: cs.boxShadow,
            };
        };
        // W3-3 · the SEATED SEARCH FIELD (T-12, the register law: fields on
        // paper wear paper). Membership by identity like every other row —
        // plus the two seat-specific laws the interim carries: the 24rem dock
        // cap is DEAD (t-mobile F-7: 78px right-rag at 1440 AND 768) and the
        // voice is content-class (prose inherits the plate's text voice; mono
        // is an explicit per-field opt-in only).
        const searchSeat = (() => {
            // The pane mounts in BOTH responsive layout slots (the
            // off-breakpoint copy is display:none) — census the visible seat.
            const el =
                Array.from(
                    main?.querySelectorAll<HTMLElement>(".search-seated") ?? [],
                ).find((e) => e.getClientRects().length > 0) ?? null;
            if (!el) return null;
            const cs = getComputedStyle(el);
            const field = el.querySelector<HTMLElement>(".input-bar-field");
            const column = el.parentElement;
            const colCs = column ? getComputedStyle(column) : null;
            const columnWidth = column
                ? column.clientWidth -
                  parseFloat(colCs!.paddingLeft) -
                  parseFloat(colCs!.paddingRight)
                : 0;
            return {
                bg: cs.backgroundColor,
                backdrop: cs.backdropFilter || "none",
                maxWidth: cs.maxWidth,
                // The used border-width rounds to device pixels (1.5px
                // specified → 1px at dpr 1, same as the dashed-well) — the
                // identity half is the STYLE + the `--card-edge` token color.
                edgeStyle: cs.borderTopStyle,
                edgeWidth: parseFloat(cs.borderTopWidth),
                edgeColor: cs.borderTopColor,
                stamp: cs.boxShadow !== "none",
                fieldFont: field ? getComputedStyle(field).fontFamily : "",
                width: el.getBoundingClientRect().width,
                columnWidth,
            };
        })();
        return {
            cards,
            veilFixtures,
            dashedWell: fixture(".dashed-well"),
            mixPlate: fixture(".mix-plate"),
            perceivedPlate: fixture('[role="img"][aria-label^="Perceived-space"]'),
            paletteCard: fixture('[role="article"].bg-well'),
            searchSeat,
        };
    });
}

for (const scheme of ["light", "dark"] as const) {
    test(`O-7 census — every pane a rung-1 PLATE, every named fixture on its rung (${scheme})`, async ({
        page,
    }, testInfo) => {
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
        const tokens = await resolveRungTokens(page);

        for (const view of VIEWS) {
            if (view !== "Home") await openView(page, view);
            // Settle on THIS view's own pane heading (never just "a card" —
            // that is true of the previous view across the swap), then on a
            // card being visible.
            await expect(
                page
                    .getByRole("main", { name: "Color tool panes" })
                    .getByRole("heading", { name: VIEW_HEADING[view] })
                    .filter({ visible: true })
                    .last(),
            ).toBeVisible();
            await expect(
                page.locator('main [data-slot="card"]').first(),
            ).toBeVisible();

            const census = await censusView(page);

            // RUNG-1 MEMBERSHIP: every mounted pane/picker Card resolves to
            // the picker's register — tier=resting, grain on, stamp present.
            expect(
                census.cards.length,
                `${view}: census walked zero cards`,
            ).toBeGreaterThan(0);
            for (const card of census.cards) {
                expect
                    .soft(card.tier, `${view} (${scheme}): a card off rung-1`)
                    .toBe("resting");
                expect
                    .soft(card.grain, `${view} (${scheme}): grain not on`)
                    .toBe("true");
                expect
                    .soft(card.shadow, `${view} (${scheme}): stamp missing`)
                    .toBe(true);
            }

            // THE VEIL FIXTURE ROW (T.W6.5-P · T-34 — the owner's Q4
            // material re-cut, positively asserted): the picker's sliders
            // console is the ONE veil seat; the picker pane mounts on Home
            // by construction (presence asserted there), and WHEREVER a veil
            // card mounts it must wear the producer veil identity (quiet
            // tier · rim/border stripped · the quiet blur that IS the veil's
            // definition), sit INSIDE a rung-1 plate (an in-plate fixture,
            // never a pane root), and be OFF the well token (the re-seat is
            // real, not a re-paint).
            if (view === "Home") {
                expect(
                    census.veilFixtures.length,
                    `${view} (${scheme}): the veil console fixture is absent`,
                ).toBeGreaterThan(0);
            }
            for (const veil of census.veilFixtures) {
                expect
                    .soft(veil.tier, `${view} (${scheme}): veil off the quiet rung`)
                    .toBe("quiet");
                expect
                    .soft(
                        veil.backdrop,
                        `${view} (${scheme}): the veil's quiet blur is dead (its own definition)`,
                    )
                    .not.toBe("none");
                expect
                    .soft(
                        veil.shadow,
                        `${view} (${scheme}): the veil carries a rim/shadow (stripped by design)`,
                    )
                    .toBe("none");
                expect
                    .soft(
                        veil.borderWidth,
                        `${view} (${scheme}): the veil carries a border (stripped by design)`,
                    )
                    .toBe(0);
                expect
                    .soft(
                        veil.hostTier,
                        `${view} (${scheme}): the veil is not seated inside a resting plate`,
                    )
                    .toBe("resting");
                expect
                    .soft(
                        veil.bg,
                        `${view} (${scheme}): the veil still wears the well token (the re-seat is a re-paint)`,
                    )
                    .not.toBe(tokens.well);
            }

            // RUNG-2 MEMBERSHIP (token identity + the no-blur half):
            for (const [name, fx] of Object.entries({
                dashedWell: census.dashedWell,
                mixPlate: census.mixPlate,
                perceivedPlate: census.perceivedPlate,
                paletteCard: census.paletteCard,
            })) {
                if (!fx) continue; // conditionally-mounted fixture absent here
                expect
                    .soft(fx.bg, `${view} (${scheme}): ${name} off the well token`)
                    .toBe(tokens.well);
                expect
                    .soft(
                        fx.backdrop,
                        `${view} (${scheme}): ${name} carries backdrop-blur (RC-3)`,
                    )
                    .toBe("none");
            }
            // The perceived-space plate's nested double-stamp is DEAD (T-18).
            if (census.perceivedPlate) {
                expect
                    .soft(
                        census.perceivedPlate.shadow,
                        `${view} (${scheme}): the nested full cartoon stamp resurrected`,
                    )
                    .toBe("none");
            }

            // W3-3 · THE O-7 SEAT ROW (T-12): the two user-walkable seats
            // (Palettes, Browse) MUST wear the seated register; AdminPane is
            // session-gated and carries the byte-identical one-class stamp
            // (census A7 discipline — grep-verified at the wave gate).
            if (view === "Palettes" || view === "Browse") {
                expect(
                    census.searchSeat,
                    `${view} (${scheme}): the search field is not seated`,
                ).toBeTruthy();
            }
            if (census.searchSeat) {
                const seat = census.searchSeat;
                // Rung-2 membership by token identity + the no-blur half —
                // the same paper as the dashed-well beside it.
                expect
                    .soft(seat.bg, `${view} (${scheme}): seat off the well token`)
                    .toBe(tokens.well);
                expect
                    .soft(
                        seat.backdrop,
                        `${view} (${scheme}): the seat carries backdrop-blur (RC-3)`,
                    )
                    .toBe("none");
                // The drawn ink edge (ONE `--card-edge` hairline family) + the
                // chip-scale stamp — the elevation PaletteCard rides.
                expect
                    .soft(
                        seat.edgeStyle,
                        `${view} (${scheme}): the ink edge is gone`,
                    )
                    .toBe("solid");
                expect
                    .soft(
                        seat.edgeWidth,
                        `${view} (${scheme}): the ink edge is invisible`,
                    )
                    .toBeGreaterThanOrEqual(1);
                expect
                    .soft(
                        seat.edgeColor,
                        `${view} (${scheme}): the edge off the card-edge token`,
                    )
                    .toBe(tokens.cardEdge);
                expect
                    .soft(seat.stamp, `${view} (${scheme}): the cartoon stamp missing`)
                    .toBe(true);
                // The 24rem dock cap is DEAD: a seated field runs its host
                // column (t-mobile F-7's 78px right-rag class).
                expect
                    .soft(seat.maxWidth, `${view} (${scheme}): the dock cap survived`)
                    .toBe("none");
                expect
                    .soft(
                        Math.abs(seat.width - seat.columnWidth),
                        `${view} (${scheme}): the seat rags short of its column (${seat.width} vs ${seat.columnWidth})`,
                    )
                    .toBeLessThanOrEqual(1);
                // Voice = content-class: prose speaks the plate's text voice;
                // mono is opt-in only (the baked `--font-mono` is dead here).
                expect
                    .soft(
                        seat.fieldFont,
                        `${view} (${scheme}): the prose field wears the terminal voice`,
                    )
                    .not.toMatch(/fira|monospace/i);
            }

            // The W3-3 gate's judged-beside frame: seat + dashed-well + pane
            // card in ONE capture, per scheme (the eye-judgment record).
            if (view === "Palettes") {
                await testInfo.attach(`o7-seat-beside-well-${scheme}`, {
                    body: await page.screenshot(),
                    contentType: "image/png",
                });
            }
        }
    });
}

test("O-7 seat row · t-mobile F-7 — the 768 frame: the cap class stays dead where it bit (captures attached)", async ({
    page,
}, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    await openView(page, "Palettes");
    await expect(
        page
            .getByRole("main", { name: "Color tool panes" })
            .getByRole("heading", { name: "My Palettes" })
            .filter({ visible: true })
            .last(),
    ).toBeVisible();
    await expect(
        page.locator("main .search-seated").filter({ visible: true }).last(),
    ).toBeVisible();

    for (const scheme of ["light", "dark"] as const) {
        await page.evaluate(
            (s) => document.documentElement.classList.toggle("dark", s === "dark"),
            scheme,
        );
        const census = await censusView(page);
        const seat = census.searchSeat;
        expect(seat, `768 (${scheme}): the search field is not seated`).toBeTruthy();
        expect(
            Math.abs(seat!.width - seat!.columnWidth),
            `768 (${scheme}): the F-7 right-rag reproduced (${seat!.width} vs ${seat!.columnWidth})`,
        ).toBeLessThanOrEqual(1);
        // The judged-beside frame: seat + dashed-well + pane card in-frame.
        await testInfo.attach(`o7-seat-768-${scheme}`, {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    }
});

test("O-7 · t-mobile F-8 — the 390 frame: membership holds at the phone band (captures attached)", async ({
    page,
}, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    for (const scheme of ["light", "dark"] as const) {
        await page.evaluate(
            (s) => document.documentElement.classList.toggle("dark", s === "dark"),
            scheme,
        );
        const census = await censusView(page);
        for (const card of census.cards) {
            expect(card.tier, `390 (${scheme}): a card off rung-1`).toBe(
                "resting",
            );
        }
        await testInfo.attach(`o7-390-${scheme}`, {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    }
});
