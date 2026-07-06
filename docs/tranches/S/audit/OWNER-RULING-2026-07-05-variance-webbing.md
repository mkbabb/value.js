# OWNER RULING — variance recalibration + the webbing facility (2026-07-05, late)

## §0 Verbatim owner text (wins)

> the c and h variation is a bit too strong. And the inner gradient selector mesh/webbing
> graphics are far too low res. We should plan to address these, and flesh out the webbing
> facility.

## §1 Encoding — two rulings

1. **Variance recalibration** (supersedes the same-day amplification's LANDING, not its
   intent): the W6-3 derive as landed reads "a bit too strong" in C/H variation. The bar was
   always "subtle, though, but with more noticeable" — the landing overshot. Pull the C/H
   variance back toward subtle while keeping the STRONG field presence; this is a calibration
   between the two same-day poles, not a reversal. Owner rulings are the derive-tuning
   routing authority — this tuning pass is sanctioned regardless of the triumvirate's
   third-iteration halt. Route: the W6 gate's row 8 judges against THIS bar; a landed
   overshoot is remediated as a tuning pass (small, browser-judged, π-recorded).
2. **The webbing facility** (the picker plate's gamut mesh/hatch — `gamutOverlayPaint.ts`
   and the W5-8 one-home lift underway): (a) **resolution**: the mesh/webbing renders far too
   low-res — the overlay must paint DPR-correct (device-pixel-crisp at retina; no 1x canvas
   upscaling; line weights in device pixels); (b) **flesh out the facility**: the webbing
   becomes a designed REGISTER, not a single hardcoded hatch — density/angle/weight/ink as
   tokens of one home (the `gamut-ink.ts` lift W5-8 is building), the paper-ink second net
   for wide interpolation spaces as part of the same facility, consumed by every gamut-truth
   surface (picker plate lens + the W5-8 gradient L×C plate) with zero per-surface copies.
   Route: W5 Lane C / W5-8 rider (in flight — the gate enforces; a landed low-res webbing is
   remediated).

## §2 Implementation record

### §2.1 Variance pull-back — LANDED (2026-07-06, the §1.1 tuning pass)

**STEP-0 first (the dying lane's last observation — "a flat pink field for a green
seed"): REPRODUCED, and it is a REAL producer-side defect, not the knobs' pink.**

- **What reproduces**: cold-load at ANY URL seed (headed Chromium, WebGPU
  substrate) paints the atmosphere field from the app's **pre-hydration DEFAULT
  pick** (`DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)"` — the hot-pink
  family, `color-picker/index.ts:36`), NOT the URL seed. Under the pull-back's
  analogous knobs the default-pink analogous ramp is a near-uniform rose — the
  literal "flat pink field for a green seed". Under the landed triad knobs the
  same defect rendered the default-pink TRIAD ramp (mint+amber) — wrong-seed all
  along, just less legible as wrong.
- **Root cause (producer, glass-ui)**: `useAurora.ts` — `createAurora(canvas,
  getCfg(), …)` captures the config at MOUNT
  (`src/components/custom/aurora/composables/useAurora.ts:262`), and the config
  deep-watch `watch(getCfg, (next) => inst?.update(next), { deep: true })` is
  wired only inside `armRuntime()` (`useAurora.ts:228`) — AFTER the deferred
  idle-callback arm, with **no immediate replay**. Any seed hydration landing in
  the construction→arm gap (URL-wins hydration ALWAYS lands there) is dropped;
  the runtime renders the construction-time config until the next in-session
  change.
- **Evidence** (dev server :9231, headed Chromium via playwright): for a green
  145° URL seed with pink-primed storage, `--saved-bg` settles `#458808`-class
  (derived green ✓, JS side live), the persisted `color-picker-bg` write-through
  repairs within ~200 ms ✓, URL-wins holds over stale storage ✓ — while the
  armed WebGPU canvas samples flat pink `rgb(240,150,160)` across reloads; an
  in-session hash change to a blue seed flips the canvas to
  `rgb(46,123,231)`-class immediately (the post-arm deep-watch is healthy).
  The W6 gate's "headless π renders the css placeholder with the same derived
  palette" claim is consistent: the css arm consumes the always-live
  `resolvedPalette`; only the armed-GPU arm has the gap.
- **Demo consume path: exonerated** (seed→`--saved-bg`→field wiring, URL-wins
  precedence, boot-material write-through all verified healthy). No demo-side
  workaround landed — retriggering the deep-watch from the consumer requires a
  synthetic atoms mutation (contrivance; KISS-rejected). **ROUTED producer-side**:
  gap row appended to `docs/tranches/S/audit/w6-producer-gap-rows.md` (fix is
  one honest replay — `inst.update(getCfg())` after `inst.arm()`, or
  `immediate: true` on the post-arm watch). Until it ships + repins, every cold
  load shows the DEFAULT-pick ramp until the first picker interaction.

**§1.1 pull-back — the calibration of record** (browser-judged at 1440,
light+dark, seeds oklch(0.72 0.19 145) / oklch(0.72 0.19 25) / neutral
oklch(0.72 0.02 145); judged post-arm so the field renders the TRUE derive,
sidestepping the STEP-0 defect):

- `harmony: "triad" → "analogous"` — the decisive move. The triad `increasing`
  walk spans 240°: a green pick derived h≈135/228/308/15 (half the ramp
  magenta/pink) and the judged field read PURPLE-dominant for green, TEAL-dominant
  for red — the seed's identity lost to its partners (H variance as noise). The
  analogous walk (anchor±28°, h≈108–164 for green) keeps every judged field
  unmistakably in the seed family with visible in-register drift; the neutral
  gray stays alive (soft sage, the producer C-bell floor).
- `colorEnergy: 0.82 → 0.7` — the C cluster back to the pre-amplification
  register (saturation 1.137→1.095, valueVariance 0.122→0.110, breath
  0.071→0.065). 0.65 was measured (sat 1.0775) and passed over — the marginal
  further pull trades away STRONG-field presence the ruling keeps.
- `zones: 6` KEPT — the amplification's spatial half survives.
- **Honest assertion update**: the analogous BASE stop anchors at anchor−28°
  (olive `#7a7800`, r 122 / g 120) — `atmosphere-cold-load.spec.ts`'s
  green-family `g>r` channel compare re-grounded as a seed-family sRGB hue-band
  assert (50°–180°; the stale hot-pink class ≈335° still fails).

Shots (before/candidates/after): `docs/tranches/S/audit/pi/w6-after/ruling-shots/`
— `judged-triad082-*` (the landed overshoot, per-seed, light+dark),
`judged-analog070-*` (the calibration, per-seed, light+dark),
`before-triad082-*` + `cand-analog070-*` (cold-load shots — STEP-0 defect
evidence: the field ignores the seed on every cold load).
