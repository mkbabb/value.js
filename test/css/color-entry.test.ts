// SERVED MODEL: claude-opus-5-5
//
// X-W12U `.g2s` (COHESION §0fr.1): the `<color>`-rooted entry. `color.bbnf` is compiled as a root of
// its own (`scripts/gen-grammar.mjs`, entry `colorTop`) so a colour parse never loads the value and
// stylesheet productions. These pin the three things that make it lawful: it is the SAME grammar as
// `css.bbnf`'s (only rules `color.bbnf` · `math.bbnf` · `tokens.bbnf` define, each defined once, each
// action of the kind `css.bbnf` binds — never a copy and never a hand parser), it carries none of the value or stylesheet rules, and `./color` and `./css` publish
// ONE `parseCssColor` and ONE `serializeCssColor`.

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as colorTop from "../../src/css/bbnf/generated/color";
import * as full from "../../src/css/bbnf/generated/grammar";
import * as css from "../../src/subpaths/css";
import * as color from "../../src/subpaths/color";

const GRAMMAR = path.resolve(import.meta.dirname, "../../src/css/grammar");

/** Every rule a `.bbnf` module defines, by module: a definition is a line `name = …`. */
const definitions = new Map<string, string[]>(
    readdirSync(GRAMMAR).filter((file) => file.endsWith(".bbnf")).map((file) => [
        file,
        [...readFileSync(path.join(GRAMMAR, file), "utf8").matchAll(/^([A-Za-z]\w*)\s*=/gm)].map((m) => m[1]!),
    ]),
);

describe("the <color>-rooted parser (X-W12U .g2s)", () => {
    it("emits only rules of the modules css.bbnf imports for colour (color · math · tokens), each defined once", () => {
        const owner = new Map<string, string[]>();
        for (const [file, names] of definitions) for (const name of names) owner.set(name, [...(owner.get(name) ?? []), file]);
        const copied = [...owner].filter(([, files]) => files.length > 1);
        expect(copied).toEqual([]);
        const foreign = colorTop.RULE_NAMES.filter((name) => !["color.bbnf", "math.bbnf", "tokens.bbnf"].includes(owner.get(name)?.[0] ?? ""));
        expect(foreign).toEqual([]);
        expect(colorTop.ENTRY_NAMES).toEqual(["colorTop"]);
        expect(colorTop.RULE_NAMES.length).toBeLessThan(full.RULE_NAMES.length);
    });

    it("binds each rule's action with the kind css.bbnf binds it with", () => {
        const fullKinds: Readonly<Record<string, string>> = full.ACTION_KINDS;
        const differing = Object.entries(colorTop.ACTION_KINDS).filter(([name, kind]) => fullKinds[name] !== kind);
        expect(differing).toEqual([]);
    });

    it("carries none of the value or stylesheet productions", () => {
        const carried = ["valueTop", "scalarTop", "customTop", "timingFunction", "keyframeSelector", "ruleList", "declaration", "atKeyframes"]
            .filter((name) => (colorTop.RULE_NAMES as readonly string[]).includes(name));
        expect(carried).toEqual([]);
    });

    it("is the one parseCssColor / serializeCssColor, published on ./color and ./css", () => {
        expect(color.parseCssColor).toBe(css.parseCssColor);
        expect(color.serializeCssColor).toBe(css.serializeCssColor);
    });

    it("reads and writes a colour through ./color alone", () => {
        const cases: readonly [string, string][] = [
            ["#ff0000", "rgb(255 0 0)"],
            ["oklch(70% 0.1 200deg / 50%)", "oklch(70% 0.1 200deg / 50%)"],
            ["color(display-p3 1 0 0)", "color(display-p3 1 0 0)"],
        ];
        for (const [source, expected] of cases) {
            const parsed = color.parseCssColor(source);
            expect(parsed.ok, source).toBe(true);
            if (!parsed.ok) continue;
            const written = color.serializeCssColor(parsed.value);
            expect(written.ok && written.value, source).toBe(expected);
        }
        expect(color.parseCssColor("1px solid").ok).toBe(false);
        const context = color.parseCssColor("var(--accent)");
        expect(!context.ok && context.diagnostics[0].code).toBe("color_context_required");
    });
});
