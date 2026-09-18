import { parseCssColor } from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js";
import { parseColor as c14Color } from "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css/src/css/api.js";
for (const s of ["oklch()", "rgb()", "hsl()", "lab()", "color()", "oklch( )", "rgba()"]) {
  let live: string, c14: string;
  try { const r = parseCssColor(s) as any; live = "ok=" + r.ok; } catch (e) { live = "THREW: " + (e as Error).message; }
  try { const r = c14Color(s) as any; c14 = "ok=" + r.ok; } catch (e) { c14 = "THREW: " + (e as Error).message; }
  console.log(JSON.stringify(s).padEnd(12), "| LIVE", live.padEnd(45), "| C14", c14);
}
