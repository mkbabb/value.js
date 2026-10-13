// SERVED MODEL: claude-opus-5-5
// candidate-vs-product identity over the 29,944 corpus sources: _candidate.mjs = the .e product bundle (sha256 b7c2348f…) with hexColor patched to the single-integer reading; product.mjs = the rebuilt bundle at 5c8918c6b (sha256 7b243fd0…)
import * as P from "./product.mjs"; import * as C from "./_candidate.mjs"; import { INPUTS } from "../common.mjs";
let d = 0; for (const s of INPUTS) if (JSON.stringify(P.css.parseCssColor(s)) !== JSON.stringify(C.css.parseCssColor(s))) d++;
console.log("inputs", INPUTS.length, "differ", d);
