# Value.js Demo Design Language

> Extends [glass-ui DESIGN.md](../../glass-ui/DESIGN.md). The demo inherits glass-ui's token contract verbatim; this catalog narrates the demo-specific overrides + the idioms a component author needs without grep-archaeology. Cross-references cite `demo/@/styles/style.css` line numbers (post-D.W3 baseline) + glass-ui section names.

## § Token architecture

Tokens live in two places, in this cascade order (style.css:1-4):

1. `@import "tailwindcss"` → `@import "tw-animate-css"` → `@import "@mkbabb/glass-ui/styles"` — glass-ui ships the full contract surface (durations, easings, z-tiers, radii, shadows, glass tiers, type scale, layout/sizing — see glass-ui DESIGN.md §Token Architecture). Consume by name, not by re-declaring.
2. `@import "./animations.css"` — project-specific keyframes + `prefers-reduced-motion` carve-out.
3. `:root` in `style.css` — the demo's narrow override surface: the font root (`--font-stack-display` → Fraunces — the SOURCE cure, R.W3 Lane A), the accent axis (`--accent-live` + the `--primary` re-point + the glass tint feed), the `--card-edge` hairline mint (§ Depth), `--shadow-cartoon` / `--shadow-cartoon-hover` (heavier rung) with `--shadow-card` routed through cartoon, `--select-font` / `--dropdown-menu-font` pinned to mono, the layout tokens (§ Layout), and the `.dark` shadow re-pin. Add new project tokens here under a commented rationale; do NOT spin up a parallel `design-idioms.css` (see § Idioms NOT used).

## § Type

### The three-voice law (NORMATIVE — R.W3 Lane A)

Three voices, one source each. The display voice is cured at the SOURCE token
glass-ui's `@theme` bridge inlines — `:root { --font-stack-display: "Fraunces", serif }`
(style.css §font root) — so every `.font-display` / `.text-display-*` rung,
glass-ui-compiled and demo-authored alike, resolves Fraunces by construction.
The demo's former `@theme` re-declarations of `--font-display`/`--font-serif`/
`--font-mono` were the split-brain (they moved the runtime var, never what the
compiled utilities paint) and are deleted.

- **Fraunces — the atlas/display voice.** Display rungs ONLY: `.text-display-*`,
  `.font-display`, pane titles, the space-title plate caption, markdown headings,
  section headings. The variable axes (`opsz` 9–144, `WONK`/`SOFT`) apply via the
  glass-ui utilities. Fraunces' single brand source is the Google Fonts `<link>`
  in `demo/color-picker/index.html`. **Never** on body/control text; italics
  never on control text.
- **Plus Jakarta Sans — the body voice.** Everything unmarked: prose, controls,
  labels, list rows. Real faces load from the corpus import
  (`@import "@mkbabb/glass-ui/styles/fonts"` — without it only the metric
  fallback ships and the body paints system-ui). `--font-serif` resolves to the
  body voice via the glass-ui bridge (the demo no longer aliases serif→Fraunces).
- **Fira Code — the readout/annotation voice.** Numeric readouts, code, admin
  labels, plate captions/eyebrows. `--select-font` + `--dropdown-menu-font`
  pin Select + DropdownMenu triggers to mono so numeric values read cleanly.
  **Mono on a FIELD is a statement about the content, never a default**
  (T.W3-3 / T-12): a prose search field speaks the body voice (the seated
  register strips the producer recipe's baked `--font-mono` — ASK-B's seam
  target); CSS-literal and identifier fields opt back into mono by explicit
  class (SearchFilterBar's color input is the exemplar).

**Prohibitions**: no `!important` family overrides; no serif-fallback rung
accepted as a cure (a Times-painted display rung is a defect, not a degrade);
no blanket `font-display` on body containers (the markdown wrapper and the
nutrition label carry the body voice; their headings opt into display).

Use glass-ui's named utilities — `.text-display-*`, `.text-title`, `.text-heading`,
`.text-prose`, `.text-body`, `.text-mono-small`, `.text-mono-caption`,
`.section-label` — instead of raw `text-2xl` etc. The φ-ratio scale (glass-ui
DESIGN.md §Typography → Size tokens) is the canonical step ladder; display rungs
are viewport-fluid `clamp()`s by design (no `sm:` responsive type pairs).
Project-specific font aliases (`utils.css:4-11`) expose `.fraunces` + `.fira-code`
for one-off opt-in (markdown code, the picker's component readout).

The `.section-subtitle` recipe (utils.css:18-27) is a single-line caption variant of glass-ui's `.section-label` with muted half-opacity + line-clamp — consumed by the gradient / mix / generate control bars.

### The card-lock law (NORMATIVE — R.W3 Lane A / A6, U31)

Hero/readout numbers may be as audacious as the display ramp allows, but **a
value change may never move the card**: dragging any component slider from min
to max changes NO containing card rect (±0px). Two mechanisms, both required
wherever live numeric values render at display scale:

1. **Tabular figures** — `font-variant-numeric: tabular-nums` (or
   `font-feature-settings: "tnum" 1`) on every live numeric readout, so digit
   swaps are width-stable. Fira Code is tabular by default; Fraunces is NOT —
   a Fraunces-set number MUST declare `tabular-nums`.
2. **`ch` worst-case reservation** — the readout's container reserves the
   widest legal rendering of its format up front (e.g. a `-125.0`-class channel
   reserves `min-width: 7ch` at its own font), so sign flips, added decimals,
   and unit swaps re-ink the SAME box instead of re-flowing the row. No
   `flex-wrap` on a locked readout row.

The law is codified here; the picker readout's application LANDED at R.W3
Lane D — int/frac/unit span split + declared `tabular-nums` in
`ColorComponentDisplay.vue`, the static per-space `ch` table at
`color-picker/readoutReservation.ts` (derived at module scope from
`COLOR_SPACE_RANGES`; no runtime measurement), atomic `nowrap` cells + a
2-line block lock. Verified by the close probe: End/Home/End keyboard sweeps
leave the card rect byte-identical.

## § Surfaces — THE MATERIAL LADDER (NORMATIVE — T.W3-1 / SYNTHESIS §2 D1)

Doctrine: **glass earns its blur by floating over live content; a surface that
sits IN a plate is a tone of the plate, not a second pane of glass.** Four
rungs; every rendered surface is a MEMBER of exactly one. The O-7 census
(`e2e/smoke/oracles/o7-card-census.spec.ts`) asserts membership — by identity,
never by a fixed alpha — both schemes + the 390 frame. A surface that fits NO
rung routes to ratification; off-ladder material mints are prohibited
(T.W3 §No-workaround; the T-CM-4 parallel-mint pathology).

| Rung | Material | Deployments |
|---|---|---|
| **1 · PLATE** | ONE card species — the picker's exact register: `<Card tier="resting">` with its defaults (cartoon stamp via `--shadow-card`, grain ON) | the picker card AND all 9 pane cards (About, Palettes, Browse, Extract, Mix, Generate, Gradient, Admin, ConfigSlider) |
| **2 · WELL** | an **opaque tone-step of the plate, NO backdrop-blur** (nothing live sits behind an in-plate fixture; blurring the aurora through the host is the mud generator) — the ONE `--well-bg` token: `color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)` (the D1 bracket [6%, 10%], default 8%), consumed as `bg-well`/`var(--well-bg)`; dashed edge / `--shadow-cartoon-sm` where the affordance calls for it | `.dashed-well` · PaletteCard (+skeleton — one shared shell) · the gradient perceived-space plate + stop chip · VersionHistoryDrawer rows · the mix result plate · markdown interiors (`bg-muted`, the pattern's origin cite) |
| **3 · CHROME** | true floating glass — the producer rungs as shipped (`glass-dock`, capsules, `glass-floating`/`overlay`) | dock, login capsule, Mix CTA, popovers/dialogs/drawers, the swatch-edit overlay, the eyedropper overlay (Q4-defaulted: a TRUE overlay — floating is correct *there*) |
| **4 · STAGE** | the named near-black pair `--stage`/`--on-stage-chrome` (warm stone, **scheme-invariant** — a photograph's ground never flips) | the extract camera/image stage, its caption veil, on-stage chrome chips |

The PaneHeader veil is rung-1's material at a scroll-earned intensity
(`--glass-bg-resting` + `--glass-blur-resting` + rest floor — see
`PaneHeader.vue`; C2's reconciliation, the CC-3 bespoke recipe retired).
**THE REGISTER LAW (W3-3, landed)**: *fields on paper wear paper; fields on
glass stay glass.* glass-ui's `.input-bar` is CHROME (rung-3 dock furniture —
floating glass, a 24rem dock cap, the mono voice); a field seated in a pane
BODY is a rung-2 fixture and wears the SEATED register — the ONE opt-in
`.search-seated` (utils.css): `--well-bg` fill, no blur, the `--card-edge`
ink hairline, the chip-scale cartoon stamp, the column measure (the dock cap
dies), the plate's text voice. Consumers: the Palettes / Browse / Admin pane
search bars. Dock/overlay search keeps the floating pill. INTERIM demo seat —
booked onto the P3 seated field-chrome rung (ASK-D, with ASK-B font +
ASK-C cap seams); the O-7 census carries the seat row (both schemes, judged
beside the dashed-well + card in-frame, + the 768 F-7 frame).

**The depth law (RC-2)**: interior fixtures are rung-2 tone-steps, NEVER
heavier glass than their host; heavier-than-host glass is reserved for
surfaces that float. The physics that makes this the T-24 neutrals cure: over
a full-chroma aurora an alpha spread IS a hue spread — with rungs 1–2 in
place every in-view surface is ≥ ~0.7 effective alpha of ONE neutral family
and the hue fork dies by construction.

**Interim mints, booked swaps (T.W3 §BOOKS)**: `--well-bg` is demo-owned
pending the producer `.glass-well`/`--glass-bg-well` rung (packet P3, sized by
the D1 bracket); the header veil's rest-floor + feather knobs are P3 rows.

**Retired by name (E-3 — never restore)**: the `tier="wash" :shadow="false"
:grain="false"` pane fleet and its "scrolling pane → wash" decision rule ·
the S-20 `bg-card/75 + backdrop-blur` card species (the one-species GOAL
survives, re-grounded at the picker's rung — R8) · the six parallel well
mints · raw `bg-black`/`bg-white`/`text-white` utilities (rung 4 names them) ·
the bespoke 60%-`--card`/blur(12) header veil recipe (CC-3).

## § Depth (NORMATIVE — R.W3 Lane A / A5; the laws R.W4 applies fleet-wide)

Every rendered surface holds exactly ONE rank. The rank decides its shadow,
hairline, and rounding — never ad-hoc per component.

### The Z-rank table

| Rank | Role | Material | Shadow | Hairline |
|---|---|---|---|---|
| **Z0** | The page: aurora + graticule substrate | atmosphere (no surface) | none | none |
| **Z1** | Plates: pane shells, the picker card | glass `resting` — rung-1 PLATE (T.W3-1; the wash arm retired) | the cartoon rung (`--shadow-card`), plates only | the glass tier's built-in `--glass-border-accent` |
| **Z1v** | Veils: config/overlay panes that read *through* | glass veil tier | none | glass border |
| **Z2** | In-plate cards: palette cards, swatch tiles, chips | the rung-2 WELL (`--well-bg` opaque tone-step — § Surfaces) | `--shadow-cartoon-sm/md` (chip scale) or none | `--card-edge` |
| **Z3** | Protagonists: ≤ 1 per pane (the hero blob, a featured card) | material hero | the full cartoon rung | per material |
| **Z4** | Floating chrome: popovers, dialogs, dock, toolbars | glass `floating`/`overlay` | the glass tier's own shadow | glass border |

### The six laws

1. **One shadow voice.** The cartoon offset (`--shadow-cartoon` rungs) is the
   only drop-shadow language. No element ever carries BOTH a cartoon offset and
   a soft/inset ring (the U24 "extreme" = stacking both).
2. **The cartoon budget.** Per pane at rest: plates (Z1) + at most ONE
   protagonist (Z3) cast the full cartoon rung. Dual views ≤ 3 full-rung casters
   total. Chip-scale rungs (`--shadow-cartoon-sm/md`) don't count against the
   budget but obey law 1.
3. **Hover lifts never lurch.** A hover may deepen the SAME shadow
   (`--shadow-card` → `--shadow-card-hover`) and translate ≤ 2px; it never
   changes shadow voice, rounding, or layout size.
4. **Hairlines are glassy.** In-house edges only: glass tiers use their built-in
   `--glass-border-accent`; opaque/flat cards use the ONE mint —
   `--card-edge: color-mix(in oklab, var(--foreground) 12%, transparent)`
   (style.css `:root`, owned here; R.W4 consumes, never re-mints). Never an
   opaque foreign-hue border (the retired hue-217 navy `--border` fork was the
   canonical violation).
5. **Windows are veil.** A surface you read *through* (config overlays,
   scrims) is the veil tier — translucent, shadowless; it never fakes depth
   with a drop shadow.
6. **Z-tiers are never faked by shadows.** Stacking order routes through the
   `--z-*` tokens (§ Z-tier); a bigger shadow is never used to *imply* a higher
   layer. Shadow says material; z-index says order.

The picker-bearing surface (the `tier="resting"` picker Card) is the reference
application: `rounded-card` rounding, the cartoon rung via `--shadow-card`, the
glass tier's hairline — one rank, one voice, one edge.

## § Shadows

One cartoon language. The demo overrides `--shadow-cartoon` to a heavier rung (style.css:44-47):

- Rest: `8px 8px 0 0 color-mix(in srgb, var(--shadow-color) 80%, transparent)` — flat offset, pop-art aesthetic.
- Hover: `10px 10px 0 0 ... 85% ...` — same offset shape, lifted opacity.
- `--shadow-card` + `--shadow-card-hover` are routed through `--shadow-cartoon` + `--shadow-cartoon-hover` (style.css:46-47). One language for `shadow-card`, `shadow-[var(--shadow-card)]`, and `shadow-cartoon` consumers — no fourth ad-hoc recipe.

Dark mode lightens the cartoon rung (style.css:146-147) by dropping the shadow-color mix to 50% / 55% so the offset stays legible against the dark substrate. Glass-ui's `--shadow-cartoon-sm/md/lg` rungs (MiniColorPicker, SearchFilterBar) are consumed unchanged for chip-scale shadows where the heavier 8px rung would dominate.

## § Radii

Role-bearing tokens (glass-ui DESIGN.md §Border Radius):

- `rounded-card` (= `--radius-card` = 16 px) — Card surfaces, palette cards, gradient swatch.
- `rounded-input` (= `--radius-input` = 8 px) — text inputs.
- `rounded-pill` / `rounded-full` — chips, slug pills, dock control.
- `rounded-panel` (= 12 px) — popovers, bulk-action toolbar, eyedropper overlay.

Markdown `<pre>` + `<img>` carry their own radii in `Markdown.vue <style scoped>` for content fidelity (a code block reads as code, an image as an image; the role-bearing token applies to chrome, not content).

Pill radius (`--radius-pill: 9999px`) is the dock control's signature shape (`--radius-dock = var(--radius-pill)` in glass-ui), the slug-pill recipe (style.css:217-219), and the touch-gate outline on slider tracks (style.css:188-190). Avoid hand-rolling `rounded-full` or `rounded-[9999px]` when the role-bearing token applies.

## § Motion

Glass-ui ships two parallel duration token families (DESIGN.md §Duration, §Easing). Pick the family that matches the motion's role:

**§ Family A — general-purpose `--duration-*`** (tokens.css §1). The everyday vocabulary the demo reaches for ~74 times across `<style scoped>` blocks and inline `:style` bindings:

- `var(--duration-instant)` — 100 ms (snappy feedback — dev-overlay button presses).
- `var(--duration-fast)` — 200 ms (hover/feedback, micro-interactions).
- `var(--duration-normal)` — 300 ms (standard transitions, entry/exit fades).
- `var(--duration-slow)` — 450 ms (the GooBlob hover-filter, ColorInput input-mode-flash).
- `var(--duration-panel)` — 550 ms (dock expand, ColorInput crown-appear).
- `var(--duration-xl)` / `var(--duration-xxl)` — 1 s / 1.5 s (one-shot affordances).
- `var(--duration-shimmer-fast)` — 3 s (PaletteDialogHeader's `.admin-golden` golden-shimmer).
- `var(--duration-shimmer)` — 5 s (long-loop shimmer sweeps).
- `var(--duration-sparkle)` — 600 ms (the audacious-CTA sparkle micro-event; glass-ui-internal at the demo's scale).

**§ Family B — specialised `--motion-duration-*` / `--motion-delay-*`** (tokens.css §1, AH.W5-e canon). These tokens cluster celebratory + staged-reveal motion at one canon — duration + easing arm together. The demo does **NOT** consume these directly at present because their semantics target speedtest's celebratory SFCs (CompleteBadge disc/ring/check, complete-shimmer, badge-staged-reveal, progress-intake/crescendo, ripple). Filed for future adoption when the demo grows analogous staged-reveal motion:

- `--motion-duration-staged` — 320 ms (paired with `--motion-ease-staged-entrance`).
- `--motion-duration-complete-shimmer` / `--motion-delay-complete-shimmer` — 2.4 s / 220 ms.
- `--motion-duration-badge-{disc,ring,check}` / `--motion-delay-badge-{disc,ring,check}` — 420/560/380 ms with 80/220/460 ms delays.
- `--motion-duration-progress-intake` / `--motion-duration-progress-crescendo` / `--motion-duration-progress-indeterminate` — 220/240/4000 ms.
- `--motion-duration-ripple` — 340 ms.

The two families coexist by design — Family A is the everyday rhythm (where the demo lives); Family B is the celebratory grammar (reserved for staged-reveal sites the demo doesn't yet author).

**§ Easings.** `var(--ease-standard)` (decel cubic, default), `var(--ease-decelerate)` / `var(--ease-accelerate)` (entry/exit), `var(--spring-snappy)` / `var(--spring-smooth)` / `var(--ease-spring)` (spring physics for transforms). The `--motion-ease-*` aliases (`--motion-ease-standard`, etc.) point at the same curves; the unprefixed names are the consumer-facing surface.

**§ The liquid two-channel law (T.W5 — T-14/D7, the motion table of record).**
SPATIAL (translate/scale travel) = a spring at ITS OWN clock (`--spring-<name>` @
`--spring-<name>-duration` — a normalized spring `linear()` reaches ~0.5 by ~6% of ANY
clock, so it NEVER rides a generic `--duration-*`); EFFECTS (color/opacity/box-shadow) =
bezier (`--ease-standard`/`--ease-out` @ `--duration-fast`/`--duration-normal`); EXIT =
bezier, strictly SHORTER than its enter, never an overshoot. The law is INHERITED, not
per-site: interactive scales consume the producer atoms (`btn-interactive`,
`.interactive-item`, `.tap-squish` — the scale leg reads `--transition-liquid-spatial`),
cards consume the cartoon register (`cartoon-surface` + `.cartoon-cast` +
`useLiquidPress`), arrivals/settles key the three `vj-*` families (animations.css).

| Register (T.W5 row) | Site | Pairing | Status |
|---|---|---|---|
| Pane swap ENTER (R2) | `animations.css` `.pane-wrapper--* > .vj-enter-enter-active` | transform `--spring-snappy` @ `--spring-snappy-duration` (PKT-2 arm (i) — the ~0.3s preset unanswered at this cut) | landed |
| Pane swap LEAVE (R3) | same block, leave-active | opacity+transform `--duration-fast` `--ease-out` — the exit law | landed |
| Card cartoon (R4) | `PaletteCard.vue` root | producer `cartoon-surface` register: translate/scale `--ease-cartoon-punch` @ `--duration-normal`, shadow `--ease-standard`, press squash + lagging caster | landed |
| Interactive scales (R5) | editor buttons, add-slot, send-btn (`btn-interactive`); `.channel-rail-item` press leg (`--spring-press` @ 0.16s) | `--transition-liquid-spatial` @ `--spring-smooth-duration`; press @ its own clock | landed |
| Skeleton settle (R8) | `BrowsePane.vue` state chain; extract already settled (W3-2) | `vj-morph` out-in; stagger dormant on the PKT-4 seams | landed |
| `.pane-shell` nudge (R11) | `ColorPicker.vue` | `--transition-liquid-spatial` @ `--spring-smooth-duration` | landed |
| Bare-utility default (R1) | 37-file census | `--duration-fast` + `--ease-standard` via the `@theme` alias (style.css:119) — DEAD until PKT-1 clears the dist `:root` 150ms clobber; NO demo cascade arms-race | producer-gated (O-16 row EXPECTED-RED) |
| Collapse legs (R6/R7 — Tranche B) | `vj-morph`/`vj-celebrate` `max-height` legs; dock action-bar grid slot | compositor re-cut per the PKT-3 recipe; NEVER retimed on layout properties (PI-5) | PKT-3-gated, untouched |
| Gradient stop handle (R9) | `GradientStopEditor.vue` | `--spring-snappy` @ `--spring-snappy-duration` — the retime rides INSIDE W6-2's re-author (T-46); W5's O-16 census owns the row's verification | handed across → W6-2 |
| Dialog scrim (R10) | ~~`PaletteDialog.vue:310`~~ | the 0.55s scrim DIED with the W0-3 CC-6 PaletteDialog excision; the live dialogs are glass-ui re-exports on the producer bloom clock (F6 KEEP) | discharged by excision |
| **KEEP** — view-accent sweep (F7.3) | `DockViewSelect.vue` `--accent-view` @ `--duration-panel` (0.55s) `--ease-standard` | EFFECTS-on-bezier, correct channel; the 0.55s is a DELIBERATE stately sweep (W7-4's surviving voice) — kept, stated here so it never reads as a stray | KEEP, do not retime |
| **KEEP** — tracked canvas (F7.4) | `ImageEyedropper.vue` `.eyedropper-canvas` transform `--duration-fast` `--ease-decelerate` | canon "tracked = bezier": a position-TRACKED transform follows the pointer/gesture, it does not travel on its own — a spring here would fight the hand | KEEP, do not retime |

The KEEP set (t-transitions-liquid F6) is canon and not re-litigated: `vj-morph`/
`vj-celebrate` enters, the un-scoped `vj-enter` family, the glass-ui
reveal/dock/tabs registers, the atmosphere arrival fade, and the PRM guard chain.

**§ Bespoke literals (KEEP, not migrated).** Some demo animations carry durations that do not exactly match a glass-ui token, and per `feedback_preserve_animations.md` are preserved rather than force-fit:

| Site | Literal | Why kept |
|---|---|---|
| `ImageEyedropper.vue:286` | `swatch-pop 0.65s` | bespoke pop curve (overshoot → rest in 4 frames); no canon between `--duration-panel` (0.55 s) and `--duration-xl` (1 s) |
| `ActionButton.vue:117,120,121` | `action-pulse / action-spin 0.4s` | bespoke flash + spin; sits between `--duration-normal` (0.3 s) and `--duration-slow` (0.45 s) |
| `PointerDebugOverlay.vue:266` | `blink 0.5s infinite` | bespoke; dev-only debug overlay |
| `PaletteCard.vue:388` | `golden-text-shimmer 4s` | bespoke; sits between `--duration-shimmer-fast` (3 s) and `--duration-shimmer` (5 s) — paired with the 4-stop gradient's visual rhythm |
| `useHeightTransition.ts` | `350 ms expand / 250 ms collapse` | bespoke; JS-runtime constants written as inline `style.transition` strings; tuned by hand at B-tranche for palette-card expand/collapse rhythm |

**§ Reduced-motion carve-out** (animations.css:32-60, B.W1 Lane B): the global `prefers-reduced-motion` guard neutralises all CSS animation + transition durations; a secondary block re-enables 150 ms opacity fades on `[data-state="open"|"closed"]` so reka-ui Dialog/Sheet/Popover state changes still communicate. WebGL RAF loops (GooBlob, aurora) fence on `prefers-reduced-motion` in their composables (see `useMetaballRenderer`); the global CSS guard does not reach them.

Custom keyframes live in `demo/@/styles/animations.css` (`edit-drawer-in`, with a mobile media-query restate at ≤ 639 px — see comment at animations.css:12-16 for the intentional inheritance break) + colocated `<style scoped>` blocks (per-component animations). Shared keyframes (dialog, floating-panel, card-menu, shimmer) come from `@mkbabb/glass-ui/styles/animations.css`.

**§ Canonical motion recipe** — when in doubt, reach for `var(--duration-normal) var(--ease-standard)` on a transition; for entry-from-rest use `--ease-decelerate`, for exit-to-rest use `--ease-accelerate`. Spring curves (`--spring-snappy`, `--spring-smooth`) are reserved for transforms that read physically; PaletteCard.vue's golden-text-shimmer demonstrates the cubic-bezier path, ActionBarLayer.vue the duration-fast path.

**§ Pane-swap transition mode — NOT `out-in` (dev-vs-build divergence).** The
per-slot `<Transition>` in `panes/PaneSlot.vue` uses the DEFAULT (simultaneous)
mode, deliberately. Under `vite` DEV, Vue 3.5's `mode="out-in"` machinery fails
to re-mount the incoming pane after the outgoing pane's leave transition
completes — its internal `afterLeave → instance.update()` re-render never fires,
so the slot strands on a bare comment placeholder indefinitely (the incoming
component's `setup` — even a synchronous, non-async one — is never invoked). The
production build (`gh-pages` + preview) schedules the same handoff correctly, so
the defect was **dev-only and silent** (green build screenshots, red live dev):
the R.W3 close blocker. This is the general lesson worth carrying: a
`vite build`-only verification can pass while `vite` dev is broken — the honest
instrument is the committed dev `webServer` posture, and it must stay dev. The
default mode mounts the incoming pane immediately and cross-fades the two slides
(the Lane-E space-switch intent), identical in dev and build; the slots stay
height-bounded (`min-h-0` + `--content-max-h`) so the brief co-mount never jumps
the layout. See `docs/tranches/R/audit/R.W3-visual-runtime/DELTA.md`.

## § Z-tier

All z-index reaches route through glass-ui's `--z-*` tokens (DESIGN.md §Z-Index Stack):

- `z-[var(--z-bar)]` (30) — sticky bars (PaletteControlsBar).
- `z-[var(--z-header)]` (35) — pane headers (PaneHeader, Markdown TOC).
- `z-[var(--z-dock)]` (40) — RETIRED from the shell at T.W6 · T-31: the dock band is grid structure (own row), so the dock needs no z at all; the token remains glass-ui's, available to true chrome overlays.
- `z-[var(--z-popover)]` (70) — popovers, bulk-action toolbar, eyedropper overlay, gradient stop selection ring.
- `z-[var(--z-controls)]` (20) — inline canvas overlays (MixAnimationCanvas).

Zero numeric `z-[NN]` literals in custom components post-D.W4 Lane A (the two `z-[1]` survivors live in `demo/@/components/ui/` — shadcn-vue generated, do not hand-edit). Lane A surfaces these as `z-dock`, `z-popover`, etc. Tailwind utilities; the rendered output is byte-identical.

## § Color

**THE C3 LAW (NORMATIVE — T.W3-1; T-24 reconciled per t-contradictions C3;
law + ledger + neutral family RATIFIED via Q18, 2026-07-09): color appears
only as color DATA; chrome, material, and type are NEUTRAL.** The neutral
family is the house WARM cream/stone form — the glass-ui warm ladder plus the
stone-ink pair `rgb(28 25 23)` / `rgb(233 230 226)` (the rung-4 STAGE pair);
raw `#fff`/`#000` live ONLY inside color-math ramps. T-24's "consistent
gray/black/white" is NOT "no color" — six T rows deliberately put color ON
surfaces; the law resolves the contradiction with this COMPLETE
sanctioned-exception ledger. A surface not on the ledger paints neutral; a
new exception ROUTES TO RATIFICATION, never self-adds:

1. **Color-data ramps** — spectrum plates, gradient ramps/bars, slider tracks, hue wheels, harmony previews (the data IS color).
2. **WatercolorDots** — the live-color voice; any ring rides the dot's own silhouette or does not exist (R9/Q12 register law).
3. **Palette strips + chips** — saved/browse palette data, preview chips (T-17's lane).
4. **The gamut netting** — hue-carrying measurement ink (T-6 recalibrates intensity, never neutralizes).
5. **The aurora field** — the derived atmosphere (T-25/T-26's living ground).
6. **The blob** — the picked color made flesh (T-8).
7. **The Palettes rainbow** — Q5's owner-verbatim GUARDED LETTERFORM RAMP at exactly TWO sites: the "Palettes" view-dropdown entry AND the Palettes title (lands at W6-4; the accessible descendant of the excised `pastel-rainbow-text`).
8. **Admin-gold** — the `--color-gold` family (admin/featured identity; see the accent-token block below).
9. **The `--accent-view` navigation-ring family** — the expanded-trigger ring + the W4-4 letter-rail enclosure (the seal rim is STRUCK per R9/Q12). Q10 scope sub-clause: Tools/Login chrome KEEPS the live accent — the owner's "the rest white/black" is menu-scoped.

Everything else — card material, headers, dropdown chrome, type ink, dock
chrome — is neutral, on the ladder (§ Surfaces).

OKLab-driven throughout — the picker, the gradient interpolation, the harmony generator. Glass-ui's color tokens (`--background`, `--foreground`, `--card`, `--muted-foreground`, `--border`, etc.) are the surface contract.

**The accent axis (R.W3 Lane A / A2).** `--accent-live` is the contrast-guarded LIVE picked color — written onto `:root` by App.vue from the library `safeAccentColor` path (the SAME computation `SAFE_ACCENT_KEY` provides; ONE color-resolution path, never a bespoke resolver). `--primary` re-points onto it (the interactive layer speaks the picked color, not ink) with `--primary-foreground: var(--background)` as the guarded pair, and the glass frost carries the live temperature at low strength through glass-ui's existing `--glass-tint-source` / `--glass-tint-strength` knob (4%; no parallel tint surface). The `:root` literal is only the pre-hydration fallback.

**The gamut ink/paper pairs (R.W3 Lane B / B1; recalibrated T.W6-1 / T-6).** Out-of-gamut is a designed state: `--gamut-edge`/`--gamut-hatch` (ink, from `--foreground`) and `--gamut-edge-paper`/`--gamut-hatch-paper` (paper, from `--background`) in `style.css :root` are the truth-line overlay's whole vocabulary — a 45%/65% edge pair and a 22%/28% hatch pair (the R5 recalibrated band; O-19 guards the ≥59/45 per-255 luma-delta floor), applied per contour segment by the field's own luma through the shared `spectrumLuma` helper (flip at 0.5, the same predicate as the WatercolorDot border — one function, never a copied constant). Measurement chrome only: the overlay reads in ink + the live color, never gold, never the crayons.

**The gamut-ink netting facility (`@lib/gamut-ink`, S.W5-8 / owner-ruling §1.2).** The truth-line inks above are *tokens*; their PAINT primitives live in ONE module — `@lib/gamut-ink` — so the netting idiom is never copied per-plate. It owns: `createInkProbe` (a hidden span in the plate's own cascade whose computed style resolves the four `--gamut-*` tokens, `color-mix` and all, to concrete canvas inks — cached per scheme); the `WEBBING` table (period 6px / 45° / 1.25px weight — lockstep with the CSS tile per T.W6-1) + its derived `HATCH_STEP`; `drawHatch` (the lattice line-painter); the `SECOND_NET` paper-underlay + dashed-ink treatment (§1.2b) for sRGB-excess runs under wide interpolation spaces, with `drawSecondNet`; and the shared `DPR_CAP`. Two consumers today — the picker's spectrum-plate overlay (`gamutOverlayPaint.ts`) and the gradient page's hue-swept envelope plate (`envelopePlatePaint.ts`, T.W6-2); geometry stays library-owned (`@mkbabb/value.js/color`), scheduling the consumer's.

**The alpha checker ground (`--alpha-checker`, S owner-ruling 2026-07-05).** ONE recipe, one home: the transparency ground every alpha-carrying ramp/well composes UNDER its color layer via the background shorthand — `background: <ramp>, var(--alpha-checker)`, never `background-image:` (the token is a complete background LAYER carrying its own position/size). 8px squares (16px tile), two-tone in the house neutrals (`--background` + a 14% `--foreground` oklab mix), so both schemes stay in-material by construction — dark gets a dark checker, never a white flash. Consumers: the picker's alpha slider track (`ComponentSliders`), the gradient editor bar + stop wells (`GradientStopEditor`, `GradientEasingEditor`).

Demo accent tokens (style.css `@theme`):

- `--color-gold: #D4AF37` — the admin-mode + featured-palette accent. Animated gold-text-shimmer (PaletteCard.vue) uses a 4-stop gradient cycling through `--color-gold` ↔ `--color-gold-light`. The dock's admin-mode toggle (Dock.vue), the featured-badge stroke (PaletteCard), and the profile slug pill (ProfileSection.vue) all reach for the same token. Gold stays OUT of the measurement chrome (overlay/readout/thumbs — those read in ink + the live color).
- `--color-gold-light: #F5E6A3` — shimmer counterpoint, only consumed by the gold-text-shimmer keyframe.

**The dark ladder (R.W3 Lane A / A3).** The dark COLOR ladder is glass-ui 4.2's stepped warm dark-material ladder (page L4 → card/popover L16 → hover L22 → border L34, hue 24–36 throughout), consumed as shipped. The demo's former hue-217/224 `--popover`/`--border`/`--input` re-pins — the lone cool hues in the warm house — are DELETED, not retuned; zero dark borders compute in the 200–240 navy band. The only surviving `.dark` overrides are shadow-family (`--shadow-cartoon*` lightened, `--shadow`), which keep the cartoon language legible on the dark substrate.

Harmony patterns ship in `useColorGeneration.ts` (demo/@/components/custom/color-picker/composables/): analogous (±30°), complementary (180°), split-complementary (base + 150° + 210°), tetradic, triadic, monochromatic, golden, random. Hues generated in OKLCh, jittered in L/C, rendered through glass-ui's color contract.

## § Layout

THE DOCK-ATOP BAND LAW (T.W6 · T-31, owner-verbatim; supersedes B.W1's Bβ Proposal-B fixed overlay). `.app-layout` is a TWO-BAND GRID (`grid-template-rows: auto 1fr`, `row-gap: var(--dock-gap)`): the dock band (`<nav class="dock-band">`, in-flow, static) sits ATOP as row 1; the scene band (`<main class="pane-main">`, `justify-content: center`) sits below as row 2. The former simulation — `position: fixed` + a `--dock-total` padding-top reservation + a load-bearing `z-dock` — retired together: no card can composite over the dock BY CONSTRUCTION, and the paint order no longer depends on any z-index chain. Portaled menus keep their own chrome z.

Layout tokens (style.css `:root`):

- `--dock-inset` (1rem mobile, 0.5rem ≥1024 px) — the shell's top padding (the band's breathing room).
- `--dock-h` — the dock band's `min-height` floor; `--dock-gap` — the DESIGNED gap between the two bands (the grid row-gap). (`--dock-total` died with the padding reservation at T-31.)
- `--content-max-h: 100%` — the cap on the pane container; the scene band's own height is the honest base (row 2 resolves it by construction), with the desktop/ultra-wide designed clamps overriding.
- `--pane-min: 25rem` / `--pane-max: 32rem` / `--pane-gap: clamp(0.5rem, 1.25vw, 1.618rem)` — the pane clamp ladder (R.W3 Lane A / A4; the 44/30 → 32/25 re-cut is **S FINAL.md Ruling #1** "card width ~1/3 smaller", landed `52c5fd4`). The GRID owns the clamp: `.pane-container` is `max-width: min(100vw − 2·--app-padding-x, 2·--pane-max + --pane-gap)` and the dual grid is `repeat(2, minmax(var(--pane-min), 1fr))` — cards grow fluidly 1024→1536 then clamp, equal columns always. **Pane shells never self-clamp** (`w-full` only; the 10 `lg:max-w-desktop-pane` forks are deleted). No per-width media staircase.
- `--menu-min-w: 11rem` — shared dropdown/select panel width (collapsed from 5 ad-hoc widths at A.W7).

**The aspect law.** The desktop grammar (dual grid, tight dock, capped content height) fires on `(min-width: 1024px) and (min-aspect-ratio: 1.1)` — width AND landscape. A portrait tablet ≥ 1024px wide runs the single-slot mobile grammar; App.vue's `isDesktop` breakpoint shares the same compound query so JS mount and CSS grid can never disagree (the `.pane-slot-mobile` exception rule covers the CI-pinned width-only `lg:hidden` witness on the portrait band).

**Container queries.** The pane slot wrappers (`.pane-wrapper`) are `container-type: inline-size`; in-card sizing rides `cqi` (e.g. the picker card's `px-[clamp(0.75rem,4cqi,1.5rem)]` gutters), never `vw` — structurally immune to the viewport-variant kill class. Display type rungs are the named exception (viewport-fluid `clamp()`s by design).

Consumer sites (post-D.W4 Lane A surfaces these as utilities — `min-w-menu` etc.; the `top-dock-inset` bridge died with the fixed overlay at T-31):

| Token | Consumed at | Idiom |
|---|---|---|
| `--dock-inset` | `.app-layout` padding (style.css) | direct CSS — the shell owns its band inset |
| `--pane-min` / `--pane-max` / `--pane-gap` | `.pane-container` (style.css) | direct CSS — the grid owns the clamp |
| `--menu-min-w` | every DropdownMenuContent + SelectContent | `min-w-[var(--menu-min-w)]` |
| `--content-max-h` | `.pane-container` (style.css) | `max-h-[var(--content-max-h)]` |
| `--dock-h` / `--dock-gap` | `.dock-band` min-height / `.app-layout` row-gap (style.css) | direct CSS — the band grid owns them |

The pane-shell layout (`panes/PaneHeader.vue` + `.pane-container` / `.app-layout` in `style.css`, driven by the pane clamp ladder + `--dock-inset` tokens above) is the live visual-hierarchy reference for the app viewport: a title-row + scroll-faded content region that every pane (`BrowsePane`, `ExtractPane`, `MixPane`, …) composes. It is type-clean and reduced-motion-correct (the WebGL RAF loops fence on `prefers-reduced-motion` in their composables — see the §Reduced-motion carve-out above).

## § Idioms NOT used (anti-patterns)

Explicit. A change-list reviewer should flag any of these.

- **No `:deep()` for shadcn internals** — use role/label selectors or `data-*` attributes. (`PaletteCard.vue`'s `.featured-badge :deep(svg)` is the post-D.W4 Lane A survivor, scoped to the badge wrapper — no further `:deep()` reaches into reka-ui markup.)
- **No numeric `z-[NN]` literals** in `demo/@/components/custom/` or `demo/color-picker/` — route through `--z-*` tokens via `z-dock`, `z-popover`, etc. Tailwind utilities (post-Lane A) or `z-[var(--z-popover)]` arbitrary reach.
- **No `100vh`** — use `100dvh` for mobile-safe viewports. The dock-band math depends on this; `100vh` would clip on iOS Safari with the URL bar collapsed.
- **No hand-rolled Alert** — consume `Alert` / `AlertTitle` / `AlertDescription` from `@components/ui/alert`, which re-exports glass-ui's primitive (B.W2 idiomatic-gestalt finding N1). The barrel exists for ergonomics; the implementation is upstream.
- **No magic `[var(--…)]` reaches when a Tailwind utility exists** — post-D.W4 Lane A, ~43 sites collapse to first-class utilities (`z-dock` instead of `z-[var(--z-dock)]`, `duration-fast` instead of `duration-[var(--duration-fast)]`, `rounded-input` instead of `rounded-[var(--radius-input)]`). Truly-bespoke residuals (≤ 5) carry an inline rationale.
- **No `button:has(> .lucide-x)` or similar markup-coupled selectors** — use role/label or a stable `data-*` (Lane A fix in `PaletteDialog.vue`).
- **No parallel `design-idioms.css`** — tokens live in `style.css :root` + the glass-ui-published surface; recipes stay colocated in their components' `<style scoped>` blocks. A second CSS file would create a cascade-order split-brain (glass-ui DESIGN.md §Token Architecture → Feature token home rule warns against the same shape; research/Df-styling.md §6 settled the verdict).
- **No new global utility class for one consumer** — colocate to the component's `<style scoped>` (post-D.W4 Lane A: `.pane-scroll-fade`, the touch-gate cluster, `.palette-tab-content`, `.palette-card-grid` moved out of `style.css`). The shared survivors (`.slug-pill`, `.app-layout`, `.pane-container`, `.underline-tabs`) are true cross-feature recipes; each carries a comment justifying its global residence.
