/**
 * X-DS value pass 15 (V15-03) — ONE voice for a labelled verb.
 *
 * `demo/DESIGN.md`'s three-voice law reserves Fraunces for display rungs and
 * says it is "Never on body/control text". A labelled glass Button is control
 * text, so it speaks glass's default label voice (the body sans). Pass cures
 * had added `font-display` one call site at a time, so the app spoke its verbs
 * in two typefaces. The ruling is to hold the law; this scan keeps it from
 * drifting again: no glass Button that carries a text label sets
 * `font-display` (or any other family utility) on itself.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "@vue/compiler-sfc";
import { NodeTypes, type ElementNode, type TemplateChildNode } from "@vue/compiler-core";

const DEMO = path.resolve(import.meta.dirname, "../..");
const SHADCN = path.join(DEMO, "@", "components", "ui");

function vueFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((f) => {
        const p = path.join(dir, f);
        if (p === SHADCN || f === "node_modules" || f === "test") return [];
        return statSync(p).isDirectory() ? vueFiles(p) : p.endsWith(".vue") ? [p] : [];
    });
}

/** True when the subtree carries visible words (text or an interpolation). */
function hasLabel(children: TemplateChildNode[]): boolean {
    return children.some((c) => {
        if (c.type === NodeTypes.TEXT) return c.content.trim().length > 0;
        if (c.type === NodeTypes.INTERPOLATION) return true;
        if (c.type === NodeTypes.ELEMENT) {
            // An always-screen-reader-only span is not a visible label (a
            // breakpoint-scoped `max-sm:sr-only` one still is, above it).
            const cls = c.props.find((p) => p.type === NodeTypes.ATTRIBUTE && p.name === "class");
            if (cls && cls.type === NodeTypes.ATTRIBUTE && (cls.value?.content ?? "").split(/\s+/).includes("sr-only")) return false;
            return hasLabel(c.children);
        }
        return false;
    });
}

/** The static and bound class text on an element (bindings read as source). */
function classText(el: ElementNode): string {
    return el.props
        .map((p) => {
            if (p.type === NodeTypes.ATTRIBUTE && p.name === "class") return p.value?.content ?? "";
            if (p.type === NodeTypes.DIRECTIVE && p.name === "bind" && p.arg?.type === NodeTypes.SIMPLE_EXPRESSION && p.arg.content === "class")
                return p.exp?.type === NodeTypes.SIMPLE_EXPRESSION ? p.exp.content : "";
            return "";
        })
        .join(" ");
}

function labelledButtons(file: string): { line: number; classes: string }[] {
    const src = readFileSync(file, "utf8");
    if (!/from\s+["']@mkbabb\/glass-ui\/button["']/.test(src)) return [];
    const { descriptor } = parse(src, { filename: file });
    const ast = descriptor.template?.ast;
    if (!ast) return [];
    const out: { line: number; classes: string }[] = [];
    const walk = (nodes: TemplateChildNode[]) => {
        for (const n of nodes) {
            if (n.type !== NodeTypes.ELEMENT) continue;
            if (n.tag === "Button" && hasLabel(n.children)) {
                out.push({ line: n.loc.start.line, classes: classText(n) });
            }
            walk(n.children);
        }
    };
    walk(ast.children);
    return out;
}

/** Every element named `tag` in a file's template (no label filter). */
function elements(file: string, tags: string[]): { tag: string; line: number; classes: string }[] {
    const src = readFileSync(file, "utf8");
    const { descriptor } = parse(src, { filename: file });
    const ast = descriptor.template?.ast;
    if (!ast) return [];
    const out: { tag: string; line: number; classes: string }[] = [];
    const walk = (nodes: TemplateChildNode[]) => {
        for (const n of nodes) {
            if (n.type !== NodeTypes.ELEMENT) continue;
            if (tags.includes(n.tag)) out.push({ tag: n.tag, line: n.loc.start.line, classes: classText(n) });
            walk(n.children);
        }
    };
    walk(ast.children);
    return out;
}

const FAMILY = /(^|[\s'"`])font-(display|serif|mono|sans)\b/;

describe("V15-03 — a labelled glass Button speaks the body voice", () => {
    const sites = vueFiles(DEMO).flatMap((f) =>
        labelledButtons(f).map((b) => ({ ...b, at: `${path.relative(DEMO, f)}:${b.line}` })),
    );

    it("finds the labelled verbs (the scan is not vacuous)", () => {
        expect(sites.length).toBeGreaterThan(30);
    });

    it("no labelled Button sets a family utility on itself", () => {
        const offenders = sites
            .filter((s) => FAMILY.test(s.classes))
            .map((s) => s.at);
        expect(offenders).toEqual([]);
    });
});

/**
 * X-DS value pass 16 (V16-04) — a tab strip is control text too. A family
 * utility on glass SegmentedTabs / Tabs re-voiced the Names strip in Fraunces,
 * and the display face's taller line box pushed glass's sliding indicator out
 * of its track. The strip speaks glass's default label voice, as Mix's does.
 */
describe("V16-04 — a glass tab strip speaks the body voice", () => {
    const TABS = ["SegmentedTabs", "Tabs", "TabsList", "TabsTrigger"];
    const sites = vueFiles(DEMO).flatMap((f) =>
        /@mkbabb\/glass-ui\/(segmented-tabs|tabs)/.test(readFileSync(f, "utf8"))
            ? elements(f, TABS).map((e) => ({ ...e, at: `${path.relative(DEMO, f)}:${e.line}` }))
            : [],
    );

    it("finds the tab strips (the scan is not vacuous)", () => {
        expect(sites.length).toBeGreaterThan(1);
    });

    it("no tab strip sets a family utility on itself", () => {
        expect(sites.filter((s) => FAMILY.test(s.classes)).map((s) => s.at)).toEqual([]);
    });
});

/**
 * X-DS value pass 16 (V16-06) — ONE dialog-title voice. The house's title
 * surfaces speak the display register (O-10d: `font-display font-medium`, the
 * T.W4-6 rung), and three dialogs already did while the confirms kept glass's
 * sans default, so the app titled its dialogs in two faces. Every DialogTitle
 * carries the register.
 */
describe("V16-06 — every DialogTitle speaks the display register", () => {
    const sites = vueFiles(DEMO).flatMap((f) =>
        elements(f, ["DialogTitle"]).map((e) => ({ ...e, at: `${path.relative(DEMO, f)}:${e.line}` })),
    );

    it("finds the dialog titles (the scan is not vacuous)", () => {
        expect(sites.length).toBeGreaterThan(8);
    });

    it("each carries font-display font-medium", () => {
        const off = sites.filter((s) => !/\bfont-display\b/.test(s.classes) || !/\bfont-medium\b/.test(s.classes));
        expect(off.map((s) => s.at)).toEqual([]);
    });
});

/**
 * X-DS value pass 16 (V16-02) — machine identifiers render as stored. The
 * admin panes set slugs, reasons, actions and dates in glass's
 * `text-mono-caption` (uppercase, tracked caps) and an inline small-caps note,
 * so `crimson-owl-77` read CRIMSON-OWL-77. value-canon §2 Type: no uppercase
 * tracking, no small-caps labels. The admin templates carry no case transform.
 */
describe("V16-02 — the admin panes show identifiers in the case they have", () => {
    const ADMIN = path.join(DEMO, "palettes", "admin");
    const CAPS = /\b(text-mono-caption|uppercase|small-caps|tracking-wide(r|st)?|tracking-\[)/;
    const files = vueFiles(ADMIN);

    it("scans the admin panes (not vacuous)", () => {
        expect(files.length).toBeGreaterThan(5);
    });

    it("no admin template carries a case transform or caps tracking", () => {
        const offenders = files.flatMap((f) => {
            const tpl = parse(readFileSync(f, "utf8"), { filename: f }).descriptor.template;
            if (!tpl) return [];
            // comments blanked in place (line numbers kept): only markup counts
            return tpl.content
                .replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " "))
                .split("\n")
                .map((l, i) => ({ l, at: `${path.relative(DEMO, f)}:${tpl.loc.start.line + i}` }))
                .filter(({ l }) => CAPS.test(l))
                .map(({ at }) => at);
        });
        expect(offenders).toEqual([]);
    });
});
