# T.W1 — THE COLOCATION GRAND RESTRUCTURE (E-1: three single-writer lanes, disjoint trees)

**Name**: W1 — The colocation grand restructure (the E-1 grand edict executed whole; the
structural spine of T)
**Opens after**: T.W0 (round 1). Sequenced BEFORE every design wave per **Q1's default** —
new design code is BORN colocated; the restructure is mechanical + hard-gated and depends on NO
producer window; landing it last would move every design wave's freshly-landed files a second
time. Q1's live alternative (restructure AFTER) is preserved in the ratification table; a Q1
overrule re-sequences this wave, it does not change its content.
**Spec of record**: `audit/SYNTHESIS.md §3` T.W1 lane table (W1-demo · W1-api · W1-src) · **§5
THE COLOCATION PROGRAM** (§5.1 demo · §5.2 api · §5.3 src incl. the FORBIDS ledger · §5.4 the
E-1 totality proof) · Q8/Q15/Q17 outcomes from `T.md §12` · O-23 (§6.1) · MOB-1/MOB-2 +
LEG-move cargo (§1.2 fleet table).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the
T.md charter clause, restated here so the rule is self-evident in-file); above both,
`MANDATE-2026-07-06.md §0` + addenda are VERBATIM LAW — E-1 is the owner's grand edict verbatim.
**Agents**: **3 single-writer lanes, disjoint trees** (demo ∥ api ∥ src — the §3.2 single-writer
law; E-6 batch bound respected by construction). Intra-lane orders are BINDING (§Lane orders).
**Scale** [AMENDED-AT-HARDENING — M-32/h-exec-budget F1]: this wave compresses **~199 demo files
(146 components + 29 composables + 24 lib) + the src/api trees** through single continuous
writers — the fattest file-scope in the DAG after W8; expect session walls (the §Recovery W1
delta is load-bearing, not theoretical); the S actual/nominal ~1.5-2× agent multiplier is a
floor, not a ceiling.
**Hard gate**: composite (§Hard gate) — MOVE-MAP committed · suites + e2e green · O-23
bundle-diff flat ±2% per named chunk · PP-8 caps recomputed post-move · ZERO re-export shims at
old paths · MOB-1 witness + MOB-2 gates · api 224-class suite green post-TA-4 + tsc 0 · dts
surface additive-only (the §5.3 FORBIDS ledger) · subpath invariant green.
**Status**: PENDING — DEVELOPMENT ONLY; waves dispatch only post-ratification (E-6).

---

## §Goal criterion

The E-1 end-state landed whole; the cohesion cargo rides. (SYNTHESIS §3 T.W1 Goal, verbatim.)

## §Completion criterion

MOVE-MAP committed; suites green; O-23 bundle-diff flat ±2%; PP-8 caps recomputed; zero
re-export shims at old paths. (SYNTHESIS §3 T.W1 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3 T.W1 lane table, transcribed verbatim — gates intact)

| Lane | Content | Gate |
|---|---|---|
| W1-demo | §5.1: Beat-A leaf moves + twin unifications → palette-browser decomposition behind hardened barrels → color-domain unification (keys ~24 sites, atomic codemod, LAST) → app-shell home (`app/composables/boot/`) → per-feature recursion. **Cohesion cargo**: dup-`useDark` fold onto `useGlobalDark`; PI-DRIFT-1 + the 10-site `out-in` audit (+ the pi-w5b hard-fail rider); **MOB-1 stamped witness** (`data-layout`, the style.css:435 exception dies); **MOB-2 route-derived pane index** | suites + e2e green; O-23; witness gate (both panes reachable at 1024×1366) |
| W1-api | §5.2: modules/+platform transposition (move-only; L laws verbatim per t-coloc-backend §3); **TA-4 excision inside the move** (routes `/remix`+`/diff` + `computePaletteDiff` + `remixPaletteBody` + meta rows + fork↔remix fold + `PaletteVersion.atomDiff` + `lib/crud/atomdiff.ts`; KEEP `computeAtomSetHash`); models.ts carve; scripts/ regroup (deploy/dev/ci/gates) — **the regroup RE-POINTS `test:dist`'s script paths (or the retained-5 are exempt from the move): the W0-2 deliverable must survive W1** [AMENDED-AT-HARDENING — h-exec-w0 S2] | api 224-class suite green post-excision (diff tests deleted, fork coverage re-homed); tsc 0; **Q8/Q17** |
| W1-src | §5.3: (1) the **demo-dogfood keystone** — repoint demo off `@src/*` deep paths onto the public subpaths; the **7** leaked conversion primitives get citizenship (**Q15** [AMENDED-AT-HARDENING — the census corrected 5→7: + `getColorSpaceBound` (5 sites) + `oklabToLinearSRGBInto` (2 hot-paint sites); the count is regenerable]); (2) test/ mirror; (3) `parsing/{color,timeline,stylesheet}/` + `color/gamut/` + constants split (name-preserving at every barrel — §5.3 semver-free); (4) the hue-swept boundary sampler (T-21's src half, beside `sampleOKLChSliceBoundary`, with Into twin); (5) the **Normalized/Display brand decision (L1)** — S's "W2-3" book renamed, T's W2-3 is the OVERTURE (boolean-literal-param + conditional-return-type across ~58 callsites), sequenced last | the parse-that-free subpath invariant green via **`test:dist`'s 5th gate (the W0-2-reclassified `subpath-budget` bundle-trace — its asserted home** [AMENDED-AT-HARDENING — M-16]**)**; dts surface **additive-only**: no removal/rename of any existing exported symbol (the §5.3 FORBIDS ledger); Q15 promotions are expected semver-MINOR additions [AMENDED-AT-PASS-2 — "byte-stable" contradicted Q15's own default]; vitest green |

### §The program spec (SYNTHESIS §5, the binding digests — the full target shapes live there)

- **§5.1 demo target**: `app/` (shell home; `composables/boot/` = useAtmosphereBoot +
  useAtmosphere + useViewAccents + view-accents — the EXACT subsystem W2 edits, made legible) ·
  `palette/` ONE domain (dissolves composables/palette + lib/palette) · `color/` ONE domain
  (model/paint/composables + keys.ts F3 + aurora-atoms F6) · `view/`·`auth/`·`common/` ·
  `components/custom/` per-feature recursion (SpectrumCanvas/, ComponentSliders/,
  ColorComponentDisplay/, palette-browser/{card,admin,search,dialog,slug,status}, …) ·
  `styles/` UNCHANGED (D.W4-disciplined). Exemplars generalized: `ImageEyedropper/`,
  `PaletteDialog/`. `EmptyState` + the picker action controls = glass-ui-first CANDIDATES
  flagged to the packet lane (Q16), not resolved here.
- **§5.2 api target**: `modules/{palette,color,session,admin,meta}` over
  `platform/{db,http(+errors),cache,text,migrations}` + `main.ts`/`app.ts` carved from
  `index.ts`. MOVE + REGROUP, never a rewrite: **the L boundary laws hold verbatim** (typed
  ApiError; routes→services; repositories-via-the-DI-seam — admin reaches other domains ONLY
  through `Services.repositories`, F3); `models.ts` carves per-domain with the brands in
  `session/` (`import type` keeps the graph acyclic); domain-private satellites re-home;
  atomdiff dies in TA-4 first. Tests colocate as `modules/<domain>/__tests__/` with a NAMED
  `test/conformance/` exception (Q17). `e2e/` = the good exemplar — top-level grouping only.
- **§5.3 src — the FORBIDS ledger (binding)**: the 3.x public surface is the NAME SET — the 8
  `exports` keys + the symbol sets of `src/index.ts` and the 7 `src/subpaths/*.ts` barrels.
  **FORBIDDEN**: renaming/removing any exported symbol; renaming `src/subpaths/` or its
  filenames or `src/index.ts` (build-frozen chunk names). **FREE** (name-preserving at the
  barrels): the named clusters + the `constants.ts` split (ranges stay; adaptation matrices →
  `conversions/`; `GAMUT_SECTOR_COEFFICIENTS` → `gamut/` — re-exported from the SAME barrel
  names). **Do NOT over-restructure**: `difference`/`contrast`/`colorFilter`/`mix`/`dispatch`/
  `matrix` stay flat (churn-for-churn forbidden); `easing.ts` @643 is watch-only. The KEYSTONE
  is the demo-dogfood: land it FIRST and every later move is a one-barrel edit.
- **§5.4 totality (E-1 "ALL file directories")**: every top-level tree dispositioned — `demo/`
  §5.1 · `api/` + `scripts/` §5.2 · `src/` + `test/` mirror §5.3 · `e2e/` grouping only ·
  `demo/@/styles/` EXEMPT · `demo/@/components/ui/` EXEMPT (vendored shadcn) · `assets/docs/`
  EXEMPT-with-reason · `docs/` governed by the doc-truth program, not the colocation law.

### §Lane orders (single-writer laws, VERBATIM — binding on the dispatcher)

- **W1-demo** (churn-minimizing): DROP/dissolve (incl. the `dark-mode-toggle/` DISSOLVE if W0-3
  did not land it — named in both so no wave orphans it [h-wave-w0-w1 S1]) → contained features (gradient/mix/extractor,
  0–2 external edges) → palette-browser behind HARDENED BARRELS (the 9 external deep edges
  insulated FIRST) → the color-domain atomic codemod LAST (keys ~24 sites).
- **W1-src**: the demo-dogfood keystone FIRST (§5.3 item 1) · the L1 brand decision sequenced
  LAST. (The demo-dogfood keystone crosses into `demo/` import specifiers — **the WHOLE
  `@src/`-leaking set, ~150 import lines across the demo tree, not just the color codemod's ~24
  keys sites** [AMENDED-AT-HARDENING — h-wave-w0-w1 S2: the demo tree is a SHARED writer surface
  for this hunk]; that hunk is
  W1-src's by assignment; W1-demo sequences its color-domain codemod AFTER the keystone lands,
  coordinated at the wave head.)
- **Import-blast mitigations** (§5.1): barrels are **named re-exports only, never `export *`**
  (PI-6 — SFC scoped `<style>` is a side-effecting import tree-shaking cannot remove; CSS
  headroom is 33.5 KiB, JS already 68 over); domain-qualified filenames over colliding
  `keys.ts`/`constants.ts` basenames; the committed **MOVE-MAP**; O-23 ±2% per named chunk.

### §The MOVE-MAP (the Q1 mitigation, binding deliverable)

W1 emits a committed **MOVE-MAP** (old path → new path, ONE table, one commit) covering all
three trees. Every downstream wave re-derives its `file:line` anchors against it at wave-open
(PP-11); the CL-lane ordering note ("boot files must not move under the load-animation lanes'
feet") is satisfied by strict wave ordering — **W1 CLOSES before W2 opens; nothing moves
concurrently.**

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `../glass-ui`/`../keyframes.js` write (the fence); any exported-
  symbol removal/rename (the FORBIDS ledger — there is NO sanctioned expansion here, only halt);
  any api behavior change beyond TA-4's enumerated excision (move-only refuted); any demo
  BEHAVIOR change beyond the enumerated cohesion cargo;
- **non-local gate failures**: O-23 blowing ±2% on a named chunk (the barrel discipline or a
  side-effecting import tree is implicated — halt the codemod, never ship the blast); the api
  suite failing post-move on anything but the deleted diff tests (a move that changed behavior);
  the dts diff showing a REMOVAL (FORBIDS breach — the additive-only gate is absolute); the
  MOB-1 witness failing at 1024×1366 after the stamp (the aspect-law composable and the CSS
  witness disagree — root-cause, don't special-case);
- **loop halt**: the third iteration of any import-graph repair loop halts and routes.

## §File bounds · disjointness · worktrees

| Lane | Files | Access |
|---|---|---|
| W1-demo | `demo/@/**` (excl. `components/ui/` vendored + `styles/` UNCHANGED) · `demo/color-picker/` shell wiring · e2e spec imports | move/modify |
| W1-api | `api/src/**` → `modules/`+`platform/` · `api/test/` colocation (+ named `test/conformance/`) · `scripts/` regroup · `api/` docker/compose path refs | move/modify/delete (TA-4) |
| W1-src | `src/**` (name-preserving at barrels) · `test/` mirror · `demo/` import specifiers (the dogfood keystone hunk ONLY) · `package.json` exports (Q15 additions) · the MIGRATION note | move/modify/create |

Disjointness: the three trees are writer-disjoint by construction; the ONE seam (W1-src's
demo-specifier keystone hunk) is sequenced before W1-demo's color-domain codemod (§Lane orders).
Do NOT touch: `../glass-ui`, `../keyframes.js`, `docs/precepts/`, `demo/@/components/ui/`,
`demo/@/styles/` (exempt), `assets/docs/` (exempt). Each lane runs in its own sibling worktree
cut from the wave head (§3.2).

## §Hard gate (verbatim-faithful to SYNTHESIS §3 T.W1 + §5)

1. **MOVE-MAP committed** (old→new, one table, all three trees).
2. Suites + e2e green: vitest green · playwright full project set green · `cd api && npx tsc
   --noEmit` 0 · `npm run typecheck` 0.
3. **O-23**: gzip per named chunk flat **±2%** across the codemod (build diff recorded).
4. **PP-8 caps recomputed post-move**: no `demo/` file >400 LoC, no `api/src` file >350 LoC,
   src per the cohesion ledger; legacy grep + as-any ledger regenerated (`grep -rn 'as unknown
   as' src/` — count regenerable, not hardcoded).
5. **ZERO re-export shims at old paths** (grep proof) — consumers migrated at root (PP-3).
6. **W1-demo**: MOB-1 witness gate — both panes reachable at **1024×1366**; the style.css:435
   exception rule DIES; ONE stamped `data-layout` witness. MOB-2 — deep-link/back-forward land
   on the schema default (the `mobilePaneIndex` hash-nav leak dead). The cohesion cargo landed
   (dup-`useDark` dead; the 10 `out-in` sites audited w/ pi-w5b hard-fail rider).
7. **W1-api**: the 224-class suite green post-TA-4 (diff tests deleted, fork coverage
   re-homed); the L boundary laws re-verified in the NEW shape (typed ApiError everywhere ·
   routes never touch `repositories.*` · only `platform/db` + the DI factory touch raw `db` ·
   **the H1 cascade-correctness invariant intact: every cross-collection write site still wrapped
   in `services.withTransaction(...)` — the standing reference
   `docs/tranches/H/audit/api-withTransaction-coverage.md` re-walked post-move** [AMENDED-AT-HARDENING — h-precepts HP-4]);
   Q8 depth honored (the write-only `atomDiff` column GONE from the schema); Q17 naming landed.
8. **W1-src**: fresh-build dts surface **additive-only** — no removal/rename of any existing
   exported symbol (FORBIDS ledger; before/after `.d.ts` symbol diff recorded); Q15 promotions
   landed as semver-MINOR additions with the by-name MIGRATION note; the parse-that-free
   subpath invariant green via `test:dist`; the hue-swept boundary sampler exported (+ Into
   twin) with tests; the L1 decision landed LAST with its ~58 callsites migrated at root.
9. Barrels named-re-exports-only (grep: zero `export *` in the new barrels).
9b. **The PR-7 keyframe/animation census gate** [AMENDED-AT-HARDENING — M-31/h-precepts HP-1; a
    recurring OWNER grievance]: a pre-move census of every `@keyframes` + `animation(-name)`
    identity (scoped + global); each survives at a new home post-codemod; ANY deletion REDS the
    wave (O-23's ±2% cannot see a dropped scoped keyframe). The census rides the PP-8 sweep.
10. PI-1 Lighthouse delta recorded · `npm run lint` 0 · `npm run build` clean · clean
    `git status`.

## §No-workaround prohibitions (binding)

- **ZERO re-export shims at old paths** — the consumer migrates, never the path (PP-3; E-3 "NO
  legacy code").
- **Never `export *`** in any barrel (PI-6 — the side-effecting SFC import class).
- **The FORBIDS ledger is absolute**: no exported-symbol rename/removal; no renaming
  `src/subpaths/` filenames or `src/index.ts` (build-frozen chunk names).
- **api is MOVE-ONLY** — no rewrite-during-move; the ONE behavior change is TA-4's enumerated
  excision (Q8 full depth — routes-only is the REJECTED alternative that leaves the write-only
  column, the exact E-3 violation TA-4 proved reaches the schema).
- **Do NOT over-restructure** the named flat set (`difference`/`contrast`/`colorFilter`/`mix`/
  `dispatch`/`matrix`; `easing.ts` watch-only) — churn-for-churn is forbidden.
- **No LoC-chop splits** — every decomposition is cohesion-driven (PR-1).

## §Format + lint cadence

Per lane: `npm run lint` + `npm run typecheck` + `npm test` after each move batch; W1-api adds
`cd api && npx tsc --noEmit` + the api suite after every module transposition; W1-src adds
`npm run build` + the dts symbol diff after every barrel-touching move; `npx playwright test`
per lane close and at wave close; the O-23 build diff at wave close. The tool-artefact grep `grep -rnE '</?(content|invoke|parameter|antml)'` over the wave's touched docs MUST be empty before any docs commit (the §Recovery seam class — M-1).

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the committed MOVE-MAP path; the O-23 per-chunk diff
table; the dts before/after symbol diff (additive-only proof); the shim/`export *` grep
captures; the PP-8 caps table (recomputed post-move); the MOB-1 1024×1366 witness evidence +
MOB-2 nav record; the api boundary-law re-verification note; the Q15 MIGRATION note; per-lane
commit hashes.

## §Commit plan

Per-lane move-batch commits in §Lane-order sequence — **the W1-demo batches are NAMED,
checkpoint-bearing phases** [AMENDED-AT-HARDENING — M-32]: (1) DROP/dissolve · (2) gradient ·
(3) mix · (4) extractor · (5) palette-browser barrels-first · (6) palette-browser decomposition ·
(7) color-domain atomic codemod (post-keystone) · (8) app-shell home · (9) per-feature recursion —
each batch names its MOVE-MAP rows and is a PP-14 resumption unit;
W1-src: keystone FIRST (own commit with body), Q15 promotions + MIGRATION note (own commit),
sampler (own commit), L1 LAST (own commit with body); W1-api: TA-4 excision (own commit with
body) inside the transposition sequence; W1-demo: cargo commits (useDark fold · PI-DRIFT-1 ·
MOB-1 · MOB-2) distinct from move commits; the MOVE-MAP commit; a status commit at close.

## §Recovery (STANDING — the `T.md §8` completion-brief rider binds every dispatch AND resume of this wave; PP-14/PP-15 operationalized) [AMENDED-AT-HARDENING — M-29/h-exec-recovery]

The four-step protocol (audit-partial → patch-brief at `audit/recovery/T.W<n>-<lane>-brief-<date>.md` → resume-from-work-order → seam-audit-at-close) is standing law in `T.md §8`; E-6 batches-of-three is the prevention half, this rider the cure. This wave's type-specific deltas:

**Partial signatures**: an **atomic codemod stopped mid-24-sites** (half old/half new specifier = a
broken tree, the canonical W1 hazard); the **MOVE-MAP uncommitted while moves landed** (downstream
PP-11 re-anchoring orphaned); a barrel half-migrated (a stray `export *` or a shim at an old path);
an orphaned sibling worktree.
**Resume specifics**: an uncommitted **atomic codemod is ALL-OR-NOTHING — DISCARD the
half-application and re-drive from the MOVE-MAP row**, never commit it half-applied. On resume the
**MOVE-MAP commits FIRST** so downstream re-anchoring survives a second wall. Seam-audit: the
shim/`export *` grep doubles as the partial-detector; the dts additive-only diff catches a
half-migrated barrel; `git worktree list` = demo ∥ api ∥ src only. The three trees are
writer-disjoint — a dead lane cannot have corrupted a sibling; audit each independently.

## §Dependencies

- **Depends on**: T.W0 (the `test:dist` home for the subpath invariant; the legacy set already
  zero) + the Q1/Q8/Q15/Q17 rulings.
- **Blocks**: T.W2 + T.W3 (round 2) and transitively every design wave — new design code is
  born into this shape; W2 edits `app/composables/boot/` (this wave creates it); the MOVE-MAP
  is every later wave's re-anchoring table (PP-11).

## §BOOKS opened/serviced (books-never-gates)

- **L1 Normalized/Display brand (S's "W2-3" book, RENAMED)** — discharged here (W1-src last
  item; the decision-doc redesign, ~58 callsites).
- **TA-4 `/remix`+`/diff` api-hygiene** — discharged here (inside the move; Q8).
- **dup-`useDark` · PI-DRIFT-1 (+10 `out-in` sites)** — discharged here (W1-demo cargo).
- **`usePaletteStore` migration** — stays DORMANT (fires on first `version` bump past 1); the
  move re-homes it, nothing more.
- **Q16 candidates (`EmptyState` + picker action controls)** — flagged in the W0-1 letter;
  until answered, `EmptyState` lifts to a shared demo atom, the action controls stay picker
  exports via the hardened barrel.
- **`easing.ts` @643** — watch-only row re-recorded (NOT restructured).
- **`Color.try()` (CHRONIC)** — stays PARKED (12 try-wraps ≠ the bar); not a W1 item.

## §Evidence packets consumed

`audit/lanes/t-coloc-components.md` · `audit/lanes/t-coloc-composables-lib.md` ·
`audit/lanes/t-coloc-backend.md` · `audit/lanes/t-coloc-src.md` ·
`audit/lanes/t-mobile-audit.md` (MOB-1/MOB-2) · `audit/lanes/t-api-state.md` (TA-4) ·
`audit/lanes/t-perf-implications.md` (PI-6/O-23) · `audit/lanes/t-legacy-sweep.md` (move-adjacent
rows) · `audit/lanes/t-deferred-census.md`.

## §Hand-off

Round 2 (W2 ∥ W3) opens on this wave: the boot chain is legible at `app/composables/boot/`
(W2's single-writer surface EXISTS by name), the material/tier surfaces are colocated for W3,
and every design lane re-derives its anchors against the committed MOVE-MAP at wave-open
(PP-11). The Q15 promotions make the demo's hot paint paths first-class API consumers (the
gamut overlay samples per-pixel — no `color2()` detour). W9's doc rewrites (demo/api CLAUDE.md
at the pattern level) describe the shape this wave lands.
