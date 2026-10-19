// SERVED MODEL: claude-opus-5-5
/**
 * X.W8.dc — the `DockCommand` provide/inject registry (COHESION §0k.3 S-1).
 *
 * The shell builds the scene's typed `SceneActionSet` ONCE and provides it under
 * `DOCK_COMMAND_KEY`; every dock seat injects it. The claim under test is the
 * one A3 measures in a browser: a phone seat and a desktop seat run the SAME
 * handler, because they hold the SAME provided set — there is no second copy
 * to drift and no breakpoint on the path.
 *
 * Falsifier: a seat mounted under no provider (the provide deleted) throws at
 * its inject — it can never render as a quietly empty bar.
 */
import { describe, expect, it } from "vitest";
import { computed, defineComponent, h, ref, type ComputedRef } from "vue";
import { mount } from "@vue/test-utils";
import { injectDockCommands, useSceneActions } from "../../shell/useSceneActions";
import { VIEW_MAP, type ViewId } from "../../shell/viewSchema";
import type { ViewManager } from "../../shell/useViewManager";
import type {
    GenerateSceneTarget,
    SceneAction,
    SceneActionSet,
} from "../../color-session/keys";

function viewManagerAt(view: ViewId): ViewManager {
    const current = ref<ViewId>(view);
    return {
        currentView: computed(() => current.value),
        previousView: ref(null),
        currentConfig: computed(() => VIEW_MAP[current.value]),
        switchView: (id) => {
            current.value = id;
        },
        goBack: () => {},
        viewMap: VIEW_MAP,
    };
}

function regenerateOf(set: SceneActionSet | null): SceneAction {
    const action = set?.actions.find((a) => a.token === "generate.regenerate");
    if (action === undefined) throw new Error("no generate.regenerate seat");
    return action;
}

function press(action: SceneAction): void {
    const { state } = action;
    if (state.kind !== "ready" && state.kind !== "failed") {
        throw new Error(`seat not operable: ${state.kind}`);
    }
    state.run();
}

describe("X.W8.dc · the DockCommand registry (S-1)", () => {
    it("every dock seat injects the ONE provided set and drives the same handler", () => {
        let regenerated = 0;
        const generate: GenerateSceneTarget = {
            regenerate: () => {
                regenerated += 1;
            },
            save: () => {},
            copyColors: () => {},
        };

        const seats: Record<"desktop" | "mobile", ComputedRef<SceneActionSet | null> | null> =
            { desktop: null, mobile: null };
        const Seat = defineComponent({
            props: { name: { type: String as () => "desktop" | "mobile", required: true } },
            setup(props) {
                seats[props.name] = injectDockCommands();
                return () => h("div");
            },
        });

        let provided: ComputedRef<SceneActionSet | null> | null = null;
        const Shell = defineComponent({
            setup() {
                provided = useSceneActions(viewManagerAt("generate"), {
                    colorSceneTarget: () => null,
                    scenePanes: () => ({ generate, gradient: null, mix: null }),
                });
                return () => [h(Seat, { name: "desktop" }), h(Seat, { name: "mobile" })];
            },
        });

        const wrapper = mount(Shell);
        try {
            // One registry: both seats hold the very computed the shell built.
            expect(seats.desktop).toBe(provided);
            expect(seats.mobile).toBe(provided);

            press(regenerateOf(seats.mobile!.value));
            expect(regenerated).toBe(1);
            press(regenerateOf(seats.desktop!.value));
            expect(regenerated).toBe(2);
        } finally {
            wrapper.unmount();
        }
    });

    it("falsifier: a seat with no provider throws at its inject, never renders empty", () => {
        const Seat = defineComponent({
            setup() {
                injectDockCommands();
                return () => h("div");
            },
        });
        expect(() => mount(Seat)).toThrow(/DOCK_COMMAND_KEY is not provided/);
    });
});
