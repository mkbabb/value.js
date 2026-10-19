// SERVED MODEL: claude-opus-5-5
/**
 * X-W12U .q2 — D4's "an unregistered target is a TYPED, SURFACED state" leg,
 * read at the builder.
 *
 * `e2e/smoke/scene-action-contract.spec.ts` used the mobile layout as its
 * unregistered fixture: App's mobile `<PaneSlot>` carried no `:on-mount`, so no
 * scene pane registered. X.W5.a's `bindPane` (`de99ec156`) cured that, so every
 * layout now registers and the e2e cells read `ready` (re-baselined there).
 * The unregistered branch still exists — `useSceneActions`'s TOTAL resolver
 * returns `unavailable` with the scene's reason for a null target — and this
 * test is where it stays falsifiable: a scene whose pane has not registered
 * models every seat `unavailable`, never `undefined` and never `ready`.
 */
import { describe, expect, it } from "vitest";
import { computed, defineComponent, h, ref } from "vue";
import { mount } from "@vue/test-utils";
import { useSceneActions } from "../../shell/useSceneActions";
import { VIEW_MAP, type ViewId } from "../../shell/viewSchema";
import type { ViewManager } from "../../shell/useViewManager";
import type { SceneActionSet } from "../../color-session/keys";

function actionSetFor(view: ViewId): SceneActionSet | null {
    const current = ref<ViewId>(view);
    const viewManager: ViewManager = {
        currentView: computed(() => current.value),
        previousView: ref(null),
        currentConfig: computed(() => VIEW_MAP[current.value]),
        switchView: (id) => {
            current.value = id;
        },
        goBack: () => {},
        viewMap: VIEW_MAP,
    };
    let read: SceneActionSet | null = null;
    const Host = defineComponent({
        setup() {
            const set = useSceneActions(viewManager, {
                colorSceneTarget: () => null,
                scenePanes: () => ({ generate: null, gradient: null, mix: null }),
            });
            read = set.value;
            return () => h("div");
        },
    });
    mount(Host).unmount();
    return read;
}

describe("D4 · an unregistered scene target is a TYPED state (X-W12U .q2)", () => {
    for (const [view, tokens, reason] of [
        [
            "generate",
            ["generate.regenerate", "generate.save", "generate.copyColors"],
            "the Generate pane is not registered in this layout",
        ],
        [
            "gradient",
            ["gradient.reset", "gradient.copyCSS", "gradient.seedFromPalette"],
            "the Gradient pane is not registered in this layout",
        ],
        [
            "mix",
            ["mix.clearSelection", "mix.startMix", "mix.copyResult"],
            "the Mix pane is not registered in this layout",
        ],
    ] as const) {
        it(`${view}: every seat is named and modelled 'unavailable' with the scene's reason`, () => {
            const set = actionSetFor(view);
            expect(set).not.toBeNull();
            expect(set!.actions.map((a) => a.token)).toEqual([...tokens]);
            for (const action of set!.actions) {
                expect(action.state).toEqual({ kind: "unavailable", reason });
            }
        });
    }
});
