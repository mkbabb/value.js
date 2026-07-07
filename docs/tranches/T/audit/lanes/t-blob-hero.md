# T lane · t-blob-hero — the blob: seat, z, hover + satellite choreography

**Row**: T-8 (owner §0 verbatim: "The blob needs a great deal of on-hover and satellite
morphing work. And it should not clip outside the bounds--it should have a higher z than
all. And it should be placed more into the card, moved down and to the left. And work on
all screen sizes."). **This lane encodes the OWNER OVERRULE of W6-4's corner-break/overflow
law** (`waves/S.W6.md` W6-4; SEEDS w6 rider 2) — containment, not corner-break.
**Method**: live probes on a lane-local boot (`VITE_API_URL=http://localhost:59999 npx vite
--port 9457 --strictPort`; owner's :9000 untouched), owned headless Playwright (the MCP
browser was lane-contended — the seed's own learning) at 1440×900 / 1280×800 / 1024×768 /
768×1024 / 390×844, geometry + stacking + occlusion probes (`t8-blob-probe.mjs`) and a
16-frame hover/orbit/click/leave film (`t8-hover-probe.mjs`), both in the session scratchpad
with their PNG series (`probe-*.png`, `hover-*.png`). All numbers below are measured.
**Substrate**: `tranche-t` = master @ `cc4f4fa`; producer read-only at `../glass-ui`
(4.2.0/tranche-BG). **Consumed**: `docs/tranches/S/audit/blob-genesis.md` (W0-8) ·
`audit/seeds/w6-blob-redress.md` · `audit/w6-producer-gap-rows.md` GAP-L5 ·
`letters/GLASSUI-S-ASKS.md` L5.

---

## §0 Shot re-derivation

The mandate's T-8 → `t-2004-10` mapping is WRONG (that PNG is the dev-misconfigured banner,
T-9). **The blob shot is `t-2002-52`**: the bead straddling the picker-card/About-card seam,
its top-left quadrant over the gutter, hard by the "About…" title — geometry that matches my
lg-1024 probe almost exactly (bead center (489.6, 140), About title band amputated). The
bead also appears clipped at frame-top in `t-1959-21` (top-right corner). Neighbor shots
shift one row: `t-2002-09` = the readout numbers (T-7), `t-2004-32` = the rainbow menu (T-10).

## §1 Findings

**F-1 · The bead is DISEMBODIED — it belongs to nothing, and the composition inverts per
viewport.** Measured: at 1440×900 the bead (center (695,197), visible ⌀ ≈ 94px of a 176px
wrapper) sits over the 18px gutter, 12px onto the About card, its mass nearer the About
title than the picker's own title band (`probe-desktop-1440.png` ≙ owner `t-2002-52`); at
1024×768 it lands ON the About card's header and amputates "About the color spaces"
(`probe-lg-1024.png`); at 390/768 it half-floats over raw aurora above the card
(`probe-phone-390.png`). Root cause: W6-4's center-on-radius-origin law
(`ColorPicker.vue:354-377`) seats the bead's mass at the plate's *edge*, so what it reads as
attached to is decided by whatever happens to be behind the overflow — seam, sibling title,
or bare field — different at every width. Owner: **demo**. Cure: §2 THE SEAT.

**F-2 · The dock paints over the blob's territory at ≤1280 — the "clipped" look.**
Occlusion probes: `elementFromPoint` above the card top resolves to `glass-dock` at 1280×800
(point (616,70); dock bottom 71) and `dock-layer-item-host` at 1024×768 (point (489.6,60);
dock bottom 70, anchor top y=52). The satellite band's 12-o'clock arc (orbit+satR reach =
0.49·176 ≈ 86px above center) enters the dock's paint at both widths. The canvas already
kisses the ONE real ancestor clipper: `.app-layout` `overflow: hidden`
(`style.css:367,374`) — deficit +0.8px at lg today, a standing trap for anything that breaks
upward. Owner: **demo** (placement; z-grammar). Cure: §2 — containment dissolves the chrome
collision by construction; the z law becomes a named token, not source-order accident.

**F-3 · The picker card's cartoon shadow SKEWERS the bead.** The 8px `--shadow-cartoon`
band runs vertically down the card's right edge through the bead's footprint — a hard dark
line passing under the bead (`hover-00-baseline.png`; visible in owner `t-2002-52` as the
seam strip). Genesis §3.2-5's own clause ("the card's cartoon-offset shadow never slices
it") is violated in spirit at the broken edge. Owner: **demo**. Cure: §2 (no gutter
straddle → no skewer).

**F-4 · Figure-ground collapse: the bead is tone-on-tone with everything.** Bead ink,
aurora field, and card tint all derive from the ONE seed (`HeroBlob.vue:93-109`
`deriveBlobPalette(cssColorOpaqueFrame…)`; aurora same seed) — a pink bead on a pink field
on a pink plate (every probe PNG; catastrophically so at boot under GAP-ARM's stale-pink
field, cross-ref t-load-sync). Owner: **joint** — the consumer owns a contrast law (it
knows both the plate ink and the seed; the library already owns the OKLab contrast helpers,
`src/units/color/contrast.ts`), the producer owns the F9.R1 `bodyLightness`/`lightnessFloor`
knobs (already CUT, rides 5.0.0). Cure: §2 — the seated bead's backdrop becomes the *plate*
(one known surface), and the derive threads a guaranteed |ΔL| floor against it.

**F-5 · Hover is sub-JND — the "great deal of on-hover work" is real.** The engine's mood
grammar is principled (the valence/arousal circumplex, `../glass-ui/src/components/custom/
goo-blob/constants.ts:48-54`) but idle→curious is a 0.35→0.5 arousal step mapped through
gentle lerps (`constants.ts:64-105`; pointer attraction deliberately FLATTENED at AX.W46 D5)
— at a 94px bead the delta is invisible: `hover-03/04-center*.png` vs
`hover-00-baseline.png` differ by a faint swell; the reka tooltip is the only legible hover
feedback (and it pops upward into the dock band). Owner: **joint** — producer: a hero-scale
mood-LEGIBILITY floor (packet row A); consumer: an entrance beat (§3).

**F-6 · No hover-out beat; the park can embalm a mid-smear pose.** `HeroBlob.vue:26-28`
binds `@click/@mouseenter/@pointermove` — **no `@mouseleave`**; on exit the follow-spring
leaves the body smeared toward the exit vector (`hover-10-left-800ms.png` — a flattened,
lumpy pull-off), the engine's own decay needs `IDLE_SLEEP_MS` 6000 (`constants.ts:125`),
and the demo's park is WALL-CLOCK (`BLOB_IDLE_MS` 2000 + `SLEEPY_POSE_MS` 700,
`HeroBlob.vue:156-171`) — so the freeze races the settle and can embalm the smear. Owner:
**joint** — consumer: an explicit release beat; producer: a `settled` seam + park-only-from-
settled guarantee (packet row C).

**F-7 · The deformation vocabulary reads broken at hero scale.** The pointer pseudopod is a
sharp HORN (`hover-07-orbit-half.png`), and the standing chord-dent (genesis P1-5, live at
4.2.0) is a permanent teardrop tail at the lower-left — together a two-protrusion
broken-star; at rest the tail makes the bead a speech-bubble sticker
(`probe-*-rest.png`). Owner: **producer** — the L5 scale-aware-deformation ask, appended
with a curvature bound (packet row B); chord-dent re-cited.

**F-8 · Satellites are invisible at every moment — the "satellite morphing" half lands on
the absent engine half.** Rest: zero beads, park frozen (`probe-desktop-1440-rest.png`).
Hover: none. Click (happy+nudge): one fleeting micro-bead at 300–1000ms then gone
(`hover-09-click-*.png`). GAP-L5 is hereby LIVE-CONFIRMED at T: `uSatColor[]` absent,
satellites-at-rest unbuilt, HERO preset absent (`audit/w6-producer-gap-rows.md`). The owner
text is the forcing function for the L5 slate plus one NET-NEW behavior: mood-gated
satellite emergence (packet row D). Owner: **producer** (engine) + **demo** (moment
bindings, already landed and correct).

**F-9 · "All screen sizes" currently means three different compositions.** The <lg
hand-scale arm (`--blob-fp: 8rem; right: 1.75rem`, `ColorPicker.vue:363-366`) vs the lg
corner-break vs the portrait band riding the mobile slot — per-viewport special geometry
that exists only to manage overflow the new law deletes. Owner: **demo**. Cure: §2 — ONE
card-relative formula at every viewport (E-3 simplification).

## §2 THE SEAT — placement law v3 (the owner overrule, encoded)

**RETIRED by owner text**: W6-4's bead-center-on-radius-origin + the ≥25%-overflow-per-
broken-edge law (SEEDS w6 rider 2) and the <lg one-broken-edge arm. **KEPT**: Q7 full
presence; the slot-owned anchor + footprint token; the S.W4-2 by-construction reservation;
genesis §3.2-5's "nothing paints over it", promoted (below).

**The law**: the bead is a PAPERWEIGHT ON THE PLATE — seated wholly inside the card's
top-right corner region, down and to the left of the old seat, at every viewport:

- **Anchor**: wrapper flush to the plate corner — `top: var(--blob-seat, 0px); right:
  var(--blob-seat, 0px)` on the existing `.hero-blob-anchor`. With the wrapper flush, the
  visible bead's edge lands (0.5 − bodyRadius)·fp ≈ 0.24·fp inside BOTH edges (≈ 42px at
  fp 176) — the bead center moves from 16px-inset to fp/2-inset: exactly "into the card,
  down and to the left". `--blob-seat` is the one tuning knob for the in-wave taste pass
  (0 = the full seat; small negatives re-admit a corner kiss if the owner wants a trace of
  break — default 0).
- **Containment identity** (why this closes T-8's "no clipping" for free): orbit reach =
  orbitRadius + satelliteRadius = 0.49 ≤ 0.5 of the wrapper — at the flush seat the WHOLE
  satellite show stays inside the card; only the transparent canvas overscan (160%,
  `GooBlob.vue:372`) crosses the edge. No dock collision, no seam skewer, no About
  amputation, no `.app-layout` clip, no 390px smudge — by construction, at every width.
- **One footprint**: `--blob-fp: clamp(9rem, 26cqi, 13rem)` — cqi against the pane slot at
  ALL viewports; the 8rem/1.75rem hand arm DIES. (≥96px bead stays conditioned on the L5
  HERO preset — under containment the footprint may grow without sibling collision, so the
  gate is *easier* post-5.0.0, same identity bead = 2·bodyRadius·fp.)
- **The z law** (owner: "higher z than all"): a NAMED token tier, not source order — the
  ornament takes the top of the CONTENT stack (above both pane cards and every in-card
  fixture; e.g. `--z-ornament` above the CardHeader's z-10), and `.pane-wrapper--left{z:1}`
  (`style.css:424-426`) stays for transient cross-seam paint. Interpretation note for
  ratification: floating CHROME (dock, tooltips, dialogs) remains above by the app's
  z-grammar — under the seat the bead never enters the chrome band, so the two readings of
  "all" never conflict in paint.
- **Reservation**: the title-row reservation (`ColorPicker.vue:21` `pr-28 lg:pr-36`)
  re-derives from the seat formula (reserve = fp − 0.24·fp collapse into the header's right
  end). Synergy: T-7's contiguous left-set readout frees exactly this band.
- **Depth signature**: the corner-break's "wet on the plate" is replaced, not deleted — the
  seated bead earns its depth from a CONTACT SHADOW on the plate (SDF-band darken under the
  body — the genesis §2.3-2 wet-edge register, nearly free in-engine) + the material sheen;
  confirm in the L5 addendum (genesis open-Q9 was already asked; this makes it wanted).
- **Ink law** (F-4): the hero derive threads a contrast floor against the plate —
  |ΔL(bead body, card plate)| ≥ a named threshold, consumer-computed (the plate ink is
  demo-known; `safeAccentColor`-class helpers exist in the library), realized through the
  F9.R1 `bodyLightness`/`lightnessFloor` knobs at the 5.0.0 adopt.

## §3 THE CHOREOGRAPHY — the hover/morph score (beats, root-routed)

PRM collapses every beat to the producer's static frame (discipline stands, no demo wiring).

| Beat | What happens | Root |
|---|---|---|
| **Arrival** (load) | the bead EMERGES at the seat (the FSM's `emerging` state is the conserved asset, genesis §1.1) as a named beat of the one-overture load choreography | demo sequencing (cross-ref t-load-sync); engine state exists |
| **Approach** (hover-in) | SDF-silhouette crossing → `curious` + ONE soft swell; satellites WAKE — ≥1 bead emerges to visible orbit within ~400ms (the creature notices you). Legibility floor: the transition must be visible at a 94px bead — a named minimum observable delta (silhouette area / limb count), not a parameter delta | producer rows A+D; consumer keeps the one-line mood bind |
| **Attention** (hover-hold) | body leans on the flattened spring (exists, AX.W46 D5); pseudopod CURVATURE-BOUNDED — a liquid lobe, never the F-7 horn; sheen lifts | producer row B |
| **Play** (scrub/orbit) | velocity-fed deformation under the scale-aware ceiling | producer (standing L5) |
| **Celebration** (click = copy) | `happy` + nudge → one satellite detaches and completes a VISIBLE orbit (the drip receipt, genesis §3.0); tooltip re-seats below-left, inside the card region (today it pops into the dock band) | demo (tooltip side; moment binds landed) + producer D |
| **Release** (hover-out) | explicit `@mouseleave` beat (MISSING today, F-6) → autonomic settle; the park countdown keys off the engine's `settled` signal, never wall-clock | demo (leave bind, park rewire) + producer row C (`settled` seam) |
| **Rest** | sleepy = contained droplet + satellites frozen in VISIBLE orbit — never a mid-smear or tail-dented freeze | producer (satellites-at-rest, chord-dent — standing L5) |

## §4 The L5 addendum packet (net-new rows; E-2 shape — everything else in L5 stands, no re-ask)

- **A · Mood legibility at hero scale**: a named observable-delta floor per mood transition
  at ≤96px bead (the circumplex is right; its RENDERED delta is sub-JND — F-5).
- **B · Curvature-bounded pseudopod** at small footprints (append to the scale-aware
  deformation ask — the F-7 horn).
- **C · `settled` seam + park-only-from-settled**: expose a silhouette-energy settled
  signal; quiescence/park may engage only from a settled pose (F-6's embalmed smear); the
  consumer park keys off it.
- **D · Mood-gated satellite emergence**: curious/excited raise the visible-excursion duty
  cycle, sleepy retracts — the engine half of "satellite morphing", composing with
  satellites-at-rest + `uSatColor[]` (F9.R1) + the HERO preset.
- **E · Containment update to the genesis contract**: the demo's compositional law §3.2
  rows 1–3 are superseded by the SEAT (§2); open-Q1's headroom ask is now motivated by
  footprint growth, not sibling collision; open-Q9's contact-shadow/wet-edge register is
  WANTED (the seat's depth signature).

## §5 Cross-refs

- T-1/T-25 (load sync + boot quality): the bead's arrival beat + the GAP-ARM pink-field
  boot (worst-case F-4) — t-load-sync's lane; the seat and the overture must land as one
  design.
- T-7 (readout contiguity) frees the header band the seat occupies — same wave, same file.
- W3-3 idle-park economics + the §6.1 idle-budget e2e timing contracts survive the park
  rewire (row C changes the TRIGGER, not the budget).
- S.W8 adopt walk: rows A–E ride the existing GAP-L5 re-verify; the Blob rename (L17)
  renames this lane's import sites only.
