// @vitest-environment node
/**
 * X.W7.g — the ShadowPalette plate's mass (G20) and the loading skeleton's
 * fidelity to its settled silhouette (N-17), measured in a real engine.
 *
 * jsdom has no layout, so both components mount in Playwright Chromium inside
 * the n-fixture harness page (the shipped stylesheet cascade, the repo's own
 * `vite.config.ts`), each into a host the width of the shipped card list.
 */
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Page } from "@playwright/test";
import { openHarness, type HarnessSeat } from "./n-fixtures/browser";

const CARD_DIR = path.resolve(import.meta.dirname, "../../palettes/browser/card");

/** Mount `file` (a card-family SFC) with `props` in a host `width` wide; return its box height. */
function plateHeight(page: Page, file: string, props: Record<string, unknown>): Promise<number> {
    const url = `/@fs${path.join(CARD_DIR, file)}`;
    // Shipped to the page as source text: the test runner rewrites a literal
    // dynamic `import()` in this module for its own loader, never the page's.
    return page.evaluate(`(async () => {
        // The harness page already loaded Vue through Vite's dep cache: import
        // the SAME module instance the SFC's own \`import "vue"\` resolves to.
        const vueUrl = performance.getEntriesByType("resource").map((e) => e.name)
            .find((n) => /\\/deps\\/vue\\.js/.test(n));
        if (!vueUrl) throw new Error("harness page has no Vue dep");
        const { createApp, h } = await import(vueUrl);
        const sfc = (await import(${JSON.stringify(url)})).default;
        const grid = document.querySelector("[role=article][data-case]").parentElement;
        const host = document.createElement("div");
        host.style.width = grid.clientWidth + "px";
        document.body.appendChild(host);
        const app = createApp({ render: () => h(sfc, ${JSON.stringify(props)}) });
        app.mount(host);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const height = host.firstElementChild.getBoundingClientRect().height;
        app.unmount();
        host.remove();
        return height;
    })()`) as Promise<number>;
}

/** Settled collapsed card height for the harness's `colors-5` case. */
function settledCardHeight(page: Page): Promise<number> {
    return page.evaluate(
        () =>
            document
                .querySelector<HTMLElement>('[role=article][data-case="colors-5"]')!
                .getBoundingClientRect().height,
    );
}

const K_MAX = 16; // ExtractControls.vue — the k slider's `:max`
/** G20's stated budget: the plate at k = 16 is no taller than the settled
 *  collapsed card it stands for plus a 5 px allowance — pre-cure it measured
 *  254 px at 390 px and 150 px at 1440 px. X.W12U.s2: the settled card is read,
 *  not written as its old ≈ 95 px — below 30rem it now seats its meta cluster
 *  on its own row (UIA-V-30), so the card the plate stands for is taller there. */
const PLATE_ALLOWANCE_PX = 5;
/** N-17's stated tolerance: |loading − settled| height. The residual 2 px is
 *  the edge-width difference (1 px hairline vs the card's 2 px stamp) — the
 *  shell's register, which SP-31 sequences behind X-W10. */
const FIDELITY_TOLERANCE_PX = 4;

const PLATES = [
    { file: "ShadowPalette.vue", props: {} },
    { file: "PaletteCardSkeleton.vue", props: {} },
    { file: "PaletteCardSkeleton.vue", props: { variant: "developing" } },
] as const;

describe.each([
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
])("plate at $width px", (viewport) => {
    let seat: HarnessSeat;
    beforeAll(async () => {
        seat = await openHarness(viewport);
    }, 60_000);
    afterAll(async () => {
        await seat?.close();
    });

    it("G20 · both plates at k = 16 sit inside the budget, and k does not grow them", async () => {
        const log: Record<string, number> = {};
        const budget = (await settledCardHeight(seat.page)) + PLATE_ALLOWANCE_PX;
        for (const { file, props } of PLATES) {
            const tag = `${file}${"variant" in props ? `:${props.variant}` : ""}`;
            const atMax = await plateHeight(seat.page, file, { ...props, count: K_MAX });
            const atOne = await plateHeight(seat.page, file, { ...props, count: 1 });
            log[`${tag}@16`] = atMax;
            log[`${tag}@1`] = atOne;
            expect(atMax, tag).toBeGreaterThan(0);
            expect(atMax, tag).toBeLessThanOrEqual(budget);
            expect(atMax, tag).toBe(atOne);
        }
        console.log(`G20 ${viewport.width} ${JSON.stringify(log)}`);
    });

    it("N-17 · the loading skeleton is the silhouette of the settled card", async () => {
        const settled = await settledCardHeight(seat.page);
        for (const variant of ["shadow", "developing"]) {
            const loading = await plateHeight(seat.page, "PaletteCardSkeleton.vue", { count: 5, variant });
            console.log(`N-17 ${viewport.width} ${variant} loading ${loading} settled ${settled}`);
            expect(Math.abs(loading - settled), variant).toBeLessThanOrEqual(FIDELITY_TOLERANCE_PX);
        }
    });
});
