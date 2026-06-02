# WC — Typography & Color/Theme Refinement Spec

**Repo/App:** `/Users/mkbabb/Programming/value.js/demo` — color.babb.dev color-picker / palette browser / remix surfaces.
**Lens:** Typography & color/theme cohesion.
**Status:** SPEC ONLY — no app src edits, no builds, no git. Refinement of an existing, stable glass-ui consumer.

---

## 0. Method & grounding

Per the frontend-design methodology: a BOLD intentional direction, distinctive typography, dominant-tone-with-sharp-accent color, one orchestrated page-load over scattered micro-interactions, atmosphere over flat fill. This is REFINEMENT — the app already self-hosts a characterful pairing and threads the live picked color through accents. The gap is **register**: the app owns the world's most expressive palette engine yet renders its hierarchy at `text-heading` (φ, 25.9px) and its hero numerals at raw `text-4xl`, while glass-ui ships a φ-ladder that runs to `text-display-audacious` (352px) and a Fraunces display face that is currently used almost nowhere as DISPLAY.

Every recommendation is grounded in a real file:line + the specific glass-ui primitive it should reach for.

### What the app already gets right (preserve)

- **Self-hosted characterful pairing.** `@/styles/style.css:28-30` maps `--font-display`/`--font-serif` → **Fraunces** (a wonky, optical-sizing serif — not Inter, not Space-Grotesk) and `--font-mono` → **Fira Code**. This is a genuinely distinctive, on-brand choice for a color-science tool. Do NOT change the families.
- **Live color → accent threading.** The picked color is woven through the UI as `cssColor`/`cssColorOpaque`/`safeAccent` (e.g. `ColorSpaceSelector.vue:16`, `DockViewSelect.vue:55,78`, `PaletteSlugBar.vue:48`, `CurrentPaletteEditor.vue:66`, `PaletteDialog.vue:28`). `useContrastSafeColor` (App.vue:139) guards legibility. This is the app's signature move — a content-reactive palette, the opposite of timid-purple-on-white.
- **Dark mode is first-class.** `useGlobalDark()` is initialized eagerly (App.vue:116), `.dark` retunes shadows/popover/border/input intentionally (`style.css:179-189`), and a flash-free opaque-bg is persisted to localStorage (`useAppColorModel.ts:75-79`).
- **Cartoon-offset shadow language.** `--shadow-cartoon` 8px hard offset (`style.css:78-81`) gives the surfaces a bold pop-art identity distinct from glass-ui's soft default.

### The core diagnosis

The hierarchy is **generic-flat where it could be distinctive-dominant**. Type usage is overwhelmingly small/mono — `text-mono-small` ×68, `text-small` ×50, `text-caption` ×34 (grep across `*.vue`) — and the DISPLAY tier is nearly unused: `text-display` appears once, `text-hero`/`text-mega` zero times. The tool's emotional subject (COLOR) never gets a poster moment. The picked color drives accents but is never bound to glass-ui's `--primary` or `--section-color-*` tokens, so the component-level color system runs on a static palette underneath the hand-threaded accents.

---

## AESTHETIC DIRECTION

**"Color is the headline."** An editorial, gallery-wall direction where the picked color is not a swatch beside the controls — it IS the typographic subject. Fraunces, currently a quiet body/label face, is promoted to genuine DISPLAY at the φ-ladder's upper rungs and **inked in the live color itself**. The cartoon-offset shadow + Fira Code mono + wonky-serif display already read as "a precise instrument with personality"; the refinement pushes contrast HARD — a dominant live-color display register, refined mono data rows, and a single orchestrated page-load — so the chrome recedes and the color dominates. Dark mode stays first-class: every new register reads off tokens that already invert.

---

## TOP 5 REFINEMENTS  (surface → glass-ui lever)

### 1. Promote the color readout to a live-inked DISPLAY register — the headline moment
**Surface:** `ColorComponentDisplay.vue:3` (`text-4xl`, raw Tailwind, off-ladder, statically colored) and `ColorSpaceSelector.vue:16-17` (`text-title sm:text-display`).
**Lever:** Replace `text-4xl` with the φ-ladder **`text-display`/`text-display-2`** utility (typography.css:245-265) so the hero numerals join the golden-ratio scale and inherit `font-optical-sizing: auto` + Fraunces `WONK 1` variation, and ink them in the live color: `:style="{ color: safeAccent }"` (the contrast-safe channel already computed at `App.vue:139` and consumed at `ColorSpaceSelector.vue:16`). For the numeric channels, add `font-variant-numeric: tabular-nums` (glass-ui ships `.tabular-nums`, typography.css:463) so values don't jitter as you drag a slider. This is the single highest-impact change: the number you are editing becomes a large, optically-sized, live-colored Fraunces display — the tool's defining image.
**Why:** Currently the most important element on the picker pane is a generic `text-4xl` in foreground gray. The app has the live color AND the display ladder AND a contrast guard — it just isn't spending them on the hero.

### 2. Bind the picked color to `--primary` and `--section-color-*` — unify accents on one source
**Surface:** The accent threading is hand-wired per-call-site as `:style` (`PaletteSlugBar.vue:48`, `DockViewSelect.vue:55,78`, `AdminUsersPanel.vue:61,128`, `CurrentPaletteEditor.vue:66`, …) — ~15+ sites each re-injecting `cssColorOpaque`/`safeAccent`. `--primary` is never set from the picked color (grep: zero `--primary:` writes in demo src), so glass-ui's own `--primary`-driven component states (button `primary`, focus rings, `--active-tab-color` default at `style.css:197`) run on the STATIC default palette beneath the hand-threaded accents — a quiet incoherence.
**Lever:** In a small composable (sibling to `useContrastSafeColor`, App.vue:139), write the contrast-safe accent to the document root once per color change: `el.style.setProperty('--primary', safeAccentHsl)` (HSL-channel form per glass-ui convention, CLAUDE.md "Color palette as HSL channels") and optionally seed `--section-color-1..3` from palette members. Then the dozens of per-site `:style="{ color: safeAccent }"` become `text-primary` / `border-primary` and glass-ui's `primary` button variant, focus-ring, and underline-tabs default all light up in the live color FOR FREE. Dark mode inherits automatically — `--primary` already participates in the `.dark` cascade.
**Why:** Turns a scattered hand-threaded accent into ONE token write that the whole glass-ui component layer already consumes. Less code, more cohesion, and the "dominant color" the methodology asks for becomes literal — the picked hue dominates every interactive state, not just bespoke spans.

### 3. Give panes a section-label + display-title masthead instead of a lone `text-heading`
**Surface:** `PaneHeader.vue:3-6` renders a single `text-heading` (φ, 700) title + a `text-caption` description; `AboutPane.vue:27` uses `text-title`. There is no eyebrow/kicker, and the title tops out one rung below the display register.
**Lever:** Adopt glass-ui's **`.section-label`** (typography.css:454-460 — Fira Code, uppercase, `--type-tracking-caps`, `--muted-foreground`) as a mono eyebrow ABOVE the title, and lift the title itself to **`.text-pane-title`** (typography.css:437-451 — the responsive Fraunces display clamp glass-ui ships expressly for this), keeping the existing scroll-shrink keyframes (`PaneHeader.vue:78-85`) but retargeting them from `--type-heading`→`--type-prose` to `--type-display-2`→`--type-subheading`. Result: every pane opens with a mono kicker + a true Fraunces display masthead — editorial register, not dashboard register — and the eyebrow gives the mono face a structural job instead of only labeling data.
**Why:** The mono/serif/display three-voice contrast is the whole point of the pairing; right now mono and serif both whisper at caption/small size and display never speaks. A `section-label` → `text-pane-title` masthead makes all three voices audible and distinct.

### 4. Orchestrate ONE staggered page-load over the pane masthead + first data rows
**Surface:** Transitions today are per-pane SLIDE only (`App.vue:243-281`, `.pane-left/right`) — good for navigation, but the FIRST paint has no orchestrated reveal; `viewManager.ready` gates the slide name but nothing staggers in. `.char-stagger` (typography.css:468-471) ships in glass-ui and is unused.
**Lever:** On initial mount, stagger the masthead in: `section-label` → `text-pane-title` → the color readout → the first control row, each with `animation-delay` stepped ~60-90ms (glass-ui's `--duration-*`/`--spring-*` tokens, already consumed at App.vue:229-231). Use glass-ui's `useStaggerReveal`/`useSpringOrchestrator` motion composables (root barrel, `motion/` sub-tree) rather than hand-rolled `transition` declarations, or apply `.char-stagger` to the pane title for a per-glyph Fraunces reveal. One orchestrated entrance beats the current scatter of independent slide/scroll-timeline effects.
**Why:** The methodology weights "one well-orchestrated page load > scattered micro-interactions." The app has the composables and the spring tokens — it just doesn't spend them on the first impression, which is where a color tool earns delight.

### 5. Lift the palette-card and swatch surfaces into the display/color cohesion
**Surface:** `PaletteColorStrip.vue` renders pure color bands with NO type (fine), but palette cards (`PaletteCardGrid.vue`, `PaletteCardSwatches.vue`) and the slug pill (`.slug-pill`, `style.css:209-211` — `text-mono-small`) keep all labels at mono-small; the palette NAME never gets a display moment, so the browse wall reads as a uniform mono grid rather than a gallery.
**Lever:** Give each palette card's name **`text-subheading`** (Fraunces, typography.css:287-293) and on hover lift to `text-heading`, and ink the card's accent border/title from its OWN dominant swatch via the same `--primary` mechanism as #2 (set `--primary` per-card from the palette's first color). Keep the mono register for metadata (counts, dates, slugs) — the serif-name / mono-meta contrast is exactly the two-voice editorial split. Compose on glass-ui's `Card` `tier`/`shadow` props (already used at `AboutPane.vue:5`) so the cartoon shadow stays the unifying surface language.
**Why:** The browse surface is where "dominant color + sharp accent" should be loudest — a wall of palettes — yet it's the flattest, most uniform-mono surface in the app. Naming each palette in Fraunces and inking each card in its own color turns the grid into a gallery wall and reuses the #2 token machinery at zero marginal cost.

---

## Guardrails

- **Keep Fraunces + Fira Code.** They are distinctive and on-brand; the spec promotes their USE, never swaps the families. No Inter/Roboto/system, no Space-Grotesk.
- **Route everything through glass-ui tokens/utilities** (`text-display*`, `.text-pane-title`, `.section-label`, `.tabular-nums`, `--primary`, `--section-color-*`, `motion/` composables) — no raw `text-4xl`/ad-hoc font-size literals, no new bespoke `:style` color threading where a `--primary` write would do.
- **Dark mode parity is non-negotiable.** Every new register reads off `--primary`/`--foreground`/`--muted-foreground`/`safeAccent`, all of which already invert in the `.dark` cascade (`style.css:179-189`). `useContrastSafeColor` keeps live-inked display legible on both themes.
- **SPEC ONLY** — no app src edits, no builds, no git in this tranche step.

---

## FILE WRITTEN

`/Users/mkbabb/Programming/value.js/docs/tranches/J/design/WC-design-typo-color.md`
