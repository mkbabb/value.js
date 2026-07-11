# T.W2 — CLOSE ARTEFACTS (the round-2 gate, consolidated)

**Wave**: T.W2 — THE BOOT OVERTURE + THE LIVING FIELD (W2-1..W2-5 + the 5b PRM rider — the
single-writer boot lane: `demo/color-picker/composables/boot/*` + `App.vue` + `index.html`).
**Closed**: 2026-07-10, branch `tranche-t` (merged at `b0bef69`; round-2 head `e1151de`).
**Verdict**: **`complete`** — the round-2 CLOSE gate re-ran the 11-row `T.W2.md §Hard gate` and
returned **9 PASS + 2 MISS-RECORDED, zero FAIL**. The two MISS-RECORDED rows (5-owner-frames · 6
O-3 headed real-GPU) are the sanctioned **headed-GPU / gitignored-archival environment class** the
close brief names as acceptable — each carries an honest committed record + the committed,
re-runnable harness (`pi/w2/w2-annex.mjs`); the gate declares them **non-downgrading** (zero rows
FAIL). The two born-RED-by-design legs (O-5 spike · O-26 headless) reproduced exactly as
`test.fail()`-passing under the round-2 runs — the correct designed state, cite-routed to W7, never
a miss (the S "a book, not a miss" precedent). This matches the boot-lane's own `complete`
self-close (event row 141).
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins → `MANDATE-2026-07-06.md §0` +
addenda (incl. §0.5 T-30/T-31/T-32) → `SYNTHESIS.md` as-hardened §3 (T.W2) + §6.1 → `waves/T.W2.md`,
with every file anchor re-derived against `audit/w1-move-map.md` (PP-11 — the boot chain lives at
`demo/color-picker/composables/boot/`).
**This doc consolidates**: the 11 §Hard-gate rows + verdict + evidence **verbatim from the round-2
close gate** (§1) + the two MISS-RECORDED rows → the sanctioned environment class (§2) + the gates
INDEPENDENTLY re-run at round-2, not taken on the lane's word (§3) + the boot-lane commit map (§4)
+ the grep captures (§5) + the minor non-gate observations (§6) + the verification-artefacts index
(§7). The boot-lane's own consolidation is `audit/pi/w2/w2-close-artefacts.md` (the π-lane record
+ the durable harness); **this doc is the round-2 gate adjudication over it.**

---

## §1 — The 11-row §Hard gate (verbatim: each row + verdict + evidence, from the round-2 close gate)

> **1. W2-1**: O-2 real-hydration green (natural `restoreFromStorage`/`useColorUrl`, NOT
> `addInitScript`-seeded) + O-1 color-truth green (settle-stamped `readPixels`, center pixel ∈ the
> DERIVED seed's hue family). The latent pink flash (F-3) provably dead — writer order is the cure.

**PASS** — I RAN both: **O-2 real-hydration GREEN** (natural restore path, persisted `#757200` →
`--saved-bg=#757200`, write-trace `[#757200]`, NOT `addInitScript`-seeded); **O-1 color-truth GREEN**
(settle-stamped `readPixels` `rgb(168,81,85)` → OKLCh h=18.7° inside the derived seed's family
h≈28°). Latent pink flash **F-3 dead structurally** (the writer order is the cure).

> **2. W2-2**: O-1 holds over the gradient ground; the luma leap bounded (PP-10); F-6 dark
> first-run honest (dark-band constant by construction).

**PASS** — I RAN `o1b-ground-luma-leap` GREEN: boot L series `[0.766,0.779,…,0.782,0.783]`
flat/monotone (born-RED ref ≈0.25; |ΔL| well under 0.10). O-1 holds over the ground. **F-6 dark
first-run honest** (dark-band constant by construction). The per-stop `@property --saved-bg-0..3`
template present; `useColorPipeline` comment updated to the stops-not-strings record.

> **3. W2-3**: O-4 beat marks hold order under 6× CPU throttle; O-24 LCP identity + reveal-only law
> green BOTH schemes (run BEFORE any beat lands, re-run after); fonts self-hosted + preloaded (zero
> Google-Fonts requests).

**PASS** — I RAN **O-4 order-invariance GREEN at BOTH 1×** (`b0@9→b1@296→b3@718→b2@1390→b4@1397`)
**AND 6× CPU throttle** (`b0@43→b1@2161→b3@3926→b2@4758→b4@4886`) — the DAG order
`b0<b1<{b2,b3}<b4 ∧ b2<b4` invariant; the spec asserts every edge. I RAN **O-24 GREEN both schemes**:
the SAME `<div rounded-card text-card-foreground>` plate owns LCP in light (3800ms) and dark
(1848ms), opacity=1 — the reveal-only law bound; `overture.css` confirms the LCP card land =
shadow/transform-only, opacity pinned 1 from B0, naming the exact former `from{opacity:0}` breach
cured. **Fonts**: I independently confirmed ZERO Google-Fonts (no googleapis/gstatic refs anywhere;
4 self-hosted Fraunces woff2; same-origin `@font-face` + preload in `index.html`); the headed annex
log shows google-fonts=0 both schemes.

> **4. W2-4**: no-pop assert green (the reveal composes from the `emerging` state; no first-frame
> fully-formed blob).

**PASS** — I RAN `blob-presence-mobile` GREEN: the canvas emerges from the goo-scale pose
(0.35×204.8=71.68px arrival, polled live) up to the settled 204.8px 8rem footprint — no first-frame
fully-formed blob. `overture.css` `blob-emerge` composes from `opacity:0`/scale via the FSM
`emerging` state, backwards fill.

> **5. W2-5**: O-6 bracket resolver test green (pure function); O-26 perceptibility gates hold; the
> drag path byte-identical (diff evidence); owner eye-judge frames archived across green/warm/neutral,
> both schemes.

**PASS** — I RAN **O-6 aurora-bracket vitest 6/6 GREEN** (energy strictly inside (0.7,0.82),
vividness monotone/endpoints, T-32 ceiling + scattered rows). **O-26 headless born-RED-by-design**
(I ran it: 10s migration 0.000/255 < 4, `test.fail()` → expected-pass; the authoritative
perceptibility read is the headed annex 1.54/9.20/2.19 PASS). **Drag path BYTE-IDENTICAL across W2**:
I verified `SpectrumCanvas.vue` + `ComponentSliders.vue` empty diff, `useColorPipeline.ts` code-hunk
grep empty (comment-only, token-rename docs); `SpectrumPlateCaption` was a W3-5 change, outside the
W2 drag scope. (Owner eye-judge frames → row 5-owner-frames.)

> **5-owner-frames** (from row 5): owner eye-judge frames archived across green/warm/neutral seeds,
> both schemes (W8-package inputs; brackets, not points).

**MISS-RECORDED** — Owner eye-judge frames (green/warm/neutral × light/dark = 6, real-GPU headed).
NOT confirmable from the committed tree — the `*.png` are self-ignored per the standing S π
convention, archived on-disk in the now-cleaned worktree `worktree-wf_5011a3ae-57c-1`. The committed
record (`pi/w2/w2-close-artefacts.md §5/§6`) documents them with renderer + specifics; the generating
harness `w2-annex.mjs` IS committed. **Honest environment constraint, not a defect** — a
non-downgrading recorded miss (§2).

> **5b. PRM scoping rider** [AMENDED-AT-HARDENING — h-refine-overture F-9]: gates O-4 · O-5 · no-pop
> run PRM-OFF (choreography leg); the O-3 headed annex adds ONE PRM-ON run per scheme asserting the
> instant-states law — first content frame ≡ the settled composition.

**PASS** — The choreography leg (PRM-OFF, Playwright default): I ran **O-4 GREEN + O-5/no-pop** as
required. The PRM-ON per-scheme instant-states leg is structurally cured AND record-verified:
`overture.css @media(prefers-reduced-motion:reduce)` pins field `opacity:1` (removes the b2 0→1 flip
the producer a11y-overrides 0.1s state-fade painted — the `1f5b4b4` root cure); the headed annex log
shows both schemes canvas opacity `{1}` from first frame, 0 beat-family / canvas-targeting animations.

> **6. O-3 headed real-GPU cold-load probe re-run** (returning-user precondition, post-arm
> canvas-pixel asserts, BOTH schemes; screencast-judged order) — the W0 annex re-run at this wave.

**MISS-RECORDED** — O-3 headed real-GPU cold-load annex. The spec correctly `test.skip()`s under
this headless software-GL sandbox (SwiftShader would certify the CSS placeholder, not the live
aurora — SYNTHESIS §6.1). Cannot re-run headed real-GPU here. The committed
`pi/w2/headed-annex-log.txt` is honest + specific: ANGLE Metal Apple M5 Max, BOTH schemes, post-arm
field OKLCh h=33.1°(light)/33.9°(dark) chromatic+hue-family PASS vs seed h≈28°, ordered beat marks;
the harness `w2-annex.mjs` is committed. **Environment constraint, not a defect** — a non-downgrading
recorded miss (§2).

> **7. O-5 pacing variance** green (inter-frame-delta variance / dropped-frame ratio — the T-27
> "jittery" axis measured, not eyeballed).

**PASS** — O-5 pacing HONESTLY-SPLIT as designed. I RAN it: frames=73 · median=58.3ms · the pile-up
leg GREEN (dropped 3/73 = 4.1% ≤ 10% — the five-clock smear dead); the spike leg RED (max 209ms =
3.6× median) → `test.fail()` body fails-as-expected → the suite passes; the RP-2/eager-payload cite
is routed to W7 (the Q14 chain). **A red stays red with its cite** — the correct disposition, not a
miss.

> **8. THE Q14 GATE ROW** (RATIFICATION cascade 2 — PERF REDEMPTION): the overture's LCP contribution
> MEASURED at wave close, the wave's contribution NAMED + attributed against the `28836873580`
> baseline; an UNMEASURED close REDs this gate.

**PASS** — Q14 gate: the PI-1 W2 row EXISTS and is measured/named/attributed
(`pi1-delta-ledger.md:43`): local-lab LCP **4919** (5812/4907/4919) · TBT **125** (2152/105/125); the
LCP contribution NAMED — the reveal-only law (O-24 same-instrument light 2484→2128ms −14%), the
Google-Fonts strike, hydration-first; the remaining PAYLOAD half (FCP≈4353 eager-mount) explicitly
ATTRIBUTED to W7. Line 44 adds the same-instrument CI confirm (LCP 5151/TBT 4223, deltas NOISE per
PP-10). Budgets stay honestly RED, no re-baseline — **measured close, not unmeasured.**

> **9. PP-8 repo-wide sweep · PI-1 delta recorded · lint 0 · typecheck 0 · vitest green · e2e green
> · clean `git status`.**

**PASS** — Sweeps, all RUN by me: `npm run lint` exit 0 (`--max-warnings=0`); `npm run typecheck`
exit 0 (lib+demo — the feared 9-error defect is stale/absent); `npm test` vitest **2192/2192** (71
files); e2e boot/oracle surface GREEN (O-1 · O-2 · O-4×2 · O-1b · O-24 · O-6 · no-pop + walk +
atmosphere-cold-load + page-load — `walk` proves the one-shot-release-law cure of the 20 view-nav
timeouts). **PP-8**: no demo file >400 (PaletteCard/ColorPicker at 400, App 397), casts src 8/0 +
api 1/0, tool-artefact grep over W2 docs empty. `git status` clean.

---

## §2 — The two MISS-RECORDED rows → the sanctioned environment class (books, not downgrading)

Both MISS-RECORDED rows are the **headed-GPU / gitignored-archival environment class the close brief
names as acceptable**; neither downgrades the CLOSE (zero rows FAIL):

- **Row 5-owner-frames** — the owner eye-judge frames (6, real-GPU headed) are self-ignored `*.png`
  (the standing S π convention), archived on-disk in the now-cleaned worktree. The committed record
  (`pi/w2/w2-close-artefacts.md §5/§6`) names them with renderer + specifics; the generating harness
  `pi/w2/w2-annex.mjs` is committed and re-runnable. A W8-package input, not a now-judged datum.

- **Row 6 / O-3 headed real-GPU** — the spec correctly `test.skip()`s under the headless software-GL
  sandbox (SwiftShader would certify the CSS placeholder, not the live aurora; SYNTHESIS §6.1). The
  committed `pi/w2/headed-annex-log.txt` is the honest record (ANGLE Metal Apple M5 Max, both
  schemes, post-arm field h=33.1°/33.9° vs seed h≈28°, ordered beat marks); `w2-annex.mjs` re-runs it
  on real GPU.

Both have honest committed records + the committed re-runnable harness. Per the S "a book, not a
miss" precedent, they are the sanctioned environment class, not defects — the CLOSE stands
`complete` with zero FAIL.

**The two born-RED-by-design legs** are distinct from the above and also NOT misses: **O-5 spike leg**
(max 209ms = 3.6× median, `test.fail()`-passing, RP-2 cite → W7) and **O-26 headless leg** (10s
migration 0.000/255 < 4, `test.fail()`-passing; the authoritative read is the headed annex
1.54/9.20/2.19 PASS). A red stays red WITH its cite — the correct designed state, routed to W7/W9.

---

## §3 — Gates INDEPENDENTLY re-run at round-2 (not the lane's word)

The round-2 gate did NOT take the boot-lane's word — it re-RAN the load-bearing oracles:

1. **O-4 order-invariance at 6× throttle** (the gate-3 non-local-failure tripwire) — RAN under the
   round-2 head: no beat reordered at either 1× (`b0@9→b1@296→b3@718→b2@1390→b4@1397`) or 6×
   (`b0@43→b1@2161→b3@3926→b2@4758→b4@4886`). The DAG order held.
2. **O-24 LCP-element identity across schemes** — RAN: the SAME `rounded-card` plate owns LCP in
   BOTH light (3800ms) and dark (1848ms), opacity=1 → the reveal-only binding is on the correct
   element, in both schemes.
3. **Drag-path byte-identity** (the §No-workaround prohibition) — INDEPENDENTLY confirmed W2-scoped
   (`060fa69..b0bef69`): `SpectrumCanvas.vue`/`ComponentSliders.vue` no diff; `useColorPipeline.ts`
   comment-only. The app's best living moment is untouched by the calibration wave.
4. **O-6 aurora bracket** — RAN vitest 6/6 (energy strictly inside (0.7,0.82); vividness
   monotone/endpoints; the T-32 ceiling + scattered rows).
5. **The born-RED legs reproduced** — O-5 spike + O-26 headless both re-RAN as `test.fail()`-passing,
   the designed state, consistent with the integrator notes and the wave's `complete` close.

No `demo/` fork of `useAurora` observed; the GAP-ARM demo half is the hydration-first ordering law
(O-1/O-2 green prove the field IS the derived material), not a patched producer surface — the PR-2
fence held.

---

## §4 — Boot-lane commit map (the single-writer boot lane + integration merge)

The boot lane (branch `worktree-wf_5011a3ae-57c-1`, cut from the W1-close head `c63f9aa` with the
owner-findings commit `060fa69` merged in); per-item detail is `pi/w2/w2-close-artefacts.md §1`.

| Commit | Item |
|---|---|
| `5cdccb5` | O-24 mint — LCP identity + reveal-only probe, the BEFORE record (`pi/w2/o24-lcp-before.md`) |
| `ed24358` | **W2-1** hydration-before-derivation (the R11 NEW-BUG cite in-body; O-2 + O-1 flip records) |
| `f354f42` | **W2-2** the gradient ground (`--saved-bg-0..3` @property template; luma-leap gate minted; F-6 dark-honest) |
| `b496952` | M-15 routed hunk (`derivedLightness` exposed; `BG_LIGHTNESS_DARK/LIGHT` retired — recorded for W3's log) |
| `e02fa61` | **W2-3** THE OVERTURE (B0–B4 gating DAG · LCP reveal-only · self-hosted fonts · appear grammar · dock veil interim) |
| `400fe15` | **W2-4** the emerge beat (B4 consume; FSM `emerging` interim; no-pop by construction) |
| `244459e` | **W2-5** T-26 calibration Q2-NOW (energy 0.76 · softmaxBeta 4 · breath 26 · vividness=f(seedC); O-6 minted) |
| `c7e0816` | §Recovery brief (the wall audit + work-order — `audit/recovery/T.W2-boot-brief-2026-07-10.md`) |
| `1f5b4b4` | gate-5b PRM fix — the field pinned at terminal opacity (the producer a11y-overrides forced-fade root cure) |
| `73762b2` | W2-5 rider — T-32 zones: `arrangement: scattered` landed; count-ceiling producer book (MAX_NUCLEI=6) |
| `a25c4d2` | PP-8 cap cure — `boot/overture.css` grammar sheet + `boot/useDockArrival.ts` (App.vue 397 · ColorPicker 400) |
| `eb6d9a6` | the one-shot release law (`backwards` fill) + cold-load settle-band poll — 20 view-nav failures root-cured |
| `d5b3e4d` | dock reveal waits TIME-DRIVEN finite animations only — the WebKit veil-forever cured (smoke-safari catch) |
| `bcb77bb` | settle-stamped measurement — the write-through convergence pair + emerge-aware presence poll |
| `f1dbc30` | the wave-close record — gate table, suite-truth story, Q14 W2 ledger row, T-32 record, PROGRESS |
| `b0bef69` | **merge(T.W2 · boot/overture lane)** — hydration-before-derivation · gradient ground · the OVERTURE beat-DAG · emerge beat · Q2-NOW calibration · M-15 seam · PP-8 cap cure · suite-truth close |

---

## §5 — Grep captures (the gate's own predicates, re-run at round-2)

- **Drag byte-identity** (`git diff 060fa69..b0bef69 -- SpectrumCanvas.vue ComponentSliders.vue`) =
  **empty**; `useColorPipeline.ts` code-hunk grep = **empty** (comment-only).
- **Google-Fonts** (grep for `googleapis`/`gstatic` across the demo tree + `index.html`) = **0** — the
  fonts are 4 self-hosted Fraunces woff2 with same-origin `@font-face` + preload.
- **PP-8 caps** — no `demo/` file >400 LoC (PaletteCard/ColorPicker at 400, App.vue 397); no
  `api/src` file >350.
- **cast ledger** (regenerated, LoC-precept): `src/` `as unknown as` = **8** · `as any` = **0** (the
  lone hit is a comment); `api/src` `as unknown as` = **1** · `as any` = **0**.
- **tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'` over the W2 docs) = CLEAN
  (the §Recovery seam class, M-1) — re-run at this close.
- **`git status --porcelain`**: empty (clean; the three consumer/worktree branches merged, worktree
  cleaned).

---

## §6 — Minor non-gate observations (NOT misses)

1. **Round-2 head carries W3** — the amended tree at `e1151de` also carries all of W3 (merges
   `d99303f`/`9b7fbd2`/`e4dd2ee`/`ba0706e`). W2's boot-chain surface is disjoint from W3's
   material/ink surfaces, so the W2 gates remain certifiable at this head (verified: the drag/boot
   files are W2-scoped and unmoved by W3).
2. **The born-RED spike/headless legs** are by-design `test.fail()` bodies, not misses — routed to
   W7 (RP-2 → L20/GAP-L5, the Q14 payload chain).
3. **Anchors re-derived** against `w1-move-map.md` (PP-11): the boot chain lives at
   `demo/color-picker/composables/boot/` (hydrate.ts · ground.ts · useAtmosphere.ts · useOverture.ts
   · useDockArrival.ts · overture.css · view-accents.ts) — all present.

---

## §7 — Verification-artefacts index (cited at close, per `T.W2.md §Verification artefacts`)

- **The boot-lane consolidation + durable harness**: `audit/pi/w2/w2-close-artefacts.md` (the π-lane
  record) + `audit/pi/w2/w2-annex.mjs` (the re-runnable O-3/5b/O-26/frames/screencast harness) +
  `audit/pi/w2/headed-annex-log.txt` (the re-driven close annex — O-3 · 5b · O-26 legs) +
  `audit/pi/w2/o24-lcp-before.md` (the pre-beat BEFORE record).
- **The Q14 W2 measurement + attribution**: `pi1-delta-ledger.md:43` (local-lab LCP 4919 / TBT 125)
  + `:44` (the same-instrument CI confirm, LCP 5151 / TBT 4223).
- **The §Recovery brief**: `audit/recovery/T.W2-boot-brief-2026-07-10.md`.
- **The owner-frames + 223-frame screencast**: on-disk, self-ignored (`*.png`, the S π convention);
  W8-package raw material.
- **Per-item commit hashes**: §4 above.
- **Books opened/serviced at close**: `pi/w2/w2-close-artefacts.md §7` — GAP-ARM demo half
  discharged (producer half → P1/W7) · the emerge-pose interim → P6 booked swap · pointer retune →
  P1 F-10 · the T-26 bracket record → P1 sizing spec (GAP-L2 rides it) · **T-32 MAX_NUCLEI count
  ceiling = NEW producer book** (W7 re-judge) · the M-14 dock-veil interim (dies on P7) · **O-5 spike
  leg RED routed to W7** (RP-2 → L20/GAP-L5) · M-15 routed hunk recorded for W3's log (`b496952`).
