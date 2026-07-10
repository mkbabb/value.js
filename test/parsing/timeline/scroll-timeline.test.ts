import { describe, expect, it, vi } from "vitest";
import {
    parseAnimationTimeline,
    parseAnimationRange,
    parseAnimationRangeBoundary,
    parseTimelineScope,
    parseAnimationTrigger,
    extractTimelineOptions,
    serializeAnimationTimeline,
    serializeAnimationRange,
    serializeTimelineScope,
    serializeAnimationTrigger,
    serializeTimelineOptions,
} from "@src/parsing/timeline/scroll-timeline";
import type { ParseDiagnostic } from "@src/parsing/utils";
import { parseCSSStylesheet } from "@src/parsing/stylesheet";

// ── §II.4 clause 2 — animation-timeline parse correctness (Lane B) ────────────

describe("parseAnimationTimeline — Lane B", () => {
    it("auto / none → their kinds", () => {
        expect(parseAnimationTimeline("auto")).toEqual({ kind: "auto" });
        expect(parseAnimationTimeline("none")).toEqual({ kind: "none" });
    });

    it("a <dashed-ident> → a named-tl ref", () => {
        expect(parseAnimationTimeline("--my-tl")).toEqual({
            kind: "name",
            name: "--my-tl",
        });
    });

    it("scroll(root block) → {kind:scroll, scroller, axis}", () => {
        expect(parseAnimationTimeline("scroll(root block)")).toEqual({
            kind: "scroll",
            scroller: "root",
            axis: "block",
        });
    });

    it("the order-free scroll(block root) ≡ scroll(root block)", () => {
        expect(parseAnimationTimeline("scroll(block root)")).toEqual({
            kind: "scroll",
            scroller: "root",
            axis: "block",
        });
    });

    it("scroll() with a single token / empty body", () => {
        expect(parseAnimationTimeline("scroll(block)")).toEqual({
            kind: "scroll",
            axis: "block",
        });
        expect(parseAnimationTimeline("scroll(self)")).toEqual({
            kind: "scroll",
            scroller: "self",
        });
        expect(parseAnimationTimeline("scroll()")).toEqual({ kind: "scroll" });
    });

    it("view(inline auto) → the view value with an inset", () => {
        expect(parseAnimationTimeline("view(inline auto)")).toEqual({
            kind: "view",
            axis: "inline",
            inset: { start: "auto" },
        });
    });

    it("view(block 10% 20%) → axis + 2-token inset", () => {
        expect(parseAnimationTimeline("view(block 10% 20%)")).toEqual({
            kind: "view",
            axis: "block",
            inset: { start: "10%", end: "20%" },
        });
    });

    it("all four axis keywords + all three scroller keywords parse", () => {
        for (const axis of ["block", "inline", "x", "y"] as const) {
            expect(parseAnimationTimeline(`scroll(${axis})`)).toMatchObject({
                kind: "scroll",
                axis,
            });
        }
        for (const scroller of ["root", "nearest", "self"] as const) {
            expect(parseAnimationTimeline(`scroll(${scroller})`)).toMatchObject({
                kind: "scroll",
                scroller,
            });
        }
    });
});

// ── §II.4 clause 3 — animation-range parse correctness (Lane C) ───────────────

describe("parseAnimationRange — Lane C", () => {
    it("entry 0% cover 40% → start + end boundaries", () => {
        expect(parseAnimationRange("entry 0% cover 40%")).toEqual({
            start: { phase: "entry", offset: "0%" },
            end: { phase: "cover", offset: "40%" },
        });
    });

    it("a bare 50% → an offset-only boundary", () => {
        expect(parseAnimationRange("50%")).toEqual({
            start: { offset: "50%" },
        });
    });

    it("normal → the no-offset boundary", () => {
        expect(parseAnimationRange("normal")).toEqual({
            start: { phase: "normal" },
        });
    });

    it("each of the 6 <timeline-range-name> keywords parses", () => {
        const phases = [
            "cover",
            "contain",
            "entry",
            "exit",
            "entry-crossing",
            "exit-crossing",
        ] as const;
        for (const phase of phases) {
            expect(parseAnimationRange(`${phase} 25%`)).toEqual({
                start: { phase, offset: "25%" },
            });
        }
    });

    it("parseAnimationRangeBoundary parses one endpoint", () => {
        expect(parseAnimationRangeBoundary("cover 40%")).toEqual({
            phase: "cover",
            offset: "40%",
        });
        expect(parseAnimationRangeBoundary("75%")).toEqual({ offset: "75%" });
    });

    it("entry-crossing is not shadowed by entry (longest-first dispatch)", () => {
        expect(parseAnimationRange("entry-crossing 10%")).toEqual({
            start: { phase: "entry-crossing", offset: "10%" },
        });
    });
});

// ── §II.4 clause 4 — timeline-scope parse correctness (Lane D) ────────────────

describe("parseTimelineScope — Lane D", () => {
    it("--a, --b → a names list", () => {
        expect(parseTimelineScope("--a, --b")).toEqual({
            kind: "names",
            names: ["--a", "--b"],
        });
    });

    it("none / all → their kinds", () => {
        expect(parseTimelineScope("none")).toEqual({ kind: "none" });
        expect(parseTimelineScope("all")).toEqual({ kind: "all" });
    });

    it("a single dashed-ident → a 1-element names list", () => {
        expect(parseTimelineScope("--solo")).toEqual({
            kind: "names",
            names: ["--solo"],
        });
    });
});

// ── §II.4 clause 5 — inverse round-trip (the gate CORE, Lane E) ───────────────

describe("round-trip — serialize(parse(s)) is canonical-form-equal to s", () => {
    const TIMELINE_CORPUS = [
        "auto",
        "none",
        "--my-tl",
        "scroll(root block)",
        "scroll(block)",
        "scroll(self)",
        "scroll()",
        "view(inline auto)",
        "view(block 10% 20%)",
        "view(y)",
    ];
    it.each(TIMELINE_CORPUS)("animation-timeline: %s", (s) => {
        expect(serializeAnimationTimeline(parseAnimationTimeline(s))).toBe(s);
    });

    it("order-free scroll() canonicalizes to <scroller> <axis>", () => {
        // The ONE intentional non-identity: the order-free pair canonicalizes.
        expect(
            serializeAnimationTimeline(parseAnimationTimeline("scroll(block root)")),
        ).toBe("scroll(root block)");
    });

    const RANGE_CORPUS = [
        "normal",
        "50%",
        "cover",
        "cover 40%",
        "entry 0% cover 40%",
        "entry-crossing 10% exit-crossing 90%",
        "contain 25%",
    ];
    it.each(RANGE_CORPUS)("animation-range: %s", (s) => {
        expect(serializeAnimationRange(parseAnimationRange(s))).toBe(s);
    });

    const SCOPE_CORPUS = ["none", "all", "--solo", "--a, --b", "--a, --b, --c"];
    it.each(SCOPE_CORPUS)("timeline-scope: %s", (s) => {
        expect(serializeTimelineScope(parseTimelineScope(s))).toBe(s);
    });

    const TRIGGER_CORPUS = [
        "once",
        "repeat",
        "alternate",
        "state",
        "repeat scroll(root block)",
        "once --my-tl entry exit",
    ];
    it.each(TRIGGER_CORPUS)("animation-trigger: %s", (s) => {
        expect(serializeAnimationTrigger(parseAnimationTrigger(s))).toBe(s);
    });
});

// ── §II.4 clause 6 — aggregate extract (Lane F) ───────────────────────────────

describe("extractTimelineOptions — Lane F", () => {
    it("merges the scroll-grammar longhands across a rule", () => {
        // NOTE: value.js's stylesheet parser comma-joins function args (a
        // `scroll(root block)` value round-trips as `scroll(root, block)`); the
        // aggregate extractor tolerates that comma form. A property-level
        // `#`-list value (`timeline-scope: --a, --b`) is truncated to the first
        // segment by the stylesheet parser's ValueArray — so a single-ident
        // scope is used here; the FULL comma-list is exercised by the
        // per-property `parseTimelineScope` (Lane D, above), the primitive
        // kf-K.W9 consumes for a single declaration string.
        const s = parseCSSStylesheet(
            `.box {
                animation-timeline: scroll(root block);
                animation-range: entry 0% cover 40%;
                timeline-scope: --scope;
            }`,
        );
        expect(extractTimelineOptions(s)).toEqual({
            timeline: { kind: "scroll", scroller: "root", axis: "block" },
            range: {
                start: { phase: "entry", offset: "0%" },
                end: { phase: "cover", offset: "40%" },
            },
            timelineScope: { kind: "names", names: ["--scope"] },
        });
    });

    it("composes animation-range-start / -end longhands", () => {
        const s = parseCSSStylesheet(
            `.box {
                animation-range-start: entry 0%;
                animation-range-end: cover 100%;
            }`,
        );
        expect(extractTimelineOptions(s)).toEqual({
            range: {
                start: { phase: "entry", offset: "0%" },
                end: { phase: "cover", offset: "100%" },
            },
        });
    });

    it("later declarations override earlier (CSS cascade)", () => {
        const s = parseCSSStylesheet(
            `.a { animation-timeline: auto; }
             .b { animation-timeline: --override; }`,
        );
        expect(extractTimelineOptions(s).timeline).toEqual({
            kind: "name",
            name: "--override",
        });
    });

    it("the aggregate round-trips through serializeTimelineOptions", () => {
        const s = parseCSSStylesheet(
            `.box {
                animation-timeline: view(inline auto);
                animation-range: cover 40%;
                timeline-scope: --scope;
            }`,
        );
        const opts = extractTimelineOptions(s);
        expect(serializeTimelineOptions(opts)).toEqual({
            "animation-timeline": "view(inline auto)",
            "animation-range": "cover 40%",
            "timeline-scope": "--scope",
        });
    });

    it("an empty stylesheet yields an empty options object", () => {
        const s = parseCSSStylesheet(".box { color: red; }");
        expect(extractTimelineOptions(s)).toEqual({});
    });
});

// ── §II.4 clause 7 — totality / fail-loud (the N.W7 diagnostics contract) ──────

describe("fail-loud — malformed input throws & emits a ParseDiagnostic", () => {
    it("a malformed scroll( emits a diagnostic AND throws", () => {
        const sink = vi.fn<(d: ParseDiagnostic) => void>();
        expect(() => parseAnimationTimeline("scroll(", sink)).toThrow();
        expect(sink).toHaveBeenCalledOnce();
        const diag = sink.mock.calls[0]![0];
        expect(diag).toHaveProperty("message");
        expect(diag).toHaveProperty("offset");
        expect(diag.input).toBe("scroll(");
    });

    it("an unknown scroll() token throws", () => {
        expect(() => parseAnimationTimeline("scroll(bogus)")).toThrow();
    });

    it("garbage range input throws", () => {
        const sink = vi.fn<(d: ParseDiagnostic) => void>();
        expect(() => parseAnimationRange("@@@", sink)).toThrow();
        expect(sink).toHaveBeenCalled();
    });
});

// ── §II.4 clause 8 — export surface (a barrel re-export probe) ─────────────────

describe("export surface — Lane G (the barrel re-exports the public surface)", async () => {
    it("every public function is re-exported from src/index.ts", async () => {
        const barrel = await import("@src/index");
        for (const name of [
            "parseAnimationTimeline",
            "parseAnimationRange",
            "parseAnimationRangeBoundary",
            "parseTimelineScope",
            "parseAnimationTrigger",
            "extractTimelineOptions",
            "serializeAnimationTimeline",
            "serializeAnimationRange",
            "serializeTimelineScope",
            "serializeAnimationTrigger",
            "serializeTimelineOptions",
        ]) {
            expect(typeof (barrel as Record<string, unknown>)[name]).toBe(
                "function",
            );
        }
    });
});
