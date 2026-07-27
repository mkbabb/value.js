import { serializeGradient, sampleCoalescedStops, linearInterval } from "../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import { parseGradientCSS } from "../../../../../../../demo/workbenches/gradient/composables/gradientParse";

const stops = [
  { id: "a", cssColor: "oklch(0.75 0.15 145)", position: 0 },
  { id: "b", cssColor: "oklch(0.7 0.16 200)", position: 50 },
  { id: "c", cssColor: "oklch(0.65 0.18 265)", position: 100 },
].map((s) => (s.id === "a" ? { ...s, position: 70 } : s));

const model = {
  type: "linear" as const, direction: 90,
  stops, intervals: [linearInterval(), linearInterval()],
  interpolationSpace: "oklch" as const, hueMethod: "shorter" as const,
};
const css = serializeGradient(model);
console.log("serialized:", css);
const back = parseGradientCSS(css);
console.log("re-parse:", back.ok ? "OK" : "REJECT: " + back.reason);
const samples = sampleCoalescedStops(model);
const desc = samples.filter((s, i) => i > 0 && s.position < samples[i-1]!.position);
console.log("samples:", samples.length, "descending pairs:", desc.length);
