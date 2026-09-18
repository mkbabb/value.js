import { ref, computed, type Ref } from "vue";
import type { InjectionKey } from "vue";
import { useRouter, useRoute } from "vue-router";

import {
    VIEW_MAP,
    isViewId,
    type ViewId,
    type LeftPane,
    type RightPane,
    type PaneConfig,
} from "./viewSchema";

// Re-export the schema types so existing consumers that import from
// `@composables/useViewManager` continue to resolve cleanly (the schema is
// the single source of truth; this re-export preserves source-compat with
// the pre-D.W3-Lane-D import paths).
export type { ViewId, LeftPane, RightPane, PaneConfig };

export interface ViewManager {
    currentView: Ref<ViewId>;
    previousView: Ref<ViewId | null>;
    mobilePaneIndex: Ref<0 | 1>;
    currentConfig: Ref<PaneConfig>;
    /** False until the router has resolved the initial route */
    ready: Ref<boolean>;
    switchView: (id: ViewId) => void;
    goBack: () => void;
    viewMap: typeof VIEW_MAP;
}

export const VIEW_MANAGER_KEY: InjectionKey<ViewManager> =
    Symbol("viewManager");

export function useViewManager(): ViewManager {
    const router = useRouter();
    const route = useRoute();

    // Suppress pane transition on initial route resolution
    const ready = ref(false);
    router.isReady().then(() => { ready.value = true; });

    const currentView = computed<ViewId>(() => {
        const name = route.name as string;
        return isViewId(name) ? name : "picker";
    });

    const previousView = ref<ViewId | null>(null);
    const currentConfig = computed(() => VIEW_MAP[currentView.value]);

    // MOB-2 / F-2: the visible mobile pane is DERIVED FROM THE ROUTE, not a
    // leaked `ref<0|1>`. The override below is TAGGED with the view it applies
    // to, so any route change to a different view — deep-link, back/forward,
    // hash-nav, in-content `router.push` — falls through to the destination
    // view's schema default (`defaultPaneIndex`). The old X8 cold-boot seed +
    // the per-`switchView` re-derivation die: the schema is the single writer
    // of the default, and only an EXPLICIT user/edit toggle overrides it, only
    // for the view it was made on.
    const paneOverride = ref<{ view: ViewId; index: 0 | 1 } | null>(null);
    const mobilePaneIndex = computed<0 | 1>({
        get: () => {
            const o = paneOverride.value;
            return o && o.view === currentView.value
                ? o.index
                : (currentConfig.value.defaultPaneIndex ?? 0);
        },
        set: (v) => {
            paneOverride.value = { view: currentView.value, index: v };
        },
    });

    function switchView(id: ViewId) {
        if (id === currentView.value) return;
        previousView.value = currentView.value;
        // Preserve color query params when switching views. The pane index is
        // NOT set here — the route change re-derives it to `id`'s schema default
        // (the override is view-tagged, so the old view's toggle cannot leak).
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
        currentView: currentView as unknown as Ref<ViewId>,
        previousView,
        mobilePaneIndex,
        currentConfig,
        ready,
        switchView,
        goBack,
        viewMap: VIEW_MAP,
    };
}
