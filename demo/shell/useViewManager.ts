import { ref, computed, type ComputedRef, type Ref } from "vue";
import type { InjectionKey } from "vue";
import { useRouter, useRoute } from "vue-router";

import {
    VIEW_MAP,
    isViewId,
    type ViewId,
    type PaneId,
    type RegionRole,
    type SceneRegion,
    type PaneConfig,
} from "./viewSchema";

// Re-export the schema types so existing consumers that import from
// `useViewManager` continue to resolve cleanly (the schema is the single
// source of truth; this re-export preserves the import paths).
export type { ViewId, PaneId, RegionRole, SceneRegion, PaneConfig };

export interface ViewManager {
    /**
     * X.W5.c (⟨PSC-15(b)⟩): typed HONESTLY as the computed it has always been.
     * The retired double-launder on the way out of this function advertised a
     * read-only computed as WRITABLE, so any consumer could type-check a write
     * Vue then silently dropped. A `ComputedRef` is what it is. (The retired
     * cast is quoted once, in the wave record at
     * docs/tranches/X/execution/A/X-W5.md § X.W5.c, so the N14 census reads
     * this tree and not its own footnotes.)
     */
    currentView: ComputedRef<ViewId>;
    previousView: Ref<ViewId | null>;
    currentConfig: ComputedRef<PaneConfig>;
    /** False until the router has resolved the initial route */
    ready: Ref<boolean>;
    switchView: (id: ViewId) => void;
    goBack: () => void;
    viewMap: typeof VIEW_MAP;
}

export const VIEW_MANAGER_KEY: InjectionKey<ViewManager> = Symbol("viewManager");

export function useViewManager(): ViewManager {
    const router = useRouter();
    const route = useRoute();

    // Suppress pane transition on initial route resolution
    const ready = ref(false);
    router.isReady().then(() => {
        ready.value = true;
    });

    const currentView = computed<ViewId>(() => {
        const name = route.name as string;
        return isViewId(name) ? name : "picker";
    });

    const previousView = ref<ViewId | null>(null);
    const currentConfig = computed(() => VIEW_MAP[currentView.value]);

    // X.W5.c · V·L2 — the mobile pane INDEX and its view-tagged override are
    // GONE, with the schema's default-index field and App.vue's breakpoint
    // fork (all four spellings quoted once in the wave record, so gate C3's
    // census reads zero here and means it). They answered one question —
    // "which of this view's
    // two panes is the phone allowed to see" — and the answer is now "every
    // region of every scene, in one scrolling column". There is nothing left to
    // choose, so there is no state to leak, no override to tag, and no seam for
    // a route change to reset. The dock's Save/Cancel pane settle went with it:
    // a commit that used to report success by flipping the visible pane now
    // reports it by committing (usePaneRouter's `commitEdit`).

    function switchView(id: ViewId) {
        if (id === currentView.value) return;
        previousView.value = currentView.value;
        // Preserve color query params when switching views.
        router.push({ name: id, query: route.query });
    }

    function goBack() {
        if (previousView.value) {
            switchView(previousView.value);
            previousView.value = null;
        } else {
            switchView("picker");
        }
    }

    return {
        currentView,
        previousView,
        currentConfig,
        ready,
        switchView,
        goBack,
        viewMap: VIEW_MAP,
    };
}
