import type { ComputedRef, InjectionKey, Ref, ShallowRef } from "vue";
// S.W2 · W2-1 transposition: the injected color-state shape is the merged
// pipeline's return (superset of the former useColorModel + useAppColorModel).
import type { UseColorPipelineReturn } from "./useColorPipeline";
import type { EditTarget } from "../@/components/custom/color-picker";

export const COLOR_MODEL_KEY: InjectionKey<UseColorPipelineReturn> = Symbol("COLOR_MODEL_KEY");
export const CSS_COLOR_KEY: InjectionKey<ComputedRef<string>> = Symbol("CSS_COLOR_KEY");
export const SAFE_ACCENT_KEY: InjectionKey<ComputedRef<string>> = Symbol("SAFE_ACCENT_KEY");
/** D6 (T.W3-5): the atmosphere's LIVE derived lightness — the page-ambient
 *  contrast referent (M-15's exposed value), provided by the boot writer and
 *  consumed by `useSafeAccentFn`/`useMarkdownColors` (the ink-on-tier law:
 *  the referent is a property of the surface, never a global constant). */
export const INK_AMBIENT_KEY: InjectionKey<ComputedRef<number>> = Symbol("INK_AMBIENT_KEY");
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
