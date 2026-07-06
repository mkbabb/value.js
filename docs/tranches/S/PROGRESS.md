# S — PROGRESS

**Status board.** S is **RATIFIED 2026-07-05 — dispatch OPEN.** The owner ruled on all 11
`S.md §12` rows; the encoding of record is `audit/RATIFICATION-2026-07-05.md` (§0 verbatim
owner text wins), with the 14 `audit/seeds/SEEDS.md` riders folded into the wave docs and the
2 producer findings folded into the glass-ui letter (L17/L18). The convergence loop is CLOSED
(4 passes, **100/98·zero-mustFix CONVERGED**, `audit/CONVERGENCE.md`); **zero implementation
commits exist**. The governing specification is `audit/SYNTHESIS.md` (AMENDED-AT-PASS-4 + tail)
as amended BY the ratification encoding + SEEDS riders; where any corpus doc could diverge,
**the spec (as so amended) wins**.

**Dispatch gate: the §12 ratification gate is CLOSED; waves dispatch per the §3.1 DAG** (each
wave gated on its DAG deps only). The GLASSUI-S-ASKS letter dispatches now (at-ratification
timing; the dispatcher re-stamps the verified HEAD).

**Substrate (verified 2026-07-04):**
- Branch `tranche-q` @ `46ff8d3`, value.js **2.0.1** on the registry (2.0.0 `96f124d` tagged;
  2.0.1 = the parse-that `^1.0.0` re-pin, `a7eabcc`). R CLOSED `complete_with_misses` — the
  X1/X2 maintainer-on-host residuals carry as S books (verified/probed at W0-3).
- Siblings: glass-ui `file:`-dep, **`tranche/BG` LIVE → 5.0.0** (CI pinned to `tranche/BG` per
  R.W7 `102b37b`; the producer commits ~every 10 minutes — every live probe cites its HEAD) ·
  keyframes.js 5.1.0 (S-impl in flight) · parse-that **1.0.0** · fourier-analysis at tranche N.
- The synthesis was authored at `b5f94bc`; the corpus is stamped at `46ff8d3` (delta =
  S convergence-loop docs only; zero source drift).

---

## Round structure

```
round 0:  S.W0 substrate (dev truth + oracle floor + hygiene)
round 1:  S.W1 library 3.0.0 ∥ S.W2 transposition
round 2:  S.W3 perf ∥ S.W4 picker+docs
round 3:  S.W5 suffusion II ∥ S.W6 atmosphere+hero
round 4:  S.W7 dock+shell        (⊣ W1 + W3; round barrier after W5 ∥ W6 close)
close:    S.W9
S.W8 (5.0.0 adopt) — trigger-gated on the BG/BH joint cut; slots into whatever round is
current when it fires; NOT on the critical path (books never gates).
```

Intra-round ordering (binding, `S.md §3.1`): W1-6's `safeAccentCssString` FIRST in W1; W2-2 and
W2-7 LAST in W2; single-writer on `ColorPicker.vue` in round 2 (W4-2 first, W3-4 rebases).

---

## Wave status

| Wave | Title | Doc | Round | Status | Publishes |
|---|---|---|---|---|---|
| **S.W0** | SUBSTRATE — dev truth + oracle floor + hygiene (W0-1..W0-9; +W0-8 blob genesis, +W0-9 dep ledger at ratification) | `waves/S.W0.md` | 0 | **CLOSED 2026-07-05 (with-misses)** — 8-row gate 7 PASS + 1 MISS-RECORDED (CI-log deferral) | — |
| **S.W1** | LIBRARY — the 3.0.0 wave (W1-1..W1-11; +W1-10 raytrace, +W1-11 Jzazbz at ratification) | `waves/S.W1.md` | 1 | **CLOSED 2026-07-05** — re-gate **CLOSE** after the honest chain: 3.0.0 published → gate BLOCKED 9/11 (ICtCp/Jzazbz pairs-only vs the claimed full spaces) → remediation completed the full spaces → **3.1.0 published** (`latest`). Artefacts: `audit/w1-close-artefacts.md` (§6 corrected + §7 process blemish) | **3.0.0 + 3.1.0** |
| **S.W2** | ARCHITECTURAL TRANSPOSITION — the spine (W2-1..W2-9) | `waves/S.W2.md` | 1 | **CLOSED 2026-07-05** — 10-row gate ALL PASS after 2 remediation steps (`audit/w2-close-artefacts.md`) | — |
| **S.W3** | PERFORMANCE — budgets as gates (W3-1..W3-9) | `waves/S.W3.md` | 2 | **CLOSED 2026-07-05 (with-misses)** — 6 PASS + 1 MISS-RECORDED (the JS eager gate re-baselined on record → ask L20); CSS gate MET 85.9 ≤ 120 KiB; all frame budgets green; 0 ungated rAF | — |
| **S.W4** | THE INSTRUMENT, REFINED — Fable: picker + docs/About (W4-1..W4-8) | `waves/S.W4.md` | 2 | **CLOSED 2026-07-05** — 8-row gate **CLOSE**, taste bar MET (non-authoring review); π paired archive `audit/pi/w4-{before,after}/`; S-3 letter-rail book FIRED (sanctioned); L18 discharged-by-producer | — |
| **S.W5** | SUFFUSION II — Fable: browse/palettes/extract/mix/generate/gradient/admin (3 lanes) | `waves/S.W5.md` | 3 | **PENDING** (⊣ W1 + W3) | — |
| **S.W6** | ATMOSPHERE + HERO — Fable: aurora + blob (W6-1..W6-6; Q7 full-presence + W0-8 genesis consume) | `waves/S.W6.md` | 3 | **PENDING** (⊣ W2 + round-2 close) | — |
| **S.W7** | DOCK + SHELL — Fable: wax seal + accent system (W7-1..W7-7) | `waves/S.W7.md` | 4 | **PENDING** (⊣ W1 + W3; round barrier after W5 ∥ W6) | — |
| **S.W8** | THE 5.0.0 ADOPT EVENT (+ the GooBlob→`Blob` rename consume) | `waves/S.W8.md` | trigger | **PENDING + TRIGGER-GATED** (the BG/BH joint cut) | — |
| **S.W9** | CLOSE | `waves/S.W9.md` | close | **PENDING** (⊣ W7 + all non-trigger waves) | — |

---

## BOOKS (books, never gates — the full table with triggers + dispositions is `S.md §7`)

Open at tranche start: glass-ui 5.0.0 adopt (→ S.W8) · CI un-pin from `tranche/BG` ·
`srgbToLinear` (FIRES at W1, the 3.0.0 cut) · vue-router 4→5 (FIRED — folds to W2-7) · R-6
ICtCp (folds to W1-6 per Q9; Q9 RATIFIED-WIDENED: +Jzazbz W1-11) · `Color.try()` · K-W3DIFF
(alt-exit decided with Q1 at W5-13) · S.H3 Pratt
(KEEP-DORMANT) · CH-10/CH-13/R8-23/R-5/R-10 (W9 recheck lane) · R-4 (Q8 FLIP 2026-07-05 —
DISCHARGED-BY-RATIFICATION, builds at W1-10) · FN-7 ·
`usePaletteStore` schema (NEW) · S-3 letter-rail (NEW, conditional) · kf `resolveEasing`
convergence (NEW) · **X1 prod-api deploy** (maintainer-on-host; W0-3 verifies) · **X2
NCSU-alias retirement** (maintainer-on-NCSU-VPN; W0-3 probes). Discharged, recorded at W0-4:
parse-that `^1.0.0` re-pin · color2Into currency · D8-1 watch-line.

---

## Cross-repo dispatch points

| Event | When | Status |
|---|---|---|
| **GLASSUI-S-ASKS letter** (L1..L18; L1/L3/L4 P0 — L1 = the WebKit aurora shader compile; hard-gate map L2→W6-2/-3, L4→W7-3, L1→W6-5; ratification fold: L17 `Blob` rename · L18 Select chevron · the L5 co-rebuild upgrade + full-presence constraint + pointer-shaping append) | **at S ratification — NOW DUE** (early — the L1/L2/L4 items need the maximum producer window before rounds 3–4; L12 is time-sensitive: before BH.B4e authors the 203-row MIGRATION table). The dispatcher **re-stamps the verified glass-ui HEAD at dispatch** (the letter carries the literal `<RE-STAMP AT DISPATCH>` placeholder; `a633784f` was the pass-2 stamp; `c03ab942` the pass-3 stamp — the producer moves daily) | **AUTHORED + RATIFICATION-FOLDED** — `letters/GLASSUI-S-ASKS.md`, dispatch-ready |
| **parse-that PT-E letter** (scoped per-parse diagnostics HIGH · combinator-inference MED · Pratt-stays-dormant record) | S.W1, item W1-9 (paired with the value.js-side decision on the dead `expected` field) | **AUTHORED** — `letters/PARSE-THAT-PT-E.md` |
| **kf courtesy note** (canonical `resolveEasing` home; EasingPicker loop seam ↔ kf Oscillator is glass-ui↔kf coordination) | with the W1 3.0.0 cut | **AUTHORED** — `letters/KF-COURTESY.md` |
| fourier | — | nothing new (FN charter delivered at R.W6; CH-13 quiescence book unchanged) |

---

## Event log

| Date | Event |
|---|---|
| 2026-07-04 | 33-lane audit fleet completed against the live tree (`audit/lanes/`, ~4.5M tokens, 1,842 tool calls, 0 errors); all 24 owner findings root-caused |
| 2026-07-04 | **Convergence loop CLOSED** (`46ff8d3`): pass 1 (86/72, 13 mustFix) → pass 2 (95.7/92; `2fe2b48`) → pass 3 (99.5/97; `8e4b1d4`) → pass 4 **100/98·zero-mustFix** + tail dissents discharged (`f3d93c3`). `audit/SYNTHESIS.md` (AMENDED-AT-PASS-4 + tail) is the converged, governing specification; record at `audit/CONVERGENCE.md`. Notable in-loop flips: Q4 → EXCISE; W1-8 widened to the census's full SPLIT-WORTHY set; W3-9 (CSS gate) minted; W5 laned; L1 re-pinned to the verified producer HEAD |
| 2026-07-04 | **Tranche S corpus authored**: `S.md` charter + this board + `waves/S.W0.md`..`waves/S.W9.md` + `letters/{GLASSUI-S-ASKS,PARSE-THAT-PT-E,KF-COURTESY}.md`. **Status: DEVELOPMENT COMPLETE — dispatch gate OPEN awaiting the `S.md §12` owner ratification (Q1–Q11)** |
| 2026-07-04 | **Prototype-seed fleet complete** (`wf_01c28a82-3c2`; 5/5 worktree seeds, batches of 3; the original loop's step 3): `w0-dev-backend` VIABLE · `w2-usecolorpipeline` VIABLE_WITH_AMENDMENTS · `w4-title-component` VIABLE_WITH_AMENDMENTS · `w7-wax-seal` VIABLE · `w6-blob-redress` VIABLE_WITH_AMENDMENTS. 14 ratification-time riders + 2 net-new producer findings (Select chevron dead code; GooBlob pointer shaping → L5) recorded in `audit/seeds/SEEDS.md`; GAP-1 (`uSatColor[]` absent) now dist-confirmed. Prototype code in `audit/seeds/*.patch` only — nothing landed on mainline. **S is DEVELOPED + PROTOTYPED — awaiting the §12 ratification** |
| 2026-07-05 | **S.W0 CLOSED — CLOSE_WITH_MISSES** (independent 8-row hard-gate certification in the amended tree: 7 PASS + 1 MISS-RECORDED, zero FAIL, zero dishonesty). Item commits: W0-1 `12af143` (honest dev-backend) · W0-2 `b339e37` (oracle floor: smoke-safari in CI, hard Lighthouse, shader-compile guard, WebGL appearance asserts) · W0-3/4/5 `a9c5854` (probe records + discharges + doc truth) · W0-6 `36f918d` (dead surfaces grep-zero) · W0-7 `477916b` (router probe → W2-7 code-free bump) · W0-8 `4567a81` (blob-genesis brief, 364 lines) · W0-9 `adab17a` (dep ledger: 11 devDeps excised, zero-consumer-verified; lockfile −2743; the self-dep excision routed to the W1 MIGRATION table). Close verify: lint 0 · typecheck 0 · vitest 1998/1998 · build 0 · gh-pages 0 · playwright 38/38. **The one MISS (row 2, MISS-RECORDED)**: CI-LOG evidence for the oracle floor — `ci.yml` triggers only on master push/PR, so the tranche-q push fires no run; the config is verified correct in-tree and smoke-safari ran GREEN locally; the workflow-log proof lands at the next master-targeting run. Recorded deviation: the readPixels WebGL oracle substituted with per-canvas draw-call counting (rationale in `e2e/smoke/fixtures/webgl-appearance.ts` — preserveDrawingBuffer:false makes readPixels racy). Books X1/X2 re-probed and stay OPEN (prod still I-era + webhook 404; NCSU alias still 200). **Genesis brief RELAYED** into the producer inbox: `../glass-ui/docs/tranches/BG/coordination/VALUEJS-BLOB-GENESIS-2026-07-05.md` @ their `3188171` (tranche/BG, clean first-attempt push) |
| 2026-07-05 | **ROUND 1 OPEN**: S.W1 (the 3.0.0 library cut) ∥ S.W2 (the transposition) dispatched as parallel wave workflows per the §3.1 DAG |
| 2026-07-05 | **S.W3 CLOSED (with-misses) — ROUND 2 COMPLETE.** 7-row gate: 6 PASS + 1 MISS-RECORDED, zero FAIL (the S.W0 precedent shape). The budgets, measured on the built bundle: slider-drag p50 **8.4ms** (≤20, was 49.8) · view-switch first frame **8.3ms** (≤100, was 254.7) · idle p50 **8.3ms** (≤13) · 0 long tasks · **render-blocking CSS 85.9 KiB — gate MET** (≤120, was 184.2; W3-9 `7c3c597` deferred the glass-ui font corpus off critical) · 0 un-gated idle rAF (W3-1 coalesce `95b5c75`/`dabe19a` + W3-3 idle-gate N=2000ms with a positive/negative-control spec) · mix = ONE clock, 900ms, Safari-true by construction (W3-6 `5c700fe` "the drops walk to the well" — Q10) · π before/after motion archives both halves (webm + manifests; `audit/pi/w3-{before,after}/`). **The one MISS (row 2, on-record re-baseline per §Triumvirate)**: the JS eager ≤280 KiB gate is UNREACHABLE in-bounds — 346.4 KiB measured; the vendor chunk (32%) is the prohibited lever and the blob config atoms drag the engine into the eager graph via the barrel; census §5/§9/§10 own the arithmetic; producer ask **L20 (goo-blob/config subpath) DISPATCHED** (addendum A5 → glass-ui `60fe642a`); gap-row re-verifies at W8. New standing oracle: the `smoke-perf` project (3 frame-budget specs, e2e now 48/48 across 6 projects). W3-7 mechanism decision recorded (`18dcf44` → W7-4 consumes); W3-8 RAF/PRM discipline (`7819526`). Suites at close: lint 0 · typecheck 0 · vitest 2126/2126 |
| 2026-07-05 | **Two owner rulings + card-lighting forensics folded into round 3** (mid-round-2). (1) Card-width ruling LANDED (`52c5fd4`: `--pane-max` 44→32rem chosen by eye — 30rem strangled the About Components labels; all 8 spaces' readout locks verified; record `audit/OWNER-RULING-2026-07-05-card-width.md` §2). (2) Aurora ruling ENCODED (`audit/OWNER-RULING-2026-07-05-aurora.md`): entrance no-snap clause → W6-1 rider · strong-field + greater C/H variance → W6-3 amplification · pointer interactability → NEW **W6-7** (+ L19). (3) Forensics (`audit/card-lighting-forensics-2026-07-05.md` @ `2b9bdd9`, owner's 20:33 screenshot): the in-card "light source" = glass-ui's BD field-floor orphan fallback (amber radials + screen blend, NO dark arm) firing because the demo mounts no `data-paper-field` — demo half → NEW **W6-8**, producer half → addendum A1 (their F2.R1); the About dark band = demo PaneHeader sticky surface → W5-2 rider (scroll-gated alpha + feather); label contrast (hot zone 2.61:1) largely cured by A1/W6-8, residuals routed (alpha rung → A2; title ink → W7-3 cross-ref); corner aliasing = fractional-pixel centering + stamp arc + Chromium backdrop-clip AA floor → W5-10 rider (integer-snap). Bisect: ALL artifacts predate today (producer `cf149cff`, 06-24); today's landings + the CSS diet EXONERATED. **ADDENDUM DISPATCHED** → glass-ui `f2ab4a18` (A1 field-floor dark arm · A2 alpha rung · A3 = L2 owner-amplification · A4 = NEW L19 aurora pointer door; stamped at their `a5844ea0`) |
| 2026-07-05 | **S.W4 CLOSED — 8-row gate CLOSE, taste bar MET** (independent non-authoring Fable review: "the title lands… an instrument's catalog rather than a menu"). The flagship W4-1 title-as-component landed with the full four-state ink grammar verified live (rest/hover/focus-visible/open — zero surface re-growth); W4-2 header re-composition (Lab inks ONE line at 1440, readout spans the full header); W4-3 thumb ink; **W4-5 = the sanctioned BOOKED path** (verify-first proved SegmentedTabs' sliding pill cannot yield to the WatercolorDot ring → the S-3 letter-rail book FIRED, record `38d83e4`); W4-4 extractor = real TS parse + build-failing prettier guard + 30/30 per-page snippet goldens; W4-6 math pipeline (hijack dead, htmlAndMathml + self-hosted KaTeX fonts, WebKit-verified); W4-7 PaneHeader font-display ×9 (Q5); W4-8 one hljs theme + one dark store + the one-accent heading ladder. **Seed rider 1 DISCHARGED-BY-PRODUCER**: glass-ui shipped the SelectTrigger caret rotation (L18 answered) — the demo carries no consumer utility. π paired archive + DELTA at `audit/pi/w4-{before,after}/` (close `b8c6f8d`). Suites at close: lint 0 · typecheck 0 · vitest 2126/2126 (66 files) · e2e green. Residue noted for a later sweep: useContrastSafeColor's two private useDark instances (fold onto useGlobalDark); the owner card-width ruling (`52c5fd4`, 32rem) landed mid-wave and the π-close archive reflects the NEW geometry |
| 2026-07-05 | **S.W1 CLOSED — re-gate CLOSE; ROUND 1 COMPLETE** (`audit/w1-close-artefacts.md` = the close authority, §6 corrected). The chain, honestly: **3.0.0 published** (`1537fed`, tag `v3.0.0` immutable, by-name MIGRATION table: logerp `(a,b,t)` · color-soa removed · the W0-9 self-dep excision) → the independent 11-row gate returned **BLOCKED 9/11** — ICtCp/Jzazbz had shipped as conversion pairs only (superbly oracled: IEC/culori/perceptual_oracle.py, self-inverse ≤1e-11) while the CHANGELOG/tag/close-artefacts claimed full spaces; the publish lane had certified rows it never verified (§7 blemish: a MET on an integration row must cite a test driving the INTEGRATED surface) → remediation `964c399`: `ICtCpColor`/`JzazbzColor` subclasses + ColorSpaceMap + parsing (bare `ictcp()`/`jzazbz()`) + `color2()` arms + `color2Into` currency + the demo `DisplayColorSpace` metadata rows (recorded narrow bounds expansion; the spaces JOIN the picker, OKHSL precedent) + CHANGELOG [3.0.0] CORRECTED in-place → **3.1.0 published** (`latest=3.1.0`, tag `v3.1.0`; v3.0.0 never moved) → re-gate **CLOSE** (16/16 HDR-space integration tests; vitest 2096/2096; lint/typecheck 0; fresh build + .d.ts guard green). The rest of the wave certified at the first gate: srgb dark-band cure (independent hand-computed oracle, okhsl band reinstated), parsing P0s, 7 caches bounded, logerp zero t-first sites repo-wide, W1-8 lifts + LAST leaf-lifts (cap-check ledger rows recorded incl. `units/utils.ts` by construction), raytrace vs analytical ≤4.05e-4 over 7,551 OOG colors. Dispatches: PT-E → parse-that `ef10d5b` · KF-COURTESY → keyframes `ad1b811` |
| 2026-07-05 | **S.W2 CLOSED — all 10 gate rows PASS** (`audit/w2-close-artefacts.md` = the close authority). The spine landed: `useColorPipeline` (ONE model — useColorModel/useAppColorModel DELETED; stableHue bit-for-bit; URL-hash-wins DECLARED + the rider-3 localStorage restore ADDED, proven by the new standing `url-color-precedence` e2e) · `useApiClient` DI seam (0 direct `apiAvailability` imports) · W2-8 `Services`-in sweep (0 `Context` under services/; api 224/224) · W2-5/6/9 hygiene · W2-2 accent onto W1-6's `safeAccentCssString` (cross-wave law honored) · W2-7 vue-router `^5.1.0` code-free (K-W5RT LANDED). W2-3 brand DECLINED-mechanical → re-booked src-owned post-W1 (`audit/w2-3-brand-decision.md`). Gate chain: BLOCKED (3 FAILs + the pre-existing BlobPane producer-drift blocker) → remediation ×5 commits → 9 PASS + row-6 416-LoC regression → persistence lift `99dcb5e` (341+121) → ALL PASS. Suites at close: typecheck 0 · lint 0 · vitest 2080/2080 · api tsc 0 · api 224/224 · URL e2e 2/2 |
| 2026-07-05 | **S.W1 CLOSED — 3.0.0 PUBLISHED** (`dist-tags.latest=3.0.0`, annotated tag `v3.0.0`, publish head `1537fed`). The one honest library major of round 1: the near-black `srgbToLinear` decode cure (output-changing ≤10/255 only; n=1/255 XYZ.Y 9.837e-4→3.035e-4; regoldened fixtures NONE) · two public-API breaks (`logerp` t-last reorder + `color-soa.ts` excise, no shims) · the W0-9 `@mkbabb/value.js` self-dep excision (dependencies 2→1) — all three on the by-name MIGRATION table (`CHANGELOG.md [3.0.0]`). Additive slate: ICtCp + Jzazbz spaces (Q9 + widening) · raytrace gamut map (R-4, Ottosson-analytical oracle) · sampleOKLChSliceBoundary · resolveEasing · safeAccentCssString · the parsing P0s (round() crash, extract depth-walk, fail→mergeErrorState, 7 memoize-cache bounds) · the god-module round (`color/index.ts` 968→71 barrel; `constants.ts` 799→165; +10 lifts). 11-row hard gate ALL MET; verify lint 0 · typecheck 0 · vitest 2080/2080 · fresh build + `.d.ts` guard (66, flat) · gh-pages clean · playwright 42/42 (incl. smoke-safari/WebKit). Cap-check: 4 recorded ledger rows (`stylesheet.ts` 643 + `color.ts` 696 decompose-stopped-short · `units/utils.ts` 601 near-guaranteed-by-construction · `parsing/utils.ts` 603 new-cohesive-over-cap via the scanner-consolidation DRY win). Cross-repo dispatched: PT-E → parse-that `master` `ef10d5b` · KF-COURTESY → keyframes.js `tranche-t-impl` `ad1b811`. Full record: `audit/w1-close-artefacts.md`. **ROUND 1 CLOSED** (W1 ∥ W2 both done) — round 2 (W3 ∥ W4) unblocked |
| 2026-07-05 | **OWNER RATIFICATION — the §12 gate CLOSES; dispatch OPEN** (encoding of record: `audit/RATIFICATION-2026-07-05.md`; §0 verbatim owner text wins). All 11 rows ruled: 6 defaults ratified as speced (Q1 WIRE-full-idiomatic · Q3 EXCISE-broadened · Q4 EXCISE · Q5 YES · Q6 TRUE-EMPTY-only · Q11 YES-in-S), **5 flips/amplifications by name**: **Q2** (`logerp` reorder lands W1 NOW, no shim → **the W1 cut becomes 3.0.0**, cascaded corpus-wide by name; the §13 "breaking-changes-always → cut the major" standing precept minted) · **Q7** (blob FULL PRESENCE at every viewport + the W0-8 SOTA-assay/archaeology genesis brief + the GooBlob→`Blob` producer rename, letter L17/W8 adopt) · **Q8** (R-4 raytrace builds NOW at W1-10, Ottosson analytical as oracle — book DISCHARGED) · **Q9** (widened: +Jzazbz at W1-11) · **Q10** (mix animation re-graded to first-principles REPLACE — Safari-true by construction, NO fallback). The 14 SEEDS.md riders folded into W0-1/W2-1/W4-1/W6-4/W7-1+gate; the 2 producer findings → letter L18 + the L5 append; W0-9 dependency-excision ledger added (§2.4). Wave statuses PENDING-RATIFICATION → PENDING (DAG-gated only) |
