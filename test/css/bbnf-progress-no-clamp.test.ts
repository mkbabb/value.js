// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.k10` (c) (XP-13, COHESION §0hv RECOMMENDED): `progress()` takes a leading `no-clamp` on its first
// argument (css-values-5 progress(); WPT css/css-values/progress-computed.html). The calculation's type is
// unchanged: a <number>. Only one `no-clamp`, only first, and never alone.

import { describe, expect, it } from "vitest";

import { parseCssValue, serializeCssValue } from "../../src/css/index";

describe("progress(no-clamp …) (css-values-5)", () => {
    it.each([
        "progress(no-clamp 50em, 10em, 110em)",
        "calc(progress(no-clamp 100px, 0px, 50px) * 10px + 100px)",
        "calc(progress(no-clamp abs(5%), hypot(3%, 4%), 10%))",
        "calc(progress(no-clamp 100, 0, sign(1rem - 5px)))",
        "progress(NO-CLAMP 10px, 10px, 10px)",
    ])("%s parses and keeps its no-clamp", (source) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok).toBe(true);
        const text = parsed.ok ? serializeCssValue(parsed.value) : null;
        expect(text?.ok ? text.value.toLowerCase() : "").toContain("no-clamp");
    });
    it.each([
        "progress(no-clamp, 0, 1)", "progress(clamp 1, 0, 1)", "progress(no-clamp no-clamp 1, 0, 1)",
        "progress(1, no-clamp 0, 1)", "progress(no-clamp 1px, 0, 1)",
    ])("%s is refused", (source) => {
        expect(parseCssValue(source).ok).toBe(false);
    });
});
