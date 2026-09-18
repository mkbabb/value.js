claude-opus-5[1m]

# CHALLENGE · CubeScene · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeScene.vue` (287 lines)
**Date** 2026-08-04 · **Mode** static, source-derived only (no browser tooling, per law)
**Verdict** **25 defects / 1 BLOCKER / 9 MAJOR / 8 MINOR / 7 INFO · 5 superlatives**

## 0. Read set (whole, read-only)

Direct imports of the target, all read end-to-end:

| File | Why in scope |
| --- | --- |
| `demo/scenes/cube/CubeScene.vue` | the target |
| `demo/scenes/cube/CubeTarget.vue` (239 L) | rendered child; the scene's entire visible subject |
| `demo/scenes/cube/CubeTarget.css` (154 L) | sourced by the child's `<style scoped src>` |
| `demo/scenes/cube/useCubeDemo.ts` (191 L) | animation channels + the one PRM gate |
| `demo/scenes/cube/cubeTransformStore.ts`, `cubeKeys.ts` | state seams |
| `demo/scenes/cube/matrix-editor/MatrixEditor.vue` (158 L), `useTransformState.ts` (227 L) | the conditional surface CubeScene projects |
| `demo/composables/scene-facility/index.ts` (127 L) | `facilityFromGroup` |
| `demo/styles/{style,layout,brand,design-idioms}.css` | every token the target names |
| `demo/components/instrument/transport/controls-pane/RibbonBar.vue` | the **host** of `ribbonContent` — the house standard the target must match |
| `@mkbabb/glass-ui@7.0.0` `dist/{button,popover}*.js`, `dist/components/popover/*.d.ts`, `dist/styles/**` | the real API + the real cascade |
| `reka-ui` `dist/HoverCard/HoverCardTrigger.js`, `dist/Popover/PopoverTrigger.js` | what glass-ui actually renders |
| `dist/gh-pages/assets/index-CL_QYCiO.css` (571 KB, built 2026-07-16) | **cascade adjudication** — layer order and utility emission order |

Corroborating artifact caveat: the built stylesheet is dated 2026-07-16 09:11, *after* the last edit to `CubeScene.vue` (07-15 17:38) and *contains* the target's `.cube-stage--hero-recede` rule, so it is current for this component. Where I lean on it (cascade order only) I say so.

## 1. Hitherto corpus — folded, not re-invented

- **F-1** (`lane-frontend.md:15,54`) — glass-ui is a phantom dependency (absent from `package.json`/lock, 7.0.0 installed). **I fold it and extend it**: F-1 is not merely a reproducibility risk, it is the *proximate cause* of D-2 below. Nothing pins the demo to 7.0.0, so nothing failed when the `Button` API dropped `variant`; the target still passes it.
- **§6.5 PRM census** (`lane-frontend.md:462-490`) — 10 CSS PRM blocks + 3 JS sites; the cube contributes exactly one JS site (`useCubeDemo.ts:164`) and **zero** CSS blocks. **I confirm the census and sharpen it**: the census reads the gap as "conscientious but inconsistent in mechanism". The tree says worse — see D-8. The cube is the only scene of seven with no CSS PRM block at all, and its most vestibular motion (the 1.1 s two-axis Roll tumble) is ungated.
- **`lane-frontend.md:151`** flags the target's own comment about orphaned reka `<Tabs>`. **I confirm** the migration landed (no reka import survives at `CubeScene.vue`), and add that its *provenance headers* did not — D-20.
- **§6.3/`:442`** — z-index is single-sourced from glass-ui, raw `z-[N]` forbidden. **I confirm the target obeys** (`z-hovercard`, `z-20`, `var(--z-content)`); see S-D5.
- **S-1..S-8 shadow census** (`lane-frontend.md:264-397`) — no CubeScene entry. **I do not contradict it**: the target vendors nothing; it consumes `Popover*`/`Button` from the barrel. Its glass-ui sins are *misuse*, not shadowing. Nothing here belongs in the shadow tally.
- `lane-library.md` parse seams — no overlap; the target compiles no CSS text.

## 2. Method note on cascade claims

Several findings turn on which of two competing declarations wins. Those are adjudicated from the built stylesheet, whose `@layer` statement order is fixed at first appearance:

```
@layer properties@9251 · theme@12254 · base@18022 · components@21885 · utilities@182187
```

Layer precedence beats specificity. `components@314854` is a *continuation* of the layer declared at 21885, so it does not outrank `utilities`.

---

## 3. BLOCKER

### D-1 · The pp-mode toggle is unreachable by keyboard, has no role, and has no accessible name

**BLOCKER** · `CubeScene.vue:118-126` · WCAG 2.1.1 Keyboard (A), 4.1.2 Name/Role/Value (A)

`headerLeft()` builds the only control that switches the cube's entire surface treatment (numbered die ↔ ppmycota skin). The clickable node is a bare `<div>`:

```js
h(PopoverTrigger, null, { default: () => h("div", {
    onClick: setPPMode,
    class: "ppmycota-logo-sm m-0 h-8 w-8 lg:h-10 lg:w-10 cursor-pointer stroke-2 p-0 font-bold scale-on-hover",
}) })
```

No `tabindex`, no `role`, no `aria-label`, no text — `.ppmycota-logo-sm` is a `background-image` (`brand.css:25-31`), invisible to AT.

The wrapper does not rescue it. glass-ui's `Popover` (`dist/popover-BPBtXakf.js`) selects its root by pointer class:

```js
o = window.matchMedia("(pointer: coarse)").matches,
s = computed(() => t.trigger === "hover" && !o)   // usesHoverRoot
```

The target passes `trigger: "hover"` (`:119`), so on any **fine-pointer** device — every desktop, the primary keyboard population — `usesHoverRoot` is true and `PopoverTrigger` forwards to reka's `HoverCardTrigger`, whose `as` prop defaults to **`"a"`** (`reka-ui/dist/HoverCard/HoverCardTrigger.js`, props block: `as: { type: null, required: false, default: "a" }`). glass-ui passes `as: t.as` with no default of its own, i.e. `undefined`, so Vue's default applies.

Rendered chain on desktop:

```html
<a data-state="closed" data-grace-area-trigger>   <!-- no href → not focusable, generic role -->
  <div class="ppmycota-logo-sm …" (click)>        <!-- no tabindex, no role, no name -->
```

An `<a>` without `href` is not in the tab order and exposes no role. Nothing in the chain is focusable, so the `onFocus`/`onBlur` handlers reka attaches to that same element to open the card on focus **can never fire** — glass-ui's own keyboard-open path is dead here too.

**Falsifier** — any one of these kills the finding: (a) reka's `HoverCardTrigger` defaults `as` to `"button"` in the installed version; (b) glass-ui's `PopoverTrigger` supplies its own `as` default; (c) some ancestor sets `tabindex` on the logo div; (d) a duplicate pp-mode control exists elsewhere in the app that *is* keyboard-operable. I checked (a) and (b) in the installed sources (quoted above), (c) by reading the full `headerLeft` chain, and (d) by grep: `setPPMode`/`ppMode` appear only in `CubeScene.vue` and as a read-only prop in `CubeTarget.vue:120`.

**Note on the touch branch** — on `(pointer: coarse)` the fallback is reka's `PopoverTrigger`, whose `as` default *is* `"button"`. That button is focusable, but it still wraps only the empty div, so it remains nameless (4.1.2 stands), and it introduces D-6.

---

## 4. MAJOR

### D-2 · `variant: "outline"` is not a prop of glass-ui 7's `Button`

**MAJOR** · `CubeScene.vue:187, 192`

The installed `Button` (`dist/button-B7c944jy.js`) declares exactly: `emphasis`, `tone`, `size`, `iconOnly`, `loading`, `type`, `disabled`, `class`, `asChild`, `as`. There is no `variant`. The target passes `{ size: "sm", variant: "outline" }`.

Two consequences, both provable from the same file:
1. **The intended skin never renders.** `emphasis` defaults to `"secondary"`, and the computed root class is `cn("button tap-squish focus-ring", g && "glass-wash glass-capsule", …)` where `g = tone==="neutral" && (emphasis==="primary"||emphasis==="secondary")` — so the button renders as a **glass-wash capsule**, the opposite of an outline.
2. **`variant="outline"` lands in the DOM.** The root is `Primitive` with `mergeProps(…)`; unknown props fall through as attributes, so the emitted `<button>` carries a non-standard `variant="outline"` attribute.

This is F-1's bill coming due: with glass-ui undeclared in `package.json`, no version constraint existed to fail when the API changed.

**Falsifier** — a `variant` prop in the installed `Button`, or a glass-ui compat shim mapping `variant`→`emphasis`. Neither exists; I read the whole 2 960-byte module.

### D-3 · `rounded-lg` overrides the design system's pill, and the target's ribbon buttons diverge from the ribbon's own house standard

**MAJOR** · `CubeScene.vue:188, 193` vs `RibbonBar.vue:135`

The target's buttons render into `RibbonBar`'s `ribbon-content` slot (`RibbonBar.vue:107-115`). Every other button in that same bar uses one constant:

```js
const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body rounded-full btn-interactive";   // RibbonBar.vue:135
```

The target writes, twice:

```js
class: "h-8 gap-1.5 cursor-pointer text-small font-medium px-3 rounded-lg btn-interactive"
```

Three substantive divergences, all decidable:

| Axis | House (`RibbonBar`) | Target | Effect |
| --- | --- | --- | --- |
| radius | `rounded-full` (= `--radius-pill` 9999px, a restatement of the skin) | `rounded-lg` (= `--radius-lg` → `--radius` → `.5rem`) | different silhouette |
| type | `text-body` | `text-small` | different size in the same bar |
| inline padding | none → `.button`'s `padding-inline: calc(1rem * var(--ui-scale))` | `px-3` (.75 rem) | 25 % tighter |

The radius override is not merely a divergence from a sibling — it defeats the design system twice over. `.button` itself sets `border-radius: var(--radius-pill)` (built CSS @122638, `components`) and `.glass-capsule` sets it again (@42291, `components`); `.rounded-lg` is emitted in `utilities` (@200228). Layer order puts utilities last, so the utility wins regardless of specificity. The cube's two ribbon buttons are the only rounded-rect buttons in a bar of pills, and the user sees the shape change when they switch from the Keyframes tab to Matrix Controls.

**Falsifier** — if `--radius-pill` and `--radius-lg` resolved to the same value (they do not: 9999px vs .5rem), or if `.rounded-lg` were emitted in a layer at or below `components` (it is not), or if `RibbonBar` did not host this slot (it does, `:111-114`).

### D-4 · The hover card force-closes after 4 s while the pointer is still on it

**MAJOR** · `CubeScene.vue:109-114` · WCAG 1.4.13 Content on Hover or Focus (AA), *Persistent*

```js
watch(ppmycotaOpen, (open) => {
    clearAutoDismiss();
    if (open) autoDismissTimer = setTimeout(() => { ppmycotaOpen.value = false; }, 4000);
});
```

`ppmycotaOpen` is bound to the popover's `open` model (`:119`), i.e. the controlled path. 1.4.13 *Persistent* requires the additional content to remain visible "until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid." A wall-clock timer satisfies none of the three.

The consequence is concrete, not theoretical: the card's payload is two hyperlinks (`:135`, `:140`). A user reading the card and reaching for `ppmycota.com` has it removed mid-reach. Worse, because reka's `HoverCardRoot` is now in the controlled `open=false` state while the pointer has never left, no new `pointerenter` fires — the card cannot be re-opened without leaving the trigger and returning.

**Falsifier** — if `Popover`'s `open` were passive here, the write would be a no-op. It is not: the target binds both `open` and `onUpdate:open` (`:119`), and `Popover`'s own d.ts documents that a bound `open` forces the controlled path ("a defaulted `false` would FORCE the controlled path"). Also falsified if the card contained no interactive content — it contains two links.

### D-5 · `role: "card"` is passed without the `ariaLabel` the API documents for it → a nameless `role="group"`

**MAJOR** · `CubeScene.vue:127`

`role: "card"` **is** a valid glass-ui prop (my first hypothesis, that it was an invalid ARIA role, is dead — see §7). It maps to real ARIA:

```js
role: v.value === "card" ? "group" : "dialog",
"aria-label": t.ariaLabel,                          // dist/popover-BPBtXakf.js
```

and the d.ts pairs the two explicitly:

```ts
/** `dialog` (default click) · `card` (→ role="group"). */
role?: PopoverRole;
/** Accessible name passthrough for the `role="group"` card surface. */
ariaLabel?: string;
```

The target passes `role` and omits `ariaLabel`, so the emitted container is `role="group"` with `aria-label={undefined}`. An unnamed `group` is an ARIA anti-pattern: it adds a boundary a screen reader announces without saying what the boundary is, which is strictly worse than no role. The API author anticipated exactly this and shipped the remedy one prop away.

**Falsifier** — if `PopoverContent` derived a name from its content, or if `ariaLabel` had a default. Neither: the render passes `t.ariaLabel` raw, and the props block declares `ariaLabel: {}` with no default.

### D-6 · On touch, one tap fires two unrelated actions

**MAJOR** · `CubeScene.vue:119-126`

On `(pointer: coarse)`, `usesHoverRoot` is false, so the chain is `PopoverRoot` → reka `PopoverTrigger` (`as` default `"button"`) wrapping the div that carries `onClick: setPPMode`. A single tap therefore (a) toggles the popover via the trigger's own click handler and (b) toggles pp-mode via the child's — two semantically unrelated outcomes from one gesture, with no way to perform either alone.

The affordance is also inverted against its documentation: the *only* explanatory surface the control has is the card, and the card explains the **brand** (a link to ppmycota.com), not the **toggle**. A touch user who taps to read the card has silently repainted all six cube faces.

**Falsifier** — if reka's `PopoverTrigger` stopped propagation of the child's click, or if the trigger were `asChild` (which would merge the handlers into one element rather than nesting two). It is not: `h(PopoverTrigger, null, …)` passes no `asChild`, and `PopoverTrigger`'s props default `asChild` to `false`.

### D-7 · Dark mode: three of six face numerals fall to 1.36–1.72:1 contrast

**MAJOR** · `demo/styles/style.css:148-153` + `CubeTarget.vue:71-78` (reached only through `CubeScene.vue:15-22`)

The six face colours are **theme-invariant literals** — one `:root` definition each, no `light-dark()`, no `.dark` override (verified in source *and* by a single occurrence of `--face-1:` in the 571 KB built stylesheet):

```css
--face-1: rgba(255,0,0,.8);  --face-2: rgba(0,255,0,.8);  --face-3: rgba(0,0,255,.8);
--face-4: rgba(255,255,0,.8); --face-5: rgba(255,0,255,.8); --face-6: rgba(0,255,255,.8);
```

The numeral colour is **theme-reactive**: `.face-numeral` declares only `z-index` (`CubeTarget.css:144-146`), so it inherits `html, body { @apply … text-foreground }` (`style.css:214-216`). `--foreground` is `#1c1917` light / `#e9e6e2` dark.

Composited over `--background` (`--neutral-0`: `#fbfaf8` light / `#0b0a09` dark) at α .8, WCAG 2.x relative-luminance ratios:

| Face | light bg | ratio (light) | dark bg | ratio (dark) | 3:1 large-text |
| --- | --- | --- | --- | --- | --- |
| 4 yellow | (254,254,50) | **16.2:1** | (206,206,2) | **1.36:1** | ✗ |
| 6 cyan | (50,254,254) | ~15.4:1 | (2,206,206) | **1.58:1** | ✗ |
| 2 lime | (50,254,50) | ~14.6:1 | (2,206,2) | **1.72:1** | ✗ |
| 5 magenta | — | pass | (206,2,206) | 3.73:1 | ✓ (fails 4.5:1) |
| 1 red | — | pass | (206,2,2) | 4.65:1 | ✓ |
| 3 blue | — | pass | (2,2,206) | 8.88:1 | ✓ |

The numerals are `text-display-2` + `font-bold` (`CubeTarget.vue:73`, `:56`) → large text → the 1.4.3 threshold is 3:1. Faces 2, 4 and 6 fail it by 1.7–2.2×. The palette is a light-mode design that was never re-derived for dark.

The direction of the approximation is stated and it is unfavourable: `.face-relit` adds a white specular of up to `0.05 + 0.5·--lit` (`CubeTarget.css:130-134`), so the **lit** face — the one turned toward you, the one you are reading — is *lighter* than the composite above, and its contrast against near-white ink is *worse*, not better. The shadow veil that would help applies only to faces turning away.

**Falsifier** — (a) a `.dark`-scoped `--face-*` override (none exists; one definition in source, one in the build); (b) an explicit `color` on `.face-numeral` or any ancestor inside the cube (none — I read every rule in `CubeTarget.css` and every class on the chain); (c) the exemption argument: if the die's pips are held to be *incidental* decoration rather than content, 1.4.3 does not apply. That last one is the live counter-argument and I state it plainly — but the pips are the only thing distinguishing one face from another, so they carry the die's entire semantic payload.

### D-8 · The cube is the only scene with no CSS reduced-motion block, and its Roll egg is ungated engine motion

**MAJOR** · `CubeTarget.vue:189-222` (esp. `:205-210`) · WCAG 2.3.3 (AAA), house PRM contract

The engine's PRM gate is **opt-in**. `src/animation/constants/types.ts:200-201`:

```ts
/** When true, snap `play()` to the final frame under `prefers-reduced-motion: reduce`. Default false. */
respectReducedMotion: boolean;
```

and `src/animation/internal/reduced-motion.ts:97-101` — "`false` / `undefined` — do not honor reduced motion (the conservative default…)".

The Roll egg constructs its animation without it:

```js
rollAnim = new CSSKeyframesAnimation({
    duration: 1100, iterationCount: 1, fillMode: "forwards",
    timingFunction: "ease-out-back",           // ← overshoot, no respectReducedMotion
}).fromKeyframes({ from:{transform:{rotateX:"0deg",rotateY:"0deg"}},
                   to:  {transform:{rotateX:`${endX}deg`,rotateY:`${endY}deg`}} });
```

with `endX`/`endY` at `face + (1–2)·360°` (`:195-196`) — i.e. **up to four full revolutions on two axes with a bouncy overshoot**, ~1.1 s, on double-tap, at full amplitude for a user who has asked the OS for reduced motion. This is textbook vestibular-trigger content.

What makes it a MAJOR rather than an oversight is the **internal inconsistency**: the sibling module knows the gate is opt-in and hand-rolls the branch —

```ts
const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) graphEl.style.transform = "rotate3d(-1, 1, 0, 30deg)";
else changeGraphPerspectiveAnim.play();          // useCubeDemo.ts:162-169
```

— and comments it "the house reduced-motion contract". The contract was applied to a 650 ms perspective settle and skipped on a 1 100 ms four-revolution tumble.

This confirms and sharpens **lane-frontend §6.5**: the census counted `useCubeDemo.ts:164` as the cube's coverage. It is coverage of one of the cube's several motions. The cube has zero entries in the census's CSS list, and the built stylesheet's 46 PRM blocks are all component-scoped (no global `*` / `animation-duration` reset), so nothing catches the gap downstream.

**Falsifier** — a default-true `respectReducedMotion`, a global PRM reset in the cascade, or a PRM guard inside `useDoubleTap`/`loadAnimationEngine`. I checked all three: the default is documented false; the built CSS has no global reset (I enumerated all 46 PRM blocks); `useDoubleTap` is a pointer-gesture composable with no media query.

### D-9 · The hero-recede guard is px, its counterpart breakpoint is rem — they desynchronize under an enlarged root font, reopening the exact collision the block exists to prevent

**MAJOR** · `CubeScene.vue:265` (and the same idiom at `CubeTarget.css:63`) · WCAG 1.4.4 adjacent

The scoped block that keeps the hero text and the cube in disjoint vertical bands is gated on a **pixel** query:

```css
@media (max-width: 1023px) { .cube-stage--hero-recede { padding-block-start: var(--start-hero-band); … } }
```

Its counterpart — the `lg:` utilities in the very same file (`:124`, `lg:h-10 lg:w-10`) and throughout the hero — resolve to `--breakpoint-lg: 64rem`, and Tailwind v4 emits them as **`@media (width>=64rem)`** (verified: 3 occurrences in the built CSS, zero `min-width: 1024px` from Tailwind).

`64rem` tracks the user's root font size; `1023px` does not. At a 20 px root — the standard browser text-size accommodation — `lg:` fires at 1280 px while the recede stops at 1023 px. In the 1024–1280 px band the hero is still in its mobile layout while the cube neither recedes (`padding-block-start` not applied) nor steps down its sizing rung (`:deep(.cube) { --side-size: min(40vh,40vw,16rem) }` also gated by the same query, `:283-285`). That is precisely the H3/TYP-1 hero/subject collision the header comment (`:2-8`, `:259-264`) says the block was written to eliminate — restored for the users most likely to need it. There is a half-pixel version of the same gap at exactly 1023.5 px CSS width (fractional viewport under zoom or fractional DPR), where neither query matches.

Fair framing: this is a **house idiom**, not a cube invention — `style.css:224` uses `@media (min-width: 1024px)` too. But the cube is where the consequence was explicitly engineered against, and it is the file that mixes both units within 150 lines of each other.

**Falsifier** — a root `html { font-size: 16px }` pin (which would freeze the two units together, at the cost of defeating text scaling). I grepped every demo stylesheet: `font-size` appears only at `style.css:244` (`var(--size)`, a component) and `:291` (`var(--type-body)`). No root pin exists.

### D-10 · The Lock/Free toggle has no `aria-pressed`, and its label reads as state while naming an action

**MAJOR** · `CubeScene.vue:191-200`

```js
!storedControls.matrixOptions?.fixed ? h(Lock, …) : h(LockOpen, …),
` ${storedControls.matrixOptions?.fixed ? "Free" : "Fixed"}`
```

Decoded: when `fixed === false` the button reads **🔒 Fixed**; when `fixed === true` it reads **🔓 Free**. The icon and the word agree with each other (both name the *action*), which is internally coherent — but the composite is maximally ambiguous to a reader, because a closed padlock beside the word "Fixed" is the canonical rendering of the *state* "this is fixed". The control therefore signals the exact inverse of the current mode to a first-time reader, and there is no independent state indicator anywhere on the surface to disambiguate.

Separately and unconditionally: this is a binary toggle rendered as a `<button>` with no `aria-pressed`. AT announces "Fixed, button" and the user has no way to learn which way the switch is thrown.

**Falsifier** — a state indicator elsewhere in the matrix surface (I read `MatrixEditor.vue` whole: it renders 16 cells + a slider, and reads `matrixOptions.selectedMatrixCell` but never renders `matrixOptions.fixed`), or an `aria-pressed`/`role="switch"` on the button (neither is passed; glass-ui's `Button` forwards `aria-busy` and `aria-disabled` only).

---

## 5. MINOR

### D-11 · `btn-interactive` is a phantom class — zero rules in the shipped stylesheet

**MINOR** · `CubeScene.vue:188, 193`

`grep -c btn-interactive dist/gh-pages/assets/index-CL_QYCiO.css` → **0**. The class exists nowhere in `@mkbabb/glass-ui@7.0.0` (whole-package grep: no hits) nor in any demo stylesheet. Its history is documented in this very repo — `docs/precepts/instructions/LESSONS-LEARNED.md:603` records glass-ui substrate commit `b0debec` retiring `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` "under a false zero-site verdict". The two `.rainbow-*` utilities were restored (`dist/styles/utilities/btn.css` has both); `.btn-interactive` was not, and eight consumer sites still name it (two of them here).

Severity is **MINOR, not MAJOR**, and the reason matters: the S-tranche design audit (`docs/tranches/S/audit/pass1/design/morph.md:97`) treats `.btn-interactive` as the carrier of the demo's `:focus-visible` contract, which would make its disappearance a focus-visibility blocker. **That inference is wrong for this component** — glass-ui's `Button` applies `.focus-ring` itself in its own root class (`cn("button tap-squish focus-ring", …)`), so the focus indicator is intact. The dead class costs nothing but a false signal that an interaction contract is applied where none is.

**Falsifier** — a `@utility btn-interactive` anywhere in the resolved cascade. Zero occurrences in a 571 KB built artifact is about as conclusive as static evidence gets.

### D-12 · Two of the four classes on the popover are inert, and a third is redundant

**MINOR** · `CubeScene.vue:127` (`p-4`, `min-w-[…]`), `:188, 193` (`cursor-pointer`)

`PopoverContent`'s own class string is
`"popover-content z-popover w-72 glass-floating [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal"`,
merged with the target's `"z-hovercard p-4 min-w-[var(--dock-panel-width)] text-small"` by glass-ui's own `cn` (a hand-rolled group-dedupe, `dist/class-names-Cpy5eaBk.js`).

- **`p-4` is dead.** `cn`'s groups are `padding` (`^p-`), `padding-x` (`^px-`), `padding-y` (`^py-`) — distinct, so nothing is deduped and all three survive into the DOM. The cascade then decides, and in the built stylesheet `.p-4{padding:…}` is emitted at 208124 while `.px-\(--overlay-pad-inline\){padding-inline:…}` follows at 208293 in the **same** `utilities` layer. Later wins on both axes, so the overlay keeps its 1 rem inline / 1.272 rem block rhythm and `p-4` paints nothing. (Note the dilemma: had the emission order been reversed, `p-4` *would* have flattened glass-ui's deliberate 1:1.272 optical padding ratio. One of the two is a defect; the build says it is the dead-code one.)
- **`min-w-[var(--dock-panel-width)]` can never bind.** `--dock-panel-width: 17rem` (`layout.css:14`); `w-72` = `calc(var(--spacing) * 72)` = `.25rem × 72` = **18 rem**. A 17 rem floor under an 18 rem width is arithmetic that never fires.
- **`cursor-pointer` is redundant.** `.button` already sets `cursor: pointer` (built CSS @122638).

**Falsifier** — a build in which Tailwind emits `.p-4` after `.px-*` (I checked the shipped one), a `--dock-panel-width` above 18 rem (it is 17 rem, single definition), or a `.button` without `cursor`.

### D-13 · Two adjacent links to the identical destination

**MINOR** · `CubeScene.vue:135` and `:140`

```js
h("a", { href: "https://ppmycota.com", … }, "ppmycota")     // :135
…
h("a", { href: "https://ppmycota.com", … }, "ppmycota.com") // :140
```

Same `href`, same `target`, same `rel`, ~60 px apart, separated only by an `<hr>`. Two link stops in the AT link list for one destination, and visual clutter in a card whose entire payload is three short lines.

**Falsifier** — differing hrefs (byte-identical), or one of them being decorative (both are real anchors).

### D-14 · The emoji line is neither text nor decoration

**MINOR** · `CubeScene.vue:136`

```js
h("p", { class: "mt-0.5 text-caption text-muted-foreground",
         innerHTML: "&#x1F642;&#x200D;&#x2194;&#xFE0F; &#x1F331; &#x1F344;&#x200D;&#x1F7EB;" })
```

Three emoji constitute the brand's entire descriptive line. No `aria-hidden="true"`, no adjacent text alternative — AT announces "head shaking horizontally, seedling, brown mushroom", which is not a description of anything. `innerHTML` is also unnecessary here: the string is a static entity sequence with no markup, so a text child would render identically without invoking the escape hatch.

The codebase demonstrably knows the idiom: the decorative relight overlay one file over is correctly marked (`CubeTarget.vue:69-70`, `class="face-relit …" aria-hidden="true"`). This is an inconsistency, not ignorance.

**Falsifier** — an `aria-hidden` on the `<p>` or an ancestor (there is none in the chain: `PopoverContent` → `div.flex` → `div.flex-1` → `p`), or a visually-hidden text equivalent (none exists).

### D-15 · The touch target is smaller on touch than on mouse

**MINOR** · `CubeScene.vue:124`

`h-8 w-8 lg:h-10 lg:w-10` → **32 px below `lg`, 40 px at and above it**. The breakpoint is a proxy for viewport, and viewport correlates with pointer class: the coarse-pointer, thumb-driven case gets the *smaller* target and the fine-pointer, cursor-driven case gets the larger one. The sizing is exactly inverted against the input device.

32 px clears WCAG 2.5.8 Target Size (Minimum, AA, 24 px) and fails 2.5.5 (AAA, 44 px) — hence MINOR, not MAJOR. The defect is the inversion, not the absolute number.

**Falsifier** — a `@media (pointer: coarse)` rule enlarging it (none in `CubeScene.vue` or `design-idioms.css`), or padding on an ancestor extending the hit area (the div is `m-0 … p-0`, explicitly zeroed).

### D-16 · The loading indicator has no accessible name and no reduced-motion gate

**MINOR** · `CubeTarget.vue:32-34`, gated by `CubeScene.vue:20`

```html
<Loader2 class="absolute h-[var(--target-viewport-h)] w-[var(--target-viewport-w)] animate-spin" />
```

The scene's only loading affordance (shown when `!hideLoader && !selectedAnimation`) is a bare spinning icon: no `role="status"`, no `aria-label`, no `aria-live` region, no visually-hidden text. To AT the scene is simply empty during load. `animate-spin` is an unbounded rotation with no PRM guard, and — per D-8's evidence — there is no global PRM reset to catch it.

**Falsifier** — an `aria-label`/`role` on `Loader2` from `@lucide/vue` (lucide icons render `<svg>` with `aria-hidden` conventions, not status roles), or a status region elsewhere in the scene chain (I read `CubeScene.vue` and `CubeTarget.vue` whole; there is none).

### D-17 · Two byte-equivalent grid wrappers nest for no effect

**MINOR** · `CubeScene.vue:9-14` vs `CubeTarget.vue:2-6`

```
CubeScene   <div class="grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible"
                 style="touch-action: none; overscroll-behavior: contain" @wheel.prevent>
CubeTarget  <div class="relative grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible"
                 style="touch-action: none; overscroll-behavior: contain" @wheel.prevent>
```

Identical layout classes, identical inline style, identical handler — the outer grid's only child is a grid with the same alignment, so it contributes nothing but a box and a duplicate wheel listener (the inner one prevents, the outer prevents the same event again on bubble). The outer wrapper's *sole* real job is to be the `cube-stage--hero-recede` class host; it could be that and nothing else.

**Falsifier** — a layout difference the outer div provides (the only class it does not share is the inner's `relative`, which the outer does not need), or a wheel path that reaches the outer without passing the inner (the inner fills the outer exactly).

### D-18 · Silent failure when the target refs are absent

**MINOR** · `CubeScene.vue:204-212` · state coverage: no error state

```js
onMounted(() => {
    const cubeEl = cubeTargetRef.value?.cubeEl;
    const graphEl = cubeTargetRef.value?.graphEl;
    if (cubeEl && graphEl) { cubeElRef.value = cubeEl; setTargets(cubeEl, graphEl); }
});
```

If either ref is missing the guard falls through with no `else`, no warning, and no user-visible signal. `cubeElRef` stays `undefined`, so `useTransformState`'s rAF watcher never paints (`useTransformState.ts:207-211` is ref-guarded too) and none of the three animations get targets — the scene renders a static, permanently unresponsive cube that looks correct. The design axis reading: this is the one state the component has no representation for. Every other state (loading, matrix-surface active, matrix-surface inactive, pp-mode) has a rendering; failure has none.

**Falsifier** — an error boundary or fallback in the scene host (`App.vue`'s scene-swap path routes focus and handles transitions; it does not inspect `setTargets` outcomes), or a guaranteed-non-null contract on `defineExpose({ cubeEl, graphEl })` (they are `useTemplateRef`s, nullable by construction).

---

## 6. INFO

- **D-19** · `CubeScene.vue:12` — `style="touch-action: none; overscroll-behavior: contain"` as an inline attribute where the `touch-none` and `overscroll-contain` utilities exist and are used elsewhere in the demo. Inline styles are the highest-specificity rung; using them for values the token layer already expresses puts them beyond any future theme override. *Falsifier*: the utilities being absent from the Tailwind build (both are core v4 utilities).
- **D-20** · `CubeScene.vue:39`, `:146` — both large provenance headers are stamped "glass-ui 4.0.0 (K.W1′ BA.W-TABS)" while the installed package is **7.0.0**. The staleness is not cosmetic: the API those headers reason about is the API that D-2 shows has moved. *Falsifier*: a 4.0.0 install (`node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"`).
- **D-21** · `CubeScene.vue:11`, `:20`, `:29-31` — `hideLoader` drives two unrelated concerns (the loader gate *and* the hero-recede layout class) and its name describes neither accurately; the header comment has to gloss it as "`hideLoader === the start screen is up`". A prop whose meaning requires a comment to invert is a naming defect. *Falsifier*: a single consumer/meaning (there are two, `:11` and `:20`).
- **D-22** · `CubeScene.vue` — roughly 120 of 287 lines are comment, and the bulk is tranche archaeology rather than reader-facing intent. `:89-96` is a nine-line paragraph documenting a watcher that **no longer exists in the file**. Design legibility: a maintainer must read a changelog to find the component. *Falsifier*: the deleted watcher still being present (it is not).
- **D-23** · `CubeTarget.vue:86-88` + `brand.css:19-23` — `CubeTarget.css:148-154` documents, at length and correctly, that `filter` is a CSS grouping property that forces the used `transform-style` to `flat` and collapses the 3D die. In pp-mode the target renders `.ppmycota-logo-lg`, which carries `filter: var(--filter-brand-color)`, **inside** `.cube-side`. This is safe — the filtered element is a childless leaf, so no `preserve-3d` subtree is flattened — but it re-enters the exact hazard the post-mortem forbids, one nesting level from harm. Worth a comment at the callsite. *Falsifier*: `.ppmycota-logo-lg` gaining 3D children, which would turn this into a BLOCKER.
- **D-24** · `CubeScene.vue:194` writes `storedControls.matrixOptions.fixed` with no optional chain, while `:197-198` read the same object *with* `?.` three lines later. The initializer lives in a different component (`MatrixEditor.vue:120`, `storedControls.matrixOptions ??= …`), which happens to mount under the same gate — so the asymmetry is currently harmless, but it encodes two contradictory beliefs about the same value's nullability. *Falsifier*: `matrixOptions` being non-optional on `StoredAnimationGroupControlOptions` (it is `??=`-initialized, i.e. optional).
- **D-25** · `CubeScene.vue:190`, `:197` — ribbon icons sized `w-3.5 h-3.5` where the house uses the `icon-sm` token (`RibbonBar.vue:22,30,42,…`). Pure authority nit with **no visual consequence**: `--icon-sm: 0.875rem` and `3.5 × .25rem = 0.875rem` are the same value. Recorded only so a future token change (which would move `icon-sm` and leave `w-3.5` behind) has a paper trail.

---

## 7. Claims I formed and then killed (falsifiers run, findings withdrawn)

L-18 cuts both ways, and so does the falsifier discipline. Five hypotheses that looked like defects and are not:

1. **"`role: \"card\"` is an invalid ARIA role."** Dead. It is a documented glass-ui prop mapping to `role="group"` (`PopoverContent.vue.d.ts`, `type PopoverRole = "dialog" | "card"`). Only the missing `ariaLabel` survives, as D-5.
2. **"The dead `.btn-interactive` removes the focus ring from the ribbon buttons."** Dead. glass-ui's `Button` applies `.focus-ring` in its own computed root class. Downgraded to D-11 (MINOR, cosmetic dead class).
3. **"`.focus-ring:focus-visible { border-radius: var(--radius-pill) }` makes the button change shape on keyboard focus."** Dead. `.focus-ring:focus-visible` sits in `components@21885`; `.rounded-lg` sits in `utilities@182187`. Layer precedence beats the higher specificity, so the radius stays `--radius-lg` focused or not, and the box-shadow ring follows it.
4. **"`@wheel.prevent` on a full-bleed stage is a scroll trap."** Dead. `style.css:210-220` sets `html, body { overflow: hidden; overscroll-behavior: none; }` — the app never scrolls, so nothing is being trapped.
5. **"`text-foreground` on a popover should be `text-popover-foreground`."** Dead twice over: `--popover-foreground: var(--foreground)` (they are the same token), and glass surfaces remap `--foreground` locally under `:where(.glass-floating, .glass-overlay)`, so the utility resolves to the on-glass ink correctly.

---

## 8. Superlatives (5)

### S-D1 · The recede band is written entirely in logical properties

`CubeScene.vue:268`, `:274` — `padding-block-start` / `padding-block-end`, not `padding-top`/`padding-bottom`. The one piece of hand-authored layout geometry in the file is RTL- and vertical-writing-mode-safe by construction, in a codebase with **zero** other RTL affordances (repo-wide grep for `dir=` / `rtl:` in `demo/`: no hits). The author reached for the correct primitive without a requirement forcing it.
*Falsifier* — a physical inset anywhere in the scoped block. There is none.

### S-D2 · Zero magic numbers in the geometry, and the subtraction is justified

`CubeScene.vue:266-276` — every value is a named token, and I verified all three resolve: `--start-hero-band` (`layout.css:26`), `--dock-menubar-reserve` (`:103`), `--dock-band-reserve` (`:78`). The non-obvious term is explained in situ:

> "The subject's band ends at the MENUBAR top, not the raw dock-band depth: the bottom TransportDock floats `--work-area-bottom-offset` above the viewport edge … so without this term the receded cube's lower face slid under the transport pill. Same tokens, no magic numbers."

That is a design decision with its symptom, its cause, and its arithmetic all recorded. Had either token been a phantom, the whole `calc()` would be invalid at computed-value time and `padding-block-end` would silently drop to zero — the failure mode this discipline exists to prevent.
*Falsifier* — a raw px/rem literal in the block, or any of the three tokens resolving nowhere. Neither.

### S-D3 · `--lit` is registered, which is the only reason the relight reads as material

`CubeTarget.css:5-10` + `:79`:

```css
@property --lit { syntax: "<number>"; inherits: true; initial-value: 0.5; }
…
.cube-side { transition: --lit 160ms linear; }
```

An unregistered custom property cannot be transitioned — the value would step per rotation tick and the die would flicker rather than gleam. Typing it as `<number>` is what makes `transition: --lit` legal and the highlight continuous. This is a subtle, correct, and load-bearing use of `@property`; the same effect attempted without it fails silently and looks like a frame-rate problem.
*Falsifier* — remove the `@property` block and the transition becomes a no-op. It is present.

### S-D4 · The removed bloom is documented by mechanism, not by decree

`CubeTarget.css:148-154` records that a `filter: drop-shadow(...)` on the die forced the used `transform-style` to `flat`, collapsing six faces onto one plane (only face 1 survived), and states the standing rule: no compensating ancestor shadow may be re-introduced, because *any* ancestor in the 3D chain re-flattens. A future designer asked for "more depth on the cube" is handed the reason the obvious fix cannot work, which is the difference between a comment and an institution. (Qualified only by D-23, where the ppMode skin brushes the same hazard at leaf level.)
*Falsifier* — a `filter` on `.cube` or any ancestor in the preserve-3d chain. There is none.

### S-D5 · Compositor discipline: transient promotion, and every z-index earns its rung

`CubeTarget.css:55-61` promotes only the element that actually transforms and only while it moves (`.idle-hover.playing .cube, .graph:hover .cube { will-change: transform }`), and `:80-84` records the removal of the six faces' resident `will-change`, naming the anti-pattern ("a resident `will-change` keeps the layer alive forever"). Meanwhile the z-scale is honored throughout: `.face-numeral { z-index: var(--z-content) }` uses the named token, and the two raw rungs in the target are commented as deliberately local (`CubeScene.vue:130-133` "z-20: LOCAL stacking … not an editor z-contract participant"; `CubeTarget.vue:45-48` the same for `z-10`). That matches the demo's documented z-contract (`style.css:20-39`) and the census's account of it (`lane-frontend.md:442`), with no raw `z-[N]` bracket anywhere in the read set.
*Falsifier* — a resident `will-change` or a raw `z-[N]` in the component tree. Neither appears.

---

## 9. Marked UNPROVEN-NEEDS-LIVE (for the SS-13 visual audit)

Livable-only questions this static pass cannot decide, forwarded rather than guessed:

1. **D-7's rendered ratios** — the computed table is the un-overlaid crayon composite. The `.face-lacquer` sheen and `.face-relit` specular shift the actual pixel; I argued the direction is unfavourable, but the exact ratio on a lit face wants a screenshot sample.
2. **Whether the H3 collision in D-9 is visible** at 1024–1280 px CSS width under a 20 px root font — the geometry says it must be; only a render proves the overlap.
3. **Whether the `<a>` in D-1 is genuinely skipped by the tab order** in every engine (Safari's historical `<a href>`-less handling differs from Chromium's). The spec and both installed sources say yes; a live tab-walk closes it.
4. **The rounded-lg/pill mismatch in D-3** is arithmetically certain but its visual weight in the ribbon (how loudly the odd-one-out reads) is a judgement for the eye.
5. **`--filter-brand-color`'s rendered result on the pp-mode faces** — a `filter` recolouring an SVG over `--secondary` at .75 opacity (`brand.css:14-23`); contrast there is not decidable from tokens alone.
