/**
 * X-W9.a — PARSER TOTALITY, the born-RED battery.
 *
 * Landed RED **first**, in its own commit, before any cure (W9.md §Archaeology
 * guardrail 1: "the battery lands RED first, in its own commit, with its failing
 * output in the body — a rename cannot satisfy it").
 *
 * §1 is the 56-vector empty-/whitespace-body battery: 14 function heads that
 * reach `parseFunctionalColor` × 2 body shapes (empty, whitespace) × 2 public
 * string entries. Every one of the 56 throws
 * `TypeError: Cannot read properties of undefined (reading 'replace')` today,
 * from ONE site — `src/css/grammar.ts:181`, `slash[0]!`.
 *
 * §2..§5 WIDEN that battery by the R1 input class of
 * `docs/tranches/V/coordination/value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md`:
 *
 *   §A1  the class is any CSS scalar, not just colour — `parseCssValue` /
 *        `parseCssValues` throw on the 10 colour heads (§2).
 *   §A2  a SECOND class: prototype keys reach `parseCssColor`, `parseCssScalar`,
 *        `parseCssValue`, `parseCssValues`, `coerceToSyntax` and
 *        `parseStylesheet` — the last of which MT-F024's sweep certified
 *        `ok 0/172` (§3).
 *   §A2  `parseTimingFunction("steps(2, constructor)")` is NOT a throw: it is a
 *        well-formed-looking `ok:true` whose `position` is a `Function` — a type
 *        lie that escapes every throw-based gate (§4), with its
 *        `collectAnimationOptions` twin at `src/css/stylesheet.ts:163-171`,
 *        which the grammar cure UNMASKS (band ruling: both sites land together).
 *   §A2  `easing(name)` throws on 5/5 `Object.prototype` keys (§5).
 *
 * Every assertion is a totality assertion: the entry may fail, it may succeed,
 * it may not THROW, and it may not return a payload its own `.d.ts` forbids.
 */
import { describe, expect, it } from "vitest";
import {
    coerceToSyntax,
    collectAnimationOptions,
    collectStyleRules,
    parseCssColor,
    parseCssScalar,
    parseCssValue,
    parseCssValues,
    parseStylesheet,
    parseTimingFunction,
} from "../src/subpaths/css";
import { easing } from "../src/subpaths/easing";
import type { ParseResult } from "../src/subpaths/css";

/** Captures a throw instead of letting it escape, so the message is assertable. */
const call = <T>(fn: () => ParseResult<T>): ParseResult<T> | Error => {
    try {
        return fn();
    } catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
};

const threw = (outcome: unknown): string =>
    outcome instanceof Error ? `${outcome.constructor.name}: ${outcome.message}` : "";

// ── §1 · the 56 empty-/whitespace-body vectors ───────────────────────────────

/** The ten CSS colour heads plus four non-colour heads that take the same
 *  `^([a-z][\w-]*)\((.*)\)$` call branch into `parseFunctionalColor`. */
const HEADS = [
    "rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color",
    "calc", "linear-gradient", "color-mix", "steps",
] as const;

/** An empty body and a whitespace body — `splitTopLevel` yields `[]` for both,
 *  so `slash[0]` is `undefined` at `grammar.ts:181` either way. */
const BODIES = ["", "   "] as const;

const STRING_ENTRIES = [
    ["parseCssColor", parseCssColor],
    ["parseCssScalar", parseCssScalar],
] as const;

const EMPTY_BODY_VECTORS = STRING_ENTRIES.flatMap(([entry, fn]) =>
    HEADS.flatMap((head) =>
        BODIES.map((body) => ({ entry, fn, source: `${head}(${body})` }))));

describe("X-W9.a §1 · empty- and whitespace-body totality (56 vectors)", () => {
    it("enumerates exactly 56 vectors", () => {
        expect(EMPTY_BODY_VECTORS.length).toBe(56);
    });

    for (const { entry, fn, source } of EMPTY_BODY_VECTORS) {
        it(`${entry}(${JSON.stringify(source)}) returns a typed result, never a TypeError`, () => {
            const outcome = call(() => fn(source));
            expect(threw(outcome)).toBe("");
            expect(outcome).toHaveProperty("ok");
        });
    }
});

// ── §2 · R1 §A1 — the class is any CSS scalar, not just colour ───────────────

const COLOUR_HEADS = HEADS.slice(0, 10);
const LIST_ENTRIES = [
    ["parseCssValue", parseCssValue],
    ["parseCssValues", parseCssValues],
] as const;

describe("X-W9.a §2 · R1 §A1 — the widened scalar class", () => {
    for (const [entry, fn] of LIST_ENTRIES) {
        for (const head of COLOUR_HEADS) {
            for (const body of BODIES) {
                const source = `${head}(${body})`;
                it(`${entry}(${JSON.stringify(source)}) returns a typed result`, () => {
                    const outcome = call(() => fn(source));
                    expect(threw(outcome)).toBe("");
                    expect(outcome).toHaveProperty("ok");
                });
            }
        }
    }
});

// ── §3 · R1 §A2 — prototype keys on the ./css surface ────────────────────────

/** `grammar.ts:265` lowercases before indexing `NAMED_COLORS`, so the reachable
 *  keys are the all-lowercase `Object.prototype` members. */
const PROTO_KEYS = ["constructor", "__proto__"] as const;

const PROTO_ENTRIES = [
    ["parseCssColor", (key: string) => parseCssColor(key)],
    ["parseCssScalar", (key: string) => parseCssScalar(key)],
    ["parseCssValue", (key: string) => parseCssValue(key)],
    ["parseCssValues", (key: string) => parseCssValues(key)],
    ["coerceToSyntax", (key: string) => coerceToSyntax(key, "*")],
] as const;

/** The embedded forms — `parseStylesheet` was on MT-F024's certified-safe list. */
const EMBEDDED = [
    "a{color:constructor}",
    "a{color:__proto__}",
    "@keyframes k{from{color:constructor}}",
    "a{background:linear-gradient(constructor,red)}",
    "a{animation:x 1s steps(2,constructor)}",
] as const;

describe("X-W9.a §3 · R1 §A2 — prototype keys reach the ./css entries", () => {
    for (const [entry, fn] of PROTO_ENTRIES) {
        for (const key of PROTO_KEYS) {
            it(`${entry}(${JSON.stringify(key)}) returns a typed result`, () => {
                const outcome = call(() => fn(key));
                expect(threw(outcome)).toBe("");
                expect(outcome).toHaveProperty("ok");
            });
        }
    }

    it("parseCssColor never resolves a prototype member as a named colour", () => {
        for (const key of PROTO_KEYS) {
            const outcome = call(() => parseCssColor(key));
            expect(threw(outcome)).toBe("");
            expect(outcome).toMatchObject({ ok: false });
        }
    });

    for (const source of EMBEDDED) {
        it(`parseStylesheet(${JSON.stringify(source)}) returns a typed result`, () => {
            const outcome = call(() => parseStylesheet(source));
            expect(threw(outcome)).toBe("");
            expect(outcome).toHaveProperty("ok");
        });
    }
});

// ── §4 · R1 §A2 — the steps() type lie, and its stylesheet twin ──────────────

describe("X-W9.a §4 · steps() alias resolution is a JumpPosition or a failure", () => {
    for (const source of ["steps(2, constructor)", "steps(2, __proto__)", "steps(2, toString)"]) {
        it(`parseTimingFunction(${JSON.stringify(source)}) never returns a non-string position`, () => {
            const outcome = call(() => parseTimingFunction(source));
            expect(threw(outcome)).toBe("");
            if (outcome instanceof Error || !outcome.ok) return;
            expect(outcome.value.kind).toBe("steps");
            if (outcome.value.kind !== "steps") return;
            expect(typeof outcome.value.position).toBe("string");
        });
    }

    // The twin at src/css/stylesheet.ts:163-171. It is MASKED today — the sheet
    // throws in the grammar before this reads — and the grammar cure UNMASKS it,
    // which is why the band ruled the two sites land in one commit.
    it("collectAnimationOptions never yields a non-string steps position", () => {
        const sheet = call(() => parseStylesheet("a{animation:x 1s steps(2,constructor)}"));
        expect(threw(sheet)).toBe("");
        if (sheet instanceof Error || !sheet.ok) return;
        const rules = collectStyleRules(sheet.value);
        expect(rules.length).toBe(1);
        const options = collectAnimationOptions(rules[0]?.rule.declarations ?? []);
        for (const option of options) {
            const timing = option.timingFunction;
            if (timing === undefined || timing.kind !== "steps") continue;
            expect(typeof timing.position).toBe("string");
        }
    });
});

// ── §5 · R1 §A2 — `easing(name)` over the Object.prototype key set ───────────

const EASING_POISON = ["constructor", "__proto__", "toString", "valueOf", "hasOwnProperty"] as const;

describe("X-W9.a §5 · easing(name) is total over Object.prototype keys", () => {
    for (const name of EASING_POISON) {
        it(`easing(${JSON.stringify(name)}) rejects instead of throwing`, () => {
            const outcome = call(() => easing(name) as never);
            expect(threw(outcome)).toBe("");
            expect(outcome).toMatchObject({ ok: false, error: { code: "easing_name_unknown" } });
        });
    }

    it("the control arms are unchanged", () => {
        expect(easing("ease").ok).toBe(true);
        expect(easing("definitely-not-an-easing")).toMatchObject({
            ok: false,
            error: { code: "easing_name_unknown" },
        });
    });
});
