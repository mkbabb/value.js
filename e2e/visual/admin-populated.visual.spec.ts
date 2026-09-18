// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b · THE POPULATED ADMIN ARM (R35 / AdminNamesPanel residue 2).
 *
 * The ask, verbatim: *"the populated row has never been photographed … **one
 * seeded-fixture capture pair (light/dark) discharges five hypotheses at
 * once**."*
 *
 * Nothing is authored to serve it. `e2e/smoke/admin/fixtures/admin-populated.ts`
 * — the S.W5-13 "populated-fixture pattern" — already routes shape-correct
 * NON-EMPTY envelopes per admin endpoint, and already exists precisely because
 * *"the moderation surface the suite exercises has never once seen a row."*
 * This file composes the visual capture policy onto that fixture. That is R35's
 * PCS-11 / K-8 limb obeyed at its root: the gap was never a missing fixture, it
 * was *"that the VISUAL matrix never consumes the fixture."*
 *
 * `admin-names` is the named subject because it is the row the residue names and
 * because R34 measured it absent from every shipped arm (*"verified hole: each
 * `shots/` arm holds 5 routes, `admin-names` absent from every one"*). The
 * queue rows the fixture serves (`QUEUE`) are what make the panel non-empty.
 */
import { adminPopulatedTest } from "../smoke/admin/fixtures/admin-populated";
import { SCHEMES } from "./census";
import { gotoRoute, seedScheme } from "./capture";
import { VISUAL_FIXTURE, type VisualFixtures } from "./fixtures";
import { expect } from "@playwright/test";

const test = adminPopulatedTest.extend<VisualFixtures>(VISUAL_FIXTURE);

const DESKTOP = { width: 1024, height: 768 };

test.describe("seeded-admin", () => {
    for (const scheme of SCHEMES) {
        test(`admin-names populated · 1024 · ${scheme}`, async ({ page, visual }) => {
            await seedScheme(page.context(), scheme);
            await page.emulateMedia({ colorScheme: scheme });
            await page.setViewportSize(DESKTOP);

            await gotoRoute(page, "/#/admin/names");

            // A populated arm that photographs an empty panel is the hole wearing
            // a new name. The fixture's own queue rows are the proof of life.
            await expect(
                page.getByRole("main").getByRole("button").first(),
                "the populated admin fixture produced no interactive row",
            ).toBeVisible();

            await visual.shot(page, {
                arm: "seeded-admin",
                subject: "admin-names-populated",
                pane: "both",
                viewport: "1024",
                scheme,
                fidelity: "real",
                capture: DESKTOP,
            });
        });
    }
});
