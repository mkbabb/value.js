import { interpolateStopColors } from "../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
for (const t of [0.002, 0.068, 0.29]) {
  console.log(`t=${t}:`, JSON.stringify(interpolateStopColors(
    "oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)", t, "oklch", "shorter")));
}
