/**
 * CANDIDATE B — COVERAGE, scored against GROUND-A's numbering.
 *
 * The scoreboard is not re-invented here: `denominator/productions.ts` is
 * IMPORTED, so every claim below is a fraction of GROUND-A's ids and its probe
 * inputs, not of a denominator this seat chose for itself. If GROUND-A renumbers
 * or adds a probe, this file fails.
 *
 * Statuses use GROUND-A's own legend (`denominator/measure.ts`):
 *   CRASH · UNSOUND · GAP · DEFERRED · SHIPS.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { PRODUCTIONS } from "../denominator/productions";
import { liveDivergences } from "../fixtures/salvaged";
import { NAMED_COLORS } from "../../../../../../../src/css/named-colors";
import { SYSTEM_COLORS } from "./table";
import { parseColor } from "./grammar";
import { triple } from "./ast";
import type { Channel, ColorNode } from "./ast";

type Status = "CRASH" | "UNSOUND" | "GAP" | "DEFERRED" | "SHIPS";

const verdict = (input: string): { readonly accepted: boolean; readonly code: string } => {
    const outcome = parseColor(input);
    return { accepted: outcome.ok, code: outcome.ok ? "" : outcome.code };
};

const classify = (id: string): Status => {
    const production = PRODUCTIONS.find((entry) => entry.id === id);
    if (production === undefined) throw new Error(`unknown production ${id}`);

    const results = production.cases.map((probe) => {
        try {
            return { probe, ...verdict(probe.input), threw: false };
        } catch {
            return { probe, accepted: false, code: "", threw: true };
        }
    });

    if (results.some((result) => result.threw)) return "CRASH";
    if (results.some((result) => result.probe.owed === "REJECT" && result.accepted)) {
        return "UNSOUND";
    }
    const refusals = results.filter(
        (result) => result.probe.owed === "ACCEPT" && !result.accepted,
    );
    if (refusals.length === 0) return "SHIPS";
    return refusals.every((result) => result.code === "color_context_required")
        ? "DEFERRED"
        : "GAP";
};

/**
 * THE PINNED SCOREBOARD. 37 productions — GROUND-A §A, the whole
 * `parseCssColor` entry. Any drift in either direction fails the build.
 *
 * For comparison, GROUND-A measured the LIVE parser on the same 37 as
 * 22 SHIPS · 3 DEFERRED · 10 GAP · 1 UNSOUND (P-037) · 1 CRASH (P-036).
 */
const BASELINE: Readonly<Record<string, Status>> = {
    "P-001": "SHIPS",
    "P-002": "SHIPS",
    "P-003": "SHIPS",
    "P-004": "SHIPS",
    "P-005": "SHIPS",
    "P-006": "SHIPS",
    // Deliberate, typed refusals — identical to the live parser's contract:
    // a context-free parser must not invent a resolution.
    "P-007": "DEFERRED",
    "P-008": "DEFERRED",
    "P-009": "SHIPS",
    "P-010": "SHIPS",
    "P-011": "SHIPS",
    "P-012": "SHIPS", // tier-2 gap CLOSED: legacy rgba(r,g,b,a)
    "P-013": "SHIPS",
    "P-014": "SHIPS",
    "P-015": "SHIPS", // tier-2 gap CLOSED: legacy hsla(h,s%,l%,a)
    "P-016": "SHIPS",
    "P-017": "SHIPS",
    "P-018": "SHIPS",
    "P-019": "SHIPS",
    "P-020": "SHIPS",
    "P-021": "SHIPS",
    "P-022": "SHIPS",
    "P-023": "SHIPS",
    "P-024": "SHIPS", // tier-2 gap CLOSED: no adaptation in the parser => `none` flows
    "P-025": "SHIPS",
    "P-026": "SHIPS", // tier-3 gap CLOSED: @color-profile custom space
    "P-027": "DEFERRED",
    "P-028": "SHIPS", // tier-2 gap CLOSED: color-mix()
    "P-029": "SHIPS", // tier-2 gap CLOSED: light-dark()
    "P-030": "SHIPS", // tier-3 gap CLOSED: contrast-color()
    "P-031": "SHIPS", // tier-3 gap CLOSED: device-cmyk()
    "P-032": "SHIPS", // tier-2 gap CLOSED: <color-interpolation-method>
    "P-033": "GAP", // NOT CLOSED — see CAND-B.md knownGaps
    "P-034": "SHIPS",
    "P-035": "SHIPS",
    "P-036": "SHIPS", // was CRASH — the reason this band exists
    "P-037": "SHIPS", // was UNSOUND — the empty slash tail
};

const COLOUR_PRODUCTIONS = PRODUCTIONS.filter(
    (production) => production.entry === "parseCssColor",
);

describe("GROUND-A §A — the 37 parseCssColor productions", () => {
    it("scores exactly the pinned baseline, id by id", () => {
        const measured = Object.fromEntries(
            COLOUR_PRODUCTIONS.map((production) => [production.id, classify(production.id)]),
        );
        expect(measured).toEqual(BASELINE);
    });

    it("covers every §A id — the denominator is GROUND-A's, not this seat's", () => {
        expect(COLOUR_PRODUCTIONS).toHaveLength(37);
        expect(Object.keys(BASELINE).sort()).toEqual(
            COLOUR_PRODUCTIONS.map((production) => production.id).sort(),
        );
    });

    it("holds all 24 tier-1 colour productions at SHIPS", () => {
        const tierOne = COLOUR_PRODUCTIONS.filter((production) => production.tier === 1);
        expect(tierOne).toHaveLength(24);
        for (const production of tierOne) {
            expect(classify(production.id), production.id).toBe("SHIPS");
        }
    });

    it("summarises as 33 SHIPS / 3 DEFERRED / 1 GAP / 0 UNSOUND / 0 CRASH", () => {
        const counts = COLOUR_PRODUCTIONS.map((production) => classify(production.id)).reduce<
            Record<string, number>
        >((tally, status) => ({ ...tally, [status]: (tally[status] ?? 0) + 1 }), {});
        expect(counts).toEqual({ SHIPS: 33, DEFERRED: 3, GAP: 1 });
    });
});

describe("P-005 — the 148 named colours are DATA, and they are all reachable", () => {
    it("matches the scraped css-color-4 keyword table, name for name", () => {
        const spec = JSON.parse(
            readFileSync(
                resolve(import.meta.dirname, "../fixtures/css-color-4-named-colors.json"),
                "utf8",
            ),
        ) as { readonly count: number; readonly names: readonly string[] };
        expect(spec.count).toBe(148);
        expect(Object.keys(NAMED_COLORS).sort()).toEqual([...spec.names].sort());
    });

    it("parses all 148 in three spellings, and `#rrggbb` agrees with the keyword", () => {
        for (const [name, hex] of Object.entries(NAMED_COLORS)) {
            for (const spelling of [name, name.toUpperCase(), name.slice(0, 1).toUpperCase() + name.slice(1)]) {
                const outcome = parseColor(spelling);
                if (!outcome.ok) throw new Error(`refused ${spelling}`);
                expect(outcome.node, spelling).toEqual(parseHexNode(hex));
            }
        }
    });
});

const parseHexNode = (hex: string): ColorNode => {
    const outcome = parseColor(hex);
    if (!outcome.ok) throw new Error(`fixture hex refused: ${hex}`);
    return outcome.node;
};

describe("dispatch ordering — a short keyword must never shadow a longer one", () => {
    /**
     * The dispatch bucket orders its arms LONGEST SPELLING FIRST. That is the
     * only thing standing between `greenyellow` and being read as `green` plus
     * trailing garbage, so it gets a test rather than a comment.
     */
    const names = Object.keys(NAMED_COLORS);
    const prefixPairs = names.flatMap((shorter) =>
        names
            .filter((longer) => longer !== shorter && longer.startsWith(shorter))
            .map((longer) => [shorter, longer] as const),
    );

    it("finds real prefix pairs in the keyword table", () => {
        expect(prefixPairs.length).toBeGreaterThan(5);
    });

    it("parses both members of every prefix pair, alone and nested", () => {
        for (const [shorter, longer] of prefixPairs) {
            expect(parseColor(shorter).ok, shorter).toBe(true);
            expect(parseColor(longer).ok, longer).toBe(true);
            expect(parseColor(`color-mix(in srgb, ${longer}, blue)`).ok, longer).toBe(true);
            expect(parseColor(longer)).toEqual(parseColor(longer));
            // …and the longer name must not be read as the shorter one.
            expect(parseColor(longer), longer).not.toEqual(parseColor(shorter));
        }
    });

    it("keeps the function names clear of the keyword names in the same bucket", () => {
        // 'c' is the worst bucket: color, color-mix, contrast-color,
        // currentcolor, coral, cornsilk, crimson, cyan, chocolate, …
        expect(parseColor("color(srgb 1 0 0)").ok).toBe(true);
        expect(parseColor("color-mix(in srgb, red, blue)").ok).toBe(true);
        expect(parseColor("contrast-color(red)").ok).toBe(true);
        expect(parseColor("coral").ok).toBe(true);
        expect(parseColor("currentcolor").ok).toBe(false);
        expect(parseColor("cornflowerblue").ok).toBe(true);
        // 'r': rgb/rgba against red/rebeccapurple/rosybrown/royalblue.
        expect(parseColor("rgb(1 2 3)").ok).toBe(true);
        expect(parseColor("rgba(1 2 3 / 1)").ok).toBe(true);
        expect(parseColor("red").ok).toBe(true);
        expect(parseColor("rebeccapurple").ok).toBe(true);
    });
});

describe("P-008 — all 19 system colours refuse with the typed code", () => {
    it("matches the scraped table and refuses every one", () => {
        const spec = JSON.parse(
            readFileSync(
                resolve(import.meta.dirname, "../fixtures/css-color-4-system-colors.json"),
                "utf8",
            ),
        ) as { readonly count: number; readonly names: readonly string[] };
        expect(spec.count).toBe(19);
        expect([...SYSTEM_COLORS].sort()).toEqual([...spec.names].sort());

        for (const name of spec.names) {
            const outcome = parseColor(name);
            if (outcome.ok) throw new Error(`accepted ${name}`);
            expect(outcome.code, name).toBe("color_context_required");
        }
    });
});

/**
 * GROUND-C §3.5: the R-ledger is a CLOSED WHITELIST. A disagreement with the
 * live parser that is NOT on it is a defect in the replacement. Only the colour
 * rows (R1/R3/R6/R9) are this candidate's business.
 */
describe("the R-row divergence ledger — colour rows only", () => {
    const colourRows = liveDivergences.filter((row) =>
        ["R1", "R3", "R6", "R9"].includes(row.rRow),
    );

    it("covers 14 colour rows — R1 ×2, R3 ×3, R6 ×2, R9 ×7", () => {
        expect(colourRows).toHaveLength(14);
    });

    it("does the CORRECT thing on every one — including where LIVE is right", () => {
        for (const row of colourRows) {
            const outcome = parseColor(row.source);
            expect(outcome.ok, `${row.id} ${row.source}`).toBe(row.correct === "accepts");
        }
    });

    it("R6 is a VALUE divergence: `hsl(120 50 50)` is s=0.5, not s=50", () => {
        // A differential harness that compares only `ok` misses this entirely.
        expect(channelsOf("hsl(120 50 50)")).toEqual([120, 0.5, 0.5]);
        expect(channelsOf("hsl(120 50% 50%)")).toEqual([120, 0.5, 0.5]);
        expect(channelsOf("hwb(120 10 20)")).toEqual([120, 0.1, 0.2]);
        expect(channelsOf("hwb(120 10% 20%)")).toEqual([120, 0.1, 0.2]);
    });
});

/**
 * GROUND-C's inversion rule says a live/replacement disagreement that is NOT on
 * the R-ledger is a DEFECT IN THE REPLACEMENT. Four of mine are not on it. They
 * are therefore DECLARED here as executable claims — proposed new R-rows, for
 * the adjudication to accept or reject — rather than discovered later.
 *
 * All four were measured against `src/css/grammar.ts` in this seat.
 */
describe("declared divergences beyond the closed R-ledger (B-1 … B-4)", () => {
    it("B-1 — a `<percentage>` is not a `<hue>`; LIVE reads `50%` as 180deg", () => {
        // css-values-4 §7.1: <hue> = <number> | <angle>. No percentage arm.
        expect(parseColor("hsl(50% 50% 50%)").ok).toBe(false);
        expect(parseColor("lch(50% 30 50%)").ok).toBe(false);
        expect(parseColor("hsl(180deg 50% 50%)").ok).toBe(true);
    });

    it("B-2 — `1.` is not a `<number>` token; LIVE accepts it as 1", () => {
        // CSS Syntax §4.3.12 requires a digit after the `.`; `1.` tokenises as
        // <number 1> + <delim .>, so the function body is malformed.
        expect(parseColor("rgb(1. 2 3)").ok).toBe(false);
        expect(parseColor("rgb(1.0 2 3)").ok).toBe(true);
        expect(parseColor("rgb(.5 2 3)").ok).toBe(true);
    });

    it("B-3 — the legacy comma forms do not admit `none`; LIVE admits it", () => {
        // css-color-4 §7.1/§7.2: `none` exists only in the modern grammars.
        expect(parseColor("rgb(none, 2, 3)").ok).toBe(false);
        expect(parseColor("hsl(none, 50%, 50%)").ok).toBe(false);
        expect(parseColor("rgb(none 2 3)").ok).toBe(true);
    });

    it("B-4 — `1-2` is TWO number tokens, so `rgb(1-2 3)` is well formed; LIVE rejects", () => {
        // The weakest of the four: it follows from CSS tokenisation
        // (maximal-munch stops before `-`), and it was NOT verified in a browser.
        expect(parseColor("rgb(1-2 3)").ok).toBe(true);
        expect(channelsOf("rgb(1-2 3)")).toEqual([1, -2, 3]);
    });

    it("D-1 / D-2 — the two VALUE divergences the design line creates", () => {
        // Not accept/reject divergences: both parsers accept, the node differs.
        // D-1: `color(srgb …)` keeps srgb's own 0..1 range (LIVE: rgb, ×255).
        expect(channelsOf("color(srgb 1 0 0)")).toEqual([1, 0, 0]);
        // D-2: `xyz-d50` is NOT chromatically adapted here (LIVE: Bradford to
        // xyz-d65 inside the parser). That adaptation is the colour model's job
        // and doing it in the parser is exactly why LIVE cannot pass P-024.
        const outcome = parseColor("color(xyz-d50 1 0 0)");
        if (!outcome.ok || outcome.node.kind !== "color") throw new Error("unreachable");
        expect(outcome.node.space).toBe("xyz-d50");
        expect(outcome.node.channels).toEqual([1, 0, 0]);
    });
});

const channelsOf = (source: string): readonly Channel[] => {
    const outcome = parseColor(source);
    if (!outcome.ok) throw new Error(`refused: ${source}`);
    if (outcome.node.kind !== "color") throw new Error(`not a colour: ${source}`);
    return outcome.node.channels;
};

const alphaOf = (source: string): Channel => {
    const outcome = parseColor(source);
    if (!outcome.ok) throw new Error(`refused: ${source}`);
    if (outcome.node.kind !== "color") throw new Error(`not a colour: ${source}`);
    return outcome.node.alpha;
};

describe("unit normalisation — the per-space reference ranges from the table", () => {
    it("applies each function's `100%` reference range", () => {
        expect(channelsOf("rgb(50% 0% 100%)")).toEqual([127.5, 0, 255]);
        expect(channelsOf("lab(50% 100% -100%)")).toEqual([50, 125, -125]);
        expect(channelsOf("lch(50% 100% 120)")).toEqual([50, 150, 120]);
        expect(channelsOf("oklab(50% 100% -100%)")).toEqual([0.5, 0.4, -0.4]);
        expect(channelsOf("oklch(50% 100% 120)")).toEqual([0.5, 0.4, 120]);
        expect(channelsOf("color(srgb 50% 0% 100%)")).toEqual([0.5, 0, 1]);
        expect(channelsOf("device-cmyk(0% 50% 100% 0%)")).toEqual([0, 0.5, 1, 0]);
    });

    it("converts every <angle> unit to degrees, and leaves bare numbers alone", () => {
        expect(channelsOf("hsl(120 0% 0%)")).toEqual([120, 0, 0]);
        expect(channelsOf("hsl(120deg 0% 0%)")).toEqual([120, 0, 0]);
        expect(channelsOf("hsl(0.5turn 0% 0%)")).toEqual([180, 0, 0]);
        expect(channelsOf("hsl(200grad 0% 0%)")).toEqual([180, 0, 0]);
        expect(channelsOf("hsl(-120 0% 0%)")).toEqual([-120, 0, 0]);
    });

    it("carries `none` through untouched, in channels and in alpha", () => {
        expect(channelsOf("rgb(none 2 3)")).toEqual(["none", 2, 3]);
        expect(alphaOf("rgb(1 2 3 / none)")).toBe("none");
        // P-024: no chromatic adaptation happens in the parser, so `none`
        // survives xyz-d50 — the exact reason the live parser cannot.
        expect(channelsOf("color(xyz-d50 none 0.2 0.1)")).toEqual(["none", 0.2, 0.1]);
    });

    it("defaults alpha to 1 and reads both alpha spellings", () => {
        expect(alphaOf("rgb(1 2 3)")).toBe(1);
        expect(alphaOf("rgb(1 2 3 / 0.5)")).toBe(0.5);
        expect(alphaOf("rgb(1 2 3 / 50%)")).toBe(0.5);
        expect(alphaOf("rgba(1, 2, 3, 50%)")).toBe(0.5);
        expect(alphaOf("#0000007f")).toBeCloseTo(127 / 255, 12);
    });
});

describe("the modern/legacy separator regimes are not interchangeable (R9)", () => {
    const mixed = [
        "rgb(255, 0 0)",
        "rgb(255 0, 0)",
        "hsl(120, 50% 50%)",
        "lab(50%, 0, 0)",
        "color(srgb, 1, 0, 0)",
        "hwb(120, 10%, 20%)", // hwb has NO legacy form at all
        "oklch(0.7, 0.15, 200)",
    ];

    it("rejects every mixed or illegitimate comma form", () => {
        for (const source of mixed) {
            expect(parseColor(source).ok, source).toBe(false);
        }
    });

    it("accepts both all-comma legacy forms, with and without alpha", () => {
        for (const source of [
            "rgb(1,2,3)",
            "rgba(1,2,3,0.5)",
            "rgb(1,2,3,0.5)",
            "hsl(120,50%,50%)",
            "hsla(120,50%,50%,0.5)",
            "hsl(120,50%,50%,0.5)",
        ]) {
            expect(parseColor(source).ok, source).toBe(true);
        }
    });

    it("refuses `none` in the legacy forms, per css-color-4 §7.1", () => {
        expect(parseColor("rgb(none, 2, 3)").ok).toBe(false);
        expect(parseColor("rgb(none 2 3)").ok).toBe(true);
    });
});

describe("the AST is consumable without a non-null assertion", () => {
    it("`triple` narrows a 3-channel colour totally", () => {
        const outcome = parseColor("rgb(1 2 3)");
        if (!outcome.ok || outcome.node.kind !== "color") throw new Error("unreachable");
        expect(triple(outcome.node.channels)).toEqual([1, 2, 3]);
    });

    it("`triple` returns undefined for a 4-channel colour rather than lying", () => {
        const outcome = parseColor("device-cmyk(0 1 1 0)");
        if (!outcome.ok || outcome.node.kind !== "color") throw new Error("unreachable");
        expect(triple(outcome.node.channels)).toBeUndefined();
    });
});

describe("the tree shape — `<color>` is recursive, and the entry says so", () => {
    it("nests colours inside color-mix and light-dark", () => {
        const outcome = parseColor("color-mix(in oklch longer hue, light-dark(red, #00f) 30%, blue)");
        if (!outcome.ok) throw new Error("refused");
        expect(outcome.node.kind).toBe("mix");
        if (outcome.node.kind !== "mix") throw new Error("unreachable");
        expect(outcome.node.method).toEqual({ space: "oklch", hue: "longer" });
        const [first, second] = outcome.node.components;
        expect(first.weight).toBe(30);
        expect(first.color.kind).toBe("call");
        expect(second.color.kind).toBe("color");
    });

    it("propagates a context-dependent LEAF out of a nested position", () => {
        const outcome = parseColor("color-mix(in srgb, currentcolor, red)");
        if (outcome.ok) throw new Error("accepted");
        expect(outcome.code).toBe("color_context_required");
    });

    it("rejects a hue-interpolation method on a RECTANGULAR space", () => {
        expect(parseColor("color-mix(in oklch shorter hue, red, blue)").ok).toBe(true);
        expect(parseColor("color-mix(in srgb shorter hue, red, blue)").ok).toBe(false);
    });
});
