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

describe("V15-03 — a labelled glass Button speaks the body voice", () => {
    const sites = vueFiles(DEMO).flatMap((f) =>
        labelledButtons(f).map((b) => ({ ...b, at: `${path.relative(DEMO, f)}:${b.line}` })),
    );

    it("finds the labelled verbs (the scan is not vacuous)", () => {
        expect(sites.length).toBeGreaterThan(30);
    });

    it("no labelled Button sets a family utility on itself", () => {
        const offenders = sites
            .filter((s) => /(^|[\s'"`])font-(display|serif|mono|sans)\b/.test(s.classes))
            .map((s) => s.at);
        expect(offenders).toEqual([]);
    });
});
