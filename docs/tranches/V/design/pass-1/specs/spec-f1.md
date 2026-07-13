# V · pass-1 · SPEC — Family 1 · CONSTELLATION-CONFORM

**Pass 1 · SYNTHESIZE · 2026-07-13 · author: pass-1 synthesizer (design authority, this pass).**
Distilled from research `r1.md` (Family 1, measured — ran glass-ui's own backend gate against
value.js/api) + the cross-cutting folds (CC-*) the sibling probes handed off. This spec makes the
family's mechanism CONCRETE for D1–D4 with move budgets from the research; it does NOT rank the
family or pick a winner (that is the critics'/agglomerator's earned outcome).

> **Provenance honesty**: the campaign's fan-out shipped unsubstituted template vars; families
> double/triple-covered (F2, F4) and F5 + a dedicated r7/r8 cross-cut went uncovered. The
> cross-cutting findings below (CC-1..CC-10) are the recurring hand-offs distilled from the family
> artifacts, not a separate r7/r8 file (none exists on disk).

---

## §0 The mechanism (what structure is DERIVED FROM)

An **EXTERNAL RATIFIED CONVENTION**. value.js does not invent a tree — it imports glass-ui's
CODIFIED `STRUCTURE-SPEC.md` (§0–§6 = LAW), ports the applicable subset of the `proof-*` structural
gate battery (G1–G10), and runs the `RESTRUCTURE-FRONTEND` / `RESTRUCTURE-BACKEND` / `LEGACY-EXCISION`
dispatch prompts. Structure = what the constellation already agreed. The charter (§0.2) names this the
ONE mandatory family — the referent every other family states its divergence against.

**The load-bearing split r1 measured**: the SPEC has a **profile-agnostic LAW half (§0–§6)** that
applies to value.js unchanged, and a **UI-specific machinery half** (SFC/scoped-CSS/CVA `variants.ts`/
`store.ts`, §2.1 non-barrel siblings tied to `.vue`, §2.6, G6) that does NOT apply to `src/` (0 `.vue`).

- **Applies unchanged**: Aristotelian proportion (~300 soft / **500 raw-line hard** ceiling; only
  shader-literal + pure-data-manifest exempt), recursive colocation (§0.3), long-dir-breaks-to-modules
  (§0.4), **PURE RE-EXPORT-ONLY barrels + the own-runtime-sibling rule** (§2.1), no `utils/helpers`
  grab-bags, T2 depth (≤5 below feature root; segment-under-segment banned), the **4-node import DAG**
  (§2.5, `subpaths/*` is the exempt publish node), reject-layer-by-type of domain logic (§5.1), **T3
  earned-promotion** (≥2 UNRELATED families), **T4 earned-dir** (2nd artifact of a kind earns the dir).
- **Does NOT apply to src/** (the pure-library divergence, r1 gap c): every SFC/scoped-CSS/CVA clause.

---

## §1 · D1 — demo/ frontend

Kill `@` via glass-ui's proven mechanism (**alias → codemod → pure-relative + a dist-leak-ban gate**).
Divergence r1 names honestly: value.js's `@` is a **PHYSICAL directory** (`demo/@/`) *and* an alias
root, so D1 is a `git mv` flatten **plus** import rewrite — heavier than glass-ui's alias-only drop.

- **Target shape**: glass-ui's 5.0.0-landed demo referent (`App.vue` + `shell/` `chassis/`
  `stories/<cat>/<id>/`). **Honest mismatch**: value.js's demo has **no `main.ts`** (p1: the inline
  `<script type=module>` in `App.vue` is the root) — so the glass-ui demo profile maps *approximately*,
  not 1:1. Adopt the colocation + `shell/chassis` idiom; do not force a `main.ts`/`router.ts` that the
  demo does not have.
- **Move budget** (measured, f6 · CC-7): 351 import sites (`@components` 162 / `@lib` 87 /
  `@composables` 95 / `@utils` 7; **`.vue` 236 / `.ts` 115**), 221 physical file moves, 2 alias-def
  files, 4 test-mirror files. Survey A1's earlier figure was ~321 — cite f6's 351 as the execution count.
- **Apply**: `RESTRUCTURE-FRONTEND` + `proof-colocation-globality` (G1) — **but the globality clause
  needs a semantic family overlay** (CC-5): the gate counts edges, T3 counts UNRELATED families.

## §2 · D2 — api/ backend

**RATIFY, do not restructure.** r1 RAN glass-ui's own `proof-backend-structure.mjs` against value.js/api:
**GREEN — 0 violations**, 2 soft warnings (`palette/service/crud-list.ts` 326 L, `crud.ts` 310 L, both
under the 500 hard ceiling). The `routes/service/repository` boundary produces ZERO structural
violations under glass-ui's gate.

- **The `api/model/lib` vs `routes/service/repository` question is answered by measurement, not
  opinion**: it is a **RATIFIED per-repo VARIANT, NOT "strictly better"** — §5.2 binds each language its
  own idiomatic segment NAMES over a constellation-wide GRAMMAR; §8.8 sets the precedent (glass-ui itself
  keeps the Vue `composables/` essence-name as a recorded FSD divergence). Renaming a measured-clean
  boundary IS the portfolio's named Family-1 failure mode ("damage a clean boundary for a cosmetic vocab
  match"). If conformed anyway, do it as a clean-break rename with the explicit note that its ONLY
  justification is constellation uniformity — not a structural defect.
- **Leverage r1 surfaced**: the SPEC's *future* v2 recursive resolver (`walkDirs` at every level) would
  FALSE-POSITIVE on `modules/palette/service/` (9 by-purpose files read as "9 scattered domains").
  value.js would harden the v2 resolver with a "within-a-domain-package a by-purpose sub-dir holds one
  domain by construction" refinement before G9 promotes constellation-wide.

## §3 · D3 — src/ library

Adopt the 500-line ceiling + PURE-RE-EXPORT barrel + own-runtime-sibling convention; port
`proof-barrel-cycle` (G4-cycle-arm) + `proof-depth` (G3). Parse validation via the born-RED `proof:*`
idiom (the grammar-fuzz gate D3 wants to ADD).

- **The single highest-value alignment target** (survey #4, converges with F2 + F4): carve the
  god-IMPL-files-masquerading-as-barrels — `src/index.ts` (23 own + 36 re, 492 L), `src/parsing/index.ts`
  (644 L, 11 own, 0 re), `src/units/index.ts` (451 L, 5 own) — own runtime → kind-named siblings behind a
  pure barrel. The 7 `subpaths/*` are already pure (the model).
- **Gate applicability (r1 gap a, the shared input for F5)**: of glass-ui's 10 named gates, **4 on-disk
  are directly src-applicable** — `proof-import-boundaries`, `proof-depth`, `proof-barrel-cycle`,
  `proof-backend-structure` (api). `proof-colocation-globality` applies on its globality/T4 clauses.
  The **2 CSS gates (G6) are demo-only** (src has 0 `.vue`). `no-tier-literal` (G7) + `no-glass-in-dist`
  (G10) are **ANALOGS** value.js re-parameterizes as an `@`-alias-literal ban + a "0 `@`/`@src` in
  `dist/*.d.ts`" lock. **`proof:barrel-pure` (G8) is glass-ui's PROPOSED-NOT-ON-DISK gate** — value.js
  authors it (a second leverage vector) and it is the highest-value gate for its god-impl-barrels.
- **CC-1 fold**: `proof-barrel-cycle` MUST run on **runtime edges only** (`import type` erased under
  `verbatimModuleSyntax:true`) — else it fires 23 RED for 2 real SCCs (F2). The `import type` exemption
  is native to glass-ui's own gate and matches value.js exactly.

## §4 · D4 — repo hygiene

Mirror glass-ui's cull template — a mechanical **two-lane census** (r1 gap d) with a DECIDABLE
disposition legend (`delete · migrate · colocate · split · fail-explicit · reshape · keep`):

- **lane-alpha-junk (7 classes → value.js A4)**: 39 root PNGs (~20 MB, untracked) → `delete`;
  `.lighthouseci/` → gitignore+delete; stale worktree `wf_c072f8ee-d1e-3` → prune; `plugins/` (2 files,
  **BOTH live-wired in `vite.config.ts`** — NOT worthless) → verify-wiring then relocate/inline, NOT
  bare delete; `.DS_Store` prune; closed-tranche docs = records → `keep`.
- **lane-beta-legacy (3 tiers)**: Tier-1 illegitimate straddles (the `file:../glass-ui`/`keyframes.js`
  pins are a RATIFIED keep per §3.4, NOT a straddle); Tier-2 structural (doc-coupling gates); **Tier-3
  BEFITTING = KEEP** — the load-bearing lesson (CC-2 sibling): the cull is against overfit CEREMONY +
  dead legacy, NEVER against real correctness fallbacks (glass-ui's census: 565 `fallback` ≈ 99%
  befitting). For value.js's 10-gate `test:dist`: KEEP the 5 Q13 behavioral; the OVERFIT candidates are
  `barrel-parity` + `close-ledger`.
- Port the enforcement idiom: device-free born-RED `proof:*` scripts, **never ESLint** (§0.5.12).

---

## §5 · Gate shapes this family lands

Port the library-applicable set + author the missing gates: `proof-import-boundaries`, `proof-depth`,
`proof-barrel-cycle` (runtime-edge), `proof-backend-structure` (standing, api GREEN), **`proof-barrel-pure`
(AUTHORED)**, the `@`-alias-literal ban + `no-@-in-dist` lock (AUTHORED analogs), `proof-colocation-globality`
(with the CC-5 family overlay). The net gate move is a REPLACE (F5's discipline), not an ADD.

## §6 · What the pass-2 prototype MUST demonstrate (measured, isolated worktree)

1. **Port + RUN the 4 src-applicable gates** against value.js's actual tree; report RED/GREEN with exact
   counts (import-boundaries, depth, barrel-cycle-runtime, backend-structure).
2. **AUTHOR + RUN `proof:barrel-pure`** (glass-ui's proposed gate) → it MUST flag exactly `src/index.ts`,
   `src/parsing/index.ts`, `src/units/index.ts` (assert the 3-file RED set).
3. **The §7 zero-export-churn carve**: in an isolated worktree, carve ONE god-barrel (`units/index.ts`
   → `value-unit.ts`/`function-value.ts`/`value-array.ts`/`types.ts` + pure barrel) → `npm run typecheck`
   exit 0 **and** `node -p` on `package.json.exports` unchanged (8 keys) **and** `proof:barrel-pure` now
   GREEN on that node. Evidence: typecheck exit code + the exports diff (empty).
4. **Author the "TS pure-library" profile stub** (§5.2 new row = backend-TS grammar MINUS the `api/routes`
   app-edge PLUS the `subpaths/` publish surface) — the leverage artifact fed back to the constellation.

## §7 · Honest current weaknesses

- **Convention mis-fit** (the named failure mode): glass-ui is a Vue component library; value.js's `src/`
  is pure-TS with 0 `.vue`. Whole UI-law sections are inapplicable — the family's payload on src is the
  profile-agnostic §0–§6 half only.
- **The api vocab-rename hazard**: conforming `routes/service/repository → api/model/lib` risks damaging a
  measured-clean boundary for a cosmetic match. r1's verdict: ratify the variant.
- **The LEAD hazard (both poles, charter-mandated)**: glass-ui DEFERRED its own src flatten + export-reshape
  to BI/5.1.0 for the **atomic-transaction-vs-publish risk** (an 8-key export-surface reshape can't be both
  atomic and safely published in one cut). value.js adopting the SPEC on src-class surfaces LEADS
  glass-ui's own execution → **LEVERAGE** (proving ground; feeds back the library profile, the on-disk
  `barrel-pure` gate, the hardened v2 resolver) **and HAZARD** (inherits the exact deferred risk; the
  standard is UNPROVEN on a pure-library/src surface). **Mitigation r1 measured**: take glass-ui's own §7
  posture — flatten/carve WITH **zero-public-export churn** (behind the untouched 8-key map) and DEFER any
  export-map de-indirection exactly as glass-ui did. Both poles must be scored when this family is ranked.
- **The eslint-vs-proof idiom tension** (CC-10): F5 asks whether the `@`-ban can be a pure eslint
  `no-restricted-imports` rule; §0.5.12 says "never ESLint." Flagged, unresolved.

## §8 · Composition (facts, NOT a ranking)

F1 answers **WHAT tree** (it IS the alignment family by construction). It composes with an execution
family (F5 strangler or F6 codemod — F6 literally reuses glass-ui's `CODEMOD-SPEC.md`, CC-7) for HOW,
and with F4 for the typed-diagnostics dimension the SPEC is silent on. **Convergence facts** (reached by
independent derivations, reported as facts not verdicts): api is the exemplar across F1/F2/F3 (D2 =
verify-not-restructure); the `units/index.ts` + barrel carve is reached by F1 (§2.1 own-runtime-sibling),
F2 (cycle spine), and F4 (type-lattice value-model split) — the same node; the src color-SCC carve F2
derives (redirect 11 `from ".."` → `from "../spaces"` + move `ch`) IS glass-ui §2.1 by construction.
