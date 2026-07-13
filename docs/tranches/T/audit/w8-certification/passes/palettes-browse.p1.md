# T.W8 · critique pass — PALETTES / BROWSE + DIALOG + EMPTY/SKELETON · p1 (round 1 of ≤3)

**Filed**: 2026-07-11 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t` @ `b878417` (docs-only commits atop the W6.5 close — the probed
product tree is `5e4f1f6` byte-exact, the same tree the owner's §0.7 evening audit judged).
**Spec of record**: `waves/T.W8.md` §Scope-1 · `SYNTHESIS.md §2` D1/D6/D7/D9 ·
`MANDATE-2026-07-06.md` §0 (T-13 · T-19) + §0.6 (T-41 three sightings · T-43 · T-44) +
**§0.7 (T-56 — MARKED mid-round; this pass files AFTER it and consumes it)** ·
`w65-close-artefacts.md` HG2 (Lane S `0ad772f`, O-9 5/5) + §2 (T-41/T-43/T-44 rows) ·
`w45-checkpoint/ROWS.md` (no palette-surface rows; the EXPECTED-RED set noted) ·
the T-41 SURVIVE clause (MANDATE §0.6 — error ≠ empty · "never announce work that isn't
happening" · O-9 re-aimed, never deleted).
**Anchors re-derived via `w1-move-map.md`** (C5/C6 barrels): `palette-browser/card/
{ShadowPalette,PaletteCardSkeleton,PaletteCardGrid,PaletteCard/PaletteCard}.vue` ·
`@components/common/EmptyState.vue` (the C6 F7 lift-out) · `panes/{PalettesPane,BrowsePane}.vue`
· `mix/MixSourceSelector.vue` · `@composables/color/palettes-ramp.ts` + `.palettes-ramp-text`
(utils.css:180) · `dock/DockViewSelect.vue:110-115` · dialog surfaces (the CC-6 `PaletteDialog`
orphan is DEAD at W0-3 — the live dialog/detail = expanded `PaletteCard` + `PaletteCardMenu` +
`ConfirmDialog` + the portal trio).

---

## §1 Method (the O-3 probe class — live drive, real engine, dpr 2)

- **Serve**: the live tree on **VJS_E2E_PORT=8630** (`VITE_API_URL=http://localhost:8630
  npx vite --port 8630` — the same-origin seam; PERF_PORT=8631 reserved unused; **the owner's
  :9000 untouched**).
- **Cells**: 1440×900 · 768×1024 · 390×844 × light+dark = **6 cells**, deviceScaleFactor 2,
  `colorScheme` emulation.
- **Data states DRIVEN, never assumed** (the o9/browse-palettes fixture idioms, REST-path-scoped
  routes): **true-empty** (route-fulfilled `{data:[]}` + virgin storage) · **populated wall**
  (8-row fixture + `hasMore`) · **developing** (6s-delayed route — the mid-fetch skeleton pinned
  on screen) · **error** (unpinned same-origin `/palettes` resolves SPA HTML → deterministic load
  failure) · **seeded local store** (2 palettes via `color-palettes` initScript) · Mix→Palettes
  pill · Extract instrument face · the dock view dropdown.
- **Probes**: element census (trio/ghosts/dashes/fillers) + computed styles + **composited
  pixel-sampled contrast** (screenshot-clip ground sampling — the alpha-blind computed read is
  recorded only as the approximation it is) + animation probes (element + `::after`).
- **Frames**: `docs/tranches/T/audit/pi/w8/palettes/` (39 PNGs, gitignored-by-class on-disk):
  `{1440,768,390}-{light,dark}-{mypalettes-empty,browse-empty,browse-wall}.png` (the 6-cell
  matrix ×3 walls) · `1440-{light,dark}-{browse-developing,browse-error,mix-empty,
  mypalettes-populated,card-expanded,card-menu,deleteall-dialog,ramp-dropdown,ramp-title-zoom}.png`
  · `390-light-mix-empty.png` · `1440-light-{extract-face,trio-zoom}.png`.
  Instruments + log committed: `pi/w8/w8-palettes-probe{,-leg5,-leg7}.mjs` +
  `w8-palettes-probe-log.txt`.

## §2 Console attest

**ZERO console errors in every cell and every driven state** — including the seeded/dialog
interactions and the error leg (the browse failure is a caught load error surfaced in-UI; it
never leaks to the console on this same-origin seam). No sanctioned-exception needed.

## §3 COHERENCE VERDICT

**COHERENT WITH THE DOCTRINE, WITH FILED ROWS.** The landed W6.5 Lane-S state (`0ad772f`)
answers the owner's T-41 rejection live at every cell: TRUE EMPTY speaks the watercolor trio +
dashes ALONE, zero ShadowPalette fillers anywhere, the species redesigned onto the genesis
register at its ONE Extract seat, error ≠ empty intact, the loading species distinct and
honestly announced. The walls, dialog, and detail read as one plate system (Q4 card=well live).
**Except**: the §5 ledger files **one A-class mechanism defect (the Q5 ramp's certified-contrast
walk is scheme-blind — 1.83:1 dark, both sanctioned sites), one A-class population ink row (the
empty-plate captions never thread the certified rungs), two small rows, and carries the
§0.7-named T-56 bracket with reproducible pole-A states**. Nothing here certifies taste.

## §4 The attested table (owner line → live witness → read)

| Owner line | Live witness (probed, not assumed) | Read |
|---|---|---|
| **T-41** t33-audit-07 "shadow palettes … do not shimmer as a proper skeleton — should not be displayed herein" | Browse true-empty: `[data-slot="shadow-palette"]` **0** visible at ALL 6 cells; the EmptyState invitation alone | COHERENT (as-filler DEAD at the Browse wall) |
| **T-41** t33-audit-08 "just display the no palettes — bring back our three-palette watercolor-swatch iconset with the dashes" | Commons true-empty: trio **1** · ghosts **3** · dashed strokes **3** (2px `dashed` border tracing the seeded organic silhouette + wet `feDisplacementMap` — the producer D4 recipe; frame `1440-light-trio-zoom.png`) · `aria-hidden=true` · "· the commons ·" + "No published palettes here yet." — never preceded by ghost cards | COHERENT (the iconset with the dashes IS back, on `--accent-live`) |
| **T-41** t33-audit-12 "superfluous shadow palettes everywhere" | Mix→Palettes: trio present, fillers **0** (1440 L/D + 390 L); My Palettes: same at all 6 cells; populated walls: fillers **0**, trio **0** | COHERENT (zero fillers at every host class, populated AND empty) |
| **T-41 SURVIVE clause** (error ≠ empty · never announce absent work) | Browse error: `role=alert` + "The commons is unreachable." + Fira detail + real Retry; trio **0**, ghost **0**; **sibling My Palettes keeps its trio** (the exemption is scoped, not a global amputation); true-empty trio is `aria-hidden`, NO role=status on any ghost | COHERENT (R7 stack intact; no over-deletion) |
| **T-44** (species redesign — genesis register) | Extract instrument face: ONE ghost, `bg-well` + `--card-edge` hairline card-true material, `.shadow-seg` pulse staggered `0s·0.12s·0.24s·0.36s·0.48s`, `aria-hidden`, no role | COHERENT (the redesigned species seats ONLY here; the living register earns its seat as the instrument face) |
| **Loading ≠ empty** (D9 motion axis, the R12 re-cut) | Browse developing (delayed route): 4 `PaletteCardSkeleton` w/ `role=status` + "Loading palette" (work IS happening — announced); producer shimmer LIVE (`::after skeleton-shimmer-slide 1.5s ×infinite`); trio NEVER flashes mid-load (0); skeleton→wall hands off through the vj-morph swap → 8 cards | COHERENT (the owner's "do not shimmer properly" class is dead at the LOADING host — the skeleton shimmers; the per-cell stagger seam stays the standing PKT-4 producer book, not re-filed) |
| **T-13/T-19** "too transparent" (the shadow-palette surfaces) | PaletteCard = `bg-well` **opaque** (oklab L .913 light / .345 dark, NO alpha), `border-card-edge`, `backdrop-filter: none`, `rounded-card` 16px — both schemes, all cells | COHERENT (Q4 "PaletteCard = well" live; the glassy card class is dead) |
| **T-43 / Q5** "'Palettes' should be rainbow" — the guarded ×2-site letterform | DOM-wide `.palettes-ramp-text` census = **2** (My Palettes title + dock dropdown entry); stops **byte-identical** across both sites; `background-clip:text` + transparent color; Browse/every-other title `background-image: none` (ink — negative control) | COHERENT on the ×2-site law (`5833474` stands) — **but the guard's contract fails in dark: row P4-R1**; the REGISTER is the owner's §0.7 T-56 bracket (P4-B1) |
| **Dialog/detail** (the live dialog surfaces) | Expanded card: strip → meta → WatercolorDot swatches, coherent both schemes; card menu = chrome glass (`blur(13px)`, 12px radius) w/ Publish · Rename · Export · Delete; delete-all `ConfirmDialog` = chrome modal, destructive verb held; zero errors | COHERENT (D1: floating menus/modals wear chrome; the plate stays well) |
| **O-9 re-aim** (the oracle is re-aimed, never deleted) | `o9-shadow-palette.spec.ts` live referents = the redesigned species + true-empty trio + error carve-out — exactly the landed state this pass re-judged; W6.5 HG2 5/5 GREEN | CONFIRMED (the census discipline survives, re-pointed) |

## §5 THE ROW LEDGER (typed; anchors; zero adjective-only poles)

### P4-R1 · **LAND** — the Q5 ramp's certified-contrast walk is SCHEME-BLIND: dark-scheme "Palettes" letterforms ink 1.83:1 at BOTH sanctioned sites
- **Defect (A-class mechanism, not taste)**: the resolver's contract — "walks on to the WCAG
  1.4.3 TEXT floor (≥4.5:1): these are LETTERFORMS" (`palettes-ramp.ts` header) — is provably
  unmet in dark. The stops compute **L≈0.384–0.387 in BOTH schemes** (light `oklch(0.3837
  0.1732 329.8)…` / dark `oklch(0.3837 0.1386 329.8)…` — only C moves); composited stem-pixel
  contrast: **light title 5.47:1 ✓ · dark title 1.83:1 ✗** (below even the 3:1 graphics
  floor). The dark dropdown entry is the same stops on dark menu glass — near-invisible beside
  its cream-ink siblings (frames `1440-dark-mypalettes-empty.png`,
  `1440-dark-ramp-title-zoom.png`, `1440-dark-ramp-dropdown.png`). The owner SAW this state:
  §0.7 T-56's shot-08 note — "the ramp reads dark/muddy on the dark card".
- **Root-cause hypothesis (for the lane to verify, not assumed)**: the walk's surface referent
  is not the scheme-true tier the letterforms sit on (D6: "the referent is a property of the
  surface the text sits on") — either a light-pinned referent or the page-ambient lightness,
  which the standing GAP-L2 light-band defect inflates in dark (the dark aurora is still
  light). The W6.5 Lane-I precedent is exact: `certifyAccentInk` moved to
  `resolveSurfaceLightness` "surface referent, not page ambient" — the ramp resolver never got
  that cure.
- **Anchors**: `demo/@/composables/color/palettes-ramp.ts` (the WCAG walk + its referent) ·
  the `boot/useViewAccents` writer (the `--palettes-ramp-0/1/2` root-token watch — scheme must
  join its deps) · `demo/@/styles/utils.css:180` (`.palettes-ramp-text`) · the two consume
  sites (`PalettesPane.vue:11` · `DockViewSelect.vue:113`).
- **Failure scenario**: any dark-scheme session, both ramp sites → the ONE owner-sanctioned
  rainbow surface is the least legible text in the app (1.83:1).
- **Constraints (binding)**: Q5's ruled form stands (ONE resolver, exactly two consume sites,
  guarded — never two mints; a per-surface/per-scheme CERTIFIED OUTPUT from the one resolver is
  in-bounds, a second mint is not). O-14's "one mint, two consumers" referent re-aims in the
  SAME commit (the O-13-slim precedent). The REGISTER target inside the honest guard (pastel
  lift) is the owner's T-56 bracket — the lane lands the honest walk; the owner rules the
  register (P4-B1). **Oracle blind spot flagged for the triumvirate record (NOT minted here)**:
  no slate leg measures the ramp's composited contrast — O-14 is byte-identity, O-18 never
  covers the ramp sites.

### P4-R2 · **LAND** — the empty-plate captions never thread the certified ink rungs (D6 guard-then-alpha + raw quiet rung; population)
- **Defect (A-class, population — the T-35 "delineate all" class)**: `EmptyState.vue` speaks
  raw `text-muted-foreground` (eyebrow :52, hint :58) and `text-foreground/85` (the display
  line :55 — the guard-then-alpha class D6 retires by name). Composited pixel-sampled on the
  My Palettes plate: **light eyebrow/hint 3.84:1** (< the 4.5:1 small-text floor; 11px caps and
  mono-small are never large-text); dark eyebrow/hint 3.49:1, dark display line 3.11:1 (raw fg
  — the /85 alpha composites it lower still). The certified rungs EXIST and are consumed by the
  console (`ink.ts` `resolveMutedInk`/`certifyAccentInk` → `walkToFloor`, W6.5-landed) —
  EmptyState, shipped as the ONE shared empty atom (8 consumers incl. the admin walls), never
  threads them.
- **Honest caveat**: the dark numbers ride the composited ground the standing GAP-L2 light-band
  defect (routed P1, ROWS.md R4) partially shapes; the **light-scheme 3.84:1 stands on its own
  ground** regardless.
- **Anchors**: `demo/@/components/common/EmptyState.vue:52,55,58` ·
  `demo/@/composables/color/ink.ts` (the rung supply, read-only) · consumers inherit the cure
  free (PaletteCardGrid, MixSourceSelector, BrowsePane error twin, admin panels).
- **Failure scenario**: every true-empty and error plate, both schemes → caption/hint text
  below the WCAG floor on the app's most-instructional surfaces.
- **Oracle blind spot flagged (NOT minted)**: the O-18 census never enumerated the EmptyState
  caption population — the exact named-site-not-population class §1.1 indicts.

### P4-R3 · **LAND** (small · a11y) — the populated pane heading's accessible name concatenates the count Badge: "My Palettes2"
- **Defect**: `PalettesPane.vue:11-12` seats the `<Badge>{{ count }}</Badge>` inside the
  `PaneHeader` default slot → inside the `<h3>`; the populated heading's accessible name and
  textContent become **"My Palettes2"** (no separator — AT announces a glued numeral; probed
  live, seeded store, both schemes). It also silently breaks the o9-style `exact:true` pane
  idiom for populated states (the oracle only pins empty states, so it stayed green — recorded,
  not a gate breach).
- **Cure shape (lane's call)**: the badge leaves the heading element, or rides `aria-hidden`
  with an sr-only "(2 saved)" — the visual composition is untouched either way.
- **Anchors**: `demo/@/components/custom/panes/PalettesPane.vue:11-12` ·
  `panes/PaneHeader.vue:21` (the `<h3><slot/></h3>` seat).

### P4-R4 · **LAND** (small · constraint-edge) — the view-dropdown's CURRENT entry inks `font-semibold` (600)
- **Read (typed honestly)**: the option-voice census is clean — all 7 options weight **400**
  (the W6-4 non-bold constraint holds for the voice) — but the CURRENT view's entry adds
  `font-semibold` as its selection marker (`DockViewSelect.vue:112`), so on `/#/palettes` the
  "Palettes" entry computes **600**: a bold dropdown option in the owner's field of view
  (t33-audit-06 "Dropdown options should not be bold" — the constraint class, not its original
  shot). The menu carries no other selection device (no check indicator probed).
- **Cure shape (lane's call, may route to the T-40 book)**: selection speaks a non-weight
  device (the reka indicator slot / an ink shift / the existing icon), or a 500 step if weight
  must stay — the owner's non-bold word wins on ties.
- **Anchor**: `demo/@/components/custom/dock/DockViewSelect.vue:112`.

### P4-B1 · **BRACKET** — the T-56 ramp REGISTER (the §0.7-named axis; poles now reproducible)
- **The owner's line (verbatim, §0.7)**: "'Palettes' should be a pleasing pastel rainbow." +
  "Same here." (t49-audit-08 title · t49-audit-09 dock trigger). §0.7 types it: **taste
  calibration of the landed Q5 ramp — never a re-litigation**; per-scheme, pastel on BOTH card
  grounds.
- **Pole A (LANDED)**: the ruled analogous fan at the current walk — stops
  `oklch(0.384 0.17 330°/10°/50°)` @ head `5e4f1f6`; reads deep maroon→sienna, 5.47:1 light /
  **1.83:1 dark**. Frames: `1440-{light,dark}-mypalettes-empty.png` ·
  `1440-{light,dark}-ramp-dropdown.png` (this pass's re-photograph of the owner's shots 08/09).
- **Pole B (over-sweet)**: a high-L low-C pastel lift past legibility's other edge (the guard's
  ceiling — pastel so light it collapses into the light card ground; the same walk names the
  boundary tuple when the lane lands the honest guard).
- **Target**: pleasing pastel INSIDE the honest per-scheme guard — P4-R1's cure is this
  bracket's PRECONDITION (an unguarded register cannot be judged; in dark the honest walk
  already forces the lift the owner asks for). Package row; owner-judged; Q5 untouched.

## §6 Routing + loop state

- **Zero rows contradict a §12 ruling or a §4 retirement; nothing routes OWNER** (P4-R1
  preserves Q5's one-resolver/two-sites law and the ruled fan FORM; the register ask rides the
  owner's OWN §0.7 T-56 row as P4-B1; O-9's re-aim is attested, never re-litigated).
- **remediation_1 shared-file map** (single-writer keyed on the FILE): P4-R1 anchors
  `palettes-ramp.ts` + `useViewAccents` (boot family) + `DockViewSelect.vue`; P4-R4 anchors
  `DockViewSelect.vue` too → **P4-R1 + P4-R4 ride ONE lane**. `DockViewSelect.vue` is ALSO the
  dock/nav pass's likely anchor — **at the batch cut, intersecting surfaces never ride one
  batch, or the rows re-home to ONE lane** (T.W8.md §Scope-2). P4-R2 anchors the shared
  `EmptyState.vue` atom (8 consumers spanning admin — the admin pass must not co-write it);
  P4-R3 anchors `PalettesPane.vue` (+`PaneHeader.vue` read-only). P4-B1 is a PACKAGE row — no
  remediation lane may consume it; its precondition row is P4-R1.
- **Loop**: this is pass_1. Rows P4-R1..R4 feed remediation_1; pass_2 re-judges the landed
  state; ≤3 rounds then residual routes by class.
- **EXPECTED-RED context untouched**: O-16-R1 / O-5 / O-26 born-RED legs ride with their packet
  cites; the PKT-4 skeleton-stagger seam and GAP-L2 (P1) stay standing producer books —
  re-cited, not re-filed.
- **Oracle blind spots flagged for the triumvirate record (bounds expansion is not a pass's
  call)**: (1) ramp composited-contrast leg (P4-R1); (2) EmptyState caption population in
  O-18 (P4-R2); (3) O-9 asserts the dash element's presence, never its paint — acceptable
  today (the paint is producer-owned), recorded for completeness.

## §7 Probe evidence (values of record)

| Probe | 1440 L | 1440 D | 768 L | 768 D | 390 L | 390 D |
|---|---|---|---|---|---|---|
| console errors (all driven states) | 0 | 0 | 0 | 0 | 0 | 0 |
| My Palettes empty: trio / ghosts / dashes / fillers | 1 / 3 / 3 / 0 | same | same | same | same | same |
| Browse empty (routed): trio / dashes / fillers / alert | 1 / 3 / 0 / 0 | same | same | same | same | same |
| Mix→Palettes empty: trio / dashes / fillers | 1 / 3 / 0 | same | — | — | 1 / 3 / 0 | — |
| Browse wall: cards / fillers / skeletons / load-more | 8 / 0 / 0 / 1 | same | same | same | same | same |
| PaletteCard mat: bg / blur | `bg-well` oklab .913 opaque / none | oklab .345 / none | = L | = D | = L | = D |
| Developing: skeletons / role / shimmer / trio-mid-load | 4 / status "Loading palette" / `::after` slide 1.5s ∞ / 0 | same | — | — | — | — |
| Error: alert / retry / trio / fillers / sibling-trio | 1 / 1 / 0 / 0 / 1 | same | — | — | — | — |
| Extract face: ghosts / pulse stagger / aria | 1 / 0·.12·.24·.36·.48s / hidden | — | — | — | — | — |
| ramp sites (DOM census) / stops byte-identical | 2 / yes | 2 / yes | — | — | — | — |
| ramp stops L (0/1/2) | .3837/.3871/.3865 | **.3837/.3837/.3856** | = L | = D | = L | = D |
| ramp title composited (stem-pixel) | **5.47:1** | **1.83:1** | — | — | — | — |
| eyebrow / hint composited | **3.84:1** | 3.49:1 | — | — | — | — |
| display-line composited (raw fg, α .85 uncounted) | 12.26:1 | **3.11:1** | — | — | — | — |
| dropdown option voice / current-entry | 400 ×7 / **600** | same | — | — | — | — |
| populated heading name / cards / trio | "My Palettes2" / 2 / 0 | same | — | — | — | — |
| card menu / delete-all dialog | chrome blur(13px) · 4 verbs / chrome modal 1 | same | — | — | — | — |

*(— = not probed in that cell; the 6-cell frame matrix covers every cell visually. Contrast
numbers are screenshot-composited pixel samples at dpr2 — the honest ground, not the
alpha-blind computed approximation, which the log records separately.)*
