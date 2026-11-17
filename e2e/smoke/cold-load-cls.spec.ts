import { test } from "@playwright/test";
import {
    SCENES,
    expectColdLoadSettled,
    installColdLoadWitness,
} from "./fixtures/cold-load";

/**
 * Cold load at 1440×900, every routed scene: the first contentful frame holds
 * the linked scene whole and nothing moves after it (summed CLS < 0.05).
 * The 390 touch twin is `mobile/cold-load-cls-390.spec.ts`; the witness and
 * the measured defect are in `fixtures/cold-load.ts`.
 */
test.use({ viewport: { width: 1440, height: 900 } });

for (const scene of SCENES) {
    test(`cold load ${scene.hash} at 1440 paints the linked scene first and never shifts`, async ({
        page,
    }) => {
        await installColdLoadWitness(page);
        await expectColdLoadSettled(page, scene);
    });
}
