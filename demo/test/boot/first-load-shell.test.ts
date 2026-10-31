/**
 * X.W11.p4c (COHESION §0go.2(a), ESC-W11p4b-1) — the first document load
 * paints from the shell.
 *
 * Before the cure, Vue's SSR compiler wrapped PaneSlot's children in
 * `<template>` because its <Transition> carried `appear` (compiler-ssr
 * `ssrProcessTransition` keys on the attribute's presence, bound or static),
 * and a `<template>`'s content is inert: the prerendered panes painted
 * nothing until the app hydrated. The SSR codegen is read here directly, so
 * the falsifier is the compiler's own output, not a client-compiled render.
 *
 * The overture sheet is read for the first-load settle's contract: transform
 * only (opacity never animated), scoped to a hydrated shell and retired by
 * `data-shell-settled`, absent under reduced motion; and the client-side
 * appear grammar (a client-rendered first view) stays as it was.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { compileScript, parse } from "@vue/compiler-sfc";
import { describe, expect, it } from "vitest";

const DEMO = path.resolve(import.meta.dirname, "../..");
const read = (rel: string) => readFileSync(path.join(DEMO, rel), "utf8");

function compilePaneSlot(ssr: boolean): string {
    const filename = path.join(DEMO, "shell/PaneSlot.vue");
    const { descriptor } = parse(read("shell/PaneSlot.vue"), { filename });
    return compileScript(descriptor, {
        id: "pane-slot",
        inlineTemplate: true,
        isProd: true,
        templateOptions: { ssr, ssrCssVars: [] },
    }).content;
}

/** The body of the first block opened by `selector` (brace-matched). */
function block(css: string, selector: string): string {
    const at = css.indexOf(selector);
    if (at < 0) throw new Error(`no block for ${selector}`);
    const open = css.indexOf("{", at);
    let depth = 0;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
    }
    throw new Error(`unclosed block for ${selector}`);
}

describe("X.W11.p4c (a) — the shell's panes are contentful from the first frame", () => {
    it("PaneSlot's SSR codegen pushes no <template> wrapper", () => {
        const ssr = compilePaneSlot(true);
        expect(ssr).toContain("_push(");
        expect(ssr).not.toMatch(/_push\(`<template>/);
    });

    it("the client codegen keeps the full appear grammar", () => {
        const client = compilePaneSlot(false);
        expect(client).toContain("overture-appear-active");
        expect(client).toContain("overture-appear-from");
        expect(client).toContain("overture-appear-to");
    });

    const overture = read("app/composables/boot/overture.css");

    it("the first-load settle is transform-only and retires once settled", () => {
        const keyframes = block(overture, "@keyframes overture-shell-settle");
        expect(keyframes).toMatch(/transform:/);
        expect(keyframes).not.toMatch(/opacity/);
        const rule = block(
            overture,
            'html[data-first-view="shell"]:not([data-shell-settled])',
        );
        expect(rule).toMatch(/animation:\s*overture-shell-settle/);
        expect(rule).not.toMatch(/opacity/);
    });

    it("under reduced motion the settle does not exist", () => {
        const at = overture.indexOf("@keyframes overture-shell-settle");
        const media = overture.lastIndexOf("@media", at);
        expect(overture.slice(media, overture.indexOf("{", media))).toMatch(
            /prefers-reduced-motion:\s*no-preference/,
        );
        const prm = block(
            overture,
            "@media (prefers-reduced-motion: reduce) {\n    .overture-appear-active",
        );
        expect(prm).toMatch(/\.overture-appear-active\s*{\s*animation:\s*none/);
    });

    it("the client appear grammar is unchanged: a transform-only plate settle", () => {
        const keyframes = block(overture, "@keyframes overture-plate-settle");
        expect(keyframes).toMatch(/translateY\(-12px\) rotate\(-0\.6deg\)/);
        expect(keyframes).not.toMatch(/opacity/);
        expect(block(overture, ".overture-appear-active {")).toMatch(
            /animation:\s*overture-plate-settle/,
        );
    });
});
