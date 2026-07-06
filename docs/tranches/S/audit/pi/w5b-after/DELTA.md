# S.W5 Lane B — π CLOSE archive DELTA notes (w5b-before → w5b-after)

Captured 2026-07-06 by the Lane B completion session on branch
`worktree-wf_fa07ead0-7af-3`, same harness (`../pi-w5b.mjs`), states, viewports
(1440×900 + 390×844 × light/dark), and serve convention as the baseline (gh-pages
bundle on a free **:4189**, never the owner's :9000; fresh context per shot so
true-empty states stay true). 36 static shots + the mix-motion family (11 frames +
webm, dark 1280×800). PNGs self-ignore under `.gitignore:19 *.png` (the R/S standing
convention); manifest + these notes + the harness + the motion webm are the committed
record; frames reproduce on demand.

Provenance note (honest): the baseline was captured at HEAD `5c700fe` — i.e. AFTER
W3-6 (the Q10 first-principles mix convergence) landed, BEFORE any Lane B W5-6/W5-7
edit. The mix-motion family is therefore the same clock in both archives **by
design**: W3-6 is the choreography item-of-record and Lane B designs WITH its 900ms
convergence, never around it — the motion record here is the beauty-gate evidence,
not a re-tune.

## Per-state deltas

- **extract-empty (all 4 quadrants)** — F1 + F2, the loading ≠ empty rule made real.
  BEFORE: `· UNDEVELOPED PLATE — FEED IT AN IMAGE ·` (a second, shoutier invitation
  under a drop zone that already invites; widowed wrap at 390) over an at-rest
  shimmer skeleton (~340px of ghost slabs; near-black banded slabs in dark). AFTER:
  both DEAD — the dashed drop zone alone is the empty state; TRUE EMPTY renders no
  plate furniture at all. The skeleton now appears ONLY while `isProcessing` (the
  developing-plate loading grammar; the generic `Extracting...` spinner row is
  DELETED — F12).
- **extract-developed (all 4)** — F7, ONE strip. BEFORE: dominant WatercolorDot +
  stat block → standalone proportional strip → PaletteCard whose header is a second
  near-identical strip ~60px apart (three tellings; the deliverable below the fold).
  AFTER: the population story rides ON the palette (`PaletteColor.weight`, normalized
  quantizer shares) so the card's OWN header strip is proportional by construction;
  the standalone twin strip and the duplicate dominant dot are DEAD (the card's first
  swatch IS the dominant specimen); the stat folds onto one baseline seated on the
  plate — Fraunces `25`% of the image + `DOMINANT` eyebrow + Fira `oklch(…)` readout
  (full value rides `title` + `select-all` where truncation trims trailing digits).
  The whole developed state now fits far tighter vertically.
- **extract-hover (all 4)** — F4, the one surface whose colors must never lie.
  BEFORE: full-cover `bg-background/60` veil + centered copy — the specimen washed
  to chalk the instant the pointer entered it. AFTER: the veil is DEAD; the specimen
  stays perceptually true under the pointer; the affordance lives at the EDGE —
  border ink on hover, crosshair cursor when the click samples, and a corner Fira
  `SAMPLE`/`REPLACE` chip that inks in on hover/focus.
- **extract-eyedropper (all 4)** — F13, the plate is the event. BEFORE: the specimen
  floated at modest scale low-left inside a mostly-empty veiled overlay (the
  `min(…, 1)` fit cap never scaled small specimens up). AFTER: fit fills the
  viewport in both directions (aspect preserved, clamped to the gesture's own
  maxZoom), centered by construction; `Tap to sample` chip + close sit above the
  full-bleed plate.
- **generate-rest (all 4)** — F8, the hierarchy un-inverted. BEFORE: controls-first
  column; the page's one verb a small ghost DockIconButton parked at the end of the
  `seed:` metadata row; the palette last and smallest; permanent PRESET/HARMONY
  subtitles truncating at 390 ("High chroma, bold…"). AFTER: the palette plate is
  the HERO (full card up top), a real `Regenerate` Button in the plate's toolbar
  wearing the producer's deliberate-primary register (`primary-audacious` — the L6
  rider consumed at the root vocabulary, zero per-instance costume), the seed stays
  a Fira `select-all` bench note, PRESET/HARMONY as marginalia beneath with the
  subtitles DEAD (W5-7 — the dropdown's own `#description` rows tell the story on
  demand, so nothing truncates at 390), and the COUNT slider carries the generated
  ramp itself (the extract k-slider pattern verbatim; the dead grey spectrum capsule
  is gone).
- **mix-empty / mix-selected (all 4)** — the L6 rider + W5-7. BEFORE: enabled Mix
  visually identical to disabled (washed beige capsule both states); `N colors`
  counter restating the visible chips ("1 colors" at one); permanent COLOR SPACE /
  HUE METHOD subtitles. AFTER: Mix wears `primary-audacious` — enabled (deep punch
  capsule, full ink) now reads distinctly against disabled (pale wash, muted ink);
  the counter and the `N palettes selected` line are DEAD (the chips and ring-lit
  cards ARE the state); the subtitles are DEAD.
- **mix-palettes-tab (all 4)** — F3, the eternal-skeleton silent-handling violation
  cured. BEFORE: zero saved palettes → `PaletteCardSkeleton :count=3` shimmering
  forever (a fake loading state over an empty one — every fresh visitor's first
  impression). AFTER: TRUE EMPTY speaks the specimen-plate register (Q6
  RATIFIED-NARROWED: the annotation class survives on true empty ONLY):
  `· NOTHING TO MIX ·` eyebrow + "No saved palettes yet." + the honest route
  ("Save two or more palettes, then pour them together here."). This store is
  synchronous — no loading state exists here at all, so no skeleton belongs here.
- **mix-result (all 4) + mix-motion (11 frames + webm)** — the Q10 surface, designed
  WITH the W3-6 clock: the destination well (`[data-mix-target]` seeded ghost) is
  announced the moment the mix starts; drops converge and the pool settles by 900ms;
  the result plate inks in beneath it with the full Fira `oklab(…)` readout +
  copy/save/reset. Identical clock in both archives (see provenance note); the
  before/after difference on this state is the surrounding register (counters dead,
  L6 verb ink).

## Non-visual moves in this close (named for the record)

- `useColorGeneration` moved home: `color-picker/composables/` →
  `generate/composables/` (F15, colocation discipline); the picker consumes the one
  pure helper (`generateSingleColor`) across trees.
- The mix↔gradient interpolation vocabulary moved to its neutral home
  `@lib/color-space-meta.ts` (F16 — color-space facts, not gradient facts);
  `useGradientInterpolation` re-exports for the gradient tree's own consumers.

## Residue (named honestly, none gate-bearing)

- The dark-scheme ambient field still reads light-pink/cream under dark cards in
  every dark frame — identical in before/after; that is S-18/W6's cross-lane item
  (aurora theme axis), not a Lane B regression.
- Slider thumb ink (kC, count, channel rails) remains the white-outline ghost —
  the producer letter half (F14 / L6 thumbs), untouched here by design.
- The dominant Fira readout truncates trailing digits at 390 (and tight 1440
  aside-layout widths); the full value rides `title` + `select-all` — recorded as
  register-acceptable, never a lying readout.
- Dock segmented-pill clipping at 390 ("Pa", "Mi x") persists in mobile frames —
  the S-7/S-8 dock lane's item (W7), visible here only as context.
