import { describe, expect, it } from "vitest";

// R.W1.6 · KF-3 — the `/easing` export-stability guard.
//
// glass-ui's `@mkbabb/value.js/easing` consume composes EXACTLY five symbols
// (SYNTHESIS-v2 §3 R.W1 item 6 / R.W1.md:130). This test pins that surface so a
// future barrel edit that drops or renames one of them fails HERE — in value.js's
// own suite — rather than downstream in glass-ui's EasingPicker build. It imports
// through the published `/easing` subpath barrel (`src/subpaths/easing.ts`), the
// exact module glass-ui resolves, not the internal `../easing` / `../parsing`
// homes.
import * as easing from "../src/subpaths/easing";
import { CSSCubicBezier, steppedEase, bezierPresets, jumpTerms, parseSteps } from "../src/subpaths/easing";

describe("/easing export-stability guard (KF-3 — glass-ui's 5-symbol contract)", () => {
    it("exposes all five composed symbols by name", () => {
        for (const name of [
            "CSSCubicBezier",
            "steppedEase",
            "bezierPresets",
            "jumpTerms",
            "parseSteps",
        ] as const) {
            expect(easing[name], `missing /easing export: ${name}`).toBeDefined();
        }
    });

    it("CSSCubicBezier is the curried bezier factory", () => {
        expect(typeof CSSCubicBezier).toBe("function");
        const ease = CSSCubicBezier(0.42, 0, 0.58, 1);
        expect(typeof ease).toBe("function");
        expect(ease(0)).toBe(0);
        expect(ease(1)).toBe(1);
        // Monotone, in-range on the interior.
        const mid = ease(0.5);
        expect(mid).toBeGreaterThan(0);
        expect(mid).toBeLessThan(1);
    });

    it("steppedEase produces a stepping timing function", () => {
        expect(typeof steppedEase).toBe("function");
        const step = steppedEase(4, "jump-end");
        expect(typeof step).toBe("function");
        expect(step(0)).toBe(0);
        expect(step(0.99)).toBeCloseTo(0.75, 10);
    });

    it("bezierPresets is a control-point table keyed by name", () => {
        expect(typeof bezierPresets).toBe("object");
        // Every value is a 4-tuple of control points.
        for (const [name, pts] of Object.entries(bezierPresets)) {
            expect(Array.isArray(pts), `${name} not an array`).toBe(true);
            expect(pts).toHaveLength(4);
        }
        // The R.W1.4 rider row is present (smooth-step-3, exact ⅓-handle).
        expect(bezierPresets["smooth-step-3"]).toEqual([1 / 3, 0, 2 / 3, 1]);
    });

    it("jumpTerms is the step-position keyword list", () => {
        expect(Array.isArray(jumpTerms)).toBe(true);
        expect(jumpTerms).toContain("jump-start");
        expect(jumpTerms).toContain("jump-end");
    });

    it("parseSteps parses the CSS steps() grammar", () => {
        expect(typeof parseSteps).toBe("function");
        expect(parseSteps("steps(4)")).toEqual({ count: 4, jumpTerm: "jump-end" });
        expect(parseSteps("steps(3, jump-start)")).toEqual({
            count: 3,
            jumpTerm: "jump-start",
        });
    });
});
