# t-aurora-boot-active — T-25/T-26/T-27: the boot color animation + the living field (design lane, Fable)

**Mandate rows**: T-25 — "the loading color animation and aurora on load and whilst active
leave much to be desired, too, in booting and page load" (§0.1). Extended in-flight by the
§0.3 addendum (`f700d80`): **T-26** — "the c-h variation is now a bit too muted, and the
aurora not quite noticable enough" (the variance bracket CLOSES from both sides); **T-27**
— the loading animations, "on page load and on color transition… are too gray/slow/jittery".
**Scope split**: t-load-sync owns T-1's arrival ORDERING (its §1 choreography table is the
companion record); THIS lane owns the QUALITY of the boot color story (what animates, from
what to what, on what curve) and the field's ACTIVE behavior (drift/breath/tempo, pointer
+ pick response) over live watches.
**Substrate**: tranche-t `6a775c3` (probes ran pre-addendum at `beeb194^`'s tree — no
product-code delta between them); producer READ-ONLY at `../glass-ui` `b2015102`
(tranche/BG). Private vite on `:9615` (`VITE_API_URL=http://localhost:59999`; the owner's
`:9000` untouched), HEADED Chromium on the real GPU (`"webgl"` substrate), 1440×900.
**Method**: 9 cold-load scenarios (first-run/returning/URL-seed × light/dark × normal/4×
CPU throttle; seeds green `#22aa55`, neutral `#808080`, the default pick) captured as CDP
screencast frame series (~700 frames/run) + an injected boot log (rAF-poll of `--saved-bg`,
body computed background, canvas `--arrived` class + opacity, per-event timestamps); then
active-field long watches (60s steady-state stills at 0/5/10/20/30/45/60s; pointer
sweep/hold/flick; a real slider drag) with a numeric frame-diff metric (downscaled mean
abs RGB delta + %pixels>8/255). Harness: `boot-probe.cjs` + `active-probe.cjs`
(scratchpad, regenerable — both scripts drive only public URLs + ARIA roles).

---

## §1 Findings (evidence → root cause → owner → cure direction)

### F-1 — GAP-ARM re-confirmed at HEAD: a green seed cold-boots a HOT-PINK field, forever

**Evidence**: URL seed `#22aa55` (and the primed returning-user run, and a 6s-old live
session): the field arms at ~465ms and fades in the **default-pick pink** palette; at
6.6s — and indefinitely, until the first in-session color change — the atmosphere is
saturated pink under an all-green instrument (green picker, green accents, green blob).
Reproduced on every non-default cold load (7/7 scenarios). The S FINAL §8 residual is
user-visible on prod today.
**Root cause**: two interlocking halves.
*Producer half* (the recorded root): `useAurora.ts:228` wires the config deep-watch only
inside `armRuntime()` with no immediate replay — every config change in the
construction→arm gap is dropped (`docs/tranches/S/audit/w6-producer-gap-rows.md §GAP-ARM`).
*Demo half* (NEW — why the seed ALWAYS lands in that gap): App.vue setup order. The
pipeline seeds its rAF-coalesced frame ref synchronously with the DEFAULT color
(`useColorPipeline.ts:304`), `useAtmosphereBoot` (line 221) derives from it, and only
THEN does hydration run (`useColorUrl` + `restoreFromStorage`, lines 298–299). The
corrected seed publishes on the first rAF — strictly after `onMounted`'s
`createAurora(canvas, getCfg())` snapshot — so even a producer-fixed mount snapshot would
carry pink today.
**Owner**: producer (replay at arm: `inst.update(getCfg())` — one line, re-cite in the T
packet) **and** demo (hydration-first: the model hydrates from URL/storage BEFORE the
pipeline/atmosphere construct — hydration precedes derivation, structurally).
**Cure direction**: both halves land; either alone cures the visible defect, both are
owed (the demo half also cures F-3, and is the only half that makes the mount snapshot
honest).

### F-2 — the boot ground is the wrong REGISTER: a dark muddy slab, then a luminance leap (T-27 "gray")

**Evidence**: the pre-hydration ground is the derived BASE stop persisted as a flat
solid: `#616600` army-olive fullscreen for a green pick, `#b27290` dull mauve for the
default, `#525252` for neutral — a desaturated dark slab that owns the screen for
~300ms (2.1s at 4× CPU). When the field fades in, the page LEAPS from the deepest stop
(L≈0.35) to the field's mean (L≈0.6–0.75) through a 450ms fade — the load reads dark-mud
→ bright, i.e. "gray then a jump".
**Root cause**: W6-1 persists `resolvedPalette[0]` — the floor of the derive's L band —
as the whole boot material. The base stop is the field's DEEPEST note, not its material.
**Owner**: demo.
**Cure direction**: persist the palette **gradient** (`paletteToCssGradient` — already
shipped, already accepted as "a complete render of the same derived palette" on the css
substrate) as the pre-hydration ground, solid base stop retained as the fallback var.
Ground and field become one material by construction; the luminance leap dies. Rider:
the cold-load e2e hue-band assert re-grounds on the gradient string's stops.

### F-3 — a LATENT default-pink ground flash, currently masked by the very jank T-27 names

**Evidence**: style-truth poll: on every returning/URL boot, `--saved-bg` flips
persisted-olive → **default-pink `#b27290`** → olive (t≈260→287ms normal; t≈824→935ms at
4× CPU). No screencast frame composited inside that window on any run — the main thread
is blocked from ~44ms to ~315ms (F-5), so the pink never reached glass. It is one paint
yield away from being a visible flash: **fixing the boot jank (T-27) without fixing this
writer order unmasks a pink ground flash on every returning boot.**
**Root cause**: same as F-1's demo half — the atmosphere's immediate watches derive from
the default-seeded frame ref before hydration runs.
**Owner**: demo. **Cure direction**: hydration-first (one cure kills F-1-demo + F-3).

### F-4 — the arrival crossfade passes through sRGB mud (T-27 "gray", the second face)

**Evidence**: frames 500–900ms (returning-green): the olive ground crossfading into the
(wrongly pink, F-1) field composites through a desaturated brown-taupe — the whole page,
cards and blob included, sits in mud for ~a third of a second before resolving pink.
**Root cause**: an opacity crossfade of two CHROMATICALLY MISMATCHED materials
alpha-blends channelwise in sRGB; olive↔pink pass near the gray axis. The fade mechanism
is innocent — the material mismatch (F-1) and the register mismatch (F-2) are the mud.
**Owner**: demo (structural, via F-1+F-2). **Cure direction**: with the seed honest and
the ground the field's own gradient, the crossfade blends like-with-like and cannot
desaturate mid-flight — no interpolation-space machinery needed on the canvas path.

### F-5 — the boot color story has no composed timeline: freeze, then everything at once (T-27 "slow/jittery")

**Evidence**: frame cadence: paint holes 44→315ms (normal) and 56→957ms + 957→1083ms
(4×) between the ground slab and the UI pop; then 4–5 uncoordinated color events land
(accent tokens, About pop, blob pop, field fade start) inside ~200ms. The boot is a
freeze followed by a pile-up — jitter is the cadence, gray is the palette (F-2/F-4),
slow is the settle (~1.0s normal / ~3.6s throttled to terminal state).
**Root cause / owner**: the ordering half is t-load-sync's (§1 there — five clock
families, order non-deterministic under throttle); this lane's rider is that the COLOR
story rides those holes: every color arrival (ground → accents → field) needs to hang on
one gated overture, not five clocks.
**Cure direction**: consume t-load-sync's hydrate→derive→commit choreography; this
lane's §2.1 supplies the color/curve half of that design.

### F-6 — first-run and dark first-run: white flash, then a LIGHT-pink page in dark mode

**Evidence**: true first visit: unstyled white ~290ms (~975ms at 4×) → theme paper →
default-pink ground + pink field. In DARK mode first-run the sequence is identical —
white flash, then `--saved-bg #b37290` paints a LIGHT dusty-pink body under dark cards:
dark mode boots as a light-pink page.
**Root cause**: (a) no persisted material on first run is honest, but the DCL-time
default-seed sink write (F-3 mechanism) replaces the correct dark theme-paper fallback
with the light-band pink; (b) the derive's L band is light-only — the atoms door ships
no `scheme`/`lBand` (GAP-L2, still open at `b2015102`: `atoms.ts` carries no lightness
atom; `DERIVE_L_BAND_DARK [0.18, 0.72]` remains dead code from the door).
**Owner**: demo (scheme-aware sink guard) + producer (the L2 atom).
**Cure direction**: the boot-material sink writes scheme-banded material or defers to
the theme paper until the field is live; L2 ships the dark band.

### F-7 — dark mode's ACTIVE field is the light-band palette: the atmosphere ignores the theme

**Evidence**: green-dark steady state: a bright, fully saturated light-green field —
luminance indistinguishable from light mode; only the cards darken. 30s watch confirms
it never settles darker.
**Root cause**: GAP-L2 (F-6b) — the demo cannot reach the dark L band through the door.
**Owner**: producer (L2/A3 packet row; the demo threads `useGlobalDark` → the scheme
atom the day it ships — the W6-2 consume half, already specced).

### F-8 — the field decays to visual stasis; on quiet seeds it is effectively a still (T-26 "not noticeable enough", quantified)

**Evidence** (mean abs diff /255 + %pixels changed, pointer parked, late windows —
uncontaminated by cursor decay):

| seed / scheme | window | mean | %px>8 | verdict |
|---|---|---|---|---|
| green light | 45s→60s | 4.6 | 16.4% | slow migration, sub-perceptible between glances |
| green dark | 20s→30s | 5.5 | 21.4% | same register |
| neutral (sage) | 20s→30s | **1.78** | **0.01%** | a still image |
| default pick | 20s→30s | **1.17** | **0.57%** | a still image |

Breath is arithmetic-invisible: breathDepth 0.065 (energy 0.7) × the frag's ×0.5 = a
±3.25% luminance sine over a 40s period. Nuclei wander ±4.5% of screen over ~45s
(`driftRadius 0.045`, K_NUCLEI). Over a 60-second live watch the green field reads
slowly-alive at best; neutral/low-C fields read DEAD.
**Root cause**: the motion atom's `drifting` row + the fixed `breathPeriod: 40` +
`driftRadius 0.045` prior sit below perceptual threshold once the palette's own contrast
is soft (F-9); no tempo half exists on the door (`AuroraAtoms.motion` is a 3-value enum;
`breathPeriod`/drift rates are atom-unreachable — though `resolveAtoms(atoms, base)`
DOES accept a base-config override for the non-atom fields, which the demo does not use).
**Owner**: demo (base-override half: breathPeriod, softmaxBeta) + producer (a real
MOTION tempo scalar co-varying drift rates + driftRadius + breathPeriod).
**Cure direction**: §2.2 tempo spec.

### F-9 — the field is a two-tone monochrome wash: no compositional structure, C/H variance sub-perceptible (T-26)

**Evidence**: all stills, all seeds: the 6 composed zones (softmaxBeta 3, radius 0.5)
melt into one soft two-tone gradient; the analogous ±28° fan at energy 0.7 puts every
zone in one hue family at near-constant chroma — variance survives only as luminance.
The owner's bracket now closes: **(analogous ±28°, energy 0.7) = too muted ← target →
(triad 240°, 0.82) = too strong** (the S ruling's pole). This bracket is the SIZING SPEC
for the producer variance atoms (the L2/A3 packet: chroma-adaptive `hueSpread`
24°+40°·(1−C/0.3) clamp [24°,64°], C-bell floor, scheme-banded L — all still absent from
the door at `b2015102`).
**Owner**: producer (the atoms) + demo (the calibration inside the bracket, §2.2).

### F-10 — the pointer response: two of three wired axes are structurally DEAD, the third is invisible on a smooth field (W6-7 judged)

**Evidence**: flick probe: mean diff 0.71/255, **0.00% pixels** at +120ms — the
velocity swirl-burst does nothing. Sweep probe: 7.7 vs 4.1 ambient (light) and **4.08 vs
4.12 ambient (dark — statistically indistinguishable)**. Hold: no visible feature forms
around the parked pointer on any still.
**Root cause** (producer source, read-only): `uCursorBurst`/`uCursorVelocity` are
consumed ONLY by `flowDirection()` (`flow.glsl.ts:82–93`) — which only stroke mediums
sample: on `medium:"smooth"` + `flow.pattern:"none"` the burst is inert by construction.
`uLightDir` is consumed only by `relightImpasto` (`brush.glsl.ts:274`) whose lit terms
multiply by `uImpasto` — 0 on smooth: the `interactivity.light` atom the demo arms
drives a uniform nothing reads. The one live axis — the domain-warp cursor swirl
(`aurora.frag.ts:312–329`, strength 0.45, radius 0.25) — ROTATES the field locally, and
rotating a near-isotropic soft wash is visually a no-op. The demo's W6-7 consume half is
wired to dead shader paths.
**Owner**: producer (door honesty: make `light` mean something on smooth — a soft
cursor-local luminance lean; fold the burst into the domain-warp swirl path so a flick
visibly kicks the wash; or type-gate the axes per medium so arming a dead axis is
unrepresentable) + demo (recalibrate strength/radius AFTER a visible response exists —
raising 0.45 today just rotates more invisible wash).

### F-11 — the neutral-seed betrayal: a gray pick renders a saturated marigold atmosphere

**Evidence**: seed `#808080` (nudged live post-arm, so F-1 is excluded): the field
resolves a rich amber-gold — not the S calibration's promised "soft sage drift". The
pick says gray; the atmosphere says marigold; the blob (correctly) says gray-mauve —
the field is the one voice out of key. S-18 is broken for achromatic picks BY DESIGN
of the producer's stacked warm floors.
**Root cause**: three chroma floors compound: the derive's C-bell floor, saturation
1.095 (energy 0.7), and `vividnessFloor` (`vividness: 1` default — lifts every
near-gray zone to C≈0.115–0.135 along the WARM anchor, `aurora.frag.ts` VIVID_TARGET).
**Owner**: demo first (the `vividness` field is base-reachable TODAY:
`resolveAtoms(auroraAtoms, {...DEFAULT_AURORA_CONFIG, vividness: f(seedC)})` — one
line in useAtmosphere) + producer (bless a vividness/quietness atom so the door owns it).
**Cure direction**: vividness rides the seed's chroma — `f(C) = smoothstep(0.02, 0.10,
C)` — a gray pick keeps a sage WHISPER (C≈0.03–0.05), never a marigold shout.

### F-12 — the per-pick color transition is a one-frame hard cut everywhere except the drag (T-27 "on color transition")

**Evidence + root cause**: body ground: `background-color: var(--saved-bg, …)` with NO
transition (style.css @layer base) — every discrete pick (swatch click, palette apply,
spectrum jump) snaps the fullscreen ground AND the field (uniform re-upload) in one
frame. Under a continuous drag the per-frame re-seed is CORRECT and excellent — measured
drag swing mean 32.9/255, 90.8% pixels, tracking the thumb beautifully (the W3-1
coalesce works; keep it byte-identical). The defect is the discrete jump: the whole
atmosphere hard-cuts with no material transition, and any CSS path that DID transition
it in sRGB would cross gray (the T-27 "gray" risk on transition).
**Owner**: demo (ground) + producer (field).
**Cure direction**: register `--saved-bg` as `@property syntax:"<color>"` and give the
body ground a short transition (~200ms, decelerate) — a registered <color> interpolates
in OKLab (CSS Color 4), chroma-honest by construction, and the rAF re-derive under drags
already outruns it (no double-animation). Producer ask: an optional **palette-ease**
knob (~400ms OKLCh-eased uniform walk on seed REPLACEMENT, bypassed for per-frame
updates) so a discrete pick breathes into the new family instead of cutting.

---

## §2 Target design

### §2.1 The boot color story — one composed derive-in

**The material law**: the page boots INSIDE the last session's atmosphere, which then
comes alive — never "a slab, then a different picture".

1. **Ground (0ms, pre-hydration)** — the persisted derived-palette GRADIENT
   (`paletteToCssGradient` of the last session's resolved palette; scheme-banded once L2
   ships), written by the boot-material sink alongside the solid base-stop fallback.
   index.html's fouc-guard paints it as `background-image`; first-run falls to theme
   paper (dark-honest — the F-6 guard: no light-band write may follow in dark).
2. **Hydration precedes derivation** — model hydrates from URL/storage BEFORE the
   pipeline + atmosphere construct (kills F-1-demo + F-3 structurally; the mount
   snapshot carries the true seed; the producer arm-replay then guarantees it).
3. **The UI plates land** on their existing spring (t-load-sync's overture owns the
   ordering + gating: no ink before its token).
4. **The field textures in over its own ground** — canvas opacity 0→1 over
   **0.9s `--ease-decelerate`**, starting when armed (target ≤600ms post-nav normal).
   Same-material by (1)+(2), so the fade cannot pass through gray — the arrival reads
   as the painting waking up, not a crossfade to a different painting. The blob emerges
   inside the same window (t-load-sync's emerge rider). PRM: static swap (kept).
5. **Settled ≤1.5s normal**; under throttle the ORDER holds even as the clock stretches
   (gating, not timers).

The curve family is the house liquid-glass register: decelerate for arrivals, the
existing plate spring untouched, no new easing tokens. What changes is material
continuity (gradient ground) + duration (0.45s → 0.9s: the current fade is HALF the
story too fast — it completes before the eye has registered what the ground was).

### §2.2 The living field — the active-state spec (inside the T-26 bracket)

**The bracket (sizing spec, verbatim encoding)**: more presence + C/H variance than
`(analogous ±28°, colorEnergy 0.7)`; less than `(triad 240°, 0.82)`. The target sits in
the lower-middle of that interval, judged by eye across green/warm/neutral seeds:

- **Hue fan**: chroma-adaptive wide-analogous — `hueSpread = 24° + 40°·(1 − C/0.3)`,
  clamp [24°, 64°] (the A3 formula; ≈42° for a C≈0.16 pick vs today's fixed 28°) — the
  seed family holds, the fan becomes perceivable.
- **The counterpoint stop**: ONE of the 4 derived stops sits at anchor+165° at 0.6×
  chroma, deepest-L — a quiet answer-note that breaks the monochrome wash without
  triad's identity loss. (Producer: an `accent`/counterpoint option on the derive —
  the L2/A3 packet's third row.)
- **Energy**: 0.7 → **0.76** (saturation ≈1.12, valueVariance ≈0.116, breathDepth
  ≈0.068 — below the 0.82 pole's register).
- **Structure**: softmaxBeta 3 → **4** via the base override (zones resolve as
  composition, not blur); zones 6 composed KEPT.
- **Tempo**: breathPeriod 40 → **26s** (base-reachable today); drift rates ×~1.6 with
  `driftRadius` 0.045 → ~0.07 (producer tempo atom — atom-unreachable today).
  **Perceptibility gate**: a 2s glance-pair stays sub-JND (calm), a 10s window shows
  unmistakable migration (mean diff ≥4/255 on mid-C seeds — vs today's 1.2–1.8 stills),
  60s never repeats a composition.
- **Neutral seeds**: `vividness = smoothstep(0.02, 0.10, seedC)` via the base override —
  gray picks keep a sage whisper (C≈0.03–0.05), never marigold (F-11).
- **Dark scheme**: `lBand [0.18, 0.72]` through the L2 atom the day it ships — dark
  steady-state field mean L ≤0.45 (F-7).
- **Pointer**: after the producer honesty fix (light-on-smooth = a soft cursor-local
  luminance lean, ≈+0.04 L eased; burst folded into the domain-warp swirl), recalibrate
  `ATMOSPHERE_POINTER_STRENGTH` 0.45 → 0.6 and cursor radius 0.25 → 0.33; gates: a
  parked pointer forms a visible warm lean within 400ms; a flick reads within 120ms
  (today: 0.00% pixels); release decays to rest ≤2s (kept). All PRM-gated at the
  runtime (kept).
- **The drag**: byte-identical — the per-frame re-seed is the app's best living moment.
- **Discrete picks**: the F-12 palette-ease (~400ms OKLCh walk) + the 200ms OKLab
  ground transition.

### §2.3 The split — demo-knob half vs producer-ask half

**Demo-knob (landable with shipped doors)**:
`DEFAULT_AURORA_ATOMS`: colorEnergy 0.76. `useAtmosphere`: pass a base override to
`resolveAtoms` — breathPeriod 26, softmaxBeta 4, vividness = f(seed C); persist the
palette gradient (+ solid fallback) in the boot-material sink, scheme-guarded;
hydration-first construction order in App.vue; `@property --saved-bg <color>` + the
200ms ground transition; pointer strength/radius retune (SEQUENCED after the producer
pointer fix); the e2e hue-band re-grounding rider.

**Producer asks (the T packet, each with the bracket/gates above as sizing spec)**:
1. **GAP-ARM arm-replay** (re-cite; standing since S — one line, `useAurora.ts:228`).
2. **L2/A3 variance atoms** — hueSpread (chroma-adaptive), scheme/lBand, counterpoint
   stop; sized BY THE BRACKET (F-9).
3. **MOTION tempo half** — a tempo scalar co-varying drift rates + driftRadius +
   breathPeriod (F-8).
4. **Pointer-door honesty on smooth fields** — light = cursor-local luminance lean;
   burst reaches the domain-warp path; or medium-gated atom types (F-10).
5. **Palette-ease** — optional eased seed-replacement walk (F-12).
6. **Vividness/quietness atom** — bless the achromatic-seed ride-down (F-11).

---

*Probe artifacts (regenerable, scratchpad): boot frame series ×9 scenarios + boot logs;
active stills + diff tables ×4 scenarios; harness `boot-probe.cjs`/`active-probe.cjs`.
Key exhibits cited inline: the pink-field-over-green-UI settle (url-green ~1.1s+), the
mud crossfade (returning-green ~740ms), the olive slab (any returning boot <300ms), the
marigold-for-gray steady still (neutral), the light-blaze dark steady still (green-dark).*
