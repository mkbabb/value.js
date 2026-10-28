/**
 * SS-8 B23-mix-canvas-result — cures (useMixingAnimation, the narration canvas).
 *
 * The rows were REFUTED at HEAD because X.W6.j (`17dd0df47`) had already cured
 * them: the 2D context is held only for the narration window, `release()` is the
 * one teardown, and a narration cut short by a route-away settles. This file
 * pins each cure at the composable: RED against the pre-X.W6.j composable
 * (`17dd0df47~1`), GREEN at HEAD.
 *
 *   · SS8-0636 (canvas R-3): KeepAlive deactivation mid-narration stops the
 *     clock and returns the backing store (canvas 0x0).
 *   · SS8-0642 (canvas R-9): the cut-short narration SETTLES (onSettled fires
 *     once), so reactivation shows the inked plate, never a retained composite.
 *   · SS8-0639 (canvas R-6): a null `getContext("2d")` settles and releases
 *     instead of arming a clock that has nothing to draw on (the silent strand).
 *     The settle had landed; the release had NOT: `arm` sizes the canvas before
 *     it asks for a context, and `release()` found the canvas through the (null)
 *     context, so the pane-extent store and `style.height` stayed behind. RED at
 *     `3d6662fa0` too; cured in this batch (release reads the canvas itself).
 *   · SS8-0641 (canvas R-8): release clears the canvas's pane-extent
 *     `style.height`, so the next arm measures the pane's own `scrollHeight`
 *     rather than a stale canvas-held extent.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, KeepAlive, nextTick, ref, shallowRef } from "vue";
import type { Ref } from "vue";

vi.mock("../../workbenches/mix/MixAnimationCanvas/composables/mixStage", () => ({
    MIX_ARRIVE_MS: 400,
    MIX_CONVERGE_MS: 900,
    MIX_EPILOGUE_MS: 300,
    // A measurable stage: the narration has something to tell.
    collectStage: () => ({ drops: [] }),
    drawStage: () => {},
}));

import { useMixingAnimation } from "../../workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation";
import type { AnimationPhase } from "../../workbenches/mix/composables/useMixingState";

const PANE_W = 510;
const PANE_SCROLL_H = 619;

function fakeCtx(canvas: HTMLCanvasElement) {
    return {
        canvas,
        setTransform: () => {},
        clearRect: () => {},
    } as unknown as CanvasRenderingContext2D;
}

interface Rig {
    phase: Ref<AnimationPhase>;
    show: Ref<boolean>;
    canvas: () => HTMLCanvasElement;
    onSettled: ReturnType<typeof vi.fn>;
    unmount: () => void;
}

function rig(): Rig {
    const phase = ref<AnimationPhase>("idle");
    const show = ref(true);
    const onSettled = vi.fn();
    let el: HTMLCanvasElement | null = null;

    const Scene = defineComponent({
        name: "MixScene",
        setup() {
            const canvasRef = shallowRef<HTMLCanvasElement | null>(null);
            useMixingAnimation(canvasRef, phase, {
                result: ref({ type: "color", css: "rgb(10 20 30)" } as never),
                space: ref("oklch" as never),
                hueMethod: ref("shorter" as never),
                onSettled,
            });
            return () =>
                h("div", { class: "pane" }, [
                    h("canvas", {
                        ref: (c: unknown) => {
                            if (c) el = c as HTMLCanvasElement;
                            canvasRef.value = (c as HTMLCanvasElement) ?? null;
                        },
                    }),
                ]);
        },
    });
    const Other = defineComponent({ name: "OtherScene", render: () => h("p", "other") });
    const Host = defineComponent({
        render: () => h(KeepAlive, null, [show.value ? h(Scene) : h(Other)]),
    });

    const w = mount(Host, { attachTo: document.body });
    const pane = document.querySelector(".pane") as HTMLElement;
    Object.defineProperty(pane, "clientWidth", { configurable: true, value: PANE_W });
    Object.defineProperty(pane, "scrollHeight", { configurable: true, value: PANE_SCROLL_H });

    return { phase, show, canvas: () => el!, onSettled, unmount: () => w.unmount() };
}

describe("SS-8 B23 — the narration canvas lives only as long as its narration", () => {
    let getContext: MockInstance<HTMLCanvasElement["getContext"]>;

    beforeEach(() => {
        getContext = vi
            .spyOn(HTMLCanvasElement.prototype, "getContext")
            .mockImplementation(function (this: HTMLCanvasElement) {
                return fakeCtx(this) as never;
            });
    });
    afterEach(() => {
        getContext.mockRestore();
        document.body.innerHTML = "";
    });

    it("SS8-0636 / SS8-0642: deactivation mid-narration releases the store and settles once", async () => {
        const r = rig();
        r.phase.value = "mixing";
        await nextTick();
        const canvas = r.canvas();
        // Armed: the pane-extent backing store is allocated.
        expect(canvas.width).toBe(PANE_W);
        expect(canvas.height).toBe(PANE_SCROLL_H);
        expect(r.onSettled).not.toHaveBeenCalled();

        // Route away: KeepAlive deactivates the scene mid-narration.
        r.show.value = false;
        await nextTick();
        await nextTick();

        expect([canvas.width, canvas.height], "backing store released on deactivation").toEqual([0, 0]);
        expect(r.onSettled, "the cut-short narration settles, never strands").toHaveBeenCalledTimes(1);
        r.unmount();
    });

    it("SS8-0639: a null 2D context settles and releases instead of arming a dead clock", async () => {
        getContext.mockImplementation(() => null);
        const r = rig();
        r.phase.value = "mixing";
        await nextTick();
        const canvas = r.canvas();

        expect(r.onSettled, "null context settles synchronously").toHaveBeenCalledTimes(1);
        expect([canvas.width, canvas.height, canvas.style.height]).toEqual([0, 0, ""]);
        r.unmount();
    });

    it("SS8-0641: the phase reset releases the canvas-held scroll extent", async () => {
        const r = rig();
        r.phase.value = "mixing";
        await nextTick();
        const canvas = r.canvas();
        expect(canvas.style.height).toBe(`${PANE_SCROLL_H}px`);

        r.phase.value = "idle";
        await nextTick();

        expect(canvas.style.height, "no stale extent survives into the next arm").toBe("");
        expect([canvas.width, canvas.height]).toEqual([0, 0]);
        r.unmount();
    });
});
