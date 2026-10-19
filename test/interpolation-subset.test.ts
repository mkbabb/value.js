/**
 * X.W6.c · c4 — "Dead doors gone; the interpolation set derives from the
 * catalog" (`W6.md` §5 X.W6.c; the ColorSpaceSelector L-15 replacement
 * rider; COHESION §0an grants `demo/color-session/color-space-meta.ts`).
 *
 * Falsifier (`W6.md`): c4 fails if membership drifts from the catalog. So the
 * assertions read the catalog and the derived list side by side — flip any
 * entry's `interpolatable`, rename any label, or re-introduce a hand-kept
 * list that disagrees with the catalog, and this file reds. The derived list
 * is also the one both consumers (Gradient, Mix) import: a second list in
 * either tree is caught by the source census below.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { INTERPOLATION_SPACES } from "../demo/color-session/color-space-meta";
import { SPACE_CATALOG_ENTRIES } from "../demo/color-session/space-catalog";
import { resolveColorSpace } from "../demo/color-session/color-model";

const catalogInterpolatable = SPACE_CATALOG_ENTRIES.filter((e) => e.interpolatable);

describe("c4 · the interpolation set derives from the catalog", () => {
    it("membership is exactly the catalog's interpolatable decision, in catalog order", () => {
        expect(INTERPOLATION_SPACES.map((s) => s.value)).toEqual(
            catalogInterpolatable.map((e) => resolveColorSpace(e.id)),
        );
        // The born-RED count, re-derived: nine spaces are offered today.
        expect(INTERPOLATION_SPACES).toHaveLength(9);
    });

    it("every label is the catalog's own label — no second spelling", () => {
        for (const space of INTERPOLATION_SPACES) {
            const entry = catalogInterpolatable.find(
                (e) => resolveColorSpace(e.id) === space.value,
            );
            expect(entry, space.value).toBeDefined();
            expect(space.label).toBe(entry!.label);
        }
    });

    it("every offered space states its interpolation behaviour", () => {
        for (const space of INTERPOLATION_SPACES) {
            expect(space.description.trim().length, space.value).toBeGreaterThan(0);
        }
    });

    it("the module hand-keeps no membership list (source census)", () => {
        const src = readFileSync(
            resolve(process.cwd(), "demo/color-session/color-space-meta.ts"),
            "utf8",
        );
        // A hand-kept row carries a `label:` literal beside a `value:` literal.
        expect(src).not.toMatch(
            /\{\s*value:\s*"(?:oklch|oklab|lab|lch|hsl|hsv|hwb|rgb|xyz)",\s*label:/,
        );
        expect(src).toMatch(/SPACE_CATALOG_ENTRIES\.filter\(/);
    });

    it("Gradient and Mix read the one derived list — no second list in either tree", () => {
        // X-W12U .k2 (A2-VA-L1-3): both hosts compose the ONE
        // InterpolationFields, which is the list's one reader.
        const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
        const fields = "demo/shared/ui/InterpolationFields.vue";
        expect(read(fields)).toMatch(/INTERPOLATION_SPACES/);
        for (const path of [
            fields,
            "demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue",
            "demo/workbenches/mix/MixConfigBar.vue",
        ]) {
            const src = read(path);
            if (path !== fields) expect(src, path).toMatch(/<InterpolationFields\b/);
            expect(src, path).not.toMatch(/label:\s*"OKLCh"/);
        }
    });
});
