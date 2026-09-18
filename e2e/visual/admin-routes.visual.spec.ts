// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b · AT-REST ROUTE MATRIX — THE ADMIN HALF (CC-030, G-8).
 *
 * The 5 `meta.admin` routes of the census. They are in the DENOMINATOR, not
 * beside it: an administrator is a product consumer and `/#/admin/names` is a
 * surface they reach, so L-19 puts these cells in. R34's roll-call is explicit
 * that four of the five were invisible to every shipped matrix — the one arm
 * that carried an admin route carried only `adminusers.png`, and the
 * AdminNamesPanel record's residue 3 reads *"verified hole: each `shots/` arm
 * holds 5 routes, `admin-names` absent from every one."*
 *
 * The admin session is a CAPTURE INPUT (`seedAdmin`): a storage token written
 * before the first page script runs plus shape-correct empty envelopes for the
 * panel XHRs — the seam `e2e/smoke/admin/fixtures/admin-auth.ts` established and
 * documented at D.W5 Lane B. No login UI is driven and no `demo/` byte moves.
 *
 * WHAT THESE CELLS ARE, said plainly: the EMPTY admin state. Every panel's
 * `onMounted` XHR is fulfilled with `{data: [], total: 0, …}`. The POPULATED
 * admin row — AdminNamesPanel residue 2, *"the populated row has never been
 * photographed … one seeded-fixture capture pair (light/dark) discharges five
 * hypotheses at once"* — is the seeded arm in `states.visual.spec.ts`, and it is
 * a different cell with a different name. Neither stands in for the other.
 */
import { ROUTE_CENSUS, SCHEMES, VIEWPORTS, panesFor, paneName } from "./census";
import { gotoRoute, seedAdmin, seedScheme, showPane } from "./capture";
import { visualTest as test, expect } from "./fixtures";

const ADMIN_ROUTES = ROUTE_CENSUS.filter((r) => r.admin);

for (const viewport of VIEWPORTS) {
    test.describe(`at-rest-admin · ${viewport.id}`, () => {
        for (const scheme of SCHEMES) {
            for (const route of ADMIN_ROUTES) {
                for (const pane of panesFor(route, viewport.id)) {
                    const paneLabel =
                        viewport.form === "desktop" ? "both" : paneName(route, pane);

                    test(`${route.id} · ${paneLabel} · ${scheme}`, async ({
                        page,
                        visual,
                    }) => {
                        await seedAdmin(page.context());
                        await seedScheme(page.context(), scheme);
                        await page.emulateMedia({ colorScheme: scheme });
                        await page.setViewportSize({
                            width: viewport.width,
                            height: viewport.height,
                        });

                        await gotoRoute(page, route.path);

                        if (viewport.form === "mobile") {
                            const shown = await showPane(page, route, pane);
                            expect(
                                shown,
                                `pane ${pane} (${paneName(route, pane)}) is unreachable at 390 on ${route.id}`,
                            ).toBe(true);
                        }

                        await visual.shot(page, {
                            arm: "at-rest-admin",
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
