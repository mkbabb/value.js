// SERVED MODEL: claude-opus-5-5
import * as R from "./retired.mjs"; import * as P from "./product.mjs";
import { INPUTS } from "../common.mjs";
const rej = INPUTS.filter((s) => { try { return R.hand.parseCssColor(s)?.ok !== true; } catch { return true; } });
const cm = rej.filter((s) => /^\s*(color-mix|light-dark)\(/i.test(s));
let pOk = 0; const codesR = {}, codesP = {};
for (const s of cm) { const r = R.hand.parseCssColor(s), p = P.css.parseCssColor(s); if (p.ok) pOk++; const a = r.diagnostics?.[0]?.code + "/" + r.diagnostics?.[0]?.expected; codesR[a] = (codesR[a] ?? 0) + 1; const b = p.ok ? "OK" : p.diagnostics[0].code + "/" + p.diagnostics[0].expected; codesP[b] = (codesP[b] ?? 0) + 1; }
console.log(cm.length, "productOk", pOk, codesR, codesP);
console.log(cm.slice(0, 400).filter((_, i) => i % 40 === 0));
let allOk = 0; for (const s of rej) if (P.css.parseCssColor(s).ok) allOk++; console.log("rej total", rej.length, "product accepts", allOk);
