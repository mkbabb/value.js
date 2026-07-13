# T.W1 — CLOSE ARTEFACTS (the 11-row §Hard gate, consolidated)

**Wave**: T.W1 — THE COLOCATION GRAND RESTRUCTURE (W1-demo · W1-api · W1-src — the E-1 grand
edict executed whole; the structural spine of T).
**Closed**: 2026-07-10, branch `tranche-t`.
**Verdict**: **`CLOSE_WITH_MISSES`** — the 11-row `T.W1.md §Hard gate` returned **10 PASS + 1
FAIL** (zero silent loss). The single miss is **row 6 / MOB-1** (the stamped `data-layout`
witness): NOT landed in the tree, DELIBERATELY DEFERRED to the T.W4.5/W6 Fable surface with a
GENUINE, in-tree-documented **ratified-vs-ratified conflict** named (App.vue:50-51 documents the
D8-1 `lg:*` cascade as "producer-owned; never demo-cured here" vs T's MOB-1 demo-cure). Nothing
is half-applied; git is clean; every fence respected. The verdict matches the integrator's own
PARTIAL self-report — **one real W1 gate miss, routed as a book, not swept.**
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins → `MANDATE-2026-07-06.md §0`
+ addenda (E-1 = the owner's grand edict VERBATIM) → `SYNTHESIS.md` as-hardened §5 →
`waves/T.W1.md`.
**This doc consolidates**: the 11 §Hard-gate rows + verdict + evidence **verbatim from the close
gate** (§1) + the ONE miss → the Fable book with the ratified-vs-ratified conflict (§2) + the
three FORBIDS-class gates INDEPENDENTLY re-derived, not taken on the lane's word (§3) + the
per-lane commit map (§4) + the grep captures (§5) + the minor non-gate observations (§6) + the
verification-artefacts index (§7). The integrator's own §Verification-artefacts record is
`w1-close-gates.md` (the integrated-tree evidence table); this doc is the gate adjudication.

---

## §1 — The 11-row §Hard gate (verbatim: each row + verdict + evidence, from the close gate)

> **1. MOVE-MAP committed** (old→new, one table, all three trees).

**PASS** — MOVE-MAP is ONE consolidated table `docs/tranches/T/audit/w1-move-map.md` covering
TREE A (src, name-preserving), TREE B (api modules/+platform/), TREE C (demo 9 batches) — 240
table rows; committed FIRST post-merge at `eaad670` per the §Recovery MOVE-MAP-commits-FIRST
rider; the three per-lane maps folded and removed.

> **2. Suites + e2e green**: vitest green · playwright full project set green · `cd api && npx
> tsc --noEmit` 0 · `npm run typecheck` 0.

**PASS** — RAN all: vitest **2171 passed / 69 files** (exit 0); playwright ALL 6 projects **61
passed / 3 skipped** exit 0 (the ✘59 `o5-boot-pacing.spec` is `test.fail()` BORN-RED-by-design
line 44, expected-fail = pass, cured W2-3); `cd api && npx tsc --noEmit` = 0; `npm run typecheck`
= 0. Bonus green: lint 0, api suite **205/35**, `test:dist` 5/5, build + gh-pages clean.

> **3. O-23**: gzip per named chunk flat **±2%** across the codemod (build diff recorded).

**PASS** — `w1-o23-diff.md`: literal per-name ±2% exceeded ONLY on keystone-rechunk (index.js
−9.8%, dispatch −11%, color-utils/packrat GONE) + C6 barrel-regroup (card.js NEW, search.js
name-collision, BrowsePane −40%) + sanctioned Q15/A5 additive; **stable level GREEN** (eager JS
−0.09%, demo total −0.13%, CSS flat, no lazy→eager, zero `export *`). Independent fresh-build gzip
MATCHES the diff: library total 65,954 (claim 65,672), index.js 183,642 (183,621), card.js 11,580
(11,563), subpaths/color.js 2,036 (2,027) — no runaway bloat. Every >±2% per-name move classifies
as the already-on-head keystone source→dist rechunk, the C6 barrel auto-chunk regroup, or the
sanctioned library additive — none implicate barrel-discipline or a side-effecting import tree.

> **4. PP-8 caps recomputed post-move**: no `demo/` file >400 LoC, no `api/src` file >350 LoC;
> legacy grep + as-any ledger regenerated (`grep -rn 'as unknown as' src/` — count regenerable,
> not hardcoded).

**PASS** — Zero demo files >400 LoC (excl. `components/ui/` + `styles/`); zero `api/src` >350 LoC.
`grep -rn 'as unknown as' src/` = **8** (regenerable, unchanged vs tranche S); `as any` src = **0**
(the lone grep hit `src/parsing/index.ts:509` is a comment, not code); `api/src` `as any` = 0,
`as unknown as` = **1** (`main.ts:83` `server.close` handle, inv-L-2). Keyframes census rides the
sweep (row 9b).

> **5. ZERO re-export shims at old paths** (grep proof) — consumers migrated at root (PP-3).

**PASS** — All named moved-away old paths ABSENT (git mv, no forwarding stub): `api/src/index.ts`,
`src/parsing/{color,stylesheet,easing}.ts`, `src/units/color/{gamut,boundary}.ts`,
`api/src/{models.ts,lib/crud/atomdiff.ts}`, `demo/@/components/custom/{color-picker,panes}/keys.ts`.
Zero `export *` anywhere. typecheck + build GREEN with old paths absent = consumers migrated at
root (PP-3); no shim needed or present.

> **6. W1-demo**: MOB-1 witness gate — both panes reachable at **1024×1366**; the style.css:435
> exception rule DIES; ONE stamped `data-layout` witness. MOB-2 — deep-link/back-forward land on
> the schema default (the `mobilePaneIndex` hash-nav leak dead). The cohesion cargo landed
> (dup-`useDark` dead; the 10 `out-in` sites audited w/ pi-w5b hard-fail rider).

**FAIL** — **MOB-1 NOT landed in the tree**: the `style.css:429-436` aspect-law display exception
(D6-03) STILL EXISTS (the mandate requires "the style.css:435 exception rule DIES"), and
`grep 'data-layout' demo/` = **ZERO** (the required ONE stamped witness absent). Deliberately
DEFERRED to Fable citing a GENUINE ratified-vs-ratified conflict — App.vue:50-51 documents "the
`lg:*` display classes are RETAINED untouched (the D8-1 cascade is producer-owned; never demo-cured
here)" vs T's demo-cure. Routed with the conflict named, nothing half-applied, panes reachable at
1024×1366 via the intact mechanism + smoke-mobile green. **MOB-2 LANDED** (`useViewManager.ts:60`
route-derived `mobilePaneIndex` → schema `defaultPaneIndex`, view-tagged override, hash-nav leak
dead). **Cargo GREEN**: no live `useDark()` call (fold onto `useGlobalDark` complete), PI-DRIFT-1
out-in audit landed (`t-transitions-liquid.md`; 9 sites present vs nominal 10). The ONE genuine
§Hard-gate miss = the integrator's PARTIAL.

> **7. W1-api**: the 224-class suite green post-TA-4 (diff tests deleted, fork coverage re-homed);
> the L boundary laws re-verified in the NEW shape; Q8 depth honored (the write-only `atomDiff`
> column GONE from the schema); Q17 naming landed.

**PASS** — RAN api suite **205/35** green post-TA-4 + tsc 0. TA-4 verified in tree: no live
`/remix`|`/diff` route handler, no `computePaletteDiff`/`remixPaletteBody` fn defs (only
excision-comments); `diff.test.ts` + `palette-remix.test.ts` DELETED; fork coverage re-homed
(`palette-forks.test.ts` + `palettes-forks.test.ts` present); `computeAtomSetHash` KEPT
(hash.ts/format.ts). Q8: `atomDiff` GONE from schema. L laws: 0 ad-hoc `c.json({error})`, routes
never touch `repositories.*`, **25 withTransaction sites** (H1 re-walk). Q17:
`modules/{admin,color,meta,palette,session}/__tests__/` + named `test/conformance/`. Pre-W1 37
files → 35 = exactly the 2 sanctioned deletions, no silent loss (the §Recovery gitignore cure
`cf65472` verified effective). "224" is a nominal count reduced by the diff-test excision.

> **8. W1-src**: fresh-build dts surface **additive-only** — no removal/rename of any existing
> exported symbol (FORBIDS ledger; before/after `.d.ts` symbol diff recorded); Q15 promotions
> landed as semver-MINOR additions with the by-name MIGRATION note; the parse-that-free subpath
> invariant green via `test:dist`; the hue-swept boundary sampler exported (+ Into twin) with
> tests; the L1 decision landed LAST with its ~58 callsites migrated at root.

**PASS** — dts additive-only INDEPENDENTLY re-derived: fresh build of wave-head `879ea36`
(worktree) vs HEAD build → **476→479** published symbols, **ZERO removed**, +3 =
`OKLChHueSweepBoundary`/`sampleOKLChHueSweepBoundary`/`sampleOKLChHueSweepBoundaryInto`. Q15: 8
leaked primitives promoted (commit `64dd02b`, semver-MINOR) w/ by-name MIGRATION table in
CHANGELOG [3.2.0]; `getColorSpaceBound` + `oklabToLinearSRGBInto` exported in
`dist/subpaths/color.d.ts`. subpath invariant GREEN via `test:dist` subpath-budget **11/11** (RAN).
Sampler exported (+Into twin) with tests `test/units/color/gamut/oklch-hue-sweep-boundary.test.ts`
(11 asserts, in the 2171 green). **L1 landed LAST (CLOSE — the brand is FORBIDS-illegal**: Form
A = semver-major breaking, Form B = E-3 decorative; "change nothing with cause" is the only legal
outcome; decision doc `L1-normalized-display-brand-decision.md`). subpaths/ 7 filenames +
src/index.ts frozen intact.

> **9. Barrels named-re-exports-only** (grep: zero `export *` in the new barrels).

**PASS** — `grep -rnE 'export \*' src/ demo/@/ api/src/` = **zero** real statements (only comment
mentions "never `export *`"). Barrels are named re-exports only (PI-6).

> **9b. The PR-7 keyframe/animation census gate** (a recurring OWNER grievance): a pre-move census
> of every `@keyframes` + `animation(-name)` identity (scoped + global); each survives at a new
> home post-codemod; ANY deletion REDS the wave.

**PASS** — PR-7 keyframe census INDEPENDENTLY diffed: git-grep `@keyframes` identities at wave-head
`879ea36` (demo tree) vs HEAD → **IDENTICAL 19/19 set** (action-pulse, action-spin, blink,
crown-appear, field-paint-in, plate-land, swatch-pop, vj-settle, pane-*-shrink, …), zero lost. The
OWNER-grievance gate holds. Census record: `w1-pr7-keyframes-census.md`.

> **10. PI-1 Lighthouse delta recorded** · `npm run lint` 0 · `npm run build` clean · clean
> `git status`.

**PASS** — PI-1 W1 delta ROW recorded in `pi1-delta-ledger.md` line 42 (run `29099567050` / sha
`9cc1949`, values in-flight, expected ~flat, chunk-graph-neutral) — **W1 is explicitly NOT a named
Lighthouse gate** (those are W2/W7/W9 per Q14), so "delta recorded" is the met requirement. lint =
0, build + gh-pages clean, `git status --porcelain` empty (clean, incl. after worktree cleanup).

---

## §2 — The ONE miss → the Fable book (row 6 / MOB-1: a routed book, not a swept miss)

MOB-1 is the sole §Hard-gate FAIL. It is **routed, not swept** — the integrator gave TWO PARTIAL
reasons; only ONE is a real W1 gate miss:

- **(a) MOB-1 (row 6) — GENUINE MISS**, verified DIRECTLY (not on the lane's word): the
  `style.css:429-436` aspect-law display exception is NOT dead (`grep -n 'aspect-ratio < 1.1'`
  hits `demo/@/styles/style.css:436`), and there is NO `data-layout` witness in the tree
  (`grep -rn 'data-layout' demo/` = 0). Deferred to Fable/frontend-design with a REAL,
  in-tree-documented **ratified-vs-ratified conflict**: T's MOB-1 replaces the D8-1 producer-owned
  `lg:*` width witnesses that `App.vue:50-51` documents as "the D8-1 cascade is producer-owned;
  never demo-cured here". Per the §Recovery E-6 taste-judged → Fable clause, routed with the D8-1
  conflict NAMED; nothing half-applied; the current width+aspect mechanism is intact and green
  (both panes reachable at 1024×1366; smoke-mobile passes). This is the sole reason the integration
  status was PARTIAL, not LANDED — it surfaces here as **CLOSE_WITH_MISSES**, the one open book of
  the wave, carried to the T.W4.5 checkpoint / W6 surfaces & shell.

- **(b) PI-1 Lighthouse in-flight (row 10) is NOT a W1 miss** — row 10 requires only "delta
  recorded" (present, `pi1-delta-ledger.md:42`), and the hard Lighthouse LCP/TBT budget is a Q14
  gate adjudicated at W2/W7/W9, honestly-RED by design, never a W1 regression. Not a miss.

The `styles/` tree is EXEMPT from the colocation law (§5.4) but not from a demo-behavior cargo
change; the MOB-1 cure was the one cargo item this wave could not land without adjudicating the
D8-1 conflict, which is Fable's (taste) call, not the mechanical restructure's.

---

## §3 — The three FORBIDS-class gates INDEPENDENTLY re-derived (not the lane's word)

The scribe did NOT take the lane's word on the hardest FORBIDS-class gates:

1. **dts additive-only (row 8)** — re-derived by ACTUALLY BUILDING wave-head `879ea36` in a
   throwaway worktree and diffing the exported-symbol sets against a fresh HEAD build: **476→479,
   0 removed, +3** (the T-21 hue-sweep sampler triad). The FORBIDS additive-only gate holds by
   independent measurement, not by the lane's claim.
2. **PR-7 keyframe census (row 9b)** — re-derived by git-grepping the wave-head commit vs HEAD:
   **19/19 identical**, zero lost. The OWNER-grievance gate holds independently.
3. **The §Recovery api gitignore defect + cure (row 7)** — the api suite RAN independently
   (**205/35 green**); pre-W1 37 test files → 35 = only the 2 sanctioned diff/remix deletions, so
   NO silent test loss survived into the merged tree. The `cf65472` cure is real and effective.

The O-23 stable-level pass (row 3) was likewise re-checked by an own fresh-build gzip measurement:
every number matches the diff table; all >±2% breaches classify as the keystone source→dist
rechunk, the C6 barrel auto-chunk regroup, or the sanctioned Q15+A5 additive — none implicate
barrel discipline or a side-effecting import tree.

---

## §4 — Per-lane commit map (the three single-writer lanes + integration close)

**W1-src** (the demo-dogfood keystone FIRST, L1 brand LAST):

| Commit | Item |
|---|---|
| `aab0d49` | test-mirror — the test tree mirrors the new src shape (§5) |
| `4dcab23` | parsing-clusters — `parsing/{color,timeline,stylesheet}/` (§3) |
| `e9102de` | gamut-family — `units/color/gamut/` (§4a) |
| `7594524` | constants-split — `color/constants.ts` by concern (§4b) |
| `dd5f86a` | sampler — the hue-swept OKLCh boundary envelope (T-21) |
| `3465c3a` | §Recovery cure — keep the round-trip corpus at `test/` root (test:dist 5/5) |
| `13bf347` | **L1** — the Normalized/Display brand DECISION, CLOSE (runtime-flag design ratified) — landed LAST |
| `f8e7eed` | **merge(T.W1 · src)** — parsing/color/gamut clusters + constants split + T-21 sampler + L1 + test-mirror |

**W1-api** (E-1 modules/+platform transposition; TA-4 excision inside the move):

| Commit | Item |
|---|---|
| `8b672f2` | the W1-api MOVE-MAP (old→new, one table) |
| `a8ff779` | **TA-4** — excise the write-only atom-diff apparatus (the `/remix`+`/diff` fold) |
| `919cc69` | E-1 package-by-feature transposition — modules/ + platform/ (MOVE + REGROUP) |
| `446be8e` | colocate per-domain suites → `modules/<domain>/__tests__/` (Q17) |
| `16bfa2a` | regroup `scripts/` into deploy/·dev/·ci/·gates/ (E-1/F7) |
| `dfa46c4` | **merge(T.W1 · api)** — modules/+platform/ + TA-4 + colocated __tests__/ + scripts/ regroup |

**W1-demo** (9 named batches + cohesion cargo; color-domain codemod post-keystone):

| Commit | Item |
|---|---|
| `bed42e2` · `ee75a3e` · `0e6cf7f` | batches 2/3/4 — gradient · mix · extractor |
| `07590a3` | cargo · dup-`useDark` fold onto `useGlobalDark` |
| `b3fd20f` | cargo · **MOB-2** — route-derived mobile pane index, hash-nav leak dies |
| `a6c7781` · `8fbd45f` | batches 5/6 — palette-browser hardened barrels → decomposition |
| `ef2fa70` | batch 7 — color-domain atomic codemod (post-keystone, F2/F3/F6) |
| `9051bb2` · `1ec075a` | batches 8/9 — app-shell boot home · per-feature recursion |
| `2e3bfb1` | e2e fixture fix — `**/admin/**` mock must not swallow the new `admin/` dir |
| `77d21fc` | **merge(T.W1 · demo)** — 9/9 batches + cohesion cargo |

**Integration close** (post-merge, on `tranche-t`):

| Commit | Item |
|---|---|
| `eaad670` | **MOVE-MAP** — consolidate the three lane maps → ONE 240-row table (§Recovery MOVE-MAP-commits-FIRST) |
| `5c66924` | **O-23** — the wave-close per-named-chunk bundle diff (SATISFIED, no blast) |
| `cf65472` | **§Recovery cure** — re-home the 27 per-domain test suites the colocation commit lost to `.gitignore` `_*` |
| `9cc1949` | **close gates** — the wave-close §Verification artefacts record (`w1-close-gates.md`) |
| `6752cc8` | **PI-1** — the W1 restructure delta row (CI run `29099567050`) |

---

## §5 — Grep captures (the gate's own predicates, re-run at close)

- **`data-layout` witness** (`grep -rn 'data-layout' demo/`) = **0** — the MOB-1 witness is absent
  (row 6 FAIL corroborated directly).
- **aspect-law exception** (`grep -n 'aspect-ratio < 1.1' demo/@/styles/style.css`) = live at
  `:436` (the D6-03 exception rule the mandate requires to DIE — still present, MOB-1 deferred).
- **`export *`** (`grep -rnE 'export \*' src/ demo/@/ api/src/`) = **0** real statements (comment
  mentions only).
- **cast ledger** (regenerated, LoC-precept): `src/` `as unknown as` = **8** · `as any` = **0**
  (the `src/parsing/index.ts:509` hit is a comment); `api/src` `as unknown as` = **1**
  (`main.ts:83`) · `as any` = **0**.
- **tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'` over the touched
  docs): CLEAN (the §Recovery seam class, M-1) — re-run at this close over the authored/edited
  docs before commit.
- **`git status --porcelain`**: empty (clean, incl. after the throwaway `879ea36` worktree
  cleanup — the scribe/verifier's only tree mutation, now removed).

---

## §6 — Minor non-gate observations (NOT misses)

1. **out-in audit count** — the PI-DRIFT-1 out-in audit found **9** sites vs the mandate's nominal
   "10" (audit record `t-transitions-liquid.md` exists, the fold is complete — an audit
   deliverable, not an exact-count gate).
2. **`as any` src grep returns 1** but it is a CODE COMMENT (`src/parsing/index.ts:509`); real
   count 0 (CLAUDE.md discipline intact).
3. **"224" / "37" nominals** — the api "224-class" and "37 test files" are nominal counts reduced
   by the sanctioned diff/remix excision to 205/35; the reduction is exactly the 2 sanctioned
   deletions, no silent loss.

---

## §7 — Verification-artefacts index (cited at close, per `T.W1.md §Verification artefacts`)

- **The committed MOVE-MAP path**: `w1-move-map.md` (ONE 240-row table, all three trees;
  committed FIRST at `eaad670`).
- **The O-23 per-chunk diff table**: `w1-o23-diff.md` (+ baseline `w1-o23-baseline.md`).
- **The dts before/after symbol diff (additive-only proof)**: §3 above + `w1-close-gates.md §dts`
  (476→479, 0 removed, re-derived from the `879ea36` worktree build).
- **The shim / `export *` grep captures**: §5 above.
- **The PP-8 caps table (recomputed post-move)**: `w1-close-gates.md §PP-8` + §1 row 4.
- **The MOB-1 1024×1366 witness evidence + MOB-2 nav record**: §2 above + `w1-close-gates.md
  §MOB-1` (MOB-1 = the routed book; MOB-2 landed, `useViewManager.ts:60`).
- **The api boundary-law re-verification note**: §1 row 7 + `w1-close-gates.md §api boundary-law`
  (25 withTransaction sites, H1 re-walk).
- **The Q15 MIGRATION note**: CHANGELOG [3.2.0] by-name table; §1 row 8.
- **The PR-7 keyframe census**: `w1-pr7-keyframes-census.md` (19/19 identical, re-derived).
- **The PI-1 W1 delta row**: `pi1-delta-ledger.md:42` (run `29099567050` / `9cc1949`).
- **Per-lane commit hashes**: §4 above.
- **The integrator's integrated-tree §Verification-artefacts record**: `w1-close-gates.md`.
