import { test, expect } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * O-32 · X.W6.f · X:CSS-1 gate **f8** — EIGHTEEN DOTS, EIGHTEEN SILHOUETTES.
 * (Renumbered from `o24` on 2026-10-19 — R47 / NG-14, COHESION §0gc.4; alias table
 * `docs/tranches/X/waves/W6-ADDENDUM-2026-10-19-ordinals.md`.)
 *
 * Born RED (`W6.md:261`, adjudicated): `distinctVisualSignatures` = 1. Every row
 * mounted a WatercolorDot with no `seed`, so all eighteen shared one seeded
 * `border-radius` silhouette and one `feTurbulence seed` (240) — eighteen clones
 * of one blob down a catalog whose whole job is to distinguish eighteen spaces.
 * The row also passed a `tag` prop the component does not declare.
 *
 * THE KEYING IS THE GATE (the recorded false-GREEN trap). WatercolorDot used to
 * mount its own NAMESPACED `<filter>` per instance, so a signature that
 * included the url reported 18 when the truth was 1. color-40 L-5 (his FORTIETH
 * order's list scale) pools the wet edge: every dot references one of the
 * page's eight seeded filters, picked by the silhouette's own hash, so the
 * url and the turbulence seed no longer tell eighteen rows apart. This oracle
 * keys strictly on (`border-radius` | `background`), what the eye sees, and
 * checks that each dot's edge is a real pooled filter with a real seed.
 *
 * `background` is expected CONSTANT across the rows — every dot paints the ONE
 * current colour, which is the point of the row — so the distinguishing work
 * falls to the silhouette and the turbulence seed. That is stated rather than
 * assumed: the assertion below is on the whole tuple, and the census prints all
 * three components so a future reading can see which one carried it.
 */

const CATALOG_SIZE = 18;

type DotSignature = {
    space: string;
    borderRadius: string;
    background: string;
    turbulenceSeed: string;
    filterUrl: string;
};

async function openCatalog(page: Page, testInfo: TestInfo): Promise<DotSignature[]> {
    await page.goto("/");
    const main = page.getByRole("main", { name: "Home" });
    await expect(main).toBeVisible();
    const trigger = main.getByRole("combobox", { name: "Select color space" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    const listbox = page.getByRole("listbox");
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option")).toHaveCount(CATALOG_SIZE);

    // §8 — the AFTER frame for the dot census, taken by its own gate.
    await listbox.screenshot({
        path: testInfo.outputPath("after-specimen-dots.png"),
    });

    return listbox.evaluate((root) =>
        Array.from(root.querySelectorAll<HTMLElement>("[role=option][data-space]")).map(
            (option) => {
                const dot = option.querySelector<HTMLElement>(".specimen-dot");
                const style = dot ? getComputedStyle(dot) : null;
                const ref = (style?.filter ?? "").match(/url\("?#([^")]+)"?\)/)?.[1] ?? "";
                const turbulence = ref ? document.getElementById(ref)?.querySelector("feTurbulence") : null;
                return {
                    space: option.getAttribute("data-space") ?? "",
                    borderRadius: style?.borderRadius ?? "",
                    background: style?.backgroundColor ?? "",
                    turbulenceSeed: turbulence?.getAttribute("seed") ?? "",
                    filterUrl: ref,
                };
            },
        ),
    );
}

test("every catalog row mounts its own silhouette, keyed off the seed and not the filter url", async ({
    page,
}, testInfo) => {
    setupEnvNoise(page);
    const dots = await openCatalog(page, testInfo);
    expect(dots).toHaveLength(CATALOG_SIZE);

    const signature = (dot: DotSignature) => `${dot.borderRadius}|${dot.background}`;
    const signatures = dots.map(signature);
    const urlKeyed = new Set(dots.map((dot) => dot.filterUrl)).size;

    console.log(
        [
            `X.W6.f f8 CENSUS — distinctVisualSignatures = ${new Set(signatures).size}` +
                ` of ${dots.length}`,
            `  (pooled edges in use: ${urlKeyed})`,
            ...dots.map(
                (dot) =>
                    `  ${dot.space.padEnd(13)} seed=${dot.turbulenceSeed.padStart(3)} ` +
                    `bg=${dot.background} radius=${dot.borderRadius}`,
            ),
        ].join("\n"),
    );

    // Every row carries a real dot whose edge is a real pooled filter.
    for (const dot of dots) {
        expect(dot.borderRadius, `${dot.space} border-radius`).not.toBe("");
        expect(dot.turbulenceSeed, `${dot.space} feTurbulence seed`).not.toBe("");
    }

    // Eighteen rows, eighteen signatures — under keying that EXCLUDES the edge.
    expect(new Set(signatures).size).toBe(CATALOG_SIZE);

    // The silhouette carries it alone (the background is one colour below).
    expect(new Set(dots.map((dot) => dot.borderRadius)).size).toBe(CATALOG_SIZE);

    // The edges come from the pool, not one filter per dot.
    expect(urlKeyed).toBeGreaterThan(1);
    expect(await page.locator("filter[id^=watercolor]").count()).toBeLessThanOrEqual(10);

    // Every dot paints the ONE current colour — the dots distinguish spaces by
    // silhouette, never by repainting a projected colour (which would fail f6).
    expect(new Set(dots.map((dot) => dot.background)).size).toBe(1);
});
