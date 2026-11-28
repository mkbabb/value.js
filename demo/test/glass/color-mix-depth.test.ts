/**
 * A colour token mixes one level deep.
 *
 * WebKit 26.5 (Playwright 1.61) aborts the page process when it applies a
 * color-mix() whose two colour arms each hold a color-mix() (glass O-436). An
 * arm holds one when it is a mix or reaches a mix through var(), a relative
 * colour or light-dark() around that var() included. glass's
 * `--blob-shadow-color` mixes `--shadow-color` with itself, so the old dark
 * `--shadow-color`, a mix holding a mix, aborted every dark page on load (the
 * hero Blob's seat is on every route).
 *
 * The site's sheets (demo/styles and every .vue style block) are read with
 * glass's shipped sheets, and a name the site declares resolves to the site's
 * declarations. A mix of two mixed arms fails when it sits in a site sheet, or
 * when it is glass's and the site's values are what make it one. glass's own
 * (11.1.0's `--control-surface-bg-hover`) is glass's to cure and is left out:
 * cutting the site's names does not remove it.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { convertColor, parseCssColor } from "@mkbabb/value.js/color";

const ROOT = resolve(__dirname, "../../..");
const GLASS = join(ROOT, "node_modules/@mkbabb/glass-ui/dist");

interface Decl {
    prop: string;
    value: string;
    at: string;
}
type Producers = Map<string, Decl[]>;

const files = (dir: string, ext: string, acc: string[] = []): string[] => {
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) {
            if (name !== "node_modules" && name !== "test" && !name.startsWith(".")) files(p, ext, acc);
        } else if (name.endsWith(ext)) acc.push(p);
    }
    return acc;
};

/** The declarations in a sheet (or a .vue file's style blocks) that call a function. */
function declarations(file: string): Decl[] {
    const text = readFileSync(file, "utf8");
    const sheets = file.endsWith(".vue")
        ? [...text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)].map((m) => ({
              css: m[1]!,
              line0: text.slice(0, m.index! + m[0].indexOf(">") + 1).split("\n").length - 1,
          }))
        : [{ css: text, line0: 0 }];
    return sheets.flatMap(({ css, line0 }) => {
        const blank = css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));
        return [...blank.matchAll(/([A-Za-z-][\w-]*)\s*:\s*([^;{}]*)/g)]
            .filter((m) => m[2]!.includes("("))
            .map((m) => ({
                prop: m[1]!,
                value: m[2]!.trim(),
                at: `${relative(ROOT, file)}:${line0 + blank.slice(0, m.index).split("\n").length}`,
            }));
    });
}

/** Every function call in a value, with its top-level arguments. */
function calls(value: string): { name: string; args: string[] }[] {
    const out: { name: string; args: string[] }[] = [];
    for (let i = 0; i < value.length; i++) {
        const m = /^([A-Za-z_][\w-]*)\(/.exec(value.slice(i));
        if (!m) continue;
        const open = i + m[1]!.length;
        const args: string[] = [];
        let depth = 0;
        let part = open + 1;
        for (let j = open; j < value.length; j++) {
            if (value[j] === "(") depth++;
            else if (value[j] === ")" && --depth === 0) {
                args.push(value.slice(part, j).trim());
                break;
            } else if (value[j] === "," && depth === 1) {
                args.push(value.slice(part, j).trim());
                part = j + 1;
            }
        }
        out.push({ name: m[1]!.toLowerCase(), args });
    }
    return out;
}

/** The producer chain by which a value reaches a color-mix(), or null. */
function chainToMix(value: string, producers: Producers, stack: string[] = []): string[] | null {
    for (const c of calls(value)) {
        if (c.name === "color-mix") return [];
        const name = c.args[0];
        if (c.name !== "var" || !name || stack.includes(name)) continue;
        for (const p of producers.get(name) ?? []) {
            const via = chainToMix(p.value, producers, [...stack, name]);
            if (via) return [`${name} @ ${p.at}`, ...via];
        }
    }
    return null;
}

/** The color-mix() calls in a declaration whose two colour arms each reach a mix. */
function twoMixedArms(decl: Decl, producers: Producers): string[] {
    return calls(decl.value)
        .filter((c) => c.name === "color-mix" && c.args.length >= 3)
        .flatMap((c) => {
            const a = chainToMix(c.args[1]!, producers);
            const b = chainToMix(c.args[2]!, producers);
            if (!a || !b) return [];
            return [`${decl.at} ${decl.prop}\n  arm 1: ${a.join(" > ") || "a mix"}\n  arm 2: ${b.join(" > ") || "a mix"}`];
        });
}

const byName = (decls: Decl[]): Producers => {
    const map: Producers = new Map();
    for (const d of decls) if (d.prop.startsWith("--")) map.set(d.prop, [...(map.get(d.prop) ?? []), d]);
    return map;
};

const site = [...files(join(ROOT, "demo/styles"), ".css"), ...files(join(ROOT, "demo"), ".vue")].flatMap(declarations);
const glass = files(GLASS, ".css").flatMap(declarations);
const siteNames = byName(site);
const merged: Producers = new Map([...byName(glass), ...siteNames]);
const cut: Producers = new Map([...merged, ...[...siteNames.keys()].map((n): [string, Decl[]] => [n, []])]);

describe("a colour token mixes one level deep (WebKit's two-mixed-arm abort)", () => {
    it("reads the site's sheets and glass's shipped sheets", () => {
        expect(site.some((d) => d.prop === "--shadow-color")).toBe(true);
        expect(glass.some((d) => d.prop === "--blob-shadow-color")).toBe(true);
    });

    it("no site color-mix has two arms that each hold a mix", () => {
        expect(site.flatMap((d) => twoMixedArms(d, merged))).toEqual([]);
    });

    it("no glass color-mix takes that shape from the site's values", () => {
        const made = glass.filter((d) => twoMixedArms(d, cut).length === 0).flatMap((d) => twoMixedArms(d, merged));
        expect(made).toEqual([]);
    });

    it("the detector sees the shape that aborted: a token mixed with itself, holding a mix", () => {
        const fixture = byName([
            { prop: "--x", value: "color-mix(in oklab, red 20%, color-mix(in oklab, white 34%, black))", at: "fixture" },
            { prop: "--y", value: "oklab(from red calc(0.2 * l) a b)", at: "fixture" },
        ]);
        const self = (name: string): Decl => ({
            prop: "--z",
            value: `color-mix(in srgb, var(--blob-color, var(${name})) 22%, var(${name}))`,
            at: "fixture",
        });
        expect(twoMixedArms(self("--x"), fixture)).toHaveLength(1);
        expect(twoMixedArms(self("--y"), fixture)).toEqual([]);
    });
});

describe("the dark caster's resolved midtone is glass's dark ink at 34% into its dark paper", () => {
    it("the `0.8 *` terms of the dark --shadow-color carry that midtone in OKLab", () => {
        const dark = readFileSync(join(GLASS, "styles/tokens/dark-arm.css"), "utf8").match(/\.dark\{[^}]*\}/)![0];
        const token = (name: string) => dark.match(new RegExp(`${name}:\\s*([^;}]+)`))![1]!;
        const oklab = (css: string) => {
            const parsed = parseCssColor(css);
            if (!parsed.ok) throw new Error(`unparsable ${css}`);
            const c = convertColor(parsed.value, "oklab");
            if (!c.ok) throw new Error(`unconvertible ${css}`);
            return c.value.channels.map(Number);
        };
        const ink = oklab(token("--foreground"));
        const paper = oklab(token("--neutral-0"));
        const midtone = ink.map((v, i) => 0.34 * v + 0.66 * paper[i]!);

        const decl = site.find((d) => d.prop === "--shadow-color" && d.value.startsWith("oklab("));
        expect(decl, "the dark --shadow-color is one relative oklab()").toBeDefined();
        const written = [...decl!.value.matchAll(/0\.8 \* ([\d.]+)/g)].map((m) => Number(m[1]));
        expect(written).toHaveLength(3);
        // The build writes glass's hsl() inks as 8-bit hex, which moves the
        // midtone by under 5e-4; a retuned ink or paper moves it far more.
        written.forEach((v, i) => expect(Math.abs(v - midtone[i]!)).toBeLessThan(1e-3));
    });
});
