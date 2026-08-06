claude-opus-5[1m]

# CHALLENGE · TransportDock · axis D (DESIGN)

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/TransportDock.vue` (403 lines)
**Date** 2026-08-06 · **Mode** static + source-derived + built-artifact verification. No browser tooling (SS-13 owns the visual pass).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries a falsifier and a false defect is worse than a missed one. Three of my initial claims were killed by their own falsifiers and are recorded as **WITHDRAWN** rather than deleted.

**Tally** 20 defects (3 BLOCKER · 5 MAJOR · 12 MINOR/INFO) · 4 superlatives · 3 withdrawn claims.

---

## 0 · Read set

Component whole, plus every file it imports, read-only:

| file | role |
|---|---|
| `demo/components/instrument/transport/TransportDock.vue` | subject |
| `demo/components/instrument/transport/TransportDock/usePlayActuation.ts` | actuation contract |
| `demo/components/instrument/transport/TransportDock/useMenubarMeasure.ts` | ResizeObserver → `:root` publish |
| `demo/components/instrument/transport/TransportDock/useIconSpin.ts` | reset-icon animation |
| `demo/components/instrument/surfaceTabs.ts` | `dockCardinality` |
| `demo/components/instrument/transport/AnimationControlsGroup.vue` | sole call-site (mount gate + `TooltipProvider`) |
| `demo/kf-engine.ts`, `src/animation/constants/{defaults,types}.ts`, `src/animation/internal/reduced-motion.ts` | engine PRM contract |
| `demo/styles/{style,layout,design-idioms,playback-idiom}.css` | demo cascade |
| `@mkbabb/glass-ui@7.0.0` dist — `button/{Button.vue.d.ts,styles.css}`, `dock/**` (`GlassDock`,`DockControl`,`DockTrigger`,`DockSeparator`, `styles/*`), `tooltip/*`, `status-dot`, `_shared/feedback.d.ts`, `styles/tokens/{sizing,scale-paper,light-dark}.css`, `styles/utilities/{btn,a11y-overrides}.css`, compiled `dock.js`/`button-*.js`/`tooltip-*.js` | producer truth |
| `reka-ui/dist/Tooltip/TooltipTrigger.js` | trigger semantics |
| `dist/gh-pages/assets/index-CL_QYCiO.css` (571 KB, built 2026‑07‑16) | **shipped artifact** — used to settle cascade-order and token-resolution questions that source alone leaves open |

---

## 1 · BLOCKERS

### D-B1 · `--dock-margin` is a phantom token — the dock's entire safe-area + anchor geometry is invalid-at-computed-value-time
**Severity BLOCKER** · `TransportDock.vue:9, 388-392, 393-397` · `demo/styles/layout.css:80,92,117,135,161,166,204`

`--dock-margin` is **consumed 10 times and defined zero times** — in source, in `@mkbabb/glass-ui@7.0.0`, and in the shipped bundle.

```
dist/gh-pages/assets/index-CL_QYCiO.css   DEFS=0   USES=10
grep -rho -- "--dock-margin *: *[^;}]*" dist/gh-pages   →  (empty)
grep -rho "@property --[a-z-]*" node_modules/@mkbabb/glass-ui/dist  →  --dock-local-scale, --dock-morph-t,
                                                                        --dock-press-t, --dock-scale, --dock-t   (no --dock-margin)
```

The component's own scoped rule is the most-specific consumer:

```css
/* TransportDock.vue:387-392 → built as .menubar-safe-pb[data-v-ced9849e] */
padding-bottom: max(calc(var(--dock-margin) / 2), env(safe-area-inset-bottom, 0px));
```

Three consequences, each decidable from the CSS Variables substitution rules:

**(a) the safe-area reservation is dead — and it takes `py-1.5` with it.** An undefined, unregistered custom property substitutes to the guaranteed-invalid value, so `calc(var(--dock-margin)/2)` makes the whole `max()` invalid at computed-value time; the declaration then computes to the property's inherited value, and `padding-bottom` is not inherited → **initial `0`**. The `@supports not (padding: env(...))` arm at `:393-397` uses the same expression and fails identically. Because the scoped selector (`0,2,0`) out-specifies the host's `py-1.5` utility (`0,1,0`), the *winning* declaration is the one that computes to zero — the 6px baseline is destroyed too. The 10-line comment at `:377-386` states this rule exists to cure exactly the case it now reproduces ("*on a browser without env() support the whole max() collapsed*"); it collapses on **every** browser.

**(b) the "dead" fallback at `:9` is the LIVE path.**
```html
style="bottom: var(--dock-bottom-anchor, var(--work-area-bottom-offset, 0px));"
```
`--dock-bottom-anchor` (layout.css:128-136) ends in `+ var(--dock-margin) / var(--phi)` → guaranteed-invalid → **the fallback fires**. The transport is therefore positioned by the raw optical offset `0.618 × slack` with **no `env(safe-area-inset-bottom)` max**, **no φ push**, and **no `--dock-anchor-ceiling` (4rem) cap** — all three of which live only inside the token that never resolves. On a notched phone the slack is near zero, so `bottom` ≈ 0 *and* `padding-bottom` = 0 per (a): the pill sits flush under the home indicator. On a tall viewport with a clamped work-area the uncapped `0.618 × slack` floats the dock arbitrarily far up.

**(c) the whole `useMenubarMeasure` cure is inert.** `--dock-band-reserve` / `-stable` (layout.css:78-96) are `max(calc(… + var(--dock-margin) + …), var(--menubar-measured-h, 0px))` → invalid → so is `--dock-menubar-reserve` (`:104`). The 33-line comment at `TransportDock.vue:259-291` and the entire `useMenubarMeasure.ts` ResizeObserver publish `--menubar-measured-h` into a `max()` that never computes. The CH-3 mobile-sheet occlusion cure is present in source and absent in effect.

**Falsifier.** Any reachable `--dock-margin:` declaration at or above `:root`; an `@property --dock-margin` with an `initial-value`; or a runtime `setProperty("--dock-margin", …)`. I searched: all of `demo/`, the repo excluding `docs/` and `node_modules/`, every `.css` in `glass-ui@7.0.0/dist`, every `@property` registration in both trees, and the shipped bundle. Zero definitions, ten uses. **A live `getComputedStyle(document.documentElement).getPropertyValue('--dock-margin')` returning a length kills this claim outright**; a non-zero computed `paddingBottom` on the menubar host kills clause (a).

**Corpus fold.** `lane-frontend.md §6.3` books the flat-namespace hazard as "*a collision surface worth a lane of its own*" and tallies 11 demo-owned `--dock-*` tokens — `--dock-margin` is not among them. This is that hazard's first *live* casualty and the token-level sibling of **F-1** (glass-ui itself a phantom dependency): the same class of unowned reference, one level down. `F-1` blocks reproducibility; `D-B1` blocks correctness. Neither is visible to `tsc`, `eslint`, or the demo build — CSS never errors, it just silently computes zero.

---

### D-B2 · the primary CTA's white glyph never reaches 3:1 against its own gradient — in either theme
**Severity BLOCKER** · `TransportDock.vue:65-67, 75-76` (expanded) · `:201-203, 211-212` (collapsed mirror)

Both play controls set `text-white` (`.text-white{color:var(--color-white)}`, `--color-white:#fff`) over `.rainbow-pastel` (idle) or `.rainbow-vivid` (playing). Contrast computed from the shipped token values (oklch → sRGB → WCAG relative luminance):

**`.rainbow-pastel` — the IDLE Play button, i.e. the first-run state:**

| stop | sRGB | vs `#fff` |
|---|---|---|
| yellow | `#e6dca8` | **1.39 : 1** |
| green | `#a6d4ad` | **1.67 : 1** |
| orange | `#e3bca0` | **1.75 : 1** |
| violet | `#ceb0dd` | **1.92 : 1** |
| red | `#e3abab` | **1.97 : 1** |
| blue | `#a6b9dd` | **1.98 : 1** |
| indigo | `#bbacd7` | **2.10 : 1** |

The **maximum** anywhere on the ramp is 2.10:1 against a 3:1 requirement (WCAG 1.4.11, non-text contrast — the glyph is the sole carrier of the control's meaning). `--rainbow-pastel-*` is defined **once**, in `styles/tokens/scale-paper.css`, with **no `.dark` arm** (verified in the built bundle: exactly one `--rainbow-pastel-red:` definition), so this is theme-invariant.

**`.rainbow-vivid` — the PLAYING (Pause) state**, as actually resolved (six demo `hsl` overrides + glass-ui's `--rainbow-indigo`):

| stop | sRGB | vs `#fff` |
|---|---|---|
| yellow | `#f4e225` | **1.33 : 1** |
| green | `#26d944` | **1.90 : 1** |
| orange | `#f48c25` | **2.44 : 1** |
| violet | `#e64de6` | 3.21 : 1 |
| blue | `#308ce8` | 3.47 : 1 |
| red | `#f04242` | 3.78 : 1 |
| indigo | `#8152e0` | 4.97 : 1 |

The gradient is `to right` across a 40px box (`w-10`); the 24px glyph (`icon-lg`) is centred, so it spans **20 %–80 %** of the ramp — orange → blue, i.e. **1.33 – 3.47 : 1**, the majority below threshold, with the worst reading dead centre.

This is not decorative. Play and Pause wear the *same* rainbow circle; the glyph shape is the **only** signal distinguishing "running" from "stopped", and at 1.4–2.1:1 that signal is not resolvable by a low-vision user. `docs/tranches/J/audit/design/pane-cube.md:C9` already records this button as "*the most colorful element in the composition*" — the loudest element on the page is also the least legible one.

**Falsifier.** A `text-shadow`, `drop-shadow`, `paint-order`/`stroke`, or a foreground override winning over `text-white`. I read the compiled Button (`button-B7c944jy.js` → root class `"button tap-squish focus-ring"`; `.button[data-emphasis="quiet"]{color:var(--muted-foreground)}` sits in `@layer components` and is out-cascaded by the utility), the `.rainbow-*` recipes (`glass-ui/dist/styles/utilities/btn.css` — `background` only), and the built stylesheet. None found. **A measured live contrast ≥ 3:1 at any point under the glyph kills this.** (The exact per-pixel value under a 24px glyph over a 7-stop 40px ramp is a live measurement — but the *ceiling* of 2.10:1 for the idle state is a token fact and needs no browser.)

---

### D-B3 · the reset-icon 360° 3D twist ignores `prefers-reduced-motion` — alone among the demo's engine animations
**Severity BLOCKER** · `TransportDock/useIconSpin.ts:12-27`, fired from `TransportDock.vue:158`

```ts
const animation = new CSSKeyframesAnimation({ duration: 400, timingFunction: "easeOutCubic" })
  .fromString(`@keyframes twist {
      0%   { transform: perspective(200px) rotateY(0deg)    scale(1);    }
      40%  { transform: perspective(200px) rotateY(-180deg) scale(0.85); }
      100% { transform: perspective(200px) rotateY(-360deg) scale(1);    } }`);
```

A full 360° perspective rotation plus a scale pulse — the canonical vestibular trigger — on every Reset press.

- `respectReducedMotion` **defaults to `false`**: `src/animation/constants/defaults.ts:87` and `types.ts:201` ("*Default false (consumers opt in)*"). The options literal here does not opt in, so `reducedMotionScale()` returns `1` (full amplitude) and the rAF loop runs unchanged.
- glass-ui's blanket kill (`styles/utilities/a11y-overrides.css`) zeroes CSS `animation-duration` / `transition-duration` only. This is a JS rAF writing inline `transform`; the media query cannot see it.
- **The demo knows the flag.** It sets `respectReducedMotion: true` at five sibling sites — `app/transition/useSceneSwap.ts:45`, `state/animationOptionsStore.ts:49`, `components/instrument/shell/TypingDots.vue:91`, `components/playback/AnimationVisualizer.vue:147`, and documents it at `controls-pane/ControlsPaneWrapper.css:142`. The transport's own chrome spin is the **sole omission**.

**Corpus fold.** `lane-frontend.md §6.5` enumerates "13 PRM enforcement sites across 12 files" (10 CSS blocks + 3 JS query sites) and lists two "gaps" (`TypingDots.vue:121`, `KeyframeTimeline.vue:94`) that *delegate*. `useIconSpin.ts` appears in neither list — it neither guards nor delegates. **I extend §6.5: the census's coverage figure is one site short of honest**, because an engine-driven animation with `respectReducedMotion` unset is invisible to a `grep prefers-reduced-motion` census by construction. The right census predicate for this repo is `CSSKeyframesAnimation|AnimationGroup|SpringProgress` sites **without** `respectReducedMotion: true`.

**Falsifier.** A constructor default of `true` (`defaults.ts:87` reads `false`), or a demo-global options merge injecting it — `useIconSpin` constructs its own object literal and reads no store, so no merge path exists. **A live run under `prefers-reduced-motion: reduce` showing the icon snap instead of spin kills this.** One-line cure: `{ duration: 400, timingFunction: "easeOutCubic", respectReducedMotion: true }`.

---

## 2 · MAJORS

### D-M1 · the collapsed play mirror is an ellipse on every desktop; both become ellipses on touch
**Severity MAJOR** · `TransportDock.vue:64-68` (expanded) · `:200-204` (collapsed)

glass-ui's `.button` sets a height **floor** the demo never overrides:

```css
.button { --button-size: var(--control-h-md); min-block-size: var(--button-size); }   /* built CSS @122638 */
:root  { --control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor)); --ui-scale: 1; --control-floor: 0px; }
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
```

`w-10 h-10` / `w-8 h-8` set `width`/`height`; **neither sets `min-block-size`**, and no `min-h-*` utility is present. Resolved geometry under `rounded-full`:

| control | classes | fine pointer | coarse pointer |
|---|---|---|---|
| expanded Play `:66` | `w-10 h-10` | 40 × 40 ✓ circle | **40 w × 60 h** — capsule |
| collapsed mirror `:202` | `w-8 h-8` | **32 w × 40 h** — capsule | **32 w × 60 h** — capsule |

The collapsed mirror is **never** a circle, on any pointer type. On touch the boxes stand 1.5–1.9× taller than wide while `linear-gradient(to right, …)` still spans only the 32–40px width — the seven-stop ramp is compressed across the short axis of a tall pill, and the dock's own layer (`min-height: var(--dock-layer-height)` ≈ 46.8px at coarse) is pushed 13px taller by this one child, so the pill's whole silhouette is set by the miscomputed control.

glass-ui ships the exact affordance being hand-rolled: `ButtonProps.iconOnly` — *"Square geometry for an accessibly named icon command"* (`Button.vue.d.ts`) → `.button[data-icon-only]{inline-size:var(--button-size);block-size:var(--button-size);min-block-size:var(--button-size);padding:0}`. Neither call-site uses it; both hand-roll `rounded-full p-0` + a width/height pair, which is precisely the subset that omits the floor.

**Falsifier.** Any `min-h-*`/`min-block-size` on those buttons (none), or a demo override of `--control-h-md`, `--ui-scale`, or `--control-floor` — I grepped `demo/` for all three: zero hits. A live computed `minBlockSize <= height` kills this.

---

### D-M2 · `text-ellipsis` is inert — a long animation name grows the dock past the viewport
**Severity MAJOR** · `TransportDock.vue:115-117` · `:43`

```html
<SelectValue class="text-ellipsis">{{ storedControls.selectedAnimation }}</SelectValue>
```

`text-overflow` only paints when the same box has `overflow != visible` and a constrained size. The built rule is `.text-ellipsis{text-overflow:ellipsis}` and nothing else: no `overflow-hidden`, no `max-w`, no `min-w-0` on the value span; glass-ui's `.dock-select-trigger` (`dock/styles/controls/triggers.css`) sets `white-space: nowrap` and **no** `overflow` or `max-inline-size`. The intended truncation therefore does not exist.

Downstream, `GlassDock`'s `overflow` prop defaults to `"grow"` — *"content grows to fit then overflows visibly past the cap (the default; nothing clips or scrolls)"* (`useDockShellProps.d.ts`) — and `:43` passes only `:always-expanded="false" :fit-content="true"`. So the long-name state has **no truncation, no wrap, no scroll**: a 60-character channel name widens the transport pill monotonically and overflows the viewport. This is the component's least-covered state and the one most likely to arrive from user data.

**Falsifier.** A computed `overflow: hidden` on the SelectValue span or a `max-inline-size` on `.dock-select-trigger`. Neither exists in glass-ui 7.0.0 or the demo cascade. Live: render a 60-char channel name and measure dock width against viewport width.

---

### D-M3 · the animation Select's tooltip is keyboard-unreachable — the only one of four whose trigger is a non-focusable `<div>`
**Severity MAJOR** · `TransportDock.vue:90-92, 145-148`

```html
<TooltipTrigger as-child>
  <div class="relative flex items-center gap-1.5">
    <Select …>
```

`reka-ui`'s `TooltipTrigger` renders `Primitive as="button"` and, under `as-child`, merges `aria-describedby`, `data-state`, `data-grace-area-trigger` and the handler set `{click, focus, pointermove, pointerleave, pointerdown, blur}` onto the child (`reka-ui/dist/Tooltip/TooltipTrigger.js`). Merged onto a `<div>`:

- the element is not focusable, and `focus` **does not bubble**, so `handleFocus` never fires from the descendant select button → **the tooltip never opens on keyboard focus**;
- `aria-describedby` is stamped on a non-interactive wrapper, not on the combobox;
- the div silently becomes a pointer-handling element with no role.

Its three siblings in the same row — `:60` (`Button`), `:157` and `:170` (`DockControl`) — all resolve to real `<button>`s and **do** open on focus. One dock row, two tooltip behaviours. The `T.C3` comment at `:53-56` claims "*Tooltips are the single visible renderer*"; for keyboard users there are three renderers and one silence.

The wrapper is otherwise vestigial: `gap-1.5` with a single rendered child (reka's `SelectRoot` is a provider; `SelectContent` portals out), and `relative` with no absolutely-positioned descendant.

**Falsifier.** A `tabindex` on the div (absent) or reka forwarding the trigger ref past the `as-child` element (it forwards *to* it). Live: Tab to the animation select and observe whether the tooltip appears.

---

### D-M4 · `emphasis="quiet"` declared on the component's own stated primary CTA, then repainted by hand
**Severity MAJOR** · `TransportDock.vue:62-67` · `:194-203`

The comment at `:29-33` calls this control "*the rainbow play CTA (the PRIMARY first-run gesture)*". The markup declares `emphasis="quiet"` — glass-ui's **lowest** rung:

```css
.button[data-emphasis="quiet"] { background: transparent; box-shadow: none; color: var(--muted-foreground); }
```

— and then overrides the surface with `.rainbow-*` (utilities layer, wins over `@layer components`) and the ink with `text-white`. The design system is told "quiet" and shown the loudest object on the page.

The cost is not only taste. `Button` computes its material as `tone === "neutral" && (emphasis === "primary" || "secondary")`; `quiet` therefore opts **out** of `glass-wash glass-capsule`, the backdrop blur, and the specular/press track (`button-B7c944jy.js`). Result: the four controls in one dock row read from three different material vocabularies —

| control | material |
|---|---|
| Play `:62` | `.button` quiet + hand-rolled gradient — **no glass, no capsule, no specular** |
| Select trigger `:102` | `.dock-select-trigger` — glass hover + specular + `--dock-ring` focus |
| Reset / Collapse `:158,:171` | `DockControl` — `.glass-capsule` seat + interruptible spring-press + pointer-anchored gleam |

**The hitherto corpus already booked the cure and it has not landed.** `docs/tranches/J/glassui-AX-handoff.md:346-350` records the recipes as glass-ui-owned and names the gap ("*the pair differs only in saturation/opacity*"); `docs/tranches/J/audit/design/pane-amiga.md:127` asks for a `rainbow-outlined` variant explicitly, "*never patched in the demo*" (`pane-cross-color-pops.md:123`). Two tranches on, the demo-side repaint is still in-tree — and per **D-B2** the repaint is also the contrast failure.

**Falsifier.** A glass-ui emphasis/tone rung that yields a rainbow surface — `ButtonEmphasis = primary|secondary|quiet|text` and `Tone` carries no rainbow member; or a demo rule restoring the capsule under `.rainbow-*` — none exists.

---

### D-M5 · `StatusDot state="warning"` used to mean "paused"
**Severity MAJOR** · `TransportDock.vue:133-137`

```html
<StatusDot v-else size="md" :state="isStarted ? 'warning' : 'unknown'" />
```

glass-ui's `warning` is a **hazard glyph**, not a neutral tint:

```css
.feedback-mark[data-state=warning]        { --feedback-state-color: var(--warning); }        /* amber */
.feedback-mark[data-state=warning]:before { border-radius:18%; inset:8%; rotate:45deg; }     /* rotated square */
.feedback-mark[data-state=warning]:after  { block-size:45%; inline-size:1px; }               /* exclamation bar */
```

A merely-**paused** animation therefore renders an amber caution mark in the dropdown. The semantic reads "something is wrong with this animation" when the truth is "this animation is not currently running". Semantic-token misuse of the most legible kind: the token's whole job is to mean *warning*.

**I split the second half of this and do not charge it to the demo.** The `unknown`-for-not-started branch is a defensible workaround: `STATUS_DOT_STATES = online | warning | error | unknown` (`_shared/feedback.d.ts`) has **no** idle/paused rung — `idle` exists in `PULSE_STATES` but `StatusDot` cannot accept it. That is a glass-ui vocabulary gap and the correct cure is a handoff for a neutral/idle `StatusDot` rung (a sibling of the D-M4 ask). Meanwhile the demo should use `unknown` for **both** states rather than reach for amber.

**Falsifier.** A demo restyle of `[data-state=warning]` scoped to the dock (none in `demo/styles/`), or glass-ui's warning mark being a plain coloured dot — the extracted rule shows a rotated square with a bar.

---

## 3 · MINOR / INFO

**D-m1 · inert layout utilities on the host** — `:6`. `justify-items-center` has no effect in flex layout (it is a grid/box-alignment property) and sits beside a working `justify-center`; `m-0` restates Tailwind preflight. Two of the eight utilities on the host line are noise. *Falsifier:* a `display:grid` on that host — it is `flex`.

**D-m2 · the optical nudges shrink the glyph instead of translating it, by different amounts** — `:76` `<Play class="icon-lg pl-0.5">` and `:212` `<Play class="icon-md pl-px">`. Tailwind preflight sets `box-sizing: border-box`, so padding eats the content box: a 24px triangle renders in a 22×24 box (−8.3 % after `preserveAspectRatio` fit) and the 20px one in 19×20 (−5 %). The same glyph in the same component's two mirrors ends up at two different optical scales, and the intended rightward nudge is partly spent on shrinkage. *Falsifier:* `box-sizing: content-box` on the svg (preflight says otherwise), or width/height presentation attributes out-cascading `size-6` (presentational attributes lose to any CSS rule).

**D-m3 · `icon-lg` applied to the Button box, not just the glyph** — `:65`. Built CSS emits `.icon-lg,.icon-lg svg{width:1.5rem;height:1.5rem}`, so on the *button element* this is a 24px box declaration competing with `w-10 h-10` at equal specificity in one layer. **Today `w-10`/`h-10` win by emission order** (`.size-6` @188191 < `.h-10` @189304 < `.w-10` @191372 in the shipped bundle), so the 40px box holds — but the outcome is emission-order-dependent, `icon-lg`'s nested `& svg` already sizes the descendant (making the second `icon-lg` on `<Play>` redundant), and the collapsed mirror `:201` carries **no** `icon-lg` on its button. The pair is asymmetric for no stated reason. *Falsifier:* a Tailwind release reordering `size-*` after `w-*`/`h-*` flips the button to a 24px box.

**D-m4 · hand-rolled `gap-3` inside the dock instead of `--dock-layer-gap`** — `:57`. The dock's rhythm token is `--dock-layer-gap: calc(0.375rem * var(--dock-scale))` = 6px fine / 7.02px coarse. The transport nests a second flex row at a fixed 12px that does **not** scale with `--dock-scale`, so on touch every dock control grows 1.17× while the transport's gutters stand still. *(See WITHDRAWN-1 — the grouping-rhythm half of this concern is retracted.)*

**D-m5 · the empty-state glyph is unsized** — `:112-114`. `<List v-if="!storedControls.selectedAnimation" />` carries no `icon-*` class, so it renders at Lucide's default 24×24 (`@lucide/vue@1.17.0 defaultAttributes`) beside `.dock-select-trigger__chevron` at `--dock-trigger-icon-size, 0.75rem` = 12px — a 2:1 mismatch inside one trigger, and larger than the trigger's own text rung (`--dock-label` ≈ 20.4px). No glass-ui or demo rule sizes svgs inside `.dock-trigger`. It is the only icon in the file without an explicit size class.

**D-m6 · `<template v-for>` with no `:key`** — `:121-123`, wrapping exactly one `<SelectItem>`. The wrapper is inert and the missing key permits row reuse on reorder; `--dot-p` is a **per-row inline style** (`:131`), so a reorder can paint one animation's progress onto another's row. Cross-axis (correctness) but with a visible design symptom.

**D-m7 · the collapsed pill has no empty-state identity, and no loading or error state exists** — `:184`. The name is gated on `storedControls.selectedAnimation`; the *expanded* trigger has a `<List>` fallback for exactly that state (`:112`), the collapsed summary has none — the dock collapses to a bare rainbow circle with zero scene identity. This contradicts `:28-33`, which asserts the pill carries "*the selected animation name + the rainbow play mirror*". State coverage across the component: empty **partial**, loading **absent**, error **absent**, RTL **untested** (only physical `pl-*` paddings, see D-m2), forced-colors **partial** (glass-ui's `.feedback-mark` has an arm; the demo's `.progress-dot` has none — its `box-shadow` glow is spec-removed under `forced-colors: active`, and gradient survival is engine-dependent → **UNPROVEN-NEEDS-LIVE**).

**D-m8 · selection weight vocabulary is inconsistent** — `:124`, `:138`, `:184`. `hide-indicator` removes the check, so selection is signalled by weight alone: `font-bold` (700) against `.dock-label`'s 400 in the dropdown, but `font-semibold` (600) for the **same string** in the collapsed pill. One datum, three weights — and the row's leading glyph slot, where a selection indicator would normally live, is occupied by an unrelated play-state dot.

**D-m9 · source prose: 87 of 403 lines are comment, and some of it is wrong or dead.**
- `:234-236` contradicts itself in one sentence: "*The authoritative model is T.B5's DFA projection (lane 1); until it lands in-tree this consumes T.B5's DFA projection*".
- `:277-291` is a 15-line orphaned block describing `useMenubarMeasure.ts`'s internals, attached to no statement in this file and duplicated by that file's own contract.
- `:368-372` and `:399-402` are tombstones for code that no longer exists (the trash icon + shake; the promoted `.progress-dot`).
- `:379` embeds a **literal Tailwind class** in prose. The scanner harvests it and the shipped bundle carries `.pb-\[max\(calc\(var\(--dock-margin\)\/2\)\,env\(safe-area-inset-bottom\)\)\]{padding-bottom:max(calc(var(--dock-margin)/2),env(safe-area-inset-bottom))}` — a dead rule referencing the phantom token of **D-B1**. *Honest attribution:* three `docs/` files carry the same string, so removing this comment alone would not clear the bundle; but this is the only scanner-visible source inside `demo/`. (The bundle also carries `.pb-\[max\(…\)\]{padding-bottom:max(…)}` — literal U+2026 — sourced from `docs/tranches/B/asks/glass-ui-dock-forward.md`, **not** from this file.)

**D-m10 · unprefixed root-level custom properties written from a component** — `useMenubarMeasure.ts:4-5, 14, 17`. `--menubar-measured-h` / `--menubar-measured-h-peak` are written as **inline styles on `document.documentElement`** — flat, unnamespaced names in the same global space glass-ui's `--dock-*` occupies, set at the highest-priority origin so no stylesheet can correct them. `:22-26` removes both on unmount and resets `peak = 0`; TransportDock is `v-if`-gated (`AnimationControlsGroup.vue:98`), so any scene with zero channels tears the measurement down and the next mount re-climbs the monotonic peak from zero — the "stable by construction" guarantee at `:286-291` holds only within one mount. This is `lane-frontend.md §6.3`'s flat-namespace hazard in its most acute form: a component writing unprefixed globals at inline-style priority. *(Moot in effect today: both properties feed `--dock-band-reserve`, already dead per D-B1.)*

**D-m11 · the inline `var()` fallback chain masks the failure** — `:9`. `bottom: var(--dock-bottom-anchor, var(--work-area-bottom-offset, 0px))` renders a broken anchor as a plausible position rather than a visible break, which is why D-B1 has survived in-tree. A two-deep fallback on a positioning property is a silent-degradation idiom; the honest form is a single reference that breaks loudly.

**D-m12 · INFO — partial `--rainbow-*` override.** `design-idioms.css:15-21` redefines **six of seven** vivid rainbow stops but not `--rainbow-indigo`, which `.rainbow-vivid` consumes — so the playing gradient is 6/7 demo-owned, 1/7 glass-ui-owned, and the file's own claim to be "*the AUTHORITATIVE demo copy*" (`style.css:10-14`) is incomplete. **The strong form of this claim is WITHDRAWN** — see WITHDRAWN-2. Logged as INFO for latent drift only.

---

## 4 · WITHDRAWN — claims killed by their own falsifiers

**WITHDRAWN-1 · "the separator groups do not read, because inter-group and intra-group gaps are equal."** Falsified: `.dock-separator { margin: 0 0.375rem }` (`dock/styles/layer-group.css`) composes with `gap-3` to give a 37px inter-group gutter against a 12px intra-group gap — a 3.1× ratio, a healthy Aristotelian grouping read. Only the token-conformance half survives (**D-m4**).

**WITHDRAWN-2 · "the mixed-provenance rainbow gradient produces a visible seam at the indigo stop."** Falsified by computation: the demo's `hsl(0 85% 60%)` and glass-ui's `oklch(0.636 0.21 25.5)` both resolve to `#f04242`; every one of the six overridden stops matches glass-ui's to within 1/255 per channel. There is **no** visual defect today — only latent drift if glass-ui re-tunes indigo. Downgraded to **D-m12 (INFO)**.

**WITHDRAWN-3 · "the collapsed play mirror is a second tab stop while the expanded transport is showing."** Falsified: `GlassDock` stamps `inert` on the non-active crossfade face (`dock.js:827, 836`), so exactly one play control is reachable at a time. Two further sub-claims died the same way — the StatusDot/progress-dot size swap (both resolve to 10px: `.status-dot[data-size=md]{--feedback-mark-size:.625rem}` vs `w-2.5 h-2.5`) and a tooltip-delay inconsistency (TransportDock inherits `AnimationControlsGroup.vue:2`'s `:delay-duration="100"`, matching its siblings).

---

## 5 · SUPERLATIVES (L-18 runs both ways)

**S-1 · `usePlayActuation` is the best-argued interaction contract in the tree.** `usePlayActuation.ts:42-88` reconstructs native button semantics from disjoint modality-pure sources: press-origin gating via a `Set<number>` of pointer ids (down **and** up on the same control), `isPrimary` plus a `button !== 0 && pointerType === "mouse"` rejection, Enter-on-`keydown` with an `e.repeat` guard, Space-on-`keyup` behind an arm flag. It names and fixes the two defects its own predecessor introduced (F2 auto-repeat rapid-toggle, F3 drag-release actuation), owns no DOM and no emit so it is unit-testable without a Vue SFC plugin, and one handler set governs both mirrors so they cannot drift. This is the correct shape for a control contract. *Falsifier:* a modality reaching neither path — an AT activation synthesising only `click` would strand it. Screen readers generally dispatch a full pointer sequence, so it should hold; **UNPROVEN-NEEDS-LIVE** on VoiceOver/NVDA activation.

**S-2 · the two play controls carry deliberately distinct accessible names.** `:63` "Play animation" vs `:195-199` "Play animation (collapsed dock)", disambiguated across **both** the Play and Pause arms because one ternary drives both. Most dual-render dock mirrors ship identical names and leave the AT user to guess; this one reasoned about it in prose (`:187-192`) and paid the copy cost. *Falsifier:* if GlassDock left both faces non-inert the distinction would be papering over a worse bug — it does not (WITHDRAWN-3), so this is a genuine refinement, not a patch.

**S-3 · the user-facing copy is uniformly plain.** The complete visible copy surface is six strings — "Play", "Pause", "Reset animation", "Collapse timeline", "Select animation", "Timeline" — all verb+object or bare noun. No marketing register, no exclamation, no "Let's", no cliché, no em-dash flourish. Against a component whose *source* prose is 87 lines of tranche archaeology (D-m9), the restraint at the surface is notable and deliberate. *Falsifier:* none — the six strings are the whole surface.

**S-4 · the channel-zone elision is a real subtraction, centrally decided.** `:88` + `surfaceTabs.ts:35-37`: a one-or-zero-animation scene renders **no** select and **no** flanking separator, rather than a dead one-item dropdown or a demoted static label — and the cardinality decision lives in one pure function (`dockCardinality`) shared with the top dock, so the two docks cannot disagree about what "one channel" means. Deleting UI is harder than adding it, and routing the decision through a shared pure function instead of two `v-if`s is the difference between a tidy-up and an invariant. *Falsifier:* a scene where the elision hides the only means of identifying the running animation — the collapsed pill's name label (`:184`) covers it when a selection exists; **D-m7** is the residual hole.

---

## 6 · Ranked repair order

| # | id | one-line cure |
|---|---|---|
| 1 | **D-B1** | define `--dock-margin` at `:root` in `layout.css` (or `@property` it with an `initial-value`); re-verify all 10 consumers compute. Nothing else in the dock band is measurable until this lands. |
| 2 | **D-B3** | `respectReducedMotion: true` in `useIconSpin.ts:13`. One line, five in-tree precedents. |
| 3 | **D-B2** | glass-ui ask (already booked at `J/glassui-AX-handoff.md:346-350`): a rainbow rung whose ink clears 3:1 — outlined/rimmed, or a dark ink token for the pastel arm. Interim: drop `text-white` for a computed on-gradient foreground. |
| 4 | **D-M1** | `icon-only` on both `<Button>`s; delete the `w-*/h-*/rounded-full/p-0` hand-roll. |
| 5 | **D-M3** | move `as-child` onto the select trigger (or delete the wrapper `<div>` and the tooltip, whose string duplicates the `aria-label`). |
| 6 | **D-M2** | `overflow="wrap"` or `"scroll"` on `<GlassDock>`, plus `min-w-0 overflow-hidden` on the value box for `text-ellipsis` to bite. |
| 7 | **D-M4 / D-M5** | one combined glass-ui handoff: a rainbow Button rung + a neutral/idle `StatusDot` state. Both were asked for in tranche J. |
| 8 | D-m1…D-m12 | mechanical; D-m9 is the largest single deletion available in the file. |
