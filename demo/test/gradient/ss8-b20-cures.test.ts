/**
 * SS-8 B20-gradient-visualizer-code — the falsifiers that hold the REFUTED rows.
 *
 * Every row below was REFUTED live at served HEAD (packet
 * `docs/tranches/X/execution/SS8/packets/B20-gradient-visualizer-code.md`):
 * the defect the record names is already cured by a landed change, or there
 * was none. These lock the cured state so the defect cannot return unseen.
 *
 *   · SS8-0563 (D3-5): the verdict and the code specimen speak ONE type token
 *     (`text-mono-small`), so they match at every viewport rung.
 *   · SS8-0564 (A-3): every crayon clears 4.5:1 on the opaque `--code-ground`,
 *     over EVERY accent hue at the ground's chroma cap, in both schemes (the
 *     ground is seed-derived, so a single-seed reading is not enough).
 *   · SS8-0566: the editor wraps at word boundaries (`wrap-break-word`), never
 *     `break-all`, so no token is severed mid-literal.
 *   · SS8-0572 (L-3): the editor paints its own opaque `--code-ground`; the
 *     scoped rule outranks `.hljs { background: transparent }`.
 *   · SS8-0574 (A-14c): the boundary's fallback stands on a resting glass Card
 *     that fills the region (UIA-V-184), with icon, message, detail and Button
 *     all inside it.
 *   · SS8-0575 (L-16): the empty-call literals (`oklch()`, `calc()`, `foo()`)
 *     come back from the gradient parser as verdicts; nothing throws (A-1).
 *   · R-14 / SS8-0590 (GV-68): a closed easing row mounts no specimen strip
 *     (A2-VA-L1-12: glass's Accordion unmounts closed content).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { computed, defineComponent, h } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import { parse as parseSfc } from "@vue/compiler-sfc";
import { oklch, parseCssColor, toRgba8, type AnyColor } from "@mkbabb/value.js/color";
import ErrorBoundary from "../../app/ErrorBoundary.vue";
import GradientCodeEditor from "../../workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue";
import GradientEasingEditor from "../../workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue";
import { parseGradientCSS } from "../../workbenches/gradient/composables/gradientParse";
import { useGradientModel } from "../../workbenches/gradient/composables/useGradientModel";
import { INK_AMBIENT_KEY } from "../../color-session/keys";

const DEMO = resolve(import.meta.dirname, "../..");

afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
});

function mountEditor(parseVerdict: string | null) {
    return mount(GradientCodeEditor, {
        props: { modelValue: "linear-gradient(90deg in oklch, red 0%, blue 100%)", parseVerdict },
        attachTo: document.body,
    });
}

describe("SS8-0563 · the verdict and the code specimen wear one type token", () => {
    it("both carry text-mono-small and no other size token", () => {
        const w = mountEditor('unparseable color "oklch()"');
        const editor = w.get('[role="textbox"]').element;
        const verdict = w.get('[data-testid="gradient-parse-verdict"]').element;
        const sizeTokens = (el: Element) => [...el.classList].filter((c) => /^text-(mono|micro|caption|body|small|xs|sm|base|lg)/.test(c));
        expect(sizeTokens(editor)).toEqual(["text-mono-small"]);
        expect(sizeTokens(verdict)).toEqual(["text-mono-small"]);
        w.unmount();
    });
});

describe("SS8-0566 · the editor never severs a token", () => {
    it("wraps at word boundaries and preserves the block form's line breaks", () => {
        const w = mountEditor(null);
        const cls = w.get('[role="textbox"]').element.classList;
        expect(cls.contains("wrap-break-word")).toBe(true);
        expect(cls.contains("whitespace-pre-wrap")).toBe(true);
        expect([...cls].some((c) => /break-all|break-words?$/.test(c) && c !== "wrap-break-word")).toBe(false);
        w.unmount();
    });
});

// ── The code ground and the crayons (SS8-0564, SS8-0572) ──

/** The declarations of one top-level rule of hljs.css, by exact selector. */
function hljsRule(selector: string): Map<string, string> {
    const css = readFileSync(resolve(DEMO, "styles/hljs.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
    const rule = rules.find((m) => m[1]!.split(",").map((s) => s.trim()).includes(selector));
    if (!rule) throw new Error(`hljs.css has no rule for ${selector}`);
    const decls = new Map<string, string>();
    for (const d of rule[2]!.split(";")) {
        const i = d.indexOf(":");
        if (i > 0) decls.set(d.slice(0, i).trim(), d.slice(i + 1).trim());
    }
    return decls;
}

/** `--code-ground: oklch(from var(--accent-live) L min(c[ * k], CAP) h)` → its pinned L and chroma cap. */
function groundLaw(value: string) {
    const m = value.match(/^oklch\(from var\(--accent-live\)\s+([\d.]+)\s+min\(c(?:\s*\*\s*[\d.]+)?,\s*([\d.]+)\)\s+h\)$/);
    if (!m) throw new Error(`--code-ground is no longer the pinned-L / capped-chroma law: ${value}`);
    return { L: Number(m[1]), cap: Number(m[2]) };
}

function luminance(color: AnyColor): number {
    const rgba = toRgba8(color, { gamut: "clip" });
    if (!rgba.ok) throw new Error("unencodable");
    const lin = (v: number) => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(rgba.value[0]) + 0.7152 * lin(rgba.value[1]) + 0.0722 * lin(rgba.value[2]);
}

function ratio(a: AnyColor, b: AnyColor): number {
    const [x, y] = [luminance(a), luminance(b)];
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const CRAYONS = ["--code-comment", "--code-keyword", "--code-entity", "--code-string", "--code-number"] as const;

describe("SS8-0564 · every crayon clears 4.5:1 on the code ground, at every accent hue", () => {
    for (const scheme of [":root", ".dark"] as const) {
        it(`${scheme === ":root" ? "light" : "dark"}: worst case over h 0..359 at the chroma cap and at C 0`, () => {
            const rule = hljsRule(scheme);
            const { L, cap } = groundLaw(rule.get("--code-ground")!);
            const crayons = CRAYONS.map((name) => {
                const parsed = parseCssColor(rule.get(name)!);
                if (!parsed.ok) throw new Error(`${name} unparseable`);
                return { name, color: parsed.value };
            });
            let worst = { name: "", hue: -1, chroma: -1, ratio: Infinity };
            for (const chroma of [0, cap]) {
                for (let hue = 0; hue < 360; hue++) {
                    const ground = oklch(L, chroma, hue);
                    if (!ground.ok) throw new Error("ground");
                    for (const c of crayons) {
                        const r = ratio(c.color, ground.value);
                        if (r < worst.ratio) worst = { name: c.name, hue, chroma, ratio: r };
                    }
                }
            }
            expect(worst.ratio, JSON.stringify(worst)).toBeGreaterThanOrEqual(4.5);
        });
    }
});

describe("SS8-0572 · the editor paints its own opaque code ground", () => {
    it("the scoped .code-editor rule sets background: var(--code-ground), and the ground has no alpha", () => {
        const source = readFileSync(resolve(DEMO, "workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue"), "utf8");
        const { descriptor } = parseSfc(source);
        const scoped = descriptor.styles.filter((s) => s.scoped).map((s) => s.content.replace(/\/\*[\s\S]*?\*\//g, "")).join("\n");
        const rule = [...scoped.matchAll(/(^|\})\s*\.code-editor\s*\{([^{}]*)\}/g)].map((m) => m[2]).join(";");
        expect(rule).toMatch(/(^|;)\s*background:\s*var\(--code-ground\)\s*(;|$)/);
        for (const scheme of [":root", ".dark"]) {
            // groundLaw throws unless the ground is the alpha-free oklch(from … L C h) form.
            expect(() => groundLaw(hljsRule(scheme).get("--code-ground")!)).not.toThrow();
        }
        const w = mountEditor(null);
        expect(w.get('[role="textbox"]').classes()).toContain("code-editor");
        w.unmount();
    });
});

describe("SS8-0574 · the boundary fallback paints whole on a resting Card", () => {
    it("a setup throw lands on a resting Card holding the plate and its Try-again Button", async () => {
        const Boom = defineComponent({
            setup() {
                throw new Error("SS8-0574 deliberate setup throw");
            },
            render: () => h("div"),
        });
        const w = mount(ErrorBoundary, { slots: { default: () => h(Boom) }, attachTo: document.body });
        await flushPromises();
        const plate = document.querySelector(".vj-error-boundary")!;
        expect(plate).not.toBeNull();
        const card = plate.parentElement!;
        expect(card.getAttribute("data-tier") ?? card.className).toMatch(/resting/);
        expect(card.classList.contains("w-full") && card.classList.contains("h-full")).toBe(true);
        expect(card.contains(plate.querySelector("button"))).toBe(true);
        expect(plate.textContent).toMatch(/SS8-0574 deliberate setup throw|went wrong|panel/i);
        w.unmount();
    });
});

describe("SS8-0575 · the empty-call class returns verdicts, never throws", () => {
    for (const literal of ["oklch()", "calc()", "foo()"]) {
        it(`linear-gradient(90deg, ${literal}, blue) is a verdict`, () => {
            let res: ReturnType<typeof parseGradientCSS> | undefined;
            expect(() => (res = parseGradientCSS(`linear-gradient(90deg, ${literal} 0%, blue 100%)`))).not.toThrow();
            expect(res!.ok).toBe(false);
            if (!res!.ok) expect(res!.reason).toContain(literal);
        });
    }
});

describe("R-14 (SS8-0590) · a closed easing row mounts no specimen strip", () => {
    it("12 stops, all rows closed: zero strips; one row open: exactly one strip", async () => {
        // jsdom ships no CSS.escape; the open row's authoring stage queries by label with it.
        vi.stubGlobal("CSS", { ...globalThis.CSS, escape: (s: string) => s.replace(/["\\]/g, "\\$&") });
        vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
        const model = useGradientModel();
        for (let i = 0; i < 10; i++) model.mintStop((i + 1) / 11 * 100);
        expect(model.stops.value.length).toBe(12);
        const w = mount(GradientEasingEditor, {
            props: { stops: model.stops.value, modelState: model.modelState.value },
            global: { provide: { [INK_AMBIENT_KEY as symbol]: computed(() => 0.5) } },
            attachTo: document.body,
        });
        await flushPromises();
        expect(document.querySelectorAll(".easing-row").length).toBe(11);
        expect(document.querySelectorAll(".specimen-strip").length).toBe(0);
        (document.querySelector(".interval-head") as HTMLElement).click();
        await flushPromises();
        expect(document.querySelectorAll(".specimen-strip").length).toBe(1);
        w.unmount();
    });
});
