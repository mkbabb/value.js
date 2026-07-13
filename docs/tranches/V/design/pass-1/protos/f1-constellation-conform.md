# V · pass-1 · PROTO — Family 1 · CONSTELLATION-CONFORM

**Prototyper**: pass-1 proto (worktree `wf_cb377abc-406-10`, the lowest of the -10/-11/-12
batch). **Family**: 1 · CONSTELLATION-CONFORM. **Mode: RAN** (measured, isolated worktree).

**Self-assignment note (read first)**: the orchestrator spawned this prototyper with the task
template variables (`${x.id}`/`${x.family}`/`${x.brief}`) UNSUBSTITUTED — the same broken fan-out
r1 recorded. Self-assigned to Family 1 by the same reasoning r1 used (charter §0.2 names it the ONE
mandatory referent family) reinforced by the worktree index: this batch is three worktrees (-10,
-11, -12) over the six families; -10 is the lowest → the first family. Executes spec-f1.md §6's
four prototype obligations against value.js's ACTUAL HEAD in an isolated worktree (nothing merges;
the deliverable is this evidence).

**Environment**: `npm ci` clean (exit 0); `file:../glass-ui` resolved via the `.claude/worktrees`
symlink infra. All four glass-ui gates were PORTED READ-ONLY from
`../glass-ui/docs/tranches/BH/spec-structure/proto-gates/*.mjs` into a scratch dir and run with
`--root=<this worktree>`. The authored `proof:barrel-pure` full source is embedded in §2 below.

**Tree drift caveat (measured)**: this worktree's god-barrels are `src/index.ts` 469L /
`src/parsing/index.ts` 586L / `src/units/index.ts` 422L — the tree has EVOLVED off r1/spec's
snapshot (492 / 644 / 451), so the proto reports the ACTUAL measured numbers, not the spec's
predicted ones, and reconciles the deltas honestly.

---

## §1 — Obligation 1: port + RUN the 4 src-applicable gates (RED/GREEN + exact counts)

| gate (ported verbatim) | target | result | count |
|---|---|---|---|
| **proof:depth** (G3, T2) | `src/` (walk re-pointed off the absent `src/components/`) | **GREEN** (PASS) | 11 dirs scanned, **0** segment-under-segment, 0 sanity-cap; self-test 5/5 |
| **proof:barrel-cycle** (G4 cycle arm) | `src/` value-edge graph | **RED** (FAIL) | **2** barrel-SCC violations; self-test 7/7 + erasure-unit ✓ |
| **proof:backend-structure** (G9) | `api/` | **GREEN** (0 viol) | **0 violations, 2 soft warnings** |
| **proof:import-boundaries** (G4 DAG) | `src/` (396 edges) | faithful-port **RED 26** → calibrated **GREEN 0** | all 26 one class (gate mis-fit); see below |

### proof:depth — GREEN
value.js's `src/` has NO `src/components/` (the glass-ui walk root). Ported the `run()` walk to
`SRC` directly (a 1-line PORT + comment). value.js's tree is shallow: 11 dirs, **0** segment-under-
segment nestings, sanity cap never exceeded. The T2 depth law holds on value.js unchanged.

### proof:barrel-cycle — RED (2 real runtime SCCs, confirms F2)
Two barrel-participating value-edge SCCs (exactly F2's "2 runtime SCCs, not madge's 23" — the
`import type` erasure under `verbatimModuleSyntax:true` is native to the gate):
```
✗ SCC {units/color/normalize ⇄ contrast ⇄ mix ⇄ conversions/{direct,jzazbz,ictcp,oklab,lab,
       cylindrical,xyz-extended,kelvin,hex} ⇄ dispatch ⇄ units/color/index.ts}   (14 nodes)
      barrel node: src/units/color/index.ts
✗ SCC {parsing/color/relative-color ⇄ parsing/color/color ⇄ parsing/color/index.ts ⇄ parsing/units}   (4 nodes)
      barrel node: src/parsing/color/index.ts
```
Both are the F2 color-SCC + the parsing/color↔units cycle. NOTE the barrel carved in §3
(`src/units/index.ts`) is NOT in either SCC — the carve neither creates nor removes these.

### proof:backend-structure — GREEN (confirms r1 EXACTLY)
```
=== proof:backend-structure — .../api    language: typescript   source-root: src
  VIOLATIONS (0):
  WARNINGS (2):
    [G-BE1 soft] src/modules/palette/service/crud-list.ts — 326 lines > 300 soft target
    [G-BE1 soft] src/modules/palette/service/crud.ts — 310 lines > 300 soft target
  → GREEN (0 violations, 2 warnings)
```
The `routes/service/repository` boundary produces ZERO structural violations under glass-ui's own
gate — gap (b) answered by measurement (identical to r1's run). D2 = **ratify, do not restructure**.

### proof:import-boundaries — the pure-library divergence, MEASURED both poles
The faithful glass-ui port flags **26 violations, ALL one class**: `neutral → subpath-entry`. The
gate's `isSubpathEntry` regex `/^src\/[a-z-]+\.ts$/` treats EVERY top-level `src/*.ts` as the exempt
publish sink — TRUE in glass-ui (curated barrels) but FALSE in value.js, where `src/math.ts` (137L),
`src/easing.ts` (643L), `src/utils.ts` (228L) are REAL impl leaves internal code legitimately
imports. The 26 flags are the classic `import { clone } from "../utils"` / `import { lerp } from
"../math"` edges — not defects, a gate mis-fit (r1 gap-c, the pure-library divergence).

**Calibrated** `isSubpathEntry` to value.js's REAL publish surface (`src/index.ts` + the 7
`src/subpaths/*.ts` barrels — NOT the impl `src/*.ts`), re-ran: **GREEN, 0 violations**. Nothing in
value.js reaches UP into its true publish surface. So import-boundaries is src-applicable ONLY after
this one calibration; the calibration IS the leverage the profile stub (§4) encodes.

---

## §2 — Obligation 2: AUTHOR + RUN `proof:barrel-pure` (glass-ui's PROPOSED-not-on-disk G8)

glass-ui names G8 `proof:barrel-pure` PROPOSED but it is NOT on disk in `proto-gates/`. r1 found it
the highest-value gate for value.js's god-impl-barrels. **AUTHORED it on disk** (the leverage vector:
value.js becomes the first constellation adopter to LAND it). House style: a pure `detectPurity()`
over injected source + a live scan + a 6-bite self-test + fail-closed. The rule: a barrel (a file
named `index.ts`) is IMPURE iff it declares ANY own runtime export (`export const/let/var/function/
class/enum`, or a local `export { binding }` without `from`); `export type`/`export … from` are
pure/erased.

**RUN against value.js HEAD** → `IMPURE barrels (RED): 3`, self-test 6/6:
```
✗ src/parsing/index.ts   (own-decls=9, local-named-exports=0, re-exports=0)   — a god-impl-file NAMED index.ts
✗ src/quantize/index.ts  (own-decls=2, local-named-exports=0, re-exports=1)   — a mixed barrel (quantizePixels/dominantColor)
✗ src/units/index.ts     (own-decls=3, local-named-exports=0, re-exports=1)   — ValueUnit/FunctionValue/ValueArray classes
```

**Divergence from spec §6.2's asserted `{src/index.ts, parsing/index.ts, units/index.ts}` — HONEST**:
- **Cardinality MET** (exactly 3 impure barrels).
- **Membership shifted by one**: `src/index.ts` is now **PURE** (own-decls=0, 19 `export … from`
  re-exports) — the tree cleaned it since r1's "23 own + 36 re" snapshot. In its place the gate
  correctly flags `src/quantize/index.ts` (2 own functions + 1 re-export), a small mixed barrel the
  spec's enumeration didn't include. The gate is right; the spec's snapshot is stale. This is exactly
  the "numbers inlined here drift each wave" fact the value.js CLAUDE.md warns of — the gate is the
  source of truth, the prose trails it.

The full authored gate (embedded so this proto is durable — scratch is ephemeral):

```js
// AUTHORED proof:barrel-pure (G8) — the PURE adjudicator + the live scan skeleton.
const OWN_DECL_RE =
    /\bexport\s+(?:default\b|abstract\s+class\s|const\s+enum\s|const\s|let\s|var\s|function\s|async\s+function\s|function\s*\*|class\s|enum\s|namespace\s)/g;
const NAMED_EXPORT_RE = /\bexport\s+(type\s+)?\{([\s\S]*?)\}(\s*from\s*["'][^"']+["'])?/g;

export function detectPurity(rawSource) {
    const src = stripComments(rawSource);                       // block + line strip
    const ownDecls = (src.match(OWN_DECL_RE) || []).length;
    let localNamedExports = 0, reExports = 0;
    for (const m of src.matchAll(NAMED_EXPORT_RE)) {
        const isTypeBlock = Boolean(m[1]);                      // `export type { … }`
        const hasFrom = Boolean(m[3]);                          // `} from "…"`
        if (hasFrom) { reExports++; continue; }                 // pure re-export (incl. type)
        if (isTypeBlock) continue;                              // erased
        const specs = m[2].split(",").map(s => s.trim()).filter(Boolean);
        if (!(specs.length && specs.every(s => /^type\s/.test(s)))) localNamedExports++;
    }
    reExports += (src.match(/\bexport\s*\*\s*(?:as\s+\w+\s+)?from\s*["']/g) || []).length;
    return { impure: ownDecls > 0 || localNamedExports > 0, ownDecls, localNamedExports, reExports };
}
// self-test bites (6/6 handled): pure-reexport(F) · mixed-export-const(T) · own-class(T) ·
//   god-impl-file(T) · type-only(F) · local-named-export-without-from(T)
```

---

## §3 — Obligation 3: the ZERO-EXPORT-CHURN carve of `src/units/index.ts` (measured)

Carved the impure `units/index.ts` barrel into kind-named sibling leaves + a pure re-export barrel,
in the isolated worktree, and re-pointed the ONE internal consumer off the barrel onto the concrete
leaf (the own-runtime-sibling / barrel-cycle FIX idiom):

```
src/units/value-unit.ts       NEW   export class ValueUnit          (imports clone, BLACKLISTED_COALESCE_UNITS)
src/units/function-value.ts   NEW   export class FunctionValue       (imports ValueUnit from ./value-unit)
src/units/value-array.ts      NEW   export class ValueArray          (imports ValueUnit + FunctionValue)
src/units/types.ts            NEW   export type InterpolatedVar,     (type-only; imports type ValueUnit
                                    ComputedEndpointCache             + ColorSpace/HueInterpolationMethod/ColorInterpPlan)
src/units/index.ts            REWRITE  422L → 20L  PURE re-export barrel (5 export-from lines)
src/units/interpolate.ts      EDIT   import { ValueUnit } from "./index"  →  "./value-unit"; type from "./types"
```
Dropped the dead `UNITS` import (referenced only in a comment). `diff --stat`: `index.ts 10 ins /
412 del`, `interpolate.ts 4/1`; 4 new siblings = 423 LoC (the class bodies moved, not rewritten).

**The four required evidence checks — ALL PASS:**

1. **`node -p` on `package.json.exports` — UNCHANGED (8 keys, empty diff):**
   ```
   before: 8 keys: . ./color ./parsing ./math ./easing ./transform ./units ./quantize
   after:  8 keys: . ./color ./parsing ./math ./easing ./transform ./units ./quantize
   ```
   The re-exported symbol set from `units/index.ts` is identical (`ValueUnit FunctionValue ValueArray
   InterpolatedVar ComputedEndpointCache registerColorNames clearCustomColorNames getCustomColorNames`).
   ZERO public-export churn — the §7 mitigation posture proven on a real value.js surface.

2. **`npm run typecheck` (library, `tsconfig.lib.json`) — exit 0.** The library typecheck (the src/
   gate) is clean before AND after. (The `npm run typecheck` script is `lib && demo`; the DEMO arm
   fails IDENTICALLY in baseline and post-carve on a pre-existing environmental gap —
   `@mkbabb/glass-ui/goo-blob` module-not-found + HeroBlob props — wholly unrelated to `src/units/`.
   The `lib` arm running first + demo errors appearing proves lib exited 0 in both.)

3. **`proof:barrel-pure` — `units/index.ts` flipped RED → GREEN.** Post-carve RED set drops from 3 to
   2: `{parsing/index.ts, quantize/index.ts}` — `units/index.ts` is GONE (now pure).

4. **`proof:barrel-cycle` — UNCHANGED at 2 SCCs.** The carve introduces NO new runtime cycle (none of
   the 4 new sibling files enter an SCC); the re-point keeps the barrel a pure inbound-edge-free sink.

---

## §4 — Obligation 4: the "TS pure-library" profile STUB (the leverage artifact)

The SPEC names three profiles (FE-component §2, demo-app §4, backend-per-language §5.2) — NONE fits a
pure-TS library with 0 `.vue` (r1 gap-c). This stub is the §5.2 new row value.js authors and feeds
back to the constellation (charter §0.2's "proving ground → library profile"):

> **§5.2 row — `typescript-library` (pure-TS, 0 `.vue`)** = the backend-TS grammar MINUS the app-edge,
> PLUS the publish surface.
>
> - **INHERITS unchanged** (the profile-agnostic §0–§6 LAW half): 500-raw-line hard ceiling
>   (shader-literal + pure-data-manifest exempt — e.g. `units/style-names.ts` 641L is exempt),
>   PURE-RE-EXPORT-ONLY barrels + `proof:barrel-pure` (AUTHORED here, §2), recursive colocation, no
>   `utils/helpers` grab-bags, T2 depth (`proof:depth` GREEN, §1), the `proof:barrel-cycle` runtime-edge
>   cycle ban, T3 earned-promotion, T4 earned-dir.
> - **DROPS** (vs backend-TS): the `api/routes` app-edge layer + the `routes/service/repository`
>   domain-vertical package grammar (a library has no request handlers, no per-domain service split).
>   `checkLayerByType` (G-BE3) does not apply.
> - **ADDS**: the **publish node** — the curated `subpaths/*.ts` + `index.ts` barrels are the ONLY
>   nodes exempt from the import DAG (the sink, reached by nothing). `proof:import-boundaries`
>   REQUIRES the calibration `isSubpathEntry := {src/index.ts} ∪ {src/subpaths/*.ts}` — NOT the
>   glass-ui `/^src\/[a-z-]+\.ts$/` whole-`src/*.ts` match (§1 measured 26 false-positives without it,
>   because a library's top-level `src/*.ts` are impl leaves, not curated barrels).
> - **N/A** (the UI-only machinery, by construction): every SFC/scoped-CSS/CVA/`variants.ts` clause,
>   the 2 CSS gates (G6), `proof:colocation-globality`'s README-SFC clause. `no-glass-in-dist` (G10)
>   re-parameterizes to a "0 `@`/`@src` in `dist/*.d.ts`" lock (value.js has no `@` alias in `src/`).
>
> **The applicable gate set (net REPLACE, F5's discipline, not ADD)**: `{proof:depth,
> proof:barrel-cycle, proof:backend-structure (api), proof:import-boundaries (calibrated),
> proof:barrel-pure (AUTHORED)}` + the `no-@-in-dist` analog lock.

---

## §5 — Honest frictions (the recorded weaknesses)

1. **import-boundaries is NOT src-applicable off-the-shelf** — it needs the value.js publish-surface
   calibration (§1). The glass-ui gate's publish-node predicate encodes glass-ui's "every top-level
   `src/*.ts` is a curated barrel" shape, which value.js violates (impl leaves at top level). This is
   the single load-bearing calibration the profile stub (§4) must carry into any real landing.
2. **`proof:barrel-pure`'s regex detector is heuristic, not AST.** It comment-strips then regex-scans.
   It correctly handles the value.js corpus (3-flag set, 6/6 self-test), but a pathological
   `export{X}` split across an odd string-literal could fool it; a landed gate should back the regex
   with a tiny TS AST pass (the same nuance glass-ui's own `.mjs` protos carry). Recorded, not fixed.
3. **The spec's `{src/index.ts, parsing, units}` 3-file assertion is STALE** (§2) — `src/index.ts`
   is already pure; `quantize/index.ts` is the real third impure barrel. The carve family's target
   list must be re-derived from the gate, not the spec prose.
4. **depth GREEN is partly vacuous for a library** — value.js has few SEGMENT_DIRS-named dirs
   (`composables/shaders/skeleton/…` are UI vocabulary); the T2 clause has little to bite on in `src/`.
   The 500-ceiling (14 files over, incl. `parsing/color/color.ts` 718L) is the proportion law that
   actually bites — but it lives inside `proof:backend-structure`/`colocation-globality`, not a
   standalone src gate. A landed `typescript-library` profile should surface a standalone ceiling arm.
5. **The carve is ONE barrel of THREE.** `parsing/index.ts` (586L, 9 own, 0 re — a pure god-impl-file)
   and `quantize/index.ts` (2 own) remain. The `units/index.ts` carve proves the zero-churn mechanism;
   the other two are the same mechanism applied (parsing is the heavier: 9 own-runtime exports to
   drain behind a pure barrel).

---

## §6 — Reproduce

```
# ported gates (READ-ONLY, --root against any value.js checkout):
node proof-depth.mjs             --root=<root>   # PORT: run() walks SRC not SRC/components
node proof-barrel-cycle.mjs      --root=<root>
node proof-import-boundaries.mjs --root=<root>   # faithful → 26 (gate mis-fit)
node proof-import-boundaries.calibrated.mjs --root=<root>   # isSubpathEntry := index.ts + subpaths/*.ts → GREEN
node proof-backend-structure.mjs <root>/api
node proof-barrel-pure.mjs       --root=<root>   # AUTHORED (§2 embeds the full source)
# the carve: split src/units/index.ts → value-unit/function-value/value-array/types.ts + pure barrel;
#            re-point interpolate.ts off ./index onto ./value-unit + ./types; verify:
node -p "Object.keys(require('./package.json').exports).length"   # 8, unchanged
npx vue-tsc -p tsconfig.lib.json --noEmit                          # exit 0
node proof-barrel-pure.mjs --root=<root>                           # units/index.ts GREEN
```

**Composition note (facts, not a ranking)**: F1 answers WHAT tree; the barrel-pure gate + the
`units/index.ts` carve is the SAME node F2 reaches via its cycle spine and F4 via the type-lattice
value-model split (spec §8). D2 (api = ratify) is the cross-family convergence exemplar. This proto
neither ranks the family nor picks a winner — that is the critics'/agglomerator's earned outcome.
