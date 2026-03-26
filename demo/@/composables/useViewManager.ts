import { ref, computed, type Ref } from "vue";
import type { Component, InjectionKey } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
    Palette,
    Search,
    Camera,
    Shield,
    Tag,
    Home,
    Sparkles,
    Blend,
    Wand2,
    Rainbow,
    ScrollText,
    Flag,
} from "lucide-vue-next";

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
    | "admin-names"
    | "admin-audit"
    | "admin-flagged"
    | "admin-tags";

export type LeftPane =
    | "color-picker"
    | "browse"
    | "extract"
    | "atmosphere"
    | "generate"
    | "gradient"
    | "admin-users"
    | "admin-names"
    | "admin-audit"
    | "admin-flagged"
    | "admin-tags";

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
        label: "Users",
        leftLabel: "Users",
        rightLabel: "Palettes",
        icon: Shield,
    },
    "admin-names": {
        left: "admin-names",
        right: "palettes",
        label: "Names",
        leftLabel: "Names",
        rightLabel: "Palettes",
        icon: Tag,
    },
    "admin-audit": {
        left: "admin-audit",
        right: "palettes",
        label: "Audit Log",
        leftLabel: "Audit",
        rightLabel: "Palettes",
        icon: ScrollText,
    },
    "admin-flagged": {
        left: "admin-flagged",
        right: "palettes",
        label: "Flagged",
        leftLabel: "Flagged",
        rightLabel: "Palettes",
        icon: Flag,
    },
    "admin-tags": {
        left: "admin-tags",
        right: "palettes",
        label: "Tags",
        leftLabel: "Tags",
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
    const router = useRouter();
    const route = useRoute();

    const currentView = computed<ViewId>(() => {
        const name = route.name as string;
        return (name && name in VIEW_MAP) ? name as ViewId : "picker";
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
        switchView,
        goBack,
        viewMap: VIEW_MAP,
    };
}
