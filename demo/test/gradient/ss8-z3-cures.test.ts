/**
 * SS-8 Z3-workbench-about-cohort — the falsifiers that hold the REFUTED
 * GradientStopEditor rows (packet
 * `docs/tranches/X/execution/SS8/packets/Z3-workbench-about-cohort.md`). The
 * record's subject is now `GradientStopRail.vue` + `GradientStopInspector.vue`;
 * the cure LANDED there and in the gradient model. These lock it.
 *
 *   · Z-GradientStopEditor-1: a crossing drag re-sorts the model, so the
 *     serialized CSS re-feeds its own parser clean.
 *   · -6: a middle or right press on the bar mints nothing; a primary press does.
 *   · -14: the caret is a keyboard create path (Enter / Space mint at the caret).
 *   · -15: the bar is role=group and each handle is role=slider with a value.
 *   · -16 (absence/silence arm): at the floor Remove is disabled and carries
 *     its reason as its description.
 *   · -17: the inspector offers numeric position entry.
 *   · -13 (library, π-R1 totality): `oklch()` in the editor is a verdict,
 *     never a throw.
 *
 * Geometry arms (-2 axis, -3 inverse map, -4 teleport, -5 focus, -8/-8w coarse
 * tap, -9 chip ground, -10 visibility, -11 rem20, -18 outline) are witnessed
 * live only (E/gse.json, E/gse2*.json); jsdom lays nothing out.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import GradientStopRail from "../../workbenches/gradient/GradientVisualizer/GradientStopRail.vue";
import GradientStopInspector from "../../workbenches/gradient/GradientVisualizer/GradientStopInspector.vue";
import { parseGradientCSS } from "../../workbenches/gradient/composables/gradientParse";
import { useGradientModel } from "../../workbenches/gradient/composables/useGradientModel";

afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
});

function mountRail(canRemove = true) {
    vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
    const model = useGradientModel();
    return mount(GradientStopRail, {
        props: {
            stops: model.stops.value,
            canRemove,
            railRamp: model.railRampCSS.value,
            interpolationSpace: model.interpolationSpace.value,
            hueMethod: model.hueMethod.value,
        },
        attachTo: document.body,
    });
}

function press(el: Element, type: string, button: number) {
    el.dispatchEvent(new MouseEvent(type, { bubbles: true, button, clientX: 50, clientY: 5 }));
}

describe("Z3 · GradientStopEditor REFUTED rows stay cured", () => {
    it("-1: a crossing position write re-sorts; the CSS re-feeds its own parser", () => {
        const model = useGradientModel();
        const [first, last] = [model.stops.value[0]!, model.stops.value.at(-1)!];
        model.setStopPosition(first.id, 90);
        model.setStopPosition(last.id, 10);
        const positions = model.stops.value.map((s) => s.position);
        expect(positions).toEqual([...positions].sort((a, b) => a - b));
        expect(parseGradientCSS(model.simpleCSS.value).ok).toBe(true);
        expect(parseGradientCSS(model.coalescedCSS.value).ok).toBe(true);
    });

    it("-6: middle and right presses mint nothing; a primary press mints one", () => {
        const w = mountRail();
        const bar = w.get('[data-testid="gradient-stop-bar"]').element;
        for (const button of [1, 2]) {
            press(bar, "pointerdown", button);
            press(bar, "pointerup", button);
        }
        expect(w.emitted("add")).toBeUndefined();
        press(bar, "pointerdown", 0);
        press(bar, "pointerup", 0);
        expect(w.emitted("add")?.length).toBe(1);
        w.unmount();
    });

    it("-14/-15: bar role=group, handles role=slider, the caret mints on Enter and Space", async () => {
        const w = mountRail();
        const bar = w.get('[data-testid="gradient-stop-bar"]');
        expect(bar.attributes("role")).toBe("group");
        const handles = w.findAll('[role="slider"]');
        expect(handles.length).toBeGreaterThanOrEqual(2);
        for (const s of handles) {
            expect(s.attributes("aria-valuenow")).toBeDefined();
            expect(s.attributes("aria-label")).toBeTruthy();
        }
        const caret = w.get('[data-testid="gradient-stop-caret"]');
        await caret.trigger("keydown", { key: "Enter" });
        await caret.trigger("keydown", { key: " " });
        expect(w.emitted("add")?.length).toBe(2);
        w.unmount();
    });

    it("-16/-17: at the floor Remove is disabled with its reason; position entry is numeric", () => {
        const stop = { id: "a", cssColor: "red", position: 50, easing: undefined as never };
        const w = mount(GradientStopInspector, {
            props: { stop, index: 0, count: 2, refusal: "A gradient needs two stops.", notice: "" },
            attachTo: document.body,
        });
        const remove = w.get('[aria-label="Remove selected stop"]');
        expect(remove.attributes("disabled")).toBeDefined();
        const reasonId = remove.attributes("aria-describedby");
        expect(reasonId).toBeTruthy();
        expect(document.getElementById(reasonId!)?.textContent).toContain("two stops");
        const field = w.get('[data-testid="gradient-stop-position"]');
        expect(field.attributes("role")).toBe("spinbutton");
        w.unmount();
    });

    it("-13: oklch() in the editor is a verdict, never a throw", () => {
        const model = useGradientModel();
        let result: ReturnType<typeof model.applyCSS> | undefined;
        expect(() => {
            result = model.applyCSS("linear-gradient(90deg, oklch(), red)");
        }).not.toThrow();
        expect(result?.ok).toBe(false);
        expect(model.setStopsFromColors(["oklch()", "red"])).toEqual({
            ok: false,
            reason: 'unparseable color "oklch()"',
        });
    });
});

