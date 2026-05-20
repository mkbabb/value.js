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
    const mobilePaneIndex = ref<0 | 1>(0);

    const currentConfig = computed(() => VIEW_MAP[currentView.value]);

    function switchView(id: ViewId) {
        if (id === currentView.value) return;
        previousView.value = currentView.value;
        // Preserve color query params when switching views
        router.push({ name: id, query: route.query });
        const cfg = VIEW_MAP[id];
        mobilePaneIndex.value = (cfg.right !== null && (id === "palettes" || id === "mix")) ? 1 : 0;
    }

    function goBack() {
        if (previousView.value) {
            switchView(previousView.value);
            previousView.value = null;
        } else {
            switchView("picker");
        }
        mobilePaneIndex.value = 0;
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
