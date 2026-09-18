import { spanned, whole } from "../combinators.js";
import { percentage } from "./value-unit.js";

export const keyframeSelector = spanned(
  percentage.map((offset) => ({ kind: "keyframe-selector" as const, offset })),
);
export const completeKeyframeSelector = whole(keyframeSelector);
