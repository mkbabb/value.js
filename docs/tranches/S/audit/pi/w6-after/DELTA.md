# S.W6 π CLOSE — w6-before → w6-after DELTA

Captured by the independent (non-authoring) S.W6 gate verifier at tranche-q HEAD
`9341361` (all eight W6 lane commits `e9ef5b2..9341361` landed) — same harness
(`pi-baseline.mjs`, byte-identical), same cold URL/color (`oklch(0.72 0.19 145)`),
same cadence, same four quadrants (wide-1440x900 + mobile-390x844 × light/dark ×
cold/live), same serve convention as the `w6-before` half at `9d1297b` (disposable
vite on free :4877, `VITE_API_URL` at an unreachable loopback → the honest
`unavailable` state; the owner's :9000 untouched). 4/4 quadrants `ok`. The 4 `.webm`
videos + `manifest.json` + this DELTA are the committed record; all PNGs self-ignore
(`.gitignore:19`) and regenerate at this commit.

**Vehicle honesty note (applies to BOTH halves equally):** headless Chromium resolves
`resolveRenderMode("auto")` to the `"css"` substrate, so the archived field is the
CSS-gradient placeholder — a complete render of the SAME `resolveAtoms` derived
palette the WebGL aurora consumes. Material judgments (derivation, richness, scheme,
entrance) read identically through it; the live-WebGL arm (WebGPU on real-GPU
Chromium) was verified separately by the verifier's headed probes (annex below).

## Cold entrance (hard-gate row 1 + the 2026-07-05 rider, judged on these frames)

- **Light, both viewports**: `frame-t0000` = pre-first-paint white; the FIRST painted
  frame (`t0016`) already carries the fully derived green→cyan→violet→pink field, the
  cards, and the correct light scheme. No stale hot-pink, no theme-paper flash, no
  unstyled limbo, and **no dark→light or light→dark snap at any cadence point**.
- **Dark, both viewports**: `t0000` = dark theme paper (a genuinely fresh context has
  no persisted boot material — the `var(--saved-bg, var(--background))` fallback is
  the honest ground); `t0016` presents the derived field with dark card surfaces; nav
  and controls fill in progressively to `t0380`. No scheme snap, no hot-pink.
- **The blob's material arrival** is a designed ramp (dark-olive → the picked vivid
  green across `t0120→t1800`, the W3-2 idle-deferral + W6-1 derive-in), not a pop.
- BEFORE showed the same fresh-context first-frame integrity (the corruption class
  needed a returning-user precondition — README `w6-before` observations); the
  returning-user arm is now proven by the standing e2e
  (`atmosphere-cold-load.spec.ts` seeds the literal STALE hot-pink session and
  asserts the derived stop survives, light AND dark). The entrance `.webm`s carry
  the no-snap record.

## Field richness (W6-3 + the amplification rider)

- BEFORE (`live/*.png`): ONE dominant green band, olive/gold top-left corner, modest
  variance — a near-monochrome wash; dark-live nearly indistinguishable from
  light-live.
- AFTER: the seed-anchored TRIAD walk — base stop green (`--saved-bg` settles
  `#458808` for the hue-145 pick), later stops walking cyan/blue → violet → pink with
  visible chroma zoning (C 0.07–0.16 zone-to-zone per the W6-3 design record). The two
  cards now sit on legibly different field zones at 1440; the 390 quadrants carry the
  same walk vertically.
- Verifier seed sweep (annex): `--saved-bg` tracks the pick exactly — green-145
  `#458808` · red-25 `#a40b35` · blue-260 `#273895` · neutral-gray `#6c706b`; the
  red-seed field walks crimson→gold→teal (H tracks), and the NEUTRAL seed stays
  alive (silver with sage/mauve whispers — no dead-gray flatline) on the shipped-knob
  demo half alone.
- **Recorded gap, unchanged by this archive**: the DARK field is still the light-band
  material (bright field under dark cards) — the L2 atoms-door gap
  (`audit/w6-producer-gap-rows.md` GAP-L2); the dark L band [0.18,0.42] re-verifies at
  the S.W8 adopt. Hard-gate row 2 rides that recorded row, not this capture.

## Hero blob (W6-4 / Q7)

- BEFORE: desktop bead tucked INSIDE the card's top-right (placement.png shows a
  ball fully within the corner); mobile a `w-24` puck.
- AFTER: true corner-break — bead center ON the card's corner-radius origin
  (placement law, probe delta [0,0] per `d843ae7`), breaking both edges at 1440
  (≈33% per broken edge ≥ the 25% law) and the TOP edge at 390 (the <lg hand-scale
  arm, right edge deliberately unbroken for viewport honesty — `scrollWidth == 390`
  asserted by the standing 390 spec); nothing paints over it in any quadrant (the
  About-card burial is dead; zero z hacks — source order + the slot's cross-pane
  layer).
- `satellite-t*` series: the bead carries attached drip/spout satellites (visible
  in every after-quadrant), not ≥2 DETACHED beads at rest — exactly the recorded
  L5 HERO-preset producer-gap row (absent at glass-ui 4.2.0/tranche-BG; consumer
  ceiling ~91.5px bead at the 176px footprint). Re-verifies at the S.W8 adopt.
- Q7 FULL presence: the blob is present, sized, and corner-composed at EVERY
  quadrant including 390×844 both schemes (BEFORE already mounted it at 390; AFTER
  makes it a composed corner-break instead of a clipped smudge, with the perf gate
  now a standing spec: `blob-presence-mobile.spec.ts`).

## Verifier probe annex (independent, this session)

- **T1 amber-wash (row 9)**: light AND dark — `body[data-paper-field]` present; 2/2
  glass cards `background-image` carries NO `radial-gradient`; stripping the
  attribute re-arms the amber pair 2/2 (the mechanism is proven both directions).
  The re-measured hot zone (3.98:1 vs the 4.2 expectation) is the recorded
  GAP-L2-blocked residual (forensics ADDENDUM; re-verifies at W8 with the band).
- **W6-7 pointer (row 8)**: headed real-GPU vehicle (atmosphere = WebGPU, armed) —
  still-field pixel delta floor 0.08% (thumb pulse only); under a driven pointer
  sweep 77.8–88.1% of the 1440×900 frame moves (`m-still` vs `m-left-live` /
  `m-right-live`), decaying after the hand lifts; the hero's drip re-aims toward
  the cursor in the same register (ONE grammar, backdrop + hero).
- **PRM (row 4)**: `reducedMotion: reduce` → two full-page frames 1.5s apart differ
  by 266 px at max channel delta 2/255 (sub-perceptual AA noise) — a static single
  frame; the field and parked hero both painted.

## Taste (row 8, the verifier's call)

The amplification lands where the ruling aimed: the before-field read as one green
wash with a mustard corner; the after-field is a composed three-family walk that
still defers to the cards — long spatial wavelengths, no banding, ink contrast
holding, the pick's identity anchored at the base stop. On the real-GPU arm the same
derive reads as a teal-green body with warm gold lobes that lean toward the hand and
breathe back to rest. Visibly greater C/H variance, subtle in register — variance,
not noise. MET.
