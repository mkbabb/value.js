// useDockAdminMode — owns isAdminMode, userViews/adminViews, viewEntries,
// toggleAdminMode, and the two admin-sync watchers.
import { ref, computed, watch } from "vue";
import type { Ref, ComputedRef } from "vue";
import type { ViewId, ViewManager } from "@composables/useViewManager";

export interface ViewEntry {
    id: ViewId;
    label: string;
    icon: unknown;
    [k: string]: unknown;
}

export interface UseDockAdminModeReturn {
    isAdminMode: Ref<boolean>;
    viewEntries: ComputedRef<ViewEntry[]>;
    toggleAdminMode: () => void;
    onViewChange: (id: string | number | boolean | Record<string, string> | null) => void;
}

export interface UseDockAdminModeOptions {
    viewManager: ViewManager;
    isAdminAuthenticated: Ref<boolean>;
}

const userViews: ViewId[] = ["picker", "palettes", "browse", "extract", "mix", "generate", "gradient"];
const adminViews: ViewId[] = ["admin-users", "admin-names", "admin-audit", "admin-flagged", "admin-tags", "atmosphere", "blob"];

export function useDockAdminMode(options: UseDockAdminModeOptions): UseDockAdminModeReturn {
    const { viewManager, isAdminAuthenticated } = options;

    const isAdminMode = ref(viewManager.currentView.value.startsWith("admin-"));

    const viewEntries = computed<ViewEntry[]>(() => {
        if (isAdminMode.value && isAdminAuthenticated.value) {
            return adminViews.map((id) => ({ id, ...viewManager.viewMap[id] } as ViewEntry));
        }
        return userViews.map((id) => ({ id, ...viewManager.viewMap[id] } as ViewEntry));
    });

    function toggleAdminMode() {
        isAdminMode.value = !isAdminMode.value;
        if (isAdminMode.value) {
            viewManager.switchView("admin-users");
        } else {
            viewManager.switchView("picker");
        }
    }

    // Sync admin mode with current view. S.W5-12 (F-12): the watch is
    // SYMMETRIC over adminViews — landing on EITHER tuning pane
    // (atmosphere/blob) flips admin mode, matching their membership in the
    // admin view list (the old atmosphere-only check made two same-class
    // views behave differently).
    watch(() => viewManager.currentView.value, (view) => {
        if (adminViews.includes(view)) {
            isAdminMode.value = true;
        }
    });

    // Exit admin mode on logout
    watch(isAdminAuthenticated, (auth) => {
        if (!auth) isAdminMode.value = false;
    });

    function onViewChange(id: string | number | boolean | Record<string, string> | null) {
        if (typeof id === "string") {
            if (id === "__admin_toggle__") {
                toggleAdminMode();
                return;
            }
            viewManager.switchView(id as ViewId);
        }
    }

    return { isAdminMode, viewEntries, toggleAdminMode, onViewChange };
}
