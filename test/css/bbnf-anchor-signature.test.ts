// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.k10` (d) (XP-13, COHESION §0hv RECOMMENDED): `anchor()` and `anchor-size()` keep their
// css-anchor-position-1 signatures in a value list (WPT css/css-anchor-position/anchor{,-size}-parse-{valid,invalid}.html).
// Which properties admit them is the property's grammar (DR-a), so `font-size: anchor(--foo top)` parses here.

import { describe, expect, it } from "vitest";

import { parseCssValue } from "../../src/css/index";

const VALID = [
    "anchor(--foo top)", "anchor(top --foo)", "anchor(top)", "anchor(50%)", "anchor(--foo calc(10% + 5%))",
    "anchor(--foo top, 10px)", "anchor(--foo top, 0)", "anchor(--foo top, calc(50% + 1px))",
    "anchor(--foo top, anchor(--bar bottom))", "anchor(self-end, anchor-size(--bar height))",
    "calc(anchor(--foo top) + 10px + 10%)", "anchor(--x top, var(--y))", "anchor(--x var(--y))",
    "anchor-size()", "anchor-size(width)", "anchor-size(--foo)", "anchor-size(width --foo)", "anchor-size(--foo self-inline, 50%)",
    "anchor-size(10px)", "anchor-size(--foo width, anchor-size(--bar block, anchor-size(--baz inline)))",
];
const INVALID = [
    "anchor(--foo, top)", "anchor(--foo top bottom)", "anchor(--foo top, 10px 20%)", "anchor(--foo top, 10px, 20%)",
    "anchor(2 * 20%)", "anchor(foo top)", "anchor(top foo)", "anchor(--foo height)", "anchor(--foo 10em)", "anchor(--foo 100s)",
    "anchor(--foo top, 1)", "anchor(--foo top, 100s)", "anchor(--foo top, bottom)", "anchor(--foo top, anchor(bar top))",
    "anchor(--foo --bar top)", "anchor()", "anchor(--foo)",
    "anchor-size(--foo, width)", "anchor-size(--foo width height)", "anchor-size(foo width)", "anchor-size(--foo top)",
    "anchor-size(--foo 10em)", "anchor-size(--foo 50%)", "anchor-size(--foo width, 1)", "anchor-size(--foo width, height)",
    "calc(10px + 100 * anchor-size(--foo width, anchor-size(bar bottom)))", "anchor-size(10px, 10px)",
];

describe("anchor() / anchor-size() signatures (css-anchor-position-1 §3.2, §4.1)", () => {
    it.each(VALID)("%s parses", (source) => {
        expect(parseCssValue(source).ok).toBe(true);
    });
    it.each(INVALID)("%s is refused", (source) => {
        expect(parseCssValue(source).ok).toBe(false);
    });
});
