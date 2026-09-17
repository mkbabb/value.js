// P-1 corpus harvester.
// Assembles a deduplicated CSS-string corpus from four provenance buckets and
// writes corpus.json. Over-inclusion is SAFE for the gate (junk strings fail in
// both engines = congruent); the harvester biases toward capturing every
// CSS-bearing literal and tags provenance + a routing hint.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const REPO = "/Users/mkbabb/Programming/value.js";
const W = "/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof";

// ── file walkers ────────────────────────────────────────────────────────────
function walk(dir, pred, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { if (!/node_modules|\.git/.test(p)) walk(p, pred, out); }
    else if (pred(p)) out.push(p);
  }
  return out;
}

// ── literal extraction ──────────────────────────────────────────────────────
function extractLiterals(text) {
  const out = [];
  const dq = /"(?:\\.|[^"\\])*"/g;
  const sq = /'(?:\\.|[^'\\])*'/g;
  const tpl = /`(?:\\.|[^`\\])*`/g;
  for (const re of [dq, sq]) {
    let m;
    while ((m = re.exec(text))) {
      try { out.push(JSON.parse(re === dq ? m[0] : `"${m[0].slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"')}"`)); }
      catch { out.push(m[0].slice(1, -1)); }
    }
  }
  let m;
  while ((m = tpl.exec(text))) {
    const body = m[0].slice(1, -1);
    if (body.includes("${")) continue;            // skip interpolated templates
    out.push(body.replace(/\\`/g, "`").replace(/\\\$/g, "$"));
  }
  return out;
}

// ── CSS-likeness + routing hint ─────────────────────────────────────────────
const COLOR_FN = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\s*\(/i;
const EASING_FN = /^(?:cubic-bezier|steps|linear)\s*\(/i;
const EASING_KW = /^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/i;
const HEX = /^#[0-9a-fA-F]{3,8}$/;
const NAMED = /^(?:red|blue|green|black|white|rebeccapurple|transparent|currentcolor|lime|orange|purple|gray|grey|cyan|magenta|yellow)$/i;
const ANY_FN = /\b[a-zA-Z][a-zA-Z-]*\s*\(/;
const DIM = /\b\d*\.?\d+(?:px|rem|em|%|deg|s|ms|turn|rad|grad|vh|vw|vmin|vmax|fr|ch|ex|cm|mm|in|pt|pc)\b/i;
const KF_SEL = /^(?:from|to|\d*\.?\d+%|(?:entry|exit|cover|contain)(?:\s+\d*\.?\d+%)?)$/i;

function classify(sRaw) {
  const s = sRaw.trim();
  if (!s) return null;
  if (s.length > 4000) return null;
  // hard rejects: printf specifiers, interpunct test-titles, obvious paths, import specifiers
  if (/%[sdj]/.test(s)) return null;
  if (/[·—→]/.test(s)) return null;
  if (/^\.{0,2}\//.test(s) && !s.includes("{")) return null;
  if (/^@?[a-z0-9.-]+\/[a-z0-9./-]+$/i.test(s) && !ANY_FN.test(s)) return null;
  // routing
  if (s.includes("{") && s.includes("}")) return { hint: "stylesheet", s };
  if (COLOR_FN.test(s) || HEX.test(s) || NAMED.test(s)) return { hint: "color", s };
  if (EASING_FN.test(s) || EASING_KW.test(s)) return { hint: "easing", s };
  if (KF_SEL.test(s)) return { hint: "keyframe-selector", s };
  if (ANY_FN.test(s) || DIM.test(s) || /\s\/\s/.test(s)) return { hint: "value", s };
  return null; // no CSS signal → ignore
}

// ── buckets ─────────────────────────────────────────────────────────────────
const provenance = {};   // s -> Set of buckets
const hints = {};        // s -> hint
function add(s, bucket, hint) {
  if (!provenance[s]) provenance[s] = new Set();
  provenance[s].add(bucket);
  hints[s] = hint;
}

function harvestFile(path, bucket) {
  let text;
  try { text = readFileSync(path, "utf8"); } catch { return; }
  for (const lit of extractLiterals(text)) {
    const c = classify(lit);
    if (c) add(c.s, bucket, c.hint);
  }
}
function harvestCssFile(path, bucket) {
  // whole-file CSS + per-rule slices
  let text;
  try { text = readFileSync(path, "utf8"); } catch { return; }
  const c = classify(text);
  if (c) add(text.trim().slice(0, 4000), bucket, "stylesheet");
  // also slice top-level rules `sel { ... }`
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = ruleRe.exec(text))) {
    const rule = `${m[1].trim()} { ${m[2].trim()} }`;
    const c2 = classify(rule);
    if (c2) add(rule, bucket, "stylesheet");
  }
}

// bucket (a): the parser test dir
for (const f of walk(join(REPO, "test/parsing"), (p) => p.endsWith(".ts"))) harvestFile(f, "a:test/parsing");
// bucket (b): CSS-bearing strings across the other test files
for (const f of walk(join(REPO, "test"), (p) => p.endsWith(".test.ts") && !p.includes("/parsing/"))) harvestFile(f, "b:test/*");
// bucket (c): demo CSS
for (const f of walk(join(REPO, "demo"), (p) => p.endsWith(".css"))) harvestCssFile(f, "c:demo-css");
// bucket (d): the C14 assay corpus.  proof/corpus.json is a FILE-INTEGRITY LEDGER
// (sha/bytes/path rows), not CSS strings; the assay's real CSS input corpus is
// its own test files.  We harvest those, and separately record the ledger fact.
for (const f of walk(join(W, "c14-css/test"), (p) => p.endsWith(".test.ts"))) harvestFile(f, "d:c14-tests");

// ── curated adversarial seed set (guarantees frozen-surface + edge coverage) ─
const SEEDS = {
  // in-shape oklch (C14-claimed): percentage L, number chroma, angle|number hue
  "color:oklch-in": [
    "oklch(50% 0.1 30)", "oklch(0% 0 0)", "oklch(100% 0.4 360)",
    "oklch(62.8% .257 29.23 / 85%)", "oklch(50% .1 .5turn)", "oklch(50% .1 200grad)",
    "oklch(50% .1 3.14159rad)", "oklch(50% .1 30 / 0.5)", "oklch(50% .1 30 / 50%)",
    "oklch(50% -0.1 30)", "oklch(50% .1 720)", "oklch(50% .1 -30)", "oklch(50% .1 30deg)",
  ],
  // out-of-declared-shape oklch (coverage-narrowing expected, NOT a defect)
  "color:oklch-oos": [
    "oklch(0.7 0.15 30)", "oklch(none 0.1 30)", "oklch(50% 50% 30)",
    "OKLCH(50% .1 30)", "oklch(70% 0.1 none)",
  ],
  // malformed oklch (both must reject)
  "color:oklch-bad": [
    "oklch(50% .1 20 /)", "oklch(nope)", "oklch(50% .1)", "oklch(50% .1 20 30)",
    "oklch()", "oklch(50% .1 20)x", "oklch (50% .1 20)",
  ],
  // mis-accept guards: non-oklch colors — C14 parseColor MUST reject
  "color:non-oklch": [
    "red", "#ff0000", "rgb(1 2 3)", "hsl(20 30% 40%)", "lab(50% 10 20)",
    "lch(50% 20 30)", "hwb(20 10% 30%)", "oklab(50% 0.1 0.05)", "color(srgb 0.2 0.4 0.6)",
    "transparent", "currentColor",
  ],
  // in-shape cubic-bezier
  "easing:cb-in": [
    "cubic-bezier(0.25, 0.1, 0.25, 1)", "cubic-bezier(0,0,1,1)", "cubic-bezier(.42,0,.58,1)",
    "cubic-bezier(0.25, 5, 0.25, -5)", "cubic-bezier(1,1,1,1)", "cubic-bezier(0, -0.5, 1, 1.5)",
    "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  ],
  // invalid-x cubic-bezier (both must reject)
  "easing:cb-badx": [
    "cubic-bezier(2, 0, -1, 1)", "cubic-bezier(-0.1, 0, 0.5, 1)", "cubic-bezier(0.5, 0, 1.1, 1)",
  ],
  // malformed cubic-bezier (both must reject)
  "easing:cb-bad": [
    "cubic-bezier(0.25, 0.1, 0.25)", "cubic-bezier(.25 .1 .25 1)", "cubic-bezier(a,b,c,d)",
    "cubic-bezier(0.25, 0.1, 0.25, 1, 2)",
  ],
  // mis-accept guards: non-cubic-bezier easings — C14 parseEasing MUST reject
  "easing:non-cb": [
    "ease", "linear", "ease-in-out", "steps(2)", "steps(4, jump-end)",
    "linear(0, 0.5 50%, 1)", "step-start",
  ],
  // in-shape stylesheets (qualified rules; color/atf declarations)
  "sheet:in": [
    ".swatch:hover { color: oklch(62.8% .257 29.23 / 85%); animation-timing-function: cubic-bezier(.25, .1, .25, 1); }",
    ".a { color: oklch(50% .1 20); } /*KEEP*/",
    ".a { padding: 1rem; color: oklch(70% 0.1 250); }",
    "div, .b { margin: 0; }",
  ],
  // stylesheets live-accepts but C14 narrows (NOT a defect)
  "sheet:narrow": [
    ".a { color: red; }", "@media screen { color: red; }",
    ".a { color: rgb(1 2 3); }", "@keyframes x { from { opacity: 0; } to { opacity: 1; } }",
    "@property --t { syntax: \"<color>\"; }",
  ],
  // malformed stylesheets (both reject)
  "sheet:bad": [
    ".a { color: oklch(nope); }", ".a { animation-timing-function: cubic-bezier(2, 0, .5, 1); }",
    "@property --tone { initial-value }", "not a stylesheet at all",
  ],
};
for (const [tag, arr] of Object.entries(SEEDS)) {
  const hint = tag.split(":")[0];
  for (const s of arr) add(s, `seed:${tag}`, hint);
}

// ── emit ────────────────────────────────────────────────────────────────────
const items = Object.keys(provenance).sort().map((s, i) => ({
  id: i,
  source: s,
  hint: hints[s],
  provenance: [...provenance[s]].sort(),
}));

const provCounts = {};
for (const it of items) for (const b of it.provenance) provCounts[b.split(":")[0]] = (provCounts[b.split(":")[0]] || 0) + 1;
const hintCounts = {};
for (const it of items) hintCounts[it.hint] = (hintCounts[it.hint] || 0) + 1;

writeFileSync(join(W, "equivalence/corpus.json"), JSON.stringify({
  generatedAt: new Date().toISOString(),
  size: items.length,
  provenanceCounts: provCounts,
  hintCounts,
  c14LedgerNote: "c14-css/proof/corpus.json is a file-integrity ledger (sha256/bytes/path rows), not a CSS corpus; the assay's CSS inputs are harvested from c14-css/test/**.",
  items,
}, null, 2));
console.log("corpus size:", items.length);
console.log("provenance:", JSON.stringify(provCounts));
console.log("hints:", JSON.stringify(hintCounts));
