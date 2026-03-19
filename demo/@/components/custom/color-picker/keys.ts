import type { ComputedRef, InjectionKey, Ref } from "vue";
import type { UseColorModelReturn } from "@composables/useColorModel";

export const COLOR_MODEL_KEY: InjectionKey<UseColorModelReturn> = Symbol("COLOR_MODEL_KEY");

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

export const ACTION_BAR_KEY: InjectionKey<ActionBarContext> = Symbol("ACTION_BAR_KEY");
