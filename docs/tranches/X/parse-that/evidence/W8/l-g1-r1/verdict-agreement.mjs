// SERVED MODEL: claude-opus-5-5
import * as R from "./retired.mjs"; import * as P from "./product.mjs";
import { INPUTS, ENTRIES } from "../common.mjs";
for (const e of ENTRIES) { const fr = e === "parseStylesheet" ? R.parseStylesheet : R.hand[e], fp = P.css[e];
  const ok = (f, s) => { try { return f(s)?.ok === true; } catch { return false; } };
  let aa = 0, ar = 0, ra = 0, rr = 0; for (const s of INPUTS) { const a = ok(fr, s), b = ok(fp, s); a ? (b ? aa++ : ar++) : (b ? ra++ : rr++); }
  console.log(e.padEnd(22), "acc", aa + ar, "(product refuses", ar + ")", "rej", ra + rr, "(product accepts", ra + ")"); }
