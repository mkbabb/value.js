# T lane · t-request-packets — the SHAPE of the T-era producer request packets (E-2 census)

**Lane**: `t-request-packets` (T DEVELOPMENT synthesis fleet). **Mandate**:
`docs/tranches/T/MANDATE-2026-07-06.md` §0 (verbatim owner text wins) + **E-2** ("Full glass-ui
audit, with a series of request packets, based on the most recent glass-ui and forthcoming BG/BH
changes. All component level items should be done at the root, within glass-ui, or herein.").
**Charge**: from the T findings (T-1..T-29) + the S-close OPEN asks (L2..L20, A1..A7) + the
gap-rows (GAP-L2 / GAP-L5 / GAP-ARM / PRM-expand / A1-A7), draft the SHAPE of the T-era producer
request packets — which findings are **producer-root**, which are **joint**, which are **demo-only**
— as ONE numbered series, each with an evidence cite + a root-routing rationale + a timing window.
**Discipline**: this is DEVELOPMENT — I DO NOT dispatch; the corpus authors the letters at
ratification. ZERO product-code changes. This file is the only write.

**Substrate**: value.js `tranche-t` @ `e507330` (= master `cc4f4fa`, the S close). Producer
read-only `../glass-ui` @ **`19ddbd71`** (`tranche/BG`, labelled 4.2.0; the consumed dist is a
gitignored local build ~1 day stale of tip — see the DIST-rebuild discipline below). Dock.vue is
**DEMO-owned** (`demo/@/components/custom/dock/Dock.vue`; no producer `Dock.vue`) — load-bearing for
the T-28/T-29 routing.

**Sibling lanes this census stands on** (their forensics are the evidence; I route, I do not
re-forensic): `t-glassui-current.md` (the 14-open-ask ground-truth ledger + the T→primitive map),
`t-glassui-forward.md` (the BG/BH freeze gates + the coverage map + F-1..F-6 new asks),
`t-aurora-boot-active.md`, `t-blob-hero.md`, `t-transitions-liquid.md` (PKT-1..PKT-4),
`t-card-material.md` (P-1/P-2 ladder), `t-search-tabs.md` (T-20 ASK-A + T-12 ASK-D),
`t-sliders-hierarchy.md` (F-3/F-6), `t-header-shading.md`, `t-shadow-palette.md`,
`t-nav-dropdowns.md`, `t-outline-dropdown-clip.md`. The S letters: `letters/GLASSUI-S-ASKS.md`
(L1-L18) + `-ADDENDUM-2026-07-05.md` (A1-A7 / L19 / L20) + `audit/w6-producer-gap-rows.md`.

---

## §0 The six load-bearing findings (one line each)

1. **RP-CENSUS-1 — three disposition classes, not one.** The T producer surface splits cleanly:
   (a) **NEW ASK** (never dispositioned — the entire A1-A7 addendum + T-20 tabs geometry + the WELL
   rung + the PKT-1 dist-clobber); (b) **RE-ASK by-name** (L6/L8/L9/L11/L16 were "folded onto
   `W-DESHADCN`" but that wave landed the 233-file tailwind sweep, NOT the L-item fixes —
   `t-glassui-current §4`); (c) **VERIFY-AT-CUT** (L1/L3/L18 + F9.R1/R8 genuinely landed — record,
   do not re-book). The packets must carry all three, kept distinct, exactly like the S letter.

2. **RP-CENSUS-2 — the AURORA cluster is the highest-leverage packet and the WORST covered.** The
   entire owner-pain cluster T-1 / T-25 / T-26 / T-27 roots in producer work that is **UN-BOOKED**
   because the value.js addendum letter (A1-A7 / L19 / L20) was dispatched later the same day and
   **never replied to or folded into any BG wave** (`t-glassui-forward §3`). GAP-ARM (the arm-replay,
   user-visible on prod), the L2/A3 variance atoms, and the richer pointer door are the three
   producer-root sub-packets here.

3. **RP-CENSUS-3 — TWO genuinely new producer-root packets the T lanes discovered beyond the
   addendum**: **T-20 tabs pilling** (the anchor-path indicator double-counts `--bouncy-track-trim`
   — pure producer CSS, `t-search-tabs §4`) and the **glass-ladder recessed WELL rung + the
   `.input-bar` mis-rung** (the ladder has 5 rungs UP, none DOWN; the search pill imports dialog
   material into a card interior — `t-card-material §5` / `t-glassui-forward F-5`). Both are
   ladder/geometry-shaped, belong at the root, and are NOT re-asks of anything already booked.

4. **RP-CENSUS-4 — the "primitive already exists" findings are DEMO-ADOPTION lanes, NOT packets.**
   T-14 (the `--spring-*` + `--ease-cartoon-punch` liquid tokens SHIP), T-28 (the WatercolorDot
   `ghost`/`.watercolor-ghost-stroke` traces the seeded organic silhouette), T-17 (the Select
   primitive exists; the colour-preview is a `SelectItem` composition), T-23 (the `veil-surface`
   register ships), T-12 seat + T-5 dock-ring language — every one has its producer primitive
   already. Routing these into packets would be redundant asks; they are recorded here as **NOT a
   packet** so the corpus cites the existing surface instead of re-minting it.

5. **RP-CENSUS-5 — the packets have TWO landing horizons + FOUR freeze gates.** A behaviour fix
   (aurora replay, variance atoms, tabs geometry, motion clobber) lands on `tranche/BG` and is
   visible to value.js LIVE via the `file:` pin (W-3 window, widest, land-early). A subpath/rename/
   token-name change binds the WS12 export-regen freeze (**W-1**) or the B4e MIGRATION freeze
   (**W-2**) and MUST be in the packet before those run (`t-glassui-forward §1`). The Blob rename
   (L17), `/blob/config` (L20), and any T-new token rename are the W-1/W-2 payload; everything else
   rides W-3. WS12 has not landed — the windows are still OPEN.

6. **RP-CENSUS-6 — the `--ring` silent strand: value.js is an UN-ROSTERED consumer.** WS10 renames
   `--ring → --focus-ring-color` (no alias, clean break); the BH B7 roster counted atlas + speedtest
   and **missed value.js's single `var(--ring)` site** (`ColorInput.vue:338`). The instant the cut
   lands, that focus ring resolves to nothing. A one-line W-2 packet ask + a fallback-first
   pre-migration (`t-glassui-forward §5`). Cheap, but silent if missed.

---

## §1 The packet series — SHAPE (numbered; NOT dispatched)

Each packet: the T finding(s) it carries · the disposition class (**NEW** / **RE-ASK** /
**VERIFY-AT-CUT**) · the **owner routing** (producer-root / joint / demo-only) · the evidence cite
(producer file:line or sibling lane) · the **timing window** (W-1..W-4, §2) · the **gestalt cure
direction** (never a patch). Packets are grouped into series by producer surface; the demo-only
findings are recorded in §3 (explicitly NOT packets).

### Series A — AURORA + BOOT (the highest-leverage cluster; T-1 / T-25 / T-26 / T-27)

> This series is one dispatch's worth of work but three distinct producer surfaces. All ride the
> **W-3** window (behaviour, no export change) and want to land EARLY (they unblock value.js's own
> T load-sync + boot-quality waves). They are the single largest UN-BOOKED forward gap.

- **T-PKT-A1 — GAP-ARM: the aurora cold-load arm-replay** · **NEW** · **producer-root** (+ a demo
  hydration-ordering half value.js owns). Evidence: `useAurora.ts:262` snapshots `getCfg()` at
  mount; the config deep-watch is wired only inside `armRuntime()` post-idle-arm (`:228`) with **no
  immediate replay** — every config hydration landing in the construct→arm gap is dropped, so a
  green seed cold-boots a hot-pink field FOREVER until the first in-session change
  (`w6-producer-gap-rows §GAP-ARM`; addendum **A7**; re-confirmed at HEAD by `t-glassui-current
  G-CUR-2` + `t-aurora-boot-active F-1`). **User-visible on prod (color.babb.dev).** Root-routing:
  the fix is one honest producer line (`inst.update(getCfg())` after `inst.arm()`, or `immediate:
  true` on the `:228` watch) — a demo retrigger is a synthetic atoms mutation = contrivance, E-3
  rejects it. Cure (gestalt): the arm boundary must REPLAY the live config at the moment it goes
  live, not paint a stale mount snapshot; a mount that arms deferred owes a post-arm reconciliation
  so the first painted frame is ALWAYS the hydrated field. This is the producer root of T-1.

- **T-PKT-A2 — the AuroraAtoms variance door (L2) sized to the T-26 bracket (A3)** · **NEW** ·
  **producer-root** (+ demo calibration inside the bracket). Evidence: `resolveAtoms` threads only
  `{harmony, stopCount, temperatureShift}` to `deriveAurora` (`atoms.ts:285-294`); `hueSpread` is
  hardcoded 28, there is **no cross-stop chroma-variance atom**, no `lightnessScheme`/`lBand` atom
  exposed at the DOOR, and the bell `chromaEasing` DESATURATES the ramp extremes (`color.ts:271-283`)
  — the "too muted" reading. The levers EXIST unused inside `deriveAurora` (`color.ts:133 hueSpread`,
  `:168 scheme`, `:174 lBand`) — the door does not expose them (`t-glassui-current G-CUR-3`; L2 +
  amplification **A3**). Root-routing: producer owns the atoms; the ranges must be SIZED so the field
  reads STRONG presence with visibly greater C/H variance while staying subtle — **the T-26 bracket
  (more than analogous/0.7, less than triad/0.82) becomes the SIZING SPEC for the atom's range**.
  Naming authority stays the producer's (NOT bare `scheme` — the door already speaks "scheme" for the
  hue axis; `lightnessScheme`/`lBand` suggested, L2). Note the divergence to reconcile in the letter:
  `t-glassui-forward` reports the LIGHTNESS derive path acted-on internally by `W-AUR-IMAGE-SOURCE`,
  but the CONSUMER atoms door (the `resolveAtoms` threading + the hueSpread/chroma-variance atoms)
  is still closed — the ask is the DOOR, not the internal lever.

- **T-PKT-A3 — the aurora pointer door: base VERIFY + richer field-warp APPEND** · **VERIFY-AT-CUT
  + NEW(append)** · **producer-root** (+ demo pointer choreography). Evidence: the BASE door shipped
  and was consumed at W6-7 — `atoms.ts:90 AuroraInteractivityAtom` ships `light` (cursor-as-light) +
  `scroll`; `useCursorInteraction.ts`/`cursorModel.ts` present (`t-glassui-current §2.1`; FINAL "L19
  never fired"). So the base pointer input is a VERIFY-AT-CUT row, NOT a re-ask. The **richer
  field-warp** door (velocity/burst attraction/local bloom — `uCursorBurst`/`uCursorVelocity`,
  `t-aurora-boot-active §2.2`) remains open as a NEW append (L19/A4). Root-routing: producer owns the
  input door; the choreography is demo. **One pointer grammar must span backdrop + hero blob** on
  value.js's side, so shape-compatibility with the goo-blob SDF pointer input (the L5 co-rebuild,
  `useBlobPointer.hitTest`, landed) is a design constraint on this append — cite it explicitly.

- **T-PKT-A4 — the boot / transition QUALITY triple (T-27 "gray / slow / jittery")** · **NEW** ·
  **joint** (producer contributes; value.js color-math owns the interpolation). Evidence: T-27 names
  three defects on BOTH the boot animation and the per-pick transition. GRAY = the transition path
  crosses low-chroma (sRGB mud) AND the aurora ramp's bell-desaturated extremes compound it
  (`t-aurora-boot-active F-2/F-4`, producer-contributory via A2's `chromaEasing`). JITTERY = the rAF
  coalesce/paint chain, of which GAP-ARM's first-frame flip is one contributor. Root-routing: **fold
  A1 (arm-replay) + A2 (variance/chroma-floor) + an optional producer palette-ease atom (so the
  field doesn't STEP between picks, `t-aurora-boot-active §222`) into ONE "boot + transition quality"
  packet.** Cure (gestalt): the field's arrival must be chroma-TRUE (value.js rides a chroma-preserving
  interpolation path), PACED (a producer palette-ease + the demo's own clock discipline), and
  HYDRATED on the first frame (A1). This is where T-1/T-25/T-27 converge — the most under-booked
  owner pain.

### Series B — MOTION / TRANSITIONS (T-14; the "liquid glass easing curves" edict)

> The liquid tokens THEMSELVES ship (T-14 is a demo-adoption lane, §3). The producer-root defects
> are the dist EMISSION clobbering them and two gaps in the spring family. All W-3.

- **T-PKT-B1 — the dist theme-emission clobber (PKT-1)** · **NEW** · **joint (producer-root)** ·
  **[P0 — the single biggest "not liquid" contributor].** Evidence: the dist `components.css`
  `:root` emission re-declares Tailwind's `--default-transition-duration: 150ms` /
  `--default-transition-timing-function` INSIDE `layer(components)`, out-cascading every consumer's
  `@theme` motion alias — so every bare `transition-*` utility runs a hard 150ms flat bezier, not
  the house `--duration-fast`/`--ease-standard` (`t-transitions-liquid F1`; evidence
  `dist/styles/index.css:1` + `dist/styles/components.css:1`). Root-routing: the producer must alias
  its own `--default-transition-*` onto the house tokens it already owns at the producer root (one
  `@theme` line), or carve the two keys from the compiled `:root` emission. A demo `@layer
  components`-or-later re-declare is a cascade arms-race = a workaround (E-3 forbids). Cure (gestalt):
  the producer's compiled theme output must never clobber the tokens it invites consumers to
  override — the emission owns the alias, at the root.

- **T-PKT-B2 — the spring-family clock hole (PKT-2)** · **NEW** · **producer-root** (+ demo
  curve/clock pairing). Evidence: the spring family has a settle-time hole between `press` (0.16s)
  and `snappy` (0.4s); the pane-swap SPATIAL register wants a ~0.28-0.32s-settle preset and today
  rides a squeezed generic clock (`t-transitions-liquid F2`, PKT-2). Root-routing: producer owns the
  preset (a `regen-spring-tokens.mjs` row cut at its OWN clock), OR the producer blesses `snappy@0.4s`
  for view swaps and value.js retires the consumer clock-squeeze. Cure (gestalt): a spring must ride
  its OWN clock; the family should have no register that can only be reached by squeezing a
  neighbour's clock.

- **T-PKT-B3 — the compositor collapse/expand recipe (PKT-3)** · **NEW** · **joint** (producer
  primitive + demo family definition). Evidence: no generic compositor collapse/expand recipe exists
  in glass-ui — the goo-morph dwell trio is per-consumer by `tokenPrefix`; the demo hand-rolls
  `max-height`/`grid-template-columns` layout morphs (the P5-non-compositor anti-pattern,
  `t-transitions-liquid F4`, PKT-3). Root-routing: producer owns a blessed collapse primitive
  (scale-with-counter-scale, or `calc-size()`/`interpolate-size` guidance); the families key to it.
  Cure (gestalt): a compositor-only collapse channel at the root, so no consumer animates layout on a
  timeline.

- **T-PKT-B4 — skeleton shimmer seams (PKT-4 = L9, persists)** · **RE-ASK** · **producer-root.**
  Evidence: `--skeleton-shimmer-delay`/`-duration`/`-tint` are still unread by the producer shimmer
  (`grep` over `glass-ui/src/` = 0 hits; custom properties inherit into `::after`, the current host
  `animationDelay` is structurally dead — L9, `t-glassui-current §2 L9`, `t-transitions-liquid`
  PKT-4). Root-routing: producer — the pseudo-element seam. Cure: the shimmer `::after` reads the
  shimmer-delay/duration/tint custom properties (they inherit into pseudo-elements); add
  `--skeleton-shimmer-tint`. **This is the same item as L9 in Series G — cite once, cross-ref.**

### Series C — THE GLASS LADDER: the recessed rung + the mis-rung (T-3 / T-11 / T-12 / T-13 / T-18 / T-24 material half)

> The elevation ladder is SOUND and complete UPWARD (5 rungs); "too transparent / inconsistent
> neutrals" is chiefly a DEMO deployment discipline (§3). But two structural HOLES in the ladder
> are producer-root and no BG wave mints them.

- **T-PKT-C1 — mint the recessed WELL rung (P-1)** · **NEW** · **producer-root** (+ demo 6-site
  consume). Evidence: the ladder has 5 elevation rungs UP (`--glass-opacity-{wash/quiet/resting/
  floating/overlay}`) but **no recessed rung DOWN** — the demo minted the well material 6 times by
  hand (`t-card-material §5 P-1`; `t-glassui-forward F-5`). Root-routing: producer — the ladder is
  missing a rung. Cure (gestalt): mint `--glass-bg-well` (an opaque tone-STEP DOWN, no
  backdrop-filter, scheme-registered like every other rung) + a `.glass-well` composable carrying the
  dashed-edge affordance on top. **Timing: if the token name is new-and-final it can ride W-3 as a
  pure add; if it retires/renames any existing token it binds W-2.**

- **T-PKT-C2 — re-rung the `.input-bar` / mint the seated field-chrome rung (P-2 = T-12 ASK-D)** ·
  **NEW** · **joint** (producer missing rung + demo seat decision). Evidence: `.input-bar`
  (`utilities/components.css:205-212`) hard-binds the FLOATING (popover-weight) rung, so the search
  pill imports DIALOG material into a card interior (measured 0.80/0.88 vs host 0.36/0.43); glass-ui's
  `SearchBar` defaults `surface="glass"` (correct for docks/overlays, wrong for pane bodies) and the
  `searchVariants.ts` CVA offers `inline`/`bare`/`glass` but **no seated rung** — the search area is
  seated in pane BODIES at 5 sites with no register decision (`t-search-tabs §1 + ASK-D`; T-12).
  Root-routing: producer owns the missing rung; demo owns the seat. Cure (gestalt): a `seated`
  (or `paper`) rung joins the search field-chrome CVA — opaque `--card`/`--background` fill + the
  drawn ink edge + `shadow-cartoon-sm`, NO backdrop blur, winning by LAYER ORDER (the `bare` rung's
  proven mechanism; NO `!important`, no recipe fork). **C1 and C2 are the same LADDER concern — the
  recessed/card-interior register — and should be ONE ladder packet with two rungs, not two
  fragments (E-3 consolidation).** Companion: the producer bakes `--font-mono` into every search
  field (`components.css:235`) — value.js's voice law reserves Fira for readouts; a
  `--search-font`/`--input-bar-font` seam is a small joint sub-ask on the same surface.

### Series D — TABS PILLING (T-20; producer-root per the mandate's own tag)

- **T-PKT-D1 — the SegmentedTabs indicator double-counts the track trim (ASK-A)** · **NEW** ·
  **producer-root** ("pure producer CSS, every pill-variant host inherits it"). Evidence: the
  anchor-path indicator applies the `--bouncy-track-trim` inset TWICE — pill height measures 24.2 in
  a 39px track (content 31) instead of the designed ~31, leaving ~8px of raw track above/below;
  reproduced identically both schemes, every breakpoint × orientation, on the anchor AND the JS
  fallback path (`t-search-tabs §4`, ASK-A). The hosts: `MixSourceSelector`, `PaneSegmentedControl`,
  `GradientEasingEditor.vue:193`, `AdminNamesPanel.vue:14`, + glass-ui's own consumers.
  Root-routing: producer — the indicator geometry. Cure (gestalt): the anchor arm's block insets
  become bare `anchor(top)`/`anchor(bottom)` (and `anchor(left)`/`anchor(right)` on the vertical
  variant); the trim is the ONE sanctioned gap and must be expressed in `var(--bouncy-track-trim)`
  terms, never a literal (restoring the file's own lock). Acceptance: indicator box ≡ active-button
  box at every breakpoint × orientation × scheme × engine. NOTE the mandate flags T-20 as a
  producer-root candidate and this lane CONFIRMS it — no `layout:"full"` demo-consume alternative
  cures the double-count (contra `t-glassui-current`'s "primitive exists" read; the equal-fill
  `layout` is orthogonal to the block-axis inset bug).

### Series E — SLIDER + DOCK RAIL (T-5; the sliders-area hierarchy)

- **T-PKT-E1 — the surface-keyed ink contract (F-6)** · route as **demo-only, WITH a producer
  surface-contract note** · **joint.** Evidence: the sliders' self-camouflage ink pipeline
  (`t-sliders-hierarchy F-1/F-6`) — the cure is the library's OWN WCAG leaves resolving certified
  ink variants against each surface's effective lightness (the `--seal-ink` precedent already landed,
  `view-accents.ts:184-199`). Root-routing: value.js owns the ink contract (it uses `src/units/color/
  contrast.ts` — value.js's own library); the producer's stake is only that every text-bearing glass
  surface EXPOSE its effective-lightness so the consumer can derive ink. Cure: NOT a packet by itself
  — recorded as a demo lane with a thin producer surface-contract dependency (the WELL/seated rungs
  of Series C must publish their effective lightness).

- **T-PKT-E2 — the vertical dock-RING for the letter column (F-3)** · **NEW** · **joint
  (producer-rooted).** Evidence: the letter column wants a stadium-shaped hairline enclosure in
  `--accent-view` — but the dock ring language is producer-owned across three voices (the collapsed
  seal rim, the W7-1 morph carrier, the `stack-rail.css` contained hairline `--dock-rail-hairline`);
  a demo-side bespoke enclosure would RE-FORK the dock language the fission/stack-rail waves own
  (`t-sliders-hierarchy F-3`, E-3 binds). Root-routing: joint — the demo consumes/feeds
  (accent-view, WatercolorDot seat), but if a NEW producer rail VARIANT is needed for a
  non-navigational (index-of-letters) enclosure, that variant is the packet. Cure (gestalt): before
  minting anything, VERIFY whether `stack-rail`'s contained-hairline rest-state already composes for
  a vertical letter index; if it does, this is a demo consume (no packet); if the letter index needs
  a distinct rail role, ask ONE producer rail variant — do not hand-roll a fourth ring dialect.
  **Cross-ref L13** (dock hover-morph token) + **L8** clampLabel below.

### Series F — BLOB L5 RESIDUALS (T-8 second half; APPEND to F9.R1, not a re-ask)

> The blob is the BEST-covered owner finding: F9.R1 (satellite-shade `uSatColor[]`,
> bodyLightness/lightnessFloor, DONE `5df908ae`) + F9.R8 (SDF hit-test, affect presets, PASS
> `e0320565`) landed both engines. The T-8 clip/z/into-the-card/all-sizes half is **DEMO**
> composition (`HeroBlob`, §3). The producer residuals below are an ADDENDUM to F9.R1's still-open
> GAP-L5 constraints — NOT a re-ask of the shade work.

- **T-PKT-F1 — the L5 co-rebuild residuals** · **NEW(append) / VERIFY-AT-CUT** · **producer-root**
  (engine) + demo (moment binds, landed). Evidence: `t-blob-hero §4` rows A-E +
  `w6-producer-gap-rows GAP-L5`: **(A)** a hero-scale mood-LEGIBILITY floor; **(B)** the scale-aware
  deformation ceiling appended with a CURVATURE bound (the F-7 "broken horn" at hero scale + chord-dent
  re-cited); **(C)** a `settled` seam + a park-only-from-settled guarantee (F-6: the freeze races the
  settle and can embalm a mid-smear); **(D)** visible satellite emergence/at-rest (satellites are
  invisible at every moment today, F-8); **(E)** the exported HERO preset the demo's ≥96px
  visible-bead gate depends on. Root-routing: producer owns the ENGINE residuals (A-E ride the
  existing GAP-L5 re-verify); value.js owns the placement/z/entrance beats. Also owed: the L5
  single-WebGL2-engine collapse (drain the 529-LoC `metaball.wgsl` WGPU twin, still present at HEAD —
  `t-glassui-current §2 L5`). Cure (gestalt): the T blob packet re-cites the GAP-L5 rows as
  constraints ON F9.R1, verified at the paint deltas (today they verify only shade + pointer, not
  rest-pose / HERO-preset / curvature-bound). **Timing: the HERO preset + the `Blob` rename (L17)
  ride the W-1 cut** (the preset is an export-surface addition; the rename freezes at export-regen).

### Series G — THE UNDELIVERED COMPONENT BATCH (RE-ASK by-name; fold-claimed to W-DESHADCN, NOT delivered)

> The producer's `652f58e8` reply "folded" L6/L8/L9/L11/L13/L14/L16 onto `W-DESHADCN` — but that
> wave (`6dddda04` DONE) landed the tailwind-v4 / no-shadcn 233-file SWEEP, a DIFFERENT scope; the
> specific L-item fixes are verified ABSENT in source (`t-glassui-current §4`). The T packets must
> **re-ask each by-name** — the fold routed them to a wave whose landed scope did not include them.
> Each is a small P1/P2 producer token/recipe ask, all W-3.

- **T-PKT-G1 — L6 slider tokens** · **RE-ASK** · **producer-root.** No `--slider-thumb-border-w`
  token; no spectrum `cursor:grab`/scale-1.06 hover recipe; no `--slider-track-checker` seam (the A6
  companion). `Slider.vue:212-221` (`t-glassui-current §2 L6`). Cure: the token pack + fail-loud
  spectrum-without-bg + Button-primary-over-wash verify (the Mix verb reads permanently disabled).

- **T-PKT-G2 — L8 `clampLabel` on DockSelectTrigger** · **RE-ASK — 5th booking, ESCALATE** ·
  **producer-root** (named-owner+cut, 7+ tranches). `DockSelectTrigger.vue` (42 lines) forwards
  `SelectTriggerProps` + `{class}` only — no `clampLabel` prop, no truncation
  (`t-glassui-current §2 L8`). The Ad-18 workaround must not spread. Cure: the `clampLabel` prop, at
  the root.

- **T-PKT-G3 — L9 skeleton shimmer seams** · **RE-ASK** · **producer-root.** = **T-PKT-B4** (cite
  once; listed in both Series B motion and here for the batch completeness — dispatch as ONE item).

- **T-PKT-G4 — L11 dropdown-menu glass tokens** · **RE-ASK** · **producer-root.** No
  `--dropdown-menu-bg/border/shadow` in `src/styles/`; dropdown-menu lacks Select-parity glass tokens
  (`t-glassui-current §2 L11`). **Touches T-29** (the dropdown/portal surface) — see Series I.

- **T-PKT-G5 — L16 `-webkit-backdrop-filter` policy** · **RE-ASK** · **producer-root.** The prefix
  split is intact: `-webkit-backdrop-filter` in 2 stylesheets, plain in 14 — the one-policy pick was
  never made (`t-glassui-current §2 L16`). Cure: pick one policy across all stylesheets.

- **T-PKT-G6 — L7 EasingPicker v2 + L13 dock residuals + L14 ConfiguratorRow** · **RE-ASK (verify)**
  · **producer-root.** These P1/P2 items need a dedicated per-component re-audit inside the packet
  (L7: `btn-pill`×`glass-btn` co-occurrence, travel-dot rest, curve-glyph preset menu, PRM gate,
  MOTION_CURVES README truth — bears on **T-22** easing area; L13: collapsed-circle residual,
  `dock-scroll-x` loud-overflow, hover-morph off `--duration-panel` onto a hover-grade token; L14:
  `ConfiguratorRow` double-label API + crayon-register Slider variant) (`t-glassui-current §2
  L7/L13/L14`). Cure: re-audit + deliver by-name; do not treat the W-DESHADCN fold as a discharge.

### Series H — THE ADDENDUM RESIDUALS (A1 / A2 / A6; UN-BOOKED build/register fixes)

- **T-PKT-H1 — A1/A2: the field-floor dark arm + the muted-ink alpha rung (F2.R1 paint-close)** ·
  **NEW / SOURCE-LANDED-PAINT-PENDING** · **producer-root.** Evidence: **A1** the BD.W-CARD-FIELD-FLOOR
  orphan fallback (`cards.css:96-115`) paints two amber radials `background-blend-mode:screen` with
  NO dark arm → the dark-arm `brightness()` amplifies it into a hot in-card lamp (hot-zone label
  2.61:1); **A2** the alpha/muted label rung measures 1.42:1 / 1.50:1 both schemes over the glass
  plate — a register FLOOR, not a consumer override. Source-landed (`cards.css:60-71` tokenizes
  `--card-field-floor-blend`) but `BG.W-DARK-READABILITY-REPAIR` dual-engine paint is
  **FAIL→PENDING** and its landed scope covered only the demo census (avatar/badge/captions), NOT
  A1/A2 (`t-glassui-current §2.1`, `t-glassui-forward F-6`). Root-routing: producer — an ink FLOOR at
  the register, not a demo shim (value.js will not shim ink). **This binds T-3/T-11/T-13/T-18/T-24** —
  value.js cannot treat the dark card floor as paint-correct until BG closes the PENDING. Cure:
  extend the F2.R1 register lift to the orphan field-floor dark arm + the muted-ink alpha-rung floor
  (substitution-over-paste, the DL5 pattern).

- **T-PKT-H2 — A6: the dist minify drops the unprefixed `backdrop-filter: none`** · **NEW** ·
  **producer-root** (build pipeline). Evidence: `Slider.vue:421-422` declares BOTH legs of the
  spectrum override; the DIST keeps only `-webkit-backdrop-filter:none` (Chromium ignores the alias),
  so the `.glass-liquid-fill` blur stays LIVE over every spectrum track in Chrome, liquefying consumer
  ramps (`t-glassui-current §2.1 A6`; addendum A6). Root-routing: a cssnano/lightningcss
  vendor-prefix-collapse defect in the dist pipeline. value.js carries a marker-commented byte-level
  restatement of the producer's own source rule, retiring the day the dist keeps the unprefixed leg.
  Cure: fix the prefix-collapse so the unprefixed leg survives.

### Series I — DROPDOWN / SELECT / PORTAL (T-17 primitive · T-29 clip)

- **T-PKT-I1 — T-29 pseudo-dropdown clip: ROUTED DEMO (not a portal packet)** · **VERIFY / demo** ·
  **demo-owned.** Evidence: `t-outline-dropdown-clip §0` identifies `t-2210-56` as the **dock Tools
  toggle** (`Dock.vue:179-204`, DEMO-owned) mid-hover — the layer-swap pseudo-dropdown pill's rounded
  ends cut mid-curve on all four sides by its own container overflow, PLUS the dark slab is the native
  browser `title="Action bar"` tooltip (`Dock.vue:182`). Root-routing: **NOT a producer portal clip**
  (contra the mandate map's "likely a portal clip on a Select" guess and `t-glassui-forward`'s
  conditional NEW-ASK) — Dock.vue is demo. Cure: demo overflow/containment fix + retire the native
  `title` attribute. The producer touch is only L11's dropdown-menu tokens (G4) IF the demo re-homes
  the layer-swap onto a Select/Popover surface. Recorded here as a **NON-packet** so the corpus does
  not open a producer portal ask that has no producer root.

- **T-17 Select colour-preview** · **demo-only, NOT a packet** (§3): the `/search`+Select primitive
  ships (L18 chevron fixed `d03579a1`); the colour-preview is a `SelectItem` swatch composition. See
  §3.

### Series J — THE 5.0.0-CUT PAYLOAD (freeze-gated; W-1 / W-2)

> These do not fix behaviour — they are the export-surface / rename / migration payload that MUST be
> in the packet BEFORE the WS12 export-regen (W-1) and B4e MIGRATION (W-2) freezes run, else each
> becomes a post-5.0.0 second break event (the owner's "one migration event" edict forbids it).

- **T-PKT-J1 — L17/R14 GooBlob → `Blob` rename** · **VERIFY-AT-CUT (owner-ratified)** ·
  **producer-root**, **W-1.** Symbol + subpath (`/goo-blob → /blob`) + types + CSS seams; NO alias;
  value.js consumes by-name at the adopt. Booked `BH.B2.1-swap [WS12]` + the B4e MIGRATION row
  (`t-glassui-forward §4`). The packet's job: confirm it is IN the export-regen input before WS12.

- **T-PKT-J2 — L20 `/blob/config` subpath (the JS-eager RP-2 blocker)** · **NEW** · **producer-root**,
  **W-1.** No `./goo-blob/config` (or `/blob/config`) subpath exists — importing the config atoms
  pulls the whole WebGL engine into the eager graph (66 KiB over the ≤280 KiB gate; RP-2 stands at
  347.9 KiB). Ask a config-only subpath exporting the atoms/keys/defaults with ZERO engine imports
  (`t-glassui-current §2 L20`; A5). Root-routing: producer — an export-map addition. Cure: a
  config-only entry so consumers wire config eagerly and load the engine lazily. **Must be named
  before B2.1-swap freezes the export set.**

- **T-PKT-J3 — L12 `/styles/fonts` = the 18th specifier** · **VERIFY** · **producer-root**, **W-2.**
  Claimed folded to the B4e MIGRATION table but unverified in a canonical 5.0.0 table body
  (`t-glassui-current §2 L12`). The packet confirms the MIGRATION row exists before B4e's freeze.

- **T-PKT-J4 — the `--ring → --focus-ring-color` roster add** · **NEW** · **joint**, **W-2.**
  value.js is an UN-ROSTERED consumer: the BH B7 roster counted atlas + speedtest and missed
  value.js's single `box-shadow: 0 0 0 2px var(--ring)` site (`ColorInput.vue:338`, no fallback).
  The instant the un-aliased rename lands, that focus ring resolves to nothing (`t-glassui-forward
  §5`). Root-routing: joint — (a) glass-ui adds value.js to the B7 `--ring` roster + MIGRATION row;
  (b) value.js pre-migrates its one site fallback-first (`var(--ring)` → `var(--focus-ring-color,
  var(--ring))`) BEFORE the cut so `^4→^5` is a no-op. Cure: the roster add is the ask; the
  pre-migration is value.js's own T lane.

---

## §2 The timing-window binding (which packet rides which freeze gate)

From `t-glassui-forward §1`. WS12 has NOT landed → W-1 and W-2 are STILL OPEN, but they are the LAST
window (the cut folds them all at once). Behaviour packets (W-3) have the widest window and the most
value landing early (they unblock value.js's own T waves via the `file:` pin).

| Window | Freezes | Packets bound |
|--------|---------|---------------|
| **W-1** WS12 export-regen | the published subpath/export SET | **J1** (Blob rename), **J2** (`/blob/config`), **F1** HERO preset (export addition) |
| **W-2** B4e MIGRATION | the rename/token-retire ROWS | **J3** (`/styles/fonts`), **J4** (`--ring` roster), **any C1/C2 rung that RENAMES a token** |
| **W-3** F-family behaviour waves | src-level behaviour (visible LIVE via file:-pin) | **A1-A4** aurora, **B1-B4** motion, **C1/C2** (as pure adds), **D1** tabs, **E2** rail, **F1** engine residuals, **G1-G6** batch, **H1/H2** addendum residuals |
| **W-4** the joint 5.0.0 tag | everything (the npm `^4→^5` event) | the VERIFY-AT-CUT walk — value.js re-verifies EVERY folded ask on the built `dist` (the T equivalent of S.W8) |

---

## §3 The DEMO-ONLY register (recorded as NOT packets — so the corpus cites the existing primitive)

These T findings have their producer primitive ALREADY. Routing them into producer packets is a
redundant ask; the corpus routes them to the T DEMO waves with a citation to the existing surface.

| T # | Finding | The existing producer primitive (cite, do not re-ask) | Owner |
|-----|---------|-------------------------------------------------------|-------|
| **T-14** | card transitions onto liquid curves | `--spring-snappy/-smooth/-bouncy` (+`-duration`) + `--ease-cartoon-punch` SHIP (`transitions.css`); the demo binds its transition families to them | demo (after B1 unclobbers the emission) |
| **T-28** | WatercolorDot outline too fine / abrogate | the `ghost` variant `.watercolor-ghost-stroke` (`WatercolorDot.vue:208-213, 283-289`) traces the SAME seeded organic radius under the SAME wet filter — the correct organic edge | demo (re-home the active outline onto the ghost recipe, or ABROGATE at the seal — Dock.vue is demo) |
| **T-17** | dropdowns with colour previews | the Select primitive + L18 chevron fix; the colour-preview is a `SelectItem` swatch composition | demo |
| **T-23** | header shaded AT REST | the `veil-surface` register (`cards.css:445-468`: `--veil-bg`/`--veil-blur`/`--veil-feather`) + the shipped `ScrollCardHeader` the demo forked (`t-header-shading F1/F3`) | demo (consume the shipped primitive; the feather is the anti-band guarantee) |
| **T-10** | menu voice: only Palettes rainbow | owner overrule of W7-4's landed legend; the producer's `glass`-surface menu already provides the neutral row (`t-nav-dropdowns F1-F3`) | demo (owner overrule, not a bug) |
| **T-13a/T-19** | shadow palette missing | the `specimen` register ("the ghost OF a palette", minted S.W5-1, zero consumers) — the artifact the owner wants restored (`t-shadow-palette F-3`) | demo (owner overrule of the S.W5-6 amputation; re-consume `specimen`) |
| **T-5 (ink)** | slider legibility | value.js's OWN WCAG leaves (`src/units/color/contrast.ts`, the `--seal-ink` precedent) | demo/src (value.js library) |
| **T-8 (clip/z/place)** | blob into-card, higher-z, all-sizes | pure `HeroBlob` composition CSS over the exported HERO preset | demo |
| **T-3/T-11/T-18/T-24** | too-transparent / neutral-inconsistency | the tier/tint/depth ladder is RICH (`--glass-bg-${tier}`, `--glass-tint-*`, `cartoon-surface`); apply ONE tier ladder | demo (with H1 as the producer FLOOR dependency) |
| **T-16 / T-21 / T-4** | corner element / bugged surface / dynamic bottom text | demo-surface identifications — no producer primitive implicated (per their lanes) | demo |

---

## §4 The verify-at-cut ledger (COVERED — the T corpus RECORDS, does not re-book)

Booked + landed (or paint-pending) in BG/BH; cited as verify-at-cut rows, walked at value.js's
5.0.0 adopt, exactly as the S-letter discipline demands (`t-glassui-forward §4`,
`t-glassui-current §5`).

- **L1** WebKit aurora shader (3 GLSL defects) — FIXED `d03579a1` + `proof:aurora-glsl-webkit` gate.
- **L3** WatercolorDot zombie rAF → `useRAFLoop` — FIXED `b01d0556`, present in the consumed dist.
- **L18** Select chevron dead-code — FIXED `d03579a1` (repairs the dock view-select + every Select).
- **F9.R1** blob satellite-shade (`uSatColor[]`, bodyLightness/lightnessFloor) — DONE `5df908ae`,
  dual-engine PASS. **F9.R8** blob affect/pointer/SDF hit-test — PASS `e0320565`.
- **L19 (base)** aurora `light`/`scroll` pointer door — SHIPPED, consumed W6-7 (the richer warp door
  is the A3 append).
- **A4/W-AUR-IMAGE-SOURCE** the lightness derive path — acted-on internally (but the CONSUMER atoms
  door is A2's open ask — reconcile in the letter).
- **PRM-expand** — the kf `springPlay` PRM-snap arm emits subscribers-only, never `_onFrame`; the
  one-line cure unlanded (`FINAL §5`; keyframes, not glass-ui — route to the KF courtesy letter, not
  the glass-ui packet).

---

## §5 The DISPATCH PROTOCOL (binding on the corpus that authors the letters — NOT executed here)

1. **NO dispatch in DEVELOPMENT.** This census draws the SHAPE; the T corpus authors the letters at
   ratification (E-6, ratification-gated). The S letter's discipline is the template: asks only,
   every item cites `file:line` in the producer tree, a hard-gate map for the packets on a T
   consuming wave's critical path, a verify-at-cut list for the rest.
2. **The HEAD-stamp corollary (S-letter §16).** The producer moves ~10-min cadence on `tranche/BG`;
   the dispatching agent RE-STAMPS the verified glass-ui HEAD at dispatch and re-verifies every
   `file:line` in Series A-J against the CURRENT tree (the aurora tree already moved once,
   `glass-aurora/shaders/` → `aurora/constants/shaders/`). This census's cites are stamped at
   `19ddbd71`.
3. **The DIST-rebuild discipline (G-CUR-1, `t-glassui-current §1`).** The consumed dist is a
   gitignored LOCAL build, ~1 day stale of tip, with NO content-addressed fence (`"version":
   "4.2.0"` is frozen by the §3.4 file:-pin, does NOT track the tranche/BG content). Any T consuming
   wave that depends on a landed producer fix MUST rebuild glass-ui first (`cd ../glass-ui && npm run
   build`); at the 5.0.0 cut the adopt-event pins a REBUILT dist against a stamped HEAD — never trust
   the version label as a content signal.
4. **Delivery ≠ disposition (`t-glassui-current §4`).** The producer `652f58e8` reply dispositioned
   all 18 asks, but the L6/L8/L9/L11/L13/L14/L16 "fold onto W-DESHADCN" did NOT deliver the fixes
   (that wave was the 233-file tailwind sweep). Series G re-asks by-name; the corpus must not read a
   disposition as a discharge without a source-verified landing.
5. **Consolidate, do not fragment (E-3).** C1+C2 are ONE ladder packet (two rungs). B4 = G3 = the L9
   skeleton seams (cite once). A1+A2+the palette-ease fold into ONE boot-quality packet (A4). The
   letter series should read as a HANDFUL of gestalt packets, not 30 line-item asks — the S letter's
   18-item shape is the ceiling, not the floor.
6. **Route non-glass-ui producers elsewhere.** PRM-expand is a KEYFRAMES defect (the KF courtesy
   letter, not the glass-ui packet); the `--ring` pre-migration is value.js's own T lane. The
   glass-ui packet carries only glass-ui-rooted asks.

---

*Method note*: every packet above routes a finding forensiced by a sibling T lane (cited inline) or
an S-close open ask (L#/A#/GAP-#), re-checked against the producer tree at `19ddbd71` where a
`file:line` is load-bearing. This lane draws the request-packet SHAPE + the routing (producer-root /
joint / demo-only) + the timing windows; it does not re-forensic the sibling findings nor author the
dispatched letters (E-6, ratification STOP).
