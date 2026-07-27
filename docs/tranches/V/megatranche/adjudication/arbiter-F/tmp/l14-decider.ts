// L-14 tri-fold decider (arbiter-F): the demo's EXACT mint chain, exact inputs
// of a click at 0.2% between the two default stops.
import { interpolateStopColors } from "../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
const minted = interpolateStopColors(
  "oklch(0.75 0.15 145)",
  "oklch(0.65 0.18 265)",
  0.002,
  "oklch",
  "shorter",
);
console.log("MINTED LITERAL:", JSON.stringify(minted));
