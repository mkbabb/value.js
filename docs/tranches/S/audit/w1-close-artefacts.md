# S.W1 — close artefacts (the 3.0.0 library cut)

**Wave**: S.W1 — LIBRARY (the 3.0.0 wave). **Closed**: 2026-07-05.
**Spec of record**: `waves/S.W1.md` · `audit/SYNTHESIS.md §3.3/§4` · `audit/RATIFICATION-2026-07-05.md §2.1/§2.3`.
**Publish head**: `tranche-q` @ `1537fed` (the version commit); annotated tag `v3.0.0`.

This is the wave's verification record: the publish + registry proof, the dark-band golden table,
the post-W1 cap-check table, the regoldened-fixture enumeration, both cross-repo dispatch records,
and the per-item commit hashes.

---

## §1 Publish + registry record

- **`npm publish`** → `+ @mkbabb/value.js@3.0.0` (mkbabb, live auth). Tarball
  `mkbabb-value.js-3.0.0.tgz` — 87 files, 128.8 kB packed / 421.3 kB unpacked,
  shasum `a55914751054a774e5c3fe165a73fd95afc38336`. **Zero `gh-pages/` pollution** in the tarball
  (the demo build's `dist/gh-pages/` was cleaned by a final `rm -rf dist && npm run build` before pack).
- **Registry check** (CLI-cache bypassed with `--prefer-online`):
  - `npm view @mkbabb/value.js@3.0.0 version` → `3.0.0`
  - `npm view @mkbabb/value.js dist-tags` → `{ latest: '3.0.0' }`
- **Tag**: annotated `v3.0.0` pushed with the by-name MIGRATION table in the tag message
  (`tranche-q` push `4dba5f4..1537fed` + `[new tag] v3.0.0`).

### Full-verify (green, at the publish head)

| Gate | Result |
|---|---|
| `npm run lint` | 0 |
| `npm run typecheck` (lib + demo) | 0 |
| `npx vitest run` | **2080/2080** (64 files) — incl. NEW `srgb-transfer-darkband` + reinstated `okhsl` dodged band |
| `rm -rf dist && npm run build` + fresh `.d.ts` guard | clean; **66** flat-layout `.d.ts` present (`dist/index.d.ts` + `dist/subpaths/*.d.ts`) |
| `npm run gh-pages` (demo — the self-dep-excision safety proof) | clean (vite alias covers the sibling `@mkbabb/value.js/math` consumers with the self-install physically removed) |
| `npx playwright test` | **42/42** across all 5 projects incl. `smoke-safari`/WebKit (no host gap; count is 42 not 38 because S.W2 added the `url-color-precedence` specs) |

---

## §2 The dark-band golden table (W1-1 — the srgb decode cure)

The DECODE branch now pivots on the ENCODED-axis threshold `SRGB_TRANSITION` (0.04045), not the
linear-axis 0.0031308. Encoded 8-bit 1..10/255 (all in [0.0031308, 0.04045]) previously mis-routed
through the power branch (near-black ~3.2× too bright); now on the linear branch (`c/12.92`).

**Oracle is INDEPENDENT** (never the library): an inline hand-coded IEC 61966-2-1 transfer +
Rec.709/D65 sRGB→XYZ matrix, cross-checked against `scratchpad/darkband_oracle.py`. Full table at
`test/srgb-transfer-darkband.test.ts` (`DARK_BAND_Y`); the endpoints:

| n (/255) | neutral `XYZ.Y` (post-cure, hand-computed) |
|---|---|
| 1 | `0.00030352698354883757`  (pre-cure read `9.837e-4` — ~3.2× too bright) |
| 5 | `0.0015176349177441874` |
| 10 | `0.003035269835488375` |

Pixel-output-changing for encoded ≤10/255 **only**; no signature change. `gamut.ts`'s inline
`srgbToLinear` twin DELETED (the "circular dep" justification was stale — `transfer.ts` is a 0-import
leaf). A non-circular self-inverse roundtrip test (identity as oracle, `decode∘encode` /
`encode∘decode` across [0,1] incl. the dark band) is green. The okhsl dark+saturated **dodged band is
reinstated** (`test/okhsl.test.ts` — the transfer pair is now mutually invertible across it).

### Regoldened-fixture enumeration

**NONE.** The existing boundary goldens never sample ≤10/255, so no fixture moved. The cure was
committed (`789061a`) touching exactly four files — `conversions/transfer.ts` (fix), `gamut.ts` (twin
deletion), `okhsl.test.ts` (band reinstated), `srgb-transfer-darkband.test.ts` (NEW goldens) — and
**no golden fixture file** among them. This satisfies the §No-workaround "never silently regolden"
prohibition by construction: there was nothing to regolden.

---

## §3 Post-W1 cap-check (the census cohesion verdict GOVERNS, not raw LoC)

Every `src/` file > 500 LoC at the publish head, mapped to its census verdict. **Rule**: no
SPLIT-WORTHY file over-cap without a recorded ledger row.

| File | LoC | Census verdict | Disposition |
|---|---|---|---|
| `parsing/color.ts` | 696 | SPLIT-WORTHY, **sequenced-LAST** (recursive grammar) | **LEDGER ROW — decompose stopped short** (see §3.1) |
| `parsing/scroll-timeline.ts` | 658 | Borderline, "not urgent at 667" | accepted-by-verdict — no row |
| `parsing/stylesheet.ts` | 643 | SPLIT-WORTHY higher-risk, **sequenced-LAST** | **LEDGER ROW — decompose stopped short** (see §3.1) |
| `easing.ts` | 643 | NOT god-module + **booked** `resolveEasing` growth (515→643 by design) | accepted-by-verdict — no row |
| `units/style-names.ts` | 641 | NEW pure-data module (W1-8 `STYLE_NAMES` lift); 0 non-data lines | accepted data-table shape (census constants verdict) — no row |
| `parsing/utils.ts` | 603 | **NOT on the census** (was 407 at S.W0 close `adab17a`) | **LEDGER ROW — new cohesive over-cap** (see §3.2) |
| `units/utils.ts` | 601 | SPLIT-WORTHY; the DOM lift landed (722→601) | **LEDGER ROW — near-guaranteed by construction** (see §3.3) |
| `parsing/index.ts` | 586 | Borderline, "acceptable at this size" | accepted-by-verdict — no row |
| `transform/path.ts` | 562 | NOT god-module (one cohesive `PathGeometry`) | accepted-by-verdict — no row |
| `transform/decompose.ts` | 541 | NOT god-module (documented single module) | accepted-by-verdict — no row |
| `parsing/math.ts` | 525 | NOT god-module, "just over the line" | accepted-by-verdict — no row |
| `units/color/dispatch.ts` | 512 | Known/tracked + **booked** ICtCp dispatch-arm growth | accepted-by-verdict — no row |

**Informational — W1-8 lifts that dropped files UNDER cap**: `units/color/index.ts` 968 → **71** (barrel;
`base.ts` 357 + `spaces.ts` 420 + `serialize.ts` 248) · `units/constants.ts` 799 → **165**
(`STYLE_NAMES` → `style-names.ts`) · `units/color/constants.ts` 613 → **453** (`COLOR_NAMES` →
`color-names.ts`) · `units/color/gamut.ts` 514 → **498** (twin deletion).

### §3.1 Ledger rows — the sequenced-LAST decompositions (stopped short deliberately)

- **`parsing/stylesheet.ts` @ 643 LoC** — OVER-CAP, DELIBERATELY STOPPED SHORT (recursive-grammar
  risk, sequenced-LAST discipline). The one cleanly-separable, multi-consumer leaf — the AST types —
  was extracted (`stylesheet-types.ts`, `d374acf`). The 643-LoC remainder is the mutually-recursive
  at-rule/qualified-rule grammar spine (`styleRule ↔ styleBlockItem ↔ atRule ↔ recursiveBlock ↔
  lazyStylesheetItems ↔ stylesheetItem`) plus its 1:1-coupled descriptor builders and balanced-text
  scanners — order/reference-sensitive combinators. Forcing under cap would fragment the at-rule
  builders from their parsers (a LoC-chop the §No-workaround prohibitions forbid). Verdict-clean per
  SYNTHESIS §3.3 cap-check rider.
- **`parsing/color.ts` @ 696 LoC** — OVER-CAP, DELIBERATELY STOPPED SHORT (same discipline). The two
  non-combinator concerns were extracted: the parse-boundary currency (`color-unit.ts`, `7a1ffc7`) and
  the CSS Color L5 relative-syntax resolution (`relative-color.ts`, `4dba5f4`). The 696-LoC remainder
  is the recursive color grammar spine (first-char dispatch → letter buckets → 15 space parsers →
  `color-mix()`/`color()`/`contrast-color()` → named/system/sentinel arms → memoized public API), all
  order/reference-sensitive. Splitting further would fragment the grammar spine. Verdict-clean per the
  cap-check rider.

### §3.2 Ledger row — `parsing/utils.ts` @ 603 LoC (NEW cohesive over-cap)

Not on the census's accepted-over-500 set (it was **407** at S.W0 close `adab17a`). It crossed the cap
DURING W1-8 as the direct, intended consequence of the **7-scanner consolidation** (`324da63`): the
seven hand-rolled balanced-text scanners scattered across the parse layer were replaced by ONE shared
`balancedText`/`walkBalanced`/`splitTopLevel` primitive, homed here — a **net tree-wide LoC reduction**
(concentration of shared code, the opposite of a god-module smell). The file is a single cohesive
concern — the parse-combinator primitive toolkit (fast scanners · basic parsers · balanced-text
machinery · `succeed`/`fail` · `ParseDiagnostic`/`tryParse`). **NOT split** (the No-LoC-chop
prohibition + the wave's own directive to consolidate INTO utils); the balanced-text block is the one
future leaf-lift candidate (`balanced-text.ts`) if it grows further. Recorded, not silently missed
(the discipline the wave names for `units/utils.ts` applied identically here). A divergence from the
wave doc's "two rows fire" expectation, resolved by the cap-check rider's own record-a-ledger-row
mechanism — not a gate failure, not a triumvirate trigger.

### §3.3 Ledger row — `units/utils.ts` @ 601 LoC (near-guaranteed by construction)

The wave-doc-predicted row. The enumerated W1-8 DOM lift (`9f42d58`, ~140 LoC to `dom-metrics.ts`)
took 722 → 601 — still over-cap BY CONSTRUCTION while the generic `flattenObject`/`unflattenObject`
fold into root `src/utils.ts` stays the recorded DEFERRED decision (CLAUDE.md documents the
flatten/unflatten placement; a root-fold is a future decision, not assumed). Only a separately-taken-up
root-fold retires this row.

---

## §4 Cross-repo dispatch records

| Letter | Target repo | Branch | Placed at | Commit |
|---|---|---|---|---|
| **PT-E** (parse-that 1.1.0+ asks; W1-9) | `@mkbabb/parse-that` | `master` | `docs/tranches/A/VALUEJS-PT-E-2026-07-05.md` | **`ef10d5b`** (`ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42`) |
| **KF-COURTESY** (canonical `resolveEasing` home; no ask) | `@mkbabb/keyframes.js` | `tranche-t-impl` | `docs/tranches/S/VALUEJS-KF-COURTESY-2026-07-05.md` | **`ad1b811`** (`ad1b811f265decc8b2b63ba990e5fc716b3381ca`) |

Both foreign commits are **path-scoped to the single new file** (the constellation foreign-tree fence).
Notes: parse-that carries no inbox convention (tranche A is closed/published at 0.11.0) → the letter
follows the constellation pattern (recipient's latest tranche dir). keyframes.js has advanced past S to
tranche **T** (current branch `tranche-t-impl`, NOT the `tranche-s-impl` the wave prompt named); the
courtesy note lands in `docs/tranches/S/` beside its R-COORDINATION sibling, and the commit rides the
current branch. keyframes' 40 uncommitted `visual-lock` baseline PNGs were left untouched (fence held).

---

## §5 Per-item commit hashes (the S.W1 wave)

| Item | Commit(s) | Subject |
|---|---|---|
| W1-6 (FIRST) | `a26f87e` | `safeAccentCssString` — the W2-2 consume surface lands first |
| W1-1 | `789061a` | srgbToLinear decode cure + gamut.ts DRY twin deletion + dark-band goldens + okhsl reinstatement |
| W1-2 | `b670086` | round() optional-strategy no longer crashes |
| W1-3 | `1f1d351` | extractStyleRules/extractAnimationOptions depth-walk |
| W1-4 | `e3c624f` | fail(message)→mergeErrorState + stylesheet .eof() swap |
| W1-5 | `67ce6fa` | bound the 7 parsing memoize caches |
| W1-6 | `cf196b5` · `647b2e5` · `73bc05e` | sampleOKLChSliceBoundary · resolveEasing · ICtCp (with W1-11) |
| W1-7 | `243cebd` [BREAKING] · `59d1cf5` [BREAKING] · `f576f7d` · `2c9f1d9` · `d292bd5` · `7fa5443` · `cc76c85` · `5900e16` | logerp reorder · color-soa EXCISE · unpackMatrixValues 2D · reverseCSSIterationCount wire · ch-unit null-narrow · flattenObject O(N²)→O(N) · toFixed trailing-zeros · docstring-truth |
| W1-8 | `324da63` · `90847ab` · `9f42d58` · `c1ce2a1` · `e4c3bd4` · `88fce2c` · `ae56386` · `5ec668f` · `517f452` · `d374acf` · `7a1ffc7` · `4dba5f4` | scanner consolidation · STYLE_NAMES lift · dom-metrics lift · layout-cache lift · COLOR_NAMES lift · serialize lift · color class split (base+spaces) · dispatch comment-diet · as-unknown-as ledger hygiene · stylesheet AST-types leaf · color-unit leaf · relative-color leaf |
| W1-10 | `60bb64e` | raytrace gamut map (R-4) — tested against the Ottosson analytical oracle |
| W1-11 | `73bc05e` | Jzazbz perceptual transforms (with W1-6 ICtCp) |
| **Publish** | **`1537fed`** + tag **`v3.0.0`** | 3.0.0 version bump + `@mkbabb/value.js` self-dep excision (W0-9) + CHANGELOG [3.0.0] with the MIGRATION table |

The `as unknown as` count in `src/` holds at **8** (CLAUDE.md's regenerable ledger; the W1-8 lifts were
net-zero, `517f452`). The `logerp` reorder is complete: **zero t-first call sites** in `src/` (the only
`logerp(t,…)` grep hit is the explanatory comment in `math.ts`), **no compat shim** (Q2 FLIP).

---

## §6 Hard-gate roll-up (waves/S.W1.md §Hard gate)

1. 3.0.0 published + tagged; publish note carries the near-black output-change + regoldened=NONE + the
   by-name MIGRATION table (logerp · color-soa · self-dep) — **MET** (§1, CHANGELOG [3.0.0]).
2. vitest green incl. dark-band goldens (hand oracle), non-circular self-inverse roundtrip, reinstated
   okhsl band — **MET** (§1/§2).
3. round() spec-legal (carve-around comment retired) · extract depth-walk · fail()→mergeErrorState — **MET**.
4. All 7 memoize caches bounded — **MET** (`67ce6fa`).
5. W1-6 exports exist + consumed by tests (sampleOKLChSliceBoundary · resolveEasing · safeAccentCssString ·
   ICtCp + color2Into currency) — **MET** (built surface + tests green).
6. W1-10 raytrace agrees with the Ottosson oracle within tolerance; divergences documented — **MET** (`60bb64e`).
7. W1-11 Jzazbz roundtrip goldens + color2Into currency — **MET** (`73bc05e`).
8. logerp reorder, ALL consumers migrated at root (zero t-first), NO compat shim — **MET** (§5).
9. Fresh `.d.ts` guard + post-W1 cap check per the census cohesion verdict (ledger rows recorded, not
   missed — incl. the near-guaranteed `units/utils.ts` + the new `parsing/utils.ts`) — **MET** (§1/§3).
10. PT-E dispatched — **MET** (§4).
11. lint 0 · typecheck 0 · test green · build clean — **MET** (§1).
