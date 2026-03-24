import { ref, computed, watch } from "vue";
import type { Ref } from "vue";
import type { Palette } from "@lib/palette/types";

export type TabValue = "saved" | "browse" | "extract" | "admin-users" | "admin-names";

export interface PaletteDialogStateDeps {
    /** Saved palettes list (for filteredSaved computation) */
    savedPalettes: Ref<Palette[]>;
    /** Whether the admin is currently authenticated (resets admin tabs on logout) */
    isAdminAuthenticated: Ref<boolean>;
}

export function usePaletteDialogState(deps: PaletteDialogStateDeps) {
    const activeTab = ref<TabValue>("saved");
    const searchQuery = ref("");
    const expandedId = ref<string | null>(null);

    // --- Search placeholder ---
    const searchPlaceholder = computed(() => {
        switch (activeTab.value) {
            case "admin-users": return "Search users...";
            case "admin-names": return "Search color names...";
            default: return "Search palettes...";
        }
    });

    // --- Filtered saved palettes ---
    const filteredSaved = computed(() => {
        const q = searchQuery.value.toLowerCase();
        if (!q) return deps.savedPalettes.value;
        return deps.savedPalettes.value.filter(
            (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
        );
    });

    // --- Reset admin tabs when logged out ---
    watch(deps.isAdminAuthenticated, (auth) => {
        if (!auth && activeTab.value.startsWith("admin-")) {
            activeTab.value = "saved";
        }
    });

    // --- Expand/collapse ---
    function toggleExpand(id: string) {
        expandedId.value = expandedId.value === id ? null : id;
    }

    function setActiveTab(tab: TabValue) {
        activeTab.value = tab;
    }

    return {
        activeTab,
        searchQuery,
        expandedId,
        searchPlaceholder,
        filteredSaved,
        toggleExpand,
        setActiveTab,
    };
}
