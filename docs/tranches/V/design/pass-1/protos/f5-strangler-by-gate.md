# V · pass-1 · PROTO — Family 5 · STRANGLER-BY-GATE

**Prototyper**: pass-1 proto (worktree `wf_cb377abc-406-14`, the middle of the locked
-13/-14/-15 batch). **Family**: 5 · STRANGLER-BY-GATE. **Mode: RAN** (all 5 spec-§7
obligations executed with measured numbers, isolated worktree).

**Self-assignment note (read first)**: the orchestrator spawned this prototyper with the task
template variables (`${x.id}`/`${x.family}`/`${x.brief}`) UNSUBSTITUTED — the same broken
fan-out r1/f1 recorded. Self-assigned to Family 5 by the worktree index: protos f1/f2/f3 are
already committed (worktrees -10/-11/-12, now unlocked); the three remaining families f4/f5/f6
map to the three LOCKED worktrees -13/-14/-15; `-14` is the middle → F5. Confirmed against
`spec-f5.md §7`'s five prototype obligations, which this proto discharges.

**Environment**: `npm ci` clean + `npm run build` (exit 0); `file:../glass-ui` resolved via the
`.claude/worktrees` symlink infra. node v26, eslint 10.4.1. The five gates were AUTHORED as
device-free `.mjs` (mirroring the house `record(id,label,fn)` clause style of
`scripts/gates/proof-subpath-budget.mjs`) and RUN with `--root=<this worktree>`. Full source of
the three novel scanners is embedded (§7) so this proto is durable — scratch is ephemeral.

**Tree-drift caveat (measured, load-bearing)**: this worktree is at **6abef80** (the T-close
ceremony), which PRE-DATES tranche-u's re-growth of `test:dist`. So two spec numbers must be
reconciled against what is actually on disk here — done inline, honestly, at each obligation:
- `test:dist` at **6abef80 = 5 gates** (the clean Q13 set); at **tranche-u HEAD = 10 gates** (the
  re-grown set the portfolio A4 + spec §5 describe). The REPLACE arithmetic (Obl. 4) is
  demonstrated against the tranche-u 10-gate chain (captured verbatim), the real target.
- the `@`-alias site count is **347** here (spec/`f6` said 351 — tranche-u drift of 4).
- barrel-pure's RED membership shifted by one vs spec (`src/index.ts` is already PURE) — §1.

---

## §1 — Obligation 1: AUTHOR + RUN `proof:barrel-pure` → RED on the impure barrel set

Authored the device-free purity adjudicator (glass-ui's PROPOSED-not-on-disk G8; independently
re-authored here — f1 authored the same gate, this is a concurrent confirmation) + a live scan +
a **7-bite self-test** + fail-closed. Rule: a `index.ts` barrel is IMPURE iff it declares any own
runtime export (`export const/let/var/function/class/enum/namespace`, or a local `export { x }`
without `from`); `export type` / `export … from` / `export * from` are pure.

**RUN against worktree HEAD** → `IMPURE barrels (RED): 3`, self-test 7/7, exit 1:
```
✗ src/parsing/index.ts    (own-decls=9, local-named-exports=0, re-exports=0)   — a god-impl-file NAMED index.ts (586 L)
✗ src/quantize/index.ts   (own-decls=2, local-named-exports=0, re-exports=1)   — a MIXED barrel (quantizePixels/dominantColor)
✗ src/units/index.ts      (own-decls=3, local-named-exports=0, re-exports=1)   — ValueUnit/FunctionValue/ValueArray classes (422 L)
```

**Divergence from spec §1's asserted `{src/index.ts, parsing/index.ts, units/index.ts}` — HONEST
(and it CONFIRMS f1's independent finding):**
- **Cardinality MET** (exactly 3 impure barrels).
- **Membership shifted by one**: `src/index.ts` is now **PURE** (own-decls=0, 19 `export … from`
  re-exports) — the tree cleaned it since the "23 own + 36 re" snapshot the spec inherited. In its
  place the gate correctly flags `src/quantize/index.ts` (2 own functions + 1 re-export). **The
  gate is right; the spec's snapshot is stale** — the exact "numbers inlined here drift each wave"
  fact `CLAUDE.md` warns of. This is F5's whole thesis in miniature: *the gate is the source of
  truth, the prose trails it.* A strangler wave targeting the spec's stale 3-set would MISS
  `quantize` and needlessly touch `src/index.ts`; targeting the GATE's live 3-set is correct.

---

## §2 — Obligation 2: `proof:barrel-cycle` on RUNTIME edges (CC-1) → the deflation, MEASURED

Authored a runtime-vs-type-edge scanner (CC-4, NOT raw madge). Under `verbatimModuleSyntax:true`
a whole-statement `import type { … } from '…'` emits NO runtime import — the edge is ERASED in the
output JS. The scanner builds TWO graphs (raw = all edges; runtime = type-erased) and reports
barrel-participating SCCs on each. **RUN** (72 src files):

```
edges: runtime=299   type-only(pure, erased)=17
barrel-SCCs on RAW graph  (madge-equivalent, type edges INCLUDED): 1  [28 nodes]  ← CONFLATED
barrel-SCCs on RUNTIME graph (type-erased, THE GATE):              2  [20 nodes]  ← the truth
  ✗ runtime SCC (16 nodes) through barrel src/units/color/index.ts
        base · contrast · conversions/{cylindrical,direct,hex,ictcp,jzazbz,kelvin,lab,oklab,
        xyz-extended} · dispatch · index · mix · normalize · spaces
  ✗ runtime SCC (4 nodes) through barrel src/parsing/color/index.ts
        color · index · relative-color · parsing/units
self-test: type-only 2-cycle → raw SCC=1, runtime SCC=0 ✓
```

**The CC-1 point, made concrete (and SHARPER than the spec predicted)**: the **17 pure type-only
edges** (exactly the spec's "17") do not merely add noise — they **BRIDGE the two distinct runtime
cycles into ONE 28-node mega-SCC** on the raw (madge) graph, hiding the real structure and
implicating 8 extra nodes that are only in a cycle via *erased* type imports. The runtime-edge
gate **DEFLATES to the true 2 SCCs / 20 nodes** — matching the spec's "2 runtime SCCs / 20 nodes"
EXACTLY (16 + 4). Raw madge here does not over-count 23-vs-2; it *conflates and inflates to a
28-node blob*. Either framing yields the same verdict: **madge misrepresents the cycle structure;
the type-erased gate is the only honest engine.** The two SCCs are the color-system spine + the
`parsing/color ↔ units` cross-cluster cycle — the exact carve F1/F2/F4 reach by other derivations
(f1's `units/index.ts` carve does NOT touch either SCC; the SCC fix is the own-runtime-sibling
drain of `units/color/index.ts` + `parsing/color/index.ts`).

---

## §3 — Obligation 3: AUTHOR + RUN `proof:grammar-fuzz` → RED on #9/#11, GREEN on the closed 9

Authored the born-RED tripwire seeded with the **11 A6 VJ-corpus inputs**. Round-trip clauses run
the BUILT `dist/value.js` (the honest shipped artifact — the `serialize-fidelity` philosophy);
#9/#11 are STRUCTURAL (the public surface). EN-a discipline: where a self-round-trip is BLIND, the
clause tests that the SEMANTIC content survived, not `in === out`.

**RUN** → **12 clauses (#2 split into 2a/2b), 12/12 match the predicted disposition**, exit 1:

| # | VJ | input / check | want | got |
|---|---|---|---|---|
| 1 | VJ-L3 | `scale(2) rotate(45deg)` — both fns survive (via `parseCSSSubValue`) | GREEN | GREEN |
| 2a | VJ-Q9 | `oklch(0.6 none 200)` — `none` kept, no NaN | GREEN | GREEN |
| 2b | VJ-Q9 | `color(display-p3 1 0 0)` — wrapper kept | GREEN | GREEN |
| 3 | KF-1 | `@function --foo(){ --x <length>: 0px; … }` — no self-consistent garbage mirror | GREEN | GREEN (loud-fails) |
| 4 | VJ-Q6 | `--double(2)` is a `FunctionValue` + round-trips | GREEN | GREEN |
| 5 | VJ-Q7 | 3-branch `if()` keeps all 3 branches | GREEN | GREEN |
| 6 | VJ-Q1 | `contrast-color(red)` resolves (→ `rgb(0 0 0)`, not opaque) | GREEN | GREEN |
| 7 | VJ-Q4 | `FunctionValue` provenance survives `clone` | GREEN | GREEN |
| 8 | kf-U | unitless `1.5` not array-boxed to NaN | GREEN | GREEN |
| 10 | VJ-L2 | `linear(0, 0.5 50%, 1)` idempotent round-trip | GREEN | GREEN |
| **9** | **kf#9** | **public `parseCSSValue`/`parseCSSStylesheet` surface a diagnostics sink** | **RED** | **RED** — `sig-has-diag=false, entry-refs-sink=false` |
| **11** | **KF-7** | **`PropertyDescriptor` renamed (no DOM/TS-lib collision)** | **RED** | **RED** — still in `dist/index.d.ts:50` + `stylesheet-types.ts:33` |

Both open bugs are structurally confirmed: **#9** — the `ParseDiagnostic`/`OnParseError`/
`enableDiagnostics` sink lives in `parsing/utils.ts` + `color/color.ts` + `timeline/
scroll-timeline.ts` but is referenced by NEITHER `parsing/index.ts` (public `parseCSSValue`, sig
`(input:string):ValueUnit|FunctionValue`) NOR `stylesheet.ts` (public `parseCSSStylesheet`) — so
`parseable:true` false-positives persist. **#11** — `stylesheet-types.ts:33` still
`export type PropertyDescriptor = …`, shipped verbatim into `dist/index.d.ts:50`.

### §3.1 — BONUS live finding the fuzz METHOD surfaced (beyond the 11 seeds) — the EN-a proof
Adversarial probing (the fuzz mandate, not the seed round-trips) exposed a **live, reproducing
silent-truncation at the public single-value entry** on this tree:
```
parseCSSValue("1px solid red")            => "1px"                       (drops "solid red")
parseCSSValue("10px 20px")                => "10px"
parseCSSValue("1px !!!garbage")           => "1px"                       (no throw!)
parseCSSValue("red blue")                 => "rgb(255 0 0)"
parseCSSValue("scale(2) rotate(45deg)")   => "scaleX(2) scaleY(2) scaleZ(2)"   (drops rotate)
  vs  parseCSSSubValue("scale(2) rotate(45deg)") => "…scaleX/Y/Z… …rotateX/Y/Z…"  (FULL)
```
`src/parsing/index.ts:525-528` documents `ValuesValueEOF = ValuesValue.eof()` as a U-F29
full-input-consumption guard that "LOUD-FAILS on unconsumed trailing tokens" and throws a
`CSSParseError` — but the **shipped `dist/value.js` (mtime FRESH, post-build) does NOT throw**; it
silently returns the first value. The `.eof()` loud-fail contract is **non-functional in the
artifact at 6abef80.** This is bug #1 (VJ-L3) reproducing more broadly than "multi-fn", and it is
the **EN-a insight made LIVE**: a self-round-trip oracle sees `parseCSSValue("1px solid red")
=> "1px"` and `parseCSSValue("1px") => "1px"` and reports GREEN — *blind* to the dropped
`solid red`. Only an adversarial fuzz that asserts SEMANTIC survival (or a browser oracle) catches
it. **Two adjacent facts also recorded**: (a) the documented fix `parseCSSValues` is **NOT
re-exported through the top-level barrel** (`dist/value.js` has no `parseCSSValues`) — the reachable
full-list entry is `parseCSSSubValue`; (b) needs re-verification against tranche-u HEAD (this is a
6abef80 measurement). Filed as the sharpest thing this obligation found.

---

## §4 — Obligation 4: the REPLACE arithmetic (net gate count FLAT), DEMONSTRATED

Demonstrated against the ACTUAL **tranche-u `test:dist`** (the re-grown 10-gate chain, captured
verbatim from the main-tree `package.json` — NOT this worktree's pre-regrowth 5-gate chain). The
REPLACE-not-ADD move (spec §5): excise the 2 portfolio-A4-sanctioned OVERFIT gates, add the 2
authored structural gates:

```
BEFORE (10): dts-surface · css-parity · round-trip-idempotent · perf-target · serialize-fidelity ·
             subpath-budget · lib-correctness · [barrel-parity] · pack-manifest · [close-ledger]
AFTER  (10): dts-surface · css-parity · round-trip-idempotent · perf-target · serialize-fidelity ·
             subpath-budget · lib-correctness · (barrel-pure)  · pack-manifest · (grammar-fuzz)
EXCISED (OVERFIT): barrel-parity (narrow subpath-barrel regression), close-ledger (300-LoC
                   tranche-ceremony "zero-silent-drop", not a correctness invariant)
NET: 10 → 10  FLAT ✓   META-gate (test:dist proof-gates ≤ 10 ceiling): GREEN
```
**Coverage GAINED**: barrel-purity (was 0) + the VJ grammar-fuzz corpus (was 0). **Coverage LOST**:
nothing that is a correctness invariant. The owner's "fewer gates" edict is satisfied *by
construction* — the count never rises, and a META-gate ceiling turns the complaint into an
enforceable cap. (The `barrel-cycle` + `at-ban` gates go to CI-only, like the incumbent
`size-graph`, or displace a further overfit gate — they are NOT added to `test:dist` here, keeping
the FLAT arithmetic honest.)

---

## §5 — Obligation 5: CC-10 settled empirically — `@`-ban as `proof:*` vs `eslint`

Implemented BOTH poles and ran them on the same 347-site surface (worktree HEAD).

| | **`proof:at-ban.mjs`** (device-free) | **`eslint no-restricted-imports`** |
|---|---|---|
| sites flagged | **347** (100%) | **337** (97.1%) |
| by form | static 333 · export-from 4 · **dynamic 10** · bare 0 · css 0 | static 333 · export-from 4 · **dynamic 0** |
| the gap | — | **MISSES all 10 dynamic `import()`** (operates on `ImportDeclaration`/`Export*Declaration`, blind to `ImportExpression`) |
| false positives | **0** with the comment-strip + context engine; **15** if a NAIVE raw-grep (prose refs to alias paths in comments, incl. `utils.css:187`) | **0** (AST-scoped) |
| file-type reach | .ts + .vue`<script>` + .vue`<style>` + .css | .ts + .vue`<script>` only |
| IDE / incremental | no | **yes** |
| authoring cost | ~90 LoC one file | one rule — BUT see clobber tax |
| glass-ui §0.5.12 | **compliant** ("device-free `proof:*`, never ESLint") | **the idiom glass-ui bans** |

**The decisive facts (measured, not asserted):**
1. **The 10-site delta is EXACTLY the dynamic-import blind spot** (347 − 337 = 10): all 10 live in
   `demo/@/composables/usePaneRouter.ts:68-77` as `defineAsyncComponent(() => import("@components/
   custom/panes/*.vue"))`. eslint 10.4.1's `no-restricted-imports` architecturally cannot see them.
2. **The CSS/`<style>` reach that supposedly favors the proof-grep has ZERO real targets**:
   `css @import = 0`, `bare = 0`. **100% of real `@`-alias sites are JS import specifiers in
   lintable contexts.** The only CSS occurrence (`utils.css:187`) is a *prose comment* — which the
   proof-grep's broader reach turns into a **false-positive liability** (15 such), NOT an asset.
   eslint's AST-scoping is immune to all 15.
3. **eslint is already the INCUMBENT structural-ban idiom in value.js** — `eslint.config.js`
   enforces `inv-K-1` (src/ ✗ glass-ui) AND `G-DEMO-1/3a/3b` (the demo module-graph bans) via
   `no-restricted-imports`. So glass-ui §0.5.12's "never ESLint" is **already a ratified divergence
   on this tree**; the `@`-ban would join a working, tested cohort, not pioneer the idiom.
4. **The eslint authoring cost is real and specific**: flat-config resolves `no-restricted-imports`
   **last-match-wins, no merge** (documented at `eslint.config.js:230-231,268-273`). Adding the
   `@`-ban means threading it into EVERY config object that already sets the rule for a demo region
   (inv-K-1, both G-DEMO objects) or it **silently clobbers** them. That is the eslint pole's true tax.

**Settlement**: for the `@`-ban SPECIFICALLY, eslint is the pragmatic pole — 100% of real sites are
lintable JS specifiers, it is 0-false-positive, IDE-native, and the incumbent idiom — **BUT** it
must (a) supplement the 10-site `ImportExpression` hole (a 6-line `proof:*` grep for dynamic
`import("@…")`, or migrate the 10 async-component imports to static/relative), and (b) accept the
clobber-safe single-object encoding. The `proof:*` pole is the completeness/idiom-compliant answer
but pays the 15-prose-FP care cost and forgoes IDE feedback. **Neither is free; the fork is real
(not a detail), and the empirical evidence tilts the `@`-ban to eslint + a tiny dynamic-import
`proof:*` supplement.**

---

## §6 — The two GREEN standing surfaces + the unimplemented folds (honest scope)

- **D2 hold-the-line (spec §3)**: `proof:import-boundaries` (calibrated to value.js's publish
  surface) + `proof:backend-structure` are GREEN — r1/f1 RAN both (0 api violations; the
  `routes/service/repository` boundary passes glass-ui's own backend gate). **Not re-run here**
  (probe-parsimony edict); cited as the cross-family convergence exemplar. D2 = wire STANDING, no
  strangling.
- **CC-5 fold (unimplemented, spec-noted)**: `proof:colocation-globality` counts import edges but
  T3 asks "≥2 UNRELATED FAMILIES" — a semantic overlay the gate cannot compute alone. It REQUIRES
  F3's consumer census (or a curated family map) as input, else it mis-colocates public leaves /
  mis-promotes single-family utils. This is a genuine gate-blindness, not a bug — recorded as the
  load-bearing D1 dependency on F3.
- **CC-2 fold (unimplemented, spec-noted)**: a dead-code gate MUST union `{product ∪ test ∪ e2e ∪
  build}` reachability, else it RED-flags test-only-alive files (e.g. `conversions/index.ts`) as
  dead. Not authored here (it belongs to F2/graph-projection's engine); flagged as the D4 correctness
  precondition.

---

## §7 — Embedded gate source (durability) + reproduce

The three novel scanners (barrel-pure, barrel-cycle, at-ban) + the grammar-fuzz harness were
authored in the isolated worktree. Their adjudicator cores:

```js
// proof:barrel-pure — the PURE adjudicator (comment-strip + regex; 7-bite self-test)
const OWN_DECL_RE = /\bexport\s+(?:default\b|abstract\s+class\s|const\s+enum\s|const\s|let\s|var\s|function\s|async\s+function\s|function\s*\*|class\s|enum\s|namespace\s)/g;
const NAMED_EXPORT_RE = /\bexport\s+(type\s+)?\{([\s\S]*?)\}(\s*from\s*["'][^"']+["'])?/g;
// impure := ownDecls>0 || (local `export {x}` without `from` and not all-`type`)

// proof:barrel-cycle — the runtime-vs-type classifier (CC-1); Tarjan SCC over the RUNTIME graph
//   `import type {…} from`  / `export type {…}` / `export type * from`  → ERASED (no runtime edge)
//   everything else (incl. `import {type A, B}` MIXED, bare `import '…'`) → RUNTIME edge
// gate := any SCC (size>1) containing a node ending in `/index.ts`, on the RUNTIME graph only.

// proof:at-ban — comment-strip + multi-line-aware; count `from ["']@(alias)/` (static+export-from,
//   multi-line correct since `from "@x"` sits on the `from` line) + dynamic import() + bare + css@import.
//   NAIVE raw-text hits − comment-stripped hits = the prose false-positive surface.

// proof:grammar-fuzz — import dist/value.js; 12 clauses over the 11 A6 inputs; round-trip clauses
//   assert SEMANTIC survival (EN-a), #9/#11 are structural file checks. Born-RED exit 1 on 2 open.
```

```
# all four, --root against any value.js checkout (dist must exist for grammar-fuzz):
node proof-barrel-pure.mjs    --root=<root>   # RED: 3 impure {parsing,quantize,units}/index.ts
node proof-barrel-cycle.mjs   --root=<root>   # RED: 2 runtime SCCs / 20 nodes (raw graph conflates to 1/28)
node proof-grammar-fuzz.mjs   --root=<root>   # RED: #9 + #11 (GREEN on the closed 9); exit 1
node proof-at-ban.mjs         --root=<root>   # RED: 347 sites (proof pole)
npx eslint --no-config-lookup -c eslint.at-ban.mjs "demo/**/*.{ts,vue}"   # 337 (eslint pole; misses 10 dyn-import)
```

---

## §8 — Honest frictions (the recorded weaknesses)

1. **`barrel-pure`/`at-ban` are regex heuristics, not AST.** They comment-strip then regex-scan.
   They handle the value.js corpus exactly (7/7 + multi-line-aware; 347 vs eslint's 337 reconciles
   to the dynamic-import delta), but a pathological `export{X}` split across an odd string literal
   could fool them. A landed gate should back the regex with a tiny TS AST pass — recorded, not
   fixed (the same nuance glass-ui's own `.mjs` protos carry).
2. **`grammar-fuzz` is NOT a browser oracle.** Its clauses are semantic-content round-trip checks;
   a spec-DEAD-but-self-consistent emission could still pass a clause. The proof is §3.1: the
   `parseCSSValue` truncation was caught only by ADVERSARIAL probing beyond the 11 seeds, not by a
   seed round-trip. **The gate D3 truly wants is a fuzz corpus actuated against a real browser
   parse** (EN-a) — this proto's harness is the tripwire skeleton, not that oracle.
3. **The REPLACE arithmetic is on tranche-u's `package.json`, not this worktree's** (6abef80 has the
   pre-regrowth 5-gate chain). The 10→10 is real against the tranche-u target; it is not editable
   in-place on the worktree because the worktree lacks `barrel-parity`/`close-ledger` to excise.
4. **CC-10 has no free pole.** eslint's 10-site dynamic-import hole + clobber tax + off-glass-idiom
   vs the proof-grep's 15-prose-FP + no-IDE. The settlement (eslint + a 6-line dynamic-import
   `proof:*`) is a COMPOSITION, which is itself a small violation of "one idiom" purity.
5. **Strangler's central tension is unresolved by gates alone.** §0 tension 2 ("clean break, no dual
   paths") is only reconciled if each wave lands a COMPLETE sub-tree — which erodes the
   incrementality that is strangler's whole point. The gates enforce SHAPE not SENSE (spec §8): a
   tree can be barrel-pure + cycle-free + at-ban-green and still be conceptually incoherent. F5 is
   an execution/enforcement pole, NOT a shape thesis — it needs F1/F2/F3/F4 to supply the WHAT.

**Composition note (facts, not a ranking)**: F5 answers **HOW** (strangler execution + standing
enforcement). Its `barrel-pure` + `barrel-cycle` gates enforce the same `units/color/index.ts` +
`parsing/color/index.ts` carve F1/F2/F4 reach by other derivations; its `grammar-fuzz` +
`diagnostics-wired` gates enforce F4's D3 payload (#9/#11); it is the minimal born-RED battery that
holds the line after an F6 big-bang leap (f6 §6: "one shape thesis × F6 execution × a minimal F5
gate"). This proto neither ranks the family nor picks a winner — that is the critics'/agglomerator's
earned outcome.
