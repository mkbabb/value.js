# T lane · t-card-color-census — the mechanical card/glass-color census

**Row**: T-24 support (cross-cutting). **This lane does not judge** — `t-card-material.md`
already authored the design verdict (the four-rung ladder: **1 PLATE / 2 WELL / 3 CHROME /
4 STAGE**) and its own curated fixture census. This lane's job is the exhaustive mechanical
sweep: grep `bg-card`/`bg-*`/`backdrop-*`/`glass-*`/inline-`background` across `demo/`, resolve
every hit to a computed value in both schemes (live probe, not token arithmetic), and stamp
each with the rung it SHOULD occupy per the design lane's ladder. Where the sweep found data
the design lane's curated table didn't carry (a correction, a new defect, an orphan), it is
flagged in §2 for that lane and the relevant row-owning lanes to consume.

**Method**: `grep -rn` for `bg-card`/`bg-muted`/`bg-background`/`backdrop-blur`/`backdrop-filter`/
`glass-[a-z-]+`/`tier="`/inline `style="background`/`:style` bindings across `demo/@/components`
+ `demo/@/styles` + `demo/color-picker`, excluding `demo/@/components/ui/` (shadcn vendor, no
hand-authored backgrounds there — its Card is a transparent re-export of glass-ui's, captured
via the producer rows below instead). Every distinct hit resolved live: a lane-local dev boot
(`VITE_API_URL=http://localhost:59999 npx vite --port 9346/9347 --strictPort`, the owner's `:9000`
untouched), Playwright `getComputedStyle` (`backgroundColor`, `backgroundImage`, `backdropFilter`)
on `#/`, `#/palettes`, `#/browse`, `#/mix`, `#/extract`, `#/gradient`, `#/generate`, both scheme
arms (`document.documentElement.classList` toggling `.dark`, the app's actual dark-mode
mechanism per `style.css:462`). `#/admin-*` is auth-gated (redirects to `/` without a session) —
those rows are stamped from source + the `--muted`/`--card` token math instead, marked as such.
**Substrate**: `tranche-t` = master @ `cc4f4fa` (S close). Root vars resolved at probe time:
`--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`, `--muted: light-dark(hsl(38 26% 95%),
hsl(28 12% 11%))`, `--background: light-dark(hsl(40 30% 98%), hsl(24 9% 4%))`; aurora ground
`body` = `rgb(179,114,144)` (scheme-invariant, per `t-card-material.md` §1).

---

## §1 The raw census (every grep hit resolved, file:line, both schemes)

Legend for the **Should-be rung** column: **1P**=Plate, **2W**=Well, **3C**=Chrome,
**4S**=Stage, **n/a**=not a card material (semantic/status color, outside the ladder).

### A. `Card` `tier=` deployments — the host-plate layer

| # | Surface | File:line | Light (measured) | Dark (measured) | Should-be |
|---|---|---|---|---|---|
| A1 | Picker card | `ColorPicker.vue:6` `tier="resting"` | `oklab(0.885 …/0.678)` blur(8px) sat1.4 | `oklab(0.363 …/0.742)` blur(8px) sat1.3 | **1P** (already there — the reference) |
| A2 | About pane | `AboutPane.vue:3` `tier="wash"` | `oklab(0.804 …/0.356)` blur(1px) | `oklab(0.412 …/0.430)` blur(1px) | **1P** |
| A3 | Palettes pane | `PalettesPane.vue:2` `tier="wash"` | same wash family | same wash family | **1P** |
| A4 | Browse pane | `BrowsePane.vue:2` `tier="wash"` | same | same | **1P** |
| A5 | Extract pane | `ExtractPane.vue:4` `tier="wash"` | same | same | **1P** |
| A6 | Gradient pane | `GradientPane.vue:20` `tier="wash"` | same | same | **1P** |
| A7 | Admin pane | `AdminPane.vue:2` `tier="wash"` | same (token math; route auth-gated) | same | **1P** |
| A8 | ConfigSlider pane | `ConfigSliderPane.vue:100` `tier="wash"` | same | same | **1P** |
| A9 | Mix pane | `MixPane.vue:62` `tier="wash"` | same | same | **1P** |
| A10 | Generate pane | `GeneratePane.vue:32` `tier="wash"` | same | same | **1P** |

All 9 non-picker panes resolve to the byte-identical wash pair `oklab(0.804 …/0.356)` L /
`oklab(0.412 …/0.430)` D, blur(1px) — confirmed live on 6 of the 9 routes directly (About,
Palettes, Browse, Extract, Gradient, Mix, Generate — Admin/ConfigSlider stamped by the same
`tier="wash"` mechanism, not independently re-probed since the recipe is a shared component
prop, not a per-site override).

### B. `bg-card*` sites (opaque + fractional)

| # | Surface | File:line | Light | Dark | Should-be |
|---|---|---|---|---|---|
| B1 | `.dashed-well` (Current-Palette editor + Mix Selected) | `utils.css:56-74` (consumed `CurrentPaletteEditor.vue:3`, `MixSourceSelector.vue:117`) | `srgb(0.994 0.96 0.926/0.75)` blur(8px) | `srgb(0.207 0.165 0.133/0.75)` blur(8px) | **2W** |
| B2 | PaletteCard | `PaletteCard.vue:19` `bg-card/75 backdrop-blur-sm shadow-cartoon-sm` | `oklab(…/0.75)` blur(8px)† | dark family, same recipe | **2W** |
| B3 | PaletteCardSkeleton | `PaletteCardSkeleton.vue:26` same recipe | same | same | **2W** |
| B4 | Generated-palette result tile | **NOT a separate mint** — the Generate route's result grid renders `PaletteCard.vue` directly; live probe on `#/generate` (dark) found `oklab(0.2949 …/0.75)` blur(8px), byte-identical class string to B2/B3 | — | — | **2W** (see CC-2, §2 — corrects the design lane's fixture count) |
| B5 | Eyedropper overlay | `ImageEyedropper/ImageEyedropper.vue:4` `bg-card/75 backdrop-blur-sm` | 0.75 family | 0.75 family | **3C** (a true floating overlay, not in-plate — see t-card-material §3 rung-3 note) |
| B6 | Gradient perceived-space plate | `PerceivedSpacePlate.vue:157` `bg-card` (opaque) + `shadow-card` | `rgb(253,245,236)` α=1.0, no blur — **live-confirmed** | `rgb(53,42,34)` α=1.0, no blur — **live-confirmed** | **2W** (a nested full-plate stamp inside a wash ghost today — dies to a well) |
| B7 | Gradient stop chip | `GradientStopEditor.vue:252` `bg-card` (opaque) | α=1.0 | α=1.0 | **2W** |
| B8 | `VersionHistoryDrawer` row | `VersionHistoryDrawer.vue:21` `bg-card` (opaque, plain, `hover:bg-accent/50`) | α=1.0 | α=1.0 | **2W** — a 5th independent opaque-`bg-card` site not in the design lane's fixture table |
| B9 | PaletteControlsBar sticky tab bar | `PaletteDialog/components/PaletteControlsBar.vue:2` `sticky … bg-card` (opaque) | — | — | **ORPHANED — see CC-6.** `PaletteDialog.vue` (the component this lives inside) has zero render-path importers; only its `composables/` are reused by the pane-era code. Not a live surface today. |

† PaletteCard's own `oklab` triple wasn't independently re-probed in light (About/Palettes
routes returned no saved palettes in the lane-local boot's empty localStorage); B4's live
dark-mode probe on the *same class string* stands in as the direct measurement — light is the
mechanically-identical `0.75`-family transform documented for B1/B3.

### C. `bg-muted*` sites

| # | Surface | File:line | Light | Dark | Should-be |
|---|---|---|---|---|---|
| C1 | Markdown `pre`/inline-`code`/table-header/blockquote | `Markdown.vue:227,233,239,262,324` `bg-muted` (opaque) | token: `hsl(38 26% 95%)` → **live-confirmed** `rgb(?, ?, ?)` via `pre` dark probe `rgb(31,28,25)` (matches `hsl(28 12% 11%)`) | `rgb(31,28,25)` — **live-confirmed** | **2W** — already behaves like one; the positive-cite pattern rung 2 generalizes (per `t-card-material.md` §4 T-CM-6) |
| C2 | `ColorNutritionLabel` Alert | `ColorNutritionLabel.vue:5,101` `bg-muted/50 dark:bg-muted/30` | token-derived, ~0.50α | ~0.30α | **2W** |
| C3 | `AdminTagsPanel` tag chip | `AdminTagsPanel.vue:94` `bg-muted/30` | ~0.30α (route auth-gated; token math) | ~0.30α | **2W** |
| C4 | `AdminUsersPanel` expanded row | `AdminUsersPanel.vue:118` `bg-muted/30` | ~0.30α | ~0.30α | **2W** |
| C5 | `SearchFilterBar` clear-filter pill | `SearchFilterBar.vue:99` `bg-muted/50 hover:bg-muted` | ~0.50α → 1.0α hover | same | **2W** (control chrome, not a card — low stakes) |
| C6 | `PaletteCard` count badge | `PaletteCard.vue:103` `bg-muted/60` | ~0.60α | ~0.60α | **2W** |

### D. `bg-background*` sites

| # | Surface | File:line | Light | Dark | Should-be |
|---|---|---|---|---|---|
| D1 | Markdown sticky table header | `Markdown.vue:360` `bg-background` (opaque) | token `hsl(40 30% 98%)` | token `hsl(24 9% 4%)` | **2W** — currently a hue discontinuity nested in a 0.36α wash card (per `t-card-material.md` T-CM-6); moot once rung-1 lands but should still re-tone onto the plate family |
| D2 | `ImageDropZone` format badge | `ImageDropZone.vue:56` `bg-background/85` | ~0.85α | ~0.85α | **2W** |
| D3 | `ColorInput` field | `ColorInput.vue:15` `bg-background` (opaque) | opaque | opaque | **2W** (a form-field, not a plate — acceptable as-is) |
| D4 | `FlagReportDialog` textarea | `FlagReportDialog.vue:28` `bg-background` (opaque) | opaque | opaque | **2W** |

### E. Raw `bg-black`/`bg-white` (foreign neutrals — the STAGE gap)

| # | Surface | File:line | Value | Should-be |
|---|---|---|---|---|
| E1 | Extract image stage host | `ExtractWorkbench.vue:32` `bg-black` | raw `#000`, unnamed | **4S** — mint `--stage` |
| E2 | Extract stage caption veil | `ExtractWorkbench.vue:42` `from-black/50` | raw black/50, unnamed | **4S** |
| E3 | Extract eyedropper-trigger chip | `ExtractWorkbench.vue:46` `bg-white/20 hover:bg-white/40 backdrop-blur-sm` | raw white/20-40, unnamed | **4S** — mint `--on-stage-chrome` |

(E1–E3 not independently re-rendered live in this pass — the drop-zone shows its empty state
without an uploaded image in the lane-local boot; values are read directly from source, which
is unambiguous for a literal `bg-black`/`bg-white/NN` Tailwind utility — no token indirection
to resolve.)

**Exempt by math** (not card materials, correctly outside the ladder): `MiniColorPicker.vue:161-162`
`#000`/`#fff` spectrum-ramp stops (color-math, not surface paint); `PointerDebugOverlay.vue:220`
(dev-only instrumentation chrome).

### F. `glass-*` utility-class deployments (producer convenience shorthands, hand-consumed bare)

| # | Surface | File:line | Light | Dark | Should-be | Note |
|---|---|---|---|---|---|---|
| F1 | `.input-bar` (SearchBar) | glass-ui `utilities/components.css:205-212`; consumed `PalettesPane.vue:12`, `BrowsePane.vue` (via glass-ui `SearchBar`) | `srgb(0.994 0.96 0.926/0.80)` blur(13px) sat1.6 — **live-confirmed on both Browse + Palettes routes** | `srgb(0.207 0.165 0.133/0.88)` blur(13px) sat1.28 — **live-confirmed both routes** | **3C** hard-bound; **2W** wanted in-plate (T-CM-5) | Both literal search fields (Browse "commons", My-Palettes) measured byte-identical — see CC-5 |
| F2 | `.glass-floating` (Mix result plate) | `MixResultDisplay.vue:52` `.mix-plate … glass-floating` | 0.80 family | 0.80 family | **2W** (in-plate fixture, currently floating-weight) | |
| F3 | `.glass-floating` (bulk-action toolbar) | `BulkActionToolbar.vue:6` | — | — | **3C** (a true `sticky` overlay bar — correct rung as deployed) | |
| F4 | `.glass-floating` (swatch edit overlay) | `CurrentPaletteEditor.vue:58` | — | — | **3C** (an overlay-over-content edit affordance — correct) | |
| F5 | `.glass-card` (EasingPicker, glass-ui) | glass-ui `glass/surfaces.css:83-98` (`--glass-blur-quiet` rung); consumed `GradientEasingEditor.vue` (via glass-ui `EasingPicker`) | `oklab(0.9156 …/0.52)` blur(8px) sat1.4 — **live-confirmed** | `oklab(0.4148 …/0.6304)` blur(8px) sat1.35 — **live-confirmed** | **2W** | **New finding (CC-4)** — a QUIET-tier fixture nested inside the Gradient pane's WASH host (0.356/0.430) — the exact fixture-over-host inversion `t-card-material.md` RC-2 describes, feeding T-22 |
| F6 | `.glass-wash` (GradientStopEditor ramp bar) | `GradientStopEditor.vue:171` | **`rgba(0,0,0,0)`** — no fill, blur(1px) only — **live-confirmed both schemes** | same | **1P**-adjacent wash-of-a-wash (should be **2W**, but currently paints NOTHING) | **New finding — a live rendering defect, see CC-1** |
| F7 | `.glass-wash` (GradientCodeEditor code block) | `GradientCodeEditor.vue:93` | **`rgba(0,0,0,0)`** — same defect | same | **2W** (same defect) | See CC-1 |
| F8 | `.glass-wash` / `.btn-glass` toolbar pill | glass-ui `surfaces.css:144-200`; consumed in Gradient toolbar | `color(srgb …/0.38)` blur(1px) | same family | **3C** (control chrome — correct) | Not affected by CC-1 (this one paints; see CC-1 for why) |
| F9 | `control-surface glass-control-edge` (select fills, Mix/Gradient/Generate) | glass-ui `select.css` consumed 3+ sites | `linear-gradient(…/0.50…)` blur(8px) | `linear-gradient(…/0.58)` blur(8px) | **2W**-ish (in-plate control) | `background-image`, not `background-color` — grep for `bg-*` alone misses this family entirely; caught only by the `glass-` sweep |
| F10 | Mix CTA (`glass-deep`-class btn-pill) | consumed `MixPane.vue`/Gradient toolbar | `linear-gradient(oklab(0.9613…/0.4544)…)` blur(14px) | dark family blur(14.05px) sat1.462 | **3C** | |
| F11 | `.glass-dock` | glass-ui `dock.css`; consumed `Dock.vue` | `srgb(0.960 0.854 0.826/0.539)` blur(8px) sat1.2 | `srgb(0.396 0.298 0.261/0.578)` blur(8px) sat1.3 | **3C** | |
| F12 | `.segmented-tabs`/`.segmented-indicator` (view tabs, dock) | glass-ui `segmented-tabs.css`; consumed `PaneSegmentedControl.vue`, Dock | 0.50/0.84 pair | 0.58/0.91 pair | **3C** | |
| F13 | `.popover-content.glass-floating` | glass-ui popover chrome; consumed `SearchFilterBar.vue` filter popover (live-opened + probed) | `oklab(0.9364 …/0.808)` blur(13px) sat1.6 | `oklab(0.3794 …/0.8944)` blur(13px) sat1.28 | **3C** — correct as-is | |

### G. Bespoke inline `color-mix()` recipes (not Tailwind utilities, not `.glass-*`)

| # | Surface | File:line | Recipe | Should-be |
|---|---|---|---|---|
| G1 | `PaneHeader` scroll veil (T-23's surface) | `PaneHeader.vue:71-73` | `color-mix(in srgb, var(--card) 60%, transparent)` + `blur(12px)`, **opacity 0 at rest** → 1 at 120px scroll | **1P** (same species as the plate it caps) — currently a **6th independent parallel recipe**: 60%+blur12, matching neither wash(1P-designate)/well(2W)/dashed-well(75%+blur8)/input-bar(80-88%+blur13) family |
| G2 | `ApiOfflineChip` (offline) | `ApiOfflineChip.vue:53` | `color-mix(in oklab, var(--background) 55%, transparent)` | **n/a** — a status chip, not a card; correctly outside the ladder |
| G3 | `ApiOfflineChip` (misconfigured) | `ApiOfflineChip.vue:71` | `color-mix(in oklab, var(--destructive) 12%, transparent)` | **n/a** — semantic-color chip |
| G4 | `DevMisconfigBanner` (T-9's surface) | `DevMisconfigBanner.vue:55-57` | `background: var(--destructive, oklch(0.58 0.19 25))` (opaque) + `code` inset `color-mix(in oklab, black 22%, transparent)` | **n/a** — a full-bleed status banner, not a card; T-9's verdict (remove/redesign) is orthogonal to the material ladder |

---

## §2 Cross-cutting mechanical findings (surfaced by the sweep, not in the design lane's curated table)

**CC-1 — A live rendering defect: bare `.glass-wash` paints ZERO fill (both schemes).** *(feeds T-6, T-22)*
Evidence: `GradientStopEditor.vue:171` (the ramp/netting bar) and `GradientCodeEditor.vue:93`
(the highlighted-code block) both measure `background-color: rgba(0,0,0,0)` live, in both
schemes — only `backdrop-filter: blur(1px)` applies; visually these surfaces are **unglazed
text over the pane's own wash**, not a wash-tier plate of their own. Direct CSS-variable
diffing against a WORKING wash surface (`Card.vue`'s `tier="wash"` host, which resolves a real
`oklab(…/0.43)` fill) isolates the difference: the working host's `--glass-tint-strength` is a
**literal** (`8%`), while the two broken sites resolve `--glass-tint-strength` through the
producer's **luminance-adaptive `clamp()` expression** (glass-ui `tokens/glass-fx.css:225-257`,
keyed off `--glass-backdrop-luma`, a JS-observer-written registered `@property`). The clamp's
own arithmetic is valid (`clamp(12%, calc(12% + (12% − 12%) × max(0, (0 − 0.6)/(1 − 0.6))), 12%)`
= 12% either way) — yet nesting that computed `@property` inside `color-mix()`'s percentage
argument (`--glass-plate-tinted: color-mix(in oklab, color-mix(in srgb, …), hsl(…) <the clamp>)`)
collapses the **entire** `background` shorthand to its initial value in Chromium. This is the
EXACT failure class glass-ui's own `material.css:165-181` comment documents and says the
specular-opacity path *deliberately avoids* ("a registered-`@property` var() nested in an
hsl()/color-mix alpha computes to 0 in Chromium") — it is simply not avoided here.
Root-cause: producer (`glass/ladder.css` + `tokens/glass-fx.css` — the adaptive tint-strength
wiring engages a code path the producer's own material.css comment names as unsafe, on bare
`.glass-wash` deployments that never wire a `useGlassBackdropLuminance` observer).
Owner: **producer** (the compositing hazard) + **joint** consume note (the two demo sites hit
it only because they use the bare utility class instead of the `<Card tier="wash">` component,
which happens to override the tint-strength to a literal and sidesteps the bug incidentally,
not by design).
Cure direction: the producer's adaptive-tint compositing must resolve the luminance-driven
percentage to a plain value BEFORE it enters the nested `color-mix()` (the same numeric-vs-
serialization discipline the specular path already follows) — not a demo-side workaround, since
any future bare `.glass-wash` consumer will re-trip it. Hand to E-2's request-packet lane.

**CC-2 — The design lane's "third mint" is a phantom; the generated-palette well is `PaletteCard.vue` reused.** *(corrects `t-card-material.md` §1/T-CM-4)*
Evidence: `grep -rn "bg-card/75" demo/@/components/custom/generate` returns nothing; the live
`#/generate` probe (dark) captured the identical class string
`group rounded-card border border-card-edge bg-card/75 backdrop-blur-sm shadow-cartoon-sm …`
that `PaletteCard.vue:19` defines, rendering at the same measured alpha family.
Root-cause: the Generate pane's result grid literally instantiates `PaletteCard` for its rolled
palettes — there is no separate Generate-owned recipe.
Owner: **n/a** (a census correction, not a defect). Effect: the well-mint count in T-CM-4 is
5 independent sites, not 6 (`.dashed-well`, `PaletteCard`+`PaletteCardSkeleton` [one shared
recipe], `ImageEyedropper`, the opaque pair `PerceivedSpacePlate`/`GradientStopEditor` chip) —
plus **B8 `VersionHistoryDrawer.vue:21`**, a 6th opaque `bg-card` site the curated table didn't
carry. Net: the mint-count is unchanged at 6 (swap generate-well out, VersionHistoryDrawer in).

**CC-3 — `PaneHeader`'s scroll veil is a 7th, independent "card-adjacent" recipe.** *(feeds T-23)*
Evidence: `PaneHeader.vue:71-73` — `color-mix(in srgb, var(--card) 60%, transparent)` +
`blur(12px)`. This alpha/blur pair (60%/12px) matches NONE of the ladder's designate families:
not wash (1P, .356/.430 blur1px), not the well (.75 blur8px), not input-bar (.80/.88 blur13px).
Root-cause: authored independently at `t-header-shading`'s W5-2 forensics rider, before the
ladder existed.
Owner: **demo**. Cure direction: once T-CM-1 lands (every pane a rung-1 plate), the header veil
should read as **the same plate species**, not a bespoke 8th recipe near it — hand this exact
citation to `t-header-shading.md`/the design lane so the veil's alpha/blur pair is retired in
favor of the rung-1 recipe rather than independently retuned.

**CC-4 — The EasingPicker fixture sits one tier ABOVE its Gradient-pane host (fixture-over-host inversion, confirmed live in both schemes).** *(feeds T-22)*
Evidence: `.glass-card` (glass-ui `surfaces.css:83`, the QUIET-tier convenience shorthand)
measures `oklab(0.9156…/0.52)` L / `oklab(0.4148…/0.6304)` D — QUIET tier — while its Gradient
pane host (`GradientPane.vue:20`, `tier="wash"`) measures `0.356/0.430` — WASH tier. This is
`t-card-material.md` RC-2 (fixture-over-host inversion) reproduced concretely inside the
Gradient pane specifically, not just Mix (t-card-material's cited example). Root-cause: RC-2.
Owner: **joint** (glass-ui's `EasingPicker` ships at its own fixed tier; the Gradient pane
consumes it without a tier override). Cure direction: same as T-CM-2 — interior fixtures are
rung-2 tone-steps of their host, never a heavier independent glass tier; hand this citation
to `t-easing-pane.md` alongside its own T-22 findings.

**CC-5 — The two literal "search" surfaces are NOT materially inconsistent; T-12's target is elsewhere.** *(narrows T-12)*
Evidence: Browse's "Search the commons…" field and Palettes' "Search your palettes…" field both
resolve to the identical glass-ui `SearchBar`/`.input-bar` component at the FLOATING rung,
byte-identical alpha/blur in both schemes (`0.80/0.88`, `blur(13px)`), confirmed by live probe
on both routes. Root-cause: n/a — this pairing already behaves consistently. Owner: n/a (a
scope-narrowing note). Cure direction: T-12's "why is this search area not styled the same as
the other areas" must be pointing at something else in the shot (t-2005-08) — candidates the
sweep surfaced: the dock-embedded slug-rename field (`SlugEditLayer.vue:85`, fully unstyled
`bg-transparent border-none`, no glass at all) or the surrounding row's filter-button/search-pill
proportion rather than the pill's own fill. Hand this precise elimination to `t-search-tabs.md`
so it doesn't re-litigate the (already-consistent) fill color.

**CC-6 — `PaletteDialog.vue` + `PaletteControlsBar.vue` appear ORPHANED (zero render path).** *(E-3/E-4 — legacy flag)*
Evidence: `grep -rln "PaletteDialog"` across `demo/` returns only `BrowsePane.vue` (which
imports ONE of its `composables/`, not the component), `palette-browser/index.ts` (a barrel
re-export), and `useHoverPopover.ts` (also composable-only). The component `PaletteDialog.vue`
itself — and its `bg-card` opaque sticky `PaletteControlsBar.vue:2` (`backdrop-filter: blur(4px)
saturate(0.7)` chrome at `PaletteDialog.vue:309`) — has no `<PaletteDialog>` mount site left
in the tree; the dialog-era UI was superseded by the pane-based router (`usePaneRouter`, tranche
B) and only its composables were salvaged.
Root-cause: an incomplete migration — the dialog-era shell was never deleted, only bypassed.
Owner: **demo**. Cure direction: this is E-3/E-4 territory (no legacy code; fold deferred items
in) more than a card-material question — hand the citation to `t-legacy-sweep.md` for
confirmation + excision; if confirmed dead, its `bg-card` row (B9 above) drops out of the
census entirely rather than needing a rung assignment.

**CC-7 — The STAGE rung (4S) has zero producer or demo home; every raw-neutral site is hand-rolled.** *(supports `t-card-material.md` T-CM-6)*
Evidence: §1 group E (3 sites, `ExtractWorkbench.vue`) are the only STAGE-shaped surfaces in
the entire sweep, and all three are literal Tailwind `bg-black`/`bg-white/NN` utilities with
no named token backing them — confirmed by grep, not contradicted by any live probe (the
neutrals are unconditional class strings, not var-indirected). Root-cause: the ladder (per
`t-card-material.md` §3) never named this rung; RC-3 in that lane's language ("the well was
never a rung") has a STAGE-shaped twin. Owner: **demo** (mint `--stage`/`--on-stage-chrome`
per T-CM-6's cure — no new producer ask needed, this rung is legitimately house-local since it's
a photographic-content register, not a glass material).

---

## §3 What the sweep did NOT find (negative results, load-bearing for E-5 "recap and verify")

- No inline `style="background: …"` literal paints a card/glass surface anywhere in `demo/`
  outside the enumerated swatch/color-preview elements (dot previews, gradient stops, hue
  ramps) — those are color-value displays, not card materials, and are correctly out of scope.
- No second, independent `--glass-opacity-*`-style token family exists in `demo/` — every
  fractional-alpha surface in `demo/` either consumes a glass-ui `.glass-{tier}`/`.input-bar`/
  `.glass-card`/`.glass-btn` class, a Tailwind `bg-{card,muted,background}/{NN}` utility keyed to
  the same three house CSS variables, or one of the two bespoke `color-mix()` recipes in group G.
  There is no fourth, demo-invented alpha scale hiding anywhere — the inconsistency the owner
  measures (T-24) is a **deployment-rung** problem exactly as `t-card-material.md` concludes, not
  a hidden second palette.
- `#/admin-*` routes could not be live-probed in this pass (session-gated redirect in the
  lane-local boot); their `bg-muted/30` rows (C3, C4) are stamped from source + token math and
  should be spot-checked live once an admin session is available, though the recipe is a plain
  Tailwind opacity utility with no conditional logic to hide a surprise.

---

## §4 Summary table for the design lane (one row per SHOULD-be rung, counts)

| Rung | Count of distinct sites (this sweep) | Sites |
|---|---|---|
| **1 · PLATE** | 10 (A1-A10) + 1 bespoke-recipe (G1, PaneHeader veil) | every pane host + picker + the header veil once unified |
| **2 · WELL** | 15 (B1,B2/B3/B4-shared,B6,B7,B8,C1-C6,D1,D2,D3,D4,F2,F5,F9) | dashed-well, PaletteCard family, perceived-space plate, stop chip, VersionHistoryDrawer, markdown interiors, admin chips, mix result plate, EasingPicker, select fills |
| **3 · CHROME** | 8 (B5,F1,F3,F4,F8,F10,F11,F12,F13) | eyedropper overlay, input-bar (as hard-bound), bulk-toolbar, swatch-edit overlay, toolbar pill, Mix CTA, dock, segmented tabs, popover |
| **4 · STAGE** | 3 (E1,E2,E3) | Extract image stage + caption veil + on-stage chip |
| **n/a (outside ladder, correctly)** | 4 (G2,G3,G4 + MiniColorPicker/PointerDebugOverlay exemptions) | status chips, banner, color-math ramps, dev instrumentation |
| **ORPHANED (flag, don't rung)** | 1 (B9 / CC-6) | `PaletteDialog`/`PaletteControlsBar` — zero render path |
| **DEFECT (flag, don't rung until fixed)** | 2 (F6, F7 / CC-1) | bare `.glass-wash` zero-fill sites |
