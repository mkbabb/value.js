/**
 * X.W7.c — the N-fixture battery's data (W7.md §6 G10, the ledger's own set).
 *
 * Each value names a real boundary, not a cross-product:
 *   colors 0 · 1 · 2 · 5 · 50 · 200 · 201 — empty / singular / plural /
 *     typical / server cap / the measured sliver-and-clip threshold / one past.
 *   tags   0 · 1 · 2 · 3 · 10 · 11 — the retired `slice(0,3)` edge, the server
 *     cap (`tagsArraySchema … .max(10)`), and one past it.
 *
 * Self-contained: in-repo objects, no server, no network.
 */
import type { Palette, PaletteColor } from "../../../palettes/types";

export const COLOR_NS = [0, 1, 2, 5, 50, 200, 201] as const;
export const TAG_NS = [0, 1, 2, 3, 10, 11] as const;

/** A deterministic, distinct colour per index (hue walk; no two equal). */
export function fixtureColors(n: number, weighted = false): PaletteColor[] {
    return Array.from({ length: n }, (_, i) => ({
        css: `hsl(${(i * 137.508) % 360} 70% ${40 + (i % 3) * 10}%)`,
        position: i,
        ...(weighted ? { weight: (i % 7) + 1 } : {}),
    }));
}

/** Distinct, named tags; `width` pads each to a given length (≤ 30, the
 *  server's per-tag bound `z.string().min(1).max(30)`). */
export function fixtureTags(n: number, width = 0): string[] {
    return Array.from({ length: n }, (_, i) => {
        const base = `tag-${i}`;
        return width > base.length ? base + "x".repeat(width - base.length) : base;
    });
}

export function fixturePalette(overrides: Partial<Palette> = {}): Palette {
    return {
        name: "Fixture palette",
        slug: "fixture-palette",
        colors: fixtureColors(5),
        tags: [],
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        isLocal: false,
        voteCount: 0,
        ...overrides,
    };
}

/** G9's cell — a LEGAL server payload: three tags of 30 chars each, plus the
 *  G17 count magnitudes (4–5-digit counts) that widen the same row. */
export function g9Palette(): Palette {
    return fixturePalette({
        name: "A palette with an ordinary name",
        tags: fixtureTags(3, 30),
        forkOf: "someone-else",
        forkCount: 12345,
        versionCount: 4321,
        voteCount: 12345,
        tier: "featured",
    });
}

/** The named cases the browser harness mounts (`?case=<key>`). */
export const HARNESS_CASES: Record<string, () => Palette> = {
    g9: g9Palette,
    ...Object.fromEntries(
        COLOR_NS.map((n) => [`colors-${n}`, () => fixturePalette({ colors: fixtureColors(n) })]),
    ),
    ...Object.fromEntries(
        TAG_NS.map((n) => [`tags-${n}`, () => fixturePalette({ tags: fixtureTags(n, 30) })]),
    ),
};
