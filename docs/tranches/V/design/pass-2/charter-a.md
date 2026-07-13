# V · pass-2 · CHARTER A — the WHAT-tree (F1 ∘ F3, fused) — LEAD

**Lane**: charter-a (`wf_1112d3db-442-3`) · **Date**: 2026-07-13 · **Mode**: **RAN** (4 of the 6 items carry
first-hand RUN evidence; 2 are decision-records/audits that consume RAN inputs). **Prototype worktree HEAD**
`9423094` (tranche-u HEAD; fast-forwarded from the pass-1 proto era `6abef80` — a real +1 in referent
currency, see §1 drift note). **Referent**: glass-ui `5.0.0` (pinned, symlinked, `./goo-blob` absent →
`./blob` present). Every number below carries its command; the census + codemod scripts live at `_proto/*.mjs`
in the isolated worktree (**NOT merged — evidence only**).

> **What this lane converts.** Pass-1's F1 (CONSTELLATION-CONFORM, 45%) and F3 (FEATURE-CAPSULE, retro'd to
> 40%) were the two halves of the WHAT-tree, both docked for the SAME hole: the owner's PRIMARY surface (D1,
> the general demo colocation) was **un-run** by every family except F3's best-case sealed `palette` bucket,
> and the retro-f3 critic **predicted** that running the CC-5 predicate on the real worst-offender bucket
> would REFUTE the "dissolves into the color-picker feature" map. **This lane runs it.** The prediction is
> confirmed by a running instrument, and — the material advance over pass-1 — the retro-f3 G4 "no green gate,
> RED baseline, no smoke" blocker is **dissolved at current HEAD**: the demo now typechecks + builds + smokes
> GREEN, so the move is validated against a real green baseline with runtime provide/inject observation.

---

## Verdict up front

| # | Charter-A item | Mode | Headline result |
|---|---|---|---|
| 1 | general demo colocation (`composables/color/`) | **RAN** | move-map emitted + **RUN**: 18 moved, bucket **dissolved to empty**, **typecheck exit 0** (GREEN→GREEN, Δ0), build 0, **smoke 2/2 zero-console**; **36 external consumers** touched. **17/18 PROMOTE, 1 colocates** — the spec's "15→color-picker" is REFUTED by the consumer set. |
| 2 | the demo kernel, ratified | **RAN (census)** | 5-member kernel table with per-file resolved consumer counts; CC-5 independently **confirms** keys/useContrastSafeColor/ink as genuine cross-feature; usePaletteManager/useViewManager measured. |
| 3 | the clean-break assertion (atomic, no alias window) | **DECISION-RECORD** (backed by the item-1 RUN) | value.js's `@`-abrogation is ASSERTED **ATOMIC**; the item-1 codemod IS an atomic cut (git mv + rewrite, one pass, no alias window) — RAN proof the mechanism needs no transitional `@`. |
| 4 | the api owner-fork, surfaced NOT settled | **RAN** | value.js api passes **glass-ui's OWN `proof-backend-structure` gate GREEN** (0 violations, exit 0, self-test 9/9) + 0 route→repo + 5 capsules. Both poles held; owner rules. |
| 5 | the referent-stability audit | **RAN (doc recovery)** | divergences **#4-5 recovered** from READ-ONLY glass-ui BH (CVA-un-mix supersession + the enforcement-battery reshape); F1 exposure stated; STRUCTURE-SPEC round-6 movement **confirmed on disk** (6 rounds; the spec is a 3-day-old round-6 artifact). |
| 6 | the src DOMAIN-capsule set, ratified | **RAN (verify)** | domain-not-feature ratified; 6 capsules over 8 orthogonal export keys; `proof:subpath-budget` **11/11 GREEN** on current tree (the floor F3's merge preserves). |

---

## §1 — THE GENERAL DEMO COLOCATION — RAN (the lead deliverable)

**The bucket, measured at HEAD.** `demo/@/composables/color/` = **18** `.ts` files
(`ls demo/@/composables/color/*.ts | wc -l` = 18). This corrects a pass-1 drift the charter inherited: at the
proto era `6abef80` the bucket was **16** files; `generate-color.ts` + `view-accent.ts` (467 lines) landed
between `6abef80` and tranche-u HEAD `9423094`. **I fast-forwarded the isolated worktree to `9423094`** so the
move-map is authoritative against the tree the charter names, not the stale proto tree.

### 1.1 The CC-5 predicate, as a committed instrument (closes retro-f3 G3)

The retro-f3 critic docked F3 because CC-5 lived in "throwaway scripts … NOT merged … cannot be re-run by
anyone." This lane builds it as a real resolver: `_proto/census.mjs` resolves EVERY `import/export … from`
across `demo/**/*.{ts,vue}` through the tsconfig/vite alias table (`@composables`→`demo/@/composables`, etc.)
+ relative paths + `index.ts` dir-resolution, builds the reverse consumer index, and classifies each consumer
by feature-root. **CC-5 verdict** (AGGLOMERATION §1 fact 4, made decidable): a file's non-bucket consumers
either all share ONE feature-root (→ colocate into it) or span ≥2 feature-roots / include a demo-root-level
(app-root, shared) consumer (→ promote). One refinement the RUN forced: **private helpers (0 external
consumers, imported only by one bucket sibling) transitively FOLLOW their parent** — else the move manufactures
a cross-directory edge (`ink-walk` → `ink`, not stranded).

### 1.2 The per-file move-map (RUN: `node _proto/census.mjs`)

| file | resolved consumers | feature-roots | CC-5 verdict | destination |
|---|---|---|---|---|
| `keys.ts` | 26 | color-picker, dock, image-palette, markdown, palette-browser, panes (**6**) + app-root | **PROMOTE→kernel** | `demo/@/composables/` |
| `useContrastSafeColor.ts` | 11 | color-picker, dock, gradient, image-palette, markdown, palette-browser (**6**) | **PROMOTE→kernel** | `demo/@/composables/` |
| `ink.ts` | 6 | color-picker, image-palette, markdown (**3**) | **PROMOTE→kernel** | `demo/@/composables/` |
| `ink-walk.ts` | 1 | (private of `ink`) | **FOLLOW→kernel** | `demo/@/composables/` |
| `aurora-atoms.ts` | 2 | panes (feature) + app-root boot | **PROMOTE→kernel** (cross-boundary) | `demo/@/composables/` |
| `generate-color.ts` | 3 | generate (**1**, both externals) | **COLOCATE→feature** | `custom/generate/composables/` |
| `useColorPipeline.ts` | 2 | App.vue (app-root) + keys(sibling) | **PROMOTE→app-cluster** | `demo/color-picker/composables/color/` |
| `valueDomain`,`useColorParsing`,`useSliderGradients`,`useColorNameResolution`,`useColorPersistence`,`useAtmosphereFrameCoalesce` | 1 each | (privates of the pipeline) | **FOLLOW→app-cluster** | `demo/color-picker/composables/color/` |
| `normalizedColorNames.ts` | 2 | (private of 2 app-cluster sibs) | **FOLLOW→app-cluster** | `demo/color-picker/composables/color/` |
| `useColorUrl`,`useCustomColorNames`,`palettes-ramp`,`view-accent` | 1–3 | App.vue / boot only (app-root) | **PROMOTE→app-cluster** | `demo/color-picker/composables/color/` |

**Partition: 5 kernel · 1 feature · 12 app-cluster = 18.**

### 1.3 The refutation (closes retro-f3 G2 by a running instrument)

The spec (F3 §1) asserts the 18-file bucket "**dissolves cleanly: the other 15 are single-consumer →
color-picker capsule.**" **The consumer set refutes it on the pattern, not just the flagship:**

- **Exactly ONE of 18** files (`generate-color.ts`) has all-non-bucket-consumers in a single feature and truly
  colocates. **17 of 18 PROMOTE.**
- **ZERO** of the promoted files are consumed by the `color-picker` FEATURE component tree
  (`components/custom/color-picker/`). The spec's named exemplar `useColorPipeline.ts` (373 LoC) resolves to
  `{ demo/color-picker/App.vue (the app composition root), keys (sibling) }` — nearest common feature-root =
  **the demo root** → CC-5 says **promote**, the spec says "→ color-picker feature." The predicate the fold
  trusts and the placement the spec ships disagree, and the predicate is right: the bucket is an **app-root
  pipeline cluster with heavy intra-coupling** (the `useColorPipeline` spine `import`s 6 of its own siblings
  via `./`), not 15 independent leaves.
- The demo `CLAUDE.md` **compounds** the gap: it lists `useColorParsing`/`useSliderGradients`/
  `useColorNameResolution`/`useColorUrl`/`useCustomColorNames` as living in `custom/color-picker/composables/`
  — but the tree has them in the global `composables/color/` bucket (that feature dir holds only
  `usePointerDebug.ts` + `useHeaderCondense.ts`). The doc already ASSERTS a colocation the tree never executed;
  the CC-5 RUN shows even that assertion points at the wrong home (app-root, not the color-picker feature).

### 1.4 The RUN (RAN — `node _proto/move.mjs`)

Codemod computes every rewrite against the pre-move tree, then `git mv`s, then writes — the ordering the F3
proto's own "co-moved set" goblin (proto §Honest-frictions-1) demands. Result:

```
moved: 18 files          (git-mv, all 18 render as renames — git log --follow survives)
rewrite: 41 files, 62 import sites
EXTERNAL consumers touched (non-moved): 36
git diff --shortstat: 54 files changed, 62 insertions(+), 62 deletions(-)
```

**Typecheck (the number the retro-f3 G4 said was against a RED baseline):**

- `npx vue-tsc -p tsconfig.demo.json --noEmit` **BEFORE** the move → **exit 0, 0 errors.** The pass-1
  "12 `@mkbabb/glass-ui/goo-blob` module-resolution errors" baseline is **FIXED at current HEAD** (the demo no
  longer imports the absent `./goo-blob`). The move is validated against a **real GREEN baseline.**
- `npx vue-tsc -p tsconfig.demo.json --noEmit` **AFTER** the move → **exit 0, 0 errors. Δ = 0.**

**Build + runtime (the observation pass-1 could not make):**

- `npm run gh-pages` (the full demo vite/rolldown build, resolving the entire module graph incl. every
  provide/inject key import) → **✓ built, exit 0** (the `@vueuse/core` `#__PURE__` annotation warnings are
  pre-existing vendor noise, unrelated to the move).
- `VJS_E2E_PORT=8097 npx playwright test --project=smoke page-load.spec.ts color-space-switching.spec.ts` →
  **2 passed, exit 0.** `page-load` asserts "shell landmarks and **zero console errors**"; `color-space-switching`
  exercises the `COLOR_MODEL_KEY` provide/inject pipeline at runtime.

### 1.5 provide/inject/setup-order — SURVIVES (observed)

Answered three ways, strongest first: (a) **smoke green with zero console errors** — the app boots, all
`inject()` calls resolve at runtime; (b) **build green** — the module graph resolves, no dangling key import;
(c) **structural** — `keys.ts` (the injection-key hub) is a pure Symbol/type module (its only cross-file
imports are `import type`), so the `COLOR_MODEL_KEY`/`CSS_COLOR_KEY`/… Symbol identities are one-module-instance
and location-independent, and the app-cluster moved as a UNIT (its intra-`./` edges intact) so no module-eval
order changed. This is the demo analogue of the src `XYZ_FUNCTIONS` init-order lesson (critique-f2 G1) — and
here it is **observed clean**, not asserted.

### 1.6 Honest frictions (the goblins this RUN surfaced)

1. **The kernel→app-root type inversion (a real structural signal).** `keys.ts` promotes to the kernel by its
   26 consumers, but it `import type { UseColorPipelineReturn }`s the app-cluster spine — after the move that
   edge is `import type … from "../../color-picker/composables/color/useColorPipeline"` (kernel reaching DOWN
   into the app-root, cross-tree). It **compiles** (type-only, runtime-erased) and smokes clean, but it is a
   smell: the shared injection-key hub is type-bound to the app-private pipeline. **The honest reading**: keys
   is genuinely cross-feature (21 files inject `COLOR_MODEL_KEY`), so the resolution is not "keep keys in the
   app-cluster" but "the pipeline's RETURN-TYPE wants a shared home" — a follow-refactor, out of this move's
   scope, flagged not faked.
2. **`demo/color-picker/composables/` has NO alias.** App.vue/boot reach the global bucket via
   `@composables/color/X` but reach app-root-local files via `./composables/…` relative. So the 12 app-cluster
   files land as relative imports. If this app-root home is ratified as a standing tier, it earns an alias
   (`@app-composables`?) — an owner call, noted not taken.
3. **"app-cluster" is a THIRD tier the spec's binary (kernel | feature) omits.** The bucket does not split into
   "shared kernel" + "feature capsules"; it splits into **kernel (5) + feature (1) + an app-root pipeline
   cluster (12)** — the `demo/color-picker/composables/` home the retro-f3 critic named ("App.vue already owns
   a `composables/` dir"). This is closer to F2's graph/global answer than to F3's feature-capsule answer, and
   it is the honest structure of THIS bucket.

---

## §2 — THE DEMO KERNEL, RATIFIED — RAN (census)

The tiny `composables/` kernel — the files that PROMOTE because they serve ≥2 unrelated features; everything
else colocates (proven by the §1 RUN, which dissolved the bucket). Consumer counts are resolved + deduped by
`_proto/census.mjs` (color-bucket members) and by specifier grep (the two non-bucket members), each with its
command.

| kernel member | home | resolved importer sites | feature-root spread | CC-5 kernel? |
|---|---|---|---|---|
| `keys.ts` | `composables/color/` → **`composables/`** | **26** (25 ext + 1 sib) | **6** features + app-root; 21 inject `PALETTE`-class keys | **YES** (spans 6) |
| `useContrastSafeColor.ts` | `composables/color/` → **`composables/`** | **11** | **6** features | **YES** (spans 6) |
| `ink.ts` (+`ink-walk` private) | `composables/color/` → **`composables/`** | **6** | **3** features | **YES** (spans 3) |
| `usePaletteManager.ts` | `composables/palette/` (**stays**) | **22** importer files | @app + color-picker, dock, gradient, mix, palette-browser, panes (**6**) | **YES** (the DI hub; 21 `PALETTE_MANAGER_KEY` sites) |
| `useViewManager.ts` | `composables/` (**stays**) | **8** importer files | ≥3; 4 `VIEW_MANAGER_KEY` sites | **YES** |

- Commands: `node _proto/census.mjs` (keys/useContrastSafeColor/ink); `grep -rl "composables/palette/usePaletteManager" demo | wc -l` = 22; `grep -rl "composables/useViewManager" demo | wc -l` = 8; `grep -rl PALETTE_MANAGER_KEY demo | wc -l` = 21; `grep -rl VIEW_MANAGER_KEY demo | wc -l` = 4.
- **The 6th, borderline, honestly labelled**: `aurora-atoms.ts` (69 L, a data/atoms module, 2 consumers across
  a feature + app-root) is cross-boundary by CC-5 but is not a composable and not "kernel material." It rode
  into the kernel dir in the §1 RUN as the minimal cross-boundary promote; the owner may prefer it in the
  app-cluster with a `@composables` re-export. This is exactly the "5–6" fuzz the charter names.
- **Independent agreement**: the retro-f3 critic reached the same kernel set by a different method
  (import-line areas: keys→7, useContrastSafeColor→6, ink→3, useViewManager→3). CC-5 (resolved consumer sets)
  and the areas-count agree — the kernel is small and earned. **Everything not in this table colocates**, which
  the §1 RUN executed end-to-end (bucket → empty).

---

## §3 — THE CLEAN-BREAK ASSERTION — DECISION-RECORD (backed by the item-1 RUN)

**The tension (critique-f1 G3).** The owner's verbatim law: "**NO legacy code. Clean breaks: no aliases, no
migration shims, no dual paths, no masking fallbacks.**" F1's borrowed D1 mechanism is glass-ui's
"**alias → codemod → pure-relative** + a dist-leak-ban gate" — and glass-ui's `@glass` was, on disk (portfolio
§A5, verified), a **TRANSITIONAL** alias (the B2.0 codemod, 719 rewrites) that CO-EXISTED with pure-relative
during the rewrite window before being superseded. A transitional alias IS a dual path. Left unstated, F1
imports the exact thing the owner forbids.

**THE DECISION — ASSERTED ATOMIC for value.js. No transitional `@`-alias window.**

1. **value.js's `@` abrogation is HEAVIER than glass-ui's, and that heaviness is what makes atomic clean.**
   glass-ui's `@glass` was an alias-ONLY construct — abrogation there was alias-removal + a codemod, so a
   transitional window was a natural (if rejected) option. value.js's `@` is BOTH a physical directory
   (`demo/@/`) AND an alias root. Abrogation is therefore a physical `git mv` + an import rewrite in ONE
   surface — there is no "alias still resolves while files move" intermediate state to tolerate, because the
   files themselves move. **The atomic cut is not a discipline imposed on value.js; it is the shape of
   value.js's problem.**
2. **The mechanism is F6's `git mv` + rewrite in one commit — and THIS LANE RAN IT.** §1's `_proto/move.mjs`
   is precisely an atomic cut: 18 `git mv`s + 62 import-site rewrites computed against the pre-move tree and
   applied in one pass, **no `@composables/color/*` alias left resolving to anything** (the bucket is empty
   post-move; `ls demo/@/composables/color/` returns nothing). Typecheck 0 + build 0 + smoke 2/2 prove an
   atomic cut lands green with **zero transitional window**. The clean-break law is not merely assertable for
   value.js — it is **demonstrated executable** at the 18-file scale.
3. **glass-ui's leak-ban gate (G10 `proof:no-glass-in-dist`) transposes as a POST-cut invariant, not a
   during-cut crutch.** Because value.js goes straight to pure-relative/alias-final with no transitional
   `@`-window, the analogue gate asserts the END state (no abrogated `@`-alias survives in source or dist),
   never polices a tolerated straddle. This is the clean-break-compatible reading: a gate that proves the cut
   COMPLETED, not one that manages a dual-path transient.

**Reconciliation, one line**: glass-ui's transitional-alias step is a mechanism value.js **does not replay** —
it was an alias-only repo's convenience; value.js's physical-`@` cut is atomic by construction, RAN-proven
green, and the leak-ban gate rides as a completion invariant. **No transitional window. No dual path. The
owner's law holds.**

---

## §4 — THE API OWNER-FORK — SURFACED, NOT SETTLED — RAN

**The measured evidence (first-hand, this lane).**

- **value.js's api passes glass-ui's OWN backend gate GREEN.** Ran the unmodified
  `glass-ui/.../BH/spec-structure/proto-gates/proof-backend-structure.mjs` against `value.js/api`:
  ```
  language: typescript   source-root: src
  VIOLATIONS (0)
  WARNINGS (2): crud-list.ts 326 L, crud.ts 310 L  (> 300 soft, < 500 hard)
  → GREEN (0 violations, 2 warnings)   exit 0
  --self-test → 9/9 bites passing
  ```
- **The boundary is domain-vertical, not layer-scatter.** `api/src/modules/` = **5 vertical capsules**
  (`admin color meta palette session`); `grep -rnE "from ['\"].*repositor" api/src/modules/*/routes/` = **0**
  real route→repository edges. This is why the gate passes: §5.1 only born-REDs a
  "routes/services/repositories scatter **of DOMAIN LOGIC**," and value.js's `routes/service/repository` are
  **by-purpose segments WITHIN each domain vertical** — the grammar is satisfied. value.js already conforms to
  glass-ui's backend GRAMMAR; only the segment VOCABULARY differs.

**The fork (held for the owner — NOT pre-decided).**

- **POLE A — CONFORM for constellation uniformity.** Rename `routes/service/repository` → glass-ui's §5.1
  by-purpose `api/model/lib`. Rationale: the owner's edict "similar treatment … to all backend files" may mean
  one segment vocabulary across the whole constellation. Cost: a mechanical rename of a measured-clean
  boundary; benefit: constellation-wide uniformity.
- **POLE B — RATIFY the measured-clean variant.** §5.2 explicitly binds each language "its own idiomatic
  segment names over a shared grammar." value.js's `routes/service/repository` is a per-language idiomatic
  variant that already passes the gate; ratify it as-is. Rationale: the grammar (not the vocabulary) is the
  law, and value.js satisfies it. Cost: two segment names diverge from glass-ui; benefit: no churn on a
  boundary that is already GREEN.

**F1 measured the answer as POLE B (§5.2 per-language variant). This lane does NOT ratify that** — it presents
both poles with the gate-GREEN fact and routes the choice OUT. The convergence of D2 is **conditional on the
owner ruling uniformity vs clean-boundary-preservation** (critique-f1 G9 / critique-f2 G7).

---

## §5 — THE REFERENT-STABILITY AUDIT — RAN (doc recovery, READ-ONLY glass-ui BH)

**Framing correction (a finding in itself).** The portfolio §A5.1 asserts "**5 documented** plan-vs-execution
divergences" and defers #4-5 to "the survey sub-agent's transcript." Recovering them against disk shows BH has
**no single canonical divergence ledger** — the "5" is a survey artifact; the divergence CLASS is documented
scattered across the round-verdicts + PLAN. That absence is itself evidence for the audit's thesis: **the
referent is not a fixed enumerated law.** The two strongest additional plan-vs-execution divergences, recovered
with citations:

- **Divergence #4 — the CVA-co-export convention was SUPERSEDED, and the un-mix scope was UNDER-planned.**
  (`glass-ui/…/BH/spec-structure/ROUND-4-VERDICT.md`.) *Plan side*: glass-ui's CLAUDE.md documented "CVA
  variants are co-exported from each component's `index.ts`" as a standing convention. *Execution side*:
  Precondition B (barrels PURE RE-EXPORT-ONLY) forbids it constellation-wide, so `proof:barrel-pure` born-REDs
  on **8** glass-ui barrels — but the §4P.13 un-mix table listed only **4**. An implementer flattening without
  un-mixing all 8 leaves the gate RED at the 5.0.0 cut. FOLD: the convention was clean-broken (edict 7) and the
  execution scope corrected mid-round from 4 to 8.
- **Divergence #5 — the enforcement battery's own shape changed in execution.** (`BH/PLAN.md` §4.0 row 12 +
  §B5 + `audit/B5e-gate-prune-note.md`.) A ceremony-gate cull band **B5e was ADDED** to the plan (drop the
  `--list` gate count after a byte-identical checkpoint), and **B5d-detector-kit was DEFERRED past BH**
  (164-script blast radius). The battery grew a prune and shed a detector-kit relative to the original band set
  — the enforcement layer was not a fixed plan either. (A third recovered item, noted: the 5.0.0 published
  break DROPS `./api` + re-homes 203 symbols + renames `goo-blob → blob`, `BH/PLAN.md` §7 — the export-surface
  reshape decision.)

**F1's exposure to each (stated).**

- **To #4**: value.js has no CVA (pure-TS lib, no components), so the specific convention doesn't transpose —
  but the CLASS (a documented co-export convention superseded by the pure-barrel law, with an UNDER-counted
  RED set) is **exactly F1's own hazard**: F1's spec hardcoded the barrel-pure RED set as
  `{src/index.ts, parsing, units}`, which AGGLOMERATION §4 proved **stale** (real set `{parsing, units,
  quantize}`; `src/index.ts` is PURE). F1 is exposed to the identical undercount-the-scope failure glass-ui hit
  — and it is **already mitigated** by the AGGLOMERATION ruling: the gate is a runtime-purity property,
  gate-derived per run, never a hardcoded membership set.
- **To #5**: value.js's analogue is the F5 enforcement battery. glass-ui's B5e prune is the SAME move value.js
  owes — cull ceremony gates to the ratified floor. F1/F5 are exposed to *entrenching* a re-grown battery
  (AGGLOMERATION §4: `test:dist` re-grew to 10; the Q13 floor is 5; the owner-aligned arithmetic is 10 → 7,
  DROP the META-gate). The glass-ui divergence is the constellation precedent that this prune is correct, not
  overfit.

**STRUCTURE-SPEC round-6 movement — CONFIRMED on disk (critique-f1 G4).** `BH/spec-structure/` holds
`ROUND-1-SPEC … ROUND-6-SPEC` + verdicts; `STRUCTURE-SPEC.md` (143 KB) is the **round-6 output, dated
2026-07-10** — three days before this campaign. The spec MOVED at every round: round-2 booked the FSD
`composables/` essence-name divergence; round-4 FOLDED the CVA supersession (#4); **round-6 OVERRODE the
round-≤5 "keep `ui/`+`custom/` split" → the pure-flat 91-peer namespace**; the round-6 VERDICT still logged an
open completeness gap (the basename-keyed `critical-partition.mjs` census). **F1 imports this as a fixed law;
it is a 3-day-old round-6 artifact whose own plan was unstable as recently as round-6.** The audit's verdict:
F1's src-class payload should treat the STRUCTURE-SPEC as a *converged-but-recently-moved standard*, not an
ancient referent — and value.js aligns to the **SPEC**, not to a glass-ui TREE (the src flatten is glass-ui's
own DEFERRED #1 divergence, riding their BI/5.1.0, un-landed).

---

## §6 — THE SRC DOMAIN-CAPSULE SET, RATIFIED — RAN (verify)

**Ratifies F3's honest correction (retro-f3 G5): for src the atom is the DOMAIN, not the feature.** "Feature
capsule with one barrel" dissolves for src (the parse-that publish seam gives `units/color` two publish
surfaces); the surviving, correct framing is domain capsules whose PLACEMENT is orthogonal to the PUBLISH map.

**The domain-capsule set (verified at HEAD, `ls -d src/*/` + `src/*.ts`):**

| domain capsule | current home | note |
|---|---|---|
| **color** (merged) | `units/color/` + `parsing/color/` (**split today**) | F3's RAN merge collapses the split (`parsing/color → units/color/parse`), killing **11→0** cross-boundary edges; inherits the pre-existing 17-file barrel SCC (cycle severance is F2's registry, NOT this capsule's). |
| **parsing** (non-color grammar) | `src/parsing/` | 6 core files + timeline/ + stylesheet/ clusters |
| **units** | `src/units/` | value-model; the `units/index.ts` own-runtime carve is the shared-spine node |
| **transform** | `src/transform/` | decompose + path |
| **quantize** | `src/quantize/` | OKLab-native |
| **math + easing** | `src/math.ts`, `src/easing.ts` (+ `utils.ts`) | the top-level KERNEL (leaf files, no dir) |

**The orthogonal publish surface (directory ≠ export map — glass-ui §0.5.8, F3's load-bearing proof):**

- **8 export keys** (`package.json` `exports`): `.`, `./color`, `./parsing`, `./math`, `./easing`,
  `./transform`, `./units`, `./quantize` — served by **7 barrel files** in `src/subpaths/` (a directory that
  maps to NO domain; it is purely the publish projection).
- **`proof:subpath-budget` = 11/11 GREEN on the current tree** (`npm run build && npm run proof:subpath-budget`).
  The load-bearing clauses: **C1** — the `./color` bundle graph contains **ZERO** `src/parsing/` modules (real
  esbuild trace); **C5** — the `./parsing` graph DOES pull them (deliberate). The same directory-domain (color)
  feeds a parse-that-FREE `./color` key AND coexists with the grammar — **location and publish-surface are
  orthogonal, proven by a running gate.**
- **F3's merged-tree result (RAN, cited)**: after `git mv parsing/color → units/color/parse`, `proof:subpath-budget`
  stays **11/11 GREEN** and the esbuild trace shows the `/color` barrel pulls 0 modules from the
  physically-colocated grammar — the merge preserves the exact 8-key publish surface. **The directory merges;
  the export map does not move.** (The actual re-RUN of the merge on HEAD is Charter B's `units/index.ts`-class
  carve item — deferred there, not re-run here; this lane verified the floor + cites F3's RAN merge.)

**Ratified**: the WHAT-tree for src is these 6 domain capsules over the untouched 8-key exports map. "Domain,
not feature" is the honest atom; `subpaths/` is the orthogonal projection, not a capsule.

---

## Owner-reserved forks (routed OUT — presented, not pre-decided)

- **§4 — the api vocabulary**: `routes/service/repository` (measured-clean per-language variant, gate GREEN)
  vs conform to `api/model/lib` (constellation uniformity). Both poles held; the owner rules.
- **The `@`-ban idiom** (routed by the fold, restated for the owner): eslint `no-restricted-imports` (the
  tree's incumbent, IDE-integrated) vs glass-ui's mandated `proof:*` "never ESLint" (§0.5.12). **Both cannot
  stand** — ratifying eslint breaks F1's imported "never ESLint" law; ratifying `proof:*` displaces the
  incumbent. This lane's §3 clean-break cut is idiom-agnostic (the atomic `git mv` needs neither); the choice
  is the owner's.
- **The COUPLED OWNER EVENT** (from MEMORY): U-ratify + T-close as ONE. This campaign authors; it does not
  land. §1–§6 are docs-and-prototype-scoped; nothing here merges.

---

## Reproduce (all scripts in `_proto/`, isolated worktree, NOT merged)

```
# item 1 — the census + the scatter
node _proto/census.mjs                 # CC-5 per-file move-map (18 files)
node _proto/move.mjs                    # git mv 18 + rewrite 62 sites (36 external consumers)
npx vue-tsc -p tsconfig.demo.json --noEmit   # exit 0 before AND after (Δ0, GREEN baseline)
npm run gh-pages                        # demo build → exit 0
VJS_E2E_PORT=8097 npx playwright test --project=smoke \
  e2e/smoke/page-load.spec.ts e2e/smoke/color-space-switching.spec.ts   # 2 passed
git reset --hard HEAD                   # evidence-only; nothing lands

# item 4 — the api boundary under glass-ui's own gate
node <glass-ui>/…/BH/spec-structure/proto-gates/proof-backend-structure.mjs --self-test   # 9/9
node <glass-ui>/…/BH/spec-structure/proto-gates/proof-backend-structure.mjs "$(pwd)/api"  # GREEN, exit 0

# item 6 — the orthogonal publish floor
npm run build && npm run proof:subpath-budget    # 11/11 GREEN
```

**Prototype worktree HEAD `9423094`; referent glass-ui `5.0.0` (pinned). No prototype merges — evidence only.**
