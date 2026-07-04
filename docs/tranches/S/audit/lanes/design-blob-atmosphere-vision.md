# S design-assay lane — BLOB + ATMOSPHERE vision (S-4 + S-18, design half)

Lane mode: AUDIT ONLY. Live probes against the dev server at `http://localhost:9000`
(Chromium via Playwright MCP; repo @ `c5aa091`, branch `tranche-q`). The tech lane owns
root-CAUSE for S-4/S-9; this lane owns the design VISION + register assay and routes
producer halves to glass-ui explicitly.

## 0. Evidence index (all shots taken this session)

All under `docs/tranches/S/audit/lanes/assets/blob-atmosphere/`:

| Shot | What it proves |
|---|---|
| `desktop-light-picker.png` (1440×900, light, pink seed) | baseline register; blob clipped puck; `— 06 / 16` counter; `@MBABB` uppercase |
| `desktop-light-green-seed.png` (SPA-nav to green) | aurora DOES follow a live seed change; collapsed-dock "Ho" defect at 1440px; per-item `07/08/09` counters in the open space dropdown |
| `desktop-light-green-coldboot.png` (reload, green URL) | **cold boot paints a PINK field while every model surface is green** |
| `atmosphere-hidden-probe.png` (canvas `visibility:hidden`) | the pink is painted BY the aurora canvas — page background beneath is neutral `rgb(251,250,248)` |
| `after-spa-nudge.png` (hue 145→150 nudge) | one live color change snaps the field back to the derived green |
| `desktop-dark-green-seed.png` (dark, cold boot) | dark cards + bright pink light-register field |
| `desktop-dark-after-nudge.png` (dark, live-nudged seed) | **even with a fresh seed, dark mode paints the LIGHT-register L band** — scheme-blindness is independent of the boot bug |
| `blob-closeup-t0.png` / `blob-closeup-t1.png` (700 ms apart) | single satellite-less bead; flat-chord dent; About card paints OVER the blob's east limb |
| `mobile-light-green.png` (390×844) | mobile blob = clipped dark smudge; canvas overflows the viewport |
| `aurora-pane-light.png` / `blob-pane-light.png` | admin panes: doubled labels, generic full-width sliders, occluding action pill; defaults readout (orbit 0.170 < body 0.220) |

Measured numbers: hero wrapper 176 px (`w-24 lg:w-[11rem]`, `HeroBlob.vue:15`); canvas
281.6 px CSS (160 % of wrapper, backing 285×285); canvas rect x 529→810.8 at 1440 px
while the About card's left edge ≈ 731 → ~80 px of blob canvas under the sibling card.
Mobile canvas right edge 401.8 > 390 viewport. Page rAF steady ≈ 66/s in Chromium
(no spazz reproduced here — S-4's spazz remains a Safari/perf-lane reproduction item).
Console on every load: CORS block of `api.color.babb.dev/colors/approved` from
`localhost:9000` (S-11 evidence; another lane owns).

---

## 1. Findings (ranked)

### P0-1 — Atmosphere cold-boot stale seed: the first painted field is WRONG and stays wrong until the user changes color
- **Evidence**: `desktop-light-green-coldboot.png` (green URL color, green readout, green
  `--accent-live: oklch(0.620 0.2300 145.0)`, PINK field) vs `after-spa-nudge.png`
  (one nudge → green field). `atmosphere-hidden-probe.png` proves the canvas paints the pink.
- **Contributing corruption found**: `demo/@/composables/color/useAppColorModel.ts:74-78`
  — `syncColorToStorage` persists `color?.toString()` of the NORMALIZED unit; the live
  store holds `inputColor: "oklch(0.65 0.46 0.4027…)"` (normalized C 0.23/0.5→0.46,
  normalized hue 145/360→0.40), which re-parsed as CSS is a **hot pink** — exactly the
  stale field's color. The boot-time `cssColorOpaque` chain then feeds
  `useAtmosphere.ts:84-95`'s immediate seed watch before the URL color applies, and the
  subsequent boot-window green write never reaches the GL palette.
- This IS the user's S-18 experience ("does not update from the current color at all"):
  every cold load paints a wrong saturated pink-red field regardless of the actual color;
  prod (older code) plausibly worse.
- **Routing**: value.js demo (tech lane root-cause; two named suspects above). Design
  acceptance: the FIRST painted aurora frame derives from the boot color, or nothing
  paints — a stale-seed frame is never acceptable (no-silent-handling precept).

### P0-2 — The atmosphere is scheme-blind: dark mode gets the light-register field
- **Evidence**: `desktop-dark-after-nudge.png` — fresh green seed in dark mode still
  paints L≈0.6–0.9 cream/green zones behind dark-glass cards. Code-grounded: glass-ui's
  `deriveAurora` HAS the lever (`scheme`/`lBand`,
  `glass-ui/src/components/custom/aurora/composables/color.ts:222-245`) but the
  `AuroraAtoms` door does NOT expose it (`atoms.ts:102-139` — no scheme atom), and the
  consumer never threads dark state (`useAtmosphere.ts` has no dark input at all).
- **Routing**: SPLIT — glass-ui producer (expose a `scheme` atom on `AuroraAtoms`,
  default `"light"`, resolve to the dark L band) + value.js demo (thread `useGlobalDark`
  → `auroraAtoms.scheme`). Spec in §3.

### P1-3 — The satellite show is invisible at library defaults ("no satellite blobs")
- **Evidence**: `BLOB_CONFIG_DEFAULTS` (`glass-ui/src/components/custom/goo-blob/types.ts:323-330`):
  `bodyRadius 0.22, satelliteCount 3, satelliteRadius 0.082, orbitRadius 0.17` — the
  satellite CENTERS orbit inside the body skin (0.17 < 0.22), so all three read as faint
  breathing bulges, never as orbiting beads. glass-ui's own studio runs the show at
  orbit 0.30 (`constants.ts:150` BA-REDRESS notes). The hero consumes bare defaults
  (`useAtmosphere.ts:100` `structuredClone(BLOB_CONFIG_DEFAULTS)`).
- The library default is DELIBERATE (four-side containment); the defect is the
  **consumer choosing the contained-droplet register for a hero surface**.
- **Routing**: value.js demo (hero geometry override at the one config site) — with a
  glass-ui producer ask to export a documented `HERO` preset (or the studio's solved
  geometry) so the override isn't hand-tuned per-consumer (S-21 at-the-root).

### P1-4 — Corner-break placement law is broken: the hero is small, buried, and clipped
- **Evidence**: `ColorPicker.vue:20` `absolute z-20 top-0 right-0 lg:-top-14 lg:-right-12`
  — the z-index is scoped to the picker card's stacking context; the About card is a
  LATER sibling and paints over the blob's east limb (`blob-closeup-t0.png`). At 1440 px
  the canvas spans x 529→810.8 vs About-card left ≈ 731. On mobile the `w-24` puck's
  canvas overflows the viewport (right edge 401.8 > 390) and the bead reads as a clipped
  dark smudge (`mobile-light-green.png`).
- **Routing**: value.js demo. The placement law belongs to the PANE SLOT, not the card
  (§2 brief). No per-instance z hacks (S-21).

### P1-5 — The blob's material register is off: matte gumdrop, not the palette made flesh
- **Evidence**: all closeups — a flat mid-green ball with one white specular dot and a
  recurring flat-chord dent at the lower-left (visible in `blob-closeup-t0/t1.png`,
  `blob-pane-light.png`; suspect: a permanently-absorbed satellite deforming the skin at
  the contained orbit, or the containment clamp — producer to verify). The consumer's
  ramp is muted at `chromaCeiling: 0.16` (`useAtmosphere.ts:112-116`) while the picked
  color runs C 0.23 — the hero literally cannot show the ink it advertises. Against the
  crayon-proportioned editorial register the bead reads as vendor demo furniture.
- **Routing**: SPLIT — value.js demo (raise the ramp ceiling to track the picked C,
  clamp only for gamut; adopt the lit `"meatball"` register deliberately) + glass-ui
  (verify/cure the chord-dent artifact on the default bead).

### P1-6 — Even when correctly seeded, the field is a monochrome wash — no H/C life
- **Evidence**: `after-spa-nudge.png`, `desktop-light-green-seed.png` — one hue family,
  L-only banding. Defaults: `hueSpread 28°`, `chromaFalloff 0.85` bell,
  `lightnessSpread 0.32` (`color.ts:229-236`); consumer atoms `colorEnergy 0.7, zones 5
  composed, noise 0.5, drifting` (`panes/keys.ts:22-32`). 28° of analogous walk at one
  chroma bell IS a wash. S-18 explicitly wants H AND C varying across elements.
- **Routing**: value.js demo (atom/derive-option tuning per §3 spec); glass-ui only if
  the `hueSpread` ceiling or per-zone hue assignment clamps below the spec.

### P1-7 — BlobPane/AuroraPane are off-register admin furniture (taste P1)
- **Evidence**: `blob-pane-light.png`, `aurora-pane-light.png`:
  1. **Doubled labels** — every control renders the sans label AND a mono duplicate
     (`ConfigSliderPane.vue` renders its own row label above glass-ui's `ConfiguratorRow`
     which also carries one) — pure superfluity (S-12 class), excise one at the root.
  2. Generic full-width (~1350 px) white slider pills with near-invisible thumbs — the
     crayon/instrument register of the picker's channel rail is absent; sliders should
     spawn from a glass-ui crayon-register Slider variant (S-17/S-21), not shadcn `ui/slider`.
  3. The floating "Copy JSON / Reset" pill OCCLUDES the last slider row (Noise Amp) —
     hierarchy inversion: chrome over content.
  4. Value readouts right-flushed a full viewport away from their labels — unreadable
     pairing at desktop widths.
- **Routing**: value.js demo (`ConfigSliderPane.vue`, 197 LoC) + glass-ui (crayon Slider
  variant at the root; ConfiguratorRow label API so consumers can't double-label).

### P2-8 — Cross-lane evidence contributed
- Collapsed dock "Ho"/"Atr" text clipped over the dot at **1440×900 desktop** — S-8 is
  not mobile-only (`desktop-light-green-seed.png`, `aurora-pane-light.png`). Owned by the
  shell lane.
- CORS block of `api.color.babb.dev` from localhost on every load — S-11 evidence
  (console log captured). Routing: api (dev-origin allow) or demo env config.
- `COLOR SPACE — 06 / 16` counters (card + About + per-dropdown-item) — S-1/S-14 lane.
- The blob's click (copy color) has NO visible acknowledgment moment — folded into the
  §2 choreography brief.

---

## 2. GREENFIELD DESIGN BRIEF — the blob as MATERIAL HERO

The blob is the picked color made flesh: a wet bead of the actual ink sitting on the
atlas plate's corner, alive but calm. Everything below is spec, not implementation.

**Size law.** Desktop pane: wrapper `clamp(9rem, 18cqi, 13rem)`; the VISIBLE bead ≥ 96 px
diameter at rest. Mobile: all-or-nothing — either full presence at ~7 rem breaking the
card corner, or absent entirely. The current `w-24` smudge is the forbidden middle.

**Corner-break placement law (ONE law, owned by the pane slot).**
- The bead's center sits on the card's corner-radius origin; ≥ 40 % of the bead's
  diameter overflows OUTSIDE the card.
- Nothing paints over the blob: it is the topmost ornament of its pane slot — the slot
  (not the card) assigns its layer, and the inter-card gutter reserves the overflow
  (gutter ≥ the blob's overflow extent). Kills the About-card burial without z hacks.
- The card's cartoon-offset shadow must never slice the bead: the bead renders ABOVE
  the shadow plate, and casts its own (below).

**Material.** Keep the lit `"meatball"` register (Fresnel rim + SSS + iridescence — the
producer's best work) but re-anchor: fill stops track the PICKED chroma (ceiling =
gamut, not 0.16), and the bead casts the same offset ink shadow the cards do (the
`uShadow` procedural shadow exists — tune it to the cartoon-offset geometry: ~4 px SE,
near-black ink). That one shadow is the register bridge that makes the blob belong to
the plate instead of floating over it.

**Satellite choreography (the show).** Hero geometry: `orbitRadius 0.30–0.34`,
`satelliteCount 3`, `satelliteRadius ≈ 0.09`, near-circular. The orbit→merge→absorb→
emerge cycle must be LEGIBLE at rest: an observer sees a bead detach or return roughly
every 8–14 s (the producer's `orbitDuration [8000,14000]` already says this — it's the
contained orbit that hides it). Fission (`MERCURY-COLONY`) stays opt-in, armed only at
`excited`.

**Mood FSM — VERDICT: KEEP.** The `{valence, arousal}` circumplex
(`constants.ts:48-104`) is principled, one-surface, cheap; HeroBlob consumes it thinly
(hover→curious, click→happy) — this is not superfluity, it is the choreography
substrate. But bind it to real app moments so all five moods are reachable:
- slider/spectrum SCRUB (active drag) → `excited` (arousal spreads the orbit — see
  producer ask G-3), release → decay to `idle`;
- save/copy success → `happy` pulse;
- 6 s idle → `sleepy` (exists), satellites gather (contained droplet IS the sleepy pose
  — the current default becomes the sleep state, not the identity);
- hover → `curious` (exists).
Click acknowledgment: the copy action fires one satellite fission "drip" — the drop
detaching is the receipt.

**PRM.** Static bead, satellites parked absorbed, zero rAF — a complete single-frame
render of the derived palette (mirror of the aurora's CSS placeholder discipline).

**Safari (S-22).** Acceptance rides the existing `smoke-safari` sustained-30 s
context-loss probe + a NEW assertion that the bead's centroid stays inside the wrapper
(the spazz gate) — the tech lane owns the reproduction; the design gate is "calm lean,
never a twitch" (the producer's own calm-lean ceiling 0.10 is the number).

---

## 3. GREENFIELD DESIGN BRIEF — the aurora as a CURRENT-COLOR OKLCH FIELD

One anchor, few elements, all derivation in OKLCH. The anchor is `--accent-live`
(already contrast-guarded, `App.vue:161`; `auroraAtoms.seed` is the same color's WebGL
door — they must never diverge, which is P0-1's acceptance).

**WebGL field derivation (the atmosphere proper).**
- 5 stops. Hue: anchor `h ± spread` where spread WIDENS as chroma falls —
  `spread = 24° + 40°·(1 − min(C,0.3)/0.3)`, clamp [24°, 64°]: a vivid seed stays a
  family; a near-neutral seed still yields a living multi-hue field (the current fixed
  28° is why neutral seeds die).
- Chroma: bell across stops peaking at `0.85·C_anchor` with a FLOOR of 0.04 — no
  dead-gray zone, and the C-variation S-18 names becomes visible zone-to-zone.
- Lightness: **scheme-banded** — light `[0.80, 0.97]`, dark `[0.18, 0.42]`. (The single
  `[0.35, 0.95]` band is P0-2's failure; producer ask G-1.)
- Zones 5 `composed`, noise ~0.5, `drifting` (U33 ratified) with a period ≥ 12 s —
  atmosphere, not a screensaver.
- PRM: the existing CSS-gradient placeholder path, painted from the SAME derived stops.

**CSS element layers (S-18's "few elements") — all CSS relative color off
`--accent-live`, zero JS, and CAPPED AT FOUR (superfluity discipline):**
1. Card glass tint — `--glass-tint-source: var(--accent-live)` (EXISTS, `style.css:178`;
   verify consumption end-to-end).
2. Per-view accent — `--accent-view: oklch(from var(--accent-live) l c calc(h +
   var(--view-hue-shift)))` (EXISTS, `style.css:175`) — this is already the H-varying
   element; keep, do not duplicate.
3. Focus ring — EXISTS (`style.css:190`).
4. NET-NEW (the only addition): the dock halo/ambient —
   `oklch(from var(--accent-live) calc(l + 0.15) calc(c * 0.5) calc(h + 15) / 35%)` as
   the dock's glass ambient, so the shell answers the picker the way the field does.
Anything beyond these four is excised, not added.

**Boot truth.** First frame = derived field of the boot color, or no paint. The
flash-free `--saved-bg` must be the derived BASE STOP (not the raw picked color), so
boot background → first aurora frame is one continuous material.

---

## 4. Producer routing table (glass-ui asks — explicit, per S-21)

| # | Ask | Ground |
|---|---|---|
| G-1 | `scheme` atom on `AuroraAtoms` (light/dark) resolving to the dark L band; `resolveAtoms` threads it to `deriveAurora`'s existing `scheme`/`lBand` | `atoms.ts:102-139` lacks it; `color.ts:243-245` has the lever |
| G-2 | Exported HERO blob preset (the studio's solved show geometry: orbit ≈ 0.30, containment-verified for the 160 % canvas) so consumers don't hand-tune | `types.ts:323-330` default is the contained droplet; studio geometry cited at `constants.ts:150` |
| G-3 | Mood-surface orbit SPREAD: arousal scales `orbitRadius` (sleepy → contained, excited → full show), alongside the existing `orbitSpeedScale` | `constants.ts:64-104` `paramsFor` |
| G-4 | Verify/cure the flat-chord dent on the default bead (absorbed-satellite skin deformation vs containment clamp) | 3 shots in §0 |
| G-5 | Crayon-register Slider variant + `ConfiguratorRow` label API that prevents consumer double-labels | P1-7; S-17/S-21 |

value.js consumer halves: seed/boot integrity (P0-1), dark threading (P0-2), hero
geometry + placement law (P1-3/4), ramp chroma + shadow register (P1-5), field derive
options (P1-6), pane redress (P1-7).

## 5. Candidate wave-items

1. **S.W-ATMO-BOOT (P0)** — cold-boot seed integrity + the normalized-persistence
   corruption (`useAppColorModel.ts:74-78`); e2e: cold load at a URL color paints the
   derived field first frame, light+dark.
2. **S.W-ATMO-SCHEME (P0)** — glass-ui G-1 dispatch + consumer dark threading; e2e:
   dark-mode field L band ≤ 0.42.
3. **S.W-BLOB-HERO (P1)** — G-2/G-3 dispatch + hero geometry consume + pane-slot
   placement law + mobile all-or-nothing; visual gate: satellite detach visible within
   14 s at rest; nothing overlaps the bead.
4. **S.W-BLOB-INK (P1)** — full-chroma ramp + offset ink shadow + click-drip
   acknowledgment; G-4 verification.
5. **S.W-FIELD-DERIVE (P1)** — §3 derivation spec (chroma-adaptive hue spread, C floor,
   dock halo as the one net-new layer); excise any 5th layer.
6. **S.W-PANE-REDRESS (P1→P2)** — ConfigSliderPane single-label + glass-ui slider (G-5)
   + un-occlude the action pill.
