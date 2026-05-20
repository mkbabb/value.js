# Df — Styling audit + design idioms

**Tranche**: value.js D (planning).
**Lane**: Df.
**Mode**: research, read-only — no source edits, no commits.
**Directive (user)**: *"Audit for deeply nested or brittle selector usage … (1)
non-idiomatic Tailwind (2) monolithic/global stylesheet patterns (3)
deprecated/archaic CSS (4) fragile rules — magic numbers, brittle calc/min/max
chains, viewport-unit traps, z-index coupling, browser-specific breakage. Ensure
… a localized area that defines all of our design idioms — but still leverages
proper colocation. Ensure design cohesion within our chosen aesthetic."*

**Inputs surveyed**:
- `demo/@/styles/{style,animations,utils}.css` — 230 + 60 + 27 LOC.
- 30 `<style>` blocks across 28 component SFCs in `demo/@/components/custom/**`.
- `demo/color-picker/App.vue` `<style scoped>`.
- `demo/hero-lab/hero-lab.css` (356 LOC, kept verbatim since W.B2 — see DESIGN.md §Local Utilities).
- `demo/DESIGN.md`, `node_modules/@mkbabb/glass-ui/DESIGN.md` (the inherited design system).
- `tailwind.config.*` — **none present**; tokens flow through Tailwind v4 `@theme` blocks in `style.css` + glass-ui's imported `@theme`.

**Out of scope**: glass-ui itself (its `DESIGN.md` is the inherited token contract; we audit consumer drift, not provider). All recommendations preserve rendered styling unless flagged as design-cohesion drift.

---

## §1 Tailwind idiom findings

Tailwind v4 with `@theme` in `style.css`; no `tailwind.config.ts`. The codebase is broadly idiomatic but with a recurring **arbitrary-bracket reach into project tokens** that should be promoted to first-class theme keys.

### §1.1 Token-reach-via-bracket pattern (high frequency)

| Pattern | Count | Cause | Fix |
|---|---|---|---|
| `rounded-[var(--radius-input)]` / `rounded-[var(--radius-md)]` / `rounded-[var(--radius-sm)]` | 8+ sites | The radius tokens exist in glass-ui under `@theme` but the semantic radii (`--radius-input`, `--radius-md`, `--radius-sm`) are **not exposed as Tailwind utility names**. Consumers reach via arbitrary `[var()]` | Either (a) add `--radius-input` etc. inside the demo's own `@theme` block so Tailwind generates `rounded-input` utilities, or (b) consume `rounded-md` / `rounded-sm` which glass-ui already provides |
| `z-[var(--z-popover)]`, `z-[var(--z-controls)]`, `z-[var(--z-header)]`, `z-[var(--z-dock)]`, `z-[var(--z-bar)]` | 10 sites | The `--z-*` tier (glass-ui §Z-Index Stack) is not mapped to `z-popover`, `z-dock`, etc. Tailwind utilities | Add `--z-popover`, `--z-dock`, `--z-modal` to `demo` `@theme` (or upstream into glass-ui) so consumers write `class="z-popover"` not `class="z-[var(--z-popover)]"`. Net effect: 10 `[var()]` reaches collapse. |
| `duration-[var(--duration-fast)]` / `duration-[var(--duration-normal)]` | 14 sites | Same: `--duration-*` (glass-ui §Duration) not surfaced as Tailwind keys | Add `--animate-duration-fast: var(--duration-fast)` etc. inside `@theme` so `duration-fast` is a real utility |
| `top-[var(--dock-inset)]`, `min-w-[var(--menu-min-w)]`, `max-w-[var(--desktop-pane-max-w)]` | 11+ sites | The demo's own layout tokens never expressed as Tailwind utilities | Expose via `@theme` — `--spacing-dock-inset`, `--width-menu`, `--width-desktop-pane` |

**Verdict**: ~43 arbitrary-token reaches that would be 0 if the theme block surfaced the project's tokens as utility-class generators. This is the single biggest non-idiomatic pattern.

### §1.2 Magic-literal arbitrary brackets (lower frequency, more egregious)

| File:line | Class | Why | Suggested fix |
|---|---|---|---|
| `demo/@/components/custom/panes/BrowsePane.vue:26,34` | `min-h-[120px]` | Numeric magic; same value reused in `PaletteCardGrid.vue:4` and `PaletteBrowseTab.vue:6` | One token `--browse-skeleton-h: 7.5rem` (or just `min-h-30`) |
| `demo/@/components/custom/panes/ExtractPane.vue:9` | `min-h-[180px] max-h-[min(320px,40dvh)]` | Magic + nested CSS `min()` chain | Tokenize `--extract-canvas-h-min/max` |
| `demo/@/components/custom/palette-browser/AdminColorQueue.vue:8` | `max-h-[300px]` | Magic | Tokenize `--admin-scroll-h` |
| `demo/@/components/custom/palette-browser/VersionHistoryDrawer.vue:3` | `w-[380px] sm:max-w-[420px]` | Two magics; the only Sheet width customization site | Either accept as a panel-shape token or use glass-ui's `sm` / `md` sheet variant if one exists |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:5` | `max-w-[800px] … sm:h-[min(90dvh,820px)] sm:max-h-[90dvh]` | Magic + `min()` chain on dialog | Tokenize dialog dimensions or use glass-ui dialog variant |
| `demo/@/components/custom/palette-browser/PaletteCardMenu.vue:9` | `max-w-[180px]` | Magic | Drop in favour of `max-w-44` or `truncate` parent |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:150` | `max-w-[200px]` | Magic; **also duplicated** at `ColorInput.vue:41` (`TooltipContent`) | Single `--max-tooltip-w` token |
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue:8` | `w-[7rem]` | Magic that the GooBlob comment in `GooBlob.vue:69` documents as "the parent width" | Either accept (it's a deliberate hero size) or token `--blob-hero-w` |
| `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:9` | `h-[20dvh] min-h-24 max-h-40 lg:h-[14rem] lg:max-h-none` | Five clamp anchors inline; spread over breakpoints | Tokenize `--spectrum-h`, `--spectrum-h-lg`; keep `min/max` |
| `demo/color-picker/App.vue:58` | `transition-opacity duration-200` | Single hardcoded duration of `200ms` that escapes the `--duration-*` ladder | Use `duration-fast` (`200ms`) or `duration-normal` (`300ms`) once those utilities exist (§1.1) |

### §1.3 Inline `<style>` attributes that could be Tailwind

78 inline `style="…"` / `:style="…"` matches. Most are legitimate (consumer-set CSS vars like `--blob-color`, `--active-tab-color`, runtime gradient backgrounds, runtime computed colors), but a few are not:

| File:line | Issue | Fix |
|---|---|---|
| `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue:52` | `style="touch-action: none;"` — static | Use `touch-none` utility |
| `demo/@/components/custom/image-palette-extractor/ImageDropZone.vue:13` | `:style="{ transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-standard)' }"` — static | Promote to scoped class or (when §1.1 surfaces tokens) Tailwind utilities |
| `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:16` | `:style="{ … fontFamily: 'var(--font-display)' }"` — static | `font-display` utility (already exists via the `@theme --font-display`) |

### §1.4 `@apply` overuse

`Markdown.vue` `<style scoped>` (lines 68–375) has ~57 `@apply` invocations — by far the highest concentration. Each is short and tied to a markdown-element selector, so it's a legitimate "recipe via @apply" use; nothing to remove. **However** two declarations mix `@apply` with raw CSS (`ColorInput.vue:336` `@apply text-xs;` inside a non-recipe block; `style.css:218` `.slug-pill` recipe is one declaration). These are fine.

**No `@apply` underuse worth flagging.** The codebase predominantly prefers either inline Tailwind classes (idiomatic) or hand-written CSS in `<style scoped>` (idiomatic). The hybrid is rare.

---

## §2 Global stylesheet residuals

`demo/@/styles/style.css` (230 LOC) post-B:

### §2.1 Earned global surface

| Block | Status | Note |
|---|---|---|
| `@theme` (lines 6–13) | **keeps** — font + gold-pop-art accent tokens | required to flow into Tailwind |
| `:root` layout tokens (lines 31–67) | **keeps** — the dock-band / pane-container layout math is global by design | well-commented, dock geometry is a doc-class explanation |
| `@media` responsive token overrides (lines 70–83) | **keeps** | three media queries, narrowly scoped |
| `.app-layout` / `.pane-main` / `.pane-container` (lines 97–137) | **keeps** — these are the shell, no good colocation home | comments justify each line |
| `.dark` (lines 143–153) | **keeps** — the project's overrides of glass-ui dark defaults | well-commented |
| `@layer base` (lines 222–230) | **keeps** | universal `border-color` + body recipe; standard |

### §2.2 Residuals that should be colocated

| Block | Lines | Why move | Suggested home |
|---|---|---|---|
| `.underline-tabs button[role="tab"][data-state="active"]` | 160–163 | Demo-side reka-ui attribute-selector override; should die once glass-ui ships a Tabs `underline` variant (already marked `MARKER (A.W2)`); for now this is the right place but it's a known transitional residual | leave with sunset note; route to glass-ui Tabs variant (per `feedback_glass_ui_first_class.md`) |
| `.palette-tab-content` + `[data-state]` rules | 90–92, 166–180 | A `palette-browser` concern leaking into global | Could move into the `palette-browser/` subtree (PaletteDialog or a small `palette-tabs.css` colocated next to the consumer). **Caveat**: the rule targets reka-ui-generated `data-state` attributes, so a `<style>` block in `PaletteDialog.vue` would need to be unscoped (it already has one) — adding the rules there is feasible. |
| `.touch-gate-target`, `.touch-gate-active`, `.slider-track`, `.slider-thumb` | 183–204 | Touch-gate is a `color-picker` concern that bleeds into the global because the gate target is set on slider markup that lives across multiple components (`ComponentSliders.vue`, `SpectrumCanvas.vue`). The selectors reach into `:has(.slider-track)` which is markup-dependent | A `color-picker/touch-gate.css` colocated with `useTouchGate.ts` would be the right home. **Caveat**: the rules need to participate in the cascade with reka-ui's slider markup; the move is mechanical but requires verifying scoped-style stripping doesn't break the `:has()` reach. |
| `.pane-scroll-fade` | 209–212 | `panes/` concern. Used in BrowsePane/AdminPane/AboutPane/PalettesPane | Move into `panes/pane-scroll.css` colocated with PaneHeader (the consumer of the named scroll-timeline `--pane-scroll`) |
| `.slug-pill` | 217–219 | `palette-browser` concern (the comment says "shared across the dock menus, the admin users panel, and the slug bar"); the recipe is small and worth keeping shared | Acceptable global — it's a true cross-feature recipe. Alternatively promote to glass-ui as a Pill variant (per `feedback_glass_ui_first_class.md`) |
| `.palette-card-grid { contain: content; }` | 86–88 | Single-property containment hint for a single feature | Could colocate into `PaletteCardGrid.vue` |

**Verdict**: 4 colocation opportunities (`.palette-tab-content`, touch-gate cluster, `.pane-scroll-fade`, `.palette-card-grid`), 1 to upstream (`.slug-pill` → glass-ui Pill), 1 transitional (`.underline-tabs` → glass-ui Tabs `underline` variant). Estimated net reduction in `style.css`: ~40 LOC.

### §2.3 `utils.css` (27 LOC)

`.fraunces` and `.fira-code` font aliases (4 LOC apiece). With Tailwind 4 `@theme` exposing `--font-display` and `--font-mono`, the utilities `font-display` and `font-mono` exist — these `.fraunces`/`.fira-code` classes are duplicate vocabulary. Survey: usage of `.fira-code` is high in `ColorInput.vue` and `SearchFilterBar.vue`. Migration to `font-mono` is mechanical but ~30+ touch sites. **Defer** unless P2 cleanup.

`.section-subtitle` (lines 18–27) is the legitimate global recipe (a typography fragment shared by gradient/mix/generate control bars). Keep.

---

## §3 Deprecated/archaic CSS

### §3.1 Vendor prefixes — survey

```
demo/@/styles/utils.css:23-25                  -webkit-box / -webkit-box-orient / -webkit-line-clamp  → INTENTIONAL (Safari floor)
demo/@/components/.../ColorInput.vue:279,283   -webkit-mask-image                                      → INTENTIONAL (Safari ≤17 mask-image gap)
demo/@/components/.../PaletteControlsBar.vue:159 -webkit-mask-image                                   → INTENTIONAL (same)
demo/@/components/.../PaletteDialogHeader.vue:73-74,104-105  -webkit-background-clip:text / -webkit-text-fill-color:transparent
demo/@/components/.../PaletteCard.vue:381-382                -webkit-background-clip:text / -webkit-text-fill-color:transparent  (gold shimmer)
demo/hero-lab/hero-lab.css:68,87,110,137,210                -webkit-backdrop-filter
```

**Assessment**:
- `-webkit-line-clamp` + `display: -webkit-box`: still required floor for Safari (the unprefixed `line-clamp` ships but the `display: -webkit-box` is the activation switch; the comment in `utils.css` documents this). **Keep.**
- `-webkit-mask-image`: Safari shipped unprefixed `mask-image` in 16.4 (Mar 2023); the prefix is **no longer needed** in our support floor (the demo targets modern Chromium + Pixel-7 Chrome + iOS Safari 17+). Two sites: `ColorInput.vue` and `PaletteControlsBar.vue`. **Removable** but low-impact; defer to P3.
- `-webkit-background-clip:text` + `-webkit-text-fill-color:transparent`: still required — `background-clip: text` (unprefixed) is supported but the `text-fill-color` mechanism only works through `-webkit-text-fill-color`. **Keep.**
- `-webkit-backdrop-filter` in hero-lab: Safari supports `backdrop-filter` unprefixed from 18 (Sep 2024). For an iOS-Safari-17 floor, **keep**; for an iOS-Safari-18 floor, removable. Borderline; defer to P3.

**No truly archaic CSS** (no `progid`, no `-moz-`, no `-ms-`). The prefix discipline is well-curated.

---

## §4 Fragile-rule findings

### §4.1 `calc()` chains remaining (post-B.W1 `--dock-pos` retirement)

| Chain | Site | Risk | Verdict |
|---|---|---|---|
| `--dock-h: calc(var(--size-icon-btn) + var(--dock-padding-y) + var(--dock-border-width))` | `style.css:57` | 3 inputs, all tokens. Geometry-pure. | **keep** |
| `--dock-total: calc(var(--dock-inset) + var(--dock-h) + var(--dock-gap))` | `style.css:60` | 3 inputs, all tokens. | **keep** |
| `--content-max-h: calc(100dvh - var(--dock-total) - 1rem)` | `style.css:61` | viewport-relative — already uses `dvh` (correct for iOS). One literal `1rem` (bottom inset). | **keep**, well-commented |
| `--content-max-h: clamp(34rem, 86dvh, 52rem)` desktop / `clamp(30rem, 62dvh, 38rem)` ultra-wide | `style.css:74, 80` | `clamp()` — three magic numbers per | acceptable, documents responsive intent |
| `max-width: calc(var(--desktop-pane-max-w) * 2 + var(--desktop-pane-gap) + 2rem)` | `style.css:124` | 3 tokens + `2rem` literal (padding accommodation). The `2rem` is `.app-layout`'s `padding: var(--dock-total) 1rem 0.5rem` left+right (1rem×2). Coupled to `.app-layout` padding | **fragile coupling**: if `.app-layout`'s 1rem horizontal padding ever changes, this chain silently miscomputes. Recommend tokenising `--app-layout-padding-x: 1rem` and using `calc(… + var(--app-layout-padding-x) * 2)` |
| `mask-image: linear-gradient(to right, black calc(100% - var(--input-action-width)), transparent 100%)` | `ColorInput.vue:278` | 1 input | **keep** |
| `mask-image: linear-gradient(…, black var(--mask-pad), black calc(100% - var(--mask-pad)), transparent)` | `PaletteControlsBar.vue:158` | 1 input | **keep** |
| `max-h-[min(320px,40dvh)]` | `ExtractPane.vue:9` | nested `min()` in Tailwind bracket | tokenize §1.2 |
| `sm:h-[min(90dvh,820px)]` | `PaletteDialog.vue:5` | nested `min()` in Tailwind bracket | tokenize §1.2 |
| `linear-gradient(… hsl(calc(var(--hue) * 1deg), 100%, 50%))` | `MiniColorPicker.vue:162` | 1 input | **keep** |

**Total surviving calc()/min()/max()/clamp() chains in styles**: ~12 (style.css 4, components 6, hero-lab 2). All but the `pane-container` max-width chain are well-justified.

### §4.2 Viewport-unit traps

`100vh` literal: **zero** matches (`100dvh` is used in `style.css` and `hero-lab.css` consistently). Post-iOS-Safari fix history confirmed. **Clean.**

`dvh` usage: `100dvh` (4 sites), `86dvh`, `62dvh`, `40dvh`, `35dvh`, `90dvh` — all dynamic viewport. **Clean.**

### §4.3 z-index hard-codes

**Zero literal numeric z-index** in component CSS or Tailwind classes (besides `z-0` and `z-10` — both Tailwind tokens, not arbitrary literals). All `z-index:` declarations route through `var(--z-*)` tokens (10 sites in scoped CSS, 10 sites via `z-[var(--z-…)]` Tailwind brackets). **The B.W2 z-tier migration is intact.** Only opportunity: §1.1 — surface the tier as Tailwind utility names so the 10 `z-[var()]` brackets become `z-popover` etc.

Two `z-0` / `z-10` literals to note:
- `GradientStopEditor.vue:128` — `z-0` (the default; cosmetic explicitness)
- `ColorPicker.vue:4` — `z-10` (stacking context anchor for `CardHeader`; arbitrary numeric)

Both are inside a single stacking context and don't compete with the tier; leave or migrate to `z-content` (= 10) once tokenised.

### §4.4 Magic-number CSS literals (in `<style scoped>`)

`PointerDebugOverlay.vue` (lines 218–447) is the largest concentration: ~30 magic literals (px sizes, rgba colors, `#hex` colors). The entire stylesheet is hand-tuned to a fixed dev-only debug aesthetic and explicitly **opts out of the design system** (custom monospace stack, hard-coded blacks, fixed pixel sizes for compact density). **Verdict: acceptable** — this is a dev-only diagnostic surface that should not consume the design language. Optional: add a top-of-file comment noting the opt-out.

Other instances are minor: `bottom: 8px`, `top: 50%`, `padding: 0.25rem`, etc. — geometry/centering primitives that don't benefit from tokens.

---

## §5 Brittle selectors

### §5.1 `:deep()` chains

**One** match across the entire codebase: `PaletteCard.vue:386` `.featured-badge :deep(svg)`. This reaches into a lucide-vue icon's `<svg>` root — narrow, single-element, low risk. **Keep.**

### §5.2 ID selectors

Zero CSS-side ID selectors (the only `#` matches are GLSL `#version` pragmas). **Clean.**

### §5.3 Attribute-selector and `:has()` chains

| Selector | Site | Risk |
|---|---|---|
| `.underline-tabs button[role="tab"][data-state="active"]` | `style.css:160` | Couples to reka-ui internal markup (button role + data-state); documented as transitional, sunset on glass-ui Tabs underline variant |
| `[data-state]:has(> .palette-dialog)` + `[data-state="closed"]:has(> .palette-dialog)` | `PaletteDialog.vue:599,606` | `:has(>` is supported on all modern engines; coupling to reka-ui Dialog markup is acceptable for an overlay backdrop override |
| `.palette-dialog button:has(> .lucide-x)` + `:has(> .lucide-x):hover` + `.lucide-x` descendant | `PaletteDialog.vue:634,643,647` | **brittle**: reaches into the rendered Lucide `<svg>` class to identify the close button. If the icon ever swaps to a different Lucide icon or if Lucide changes its class scheme, the close button styling silently breaks. Recommend adding a class on the close-button wrapper in the SFC and targeting that instead. |
| `.touch-gate-target:has(.slider-track)` | `style.css:188` | reaches into reka-ui Slider rendered class; same coupling as touch-gate cluster; documented |
| `.palette-tab-content[data-state="inactive"]` etc. | `style.css:90, 169–180` | reka-ui Tabs internal; standard pattern |
| `.color-input:empty[data-placeholder]::before` | `ColorInput.vue:299` | self-owned class + data-attr + pseudo; safe |
| `[data-state="open"], [data-state="closed"], …::before, …::after` | `animations.css:53–58` | global; explicitly meant to catch all reka-ui state-driven primitives for reduced-motion override; documented |

**Tabulation**: 1 fragile selector (the Lucide-X class reach), 6 deliberate-coupling-to-reka-ui selectors (all documented or standard pattern), 0 truly nested tag-soup descendants.

### §5.4 Deeply-nested descendant chains

Grep for `.a .b .c {` patterns: **zero matches** in component styles. The codebase favours single-class selectors with state modifiers, which is the Vue scoped-style idiom.

---

## §6 Reactivity-selector flags

### §6.1 Deep optional-chain reads in template bindings

Grep for `?.x?.y?.z` patterns: **zero matches** inside `:class=` or `:style=` bindings (all such reads are in `<script>` blocks where they're typed and refactor-safe).

The deepest binding observed: `App.vue:18` `:action-bar="colorPickerRef?.actionBarContext ?? null"` — single optional chain, defensible.

### §6.2 Array `:class` bindings

20 sites use `:class="[…]"` with mixed string + conditional. All single-level, all readable. **Clean.**

### §6.3 Inline object `:style` with computed CSS-var injection

The dominant pattern (e.g. `:style="{ '--blob-color': color }"`, `:style="{ '--active-tab-color': safeAccent }"`) is the intended seam for runtime token override; this is the **right** way to drive design-token values from reactive state. **Idiomatic.**

### §6.4 Inline `:style` reads of nested reactive state

Searched for `:style="{ … a.b.c.d.value }"` shapes. None observed; the most depth is `:style="{ background: cssColorOpaque }"` (single-prop ref).

**Verdict**: reactivity-selector hygiene is good. No flags.

---

## §7 Design-idiom localization plan

### §7.1 Current state — where idioms live

The "chosen aesthetic" is currently expressed across **four** files with overlapping authority:

1. **`node_modules/@mkbabb/glass-ui/DESIGN.md`** (~1500 LOC) — the inherited contract. Documents duration, easing, z-tier, radius, shadow, glass-surface tier, interactive states, typography, components. Authoritative for everything except project overrides.
2. **`demo/DESIGN.md`** (25 LOC) — *should* be the project's local idiom doc but is a one-paragraph token-override sketch. Lists font choices, cartoon-shadow override, select-mono override, and points at hero-lab.css.
3. **`demo/@/styles/style.css` `:root`** — the project's `@theme` + `:root` token overrides (cartoon shadow tuning, layout tokens, menu min-w). Authoritative for what's tunable but **undocumented**.
4. **Component-local recipes** scattered: `--mask-pad` (PaletteControlsBar), `--input-action-width` (ColorInput), `--hero-tile-size` (hero-lab), `--pane-slide-dir` / `--pane-slide-rot` (App.vue) — these are **micro-tokens** that govern one component's geometry and live next to their consumer (correct colocation).

The drift: a contributor adding a new pane doesn't know which design-token namespace to consume from, which radius to choose, which shadow rung, what duration vocabulary, what z-tier — they must triangulate glass-ui DESIGN.md (authoritative for the system) + `demo/DESIGN.md` (one paragraph) + `style.css` (token wiring) + sibling components (recipe by example).

### §7.2 Proposed shape — `demo/DESIGN.md` expansion

A single doc file (not a code file) — the directive explicitly says "localized area that defines all of our design idioms" — that does **not** redefine tokens (those live in `style.css` for the project, glass-ui for the inheritance), but **catalogs** the idiom decisions:

```
demo/DESIGN.md  (expanded ~150 LOC)
  §1 Inheritance — points at glass-ui DESIGN.md, lists what's overridden
  §2 Project tokens — table of every token defined in style.css :root
        + what it means + who consumes it
  §3 Idiom choices — when to pick which:
        • Shadow: card vs cartoon vs cartoon-hover (and why the project routes
          card→cartoon)
        • Radius: card vs panel vs input vs pill — picking guide
        • Duration: fast/normal/slow/panel — picking guide (link to glass-ui §Duration)
        • Easing: standard / decelerate / spring-* / dock — when to use which
        • Z-tier: which tier for which surface (link to glass-ui §Z-Index Stack)
        • Glass tier: wash/quiet/resting/floating/overlay — picking guide
        • Typography: font-display/serif/mono + the type-scale rungs
  §4 Component idioms — pop-art cartoon shadows, gold-pop-art accents,
        watercolor blob aesthetic, monospace numeric values in selects/dropdowns
  §5 Local micro-tokens — list of in-component CSS vars (--mask-pad,
        --input-action-width, --blob-color, --active-tab-color etc.) — the
        runtime override seams
  §6 Drift watchlist — things that *don't* fit (PointerDebugOverlay opt-out,
        the .underline-tabs transitional override, etc.)
```

The doc is the **catalog**; tokens stay in `style.css` (the contract surface); recipes stay colocated with components. This matches glass-ui's own pattern (where the feature-token-home rule (Q-coh-4) says tokens live in `tokens.css` and recipes in feature files).

### §7.3 Why NOT a `design-idioms.css` file

Creating a fourth CSS file would:
- create a cascade-order dependency vs. `style.css` (the exact failure-mode glass-ui §Token Architecture warns against — the "W3 dock split-brain");
- duplicate token definitions or split them silently;
- add a touch surface contributors need to remember.

`style.css` is already the **single token home**. The missing piece is a **doc** (markdown), not another stylesheet.

### §7.4 Verdict

**Expand `demo/DESIGN.md` to ~150 LOC catalog.** Don't add a new CSS file. The token home stays `style.css :root`; the recipe colocation stays per-component; the **doc** is the localized idiom surface.

---

## §8 Design-cohesion drift list

| Drift | Severity | Evidence | Fix |
|---|---|---|---|
| **Two shadow languages live in parallel** — `--shadow-cartoon` (project override, pop-art, 8px offset 80%) routed through `--shadow-card` — but hero-lab uses `--glass-shadow-elevated` (glass-ui soft shadow). | low — hero-lab is intentionally a different surface idiom (premium glass) than the color picker (cartoon pop-art). Document the split in §7 §4. | `style.css:44-47`, `hero-lab.css:80,138` | document, don't unify |
| **Two radius languages** — color-picker panes use `--radius-card` / `--radius-panel` (glass-ui standards) but hero-lab uses literal `999px` for pill (`hero-lab.css:117`) | very low | `hero-lab.css:106,117` | use `--radius-pill` token |
| **Three monospace stacks**: `--font-mono` (`Fira Code`) in `@theme`; `font-family: "SF Mono", "Fira Code", monospace` in PointerDebugOverlay; `font-family: var(--font-mono), monospace` in hero-lab | low — PointerDebugOverlay is dev-only opt-out; hero-lab adds a redundant `monospace` fallback (Fira Code already has system fallbacks via the @theme) | `PointerDebugOverlay.vue:230`, `hero-lab.css:32, 232` | hero-lab: drop `, monospace` to match @theme |
| **Two easing vocabularies** — `--ease-standard` / `--ease-decelerate` / `--ease-accelerate` / `--ease-spring` / `--ease-dock` used in components; `linear` literal used at `PaneHeader.vue:22-23` (correct for scroll-timeline) | none — scroll-timeline must be `linear` | n/a | no fix |
| **Cartoon-shadow override semantics** — `--shadow-card` is routed through `--shadow-cartoon`. A consumer who uses `shadow-card` (a Tailwind utility) gets the cartoon shadow, **but** a consumer who reads `--shadow-md` directly gets glass-ui's soft default. This is the documented design choice; no drift, but contributors need to know. | low | `style.css:46-47` | document in §7.4 |
| **Featured-badge gold uses `--color-gold` direct, but the same color shimmer in `ColorInput.vue` crown animation uses `--color-gold` and `--color-gold-light`** — both reference the @theme tokens correctly | none | `PaletteCard.vue:377-388`, `ColorInput.vue:367-374` | no fix |
| **`.section-subtitle` in utils.css** uses `color-mix(in srgb, var(--muted-foreground) 50%, transparent)` — but glass-ui likely has a `--muted-foreground-50` or `text-mono-small` variant. Probable wheel-reinvention. | low | `utils.css:21` | survey glass-ui for an equivalent typography utility before promoting |
| **Edit-drawer keyframe redefined per breakpoint** (animations.css `@media (max-width: 639px) { @keyframes edit-drawer-in { … } }`) — legal but contributors will not expect a `@keyframes` redefinition inside a media query | low — heavily commented as INTENTIONAL | `animations.css:13-22` | already documented, no fix |
| **No documented "what's a card vs what's a panel"** picking guide; consumers pick by sibling-example | low | n/a | resolve via §7 doc |

**Net**: the aesthetic is broadly cohesive. The cartoon-shadow + watercolor-blob + pop-art-gold identity is consistent across the color-picker surface. Hero-lab is a legitimately different surface idiom (premium-glass exploration) and should be documented as such, not unified.

---

## §9 Prioritized recommendations

### P1 — high value, low risk, isomorphic

1. **Surface project tokens as Tailwind utilities via `@theme`** in `style.css` (§1.1):
   - `--z-popover`, `--z-dock`, `--z-modal`, `--z-controls`, `--z-header`, `--z-bar` → `z-popover` etc. (10 sites collapse)
   - `--animate-duration-fast: var(--duration-fast)` etc. → `duration-fast` (14 sites collapse)
   - `--radius-input`, `--radius-md`, `--radius-sm` re-exposed in demo `@theme` → `rounded-input` (8 sites collapse)
   - `--spacing-dock-inset: var(--dock-inset)` etc. → utility-class layout tokens (11 sites collapse)
   - Net: ~43 `[var()]` arbitrary-bracket reaches collapse to first-class utilities, fully isomorphic.
2. **Expand `demo/DESIGN.md` to the ~150-LOC idiom catalog** (§7.2). No CSS changes; pure doc.
3. **Tokenize the duplicated magic numbers** (§1.2) where reuse exists: `min-h-[120px]` (3 sites), `max-w-[200px]` (2 sites), `max-w-[180px]` (1 site, related to 200px family).
4. **Tokenize `--app-layout-padding-x: 1rem`** (§4.1) — removes the silent coupling between `.app-layout` padding and `.pane-container` max-width calc.

### P2 — medium value, mechanical

5. **Colocate `.pane-scroll-fade`** into `panes/` next to `PaneHeader.vue` (§2.2).
6. **Colocate the touch-gate cluster** into `color-picker/touch-gate.css` next to `useTouchGate.ts` (§2.2). Verify `:has()` reach still works after scoped-style stripping.
7. **Fix the brittle `:has(> .lucide-x)` selector** in `PaletteDialog.vue` by adding a class on the close-button wrapper (§5.3).
8. **Strip `, monospace` fallback in hero-lab** (`@theme` already provides the fallback chain) (§8).
9. **Tokenize the SpectrumCanvas + ExtractPane + PaletteDialog dimension chains** (§1.2, §4.1).

### P3 — low value, defer

10. **Remove `-webkit-mask-image`** in `ColorInput.vue` + `PaletteControlsBar.vue` (§3.1) — Safari 16.4+ supports unprefixed.
11. **Remove `-webkit-backdrop-filter` in hero-lab** if support floor moves to Safari 18+ (§3.1).
12. **Migrate `.fraunces` / `.fira-code` aliases to `font-display` / `font-mono`** (~30 sites) (§2.3) — defer until a wider typography pass.
13. **Promote `.slug-pill`** into glass-ui as a Pill variant (per `feedback_glass_ui_first_class.md`) (§2.2). Cross-repo work, defer.
14. **Sunset the `.underline-tabs` transitional override** once glass-ui ships a Tabs `underline` variant (§2.2). Cross-repo dependency.

---

## Appendices

### A — file inventory

| File | LOC | Notes |
|---|---|---|
| `demo/@/styles/style.css` | 230 | global; tokens + layout + 6 utility recipes |
| `demo/@/styles/animations.css` | 60 | project-specific keyframe + reduced-motion guards |
| `demo/@/styles/utils.css` | 27 | font aliases + section-subtitle recipe |
| `demo/hero-lab/hero-lab.css` | 356 | hero-lab page-level styles (intentionally distinct surface) |
| 30 `<style>` blocks | n/a | 27 scoped + 3 unscoped + 1 mixed (EditDrawer has both); all justified |

### B — search artifacts

- Total `[var()]` arbitrary-bracket Tailwind reaches: ~43
- Total `:deep()`: 1
- Total CSS-side ID selectors: 0
- Total `100vh` literals: 0 (clean — all use `dvh`)
- Total numeric-literal z-index in component CSS / Tailwind: 0 outside `z-0` / `z-10` (clean — z-tier is tokenized)
- Total surviving `calc()/min()/max()/clamp()` chains: ~12 (4 in `style.css`, 6 in components, 2 in hero-lab) — all but one (`.pane-container` max-width coupling) justified
- Total `!important`: 7 (5 in `animations.css` for reduced-motion; 2 in `GooBlob.vue` for reduced-motion override) — all in reduced-motion contexts, defensible
- Total `@apply`: ~57, dominated by `Markdown.vue` recipe block (legitimate)
- Total inline `style="…"` static attributes: ~78 total; ~3 are truly static + replaceable
