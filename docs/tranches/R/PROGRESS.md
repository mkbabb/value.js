# R — PROGRESS

**Status board.** R is in **DEVELOPMENT** — the convergence loop is CLOSED (pass-3 CONVERGED
100/100, `audit/pass2/PASS3-VERDICT.md`), the charter + wave docs are authored, and **all waves
are PLANNED** with zero implementation commits.

**Dispatch gate: OPEN.** Wave execution dispatches on **owner ratification of the 8 open Q rows**
(`R.md` §12 / PASS3-VERDICT §3 — Q1, Q2, Q4, Q7, Q8, Q10, Q11, Q12, each speced at its
recommended default, "ratify or flip"). Only **Q7** gates library *output* (the 2.0.0
`GAMUT_ALPHA`); Q11/Q12 gate R.W3/R.W4 details; the rest are posture/scheduling. A ~4-minute
pass over 8 rows unblocks everything.

**Substrate (verified 2026-07-02):**
- Branch `tranche-q` @ `e80b359`, value.js **1.2.0**. Master-merge debt: 3 commits
  (`23d1a91`/`fd3c7ce`/`e80b359`); tag gap: 10 published-but-untagged versions (R.W0 heals both).
- Siblings: glass-ui 4.2.0 `file:`-dep (**BG executing → 5.0.0**; the D8-1 `layer(components)`
  ask is already dispatched to it) · keyframes.js 5.1.0 · parse-that 0.13.0 · fourier-analysis at
  tranche M (next letter N — the FN charter paired-authors at R.W6).
- The ratified specification: `audit/pass2/SYNTHESIS-v2.md` (amended at pass 3; self-contained).

---

## Round structure

```
round 0:  R.W0
round 1:  R.W1 ∥ R.W2 ∥ R.W6
round 2:  R.W3            (requires W1 + W2)
round 3:  R.W4 ∥ R.W5     (W5 slippable to S per Q1)
round 4:  R.W7            (requires W4 + W6, + W5 if not slipped)
```

The one external edge — the D8-1 no-shim render bar — is a BOOK riding an already-dispatched ask,
never a gate. R.W6 and R.W7 gate on nothing outside this repo.

---

## Wave status

| Wave | Title | Doc | Round | Status | Publishes |
|---|---|---|---|---|---|
| **R.W0** | SUBSTRATE — hygiene + truth (W0-1..W0-14) | `waves/R.W0.md` | 0 | **PLANNED** | — |
| **R.W1** | GAMUT + PERCEPTUAL — U10 head (Q7), KF-1 **5-file**, boundary API, presets, OKHSL/OKHSV, ΔE, K-DISP | `waves/R.W1.md` | 1 | **PLANNED** | **2.0.0** |
| **R.W2** | FUNCTIONAL TRUTH — boot cure, Tabs→SegmentedTabs, N.W10 rows, PRM, kill-list | `waves/R.W2.md` | 1 | **PLANNED** | — |
| **R.W3** | THE INSTRUMENT — picker keystone; spec = amended `color-picker.md` | `waves/R.W3.md` | 2 | **PLANNED** | — |
| **R.W4** | SUFFUSION — cards + shell + panes; `/easing` consume; Parse-Lab-as-input | `waves/R.W4.md` | 3 | **PLANNED** | — |
| **R.W5** | OBSERVATORY — hero-lab (slippable to S per Q1) | `waves/R.W5.md` | 3 | **PLANNED** | — |
| **R.W6** | TWIN-TIE — 5 inline fixture rows, contract-currency invariant, FN-1..7 | `waves/R.W6.md` | 1 | **PLANNED** | — |
| **R.W7** | WIRE + CLOSE — X1/X3 deploy, relay letter, FINAL.md, merge + tag | `waves/R.W7.md` | 4 | **PLANNED** | — |

---

## BOOKS (books, never gates — no wave gate reads this table)

| Book | Trigger | Status |
|---|---|---|
| D8-1 no-shim verify | glass-ui rebuilds dist with `layer(components)` (ask dispatched to the live BG agent at pass-2 time) | **ARMED** — short window, BG live |
| glass-ui 5.0.0 adopt event (goo-blob→blob · GAP-3 subpath table +`/easing`+`/tabs` · uSatColor GAP-1 · U6 dock-fission verify · GAP-4 blob perf · aurora-metal) | the BG/BH joint cut | WAITING |
| parse-that `^1.0.0` re-pin | kf S.H2 publishes the 1.0.0 cut | WAITING (do not pre-pin) |
| vue-router 4→5 (K-W5RT) | stable vue-router 5 | WAITING |
| S.H3 Pratt consume-edge | parse-that presents the sketch | WAITING |
| CH-10 / CH-13 / R8-23 spec-gated grammar longhands | as previously recorded | WAITING |
| fourier FN-7 doc-relocation co-decision + CONSTELLATION.md pointer | fourier-N execution | WAITING (de-urgented by the R.W6 in-tree contract-of-record note) |

---

## Verified-facts ledger (the evidence the waves consume; all under `audit/pass2/`)

| Fact | Packet |
|---|---|
| Gamut α-tune wins on the 164-color corpus; hue 0.000° mean AND max; α=1.0 worst-case ΔL **0.083** authored-super-gamut / **0.050** realistic (tiered bound; "<0.05" gate missed → Q7 two-option call); MINDE rejected (34.7° drift, ≈6.5×; survives as test oracle); gamut-relative killed as mechanism | `gamut-bound.md` |
| Boot cure (exports-map-driven anchored-regex aliases) proven across all 4 vite modes; production dist **byte-identical** (71 files hashed); dev-config-only; the alias's true job = overriding the stale registry self-install @1.0.2 | `boot-blast-radius.md` + `seeds/vite-config-boot-cure.patch`, `seeds/vite.config.cured.ts` |
| **Tabs drift P0**: glass-ui 4.2.0 exports no compound `Tabs` family; `demo/@/components/ui/tabs/index.ts:1` dead-imports it; 10 demo consumers; gh-pages + hero-lab die at LINK; reka-ui-direct fallback proven green | `boot-blast-radius.md` §4 |
| KF-1 fix prototyped green (7 adversarial vectors; serializer mirror); head re-run at `e80b359`: clean baseline 1934/51 files, patched 1939 passed / **1 failed** / 1940 — the failure is `test/parsing-extract-functions.test.ts:36` (head-only P-era test) → **the KF-1 change is 5-file** (`seeds/kf1.patch` + that assertion sweep) | `kf1-grammar.md` (amended) + PASS3-VERDICT §1 |
| `extractFunctions` "absent from source" **REFUTED** (stale-worktree artifact): in source since 1.1.0 `23d1a91` at `src/parsing/extract.ts:124`, barrels `src/index.ts:291` + `src/subpaths/parsing.ts:47` — only a fresh-build `.d.ts` guard is owed | `kf1-grammar.md` (amended) / SYNTHESIS-v2 §0.2 |
| Easing: **zero names drop** — `EasingPicker`'s catalogue IS `bezierPresets` (23/24 verbatim; `smooth-step-3` exactly `cubic-bezier(⅓,0,⅔,1)`); numeric substitution quantified (15/24), preset tightening drives it sub-JND (worst 0.1923→0.0387) | `easing-disposition.md` |
| Boundary API packet verbatim: `sampleGamutBoundary`/`Into`, 4 types, perf contract (mean 0.20–0.25 ms at 96/jnd/p3, ceiling 0.5 ms, Into = 0 alloc/call); goldens regenerate post-α then lock at 1e-3 | `boundary-api.md` |
| Overlay geometry/perf: ΔE>JND locus (literal-sRGB contour vacuous); threshold detent re-spec; top-edge clip fractions red 74.7% / magenta 82.7% / yellow 21.9% / blue 0.0%; 2D canvas path; ≈0.3 ms/frame (~7× inside budget) | `overlay-amendment.md` (P1–P10, merges into `color-picker.md` at R.W0 W0-1) |
| Q9 decisive fact: value.js api conformance suite has **zero cross-repo filesystem reads**; fixture = inline rows in `diff.test.ts`; D8-1 dispatched to BG at pass-2 time; producer sites `vite.style-assets.ts:307/:366` | `dispatch-homes.md` |
| R.W0 inventory authoritative: retro-tags ×10 with pinned publish commits; keyframes devDep **NOT phantom** (glass-ui peer provision; kf dist consumes `/math`); P/Q tranche dirs **do not exist**; master-merge debt 3 commits | `w0-truth.md` |
| W0-14 status: the **hoist half is DONE at pass 3** (the 3 worktree lane reports live in `audit/pass2/`); the seeds are **preserved** (`seeds/kf1.patch`, `seeds/vite-config-boot-cure.patch`, `seeds/vite.config.cured.ts`) — the R.W0 residue is worktree cleanup only | PASS3-VERDICT §2 + `seeds/` |

---

## Cross-repo dispatch points

| Event | When | Status |
|---|---|---|
| D8-1 `layer(components)` ask → glass-ui BG | pass-2 time (early dispatch) | **SENT** — verify at consume |
| kf KF-1 re-pin letter (delete `normalizeParam`/`NormalizedParam`/`VJS_PARAM_BUG_MAX`; read `.name`/`.syntax`/`.default`; re-pin `^2.0.0`) + glass-ui peer-floor note (`^1.0.0`→`^2.0.0`) | R.W1, inside the 2.0.0 cut | PENDING |
| fourier FN-1..FN-7 charter, paired-authored into `fourier-analysis/docs/tranches/N/` | R.W6 | PENDING |
| glass-ui relay letter (GAP-1..GAP-5 + peer-floor + `/easing` contract; D8-1 rides as verify-at-consume) | R.W7 (or earlier if the 5.0.0 cut approaches) | PENDING |

---

## Event log

| Date | Event |
|---|---|
| 2026-07-02 | Pass-3 certification: **CONVERGED 100/100** (trajectory 87.8/84 → 93.2/88 → 100/100); `SYNTHESIS-v2.md` amended-at-pass-3 is the ratified-ready spec; worktree reports hoisted + seeds preserved |
| 2026-07-02 | Tranche R corpus authored: `R.md` charter + this board + `waves/R.W0.md`..`waves/R.W7.md`; **dispatch gate OPEN** awaiting the 8-row owner ratification |
