/**
 * GROUND-A · the scoreboard lock.
 *
 * Every number the denominator report cites is asserted here. If the live
 * parser at `src/css/*` changes, this suite fails and the report is stale —
 * which is the only way a scoreboard stays honest.
 *
 * Run: npm test  (from docs/tranches/V/megatranche/prototypes/css-parser)
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { parseCssColor, parseCssValues } from "../../../../../../../src/css/grammar";
import { NAMED_COLORS } from "../../../../../../../src/css/named-colors";
import { allSurfaces, distinctNames, exportSubpaths, REPO_ROOT, surfaceOf } from "./surface";
import { measureAll, probe, scoreboard } from "./measure";
import { PRODUCTIONS } from "./productions";
import type { Status } from "./measure";

const fixture = (name: string): Readonly<{ count: number; names: readonly string[] }> =>
    JSON.parse(readFileSync(resolve(import.meta.dirname, "../fixtures", name), "utf8")) as never;

/* ================================================================== *
 * 1 — the public surface (the "52 exports" / "126 names" claims)
 * ================================================================== */

describe("public surface", () => {
    it("package.json#exports has exactly 7 subpaths and no root export", () => {
        const subpaths = exportSubpaths();
        expect(subpaths).toEqual([
            "./color",
            "./value",
            "./css",
            "./easing",
            "./math",
            "./transform",
            "./quantize",
        ]);
        expect(subpaths).not.toContain(".");
    });

    it("./css exports exactly 52 symbols — 19 values + 33 types", () => {
        const css = surfaceOf("./css");
        expect(css.values).toHaveLength(19);
        expect(css.types).toHaveLength(33);
        expect(css.values.length + css.types.length).toBe(52);
    });

    it("./css exports exactly 10 parse/coerce entries", () => {
        const css = surfaceOf("./css");
        const parsers = css.values.filter((name) => /^(parse|coerce)/.test(name));
        expect(parsers).toEqual([
            "coerceToSyntax",
            "parseAnimationRange",
            "parseAnimationTimeline",
            "parseCssColor",
            "parseCssScalar",
            "parseCssValue",
            "parseCssValues",
            "parseKeyframeSelector",
            "parseStylesheet",
            "parseTimingFunction",
        ]);
    });

    it("the package total is 141 distinct names, not 126", () => {
        const surfaces = allSurfaces();
        expect(distinctNames(surfaces)).toHaveLength(141);
        // No name is re-exported from two subpaths, so slots === distinct.
        const slots = surfaces.reduce((sum, s) => sum + s.values.length + s.types.length, 0);
        expect(slots).toBe(141);
    });

    it("the 126 figure is exactly the package minus ./transform's 15 names", () => {
        expect(surfaceOf("./transform").values.length + surfaceOf("./transform").types.length).toBe(15);
        expect(141 - 15).toBe(126);
    });

    it("@mkbabb/parse-that is NOT yet a dependency of value.js (decree I-11 §2 unexecuted)", () => {
        const pkg = JSON.parse(readFileSync(resolve(REPO_ROOT, "package.json"), "utf8")) as {
            dependencies: Record<string, string>;
            devDependencies: Record<string, string>;
        };
        expect(Object.keys(pkg.dependencies)).toEqual(["@mkbabb/glass-ui", "@mkbabb/keyframes.js"]);
        expect(pkg.devDependencies["@mkbabb/parse-that"]).toBeUndefined();
    });
});

/* ================================================================== *
 * 2 — P-005 / P-008: the colour keyword tables, in full
 * ================================================================== */

describe("P-005 <named-color> — the full 148-entry table", () => {
    const spec = fixture("css-color-4-named-colors.json");

    it("css-color-4 defines 148 named colours", () => {
        expect(spec.count).toBe(148);
        expect(spec.names).toHaveLength(148);
    });

    it("value.js's table is name-for-name identical to the spec — no misses, no extras", () => {
        expect(Object.keys(NAMED_COLORS).sort()).toEqual([...spec.names].sort());
    });

    it("all 148 parse through the public entry, in every ASCII case", () => {
        for (const name of spec.names) {
            for (const spelling of [name, name.toUpperCase(), `${name[0]?.toUpperCase()}${name.slice(1)}`]) {
                expect(parseCssColor(spelling).ok, spelling).toBe(true);
            }
        }
    });
});

describe("P-008 <system-color> — the full 19-keyword set", () => {
    const spec = fixture("css-color-4-system-colors.json");

    it("css-color-4 defines 19 system colours", () => {
        expect(spec.count).toBe(19);
    });

    it("every one is refused with the typed color_context_required code — never a crash, never a guess", () => {
        for (const name of spec.names) {
            const result = parseCssColor(name);
            expect(result.ok, name).toBe(false);
            if (!result.ok) expect(result.diagnostics[0].code, name).toBe("color_context_required");
        }
    });

    it("currentcolor is refused the same way", () => {
        const result = parseCssColor("currentcolor");
        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.diagnostics[0].code).toBe("color_context_required");
    });
});

/* ================================================================== *
 * 3 — P-036: the crash class is a LANGUAGE, not eight strings
 * ================================================================== */

describe("P-036 R1 — the crash class", () => {
    /** The six function heads pre-empted before the crash site in grammar.ts. */
    const GUARDED = ["var", "env", "hsv", "kelvin", "ictcp", "jzazbz"];
    const IDENTS = [
        "rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color",
        "xyz", "calc", "url", "attr", "steps", "linear", "scroll", "view", "foo", "a", "a-b",
        ...GUARDED,
    ];
    /** Bodies made only of whitespace and slashes — exactly the set that yields splitTopLevel() === []. */
    const BODIES = ["", " ", "  ", "\t", "\n", " \t\n ", "/", " / ", "//", " / / "];

    it("throws for every unguarded ident with a whitespace-or-slash-only body", () => {
        const unguarded = IDENTS.filter((id) => !GUARDED.includes(id));
        for (const ident of unguarded) {
            for (const body of BODIES) {
                expect(probe("parseCssColor", `${ident}(${body})`).verdict, `${ident}(${body})`).toBe("THROW");
            }
        }
        expect(unguarded).toHaveLength(21);
        expect(unguarded.length * BODIES.length).toBe(210);
    });

    it("the six guarded heads reject cleanly instead", () => {
        for (const ident of GUARDED) {
            for (const body of BODIES) {
                expect(probe("parseCssColor", `${ident}(${body})`).verdict, `${ident}(${body})`).toBe("REJECT");
            }
        }
    });

    it("a non-blank body does NOT throw — the predicate is exactly /^[\\s\\/]*$/ on the body", () => {
        for (const body of ["1", " 1 ", "/1", "1/", " / 1", "1 2 3", ","]) {
            expect(probe("parseCssColor", `rgb(${body})`).verdict, body).not.toBe("THROW");
        }
    });

    it("propagates to 6 of the 10 public parse entries", () => {
        const throwing = [
            ["parseCssColor", "rgb()"],
            ["parseCssScalar", "rgb()"],
            ["parseCssValue", "rgb()"],
            ["parseStylesheet", "a{color:rgb()}"],
            ["coerceToSyntax", "rgb()"],
        ] as const;
        for (const [entry, input] of throwing) {
            expect(probe(entry, input).verdict, entry).toBe("THROW");
        }
        // parseCssValues is the seventh public name, sharing parseCssValue's body.
        const clean = [
            ["parseTimingFunction", "rgb()"],
            ["parseKeyframeSelector", "rgb()"],
            ["parseAnimationTimeline", "rgb()"],
            ["parseAnimationRange", "rgb()"],
        ] as const;
        for (const [entry, input] of clean) {
            expect(probe(entry, input).verdict, entry).toBe("REJECT");
        }
    });
});

/* ================================================================== *
 * 3b — 10 public entries, but only 9 distinct accepted languages
 * ================================================================== */

describe("parseCssValues accepts exactly the same language as parseCssValue", () => {
    const corpus = PRODUCTIONS.filter((production) => production.entry === "parseCssValue").flatMap(
        (production) => production.cases.map((probeCase) => probeCase.input),
    );

    it(`agrees on all ${corpus.length} §B corpus inputs`, () => {
        expect(corpus.length).toBeGreaterThan(20);
        for (const input of corpus) {
            const single = probe("parseCssValue", input);
            let listed: string;
            try {
                listed = parseCssValues(input).ok ? "ACCEPT" : "REJECT";
            } catch {
                listed = "THROW";
            }
            expect(listed, input).toBe(single.verdict);
        }
    });
});

/* ================================================================== *
 * 4 — the numbered denominator, locked production by production
 * ================================================================== */

/** Measured 2026-07-24 against HEAD c654824e. A diff here means the report is stale. */
const BASELINE: Readonly<Record<string, Status>> = {
    "P-001": "SHIPS", "P-002": "SHIPS", "P-003": "SHIPS", "P-004": "SHIPS", "P-005": "SHIPS",
    "P-006": "SHIPS", "P-007": "DEFERRED", "P-008": "DEFERRED", "P-009": "SHIPS", "P-010": "SHIPS",
    "P-011": "SHIPS", "P-012": "GAP", "P-013": "SHIPS", "P-014": "SHIPS", "P-015": "GAP",
    "P-016": "SHIPS", "P-017": "SHIPS", "P-018": "SHIPS", "P-019": "SHIPS", "P-020": "SHIPS",
    "P-021": "SHIPS", "P-022": "SHIPS", "P-023": "SHIPS", "P-024": "GAP", "P-025": "SHIPS",
    "P-026": "GAP", "P-027": "DEFERRED", "P-028": "GAP", "P-029": "GAP", "P-030": "GAP",
    "P-031": "GAP", "P-032": "GAP", "P-033": "GAP", "P-034": "SHIPS", "P-035": "SHIPS",
    "P-036": "CRASH", "P-037": "UNSOUND",
    "P-038": "SHIPS", "P-039": "SHIPS", "P-040": "SHIPS", "P-041": "SHIPS", "P-042": "SHIPS",
    "P-043": "SHIPS", "P-044": "SHIPS", "P-045": "GAP", "P-046": "UNSOUND", "P-047": "UNSOUND",
    "P-048": "GAP", "P-049": "GAP", "P-050": "CRASH",
    "P-051": "SHIPS", "P-052": "SHIPS", "P-053": "SHIPS", "P-054": "SHIPS", "P-055": "SHIPS",
    "P-056": "GAP", "P-057": "SHIPS",
    "P-058": "SHIPS", "P-059": "SHIPS", "P-060": "SHIPS", "P-061": "GAP",
    "P-062": "SHIPS", "P-063": "SHIPS", "P-064": "SHIPS", "P-065": "SHIPS", "P-066": "UNSOUND",
    "P-067": "SHIPS", "P-068": "SHIPS", "P-069": "SHIPS", "P-070": "SHIPS", "P-071": "SHIPS",
    "P-072": "SHIPS", "P-073": "SHIPS", "P-074": "SHIPS", "P-075": "SHIPS", "P-076": "SHIPS",
    "P-077": "SHIPS", "P-078": "CRASH", "P-079": "GAP",
    "P-080": "SHIPS", "P-081": "GAP", "P-082": "GAP", "P-083": "CRASH",
};

describe("the numbered denominator", () => {
    const results = measureAll();

    it("ids are unique, contiguous P-001..P-083, and every one is baselined", () => {
        const ids = PRODUCTIONS.map((production) => production.id);
        expect(new Set(ids).size).toBe(ids.length);
        expect(ids).toEqual(Array.from({ length: 83 }, (_, i) => `P-${String(i + 1).padStart(3, "0")}`));
        expect(Object.keys(BASELINE).sort()).toEqual([...ids].sort());
    });

    for (const result of results) {
        it(`${result.production.id} [T${result.production.tier}] ${result.production.name}`, () => {
            expect(result.status).toBe(BASELINE[result.production.id]);
        });
    }

    it("scoreboard totals hold", () => {
        const board = scoreboard(results);
        expect(board).toMatchObject({
            productions: 83,
            probes: 325,
            byStatus: { SHIPS: 54, DEFERRED: 3, GAP: 18, UNSOUND: 4, CRASH: 4 },
        });
    });

    it("tier 1 is 57 productions and carries all 4 crash sites plus 1 unsound accept", () => {
        const board = scoreboard(results);
        expect(board.byTier["1"]).toEqual({ SHIPS: 52, DEFERRED: 0, GAP: 0, UNSOUND: 1, CRASH: 4 });
        expect(board.byTier["2"]).toEqual({ SHIPS: 1, DEFERRED: 3, GAP: 11, UNSOUND: 3, CRASH: 0 });
        expect(board.byTier["3"]).toEqual({ SHIPS: 1, DEFERRED: 0, GAP: 7, UNSOUND: 0, CRASH: 0 });
    });

    it("no tier-1 production may ever regress out of SHIPS except the 5 already booked", () => {
        const booked = new Set(["P-036", "P-037", "P-050", "P-078", "P-083"]);
        const regressed = results.filter(
            (result) =>
                result.production.tier === 1 &&
                result.status !== "SHIPS" &&
                !booked.has(result.production.id),
        );
        expect(regressed.map((result) => result.production.id)).toEqual([]);
    });
});
