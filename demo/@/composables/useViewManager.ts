import { ref, computed, watch } from "vue";
import type { Component, Ref, InjectionKey } from "vue";
import {
    Palette,
    Search,
    Camera,
    Shield,
    Tag,
    Home,
    Info,
    Sparkles,
    Blend,
    Wand2,
    Rainbow,
} from "lucide-vue-next";
import { useStorage } from "@vueuse/core";

export type ViewId =
    | "picker"
    | "palettes"
    | "browse"
    | "extract"
    | "atmosphere"
    | "mix"
    | "generate"
    | "gradient"
    | "admin-users"
    | "admin-names";

export type LeftPane =
    | "color-picker"
    | "browse"
    | "extract"
    | "atmosphere"
    | "generate"
    | "gradient"
    | "admin-users"
    | "admin-names";

export type RightPane = "about" | "palettes" | "mix" | null;

export interface PaneConfig {
    left: LeftPane;
    right: RightPane;
    label: string;
    leftLabel: string;
    rightLabel: string | null;
    icon: Component;
}

const VIEW_MAP: Record<ViewId, PaneConfig> = {
    picker: {
        left: "color-picker",
        right: "about",
        label: "Home",
        leftLabel: "Picker",
        rightLabel: "About",
        icon: Home,
    },
    palettes: {
        left: "color-picker",
        right: "palettes",
        label: "Palettes",
        leftLabel: "Picker",
        rightLabel: "Palettes",
        icon: Palette,
    },
    browse: {
        left: "browse",
        right: "palettes",
        label: "Browse",
        leftLabel: "Browse",
        rightLabel: "Palettes",
        icon: Search,
    },
    extract: {
        left: "extract",
        right: "palettes",
        label: "Extract",
        leftLabel: "Extract",
        rightLabel: "Palettes",
        icon: Camera,
    },
    mix: {
        left: "color-picker",
        right: "mix",
        label: "Mix",
        leftLabel: "Picker",
        rightLabel: "Mix",
        icon: Blend,
    },
    generate: {
        left: "generate",
        right: "palettes",
        label: "Generate",
        leftLabel: "Generate",
        rightLabel: "Palettes",
        icon: Wand2,
    },
    gradient: {
        left: "gradient",
        right: "palettes",
        label: "Gradient",
        leftLabel: "Gradient",
        rightLabel: "Palettes",
        icon: Rainbow,
    },
    atmosphere: {
        left: "atmosphere",
        right: null,
        label: "Atmosphere",
        leftLabel: "Atmosphere",
        rightLabel: null,
        icon: Sparkles,
    },
    "admin-users": {
        left: "admin-users",
        right: "palettes",
        label: "Admin Users",
        leftLabel: "Users",
        rightLabel: "Palettes",
        icon: Shield,
    },
    "admin-names": {
        left: "admin-names",
        right: "palettes",
        label: "Admin Names",
        leftLabel: "Names",
        rightLabel: "Palettes",
        icon: Tag,
    },
};

export interface ViewManager {
    currentView: Ref<ViewId>;
    previousView: Ref<ViewId | null>;
    mobilePaneIndex: Ref<0 | 1>;
    currentConfig: Ref<PaneConfig>;
    switchView: (id: ViewId) => void;
    goBack: () => void;
    viewMap: typeof VIEW_MAP;
}

export const VIEW_MANAGER_KEY: InjectionKey<ViewManager> =
    Symbol("viewManager");

export function useViewManager(): ViewManager {
    const stored = useStorage<ViewId>("color-picker-view", "picker");
    const currentView = ref<ViewId>(
        stored.value in VIEW_MAP ? stored.value : "picker",
    );
    const previousView = ref<ViewId | null>(null);
    const mobilePaneIndex = ref<0 | 1>(0);

    const currentConfig = computed(() => VIEW_MAP[currentView.value]);

    function switchView(id: ViewId) {
        if (id === currentView.value) return;
        previousView.value = currentView.value;
        currentView.value = id;
        // For palettes view, default to showing palettes pane on mobile (right/index 1)
        // For other two-pane views, default to left pane
        const cfg = VIEW_MAP[id];
        // Default mobile pane: show the view's primary content
        // "palettes" and "mix" are right-pane views → show index 1
        mobilePaneIndex.value = (cfg.right !== null && (id === "palettes" || id === "mix")) ? 1 : 0;
    }

    function goBack() {
        if (previousView.value) {
            currentView.value = previousView.value;
            previousView.value = null;
        } else {
            currentView.value = "picker";
        }
        mobilePaneIndex.value = 0;
    }

    // Persist view to localStorage
    watch(currentView, (v) => {
        stored.value = v;
    });

    return {
        currentView,
        previousView,
        mobilePaneIndex,
        currentConfig,
        switchView,
        goBack,
        viewMap: VIEW_MAP,
    };
}
