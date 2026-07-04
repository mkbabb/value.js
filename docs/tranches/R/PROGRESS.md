# R — PROGRESS

**Status board.** R is **RATIFIED** — the convergence loop is CLOSED (pass-3 CONVERGED
100/100, `audit/pass2/PASS3-VERDICT.md`), the charter + wave docs are authored and amended to
the ratified outcomes, and **all waves are DISPATCHABLE** with zero implementation commits.

**Dispatch gate: CLOSED — RATIFIED 2026-07-03.** The owner pass resolved all 8 open Q rows
(`R.md` §12): **six ratified as speced** (Q4 file:-deps · Q7 `GAMUT_ALPHA = 1.0` · Q8 hard-ask ·
Q10 Parse-Lab fused into ColorInput · Q11 display-p3 lens with keyed override · Q12 both easing
riders) and **two FLIPPED**:

- **Q1 FLIP — hero-lab KILLED entirely** (owner order, not slipped): `waves/R.W5.md` deleted;
  `docs/frontend-design/hero-lab.md` deleted (was untracked); the app artifacts (`demo/hero-lab/`
  tree, the vite hero-lab mode branch, the `dev:hero-lab`/`build:hero-lab` scripts) fold into
  R.W2 as a deletion item. The W5 numbering gap is kept — it documents the kill. The picker does
  NOT absorb hero-lab scope.
- **Q2 FLIP — X2 NCSU-alias retirement becomes R.W7 in-wave work** (maintainer-on-host, in the
  W7 gate) — not a standing action.

> RATIFIED-2026-07-03 provenance: board amended to the ratified outcomes.

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
round 0:  R.W0 substrate
round 1:  R.W1 gamut+perceptual ∥ R.W2 functional truth ∥ R.W6 twin-tie
round 2:  R.W3 the instrument     (requires W1 + W2)
round 3:  R.W4 suffusion
round 4:  R.W7 wire + close       (requires W4 + W6)
```

*(W5 KILLED at the 2026-07-03 ratification — W4 → W7 directly; the wave-letter gap is kept
deliberately as the record of the kill. Do not renumber.)*

The one external edge — the D8-1 no-shim render bar — is a BOOK riding an already-dispatched ask,
never a gate. R.W6 and R.W7 gate on nothing outside this repo.

---

## Wave status

| Wave | Title | Doc | Round | Status | Publishes |
|---|---|---|---|---|---|
| **R.W0** | SUBSTRATE — hygiene + truth (W0-1..W0-14) | `waves/R.W0.md` | 0 | **CLOSED** (2026-07-03) | — |
| **R.W1** | GAMUT + PERCEPTUAL — U10 head (Q7), KF-1 **5-file**, boundary API, presets, OKHSL/OKHSV, ΔE, K-DISP | `waves/R.W1.md` | 1 | **CLOSED** (2026-07-03; verifier 12/12 PASS) | **2.0.0 PUBLISHED** |
| **R.W2** | FUNCTIONAL TRUTH — boot cure, Tabs→SegmentedTabs, N.W10 rows, PRM, hero-lab artifact deletion (Q1), kill-list | `waves/R.W2.md` | 1 | **CLOSED** (2026-07-03; composite gate green; K-INV5/K-W3DIFF adjudicated → BOOKS with evidence; D8-1 book RETIRED at consume) | — |
| **R.W3** | THE INSTRUMENT — picker keystone; spec = amended `color-picker.md` | `waves/R.W3.md` | 2 | **CLOSED** (2026-07-04; gate (a)–(f) + overlay riders + taste bar met; e2e 38/38) | — |
| **R.W4** | SUFFUSION — cards + shell + panes; `/easing` consume; Parse-Lab-as-input | `waves/R.W4.md` | 3 | **CLOSED** (2026-07-04; gate (a)–(d) + easing riders PASS; taste MET, screenshot-corroborated) | — |
| ~~R.W5~~ | **KILLED** — hero-lab deleted (owner order, Q1 FLIP at the 2026-07-03 ratification; treatment + wave doc + app artifacts; gap kept) | *(deleted)* | — | **KILLED** | — |
| **R.W6** | TWIN-TIE — 5 inline fixture rows, contract-currency invariant, FN-1..7 | `waves/R.W6.md` | 1 | **CLOSED** (2026-07-03; isolated-clone 224/224; FN charter reconciled + rider delivered) | — |
| **R.W7** | WIRE + CLOSE — X1/X3 deploy, X2 alias retirement (in-wave, Q2 FLIP), relay letter, FINAL.md, merge + tag | `waves/R.W7.md` | 4 | **DISPATCHABLE** | — |

---

## BOOKS (books, never gates — no wave gate reads this table)

| Book | Trigger | Status |
|---|---|---|
| `/easing` in the GAP-3 subpath watch (the R.W4 consume adds the 17th glass-ui specifier; authored at D7, `waves/R.W4.md §BOOKS`) | the glass-ui 5.0.0 cut's by-name MIGRATION table | **OPENED** at R.W4 |
| EasingPicker preset SelectTrigger accessible-name blemish (producer-owned; combobox reads only "linear") | the R.W7 relay letter carries it; fires at the glass-ui fix | **OPENED** at R.W4 (relay item) |
| ~~D8-1 no-shim verify~~ | ~~glass-ui rebuilds dist with `layer(components)`~~ | **RETIRED 2026-07-03** — escalated (glass-ui `1599c230`) and CURED same-day by BG (`4b637036`, emission site `vite.utility-emit.ts` + self-heal + reply doc); probe records **CURE_OBSERVED** (visibleCount 2, no `!important`); published cut carrying it = the joint 5.0.0 |
| K-INV5 typed degraded-backend + "offline — saved locally" affordance (row's literal fix REFUTED by deletion-probe experiment; functional kernel landed via save-P0) | **R.W3 dispatch** (design-on-working-substrate) | **OPENED** at the R.W2 triumvirate — see `waves/R.W2.md §BOOKS` |
| K-W3DIFF PaletteDiff render (REFUTED-AS-CONTRIVANCE: no diff-consumer surface; `/diff` recomputes, stored `atomDiff` write-only) | first demo version-compare / remix-review surface; alt-exit = stop persisting `atomDiff` (api-side) | **OPENED** at the R.W2 triumvirate — see `waves/R.W2.md §BOOKS` |
| srgbToLinear decode-threshold defect (`conversions/transfer.ts` + gamut.ts inline copy compare ENCODED input vs `SRGB_LINEAR_TRANSITION` 0.003131 instead of `SRGB_TRANSITION` 0.04045 — non-invertible dark-sRGB roundtrip, ~8e-3 max) | next library minor/major (output-changing; snapshot-rippling — discovered at R.W1.6, out of its remit) | **OPENED** at R.W1 |
| `Color.try()` | demand for a non-throwing parse that neither drags parse-that into the parse-that-ZERO `/color` subpath nor duplicates the memoized custom-name path | **OPENED** at R.W1 (books-never-gates) |
| glass-ui 5.0.0 adopt event (goo-blob→blob · GAP-3 subpath table +`/easing`+`/tabs` · uSatColor GAP-1 · U6 dock-fission verify · GAP-4 blob perf · aurora-metal) | the BG/BH joint cut | WAITING |
| parse-that `^1.0.0` re-pin | kf **S.H4** publishes the 1.0.0 cut (retargeted from S.H2 per `audit/coordination/COORDINATION-ANALYSIS.md` §3.2; verify = span-absence + the 4 `.chain()` sites + chainError-retired + falsy-seed-fix) | WAITING (do not pre-pin) |
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
| kf KF-1 re-pin letter (delete `normalizeParam`/`NormalizedParam`/`VJS_PARAM_BUG_MAX`; read `.name`/`.syntax`/`.default`; re-pin `^2.0.0`) | R.W1, inside the 2.0.0 cut | **SENT 2026-07-03** — kf `9a0f6cb` (`docs/tranches/S/KF-VALUEJS-2.0.0.md`) |
| fourier peer-floor note (`^0.13.0`→`^2.0.0`; 5-symbol surface unaffected; sampleColorRamp book dischargeable) | R.W1, inside the 2.0.0 cut | **SENT 2026-07-03** — fourier `cd26c65` (`docs/tranches/N/VALUEJS-2.0.0-NOTE.md`) |
| fourier FN-1..FN-7 charter, paired-authored into `fourier-analysis/docs/tranches/N/` | R.W6 | **DELIVERED** (dev-time `83d4c9f`; R.W6 reconciled + FN-5-before-M.W10 rider added, committed fourier `cd26c65`) |
| D8-1 ESCALATION → glass-ui BG inbox (unlayered `dist/styles/index.css:266` blocks value.js boot ≥lg) | 2026-07-03, mid-R.W2 | **SENT** — glass-ui `1599c230` |
| glass-ui relay letter (GAP-1..GAP-5 + peer-floor + `/easing` contract; D8-1 rides as verify-at-consume) | R.W7 (or earlier if the 5.0.0 cut approaches) | PENDING |

---

## Event log

| Date | Event |
|---|---|
| 2026-07-02 | Pass-3 certification: **CONVERGED 100/100** (trajectory 87.8/84 → 93.2/88 → 100/100); `SYNTHESIS-v2.md` amended-at-pass-3 is the ratified-ready spec; worktree reports hoisted + seeds preserved |
| 2026-07-02 | Tranche R corpus authored: `R.md` charter + this board + `waves/R.W0.md`..`waves/R.W7.md`; **dispatch gate OPEN** awaiting the 8-row owner ratification |
| 2026-07-03 | **OWNER RATIFICATION — dispatch gate CLOSED; all waves DISPATCHABLE.** Six rows ratified as speced (Q4/Q7/Q8/Q10/Q11/Q12); **Q1 FLIPPED** (hero-lab KILLED entirely: `waves/R.W5.md` + `docs/frontend-design/hero-lab.md` deleted; app-artifact deletion folded into R.W2; W5 gap kept as the record; W4 → W7 directly); **Q2 FLIPPED** (X2 NCSU-alias retirement = R.W7 in-wave item, in the W7 gate). Corpus amended everywhere the outcomes bind. |
| 2026-07-03 | **R.W1 CLOSED — value.js 2.0.0 PUBLISHED** (`dist-tags.latest=2.0.0`; version commit `96f124d`, annotated tag `v2.0.0` pushed; merge `20bbc8d`). Independent verifier 12/12 PASS. `GAMUT_ALPHA` 0.05→1.0 (pink oracle `lab(92% 88.8 20)`→`rgb(255,167,180)`; tiered guard ΔL 0.0834<0.09); KF-1 5-file grammar fix + rename green (gate vector `--x <length>: 0px`→`{name,syntax,default}`); `extractFunctions` fresh-build `.d.ts` lock (`test/dts-published-surface.test.ts`); bezierPresets smooth-step-3 exact + 15 tightened (max dev 0.0387); OKHSL/OKHSV (`okhsl.ts`, cusp-math reuse); ΔE-2000 (14 Sharma vectors) + ΔE-ITP/ICtCp (`difference.ts`); K-DISP real decomposition (dispatch 760→522 LoC, barrels byte-identical); `/easing` 5-export guard; boundary API `sampleGamutBoundary`/`Into` + 4 types, matrices package-internal (dts-leak 0), goldens post-α locked @1e-3, bench **0.13–0.18 ms mean** (ceiling 0.5). vitest **1996/1996** (56 files) · lint 0 · `tsc -p tsconfig.lib.json` 0. Letters verified vs landed reality (KF line-refs amended `9f820a9`). **Carries routed**: K-DISP demo `dispatch`→`mix` import migration (~8 files) → the R.W2 completion lane; `srgbToLinear` threshold defect + `Color.try()` → BOOKS. |
| 2026-07-03 | **R.W6 CLOSED.** The 5 wire-envelope shape rows inline in `api/test/conformance/diff.test.ts` (`7351297`, merge `8a2a617`), transcribed against `J-diff-shape.md` §3/§4, shape-not-bytes; **isolated-clone proof**: no sibling checkout, diff rows 14/14 + full api suite 37 files / 224 green; `cd api && tsc --noEmit` 0. **Contract-currency invariant** (recorded; fourier FN-5 mirrors): any change to `api/src/lib/crud/atomdiff.ts`, `api/src/hash.ts`, the `PaletteVersion` shape (`models.ts:153`), or the URN catalog re-verifies the fourier twin + CONFORMANCE-MATRIX. **Contract of record**: `fourier-analysis/docs/tranches/J/design/J-diff-shape.md §3/§4`, bound by transcription (zero cross-repo reads). FN charter reconciled + the missing FN-5-before-M.W10 sequencing rider added (fourier `cd26c65`). `canonical_digest` **SKIPPED sanctioned** (fourier sorts keys, value.js hand-orders literals — adoption = stored-hash migration, not parity); the three named twin divergences left un-unified by design. Books: FN-7, FN-6. |
| 2026-07-03 | **R.W2 first half LANDED; lane interrupted; D8-1 recurrence ESCALATED.** Landed: boot cure `0123648` (exports-map anchored-regex self-alias; dist byte-identical), hero-lab deletion `9ed9175` (Q1 FLIP), Tabs migration + named-export tripwire `6ed3677` (7 compound consumers → reka-ui direct — SegmentedTabs cannot cover cross-component content-panel compounds; tripwire tripped RED on the 4 dead bindings pre-migration, GREEN post), 1440 probe `21cdfa7`. W2-B (P0 rows) died on a server rate limit with most row work uncommitted in-tree; completion lane re-dispatched. **Verifier found boot/e2e RED on a producer regression**: the glass-ui 15:10 rebuild re-emitted the unlayered `components.css` import at `dist/styles/index.css:266` and moved `/styles` onto the emitted tree — bare `.hidden` (bundle byte 454015, UNLAYERED) beats layered `lg:flex` at every ≥lg viewport. Escalation dispatched (glass-ui `1599c230`); no demo-side cure (binding prohibition). |
| 2026-07-04 | **R.W4 CLOSED — suffusion** (`4d8ad79..874288f`; Fable lanes A–F; verifier: gate (a)–(d) + easing riders + E-lane clauses ALL PASS; **taste MET** — "depth grammar reads consistently across all 4 views; empty states genuinely invite"). **A cards** `4d8ad79`: depth-grammar fleet on the R.W3 Z-laws (`--card-edge` via a @theme bridge, not a re-mint; PaletteCard shadow-lurch cured), glass shimmer bones (U20), WatercolorDot ghosts ×5 sites (U18/U22), specimen-plate empty invitations (A4). **B shell+motion** `bd3460a`: the inventory named **17** grammars (not the spec's 12; record at `audit/R.W4-visual-runtime/transition-inventory.md`) → exactly THREE families on system tokens (`vj-enter`/`vj-morph`/`vj-celebrate`; U12), per-view accent via ONE resolver (`--view-hue-shift`→`--accent-view` relative-color off `--accent-live`), the view-select beat in the current dock (U6 book untouched). **C docs-φ** `17383a6`: the `--phi-0..4` ladder through Markdown.vue+AboutPane (assets/docs pages carry no styles); φ² gap computed-exact 41.888px; two latent defects cured (scoped-CSS dead-reach → `:deep()`; `innerText`-under-`content-visibility` empty-KaTeX → `textContent`, 23/23 live). **D /easing consume + F1** `9754cc4`: EasingSelector fork DIES onto `<EasingPicker>` (paired), `GradientInterval`→`{css,fn}` payload, 24/24 names (§1.4 cited), steps(n) banded round-trip (Q12), `resolveEasing`+`GRADIENT_EASING_NAMES` deleted, D7 `/easing` GAP-3 book authored. **E extract+input** `65ba2c6`+`337f254`: T19 dominance end-to-end (70% stat probe), T20 ONE ExtractWorkbench, T21 EditDrawer deleted, E4 Parse-Lab fused into ColorInput (Q10) — **plus a real bug caught in-lane**: the gamut verdict computed on display-denormalized OKLab (l as 0–100), Δ inflated ~500× — cured to RAW OKLab so the typed verdict and the drawn contour agree by construction. **F** `54f1353`: trigger-font override retired; ledger clears. Gate-(c) cap held by decomposition `9675ef3` (useAtmosphere; ParseEchoReadout). π baseline+close 36+36 + DELTA + a11y snapshots `874288f`. Gates: lint 0 · typecheck 0 · vitest 1998/1998 · boot cold PASS · playwright green · src/ untouched. Residual routed: the producer EasingPicker trigger a11y blemish → the W7 relay letter (book row above); demo/CLAUDE.md doc-truth swept at close. |
| 2026-07-04 | **R.W3 CLOSED — the instrument** (`abb16f1..ad1ab93`; Fable design lanes A→B→C/D/E; verifier: all clauses PASS, **taste bar MET** — "the picker plate genuinely reads as the treatment's editorial instrument"). **A keystone** `0cbef49`: font root cured at `--font-stack-display` SOURCE (real Fraunces/Jakarta/Fira faces; three-voice law), `--accent-live` ← library `safeAccentColor` (ONE path; `--primary` chromatic both schemes; glass tint 4%), navy dark fork deleted for glass-ui's warm ladder, container clamp (10 self-clamps dead; 695px @1440 = the D6 ladder; aspect law CSS+JS-unified; `cqi` in-card), §Depth Z0–Z4 + `--card-edge` mint + §Type card-lock law authored in DESIGN.md. **B overlay** `f19efa0`+`2fb8783`: the wide-gamut truth line on the KEPT square — `sampleGamutBoundary`/`Into` consume (demo owns paint, never math), dual-ink hatch via ONE shared `spectrumLuma.ts`, threshold detent with `p3 ⊣` chip (outbound-only, flick-transparent, model-held), Q11 display-p3 lens + keyed override live, true cusp readout, clear-plate at 0 painted px; perf 0.75 ms mean (<2 ms budget; a 13 ms `getBoundingClientRect` reflow caught + cured via ResizeObserver cache). **C consume** `c98480a`+`71058de`: spectrum-slider fork deleted onto `variant="spectrum"` (ComponentSliders 419→367 LoC), audacious specimen dropdown + bounded SelectContent (U8), veil capsule (U13), accent focus rings (D8). **D readout + dual-hero** `092de18` · **E motion three-beat** `84b9938` · **K-INV5 residual** `c4eb9d2` (typed `ApiUnavailable` latch + "offline — saved locally" affordance). **Close blocker found by the verifier + root-cured** `fceed47`: the Lane-A relayout exposed a latent Vue 3.5 dev-only defect — `PaneSlot.vue` `<Transition mode="out-in">` `afterLeave→update` remount never fires under vite dev (build unaffected; the silent dev-vs-build divergence class recorded in DESIGN.md §Motion) → default simultaneous cross-fade; e2e 9-12/38 → **38/38 first-run, all 5 projects**. **Gate-(f) provenance repaired** `ad1ab93`: instrument probe retroactively falsified against `b2544c3` (I1–I4 genuinely born-RED; I5/I2r honest standing guards). π baseline+close 18+18 + DELTA.md. Gates: lint 0 · typecheck 0 · vitest 1998/1998 · boot cold PASS · both probes GREEN. |
| 2026-07-03 | **R.W2 CLOSED** (completion lane + triumvirate + surgical fixes; composite gate green). P0 rows row-scoped `648843b..46ad669`: U9 sync reset · save-P0 local-first · kC chromaWeight + **deterministic** divergence vitest (seeded mulberry32, 12-colour/k=8 fixture) · U33 `breathing→drifting` + temporal oracle · X6 v-if single mount · X8 cold-hash seed · X9 tags coercion · mix-RAF + inertia PRM gates · watercolor phantom deleted · kill-list (spot-verified) · K-DISP demo `dispatch→mix` (R.W1 carry) · BlobPane `-?` type-root cure (31 TS2322→0) · DESIGN.md hero-lab refs retired · 1440 probe re-authored defect-tolerant. **Triumvirate adjudications**: K-PALID **LANDED** `871c69f` (the `id: string` type-lie was real — server slug-identified, remotes carried `id===undefined`; honest `id?: string` iff `isLocal`, type-predicate narrowing, 2 latent id-matching bugs fixed); K-INV5 **BOOK upheld on corrected rationale** (deletion-probe experiment; residual → R.W3); K-W3DIFF **REFUTED-AS-CONTRIVANCE + trigger-bound BOOK**. **e2e**: wrong-label root fixed `b4d179f` (dead-control pointerdown), dock-morph settle `14c0ca4`, posture serialized workers:1 `3a41ea7`, AdminUsersPanel insertBefore reparent race stable-parented `7c6abdd` (3× smoke-admin green); full-suite 38/38 then 37/38 with the one deviation's root eliminated by `7c6abdd`. **D8-1**: recurred mid-wave at the producer (new site `dist/styles/index.css:266`), escalated `1599c230`, **CURED same-day** by BG `4b637036`; probe **CURE_OBSERVED** — book RETIRED. Gates: boot-smoke cold PASS · gh-pages ✓ built · hero-lab grep-zero · zero ungated rAF · zero phantom · lint 0 · typecheck **0** · vitest **1998/1998** (58 files). |
| 2026-07-03 | **R.W0 CLOSED.** All 14 rows executed serially; composite hard gate green. `color-picker.md` committed + P1–P10 overlay-amendment merged (the R.W3 spec of record); probe scratch discarded + `.gitignore` class minted; CONTRIBUTING/VENDOR-POLICY proof-purge tail committed; `docs/precepts` submodule resolved by REVERT (the 2 local edits were a superseded draft — origin/main already canonizes the paired-before/after π doctrine fuller, and 63240e6 can't ff origin/main; committing would be an out-of-band lineage publish); CLAUDE.md parse-that ^0.13.0 + §3.4 pin policy; RELEASE.md KF-4 `/math` leaf; P/Q/N FINAL.md authored; 10 annotated retro-tags minted (registry == tags ≥ v0.6.0, 0 missing); `tranche-q` fast-forwarded onto master (master carries 1.2.0); 5 stale worktrees + 5 lane branches removed; master + tranche-q + tags pushed to origin. See §Verification artefacts (R.W0). |

---

## §Verification artefacts (R.W0 — captured at close 2026-07-03)

**Per-row commit hashes** (row → hash → evidence):

| Row | Disposition | Hash / git-op |
|---|---|---|
| W0-1 (a) | commit `color-picker.md` as-is | `aace524` |
| W0-1 (b) | merge P1–P10 overlay-amendment (R.W3 spec of record) | `8f1d8e7` |
| W0-2..5 | discard 9 scratch files + mint `.gitignore` probe class | `6ce7236` |
| W0-6 | `git rm` CONTRIBUTING.md + VENDOR-POLICY.md (proof-purge tail) | `de6428d` |
| W0-7 | submodule resolved by REVERT (superseded draft; no gitlink bump) | *(no commit — `m docs/precepts` cleared by revert)* |
| W0-8 + W0-12 | doc-truth: parse-that ^0.13.0 + §3.4 pin policy + RELEASE KF-4 `/math` | `cb986e6` |
| W0-11 | author lean P/Q/N FINAL.md | `e68b720` |
| W0-9 | 10 annotated retro-tags (git op) | tags `v0.11.2`..`v1.0.2` |
| W0-10 | fast-forward merge tranche-q → master (git op) | master → `e68b720` |
| W0-13 | no action — w6 shots corpus `*.png`-gitignored | n/a |
| W0-14 | remove 5 stale worktrees + 5 lane branches (git op) | — |
| close | this PROGRESS.md status commit | *(this commit)* |

**Lint + test (pre-merge gate, on the merged tree):** `npm run lint` exit 0 (eslint `--max-warnings=0`, clean); `npm test` **51 files / 1934 tests all passed** (matches the ledger baseline at `e80b359`).

**`git tag -n1` vs registry (W0-9):** every npm-registry version ≥ v0.6.0 (16 versions: v0.10.0, v0.11.0, v0.11.1, v0.11.2, v0.12.0, v0.13.0, v0.13.1, v0.14.0, v0.15.0, v0.16.0, v1.0.0, v1.0.1, v1.0.2, v1.1.0, v1.1.1, v1.2.0) carries a matching annotated git tag — **0 missing**. Pre-modernization carve-out recorded: registry `0.1.0`–`0.5.1` = **11 versions** intentionally untagged individually, under the single `pre-modernization` tag. Local tag set == origin tag set (verified identical).

**`git status --porcelain` at close:** empty (clean tree).

**`git worktree list` post-cleanup:** `/Users/mkbabb/Programming/value.js  e68b720 [tranche-q]` — main tree only, zero lane worktrees.

**Three FINAL.md paths:** `docs/tranches/P/FINAL.md` · `docs/tranches/Q/FINAL.md` · `docs/tranches/N/FINAL.md`.

**Master merge:** FAST-FORWARD (`15b0382..e68b720`, no merge commit); `git show master:package.json` → `"version": "1.2.0"`; all P/Q + 10 retro-tags resolve on master's history. Pushed: `origin/master` = `origin/tranche-q` = `e68b720`.

**Recorded live-tree drifts (never silently reconciled — process lesson 3, R.md §13.3):**

1. **W0-10 master-merge depth: 3 → 8 → 14.** The `w0-truth.md` inventory pinned `master..tranche-q` at **3** commits (`23d1a91`/`fd3c7ce`/`e80b359`). At wave-start it was **8** (the 5 R-docs-corpus commits `947dc9b`/`8169956`/`5480952`/`9098417`/`951a617` were authored after the inventory). At the merge it was **14** (+ the 6 R.W0 commits). The fast-forward heals all 14 and the tag/branch skew in one move; all three figures on the record.
2. **W0-14 stale worktrees: 5, not 3.** The inventory named **three** pass-2 lane worktrees (`wf_d9a4e4d9-899-{1,2,3}`). `git worktree list` showed **FIVE** — those three plus `wf_a8d3e05b-52e-{11,12}` (same class, an earlier fleet at `15b0382`). All five removed `--force` + pruned, and their five orphaned `worktree-wf_*` lane branches deleted. The 5-vs-3 delta on the record.

**Submodule (W0-7) decision + rationale:** the 2 uncommitted edits inside `docs/precepts` (`instructions/LESSONS-LEARNED.md` blob-regression π lesson; `instructions/tranche/SPEC.md` "Before/after + compare-at-close" section) are substantive precept content **but superseded**: the submodule's `origin/main` (13 commits ahead of the stale detached base `63240e6`) already canonizes a fuller version of the identical doctrine (`8ccf9f4` "Before/after capture — every page, paired, scripted" + DELTA.md + occlusion gate + WebGL present-assertion; `0c03de8` LESSONS updates). Committing the local drafts would (i) require a divergent push (`63240e6` cannot fast-forward `origin/main`), violating the precepts repo's own invariant-11 "no out-of-band lineage publish", and (ii) duplicate content already upstream. **Resolution: REVERT** — clears `m docs/precepts`, loses no knowledge (canonical form lives upstream), gitlink unchanged at `63240e6` per W0-7's narrow scope.
