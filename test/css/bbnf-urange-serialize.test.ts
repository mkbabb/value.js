// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.s10` (W10.md; X-P-W10.md "Units carried from W9 `.vc9`"): a `<urange>` (css-syntax-3 §7.1)
// is read through comments between its tokens (css-syntax-3 §4) and spelled as CSSOM serializes it:
// `U+`, upper-case hex, no leading zeros, a `?` wildcard expanded to its range (WPT urange-parsing.html).

import { describe, expect, it } from "vitest";

import { parseCssValue, serializeCssValue } from "../../src/css/index";

const text = (source: string) => {
    const parsed = parseCssValue(source);
    if (!parsed.ok) throw new Error(`refused: ${source}`);
    const out = serializeCssValue(parsed.value);
    if (!out.ok) throw new Error(`unserializable: ${source}`);
    return out.value;
};

describe("<urange> canonical serialization (css-syntax-3 §7.1)", () => {
    it.each([
        ["u+a?", "U+A0-AF"],
        ["u+a????", "U+A0000-AFFFF"],
        ["u+0a", "U+A"],
        ["u+00000a", "U+A"],
        ["u+0a????", "U+A0000-AFFFF"],
        ["u+000000", "U+0"],
        ["u+0?????", "U+0-FFFFF"],
        ["u+0-0a", "U+0-A"],
        ["u+000000-000001", "U+0-1"],
        ["u+?", "U+0-F"],
    ])("%j → %j", (source, expected) => expect(text(source)).toBe(expected));

    it.each([
        ["u/**/+/**/a/**/?", "U+A0-AF"],
        ["u/**/+0a/**/?", "U+A0-AF"],
        ["u/**/+0/**/?", "U+0-F"],
        ["u/**/+0/**/-0a", "U+0-A"],
        ["u/**/+0/**/-1", "U+0-1"],
        ["u/**/+/**/?", "U+0-F"],
    ])("reads through comments: %j → %j", (source, expected) => expect(text(source)).toBe(expected));

    it.each(["U+", "U+1234567", "U+???????", "U+4?5", "U+4?-5", "U+12-", "U+0025--00FF", "U+110000", "u/**/+/**/1234567"])(
        "%j stays refused",
        (source) => expect(parseCssValue(source).ok).toBe(false),
    );
});
