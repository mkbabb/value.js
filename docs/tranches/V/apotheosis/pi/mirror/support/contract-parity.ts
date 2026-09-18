import * as live from "../../../../../../../dist/subpaths/css.js";
import * as mirror from "../index.js";

export const mirrorSatisfiesLive: typeof live = mirror;
export const liveSatisfiesMirror: typeof mirror = live;

