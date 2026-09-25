// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.cp (W7.md ADDENDUM (d) 1; COHESION §0dj): custom property names are case-sensitive,
// css-variables-1 §2 — "custom property names are case-sensitive" (`--Foo` and `--foo` are
// distinct). Standard property names stay ASCII case-insensitive (folded to lowercase).

import { describe, expect, it } from "vitest";

import { collectDeclarations, collectKeyframes, collectStyleRules, parseStylesheet } from "../../src/css/index";

const sheet = (source: string) => {
    const result = parseStylesheet(source);
    if (!result.ok) throw new Error(`refused: ${source}`);
    return result.value;
};

const only = <T>(rows: readonly T[]): T => {
    expect(rows).toHaveLength(1);
    return rows[0] as T;
};

const names = (source: string): string[] =>
    collectStyleRules(sheet(source)).flatMap(({ rule }) => rule.declarations.map((d) => d.name));

describe("custom property names keep their case (css-variables-1 §2)", () => {
    it("--MyVar survives the round trip as authored", () => {
        expect(names(".a { --MyVar: 1 }")).toEqual(["--MyVar"]);
    });

    it("--MyVar and --myvar are distinct declarations", () => {
        const { rule } = only(collectStyleRules(sheet(".a { --MyVar: 1; --myvar: 2 }")));
        const map = collectDeclarations(rule.declarations);
        expect([...map.keys()]).toEqual(["--MyVar", "--myvar"]);
        expect(map.get("--MyVar")?.value).not.toEqual(map.get("--myvar")?.value);
    });

    it("standard property names stay ASCII case-insensitive", () => {
        expect(names(".a { COLOR: red; Animation-Name: Spin }")).toEqual(["color", "animation-name"]);
    });

    it("keyframe declarations keep a custom property's case", () => {
        const { rule } = only(collectKeyframes(sheet("@keyframes k { from { --Angle: 0deg; Opacity: 0 } }")));
        const declared = rule.rules.flatMap((frame) => frame.declarations.map((d) => d.name));
        expect(declared).toEqual(["--Angle", "opacity"]);
    });
});
