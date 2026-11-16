import { test } from "@playwright/test";
import {
    SCENES,
    expectColdLoadSettled,
    installColdLoadWitness,
} from "../fixtures/cold-load";

/**
 * Cold load at 390×844 touch (the project's Pixel 7 device, narrowed to the
 * width the defect was measured at), every routed scene: the first contentful
 * frame holds the linked scene whole and nothing moves after it (summed
 * CLS < 0.05). This is the width where the stacked column made the defect
 * a jump: the eager picker painted first and the routed pane pushed it down.
 */
test.use({ viewport: { width: 390, height: 844 } });

for (const scene of SCENES) {
    test(`cold load ${scene.hash} at 390 paints the linked scene first and never shifts`, async ({
        page,
    }) => {
        await installColdLoadWitness(page);
        await expectColdLoadSettled(page, scene);
    });
}
