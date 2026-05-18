// Desktop pane routing — the left/right route tables for the ≥lg two-pane
// layout. Companion to `useMobilePaneRouter` (the <lg single-slot router);
// together they are the demo's pane route table, lifted out of App.vue so the
// shell holds composition only, not a v-if ladder or its computed equivalent.

import { computed, defineAsyncComponent, type ComputedRef, type ShallowRef } from "vue";

import { ColorPicker, type ColorModel, type EditTarget } from "@components/custom/color-picker";
import {
    ExtractPane,
    GeneratePane,
    GradientPane,
    MixPane,
    AdminPane,
    AuroraPane,
    BlobPane,
} from "@composables/useMobilePaneRouter";

const AboutPane = defineAsyncComponent(() => import("@components/custom/panes/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("@components/custom/panes/PalettesPane.vue"));
const BrowsePane = defineAsyncComponent(() => import("@components/custom/panes/BrowsePane.vue"));

interface ViewConfig {
    left: string;
    right: string | null;
}

interface DesktopPaneRouterDeps {
    currentConfig: ComputedRef<ViewConfig>;
    model: ShallowRef<ColorModel>;
    colorPickerRef: { value: { commitEdit: () => void; cancelEdit: () => void } | null };
    onEditTargetChange: (et: EditTarget | null) => void;
    resetToDefaults: () => void;
    cssColor: ComputedRef<string> | { value: string };
    savedColorStrings: ComputedRef<string[]> | { value: string[] };
}

export function useDesktopPaneRouter(deps: DesktopPaneRouterDeps) {
    const { currentConfig, model, colorPickerRef, onEditTargetChange, resetToDefaults, cssColor, savedColorStrings } = deps;

    const desktopLeftComponent = computed(() => {
        const left = currentConfig.value.left;
        if (left === "color-picker") return ColorPicker;
        if (left === "browse") return BrowsePane;
        if (left === "extract") return ExtractPane;
        if (left === "generate") return GeneratePane;
        if (left === "gradient") return GradientPane;
        if (left === "atmosphere") return AuroraPane;
        if (left.startsWith("admin-")) return AdminPane;
        return ColorPicker;
    });

    const desktopLeftKey = computed(() => currentConfig.value.left);

    const desktopLeftProps = computed((): Record<string, unknown> => {
        const left = currentConfig.value.left;
        if (left === "color-picker") return {
            class: "picker-shell w-full",
            modelValue: model.value,
            "onUpdate:modelValue": (v: ColorModel) => { model.value = v; },
            "onUpdate:editTarget": onEditTargetChange,
            onReset: resetToDefaults,
        };
        if (left === "extract") return { colorSpace: model.value.selectedColorSpace };
        if (left.startsWith("admin-")) return { subView: left };
        return {};
    });

    const desktopRightComponent = computed(() => {
        const right = currentConfig.value.right;
        if (right === "about") return AboutPane;
        if (right === "palettes") return PalettesPane;
        if (right === "mix") return MixPane;
        if (right === "blob") return BlobPane;
        return null;
    });

    const desktopRightKey = computed(() => currentConfig.value.right ?? "empty");

    const desktopRightProps = computed((): Record<string, unknown> => {
        const right = currentConfig.value.right;
        if (right === "about") return {
            modelValue: model.value,
            "onUpdate:modelValue": (v: ColorModel) => { model.value = v; },
            cssColor: cssColor.value,
        };
        if (right === "palettes") return {
            savedColorStrings: savedColorStrings.value,
            "onCommit-edit": () => colorPickerRef.value?.commitEdit(),
            "onCancel-edit": () => colorPickerRef.value?.cancelEdit(),
        };
        return {};
    });

    return {
        desktopLeftComponent,
        desktopLeftKey,
        desktopLeftProps,
        desktopRightComponent,
        desktopRightKey,
        desktopRightProps,
    };
}
