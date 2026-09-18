/**
 * cand-O · the `<named-color>` / `<system-color>` tables, re-derived.
 *
 * `named-colors.ts` is generated, and a generated table is exactly the kind of
 * artifact that goes stale silently. GROUND-C's lesson was that a transcribed
 * fixture failed its own integrity test on the first run (`-7x` written as
 * `value: 7`), so nothing here is trusted for being checked in: the name sets
 * are compared against the band's spec fixtures scraped from drafts.csswg.org,
 * and the channel values are checked against the published parser separately in
 * `equivalence.test.ts`.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { NAMED_COLORS, SYSTEM_COLORS } from "./named-colors";

const fixture = (name: string): { count: number; names: string[] } =>
    JSON.parse(
        readFileSync(
            fileURLToPath(new URL(`../fixtures/${name}`, import.meta.url)),
            "utf8",
        ),
    ) as { count: number; names: string[] };

describe("<named-color>", () => {
    it("is name-for-name the css-color-4 table — 148, no misses, no extras", () => {
        const spec = fixture("css-color-4-named-colors.json");
        expect(spec.count).toBe(148);

        const ours = Object.keys(NAMED_COLORS);
        expect(ours).toHaveLength(148);
        expect([...ours].sort()).toEqual([...spec.names].sort());
    });

    it("stores three 8-bit integers per name", () => {
        for (const [name, channels] of Object.entries(NAMED_COLORS)) {
            expect(channels, name).toHaveLength(3);
            for (const channel of channels) {
                expect(Number.isInteger(channel), name).toBe(true);
                expect(channel, name).toBeGreaterThanOrEqual(0);
                expect(channel, name).toBeLessThanOrEqual(255);
            }
        }
    });

    it("is keyed in lower case — the parser folds before it looks up", () => {
        for (const name of Object.keys(NAMED_COLORS)) {
            expect(name).toBe(name.toLowerCase());
        }
    });

    it("carries the four names most often got wrong", () => {
        expect(NAMED_COLORS["rebeccapurple"]).toEqual([0x66, 0x33, 0x99]);
        expect(NAMED_COLORS["aqua"]).toEqual(NAMED_COLORS["cyan"]);
        expect(NAMED_COLORS["fuchsia"]).toEqual(NAMED_COLORS["magenta"]);
        expect(NAMED_COLORS["grey"]).toEqual(NAMED_COLORS["gray"]);
    });
});

describe("<system-color>", () => {
    it("is name-for-name the css-color-4 table — 19", () => {
        const spec = fixture("css-color-4-system-colors.json");
        expect(spec.count).toBe(19);
        expect([...SYSTEM_COLORS].sort()).toEqual([...spec.names].sort());
    });

    it("carries no channel values — resolving one needs the user agent", () => {
        for (const name of SYSTEM_COLORS) {
            expect(NAMED_COLORS[name]).toBeUndefined();
        }
    });
});
