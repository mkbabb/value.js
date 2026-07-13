# V · pass-2 · CHARTER B — the execution vehicle (F6) + the banked-F2 substrate

**Pass 2 · CHARTER-B lane · 2026-07-13 · author: charter-b runner (opus, model
declared).** RAN in an isolated worktree (`wf_1112d3db-442-4`, `npm ci` fresh),
re-based to campaign HEAD `9423094` (the protos ran at `6abef80`; item 5 re-derives
the drift). Every number below is MEASURED; all mutation happened only in the
worktree and is NEVER merged — the deliverable is this evidence + the
`charter-b-move-manifest.md` companion. Instruments live at `_proto/*.mjs`
(evidence-only, un-merged).

Charter-B governs 5 RUN items (AGGLOMERATION §3·Charter-B). Verdict up front:
**5/5 RAN** — the per-file scatter (three gates green), the pre-codemod manifest,
the `units/index.ts` carve (four gates green), the wired+validated demo scanner
(ComponentSliders false-positive disarmed by first-hand reproduction), the
co-designed order-independent registry (the color-SCC carve now passes the
`color2` runtime suite), and the HEAD re-derivation + doc/prose third gate.

---

## §0 Headline table (what RAN)

| # | Charter-B item | mode | the load-bearing measured result |
|---|---|---|---|
| 1 | per-file SCATTER (not whole-dir rename) | **RAN** | 18 files → 2 CC-5 dests · 94 rewrites/53 files · **audit SAFE:true ∧ oracle typecheck EXIT 0 ∧ vite build EXIT 0** |
| 2 | pre-codemod destination MANIFEST | **RAN** | 18-row ratifiable table (`charter-b-move-manifest.md`); the thesis is refuted BY the manifest before a file moves |
| 3 | `units/index.ts` carve through the vehicle | **RAN** | 452→17-line pure barrel + 4 siblings · typecheck 0 · **2326 tests pass** · `subpath-budget` 11/11 · barrel-purity RED→GREEN |
| 4 | wire+VALIDATE the F2 substrate + order-indep registry | **RAN** | scanner resolves @-alias+.vue (0 unresolved) · ComponentSliders LIVE · 3 false-positives self-caught+disarmed · registry fix → color-SCC carve **2 FAIL→0** |
| 5 | re-derive at HEAD + doc/prose third gate | **RAN** | @-blast 341→358 (+5.0%) · **demo baseline 12-error-RED→0-GREEN** (goo-blob swap) · 14 actionable docs vs 90 historical records |

---

## §1 · ITEM 1 — the per-file SCATTER (RAN, three gates green)

critique-f6 F6-1's severest gap: F6 demonstrated a whole-dir RENAME
(`for d in …; do git mv demo/@/$d demo/$d`) — the six global buckets PRESERVED
minus `@`. The owner's edict is a per-file SCATTER to computed homes. I RAN it.

**The move-set** = the CC-5 manifest (item 2): `composables/color/`'s 18 files to
**2 computed destinations** (8 kernel → `demo/@/composables/`, 10 → the app-root
`demo/color-picker/composables/color/`). This is a genuine scatter (one bucket →
multiple homes, per-file rewrites) AND it stress-tests the class F6 never hit:
**10 cross-tree moves OUT of the `@`-alias** (into the un-aliased app-root), which
forces `@composables/color/X` → a relative `./composables/color/X` rewrite — a
strictly harder rewrite than a colocate-into-feature (which stays alias-covered).

**The codemod** (`_proto/codemod-scatter.mjs`) is move-set-aware (F3 friction #1:
both endpoints of every edge use their FUTURE location). Measured:

```
moved files              : 18  (kernel 8 → @composables/ · app-root 10 → demo/color-picker/composables/color/)
import-specifier rewrites: 94
files touched            : 53
AUDIT residual @composables/color/ refs (UNSAFE if >0): 0
SAFE                     : true
```

**The two-gate discipline survives the scatter — and a THIRD gate holds:**

| gate | mechanism | result |
|---|---|---|
| 1 · audit (`SAFE:true`) | 0 residual `@composables/color/` refs after rewrite | **PASS** |
| 2 · oracle (`delta==0`) | `vue-tsc -p tsconfig.demo.json` after the 18 `git mv` | **EXIT 0 / 0 errors** (absolute GREEN, not delta-against-RED) |
| 3 · runtime/build | `npm run build && npm run gh-pages` on the scattered tree | **EXIT 0** (`✓ built in 1.42s`) — resolves AND bundles |

The demo build is the demo analogue of F2's src runtime-init lesson: vite
resolved + bundled all 18 scattered files at their cross-tree homes. **Runtime
note**: the scatter is LOWER runtime-risk than F2's src XYZ carve — it RENAMES
graph nodes without changing any edge's semantics or import ORDER, so the DI-key
identity (`keys.ts`'s `Symbol()` InjectionKeys, imported by 26 files) is preserved
by the single-module-instance guarantee typecheck confirms. This is why
typecheck-green + build-green is strong here where it was insufficient for the src
eval-order carve (item 4).

**Honest friction**: CC-5 produced **0 COLOCATE-into-feature** verdicts for this
bucket (§2), so the literal "composable X → component Y's folder" move F6-1 named
was not the shape the predicate computed. The colocate rewrite is mechanically
the *alias-tail* class — identical to the 8 kernel-promote rewrites this run
DID exercise (a `@composables/color/X` → `@composables/X` retarget) — just aimed
at a `@components/<feature>/composables/` tail. The scatter proves the discipline;
the absence of a colocate verdict is item 2's finding, not a gap in the vehicle.

## §2 · ITEM 2 — the PRE-CODEMOD destination MANIFEST (RAN → `charter-b-move-manifest.md`)

critique-f6 F6-3: the oracle proves RESOLUTION, is blind to PLACEMENT DESIGN; a
221-diff eyeball is the only placement review. The manifest replaces it. Authored
by running CC-5 (`_proto/census-color.mjs`) on the A1 worst-offender bucket
BEFORE the codemod. The full 18-row table is the companion doc; the load-bearing
facts:

- **18/18 PROMOTE, 0 COLOCATE.** The feature-capsule thesis is refuted BY the
  manifest, in one read, before a file moves — confirming retro-f3 G2's prediction
  exactly ("most promote"). The honest colocation shape for `composables/color/`
  is a small module-kernel (8: `keys`/`useContrastSafeColor`/`ink`/`view-accent`/
  `generate-color`/`aurora-atoms`/`useCustomColorNames`/`useColorPipeline`) + an
  app-root pipeline cluster (10) — NOT vertical feature capsules.
- **The manifest surfaces the ONE placement DESIGN call the oracle can't judge**:
  `useColorPipeline` (pipeline HEAD) → module-kernel while its 8 stages → app-root,
  a flat-predicate split of a cohesive cluster. A human OVERRIDES this on the
  table (a 1-row annotation), never by re-reading 94 rewrites. `vue-tsc` blesses
  either placement identically — which is precisely why the manifest, not the
  oracle, is the placement gate.
- **A census-precision correction**: consumers are counted as IMPORT EDGES, not
  text mentions. retro-f3 G2 read `useColorPipeline` as imported by 4 siblings +
  AboutPane; the import-edge truth on HEAD is **App.vue + keys.ts only** (the
  other 4 mention it in `/* */` comments — verified by grep). This tightens the
  CC-5 substrate retro-f3 G3 flagged as unstable across runs.
- **Cross-lane convergence (independent run)**: Charter A ran the same
  `composables/color/` move-map by the same CC-5 predicate and landed
  **17/18 PROMOTE, 1 COLOCATE** — the same headline verdict (the spec's
  "15→color-picker capsule" REFUTED by the consumer set), reached by two
  independent instruments. The 1-file delta is a methodology refinement, not a
  disagreement: A applies a RECURSIVE private-helper FOLLOW (a 0-external-consumer
  helper follows its parent's destination — `ink-walk`→kernel with `ink`), where
  my FLAT predicate sends intra-only files to the app-root pipeline home. My
  manifest already flags those `PROMOTE(pipeline)` rows as a "flat approximation"
  for human review — A's recursive-follow is exactly the human override the
  manifest surface exists to receive. Both lanes agree PROMOTE-dominant; neither
  finds a feature-capsule. This is the census stability (in DIRECTION) retro-f3 G3
  asked for, demonstrated across two runs.

## §3 · ITEM 3 — the `units/index.ts` carve through the vehicle (RAN, four gates green)

critique-f6 F6-4: F6 RAN only D1; the src carves (the atomic-vs-publish hazard)
were asserted. I RAN the `units/index.ts` value-model carve — the spine node
4 families converge on (AGGLOMERATION §1 fact 1) — through the vehicle
(`_proto/carve-units.mjs`), behind the UNTOUCHED 8-key exports map.

**The carve**: the 3 own-runtime classes (`ValueUnit`/`FunctionValue`/`ValueArray`)
+ 2 types (`InterpolatedVar`/`ComputedEndpointCache`) → kind-named siblings
(`value-unit.ts`/`function-value.ts`/`value-array.ts`/`interpolated-var.ts`)
behind a PURE re-export barrel — mirroring the landed `units/color/{base,spaces}`
precedent. `index.ts` goes **452 → 17 lines**, own-runtime exports **3 → 0**.

**Why the 8-key exports map + `subpaths/units.ts` are UNTOUCHED (zero importer
rewrites — the whole D3 point)**: `subpaths/units.ts` imports
`{ValueUnit, FunctionValue, ValueArray, InterpolatedVar} from "../units"`; the
pure barrel re-exports all four → the specifier still resolves → the `/units`
publish surface is byte-stable. Export-map de-indirection is DEFERRED exactly as
glass-ui deferred its 5.1.0 (critique-f6 F6-4).

| gate | result |
|---|---|
| lib typecheck (`tsconfig.lib.json`) | **EXIT 0 / 0 errors** (delta 0 from GREEN baseline) |
| full unit suite (`vitest run`) | **85 files / 2326 tests PASS** |
| `npm run build` | **EXIT 0** |
| `proof:subpath-budget` (publish-surface stability = the hazard) | **11/11 GREEN** (C4 = `/units` closure parse-that-free, unchanged) |
| barrel-purity property (bonus) | `units/index.ts` own-runtime **3 → 0** — RED→GREEN, the exact spine-fact §1 names |

**Micro-reduction the carve enabled**: `UNITS` was a DEAD import in the old
`index.ts` (referenced only in a comment) — the carve drops it (the owner's D3
complexity-reduction ask, earned as a side effect of the split).

## §4 · ITEM 4 — wire+VALIDATE the F2 substrate + the order-independent registry (RAN)

### 4a · the demo scanner, wired to resolve @-alias + .vue (the ComponentSliders disarm)

critique-f2 G4/G5: no demo dead-code verdict is actionable until the
`ComponentSliders`-class false-positive (a live iOS-Safari pointer-recovery
control listed DEAD by raw madge) is disarmed. I built the deterministic scanner
(`_proto/scan-demo.mjs`) resolving the EXACT vite/tsconfig alias map + `.vue` +
index + `.js`→`.ts` + `?worker` query — the resolutions raw madge misses.

```
files scanned            : 413
demo/@ product files     : 235
total resolved edges     : 975
unresolved @/rel specs   : 0        ← every alias+relative specifier resolves
ComponentSliders reached : true  (fan-in 1)   ← the F2 false-positive DISARMED
DEAD demo/@ product files : 7
```

**I reproduced the false-positive CLASS first-hand and disarmed it** — the
strongest possible validation. My naive comment-strip over `.vue` (App.vue has
5 `/*` vs 3 `*/` in its `<style>` CSS) swallowed the import block between a stray
`/*` and the next `*/`, producing **3 NEW false-positives**
(`ErrorBoundary`/`useColorUrl`/`PaneSlot` — all imported by App.vue). Fix:
extract `<script>` blocks FIRST (imports never live in `<style>`), then strip.
Dead 10→7, edges 956→975. This IS the critique-f2 lesson lived: a `.vue` scanner
is NOT trustworthy until its comment/resolution blind spots are proven closed.

**The 7 surviving dead flags are hand-validated genuine** (flag-only until
validated, per the law): 2 katex orphans (`Katex.vue`/`katex/index.ts` —
referenced only in stale `/* */` comments, no live `<Katex>` import) + 5
dead-barrel/vendored `index.ts` (0 bare-barrel importers — the src
`timeline/index.ts` class F2 found). No verdict is auto-actionable; each was
confirmed by inspection.

### 4b · the ORDER-INDEPENDENT REGISTRY (the color-SCC carve now passes `color2`)

critique-f2 G3: the color-SCC carve "compiles green, FAILS at runtime" — the
barrel cycle was load-bearing for `XYZ_FUNCTIONS` eval order; needs an unbuilt
order-independent registry. I RAN the full loop.

1. **Reproduced at HEAD** (`_proto/carve-color-scc.mjs`, 21 barrel imports
   redirected `from "."`/`".."` → concrete `base`/`spaces` across 14 files):
   typecheck **EXIT 0** (compiles green) but **2 FAIL** — `color2 RGB→LAB` +
   `RGB→XYZ`, both `Unknown target color space: "rgb"` at `dispatch.ts:247`
   (`XYZ_FUNCTIONS["rgb"]` undefined). F2's exact regression, live on HEAD. Root
   cause confirmed: `xyz2rgb` is a `const` arrow (TDZ-subject); the carved eval
   order reads it undefined at the eager table's module-eval.

2. **The fix** (`dispatch.ts`): make `XYZ_FUNCTIONS` (and the sibling
   `XYZ_FROM_INTO`) **lazy memos** built on first access (`_XYZ ??= {…}`), not
   eager module-eval literals. All `color2()` CALLS run post-eval, when every
   conversion binding is initialized — correct under ANY module order.

3. **Result** on the carved+fixed tree: typecheck 0 · the 2 tests **PASS**
   (`color-conversions.test.ts` 109/109) · **full suite 85 files / 2326 tests
   PASS** · `npm run build` EXIT 0 · dispatch.ts barrel value-imports **0** (the
   cycle severed: `from "./base"` + `from "./spaces"`).

The order-independent registry is the cycle-severance primitive F3's color
capsule needs (AGGLOMERATION §1 fact 3) — built, RUN, and gated by the `color2`
suite it was required to pass.

## §5 · ITEM 5 — re-derive at HEAD + the doc/prose third gate (RAN)

critique-f6 F6-5 (protos at `6abef80`, ~5% drift) + F6-6 (docs/prose is a third
blind class). Re-measured on HEAD `9423094`:

| surface | `6abef80` (proto) | HEAD `9423094` | drift |
|---|---|---|---|
| static-from @-alias specs | 341 | **358** | +17 (**+5.0%** — confirms the "~5% low" claim quantitatively) |
| dynamic `import()` @-alias | 10 | 10 | 0 |
| side-effect `@styles` imports | 4 | 5 | +1 |
| **demo typecheck baseline** | **12 errors (RED, goo-blob)** | **0 errors (GREEN)** | **the goo-blob→blob swap (commit `110b56f`) cured it** |

**The most consequential drift**: the demo baseline is now **absolute GREEN**.
The U.W-ADOPT goo-blob→blob swap removed the 12 `@mkbabb/glass-ui/goo-blob`
errors that made the proto's (and retro-f3 G4's) oracle a "delta against RED."
At HEAD the oracle is `EXIT 0` absolute — every codemod in this lane (scatter,
carve) is gated against a genuinely-green tree, and retro-f3 G4's
"0-regression-against-a-RED-baseline" critique is **moot at HEAD**.

**The doc/prose third gate** (the class neither the CODE_EXT audit nor the
typecheck oracle sees):

```
tracked .md files mentioning a dropped @-alias : 104
  of which historical tranche records (docs/tranches/*, NOT swept) : 90
  actionable live-doc surface (a landing MUST sweep)               : 14
canonical live reference: CLAUDE.md "Path aliases (tsconfig)" table (5 demo aliases)
```

The third gate is: after the abrogation lands,
`grep -rlE '@(components|composables|lib|utils|styles)/' --include='*.md'` over
the **14 actionable docs** must return 0 — the 90 historical tranche records
stay untouched (epistemic records of past state, exactly the U.W-CLOSE §12.1
residual-record discipline). F6's "two-gate" is honestly "two gates + a scoped
manual doc sweep."

---

## §6 · Owner-fork records (charter-named, PRESENTED not decided)

Charter-B touches two owner-reserved forks. Per the fences, I present the
empirical state and route to the owner — I do not pre-decide.

- **The `@`-ban idiom** (AGGLOMERATION §3 owner-reserved): eslint
  `no-restricted-imports` (cheap, IDE-native, the tree's incumbent) vs glass-ui's
  mandated `proof:*` "never ESLint" born-RED gate. **The scatter + carve this lane
  RAN need NEITHER to prove correctness** — the two-gate discipline (audit ∧
  oracle) is idiom-agnostic; whichever the owner picks becomes the STANDING
  `@`-ban after the atomic cut, but the leap itself is gated by the codemod's own
  audit, not by the incumbent. **Both cannot stand** (eslint breaks F1's
  never-ESLint law); the owner rules. NOT pre-decided here.
- **The api vocabulary** (§1 fact 2): `routes/service/repository` vs
  `api/model/lib`. Charter-B does not touch api (item scope is D1 demo + D3 src);
  the measured-clean L-boundary evidence stands (F1/F2/F3 all GREEN). Surfaced,
  owner-reserved, untouched by this lane.

## §7 · Honest frictions + residual weaknesses

1. **CC-5's flat predicate splits a cohesive cluster** (item 2, `useColorPipeline`
   ⚠). The manifest surfaces it for human override — which is the design, not a
   bug — but it means CC-5 is a REVIEW INPUT, never an auto-apply authority
   (retro-f3 G3's caution, honored: the human ratifies the manifest).
2. **The scatter's runtime gate is `vite build`, not `playwright smoke`.** Smoke
   is a heavier RUN; the build (resolution + bundle) is a strong runtime proxy and
   the scatter is provably semantics-preserving (node-rename, not edge-rewire), so
   the DI-order class that broke the src carve does not apply. A landing wave
   should still run smoke; I scoped to build for context economy (owner probe-
   parsimony edict).
3. **The color-SCC carve + registry fix are RUN but not landed as a single
   atomic commit here** — this lane PROVES the co-design (carve+registry → suite
   green); the atomic landing is a wave act (the campaign authors, it does not
   land — the COUPLED OWNER EVENT gate).
4. **The manifest covers ONE bucket** (`composables/color/`, the worst offender).
   `composables/palette/` was already run by F3 (pre-sealed); the general demo
   scatter across all buckets is the wave's job. This lane proves the vehicle +
   the predicate + the reviewability artifact on the hardest bucket.

## §8 · Composition read

Charter-B delivers the EXECUTION half of the convergent skeleton: F6's vehicle,
proven on the per-file scatter (not just the rename) AND on a src carve (D3, the
atomic-vs-publish hazard), gated by the audit ∧ oracle ∧ build triad; the
banked-F2 substrate, wired to resolve demo (@-alias+.vue) and VALIDATED against
its own false-positive class; the order-independent registry, the cycle-severance
primitive F3's color capsule was blocked on. The manifest (item 2) is the human
ratification surface that makes the whole thing reviewable. The two owner-forks
are surfaced, not settled.

**Verdict**: Charter-B 5/5 RAN. The vehicle lands the per-file scatter (three
gates), the src carve (four gates), and the color-SCC carve (via the co-designed
registry, `color2` suite GREEN); the substrate is wired + validated; the drift is
re-derived and the third gate quantified. The single most important finding for
the pass-2 agglomerator: **run honestly on the worst-offender bucket, the owner's
colocation edict yields PROMOTE, not feature-capsules (18/0)** — the manifest
proves it before a file moves, and the scatter proves the discipline survives it.
