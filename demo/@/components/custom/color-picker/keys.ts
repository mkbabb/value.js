import type { ComputedRef, InjectionKey, Ref, ShallowRef } from "vue";
// S.W2 · W2-1 transposition: the injected color-state shape is the merged
// pipeline's return (superset of the former useColorModel + useAppColorModel).
import type { UseColorPipelineReturn } from "@composables/color/useColorPipeline";
import type { EditTarget } from ".";

export const COLOR_MODEL_KEY: InjectionKey<UseColorPipelineReturn> = Symbol("COLOR_MODEL_KEY");
export const CSS_COLOR_KEY: InjectionKey<ComputedRef<string>> = Symbol("CSS_COLOR_KEY");
export const SAFE_ACCENT_KEY: InjectionKey<ComputedRef<string>> = Symbol("SAFE_ACCENT_KEY");
export const EDIT_TARGET_KEY: InjectionKey<ShallowRef<EditTarget | null>> = Symbol("EDIT_TARGET_KEY");

export interface ActionBarContext {
    cssColorOpaque: ComputedRef<string>;
    formattedCurrentColor: ComputedRef<string>;
    isEditing: Ref<boolean>;
    canProposeName: ComputedRef<boolean>;
    paletteActive: ComputedRef<boolean>;
    colorModel: UseColorPipelineReturn;
    reset: () => void;
    copy: () => void;
    random: () => void;
}
