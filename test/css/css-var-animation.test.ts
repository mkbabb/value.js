// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — R-b-2 (F-W5b-1; COHESION §0bx; DIVERGENCE-LEDGER §14): `var()` inside the animation
// family is valid at parse time, css-variables-1 §3 — "If a property contains one or more var()
// functions, and those functions are syntactically valid, the entire property's grammar must be
// assumed to be valid at parse time. It is only syntax-checked at computed-value time."
//
// Ported from X.P.W5.g's seam suite (evidence: `docs/tranches/X/parse-that/evidence/W6/retired-seam/
// typescript/test/css-var-animation.test.ts`) onto value.js's own `/css` entries. The cases are the
// spec's rule applied to each checked property, the WPT css-variables pattern (a longhand and its
// shorthand each holding a `var()` in any slot, with and without a fallback, nested in `calc()`),
// and the corpus cells that surfaced F-W5b-1 (value.js's own stylesheets). A value WITHOUT a
// `var()` is still checked (the control), and a malformed `var(` is still refused.

import { describe, expect, it } from "vitest";

import { collectAnimationOptions, parseStylesheet } from "../../src/css/index";

const ACCEPTED = [
    "a { animation: var(--a) 1s }",
    "a { animation: fade 1s var(--e) }",
    "a { animation: fade var(--d, 200ms) var(--ease, ease-in) both }",
    "a { animation-name: var(--name) }",
    "a { animation-duration: var(--d) }",
    "a { animation-delay: calc(var(--base, 0ms) + 40ms) }",
    "a { animation-iteration-count: var(--n) }",
    "a { animation-direction: var(--dir) }",
    "a { animation-fill-mode: var(--fill) }",
    "a { animation-timing-function: var(--ease) }",
    "a { animation-composition: var(--c) }",
    "a { animation: fade 1s, var(--second) }",
    "a { ANIMATION: fade 1s VAR(--e) }",
    //  the corpus cells (F-W5b-1)
    ".stagger-children > * { animation: stagger-child-in var(--duration-normal) var(--ease-standard) both; }",
    ".hero-blob-anchor { /* backwards per the one-shot release law above (`to` ≡ natural). */\n        animation: blob-emerge 500ms var(--ease-decelerate) backwards; }",
];

const REFUSED = [
    ["a { animation: fade 1s bogus bogus2 }", "animation_option_invalid"], //   no var(): still checked
    ["a { animation-duration: -1s }", "animation_option_invalid"],
    ["a { animation-direction: sideways }", "animation_option_invalid"],
] as const;

describe("R-b-2 — css-variables-1 §3: a var() in the animation family is valid at parse time", () => {
    it("every var()-holding animation-family declaration parses", () => {
        for (const s of ACCEPTED) expect(parseStylesheet(s).ok, s).toBe(true);
    });

    it("a value with no var() is still checked per property (the control)", () => {
        for (const [s, code] of REFUSED) expect(parseStylesheet(s), s).toMatchObject({ ok: false, diagnostics: [{ code }] });
    });

    it("a malformed var( is still refused", () => {
        expect(parseStylesheet("a { animation: fade var(--e }").ok).toBe(false);
    });

    it("the var() value is carried as its parsed CALL, and the collector reads no parse-time option from it", () => {
        const r = parseStylesheet("a { animation-duration: var(--d); animation-name: fade }");
        if (!r.ok) throw new Error("refused");
        const [rule] = r.value;
        if (rule?.kind !== "style") throw new Error("not a style rule");
        const [duration] = rule.declarations;
        expect(duration?.value).toMatchObject({ kind: "call", name: "var" });
        expect(collectAnimationOptions(rule.declarations)).toEqual([{ name: "fade" }]);
    });
});
