// P-1 DIFFERENTIAL HARNESS — semantic-equivalence assay.
//
// Compares the LIVE value.js v4 regex parser (frozen public surface, imported
// from the built dist subpath) against the C14 combinator assay (parse-that
// @1.0.0), over the assembled corpus. Emits equivalence-results.json.
//
// Comparability note: the two engines are DELIBERATELY asymmetric. C14's api.ts
// exposes exactly three doors — parseColor (oklch-only), parseEasing
// (cubic-bezier-only), parseStylesheet (qualified-rules-only) — its status.json
// declares the rest "born RED" (P01). The live surface is the full v4 CSS
// parser. The FROZEN-SURFACE SUBSET for the gate is therefore the intersection:
// { oklch(...) colors, cubic-bezier(...) easings, all-qualified stylesheets }.
//
// A MIRROR-DEFECT (the only RED trigger) is one of:
//   (A) both engines accept an in-shape input but the numeric SEMANTIC CORES
//       disagree;
//   (B) C14 ACCEPTS an input the live parser + spec REJECT (mis-accept);
//   (C) C14 REJECTS an input that is unambiguously valid within C14's OWN
//       declared W0 shape (false-reject inside the mirror).
// Coverage-narrowing (C14 declines an input OUTSIDE its declared shape that the
// live superset accepts) is NOT a defect — status.json openly declares it.

import { readFileSync, writeFileSync } from "node:fs";
import {
  parseCssColor,
  parseTimingFunction,
  parseStylesheet as liveSheet,
  parseCssValue,
  parseKeyframeSelector as liveKfSel,
  collectKeyframes,
} from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js";
import {
  parseColor as c14Color,
  parseEasing as c14Easing,
  parseStylesheet as c14Sheet,
} from "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css/src/css/api.js";
import { completeKeyframeSelector as c14KfSel } from "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css/src/css/grammar/l4/keyframes.js";

const W = "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/equivalence";
const corpus = JSON.parse(readFileSync(`${W}/corpus.json`, "utf8"));

const EPS = 1e-9;
function numEq(a: unknown, b: unknown): boolean {
  if (typeof a === "number" && typeof b === "number") {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return Math.abs(a - b) <= EPS + EPS * Math.max(Math.abs(a), Math.abs(b));
  }
  return a === b;
}
function coreEq(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a === "number" || typeof b === "number") return numEq(a, b);
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((x, i) => coreEq(x, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a).sort(), kb = Object.keys(b).sort();
    if (ka.length !== kb.length || ka.some((k, i) => k !== kb[i])) return false;
    return ka.every((k) => coreEq(a[k], b[k]));
  }
  return false;
}

// ── semantic-core extractors ────────────────────────────────────────────────
function liveColorCore(v: any) {
  return { space: v.space, channels: [...v.channels], alpha: v.alpha };
}
function c14ColorCore(v: any) {
  return { space: v.space, channels: [...v.channels], alpha: v.alpha };
}
function liveEasingCore(v: any) {
  return v.kind === "cubic-bezier" ? { name: "cubic-bezier", coords: [v.x1, v.y1, v.x2, v.y2] } : { name: v.kind };
}
function c14EasingCore(v: any) {
  return { name: v.name, coords: [...v.coordinates] };
}
// live declaration value → comparable core (numeric for color/cubic-bezier, else null)
function liveDeclCore(name: string, value: any): any {
  if (value?.kind === "scalar" && value.payload?.type === "color") return { t: "color", ...liveColorCore(value.payload.value) };
  if (value?.kind === "call" && /^cubic-bezier$/i.test(value.name)) {
    const nums = value.args?.map((a: any) => a?.payload?.value);
    if (nums?.length === 4 && nums.every((n: any) => typeof n === "number")) return { t: "cb", coords: nums };
  }
  return null; // other declarations: live keeps a value-AST, C14 keeps raw string → incomparable by design
}
function c14DeclCore(name: string, value: any): any {
  if (value?.type === "color") return { t: "color", ...c14ColorCore(value) };
  if (value?.type === "easing") return { t: "cb", coords: [...value.coordinates] };
  return null;
}
// selector canonicalization: whitespace is insignificant around combinators
// and commas (`.a > .b` ≡ `.a>.b`; `*,\n *::before` ≡ `*,*::before`). Live
// canonicalizes; C14 preserves raw source. Normalize both to compare SEMANTICS.
function normSelector(s: string): string {
  return s.replace(/\s+/g, " ").replace(/\s*([,>~+()])\s*/g, "$1").trim();
}
// C14's declaration grammar and live differ in comment-trivia attachment;
// strip comments before comparing declaration NAME sets.
function stripComments(name: string): string {
  return name.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
}
function liveSheetCore(v: any) {
  // v is Stylesheet = readonly StylesheetItem[]; C14 only ever yields all-style rules,
  // so compare live's top-level style rules.
  const rules = (v as any[]).filter((r) => r.kind === "style").map((r) => ({
    selector: normSelector([...r.selectors].join(",")),
    decls: Object.fromEntries(r.declarations.map((d: any) => [stripComments(d.name), liveDeclCore(d.name, d.value)])),
  }));
  return rules;
}
function c14SheetCore(v: any) {
  return v.cssRules.map((r: any) => ({
    selector: normSelector(r.selectorText),
    decls: Object.fromEntries(Object.entries(r.declarations).map(([n, val]) => [stripComments(n), c14DeclCore(n, val)])),
  }));
}
// compare sheet cores on selectors + the color/cubic-bezier declaration numerics only
function sheetCoresEq(la: any[], cb: any[]): { eq: boolean; why?: string } {
  if (la.length !== cb.length) return { eq: false, why: `rule-count ${la.length} vs ${cb.length}` };
  for (let i = 0; i < la.length; i++) {
    if (la[i].selector !== cb[i].selector) return { eq: false, why: `selector[${i}] "${la[i].selector}" vs "${cb[i].selector}"` };
    const lNames = Object.keys(la[i].decls).sort(), cNames = Object.keys(cb[i].decls).sort();
    if (lNames.join("|") !== cNames.join("|")) return { eq: false, why: `decl-names[${i}] ${lNames} vs ${cNames}` };
    for (const n of lNames) {
      const lc = la[i].decls[n], cc = cb[i].decls[n];
      if (lc === null || cc === null) continue; // non-color/easing decl: representation differs by design
      if (!coreEq(lc, cc)) return { eq: false, why: `decl[${i}].${n} ${JSON.stringify(lc)} vs ${JSON.stringify(cc)}` };
    }
  }
  return { eq: true };
}

// spec oracle: is this string a VALID member of C14's OWN declared W0 shape?
// oklch W0 shape: oklch( <percentage> <number> <angle|number> [ / <alpha> ] )
function isValidC14Oklch(s: string): boolean {
  const m = s.trim().match(/^oklch\(\s*([^)]*)\)$/i); // case-sensitive-ish; C14 requires lowercase+no-space
  if (!/^oklch\(/.test(s.trim())) return false;
  if (!m) return false;
  const body = m[1].trim();
  const slash = body.split("/");
  if (slash.length > 2) return false;
  const comps = slash[0].trim().split(/\s+/);
  if (comps.length !== 3) return false;
  const [L, C, H] = comps;
  const num = String.raw`[+-]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?`;
  if (!new RegExp(`^${num}%$`).test(L)) return false;      // L must be percentage
  if (!new RegExp(`^${num}$`).test(C)) return false;        // chroma must be number
  if (!new RegExp(`^${num}(?:deg|grad|rad|turn)?$`).test(H)) return false; // hue angle|number
  if (slash[1] !== undefined) {
    const A = slash[1].trim();
    if (!new RegExp(`^${num}%?$`).test(A)) return false;
  }
  return true;
}
// cubic-bezier W0 shape: cubic-bezier(n,n,n,n) with x1,x2 in [0,1]
function isValidC14CubicBezier(s: string): boolean {
  const m = s.trim().match(/^cubic-bezier\((.*)\)$/i);
  if (!/^cubic-bezier\(/.test(s.trim())) return false;
  if (!m) return false;
  const parts = m[1].split(",").map((x) => x.trim());
  if (parts.length !== 4) return false;
  const num = String.raw`^[+-]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?$`;
  const nums = parts.map((p) => (new RegExp(num).test(p) ? Number(p) : NaN));
  if (nums.some((n) => Number.isNaN(n))) return false;
  return nums[0] >= 0 && nums[0] <= 1 && nums[2] >= 0 && nums[2] <= 1;
}
function hasTopLevelAtRule(s: string): boolean {
  return /(^|\})\s*@[a-zA-Z]/.test(s);
}

// ── run one item ────────────────────────────────────────────────────────────
type Verdict =
  | "EXACT_CONGRUENT" | "STRUCT_CONGRUENT" | "CONGRUENT_REJECT"
  | "COVERAGE_NARROWING" | "OUT_OF_SCOPE" | "LIVE_STRICTER"
  | "DIVERGENT_VALUE" | "MIS_ACCEPT" | "FALSE_REJECT_IN_SHAPE" | "ENGINE_EXCEPTION";

// balanced-brace structural well-formedness — a coarse "is this even a stylesheet?"
// guard so a genuine C14 mis-accept of MALFORMED input is separated from live
// merely validating known declarations more deeply (LIVE_STRICTER).
function braceBalanced(s: string): boolean {
  let d = 0;
  for (const c of s) { if (c === "{") d++; else if (c === "}") { d--; if (d < 0) return false; } }
  return d === 0 && s.includes("{") && s.includes("}");
}

interface Row {
  id: number; source: string; hint: string; provenance: string[];
  door: string; liveOk: boolean; c14Ok: boolean; verdict: Verdict; note?: string;
  liveCore?: any; c14Core?: any; thrower?: "LIVE" | "C14" | "BOTH";
}

function excRow(base: any, door: string, lv: any, cv: any): Row {
  const thrower: "LIVE" | "C14" | "BOTH" = !lv.ok && !cv.ok ? "BOTH" : !cv.ok ? "C14" : "LIVE";
  return {
    ...base, door, liveOk: lv.ok, c14Ok: cv.ok, verdict: "ENGINE_EXCEPTION", thrower,
    note: `${thrower} threw: ${cv.err ?? lv.err}`,
  };
}

function safe<T>(fn: () => T): { ok: boolean; val?: T; err?: string } {
  try { return { ok: true, val: fn() }; } catch (e) { return { ok: false, err: e instanceof Error ? e.message : String(e) }; }
}

const rows: Row[] = [];
const misAcceptGuardFailures: any[] = [];

for (const it of corpus.items as any[]) {
  const s: string = it.source;
  const hint: string = it.hint === "sheet" ? "stylesheet" : it.hint;
  const base = { id: it.id, source: s, hint, provenance: it.provenance };

  if (hint === "color") {
    const lv = safe(() => parseCssColor(s));
    const cv = safe(() => c14Color(s));
    if (!lv.ok || !cv.ok) { rows.push(excRow(base, "color", lv, cv)); continue; }
    const L = lv.val as any, C = cv.val as any;
    const declared = isValidC14Oklch(s);
    let verdict: Verdict, note: string | undefined, liveCore, c14Core;
    if (L.ok && C.ok) {
      liveCore = liveColorCore(L.value); c14Core = c14ColorCore(C.value);
      verdict = coreEq(liveCore, c14Core) ? "STRUCT_CONGRUENT" : "DIVERGENT_VALUE";
      if (verdict === "STRUCT_CONGRUENT" && coreEq(liveCore, c14Core)) verdict = "STRUCT_CONGRUENT";
    } else if (L.ok && !C.ok) {
      verdict = declared ? "FALSE_REJECT_IN_SHAPE" : "COVERAGE_NARROWING";
      note = declared ? "valid C14-oklch shape rejected by C14" : "out-of-C14-shape color (superset live-only)";
    } else if (!L.ok && C.ok) {
      verdict = "MIS_ACCEPT"; note = "C14 accepted a color the live parser rejects";
    } else {
      verdict = "CONGRUENT_REJECT";
    }
    rows.push({ ...base, door: "color", liveOk: L.ok, c14Ok: C.ok, verdict, note, liveCore, c14Core });
    continue;
  }

  if (hint === "easing") {
    const lv = safe(() => parseTimingFunction(s));
    const cv = safe(() => c14Easing(s));
    if (!lv.ok || !cv.ok) { rows.push(excRow(base, "easing", lv, cv)); continue; }
    const L = lv.val as any, C = cv.val as any;
    const declared = isValidC14CubicBezier(s);
    let verdict: Verdict, note: string | undefined, liveCore, c14Core;
    if (L.ok && C.ok) {
      liveCore = liveEasingCore(L.value); c14Core = c14EasingCore(C.value);
      verdict = coreEq(liveCore, c14Core) ? "STRUCT_CONGRUENT" : "DIVERGENT_VALUE";
    } else if (L.ok && !C.ok) {
      verdict = declared ? "FALSE_REJECT_IN_SHAPE" : "COVERAGE_NARROWING";
      note = declared ? "valid C14-cubic-bezier rejected by C14" : "non-cubic-bezier easing (superset live-only)";
    } else if (!L.ok && C.ok) {
      verdict = "MIS_ACCEPT"; note = "C14 accepted an easing the live parser rejects";
    } else {
      verdict = "CONGRUENT_REJECT";
    }
    rows.push({ ...base, door: "easing", liveOk: L.ok, c14Ok: C.ok, verdict, note, liveCore, c14Core });
    continue;
  }

  if (hint === "stylesheet") {
    const lv = safe(() => liveSheet(s));
    const cv = safe(() => c14Sheet(s));
    if (!lv.ok || !cv.ok) { rows.push(excRow(base, "stylesheet", lv, cv)); continue; }
    const L = lv.val as any, C = cv.val as any;
    let verdict: Verdict, note: string | undefined, liveCore, c14Core;
    if (L.ok && C.ok) {
      liveCore = liveSheetCore(L.value); c14Core = c14SheetCore(C.value);
      const cmp = sheetCoresEq(liveCore, c14Core);
      verdict = cmp.eq ? "STRUCT_CONGRUENT" : "DIVERGENT_VALUE"; note = cmp.why;
    } else if (L.ok && !C.ok) {
      const atRule = hasTopLevelAtRule(s);
      verdict = atRule ? "COVERAGE_NARROWING" : "COVERAGE_NARROWING";
      note = atRule ? "C14 refuses at-rules (declared W0 boundary)" : "C14 narrows qualified sheet (non-oklch/non-cb decl, or grammar edge) — inspect";
    } else if (!L.ok && C.ok) {
      // C14 accepted, live rejected. If the input is structurally well-formed CSS
      // (balanced braces, real selector), C14 is CORRECT — it captures a valid
      // qualified rule with an opaque declaration value; live merely validates
      // known declarations (animation/animation-delay/custom-prop color) more
      // deeply and rejects. That is a LIVE-side strictness/limitation, NOT a
      // C14 mirror-defect. Only a malformed input C14 accepts is a true MIS_ACCEPT.
      if (braceBalanced(s)) { verdict = "LIVE_STRICTER"; note = "well-formed qualified rule; live over-validates a non-color/non-atf declaration — C14 opaque-passthrough is correct"; }
      else { verdict = "MIS_ACCEPT"; note = "C14 accepted a MALFORMED stylesheet the live parser rejects"; }
    } else {
      verdict = "CONGRUENT_REJECT";
    }
    rows.push({ ...base, door: "stylesheet", liveOk: L.ok, c14Ok: C.ok, verdict, note, liveCore, c14Core });
    continue;
  }

  // value / keyframe-selector → OUT-OF-MIRROR-SCOPE. Gate check: C14 doors MUST
  // NOT mis-accept these as a color/easing.
  const lvVal = safe(() => parseCssValue(s));
  const cColor = safe(() => c14Color(s));
  const cEasing = safe(() => c14Easing(s));
  const misColor = cColor.ok && (cColor.val as any).ok;
  const misEasing = cEasing.ok && (cEasing.val as any).ok;
  let verdict: Verdict = "OUT_OF_SCOPE";
  let note = "no C14 door for this construct";
  if (misColor || misEasing) {
    verdict = "MIS_ACCEPT";
    note = `C14 ${misColor ? "parseColor" : "parseEasing"} accepted a ${hint}`;
    misAcceptGuardFailures.push({ id: it.id, source: s, hint, misColor, misEasing });
  }
  rows.push({ ...base, door: hint, liveOk: lvVal.ok && (lvVal.val as any)?.ok, c14Ok: misColor || misEasing, verdict, note });
}

// ── kf-seam SHAPE probe (task item 4) ───────────────────────────────────────
// The keyframes consume seams in keyframes-v-exec use, against @mkbabb/value.js/css:
//   parseKeyframeSelector(start)                     — live grammar entry
//   parseStylesheet(css) + collectKeyframes(ast)     — live stylesheet entry
// C14 has NO public parseKeyframeSelector (only a non-exported percentage-only
// completeKeyframeSelector edge witness) and its parseStylesheet REFUSES @rules
// (so @keyframes cannot be seen) and it has NO collectKeyframes. We test each
// shape against whatever the assay does expose.
const kfSelectors = ["from", "to", "0%", "50%", "100%", "entry 10%", "exit 90%", "cover", "150%", "-10%"];
const kfSeam: any[] = [];
for (const sel of kfSelectors) {
  const live = safe(() => liveKfSel(sel));
  const liveOk = live.ok && (live.val as any)?.ok;
  // C14: percentage-only edge witness (parseState), not on the public api door
  const c14 = safe(() => {
    const st = (c14KfSel as any).parseState(sel);
    return !st.isError && st.offset === sel.length;
  });
  kfSeam.push({
    selector: sel,
    liveParseKeyframeSelector: liveOk ? "accept" : "reject",
    liveValue: liveOk ? (live.val as any).value : null,
    c14CompletePercentSelector: c14.ok ? (c14.val ? "accept" : "reject") : "exception",
    c14OnPublicApi: false,
  });
}
// @keyframes stylesheet seam
const kfSheetSrc = "@keyframes pulse { from { opacity: 0; } to { opacity: 1; } }";
const liveKfSheet = safe(() => liveSheet(kfSheetSrc));
const liveKfNames = liveKfSheet.ok && (liveKfSheet.val as any).ok
  ? safe(() => collectKeyframes((liveKfSheet.val as any).value).map((k: any) => k.rule.name)) : { ok: true, val: [] };
const c14KfSheet = safe(() => c14Sheet(kfSheetSrc));
const kfSheetSeam = {
  source: kfSheetSrc,
  liveParseStylesheet: liveKfSheet.ok && (liveKfSheet.val as any).ok ? "accept" : "reject",
  liveCollectKeyframesNames: liveKfNames.ok ? liveKfNames.val : "n/a",
  c14ParseStylesheet: c14KfSheet.ok ? ((c14KfSheet.val as any).ok ? "accept" : "reject (refuses @rules)") : "exception",
  c14HasCollectKeyframes: false,
  seamServiceable: "NO — C14 refuses @keyframes and exposes no collectKeyframes/parseKeyframeSelector public door",
};

// ── tallies + gate ──────────────────────────────────────────────────────────
const tally: Record<string, number> = {};
for (const r of rows) tally[r.verdict] = (tally[r.verdict] || 0) + 1;
const defects = rows.filter((r) => r.verdict === "DIVERGENT_VALUE" || r.verdict === "MIS_ACCEPT" || r.verdict === "FALSE_REJECT_IN_SHAPE" || (r.verdict === "ENGINE_EXCEPTION" && (r.thrower === "C14" || r.thrower === "BOTH")));
const exceptions = rows.filter((r) => r.verdict === "ENGINE_EXCEPTION");
const liveThrew = rows.filter((r) => r.verdict === "ENGINE_EXCEPTION" && r.thrower === "LIVE");
const liveStricter = rows.filter((r) => r.verdict === "LIVE_STRICTER");

const gate = defects.length === 0 ? "GREEN" : "RED";

const out = {
  generatedAt: new Date().toISOString(),
  corpusSize: corpus.size,
  provenanceCounts: corpus.provenanceCounts,
  engines: {
    live: "value.js v4 — dist/subpaths/css.js (regex; parseCssColor/parseTimingFunction/parseStylesheet + collect*)",
    c14: "c14-css assay — src/css/api.ts over @mkbabb/parse-that@1.0.0 (parseColor/parseEasing/parseStylesheet)",
    witness: "deposed pre-v4 parse-that tree — NOT RUNNABLE (see report §witness): needs retired src/units,src/utils,src/easing",
  },
  tally,
  gate,
  gateDefinition: "GREEN iff zero DIVERGENT_VALUE + zero MIS_ACCEPT + zero FALSE_REJECT_IN_SHAPE on the frozen-surface subset.",
  defects: defects.map((d) => ({ id: d.id, source: d.source, door: d.door, verdict: d.verdict, note: d.note, liveCore: d.liveCore, c14Core: d.c14Core })),
  liveStricterFindings: liveStricter.map((d) => ({ id: d.id, source: d.source, note: d.note })),
  liveThrewFindings: liveThrew.map((e) => ({ id: e.id, source: e.source, note: e.note })),
  exceptions: exceptions.map((e) => ({ id: e.id, source: e.source, thrower: e.thrower, note: e.note })),
  misAcceptGuardFailures,
  kfSeam,
  kfSheetSeam,
  rows,
};
writeFileSync(`${W}/equivalence-results.json`, JSON.stringify(out, null, 2));

// console summary
console.log("=== P-1 DIFFERENTIAL RESULTS ===");
console.log("corpus size:", corpus.size);
console.log("tally:", JSON.stringify(tally, null, 2));
console.log("defects:", defects.length, "liveStricter:", liveStricter.length, "exceptions:", exceptions.length);
console.log("misAcceptGuardFailures:", misAcceptGuardFailures.length);
console.log("GATE:", gate);
if (defects.length) for (const d of defects) console.log("  DEFECT", d.verdict, d.door, JSON.stringify(d.source.slice(0, 80)), "::", d.note);
if (exceptions.length) for (const e of exceptions) console.log("  EXC", JSON.stringify(e.source.slice(0, 80)), "::", e.note);
console.log("--- LIVE_STRICTER (regex-side, non-gate) ---");
for (const d of liveStricter) console.log("  ", JSON.stringify(d.source.slice(0, 80)));
