claude-opus-5[1m]

# Challenge D — DESIGN · `ConvergenceTimeline.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/convergence/ConvergenceTimeline.vue` (147 lines)
**Axis** DESIGN — spacing/proportion (Aristotelian) · glass-ui conformance UNDER THE OLD PIN (`^4.0.0` installed, producer `7.0.0`) · typography · motion + PRM · a11y · prose · state coverage
**Method** static + source-derived only. No browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries its own falsifier; the three superlatives carry theirs too (L-18 runs both ways).

**Tally** — 19 defects (2 BLOCKER · 7 MAJOR · 6 MINOR · 4 INFO) · 3 superlatives.

## 0 · Read set (read-only)

| File | Why |
|---|---|
| `…/equation/convergence/ConvergenceTimeline.vue` | target |
| `…/equation/ConvergencePlot.vue` (410) | sole consumer (`:14`, `:366-375`); owns `t`/`playing`/`activeCount`, the rAF loop (`:57-70`), the scrub handlers (`:282-291`) |
| `…/equation/convergence/ConvergenceLegend.vue` (97) | in-folder sibling — the empty-state and typography precedent |
| `…/equation/EquationView.vue` | mount site (`:308-317`), `computing`/`error` states (`:221-243`), harmonics domain |
| `…/equation/FunctionInput.vue:184` | `:min="1" :max="100"` — the declared harmonics domain |
| `…/equation/lib/harmonics.ts:20-47` | `groupTrigHarmonics` — the `amp > 1e-14` filter that makes `totalHarmonics === 0` reachable |
| `node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js` | the pinned 4.0.0 Button cva (whole) |
| `node_modules/@mkbabb/glass-ui/dist/slider-DQ95MET2.js` | the pinned 4.0.0 Slider SFC (whole) |
| `node_modules/@mkbabb/glass-ui/dist/glass-ui.css` · `dist/styles/**` | resolved tokens + `.tap-squish` / `.focus-ring` / slider scoped CSS |
| `node_modules/reka-ui/dist/Slider/{SliderRoot,SliderHorizontal,SliderImpl,SliderThumbImpl}.js` | the aria + event forwarding chain (reka 2.9.10) |
| `/Users/mkbabb/Programming/glass-ui/src/components/{button/Button.vue,slider/{Slider.vue,types.ts}}` | producer 7.0.0 — the F.W1 break surface |

## 1 · Hitherto corpus — what is folded, what is new, what is contradicted

**Folded (cited, not re-derived).**

- `formation/fourier/lane-frontend.md:134` books this file at 146 LOC / "`Slider`-driven harmonic timeline". Confirmed (147 incl. trailing newline).
- `lane-frontend.md:382` establishes that all `glass-track`/`glass-fill`/`glass-thumb` occurrences are prose-only, naming `ConvergenceTimeline.vue:6` among them. Confirmed — the header comment's migration claim is honest. Folded into **S-1**.
- `lane-frontend.md:624` books the **COVERAGE GAP**: "`equation/ConvergencePlot.vue`'s own rAF (`:67-69`; the file's `reduce` block at `:405` is CSS-only and does not stop `tick`)… WCAG 2.2.2 is arguably satisfied by the visible play/pause transport." **This challenge's sharpest new contribution is that the mitigation the lane leans on does not exist for assistive tech** — see **D-1**. The lane's "arguably satisfied" is, at AT level, *not* satisfied.
- `CENSUS-2026-08-03.md:102-106` + `lane-frontend.md:450-486` enumerate the uplift break surface (`metric-badge` ×7 files, `hover-card`/`hover-popover` ×4, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant`, `@lucide/vue` ×35, the three peer floors). **Cited and extended** — see **D-2**, which is a census GAP, not a census row.
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` — read for overlap. **No overlap**: `grep -nE "Slider|Button|glass-ui 7|uplift|icon"` over the whole intake returns empty. The 38/52-TRUE lane adjudicates the Codex registry-audit provenance (`R3-*`/`R6-*` rows on `AUDITOR.mjs` derivation), not the component tree. No row id is cited below because none applies. This is stated so the absence reads as *checked*, not *skipped*.

**Contradicted.** None of the corpus is contradicted by the tree at this file. One near-miss worth recording: `lane-frontend.md:70` lists `reka-ui` as having "0 direct imports — its 6 mentions are all prose comments (… `ConvergenceTimeline.vue:16`)". True as written, but the file's *behavioral* dependence on reka is total (aria, focus, keyboard, event forwarding all resolve inside reka — §4, §5). A "0 direct imports" reading understates the coupling; the census's own conclusion (that the Slider is the seam) is unaffected.

## 2 · BLOCKERS

### D-1 · BLOCKER · The play button has no accessible name — and it is the WCAG 2.2.2 mitigation the corpus is leaning on

`ConvergenceTimeline.vue:61-66`:

```vue
<Button variant="glass" size="icon" class="play-btn" :class="{ 'is-playing': playing }" @click="emit('toggle-play')">
  <Transition name="icon-swap" mode="out-in">
    <svg v-if="playing" class="size-3" viewBox="0 0 320 512" fill="currentColor"><path …/></svg>
    <svg v-else       class="size-3" viewBox="0 0 384 512" fill="currentColor"><path …/></svg>
```

The button's only content is a bare `<svg>`: no `aria-label`, no `<title>`, no `sr-only` text, no `aria-hidden` on the glyph. The pinned producer contributes nothing — glass 4.0.0's Button renders `Primitive` with `data-slot`/`data-variant`/`data-size`/`type`/`disabled` and `<slot/>` only (`button-BNDWhAZb.js`, whole file; no `aria-*` emitted anywhere). Accessible name computation therefore terminates empty.

Three compounding consequences:

1. **axe `button-name` (impact: critical)** — a `wcag2a`/`wcag412` rule, i.e. inside the exact tag set `visualization-ux.spec.ts:29` filters on.
2. **State is unannounced.** There is no `aria-pressed`, and the name does not change between play and pause. Even given a name, an AT user cannot read the transport's state — the *only* state carrier is the glyph swap at `:63/:64` and the `.is-playing` tint at `:124-128`.
3. **The 2.2.2 argument collapses.** `lane-frontend.md:624` accepts the ungated rAF because "WCAG 2.2.2 is arguably satisfied by the visible play/pause transport". `ConvergencePlot.vue:324` autostarts that loop unconditionally (`:324` — `nextTick(() => { draw(); t.value = 0; playing.value = true; startLoop(); })`) — no `prefers-reduced-motion` consultation anywhere in either file. So: an animation autostarts, and its *only* stop control is nameless and stateless to AT. The pause mechanism required by 2.2.2 must itself be operable; here it is reachable by Tab but unidentifiable.

**Falsifier.** Show any of: (a) a `<title>` or `aria-label` reaching this `<button>`; (b) glass 4.0.0's Button injecting a name — the compiled cva at `button-BNDWhAZb.js` is 79 lines and contains no `aria`; (c) an axe run over `/equation` reporting zero `button-name` nodes. On (c): the route has **no axe coverage at all** — `grep -rn "AxeBuilder" e2e/` hits only `visualization-ux.spec.ts` and `visualization-crud.spec.ts`, both of which `page.goto("/visualize")`; `/equation` appears exactly once in the suite, at `visual-baseline.spec.ts:34` (`{ slug: "equation", path: "/equation" }` — a screenshot, not an audit). So the gate cannot currently falsify this. See D-19.

**Cure under the pin.** `aria-label` bound to the state (`:aria-label="playing ? 'Pause convergence animation' : 'Play convergence animation'"`) plus `aria-hidden="true"` on both glyphs. Zero glass-version risk.

### D-2 · BLOCKER · `variant="glass"` and `size="icon"` are both definition-absent at glass-ui 7.0.0 — a hard `vue-tsc` break the census break surface does not enumerate

`ConvergenceTimeline.vue:61` passes `variant="glass" size="icon"`. Producer 7.0.0, `glass-ui/src/components/button/Button.vue:15-31`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;

export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // ← the `variant` axis is GONE
    tone?: Tone;
    size?: ButtonSize;           // ← "icon" is GONE
    iconOnly?: boolean;          // ← the replacement: "Square geometry for an accessibly named icon command."
    loading?: boolean;
    …
}
```

`variant` is not a declared prop at 7.0.0, so it degrades silently to a stray DOM attribute. `size` **is** declared, so `size="icon"` is a *typed* assignment failure: `Type '"icon"' is not assignable to type 'ButtonSize'`. `web/package.json:8` builds with `vue-tsc -b && vite build` — the uplift does not compile.

**Scale, measured (`web/src/`, 2026-08-04).**

```
$ grep -rn 'size="icon"'     web/src | wc -l   → 38
$ grep -rn 'size="icon-sm"'  web/src | wc -l   → 0
$ grep -rhoE 'variant="[a-z-]+"' web/src | sort | uniq -c | sort -rn
   49 variant="ghost"    30 variant="outline"   14 variant="standard"   12 variant="glass"
    4 variant="destructive"  4 variant="default"  3 variant="underline"  2 variant="variant"
    1 variant="sidebar"  1 variant="secondary"  1 variant="link"  1 variant="floating"
```

`variant="standard"` (14) is the Slider axis and survives (`glass-ui/src/components/slider/types.ts:5` still exports `SliderVariant = "standard" | "spectrum"`). Of the remainder, the seven names that are glass-4 **Button** cva variants — `ghost`, `outline`, `glass`, `destructive`, `default`, `secondary`, `link` — total **101 occurrences**, and *none* survives into `ButtonEmphasis`. (Honest caveat: that 101 is a textual count over `src/`; some sites are Badge/Tabs/Sidebar rather than Button, so treat it as an upper bound. The `size="icon"` count of 38 is the tight one — `icon` is not a size on any other glass-4 component the app imports.)

**Why this is a census GAP, not a census row.** `lane-frontend.md:450-486` §5 is titled "the 4.0.0 → 7.0.0 uplift break surface" and its table is *"Rows that hit fourier-analysis TODAY"*. Every row is an **export-map** or **member-level** removal (`./metric-badge`, `./hover-card`, `./hover-popover`, `DockIconButton`, `DockDropdownTrigger`, `type ToastVariant`) or a **peer floor**. `./button` is a **retained** subpath — `lane-frontend.md:213` records "35 `@mkbabb/glass-ui/button`" imports and `:236` lists `/button` as present — so the prop-surface rewrite behind a surviving export is invisible to the method that produced §5. `ToastVariant` is booked as "**This is a typecheck-breaking removal**" at 1 site; `size="icon"` is the same class of break at **38**. `CENSUS-2026-08-03.md:185-186` scopes the F.W1 cure to "(metric-badge ×7 files, hover-card/-popover ×4, dock members ×3, `ToastVariant`)" — this component is in none of those buckets yet still breaks the build.

**Falsifier.** Show an `icon` member of `ButtonSize`, a `variant` prop on `ButtonProps`, or a compat alias at 7.0.0. `glass-ui/src/components/button/index.ts` (whole, 6 lines) re-exports only `Button, ButtonProps, ButtonEmphasis, ButtonSize` — no alias layer. Alternatively show a §5 row naming `./button` prop-surface; `grep -n "emphasis\|iconOnly" lane-frontend.md CENSUS-2026-08-03.md` → empty.

**What the uplift *improves* here.** 7.0.0's `iconOnly` sets `:data-control-target=""` (`Button.vue:90`), which is the hook for the coarse-pointer touch floor — it cures **D-5** for free. And `loading?: boolean` + `:aria-busy` (`Button.vue:28`, `:93`) is the first-class seat for the missing loading state in **D-8**.

## 3 · MAJOR

### D-3 · MAJOR · The `aria-value*` trio lands on a `role=generic` span; the harmonic count is never announced, and `aria-label` on that span is itself an axe violation

`ConvergenceTimeline.vue:75-78` binds four ARIA attributes onto `<Slider>`. Trace them through the pinned tree:

- glass 4.0.0's Slider (`slider-DQ95MET2.js`) does **not** set `inheritAttrs: false`, and forwards exactly one attribute to the thumb: `"aria-label": n.$attrs["aria-label"] ?? void 0`. `aria-valuenow` / `aria-valuemin` / `aria-valuemax` are **not** forwarded.
- The remaining `$attrs` fall through onto the single root vnode — reka's `SliderRoot`, which renders `SliderHorizontal` → `SliderImpl` → `Primitive` with `as: "span"` default (`SliderRoot.js` props `as: { default: "span" }`) and **no `role`**.
- reka's thumb *does* carry `role="slider"`, and computes its own values: `SliderThumbImpl.js:60-62` — `"aria-valuenow": value.value, "aria-valuemin": rootContext.min.value, "aria-valuemax": rootContext.max.value`. Those come from `:min="0" :max="100"` at `:72-73`.

Resulting DOM (source-derived):

```html
<span class="glass-slider …" aria-label="Harmonics timeline"
      aria-valuenow="3" aria-valuemin="0" aria-valuemax="8">   <!-- role: generic -->
  …
  <span role="slider" aria-label="Harmonics timeline"
        aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">
```

Three defects in one:

1. **The author's intent is entirely unrealized.** The binding at `:75/:77` says *announce N of total harmonics*. The only element with `role="slider"` announces **percent-of-timeline**. A screen-reader user hears "Harmonics timeline, slider, 42" — never 3-of-8. The correct mechanism is `aria-valuetext`, which glass 4.0.0 also does not forward, so the intent is unreachable under the pin without a wrapper.
2. **ARIA validity.** `aria-valuenow`/`min`/`max` are supported only on `range` roles. On `role=generic` they are prohibited and ignored.
3. **axe `aria-prohibited-attr` (impact: serious)** for `aria-label` on a `<span>` with no role — again inside the `wcag2a` tag set `visualization-ux.spec.ts:29` filters on. `UNPROVEN-NEEDS-LIVE` only for the axe *rule id*; the DOM shape it keys on is source-decidable and shown above.

**Falsifier.** Show glass 4.0.0's Slider forwarding `aria-valuenow` to the thumb (it forwards one attribute — `slider-DQ95MET2.js`, the `SliderThumb` block: `"aria-label": n.$attrs["aria-label"] ?? void 0`, nothing else); or show `SliderRoot`/`SliderImpl`/`Primitive` emitting a `role` (grep `role` across the four reka Slider files → the only hit is `role: "slider"` in `SliderThumbImpl.js:56`); or show the trio being consumed as declared props (glass's `props` block at `slider-DQ95MET2.js` lists 16 names; no `aria-*`).

**Note for the uplift (improvement).** 7.0.0 forwards a curated ARIA set to the thumb — `Slider.vue:281-285` binds `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage`, `aria-invalid` — and ships a dev-time warning for the unnamed case (`Slider.vue:198-216`). Still no `aria-valuetext`; the F.W1 cure needs `aria-describedby` pointed at the `N=` span (`:85`), or an upstream request.

### D-4 · MAJOR · The `transition` shorthand silently truncates glass's `.tap-squish` list — the press spring and the focus-ring easing are destroyed, and the comment above it congratulates itself for the change

`ConvergenceTimeline.vue:114-118`:

```css
/* A.W3.d — named properties + canonical token, no `transition: all`. */
transition:
    color 0.15s var(--ease-standard),
    background-color 0.15s var(--ease-standard),
    border-color 0.15s var(--ease-standard);
```

glass 4.0.0's Button cva puts `tap-squish` on every button (`button-BNDWhAZb.js`, cva base string, first token after `btn-pill`). `dist/styles/utilities/base.css`:

```css
.tap-squish {
    scale: 1;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        border-color     var(--duration-fast) var(--ease-standard),
        box-shadow       var(--duration-fast) var(--ease-standard),
        color            var(--duration-fast) var(--ease-standard),
        opacity          var(--duration-fast) var(--ease-standard),
        scale            var(--duration-fast) var(--spring-smooth);
    transform-origin: center center;
}
.tap-squish:active { scale: var(--scale-press); }
```

`transition` is a **shorthand**: the winning declaration replaces the whole list. Scoped-CSS specificity: `.play-btn[data-v-…]` = (0,2,0) vs `.tap-squish` = (0,1,0). The consumer wins. Net effect:

- **`scale` is dropped from the transition list.** `.tap-squish:active { scale: var(--scale-press) }` still applies — so the press squish *snaps* instead of running `--spring-smooth`. The signature glass press feel is removed from this one button while every sibling glass Button in the app keeps it.
- **`box-shadow` is dropped**, so the `focus-ring` shadow (`utilities/base.css` — `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow) }`) hard-cuts. Defensible in isolation; undeclared and unintended here.
- **`opacity` is dropped** (moot today — no disabled state; see D-8).
- **Duration is off-token**: `0.15s` literal vs `--duration-fast: 0.2s` (`dist/styles/tokens/…`). This button eases 25 % faster than every other glass control on the page.

The irony is load-bearing: the comment claims the A.W3.d win as "named properties + canonical token". It tokenized the **easing** and hardcoded the **duration**, and the very act of naming properties is what truncated the inherited list. A `transition-property`/`transition-duration` longhand pair, or simply deleting the block and letting `.tap-squish` own it, is the cure.

**Falsifier.** Show `.tap-squish` losing the specificity contest (compute both: `.play-btn` + `[data-v-…]` = two simple selectors, class-column 2; `.tap-squish` = one, class-column 1), or show a second `transition` declaration on `.play-btn` restoring `scale`/`box-shadow` (there is none — `:106-118` is the whole rule). `UNPROVEN-NEEDS-LIVE` for the felt difference only; the cascade result is decidable.

### D-5 · MAJOR · Hand-rolled `1.75rem` geometry bypasses `--control-h-*` — 28 px on coarse pointers where the producer *enforces* ≥ 44 px

`ConvergenceTimeline.vue:108-109` sets `width: 1.75rem; height: 1.75rem`, overriding the cva's `size: icon → "h-(--control-h-md) w-(--control-h-md) p-0"`.

The producer's own token block (`dist/styles/tokens/light-dark.css:8-22`) states the contract:

> "The WCAG-2.5.5 44px touch floor is enforced HERE too: `--control-floor` lifts to `--touch-target`, so every scaled control-height `max(scaled, floor)` clamps at ≥ 44px regardless of the scalar… Fine-pointer is byte-identical (`--ui-scale` stays 1)."

```css
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor));
--control-h-md: max(calc(2.5rem  * var(--ui-scale)), var(--control-floor));
--touch-target: 2.75rem;   /* 44px */
```

A literal `1.75rem` reads neither scalar nor floor. On a touch device the play button stays **28 px** while every neighbouring glass control lifts to ≥ 44 px — a proportion break, not just a target-size one: the transport becomes the smallest thing in a row it visually leads.

The sharpest part: **`--control-h-xs` on a fine pointer resolves to `max(1.75rem × 1, 0px)` = exactly `1.75rem`.** The author reimplemented `size="icon-sm"` by hand, byte-identical on desktop, and lost the coarse-pointer uplift and the floor in the process. `size="icon-sm"` → `"h-(--control-h-xs) w-(--control-h-xs) p-0"` exists in the **pinned** 4.0.0 cva. The cure is a one-word prop change and the deletion of `:108-109`, available today, zero uplift risk. (And 7.0.0's `iconOnly` + `data-control-target` is the same cure post-uplift — D-2.)

WCAG grading, honestly: 28 px **passes** 2.5.8 Target Size (Minimum, AA, 24 px) and **fails** 2.5.5 (AAA, 44 px). The stronger claim is design-system: the component defeats an invariant the producer documents as enforced.

**Falsifier.** Show `--ui-scale` not applying (the `@media (pointer: coarse)` block is at `tokens/light-dark.css:17-22`, unconditional), or show `--control-h-xs ≠ 1.75rem` on a fine pointer, or show `.play-btn`'s `width/height` losing to the Tailwind `w-(--control-h-md)` utility (0,2,0 vs 0,1,0 — it does not).

### D-6 · MAJOR · `.is-playing` beats `:hover` at equal specificity by source order — the transport has **zero** hover feedback in its default state

```
:106  .play-btn        { background: color-mix(… --background 60% …); color: var(--muted-foreground); }
:120  .play-btn:hover  { background: color-mix(… --background 85% …); color: var(--foreground); }
:124  .play-btn.is-playing { background: color-mix(… --foreground 8% …); border-color: …; color: var(--foreground); }
```

Scoped compilation appends `[data-v-…]` to each. Specificity: `.play-btn:hover[data-v-…]` = (0,3,0); `.play-btn.is-playing[data-v-…]` = (0,3,0). **Equal.** Source order decides, and `.is-playing` is written *after* `:hover`. So while playing:

- `background` — `:hover`'s `--background 85%` is overridden by `.is-playing`'s `--foreground 8%`. No change on hover.
- `color` — both resolve to `var(--foreground)`. No change on hover.
- `border-color` — `:hover` never sets it. No change.

**Net: hovering a playing button produces no visual delta whatsoever.** And `ConvergencePlot.vue:324` autostarts playback on mount, so *playing is the default state*. The primary control of the instrument is hover-dead the moment the user arrives.

A second defect rides along: the state ladder mixes two colour families. Rest and hover are **background-tinted** (`--background` at 60 % → 85 %, i.e. *lighter and more opaque* in light mode); playing is **foreground-tinted** (`--foreground 8%`, i.e. *darker*). There is no monotonic reading of rest → hover → active; on a light theme the 60 %→85 % step is a near-invisible opacity nudge against an already near-white card (`--card: hsl(36 48% 97%)` vs `--background: --neutral-0: hsl(40 30% 98%)`), so even when it *does* apply the hover cue is carried almost entirely by the text colour.

**Falsifier.** Reorder the two rules and observe the hover return (a pure-CSS check), or show a specificity asymmetry I have miscounted — count simple selectors in the class column: `.play-btn` + `:hover` + `[data-v]` = 3; `.play-btn` + `.is-playing` + `[data-v]` = 3. `UNPROVEN-NEEDS-LIVE` for the "near-invisible" perceptual half of the second paragraph; the cascade half is decidable.

### D-7 · MAJOR · The `3.5rem` count column is under-sized for its own declared domain and silently steals width from the track

`ConvergenceTimeline.vue:85` renders `N={{ activeCount }}/{{ totalHarmonics }}` into `:96-104`:

```css
.timeline-count { font-family: "Fira Code", monospace; font-size: 12px; width: 3.5rem; text-align: right; flex-shrink: 0; }
```

Domain: `FunctionInput.vue:184` declares `:min="1" :max="100"` for Harmonics, and `ConvergencePlot.vue:298-304` computes `activeCount` over `trigHarmonics.length`, so both operands reach three digits.

Arithmetic (Fira Code: 1000 upem, 600 advance ⇒ 0.6 em; at 12 px ⇒ 7.2 px/char; 3.5 rem = 56 px at the default 16 px root):

| Rendered | chars | width | vs 56 px |
|---|---|---|---|
| `N=0/8` | 5 | 36.0 px | 20 px of slack |
| `N=9/100` | 7 | 50.4 px | 5.6 px of slack |
| `N=10/100` | 8 | **57.6 px** | **overflows** |
| `N=100/100` | 9 | **64.8 px** | **overflows by 8.8 px** |

Threshold: 8 characters, i.e. `digits(active) + digits(total) = 5`. Reachable by setting Harmonics to 100 and letting playback pass N=10.

The failure mode is *silent widening*, not clipping: the span is a flex item whose `min-width` is `auto`, so its automatic minimum size is its min-content width. `N=100/100` has no soft-wrap opportunity (UAX #14 forbids a break at a SOLIDUS inside a numeric sequence, `NU SY NU`), so min-content = the full 64.8 px, and the used width is clamped *up* past the declared `3.5rem`. The declared "fixed 56 px column" is a fiction above 7 characters; the excess is taken from `.timeline-track-wrap`'s `flex-1`, so the scrub track shortens as the number grows.

There is a second, always-on proportion defect independent of the overflow: **right-aligning a variable-length string in a fixed column pins the wrong edge.** The composition's stable edge should be the gutter *between the track and the number*; instead the stable edge is the far right, and the gutter breathes from ~20 px (`N=0/8`) to ~0 px (`N=100/100`). The optical rhythm of the dock — 28 px button │ 8 px │ 2 px │ track │ 2 px │ 8 px │ *variable* — has its only unstable interval exactly where the eye lands after tracking the playhead.

**Falsifier.** Show a root `font-size ≠ 16px` (no `html`/`:root` font-size rule in `web/src/style.css`), a different mono advance ratio for the resolved face, `white-space`/`overflow` handling on `.timeline-count` (`:96-104` is the whole rule — none), or a domain cap below 100 (`FunctionInput.vue:184` says otherwise). Sizing the column at `4.5rem`, or `text-align: left`, cures it.

### D-8 · MAJOR · No empty state, no loading state, no disabled state — while the in-folder sibling guards and the parent has both signals in hand

`ConvergencePlot.vue:366-375` renders `<ConvergenceTimeline>` unconditionally. `ConvergenceLegend.vue:17` — same folder, same author, same data — opens with `v-if="harmonics.length"`. The timeline has no such guard.

`totalHarmonics === 0` is reachable, not theoretical: `harmonics.ts:44` filters `if (amp > 1e-14) out.push(…)`, so a constant expression (`f(x) = 1`) yields `trigHarmonics.length === 0` while `result` is truthy and `EquationView.vue:237` renders the whole plot branch. In that state the legend correctly vanishes and the timeline renders **`N=0/0` with a fully live transport**: the play button toggles, `startLoop()` runs a rAF at full rate, and the slider scrubs 0→100 over an animation with nothing in it. `Slider` receives no `:disabled` at `:69-82`; `Button` receives no `:disabled` at `:61`. Both props exist in the pinned 4.0.0 API (`slider-DQ95MET2.js` props `disabled: { type: Boolean }`; `button-BNDWhAZb.js` props `disabled`).

Loading is worse-served: `EquationView.vue:221` and `:239` both track a `computing` flag and `:229`/`:243` an `error` flag, but neither is threaded through `ConvergencePlot` (`:16-21` props: `originalPoints`, `coefficients`, `nHarmonics`, `domain`, `expression`) and therefore neither can reach the timeline. During a recompute the transport keeps animating the *previous* function's harmonics with no affordance that the data underneath is stale.

**Falsifier.** Show a guard on the timeline (`ConvergencePlot.vue:366-375` is the whole call site), or show `trigHarmonics.length === 0` unreachable with a truthy `result` (the `1e-14` filter at `harmonics.ts:44` plus a constant/odd-only spectrum makes it reachable; a square wave already zeroes every even harmonic). The precise repro is stated so a live pass can confirm it: enter `1` as the expression.

### D-9 · MAJOR · Keyboard scrubbing is inert during playback — the scrub state machine is pointer-only

`:80-81` wires the state machine to two signals:

```vue
@pointerdown="onPointerDown"     → emit("scrub-start") → parent stopLoop()   (ConvergencePlot.vue:282-284)
@value-commit="onValueCommit"    → emit("scrub-end")   → parent startLoop()  (ConvergencePlot.vue:289-291)
```

and `:52-53` gates the commit on the pointer flag: `function onValueCommit() { if (!scrubbing.value) return; … }`.

Keyboard interaction never touches `pointerdown`. reka routes arrow/Home/End/PageUp-Down through `SliderImpl.js:29-42` (`onKeydown` → `stepKeyDown`) into `SliderRoot.js:120-124` `updateValues(…, { commit: true })`, which emits `valueCommit` **and** `update:modelValue`. So on an arrow press:

1. `update:modelValue` fires → `tArr` setter (`:40-43`) → `emit("scrub-move", next)` → parent sets `t.value` and redraws.
2. `valueCommit` fires → `onValueCommit()` → `scrubbing` is `false` → **early return**. No `scrub-end`.
3. `scrub-start` was never emitted, so **`stopLoop()` was never called**.

With `playing === true` the rAF `tick` at `ConvergencePlot.vue:59-67` recomputes `t.value` from `now - loopStartTime` on the *very next frame* and discards the keyboard write. Since playback autostarts (`ConvergencePlot.vue:324`), **the default keyboard experience is a focusable, arrow-responsive slider that does nothing.** It "works" only after the user has first found and pressed the nameless play button (D-1).

Two riders:

- **Announcement storm.** During playback `t` drives `tArr` continuously; rounded to integers over a 2 000–12 000 ms cycle (`ConvergencePlot.vue:37-41`) that is ~8–50 `aria-valuenow` changes per second on a focused `role="slider"`. Nothing pauses on focus — the standard scrubber idiom — and there is no `aria-live` policy.
- **State lie.** `onScrubStart` stops the loop but leaves `playing === true` (`ConvergencePlot.vue:282-284` calls `stopLoop()` only), so throughout a drag the button shows the pause glyph while nothing animates.

**Falsifier.** Show `pointerdown` firing for keyboard (it does not), or `onValueCommit` running without a prior pointer (`:53` guards it), or the rAF *not* overwriting `t` while `playing` (`:61-65` recomputes `t.value` unconditionally each tick). `UNPROVEN-NEEDS-LIVE` for the announcement rate; the discard path is decidable.

**Uplift risk, recorded not asserted.** Producer 7.0.0 documents this exact binding class as unreliable — `glass-ui/src/components/slider/Slider.vue:69-82`: *"reka's `<SliderRoot>` is a forwarding component (CollectionSlot + resolveDynamicComponent + forwardRef), so a Vue `@pointerdown` template binding arrives as `$attrs.onPointerdown` and is DROPPED across the Slot/forwardRef boundary — reka's own cached `onPointerdown` shadows it. vue-tsc + units pass; only a real drag catches it (the canonical binding-verification class)."* My own trace of the installed reka 2.9.10 says the handler *does* survive under the pin — `SliderRoot.js:150` `mergeProps(_ctx.$attrs, { … onPointerdown: _cache[0] … })` merges `on*` keys via `[].concat`, which flattens, and `SliderImpl.js` re-merges through `cloneVNode` fallthrough onto `Primitive` — so I do **not** claim a live pointer break today. But `ConvergenceTimeline.vue:80` stakes a load-bearing state machine on an undocumented double-fallthrough path that the producer distrusts by name. **`UNPROVEN-NEEDS-LIVE` (SS-13): drag the track while playing and confirm `stopLoop()` runs.** Under either outcome the design cure is the same — drive `scrub-start`/`scrub-end` off the value stream (or the producer's `data-held`), not off a fallthrough pointer event.

## 4 · MINOR

### D-10 · MINOR · `--slider-scrub-track-height` is a dead token in **both** glass versions

```css
:135  .convergence-slider { --slider-scrub-track-height: 20px; }
```

`grep -rn "slider-scrub-track-height" web/node_modules/@mkbabb/glass-ui/dist/` → **empty**. `grep -rn "slider-scrub-track-height" /Users/mkbabb/Programming/glass-ui/src/` → **empty**. The real knobs are `--slider-track-height` and `--slider-thumb-size` (`glass-ui.css`, scoped `data-v-534634a7`: `.glass-slider[data-size=md] { --slider-track-height: 1.25rem; --slider-thumb-size: 1rem }`; producer 7.0.0 `slider/Slider.vue:314-334` documents the same pair and the compile-only-in-source-mode reason the names ship as CSS).

The declaration is inert. It reads as intentional geometry and is not — the track is 20 px purely because `1.25rem` is the `md` default and the author's target happened to match. Any future size change, or a reader trusting the override, is mis-served. `--slider-scrub-*` is the naming of the retired shadow recipe the header comment (`:5-7`) says was migrated away from; this is its last unswept residue.

**Falsifier.** Produce one definition of `--slider-scrub-track-height` in either tree, or show the track measuring ≠ 20 px with the line deleted (it cannot — `md` is the default `size`, and `:69-82` passes no `size`).

### D-11 · MINOR · Typography off-token, and three mono sizes inside one instrument

`:97-98` hardcodes `font-family: "Fira Code", monospace; font-size: 12px`. glass ships the canonical stack: `--font-mono: var(--font-stack-mono)` where `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace` (`dist/styles/typography/…`). The literal drops two fallbacks and, more importantly, pins the family at the consumer so a producer rebase cannot reach it.

The size is worse than off-token, it is **incoherent within the instrument**:

| Surface | size | provenance |
|---|---|---|
| `.timeline-count` | **12 px** | `ConvergenceTimeline.vue:98` |
| `.legend-label` | 13 px | `ConvergenceLegend.vue:90` (same folder) |
| `.curve-tooltip` | 13 px | `ConvergencePlot.vue:391` (parent) |

Three numeric readouts of the same plot, in the same mono face, at two sizes — and the odd one out is the one that sits on the same baseline row as the transport. `12px` is also a raw pixel value against glass's `--control-text-sm` scale, so it ignores the root-size preference the rest of the control chrome honours.

**Falsifier.** Show `--font-mono` resolving to something other than the hardcoded stack (it resolves to a superset), or a deliberate 12-vs-13 rationale in the file (`:96-104` carries no comment), or a `--control-text-*` token equal to `12px` that would make the literal a coincidence rather than a bypass.

### D-12 · MINOR · The only motion the component *adds* is the only motion nobody gates under `prefers-reduced-motion`

```css
:140  .icon-swap-enter-active, .icon-swap-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
:144  .icon-swap-enter-from { opacity: 0; transform: scale(0.7); }
:145  .icon-swap-leave-to   { opacity: 0; transform: scale(0.7); }
```

A `scale(0.7)` is motion, not a fade. The file has **no** `@media (prefers-reduced-motion: reduce)` block. Both neighbours do gate:

- glass gates its own press: `dist/styles/utilities/base.css` — `@media (prefers-reduced-motion: reduce) { .tap-squish:active { scale: 1; } }`.
- The parent gates its tooltip: `ConvergencePlot.vue:405-408` — `@media (prefers-reduced-motion: reduce) { .curve-tooltip { animation: none; } }` — with the comment at `:399-401` naming the A.W3.d provenance.

So the precedent exists on both sides of this file and is not followed inside it. `lane-frontend.md:612-624` counts 18 PRM references across 12 files and books the two ungated *clocks*; this is a third, smaller gap in the same class, at the site that controls one of those clocks. `transition: … ease` also passes on the `--ease-standard`/`--spring-smooth` tokens the same file tokenizes three lines earlier (D-4) — the bare `ease` keyword is the CSS default, not a decision.

**Falsifier.** Produce a PRM block reaching `.icon-swap-*` (`grep -n "prefers-reduced-motion" ConvergenceTimeline.vue` → empty; the scoped `data-v` hash confines any global rule from matching by class name alone), or argue `scale(0.7)` at 0.1 s is below the vestibular threshold — a live judgement, `UNPROVEN-NEEDS-LIVE`.

### D-13 · MINOR · `mode="out-in"` blanks the glyph on every toggle, and the two glyphs are optically mismatched

`:62` — `<Transition name="icon-swap" mode="out-in">` with 0.1 s each way. `out-in` serializes: the outgoing glyph fades to `opacity: 0` and *unmounts* before the incoming one mounts. For ~100 ms on every press the 28 px button is **empty** — the state change is communicated by a blank. A same-slot binary state swap is the canonical crossfade case (both absolutely positioned, simultaneous), not the out-in case; out-in exists for content of differing size where overlap would jump. Here it cannot jump: both `<svg>` elements are forced to `size-3` (12 × 12) at `:63/:64`, so the box is identical.

Inside that identical box the glyphs are not: pause is `viewBox="0 0 320 512"`, play is `viewBox="0 0 384 512"`. With the default `preserveAspectRatio="xMidYMid meet"` both scale to fit 12 px of height, so the rendered glyph widths are 320 × (12/512) = **7.5 px** and 384 × (12/512) = **9 px** — a 20 % optical-weight difference between the two states of one control. The play triangle is also centred geometrically; a triangle's optical centre sits right of its bounding-box centre, which is why the idiom nudges it ~1 px right. Neither is compensated.

Ratio check while here: a 12 px glyph in a 28 px button is 0.43; glass's own default for this slot is `--ui-glyph: calc(1rem * var(--ui-scale))` = 16 px, which the `class="size-3"` at `:63/:64` deliberately opts out of (the cva guard is `[&_svg:not([class*=size-])]:size-(--ui-glyph)` — `size-3` matches `[class*=size-]`, so the token never applies). At `--control-h-xs` geometry (D-5) the canonical pairing is 16/28 = 0.57.

**Falsifier.** Show `mode="out-in"` overlapping (it does not, by definition), or equal rendered widths (the viewBox ratio is arithmetic), or a `preserveAspectRatio` override on either `<svg>` (`:63/:64` carry `class`, `viewBox`, `fill` only). `UNPROVEN-NEEDS-LIVE` for whether the 100 ms blank is *noticed*; the blank itself is decidable.

### D-14 · MINOR · The child owns its outer margin, and the track inset is an off-scale magic nudge

```css
:92   .timeline-dock       { @apply flex items-center gap-2 mt-2; }
:130  .timeline-track-wrap { @apply flex-1 min-w-0 relative flex items-center; padding: 0 0.125rem; }
```

`mt-2` is the *gap between the plot and the timeline* — a composition decision belonging to `ConvergencePlot.vue`, which places the two as siblings (`ConvergencePlot.vue:338-375`) with no wrapper and therefore no way to re-space them. The component cannot be reused at another rhythm without editing it.

`padding: 0 0.125rem` is 2 px, off the 4 px scale everything else in the file uses (`gap-2` = 8, `mt-2` = 8). It carries no comment and no derivation. Its effect is to inset the track by 2 px on each side, so the horizontal rhythm reads 28 │ 8 │ 2 │ *track* │ 2 │ 8 │ 56 — two different gap magnitudes doing the same job, adjacent.

**Falsifier.** Show `ConvergencePlot.vue` wrapping the timeline in a spacing container (`:366-375` — it does not), or a token/comment justifying `0.125rem` (none in the file), or a reason the inset cannot be folded into the flex `gap`.

### D-15 · MINOR · The glass paint is hand-rolled — `variant="glass"` buys almost nothing, and the state ladder mixes two colour families

`:110-113` overrides, in one rule, every visual property the glass variant supplies:

| Consumer literal | glass token it displaces |
|---|---|
| `border: 1.5px solid color-mix(in srgb, var(--foreground) 10%, transparent)` | `btn-glass` border + `--glass-border-resting` / `--glass-border-floating` |
| `background: color-mix(in srgb, var(--background) 60%, transparent)` | `glass-wash` + `--glass-bg-resting` / `--glass-bg-floating` |
| `backdrop-filter: blur(8px)` | `--glass-blur-quiet` (`blur(calc(var(--glass-blur-quiet-radius) * …))`) |
| `color: var(--muted-foreground)` | cva's `text-foreground` |

What survives from `variant="glass"` after `:106-118` is `btn-pill`, `focus-ring`, `tap-squish` (truncated — D-4), `cursor-pointer`, `active:scale`, and the disabled utilities. The variant is nominal.

Two concrete riders:

- `backdrop-filter` is written **unprefixed only**. glass's own output ships the pair (`glass-ui.css`: `-webkit-backdrop-filter: var(--slider-range-blur, …)` on `.slider-range`). the toolchain has no autoprefixer — there is no `postcss.config.*` in `web/` at all, and `vite.config.ts:34-35` configures PostCSS inline with `plugins: [(await import("@tailwindcss/postcss")).default]` only — so on Safari < 18 this button loses its blur while the slider beside it keeps it.
- `border: 1.5px` is a sub-pixel width at 1 dppx; it resolves to a device-dependent 1-or-2 px and is off any glass border token. (The parent does the same at `ConvergencePlot.vue:396`, so this is a house habit, not a one-off.)

And the colour-family split noted in D-6: rest/hover are `--background`-tinted, `.is-playing` is `--foreground`-tinted. Two bases, one three-step ladder.

**Falsifier.** Show a glass token whose resolved value equals any of the four literals (`--glass-bg-resting: color-mix(in srgb, var(--card) calc(…) …)` — not `--background 60%`), or an autoprefixer in the build (`vite.config.ts:34-35` is the whole PostCSS plugin list; `web/package.json:20-38` devDependencies carry no `autoprefixer`), or that `variant="glass"` contributes a property that survives the override.

## 5 · INFO

### D-16 · INFO · Redundant declarations

- `:107` `@apply … rounded-full` — glass's cva already applies `btn-pill` (`dist/styles/…` `.btn-pill` sets the pill radius); `--radius-pill: 9999px` equals `rounded-full`.
- `:107` `@apply … cursor-pointer` — the cva base string already contains `cursor-pointer` (`button-BNDWhAZb.js`).
- `:103` `font-variant-numeric: tabular-nums` on a fixed-advance face (Fira Code, 600/1000 for every glyph) — a no-op; harmless, but it signals uncertainty about whether the face is actually monospaced, which matters for D-7's arithmetic.

*Falsifier:* show any of the three changing computed style. `UNPROVEN-NEEDS-LIVE` for the third only if a non-Fira fallback resolves.

### D-17 · INFO · Two small state/semantics mismatches in the transport

- `playing` is not cleared during a scrub (`ConvergencePlot.vue:282-284` calls `stopLoop()` alone), so the pause glyph shows while the animation is stopped. The `.is-playing` tint likewise persists over a still frame.
- `togglePlay` resets with `if (t.value >= 0.99) t.value = 0` (`ConvergencePlot.vue:274-277`) — a forward-only "restart from the end" idiom. The loop is a **ping-pong**: `t.value = cycle % 2 === 0 ? frac : 1 - frac` (`ConvergencePlot.vue:65`). `t` therefore rarely rests near 1, and the reset almost never fires. Separately, a scrub track whose playhead spontaneously reverses is an unusual affordance with no indicator that the timeline bounces.

*Falsifier:* show `playing` being cleared on scrub-start, or `t` reliably ≥ 0.99 at pause under a ping-pong clock.

### D-18 · INFO · `N=` overloads the app's own symbol

`:85` renders `N={{ activeCount }}/{{ totalHarmonics }}`. Elsewhere in the same view `N`/`nHarmonics` means the **requested** harmonic count — `FunctionInput.vue:183-186` labels the control "Harmonics", `EquationView.vue:28` names the ref `nHarmonics`, and `:54` derives `vizHarmonics`. Here `N` means *how many are currently drawn*, and the denominator is a third quantity again (`trigHarmonics.length`, post-`1e-14` filter, ≤ `vizHarmonics`). A reader who has just set "Harmonics = 20" and reads `N=6/17` has three numbers and one letter. The legend beside it uses `n=` for the harmonic *index* (`ConvergenceLegend.vue:37`), so upper- and lower-case `N`/`n` carry different meanings 100 px apart.

*Falsifier:* show `totalHarmonics === nHarmonics` always (the `1e-14` filter and the `maxK` slice at `harmonics.ts:44-46` break it for any spectrum with zeros — e.g. every square wave).

### D-19 · INFO · `/equation` has no a11y gate, so D-1 and D-3 are structurally uncatchable

`grep -rn "AxeBuilder" web/e2e/` → `visualization-ux.spec.ts:2` and `visualization-crud.spec.ts:2`. Both `checkA11y` helpers (`visualization-ux.spec.ts:26-42`, `visualization-crud.spec.ts:83-99`) filter to `serious`/`critical` under `wcag2a|wcag2aa|wcag21a|wcag21aa` — the right net — but both are driven from `page.goto("/visualize")` (`openWorkspace`, `:45-47`). `/equation` appears exactly once in the suite: `visual-baseline.spec.ts:34`, a screenshot row. `CENSUS-2026-08-03.md` §2 already books "**vitest ABSENT** — the only frontend gates are `vue-tsc` + 29 Playwright tests on a single chromium project"; this is the route-level corollary. A `checkA11y(page, "equation")` after the equation route settles would have caught D-1 (`button-name`, critical) and D-3 (`aria-prohibited-attr`, serious) at zero authoring cost, because the helper already exists twice.

*Falsifier:* an axe invocation on `/equation` anywhere in `web/e2e/` — grep says none.

## 6 · Superlatives (L-18 runs both ways)

### S-1 · The header doc-block is the provenance standard the rest of the corpus should be held to

`ConvergenceTimeline.vue:2-17` names the wave (`P.W5 Lane B.4`), the delta (166 LOC → 147), exactly what was retired (`glass-track`/`glass-fill`/`glass-thumb` + the manual pointer state machine), what deliberately stayed consumer-owned **and why** ("chassis-level concerns; not the slider scrubber proper"), a *negative* fact with its mechanism ("Dock-keep-open isn't directly wired here — this site isn't a `<GlassDock>` descendant — but the variant's internal `useOptionalDockContext()` resolves to `null` and the behavior is a no-op"), and the unit adaptation ("`[0..1]` `t` axis … by scaling by 100").

I checked all five claims against the tree rather than accepting them:

| Claim | Verified against |
|---|---|
| `<Slider variant="standard">` is the migration target | `slider-DQ95MET2.js` cva `variants.variant: { standard, spectrum }`; survives at 7.0.0 (`slider/types.ts:5`) |
| the shadow paints are gone | `lane-frontend.md:382` — all `glass-track`/`glass-fill`/`glass-thumb` occurrences corpus-wide are prose-only |
| `useOptionalDockContext()` resolves `null` here | the composable exists in the pinned build (`dist/dockContext-Bu1Avy-a.js`, re-exported via `dist/dock.js`) and in 7.0.0 (`glass-ui/src/components/dock/composables/dockContext`); the compiled Slider calls it and passes the result to `useDockHold`, which no-ops on `null` |
| the ×100 axis adaptation | `:39` `Math.round(props.t * 100)` / `:41` `/ 100` |
| the consumer-owned split | borne out by the template: `Button` and `.timeline-count` are outside the slider |

Zero stale claims — unusual for a migration comment at four waves' remove, and the reason several findings above could be adjudicated *from the file* rather than by excavation. **Falsifier:** one claim in `:2-17` the tree contradicts. I looked for one specifically and found none.

### S-2 · `tArr` is a total, allocation-free bridge with no shadow state

```ts
:38  const tArr = computed<number[]>({
:39      get: () => [Math.round(props.t * 100)],
:40      set: (arr) => {
:41          const next = Math.max(0, Math.min(1, (arr[0] ?? 0) / 100));
:42          emit("scrub-move", next);
```

The obvious implementations of a continuous-prop → integer-array bridge are a local `ref` plus a `watch` (two sources of truth, a feedback loop to break) or a `v-model` on a derived object (stale-read hazards — the value.js `useColorModel` note in project memory is the scar). This is neither: a `computed` with a setter, the prop as the sole source of truth, and no writable state anywhere in the component except the pointer flag.

It is also **total**. `arr[0] ?? 0` absorbs the empty-array case (reachable — reka types `update:modelValue` as `number[] | undefined`); the `max/min` sandwich guarantees the emitted `t` lands in `[0, 1]` for *any* input including `NaN`-adjacent arithmetic; the getter is pure and cannot re-enter the setter. Downstream, `ConvergencePlot.vue:285-288` can assign `t.value = newT` with no validation of its own and that is correct, not lucky.

**Falsifier:** an input reaching `:41` that escapes `[0, 1]`, or a redundant emit on a getter-driven update (there is none — reka writes `modelValue` only from `updateValues`, i.e. only from user interaction; the rAF-driven `props.t` changes flow through the getter and never trigger the setter). This is the file's best code and the reason D-9 is a *wiring* defect rather than a state-management one.

### S-3 · The colour tokens chosen clear WCAG AA in both themes — computed, not assumed

`:99` and `:113` both use `var(--muted-foreground)`, which resolves to `--neutral-5` (`dist/styles/tokens/color-radius.css:85`), over a `--background`-derived surface (`--background: var(--neutral-0)`). Resolving the literals and computing relative luminance:

| Theme | `--muted-foreground` | surface | ratio |
|---|---|---|---|
| light | `hsl(30 22% 40%)` → rgb(124,102,80), L = 0.1438 | `hsl(40 30% 98%)` → rgb(251,250,248), L = 0.955 | **5.19 : 1** |
| dark | `hsl(34 14% 62%)` → rgb(172,160,145), L = 0.3598 | `hsl(24 9% 4%)` → rgb(11,10,9), L = 0.0031 | **7.72 : 1** |

Both clear 4.5 : 1 for the 12 px `N=` text (WCAG 1.4.3) and 3 : 1 for the play glyph as a non-text affordance (1.4.11), in both themes, with headroom. Given how much of the rest of the paint is hand-rolled (D-15), the one thing the component did *not* hand-roll is the thing where hand-rolling would have hurt — it reached for the semantic token rather than a literal grey.

**Falsifier / caveats, stated:** (a) `glass/ladder.css:150,203` and `dock/morph.css:335` re-bind `--muted-foreground: var(--foreground)` inside nested-glass and dock scopes — if this site ever becomes a ladder or dock descendant the computation shifts (it would shift *up*, toward `--foreground`, so the ratio improves); the component's own header comment (`:9-10`) asserts it is not a `<GlassDock>` descendant, which I verified against `EquationView.vue:308-317` (`.cartoon-card`, not a dock); (b) the button's `--background 60%` mix sits over `--card` (`light-dark(hsl(36 48% 97%), hsl(24 8% 16%))`), whose light value is within 1 % L\* of `--neutral-0`, so the light figure is stable; the dark figure is computed against `--neutral-0` and would read ~6.4 : 1 against `--card` — still AA. (c) `UNPROVEN-NEEDS-LIVE` for the composited result through `backdrop-filter: blur(8px)` over the moving plot canvas, which no static method can settle.

## 7 · F.W1 uplift ledger for this component

| Surface | Under the pin (4.0.0) | At 7.0.0 | Verdict |
|---|---|---|---|
| `Button variant="glass"` (`:61`) | cva variant, applies `glass-wash btn-glass` | **absent** — axis is `emphasis` + `tone` (`button/Button.vue:15,20-22`) | **BREAKS** (silent: degrades to a stray attribute; `emphasis` default `secondary` happens to keep glass) — **census gap** |
| `Button size="icon"` (`:61`) | `h-(--control-h-md) w-(--control-h-md) p-0` | **absent** — `ButtonSize = "xs"｜"sm"｜"md"｜"lg"`; replacement is `iconOnly` | **BREAKS HARD** — `vue-tsc -b` failure; 38 sites app-wide — **census gap** |
| `Slider variant="standard"` (`:71`) | cva variant | retained (`slider/types.ts:5`) | safe |
| `Slider :min/:max/:step` (`:72-74`) | reka passthrough | retained (`slider/types.ts:14-16`) | safe |
| `@value-commit` (`:81`) | declared emit | retained (`slider/Slider.vue:30-32`) | safe |
| `@pointerdown` (`:80`) | fallthrough → SliderRoot (survives in reka 2.9.10 by `mergeProps` `[].concat` flattening) | producer documents this class as DROPPED across the Slot/forwardRef boundary (`slider/Slider.vue:69-82`) and moves its own hold to native listeners | **AT RISK** — see D-9; verify live |
| `aria-value*` (`:75-77`) | lands on `role=generic` root; never announced | 7.0.0 forwards a curated ARIA set to the thumb (`Slider.vue:281-285`) — still no `aria-valuetext` | improves, does not cure (D-3) |
| `--slider-scrub-track-height` (`:136`) | dead | dead (`grep` over producer `src/` → empty) | inert both sides (D-10) |
| `.tap-squish` truncation (`:115-118`) | consumer shorthand wins | 7.0.0 adds `useLiquidPress` (`Button.vue:61-64`) writing `--glass-btn-press-t`; the consumer shorthand still truncates whatever transition list ships | **persists, possibly worsens** (D-4) |
| `--control-h-*` bypass (`:108-109`) | loses coarse scale + 44 px floor | `iconOnly` sets `data-control-target` — the floor hook | **cured by the uplift** if `:108-109` is deleted (D-5) |
| no loading state (D-8) | none available on Button | `loading?: boolean` + `aria-busy` (`Button.vue:28,93`) | **enabled by the uplift** |

**Recommended census amendment.** `lane-frontend.md` §5 should gain a row class it currently lacks: *prop-surface breaks behind retained subpaths*. `./button` is the largest instance (38 `size="icon"` + up to 101 `variant="…"` sites, against a §5 table whose largest row is 7 files). `CENSUS-2026-08-03.md:102-106` ("the uplift break surface") and `:185-186` (the F.W1 cure scope) both under-state the budget by roughly an order of magnitude on this axis — which is notable given `:107` already warns "the 3.1→4.0 hop cost 46 lines; 4→7 is an order of magnitude above."

## 8 · `UNPROVEN-NEEDS-LIVE` register (SS-13)

| # | Claim needing a live pass | Repro |
|---|---|---|
| 1 | axe rule ids for D-1 (`button-name`, critical) and D-3 (`aria-prohibited-attr`, serious) | add `checkA11y(page, "equation")` after `/equation` settles — the helper already exists at `visualization-ux.spec.ts:26` |
| 2 | D-9's pointer half — whether `@pointerdown` at `:80` reaches `onPointerDown` under glass 4.0.0 + reka 2.9.10 | press play (autoplays), drag the track, assert `stopLoop()` ran (the plot freezes under the cursor) |
| 3 | D-9's announcement rate on a focused `role="slider"` during playback | VoiceOver/NVDA, focus the track, observe |
| 4 | D-7's failure *mode* — silent widening (predicted) vs. visible overflow | Harmonics = 100 on a full-spectrum function; measure `.timeline-count` computed width past N=10 |
| 5 | D-6's perceptual half — how invisible the 60 %→85 % hover step is in light theme | hover the button while paused |
| 6 | D-13's 100 ms blank | toggle play/pause, high-speed capture |
| 7 | D-15's Safari blur loss | Safari < 18, compare `.play-btn` against `.slider-range` |
| 8 | S-3 composited contrast through `backdrop-filter` over the moving canvas | sample the rendered pixels mid-animation |

Every other claim in this document is decidable from the read set in §0 and carries its falsifier inline.
