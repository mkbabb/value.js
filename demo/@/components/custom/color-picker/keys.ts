import type { InjectionKey } from "vue";
import type { UseColorModelReturn } from "@composables/useColorModel";

export const COLOR_MODEL_KEY: InjectionKey<UseColorModelReturn> = Symbol("COLOR_MODEL_KEY");
