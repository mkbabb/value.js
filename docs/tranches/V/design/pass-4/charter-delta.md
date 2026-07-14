# V · pass-4 · CHARTER δ — LIBRARY COMPLEXITY REDUCTION (clause 12, the sharpest un-charted ask)

**Pass 4 · charter-δ lane · 2026-07-13 · author: charter-δ runner (opus, model declared).** RAN in an
isolated worktree (`wf_cc1a5634-d01-1`, `npm ci` fresh), reset to the **tranche-u tip `7b554e4`** (the live
library; its 14 god-modules match the pass-3 audit to the line — `color.ts` 754, etc.). Every number below
carries a committed, re-runnable instrument; all mutation is worktree-only and **NEVER merged** — the
deliverable is this doc + the two durable instruments under `pass-4/instruments/`. This charter closes
**GA-1 / owner-clause 12** and reconciles **NG-4** (β's color merge ≠ complexity reduction).

**The durable-instrument law (pass-3 NG-2), honored.** The two claims below — "the metric goes DOWN" and
"β re-couples, δ does not" — are each backed by a committed `.mjs` re-runnable from the repo root against
ANY tree (the α `census-postmove.mjs` referent):
- `pass-4/instruments/complexity-scan.mjs` — the ceiling-compliance metric set (G500 / OVER500 / MAXLOC +
  impure-barrel + cyclomatic-hotspot diagnostics). Doubles as a born-RED gate (`--gate N`).
- `pass-4/instruments/domain-edges.mjs` — the cross-domain coupling instrument (the NG-4 discriminator;
  `--merge-sim` reproduces β's post-`git mv` graph WITHOUT mutating the tree).

---

## §0 The ruling up front

**Clause 12 is now CHARTED with a metric that goes DOWN, and it is measured, not asserted.** Three exemplar
god-module carves RAN green on HEAD; the ceiling metric fell and the public surface did not move:

| metric (instrument) | HEAD `7b554e4` | after the 3 RUN carves | Δ |
|---|---|---|---|
| **G500** — files > 500 LoC (the codified ceiling-violation count) | **14** | **11** | **−3** |
| **OVER500** — Σ max(0, LoC−500) (total ceiling overage) | **1576** | **1075** | **−501** |
| **MAXLOC** — the repo's largest file | **754** (`color.ts`) | **658** (`scroll-timeline.ts`) | **−96** |
| export surface (`proof:barrel-parity` + `proof:dts-surface`) | GREEN | **GREEN** | **0 change** |
| behavior (`vitest run`) | 2326 pass | **2326 pass** | 0 |
| bundle floor (`proof:subpath-budget`) | 11/11 | **11/11** | 0 |

**The honest headline (objective-honesty, NG-3):** the metric that goes DOWN is **ceiling non-compliance**,
NOT total complexity. **Net LoC did not fall — it ROSE +158** (19809 → 19967: new file headers, imports,
comments). Total cyclomatic did not fall — a carve MOVES the 74-branch `evaluateMathFunctionInternal` to a
sibling, it does not simplify it. What a carve buys is **locality + codified-ceiling compliance**: every
LOGIC module comprehensible in isolation, under the glass-ui 500-line law. Net-LoC reduction is a DIFFERENT,
harder objective (delete / dedup code) this charter does not claim and the god-modules do not offer.

**NG-4 ruled (measured, §5):** β's color merge serves **"better structure"** (domain cohesion; it nets
XDOM file-pairs −5) but is **NOT clause-12 progress** — it is a `git mv` RELOCATION: G500/OVER500/MAXLOC are
**untouched** and it INTRODUCES a new coupling direction (`units/color → parsing`, 0→5). δ's carve is the
inverse: it reduces the ceiling metric and introduces **zero** new coupling direction. They are orthogonal
and **compose** (merge picks the directory, carve picks the file sizes) — with one measured interaction: on
the carved tree β's new capsule→kernel edges **amplify 5→10** (the grammar-util imports spread across the
new siblings). The two must not be conflated: **the clause-12 win is the carve, not the merge.**

---

## §1 The metric set — NAMED, DEFENDED, and its objective stated (NG-3)

The charter's task-1: *name the metric that goes DOWN — not net LoC.* Here it is, as a set, each a RULE with
its objective named and its alternative named (the objective-honesty law: never dress a chosen objective as a
measurement).

### PRIMARY — ceiling compliance (`complexity-scan.mjs`)

> **G500** = count of `src/**/*.ts` files with raw LoC > 500. **OVER500** = Σ max(0, LoC−500). **MAXLOC** =
> the single largest file.

- **The objective (stated as a rule, not a measurement):** *bring every LOGIC src file under the 500-raw-line
  ceiling* — the glass-ui `STRUCTURE-SPEC` law (`§0.2`, "the 500-raw-line ceiling"), made scalar. Adopting
  glass-ui's codified ceiling is a CHOICE; the referent is the constellation convention the campaign already
  ratified (Charter A).
- **The named alternative:** *minimize net LoC* (dedup / delete). A carve does NOT serve it (net LoC rises).
  A different, harder objective — not pursued here, and named so it is not silently conflated.
- **Why this metric and not net-LoC:** the discriminator the charter demands. A **carve** (split a >500 file
  into ≤500 siblings behind the same barrel) reduces G500/OVER500/MAXLOC. A **`git mv` relocation** (β's
  merge) leaves all three **unchanged**. The metric falls for the owner's ask and stands still for a
  reshuffle — exactly the property clause 12 needs. Proven both ways in §5.
- **OVER500 is the single best scalar:** monotone-decreasing under any real carve that moves LoC out of an
  over-ceiling file, invariant under relocation, and immune to the "split a 754 into 2×377" game in a way a
  bare file-count is not (it credits partial progress and penalizes leaving a file at 501).

### DIAGNOSTIC companions (named where complexity lives; NOT all "go down")

- **IMPUREBARREL** — `index.ts` barrels carrying LOCAL logic (a barrel that isn't a barrel). Baseline:
  `parsing/index.ts` (93 local decls), `quantize/index.ts` (41), `units/index.ts` (15). A carve of
  `parsing/index.ts` cut its local decls **93 → 61** (the handlers left; the assembly stays — legitimately).
- **HOTSPOTS** — top functions by cyclomatic proxy (decision-point count). Baseline top-3:
  `evaluateMathFunctionInternal` (74, `parsing/math.ts`), `convertToPixels` (43, `units/utils.ts`),
  `flattenPath` (40, `transform/path.ts`). **Honesty:** a carve MOVES a hotspot to a sibling; it does NOT
  lower the per-function number. Total cyclomatic is carve-invariant. Reported so the doc names the
  *irreducible* complexity a carve cannot touch (that would need an algorithm rewrite, out of scope).

### The COUPLING invariant (`domain-edges.mjs`) — the NG-4 discriminator, stated in TWO readings

- **The coupling-DIRECTION set** = the distinct `srcDomain → dstDomain` relations (domains = the top-level
  `src/` subtrees, `units/color` split out). This is the coupling TOPOLOGY. **A δ carve is
  direction-invariant** (it splits WITHIN a domain — it adds no new relation). **β's merge ADDS a direction**
  (`units/color → parsing`). This is the honest NG-4 signal.
- **The file-PAIR count (XDOM)** = distinct `(srcFile → dstFile)` cross-domain pairs. **NOT carve-invariant —
  a carve RAISES it** (more source files cross an EXISTING boundary; +7 here). β LOWERS it (−5) by relabeling.
  So XDOM is a coupling *quantity*, not the *direction* signal — reported honestly, never as "carve reduces
  coupling" (it does not). *(An earlier draft of this instrument claimed "a carve leaves XDOM unchanged"; that
  was FALSE at file-pair granularity and is corrected — retract-and-measure, the campaign law.)*

---

## §2 Baseline — the 14 god-modules at HEAD `7b554e4` (`complexity-scan.mjs src`)

Re-run: `node docs/tranches/V/design/pass-4/instruments/complexity-scan.mjs src`. G500=**14**, OVER500=**1576**,
MAXLOC=**754**, files=72, total LoC 19809. The 14 (LoC · exports · classification):

| # | file | LoC | exports | class | cohesion carve axis |
|---|---|---|---|---|---|
| 1 | `parsing/color/color.ts` | **754** | 4 | LOGIC | leaf primitives / keyword parsers / color-mix factory |
| 2 | `parsing/timeline/scroll-timeline.ts` | **658** | 25 | LOGIC | types / parse / serialize / extract |
| 3 | `parsing/index.ts` | **644** | 11 | LOGIC (impure barrel, 93 decls) | function-parser builders (transform/gradient/if/…) |
| 4 | `easing.ts` | **643** | 36 | LOGIC (reference table) | easing FAMILY (poly / trig-expo / bounce-elastic-back) |
| 5 | `parsing/stylesheet/stylesheet.ts` | **643** | 2 | LOGIC | at-rule parsers / qualified-rule + declaration parsers |
| 6 | `units/style-names.ts` | **641** | 1 | **DATA-TABLE** | **EXEMPT** (pure `STYLE_NAMES` array, 0 functions) |
| 7 | `units/color/gamut/boundary.ts` | **604** | 12 | LOGIC | HSV-field boundary / OKLCh slice+hue-sweep |
| 8 | `transform/decompose.ts` | **603** | 12 | LOGIC | mat4 kernel / quaternion / decompose-recompose |
| 9 | `parsing/utils.ts` | **603** | 29 | LOGIC | fast-scanners / balanced-walk / parse-primitives+diagnostics |
| 10 | `units/utils.ts` | **601** | 14 | LOGIC | flatten-object / unit-conversion |
| 11 | `transform/path.ts` | **562** | 5 | LOGIC | curve-flattening / geometry (PathGeometry) |
| 12 | `units/color/dispatch.ts` | **558** | 7 | LOGIC (fan-in hub; in color SCC) | color2 dispatch / gamut-map |
| 13 | `parsing/math.ts` | **536** | 3 | LOGIC | calc-parse builders / calc-eval |
| 14 | `units/color/gamut/gamut.ts` | **526** | 19 | LOGIC (in color SCC) | OKLab primitives / gamut-mapping |

**DATA-TABLE vs LOGIC (charter task-2).** Only **#6 `style-names.ts` is DATA** — a pure `STYLE_NAMES` array,
**0 functions**, 631 quoted entries. It is **EXEMPT-with-rationale**, exactly as the glass-ui law exempts its
vendored data: a data table has NO cohesion axis to carve along; sharding it alphabetically would be an
*arbitrary* split (a chosen-objective-dressed-as-structure smell), adding a barrel indirection for zero
comprehension gain. The ceiling law should read **"≤ 500 LoC for LOGIC modules; DATA tables exempt (or a
higher DATA ceiling)."** `color-names.ts` (260 LoC) is cited by the charter as a data example but is not a
god-module (< 500). **#4 `easing.ts`** is the borderline: a *reference table of 29 pure timing functions* —
data-like, but each is genuine logic, so it CARVES (by easing family) as the softest LOGIC carve. The other
12 are LOGIC god-modules with clear cohesion axes.

---

## §3 The carve set — per-file plan (3 RUN + 10 SPEC'd LOGIC; 1 DATA-exempt)

Every plan is a **kind-named-sibling carve** (the `units/color/{base,spaces}` + `units/index.ts` +
`parsing/{color,timeline,stylesheet}` precedents): move a cohesive region into a named sibling; the module (or
its cluster barrel) re-exports the same symbols, so the FROZEN subpath surface is byte-stable (§4 proves it
for the 3 RUN carves via `barrel-parity`). "after" = the god-module's own residual LoC; sibling LoC in the
notes. Metric column = the Δ each carve makes to **G500**.

| # | file | before | after (residual) | siblings (LoC) | G500 Δ | status |
|---|---|---|---|---|---|---|
| 1 | `parsing/color/color.ts` | 754 | **443** | `color-primitives`(180) · `color-keywords`(98) · `color-mix`(129) | −1 | **RUN ✓** |
| 3 | `parsing/index.ts` | 644 | **400** | `functions/gradient`(125) · `functions/conditional`(140) | −1 | **RUN ✓** |
| 8 | `transform/decompose.ts` | 603 | **406** | `mat4`(126) · `quaternion`(112) | −1 | **RUN ✓** |
| 2 | `parsing/timeline/scroll-timeline.ts` | 658 | ~400 | `scroll-timeline-serialize`(~180: the 5 `serialize*` fns) · `scroll-timeline-types`(~90) | −1 | SPEC |
| 4 | `easing.ts` | 643 | ~260 | `easing/polynomial`(~130) · `easing/trig-expo`(~120) · `easing/bounce`(~140); re-export from `easing.ts` | −1 | SPEC |
| 5 | `parsing/stylesheet/stylesheet.ts` | 643 | ~390 | `stylesheet-atrules`(~250: `@keyframes`/`@property`/`@font-face`/`@media` parsers) | −1 | SPEC |
| 7 | `units/color/gamut/boundary.ts` | 604 | ~350 | `boundary-oklch`(~256: `OKLChSlice`+`OKLChHueSweep` samplers+`Into` variants) | −1 | SPEC |
| 9 | `parsing/utils.ts` | 603 | ~250 | `scan`(~180: `scan*Fast` + fast parsers) · `balanced`(~180: `walkBalanced`/`splitTopLevel`/`findTopLevel`) | −1 | SPEC |
| 10 | `units/utils.ts` | 601 | ~250 | `flatten`(~200: `flattenObject`/`unflatten*`) · `convert`(~240: `convertTo*`/`convert2`) | −1 | SPEC |
| 11 | `transform/path.ts` | 562 | ~280 | `path-flatten`(~280: `tokenizePath`+`flatten{Cubic,Quadratic,Arc,Path}`) | −1 | SPEC |
| 13 | `parsing/math.ts` | 536 | ~256 | `calc-eval`(~280: `evaluateMathFunction*`+`resolveTo*`+`inferResultUnit`) | −1 | SPEC |
| 12 | `units/color/dispatch.ts` | 558 | ~400 | `gamut-map`(~156: `gamutMap`+`gamutMapToRgbSpace`) — **registry-care** (β's TDZ) | −1 | SPEC-with-caveat |
| 14 | `units/color/gamut/gamut.ts` | 526 | ~326 | `oklab-primitives`(~200: `oklab2*`/`srgb2oklab*`/`raw*`) — in color SCC | −1 | SPEC-with-caveat |
| 6 | `units/style-names.ts` | 641 | — | **DATA-EXEMPT** (no cohesion axis; do not shard) | 0 | EXEMPT |

**Terminal state if the full LOGIC set lands:** G500 **14 → 1** (only `style-names`, and it is DATA-exempt →
**G500_logic = 0**); OVER500 → ~0; MAXLOC → ~450. The 3 RUN carves are the proof-of-method; the 10 SPEC'd are
mechanical repeats of the same kind-named-sibling pattern along the stated axis.

**Two SPEC carves carry a caveat (honesty):** `dispatch.ts` (#12) and `gamut.ts` (#14) sit inside the color
capsule's 5-file leaf SCC (β §4.1) and the eager/lazy conversion registry. A carve there must land WITH β's
order-independent registry primitive (the `2 FAIL → 0` TDZ cure β demonstrated), or the carved-out
`gamut-map`/`oklab-primitives` can re-trip the `xyz2rgb`-in-TDZ hazard. These two are **carve-after-registry**,
not standalone — flagged, not hidden.

---

## §4 The 3 RUN exemplar carves — full evidence (charter task-3)

Reset: `git reset --hard 7b554e4 && npm ci`. Each carve is a kind-named-sibling split; the residual module
imports the siblings (or, for the recursive `color-mix`, a FACTORY receives the top-level parser — the
`createMathFunctionParsers(valueParser)` idiom — so the module graph stays a clean DAG). Gates, once, on the
final carved tree:

```
npx vue-tsc -p tsconfig.lib.json --noEmit   → exit 0
npx vitest run                              → 85 files / 2326 tests PASS   (= β's baseline; behavior-preserving)
npm run build                               → exit 0
npm run proof:subpath-budget                → 11/11 GREEN
npm run proof:barrel-parity                 → GREEN  (root barrel == ∪ subpath barrels ∪ allowlist — the surface oracle)
npm run proof:dts-surface                   → PASS   (published .d.ts carries the surface)
complexity-scan.mjs src                     → G500 11 · OVER500 1075 · MAXLOC 658
```

**`git diff --stat src/`: 3 files changed, 49 insertions(+), 801 deletions(-)** (the 801 lines LEFT the god
modules; they landed in 7 new siblings). Per carve:

### 4.1 `color.ts` 754 → 443 (the biggest; charter-mandated)
`color-primitives.ts` (180 — the leaf combinators `sep`/`colorValue`/`componentExpr`/`colorOptionalAlpha`/
`hex`/`kelvin` + the `color-mix`/`color()` space-name sub-grammars + the two data maps) · `color-keywords.ts`
(98 — `nameParser`/`systemColorParser`/`currentColorParser`/`namedThenSystem`) · `color-mix.ts` (129 — the
`createColorMix(colorValueParser)` factory). The cohesion axis is honest: every extracted member is a LEAF
(no reference to the recursive `CSSColor.Value`); the combinators that DO recurse (`relativeColorParser`, the
per-space parsers, `colorFunction`, `lightDark`) stay in `color.ts`. **One init-order bug found and fixed by
the suite** (not by typecheck): `createColorMix`'s `colorMixColorPct` must stay `Parser.lazy` — the factory
runs at `color.ts` module-eval, before the `parsing/units ↔ parsing/color` cycle settles, so
`CSSValueUnit.Percentage` must be read at PARSE time (24 test files went red until the lazy wrapper was
restored; then 2326/2326). This is why the carve was RUN against the full suite, not just typechecked.

### 4.2 `parsing/index.ts` 644 → 400 (the impure-barrel god)
`functions/gradient.ts` (125 — `handleGradient`, self-contained over the `../units` dimension parsers) ·
`functions/conditional.ts` (140 — the `if()` grammar: `splitIfClauses` + `handleIf`, `utils`-only). Both
handlers are self-contained (no back-reference to the top-level `Value`), so the extraction is a plain move +
`import { handleGradient }`/`{ handleIf }`. IMPUREBARREL local decls: **93 → 61** (the barrel is less of a
non-barrel; the residual is the legitimate dispatch-assembly + public entry points).

### 4.3 `transform/decompose.ts` 603 → 406 (a non-parsing domain — proves the pattern generalizes)
`mat4.ts` (126 — the pure column-major `mat4*`/`vec3*` kernel + the `Mat4` type) · `quaternion.ts` (112 —
`matrixToQuaternion`/`slerp`/`quaternionToMatrix` + the `Vec4` type). A clean DAG (`mat4 ← quaternion ←
decompose`, `mat4 ← decompose`), zero cycle; `Mat4`/`Vec4`/`slerp` re-exported from `decompose.ts` so
`../transform/decompose`'s public surface (root + `/transform` subpath) is byte-stable. Transform tests 38/38.

---

## §5 NG-4 reconciliation — β's merge vs a δ carve (MEASURED, `domain-edges.mjs`)

The charter's task-4: rule honestly whether β's `parsing/color → units/color/parse` merge serves "better
structure" or "reduced complexity," and whether the carve changes the merge's shape. All measured — β's
`--merge-sim` reproduces the post-`git mv` graph without mutating the tree (the durable-instrument discharge
of NG-2 for β's edge claim).

| tree | G500 | MAXLOC | XDOM (file-pairs) | coupling directions | `units/color → parsing` |
|---|---|---|---|---|---|
| **HEAD `7b554e4`** | 14 | 754 | 143 | 20 | **0** |
| **δ carve (3 modules)** | **11** | **658** | 150 (+7) | **20** (0 new) | **0** |
| **β merge** (`--merge-sim` on HEAD) | **14** (unchanged) | **754** (unchanged) | 138 (−5) | **21** (+1) | **5** |
| **β merge ∘ δ carve** (`--merge-sim` on carved) | 11 | 658 | 148 | 21 | **10** |

**The ruling (each row measured):**

1. **β's merge is NOT clause-12 progress.** It is a `git mv` RELOCATION: **G500, OVER500, MAXLOC are
   UNCHANGED** (`color.ts` stays 754). It reduces raw XDOM file-pairs (−5, by relabeling 11 `parsing/color →
   units/color` edges intramural) — a **cohesion / "better structure"** win — but it **INTRODUCES a new
   coupling direction** `units/color → parsing` (0 → 5, the grammar-util capsule→kernel dependency β itself
   flagged). Reducing a coupling *quantity* while adding a coupling *direction*, and reducing no god-module,
   is "better structure," not "reduce complexity." **δ must not let it read as clause-12 progress** — and this
   doc states it plainly.

2. **δ's carve is the inverse and the actual clause-12 win.** G500 14→11, and it adds **ZERO** new coupling
   directions (the 20-direction set is byte-identical pre/post — the carve splits WITHIN `parsing`). Its only
   coupling cost is +7 file-PAIRS along EXISTING directions (`parsing→units` +5, `parsing→units/color` +2 —
   the new siblings each import the grammar kernel), which is a locality trade, not a new dependency relation.

3. **They COMPOSE, and the composition is MEASURED — with one interaction.** merge ∘ carve keeps δ's G500=11
   (the merge is relocation, so it cannot undo the ceiling win) and keeps β's directory cohesion. **The
   interaction:** on the carved tree, β's new `units/color → parsing` edges **amplify 5 → 10** — because δ's
   carve spread the shared grammar-util imports (`../utils`, `../units`) across `color-primitives`/`color-mix`/
   `color-keywords`, so relabeling them into `units/color` manufactures more capsule→kernel pairs. **This
   sharpens NG-4:** after δ's carve, β's merge would create *twice* the capsule→kernel coupling. The shapes
   compose (both land) but the carve makes β's re-coupling cost larger — an argument to land the carve and
   leave the color-parse capsule where it is (under `parsing/`), OR to pair the merge with a grammar-util
   factory that severs the new edges. **Routed to the owner** (it touches OF-5's landing order + the OF-4
   directory question); δ decides no fork.

**Bottom line for the registry (does the merge read as clause 12?):** NO. Clause-12's metric moves for the
**carve** (G500 −3 proven) and is **flat for the merge** (G500 0). The merge's row in the pass-3 registry
("Charter B, 62%, the color merge") must not be cited as complexity-reduction carriage; it is structure/
cohesion carriage. This is the NG-4 correction the fold asked δ to make explicit.

---

## §6 Reconcile with clause 4 — the ceiling law IS the enforcement (charter task-4b)

The god-module carve is the D3 half of clause 4 ("long-running dirs broken into common modules and
encapsulated"). The **enforcement** is not a plan, it is a born-RED gate: `complexity-scan.mjs --gate N`
exits non-zero when G500 > N. Demonstrated as a genuine born-RED (RED before, GREEN after):

```
# on the pristine baseline (G500=14): the gate at 11 FAILS  → "GATE FAIL: G500=14 > 11"   (born-RED)
node …/complexity-scan.mjs /tmp/vjbase/src --gate 11
# on the carved tree (G500=11):       the gate at 11 PASSES → "GATE PASS: G500=11 <= 11"
node …/complexity-scan.mjs src --gate 11
```

The landing wave ratchets `--gate` down as each SPEC'd carve lands (11 → … → 1), the same monotone-ratchet
discipline the O/Q-era per-invariant born-RED gates use. This is the F1 `barrel-pure` / 500-line-ceiling law
made operational for LOGIC modules, with the DATA exemption (`style-names`) codified. **It replaces no
existing gate** and adds one CI-wired scalar; whether it joins `test:dist` is an owner call (the gate-set is
Q13-governed).

---

## §7 Landing costs + reproduce + owner-forks

**Landing costs (booked, not paid — the campaign never merges).** Per RUN carve: (a) the new siblings must be
added to the `parsing/CLAUDE.md` + `transform/CLAUDE.md` file inventories + the root CLAUDE.md Structure block
— a **doc-canon sweep** (the `canon-sync` born-RED gate PASSES on the carve as-is, because the carve ADDS
undocumented files and removes no documented path — but the inventory should be updated for honesty). (b) No
test-repoint: the carves preserve the public surface (`barrel-parity` GREEN), so no test imports a moved
symbol by a new path. This is a *smaller* blast than β's merge (which β measured at 15 test-repoints + a
canon sweep, because it moved a *documented* path). Gated on OF-5 (the coupled owner event); nothing merges.

**Reproduce (all from repo root, against any tree):**
```
git reset --hard 7b554e4 && npm ci
node docs/tranches/V/design/pass-4/instruments/complexity-scan.mjs src           # G500 14 · OVER500 1576 · MAXLOC 754
node docs/tranches/V/design/pass-4/instruments/domain-edges.mjs src              # XDOM 143 · 20 directions
node docs/tranches/V/design/pass-4/instruments/domain-edges.mjs src --merge-sim  # β post-merge: units/color→parsing 5
# apply the 3 carves (this worktree's src diff), then:
npx vue-tsc -p tsconfig.lib.json --noEmit && npx vitest run && npm run build \
  && npm run proof:subpath-budget && npm run proof:barrel-parity && npm run proof:dts-surface
node docs/tranches/V/design/pass-4/instruments/complexity-scan.mjs src --gate 11 # GATE PASS: G500=11
```

**Owner-forks (δ decides NONE).** δ touches no OF-1/2/3. It **feeds OF-4/OF-5**: the merge∘carve interaction
(§5.3, β's edges amplify 5→10 after the carve) is evidence the owner weighs when ruling the color-parse
capsule's directory (OF-4) and the merge's landing order (OF-5). It surfaces **no new fork**. The DATA-table
exemption (`style-names`) and the ceiling value (500, from glass-ui) are stated as CHOICES, not measurements.

**What δ closes:** GA-1 / clause 12 now has a charter, a metric that goes DOWN (G500/OVER500/MAXLOC), a
per-file carve set (3 RUN + 10 SPEC'd + 1 DATA-exempt), and a measured NG-4 ruling (β = structure not
complexity; they compose; the carve amplifies β's re-coupling). The instruments are committed + re-runnable
(NG-2 discipline). **Worktree HEAD `7b554e4`; no prototype merges — evidence only. Deliverable committed:
this doc + `pass-4/instruments/{complexity-scan,domain-edges}.mjs`, pathspec `docs/tranches/V/**`.**
