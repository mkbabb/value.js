# S — FINAL: the refinement-consummation tranche closes

**Tranche**: S (oracle floor · 3.0.0/3.1.0 · one color spine · budgets as gates · four Fable waves)
**Branch**: `tranche-q` (main tree, single writer) · **Close authored**: 2026-07-06 at `6eb2ab7`
**Charter**: `S.md` · **Board**: `PROGRESS.md` · **Ratified spec**: `audit/SYNTHESIS.md` (AMENDED-AT-PASS-4 + tail; convergence 86/72 → 100/98·zero-mustFix, `audit/CONVERGENCE.md`) as amended by `audit/RATIFICATION-2026-07-05.md` (§0 verbatim owner text wins)
**Close verification acts**: `audit/w9-close-probes.md` (probes + sweeps, 2026-07-06) · `audit/w9-pi-review.md` (π tranche-level reconciliation, NON-authoring reviewer — **COHERES_WITH_NOTES**)

**Tranche verdict: `complete_with_misses`.** The tranche's own gates hold against the live
tree; every miss below is named, none silently reconciled. The naming law bound throughout:
gates-pass-goal-unmet closes `complete_with_misses`, never `complete`.

> **Amendment discipline** (the R precedent): the orchestrator fires the master merge, the
> annotated `tranche-s-close` tag, and the worktree cleanup (the 5 stale `wf_01c28a82-3c2-*`
> seed-fleet worktrees at `7cd45c4` are pre-ceremony debris — remove them + their branches)
> **after** this document, and amends the §1 W9 row + this note in place. The W0 CI-log
> deferral discharges at the same event (the merge push is the first master-targeting run).
> Nothing else in this document is provisional.
>
> **CEREMONY FIRED 2026-07-06** (`audit/w9-close-probes.md §ceremony`): merged `--no-ff`
> `tranche-q` `4a166c9` → `master` (no conflicts) at merge commit **`4a6b62b`**; annotated tag
> **`tranche-s-close`** (`5bb2d59` → `4a6b62b`) carrying the verdict + publishes + 23-book
> count; pushed `master --follow-tags` + `tranche-q`. Worktree cleanup: the 5 seed worktrees
> removed + 8 `wf_*` branches deleted (5 seed + 3 dead-lane orphans) + 2 symlink litters swept —
> `git worktree list` = main tree only; `git status --porcelain` empty. The W0 CI-log deferral
> discharged: the first master-targeting CI run is **`28828848774`**
> (https://github.com/mkbabb/value.js/actions/runs/28828848774) — auto-cancelled by GH
> concurrency when the captures commit pushed, so the authoritative run rolls forward to the
> latest `master`-HEAD run (`w9-close-probes.md §c.4` — the full mechanic + the deploy-skip
> record). The merged-tree suite re-run (lint 0 · typecheck 0 · vitest 2158/2158 · e2e 66/66
> across 6 projects · gh-pages built) is the authoritative green; CI is captured, not re-gated.

---

## §1 — Per-wave verdicts (goal-vs-landed reconciled; misses named)

| Wave | Verdict | Gate evidence | Goal-vs-landed reconciliation | Misses → successor |
|---|---|---|---|---|
| **S.W0** substrate | **complete_with_misses** (2026-07-05) | Independent 8-row certification: 7 PASS + 1 MISS-RECORDED, zero FAIL. `12af143` honest dev-backend · `b339e37` oracle floor (smoke-safari in CI, hard Lighthouse, shader-compile guard, WebGL appearance asserts) · `a9c5854` probes/discharges · `36f918d` dead-surface grep-zero · `477916b` router scope · `4567a81` blob-genesis brief (relayed to the producer inbox @ their `3188171`) · `adab17a` dep ledger (11 devDeps excised, lockfile −2743) | Goal met: `npm run dev` round-trips palettes locally; the oracle floor stands. One recorded deviation: the readPixels WebGL oracle substituted with per-canvas draw-call counting (rationale in `e2e/smoke/fixtures/webgl-appearance.ts`) | The CI-LOG miss: `ci.yml` fires only on master push/PR — the workflow-log proof lands at the close-merge push (amended here when observed) |
| **S.W1** library → 3.0.0/3.1.0 | **complete** (2026-07-05, re-gate CLOSE) | **The honest chain, on the record**: 3.0.0 published (`1537fed`, tag `v3.0.0`) → independent 11-row gate **BLOCKED 9/11** (ICtCp/Jzazbz shipped as conversion pairs only vs the claimed full spaces) → remediation `964c399` (full space classes + parsing + dispatch + `color2Into` + demo `DisplayColorSpace` rows; CHANGELOG [3.0.0] corrected in-place) → **3.1.0 published** (tag `v3.1.0`, `latest`; v3.0.0 never moved) → re-gate CLOSE (16/16 HDR integration tests). Close authority: `audit/w1-close-artefacts.md` (§6 corrected, §7 blemish) | Goal met at 3.1.0: srgb dark-band cured (independent hand-computed oracle, okhsl band reinstated) · logerp t-last (zero t-first sites repo-wide) · color-soa excised · raytrace ≤4.05e-4 vs Ottosson over 7,551 OOG colors · 7 caches bounded · W1-8 god-module round · PT-E → parse-that `ef10d5b`, KF-COURTESY → keyframes `ad1b811` | None open. The publish-lane certification blemish → §7 lesson 1 (the process record, not a work miss) |
| **S.W2** transposition | **complete** (2026-07-05) | 10-row gate ALL PASS after 2 remediation steps + the `99dcb5e` persistence lift (`audit/w2-close-artefacts.md`). `useColorPipeline` ONE model (useColorModel/useAppColorModel deleted; stableHue bit-for-bit); URL-hash-wins + localStorage restore proven by the standing `url-color-precedence` e2e; `useApiClient` DI seam (0 direct `apiAvailability` imports); W2-8 Services-in (0 `Context` under services/; api 224/224); vue-router `^5.1.0` code-free (K-W5RT landed) | Goal met: the spine is one explicit graph. W2-3 Normalized/Display brand **DECLINED-mechanical by decision doc** (`audit/w2-3-brand-decision.md`) — not a drop: re-booked src-owned post-W1 (§5) | W2-3 re-book → §5 |
| **S.W3** perf budgets | **complete_with_misses** (2026-07-05) | 7-row gate: 6 PASS + 1 MISS-RECORDED, zero FAIL. Budgets on the built bundle: drag p50 8.4 ms (≤20) · view-switch first frame 8.3 ms (≤100) · idle p50 8.3 ms (≤13) · 0 long tasks · CSS 85.9 KiB **MET** (≤120, was 184.2; W3-9 `7c3c597`) · 0 ungated idle rAF · mix ONE 900 ms Safari-true clock (`5c700fe`, Q10). π motion archives both halves. New standing oracle: `smoke-perf` (3 frame-budget specs) | Goal met except one row: the JS-eager ≤280 KiB gate is unreachable in-bounds (346.4 measured; vendor 32% prohibited lever + the goo-blob barrel anchor) — **on-record RE-BASELINE** per §Triumvirate, producer ask L20 dispatched (addendum A5 → glass-ui `60fe642a`) | **RP-2**: JS-eager re-baseline stands at close (347.9 KiB, §6.2) → L20 + W8 re-verify |
| **S.W4** picker + docs | **complete** (2026-07-05) | 8-row gate CLOSE, **taste bar MET** (independent non-authoring Fable review); W4-1 title-as-component (four-state ink grammar live); W4-2 header re-composition (Lab one line at 1440); W4-4 real-TS snippet extractor + build-failing guard (30/30 goldens); W4-6 math pipeline WebKit-verified; W4-7 display voice ×9 (Q5); W4-8 one hljs theme. π archive + DELTA `audit/pi/w4-{before,after}/` (`b8c6f8d`) | Goal met. W4-5 took the **sanctioned booked path** (verify-first proved SegmentedTabs' pill can't yield to the WatercolorDot ring → the S-3 book FIRED, record `38d83e4`); L18 discharged-by-producer | S-3 producer letter-rail variant → §5 |
| **S.W5** suffusion II | **complete** (2026-07-06) | Gate 7/8 PASS + the row-8 cap breach **cured same-day** (`035b02c`: App.vue 432→398 via `useAtmosphereBoot` lift, PaletteCard 402→400; **the false compliance claim append-corrected** on the board). A2 CRUD truth (Q1 full wiring; cursor pagination; `/remix` retired demo-side = the K-W3DIFF alt-exit TAKEN); Lane A loading grammar (3 `Loader2` skeleton sites dead; error ≠ empty; Q6 true-empty); Lane B extract/mix/generate; Lane C gradient (atomic parse; the L×C perceived-space plate on W1-6's export; the owner webbing rider landed). π archives ×3 lanes; suites 2145/2145 · e2e 66/66 | Goal met after the same-day cure. Recorded deferral (a book, not a miss): physical `/remix`+`/diff` api route deletion → a future api-hygiene pass | api-hygiene deferral → §5 |
| **S.W6** atmosphere + hero | **complete_with_misses** (2026-07-05) | 9-row gate: 5 PASS + 4 MISS-RECORDED, zero FAIL. W6-1 cold-boot seed integrity + designed entrance (`060b7fb`); W6-7 pointer door consumed (`cd177d7` — L19 never fired); W6-8 amber wash dead both schemes; W6-4 blob redress (`d843ae7`, Q7 full presence, 390 perf gate GREEN); W6-5 Safari (L1 cure confirmed live on WebKit, sustained-30s hard gate). π four-quadrant pairs + DELTA (`0d82e38`) | Goal met on the demo halves; the producer halves recorded honestly, no shims (S-21 fence held — S touched ZERO glass-ui files) | The 4 named misses: **GAP-L2** (lightness atoms door absent) · **GAP-L5** (bead/satellite producer halves) · row-9 residual routes · the mid-gate owner recalibration (tuning pass dispatched, landed `fe30d68`) — all → §5 |
| **S.W7** dock + shell | **complete_with_misses** (2026-07-06) | 7/7 rows PASS. W7-1 wax seal (`96a12ed` — label+chevron deleted; rim ≡ ring, one custom property — handoff judged INTENTIONAL); W7-4 gamut-guarded 9-accent derivation (`33ba703`, WCAG ≥3:1 incl. C≈0; 13-test standing oracle + `audit/w7-accent-table.md`); W7-3 L4 producer cure VERIFIED LANDED (`7549772`); W7-5 full-swap 7.8 ms / re-reproduced 5.7 ms, 0 long tasks. π quadrant + independent verifier re-capture 16/16 (`2a32245`). Suites: vitest 2158/2158 · e2e 66/66 | Goal met; the one MISS = **PRM-expand** ROOT-CAUSED producer-side (kf `springPlay`'s PRM snap arm emits subscribers-only, never `_onFrame` — `audit/w7-furniture-records.md §1`); gap-row, no workaround | PRM-expand → §5 (W8 re-verify) |
| **S.W8** 5.0.0 adopt | **NOT DISPATCHED** — trigger never fired (recorded as-is; books never gates) | Trigger probed at W7 close and re-probed 2026-07-06: glass-ui registry `latest=4.2.0`, **no v5 tag**; `../glass-ui` @ `c3ea22a8` still `tranche/BG` (BH B3 in flight) | Not a miss: a trigger-gated wave whose trigger did not fire inside S's window. The wave doc + the §3.10 MIGRATION walk hand to the successor intact | The adopt event + CI un-pin + L17 rename + every producer-gap re-verify → §5 |
| **S.W9** close | **complete_with_misses** (2026-07-06) | The verification act ran, not paperwork: §10 ledger reconciled row-by-row **zero-drop** (`w9-close-probes.md §1`) · every §7 book re-probed live (§2 there) · repo-wide sweeps re-run (caps/legacy/`as any` — §4 there) · §6.2 budgets re-measured on the built bundle (§5 there) · ι sweep CLEAN over `46ff8d3..a4e45f7` (§7 there) · π reviewed by a NON-authoring agent (COHERES_WITH_NOTES). Gate suite at close head: lint 0 · typecheck 0 · vitest 2158/2158 (68 files) · gh-pages built; e2e 66/66 across 6 projects at W7 close (`2a32245`) | Goal met with 2 RED PROBES named, per the no-workaround law: **RP-1** App.vue 408 (W7 re-breach, no cap row) — **CURED same-day** `2522656` (399 LoC, record `cc95a31`; e2e re-green) · **RP-2** JS-eager over gate (standing re-baseline). π review surfaced **PI-DRIFT-1** (dev-vehicle `mode="out-in"` strand; shipped bundle verified healthy) — routed, never patched in-wave. **Ceremony FIRED 2026-07-06** (header note; `w9-close-probes.md §ceremony`): merge `4a6b62b` · tag `tranche-s-close` (`5bb2d59`) · worktree list = main only · CI run `28828848774` (W0 CI-log deferral discharged) | RP-2 → §5 · PI-DRIFT-1 → §5 · master merge + tag + worktree cleanup DONE (`4a6b62b`) |

---

## §2 — The §10 zero-drop ledger, reconciled

The full row-by-row reconciliation is `audit/w9-close-probes.md §1` — the close does not
duplicate it, it certifies it:

- **§10.1 S-1..S-24**: every anchor landed at a CLOSED wave or carries a recorded
  producer-gap/book routing to the un-fired S.W8 adopt (probes §1 table, per-anchor commit
  cites). **Zero drops.**
- **§10.2 lane P0/P1** (30 rows): all reconcile to their named wave items; the load-bearing
  rows spot-verified against commits (srgb `789061a` · parsing `b670086`/`1f1d351` · CRUD
  `ce64b8d` · pipeline `94e3e43` · mix one-clock `5c700fe`). The motion lane's "P1-7" phantom
  cite stays flagged for successors (S.md §10.2 note).
- **§10.3 census verdicts**: ADOPTED set intact; KILLS carried unchanged (R-8 · sibling-index ·
  device-cmyk · ICC — none reintroduced, grep-verified); OVERRIDDEN: none.
- **ι integrity**: every commit `46ff8d3..a4e45f7` scope-honest; no unscoped sweeps (the R
  `4963f33` blemish class hunted, not found) — probes §7.
- **Sweeps**: src caps map to census verdicts/W1 ledger rows (no new god-module); demo ≤400
  green after the RP-1 cure; legacy grep clean; the `as any`/`as unknown as` ledger regenerated
  and **matches CLAUDE.md exactly** (src 0 real `as any` / 8 `as unknown as`; api 0 / 1) —
  probes §4.

---

## §3 — Publishes

| Cut | Commit / tag | Contents |
|---|---|---|
| **3.0.0** (2026-07-05) | `1537fed` · `v3.0.0` (immutable — never moved) | The one honest library major: near-black `srgbToLinear` decode cure (output-changing ≤10/255 band, named as such) · `logerp` t-last reorder (Q2 ruling) · `color-soa.ts` excise (Q3) · the W0-9 self-dep excision — **all on the by-name MIGRATION table, `CHANGELOG.md [3.0.0]`**. Additive: raytrace gamut map (Q8) · `sampleOKLChSliceBoundary` · `resolveEasing` · `safeAccentCssString` · parsing P0s + cache bounds |
| **3.1.0** (2026-07-05) | `964c399` · `v3.1.0` (`dist-tags.latest`) | The W1 remediation cut: ICtCp + Jzazbz as **full public spaces** (classes + parsing + `color2()`/`color2Into` + demo picker rows); the [3.0.0] CHANGELOG corrected in-place. The chain (publish → BLOCKED 9/11 → remediate → re-publish → re-gate CLOSE) is the record, §1 W1 row |

---

## §4 — The owner rulings of 2026-07-05/06 (all six, with implementation records)

| # | Ruling | Encoding | Implementation record |
|---|---|---|---|
| 1 | **Card width** — "about 1/3 smaller… maybe 1/4" | `audit/OWNER-RULING-2026-07-05-card-width.md` §1 | **§2 there** — `--pane-max` 44→**32rem** landed `52c5fd4` (30rem tried + rejected on About-label mid-word wrap); readout locks verified across all catalog spaces; π-close judged the NEW geometry; re-verified numerically at close (512 px at 1440 — `w9-pi-review.md §2`) |
| 2 | **Aurora entrance** — load darkening/lightening too explicit | `audit/OWNER-RULING-2026-07-05-aurora.md` §1.1 (W6-1 rider: no explicit load snap; deferral stays, the ARRIVAL gets designed) | W6-1 `060b7fb` — `--saved-bg` IS the derived base stop; the cold-load e2e seeds a stale hot-pink session and proves first-frame settle, both schemes; re-verified at close (13-frame cold cadences, no snap at any point — `w9-pi-review.md §2`) |
| 3 | **Aurora strong field + greater C/H variance** | aurora ruling §1.2 (amplifies W6-3; producer atoms = the L2 amplification, addendum A3) | W6-3 landed triad/colorEnergy 0.82 — then **superseded by ruling 6's pull-back** (below); the mid-gate recalibration recorded on the W6 gate (`ae7112d`) |
| 4 | **Aurora pointer interactability** | aurora ruling §1.3 (NEW W6-7 + the L19 hedge) | W6-7 `cd177d7` — the producer pointer door EXISTED (`setCursor`/`injectCursorVelocity`) and is consumed; one pointer grammar with the hero; **L19 never needed to fire** (richer field-warp door stays open, addendum A4) |
| 5 | **Alpha-slider checkerboard** — subtle, idiomatic | `audit/OWNER-RULING-2026-07-05-alpha-checker.md` §1 | **§2 there** — ONE `--alpha-checker` token landed `695cca1`, composed under every alpha ramp (picker slider + gradient editor bar/handles/preview); found + routed the producer dist minification defect (dropped unprefixed `backdrop-filter: none` → addendum A6, `9d1297b`); checker re-verified under every ramp at close, both schemes |
| 6 | **Variance recalibration + the webbing facility** — "a bit too strong… webbing far too low res… flesh out the facility" | `audit/OWNER-RULING-2026-07-05-variance-webbing.md` §1 | **§2.1 there** — the pull-back landed `fe30d68` (analogous anchor±28°, colorEnergy 0.7 — the calibration of record, `ruling-shots/judged-analog070-*`); its STEP-0 reproduced + routed **GAP-ARM** producer-side (`3f118c4`, addendum A7 `008a155`). The webbing half: cured `6955fca` (W5 Lane C finalization row, `1956ed8`) — device-resolution raster (CSS×dpr), `WEBBING`/`SECOND_NET` token tables in the ONE `@lib/gamut-ink` home, zero per-surface copies; dpr-2 crispness re-verified at close (`w9-pi-review.md §2`) |

---

## §5 — The books table handed to the successor (supersedes R FINAL §5; the successor's supersedes this one)

Books, never gates. Every row re-verified against the live world 2026-07-06
(`audit/w9-close-probes.md §2/§3/§6` — dated probes, evidence per row).

| Book | Trigger | State at S close (2026-07-06) |
|---|---|---|
| **glass-ui 5.0.0 adopt event** (= S.W8, handed intact) | the BG/BH joint cut | **NOT FIRED** — registry `latest=4.2.0`, no v5 tag; `../glass-ui` @ `c3ea22a8` (`tranche/BG`). The successor runs `waves/S.W8.md`'s MIGRATION walk at the cut |
| CI checkout un-pin from `tranche/BG` | the 5.0.0 master landing | KEEP-BOOKED (the R.W7 `102b37b` book carries a second tranche) |
| L17 GooBlob→`Blob` rename consume | the 5.0.0 cut | NOT FIRED — exports still `./goo-blob` only |
| **GAP-L2** — aurora lightness-scheme atoms door | W8 adopt re-verify | OPEN — `atoms.ts` has no `lightnessScheme`/`lBand`/`hueSpread`/`chromaVariance`; the dark L band `[0.18,0.42]` unreachable (dark field stays light-band material) |
| **GAP-ARM** — aurora cold-load arm-replay | W8 adopt re-verify (fix is one honest replay: `inst.update(getCfg())` after `arm()`) | OPEN — `useAurora.ts:212–228` unchanged; **user-visible on prod** (§8) |
| **GAP-L5** — blob co-rebuild producer halves (HERO preset · `uSatColor[]` · satellites-at-rest) | W8 adopt re-verify | OPEN — demo geometry halves LANDED (`d843ae7`); genesis brief in the producer inbox (their `3188171`) |
| **PRM-expand** — dock never expands under PRM | W8 re-verify (keyframes) | OPEN — kf `springPlay` PRM snap arm emits subscribers-only, never `_onFrame`; the one-line cure unlanded (`w7-furniture-records.md §1`) |
| **L20** — `goo-blob/config` subpath | W8 re-verify; landing ≈ −33 KiB eager | OPEN — subpath absent; anchors **RP-2** |
| **RP-2** — JS-eager RE-BASELINE (347.9 KiB gz vs ≤280) | L20 landing + the W8 walk | OPEN — standing on-record re-baseline from W3; +2.5 KiB W4–W7 shell drift recorded, not reconciled (probes §5) |
| Open GLASSUI-S-ASKS: L2 · L3 · L5 · L6 · L7 · L8 · L9 · L10 · L11 · L12 (time-sensitive: before BH.B4e's MIGRATION table) · L13 · L14 · L15 · L16 | the W8 adopt walk | OPEN — per-item live-verified table at probes §6. **CURED by producer: L1, L4, L18; CONSUMED: the L19 pointer door.** No demo shim exists for any open item |
| **S-3** — producer letter-rail variant | fired at W4-5 `38d83e4` (SegmentedTabs pill can't yield to the WatercolorDot ring) | FIRED + OPEN — the ask rides the producer letter/W8; demo carries the sanctioned re-home meanwhile |
| **X1** — prod api deploy (R.W7 residue, second carry) | maintainer-on-host (§8; exact instructions R `FINAL.md §7`) | OPEN — prod STILL I-era (`/health` 404 · `/palettes/:slug/diff` 404 · `/openapi.json` 404; `/` 200 I-era shape); webhook `deploy.babb.dev/hooks/value-js` STILL 404. **[FIRING NOTE 2026-07-09 — the book FIRED into T: the T ratification's §2 CI/DEPLOY MANDATE (`T/audit/RATIFICATION-2026-07-09.md`, cascade 5) moved X1 from maintainer-book to the W0-EXECUTABLE item T.W0 W0-X1 (executed-or-honest-record)]** |
| **X2** — NCSU-alias retirement (R.W7 residue, second carry) | maintainer on the NCSU VPN (§8) | OPEN — `mbabb.fi.ncsu.edu/colors/` answers 200, no redirect. **[FIRING NOTE 2026-07-09 — the book FIRED into T: VPN/SSH access to `mbabb.fridayinstitute.net` GRANTED per the T ratification §2; X2 moved to the W0-EXECUTABLE item T.W0 W0-X2 (probe-first caution law; executed-or-honest-record)]** |
| **W2-3** — Normalized/Display brand (src-owned re-book) | a successor src wave against the settled color tree | OPEN NEW — not a brand-and-cast: a boolean-literal-param + conditional-return-type redesign of `normalize.ts` across ~58 callsites (`audit/w2-3-brand-decision.md`) |
| `/remix`+`/diff` api-hygiene | a future api-hygiene pass | OPEN deferral — demo-side retired (K-W3DIFF alt-exit TAKEN at W5-13); physical routes still live in `api/src/routes/palettes/forks.ts` + `services/palette/forks.ts` |
| **dup-`useDark`** demo residue | a successor demo cohesion lane | OPEN — `useContrastSafeColor.ts` ×2 + `useViewAccents.ts` ×1 private instances → fold onto `useGlobalDark` (W4-noted, architectural, not a correctness break) |
| **PI-DRIFT-1** — `mode="out-in"` dev-vehicle strand | a successor demo fix lane (natural cargo beside dup-`useDark`) | OPEN NEW — extract developed plate never mounts on the DEV vehicle (`ExtractWorkbench.vue:88`); the PaneSlot precedent applies; **7 further `out-in` sites to audit** (`w9-pi-review.md §4`); shipped bundle verified healthy. Rider: make `pi-w5b`'s swallowed wait hard-fail |
| `Color.try()` | demand for a non-throwing parse | KEEP-BOOKED — soft signal now **12** demo try-wraps (drift 11→12 on the record, not reconciled); does not clear the bar |
| S.H3 Pratt consume-edge | parse-that presents the sketch | KEEP-DORMANT — PT-E delivered (`ef10d5b`), no reply expected soon (parse-that at 0.11.0); do NOT pull forward |
| FN-7 doc-relocation | fourier-N execution | KEEP-BOOKED (de-urgented; in-tree note holds) |
| `usePaletteStore` schema migration | first `version` bump past 1 | KEEP-BOOKED, DORMANT — still `version: 1` |
| kf `resolveEasing` convergence | kf's next easing-surface touch | KEEP-BOOKED — courtesy record delivered (`ad1b811`) |
| CH-10 · CH-13 · R8-23 · R-5 · R-10 | as recorded | KEEP-BOOKED — the W9 spec-status recheck ran (probes §3, live-verified with sources): `if()` Chromium-only, `random()` Safari-TP-only (neither Baseline) · scroll/view-timeline longhands not universal Baseline (value.js already parses them) · rec2100 HDR module still W3C draft. **No fired-but-unnoticed trigger** |

Relay dispositions at close (probes §6): GLASSUI-S-ASKS per-item above · PT-E delivered, no
reply (hand as-is) · KF courtesy delivered · the motion-inventory W9 docs-patch APPLIED
(M1/M3/M5 dispositions recorded in `audit/lanes/motion-animation-inventory.md`).

---

## §6 — The standing oracle slate (the successor's inherited floor)

- **smoke-safari in CI** (W0-2 `b339e37`): iPhone-14 WebKit incl. the sustained-30s
  context-loss probe + shader-compile guard + WebGL appearance asserts.
- **Hard Lighthouse** in CI (W0-2).
- **Frame budgets**: the `smoke-perf` project (3 transition-family specs, W3 `54135fd`) —
  e2e is now **6 projects** (CLAUDE.md "5 projects" + `waves/S.W9.md §Hard gate 7` are stale
  on this count — doc-truth residual for the successor's first doc pass; recorded, not
  silently patched here).
- **The π matrix**: 7 paired before/after archives + 7 committed harnesses
  (`audit/pi/`), re-run cold at close by the NON-authoring reviewer — 167 shots + 5 videos,
  every harness exit-clean, manifests byte-stable modulo timestamps (`w9-pi-review.md §1`).
- **The view-accents oracle**: 13-test standing suite (W7-4 `33ba703`, `audit/w7-accent-table.md`).
- **The URL-precedence e2e** (`url-color-precedence`, W2) + the atmosphere-cold-load e2e (W6-1)
  + the gradient §6.1 spec (7/7, W5 Lane C).

### §6.2 — Close numbers (re-measured 2026-07-06 on the built bundle; probes §5)

| Gate | W3 close | **S close** | Gate | Verdict |
|---|---|---|---|---|
| JS eager gzip | 345.4 KiB | **347.9 KiB** | ≤ 280 | **RE-BASELINE (RP-2)** — 67.9 over; +2.5 KiB W4–W7 shell drift, both figures on record |
| Render-blocking CSS gzip | 85.5 KiB | **86.5 KiB** | ≤ 120 | **MET** (33.5 headroom) |
| Eager cold-load (JS+CSS) | 430.9 KiB | **434.4 KiB** | measured | recorded |
| Frame budgets | drag p50 8.4 ms · view-switch 8.3 ms · idle p50 8.3 ms | W7 re-repro: full-swap 5.7 ms · 0 long tasks | ≤20 / ≤100 / ≤13 | **carried green** from the W3/W7 standing oracle (headless GPU re-drive unreliable — recorded honestly, not re-asserted) |

Suites at close head (`a4e45f7`, re-run by the probes lane): lint **0** · typecheck (lib+demo)
**0** · vitest **2158/2158** (68 files) · `npm run gh-pages` **built** · e2e **66/66** across
6 projects at W7 close (`2a32245`).

---

## §7 — Process lessons

The eleven `S.md §13` lessons carry unamended (live-tree contradiction resolution · wave-green
≠ repo-green · producer drift as designed-for · books discharge silently · test comments are
not filings · rate-limit recovery · isolated probe contexts · bounded numbers + recorded
baselines · HEAD-stamped producer claims · census imprecision propagates · "breaking changes
are fine: always"). S's own additions:

1. **A MET on an integration row must cite a test driving the INTEGRATED surface.** The W1
   publish lane certified rows it never verified (ICtCp/Jzazbz pairs-only shipped under a
   full-space claim); the independent gate caught it, and the honest chain — publish →
   BLOCKED → remediate → re-publish → re-gate — is the recovery shape of record
   (`w1-close-artefacts.md §7`).
2. **The session-limit lane-death recovery pattern is proven, ×4 this tranche** (W0-9
   executor · W5 Lane C mid-W5-8 · the Lane C finalization residue · the pull-back lane's
   STEP-0 handoff): recover the work-order from the lane journal, audit the partials, FINISH
   them — never blind-commit, never discard. A dying lane's last observation can be the
   tranche's most valuable finding (STEP-0 → GAP-ARM).
3. **Mid-gate owner recalibration: the gate judges the recalibrated bar.** The W6 row-8 taste
   re-judge (`ae7112d`) + the sanctioned tuning pass (`fe30d68`) show the shape: owner rulings
   are the routing authority (over even the triumvirate's iteration halt); a landed overshoot
   is a calibration between poles, not a reversal.
4. **Shared-tree multi-workflow discipline held**: single-writer intra-round ordering (W4-2
   before W3-4; W2-2/W2-7 sequenced LAST), hunk isolation for cross-lane rebases (`b014ffe`),
   lane worktrees cut from the tranche head. Zero merge-conflict triumvirates fired.
5. **The cap sweep belongs in EVERY wave gate, not only the close.** RP-1 re-proved lesson 2's
   converse: W5 cured App.vue to 398, W7 re-breached it to 408 with no cap row, and only the
   close sweep caught it. Repo-wide sweeps are cheap; run them per-wave.
6. **π harness waits must hard-fail.** `pi-w5b`'s swallowed developed-plate wait let
   PI-DRIFT-1's class hide inside a green harness run (`w9-pi-review.md §1/§4`) — a wait for
   the state a shot exists to record is a gate, not a courtesy.

---

## §8 — Residuals for the maintainer (verbatim-carried; nothing here is agent-executable)

1. **X1 — prod api deploy** (second-tranche carry). The `value-js` hook is unregistered in the
   adnanh/webhook config on `deploy.babb.dev` (receiver root answers 200; the hook 404s).
   **Op**: register the hook on-host, then push `master` (the webhook fires on `ref==master`)
   so `deploy-hook.sh` lands the current api. Until then `api.color.babb.dev` serves the
   pre-R I-era api (R-era routes 404). Exact instructions: R `FINAL.md §7`.
2. **X2 — NCSU-alias retirement** (owner order "no ncsu alias"; second-tranche carry).
   SSH to `mbabb.fi.ncsu.edu` times out off-campus — a named human trigger. **Op** (on the
   NCSU VPN/campus): remove the `/colors/` proxy block (`api/apache-vhost.conf:19-27`), let
   its DNS/cert lapse, AFTER confirming `color.babb.dev` serves HEAD lineage. Verification =
   the alias going non-200; the observation amends this row + the S/R book records.
3. **GAP-ARM is user-visible on prod until the producer ships.** Every cold page load paints
   the aurora from the pre-hydration DEFAULT pick (the hot-pink family) instead of the URL/
   session seed, until the first picker interaction — the glass-ui `useAurora` arm-gap
   (`OWNER-RULING-2026-07-05-variance-webbing.md §2.1` STEP-0; addendum A7). The cure is
   producer-side (one honest replay after `arm()`); value.js consumes it at the W8 adopt +
   repin. No demo workaround exists by design (KISS-rejected contrivance).
