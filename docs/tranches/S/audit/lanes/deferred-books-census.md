# Tranche S — the chronically-deferred + books census (fold-in audit)

**Lane:** deferred-books-census · **Mode:** AUDIT-ONLY (tranche development, zero product/doc edits
outside this file) · **Date:** 2026-07-04 · **Repo:** value.js @ `c5aa091`→HEAD `102b37b` (branch
`tranche-q`; other S lanes are committing audit docs concurrently — this lane made none).

**Method:** walked `docs/tranches/R/FINAL.md §5` (books table), `R/PROGRESS.md` BOOKS table, `R.md
§3.3`/`§4` (booked cross-repo events + library defers), the source ledger `R/audit/pass1/R8-DEFERRED.md`
(R8-1..24, the chronic census R itself consumed), `N/FINAL.md` (N.W10–W18 fold-forward pointer), and
grepped `docs/tranches/{A..Q}/FINAL.md` for BOOK/DEFER/WAITING/successor rows. Every claim below is
re-verified against the LIVE tree (git log/tags, `npm view`, source greps, sibling repos read-only) —
this is a re-audit, not a transcription.

**Headline finding (read first):** three books the R ledger marked `WAITING`/`OPEN` have **already
fired and discharged since R-close**, undetected by the standing record until now: the **parse-that
`^1.0.0` re-pin** (value.js is at **2.0.1**, dependency-only patch, `a7eabcc`), the **color2Into
currency** row riding the same event (kf's fold-row-46 closed without its exit), and — the one nobody
had flagged yet — **vue-router 5 has been stable on the npm `latest` tag since 2026-05-28** (now
5.1.0), so **K-W5RT's trigger fired over five weeks ago** and the demo is still pinned `^4.6.4`.

---

## 1 · Discharged books (verify-closed; retire from the S table)

| Book | R-record status | Live-verified status TODAY | Verdict |
|---|---|---|---|
| **parse-that `^1.0.0` re-pin** | `R/FINAL.md §5`: "WAITING (do not pre-pin)" | **FIRED + DISCHARGED.** `../parse-that` @ `7eab78c` = v1.0.0 (S.H1 packrat-arm `934b2fa`, S.H2 span-cut+chain-fix `043c4d1`, S.H4 cut `7eab78c`, all committed). value.js `package.json:110` already reads `"@mkbabb/parse-that": "^1.0.0"`, landed at commit `a7eabcc` ("2.0.1: the booked parse-that ^1.0.0 re-pin … kf-executed per the book"), hand-back letter at `docs/tranches/R/letters/KF-EXECUTED-THE-REPIN-2.0.1.md`. Widened verify (span-absence 0, `chainError` 0-caller, the 4 `.chain()` sites, 58 files/1998 tests, tsc/build/css-parity) all green per the letter — independently re-confirmed by the `parse-that-audit.md` lane (175/175 subset PASS). | **FOLD** — retire the row; record as CLOSED in S's own ledger. No further S work; **PT-E** (a forward 1.1.0+ ask letter for scoped diagnostics) is the only live descendant, tracked in `parse-that-audit.md §4`, not this book. |
| **color2Into currency (through the re-pin)** | `R/PROGRESS.md`/`R.md §3.3`: "keep green through the re-pin so kf's row-46 gate closes" | **DISCHARGED.** kf's own record (`keyframes.js/docs/tranches/S/PROGRESS.md:202,343-344`) confirms fold-row-46 closed at the S.H4 re-pin without firing its named exit — value.js's suite stayed green through 2.0.1 (verified above). | **FOLD** — closed-by-event; no S action. |
| **D8-1 no-shim verify** | `R/FINAL.md §5`: RETIRED 2026-07-03, but flagged a **watch line**: `dist/styles/deferred.css:34` still bare at close-day re-check | **FULLY CURED.** Both sites now carry `layer(components)`: `glass-ui/dist/styles/index.css:266` ✓ and `glass-ui/dist/styles/deferred.css:34` ✓ (cured `67dedcf1`, per `glassui-bg-bh-assay.md §1e`). | **FOLD** — the watch-line closes; no reopen. Zero S action. |

**Dependency edge**: all three fired off the *same* external event (kf's Tranche-S H1/H2/H4 cut,
executed same-day under owner-granted publish authorization while value.js's own S tranche was
mid-development) — a single trigger discharged a 3-row cluster. This is the pattern the "books, never
gates" mechanism is supposed to produce; it worked exactly as designed, but the **discharge itself was
never folded back into a live value.js record until this pass** — `R/FINAL.md §5` and `R/PROGRESS.md`
both still read the pre-discharge wording as of this audit's start. **Recommend:** S's own open-books
table supersede R's rather than patching R's closed record (R is closed; do not edit tranche history).

**Ancillary finding (not a book, surfaced by the same investigation) — CHANGELOG has no `[2.0.0]`
entry.** `CHANGELOG.md:3` jumps `## [2.0.1] …` straight to `## [1.2.0] …` (line 22) — the R.W1 2.0.0
publish itself was never given a changelog entry; the 2.0.1 hand-back letter explicitly notes "2.0.0's
own entry remains yours to author — the R corpus is its record; not touched." **ROOT-ROUTING: value.js
demo-adjacent docs (repo root, not `demo/`).** **Candidate S wave-item:** author the missing `[2.0.0]`
CHANGELOG entry (content already exists verbatim in `R/FINAL.md §6`/`R.W1` close entry — a transcription,
not new writing). P2, cosmetic-but-real gap in a document users read.

---

## 2 · The one live surprise — vue-router 5 is stable and unactioned (K-W5RT)

| Field | Value |
|---|---|
| R-record | `R/FINAL.md §5` / `R.md §3.3`: "vue-router 4→5 (K-W5RT) — trigger: stable vue-router 5 — WAITING" |
| Provenance / age | First filed K.W5 (`K/K.md`), carried M→N.W16(died)→R8-12(chronic-6)→R §3.3 unfired. **Age ≈ 8 tranches.** |
| **Live-verified trigger state** | **FIRED.** `npm view vue-router dist-tags` → `latest: "5.1.0"`. `npm view vue-router time` → `5.0.0` GA well before 5.1.0 (2026-05-28). This is **stable-and-current**, not a beta: the `beta` dist-tag still points at `5.0.0-beta.2` (a stale tag left behind), while `latest` has moved through `5.0.0 → 5.0.7 → 5.1.0`. |
| value.js state | `demo/package.json:167` → `"vue-router": "^4.6.4"` — unchanged since before R. |
| **Verdict** | **FOLD — the trigger fired ~5 weeks before this audit and nobody noticed.** This is the census's one real "imminent, should act" finding: not urgent-breaking (4.6.4 keeps working), but the book's own condition is now unambiguously met and it has sat past its trigger for over a month while R closed around it. |
| Dependency edges | None discovered against value.js's own router usage in a quick surface scan (`demo/@/router` or equivalent) — a real migration-scope estimate (breaking-change surface: typed routes, data-loader API, memory-history changes in vue-router 5) was **not** done in this pass and should be the S wave-item's first task, not assumed trivial. |
| **Candidate S wave-item** | `S.W-ROUTER-5-MIGRATE` — scope the 4→5 breaking-change surface against value.js's actual router usage (route defs, `useRoute`/`useRouter` call sites, any `RouteLocationNormalized` typing), then migrate. **P1** given the trigger is fired, not merely booked. |

---

## 3 · Still-correctly-booked (trigger not fired; keep on the S table verbatim)

| Book | Trigger | Verified state TODAY | Verdict |
|---|---|---|---|
| **glass-ui 5.0.0 adopt event** (goo-blob→blob · GAP-3 17-specifier table · uSatColor GAP-1 · U6 dock-fission verify · GAP-4 blob perf · aurora-metal) | the BG/BH joint cut | glass-ui `../glass-ui` @ `a633784f`, branch `tranche/BG`, **package.json still 4.2.0**; `origin/master` stays 4.2.0-era (`6afe14c5`). The cut is **not yet made** — BG is mid dual-engine paint-verification (`c0176542`/`dba0ddb4`). **Exhaustively re-mapped** by the sibling lane `glassui-bg-bh-assay.md` (176 lines, per-surface routing table) — defer to it rather than duplicating. | **KEEP-BOOKED**, trigger imminent-but-not-fired. Dependency edges: S-2/S-16/S-17 (slider/input/hover) · S-3/S-8 (dock-fission rail + collapsed-circle) · S-4 (blob satellites, `F9.R1` now NAMED-OWNER) · S-15 (edge aliasing, `BG.W-CORNER-ALIAS-KILL` already landed `3fcad1a0`) · S-20 (Card cartoon axis) all ride this one trigger — see that lane's §0 routing table for the full fan-out. |
| **EasingPicker preset SelectTrigger a11y defect** | producer fix; relay item 8, ACCEPTED, folded onto `BG.W-DESHADCN` | Not yet landed in glass-ui `dist/` (still reads `combobox: linear`, value-only). | **KEEP-BOOKED**, rides the same 5.0.0 cut above — not a separate trigger. |
| **`srgbToLinear` decode-threshold defect** | next library minor/major (output-changing) | **CONFIRMED STILL LIVE**, byte-identical to the R-discovery: `src/units/color/conversions/transfer.ts:30` and the **inline duplicate** `src/units/color/gamut.ts:33-45` both branch `if (abs <= SRGB_LINEAR_TRANSITION)` (0.003131) instead of `SRGB_TRANSITION` (0.04045) on ENCODED input — a decode-EOTF applied at the wrong (linear-space) threshold. value.js has shipped only 2.0.1 (a **dependency-only patch**, not a minor/major) since R-close, so the trigger has genuinely **not** fired. | **KEEP-BOOKED** — but do not wait passively: **dependency edge to the `lib-color-audit.md` lane**, which independently found the identical defect (its §"srgbToLinear decode-threshold defect", P1) *and* the DRY violation (gamut.ts's inline copy) *and* proposed the exact 1-line fix + de-dup. **Recommend the S wave-item that ships the NEXT minor bundle this fix with the gamut.ts de-dup in the SAME commit** (same root file family, same reviewer context, avoids a second output-changing minor just for the DRY half). |
| **`Color.try()`** | demand for a non-throwing parse (no hard external trigger — internally demand-gated) | No `Color.try()`/non-throwing surface exists (`src/parsing/color.ts` exports only the throwing `parseCSSColor`, memoized). **Demand signal present but soft**: 11 files under `demo/@` wrap color-adjacent parses in `try {}` (grep), one confirmed direct call (`useCustomColorNames.ts:33`). Not conclusive — those call sites may be guarding user-input edge cases generically, not specifically asking for a non-throwing API. | **KEEP-BOOKED** as recorded; note the soft demand signal for whoever next revisits it, but it does not clear the bar to FOLD on its own (per R's own "books never fire on vibes" discipline). |
| **K-INV5 typed degraded-backend affordance** (residual) | R.W3 dispatch — design-on-working-substrate | Functional kernel (`ApiUnavailable` latch) landed R.W3 `c4eb9d2`, discharged per R.W2 triumvirate. The *design* residual (the affordance's visual/copy polish) — checked against **S-11** ("the palette API seems broken against local dev") in the live findings ledger: this may be the SAME surface resurfacing. **Cross-reference `api-broken-rootcause.md` and `design-browse-palettes.md`** — do not treat S-11 as a fresh finding without first checking whether it's K-INV5's residual recurring. | **KEEP-BOOKED**, but flag the **possible collision with S-11** as a dependency edge for whichever lane owns S-11's root-cause. |
| **K-W3DIFF PaletteDiff render** | first demo version-compare/remix-review surface | **CONFIRMED still absent** — no `PaletteDiff` component anywhere in `demo/@`; `api/src/services/palette/forks.ts` computes+persists `atomDiff` but zero demo consumer renders it (still write-only, per the R record). | **KEEP-BOOKED** verbatim. Alt-exit (stop persisting `atomDiff` api-side) remains on the table if no consumer surface materializes by S+1. |
| **vue-router successor**: already covered above (§2) — moved out of this table. | | | |
| **S.H3 Pratt consume-edge** | parse-that presents the sketch | parse-that 1.0.0 shipped WITHOUT a Pratt/binding-power combinator; the `parse-that-audit.md` lane independently re-confirms this book is **correctly dormant** — value.js's `calc()` 2-tier fold (`math.ts:48-98`) is "tiny duplication, does not clear a KISS/DRY bar" even if offered today. | **KEEP-BOOKED**, and actively **do not pull forward** per the sibling lane's explicit recommendation. |
| **CH-10** keyframes precept-pin convergence | maintainer-signal | No maintainer-signal event found in either repo's live tree; keyframes @ `63ac644` (tranche-s-impl) has no precept-pin commit referencing this. Age now **≈9 tranches** (K→...→R, per `R8-DEFERRED.md §1.F` R8-20). | **KEEP-BOOKED**, chronic but genuinely trigger-gated (not a value.js-actionable item). |
| **CH-13** fourier Phase-0 quiescence | fourier-owned | fourier-analysis @ `cd26c65`, still **tranche N**, actively developing (4 commits ahead of the value.js 2.0.0 peer-floor note) — nowhere near quiescent. Age **≈7 tranches** (`R8-DEFERRED.md` R8-21). | **KEEP-BOOKED**, fourier-owned, no value.js action possible. |
| **R8-23 / CH-10-adjacent: `@scroll-timeline`/`@view-timeline` longhands** | spec-tier gate (Baseline stabilization) | Not independently re-verified via live spec lookup in this pass (would require WebFetch/WebSearch, not exercised — repo evidence only shows no code movement: grep for `scroll-timeline`/`view-timeline` in `src/parsing/` finds no partial/gated implementation to check against). | **KEEP-BOOKED** as recorded; **recommend a follow-up lane specifically re-check Baseline/CSSWG status** before S closes, since "R-10 `if()`/`random()` … gate on Baseline ~late-2026" is a TIME-BOUND claim and today is 2026-07-04 — roughly the midpoint of that window, worth a fresh spec-status check rather than carrying the stale "~late-2026" guess forward untouched. |
| **FN-7** fourier doc-relocation co-decision + CONSTELLATION.md pointer | fourier-N execution | fourier still tranche N (see CH-13 above); the in-tree contract-of-record note (R.W6) holds the binding in the interim per the record. | **KEEP-BOOKED**, de-urgented as recorded. |

---

## 4 · Library defers (R.md §4) — re-verified, two now technically unblocked

| Item | R's recorded gate | Live-verified state | Verdict |
|---|---|---|---|
| **R-4 raytrace N-gamut map** | depends on "R-1" (the U10/Q7 gamut-α policy) settling | **R-1 IS settled** — `GAMUT_ALPHA = 1.0` RATIFIED + shipped 2.0.0 (Q7). The raytrace map's stated *blocking* dependency is cleared. | **KEEP-BOOKED but flag UNBLOCKED** — no longer has an open prerequisite; it remains deferred only for lack of demand/ratification, not a technical gate. Worth a one-line ratification ask at S-open rather than carrying silently. |
| **R-6 Jzazbz/ICtCp spaces** | "after ΔE-ITP shares the math" | **ΔE-ITP SHIPPED** at R.W1/2.0.0 — `src/units/color/difference.ts:143` `xyzToICtCp()` exists (internal, feeds `deltaEITP` only) and its own doc-comment says verbatim: *"shared math with the deferred R-6 Jzazbz/ICtCp spaces"* (`difference.ts:14`). The matrix work (XYZ→LMS crosstalk, PQ encode, LMS′→ICtCp) is DONE; only the public `Color<ICtCp>` class + parsing/serialization wrapper + Jzazbz's (unrelated-math) conversion remain. | **UNBLOCKED, ready to fold — the highest-leverage single item in this census.** The stated gate is fully cleared and the hard 90% (the matrix math) is already committed. **Candidate S wave-item: promote `xyzToICtCp` to a public `ICtCp` color-space class** (parsing, `color2()` dispatch, round-trip goldens) — likely the cheapest net-new color space value.js has ever added, since the transform already exists and is tested indirectly via `deltaEITP`. Jzazbz (different perceptual model, no shared matrix) stays a separate, still-deferred lift. |
| **R-5 HDR rec2100** | "spec still Draft" | Not independently re-verified via live spec lookup (same caveat as R8-23 above — repo-evidence-only pass). No code movement toward rec2100 in `src/`. | **KEEP-BOOKED**; recommend the same spec-status recheck lane cover this alongside R8-23/R-10. |
| **R-7 HCT/CAM16** | "heavy, no demand" | No demand signal found anywhere in the S findings ledger (S-1..S-24) or demo code. | **KEEP-BOOKED**, unchanged — genuinely no-demand, not merely fatigued. |
| **R-10 `if()`/`random()` parser nodes** | Baseline ~late-2026 | Today is 2026-07-04 — mid-window. Not independently spec-checked (same caveat). | **KEEP-BOOKED**, time-bound as recorded; due for a status recheck by S-close given the window's midpoint has arrived. |
| **R-8 gamut-relative spaces** | killed as a mechanism (pass-2 measurement: c1 washout, c2 collapses onto full-cusp) | No new evidence contradicts the kill; this is a **KILL**, not an open book. | **KILL stands** — do not re-litigate without new measurement evidence. |
| Do-NOTs: sibling-index/count · device-cmyk · ICC profiles | recorded non-goals | No re-litigation signal found in the S findings ledger. | **KILL stands** for all three — carry forward as non-goals, not books. |

---

## 5 · N-era LEDGER U/T-rows — verified fully folded, zero stragglers

`N/FINAL.md` records N.W10–W18 (ratified 2026-06-11, never executed) as fold-forward into R via
`R.md §1`'s per-wave PRUNE/REWRITE/FOLD/BOOK disposition table. Re-verified against the live tree,
spot-checking the highest-risk rows from `R8-DEFERRED.md §1.B` (the design-suffusion cluster, the
largest un-fired block at R-open):

| N-era row | R8 code | Disposition claimed | Live-verified |
|---|---|---|---|
| mix-canvas RAF PRM hole (T16, "the ONE live un-gated RAF", chronic ≈6 tranches) | R8-8 | FOLD→R.W2 | ✅ **CONFIRMED FIXED** — `useMixingAnimation.ts:57-62` now gates the loop behind `matchMedia("(prefers-reduced-motion: reduce)")` before ever arming `requestAnimationFrame`. |
| `watercolor-swatch` phantom class (inv-N-7 residual) | R8-9 | FOLD→R (define-or-delete) | ✅ **CONFIRMED EXCISED** — zero hits anywhere in `demo/` for `watercolor-swatch`. |
| ComponentSliders god-module breach (418 LoC, R8-14) | R8-14 | FOLD→R (sub-lift) | ✅ **CONFIRMED CURED** — now 367 LoC; current demo-wide LoC scan finds **zero** files (excl. `ui/`) over 400 (`SpectrumCanvas.vue` is the new max at 392). |
| tags==registry (7 untagged incl. v1.0.0, R8-2) | — | FOLD→R | ✅ **CONFIRMED** — `git tag` now includes every version through `v2.0.1`, zero gaps. |
| master-merge hygiene (R8-3) | — | FOLD→R | ✅ **CONFIRMED** — `master...tranche-q` rev-list is `0 0` (identical HEAD, `102b37b`). |
| P/Q record-hygiene (R8-7, "empty dirs") | — | FOLD→R | ✅ **CONFIRMED** — `docs/tranches/{P,Q}/FINAL.md` both exist and are non-empty. |
| K-W3DIFF / K-PALID / K-INV5 / K-DISP / K-W5RT (R8-12, the "modern-web carry") | R8-12 | FOLD→R | **4 of 5 discharged** (K-PALID landed, K-INV5 discharged-in-spirit, K-DISP real decomp landed, K-W3DIFF trigger-bound BOOK correctly still open — see §3); **K-W5RT is the live miss** — see §2, the census's headline finding. |
| O.W7 Parse-Lab pane (R8-15, chronic≈4) | R8-15 | FOLD→R.W3/W4 (FUSE not bolt-on) | ✅ **CONFIRMED FUSED**, not built as a detached pane (per R.md §2's explicit "detached teaching pane is contrivance" ruling) — `ColorInput.vue`'s gamut-verdict echo + the overlay square share `gamutMapOKLab`/`deltaEOK`/`DELTA_E_OK_JND`, no new exports (R.W4 Lane E, `65ba2c6`). |

**No N-era U/T-row was found un-folded.** The one gap the re-audit surfaces is **not** a dropped N-row —
it is **K-W5RT**, whose *external* trigger (stable vue-router 5) simply fired later than R's close and
was never re-checked (§2). Zero silent drops confirmed by direct re-measurement, not by trusting the
prior record's prose.

---

## 6 · A..Q stragglers — none found beyond what's already tabulated above

Grepped every `docs/tranches/{A..Q}/FINAL.md` for BOOK/DEFER/WAITING/successor rows (§0 of this
document's method). Every hit resolves to one of:
1. **Already routed through R8-DEFERRED.md → R.md §1/§3.3/§4** (the N-era design/hygiene/cohort rows,
   fully accounted for in §5 above), or
2. **Closed-with-no-successor** (C's `CRUD-CONTRACT.md` DISSOLVED, `api/src/crud/` OBVIATED,
   `formatPalette ??` DISCHARGED `ee8bfa4`, `cron.ts $nin` DISCHARGED `417c3a5`,
   `migrate-palette-schema.ts` DISCHARGED-VIA-PROBE — all C-tranche, all evidence-backed closes, none
   re-opened by any later tranche), or
3. **Genuinely sibling-owned, chronic, correctly still open** — the **7 standing glass-ui
   primitive/blob asks** lineage (A→B→E→F→G, ~10+ tranches) is the oldest chronic thread in the whole
   corpus; it terminates (per §3/§1 above) at the **glass-ui 5.0.0 adopt event** book, which subsumes
   it. No separate action needed — `glassui-bg-bh-assay.md`'s TL;DR table (its §0) is the authoritative
   per-ask disposition at this point; this census defers to it rather than re-deriving.
4. J's **VAL-1** (OKLab aurora-LUT, chronic A→J, "ship-or-KILL" at K.W4) — traced through
   K.W4→M.W5→**N.W5** ("VAL-1 ship-or-KILL here"); **no LUT sampling layer exists in
   `src/units/color/conversions/oklab.ts` today** (grep: zero `lut`/`LUT` hits), while
   `deriveAurora`'s H/C-varying richness is confirmed live in glass-ui's `dist/aurora.js` (per
   `glassui-bg-bh-assay.md §"S-18"`) — evidence the mechanism was **KILLED, not shipped**, at N.W5's
   ship-or-kill gate. This predates R and is **not** a book on the current table; noted here only
   because it's the direct root-cause context for the live finding **S-18** ("aurora doesn't vary H/C")
   — the demo's `useAtmosphere.ts` wiring defect the sibling lane already root-routes as **value.js
   demo** (not a producer gap, since the H/C-rich surface exists and is merely mis-wired/under-tuned).
   Dependency edge: **VAL-1's kill ↔ S-18's wiring-defect diagnosis** — worth citing together so a
   future reader doesn't conflate "producer lacks HC variation" (false, per VAL-1's kill record) with
   "the demo fails to drive the rich producer surface" (true, per the sibling lane).

---

## 7 · Ranked findings summary

| # | Finding | Severity | Root-routing | Fold verdict |
|---|---|---|---|---|
| 1 | **vue-router 5 stable since 2026-05-28 (5.1.0 now); K-W5RT trigger fired, unactioned ≈5 weeks** | **P0** (chronic-8-tranche book, trigger now unambiguously met) | value.js demo (`demo/package.json` + router call sites) | **FOLD → S.W-ROUTER-5-MIGRATE** |
| 2 | **R-6 Jzazbz/ICtCp gate cleared** — `xyzToICtCp` matrix math already shipped in 2.0.0; only the public space-class wrapper is missing | P1 (cheapest net-new color space available) | value.js src (`units/color/`) | **FOLD → candidate S wave-item** (promote to public `ICtCp` space) |
| 3 | **parse-that re-pin / color2Into currency / D8-1 watch-line** — 3 books already discharged post-R-close, stale in `R/FINAL.md`/`PROGRESS.md` wording | P2 (bookkeeping only, no functional risk) | docs (S's own ledger, not R's — R is closed) | **FOLD (record-only)** |
| 4 | **CHANGELOG.md missing a `[2.0.0]` entry** (jumps 2.0.1→1.2.0) | P2 | value.js repo-root docs | **FOLD → candidate S wave-item** (transcribe from `R/FINAL.md §6`) |
| 5 | **srgbToLinear decode-threshold defect + gamut.ts inline-copy DRY violation** — confirmed still live, correctly un-fired (no minor/major since R) | P1 (numerical correctness; ~8e-3 max error), but correctly gated | value.js src (`conversions/transfer.ts` + `gamut.ts`) | **KEEP-BOOKED**; bundle the DRY fix into the same future commit (dependency edge: `lib-color-audit.md`) |
| 6 | **R-4 raytrace N-gamut map** unblocked (its stated R-1 policy dependency settled at 2.0.0) but still lacks demand | P2 | value.js src | **KEEP-BOOKED**, flag unblocked |
| 7 | **R-10 / R8-23 / R-5 time-bound-spec books** are due a fresh Baseline/CSSWG status check — the "~late-2026" guess is now mid-window and was not re-verified live in this pass (no WebSearch/WebFetch exercised) | P2 | n/a (research task) | **KEEP-BOOKED**, recommend a spec-status recheck lane before S closes |
| 8 | **Possible collision: S-11 ("palette API seems broken") may be K-INV5's residual resurfacing**, not a fresh defect | P2 (diagnostic hygiene) | api / demo (whichever lane owns S-11) | flag as a dependency edge, not independently resolved here |

**No product code, config, or any file other than this report was written.** All version/trigger claims
above are grounded in `git log`/`git tag`/`npm view`/source greps executed during this session; sibling
repos (`glass-ui`, `keyframes.js`, `parse-that`, `fourier-analysis`) were read-only.
