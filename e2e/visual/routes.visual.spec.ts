// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · VISUAL REGRESSION ORACLE — THE AT-REST ROUTE MATRIX (CC-030, G-8)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * GOAL (W1.md §X.W1.b): *"a pixel change in the shipped UI cannot reach master
 * unobserved."*
 *
 * ─── DENOMINATOR ────────────────────────────────────────────────────────────
 *
 * The ROUTE CENSUS — all 14 names the router declares — NOT the five-route
 * sample every shipped modality matrix ran (R34; the measurement is in
 * `census.ts`, and `census-parity.spec.ts` reds if the app grows a route this
 * table has not). This file holds the 9 public routes; `admin-routes.visual.spec.ts`
 * holds the 5 that need an admin session seeded.
 *
 *   ROUTE (9 public)  × VIEWPORT (390 / 1024 / 3440) × SCHEME (light / dark)
 *                     × PANE (mobile only — see below)
 *
 * L-19 denominator discipline is preserved: every axis is a product-consumer
 * axis and no cell is minted for a combination nobody reaches. The PANE axis
 * exists at 390 and only at 390, because at 390 the shell shows one pane at a
 * time and the sibling pane — About, Mix, Blob, Palettes — is otherwise
 * unwitnessable. That is R34's *"pane-hosted surfaces ARE reached"* clause, not
 * a cross-product: at 1024 and 3440 one frame already holds both panes, and no
 * second cell is minted there.
 *
 * ─── TOLERANCE ──────────────────────────────────────────────────────────────
 *
 * Stated numerically with its measured derivation in `tolerance.ts`, and
 * validated by a deliberate visible injection (G-9) whose receipt is at
 * `docs/tranches/X/evidence/w1/visual/G9-INJECTION.md`. It is never validated by
 * argument — that is the D.W4 failure this gate exists to prevent.
 *
 * ─── RENDERER ───────────────────────────────────────────────────────────────
 *
 * Every golden filename ends in the renderer slug read OUT OF THE LIVE BROWSER
 * by `renderer.ts` (G-10). Goldens minted here are software-GL (SwiftShader)
 * goldens and say so in their own names. CC-029 half (b), the real-GPU session,
 * is X.W1.f's and nothing here discharges it.
 *
 * ─── CAPTURE INPUTS ─────────────────────────────────────────────────────────
 *
 * Scheme seeding, pane selection and the WebGL quiesce stylesheet are capture
 * inputs applied from outside the product (R35's cure-shape lock). This unit
 * writes no `demo/` byte.
 */
import { ROUTE_CENSUS, SCHEMES, VIEWPORTS, panesFor, paneName } from "./census";
import { gotoRoute, seedScheme, showPane } from "./capture";
import { visualTest as test, expect } from "./fixtures";

const PUBLIC_ROUTES = ROUTE_CENSUS.filter((r) => !r.admin);

for (const viewport of VIEWPORTS) {
    test.describe(`at-rest · ${viewport.id}`, () => {
        for (const scheme of SCHEMES) {
            for (const route of PUBLIC_ROUTES) {
                for (const pane of panesFor(route, viewport.id)) {
                    const paneLabel =
                        viewport.form === "desktop" ? "both" : paneName(route, pane);

                    test(`${route.id} · ${paneLabel} · ${scheme}`, async ({
                        page,
                        visual,
                    }) => {
                        await seedScheme(page.context(), scheme);
                        await page.emulateMedia({ colorScheme: scheme });
                        await page.setViewportSize({
                            width: viewport.width,
                            height: viewport.height,
                        });

                        await gotoRoute(page, route.path);

                        if (viewport.form === "mobile") {
                            const shown = await showPane(page, route, pane);
                            // A pane that could not be shown must FAIL, never be
                            // photographed under the other pane's name. This is
                            // the sameness trap `capture.mjs` sprang once: "a
                            // visual audit that captures the same pane N times is
                            // worse than no audit: it reads green."
                            expect(
                                shown,
                                `pane ${pane} (${paneName(route, pane)}) is unreachable at 390 on ${route.id}`,
                            ).toBe(true);
                        }

                        await visual.shot(page, {
                            arm: "at-rest",
                            subject: route.id,
                            pane: paneLabel,
                            viewport: viewport.id,
                            scheme,
                            fidelity: "real",
                            capture: { width: viewport.width, height: viewport.height },
                        });
                    });
                }
            }
        }
    });
}
