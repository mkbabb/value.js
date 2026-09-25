// SERVED MODEL: claude-opus-5-5 — summarise an easing.mjs log (drops the per-tile array)
import { readFileSync } from "node:fs";
const o = JSON.parse(readFileSync(process.argv[2], "utf8"));
for (const [k, r] of Object.entries(o)) { const { curvePaused, ...rest } = r; rest.pausedMaxD = Math.max(...curvePaused.map((t) => t.d)); console.log(k, JSON.stringify(rest)); }
