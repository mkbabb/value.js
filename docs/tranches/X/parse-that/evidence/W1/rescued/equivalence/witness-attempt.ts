// Bounded attempt to drive the deposed witness color parser as the P-1 arbiter.
import { parseCSSColor } from "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/deposed/src/parsing/color/color.js";
const r = (parseCSSColor as any)("oklch(50% 0.1 30)");
console.log("witness oklch:", JSON.stringify(r));
