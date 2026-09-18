import { interpolateStopColors } from "../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
const out = interpolateStopColors("oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)", 0.002, "oklch", "shorter");
console.log("minted literal:", out);
