/**
 * Gradient interpolation — the space and hue-method state. The colour BETWEEN
 * two stops is not computed here: that is the one sampling law in
 * `../model/sample` (X-W6 · X.W6.c), and this file's former
 * `interpolateStopColors` — a second implementation of it, read only by the
 * specimen ink and a test — is gone.
 */

import { ref } from "vue";
import type { Ref } from "vue";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { PickerSpace } from "../../../color-session/picker-color";

// The shared interpolation vocabulary (`INTERPOLATION_SPACES`,
// `HUE_INTERPOLATION_METHODS`) lives in `color-session/color-space-meta` — its
// neutral home (S.W5-6 · F16) — and every consumer imports it THERE, in one hop
// (X-W6 · X.W6.c: the three-hop re-export chain through this file and the
// model factory is gone).

// ── Composable ──

export interface UseGradientInterpolationReturn {
    interpolationSpace: Ref<PickerSpace>;
    hueMethod: Ref<HueInterpolationMethod>;
}

export function useGradientInterpolation(): UseGradientInterpolationReturn {
    const interpolationSpace = ref<PickerSpace>("oklch");
    const hueMethod = ref<HueInterpolationMethod>("shorter");

    return {
        interpolationSpace,
        hueMethod,
    };
}
