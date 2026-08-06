claude-opus-5[1m]

# CHALLENGE · `GallerySearchBar.vue` · axis **D — DESIGN**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GallerySearchBar.vue` (223 lines)
**Posture** Assumed DEFECTIVE until the tree proved otherwise. Every claim below carries a severity, a `file:line`
provenance, and the falsifier that would kill it. Superlatives carry the same apparatus (L-18 runs both ways).
**Method** Static + source-derived only. No browser tooling. Read whole: the target; `../lib/basis-display.ts`;
`@/lib/colors.ts`; the installed `@mkbabb/glass-ui@4.0.0` `Button`/`Select` implementations and the token/ladder
partials they read; `lucide-vue-next@1.0.0` `Icon.js`; the sole consumer `GalleryView.vue`; `stores/gallery.ts`;
`lib/api.ts`; `src/style.css`. Producer `@mkbabb/glass-ui@7.0.0` at `/Users/mkbabb/Programming/glass-ui` read for the
uplift delta. All reads read-only; the only write is this file.

**Tally** 24 defects · **4 BLOCKER** · 9 MAJOR · 8 MINOR · 3 INFO · **8 superlatives**

---

## §0 — The one-paragraph verdict

The component is a well-mannered piece of *drawing* attached to nothing. Its motion grammar is thoughtful, its
flexbox is correct, its comments are exemplary — and three of its four controls are inert, its enter animation is
provably dead at the pinned version, its primary input has no visible focus ring and no accessible name, and every
control height in it hardcodes past glass-ui's coarse-pointer touch floor. The Aristotelian complaint is not that any
one measure is wrong; it is that there are **four** control heights, **four** gaps, **two** radius vocabularies and
**three** icon sizes in a 223-line component, none of them derived from a common term. The proportion is not bad —
there is no proportion, because there is no ratio anyone chose.

---

## §1 — BLOCKERS

### D-B1 · Three of the four controls are inert: the entire design vocabulary advertises state changes the tree cannot produce
**BLOCKER · state coverage / prose integrity**

`searchQuery`, `tierFilter` and `basisFilter` are emitted (`:53`, `:60`, `:84`, `:99`, `:122`), assigned into the
Pinia store (`GalleryView.vue:234,236,237`), and then **never read by anything that filters**.

- `stores/gallery.ts:64-68` (`fetchNextPage`) and `:90-94` (`resetAndFetch`) — both fetch paths send
  `{ limit, sort, cursor?, owner? }`. Nothing else.
- `lib/api.ts:397-413` — `listVisualizations` accepts exactly `limit | sort | cursor | owner`; there is no `q`,
  no `tier`, no `basis` param to send.
- Exhaustive grep (`grep -rn "searchQuery\|basisFilter\|tierFilter" web/src/`, minus the target): the only
  consumers are `GalleryView.vue:95` (a debounce trigger), `:112` (a refetch trigger) and the template bindings.
  No client-side predicate exists — `GalleryView.vue:64-70` filters only on `e.tier === "featured"`.
- The in-repo counterexample proves this is oversight, not design: `AdminUserList.vue:61` does exactly the right
  thing — `q: searchQuery.value || undefined`.

Consequence on the design axis: typing a slug fires a 300 ms-debounced `resetAndFetch()` (`GalleryView.vue:93-98`)
that **empties `entries` and refills it with the identical unfiltered page** (`gallery.ts:84-99`). Every keystroke-
settle is a full grid teardown for zero semantic change. There can be no "no results for *x*" state, no result
count, no filtered-empty illustration — because there is no filtering. Only `sort` is live (`gallery.ts:66,92`).

**Falsifier** — Show any code path where `searchQuery`, `tierFilter` or `basisFilter` reaches a request parameter,
a computed predicate, or a server call. I found none in `web/src/`. A server-side default that filters on
`owner`/`sort` alone does not count; the three props name axes the API has no parameter for.

---

### D-B2 · `--ease-apple-spring` is definition-absent at the pin — the drawer's *enter* transition is invalid-at-computed-value-time and plays with zero duration, while *leave* animates
**BLOCKER · motion**

`:186-190`

```css
.filter-drawer-enter-active {
    transition:
        opacity 0.3s var(--ease-apple-spring),
        transform 0.3s var(--ease-apple-spring);
}
```

The comment on `:185` calls these "canonical tokens". At the pinned version they are not tokens at all:

- `grep -rn -- "--ease-apple-spring:" web/node_modules/@mkbabb/glass-ui web/src` → **zero definitions.**
- The only mention inside the installed package is the README's stale token table
  (`node_modules/@mkbabb/glass-ui/README.md:211`).
- The shipped CSS records the excision explicitly:
  `node_modules/@mkbabb/glass-ui/dist/styles/tokens/scale-paper.css:357-362` — *"AX.W05 — … The legacy apple-spring
  cubic-bezier (+27.5% overshoot) was a SECOND authority beside the regen `--spring-*` cohort; **it is EXCISED**. Its
  emphatic-overshoot register maps to the playful `--spring-bouncy`."*

Because `transition` is a **shorthand** and its value contains an unresolvable `var()`, the declaration is invalid at
computed-value time: every longhand it sets falls back to `unset` → `transition-duration: 0s`. The enter is not
"slightly wrong easing"; it does not run. The leave (`:191-195`) uses `--ease-standard`, which **is** defined
(`dist/styles/tokens/scheme-motion.css:216` → `:211` `cubic-bezier(0.4,0,0.2,1)`), so it runs for 0.2 s.

The drawer therefore **snaps open and fades closed** — the exact inverse of the choreography the author designed
(`:196-203` sets a considered `translateY(-8px) scale(0.97)` enter-from that no user will ever see).

Repo-wide corroboration: 6 live `var(--ease-apple-spring)` sites across 4 files
(`VisualizationView.vue`, `GalleryCard.vue`, `AppHeader.vue`, and this one). This is a repo-wide dead token; this
file is one of its four graves.

**Falsifier** — Produce a `--ease-apple-spring:` declaration reachable from this component's cascade (glass-ui 4.0.0
dist, `src/style.css`, any `@theme` block, any inline style). One declaration anywhere in the inherited chain kills
the finding outright. I grepped the entire `web/node_modules` tree and `web/src`; there is none.

---

### D-B3 · The primary input kills its own focus indicator and nothing compensates
**BLOCKER · a11y (WCAG 2.4.7 Focus Visible, AA)**

`:52` — the input's class list ends `… border-none text-foreground text-sm **outline-none** placeholder:…`.

The input is transparent-backgrounded (`bg-transparent`) and borderless (`border-none`) *by design* — the visible
affordance is the parent `.search-pill` (`:143-153`). But `.search-pill` has **no `:focus-within` rule**
(`:143-153` sets only `background` + `border`, and there is no `:focus-within` selector anywhere in the scoped
block). So when the input takes keyboard focus, **nothing on screen changes**.

Nothing upstream saves it:
- glass-ui's `focus-ring` utility is applied by `Button`'s CVA and by `SelectTrigger` — never to a bare `<input>`.
- `src/style.css:135-140` adds `:focus-visible` outlines to exactly four named classes
  (`.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`). `.search-input` is not among them.
- glass-ui's `utilities/a11y-overrides.css` forced-colors block restores an outline **only under
  `@media (forced-colors: active)`**.

**Falsifier** — Find a `:focus-visible` / `:focus-within` rule that reaches `.search-input` or `.search-pill` from
any layer (glass-ui `@layer components`, `src/style.css`, a Tailwind base reset). The UA default focus ring is
explicitly suppressed by `outline-none`, so the UA cannot be the answer.

---

### D-B4 · Nothing in this component has an accessible name
**BLOCKER · a11y (WCAG 4.1.2 Name/Role/Value; 3.3.2 Labels or Instructions)**

Three naming failures, one root cause — the author trusted the icons.

1. **Clear button** `:55-63` — icon-only `<Button>` wrapping `<X :size="14" />`. No `aria-label`, no `title`, no
   visually-hidden text.
2. **Filter toggle** `:65-74` — icon-only `<Button>` wrapping `<SlidersHorizontal :size="15" />`. Same.
3. **The input** `:48-54` — no `<label>`, no `aria-label`, no `aria-labelledby`. Its only name is the
   `placeholder="Search by slug..."`, which disappears on first keystroke and fails contrast (see D-M4). It is also
   `type="text"`, not `type="search"`.

The icons cannot supply the name. `lucide-vue-next@1.0.0` `dist/esm/Icon.js` (final spread):

```js
...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }
```

Neither call site passes a default slot or an a11y prop, so **both SVGs render `aria-hidden="true"`** — the buttons
compute to the empty accessible name. To a screen-reader user this component is: an unlabelled text field followed
by two unlabelled buttons.

**Falsifier** — Show an `aria-label`, `title`, `aria-labelledby`, visually-hidden child, or a default slot on either
`<Button>`; or a `<label for>` / `aria-label` on the input. Or show that glass-ui's `Button` injects a name — it does
not (`node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js`: the render passes only `as`, `as-child`, `data-slot`,
`data-variant`, `data-size`, `type`, `disabled`, `class`).

---

## §2 — MAJOR

### D-M1 · Four hardcoded control heights defeat glass-ui's coarse-pointer touch floor; on touch the drawer stacks 60.75 px pills over 36 px selects
**MAJOR · proportion + a11y (target size)**

Sites: `:59` `h-6 w-6` · `:68` `h-7 w-7` · `:86` and `:101` `h-8`.

glass-ui 4.0.0 makes the control ladder a *function*, not a constant
(`dist/styles/tokens/offsets-sizing.css:149-151`):

```css
--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor));
--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));
--control-h-md: max(calc(2.5rem  * var(--ui-scale)), var(--control-floor));
```

and `dist/styles/tokens/light-dark.css:18-22` amplifies the whole library on touch with an explicit WCAG floor:

```css
@media (pointer: coarse) { :root {
    --ui-scale: var(--ui-coarse-scale, 1.5);
    --control-floor: var(--touch-target, 2.75rem);
} }
```

The partial's own prose (`:6-17`) states the contract: *"The WCAG-2.5.5 44px touch floor is enforced HERE too …
every scaled control-height `max(scaled, floor)` clamps at ≥ 44px regardless of the scalar."*

Every `h-*` above is a static `rem` and therefore reads **neither scalar nor floor**. Compound this with
`src/style.css:41-44` (`html { font-size: 1.125rem }` below 768 px, i.e. 1rem = 18px on phones) and the drawer on a
phone measures:

| element | site | rendered height (coarse, ≤768px) | what the system guarantees |
|---|---|---|---|
| clear `X` | `:59` `h-6` | **27 px** | `--control-h-xs` → 49.5 px |
| filter toggle | `:68` `h-7` | **31.5 px** | `--control-h-xs` → 49.5 px |
| tier / sort `SelectTrigger` | `:86,:101` `h-8` | **36 px** | `--control-h-sm` → 60.75 px |
| basis pill (`size="sm"`, *not* overridden) | `:117` | **60.75 px** | — |

So the panel's two rows differ by **1.7×** in control height, and only the row the author did *not* override obeys
the system. Desktop is milder but still four heights: 24 / 28 / 32 / 36 px.

Second-order: `--ui-glyph: calc(1rem * var(--ui-scale))` (`offsets-sizing.css:177`) = 1.5 rem on coarse = **exactly
`h-6`**. The clear button's glyph therefore fills its box edge-to-edge (`size="icon"` ships `p-0`), and the filter
toggle's 1.5 rem glyph sits in a 1.75 rem box — 2.25 px of breathing room per side.

**Falsifier** — Show a `@media (pointer: coarse)` or container override in fourier that restores these four controls
to the floor; or show that `--ui-scale`/`--control-floor` are overridden repo-side. `grep -rn -- "--ui-scale\|--control-floor\|--touch-target" web/src/` → empty.

---

### D-M2 · The basis pills' accent colour is frozen at module-eval — and on the normal navigation path it freezes to `#888888` grey for all three bases
**MAJOR · glass/token conformance + theming**

`:121` sets `--pill-c` from `b.color`, sourced at `:30-37` from `basis-display.ts:4-6`:

```ts
export const basisDisplay: Record<string, {...}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```

`VIZ_COLORS` is a `reactive()` object (`lib/colors.ts:77-87`) whose values `resolveVizColors()` rewrites on mount and
on every theme flip (`App.vue:10-18`, MutationObserver on `documentElement.class`). But `basisDisplay` is a **plain
object literal that copies the primitive strings once, at module evaluation** — no reactivity is captured. The
`computed` at `:30-37` therefore has no dependency to invalidate. Two consequences:

1. **The accent never follows the theme.** glass-ui ships distinct light/dark arms
   (`dist/styles/tokens/color-radius.css:263-265` vs `dark-arm.css:113-115`); the pills track neither.
2. **What it freezes to is a race, and both outcomes are wrong.** `resolveVizColors()` runs in `App.vue`'s
   `onMounted`; every route is lazy (`router/index.ts:46,60,72,83,94,104,114`), so on the ordinary in-app navigation
   to the gallery the chunk containing `basis-display.ts` evaluates **after** the resolve. And the resolve poisons the
   values: `--viz-*` are declared as `oklch(...)` / `light-dark(oklch(...), oklch(...))` and are **not
   `@property`-registered** (`dist/styles/tokens/property-regs.css` registers only progress/phase/ripple/specular/
   glass-level/ui-scale), so `getComputedStyle().getPropertyValue("--viz-fourier")` returns the literal token stream.
   `cssVarToHex` (`lib/colors.ts:22-54`) has arms for `#`, `hsl()`, bare `H S% L%` and `rgb()` — **no `oklch()` arm**
   — and falls through to `return "#888888"` (`:53`). All three bases become the same grey; the colour-coding that is
   the pills' entire visual argument collapses.

This is the CENSUS §3c "no `oklch()` arm" finding (`lib/colors.ts` is named there as the W.L5 item-2 deletion target)
landing on a UI surface. The repo already knows about the ordering hazard —
`useCoeffHover.ts:60-65` documents "`resolveVizColors` has not yet run (mounted before paint)" and guards with
`VIZ_COLORS.amber || VIZ_COLORS.golden`, a guard that cannot fire because `"#888888"` is truthy.

**Falsifier** — Show `basisDisplay` re-evaluating after a theme flip (it is a `const` object literal, not a getter,
`computed`, or `reactive`); or show `cssVarToHex` parsing `oklch(...)`; or show `--viz-*` registered via `@property`
with a `<color>` syntax so the computed value serialises to `rgb(...)`. Any one kills half the finding.

---

### D-M3 · The *selected* basis pill's label fails WCAG AA in both themes
**MAJOR · a11y (WCAG 1.4.3, AA) — token-decidable**

`:218-222` — `[aria-pressed="true"]` sets `color: var(--pill-c)` over `background: color-mix(in srgb, var(--pill-c)
12%, transparent)`, which composites over the `variant="outline"` chassis's `bg-background`
(`dist/button-BNDWhAZb.js`, `outline:` `"border border-input bg-background …"`).

Label size: the CVA base sets `text-[length:var(--control-text)]` → `--control-text: calc(--type-small * --ui-scale)`
→ `--type-small` floors at **0.875rem / 14 px** (`dist/styles/typography/scale.css:105-109`). That is *normal* text,
so the bar is **4.5:1**, not 3:1.

Computed from the shipped tokens (sRGB, WCAG 2.x relative luminance):

| base | frozen hex | light: on 12% tint | dark: on 12% tint |
|---|---|---|---|
| fourier | `#bf4040` | **4.24:1** ✗ | **3.50:1** ✗ |
| chebyshev | `#3d72b8` | **4.04:1** ✗ | **3.70:1** ✗ |
| legendre | `#9545b8` | **4.48:1** ✗ | **3.33:1** ✗ |
| (grey-collapse outcome, D-M2) | `#888888` | **3.02:1** ✗ | 4.94:1 ✓ |

Backgrounds: light `--background` = `--neutral-0` = `hsl(40 30% 98%)`; dark = `hsl(24 9% 4%)`
(`color-radius.css:40,57`; `dark-arm.css:42`). Six of six theme×base combinations fail; the dark arm fails worst
precisely *because* of D-M2 (the light-arm hexes are frozen onto a near-black page).

The idle state, by contrast, passes comfortably: `:212` `color: var(--muted-foreground)` = 5.21:1 light / 7.70:1 dark
(the token's own docstring records those figures, `color-radius.css:45` / `dark-arm.css:47`). The defect is created
entirely by the local `--pill-c` override.

**Falsifier** — Recompute with the real composited backdrop. Two things could move the numbers: (a) `.glass-resting`
on the ancestor panel (`:80`) tints the plate — but it engages only `--glass-tint-strength-floor` (4% light / 12%
dark, `dist/styles/glass/ladder.css:216-220`) and does **not** lift `--muted-foreground`, so the shift is
sub-perceptual and cannot close a 1.0–1.2 gap; (b) the pill sits over gallery content rather than the page — which
makes the ratio *less* predictable, not better. If someone demonstrates ≥4.5:1 for all six cells against the real
composite, the finding dies.

---

### D-M4 · The placeholder is the input's only label and it renders at 2.02:1
**MAJOR · a11y (WCAG 1.4.3) + typography**

Two authorities set the same colour to `--muted-foreground` at 50 % alpha: the utility at `:52`
(`placeholder:text-muted-foreground/50`) and the scoped rule at `:155-157`.

| theme | placeholder vs `.search-pill` bg | vs page bg |
|---|---|---|
| light | **2.02:1** | 2.08:1 |
| dark | **2.70:1** | 2.88:1 |

(`--muted-foreground` = `hsl(30 22% 40%)` light / `hsl(34 14% 62%)` dark; pill bg = `--muted` at 50 % over
`--background`, `:151`.) Placeholder text is content text under 1.4.3 — and per D-B4 it is the *only* naming
affordance this input has, so the failure is doubly load-bearing. For comparison, the typed value is fine
(`--foreground` over the pill = 16.31:1 light / 14.98:1 dark) and the leading search glyph is fine (5.05:1 / 7.21:1).
The author dimmed exactly the one string that had to survive.

**Falsifier** — Show that WCAG exempts placeholder text (it does not; only purely decorative and disabled-control
text are exempt, and this control is enabled), or produce a `<label>`/`aria-label` that demotes the placeholder to a
hint — which would downgrade this to MINOR but only by fixing D-B4 first.

---

### D-M5 · A floating overlay wearing a *content*-tier glass class
**MAJOR · glass-ui conformance**

`:80` — `<div class="filter-panel glass-resting">`, inside `.filter-anchor` which is `position: absolute; top: 100%;
z-index: var(--z-bar)` (`:165-173`). This is, by construction, an overlay: it floats above whatever the gallery
painted below it.

glass-ui's ladder partitions the tiers by exactly this criterion
(`dist/styles/glass/ladder.css:190-197`):

> *"The OVERLAY band (`.glass-floating`/`.glass-overlay` — Dialog/Sheet/Popover/DropdownMenu/HoverCard/Command/
> Tooltip/Toast/Select-content) keeps the FULL unconditional AA darken + the muted lift: **it floats over WHATEVER
> the consumer painted** … so darkening toward the warm-ink is the correct DEFAULT over an UNKNOWN surface."*

and `:216-220` gives the *content* tiers (`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) only the
sub-perceptual floor with **"NO unconditional `--muted-foreground` lift here"**. By choosing `.glass-resting` the
panel forfeits both guarantees the overlay band exists to provide — the AA darken and the muted-ink lift — while
being the exact structural case the band was written for. The ladder even warns the failure mode: *"the muted L40
tier cannot clear 4.5:1 on a translucent darkened plate"* (`:189-191`). The idle basis-pill labels (`:212`,
`--muted-foreground`) are that muted L40 tier, sitting on that translucent plate, over arbitrary gallery imagery.

Repo-internally the tier vocabulary is understood — `glass-floating` appears 3× and `glass-wash` 4× elsewhere in
`web/src` (CENSUS/lane-frontend §3 class census). This site simply picked the wrong rung.

**Falsifier** — Argue the drawer is *in-flow chrome*, not an overlay. `:165-168` (`position: absolute; top: 100%;
z-index: var(--z-bar)`) and the author's own comment at `:77` ("overlaid, does not affect flow") refute it.

---

### D-M6 · The local `box-shadow` annihilates the glass material rim
**MAJOR · glass-ui conformance**

`:182` — `box-shadow: 0 8px 24px color-mix(in srgb, var(--foreground) 8%, transparent);`

`.glass-resting` ships a **three-layer** composite (`dist/styles/glass/ladder.css:67-76`):

```css
box-shadow:
    var(--glass-material-rim),        /* the catch-light that "defines the silhouette" */
    var(--glass-under-shadow-default),
    var(--glass-shadow-resting);
```

`box-shadow` is not additive across rules. The scoped `.filter-panel[data-v-…]` selector (0,2,0, and *unlayered*
versus glass-ui's `@layer components`, `ladder.css:6`) wins unconditionally and **replaces all three layers** with one
generic drop shadow. The panel keeps `.glass-resting`'s background and `backdrop-filter` but loses the rim — the
single element the ladder's own prose (`:78-82`, citing WWDC25 sess. 219) calls load-bearing for the material read.
It is also a raw magic triple (`0 8px 24px`) where `dist/styles/tokens/shadow.css` exists precisely to supply it.

**Falsifier** — Show `box-shadow` composing rather than replacing (it does not), or show the local rule losing the
cascade. It cannot: unlayered author styles outrank `@layer components` regardless of specificity, and the scoped
attribute adds specificity on top.

---

### D-M7 · Disclosure semantics: `aria-pressed` conflated with two different meanings; no `aria-expanded`, no `aria-controls`, no Escape, no outside-click dismissal
**MAJOR · a11y + interaction design**

`:69-71`:

```html
:class="{ 'is-active': showFilters || hasActiveFilters }"
:aria-pressed="showFilters || hasActiveFilters"
@click.stop="showFilters = !showFilters"
```

- The button **is a disclosure** (it opens `:79-129`), so the correct contract is `aria-expanded` +
  `aria-controls` pointing at an `id` on the panel. Neither exists anywhere in the file.
- `aria-pressed` is instead wired to a *disjunction* of two unrelated states. With `showFilters === false` and
  `tierFilter !== "all"`, AT announces "pressed" for a **closed** drawer. The visual channel has the same bug — the
  `is-active` tint (`:159-162`) cannot distinguish "drawer open" from "filters applied".
- No `Escape` handler and no outside-click dismissal exist. `@click.stop` at `:71` is vestigial: it exists to stop
  propagation to a document-level listener that was never registered (`grep` for `document.addEventListener` /
  `onClickOutside` / `useEventListener` in this file → none).
- The panel itself is an anonymous `<div>` — no `role="group"`, no `aria-label`.

**Falsifier** — Find an `aria-expanded`/`aria-controls` binding, a keydown handler, or an outside-click composable in
this component or injected by `Transition`. `<Transition>` (`:78`) supplies no semantics.

---

### D-M8 · The authored icon sizes are dead code; three icons render at two (coarse: three) different sizes
**MAJOR · proportion**

`:47` `<Search :size="16">`, `:62` `<X :size="14">`, `:73` `<SlidersHorizontal :size="15">`.

Lucide's `:size` sets the SVG's `width`/`height` **presentation attributes** (`lucide-vue-next/dist/esm/Icon.js`:
`width: size, height: size`). glass-ui's Button CVA base includes
`[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`dist/button-BNDWhAZb.js`) — a CSS `width`/`height`. Author CSS
always outranks presentation attributes, and the lucide class list (`lucide lucide-x-icon lucide-x`) does not contain
the substring `size-`, so the `:not()` guard does not fire. **The 14 and 15 never render.**

`<Search>` at `:47` is *not* inside a `<Button>`, so it is the only icon that honours its prop. Net result:

| pointer | Search (`:47`) | X (`:62`) | Sliders (`:73`) |
|---|---|---|---|
| fine | 16 px (prop) | 16 px (`--ui-glyph`) | 16 px (`--ui-glyph`) |
| coarse | **16 px (prop, unscaled)** | **24 px** | **24 px** |

On touch the leading glyph stays 16 px while its two siblings in the same 0.5 rem-gap row grow to 24 px — a 1.5×
optical mismatch inside one pill, and the direct cause of the glyph-fills-the-box condition in D-M1.

**Falsifier** — Show a `size-*` class on any of the three lucide elements (there is none, `:47,:62,:73`), or show
that SVG presentation attributes beat author CSS (they do not — they are treated as author rules of specificity 0).

---

### D-M9 · The clear button enters and leaves with no transition, jumping the input by ~32 px on the first and last keystroke
**MAJOR · motion + proportion**

`:55` `v-if="searchQuery"` inside a `display:flex` row (`:143-147`) where the input carries `flex-1 min-w-0`
(`:52`). Mounting the button injects its box (24 px, or 27 px on a phone) plus one `gap: 0.5rem` — the input's
content box shrinks instantly by ~32 px, and the divider and filter toggle translate left by the same amount, while
the caret is mid-typing at that exact moment. It unwinds with the same jump when the field is emptied.

The author clearly knows the technique — the drawer 20 lines below is wrapped in a `<Transition>` (`:78`) with a
hand-tuned enter/leave. The same treatment (or a reserved-width slot, or `opacity`+`pointer-events` instead of
`v-if`) is simply absent here.

**Falsifier** — Show a `<Transition>`, a reserved gutter (`min-width` on a wrapper), or a `visibility`-based
alternation around `:55-63`. Or measure that the jump is <1 px — impossible given `h-6 w-6` + `gap: 0.5rem`.

---

## §3 — MINOR

**D-m1 · Four control heights, no common term.** `:59` (24) · `:68` (28) · `:86,:101` (32) · `:117` `size="sm"`
(36) at fine pointer; 27/31.5/36/60.75 at coarse. Aristotelian proportion requires a ratio someone *chose*; here the
four values arise from four independent local decisions. *Falsifier:* name the ratio. 24:28:32:36 is neither the
glass ladder (28/36/40) nor a 4-px grid used consistently (the 1.7× coarse spread breaks it).

**D-m2 · Four gaps in a two-row panel.** `:210` `gap-0.5` (2 px, glyph↔label) · `:112` `gap-1` (4 px, pill↔pill) ·
`:81` `gap-2` (8 px, select↔select) · `:178` `0.75rem` (12 px, row↔row) — plus `:145` `0.5rem` in the pill. The 2 px
glyph gap is the outlier: a `1.1em` script-ℱ separated from its word by two pixels reads as a typo, not a lockup.
*Falsifier:* show these as a deliberate 2/4/8/12 modular scale — but then `:145`'s 8px in the pill and `:149`'s
6px/12px padding do not sit on it.

**D-m3 · Magic numbers where tokens exist, including one duplicated constant.** `:148` and `:171` both hardcode
`max-width: 32rem` — the drawer's alignment to the pill is maintained by hand, and desynchronises the moment either
is edited. `:150` `0.5rem` and `:181` `0.75rem` radii bypass `--radius-*`; `:182`'s `0 8px 24px` bypasses
`dist/styles/tokens/shadow.css`. *Falsifier:* find a shared custom property binding the two 32rem values. There is
none.

**D-m4 · Dead code.** (a) `:119` `:class="{ active: … }"` — no `.active` rule exists in the scoped block; the styling
is delivered by `[aria-pressed="true"]` at `:218`. (b) `:71` `@click.stop` guards a listener that was never
registered. (c) `:140` `justify-content: flex-start` is inert against a `width: 100%` child. (d) `:118`
`font-medium` and `rounded-full` both restate the CVA base (`font-medium` in the base string; `rounded-pill` in
`size: sm`). *Falsifier:* find a `.active` selector, an outside-click listener, or a second `.search-bar-root` child.

**D-m5 · Two authorities for one colour.** `:52`'s `placeholder:text-muted-foreground/50` utility and `:155-157`'s
scoped `::placeholder` rule set the identical value by different mechanisms; the scoped rule wins (unlayered) so the
utility is inert. Half of a KISS violation and half of a maintenance trap. *Falsifier:* show the two producing
different values — they do not (`color-mix(… 50%, transparent)` ≡ `/50`).

**D-m6 · The divider is a hand-rolled shadow of a shipped primitive, and it is invisible.** `:64`
`<div class="w-px h-5 bg-foreground/10 shrink-0" />`. glass-ui exports `./separator` at 4.0.0 *and* 7.0.0
(`Separator-BArl4OaB.js`). At 10 % alpha the hairline computes to **1.22:1** against the pill background in light
and **1.26:1** in dark — a 1-px rule at that ratio is functionally absent, so the grouping it was drawn to express
(clear-action | filter-action) is not communicated. *Falsifier:* it is decorative, so 1.4.11 does not bind — the
claim is design-efficacy, not conformance; kill it by showing the separation reads at 1.22:1.

**D-m7 · Diverged from the recipe it claims to mirror — three ways.** `:205-208` states that `.basis-pill-btn`
"match[es] `BasisSelector`'s `.basis-toggle` recipe". It does not, and each divergence is a defect:
(a) `.basis-toggle` carries `min-w-[5.5rem]` explicitly *"the 5.5 rem min-width that keeps all three pills
uniform-width"* (`BasisSelector.vue:253-254,259-260`); `.basis-pill-btn` (`:209-212`) has none — so the three
options size to their content, and the content is deliberately incommensurable: `ℱ` (U+2131, one script glyph) vs
`Tₙ` / `Pₙ` (Latin + U+2099 subscript, ~1.6× the advance width), scaled by a magic `text-[1.1em]` (`:124`, not a
token). Three unequal pills for three equal-weight options. (b) `.basis-toggle` sets `border-width: 2px`
explicitly — *"the 2 px border weight the outline variant ships at 1 px"* (`:254,:260`) — while `.basis-pill-btn`
sets only `border-color` and free-rides the variant (this is also what makes the two recipes diverge under the 7.0.0
uplift; see §6 BREAK-2). (c) The custom property is `--pill-color` in the sibling (`:270-272`) and `--pill-c` here
(`:121`, `:214`, `:219-221`) — two names for one concept across two recipes documented as mirrors. *Falsifier:*
show `min-w`/`border-width` reaching `.basis-pill-btn` from elsewhere, or show the two property names unified.

**D-m8 · No search landmark; the panel is anonymous.** `:45` `.search-bar-root` is a bare `<div>` — no
`role="search"` (or `<form role="search">`), and `:80`'s panel has no `role="group"`/`aria-label`. A screen-reader
user cannot jump to the search region and, on reaching the drawer, receives no announcement that a filter group
opened. *Falsifier:* find a landmark role on any ancestor in `GalleryView.vue:219-247` — `:220` is
`class="flex flex-col gap-4 …"`, `:222` is `class="flex flex-col gap-1.5 px-4"`; neither carries a role.

---

## §4 — INFO

**D-i1 · `$event as any` ×2** (`:84`, `:99`) discards exactly the literal unions the props (`:16-18`) and emits
(`:23-24`) went to the trouble of declaring. Design-adjacent because it is the seam where a future `SelectItem`
value typo becomes a silent no-op rather than a typecheck error. *Falsifier:* glass-ui's `Select` emits
`AcceptableValue`; a narrowing helper or a typed wrapper removes the cast without `any`.

**D-i2 · `hasActiveFilters` computes a fact the UI barely spends.** `:39-41` correctly folds all three axes
(including `sort`), but its only consumer is an 8 %-alpha background tint on a 28 px icon button (`:159-162`). There
is no count badge, no "reset filters" affordance, and no summary of what is active — so a user who closes the drawer
with three filters set is told so by a tint whose contrast is untested. *(Given D-B1 the filters do nothing anyway;
this becomes a real defect the moment D-B1 is cured.)*

**D-i3 · Two radius vocabularies in one component.** `:86,:101` force `rounded-lg` onto `SelectTrigger`, whose glass
recipe ships `rounded-pill` (`dist/SelectScrollDownButton-C1jb3b3K.js`), while the basis pills below keep the pill
radius (`:118`) and the container uses raw `0.5rem`/`0.75rem` (`:150`, `:181`). Three radius idioms, no comment
explaining the fork.

---

## §5 — SUPERLATIVES (L-18, both ways)

**S-1 · Named-property transitions, never `transition: all`.** `:186-195` transitions exactly `opacity` and
`transform` — the two compositor-only properties. This is the correct posture and it is *rare*; most drawer code in
the wild ships `transition: all`. *Falsifier:* show a non-compositor property in either list. There is none.

**S-2 · Genuinely correct motion asymmetry.** `:186-203`: enter 0.3 s from `translateY(-8px) scale(0.97)`; leave
0.2 s to `translateY(-4px)` with no scale. Slower and richer in, faster and plainer out, with the leave travelling
half the distance — textbook Apple/Material choreography, arrived at deliberately. That D-B2 kills the enter half is
a *token* failure, not a design failure; the design underneath is right. *Falsifier:* argue the asymmetry is
accidental — the two blocks were clearly authored as a pair (see the `A.W3.d` attribution at `:185`).

**S-3 · The drawer refuses to move the page.** `:77` and `:165-173`: `position: absolute; top: 100%` with an
explicit comment ("overlaid, does not affect flow"). The alternative — an in-flow expanding panel — would push the
entire infinite-scroll grid down on every toggle. The author chose correctly and said why. *Falsifier:* show a
layout shift on toggle; the anchor is out of flow, so there is none.

**S-4 · The file explains its own coupling.** `:205-208` documents precisely which chassis affordances are inherited
from `<Button variant="outline" size="sm">` (focus ring, press scale, pill geometry), what the local hook adds
(`--pill-c` onto border+tint+text), and which sibling recipe it mirrors (`BasisSelector`'s `.basis-toggle`). That is
exactly the comment a reviewer needs and almost never gets — and it is what made D-M6's shadow-annihilation and the
7.0.0 border regression (§6) *diagnosable* rather than guesswork. *Falsifier:* verify the cross-reference — checked:
`BasisSelector.vue:249-272` declares `.basis-toggle` with the identical `--pill-c`-style retint and the same
`[aria-pressed="true"]` selector shape (`:258`, `:264`, `:269`), applied at `:143`. The comment is accurate.

**S-5 · Correct flexbox overflow-safety, all three members.** `:52` `flex-1 min-w-0` on the input plus `shrink-0` on
the leading icon (`:47`), the divider (`:64`) and the filter toggle (`:68`). `min-w-0` on a flex child is the
non-obvious half of this idiom; without it the input's intrinsic min-content width would push the toggle out of the
pill at narrow widths. *Falsifier:* remove `min-w-0` and the row overflows — the presence is load-bearing, not
decorative.

**S-6 · `aria-pressed` is present and semantically right on the basis toggles.** `:120`
`:aria-pressed="basisFilter === b.key"` — a genuine toggle-button state, correctly reflected, and the styling hook
(`:218`) reads the *ARIA attribute* rather than a parallel class, so the visual and the accessible state cannot
diverge. This is a strictly better pattern than the `.active` class the same line-119 binding gestures at. (Contrast
D-M7, where the same author applied `aria-pressed` to a disclosure — the primitive is understood; one of the two
sites picked the wrong contract.) *Falsifier:* show the visual and ARIA states diverging — they cannot; one selector
drives both.

**S-7 · Typographic voice matched to the data.** `:52` `fira-code` on an input whose content is a slug. glass-ui
ships `.fira-code` as a first-class utility (`dist/styles/typography/utilities.css:69`) and this is exactly its
intended use — a monospaced field for a code-like identifier inside an otherwise Computer-Modern-serif page
(`src/style.css:13-15`). *Falsifier:* show slugs are prose. `stores/gallery.ts` keys entries by `slug`; they are not.

**S-8 · `prefers-reduced-motion` is correctly *delegated*, not re-forked.** The component ships no local PRM block,
and — verified, not assumed — it does not need one: glass-ui's `utilities/a11y-overrides.css:6-17` applies
`transition-property: opacity, color, background-color, border-color, box-shadow !important` to
`*:not([data-allow-motion])` under `@media (prefers-reduced-motion: reduce)`, which strips `transform` from
`:186-195` globally and clamps the duration. Several siblings (`GalleryCard.vue:304`, `GalleryMarquee.vue:129`,
`ContourSettings.vue:370`) *do* carry local blocks; this file's restraint is the more correct posture, not an
omission. *Falsifier:* show the library block failing to reach a Vue `<Transition>` class — it is a universal
selector with `!important`, so it reaches everything.

---

## §6 — Under the old pin: what the F.W1 tri-package uplift BREAKS and IMPROVES here

Context: `web/package.json:14` pins `"@mkbabb/glass-ui": "^4.0.0"`; installed 4.0.0; producer latest 7.0.0. Per
CENSUS §3a the bump is one atomic transaction with `keyframes 4.3→6` and `value.js 0.13→4.0`.

**This file is NOT on the census's enumerated break surface** — it imports neither `metric-badge` (×7 files),
`hover-card` (×2), `hover-popover` (×2), any dock member (`DockIconButton` ×2 / `DockDropdownTrigger` ×1), nor
`ToastVariant`. Its two subpaths, `./button` (`:5`) and `./select` (`:6-12`), both survive at 7.0.0. On the census's
own accounting, GallerySearchBar is clean.

**It is not clean.** The census's §5 table enumerates removed *subpaths, members and types*; it does not enumerate
removed **prop shapes**, and `Button`'s prop shape is the single largest un-booked break in the tree.

### BREAK-1 — `Button`'s `variant`/`size` axes are definition-absent at 7.0.0
`glass-ui/src/components/button/Button.vue:15-31` (producer):

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  …
}
```

There is **no `variant` prop** and **no `size: "icon"`**. This file's three affected call sites — `:56-57`
(`variant="ghost" size="icon"`), `:66-67` (same), `:116-117` (`variant="outline" size="sm"`) — all break. At best
`variant` degrades to a stray fallthrough DOM attribute and the styling silently vanishes; `size="icon"` is outside
`ButtonSize` and is a typecheck error against `vue-tsc`.

Repo-wide magnitude, measured: **101** `variant="…"` attribute sites, **38** `size="icon"` sites, across **35** files
that import `glass-ui/button`. That is 2–3× the entire 4→7 break surface the census tabulated, and it is not in the
budget. **This is an addition to the corpus, not a re-statement of it** — I contradict lane-frontend §5's implicit
completeness claim ("Rows that hit fourier-analysis TODAY") on the evidence of the producer's own prop interface.

### BREAK-2 — `.basis-pill-btn` loses its border entirely
The recipe at `:209-221` sets only `border-color` — it inherits `border-width`/`border-style` from
`variant="outline"`'s `"border border-input bg-background …"` (4.0.0, `dist/button-BNDWhAZb.js`). At 7.0.0 the
nearest equivalent is `emphasis="secondary"`, which composes `glass-wash glass-capsule`
(`Button.vue:66-71`), and `.glass-capsule` (`src/styles/glass/glass-capsule.css:35-70`) sets background, backdrop
filter, box-shadow and `border-radius` — **no border**. With `border-style` at its `none` initial value, all three
`border-color` declarations (`:215`, `:220`) paint nothing. The pill's idle outline, hover outline and selected
outline all disappear on the same commit; the only surviving state signal is a 12 % tint whose contrast already fails
(D-M3).

The asymmetry is instructive and is the sharpest single argument in this challenge: the sibling recipe this file's
own comment cites as its model — `BasisSelector.vue:258-262` — declares `border-width: 2px` **explicitly**, and
therefore *survives* the uplift with its outline intact. Two recipes documented as mirrors; one is uplift-safe and
one is not, and the difference is one declaration this file elected to inherit instead of state. Fixing D-m7(b) at
the old pin pre-cures BREAK-2 at zero cost.

### BREAK-3 — `rounded-full` collides with the capsule geometry
`:118` forces `rounded-full`; `.glass-capsule` sets `border-radius: var(--radius-pill)`
(`glass-capsule.css:70`). Cascade order decides which wins and the two are not identical. Cosmetic, but it is a
silent visual diff nobody will attribute to the uplift.

### NO-BREAK — the `Select` family is stable
`glass-ui/src/components/select/SelectTrigger.vue:4-11` keeps `variant?: "default" | "ghost"` and
`size?: "sm" | "default"`, and `select/index.ts` still exports `Select`/`SelectTrigger`/`SelectContent`/`SelectItem`/
`SelectValue`. The four Select call sites (`:82-109`) survive verbatim. `.glass-resting` also survives
(`glass-ui/src/styles/glass/ladder.css:76`), so D-M5's mis-tiering persists across the uplift rather than being
cured by it.

### IMPROVE-1 — the uplift *cures* D-B2 for free, if the token is re-pointed
`--ease-apple-spring` is gone at 4.0.0 and stays gone at 7.0.0; the producer names the replacement explicitly
(`scale-paper.css:357-362`: the emphatic-overshoot register "maps to the playful `--spring-bouncy`"). A one-token
substitution at `:188-189` restores the enter animation *today*, without waiting for the tri-package transaction —
this is the cheapest high-value repair in the file and it does not need the deadlock resolved.

### IMPROVE-2 — 7.0.0's Button brings press physics and specular this file currently hand-rolls around
Producer `Button.vue:64,80-104` wires `useLiquidPress` (a spring-driven `--glass-btn-press-t`) and `v-specular`, plus
`loading`/`aria-busy` and a `guardDisabledActivation` handler for non-native hosts. The `iconOnly` prop also carries
`data-control-target`, the hook the 7.0.0 control system uses for target-size expansion — i.e. the *correct* cure for
D-M1's 24/28 px boxes is `iconOnly` + the `--control-h-*` cohort, not a different hardcoded `h-*`.

### IMPROVE-3 — `@lucide/vue` rename lands on 3 sites here
`:3` imports `Search, X, SlidersHorizontal` from `lucide-vue-next`; 7.0.0 peers `@lucide/vue ^1.16.0` (census §5,
35 sites repo-wide). Mechanical. Worth noting that the rename is the natural moment to add the missing `aria-label`s
(D-B4), since every icon call site is already being touched.

---

## §7 — Corpus reconciliation

**Folded (not re-invented):**
- CENSUS §3a *"the uplift break surface"* and lane-frontend §5 — used verbatim as the frame for §6; I confirm this
  file touches none of the five enumerated rows.
- CENSUS §3a *"glass posture: deepest, cleanest consumer in the constellation"* — consistent with what I found: 0
  direct reka-ui, 0 shadcn copies, correct subpath imports at `:5-12`. The defects here are *within* glass usage, not
  a refusal of it.
- CENSUS §3c PLAW-BIND: *"fourier's parsing today is a 117-line hand-rolled regex file (`web/src/lib/colors.ts`, no
  `oklch()` arm)"* — this is the exact mechanism of D-M2. The census records it as a W.L5 deletion target; I record
  the **UI consequence**: the basis-filter colour system silently collapses to `#888888` on the ordinary navigation
  path. That consequence is not in the census.
- CENSUS §3a: `--viz-amber` WCAG darken carry (`src/style.css:119-129`) — evidence that this repo already treats
  token-contrast as a first-class concern, which is why D-M3/D-M4 read as omissions rather than as an unaware
  codebase.
- CENSUS §3a: *"18 reduced-motion references"* — corroborates S-8's finding that PRM is handled systemically.
- Intake lane `lane-fourier-r3-r6.md`: **no row touches GallerySearchBar** (grep-verified for the slug and for
  `focus`/`aria`/`contrast`/`touch`/`placeholder`/`glass-resting` — the file's 52 rows are Codex-era derivation and
  registry-join adjudications). The one row that bears on this audit is **R5-7** (ADOPT-AS-FACT + CARRY-TO-WAVE →
  F.W4): *"template-loop evidence keyed to component callsites is blind to native HTML element loops."* Applied
  here: this component's only loop is `<Button v-for>` (`:113-114`) — a **component** callsite, therefore visible to
  a callsite-keyed deriver. So R5-7's blind spot does not swallow this file; but the four native `<div>`s at
  `:46,:64,:79,:112` would be invisible to the same deriver, which matters for how F.W4 counts this component's
  surface.

**Contradicted, explicitly:** lane-frontend §5's break-surface table is **incomplete**. It enumerates removed
subpaths, removed dock members, a removed type and three peer-floor bumps — but not removed *prop axes*. `Button`'s
`variant` → `emphasis`+`tone` and `size="icon"` → `iconOnly` migration is definition-absent at 7.0.0
(`glass-ui/src/components/button/Button.vue:15-31`) and hits **101 + 38 attribute sites across 35 files**, which
exceeds every row already in that table. F.W1's budget line ("an order of magnitude above 46 lines") is directionally
right but was reached without this term. Recommend booking it as a distinct break-surface row.

---

## §8 — UNPROVEN-NEEDS-LIVE (for SS-13)

Claims below are *source-derived and consistent* but were not measured in a browser, per the no-browser-tooling law.

1. **D-B2 rendered behaviour** — that the enter visibly snaps while the leave fades. The IACVT reasoning is
   spec-deterministic; only the perceptual read is unproven.
2. **D-M3 composited contrast** — my ratios composite `--pill-c` tint over `bg-background`. The real backdrop
   includes `.glass-resting`'s `backdrop-filter` over whatever gallery content lies beneath. Live sampling could move
   the numbers in either direction (it cannot plausibly close a 1.0–1.2 gap, but measure it).
3. **D-M1 coarse-pointer geometry** — the 60.75 px vs 36 px stack and the glyph-fills-the-box condition follow from
   the token arithmetic; confirm on a real touch device at ≤768 px.
4. **D-M9 jump magnitude** — ~32 px is computed from `h-6` + `gap-0.5rem`; measure the actual caret displacement.
5. **Select label truncation** — two `w-full` triggers at `h-8` inside `flex gap-2` within a 32 rem-capped panel:
   `[&>span]:line-clamp-1` means "Most Viewed" / "All tiers" may ellipsise at narrow widths. Unmeasured.
6. **Drawer occlusion** — `z-index: var(--z-bar)` = 30 (`dist/styles/tokens/scheme-motion.css:337`) vs the portalled
   `SelectContent` at `--z-popover: 130` (`:344`). Ordering looks correct (the portal wins), but confirm the open
   Select renders above the drawer and that the drawer's occlusion of the grid beneath is acceptable.
7. **D-M2 race outcome** — whether the lazy chunk evaluates before or after `resolveVizColors()` on a *deep link* to
   `/gallery` (as opposed to in-app navigation, where the ordering is unambiguous). Both outcomes are defective;
   which one a given entry path yields is the live question.
