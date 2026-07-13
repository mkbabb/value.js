# T lane · t-transitions-liquid — T-14: ALL card transitions onto the liquid-glass easing curves

**Lane class**: DESIGN (Fable, frontend-design bar) · **Finding**: T-14 (no owner shot — judged live)
**Probe substrate**: own dev server `:9377` (`VITE_API_URL=http://localhost:59999`, backendless),
Chromium via Playwright, light + dark, viewport 1440×900. All computed styles quoted are LIVE
reads off that build (glass-ui 4.2.0 via the `file:` symlink — the BG liquid tokens ARE resolvable
in the demo today: `--transition-liquid-spatial` computes to the `--spring-smooth` `linear()`).
**Reference register**: glass-ui `src/styles/tokens/scheme-spring.css` (the BG.W-LIQUID-WEIGHT-DEFAULT
interactive-spatial default + the AX.W52 §6 / motion-canon P1 spatial-vs-effects table + the
W-GLASS-CAL per-spring duration clocks) and `src/styles/glass/reveal.css` (the liquid-enter bloom).

---

## §0 The liquid family, stated once (what "our liquid glass easing curves" IS)

| Register | Token pair | Job (canon row) |
|---|---|---|
| Interactive spatial (hover/press scale, translate) | `--transition-liquid-spatial` (= `--spring-smooth`) @ `--spring-smooth-duration` 0.45s | the ONE button/interactive scale register |
| Press answer | `--spring-press` @ `--spring-press-duration` 0.16s | sub-200ms tap |
| Enter / arrival morph | `--spring-snappy` @ `--spring-snappy-duration` 0.4s (or `--spring-bouncy` @ 0.62s, emphatic) | mount, popover open, dialog in |
| Gooey size-morph | `--spring-dock` @ 0.66s, compositor transform only | collapse/expand, V↔H |
| EFFECTS (color/opacity/box-shadow) | `--ease-standard` / `--ease-out` @ `--duration-fast`/`--duration-normal` | a colour cross-fade on a spring reads as a wobble |
| Exit | bezier (`--ease-out`/`--ease-standard`), SHORTER than the enter, never overshoot | an exit must never overshoot past gone |

The two laws every finding below is judged against: **P1** (spatial = spring, effects = bezier)
and **the per-spring clock** (a normalized spring `linear()` front-loads — reaches ~0.5 by ~6%
of its clock REGARDLESS of ζ — so it must ride its OWN `--spring-<name>-duration`, never a
generic `--duration-*`; scheme-spring.css:108–129, the R10-2 lesson).

---

## §1 Findings

### F1 — The Tailwind bare-utility default is DEAD: every un-tuned `transition-*` runs a hard-coded 150ms flat bezier. The W3-5 alias silently lost the cascade. [P0 — this is the single biggest "not liquid" contributor]

- **Evidence (live)**: probe elements with `transition-shadow` / `transition-transform` /
  `transition-all` ALL compute `transition-duration: 0.15s`, `timing-function:
  cubic-bezier(0.4, 0, 0.2, 1)` — not the aliased `--duration-fast` (0.2s). Even producer
  components consumed via Tailwind utilities inherit it (`.glass-slider` root computes 0.15s flat).
- **Evidence (CSSOM walk)**: two declarations of `--default-transition-duration` exist:
  `@layer theme { :root { --default-transition-duration: var(--duration-fast) } }`
  (demo `style.css:119`, the S.W3-5 alias) and
  `@layer components { :root { --default-transition-duration: 150ms } }`.
- **Root cause**: glass-ui's own dist wires `@import "./components.css" layer(components)`
  (`glass-ui/dist/styles/index.css:1`), and `dist/styles/components.css` opens with the
  Tailwind-emitted `:root { … --default-transition-duration: 150ms;
  --default-transition-timing-function: cubic-bezier(0.4,0,0.2,1); … }`. Layer order
  `theme < components` → the producer's compiled literal out-cascades the consumer's `@theme`
  alias. The demo's W3-5 retune (style.css:112–120) has been a no-op since the glass-ui styles
  import landed in this shape.
- **Blast radius**: 37 files / ~46 bare `transition[-*]` callsites in `demo/@/components/custom`
  (census: grep, no `duration-*`/`ease-*` modifier) — every card shadow-hover, icon fade, and
  scale-hover in the demo runs the 150ms un-tokened default. The owner's "card transitions not
  liquid" reads directly onto this: 150ms flat is the generic-web register.
- **Owner**: **joint (producer-root)**. Packet row **PKT-1**: the dist theme emission must alias
  its own `--default-transition-duration`/`--default-transition-timing-function` onto the house
  tokens it already owns (`var(--duration-fast)` / `var(--ease-standard)`) — one `@theme` line at
  the producer root; alternatively carve the two keys from the compiled `:root` emission. NO
  demo-side workaround (a `@layer components`-or-later re-declare in the demo is a cascade arms
  race — E-3 rejects it); the demo's existing `@theme` alias becomes live again the day the
  producer stops clobbering it.

### F2 — The pane/view swap snaps: the spring curve rides a squeezed generic clock, and the exit outlives the enter (collision mid-flight)

- **Evidence (computed)**: `.pane-wrapper--left > .vj-enter-enter-active` = `opacity 0.3s
  cubic-bezier(0,0,0.2,1), transform 0.3s linear(--spring-smooth …)` (the App.vue:393–398 W3-5
  re-time); leave = `opacity 0.2s, transform 0.3s cubic-bezier(0.4,0,1,1)` (accelerate).
- **Evidence (by eye, mid-flight frames)**: `scratchpad/swap2-60ms.png` — at 60ms of the 300ms
  clock the INCOMING gradient card is already ~90% seated while the OUTGOING picker card is still
  fully opaque exiting top-left and the old About pane co-occupies the right slot: four plates on
  screen, reading as collision, not handoff. `swap2-130ms.png` — by 130ms everything is seated;
  the remaining ~170ms of clock is dead air.
- **Root cause**: two-fold. (a) The W3-5 retune kept `--spring-smooth` but re-timed it onto
  `--duration-normal` — the exact normalized-spring-on-generic-clock anti-pattern the producer's
  per-spring-clock doctrine names (spring linear() reaches ~0.5 by ~6% of ANY clock → all visible
  travel inside the first ~60ms → snap, then idle). (b) The leave leg runs a full 0.3s
  ACCELERATE bezier — the outgoing pane hangs at full presence longest exactly when the incoming
  pane arrives (simultaneous mode co-mounts them), inverting the liquid weighting (incoming
  instant, outgoing lingering).
- **Owner**: **demo** (curve/clock pairing) + **producer** (PKT-2, the missing register — see below).
- **Cure direction (gestalt)**: the swap is a SPATIAL travel and must ride a spring at the
  spring's OWN clock. Either (i) `--spring-snappy` @ `--spring-snappy-duration` (0.4s true
  settle; the §6.2 "~0.3s" budget number is then retired as the un-owned arithmetic it is — the
  budget's INTENT was "no dead tail", which the per-spring clock satisfies by construction), or
  (ii) if the ~0.3s wall stands, a NEW producer preset cut from the regen script (a (response, ζ)
  pair whose OWN settle ≈0.3s — **PKT-2**: the family has a hole between press 0.16s and snappy
  0.4s). The exit re-times to `--duration-fast` `--ease-out` (shorter than the enter — the canon's
  exit law) so the outgoing plate is gone before the incoming plate's overshoot lands; the
  existing one-frame deferral (PaneSlot W3-4) already provides the stagger seam.

### F3 — The demo's cards do not speak the producer's card motion grammar at all: shadow-only hovers, spatial-on-bezier scale hovers

- **Evidence**: `PaletteCard.vue:19` — root card is a hand-rolled div:
  `… shadow-cartoon-sm transition-shadow hover:shadow-cartoon-md …` = a box-shadow-only hover at
  the dead 150ms default (F1); NO spatial leg (no lift, no peel, no press). Meanwhile the
  producer's cartoon register (`glass-ui/src/styles/cards.css:317–366`, BD.W-CARTOON-CASTER) is a
  choreography: `translate`/`scale` on `--ease-cartoon-punch` @ 0.3s (volume-preserving peel
  `scale: 1.015 0.985`), shadow on `--ease-standard`, `:active` squash `1.04 0.94`, and the
  lagging ink-caster child (~1.15× clock — follow-through). Live probe on `#/about`: zero
  `.cartoon-surface` elements in the whole demo DOM.
  Spatial-on-bezier strays of the same class: `CurrentPaletteEditor.vue:68,71,93`
  (`hover:scale-110` via `transition-all`/`transition-transform` @ 150ms flat),
  `ComponentSliders.vue:338` (`.channel-rail-item` transform 0.2s `--ease-standard`, hover scale
  1.08), `ColorInput.vue:327` (send-btn transform on `--ease-standard`),
  `ColorPicker.vue:341` (`.pane-shell` transform 0.3s `--ease-standard`).
- **Root cause**: the cards were authored before the producer's BD/BG card-motion work landed and
  never re-consumed; the interactive atoms (`.interactive-item`, `btn-interactive`, `.tap-squish`)
  that inherit `--transition-liquid-spatial` by default were likewise never adopted on these
  surfaces. The demo re-implements card-ness as static utilities.
- **Owner**: **demo** (consume gap — `feedback_glass_ui_first_class.md` + E-2 both bind:
  component-level motion at the root, in glass-ui or via its atoms).
- **Cure direction**: ONE card material decision (this is the same architectural seam T-3/T-11/
  T-18/T-24 pull on): the demo's cards become glass-ui `<Card surface="cartoon">` (or carry
  `cartoon-surface` + tier) so hover-lift/press-squash/caster arrive from the root register;
  every interactive scale leg in the demo rides `--transition-liquid-spatial` @
  `--spring-smooth-duration` by consuming the producer's interactive atoms, never a per-site
  `transition-transform` utility. The two-channel law is then structural: spatial = spring
  (inherited), effects = bezier (the F1-cured default).

### F4 — Layout-property "morphs" fake the liquid: `max-height` in two of the three families, `grid-template-columns` in the dock slot

- **Evidence**: `animations.css:104–139` (`vj-morph`) and `:142–166` (`vj-celebrate`) carry
  `max-height var(--duration-normal) var(--ease-decelerate)` legs with `overflow: hidden`
  (geometry seams `--vj-morph-collapse/-expanded`); `Dock.vue:295–305`
  `.action-bar-toggle-slot.is-live` transitions `grid-template-columns 0.3s var(--ease-standard)`.
- **Root cause**: height/track animation was the only collapse idiom available when the families
  were cut (R.W4); the producer has since codified P5 — size/morph is a COMPOSITOR transform,
  never an animated width/height (scheme-spring.css §6 table; the goo-morph dwell family is the
  card-plate exemplar).
- **Why it matters for T-14**: a layout-driven collapse re-layouts every frame — the jitter arm
  of §0.3's "too jittery" on any swap that co-fires one — and a `max-height` ease can never
  overshoot, so these "morphs" are constitutionally spring-less: the family is liquid in name,
  bezier-boxed in fact.
- **Owner**: **joint** — demo (the family definition) + producer (**PKT-3**: no generic
  compositor collapse/expand recipe exists in glass-ui; the goo-morph trio is consumer-specific
  by `tokenPrefix`. Ask: a blessed collapse primitive — scale-with-counter-scale or
  interpolate-size/`calc-size()` guidance — the families can key).
- **Cure direction**: the families keep their names and consumers; the collapse channel is
  re-cut on the producer recipe once PKT-3 answers; the dock slot rides the same or the
  `--spring-dock` morph grammar. No per-site fixes.

### F5 — Skeleton→content is a hard cut, and the skeleton stagger seams are dead vars

- **Evidence**: `BrowsePane.vue:29–38,107–112` and `PaletteBrowseTab.vue` swap
  `PaletteCardSkeleton` ↔ cards on bare `v-if` — no `<Transition>`, no family: content POPS.
  `PaletteCardSkeleton.vue:42–69` sets `--skeleton-shimmer-delay` per block (the L9 stagger),
  but grep over `glass-ui/src/` finds ZERO reads of `--skeleton-shimmer-delay`/`-tint` — the
  producer shimmer never consumed the seam (letter L9 persists; the comment in the SFC even says
  "goes live the day glass-ui's shimmer reads them").
- **Owner**: **demo** (the swap) + **producer** (**PKT-4**: shimmer reads the delay/tint seams).
- **Cure direction**: developing→content is "ONE surface, NEW content" — it keys `vj-morph`
  (out-in on the grid container or per-card `TransitionGroup` with `.vj-morph-move`), so the
  plates SETTLE onto the grid on the snappy spring instead of popping; the skeleton's last
  shimmer sweep hands off into the enter (one clock, no double-flash).

### F6 — What is ALREADY liquid (the keep set — do not re-litigate at implementation)

Live-verified canon-conformant; the retune table must not touch these except where noted:

- `vj-morph` enter transform: 0.4s `--spring-snappy` @ its OWN clock — correct.
- `vj-celebrate` enter transform: 0.62s `--spring-bouncy` @ its own clock — correct.
- `vj-enter` (un-scoped consumers: overlays, toolbars, list items): transform 0.45s
  `--spring-smooth` @ `--spring-smooth-duration` — correct (only the pane-wrapper OVERRIDE, F2,
  broke the pairing).
- Dialog/Sheet/Popover/Select/Tooltip/HoverCard/DropdownMenu — ALL glass-ui re-exports
  (`demo/@/components/ui/*/index.ts`); the dialog bloom computes `scale/translate/opacity/filter
  0.4s` on `--spring-snappy` + `--ease-out` (`.glass-reveal`, live probe) — the liquid-enter
  reference itself. The forthcoming BH motion axis (`motion`/`springPreset` on DialogContent)
  supersedes per-dialog tuning; the demo should stay preset-default.
- Producer dock: icon buttons `scale 0.45s spring-smooth` + effects beziers; punch-stretch on
  `--ease-cartoon-punch`; segmented tabs indicator `inset/scale 0.4s spring-snappy`. All BG-true.
- `.atmosphere-canvas` arrival (App.vue:326–332): opacity 0.45s decelerate — EFFECTS fade,
  canon-fine (quality judged by T-1/T-25 lanes, not this one).
- PRM: the global reduce guard (animations.css:184–212) + the producer's `:root` PRM re-aliases
  (`--transition-liquid-spatial` → `--ease-standard`) — the vestibular floor holds end-to-end.

### F7 — Minor coherence rows (single-clock moments, curve/clock mismatches)

1. `GradientStopEditor.vue:227`: `transform var(--duration-normal) var(--ease-spring)` —
   spring-snappy CURVE on the generic 0.3s clock (the F2 anti-pattern in miniature) →
   `--spring-snappy` @ `--spring-snappy-duration`.
2. `PaletteDialog.vue:310`: scrim `backdrop-filter/background/opacity 0.55s ease-standard` vs the
   content bloom's 0.4s — two clocks on one open moment; the scrim joins the bloom clock (or the
   producer scrim token once BH lands).
3. `DockViewSelect.vue:154`: `--accent-view 0.55s ease-standard` — EFFECTS on bezier = correct
   channel; 0.55s (`--duration-panel`) is a deliberate stately sweep (W7-4). Design call: keep,
   but state it in the motion table so it stops reading as a stray.
4. `ImageEyedropper.vue:251`: canvas transform fast/decelerate — position-tracked, canon row
   "tracked = bezier" — keep.

---

## §2 The per-transition retune table (the spec the wave implements)

| # | Transition (site) | Current (computed, live) | Liquid target | Channel law |
|---|---|---|---|---|
| R1 | Bare-utility default (37 files) | 150ms `cubic-bezier(.4,0,.2,1)` (F1 clobber) | `--duration-fast` + `--ease-standard` via the RE-ARMED `@theme` alias (PKT-1 first) | EFFECTS default |
| R2 | Pane swap ENTER (`.pane-wrapper--* > .vj-enter-enter-active`) | transform 0.3s `--spring-smooth` (squeezed) | `--spring-snappy` @ `--spring-snappy-duration` (or the PKT-2 preset @ its own clock) | SPATIAL |
| R3 | Pane swap LEAVE | opacity 0.2s + transform 0.3s `--ease-accelerate` | opacity + transform `--duration-fast` `--ease-out` — exit strictly shorter than enter | EFFECTS/exit |
| R4 | Card hover (PaletteCard + kin) | box-shadow only, 150ms flat | producer cartoon register: translate/scale `--ease-cartoon-punch` @ `--duration-normal`, shadow `--ease-standard`, press squash + caster — via `<Card surface="cartoon">`/atoms, not utilities | SPATIAL+EFFECTS split |
| R5 | Interactive scale hovers (`channel-rail-item`, editor buttons, send-btn) | transform on `--ease-standard` @ 0.15–0.2s | `--transition-liquid-spatial` @ `--spring-smooth-duration` (inherit via the producer interactive atoms); press legs `--spring-press` @ 0.16s | SPATIAL |
| R6 | `vj-morph`/`vj-celebrate` collapse legs | `max-height` 0.3s decelerate (layout) | compositor collapse per PKT-3 recipe; curves unchanged | SPATIAL (P5) |
| R7 | Dock action-bar slot | `grid-template-columns` 0.3s `--ease-standard` | same PKT-3 compositor recipe or the `--spring-dock` morph grammar | SPATIAL (P5) |
| R8 | Skeleton→content (Browse, dialog tab, extract) | hard `v-if` cut | `vj-morph` settle (out-in / TransitionGroup + `.vj-morph-move`), shimmer hand-off; stagger via PKT-4 seams | SPATIAL enter |
| R9 | Gradient stop handle | snappy curve on 0.3s generic clock | `--spring-snappy` @ `--spring-snappy-duration` | SPATIAL |
| R10 | PaletteDialog scrim | 0.55s ease-standard | join the 0.4s bloom clock (one moment, one clock) | EFFECTS |
| R11 | `.pane-shell` nudge (ColorPicker.vue:341) | transform 0.3s `--ease-standard` | `--transition-liquid-spatial` @ `--spring-smooth-duration` | SPATIAL |
| — | KEEP set (F6) | already canon-true | no change | — |

## §3 Producer packet rows (for the E-2 request packets against current glass-ui + BG/BH)

- **PKT-1** (P0): dist `components.css` `:root` emission re-declares Tailwind's
  `--default-transition-duration: 150ms` / `--default-transition-timing-function` inside
  `layer(components)`, clobbering every consumer's `@theme` motion alias. Alias both onto the
  house tokens at the producer root (or carve from the emission). Evidence:
  `dist/styles/index.css:1` + `dist/styles/components.css:1`; consumer proof = this lane's F1.
- **PKT-2**: the spring family has a clock hole between `press` (0.16s) and `snappy` (0.4s); the
  pane-swap register wants a ~0.28–0.32s-settle preset (regen-spring-tokens.mjs row), else bless
  snappy@0.4s for view swaps and retire consumer clock-squeezes.
- **PKT-3**: no generic compositor collapse/expand recipe (the P5-true replacement for consumer
  `max-height`/grid-track morphs); the goo-morph dwell family is per-consumer. Ask the blessed
  primitive or a documented recipe.
- **PKT-4** (= letter L9, persists): `--skeleton-shimmer-delay`/`--skeleton-shimmer-tint` seams
  still unread by the producer shimmer (`grep` over `glass-ui/src/` = 0 hits; demo sets them at
  `PaletteCardSkeleton.vue:42–69`).

## §4 Method note

Live probes ran against a fleet-private `:9377` dev server (owner's `:9000` untouched; two other
fleet tabs `:9123`/`:9137` observed in the shared browser context — probes were pinned to
`:9377` by explicit page lookup). Backendless boot → Browse rendered the honest empty/error
registers, so PaletteCard hover was verified by census + the F1 utility probes rather than a
rendered card. Mid-flight captures (`swap2-60ms/130ms/220ms.png`, about/picker/palettes light +
dark) live in the session scratchpad; the computed-style quotes in §1 are the durable evidence.
