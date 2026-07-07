# T lane · t-mobile-audit — the responsive re-probe (390×844 · 768×1024 · 1024×1366 portrait)

**Lane class**: DESIGN (Fable, frontend-design bar — judged by eye in the browser, light + dark,
computed styles cited). **Rows**: the WHOLE T corpus re-probed at the three mobile bands, with
the mandate's named emphases — T-8 ("all screen sizes"), T-5, T-20, T-12, and the T-2/T-7 golden
bump vs the one-line locks at 390. **Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close).
**Method**: own dev server (`VITE_API_URL=http://localhost:59999 npx vite --port 9481
--strictPort`; the owner's :9000 untouched); owned headless Playwright contexts (the MCP browser
is lane-contended — the fleet's standing learning), `isMobile + hasTouch`, dpr 3/2/2, BOTH
schemes; cold-boot AND warm hash-nav runs (the difference itself became finding F-2). Probe
scripts + 40 PNG frames in the session scratchpad (`t-mobile/probe{,2,3}.mjs`,
`{dark,light}-<band>-<route>.png`) — session-ephemeral; **every load-bearing number is inlined
below**. ZERO product-code changes.

**The three bands** (the app's own grammar, measured):

| Band | Layout grammar | Pane wrapper | Key tokens (computed) |
|---|---|---|---|
| 390×844 | mobile slot (`max-w-md`), single pane + dock toggle | 358px | `--content-max-h` 741 · display-1 = heading = **25.89** (floor-pinned) · display-3 43.7 |
| 768×1024 | mobile slot (`sm:max-w-lg`), single pane + dock toggle | 512px | cmh 921 · display-1 31.49 · display-3 55.04 |
| 1024×1366 portrait | **mobile slot** (aspect law, App.vue:232-233) but **width-only `lg:` CSS fires desktop** | 512px | cmh 1263 · display-1 35.58 · display-3 62.72 |

---

## §1 Findings

### F-1 · P0 — THE ASPECT-LAW WITNESS SPLIT: at 1024×1366 portrait the second pane of every dual view is UNREACHABLE and the dock loses its chrome

**Evidence** (measured, both schemes): at 1024×1366 the mobile slot is the mounted one
(`isDesktop = (min-width: 1024px) and (min-aspect-ratio: 1.1)`, App.vue:232-233 → false at
aspect 0.75), but the dock's mobile pane toggle is wrapped `class="lg:hidden"`
(Dock.vue:213) — a **width-only** witness → computed parent `display: none`
(probe2: `toggleParentClass "lg:hidden"`, click times out). Consequences, all reproduced live:
`#/mix` warm-nav shows ONLY the picker with no way to reach the Mix pane
(`dark-tab-1024p-mix.png` ≙ both schemes); `#/palettes` warm-nav shows the picker, `.input-bar`
absent from DOM; a COLD boot at `#/palettes` seeds index 1 (useViewManager.ts:55-60) and then
the PICKER is the unreachable one. On non-home routes the dock itself collapses to the lone
view seal — a bare circle floating at the top (`dark-tab-1024p-mix.png`,
`light-tab-1024p-mix.png`) — while on `#/` it dresses DESKTOP furniture (Home ⌄ · Login ·
@mbabb, no ⋮, no toggle; `dark-tab-1024p-home.png`): the dock's mobile pieces are v-if-gated
on the aspect-law composable while its desktop pieces are CSS width-gated — at 1024-portrait
NEITHER set fully renders.
**Root-cause**: the R.W3 A4 aspect law was published as a *composable* (App.vue) and a
*CSS media arm* (style.css:347, 435-439) but never as ONE witness; every `lg:` display utility
on layout furniture is a silent fork of it. style.css:428-439 already names this exact
pathology for `.pane-slot-mobile` ("the `lg:hidden` display witness on the mobile slot is
width-only… App.vue's mount condition is width AND landscape") and patched THAT one rule —
the dock toggle, the dock's desktop sections, and the blob arm (F-3) were left on the wrong
witness.
**Owner**: demo. **Cure direction (gestalt)**: ONE stamped witness — App (the sole owner of
`isDesktop`) stamps the root element (e.g. `data-layout="desktop|mobile"`), and every layout
fork — dock toggle, dock desktop sections, mobile slot, blob arm — keys on the stamp
(unlayered `[data-layout]` rules or a custom-media alias), never on raw `lg:`/1024px width.
The style.css:435 exception rule then DIES (it exists only to out-cascade the wrong witness —
E-3). Acceptance: at 1024×1366 both panes of every dual view reachable; the dock renders the
full mobile chrome set; at 1024×640 landscape the dual grid + desktop dock unchanged.

### F-2 · P1 — `mobilePaneIndex` leaks across hash navigation: deep links, back/forward, and any URL-driven nav land on the WRONG pane

**Evidence** (reproduced live at 390): warm-nav sequence `#/` → (toggle to About) → `#/palettes`
→ `#/mix` → `#/gradient` renders the **Palettes pane** on the gradient view
(`dark-phone-390-gradient.png`: toggle "Gradient | Palettes" with Palettes selected —
VIEW_MAP.gradient = `{ left: "gradient", right: "palettes" }`, viewSchema.ts:152-153, default
index 0 = Gradient); a cold boot at `#/gradient` correctly shows Gradient
(`dark-phone-390-gradient-cold.png`). **Root-cause**: `switchView` (useViewManager.ts:64-71) is
the ONLY writer that re-derives the index on view change; `currentView` is route-computed
(:43-46), so any navigation that doesn't pass through the dock's own `switchView` — hash edit,
back/forward, shared link, in-content `router.push` — carries the PREVIOUS view's index into
the new view. The X8 cold-boot seed (:49-60) fixed exactly half of this class and its comment
names the other half. This is invisible on desktop (both panes render); it is a first-class
mobile navigation defect — and it silently corrupted this fleet's own first probe run.
**Owner**: demo. **Cure direction**: the visible-pane choice derives FROM the route — one
`computed` keyed on `currentView` (per-view default from VIEW_MAP; the "content-first" views
palettes/mix name their default IN the schema, not in a string-list at the call site), with any
user toggle stored per-view and reset on view change. One source of truth, same law B.W2 gave
the pane registry; the `ref<0|1>` + scattered writers die.

### F-3 · T-8 — the blob at the three bands: three compositions today, and the 1024-portrait band gets the WORST one (corner-break with no partner pane)

**Evidence** (measured, `.hero-blob-anchor` / canvas / card rects):

| Band | Arm (`--blob-fp`) | Bead vs card | Canvas overflow |
|---|---|---|---|
| 390 | 8rem hand arm (ColorPicker.vue:363-365) | bead ⌀≈67px; **26% of the bead above the card top over raw aurora**; center (282, 232) vs card top 216 | top 86.4px above card; right edge 5.6px short of viewport ✓ (the designed 390 guard) |
| 768 | 8rem hand arm | same straddle, now islanded: card 512 centered in 768 — the bead floats against the open field band (`dark-tab-768-home.png`) | 86.4 above card · 10.4 past card right |
| 1024p | **lg corner-break arm fires on width-only media** (ColorPicker.vue:368-376) — fp 176 | bead center ON the corner-radius origin of a MOBILE-slot card; anchor extends 72px past card right | **124.8px above card top + 124.8px past card right — over raw field on BOTH edges** |

The lg arm was ratified for the DUAL grid (its overlap strip lands on the right pane, caught by
`.pane-wrapper--left { z-index: 1 }`, style.css:424-426); on the portrait band there IS no
right pane — the "wet on the plate" composition becomes a sticker on the ocean, chord-dent tail
reading speech-bubble (`dark-tab-1024p-home.png`, both schemes). `elementFromPoint` at the
bead's 12-o'clock arc resolves `app-layout` (raw field) at ALL three bands — nothing the bead
overlaps is a designed partner anywhere on the mobile side.
**Root-cause**: the same witness split as F-1 (`@media (min-width: 1024px)` at
ColorPicker.vue:368 vs the aspect-law mount), COMPOUNDING the t-blob-hero F-1/F-9 finding that
per-viewport special geometry exists only to manage overflow.
**Owner**: demo. **Cure direction**: co-signs t-blob-hero §2 THE SEAT — under containment
(bead wholly inside the card's top-right region, one `cqi` formula) all three bands collapse to
ONE composition by construction and this lane's witness question dissolves for the blob
entirely; the SEAT spec should still name F-1's stamped witness for any residual fork it keeps
(it should keep none — E-3). The 390 acceptance row: bead + satellite arc inside the 358px
card, zero paint over raw aurora, at rest and at every mood.

### F-4 · T-2/T-7 — the golden bump at the mobile bands: the locks survive, but only if the reservation re-scope LANDS FIRST, and the "×1.5" law needs per-band honesty

**Evidence** (computed tokens + in-page Fraunces advance measurement):

1. **The mid-band overshoot**: display-1→display-3 (the T-2 two-token move) measures ×1.688 at
   390, ×1.748 at 768, ×1.763 at 1024p vs ×1.618 at the 1440 rail — the clamp slopes
   (1.2rem+1.6vw vs 2rem+3vw) are not φ-locked, only the rails are. The T wave doc must state
   the law as "two ladder steps (×φ at the rails)" and eye-judge 768 explicitly — a spec that
   promises ×1.5–1.618 everywhere will fail measurement on the fluid band.
2. **Pane title (T-2)**: the About sentence ALREADY inks 2 lines at 390 TODAY (measured
   `.pane-header-title` 324×66.1, 2 lines at 25.888px/700 with the inline "Lab" member;
   `dark-phone-390-about2.png`) — and display-1 = heading = 25.89 at 390 (floor-pinned), so the
   T-2 move is a deliberate NO-OP there: the corpus gate text must read "About = a stable
   2-line lock at <sm, 1-line at ≥sm" (verified: 1 line at 768/1024p, sentence 334.3/376px in
   464 available at the NEW rung). Never "one line everywhere". The F2 weight bug (700
   host-inherit) reproduces at every band (measured 700 at 390/768).
3. **Readout (T-7) at ×φ**: at 390 the proposed rung floors at 41.89px (2.618rem) — the cqi
   term (11.65cqi of 358 = 41.7) sits UNDER the floor, so capacity = 327.4px ÷ 27.0px("0"
   advance) ≈ **12.1ch**, ~2% tighter than the 12.36ch cqi-constant band. Consequence table
   (per t-title-typography F6): kelvin/hex/linear-class hold ONE line at 390; **rgb/hsl/hsv/
   hwb/lch/xyz (16.5ch) are 2-line at 390 unless lever 1 (per-space integer least-counts →
   ~10.5-11ch) lands — lever 1 is REQUIRED at the phone band, not an optional refinement**;
   lab (18.5ch) is an honest 2-line lock at 390 (lever 3); ictcp/jzazbz (12.5ch > 12.1) tip
   to 2 lines at 390 even with lever 2's ~1% shave — spec them 2-line at <sm.
4. **The sequencing constraint**: TODAY's per-cell worst-case reservation, scaled ×φ, breaks
   the 390 one-line lock arithmetically — cells (83.4+100.1+100.1)×1.618 + 24px gaps ≈ 483px
   > 327.4 available. The t-title-typography F4 re-scope (intrinsic contiguous cells,
   line-count lock only) is a **precondition** of the size move at the phone band, not a
   sibling nicety — the wave doc must order them.
5. **Vertical budget — CLEAR at all three bands**: headroom (cmh − card) = 251/408/677px vs
   the bump's worst case ≈ +85px (title +18, readout +18, +47 for a second line at 390) — the
   typography lane's 900px-desktop scroll risk (its row 6) does NOT extend to mobile.

**Owner**: demo. **Cure direction**: fold rows 1–5 into the T-2/T-7 wave item as its mobile
acceptance matrix; no separate mechanism.

### F-5 · T-5 — the sliders console at touch: the desktop contrast verdict carries, and the phone adds a TOUCH-GRAMMAR deficit the ring/card design must absorb

**Evidence** (measured at 390, dark): the T-5 legibility/hierarchy findings reproduce verbatim
(same recipes at every band — letters 20.352px channel-inked italic on the live-tinted card,
`opacity-50` annotations; rail computes no enclosure at any width). Mobile-specific, new:
(i) the slider control band is **24px tall** (track 293.4×24, thumb 12×24) — exactly the WCAG
2.5.8 minimum and ~half the 44px HIG rung, on the app's PRIMARY instrument, with rows 45.8px
apart; (ii) the rail letters are **26×24.4px tap targets** for channel selection; (iii) the
rail tooltips declare `side="left"` (ComponentSliders.vue:34) with only **31.3px** between the
rail and the viewport edge at 390 — the declared side cannot fit (reka collision-flips it), so
the designed anatomy popover has no honest seat at phone.
**Root-cause**: the S-era console was composed at desktop pointer scale; the touch-gate work
(scroll-vs-slide) solved interference, not target size.
**Owner**: demo (+ one producer packet rider). **Cure direction**: the t-sliders-hierarchy
console (ring + sub-card) carries an explicit **touch rung**: ≥44px effective hit areas on rail
items and slider rows at <lg (padding/hit-area expansion inside the ring — the glyphs do NOT
grow; the `touch-hit-area` idiom already on `.slider-thumb` is the precedent, extended to the
row), and the letter anatomy popover re-registers at touch (below the console or into the
touch-gate's own affordance — never a left-side popover the band can't seat). The producer
letter-rail packet (t-sliders F-6) gains one row: the vertical rail primitive must publish a
touch-size rung, same as the dock's own compact rung (PaneSegmentedControl.vue:46-52 precedent).

### F-6 · T-20 — the segmented-pill double-trim reproduces at EVERY mobile width; the fix's acceptance matrix must include both trim rungs

**Evidence** (measured, dark = light): dock pane toggle at 390 (the S.W7-2 compact rung,
trim 3px): track 32.3 / buttons 26.3–27.8 / indicator **21.8** — the pill floats ~2.25px inside
its button on both block edges (the 0.1875rem anchor addend, double-counted); at 768 (4px
trim): 39 / 31–32.9 / **24.9** (the 0.25rem arm); Mix "Colors | Palettes" source selector:
390 → 33.5/28.5/**22.5**; 768 → 39/32.1/**24.2**. All four sites carry
`segmented-indicator--anchor` — the anchor path is live at every band, so t-search-tabs ASK-A's
bare-`anchor()` cure covers mobile by construction.
**Owner**: producer (co-sign ASK-A). **Cure direction**: append to ASK-A's acceptance: indicator
≡ active-button box at BOTH trim rungs (3px compact <640, 4px ≥640) × both orientations ×
dpr 2/3 — measured here so the adopt-wave re-judge has its mobile numbers.

### F-7 · T-12 — the search bar: the 24rem cap bites at 768 exactly as at desktop; 390 masks it

**Evidence** (measured): 390 — bar 324 = column content width (the cap is slack; `max-width`
computes 384 > 324) → the misfit is INVISIBLE at phone; 768 — bar 384 vs sibling well/grid 462
→ the same **78px right-rag** the desktop probe found, now inside a centered 512px card
(`dark-tab-768-palettes.png`). Material/voice findings reproduce at every band (Fira Code
placeholder, floating-glass slab on the paper column; dark bar darker than its plate).
**Owner**: joint (co-sign t-search-tabs ASK-B/C/D). **Cure direction**: no mobile-specific
mechanism — the seated rung + cap removal close all bands; add 768 to the ASK-D re-judge frames.

### F-8 · T-3/T-11/T-13/T-18/T-24 — the wash tier DISSOLVES on the mobile single-card composition: the "too transparent" rulings are one class worse at phone

**Evidence** (measured + screenshots, both schemes): wash-tier pane cards compute fill alpha
**0.43 dark / 0.356 light** with `blur(1px)` (extract card, `oklab(0.412…/0.4296)` /
`oklab(0.804…/0.356)`); on mobile the single centered card sits directly on the aurora's bright
diagonal and its lower half reads as NO CARD: "No saved palettes yet." + empty-plate ghosts
float on raw pink (`dark-phone-390-palettes.png`), the Mix button + COLOR SPACE/HUE METHOD
dropdowns render through the dissolve (`dark-phone-390-mix.png`), the extract dropzone's
dashed well is the only readable boundary (`dark-phone-390-extract.png`). The picker's
resting tier (0.74/0.68) holds its edge at every band — the delta between the two tiers is the
whole failure.
**Root-cause**: the wash recipe was judged on the desktop dual grid (cards over the field's
mid-tones); the mobile composition centers the card on the brightest band and removes the
second card that gave the tier a comparative edge.
**Owner**: demo (tier consume; the T-24 ledger) / joint if the wash floor moves in the
producer tier. **Cure direction**: the T-24 neutral/alpha ledger must carry a **mobile
acceptance frame**: every tier judged at 390 over the aurora's brightest band, both schemes;
the owner's "more cartoon, less transparent" floor is set at the MOBILE reading (the stricter
one), so the desktop cure cannot re-fail at phone. Interactive controls (buttons, selects)
must never sit on a sub-threshold ground — the card-material lane's opacity floor is the
mechanism; this lane supplies the frame.

### F-9 · T-17/T-29 — dropdowns at phone: the space listbox FITS (no clip), but the gradient pane's three-across triggers TRUNCATE their own labels

**Evidence**: the space-selector popover at 390 measures 302×384 at x 31.3 — 56.7px clear of
the right edge, internal `overflow-y: auto`, NOT clipped ✓ (`dark-phone-390-space-dd.png`) —
T-29's edge-clip does not reproduce on this surface at mobile (the t-2210-56 chip belongs to
the docs/Tools surface; its lane owns it). Proportion datum for T-17: rows 77–79px tall,
~24px color dot vs ~44px display-voice name — at a 4.7-row aperture the "deft proportion"
question is sharpest at phone. NEW defect: the Gradient pane's Interpolation row (TYPE ·
SPACE · HUE, three triggers across a 324px content width) **clips its closed-state labels** —
"Linear→Lineaı", "OKLCH→OKLC", "Shorter→Shorte" (`dark-phone-390-easing-open.png`, cold-boot
`dark-phone-390-gradient-cold.png`).
**Owner**: demo (the gradient row's layout; T-17's preview work is its own lane).
**Cure direction**: the T-17 dropdown redesign carries a phone rule: a closed trigger never
ellipsizes/clips its own value — the three-across row re-flows (2+1 or stacked label-over
rows) at <sm; fold into the same wave item as the color-preview work so the row is composed
once.

### F-10 · T-23 — the header band at rest is unshaded at every band

**Evidence** (computed at 390, About pane): `.pane-header` at rest = `background rgba(0,0,0,0)`
· `backdrop-filter: none` · `box-shadow: none` — width- and scheme-invariant (the W5-2
scroll-gate). On mobile the sticky header rides a SHORTER scroll container, so the unshaded
rest state and the abrupt scroll-in are more frequently exercised (every pane except the
picker scrolls at 390 — the gradient pane's CSS block is cut by the card edge mid-line,
`dark-phone-390-easing-open.png`).
**Owner**: co-sign t-header-shading; this lane adds the 390 frames to its acceptance set.

### F-11 · inventory notes (one-liners, evidence on file)

- **T-9 banner**: with `VITE_API_URL` SET to a dead port the banner correctly does NOT render
  (misconfigured fires only on UNSET + loopback + cross-origin, availability.ts law) — the
  offline chip carries the state; the T-9 replacement affordance must be judged at 390 in the
  dev:web-only rig (not reproducible in this lane's honest rig — booked to the api-state lane).
- **T-16**: the Regenerate control is in-flow inside the Generate pane at every band (measured
  `position: relative`, 390: 169×40 at (33, 516)); nothing floats bottom-left at any probed
  width (`elementsFromPoint(24, h−24)` = app-layout) — the owner's shot is a desktop
  composition datum; no mobile arm.
- **T-21**: the "bugged-out" black/cyan triangular smear on the netting plate REPRODUCES at 390
  cold-boot (`dark-phone-390-gradient-cold.png` — the same wedge as owner t-2009-29) —
  width-invariant, co-sign the gradient-surfaces lane; the preview strip itself spans the full
  column at 390/768 (462px at 768 = sibling width ✓).
- **T-6 netting**: at 390/768 the hatch band occupies a small top-right sliver of the plate —
  the intensity recalibration must be eye-judged at the mobile plate size too (a visibility
  bump tuned at 1440 can still vanish at 358px plates).
- **T-1/T-25/T-26/T-27**: viewport-invariant quality rows (load sync, boot/aurora quality,
  variance bracket, transition quality) — no separate mobile mechanism; note GAP-ARM's
  stale-pink field dominates EVERY mobile frame in a backendless rig (the field is ~78% of the
  1024-portrait canvas — the marooned-card composition makes the field's quality MORE
  load-bearing on mobile, a sizing datum for T-26's bracket).
- **T-28 outline**: the WatercolorDot ring reproduces unchanged at 390 (dock seal + spectrum
  thumb frames on file); geometry is width-invariant — the fit/abrogate ruling is
  band-independent.
- **T-10/T-14/T-15/T-19/T-22**: reproduce with unchanged mechanics at mobile (menu rainbow,
  card transitions, PaletteCard font, shadow-palette surface, easing mess — the last now
  reachable-verified only via cold boot, see F-2); their own lanes rule; the consequence table
  below carries their band verdicts.

---

## §2 The responsive consequence table (the T corpus × the three bands)

| Row | 390 | 768 | 1024-portrait | Verdict |
|---|---|---|---|---|
| T-1/T-25/T-27 load+boot quality | reproduces | reproduces | field ~78% of canvas — MOST exposed | invariant, weight ↑ on mobile |
| T-2 titles ×φ | pane title NO-OP (floor-pinned); About = honest 2-line lock; "Lab" ×1.69 | ×1.75 mid-band overshoot; 1-line holds | ×1.76; 1-line holds | F-4 rows 1-2 |
| T-3/T-11/T-13/T-18/T-24 card material | wash dissolves (α .43/.36 on bright band) | same | same + marooned composition | AMPLIFIED — F-8 mobile frame |
| T-4 plate caption | reproduces (same recipe) | reproduces | reproduces | invariant; T-5 lane owns |
| T-5 sliders console | + touch deficit: 24px rows, 26px letters, tooltip side unseatable | same class | same | F-5 touch rung |
| T-6 netting | hatch = corner sliver of a 358px plate | sliver | sliver | eye-judge at mobile plate |
| T-7 readout ×φ | floor band: 12.1ch; lever 1 REQUIRED; lab/ictcp/jzazbz 2-line; reservation re-scope is a PRECONDITION | 12.3ch | 12.3ch | F-4 rows 3-4 |
| T-8 blob | 26% bead over raw aurora | islanded straddle | corner-break with NO partner pane — worst | F-3; SEAT closes all |
| T-9 banner | not renderable in honest rig | — | — | book to api-state lane |
| T-10 menu voice | reproduces | reproduces | reproduces | invariant |
| T-12 search | cap masked (324<384) | cap bites: 78px right-rag | pane unreachable (F-1) | F-7 |
| T-14 transitions | reproduces | reproduces | reproduces | invariant |
| T-15 PaletteCard font | reproduces | reproduces | unreachable warm-nav (F-1/F-2) | invariant |
| T-16 corner element | absent (in-flow) | absent | absent | desktop-only datum |
| T-17 dropdowns | rows 77-79px, dots 1:2 vs names; gradient triggers CLIP labels | clip class at 768 too (triggers wider) | reproduces | F-9 |
| T-19 shadow palette | surface reproduces | reproduces | reproduces | invariant |
| T-20 tabs pilling | 3px rung double-trim (21.8 in 32.3) | 4px rung (24.9 in 39) | toggle HIDDEN (F-1) | F-6 acceptance matrix |
| T-21 gradient bugged | triangle smear reproduces at 390 | reproduces | unreachable warm-nav | co-sign gradient lane |
| T-22 easing area | reachable only via cold boot (F-2); ghosted by F-8 dissolve | same | unreachable (F-1) | easing lane + F-2/F-8 |
| T-23 header at rest | unshaded (computed) — scroll more frequent | same | same | F-10 co-sign |
| T-26 variance bracket | invariant | invariant | field dominance ↑ | sizing datum noted |
| T-28 dot outline | reproduces unchanged | same | same | band-independent |
| T-29 pseudo-dropdown clip | space listbox NOT clipped (56.7px clear) | not clipped | not clipped | surface is elsewhere (its lane) |
| — NEW (this lane) | F-2 stale pane index | F-2 | **F-1 unreachable panes + seal-only dock** | P0/P1 corpus rows |

## §3 Cross-lane feeds

- **t-blob-hero**: F-3 confirms §2 THE SEAT from the mobile side; adds the 1024-portrait
  witness datum + the 390 acceptance row.
- **t-title-typography**: F-4 is the mobile acceptance matrix its §3 table lacked (rows 1–5:
  mid-band overshoot, 2-line About law at <sm, floor-band capacity 12.1ch, lever-1-required,
  reservation-re-scope-first, vertical budget CLEAR).
- **t-sliders-hierarchy**: F-5 adds the touch rung to the console design + one row to the
  producer letter-rail packet.
- **t-search-tabs**: F-6/F-7 supply the mobile numbers for ASK-A's acceptance and ASK-C/D's
  re-judge frames.
- **t-card-material / t-card-color-census (T-24)**: F-8's mobile acceptance frame — every tier
  judged at 390 over the brightest band, both schemes; the opacity floor is set at the mobile
  reading.
- **t-nav-dropdowns**: F-9's gradient-trigger clip + the phone no-clip rule.
- **t-header-shading**: F-10's 390 frames join its acceptance set.
- **The T corpus itself**: F-1 and F-2 are NEW rows (P0/P1) — the portrait band and
  route-driven pane derivation; both are preconditions for every "all screen sizes" acceptance
  the corpus writes, and F-1's stamped-witness cure is the E-3 gestalt that also carries F-3's
  media split. The colocation edict (E-1) should note useViewManager's pane-index concern as
  part of its restructure surface.
