// SERVED MODEL: claude-opus-5-5
// route engine-fusion — CPU profile of one (arm, entry): 5 s of passes after warm-up, then the top
// self-time frames (bundle function names + line). node --cpu-prof --cpu-prof-interval 200 harness/prof.mjs <arm> <entry>
import { armFns, INPUTS } from "./common.mjs";
const [arm, entry] = process.argv.slice(2);
const fn = (await armFns(arm))[entry];
for (let i = 0; i < 3; i++) for (const s of INPUTS) fn(s);
const t = performance.now();
while (performance.now() - t < 5000) for (const s of INPUTS) fn(s);
