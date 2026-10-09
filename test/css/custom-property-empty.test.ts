// SERVED MODEL: claude-opus-5-5
//
// X.P.W8.e (W8.md ADDENDUM (a) 2; COHESION §0es, §0ev.5; ESC-W8v-2): the empty custom property.
// css-variables-1 §2 gives a custom property the value grammar `<declaration-value>?`: it may be empty,
// and css-syntax-3 trims a declaration's whitespace and drops comments, so `--x: ;`, `--x:;` and
// `--x: /* c */ ;` all hold the empty value. A STANDARD property's value is never empty, so `a: ;` stays
// refused.

import { describe, expect, it } from "vitest";

import { collectStyleRules, parseStylesheet, serializeCssValue } from "../../src/css/index";
import { parseDeclarations } from "../../src/css/rules";
import type { Declaration } from "../../src/css/types";

const declarations = (body: string): readonly Declaration[] => {
    const parsed = parseDeclarations(body);
    if (!parsed.ok) throw new Error(`refused: ${JSON.stringify(body)} → ${JSON.stringify(parsed.diagnostics)}`);
    return parsed.value;
};

/** `name: value[ !important];` — the declaration list written back from the parsed model. */
const serialize = (rows: readonly Declaration[]): string =>
    rows.map(({ name, value, important }) => {
        const text = serializeCssValue(value);
        if (!text.ok) throw new Error(`unserializable: ${name}`);
        return `${name}: ${text.value}${important ? " !important" : ""};`;
    }).join(" ");

const EMPTY = { kind: "list", separator: "space", items: [] };

describe("an empty custom property value is valid (css-variables-1 §2)", () => {
    it.each(["--x: ;", "--x:;", "--x:   ", "--x: /* none */ ;"])("%j parses to the empty value", (body) => {
        expect(declarations(body)).toEqual([{ name: "--x", value: EMPTY, important: false }]);
    });

    it("beside a standard declaration: `a: 1; --x: ;`", () => {
        const rows = declarations("a: 1; --x: ;");
        expect(rows.map((row) => row.name)).toEqual(["a", "--x"]);
        expect(rows[1]?.value).toEqual(EMPTY);
    });

    it("keeps its !important flag: `--x: !important`", () => {
        expect(declarations("--x: !important")).toEqual([{ name: "--x", value: EMPTY, important: true }]);
    });

    it.each(["--x: ;", "--x:;", "a: 1; --x: ;", "--x: !important;"])("%j round-trips", (body) => {
        const once = declarations(body);
        const text = serialize(once);
        expect(declarations(text)).toEqual(once);
        expect(serialize(declarations(text))).toBe(text);
    });

    it("serializes `--x: ;` as authored", () => {
        expect(serialize(declarations("--x:;"))).toBe("--x: ;");
    });

    it("reads through a stylesheet rule: `.a { --x: ; opacity: 1 }`", () => {
        const parsed = parseStylesheet(".a { --x: ; opacity: 1 }");
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const [entry] = collectStyleRules(parsed.value);
        expect(entry?.rule.declarations.map((row) => [row.name, row.value])).toEqual([
            ["--x", EMPTY],
            ["opacity", { kind: "scalar", payload: { type: "number", value: 1, unit: "" } }],
        ]);
    });
});

describe("a standard property's value is never empty", () => {
    it.each(["a: ;", "a:;", "color:   ", "a: /* none */ ;", "a: 1; b: ;"])("%j stays refused", (body) => {
        const parsed = parseDeclarations(body);
        expect(parsed.ok).toBe(false);
        if (parsed.ok) return;
        expect(parsed.diagnostics[0].code).toBe("css_syntax");
    });
});
