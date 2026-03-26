import type { ComputedRef, InjectionKey, Ref, ShallowRef } from "vue";
import type { UseColorModelReturn } from "./composables/useColorModel";
import type { EditTarget } from ".";

export const COLOR_MODEL_KEY: InjectionKey<UseColorModelReturn> = Symbol("COLOR_MODEL_KEY");
export const CSS_COLOR_KEY: InjectionKey<ComputedRef<string>> = Symbol("CSS_COLOR_KEY");
export const SAFE_ACCENT_KEY: InjectionKey<ComputedRef<string>> = Symbol("SAFE_ACCENT_KEY");
export const EDIT_TARGET_KEY: InjectionKey<ShallowRef<EditTarget | null>> = Symbol("EDIT_TARGET_KEY");

export interface ActionBarContext {
    cssColorOpaque: ComputedRef<string>;
    formattedCurrentColor: ComputedRef<string>;
    isEditing: Ref<boolean>;
    canProposeName: ComputedRef<boolean>;
    paletteActive: ComputedRef<boolean>;
    colorModel: UseColorModelReturn;
    reset: () => void;
    copy: () => void;
    random: () => void;
}
