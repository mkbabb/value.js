# T.W8 · critique pass — GRADIENT (the instrument: rail + envelope plate) · p1 (round 1 of ≤3)

**Filed**: 2026-07-11 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t` @ `0d4d65f` at filing (probe at `71ae027`) — every commit since
the W6.5 close cure (`69500b7`) is docs-only, so **the probed product tree ≡ `5e4f1f6`, the
exact tree the owner audited at §0.6 AND §0.7**.
**Surface**: the gradient instrument — the editing RAIL + the hue-swept ENVELOPE PLATE
(+ their rung-row/render-tile/direction-type control seams). The easing accordion inside
the same pane is **pass 8's surface** (T-47/Row E — `easing/EasingAuthoringStage.vue`),
scoped OUT here; the pane-card glass/caster class is pass 6's (P6-R1/P6-V1, filed).
**Spec of record**: `waves/T.W8.md` §Scope-1 · `SYNTHESIS.md §2` D1–D10 ·
`MANDATE-2026-07-06.md` §0 (T-6 · T-21) + §0.6 (T-46) + §0.7 (no gradient-named row —
re-checked; T-53's card class is pass 6's) · `RATIFICATION-2026-07-09.md` §0/§1 (Q4: the
gradient plate → WELL, defaulted-ratified).
**Owner verbatim (the lines this pass reads)**: T-6 "The gradient netting should be more
visible" · T-21 "buugged out--and the gradient bottom bar is not the proper length, too
short" · §0.6 T-46 "Gradient is totally un-usable. Gradient slider area should be more
rounded like our glass-ui elements".
**Pass inputs**: `w65-close-artefacts.md` §1 HG1 (T-46 VERIFY GREEN — O-21:104 pill
silhouette; `5edd903` + `ee7b1dc` stand) + §2 (T-46 row) · `w45-checkpoint/ROWS.md` (no
gradient rows) · the owner shot READ from disk per the standing convention:
`t33-audit-14-00-42-16.png` (the PRE-round-4 state: single-hue slice `OKLCH · H 205°`,
~⅔ permanent netting with both beads floating IN the hatch, rounded-rect rail — every
element of that shot is a surface the W6-2/Lane-G round-4 re-author replaced).
**Anchors re-derived via `w1-move-map.md` §C2**:
`custom/gradient/GradientVisualizer/{GradientVisualizer,GradientStopEditor}.vue` ·
`GradientVisualizer/PerceivedSpacePlate/{PerceivedSpacePlate.vue,envelopePlatePaint.ts}` ·
`composables/{useGradientModel,usePerceivedRamp,useGradientCSS}.ts` ·
`panes/GradientPane.vue` · inks: `@lib/gamut-ink` + the `--gamut-*` tokens · oracles:
`e2e/smoke/oracles/{o21-gradient-rail,o19-netting-luma}.spec.ts` + `views/gradient.spec.ts`.

---

## §1 Method (the O-3 probe class — live drive, real engine, dpr 2, headed)

- **Serve**: lane-unique ports, the owner's `:9000` untouched — **VJS_E2E_PORT=8660**
  (vite dev, `VITE_API_URL=http://localhost:8660` — the inv-K-5 same-origin seam) ·
  **PERF_PORT=8661** (the BUILT `dist/gh-pages` via `serve-built.mjs`, rebuilt AFTER the
  `69500b7` close cure — dist stamp 18:02 > commit 16:52, tree-true).
- **Cells**: 1440×900 · 768×1024 · 390×844 × light+dark = 6 dev cells + BUILT @1440 ×2
  schemes; dpr 2 throughout; deep-link `#/gradient?space=lab&color=lab(40.39% 52.94 47.26
  / 82.7%)` (the owner's §0.6 reference color); settle = `.glass-dock` + 3.5s past the
  overture.
- **Drive (the T-46 verdict's verb, leg B @1440 ×2 schemes)**: hover ghost → click-to-add
  (mint ≡ ramp color at position) → handle drag 30→60 → keyboard ±1/±10 → select →
  plate-pin → **the deselect gestures (Escape · plate-click)** → remove chip → remove →
  direction-slider drag → type→conic.
- **Measures**: rail geometry (radius/height/paint stack/span vs plate/column) ·
  the glass-ui slider-track register comparison ON THE SAME PAGE (the Direction slider) ·
  rung-row extents + cap↔handle congruence · **the O-19 metric VERBATIM** (composited
  element screenshot, p97−p3 BT.709 luma, x ∈ [0.90, 0.98] · y ∈ [0.35, 0.50]) beside a
  canvas-bitmap netting band (paint truth) · terminal-truth pixels on the BUILT rail
  (in-page decode, the `gradient-pixels.ts` idiom) · condition-chip ink/paper computed +
  WCAG.
- **Frames**: `docs/tranches/T/audit/pi/w8/gradient/` (gitignored PNGs on-disk, the
  standing convention): `dev-{1440,768,390}-{light,dark}-{full,instrument}.png` ·
  `dev-1440-{light,dark}-{hover-ghost,three-stops,slice-pinned,conic-tile}.png` ·
  `built-1440-{light,dark}-full.png`. Instrument + log (committed):
  `pi/w8/w8-pass7-probe.mjs` · `pi/w8/w8-pass7-probe-log.txt`.

## §2 Console attest

**ZERO console errors of ANY kind in all 6 dev cells and every interaction drive**
(raw = 0 — not even env-noise; the same-origin seam holds). BUILT cells: raw = 1 per cell
= the **designed** `misconfigured` dev-honesty error (bare loopback + unset
`VITE_API_URL`, the S.W0 W0-1 contract — classified, not a defect; REAL = 0).

## §3 COHERENCE VERDICT

**COHERENT WITH THE DOCTRINE, WITH FILED ROWS.** The §0.6 T-46 "totally un-usable"
verdict **does not reproduce against the landed W6-2 instrument**: the full gesture
inventory drives end-to-end with zero console errors, the rail rounds on the producer's
own `--radius-pill` token (identity with the same page's glass-ui slider-track, not
coincidence), the T-21 "too short" bar is structurally dead (rail span ≡ plate span at
every cell; terminal truth green on the built bundle), and the T-6 netting register holds
the ratified O-19 floors live on both schemes. The owner's t33-audit-14 shot is the
PRE-round-4 tree — every element it shows (single-hue slice, beads-in-hatch, rounded-rect
rail) is replaced in the probed tree. The §5 ledger files **two interaction-grammar
defects the drive exposed** (the sweep regime is one-way — no deselect gesture exists;
the touch-target floor under-serves the rail's handles and its own touch-born remove
chip) and **one package-bracket axis** (the default-seed hatch-dominance of the envelope
plate — the honest taste residual inside "un-usable" after the mechanism cures, both
poles as value tuples). Nothing certifies taste; nothing contradicts a §12 ruling or a §4
retirement.

## §4 The attested table (owner line / doctrine → live witness → read)

| Line | Live witness (probed, not assumed) | Read |
|---|---|---|
| **T-46 rounding** "more rounded like our glass-ui elements" | Rail `border-radius: 9999px` = `var(--radius-pill)` resolved (the producer `@theme` token, `dist/styles/theme/radius.css`); the SAME page's glass-ui Direction `.slider-track` computes `var(--radius-pill)` → 9999px — **token identity, all 6 dev cells + BUILT both schemes**; `pillTrue` (radius ≥ h/2 = 20) everywhere; handles ride the inset track `[10, w−10]` so end handles sit fully inside the pill corners | COHERENT — the w65 HG1 T-46 VERIFY GREEN (O-21:104) reproduces independently |
| **T-46 "totally un-usable"** (re-judged by DRIVE) | Hover ghost previews the exact mint (`oklch(0.72 0.159 181)` dashed twin) → bar-click adds 2→3 AT 30% with the ghost's color → drag 30→60 tracks → keyboard +1/+1/+10 → 72% → selection pins the plate → remove chip (touch-born, W5-11) visible + removes 3→2 → **remove restores the sweep label** — both schemes, raw console 0 | Does NOT reproduce as a mechanism claim; the residuals the drive DID expose are §5 P7-R1/P7-R2; the taste residual is P7-B1 |
| **The three truth regimes + cusp-adaptive axis** (the W6-2 re-author) | Solid field (running-hue colored, c ≤ cMin) · ambiguous belt (PAPER half-voice hatch inside the cMax hairline) · full netting (INK voice) all render distinctly at the default seed; beads sit ON the trajectory in solid/belt — **never floating in netting** (the owner-shot lie is dead); condition label states the full condition (`oklch · H 145–265° · C ≤ 0.4`); pin collapses it to `oklch · H 181° · C ≤ 0.2` — **the axis rescales cusp-adaptively** (0.4 → 0.2, the quantized-hysteresis law) and the belt vanishes (the stated degenerate case); un-pin via remove restores `H 145–265° · C ≤ 0.4` | COHERENT (mechanism); the solid:hatch balance at hue-wide sweeps is P7-B1's axis |
| **T-6** "netting should be more visible" | **The O-19 metric verbatim, live**: light **62.0/255 ≥ floor 59** (1440/768: 62.0 · 390: 61.9) · dark **50.3/255 ≥ floor 45** (390: 50.5) — the W6-1 recalibrated register (`--gamut-*` 30%/36%/45%/65%) HOLDS composited at every cell + BUILT; canvas-truth band spread 26 L / 229 D (ink-polarity as designed); pinned-slice band spread 145 L / 229 D | COHERENT — the recalibration stands live; no drift-back |
| **T-21** "the gradient bottom bar is not the proper length, too short" | Rail box w **462 ≡ plate w 462** @1440/768 · **324 ≡ 324** @390 (the rail spans the full instrument column at every cell); rung row 460 (`mx-px` — the 1px hairline inset, by design); **cap centers ≡ terminal-handle centers to 0.0px** (235/675 · 164/604 · 44/346 — O-21 leg 4's congruence, reproduced); BUILT terminal truth: left mean (194,232,196) = green family · right (187,206,253) = blue family — no mirrored-sliver bleed; **direction drag leaves the rail INVARIANT** (`linear-gradient(90deg…` before ≡ after) while the tile carries 90°→248°; type→conic re-renders the tile only | COHERENT — "too short" structurally dead (the normalized-projection + owned-paint-stack law); rung extents asymmetric (268.5–663.12 inside caps) = the iso-ΔE ruler grammar, designed |
| **Q4 / D1** (the ratified gradient-plate → WELL) | Plate host `bg-well` opaque: `oklab(0.913 0.006 0.013)` L / `oklab(0.345 0.010 0.018)` D — the house warm family (byte-close to pass 6's probed well values); radius 16px = `--radius-card`; no second glass stamp; `paper-grain-overlay` on its own S-15-B rationale | COHERENT with the §12 Q4 ruling |
| **D6** (ink-on-tier, the condition chip) | Chip = reservation-law backing (`bg-well/90`): ink (112,89,66) on well-L → **5.08:1**; ink (195,185,172) on well-D → **5.97:1** — both ≥ 4.5:1, computed from probed values | COHERENT |
| **D7** (liquid easing, structural) | Handle scale settle rides `--spring-snappy` at ITS OWN clock (inline `transition: box-shadow var(--duration-fast) var(--ease-standard), transform var(--spring-snappy-duration) var(--spring-snappy)` — the T.W5 R9 cross-wave clause, witnessed computed) | COHERENT |
| Rail `--shadow-sm` in dark | `color(srgb 0.914 0.9 0.886 / 0.06)` — the SAME `--shadow-color: var(--foreground)` knob **pass 6 already filed as P6-R1** (shadow-as-highlight class); at α 0.06 sub-perceptual here | **CROSS-LINK, no new row** — P6-R1's `style.css` lane cures this site by construction (single-writer on the FILE held) |

## §5 THE ROW LEDGER (typed; anchors; zero adjective-only poles)

### P7-R1 · **LAND** — the swept-envelope regime is ONE-WAY: no deselect gesture exists, so the plate's hero read is unreachable after the first stop selection without destroying a stop
- **Defect (interaction grammar)**: selecting any stop (every handle click/drag selects)
  pins the plate to the single-hue slice — BY DESIGN — but **no gesture un-pins it**:
  probed live both schemes — `Escape` → label stays `oklch · H 181° · C ≤ 0.2`;
  click on the plate body → stays pinned (and correctly does NOT mutate stops — probed:
  stop count unchanged); bar-click ADDS (never deselects); handle re-click re-selects.
  The ONLY paths back to the swept-envelope read (`H 145–265° · C ≤ 0.4` — the
  instrument's re-authored hero regime, three truth regimes over the ramp's own hues) are
  **removing the selected stop** (destructive) or the dock reset. A user who touches one
  handle loses the instrument's primary regime for the rest of the session.
- **Anchors**: `demo/@/components/custom/gradient/GradientVisualizer/GradientStopEditor.vue`
  (`onHandleKeydown` — Arrow/Delete only, no Escape arm; `selectedId` defineModel;
  `onBarPointerUp` — add-only) · `GradientVisualizer.vue:53` (`selectedStopId` model) ·
  the pin law itself: `usePerceivedRamp.ts` `sweptHues` (STANDS — not the defect).
- **Failure scenario**: open Gradient → drag any handle 1px → the plate collapses to that
  stop's slice; every subsequent read of the envelope (the gamut truth across the ramp's
  hues, the belt, the cusp tick at the swept peak) is gone until the user deletes a stop.
- **Cure shape (lane's call, in-bounds)**: `Escape` on a focused handle clears
  `selectedId` (the exact keyboard grammar the handles already own); optionally a
  re-click on the already-selected handle toggles off. The pin-on-select law is UNTOUCHED
  (no §12/W6-2 conflict — the cure adds the EXIT, never removes the pin). The remove chip
  keys off `selectedStop` and degrades gracefully by construction.
- **Oracle note**: `views/gradient.spec.ts` "selecting a stop pins…" asserts the pin,
  never the release — if the lane lands Escape, the spec grows the release leg (tighten,
  not weaken).

### P7-R2 · **LAND** — the touch-target floor: 20×20 handles and a 24×24 remove chip on the instrument whose remove affordance was BORN for touch
- **Defect (a11y/touch, by-class)**: the stop handles are `w-5 h-5` = **20×20 CSS px**
  with no hit inflation; the remove chip — minted at W5-11/P1-3 precisely because
  right-click remove was "undiscoverable, impossible on touch" — is `w-6 h-6` =
  **24×24**. The producer's own floor is `--touch-target: 2.75rem` (**44px**), applied to
  its coarse-pointer triggers and shipped as the `touch-hit-area` utility — **the
  Direction slider thumb ON THE SAME PANE carries `.touch-hit-area`** (probed:
  `slider-thumb glass-specular-track touch-hit-area`); the rail's handles/chip do not.
  The W4-4 console grammar's touch rung (≥44px hits <lg) binds the config-slider
  population by name; the rail joins it BY CLASS (the same slider-instrument family) —
  named honestly as an extension, not a cited gate.
- **Anchors**: `GradientStopEditor.vue` (the handle `<button>` class list; the remove-chip
  `<button>`); the producer utility: glass-ui `dist/styles/utilities/a11y-overrides.css`
  (`@utility touch-hit-area`, `--touch-target`).
- **Failure scenario**: 390/touch — a finger aiming at a mid-rail stop at 30% has a 20px
  target between a 40px-tall bar whose every miss ADDS a stop (the add-on-click truce
  turns each missed grab into an unintended mint); the remove chip is a 24px destructive
  target.
- **Cure shape (lane's call, in-bounds)**: coarse-pointer hit inflation on handle + chip
  (the producer's `--touch-target` referent; geometry/paint unchanged — no visual delta,
  hence NO bracket), with the add-gesture guarded against handle-adjacent misses (e.g.
  the pointer-down slop already exists at 4px — the inflation must extend the handle's
  claim, not the bar's).
- **Oracle blind spot, named (the T-44-track precedent)**: O-21 measures paint geometry
  (radius/caps/terminals), never HIT areas — no standing oracle sees a touch-target
  regression on this rail. The lane's re-verify should record computed hit extents, not
  only paint boxes.

### P7-B1 · **BRACKET** (package axis) — the default-seed hatch-dominance of the envelope plate (the taste residual inside "un-usable"; the axis-headroom knob; both poles reproducible)
- **The axis**: at the shipped boot seed (H 145→265 sweep) the plate reads
  majority-hatch: solid field ≈ the left quarter, belt + netting carry the rest (frames
  `dev-1440-{light,dark}-instrument.png`). This is HONEST geometry (a 120° sweep's
  every-hue-in-gamut region IS small; the beads no longer lie) — but the owner's
  "un-usable" was uttered AT a hatch-dominant plate (t33-audit-14, ~⅔ netting), so
  whether truth-dominant hatch READS as instrument or as noise is the owner's call, not
  a pass's.
- **Pole A (the landed default)**: `AXIS_HEADROOM = 1.15` · `AXIS_QUANTUM = 0.05` →
  default-seed axis `C ≤ 0.4` (peak cusp ~0.32 × 1.15, ceiled to the rung) — the
  designed netting margin; reproducible: `envelopePlatePaint.ts:46-48` @ `5e4f1f6` +
  frames `dev-1440-light-instrument.png` / `dev-1440-dark-instrument.png`.
- **Pole B (the tight-axis arm)**: `AXIS_HEADROOM = 1.0` · quantum unchanged →
  default-seed axis `C ≤ 0.35`: the netting band beyond the cusp thins by ~⅓ of the
  plate's right margin and the solid+belt fraction grows correspondingly — a value-tuple
  arm, one constant; the cusp tick then rides AT the right margin (the axis referent
  loses its visible headroom).
- **Indexed to**: T-46 (§0.6) — the verdict's taste half after this pass's mechanism
  re-judge; adjacent to T-6 (the netting REGISTER is settled by O-19 and is NOT this
  axis — this axis is the netting's SHARE of the plate, not its ink).
- **No default change filed** — the landed pole A stands; the package presents both arms;
  the owner rules.

## §6 Routing + loop state

- **Zero rows contradict a §12 ruling or a §4 retirement; nothing routes OWNER as a
  conflict** (P7-R1 adds an exit to a standing design, P7-R2 is paint-invariant, P7-B1
  presents — never re-cuts — the ratified Q4/W6-2 geometry).
- **Zero producer rows** (the `--radius-pill`/slider-track register is consumed correctly;
  the `touch-hit-area`/`--touch-target` facility EXISTS producer-side — P7-R2 is a demo
  consumption gap, not a producer ask; the dark `--shadow-sm` witness re-homes to pass
  6's P6-R1, already filed on `style.css`).
- **remediation_1 shared-file map** (single-writer keyed on the FILE): P7-R1 + P7-R2 both
  anchor `GradientStopEditor.vue` → **ONE lane, one writer** (P7-R1 may also brush
  `views/gradient.spec.ts` for the release leg — e2e-covered surface, `npx playwright
  test` after the batch per §Format). No file intersects pass 6's ledger (`style.css` is
  P6-R1's lane — the cross-link above exists precisely so no gradient lane touches it).
- **Loop state**: pass_1 filed → remediation_1 (P7-R1 + P7-R2) → pass_2 re-judges the
  drive + hit extents and re-reads P7-B1's frames; ≤3 per surface, then route by class.
- **Console/oracle state carried**: O-21 4/4 legs reproduce live + BUILT (this probe's
  independent re-run); O-19 floors hold at 6 cells + BUILT; no EXPECTED-RED touches this
  surface.
