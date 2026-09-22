import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * X.W6.f · X:CSS-1 gate **f8** — EIGHTEEN DOTS, EIGHTEEN SILHOUETTES.
 *
 * Born RED (`W6.md:261`, adjudicated): `distinctVisualSignatures` = 1. Every row
 * mounted a WatercolorDot with no `seed`, so all eighteen shared one seeded
 * `border-radius` silhouette and one `feTurbulence seed` (240) — eighteen clones
 * of one blob down a catalog whose whole job is to distinguish eighteen spaces.
 * The row also passed a `tag` prop the component does not declare.
 *
 * THE KEYING IS THE GATE (the recorded false-GREEN trap). WatercolorDot mounts
 * its own NAMESPACED `<filter>` per instance, so the `filter: url(#…)` each dot
 * references is unique whatever the seed — a signature that includes the url
 * reports 18 when the truth is 1. This oracle therefore keys strictly on
 * (`border-radius` | `background` | `feTurbulence@seed`) and never on the url:
 * the two former are what the eye sees, the third is what displaces the wet
 * edge, and all three are seed-derived.
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

async function openCatalog(page: Page): Promise<DotSignature[]> {
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
        path: "docs/tranches/X/waves/W6-evidence/catalog/after-specimen-dots.png",
    });

    return listbox.evaluate((root) =>
        Array.from(root.querySelectorAll<HTMLElement>("[role=option][data-space]")).map(
            (option) => {
                const dot = option.querySelector<HTMLElement>(".specimen-dot");
                const style = dot ? getComputedStyle(dot) : null;
                const turbulence = dot?.querySelector("feTurbulence");
                return {
                    space: option.getAttribute("data-space") ?? "",
                    borderRadius: style?.borderRadius ?? "",
                    background: style?.backgroundColor ?? "",
                    turbulenceSeed: turbulence?.getAttribute("seed") ?? "",
                    filterUrl: dot?.querySelector("filter")?.getAttribute("id") ?? "",
                };
            },
        ),
    );
}

test("every catalog row mounts its own silhouette, keyed off the seed and not the filter url", async ({
    page,
}) => {
    setupEnvNoise(page);
    const dots = await openCatalog(page);
    expect(dots).toHaveLength(CATALOG_SIZE);

    const signature = (dot: DotSignature) =>
        `${dot.borderRadius}|${dot.background}|${dot.turbulenceSeed}`;
    const signatures = dots.map(signature);
    const urlKeyed = new Set(dots.map((dot) => dot.filterUrl)).size;

    console.log(
        [
            `X.W6.f f8 CENSUS — distinctVisualSignatures = ${new Set(signatures).size}` +
                ` of ${dots.length}`,
            `  (url-keyed would report ${urlKeyed} — the recorded false-GREEN trap, excluded)`,
            ...dots.map(
                (dot) =>
                    `  ${dot.space.padEnd(13)} seed=${dot.turbulenceSeed.padStart(3)} ` +
                    `bg=${dot.background} radius=${dot.borderRadius}`,
            ),
        ].join("\n"),
    );

    // Every row carries a real dot with a real turbulence seed.
    for (const dot of dots) {
        expect(dot.borderRadius, `${dot.space} border-radius`).not.toBe("");
        expect(dot.turbulenceSeed, `${dot.space} feTurbulence seed`).not.toBe("");
    }

    // Eighteen rows, eighteen signatures — under keying that EXCLUDES the url.
    expect(new Set(signatures).size).toBe(CATALOG_SIZE);

    // The silhouette carries it: seeds alone are already distinct, so the result
    // cannot be an artefact of the per-mount filter identity.
    expect(new Set(dots.map((dot) => dot.turbulenceSeed)).size).toBe(CATALOG_SIZE);

    // Every dot paints the ONE current colour — the dots distinguish spaces by
    // silhouette, never by repainting a projected colour (which would fail f6).
    expect(new Set(dots.map((dot) => dot.background)).size).toBe(1);
});
