claude-opus-5[1m]

# CHALLENGE · ChromeDock · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/ChromeDock.vue` (385 lines)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling.
**Date** 2026-08-04. Installed glass-ui **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`); producer `/Users/mkbabb/Programming/glass-ui` also 7.0.0.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier and dies if the falsifier holds.

## Read set (whole-file, read-only)

| file | why |
|---|---|
| `demo/app/dock/ChromeDock.vue` | target |
| `demo/app/dock/index.ts`, `demo/app/dock/MbabbMenu.vue` | barrel + the `#items` slot occupant |
| `demo/app/App.vue` (§1–40, 165–185) | the sole host; prop/slot bindings |
| `demo/components/instrument/transport/injectionKeys.ts` | `CONTROLS_PANE_HOVER_KEY` |
| `demo/components/instrument/surfaceTabs.ts` | `SURFACE_META` + `dockCardinality` **as imported by ChromeDock** |
| `demo/state/controlSurfaces.ts` | `BUILT_IN_SURFACES` + the *other* `SURFACE_META`/`dockCardinality` |
| `demo/app/scene/scenes.ts` + `assets/icons/*.svg` | the `scene.icon` payloads |
| `demo/styles/style.css`, `demo/styles/layout.css`, `demo/styles/design-idioms.css` | `--dock-top-anchor`, `--dropdown-min-width`, `.dock-label` override, `icon-*` utilities, z-contract |
| glass-ui `dock/{GlassDock,DockTrigger,DockSeparator}.vue`, `dock/styles/controls/{triggers,touch-floor,icon-button}.css`, `dock/styles/density.css`, `status-dot/StatusDot.vue`, `select/SelectItem.vue`, `styles/typography/semantic.css`, `styles/tokens/{sizing,color-radius,light-dark,dark-arm}.css` | the consumed contract |
| `node_modules/reka-ui/dist/Select/SelectTrigger.cjs` | `role="combobox"` confirmation |

## Hitherto corpus folded

- **F-1** (`lane-frontend.md` §2) — glass-ui is a phantom dependency (installed 7.0.0, absent from `package.json` *and* `package-lock.json`). **D-1 below is F-1's first proven visual casualty**: ChromeDock's only positioning declaration depends on a glass-ui token that 7.0.0 no longer ships, and nothing in the lock could have caught the drift.
- **lane-frontend §6.3** — "98 unprefixed demo custom properties sharing a global namespace with glass-ui's — a collision surface worth a lane of its own; **no `--kf-*` namespace exists**." **D-5 instantiates it** with a measured one-rung offset (`icon-md`).
- **lane-frontend §6.5** — 13 PRM sites, none in `app/dock/`. Confirmed and **exonerated** (S-2 below): ChromeDock has zero local motion, so delegation is total, not a gap.
- **lane-frontend §4** — ChromeDock listed at 385 lines / glass-consuming. Confirmed verbatim.
- **Contradiction filed:** `lane-frontend.md:460` says the demo's icon seam themes via `currentColor` (echoing `ChromeDock.vue:36–37`). **The tree disagrees — see D-3.** Zero of the six scene glyphs consume `currentColor`.

---

## Verdict

| | count |
|---|---|
| BLOCKER | **1** |
| MAJOR | 4 |
| MINOR | 9 |
| INFO | 3 |
| **defects total** | **17** |
| superlatives | 4 |

---

# BLOCKER

## D-1 · The dock's sole positioning declaration is invalid-at-computed-value-time: `--dock-margin` no longer exists

**Severity BLOCKER** · `ChromeDock.vue:216` · `demo/styles/layout.css:113–118, 78–96, 128–136, 161, 166, 197–208`

ChromeDock positions itself with exactly one declaration:

```html
<!-- ChromeDock.vue:213-217 -->
<div data-dock-tether="top"
     class="fixed left-1/2 -translate-x-1/2 z-dock …"
     style="top: var(--dock-top-anchor);">
```

`--dock-top-anchor` is defined at `layout.css:113–118`:

```css
--dock-top-anchor: calc(
    min(max(var(--work-area-top-offset,0px), env(safe-area-inset-top,0px)),
        var(--dock-anchor-ceiling))
    + var(--dock-margin) / 4          /* ← */
);
```

**`--dock-margin` is defined nowhere in the resolution graph.** Exhaustive probes:

```
$ grep -rn -- "--dock-margin" --include=*.css --include=*.vue --include=*.ts . | grep -v node_modules
  → 7 CONSUMPTION sites in demo/styles/layout.css (80,92,117,135,161,166,204)
  → 2 CONSUMPTION sites in demo/components/instrument/transport/TransportDock.vue (389,395)
  → 0 definitions

$ grep -rlo -- "--dock-margin:" node_modules/@mkbabb/glass-ui/     → (empty)
$ grep -rlo -- "--dock-margin"  node_modules/                      → (empty)   # entire tree, not just glass-ui
$ grep -rn  -- "--dock-margin:" /Users/mkbabb/Programming/glass-ui/src/  → (empty)
$ grep -rn "@property" demo/                → only --lit, --axis-active (CubeTarget/CubeAxisLines)
$ grep -rno 'setProperty("--dock[a-z-]*"' demo/ node_modules/@mkbabb/glass-ui/dist/*.js
  → --dock-morph-t, --dock-collapsed-px, --dock-expanded-px, --dock-t   (no --dock-margin)
```

The demo's own tranche record confirms the token was *inherited*, never owned: `docs/tranches/K/waves/K.W3.md:113` — "`--dock-margin` | **glass-ui** `tokens.css:1304` | `0.5rem` | **P2 / CROSS-REPO** — a glass-ui token, NOT demo-owned", and `K.W3.md:349` — "**NO patching `--dock-margin` (the GAP) in the demo.**" The token was consumed from glass-ui ~3.13. It is gone from 7.0.0. Nothing declared it, so nothing flagged its removal (**this is F-1**).

**The cascade consequence is decidable from spec, not observation** (css-variables-1 §3, *Invalid At Computed-Value Time*):

1. `var(--dock-margin)` has **no fallback** → substitutes the guaranteed-invalid value.
2. A custom property whose value contains a failed `var()` substitution computes to the guaranteed-invalid value → **`--dock-top-anchor` is guaranteed-invalid.**
3. `top: var(--dock-top-anchor)` therefore becomes IACVT. `top` is not inherited → it computes to its **initial value, `auto`.**
4. `top: auto` on a `position: fixed` box resolves to the **static position** — and the wrapper is the first flow child of the app root (`App.vue:4`, inside a renderless `TooltipProvider`), with `body { margin: 0 }` (`style.css:222`).

So the top dock renders **flush against the viewport top edge**, losing simultaneously:
- the `--dock-margin / 4` optical breathing room,
- the golden-ratio optical offset (`--work-area-vertical-bias-top: 0.382`, `layout.css:66`),
- the `--dock-anchor-ceiling` clamp, and
- **`env(safe-area-inset-top)` — the notch/status-bar clearance.** On a notched iPhone the dock lands *under* the system chrome.

The `@supports (anchor-name)` desktop tether (`layout.css:159–162`) is not a rescue on two counts: its own `top:` also contains `var(--dock-margin)/4` and is IACVT, **and** the inline `style=` on `ChromeDock.vue:216` outranks any stylesheet rule regardless.

**Blast radius (same root, outside this component's scope but noted):** `--dock-band-reserve` (`:78`), `--dock-band-reserve-stable` (`:90`), `--dock-bottom-anchor` (`:128`), `--dock-menubar-reserve` (`:103`), `--dock-top-band-reserve` (`:119`) and `--dock-top-anchor-stable` (`:197`) all carry the same term. Below `1024px` the mobile override re-declares `--work-area-max-height` **through** `--dock-band-reserve` (`:183`), so on mobile the entire work-area/optical-offset chain goes IACVT too, not merely the anchor addend.

**Falsifier.** Produce any runtime-reachable definition of `--dock-margin` — a `:root` declaration in a sheet I did not read, an `@property` registration with an `initial-value`, a `style.setProperty` call, an inline `<style>` in the served HTML, or a glass-ui build artifact that ships it. Any one of those kills this finding outright. Four independent greps (repo source, whole `node_modules`, glass-ui producer `src/`, all `setProperty` call sites) returned empty.

**Live-visual half (marked for SS-13):** the exact rendered y-offset of the static position is UNPROVEN-NEEDS-LIVE. The *invalidity* of `top` is not — it follows from the token's absence by spec.

---

# MAJOR

## D-2 · The trigger glyphs are pinned to `--muted-foreground` and cannot follow the trigger's own hover/open ink

**Severity MAJOR** · `ChromeDock.vue:242, 243, 251, 265, 292, 299, 313–316, 364, 365`

glass-ui's `.dock-trigger` owns a four-state ink ladder (`glass-ui/src/components/dock/styles/controls/triggers.css`):

```css
:21-52  .dock-trigger { color: color-mix(in srgb, var(--dock-fg-on-aurora,var(--foreground)) calc(var(--opacity-icon-muted)*100%), transparent); }   /* rest, 0.8α */
:78-83  .dock-trigger:hover:not(:disabled) { color: var(--btn-hover-color, var(--foreground)); }
:114-138 .dock-trigger:is(…[aria-expanded="true"]…) { color: var(--foreground); }             /* open */
```

The label (`<SelectValue/>`, a text descendant) **inherits** that ladder and brightens correctly. Every glyph inside the trigger, however, carries an explicit `class="… text-muted-foreground"` — a *direct* `color` declaration in Tailwind's `utilities` layer. A direct declaration always beats an inherited value, and `utilities` orders after glass-ui's `components` layer, so the glyph is **immovable** through all four states.

Computed from the light-arm tokens (`glass-ui/src/styles/tokens/color-radius.css:40,45,58` + `theme/literals.css:63`), against `--background: hsl(40 30% 98%)`:

| element | resolved ink | contrast |
|---|---|---|
| trigger **label**, rest | `hsl(24 10% 10%)` @ 0.8α | **9.01 : 1** |
| trigger **label**, hover/open | `--foreground` = `hsl(24 10% 10%)` | **14.5 : 1** |
| trigger **glyph**, *all states* | `--muted-foreground` = `hsl(30 22% 40%)` | **5.21 : 1** (matches the token's own annotated "WCAG AA: 5.21:1 vs page") |

So an icon+label lockup that must read as one unit opens with a 1.7× tonal split and *widens to 2.8×* the moment the pointer lands. Worse, the split is **inconsistent within one dock row**: the collapse toggle's glyphs (`:334–339`) carry no `text-muted-foreground`, so they *do* track `.dock-icon-button`'s state ink. Two adjacent controls, opposite hover behaviour.

**Falsifier.** Show that `.dock-trigger`'s state rules are authored at a layer/specificity that defeats a `utilities`-layer `color` on the descendant (they are not — they set `color` on the *ancestor*, and inheritance never beats a direct declaration), **or** that `text-muted-foreground` is unreachable in the built demo CSS. Either kills it.

## D-3 · `text-muted-foreground` on scene glyphs is inert — the "everything themes via `currentColor`" claim is false for all six icons

**Severity MAJOR** · `ChromeDock.vue:33–38` (the claim), `:242, :265, :364` (the inert class) · `demo/app/scene/scenes.ts:15–20` · `assets/icons/*.svg`

`ChromeDock.vue:36–37` states the load-bearing design contract:

> "…the dock renders `<component :is="scene.icon">` so the binding is single-sourced and **every survivor themes via `currentColor`**."

Measured against the six referenced assets:

| asset | payload | themes via `currentColor`? |
|---|---|---|
| `cube.svg` | `<image href="data:image/png;base64,…" image-rendering="pixelated">` | **no** — raster |
| `amiga.svg` | `<image href="data:image/png;base64,…" image-rendering="pixelated">` | **no** — raster |
| `square.svg` | `<image href="data:image/png;base64,…" image-rendering="pixelated">` | **no** — raster |
| `easing.svg` | `stroke="hsl(248, 88%, 71%)"`, `fill="hsl(248, 88%, 71%)"` | **no** — hardcoded literal |
| `spring.svg` | `stroke="var(--color-progress, currentColor)"`, `fill="var(--rainbow-green, currentColor)"` | **no** — tokens are always defined (`style.css:163`, `design-idioms.css`), so the `currentColor` fallback never fires |
| `sequence.svg` | `stroke="var(--rainbow-violet\|blue\|cyan\|green, currentColor)"` | **no** — same |

```
$ grep -o 'fill="[^"]*"\|stroke="[^"]*"' assets/icons/*.svg | sort | uniq -c
   2 spring.svg:stroke="var(--color-progress, currentColor)"
   2 sequence.svg:stroke="var(--rainbow-blue, currentColor)"
   2 easing.svg:fill="hsl(248, 88%, 71%)"
   1 easing.svg:stroke="hsl(248, 88%, 71%)"
   …                                              # zero bare currentColor
```

Three consequences, all design-visible:

1. **`text-muted-foreground` at `:242/:265/:364` is dead code on every scene glyph** — it encodes an intent that cannot land, and a maintainer reading it will believe the dock's identity glyph is a muted-grey register. It is not.
2. **The dropdown list (`:263–267`) mixes three theming regimes in one column** — three theme-frozen bitmaps, one hardcoded violet, two token-bound multicolour glyphs. There is no single iconographic voice.
3. `easing.svg`'s `hsl(248 88% 71%)` bypasses the demo's own declared single accent authority (`style.css:121–136`, "**THE VIOLET ACCENT AUTHORITY** … ONE oklch family, BOTH themes"). It is a near-miss of `--accent-kf` frozen at a light-arm value; in dark mode it cannot arm-swap. (It clears the 3:1 non-text floor in both arms — **3.47:1** light, **5.49:1** dark — so this is a token/identity defect, *not* a contrast defect. I decline the contrast claim.)

This **contradicts lane-frontend §6.4/§8's** repetition of the seam narrative and `ChromeDock.vue:33–38` itself.

**Falsifier.** Show that `?component` (vite-svg-loader) rewrites `fill`/`stroke` literals or `<image>` payloads to `currentColor` at build time — it does not; it wraps the file's markup verbatim in an SFC. Or show a `--rainbow-*`/`--color-progress` undefined at the dock's cascade position, which would let the `currentColor` fallback fire for two of the six.

## D-4 · Pixel-art scene glyphs are non-integer nearest-neighbour downscaled, and rescaled *again* across the collapse morph

**Severity MAJOR** · `assets/icons/{cube,amiga,square}.svg` rendered at `ChromeDock.vue:242` (`icon-sm`), `:265` (`icon-sm`), `:364` (`icon-md`)

Each of the three raster glyphs is a **32 × 32** bitmap with `image-rendering="pixelated"` — an explicit request for nearest-neighbour sampling, i.e. the author asserts pixel-grid integrity matters.

`demo/styles/design-idioms.css:102–118` resolves the demo utilities:

- `icon-sm` = `size-4` = **1rem = 16 px** → 32→16 is a clean 0.5× (integer), fine.
- `icon-md` = `size-5` = **1.25rem = 20 px** → 32→20 is **0.625×, non-integer**. Nearest-neighbour at 0.625× drops 12 of 32 source columns/rows unevenly: the pixel-art grid shears, edges alias, and the glyph reads visibly *broken* rather than *chunky*.

The collapsed pill (`:364`) is precisely where this bites, because it is the dock's **only** content at rest — and it is the only site using `icon-md` for a scene glyph. The expanded trigger uses `icon-sm`. So the same identity glyph is resampled **16 px → 20 px across the collapse↔expand morph**, on a transition glass-ui explicitly built as a continuous single-spring aperture (`GlassDock.vue:422–433`). A size-quantised glyph inside a continuously-morphing aperture is the one element that will read as a jump-cut.

**Falsifier.** Demonstrate that `.icon-md`'s `& svg { @apply size-5 }` (`design-idioms.css:108–113`) does not reach the `<image>` child's rendered box — it sets the `<svg>` box, and the `<image width="32" height="32">` inside a `viewBox="0 0 32 32"` scales with it, so it does. Or show a UA that snaps `image-rendering: pixelated` to integer ratios — none is specified to.

## D-5 · Four glyph rungs in one dock row, none of them the dock's own; the demo `icon-*` utilities shadow glass-ui's `--icon-*` tokens one rung off

**Severity MAJOR** · `ChromeDock.vue:242, 243, 251, 265, 292, 299, 313, 334–339, 364, 365` · `demo/styles/design-idioms.css:96–118` · glass-ui `styles/tokens/sizing.css`, `dock/styles/controls/icon-button.css:213`, `dock/styles/density.css`

**(a) Four rungs, one row.** A single expanded ChromeDock row paints:

| site | class | px |
|---|---|---|
| `:242,:243` scene glyph (trigger) | `icon-sm` | 16 |
| `:292,:299,:313` control-tab glyph | `icon-md` | 20 |
| `:334–339` collapse toggle glyph | `icon-lg` | 24 |
| `:364,:365` collapsed pill glyph | `icon-md` | 20 |

Three simultaneous glyph sizes across four sibling controls, with the *identity* glyph the smallest and a utility toggle the largest — an inverted hierarchy against `ChromeDock.vue:226–232`'s own stated grammar ("Identity LEADS (the scene trigger is rail-core) … the panel-collapse toggle … trail as nav (the toggle NEVER leads)").

**(b) None matches the dock's own rung.** glass-ui derives the dock glyph from the control box:

```
sizing.css : --dock-icon-glyph: max(calc(var(--dock-layer-height, calc(2.5rem*var(--dock-scale))) * 0.5), 1rem)
             --dock-scale: calc(var(--ui-scale) * var(--dock-local-scale,1));  --ui-coarse-scale: 1.5
icon-button.css:213  .dock-icon-button > svg { width/height: var(--dock-icon-glyph, 1.25rem) }
```

At `data-size="md"` that is **1.25rem**, and — critically — it **scales with `--dock-scale`**, so on a coarse pointer the glyph tracks the enlarged control box. All four ChromeDock rungs are fixed `rem`. The icon-button rule's own comment concedes the override is legal ("A consumer passing an explicit lucide size class still WINS … a DEFAULT, not a ceiling") — but the *consequence* of exercising it is that `icon-lg` at `:334–339` freezes the toggle glyph at 24 px inside a box that grows ~1.5× on touch, and `icon-sm` freezes the identity glyph at 16 px in a rung designed for 20.

**(c) The namespace collision — lane-frontend §6.3 instantiated.** glass-ui ships tokens named `--icon-xs/-sm/-md/-lg/-xl` in `sizing.css`. The demo defines Tailwind *utilities* with the **same stems and different values**:

| stem | glass-ui token | demo utility | delta |
|---|---|---|---|
| `xs` | `--icon-xs: 0.75rem` | `icon-xs` = `size-3.5` = 0.875rem | +1 rung |
| `sm` | `--icon-sm: 0.875rem` | `icon-sm` = `size-4` = 1rem | +1 rung |
| `md` | `--icon-md: 1rem` | `icon-md` = `size-5` = 1.25rem | +1 rung |
| `lg` | `--icon-lg: 1.25rem` | `icon-lg` = `size-6` = 1.5rem | +1 rung |

A uniform one-rung offset under identical names. Reading `icon-md` at `ChromeDock.vue:292` and reaching for glass-ui's `--icon-md` yields 1rem, not the 1.25rem actually painted. lane-frontend §6.3 flagged the flat namespace as "a collision surface worth a lane of its own" and counted **zero `--kf-*` tokens**; this is that surface, measured, in the target component.

**Falsifier.** Show a rule that normalises the four rungs downstream (there is none: `icon-button.css:213` is the only dock glyph-size rule and it targets `.dock-icon-button > svg`, which the `<Select>` triggers are not), or show that the demo `icon-*` utilities are unused here (they are on ten elements).

---

# MINOR

## D-6 · `[&>span]:line-clamp-none` is a no-op, and it advertises a label-truncation contract the dock does not have

**Severity MINOR** · `ChromeDock.vue:241, 291`

Both `<DockTrigger>` call sites carry `class="dock-label [&>span]:line-clamp-none"`. There is **no `line-clamp` rule anywhere in the dock**:

```
$ grep -rn "line-clamp" node_modules/@mkbabb/glass-ui/dist/components/dock/ node_modules/@mkbabb/glass-ui/dist/styles/
  → only the .line-clamp-1 utility DEFINITION in components.css; no dock rule consumes it
$ grep -rn "line-clamp" glass-ui/src/ | grep -i "dock\|trigger"
  → components/select/SelectTrigger.vue:78   '[&>span]:line-clamp-1 …'      ← the NON-dock trigger
```

`DockTrigger.vue` hosts reka's `SelectTrigger` directly (`DockTrigger.vue:53–65`), never glass-ui's `SelectTrigger.vue`, so the clamp being "overridden" never applies. The override is cargo-culted from the wrong primitive.

The second half is the real cost. `DockTrigger.vue:27–28` documents the intended policy — "the greenfield trigger clamps its own label (the retired `clampLabel` prop's disposition, decided-terminal: label-clamp is a native trigger concern)" — but `triggers.css:34` only sets `white-space: nowrap`, with no `max-width`, no `overflow`, no `text-overflow`. Combined with `:fit-content="true"` (`ChromeDock.vue:224`), **the dock label has no truncation contract at all**: a long label grows the pill until glass-ui's `useDockOverflowFit` flips the row into its scroll mode. The longest live string is `"Matrix Controls"` (`surfaceTabs.ts:18`); the demo already ships a mobile width-fit patch for exactly this class of problem (`style.css:284–293`, "the re-adopted Jakarta at the label rung runs ~10% wider … and clipped the right-edge Play control past the pill").

**Falsifier.** Any rule setting `line-clamp`, `max-inline-size`, or `text-overflow` on `.dock-trigger` or its `> span` in glass-ui 7.0.0. **UNPROVEN-NEEDS-LIVE:** whether any live label actually reaches the pill cap.

## D-7 · The two adjacent dropdowns invert their glyph order

**Severity MINOR** · `ChromeDock.vue:249–253, 263–267` vs `:298–302`

Scene items — dot first:

```html
:249  <span class="flex items-center gap-2">
:250      <StatusDot … />
:251      <Home class="icon-sm …" />          <!-- and :265 <component :is="scene.icon"> -->
:252      <span :class="… 'font-bold' …">Home</span>
```

Control-tab items — dot **second**:

```html
:298  <span class="flex items-center gap-2">
:299      <component :is="TAB_ICONS[tab.icon]" class="icon-md …" />
:300      <StatusDot … />
:301      <span :class="… 'font-bold' …">{{ tab.label }}</span>
```

Two dropdowns opened from adjacent triggers in the same pill, one separator apart, with reversed selection-marker columns. The selection dot loses its column alignment — the reader's eye has to re-find the state channel between the two menus. It also breaks the leading-rail idiom the scene list establishes (marker → glyph → name).

**Falsifier.** Show a design note ratifying the asymmetry, or show the two menus can never be compared (they open from triggers ~1 separator apart, in one dock row).

## D-8 · `aria-label` on a `role=generic` `<div>` — ARIA-prohibited

**Severity MINOR** · `ChromeDock.vue:307–311`

```html
<div v-else-if="inlineControlTab"
     aria-label="Controls tab"
     class="dock-label dock-inline-tab flex items-center gap-2">
```

A bare `<div>` has implicit role `generic`. ARIA 1.2 lists `aria-label` and `aria-labelledby` under **Prohibited States and Properties** for `role="generic"`; user agents are directed to ignore them, and validators flag them. The element is also non-interactive and has no `role`, so the label names nothing — the adjacent `<span>{{ inlineControlTab.label }}</span>` (`:317`) already carries the text.

**Falsifier.** The "inline" arm never renders on the surviving scene set — `dockCardinality` returns `inline` only for exactly one tab, and `controlLabelRedundant` then elides it for every current scene (`ChromeDock.vue:126–134`, `surfaceTabs.ts:30–39`). If the arm is provably unreachable *forever*, the a11y half is moot and only the dead-register half (D-9's sibling) stands. The component's own comment (`:141–143`) says it is "carried for T.B5 contract parity", i.e. deliberately reachable in principle.

## D-9 · Static `aria-label` on the two comboboxes vs a dynamic one on the sibling toggle — one component, two labelling policies

**Severity MINOR** · `ChromeDock.vue:241, 291` vs `:330`

```html
:241  <DockTrigger for="select" aria-label="Scene" …>          <!-- static -->
:291  <DockTrigger for="select" aria-label="Controls tab" …>   <!-- static -->
:330  :aria-label="isControlsPanelOpen ? 'Close controls' : 'Open controls'"   <!-- dynamic, state-accurate -->
```

reka's `SelectTrigger` renders `role="combobox"` (`grep -o 'role[^,)]\{0,30\}' node_modules/reka-ui/dist/Select/SelectTrigger.cjs → role: "combobox"`). `aria-label` sets the accessible **name**, overriding the subtree — so the `<SelectValue/>` text is removed from the *name* computation. Whether the current scene still reaches the user via the combobox's *value* is browser/AT-dependent for a non-`<input>` host.

The decidable half is the inconsistency: the same file proves it knows how to author a state-accurate label (`:330`) and declines to at `:241/:291`. `"Scene"` and `"Controls tab"` are group labels, not control names — better as `aria-label` on a wrapping group, or dropped entirely so the contents name the trigger.

**Falsifier / UNPROVEN-NEEDS-LIVE.** An AT/accessibility-tree dump showing `AXValue = "Cube"` (or the scene name announced alongside "Scene, combobox") kills the announcement half. The policy-inconsistency half survives it.

## D-10 · Phantom token: `var(--dock-label-padding-inline, 0.5rem)`

**Severity MINOR** · `ChromeDock.vue:381`

```css
.dock-inline-tab { padding-inline: var(--dock-label-padding-inline, 0.5rem); … }
```

```
$ grep -rn "dock-label-padding-inline" demo/ node_modules/@mkbabb/glass-ui/dist/
  → demo/app/dock/ChromeDock.vue:381        (the only hit in either tree)
```

The token is defined nowhere; the fallback is the *only* value it will ever take. It presents as a themable seam and is a hardcoded `0.5rem`. glass-ui already publishes the real seam for this exact measure — `--dock-trigger-padding-inline`, set per density rung (`dock/styles/density.css:140, 189, …`) — which is what would keep the inline arm's box in rhythm with the adjacent trigger, as the comment at `:373–379` claims it does ("It reads at the same inline height + padding a `DockSelectTrigger` occupies so the dock row keeps its rhythm"). At `data-size="md"` the trigger's real inline padding is `0.5rem * var(--dock-scale)` — equal at 1× scale, **divergent on any coarse-pointer or `--ui-scale` device.** The claimed rhythm holds only at unit scale.

**Falsifier.** A definition of `--dock-label-padding-inline` anywhere reachable, or evidence that `--dock-scale` is pinned to 1 in this app (it is not — `--ui-coarse-scale: 1.5` and `--dock-coarse-scale: 0.78` are live in `sizing.css`).

## D-11 · The trailing `DockSeparator` is unconditional — the component violates its own elision doctrine

**Severity MINOR** · `ChromeDock.vue:326` (cf. `:283` inside the guard, and `:116–125, 273–281`)

The leading separator is correctly gated (`:282–283`, inside `v-if="showControlSection"`). The trailing one is not:

```html
:326  <DockSeparator />
:327  <DockControl shape="icon" v-if="hasControlPanel" …>
:344  <slot name="items" />
```

The doctrine the file states twice — `:118–125` ("`0 ⇒ absent`… NO node, no flanking separator") and `controlSurfaces.ts:230–231` ("`absent` (0) draws NO node **AND** no flanking separator") — plus VERDICT #6 ("the superfluous divider") is not applied here. When `hasControlPanel === false` **and** no `#items` slot is supplied, ChromeDock paints a hairline with nothing after it. `hasControlPanel` is genuinely false on two live scenes: `home` and `sequence` both derive `[]` (`controlSurfaces.ts:99–109`, "sequence's lone channel declares `[]`"; `home` has no facility → `[]`).

The component is exported as a reusable dock (`demo/app/dock/index.ts:1`) with an optional slot, and the correct guard is one expression: `v-if="hasControlPanel || $slots.items"`. GlassDock itself models exactly this discipline — `:418` `v-if="$slots.persistent"`, `:503` `v-if="$slots['persistent-end']"`.

**Falsifier.** Show that `#items` is structurally mandatory. It is not: `App.vue:19–25` supplies it, but nothing in the props/slots contract requires it, and `defineProps` (`:60–79`) declares no slot obligation.

## D-12 · `shrink-0` asymmetry between the scene glyph and its `<Home>` fallback

**Severity MINOR** · `ChromeDock.vue:242 / 243`, `:265 / 251`, `:364 / 365`

```html
:242  <component v-if="currentIcon" :is="currentIcon" class="icon-sm shrink-0 text-muted-foreground" />
:243  <Home v-else                                    class="icon-sm text-muted-foreground" />        ← no shrink-0
:265  <component v-if="scene.icon" :is="scene.icon"   class="icon-sm shrink-0 text-muted-foreground" />
:251  <Home                                           class="icon-sm text-muted-foreground" />        ← no shrink-0
:364  <component v-if="currentIcon" :is="currentIcon" class="icon-md shrink-0 text-muted-foreground" />
:365  <Home v-else                                    class="icon-md text-muted-foreground" />        ← no shrink-0
```

Every branch pairs a `shrink-0` glyph against a fallback without it — three times, consistently. Home is the app's **landing** scene, so the un-protected branch is the one a first-time visitor sees. Under flex pressure (the mobile width-fit at `style.css:289–292`, the `:fit-content` pill, the coarse-pointer `--dock-scale` growth) the Home glyph is the one element in the row permitted to squash, and it squashes asymmetrically (width only), distorting the glyph.

**Falsifier.** Show `flex-shrink` set on the glyph elsewhere — the `.dock-trigger` sets `flex-shrink: 0` on *itself* (`triggers.css:27`), not on its children, and `.icon-sm` (`design-idioms.css:104`) sets only `size-4`. **UNPROVEN-NEEDS-LIVE:** whether the row reaches shrink pressure in practice.

## D-13 · Two docks, two collapse clocks — 2500 ms vs 3600 ms

**Severity MINOR** · `ChromeDock.vue:224` vs `TransportDock.vue:43` + glass-ui `useDockShellProps.ts:181`

```html
ChromeDock.vue:224     <GlassDock ref="dockRef" :collapse-delay="2500" :start-collapsed="true" :fit-content="true">
TransportDock.vue:43   <GlassDock ref="dockRef" :always-expanded="false" :fit-content="true">
useDockShellProps.ts:181   const collapseDelay = computed(() => props.collapseDelay ?? 3600);
```

The top and bottom bands are co-visible on every desktop scene. After a single pointer sweep across the stage they dissolve **1.1 s apart**, on a screen whose entire chrome idiom is a matched pair of glass pills. Nothing in the file justifies the 2500 (the prop is uncommented, unlike almost every other line here). Either the deviation is intentional and undocumented, or it is drift — and glass-ui's default is the only number with a stated rationale.

**Falsifier.** A design note ratifying an asymmetric collapse cadence, or a measurement showing the two bands are never simultaneously visible (they are: `layout.css:107–136` anchors both).

## D-14 · `SURFACE_META` / `dockCardinality` exist twice; the dock and the in-panel strip read *different* copies

**Severity MINOR** · `ChromeDock.vue:15–21` vs `ChannelControls.vue:248` · `surfaceTabs.ts:12–41` vs `controlSurfaces.ts:145–160, 278–309`

```
ChromeDock.vue:19-21          import { SURFACE_META, dockCardinality } from "@components/instrument/surfaceTabs";
ChannelControls.vue:248       import { … SURFACE_META … } from "@state";     → state/index.ts:59 → controlSurfaces.ts:145
TransportDock.vue:237         import { dockCardinality } from "@components/instrument/surfaceTabs";
```

Two byte-identical-today definitions of the label/icon registry, and two of the cardinality function, in two modules. Both self-describe as unique:

- `controlSurfaces.ts:141–144` — "**THE ONE SURFACE-METADATA REGISTRY.** Total over the ControlSurface alphabet — both docks and the in-panel strip resolve every tab's `{label,icon}` from HERE (proof:dfa-derived's 'resolves from exactly ONE module' clause)."
- `ChromeDock.vue:43–45` — "the {label,icon} metadata itself DERIVES from the ONE `SURFACE_META` registry (the former hand-synced literal here was one of the three triplicated sites)"

The tree has two, and the two live consumers are split across them. This is a *design* hazard, not merely a code one: the dock dropdown (`ChromeDock.vue:301`) and the in-panel tab strip (`ChannelControls.vue:302`) render **the same surface's label and glyph, side by side on screen**, from independently editable sources. A rename in one is invisible in the other. The stated cure for the original triplication was reduced from three copies to two, and the prose was updated as if it had reached one.

**Falsifier.** `diff` the two `SURFACE_META` objects — they are identical today (verified: `surfaceTabs.ts:12–19` ≡ `controlSurfaces.ts:145–160` modulo comments). This is a drift *surface*, not a present visual defect; that is why it is MINOR and not MAJOR.

---

# INFO

## D-15 · `easing` and `spring` share one glyph

**Severity INFO** · `surfaceTabs.ts:16–17` / `controlSurfaces.ts:153–154`, rendered at `ChromeDock.vue:292, 299`

```ts
easing: { value: "easing", label: "Curve",   icon: "Activity" },
spring: { value: "spring", label: "Physics", icon: "Activity" },
```

Two distinct surfaces resolve to the same `TAB_ICONS["Activity"]` component (`ChromeDock.vue:52–58`). Wherever both are reachable in one dropdown the glyph column carries zero information and the icon becomes decoration. The naming work at `controlSurfaces.ts:149–152` was careful to make the *labels* name the facet rather than the scene ("the facet tab says what the surface IS — the Curve editor, the Physics instrument"); the iconography did not follow.

**Falsifier.** Prove `easing` and `spring` can never co-occur in one derived set — `surfacesFor` (`controlSurfaces.ts:95–120`) unions `facility.facets`, and each scene declares its own, so today they do not co-occur. That downgrades this to a latent hazard, which is why it is INFO.

## D-16 · The top dock rides `--z-dock`, which the z-contract documents as "the bottom dock band"

**Severity INFO** · `ChromeDock.vue:215` (`z-dock`) · `demo/styles/style.css:32`

```
style.css:32       --z-dock     :  40  the bottom dock band
```

The ordered-layer contract (`style.css:18–40`) is otherwise exemplary and single-sourced from glass-ui's scale. Its own prose simply does not name the top band, so the rung's documented meaning and its actual occupancy diverge. One word.

**Falsifier.** Any reading of the contract that already covers both bands — `:32` says "the bottom dock band", singular.

## D-17 · Zero `forced-colors` handling anywhere in the demo

**Severity INFO** · `demo/` (whole tree) · mitigated at `glass-ui/src/components/status-dot/StatusDot.vue:203–224`

```
$ grep -rn "forced-colors" demo/    → (no output)
```

ChromeDock's own state signals largely survive Windows High Contrast by luck and by delegation: `StatusDot` ships a real `@media (forced-colors: active)` block that keeps online (solid ring) distinguishable from unknown (dashed, hollow), and `font-bold` (`:252, :266, :301`) is a non-colour channel. The demo-side gap is real but not ChromeDock-specific, and I decline to load it onto this component beyond the record. The one ChromeDock-owned surface with no forced-colors story is `.dock-inline-tab`'s `color: var(--foreground)` (`:383`) — which is also the arm that does not currently render (D-8).

**Falsifier.** A `forced-colors` block reachable from the demo cascade, or evidence that glass-ui's dock plate degrades acceptably (its `adaptive-legibility.css` was not audited for this axis).

---

# SUPERLATIVES

L-18 runs both ways. Four things this component does better than its peers, each with its own falsifier.

## S-1 · The elision model is decided once, off-component, and removes the separator with the node

**`ChromeDock.vue:116–146, 273–319` + `surfaceTabs.ts:25–41`**

The near-universal failure mode for a contextual dock zone is to render a disabled/static single-option control, and — even when the control is elided — to leave its flanking divider behind. This component does neither. `dockCardinality` is a pure function over `(tabs, channels, sceneLabel)` returning a three-state zone plus a **cross-axis** redundancy predicate, and the render consumes it whole:

```
:282  <template v-if="showControlSection">
:283      <DockSeparator />        ← inside the guard; the node and its divider vanish together
:284      <Select v-if="multipleControlTabs" …>
:307      <div v-else-if="inlineControlTab" …>
```

The redundancy clause (`surfaceTabs.ts:38–39`) is the genuinely rare part: it compares the sole tab's identity against the *adjacent* scene identity and renders nothing when they collide, rather than demoting to a static label. That is the correct answer to "one option" and it is the answer most systems get wrong.

**Falsifier.** Find a scene where one non-redundant control surface renders a static label duplicating the scene name, or where an elided zone leaves a hairline. `:283`'s placement inside the guard makes the second impossible.

## S-2 · Total motion delegation — zero local animation, so `prefers-reduced-motion` is honoured by construction

**`ChromeDock.vue:372–385`** (the entire `<style scoped>` block: three declarations, no `transition`, no `animation`, no `@keyframes`)

Every moving part is glass-ui's: the collapse/expand aperture (`GlassDock.vue:169–189` → `useDockMorph`), the press spring, the chevron flip. glass-ui honours PRM on both clocks —

```
$ grep -rn "prefers-reduced-motion" glass-ui/src/components/dock/{styles,composables}
  styles/crossfade.css:136   styles/cta-seat.css:81   styles/dock.css:226   styles/shape.css:184
  composables/useDockMorph.ts:43   const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  composables/useDockSpring.ts:16  "…under prefers-reduced-motion: reduce (no in-between motion frames…)"
```

lane-frontend §6.5 counted 13 PRM sites across the demo and none in `app/dock/`. That reads as a gap in a census and is in fact the opposite: there is nothing local to guard. This is the honest form of delegation — not a comment promising the library handles it, but *no local motion to handle*.

**Falsifier.** Any `transition`, `animation`, or JS-driven tween authored in ChromeDock. There is none; the scoped block is `padding-inline`, `white-space`, `color`.

## S-3 · Selection is triple-encoded, and survives forced-colors and reduced-motion

**`ChromeDock.vue:248–252, 297–301`**

```html
hide-indicator                                              ← native check suppressed
<StatusDot :state="… ? 'online' : 'unknown'" />             ← hue + SHAPE (solid ring vs dashed hollow)
<span :class="… ? 'font-bold' : ''">                        ← weight
```

Three channels: hue, mark shape, type weight. Only one of them is colour, so the state read survives greyscale, colour-vision deficiency, and Windows High Contrast — `StatusDot.vue:203–224` maps both states onto `CanvasText`/`Canvas` while preserving the `border-style: dashed` and hollow/filled distinction, and `:195–201` disables the pulse under PRM. `reka` supplies `aria-selected` independently, and `StatusDot` correctly marks itself `aria-hidden="true"` when unlabelled (`StatusDot.vue:38–41`) rather than announcing a redundant "online".

*(The semantic stretch — `online`/`unknown` denoting "selected"/"not selected" — is a naming imprecision, not a defect: the rendered marks are a filled and a hollow dot, which is exactly right for the job. I decline to file it.)*

**Falsifier.** Show `font-bold` unreachable (`.font-bold` is generated — `components.css` ships it), or show `hide-indicator` unsupported in 7.0.0 (it is: `SelectItem.vue:10,56`).

## S-4 · `@pointerenter` scene warming, and the home descriptor is correctly excluded from the loop

**`ChromeDock.vue:255–262` + `scenes.ts:127–182`**

```html
:261  @pointerenter="emit('warmScene', scene.id)"
```

Each scene is a lazily-imported chunk (`scenes.ts:145, 152, …` via `lazyScene`). Prefetching on dropdown hover collapses the perceived switch latency to near-zero *without* a speculative fetch on mount — the correct latency/bandwidth trade for a demo, and a genuine perceived-performance design decision rather than an engineering one.

Separately, a structural trap the component avoids: `homeScene` is declared **outside** the `scenes` array (`scenes.ts:127–141` vs `:143`), so the explicit Home `<SelectItem>` at `:248` and the `v-for` at `:255` cannot double-render Home — and `currentIcon` (`:83–85`) searches only `props.scenes`, so home falls through to the `<Home>` fallback by construction rather than by a special case. Small, and easy to get wrong.

**Falsifier.** Show `homeSceneId` present in `scenes` (it is not — `HOME_SCENE_ID = "home"` at `scenes.ts:127`; the array's ids are cube/amiga/square/easing/spring/sequence), which would make `:248` a duplicate row.

---

## Provenance

Every glass-ui claim is sourced from the **installed** `node_modules/@mkbabb/glass-ui/dist/` (7.0.0) and cross-read against the producer `src/` at the same version. Contrast figures are computed from the light-arm token literals (`glass-ui/src/styles/tokens/color-radius.css:40,45,58`, `theme/literals.css:63`) via WCAG 2.x relative luminance; the `--muted-foreground` figure reproduces the token file's own annotated 5.21:1, which validates the method. No file in keyframes.js, glass-ui, or value.js product source was written, mutated, or executed; no installs, no dev servers, no browser tooling. Claims that require a rendered page are marked **UNPROVEN-NEEDS-LIVE** and are queued for the SS-13 visual audit: D-1's rendered offset, D-6's actual overflow, D-9's AT announcement, D-12's shrink pressure.
