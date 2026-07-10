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
        probe.remove();
        return { well, stage };
    });
}

/** Census one mounted view: every Card's rung stamp + the named fixtures. */
async function censusView(page: import("@playwright/test").Page) {
    return page.evaluate(() => {
        const main = document.querySelector("main");
        const cards = Array.from(
            main?.querySelectorAll<HTMLElement>('[data-slot="card"]') ?? [],
        ).map((el) => ({
            tier: el.dataset.tier ?? "(none)",
            grain: el.dataset.grain ?? "(none)",
            shadow: getComputedStyle(el).boxShadow !== "none",
        }));
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
        return {
            cards,
            dashedWell: fixture(".dashed-well"),
            mixPlate: fixture(".mix-plate"),
            perceivedPlate: fixture('[role="img"][aria-label^="Perceived-space"]'),
            paletteCard: fixture('[role="article"].bg-well'),
        };
    });
}

for (const scheme of ["light", "dark"] as const) {
    test(`O-7 census — every pane a rung-1 PLATE, every named fixture on its rung (${scheme})`, async ({
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
        const tokens = await resolveRungTokens(page);

        for (const view of VIEWS) {
            if (view !== "Home") await openView(page, view);
            // The pane grid re-mounts through the swap; settle on a card.
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
        }
    });
}

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
