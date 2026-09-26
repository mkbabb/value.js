// useDockAdminMode — owns isAdminMode, userViews/adminViews, viewEntries,
// toggleAdminMode; admin mode is derived from the view and the admin session.
import { computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import type { ViewId, ViewManager } from "../../useViewManager";

export interface ViewEntry {
    id: ViewId;
    label: string;
    icon: unknown;
    [k: string]: unknown;
}

export interface UseDockAdminModeReturn {
    isAdminMode: ComputedRef<boolean>;
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

    // UIA-V-59: admin mode is DERIVED — an authenticated admin on an admin-class
    // view — never a latch. The retired one-way watch set it true on /atmosphere
    // or /blob and nothing ever set it back, so every later view (logged out
    // included) wore admin gold and the nine per-view hues disappeared.
    const isAdminMode = computed(
        () => isAdminAuthenticated.value && adminViews.includes(viewManager.currentView.value),
    );

    const viewEntries = computed<ViewEntry[]>(() => {
        if (isAdminMode.value && isAdminAuthenticated.value) {
            return adminViews.map((id) => ({ id, ...viewManager.viewMap[id] } as ViewEntry));
        }
        return userViews.map((id) => ({ id, ...viewManager.viewMap[id] } as ViewEntry));
    });

    function toggleAdminMode() {
        viewManager.switchView(isAdminMode.value ? "picker" : "admin-users");
    }

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
