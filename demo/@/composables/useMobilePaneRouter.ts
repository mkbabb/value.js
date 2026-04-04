import { computed, type ShallowRef } from "vue";
import { defineAsyncComponent } from "vue";
import type { ColorModel, EditTarget } from "@components/custom/color-picker";
import { ColorPicker } from "@components/custom/color-picker";
const AboutPane = defineAsyncComponent(() => import("@components/custom/panes/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("@components/custom/panes/PalettesPane.vue"));
const BrowsePane = defineAsyncComponent(() => import("@components/custom/panes/BrowsePane.vue"));
import type { useViewManager } from "@composables/useViewManager";

const ExtractPane = defineAsyncComponent(() => import("@components/custom/panes/ExtractPane.vue"));
const GeneratePane = defineAsyncComponent(() => import("@components/custom/panes/GeneratePane.vue"));
const GradientPane = defineAsyncComponent(() => import("@components/custom/panes/GradientPane.vue"));
const MixPane = defineAsyncComponent(() => import("@components/custom/panes/MixPane.vue"));
const AdminPane = defineAsyncComponent(() => import("@components/custom/panes/AdminPane.vue"));
const AuroraPane = defineAsyncComponent(() => import("@components/custom/panes/AuroraPane.vue"));

export { ExtractPane, GeneratePane, GradientPane, MixPane, AdminPane, AuroraPane };

export function useMobilePaneRouter(
    viewManager: ReturnType<typeof useViewManager>,
    model: ShallowRef<ColorModel>,
    deps: {
        cssColor: () => string;
        savedColorStrings: () => string[];
        colorPickerRef: () => any;
        onEditTargetChange: (et: EditTarget | null) => void;
        resetToDefaults: () => void;
        updateModel: (v: ColorModel) => void;
    },
) {
    const currentConfig = computed(() => viewManager.currentConfig.value);

    const mobileComponent = computed(() => {
        const cfg = currentConfig.value;
        if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
            if (cfg.right === "about") return AboutPane;
            if (cfg.right === "palettes") return PalettesPane;
            if (cfg.right === "mix") return MixPane;
        }
        if (cfg.left === "color-picker") return ColorPicker;
        if (cfg.left === "browse") return BrowsePane;
        if (cfg.left === "extract") return ExtractPane;
        if (cfg.left === "generate") return GeneratePane;
        if (cfg.left === "gradient") return GradientPane;
        if (cfg.left === "atmosphere") return AuroraPane;
        if (cfg.left.startsWith("admin-")) return AdminPane;
        return ColorPicker;
    });

    const mobileKey = computed(() => {
        const cfg = currentConfig.value;
        if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
            return cfg.right;
        }
        return cfg.left;
    });

    const mobileProps = computed(() => {
        const cfg = currentConfig.value;
        if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
            if (cfg.right === "about") return { modelValue: model.value, "onUpdate:modelValue": (v: ColorModel) => { deps.updateModel(v); }, cssColor: deps.cssColor() };
            if (cfg.right === "palettes") return { savedColorStrings: deps.savedColorStrings(), "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(), "onCancel-edit": () => deps.colorPickerRef()?.cancelEdit() };
            if (cfg.right === "mix") return {};
        }
        if (cfg.left === "color-picker") return { modelValue: model.value, "onUpdate:modelValue": (v: ColorModel) => { deps.updateModel(v); }, "onUpdate:editTarget": deps.onEditTargetChange, onReset: deps.resetToDefaults, class: "picker-shell w-full" };
        if (cfg.left === "browse") return {};
        if (cfg.left === "extract") return { colorSpace: model.value.selectedColorSpace };
        if (cfg.left === "generate") return {};
        if (cfg.left === "gradient") return {};
        if (cfg.left === "atmosphere") return {};
        if (cfg.left.startsWith("admin-")) return { subView: cfg.left };
        return {};
    });

    return { mobileComponent, mobileKey, mobileProps };
}
