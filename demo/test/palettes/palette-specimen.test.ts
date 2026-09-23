/**
 * X.W7.c — G12, specimen purity (W7.md §6 G12; fold S-12).
 *
 *   1. Import graph: `PaletteSpecimen.vue`'s TRANSITIVE in-repo import set
 *      contains no palette port, no action composable, no CRUD transport.
 *   2. Mounted: zero interactive descendants inside the specimen subtree, at
 *      the richest fixture (featured + fork + versions + tags + votes).
 *   3. Props-only: the component declares no emits.
 *   4. Consumed by product (L-19): the card renders its name and counts
 *      through the specimen — the specimen is not an orphan certified only by
 *      its own test.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PaletteSpecimen from "../../palettes/browser/card/PaletteSpecimen.vue";
import { g9Palette } from "./n-fixtures/fixtures";

const SPECIMEN = path.resolve(import.meta.dirname, "../../palettes/browser/card/PaletteSpecimen.vue");
const CARD = path.resolve(import.meta.dirname, "../../palettes/browser/card/PaletteCard/PaletteCard.vue");

/** The forbidden seats: palette ports/actions/store and the API transport. */
const FORBIDDEN = [
    /usePalettePorts/,
    /usePaletteActions/,
    /usePaletteStore/,
    /usePaletteExport/,
    /platform\/transport\//,
    /useApiClient/,
    /palettes\/api/,
];

const INTERACTIVE =
    'button, a[href], input, select, textarea, [tabindex], [contenteditable], [role="button"], [role="link"], [role="menuitem"], [role="checkbox"], [role="switch"]';

function resolveImport(from: string, spec: string): string | null {
    const base = path.resolve(path.dirname(from), spec);
    for (const candidate of [base, `${base}.ts`, `${base}.vue`, path.join(base, "index.ts")]) {
        if (existsSync(candidate) && !candidate.endsWith(path.sep) && /\.(ts|vue)$/.test(candidate)) {
            return candidate;
        }
    }
    return null;
}

/** Every in-repo module reachable from `entry` through static imports. */
function importClosure(entry: string): Set<string> {
    const seen = new Set<string>();
    const stack = [entry];
    while (stack.length) {
        const file = stack.pop()!;
        if (seen.has(file)) continue;
        seen.add(file);
        const source = readFileSync(file, "utf8");
        for (const m of source.matchAll(/(?:import|export)\s[^'"]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g)) {
            const spec = m[1] ?? m[2]!;
            if (!spec.startsWith(".")) continue;
            const resolved = resolveImport(file, spec);
            if (resolved) stack.push(resolved);
        }
    }
    return seen;
}

describe("G12 · PaletteSpecimen purity", () => {
    it("imports no port, action, store or transport — transitively", () => {
        const closure = [...importClosure(SPECIMEN)].map((f) => path.relative(process.cwd(), f));
        // The walk is real: the specimen reaches its strip and the palette types.
        expect(closure.some((f) => f.endsWith("PaletteColorStrip.vue"))).toBe(true);
        for (const file of closure) {
            for (const pattern of FORBIDDEN) expect(file, `${file} ~ ${pattern}`).not.toMatch(pattern);
        }
    });

    it("mounts with zero interactive descendants", () => {
        const w = mount(PaletteSpecimen, { props: { palette: g9Palette() } });
        const root = w.get("[data-palette-specimen]").element;
        expect(root.querySelectorAll(INTERACTIVE)).toHaveLength(0);
        // …and it still renders what a specimen is for: strip, name, counts.
        expect(w.find("[data-color-strip]").exists()).toBe(true);
        expect(w.get("[data-palette-name]").text()).toBe(g9Palette().name);
        expect(w.get('[data-count="colors"]').text()).toBe("5");
        w.unmount();
    });

    it("is props-only: no declared emits", () => {
        expect((PaletteSpecimen as { emits?: unknown }).emits ?? []).toEqual([]);
        expect(readFileSync(SPECIMEN, "utf8")).not.toMatch(/defineEmits/);
    });

    it("has a product consumer — the card renders through it (L-19)", () => {
        expect(readFileSync(CARD, "utf8")).toMatch(/<PaletteSpecimen\b/);
    });
});
