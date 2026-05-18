// useAtmosphere — owns the Aurora reactive config + useAurora call that W0
// landed (Ae-2). Extracted from App.vue to reduce script size.
//
// HARDEN-4 §1.2 contract:
//  - Extracts STRUCTURE only; does NOT change the `provide("auroraConfig", ...)`
//    contract — the caller (App.vue setup) continues to call `provide` after
//    calling this composable (composables called from setup may provide, but
//    explicit provide in the root setup keeps ownership clear).
//  - Aurora internals are left as W0 left them; W6 owns rewriting them against
//    the real AuroraConfig v4.1 field set.

import { reactive, type Ref } from "vue";
import { useAurora, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/aurora";
import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";

export function useAtmosphere(atmosphereCanvas: Ref<HTMLCanvasElement | null>) {
    const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG));

    useAurora(atmosphereCanvas, () => auroraConfig, {
        onInitError: (err) => console.warn("[aurora] init failed:", err),
    });

    return { auroraConfig };
}
