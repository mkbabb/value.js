import { describe, expect, it } from "vitest";
import * as live from "../../../../../../../dist/subpaths/css.js";
import {
    parseAnimationRange,
    parseAnimationTimeline,
    parseTimingFunction,
    serializeTimelineOptions,
} from "../index.js";
import type {
    AnimationRangeValue,
    AnimationTimelineValue,
    CSSTimelineOptions,
    CssTimingFunction,
    ParseResult,
} from "../types.js";

type Door<T> = (source: string) => ParseResult<T>;

function gatingProjection<T>(result: ParseResult<T>): unknown {
    return result.ok
        ? { ok: true, value: result.value }
        : { ok: false, code: result.diagnostics[0].code, expected: result.diagnostics[0].expected };
}

function agrees<T>(mirror: Door<T>, oracle: Door<T>, source: string, ok: boolean): void {
    const actual = mirror(source);
    const expected = oracle(source);
    expect(actual.ok, source).toBe(ok);
    expect(expected.ok, source).toBe(ok);
    expect(gatingProjection(actual), source).toEqual(gatingProjection(expected));
}

const easingAccept = [
    "linear", "LINEAR", " linear ", "ease", "EASE", " ease ",
    "ease-in", "EASE-IN", "ease-out", "EASE-OUT", "ease-in-out", "EASE-IN-OUT",
    "step-start", "STEP-START", " step-start ", "step-end", "STEP-END", " step-end ",
    "cubic-bezier(0,0,1,1)", "cubic-bezier(0, 0, 1, 1)", "CUBIC-BEZIER(0,0,1,1)",
    "cubic-bezier(.25,.1,.25,1)", "cubic-bezier(.42,0,1,1)", "cubic-bezier(0,0,.58,1)",
    "cubic-bezier(.42,0,.58,1)", "cubic-bezier(1,-2,0,3)", "cubic-bezier(+0,-1,+1,2)",
    "cubic-bezier(1e0,0,0e0,1)", " cubic-bezier(.1, .2, .9, .8) ",
    "steps(1)", "STEPS(1)", "steps(2)", "steps(10)", "steps(2,start)",
    "steps(2, start)", "steps(2,end)", "steps(2, jump-start)", "steps(2,jump-end)",
    "steps(2,jump-none)", "steps(3, jump-none)", "steps(1,jump-both)", "steps(4, jump-both)",
    "steps(1, start)", "steps(1, end)", "steps(2, START)", " steps(12, JUMP-END) ",
    "linear(0,1)", "LINEAR(0,1)", "linear(-1,2)", "linear(0 0%,1 100%)",
    "linear(0 0% 25%,.5,1 100%)", "linear(0 -10%,1 110%)", "linear(0 1e2%,1)",
    "linear(1e-2,1e2)", "linear(0, .25, .5, .75, 1)", "linear(-1 -20% 0%, 2 100% 120%)",
    " linear(0 0%, .5 50%, 1 100%) ", "linear(+0,+1)", "linear(.1,.9)",
] as const;

const easingReject = [
    "", " ", "foo", "spring(1 2 3 4)", "ease extra", "linear extra", "step-middle",
    "cubic-bezier()", "cubic-bezier(0,0,1)", "cubic-bezier(0,0,1,1,2)",
    "cubic-bezier(-.1,0,1,1)", "cubic-bezier(0,0,1.1,1)", "cubic-bezier(0 0 1 1)",
    "cubic-bezier(a,0,1,1)", "cubic-bezier(0,0,1,1", "cubic-bezier(0,0,1,1) x",
    "steps()", "steps(0)", "steps(-1)", "steps(1.5)", "steps(1,jump-none)",
    "steps(2,middle)", "steps(2 start)", "steps(2,start) extra", "steps(1e309)",
    "linear()", "linear(0)", "linear(a,1)", "linear(0 10px,1)",
    "linear(0 0% 10% 20%,1)", "linear(0,1", "linear(0,1) x", "spring()",
] as const;

const timelineAccept = [
    "auto", "AUTO", " Auto ", "none", "NONE", " none ",
    "--a", "--A", "--foo", "--Foo", "--foo-bar", "--foo_bar", "--0", "--1x", "---", "----",
    "scroll()", "SCROLL()", " scroll() ", "scroll(nearest)", "scroll(root)", "scroll(self)",
    "scroll(block)", "scroll(inline)", "scroll(x)", "scroll(y)", "scroll(nearest block)",
    "scroll(root inline)", "scroll(self x)", "scroll(self y)", "scroll(block nearest)",
    "scroll(inline root)", "scroll(x self)", "scroll(y nearest)", "scroll( root   x )",
    "view()", "VIEW()", " view() ", "view(block)", "view(inline)", "view(x)", "view(y)",
    "view(auto)", "view(AUTO)", "view(0)", "view(-0)", "view(+0.0)", "view(5px)",
    "view(-5px)", "view(+.5rem)", "view(10%)", "view(-20%)", "view(1em)", "view(2PX)",
    "view(block 10%)", "view(10% block)", "view(inline auto)", "view(auto inline)",
    "view(x 1px 2px)", "view(1px x 2px)", "view(1px 2px x)",
    "view(y -10% 120%)", "view(0 0)", "view(block 0 auto)",
] as const;

const timelineReject = [
    "", " ", "foo", "--", "--!", "--a!", "_name", "name", "auto extra", "none()",
    "scroll", "scroll(", "scroll())", "scroll(foo)", "scroll(root root)", "scroll(x y)",
    "scroll(root x self)", "scroll(nearest root)", "scroll(block inline)", "scroll(root) x",
    "view", "view(", "view(foo)", "view(block inline)", "view(x y)",
    "view(1px 2px 3px)", "view(block 1px 2px 3px)", "view(1e2px)", "view(calc(1px))",
    "view(block block)", "view() x", "spring()",
] as const;

const rangeAccept = [
    "normal", "NORMAL", "cover", "contain", "entry", "exit", "entry-crossing", "exit-crossing",
    "0", "+0", "-0", "0.0", "auto", "AUTO", "1px", "-1px", "+.5rem", "10%", "-20%", "2PX",
    "normal 0", "cover +0", "contain -0", "entry auto", "exit 1px", "entry-crossing -1rem",
    "exit-crossing 100%", "entry 10%", "exit -20%", "cover 2em", "contain .5vh",
    "entry exit", "normal normal", "cover contain", "entry-crossing exit-crossing",
    "entry 0 exit 0", "entry 10% exit 90%", "cover 1px contain 2px",
    "entry-crossing -10% exit-crossing 110%", "entry 10% 20%", "entry 1px 2px",
    "0 100%", "auto auto", "1px 2px", "normal 0 100%", "entry 0 exit",
    "entry 10%, exit 90%", "entry,exit", "normal, normal", "cover 1px, contain 2px",
    "entry-crossing 0, exit-crossing 100%", "entry,,exit", " entry 10%   exit 90% ",
    "entry 0,exit 0", "0,100%", "auto,auto", "ENTRY 10% EXIT 90%",
] as const;

const rangeReject = [
    "", " ", "foo", "phase", "entry foo", "entry 1e2px", "entry calc(1px)",
    "entry 1--", "entry %", "entry .", "entry +", "entry 1px foo", "entry foo 1px",
    "entry 1px 2px 3px", "entry exit cover", "entry 1px exit 2px cover",
    "entry,exit,cover", "entry 1px,foo", "foo,exit 2px", "normal normal normal",
    "entry-cross", "exitcrossing", "entry()", "'entry'", "entry 1px trailing trailing",
    "entry 1px, exit 2px, cover 3px", "calc(1px)", "view(1px)",
] as const;

describe("W3 easing + timeline maintained banks", () => {
    it("proves 50+ branch-diverse timing accepts and 20+ actual rejects across all four kinds", () => {
        expect(easingAccept.length).toBeGreaterThanOrEqual(50);
        expect(easingReject.length).toBeGreaterThanOrEqual(20);
        const kinds = new Set<string>();
        for (const source of easingAccept) {
            agrees(parseTimingFunction, live.parseTimingFunction, source, true);
            const parsed = parseTimingFunction(source);
            if (parsed.ok) kinds.add(parsed.value.kind);
        }
        for (const source of easingReject) agrees(parseTimingFunction, live.parseTimingFunction, source, false);
        expect([...kinds].sort()).toEqual(["cubic-bezier", "keyword", "linear-function", "steps"]);
    });

    it("rejects empty and excess easing list items that LIVE silently discards", () => {
        for (const source of ["steps(2,start,end)", "linear(0,,1)"] as const) {
            expect(live.parseTimingFunction(source).ok, source).toBe(true);
            expect(parseTimingFunction(source).ok, source).toBe(false);
        }
    });

    it("proves 50+ branch-diverse timeline accepts and 20+ actual rejects", () => {
        expect(timelineAccept.length).toBeGreaterThanOrEqual(50);
        expect(timelineReject.length).toBeGreaterThanOrEqual(20);
        for (const source of timelineAccept) agrees(parseAnimationTimeline, live.parseAnimationTimeline, source, true);
        for (const source of timelineReject) agrees(parseAnimationTimeline, live.parseAnimationTimeline, source, false);
    });

    it("proves 50+ range accepts and 20+ actual rejects including 2/1 disambiguation", () => {
        expect(rangeAccept.length).toBeGreaterThanOrEqual(50);
        expect(rangeReject.length).toBeGreaterThanOrEqual(20);
        for (const source of rangeAccept) agrees(parseAnimationRange, live.parseAnimationRange, source, true);
        for (const source of rangeReject) agrees(parseAnimationRange, live.parseAnimationRange, source, false);
        expect(parseAnimationRange("entry 10% exit 90%")).toEqual({
            ok: true,
            value: { start: { phase: "entry", offset: "10%" }, end: { phase: "exit", offset: "90%" } },
            diagnostics: [],
        });
    });

    it("asserts R10: scroll()/view() reject commas instead of LIVE's comma-to-space leniency", () => {
        for (const source of [
            "scroll(root,x)", "scroll(root, x)", "scroll(root,)", "scroll(,root)", "scroll(,)",
            "view(block,10%)", "view(block, 10%)", "view(10%,20%)", "view(auto,)", "view(,block)",
        ] as const) {
            expect(live.parseAnimationTimeline(source).ok, source).toBe(true);
            const parsed = parseAnimationTimeline(source);
            expect(parsed.ok, source).toBe(false);
            if (!parsed.ok) {
                expect(parsed.diagnostics[0].code).toBe("timeline_option_invalid");
                expect(parsed.diagnostics[0].expected).toEqual([
                    source.toLowerCase().startsWith("scroll") ? "scroll timeline" : "view timeline",
                ]);
            }
        }
    });

    it("asserts R11: timeline and range offsets require a unit except for zero", () => {
        for (const source of [
            "view(5)", "view(-1)", "view(+.5)", "view(block 5)", "view(5 block)",
            "view(1 2)", "view(x 1 2)",
        ] as const) {
            expect(live.parseAnimationTimeline(source).ok, source).toBe(true);
            const parsed = parseAnimationTimeline(source);
            expect(parsed.ok, source).toBe(false);
            if (!parsed.ok) expect(parsed.diagnostics[0].expected).toEqual(["view timeline"]);
        }
        for (const source of [
            "5", "-1", "+.5", "entry 5", "entry -1", "entry +.5", "entry 5 exit 10",
            "entry 5, exit 10", "0 5", "entry 0 exit 5",
        ] as const) {
            expect(live.parseAnimationRange(source).ok, source).toBe(true);
            const parsed = parseAnimationRange(source);
            expect(parsed.ok, source).toBe(false);
            if (!parsed.ok) expect(parsed.diagnostics[0].expected).toEqual(["animation range"]);
        }
        for (const source of ["view(0)", "view(-0)", "entry 0", "-0"] as const) {
            const door = source.startsWith("view") ? parseAnimationTimeline : parseAnimationRange;
            const oracle = source.startsWith("view") ? live.parseAnimationTimeline : live.parseAnimationRange;
            agrees(door as Door<unknown>, oracle as Door<unknown>, source, true);
        }
    });

    it("transposes timeline option serialization and round-trips every public parseable field", () => {
        const cases: readonly CSSTimelineOptions[] = [
            {},
            { timeline: { kind: "auto" } },
            { timeline: { kind: "none" } },
            { timeline: { kind: "name", name: "--progress" } },
            { timeline: { kind: "scroll", scroller: "root", axis: "x" } },
            { timeline: { kind: "view", axis: "block", inset: { start: "10%", end: "90%" } } },
            { timelines: [{ kind: "auto" }, { kind: "name", name: "--x" }, { kind: "scroll", axis: "inline" }] },
            { range: { start: { phase: "entry", offset: "10%" }, end: { phase: "exit", offset: "90%" } } },
            { timelineScope: { kind: "none" } },
            { timelineScope: { kind: "all" } },
            { timelineScope: { kind: "names", names: ["--a", "--b"] } },
            { trigger: { type: "once", timeline: { kind: "view", axis: "y" }, range: { start: { phase: "cover" } } } },
            {
                timeline: { kind: "scroll", scroller: "self", axis: "block" },
                range: { start: { phase: "entry", offset: "0" }, end: { phase: "exit", offset: "100%" } },
                timelineScope: { kind: "names", names: ["--local"] },
                trigger: { type: "repeat", timeline: { kind: "name", name: "--local" } },
            },
        ];
        for (const options of cases) {
            const serialized = serializeTimelineOptions(options);
            expect(serialized).toEqual(live.serializeTimelineOptions(options));
            if (options.timeline) {
                const source = serialized["animation-timeline"]!;
                const parsed = parseAnimationTimeline(source);
                expect(parsed.ok, source).toBe(true);
                if (parsed.ok) expect(parsed.value).toEqual(options.timeline);
            }
            if (options.range) {
                const source = serialized["animation-range"]!;
                const parsed = parseAnimationRange(source);
                expect(parsed.ok, source).toBe(true);
                if (parsed.ok) expect(parsed.value).toEqual(options.range);
            }
        }
    });

    it("keeps every W3 export no-throw on hostile runtime values", () => {
        const hostile: readonly unknown[] = [undefined, null, 0, 1, NaN, {}, [], Symbol("css")];
        for (const parse of [parseTimingFunction, parseAnimationTimeline, parseAnimationRange] as const) {
            for (const value of hostile) {
                let result: ParseResult<unknown> | undefined;
                expect(() => { result = (parse as (source: unknown) => ParseResult<unknown>)(value); }).not.toThrow();
                expect(result?.ok).toBe(false);
            }
        }
        for (const value of hostile) {
            expect(() => (serializeTimelineOptions as (options: unknown) => unknown)(value)).not.toThrow();
            expect((serializeTimelineOptions as (options: unknown) => unknown)(value)).toEqual({});
        }
    });
});
